/**
 * Map data helpers for the Weather Map and Radar views.
 * Data source: Open-Meteo current weather per grid point. The published
 * mockup could only approximate live data with a stylised placeholder;
 * the dev environment fetches real values instead.
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export type LayerId = 'standard' | 'temperature' | 'precipitation' | 'wind';

export interface PointWeather {
  temp: number | null;
  precip: number | null;
  windSpeed: number | null;
  windDir: number | null;
  gust: number | null;
  /** Mean sea-level pressure in hPa (null when the source omits it). */
  pressure: number | null;
}

export interface GridPoint {
  lat: number;
  lon: number;
  temp: number;
  precip: number;
  windSpeed: number;
  windDir: number;
  gust: number;
  /** MSLP in hPa. NaN marks "no real observation here". */
  pressure: number;
}

export interface GridResult {
  points: GridPoint[];
  minTemp: number;
  maxTemp: number;
  minRain: number;
  maxRain: number;
  minWind: number;
  maxWind: number;
  /** Observed MSLP range in hPa; null when no cell returned pressure. */
  minPressure: number | null;
  maxPressure: number | null;
}

const GRID = 5; // 5x5 grid points around the queried location
const SPACING = 0.5; // degrees between grid points
/** Grid spacing, exported for the weather-field ellipse geometry. */
export const GRID_SPACING = SPACING;

/**
 * Regional aggregation: the observation grid is clustered into a few broad
 * weather regions (deterministic k-means on lat/lon) so the map reads as
 * large overlapping translucent meteorological zones anchored by the data -
 * never as a per-cell point heatmap and never as a single blob around the
 * selected location. See regionalize() below.
 */
export const REGION_COUNT = 6;
/** Region reach (half-extent) as a fraction of the local cluster spacing. */
export const REGION_REACH_FRAC = 1.15;
/** Floor / ceiling on a region's half-extent in degrees. */
export const REGION_REACH_MIN = 0.7;
export const REGION_REACH_MAX = 0.95;
/** Per-region aspect variation (+/- 14%), deterministic per centroid. */
export const REGION_ASPECT = 0.14;
/** Per-region tilt in radians for hash t in [-0.5, 0.5) (+/- ~5.4 deg). */
export const REGION_TILT = 0.19;

/** Rain rate (mm/h) at or below which precipitation is "not meaningful". */
export const MEANINGFUL_RAIN = 0.05;

/**
 * Shared OSM basemap used by both the Weather Map and the Radar page. One
 * reliable, key-free tile source; no CARTO/API-key providers anywhere.
 */
export const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OSM_TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * Neutral Leaflet viewport used ONLY to initialise the map/radar views when
 * no location has been selected yet (`location === null`, docs/location-
 * architecture.md). It is a world view that is deliberately unambiguously
 * "not a place": it is never fed into any weather request and never written
 * into the canonical location — the first real selection (map tap, GPS,
 * search, chat, deep link) re-centres the map immediately.
 */
export const NEUTRAL_MAP_VIEWPORT: [number, number] = [20, 0];
export const NEUTRAL_MAP_ZOOM = 2;

const OPEN_METEO =
  'https://api.open-meteo.com/v1/forecast?current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure&wind_speed_unit=kmh';

/**
 * Hourly forecast request used by the Radar timeline: real model forecast
 * frames (now .. +5 h) with API-provided timestamps, localised via
 * timezone=auto (Asia/Kolkata for India).
 */
const OPEN_METEO_HOURLY =
  'https://api.open-meteo.com/v1/forecast?hourly=precipitation,temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_hours=6&wind_speed_unit=kmh&timezone=auto';

export async function fetchPointWeather(lat: number, lon: number): Promise<PointWeather> {
  const res = await fetch(`${OPEN_METEO}&latitude=${lat}&longitude=${lon}`);
  if (!res.ok) throw new Error('Point weather request failed');
  const d = await res.json();
  const c = d.current ?? {};
  return {
    temp: typeof c.temperature_2m === 'number' ? c.temperature_2m : null,
    precip: typeof c.precipitation === 'number' ? c.precipitation : null,
    windSpeed: typeof c.wind_speed_10m === 'number' ? c.wind_speed_10m : null,
    windDir: typeof c.wind_direction_10m === 'number' ? c.wind_direction_10m : null,
    gust: typeof c.wind_gusts_10m === 'number' ? c.wind_gusts_10m : null,
    pressure: typeof c.surface_pressure === 'number' ? c.surface_pressure : null,
  };
}

const gridCache = new Map<string, { at: number; data: GridResult }>();
const CACHE_TTL = 10 * 60 * 1000;

/** Retry a single cell fetch (2 attempts, short backoff). */
async function fetchCell<T>(
  entry: { lat: number; lon: number },
  fetchOne: (lat: number, lon: number) => Promise<T>,
  valid: (v: T) => boolean,
): Promise<T | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const v = await fetchOne(entry.lat, entry.lon);
      if (v && valid(v)) return v;
    } catch {
      // transient network error; retry below
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 200));
  }
  return null;
}

const GRID_ENTRIES = Array.from({ length: GRID }, (_, i) => (i - (GRID - 1) / 2) * SPACING)
  .flatMap((dlat) =>
    Array.from({ length: GRID }, (_, i) => (i - (GRID - 1) / 2) * SPACING).map((dlon) => ({
      dlat,
      dlon,
    })),
  );

/**
 * Fill a cell that failed to fetch by inverse-distance weighting over the
 * successfully fetched neighbours (1/d^2, capped at 1.5 deg). This only ever
 * interpolates the same model field: it never invents values beyond the
 * fetched grid, and it keeps the rendered field continuous (no bare-map
 * holes) when a single cell's request drops.
 */
function idwFill<T>(
  lat: number,
  lon: number,
  present: { lat: number; lon: number; value: T }[],
  take: (v: T) => { temp: number | null; precip: number | null; windSpeed: number | null; windDir: number | null; gust: number | null; pressure?: number | null },
): PointWeather | null {
  let wsum = 0;
  let temp = 0;
  let precip = 0;
  let wind = 0;
  let gust = 0;
  let sinD = 0;
  let cosD = 0;
  let any = false;
  // Pressure is filled only from cells that actually observed it, so a
  // missing reading never poisons the interpolation with a fabricated value.
  let pSum = 0;
  let pWsum = 0;
  for (const c of present) {
    const t = take(c.value);
    if (t.temp == null || t.windSpeed == null) continue;
    const d = Math.hypot(c.lat - lat, (c.lon - lon) * Math.cos((lat * Math.PI) / 180));
    if (d > 1.5) continue;
    const w = 1 / (d * d + 1e-6);
    wsum += w;
    temp += t.temp * w;
    precip += (t.precip ?? 0) * w;
    wind += t.windSpeed * w;
    gust += (t.gust ?? t.windSpeed) * w;
    sinD += Math.sin(((t.windDir ?? 0) * Math.PI) / 180) * w;
    cosD += Math.cos(((t.windDir ?? 0) * Math.PI) / 180) * w;
    if (t.pressure != null) {
      pSum += t.pressure * w;
      pWsum += w;
    }
    any = true;
  }
  if (!any) return null;
  const dir = ((Math.atan2(sinD, cosD) * 180) / Math.PI + 360) % 360;
  return {
    temp: temp / wsum,
    precip: precip / wsum,
    windSpeed: wind / wsum,
    windDir: dir,
    gust: gust / wsum,
    pressure: pWsum > 0 ? pSum / pWsum : null,
  };
}

/** Resolve a city name to coordinates (fallback anchor when GPS is off). */
const cityGeocodeCache: Record<string, { latitude: number; longitude: number }> = {};
export async function geocodeCityName(
  name: string,
): Promise<{ latitude: number; longitude: number } | null> {
  const key = name.trim().toLowerCase();
  if (cityGeocodeCache[key]) return cityGeocodeCache[key];
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json`,
    );
    if (!res.ok) return null;
    const d = await res.json();
    const r = d.results?.[0];
    if (!r) return null;
    const out = { latitude: r.latitude, longitude: r.longitude };
    cityGeocodeCache[key] = out;
    return out;
  } catch {
    return null;
  }
}

export async function fetchGrid(lat: number, lon: number): Promise<GridResult> {
  const key = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const hit = gridCache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL) return hit.data;

  const settled = await Promise.all(
    GRID_ENTRIES.map(async (o) => ({
      lat: lat + o.dlat,
      lon: lon + o.dlon,
      value: await fetchCell(
        { lat: lat + o.dlat, lon: lon + o.dlon },
        fetchPointWeather,
        (p) => p.temp != null && p.windSpeed != null,
      ),
    })),
  );

  const present = settled.filter(
    (c): c is { lat: number; lon: number; value: PointWeather } => c.value != null,
  );
  const points: GridPoint[] = [];
  for (const c of settled) {
    let pw = c.value;
    if (!pw) {
      pw = idwFill(c.lat, c.lon, present, (v) => v);
      if (!pw) continue; // cell truly unreachable; never fabricate
    }
    if (pw.temp == null || pw.windSpeed == null) continue;
    points.push({
      lat: c.lat,
      lon: c.lon,
      temp: pw.temp,
      precip: pw.precip ?? 0,
      windSpeed: pw.windSpeed,
      windDir: pw.windDir ?? 0,
      gust: pw.gust ?? pw.windSpeed,
      // NaN, not a guess: contouring must be able to tell "no observation"
      // apart from a real value, or it would draw a fictional isobar.
      pressure: typeof pw.pressure === 'number' ? pw.pressure : NaN,
    });
  }
  if (!points.length) throw new Error('Live layer data unavailable');

  const temps = points.map((p) => p.temp);
  const rains = points.map((p) => p.precip);
  const winds = points.map((p) => p.windSpeed);
  const pressures = points.map((p) => p.pressure).filter((p) => Number.isFinite(p));
  const result: GridResult = {
    points,
    minTemp: Math.min(...temps),
    maxTemp: Math.max(...temps),
    minRain: Math.min(...rains),
    maxRain: Math.max(...rains),
    minWind: Math.min(...winds),
    maxWind: Math.max(...winds),
    minPressure: pressures.length ? Math.min(...pressures) : null,
    maxPressure: pressures.length ? Math.max(...pressures) : null,
  };
  gridCache.set(key, { at: Date.now(), data: result });
  return result;
}

/* ─── Radar forecast frames (real model forecast, honest timestamps) ─── */

export interface RadarFrame {
  /** ISO timestamp of the frame hour (API-provided, local timezone). */
  timeISO: string;
  points: GridPoint[];
  minRain: number;
  maxRain: number;
  /** True when at least one grid cell exceeds MEANINGFUL_RAIN. */
  meaningful: boolean;
}

export interface RadarFramesResult {
  frames: RadarFrame[];
  /** Epoch ms of the successful fetch (used for the "Updated" label). */
  fetchedAt: number;
}

interface HourlyPoint {
  time: string[];
  precipitation: (number | null)[];
  temperature: (number | null)[];
  windSpeed: (number | null)[];
  windDir: (number | null)[];
  gust: (number | null)[];
}

async function fetchPointHourly(lat: number, lon: number): Promise<HourlyPoint> {
  const res = await fetch(`${OPEN_METEO_HOURLY}&latitude=${lat}&longitude=${lon}`);
  if (!res.ok) throw new Error('Hourly weather request failed');
  const d = await res.json();
  const h = d.hourly ?? {};
  const hourCount = Array.isArray(h.time) ? (h.time as string[]).length : 0;
  const arr = (field: unknown): (number | null)[] => {
    const out: (number | null)[] = [];
    for (let i = 0; i < hourCount; i++) {
      out.push(Array.isArray(field) && typeof field[i] === 'number' ? (field[i] as number) : null);
    }
    return out;
  };
  return {
    time: Array.isArray(h.time) ? (h.time as string[]) : [],
    precipitation: arr(h.precipitation),
    temperature: arr(h.temperature_2m),
    windSpeed: arr(h.wind_speed_10m),
    windDir: arr(h.wind_direction_10m),
    gust: arr(h.wind_gusts_10m),
  };
}

const radarCache = new Map<string, { at: number; data: RadarFramesResult }>();

/**
 * Fetch now..+5h model forecast frames for the 5x5 grid around a location.
 * Each frame carries the API's own hourly timestamp; nothing is interpolated
 * or invented. Same 10-minute cache discipline as fetchGrid.
 */
export async function fetchRadarFrames(lat: number, lon: number): Promise<RadarFramesResult> {
  const key = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const hit = radarCache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL) return hit.data;

  const settled = await Promise.all(
    GRID_ENTRIES.map(async (o) => {
      const glat = lat + o.dlat;
      const glon = lon + o.dlon;
      const h = await fetchCell(
        { lat: glat, lon: glon },
        fetchPointHourly,
        (hp: HourlyPoint) => hp.time.length > 0,
      );
      return { lat: glat, lon: glon, h };
    }),
  );

  const cells = settled.filter(
    (c): c is { lat: number; lon: number; h: HourlyPoint } => c.h != null,
  );
  if (!cells.length) throw new Error('Radar data unavailable');

  const hours = cells[0].h.time.length;
  const frames: RadarFrame[] = [];
  for (let hh = 0; hh < hours; hh++) {
    const present = cells.filter(
      (c) => c.h.temperature[hh] != null && c.h.windSpeed[hh] != null,
    );
    const points: GridPoint[] = [];
    for (const c of cells) {
      let temp = c.h.temperature[hh] ?? null;
      let wind = c.h.windSpeed[hh] ?? null;
      let precip = c.h.precipitation[hh] ?? 0;
      let dir = c.h.windDir[hh] ?? 0;
      let gust = c.h.gust[hh] ?? wind;
      if (temp == null || wind == null) {
        const fill = idwFill(
          c.lat,
          c.lon,
          present.map((pc) => ({ lat: pc.lat, lon: pc.lon, value: pc.h })),
          (hp: HourlyPoint) => ({
            temp: hp.temperature[hh] ?? null,
            precip: hp.precipitation[hh] ?? null,
            windSpeed: hp.windSpeed[hh] ?? null,
            windDir: hp.windDir[hh] ?? null,
            gust: hp.gust[hh] ?? null,
          }),
        );
        if (!fill) continue; // cell genuinely unreachable; never fabricate
        temp = fill.temp;
        precip = fill.precip ?? 0;
        wind = fill.windSpeed;
        dir = fill.windDir ?? 0;
        gust = fill.gust ?? wind;
      }
      if (temp == null || wind == null) continue;
      const g = gust ?? wind; // wind is narrowed to number here
      points.push({
        lat: c.lat,
        lon: c.lon,
        temp,
        precip,
        windSpeed: wind,
        windDir: dir,
        gust: g,
        // The hourly radar request does not ask for pressure, so this layer
        // never has a real MSLP value. NaN keeps the isobar renderer honest.
        pressure: NaN,
      });
    }
    if (!points.length) continue;
    const rains = points.map((p) => p.precip);
    const minRain = Math.min(...rains);
    const maxRain = Math.max(...rains);
    frames.push({
      timeISO: cells[0].h.time[hh],
      points,
      minRain,
      maxRain,
      meaningful: maxRain > MEANINGFUL_RAIN,
    });
  }
  if (!frames.length) throw new Error('Radar data unavailable');

  const result: RadarFramesResult = { frames, fetchedAt: Date.now() };
  radarCache.set(key, { at: Date.now(), data: result });
  return result;
}

/**
 * Dominant direction of precipitation change across the forecast frames
 * (centroid of precip>=1 mm/h cells, frame 0 vs last frame). Returns null
 * when movement is not defensible (no rain, or centroid shift too small).
 * This is a forecast trend, never observed motion.
 */
export function rainMovement(frames: RadarFrame[]): { bearing: number; label: string } | null {
  if (frames.length < 2) return null;
  const centroid = (frame: RadarFrame): { x: number; y: number; w: number } | null => {
    let sx = 0;
    let sy = 0;
    let w = 0;
    for (const p of frame.points) {
      if (p.precip < 1) continue;
      sx += p.lon * p.precip;
      sy += p.lat * p.precip;
      w += p.precip;
    }
    return w > 0 ? { x: sx / w, y: sy / w, w } : null;
  };
  const a = centroid(frames[0]);
  const b = centroid(frames[frames.length - 1]);
  if (!a || !b) return null;
  const dLon = b.x - a.x;
  const dLat = b.y - a.y;
  if (Math.hypot(dLon, dLat) < 0.12) return null; // too small to be meaningful
  const bearing = (Math.atan2(dLon, dLat) * 180) / Math.PI;
  const norm = ((bearing % 360) + 360) % 360;
  return { bearing: norm, label: compass(norm) };
}

/** "HH:MM" from an Open-Meteo ISO timestamp (already local tz). */
export function frameClock(timeISO: string): string {
  const m = /T(\d{2}):(\d{2})/.exec(timeISO);
  return m ? `${m[1]}:${m[2]}` : '--:--';
}

/** 16-wind compass label from a bearing in degrees. */
export function compass(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16];
}

/* ─── Regional aggregation (broad weather zones from the 5x5 grid) ─── */

/** One aggregated weather region anchored on a cluster of observations. */
export interface WeatherRegion {
  lat: number;
  lon: number;
  /** Value at the centroid (mean of this cluster's observations). */
  value: number;
  /** Half-extent along longitude in degrees (includes aspect variation). */
  rx: number;
  /** Half-extent along latitude in degrees. */
  ry: number;
  /** Rotation in radians, deterministic per centroid. */
  rot: number;
}

/** Deterministic PRNG (mulberry32) so clustering never flickers on redraw. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic hash of a lat/lon pair in [-0.5, 0.5). */
function geoHash(lat: number, lon: number): number {
  return ((((lat * 31 + lon * 17) % 1) + 1) % 1) - 0.5;
}

/**
 * Aggregate the observation grid into REGION_COUNT (or fewer) broad weather
 * regions. Deterministic k-means on (lat, lon): the same anchor always yields
 * the same regions, and each region is anchored at the centroid of a spatial
 * cluster of real observations - the query location is never the field's
 * source or centre. Region values are cluster means of the requested field.
 *
 * Reach derives from the actual cluster spacing (REACH_FRAC x local spacing,
 * clamped) so regions stay large enough to overlap into a continuous field
 * without pretending precision beyond the 0.5 deg grid.
 */
export function regionalize(
  points: GridPoint[],
  valueOf: (p: GridPoint) => number,
): WeatherRegion[] {
  const n = points.length;
  if (n === 0) return [];
  const k = Math.min(REGION_COUNT, n);
  const d2 = (ax: number, ay: number, bx: number, by: number) => {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
  };
  const reachOf = (spacing: number) =>
    Math.max(REGION_REACH_MIN, Math.min(REGION_REACH_MAX, spacing * REGION_REACH_FRAC));

  if (k === 1) {
    const p = points[0];
    const t = geoHash(p.lat, p.lon);
    const r = REGION_REACH_MIN;
    return [
      { lat: p.lat, lon: p.lon, value: valueOf(p), rx: r * (1 + REGION_ASPECT * t), ry: r * (1 - REGION_ASPECT * t), rot: t * REGION_TILT },
    ];
  }

  // Deterministic seed derived from the box, stable across redraws and pans.
  let sx = 0;
  let sy = 0;
  for (const p of points) {
    sx += p.lat + 90;
    sy += p.lon + 180;
  }
  const rng = mulberry32(Math.round(sx * 1000 * 31 + sy * 1000 * 17) >>> 0);

  // k-means++ initialisation (seeded, deterministic).
  const centers: { lat: number; lon: number }[] = [
    { lat: points[Math.floor(rng() * n)].lat, lon: points[Math.floor(rng() * n)].lon },
  ];
  while (centers.length < k) {
    let total = 0;
    const ds = new Array<number>(n);
    for (let i = 0; i < n; i++) {
      let best = Infinity;
      for (const c of centers) best = Math.min(best, d2(points[i].lat, points[i].lon, c.lat, c.lon));
      ds[i] = best;
      total += best;
    }
    let pick = rng() * total;
    let idx = n - 1;
    for (let i = 0; i < n; i++) {
      pick -= ds[i];
      if (pick <= 0) {
        idx = i;
        break;
      }
    }
    centers.push({ lat: points[idx].lat, lon: points[idx].lon });
  }

  // Lloyd iterations; reseed any empty cluster onto the observation farthest
  // from its own assigned centre so k clusters always survive.
  const assign = new Array<number>(n);
  for (let iter = 0; iter < 14; iter++) {
    for (let i = 0; i < n; i++) {
      let best = 0;
      let bd = Infinity;
      for (let c = 0; c < k; c++) {
        const d = d2(points[i].lat, points[i].lon, centers[c].lat, centers[c].lon);
        if (d < bd) {
          bd = d;
          best = c;
        }
      }
      assign[i] = best;
    }
    const sums = centers.map(() => ({ lat: 0, lon: 0, count: 0 }));
    for (let i = 0; i < n; i++) {
      const s = sums[assign[i]];
      s.lat += points[i].lat;
      s.lon += points[i].lon;
      s.count += 1;
    }
    for (let c = 0; c < k; c++) {
      if (sums[c].count > 0) continue;
      let farIdx = 0;
      let farD = -1;
      for (let i = 0; i < n; i++) {
        const d = d2(points[i].lat, points[i].lon, centers[assign[i]].lat, centers[assign[i]].lon);
        if (d > farD) {
          farD = d;
          farIdx = i;
        }
      }
      centers[c] = { lat: points[farIdx].lat, lon: points[farIdx].lon };
    }
    for (let c = 0; c < k; c++) {
      if (sums[c].count > 0) {
        centers[c] = { lat: sums[c].lat / sums[c].count, lon: sums[c].lon / sums[c].count };
      }
    }
  }

  // Final assignment into member lists.
  const members: GridPoint[][] = Array.from({ length: k }, () => []);
  for (let i = 0; i < n; i++) {
    let best = 0;
    let bd = Infinity;
    for (let c = 0; c < k; c++) {
      const d = d2(points[i].lat, points[i].lon, centers[c].lat, centers[c].lon);
      if (d < bd) {
        bd = d;
        best = c;
      }
    }
    members[best].push(points[i]);
  }

  // Local cluster spacing (mean nearest-centroid distance) sets region reach.
  let spacingSum = 0;
  let spacingCount = 0;
  for (let c = 0; c < k; c++) {
    if (!members[c].length) continue;
    let near = Infinity;
    for (let c2 = 0; c2 < k; c2++) {
      if (c2 === c || !members[c2].length) continue;
      near = Math.min(near, d2(centers[c].lat, centers[c].lon, centers[c2].lat, centers[c2].lon));
    }
    if (isFinite(near)) {
      spacingSum += Math.sqrt(near);
      spacingCount += 1;
    }
  }
  const spacing = spacingCount ? spacingSum / spacingCount : REGION_REACH_MIN;
  const reach = reachOf(spacing);

  const regions: WeatherRegion[] = [];
  for (let c = 0; c < k; c++) {
    const m = members[c];
    if (!m.length) continue;
    let lat = 0;
    let lon = 0;
    let value = 0;
    for (const p of m) {
      lat += p.lat;
      lon += p.lon;
      value += valueOf(p);
    }
    const clat = lat / m.length;
    const clon = lon / m.length;
    const t = geoHash(clat, clon);
    regions.push({
      lat: clat,
      lon: clon,
      value: value / m.length,
      rx: reach * (1 + REGION_ASPECT * t),
      ry: reach * (1 - REGION_ASPECT * t),
      rot: t * REGION_TILT,
    });
  }
  return regions;
}

/* ─── Colour scales (data visualisation, theme-independent) ─── */

/**
 * Parse a colour string into [r,g,b]: accepts both '#rrggbb' hex and
 * 'rgb(r,g,b)' forms. The scale functions return rgb() strings, so this
 * must never be limited to hex - parsing a rgb() string through parseInt
 * yields NaN, and bitwise coercion of NaN is 0, which silently painted the
 * whole weather field black (the "dark overlay" bug).
 */
function hexToRgb(hex: string): [number, number, number] {
  const s = hex.trim();
  if (s.startsWith('rgb(')) {
    const m = s.match(/\d+/g);
    const [r, g, b] = m ?? ['0', '0', '0'];
    return [Math.min(255, +r || 0), Math.min(255, +g || 0), Math.min(255, +b || 0)];
  }
  const n = parseInt(s.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mixColour(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

/** rgba() string for a colour (hex or rgb()) and alpha (heat-field gradient stops). */
export function colorToRgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function stops([v0, c0]: [number, string], [v1, c1]: [number, string], v: number): string {
  const t = Math.max(0, Math.min(1, (v - v0) / (v1 - v0 || 1)));
  return mixColour(c0, c1, t);
}

/**
 * Meteorologically meaningful colour scales (data visualisation,
 * theme-independent). Every stop keeps its hue saturated enough that the
 * field reads as *colour* at the field's 30-50% alpha over the light OSM
 * basemap - never as a dark gray/black mask. Region gradients always fade to
 * the region's own colour at alpha 0, and no stop is black or near-black.
 */

/** Cool blues -> pale neutral tones -> yellow -> orange -> hot orange. */
const TEMP_STOPS: [number, string][] = [
  [-15, '#164A94'], // very cold: deep blue
  [-5, '#2E6FB5'], // cold: blue
  [5, '#5CB8D3'], // cool: cyan / light blue
  [12, '#A9D6D5'], // mild: pale cyan (neutral)
  [18, '#F2E29B'], // mild-warm: pale yellow
  [24, '#F2C63D'], // warm: yellow
  [32, '#E8751E'], // hot: orange
  [40, '#E0461C'], // very hot: hot orange (distinct from --watch-red)
];

export function tempColor(t: number): string {
  const v = Math.max(-15, Math.min(45, t));
  for (let i = 0; i < TEMP_STOPS.length - 1; i++) {
    if (v <= TEMP_STOPS[i + 1][0]) return stops(TEMP_STOPS[i], TEMP_STOPS[i + 1], v);
  }
  return TEMP_STOPS[TEMP_STOPS.length - 1][1];
}

/**
 * Precipitation: a teal intensity scale - pale misty teal (onset/light)
 * through slate-teal to deep teal for extreme rates. Teal keeps the layer
 * distinct from the (blue) cold-temperature end and from every warning
 * colour; there is no purple/magenta anywhere in the palette. Sub-threshold
 * cells are filtered out before the field is drawn (see WeatherField.draw),
 * so the low end only appears where rain is actually falling; dry regions
 * show no field at all.
 */
const RAIN_STOPS: [number, string][] = [
  [0.05, '#C5E0E5'], // onset / light: pale misty teal
  [1, '#93C6CF'], // light: light teal
  [2.5, '#63A5B3'], // moderate: teal
  [5, '#41879A'], // moderate-heavy: deep slate-teal
  [12, '#2E6E7D'], // heavy: slate-teal
  [25, '#1F4E5A'], // very heavy: deep teal
  [50, '#153A44'], // extreme: deepest teal (never black)
];

export function rainColor(mm: number): string {
  const v = Math.max(0, Math.min(60, mm));
  for (let i = 0; i < RAIN_STOPS.length - 1; i++) {
    if (v <= RAIN_STOPS[i + 1][0]) return stops(RAIN_STOPS[i], RAIN_STOPS[i + 1], v);
  }
  return RAIN_STOPS[RAIN_STOPS.length - 1][1];
}

/**
 * Wind speed colour on a 0..1 strength scale: pale slate-teal (calm) ->
 * slate-teal -> teal-green -> olive-gold -> brass (strong). Never red (and
 * never a warning colour); direction is carried by the arrow geometry, not
 * the colour.
 */
const WIND_STOPS: [number, string][] = [
  [0, '#BED7DC'],
  [0.35, '#5E97A4'],
  [0.65, '#3D7C6E'],
  [0.85, '#7A8747'],
  [1, '#9C7A2E'], // brass
];

/** Wind colour from a 0..1 speed normalised against the grid maximum. */
export function windColor(norm: number): string {
  const v = Math.max(0, Math.min(1, norm));
  for (let i = 0; i < WIND_STOPS.length - 1; i++) {
    if (v <= WIND_STOPS[i + 1][0]) return stops(WIND_STOPS[i], WIND_STOPS[i + 1], v);
  }
  return WIND_STOPS[WIND_STOPS.length - 1][1];
}

/** Wind glyph styling: colour from the shared scale, geometry carries direction. */
export function windStyle(speed: number, maxSpeed: number): { color: string; opacity: number; size: number } {
  const norm = maxSpeed > 0 ? Math.max(0, Math.min(1, speed / maxSpeed)) : 0.35;
  return {
    color: windColor(norm),
    opacity: 0.55 + 0.4 * norm,
    size: Math.round(14 + 12 * norm),
  };
}

/**
 * CSS gradient for a legend bar, sampled from the SAME scale the field uses
 * across the visible data range [min..max], so the legend always matches the
 * colours on the map. A zero-width range collapses to a solid bar.
 */
export function fieldGradient(
  kind: 'temperature' | 'precipitation' | 'wind',
  min: number,
  max: number,
  samples = 9,
): string {
  const colorOf = (v: number) =>
    kind === 'temperature'
      ? tempColor(v)
      : kind === 'precipitation'
        ? rainColor(v)
        : windColor(max > 0 ? v / max : 0.35);
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  if (!isFinite(lo) || !isFinite(hi) || hi - lo < 1e-6) {
    return colorOf(lo + (hi - lo) / 2);
  }
  const parts: string[] = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const v = lo + (hi - lo) * t;
    parts.push(`${colorOf(v)} ${(t * 100).toFixed(1)}%`);
  }
  return `linear-gradient(90deg, ${parts.join(', ')})`;
}