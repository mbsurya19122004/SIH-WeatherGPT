import { useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  Anchor,
  Building2,
  CheckCircle,
  CloudRain,
  CloudSnow,
  Cloud,
  Droplets,
  Flame,
  Map as MapIcon,
  MapPin,
  Plane,
  SprayCan,
  Sprout,
  Sun,
  Thermometer,
  TrendingUp,
  Waves,
  Wind,
  ChevronDown,
  ChevronUp,
  ShieldOff,
} from 'lucide-react';
import AIChatWorkspace from './components/AIChatWorkspace';
import AppHeader from './components/AppHeader';
import IconRail from './components/IconRail';
import MobileDrawer from './components/MobileDrawer';
import WarningBulletin from './components/WarningBulletin';
import type { ImdSeverity, ImdWarning } from './components/WarningBulletin';
import WeatherMapView from './components/WeatherMapView';
import WeatherRadarView from './components/WeatherRadarView';
import type { NavPage } from './config/navigation';
import {
  ADVISORIES_ENDPOINT,
  ALERTS_ENDPOINT,
  CLIMATE_ENDPOINT,
  FetchDiagnosticError,
  fetchWithDiagnostics,
  ML_ROUTE_ENDPOINT,
  truncateForDiagnostics,
  WEATHER_ENDPOINTS,
  type WeatherQueryCoords,
} from './config/api';
import { useTheme } from './hooks/useTheme';
import {
  reverseGeocodeLabel,
  useLocation,
  type SelectedLocation,
} from './location/LocationContext';
import { reportCacheKey, isInIndia } from './location/locationCore';

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────

interface RouteApiResponse {
  message?: string;
  // New multi-route format (local backend)
  routes?: RouteData[];
  // Legacy single-route format (production backend)
  route_info?: RouteData['route_info'];
  risk_summary?: { HIGH?: number; MODERATE?: number; LOW?: number };
  weather_data?: WeatherPoint[];
  map_json?: MapJsonData;
  index_html?: string;
}
interface RouteData {
  route_info: {
    origin: string;
    destination: string;
    distance_km: number;
    duration_minutes: number;
    departure_time: string;
    route_index: number;
    route_label: string;
  };
  risk_summary: { HIGH?: number; MODERATE?: number; LOW?: number };
  weather_data: WeatherPoint[];
  map_json: MapJsonData;
}
interface MapJsonData {
  route: [number, number][]; // [lat, lon]
  weather_points: WeatherPoint[];
  route_info: RouteData['route_info'];
}
interface WeatherPoint {
  location?: string; point?: string; weather?: string; condition?: string;
  temp?: number | string; temperature?: number | string;
  risk?: string; risk_level?: string; description?: string; notes?: string;
  distance_from_start?: number;
  arrival_time?: string;
  weather_time?: string;
  humidity?: number;
  rain_probability?: number;
  wind_speed?: number;
  weather_code?: number;
  latitude?: number;
  longitude?: number;
  precipitation?: number;
  [key: string]: any;
}
interface GeoResult { latitude: number; longitude: number; name: string; country?: string; }
interface HourlyBlock {
  time: string[]; temperature: number[]; humidity: number[];
  precipitationProbability: number[]; weatherCode: number[]; wind: number[];
}
interface DailyBlock {
  time: string[]; weatherCode: number[]; maxTemperature: number[];
  minTemperature: number[]; precipitationProbability: number[]; maxWind: number[];
}
interface ForecastRecord {
  location: GeoResult; savedAt: string;
  hourly24h: HourlyBlock; daily7days: DailyBlock;
}

// ─────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────

const WEATHER_CODE_DESCRIPTIONS: Record<number, string> = {
  0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Drizzle',
  55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with hail',
};
const wmoDesc = (code: number) => WEATHER_CODE_DESCRIPTIONS[code] ?? 'Unknown';

// Dev-only demo seam so components can be previewed without mutating the
// deployed backend (open the app with ?demo=1 in dev).
const IS_DEMO = import.meta.env.DEV
  && typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).get('demo') === '1';

const DEMO_WARNING: ImdWarning = {
  district: 'Sitamarhi district',
  severity: 'orange',
  title: 'Heavy to very heavy rainfall warning',
  text: '"Isolated heavy to very heavy rainfall (7-20 cm) very likely at one or two places over Sitamarhi and adjoining districts during the next 48 hours, with possibility of localised flooding in low-lying areas."',
  issuedAt: '05:30 IST, 23 Sep',
};

// ─────────────────────────────────────────────────────────────────────
// Weather report helpers (offline-capable)
// ─────────────────────────────────────────────────────────────────────

/**
 * Look up a city name.
 *
 * `count=10` rather than `count=1` so an AMBIGUOUS name can be detected.
 * With `count=1` the geocoder silently returned the single highest-ranked
 * match, and for "Kochi" that is Kochi **Japan** (33.55N 133.53E) — while
 * "Kochi, Kerala" resolves to Kochi **India** (9.94N 76.26E). The report then
 * displayed one unqualified name over whichever result came back, so a user
 * asking about an Indian city could be shown another country's weather, with
 * an official IMD warning for Kerala rendered directly above it.
 *
 * The full candidate list is deliberately NOT auto-resolved to a single place:
 * picking one silently would recreate the original bug. When more than one
 * candidate shares the queried name, the caller must disambiguate (see
 * `isAmbiguousName` / `CITY_CANDIDATES`).
 */
const CITY_CANDIDATES = 10;

interface CityCandidate extends GeoResult {
  /** Admin1 (state/region) from the geocoder, when present. */
  region?: string;
  /**
   * Administrative district, reverse-geocoded from the resolved coordinates.
   *
   * The forward geocoder does not return a district, and it must not be
   * derived from the display name: "Kochi, Kerala, India district" is not a
   * district. Warning bulletins read this field instead.
   */
  district?: string;
}

/** Reverse-geocode just the administrative fields a candidate needs. */
async function resolveDistrict(c: CityCandidate): Promise<CityCandidate> {
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${c.latitude}&lon=${c.longitude}` +
      `&format=jsonv2&zoom=10`,
    );
    if (!r.ok) return c;
    const a = (await r.json())?.address ?? {};
    return { ...c, district: a.county ?? a.city_district ?? undefined };
  } catch {
    return c;
  }
}

async function geocodeCityCandidates(city: string): Promise<CityCandidate[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}` +
    `&count=${CITY_CANDIDATES}&language=en&format=json`,
  );
  if (!res.ok) throw new Error('Unable to look up that location.');
  const data = await res.json();
  if (!data.results?.length) throw new Error('Location not found.');
  return data.results.map((r: any) => ({
    latitude: r.latitude,
    longitude: r.longitude,
    name: r.name,
    country: r.country,
    region: r.admin1,
  }));
}

/**
 * True when the query matched more than one DISTINCT place that a user could
 * have meant — i.e. candidates sharing the searched name in different
 * countries/regions. Diacritic and width variants of the same name
 * ("Kochi" / "Kōchi") are the same place and must not trigger this.
 */
function isAmbiguousName(query: string, candidates: CityCandidate[]): boolean {
  // Written with an explicit \u escape: a literal combining-mark range in source
  // is invisible and easy to corrupt in an edit, which would silently stop
  // diacritics being folded (so "Kōchi" and "Kochi" would not compare equal).
  const norm = (s: string) =>
    s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const wanted = norm(query.split(',')[0]);
  const places = new Set<string>();
  for (const c of candidates) {
    if (norm(c.name) !== wanted) continue;
    places.add(`${norm(c.country ?? '')}|${norm(c.region ?? '')}`);
  }
  return places.size > 1;
}

/** "Kochi, Kerala, India" — the disambiguated display name for a place. */
function qualifiedName(c: CityCandidate): string {
  return [c.name, c.region, c.country].filter(Boolean).join(', ');
}

async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
    `&forecast_days=7&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather request failed.');
  const d = await res.json();
  return {
    location: place, savedAt: new Date().toISOString(),
    hourly24h: {
      time: d.hourly.time.slice(0, 24), temperature: d.hourly.temperature_2m.slice(0, 24),
      humidity: d.hourly.relative_humidity_2m.slice(0, 24),
      precipitationProbability: d.hourly.precipitation_probability.slice(0, 24),
      weatherCode: d.hourly.weather_code.slice(0, 24), wind: d.hourly.wind_speed_10m.slice(0, 24),
    },
    daily7days: {
      time: d.daily.time.slice(0, 7), weatherCode: d.daily.weather_code.slice(0, 7),
      maxTemperature: d.daily.temperature_2m_max.slice(0, 7),
      minTemperature: d.daily.temperature_2m_min.slice(0, 7),
      precipitationProbability: d.daily.precipitation_probability_max.slice(0, 7),
      maxWind: d.daily.wind_speed_10m_max.slice(0, 7),
    },
  };
}
/**
 * Per-location offline cache: `reportCacheKey` (locationCore) embeds the
 * coordinates so a Delhi record can never satisfy a Ghaziabad request; the
 * cache is read only for the CURRENT coordinates and never seeds the
 * canonical selection (§cache rules — persistence cannot resurrect a location).
 */
function loadCachedForecast(lat: number, lon: number): ForecastRecord | null {
  try { return JSON.parse(localStorage.getItem(reportCacheKey(lat, lon)) ?? 'null'); } catch { return null; }
}
function saveForecast(r: ForecastRecord, lat: number, lon: number) {
  try { localStorage.setItem(reportCacheKey(lat, lon), JSON.stringify(r)); } catch { /* storage full */ }
}

// ─────────────────────────────────────────────────────────────────────
// IMD severity helpers (bulletin + alerts list)
// ─────────────────────────────────────────────────────────────────────

function severityOf(a: any): ImdSeverity {
  const raw = [a?.severity, a?.informationClass, a?.description, a?.title]
    .filter(Boolean).join(' ').toLowerCase();
  if (/\bred\b/.test(raw)) return 'red';
  if (/\borange\b/.test(raw)) return 'orange';
  if (/\byellow\b/.test(raw)) return 'yellow';
  if (/\bgreen\b/.test(raw)) return 'green';
  return 'red';
}

const tierBadge = (sev: ImdSeverity | undefined): React.CSSProperties => {
  switch (sev) {
    case 'green': return { background: 'var(--watch-green-tint)', color: 'var(--watch-green)', borderColor: 'var(--watch-green)' };
    case 'yellow': return { background: 'var(--watch-yellow-tint)', color: 'var(--watch-yellow-deep)', borderColor: 'var(--watch-yellow)' };
    case 'orange': return { background: 'var(--watch-orange-tint)', color: 'var(--watch-orange-deep)', borderColor: 'var(--watch-orange)' };
    case 'red': return { background: 'var(--watch-red-tint)', color: 'var(--watch-red-deep)', borderColor: 'var(--watch-red)' };
    default: return { background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' };
  }
};

const tierBorder = (sev: ImdSeverity): string => {
  switch (sev) {
    case 'green': return 'var(--watch-green)';
    case 'yellow': return 'var(--watch-yellow)';
    case 'orange': return 'var(--watch-orange)';
    case 'red': return 'var(--watch-red)';
    default: return 'var(--slate-teal)';
  }
};

// ─────────────────────────────────────────────────────────────────────
// Shared card styles (Route + Report + secondary pages)
// ─────────────────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  card: { background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' },
  cardTitle: { margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--ink)' },
  label: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted)' },
  input: { padding: '10px 13px', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-ui)', transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)' },
  btn: { padding: '11px 20px', background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', border: '1px solid var(--slate-teal)', borderRadius: 'var(--radius-btn)', cursor: 'pointer', fontWeight: 700, fontSize: '13.5px', fontFamily: 'var(--font-ui)' },
  error: { padding: '11px 15px', background: 'var(--watch-red-tint)', border: '1px solid var(--watch-red)', color: 'var(--watch-red-deep)', borderRadius: 'var(--radius-card)', fontSize: '13px' },
  successBanner: { padding: '11px 15px', background: 'var(--slate-teal-tint)', border: '1px solid var(--slate-teal)', color: 'var(--slate-teal)', borderRadius: 'var(--radius-card)', fontWeight: 500, fontSize: '13px' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '2px 9px', borderRadius: 'var(--radius-chip)', fontWeight: 600, fontSize: '11px', border: '1px solid transparent' },
  tableWrap: { width: '100%', overflowX: 'auto', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  th: { borderBottom: '1px solid var(--line)', padding: '9px 13px', background: 'var(--mist)', fontWeight: 700, color: 'var(--muted)', whiteSpace: 'nowrap', fontSize: '11px', textTransform: 'uppercase' },
  tr: { borderBottom: '1px solid var(--line)' },
  td: { padding: '9px 13px', whiteSpace: 'nowrap', color: 'var(--ink)' },
  tdBold: { padding: '9px 13px', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--ink)' },
  tdIndex: { padding: '9px 13px', color: 'var(--muted)', width: '36px' },
  tdDesc: { padding: '9px 13px', color: 'var(--ink)', minWidth: '180px', wordBreak: 'break-word', whiteSpace: 'normal' },
  jsonBlock: { background: 'var(--mist)', padding: '13px', borderRadius: 'var(--radius-card)', overflowX: 'auto', fontSize: '12px', color: 'var(--ink)', margin: 0, border: '1px solid var(--line)', fontFamily: 'var(--font-mono)' },
  mapWrapper: { width: '100%', borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--paper)' },
  iframe: { width: '100%', height: '380px', border: 'none', display: 'block' },
  inputAutofill: { WebkitBoxShadow: '0 0 0 1000px var(--paper) inset', boxShadow: '0 0 0 1000px var(--paper) inset', WebkitTextFillColor: 'var(--ink)' } as React.CSSProperties,
};

// Token-based panel for rail/drawer destinations.
const P: Record<string, React.CSSProperties> = {
  panel: { background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' },
  /* `h1` and `h2` deliberately share one style: promoting a page heading from
     h2 to h1 must be a semantics-only change, never a visual one. */
  h1: { margin: 0, fontSize: '19px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' },
  h2: { margin: 0, fontSize: '19px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' },
  metaCard: { background: 'var(--mist)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '10px 12px' },
  mono: { fontFamily: 'var(--font-mono)' },
};

const riskStyle = (risk?: string): React.CSSProperties => {
  switch (String(risk ?? '').toUpperCase()) {
    case 'HIGH': return { background: 'var(--watch-red-tint)', color: 'var(--watch-red-deep)', borderColor: 'var(--watch-red)' };
    case 'MODERATE': return { background: 'var(--watch-orange-tint)', color: 'var(--watch-orange-deep)', borderColor: 'var(--watch-orange)' };
    case 'LOW': return { background: 'var(--watch-green-tint)', color: 'var(--watch-green-deep)', borderColor: 'var(--watch-green)' };
    default: return { background: 'var(--mist)', color: 'var(--muted)', borderColor: 'var(--line)' };
  }
};

// ─────────────────────────────────────────────────────────────────────
// Route Weather data formatting helpers
// ─────────────────────────────────────────────────────────────────────

/** Round distance to 1 decimal place (30.1 km, not 30.14379...) */
function fmtDistance(km: number | string | undefined): string {
  const n = typeof km === 'string' ? parseFloat(km) : km;
  if (n === undefined || n === null || !Number.isFinite(n)) return '—';
  return `${n.toFixed(1)} km`;
}

/** Format arrival time as HH:MM AM/PM (24h → 12h with AM/PM) */
function fmtArrivalTime(iso: string | Date | undefined): string {
  if (!iso) return '—';
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
}

/** Check if two times are within the same hour bucket */
function sameHourBucket(t1: string | Date | undefined, t2: string | Date | undefined): boolean {
  if (!t1 || !t2) return false;
  const d1 = typeof t1 === 'string' ? new Date(t1) : t1;
  const d2 = typeof t2 === 'string' ? new Date(t2) : t2;
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate() &&
         d1.getHours() === d2.getHours();
}

/** Get time divergence note if arrival_time and weather_time differ meaningfully */
function getTimeDivergenceNote(arrival: string | Date | undefined, weather: string | Date | undefined): string | null {
  if (!arrival || !weather) return null;
  const a = typeof arrival === 'string' ? new Date(arrival) : arrival;
  const w = typeof weather === 'string' ? new Date(weather) : weather;
  if (isNaN(a.getTime()) || isNaN(w.getTime())) return null;
  if (sameHourBucket(a, w)) return null;
  const arrivalStr = fmtArrivalTime(a);
  const weatherStr = fmtArrivalTime(w);
  return `Forecast for ~${weatherStr}, arriving ~${arrivalStr}`;
}

/** Map weather condition to Lucide icon component */
function getConditionIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes('clear') || c.includes('sunny')) return Sun;
  if (c.includes('cloud') || c.includes('overcast')) return Cloud;
  if (c.includes('drizzle')) return CloudRain;
  if (c.includes('rain') || c.includes('shower')) return CloudRain;
  if (c.includes('snow') || c.includes('sleet') || c.includes('ice')) return CloudSnow;
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return Cloud;
  if (c.includes('thunder') || c.includes('storm')) return CloudRain;
  return Cloud; // default
}

/** Sentence-case risk label */
function riskLabel(risk: string): string {
  const r = String(risk ?? '').toUpperCase();
  if (r === 'HIGH') return 'High risk';
  if (r === 'MODERATE') return 'Moderate risk';
  if (r === 'LOW') return 'Low risk';
  return 'Normal';
}

/** Risk badge variant for timeline left border */
function riskBorderColor(risk: string): string {
  const r = String(risk ?? '').toUpperCase();
  if (r === 'HIGH') return 'var(--watch-red)';
  if (r === 'MODERATE') return 'var(--watch-orange)';
  if (r === 'LOW') return 'var(--watch-green)';
  return 'var(--line)';
}

/**
 * Build a user-safe HTTP error message that captures status, statusText and —
 * when the backend returns an ApiResponse envelope — its `message` field.
 * The raw body is never echoed wholesale; only the envelope's message is used.
 */
async function describeHttpError(res: Response): Promise<string> {
  let detail = '';
  try {
    const body = await res.json();
    if (body && typeof body.message === 'string' && body.message) detail = `: ${body.message}`;
  } catch {
    /* non-JSON error body — status/statusText is enough */
  }
  return `HTTP ${res.status} ${res.statusText ?? ''}${detail}`.trim();
}

/**
 * Extract the backend's user-safe ApiResponse `message` from an already-read
 * response body, without echoing the raw body. Returns null when the body is
 * not the JSON envelope.
 */
function readApiResponseMessage(text: string): string | null {
  try {
    const body = JSON.parse(text);
    if (body && typeof body.message === 'string' && body.message) return body.message;
  } catch {
    /* non-JSON body */
  }
  return null;
}

/**
 * Build the coordinate + display-label query for backend weather requests.
 * The canonical location's name is a DISPLAY LABEL (it can be a reverse-
 * geocoded POI such as "16th Park View(GYC)"), so coordinates are the
 * authoritative query while the name travels along purely for presentation.
 *
 * Null-rejecting by construction: callers must guard `location === null`
 * (no location → no request) before invoking this.
 */
function toWeatherQuery(loc: SelectedLocation): WeatherQueryCoords {
  return { latitude: loc.latitude, longitude: loc.longitude, name: loc.name };
}

// ─────────────────────────────────────────────────────────────────────
// ClimateMapEmbed — OSM map inside climate panel
// ─────────────────────────────────────────────────────────────────────

/**
 * Small OSM map centred on the canonical selected location. The viewport and
 * the marker use the coordinates passed in — never a city-name geocode and
 * never a fallback center: the caller only renders this when a location
 * exists (no location → the climate page shows the NoLocation state instead).
 */
function ClimateMapEmbed({ lat, lon, label }: { lat: number; lon: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    let cancelled = false;
    import('leaflet').then((L) => {
      if (mapRef.current) return;
      const map = L.map(ref.current!, { center: [lat, lon], zoom: 7, scrollWheelZoom: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors', maxZoom: 18,
      }).addTo(map);
      const icon = L.divIcon({
        className: '',
        html: '<div class="map-loc-dot"></div>',
        iconSize: [12, 12], iconAnchor: [6, 6],
      });
      L.marker([lat, lon], { icon }).addTo(map).bindPopup(label);
      mapRef.current = map;
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, [lat, lon, label]);

  return (
    <div style={{ position: 'relative', height: '280px', width: '100%' }}>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--mist)', zIndex: 10, color: 'var(--muted)', fontSize: '13px' }}>
          Loading map…
        </div>
      )}
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RouteWeatherView
// ─────────────────────────────────────────────────────────────────────

function RouteWeatherView() {
  // The route planner is a user-driven journey form. It does NOT seed the
  // fields from the selected location and has no city defaults: the user
  // names both endpoints, so no hardcoded or pre-filled geography can ever
  // reach the route-weather API (§no-location).
  const [form, setForm] = useState({ origin: '', destination: '', departure_time: '08:00' });
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<RouteApiResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<Set<number>>(new Set());
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  // P2-005: both endpoints are required, and saying so before the click beats
  // a silent no-op. The hint names exactly which field is missing.
  const trimmedOrigin = form.origin.trim();
  const trimmedDestination = form.destination.trim();
  const missing: string[] = [];
  if (!trimmedOrigin) missing.push('a starting point');
  if (!trimmedDestination) missing.push('a destination');
  const canAnalyze = missing.length === 0;
  const missingHint =
    missing.length === 2
      ? 'Enter a starting point and a destination to analyze a route.'
      : `Enter ${missing[0]} to analyze a route.`;

  // P2-006: never surface a raw exception, status line or stack to the user.
  // Map the failure to plain language; the technical detail goes to the
  // console for whoever is debugging.
  const describeRouteFailure = (status: number): string => {
    if (status === 400) return 'That route could not be understood. Check both place names and try again.';
    if (status === 404) return 'No route was found between those places. Try nearby or larger town names.';
    if (status === 408 || status === 504) return 'The route service took too long to answer. Please try again.';
    if (status >= 500) return 'The route service is having trouble right now. Please try again in a moment.';
    return 'The route could not be analyzed right now. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAnalyze || loading) { setErr(null); return; }
    setLoading(true); setErr(null); setResp(null); setExpandedDetails(new Set()); setActiveRouteIndex(0);
    try {
      const res = await fetch(ML_ROUTE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, origin: trimmedOrigin, destination: trimmedDestination }) });
      if (!res.ok) {
        console.warn(`[route-weather] ${res.status} ${res.statusText}`);
        setErr(describeRouteFailure(res.status));
        return;
      }
      setResp(await res.json());
    } catch (e) {
      // Transport-level only (offline, DNS, CORS, aborted). The message is
      // generated here rather than echoed, so nothing internal can leak.
      console.warn('[route-weather] transport failure', e);
      setErr('Could not reach the route service. Check your connection and try again.');
    }
    finally { setLoading(false); }
  };

  // Normalize both API response formats (legacy single-route + new multi-route)
  const routes = useMemo((): RouteData[] => {
    if (!resp) return [];
    // New format: resp.routes[]
    if (resp.routes && resp.routes.length > 0) return resp.routes;
    // Legacy format: single route at top level
    if (resp.route_info && resp.weather_data) {
      // Build route coordinates from weather_data waypoints (legacy format lacks map_json)
      const routeCoords: [number, number][] = (resp.weather_data ?? [])
        .filter((w: any) => typeof w.latitude === 'number' && typeof w.longitude === 'number')
        .map((w: any) => [w.latitude, w.longitude] as [number, number]);
      return [{
        route_info: resp.route_info,
        risk_summary: resp.risk_summary ?? { HIGH: 0, MODERATE: 0, LOW: 0 },
        weather_data: resp.weather_data,
        map_json: resp.map_json ?? {
          route: routeCoords,
          weather_points: resp.weather_data ?? [],
          route_info: resp.route_info,
        },
      }];
    }
    return [];
  }, [resp]);

  const riskStatBoxes = [
    { key: 'HIGH', label: 'High risk', fg: 'var(--watch-red-deep)', bg: 'var(--watch-red-tint)', border: 'var(--watch-red)' },
    { key: 'MODERATE', label: 'Moderate risk', fg: 'var(--watch-orange-deep)', bg: 'var(--watch-orange-tint)', border: 'var(--watch-orange)' },
    { key: 'LOW', label: 'Low risk', fg: 'var(--watch-green-deep)', bg: 'var(--watch-green-tint)', border: 'var(--watch-green)' },
  ];

  const activeRoute = routes[activeRouteIndex];
  const waypoints = activeRoute?.weather_data ?? [];

  return (
    <div style={S.card}>
      <header>
        <h1 style={P.h1}>Route weather analyzer</h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Check conditions and risk along a journey, point by point.</p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
          {(['origin', 'destination'] as const).map(field => {
            const id = `route-${field}`;
            return (
              <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor={id} style={S.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input id={id} style={{ ...S.input, ...S.inputAutofill }} type="text" name={field} value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--slate-teal)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--slate-teal-tint)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
                  required
                  placeholder={field === 'origin' ? 'Starting point' : 'Finish point'}
                  autoComplete="off" />
              </div>
            );
          })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="route-departure_time" style={S.label}>Departure time</label>
            <input id="route-departure_time" style={{ ...S.input, ...S.inputAutofill }} type="time" name="departure_time" value={form.departure_time}
              onChange={e => setForm({ ...form, departure_time: e.target.value })}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--slate-teal)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--slate-teal-tint)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
              required
              autoComplete="off" />
          </div>
        </div>
        <button type="submit" disabled={loading || !canAnalyze} style={S.btn}
          aria-describedby={canAnalyze ? undefined : 'route-missing-hint'}>
          {loading ? 'Analyzing route…' : 'Analyze route'}
        </button>
        {!canAnalyze && !loading && (
          <p id="route-missing-hint" role="status" style={{ ...S.label, margin: 0, fontWeight: 400 }}>
            {missingHint}
          </p>
        )}
      </form>

      {err && <div style={S.error}>{err}</div>}

      {resp && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {resp.message && <div style={S.successBanner}>{resp.message}</div>}

          {/* Route picker — only show when multiple routes available */}
          {routes.length > 1 && (
            <div style={S.card}>
              <h3 style={S.cardTitle}>Route options</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {routes.map((route, idx) => {
                  const info = route.route_info;
                  const risk = route.risk_summary;
                  const isActive = idx === activeRouteIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { setActiveRouteIndex(idx); setExpandedDetails(new Set()); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-card)',
                        border: isActive ? '2px solid var(--slate-teal)' : '1px solid var(--line)',
                        background: isActive ? 'var(--slate-teal-tint)' : 'var(--paper)',
                        color: 'var(--ink)',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        fontFamily: 'var(--font-ui)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{info.route_label}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '12px', color: 'var(--muted)', flexWrap: 'wrap' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--watch-red)' }} /> {risk.HIGH ?? 0} high
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--watch-orange)' }} /> {risk.MODERATE ?? 0} moderate
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--watch-green)' }} /> {risk.LOW ?? 0} low
                          </span>
                        </div>
                      </div>
                      {isActive && <span style={{ color: 'var(--slate-teal)', fontWeight: 700 }}>Active</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Route overview map with risk-coded segments */}
          {activeRoute && (
            <RouteOverviewMap
              route={activeRoute}
              allRoutes={routes}
              activeIndex={activeRouteIndex}
            />
          )}

          {/* Risk summary stat cards for active route */}
          {activeRoute && (
            <div style={S.card}>
              <h3 style={S.cardTitle}>Risk summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '10px' }}>
                {riskStatBoxes.map(({ key, label, fg, bg, border }) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px', borderRadius: 'var(--radius-card)', background: bg, border: `1px solid ${border}` }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 700, color: fg, fontVariantNumeric: 'tabular-nums' }}>{(activeRoute.risk_summary as any)[key] ?? 0}</span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Waypoint timeline — replaces the old table */}
          {waypoints.length > 0 && (
            <div style={S.card}>
              <h3 style={S.cardTitle}>Route timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {waypoints.map((item: WeatherPoint, i: number) => {
                  const name = item.location || item.point || item.name || `Point ${i + 1}`;
                  const cond = item.weather || item.condition || item.sky || 'n/a';
                  const temp = item.temperature ?? item.temp;
                  const risk = item.risk || item.risk_level || 'NORMAL';
                  const distance = item.distance_from_start;
                  const arrival = item.arrival_time;
                  const weatherTime = item.weather_time;
                  const humidity = item.humidity;
                  const rainProb = item.rain_probability;
                  const windSpeed = item.wind_speed;
                  const lat = item.latitude;
                  const lon = item.longitude;
                  const weatherCode = item.weather_code;

                  const timeDivergence = getTimeDivergenceNote(arrival, weatherTime);
                  const isExpanded = expandedDetails.has(i);
                  const ConditionIcon = getConditionIcon(cond);
                  const riskBorder = riskBorderColor(risk);

                  // Build technical details for disclosure
                  const techDetails: string[] = [];
                  techDetails.push(`Point: ${name}`);
                  const latNum = typeof lat === 'number' && Number.isFinite(lat) ? lat : undefined;
                  const lonNum = typeof lon === 'number' && Number.isFinite(lon) ? lon : undefined;
                  if (latNum !== undefined && lonNum !== undefined) techDetails.push(`Lat/Lon: ${latNum.toFixed(4)}, ${lonNum.toFixed(4)}`);
                  if (timeDivergence) techDetails.push(timeDivergence);
                  if (typeof weatherCode === 'number' && Number.isFinite(weatherCode)) techDetails.push(`Weather code: ${weatherCode}`);
                  if (item.precipitation !== undefined) techDetails.push(`Precipitation: ${item.precipitation} mm`);

                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '14px 16px',
                        borderBottom: i < waypoints.length - 1 ? '1px solid var(--line)' : 'none',
                        position: 'relative',
                        borderLeft: `3px solid ${riskBorder}`,
                        background: i % 2 === 0 ? 'transparent' : 'var(--mist)',
                      }}
                    >
                      {/* Main waypoint card */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        {/* Point number / distance marker */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
                          <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{fmtDistance(distance)}</span>
                        </div>

                        {/* Vertical connector line (visual only, via border-left on container) */}

                        {/* Arrival time */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '110px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-mono)' }}>{fmtArrivalTime(arrival)}</span>
                        </div>

                        {/* Condition with icon */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '160px' }}>
                          <ConditionIcon style={{ width: '18px', height: '18px', color: 'var(--slate-teal)', flexShrink: 0 }} />
                          <span style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>{cond}</span>
                        </div>

                        {/* Temperature */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '80px' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{typeof temp === 'number' ? `${Math.round(temp)}°C` : '—'}</span>
                        </div>

                        {/* Risk badge */}
                        <div style={{ marginLeft: 'auto' }}>
                          <span style={{ ...S.badge, ...riskStyle(risk) }}>{riskLabel(risk)}</span>
                        </div>
                      </div>

                      {/* Secondary stats row */}
                      <div style={{ display: 'flex', gap: '16px', marginTop: '10px', paddingLeft: '82px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--muted)' }}>
                        {humidity !== undefined && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Droplets size={12} style={{ color: 'var(--slate-teal)' }} /> {humidity}%
                          </span>
                        )}
                        {rainProb !== undefined && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CloudRain size={12} style={{ color: 'var(--slate-teal)' }} /> {rainProb}%
                          </span>
                        )}
                        {windSpeed !== undefined && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Wind size={12} style={{ color: 'var(--slate-teal)' }} /> {windSpeed} km/h
                          </span>
                        )}
                      </div>

                      {/* Technical details disclosure */}
                      {techDetails.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                          <button
                            type="button"
                            onClick={() => setExpandedDetails(prev => {
                              const next = new Set(prev);
                              if (next.has(i)) next.delete(i); else next.add(i);
                              return next;
                            })}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 10px',
                              background: 'var(--mist)',
                              border: '1px solid var(--line)',
                              borderRadius: 'var(--radius-btn)',
                              color: 'var(--ink)',
                              fontSize: '12px',
                              fontWeight: 600,
                              fontFamily: 'var(--font-ui)',
                              cursor: 'pointer',
                            }}
                          >
                            <span>Technical details</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {isExpanded && (
                            <div style={{ marginTop: '8px', padding: '10px', background: 'var(--mist)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>
                              {techDetails.join('\n')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RouteMap — Leaflet map for route overview (shared pattern with WeatherMapView)
// ─────────────────────────────────────────────────────────────────────

interface RouteMapProps {
  route: RouteData;
  allRoutes: RouteData[];
  activeIndex: number;
}

function RouteMap({ route, allRoutes, activeIndex }: RouteMapProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  /**
   * Validate the active route's shape BEFORE Leaflet is asked to mount.
   * Data problems and render problems are different failures and get
   * different messages, so the card is diagnostic on sight rather than
   * collapsing every cause into one generic error.
   */
  const routeShapeError = ((): string | null => {
    if (!route || typeof route !== 'object') return 'Route data incomplete: no active route.';
    const coords = route.map_json?.route;
    if (!Array.isArray(coords)) return 'Route data incomplete: no route geometry.';
    if (coords.length < 2) return 'Route data incomplete: route geometry is empty.';
    const bad = coords.find(
      (c) => !Array.isArray(c) || c.length < 2 || !Number.isFinite(c[0]) || !Number.isFinite(c[1]),
    );
    if (bad !== undefined) return 'Route data incomplete: malformed coordinate pair.';
    return null;
  })();

  // Map initialisation.
  //
  // The async work lives in an inner function so this effect can return a
  // SYNCHRONOUS teardown. Returning cleanup from inside an async IIFE hands
  // React a Promise instead of a function, so teardown is never registered —
  // under StrictMode's double-invoke the first map is never removed and the
  // second L.map() throws "Map container is already initialized".
  useEffect(() => {
    if (routeShapeError) return;

    let cancelled = false;
    let map: any = null;
    let ro: ResizeObserver | null = null;

    const init = async () => {
      try {
        const L = await import('leaflet');
        // Bail if this effect was torn down, or if the container vanished.
        if (cancelled || !mountRef.current) return;
        // Defensive: a stale Leaflet instance on this node means a previous
        // teardown was missed; drop it so L.map() below cannot throw.
        const stale = (mountRef.current as any)._leaflet_id;
        if (stale !== undefined) {
          delete (mountRef.current as any)._leaflet_id;
        }
        LRef.current = L;

        const coords = route.map_json!.route as number[][];
        const center: [number, number] = [coords[0][0], coords[0][1]];

        map = L.map(mountRef.current, { center, zoom: 7, scrollWheelZoom: false });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors', maxZoom: 18,
        }).addTo(map);

        mapRef.current = map;
        if (!cancelled) {
          setReady(true);
          setMapError(null);
        }

        const latLngs = coords.map((c) => L.latLng(c[0], c[1]));
        map.fitBounds(L.latLngBounds(latLngs), { padding: [20, 20] });

        // Self-heal sizing races, same as WeatherMapView.
        requestAnimationFrame(() => map.invalidateSize());
        if (typeof ResizeObserver !== 'undefined') {
          ro = new ResizeObserver(() => map.invalidateSize());
          ro.observe(mountRef.current!);
        }
      } catch (e) {
        console.error('[RouteMap] Leaflet init failed:', e);
        if (!cancelled) setMapError('Failed to load map (renderer error).');
      }
    };

    void init();

    return () => {
      cancelled = true;
      if (ro) {
        ro.disconnect();
        ro = null;
      }
      if (map) {
        map.remove();
        map = null;
      }
      mapRef.current = null;
      LRef.current = null;
      setReady(false);
    };
  }, [activeIndex, routeShapeError, route.map_json?.route]);

  // Draw route layers when map is ready and data changes
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L || !ready) return;

    // Clear existing layers (except tile layer)
    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) return;
      map.removeLayer(layer);
    });

    // Draw alternate routes (dimmed)
    allRoutes.forEach((r, idx) => {
      if (idx === activeIndex) return;
      const coords = r.map_json?.route ?? [];
      if (coords.length === 0) return;
      const latLngs = coords.map((c: number[]) => L.latLng(c[0], c[1]));
      L.polyline(latLngs, {
        color: token('--slate-teal', '#2E6E7D'),
        opacity: 0.45,
        weight: 4,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);
    });

    // Draw active route with risk-coded segments
    drawRiskCodedRoute(map, L, route);

    // Add origin/destination markers
    const coords = route.map_json?.route ?? [];
    if (coords.length > 0) {
      const origin = coords[0];
      const destination = coords[coords.length - 1];
      
      const originIcon = L.divIcon({
        className: '',
        html: '<div style="width:14px;height:14px;border-radius:50%;background:var(--slate-teal);border:2px solid var(--paper);box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>',
        iconSize: [14, 14], iconAnchor: [7, 7],
      });
      const destIcon = L.divIcon({
        className: '',
        html: '<div style="width:14px;height:14px;border-radius:50%;background:var(--watch-red);border:2px solid var(--paper);box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>',
        iconSize: [14, 14], iconAnchor: [7, 7],
      });

      L.marker(origin, { icon: originIcon, zIndexOffset: 900 }).addTo(map).bindPopup('Origin');
      L.marker(destination, { icon: destIcon, zIndexOffset: 900 }).addTo(map).bindPopup('Destination');
    }
  }, [route, allRoutes, activeIndex, ready]);

  // Data-shape failure: distinct from a renderer failure, because the fix and
  // the next debugging step are completely different.
  if (routeShapeError) {
    return (
      <div style={S.card}>
        <h3 style={S.cardTitle}>Route overview</h3>
        <div style={{ ...S.mapWrapper, height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '13px', textAlign: 'center', padding: '0 24px', lineHeight: 1.5 }}>
          {routeShapeError}
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div style={S.card}>
        <h3 style={S.cardTitle}>Route overview</h3>
        <div style={{ ...S.mapWrapper, height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '13px' }}>
          {mapError}
        </div>
      </div>
    );
  }

  // Container structure mirrors WeatherMapView: .map-view -> .map-surface -> ref div
  return (
    <div style={S.card}>
      <h3 style={S.cardTitle}>Route overview</h3>
      <div className="map-view" style={{ height: '380px', minHeight: '380px' }}>
        <div className="map-surface">
          {!ready && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--mist)', zIndex: 10, color: 'var(--muted)', fontSize: '13px' }}>
              Loading map…
            </div>
          )}
          <div ref={mountRef} className="map-leaf" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}

// Keep RouteOverviewMap as thin wrapper for API compatibility
function RouteOverviewMap({ route, allRoutes, activeIndex }: RouteMapProps) {
  return (
    <RouteMap
      route={route}
      allRoutes={allRoutes}
      activeIndex={activeIndex}
    />
  );
}

/**
 * Resolve a design token to a concrete colour value.
 *
 * Leaflet writes `stroke`/`color` into SVG *presentation attributes*, and
 * presentation attributes do NOT resolve CSS `var()` — passing "var(--x)"
 * there silently yields no colour. So tokens must be read from the computed
 * style and handed to Leaflet as literal values. Reading at draw time also
 * keeps the map correct across light/dark theme changes.
 */
function token(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function drawRiskCodedRoute(map: any, L: any, route: RouteData) {
  const coords = route.map_json?.route ?? [];
  const weatherPoints = route.map_json?.weather_points ?? [];
  if (coords.length < 2) return;

  // Build segment colors based on nearest weather point risk
  // For each segment between consecutive coordinates, find the nearest weather point
  const segments: { latLngs: [number, number][]; color: string }[] = [];

  // Resolve to literal colours: SVG presentation attributes ignore var().
  const HIGH = token('--watch-red', '#B43A1B');
  const MODERATE = token('--watch-orange', '#C97A22');
  const LOW = token('--watch-green', '#1E7A4C');

  for (let i = 0; i < coords.length - 1; i++) {
    const segStart = coords[i];
    const segEnd = coords[i + 1];
    const segMidLat = (segStart[0] + segEnd[0]) / 2;
    const segMidLon = (segStart[1] + segEnd[1]) / 2;

    // Find nearest weather point
    let nearestRisk = 'LOW';
    let minDist = Infinity;
    for (const wp of weatherPoints) {
      const wpLat = wp.lat ?? wp.latitude;
      const wpLon = wp.lon ?? wp.longitude;
      if (wpLat === undefined || wpLon === undefined) continue;
      const dLat = wpLat - segMidLat;
      const dLon = wpLon - segMidLon;
      const dist = dLat * dLat + dLon * dLon;
      if (dist < minDist) {
        minDist = dist;
        nearestRisk = wp.risk || 'LOW';
      }
    }

    const color = nearestRisk === 'HIGH' ? HIGH :
                  nearestRisk === 'MODERATE' ? MODERATE : LOW;

    segments.push({
      latLngs: [L.latLng(segStart[0], segStart[1]), L.latLng(segEnd[0], segEnd[1])],
      color,
    });
  }

  // Merge consecutive segments with same color
  const merged: { latLngs: any[]; color: string }[] = [];
  for (const seg of segments) {
    const last = merged[merged.length - 1];
    if (last && last.color === seg.color) {
      // Extend the last segment
      last.latLngs.push(seg.latLngs[1]);
    } else {
      merged.push({ latLngs: [...seg.latLngs], color: seg.color });
    }
  }

  // Draw merged segments
  for (const seg of merged) {
    L.polyline(seg.latLngs, {
      color: seg.color,
      opacity: 1,
      weight: 5,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);
  }
}

// ─────────────────────────────────────────────────────────────────────
// WeatherReportView (offline-capable)
// ─────────────────────────────────────────────────────────────────────

function WeatherReportView() {
  const { location, setLocation } = useLocation();
  const [cityInput, setCityInput] = useState('');
  const [record, setRecord] = useState<ForecastRecord | null>(() =>
    location ? loadCachedForecast(location.latitude, location.longitude) : null,
  );
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{ tone: 'error' | 'info'; text: string } | null>(null);
  /**
   * Populated only when the searched name is ambiguous ("Kochi" matches
   * Kochi Japan AND Kochi Kerala). The user picks; the app never guesses.
   */
  const [candidates, setCandidates] = useState<CityCandidate[]>([]);
  const [online, setOnline] = useState(navigator.onLine);
  const lastKeyRef = useRef('');

  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener('online', on); window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // Follows the canonical location: show the per-location offline cache, or
  // fetch the forecast for exactly these coordinates. No location → no
  // forecast and no fetch (§no-location).
  useEffect(() => {
    if (!location) {
      setRecord(null);
      lastKeyRef.current = '';
      return;
    }
    const { latitude, longitude, name } = location;
    const key = `${latitude},${longitude}`;
    const cached = loadCachedForecast(latitude, longitude);
    if (cached) {
      setRecord(cached);
      lastKeyRef.current = key;
      return;
    }
    // Never keep another place's forecast on screen while this one loads.
    if (lastKeyRef.current !== key) setRecord(null);
    lastKeyRef.current = key;
    let cancelled = false;
    setLoading(true);
    setBanner(null);
    (async () => {
      try {
        const label = name && name !== 'Selected point'
          ? name
          : await reverseGeocodeLabel(latitude, longitude);
        const r = await fetchForecastRecord({ latitude, longitude, name: label });
        if (!cancelled) { saveForecast(r, latitude, longitude); setRecord(r); }
      } catch {
        if (!cancelled) setBanner({ tone: 'error', text: 'Weather data unavailable for this location.' });
      } finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [location]);

  const search = async (override?: string) => {
    const city = (override ?? cityInput).trim();
    if (!city) { setBanner({ tone: 'error', text: 'Enter a city.' }); return; }
    if (!online) {
      if (record) setBanner({ tone: 'info', text: 'Offline. Showing cached forecast.' });
      else setBanner({ tone: 'error', text: 'Offline and no cached forecast.' });
      return;
    }
    setLoading(true); setBanner(null);
    try {
      const candidates = await geocodeCityCandidates(city);

      // An ambiguous name is never resolved silently. Picking the top hit is
      // exactly the defect this guards against: "Kochi" would land on Kochi
      // Japan while the user meant Kochi, Kerala, and an IMD warning for Kerala
      // would be rendered above Japanese weather. The user chooses instead.
      if (isAmbiguousName(city, candidates)) {
        setCandidates(candidates.filter((c) => c.name.toLowerCase() === city.split(',')[0].trim().toLowerCase()));
        setLoading(false);
        return;
      }

      const place = await resolveDistrict(candidates[0]);
      // Search selects the canonical location: every location-aware feature
      // (map, radar, warnings, chat context) now follows the searched city.
      // The stored name is QUALIFIED with region + country so no downstream
      // surface can present an ambiguous name unqualified again, and the
      // district is stored SEPARATELY for warning bulletins.
      setLocation({
        latitude: place.latitude,
        longitude: place.longitude,
        name: qualifiedName(place),
        country: place.country,
        region: place.region,
        district: place.district,
        source: 'search',
      });
      setCandidates([]);
      setCityInput('');
      setLoading(false); // same-coords search won't re-trigger the location effect
    } catch (e: any) {
      setCandidates([]);
      if (record) setBanner({ tone: 'info', text: `${e.message} Showing cached forecast.` });
      else setBanner({ tone: 'error', text: e.message });
      setLoading(false);
    }
  };

  /** Apply a candidate the user picked from the disambiguation list. */
  const chooseCandidate = async (c: CityCandidate) => {
    const place = await resolveDistrict(c);
    setLocation({
      latitude: place.latitude,
      longitude: place.longitude,
      name: qualifiedName(place),
      country: place.country,
      region: place.region,
      district: place.district,
      source: 'search',
    });
    setCandidates([]);
    setCityInput('');
    setLoading(false);
  };

  const fmtTime = (t: string) => new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const fmtDay = (t: string) => new Date(t).toLocaleDateString([], { weekday: 'long' });

  /**
   * P3-016: a saved report's timestamp, in the app's existing format
   * ("05:30 IST, 23 Sep" — the same shape used for advisory issue times).
   *
   * `toLocaleString()` was previously used with no options, which emitted
   * locale-dependent output including seconds ("9/28/2026, 6:39:02 AM"). The
   * stored value is an ISO-8601 string, so anything that fell through to
   * rendering it directly would also expose the raw format and, on some
   * backends, microsecond precision. This never emits the raw string.
   */
  const fmtSavedAt = (iso: string): string => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return 'an unknown time';
    try {
      const time = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata',
      }).format(d);
      const day = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata',
      }).format(d);
      return `${time} IST, ${day}`;
    } catch {
      // Older engine without full ICU: still human-readable, never ISO.
      return d.toLocaleString();
    }
  };

  return (
    <div style={S.card}>
      <header>
        <h1 style={P.h1}>Weather report</h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Search any city. Forecast is cached for offline use.</p>
      </header>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: 'var(--radius-btn)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--line)', color: online ? 'var(--slate-teal)' : 'var(--muted)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: online ? 'var(--slate-teal)' : 'var(--muted)' }} />
          {online ? 'Online' : 'Offline'}
        </span>
        {/* A placeholder is not an accessible name — it disappears on input and
            is announced inconsistently — so the field carries a real, visually
            hidden label. Matches the pattern the Route form already uses for
            Origin / Destination. */}
        <label className="sr-only" htmlFor="report-city-input">City to look up</label>
        <input id="report-city-input" style={{ ...S.input, flex: 1, minWidth: '180px' }} type="text" value={cityInput}
          aria-expanded={candidates.length > 0}
          aria-controls={candidates.length > 0 ? 'report-city-candidates' : undefined}
          onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="Enter a city" />
        <button onClick={() => search()} disabled={loading}
          style={S.btn}>
          {loading ? 'Loading…' : 'Get weather'}
        </button>
      </div>

      {banner && <div style={banner.tone === 'error' ? S.error : S.successBanner}>{banner.text}</div>}

      {/* Ambiguous name — the user chooses the place. Each option is labelled
          with its region and country so the choice is unambiguous, and each
          exposes its coordinates to assistive tech. */}
      {candidates.length > 0 && (
        <div id="report-city-candidates" role="group" aria-label="Choose a location" style={{ ...S.card, marginTop: '10px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--muted)' }}>
            More than one place is called that. Pick the one you mean.
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>
            {candidates.map((c, i) => (
              <li key={`${c.latitude},${c.longitude},${i}`}>
                <button
                  type="button"
                  onClick={() => chooseCandidate(c)}
                  style={{ ...S.btn, width: '100%', justifyContent: 'flex-start', textAlign: 'left' }}
                >
                  <span>
                    {qualifiedName(c)}
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                      {c.latitude.toFixed(2)}, {c.longitude.toFixed(2)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!record && !loading && (
        <div style={S.card}><p style={{ margin: 0, color: 'var(--muted)', fontSize: '13px' }}>Search a city to load a forecast.</p></div>
      )}

      {record && (<>
        <div style={S.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ ...S.cardTitle, marginBottom: 2 }}>{record.location.name}{record.location.country ? `, ${record.location.country}` : ''}</h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Updated {fmtSavedAt(record.savedAt)}</p>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-teal)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(record.hourly24h.temperature[0])}°C</div>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--ink)' }}>
            <span>{wmoDesc(record.hourly24h.weatherCode[0])}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Droplets size={14} style={{ color: 'var(--slate-teal)' }} /> {record.hourly24h.humidity[0]}%</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Wind size={14} style={{ color: 'var(--slate-teal)' }} /> {record.hourly24h.wind[0]} km/h</span>
          </div>
        </div>

        <div style={S.card}>
          <h3 style={S.cardTitle}>24-hour forecast</h3>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {record.hourly24h.time.map((t, i) => (
              <div key={t} style={{ flex: '0 0 auto', minWidth: '108px', padding: '12px', borderRadius: 'var(--radius-card)', background: 'var(--mist)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '11px', color: 'var(--slate-teal)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{fmtTime(t)}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(record.hourly24h.temperature[i])}°C</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{wmoDesc(record.hourly24h.weatherCode[i])}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Droplets size={12} /> {record.hourly24h.humidity[i]}%</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><CloudRain size={12} /> {record.hourly24h.precipitationProbability[i]}%</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Wind size={12} /> {record.hourly24h.wind[i]} km/h</div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <h3 style={S.cardTitle}>7-day forecast</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '10px' }}>
            {record.daily7days.time.map((t, i) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px', borderRadius: 'var(--radius-card)', background: 'var(--mist)', border: '1px solid var(--line)' }}>
                <strong style={{ color: 'var(--ink)', fontSize: '13px' }}>{fmtDay(t)}</strong>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{wmoDesc(record.daily7days.weatherCode[i])}</span>
                <span style={{ fontSize: '12px', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '4px' }}><Thermometer size={12} style={{ color: 'var(--slate-teal)' }} /> {Math.round(record.daily7days.maxTemperature[i])}° / {Math.round(record.daily7days.minTemperature[i])}°</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><CloudRain size={12} /> {record.daily7days.precipitationProbability[i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </>)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// NoLocation — shared "no location selected" state for every page that
// depends on the canonical location. Rendered instead of the page content
// (and instead of any fetch) whenever location === null (§no-location).
// ─────────────────────────────────────────────────────────────────────

function NoLocation({ feature }: { feature: string }) {
  return (
    <div style={P.panel} className="page-panel">
      <header>
        <h1 style={P.h1}>{feature}</h1>
      </header>
      <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--muted)' }}>
        <MapPin size={30} style={{ margin: '0 auto 12px', opacity: 0.6 }} />
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>No location selected</p>
        <p style={{ margin: '8px auto 0', fontSize: '13px', maxWidth: '48ch', lineHeight: 1.6 }}>
          Choose where to check the weather — enable GPS from the pill, search a city on the
          Weather report page, or tap the Weather map. Until a location exists, no weather
          data is requested.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Root App component — chat-first layout
// ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // ── Navigation: chat is the primary view; rail/drawer hold the rest ──
  const [activePage, setActivePage] = useState<NavPage | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /**
   * P3-013: lock body scroll while the mobile drawer is open.
   *
   * The drawer is a full-height overlay, but the page behind it still scrolled
   * on touch, so dragging inside the drawer could move the content underneath
   * and leave the drawer visually detached from what the user was reading.
   *
   * The previous inline `overflow` value is captured and restored, so this
   * composes with any other code that also manages body overflow instead of
   * blindly overwriting it.
   */
  useEffect(() => {
    if (!drawerOpen) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  // ── Chat language: feeds the header toggle AND the AI chat's
  // placeholder/voice locale (the chat itself lives in AIChatWorkspace).
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('en');
  // One canonical selected location: the header pill, GPS, search, map taps
  // and every data fetch all read/write this single state. The AI chat
  // (AIChatWorkspace) consumes the same state and posts the current
  // coordinates with every /agent request. `location === null` means "no
  // location yet" — every data page below treats it as "no requests".
  const {
    location,
    locationKey,
    state: locationState,
    requestGpsLocation,
  } = useLocation();

  // ── Java-backend data state (rail/drawer pages) ──
  // Every data page carries explicit loading/error state so a failed request
  // surfaces an error + Retry instead of leaving "Loading…" forever.
  const [forecastList, setForecastList] = useState<any[]>([]);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);
  const [nwpComparison, setNwpComparison] = useState<any>(null);
  const [nwpLoading, setNwpLoading] = useState(false);
  const [nwpError, setNwpError] = useState<string | null>(null);
  const [sectorAdvisory, setSectorAdvisory] = useState<any>(null);
  const [activeSector, setActiveSector] = useState<'agriculture' | 'aviation' | 'marine' | 'urban'>('agriculture');
  const [sectorLoading, setSectorLoading] = useState(false);
  const [sectorError, setSectorError] = useState<string | null>(null);
  const [alertsList, setAlertsList] = useState<any[]>([]);
  const [climateInfo, setClimateInfo] = useState<any>(null);
  const [climateLoading, setClimateLoading] = useState(false);
  const [climateError, setClimateError] = useState<string | null>(null);

  // ── Geolocation lives in the location store ──
  // The provider owns the GPS request lifecycle (requesting-gps → selected /
  // denied / error), the mount-time auto-fill and the reverse-geocode name
  // fill. The header pill below calls requestGpsLocation (explicit intent —
  // it always refreshes, and a failure never discards an existing selection).

  // Location change: drop stale page data and any stale loading/error state
  // so every page re-queries against the new coordinates (§23). Runs for any
  // locationKey transition, including null → coords and coords → null.
  useEffect(() => {
    setForecastList([]);
    setForecastLoading(false);
    setForecastError(null);
    setNwpComparison(null);
    setNwpLoading(false);
    setNwpError(null);
    setClimateInfo(null);
    setClimateLoading(false);
    setClimateError(null);
    setSectorAdvisory(null);
    setSectorLoading(false);
    setSectorError(null);
    setAlertsList([]);
  }, [locationKey]);

  // ── Data fetch for the rail/drawer pages ──
  // Lazy: each page fetches when first shown. There is deliberately NO
  // "already loaded" marker: a failed request must be retryable, and a
  // location change must trigger a fresh request for the new place.
  // No location → NO request (§no-location).
  useEffect(() => {
    if (!activePage || !location) return;
    const ctrl = new AbortController();
    const { signal } = ctrl;
    if (activePage === 'forecast') void fetchWeather(location, signal);
    if (activePage === 'nwp') void fetchNwp(location, signal);
    if (activePage === 'climate') void fetchClimate(location, signal);
    if (activePage === 'sectors') void fetchSector(location, activeSector, signal);
    return () => ctrl.abort();
  }, [activePage, location, locationKey, activeSector]);

  // Retry a failed page fetch with a fresh request (never blocked by stale
  // state). The controller is abandoned on navigation, which is harmless.
  const retryFetch = (kind: 'forecast' | 'nwp' | 'climate' | 'sector') => {
    if (!location) return;
    const ctrl = new AbortController();
    const { signal } = ctrl;
    if (kind === 'forecast') void fetchWeather(location, signal);
    else if (kind === 'nwp') void fetchNwp(location, signal);
    else if (kind === 'climate') void fetchClimate(location, signal);
    else if (kind === 'sector') void fetchSector(location, activeSector, signal);
  };

  // Alerts are always fetched — the warning bulletin above the chat needs them.
  // No location → no request, and any previous alerts are dropped so a stale
  // warning can never appear under a "no location" header (§no-location).
  useEffect(() => {
    if (!location) {
      setAlertsList([]);
      return;
    }
    const ctrl = new AbortController();
    void fetchAlerts(location, ctrl.signal);
    return () => ctrl.abort();
  }, [location]);

  const fetchWeather = async (
    loc: SelectedLocation,
    signal: AbortSignal,
  ) => {
    setForecastLoading(true);
    setForecastError(null);
    const url = WEATHER_ENDPOINTS.FORECAST(loc.name, 7, toWeatherQuery(loc));
    try {
      const f = await fetchWithDiagnostics(url, { signal });
      // Read the raw body once so error diagnostics and JSON parsing share it
      // (the backend may answer 5xx with a non-JSON error page).
      const responseText = await f.text();
      if (!f.ok) {
        const apiMessage = readApiResponseMessage(responseText);
        throw new FetchDiagnosticError({
          kind: 'http',
          url,
          status: f.status,
          statusText: f.statusText,
          bodyText: truncateForDiagnostics(responseText),
          message:
            apiMessage ?? `HTTP ${f.status}${f.statusText ? ' ' + f.statusText : ''}`,
        });
      }
      let fd: any;
      try {
        fd = JSON.parse(responseText);
      } catch {
        throw new FetchDiagnosticError({
          kind: 'invalid-response',
          url,
          bodyText: truncateForDiagnostics(responseText),
          message: 'Weather service returned an unreadable response.',
        });
      }
      if (!fd?.success) throw new FetchDiagnosticError({
        kind: 'invalid-response',
        url,
        bodyText: truncateForDiagnostics(responseText),
        message: fd?.message ?? 'Backend returned success:false',
      });
      if (!Array.isArray(fd.data?.days) || fd.data.days.length === 0) throw new FetchDiagnosticError({
        kind: 'invalid-response',
        url,
        bodyText: truncateForDiagnostics(responseText),
        message: 'No forecast days returned',
      });
      setForecastList(fd.data.days);
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return;
      const diagnostic = e instanceof FetchDiagnosticError ? e : null;
      console.error('[Forecast] request failed', {
        url,
        kind: diagnostic?.kind ?? 'unknown',
        status: diagnostic?.status,
        statusText: diagnostic?.statusText,
        bodyText: diagnostic?.bodyText,
        cause: diagnostic?.cause ?? e,
      });
      setForecastError(
        diagnostic
          ? diagnostic.toDisplayMessage()
          : e instanceof Error
            ? e.message
            : String(e),
      );
    } finally {
      if (!signal.aborted) setForecastLoading(false);
    }
  };
  const fetchNwp = async (loc: SelectedLocation, signal: AbortSignal) => {
    setNwpLoading(true);
    setNwpError(null);
    try {
      const url = WEATHER_ENDPOINTS.NWP(loc.name, toWeatherQuery(loc));
      const r = await fetch(url, { signal });
      if (!r.ok) throw new Error(await describeHttpError(r));
      const d = await r.json();
      if (!d?.success) throw new Error(d?.message ?? 'Backend returned success:false');
      const data = d?.data;
      if (!data) throw new Error('Backend returned no data object');
      if (!Array.isArray(data.models)) throw new Error('Unexpected response shape: models[] is missing');
      setNwpComparison(data);
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return;
      console.warn('[NWP] request failed:', e);
      setNwpError(e instanceof Error ? e.message : String(e));
    } finally {
      if (!signal.aborted) setNwpLoading(false);
    }
  };
  const fetchSector = async (
    loc: SelectedLocation,
    sector: string,
    signal: AbortSignal,
  ) => {
    setSectorLoading(true);
    setSectorError(null);
    try {
      const r = await fetch(ADVISORIES_ENDPOINT(loc.name, sector, toWeatherQuery(loc)), { signal });
      if (!r.ok) throw new Error(await describeHttpError(r));
      const d = await r.json();
      if (!d?.success) throw new Error(d?.message ?? 'Backend returned success:false');
      if (!d?.data) throw new Error('Backend returned no data object');
      setSectorAdvisory(d.data);
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return;
      console.warn('[Sector] request failed:', e);
      setSectorError(e instanceof Error ? e.message : String(e));
    } finally {
      if (!signal.aborted) setSectorLoading(false);
    }
  };
  /**
   * IMD early warnings — INDIA ONLY.
   *
   * IMD publishes warnings for Indian districts. Requesting them for a
   * foreign coordinate returns an Indian warning that then renders above that
   * country's forecast under the user's chosen place name, which is both
   * wrong and alarming. The resolved country is the gate: a non-India location
   * makes ZERO requests here and shows an explicit no-coverage state instead.
   */
  const fetchAlerts = async (
    loc: SelectedLocation,
    signal: AbortSignal,
  ) => {
    if (!isInIndia(loc)) {
      setAlertsList([]);
      return;
    }
    // P3-014: a restored location is a prior choice, not evidence of where the
    // user is now. IMD warnings describe conditions at a place, so presenting
    // them against a remembered location without that caveat would assert
    // something about the user's current situation that we cannot support. The
    // bulletin is withheld until a live fix or explicit choice replaces it.
    if (locationState.status === 'restored') {
      setAlertsList([]);
      return;
    }
    try {
      const r = await fetch(ALERTS_ENDPOINT(loc.name, toWeatherQuery(loc)), { signal });
      if (!r.ok) throw new Error(await describeHttpError(r));
      const d = await r.json();
      if (d?.success && Array.isArray(d.data?.alerts)) setAlertsList(d.data.alerts);
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return;
      console.warn('[Alerts] request failed:', e);
      // No blocking UI state: an absent warning bulletin is the safe default.
    }
  };
  const fetchClimate = async (
    loc: SelectedLocation,
    signal: AbortSignal,
  ) => {
    setClimateLoading(true);
    setClimateError(null);
    try {
      const url = CLIMATE_ENDPOINT(loc.name, 2015, 2024, toWeatherQuery(loc));
      const r = await fetch(url, { signal });
      if (!r.ok) throw new Error(await describeHttpError(r));
      const d = await r.json();
      if (!d?.success) throw new Error(d?.message ?? 'Backend returned success:false');
      if (!d?.data) throw new Error('Backend returned no data object');
      setClimateInfo(d.data);
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return;
      console.warn('[Climate] request failed:', e);
      setClimateError(e instanceof Error ? e.message : String(e));
    } finally {
      if (!signal.aborted) setClimateLoading(false);
    }
  };

  // ── Active IMD warning (bulletin overrides routine answers structurally) ──
  // No location → alerts are empty and no bulletin can be constructed; a
  // location-less demo preview still renders the canned demo warning (dev only).
  const activeWarning = useMemo<ImdWarning | null>(() => {
    if (IS_DEMO) return DEMO_WARNING;
    if (!location || !alertsList.length) return null;
    const a = alertsList[0];
    const text = a.description || a.warning || a.message || '';
    if (!text) return null;
    return {
      /**
       * The RESOLVED district, never the display name. `name` may be
       * "Kochi, Kerala, India" or "Selected point", and appending "district"
       * to those produced labels like "Kochi, Kerala, India district" — a
       * category error on a safety banner. Falls back to the location's own
       * name only when reverse geocoding genuinely resolved no district.
       */
      district: location.district
        ? `${location.district} district`
        : undefined,
      severity: severityOf(a),
      title: a.title || undefined,
      text,
      issuedAt: a.issuedAt ?? a.issueTime ?? a.issued ?? undefined,
    };
  }, [alertsList, location]);

  /**
   * True when a location is outside India and IMD simply has nothing for it.
   * Distinct from "no warning is active" (green) — the product says so plainly
   * rather than implying an all-clear.
   */
  const imdOutOfScope = !!location && !isInIndia(location);

  const handleNavigate = (page: NavPage) => {
    setActivePage(page);
    setDrawerOpen(false);
  };

  const navigateHome = () => {
    setActivePage(null);
    setDrawerOpen(false);
  };

  /**
   * P2-007: the location pill must never be a dead control.
   *
   * A pill that only re-requests GPS is useless in the one case where a user
   * most needs it. Per the geolocation spec, once permission is DENIED the
   * browser will not prompt again, so calling getCurrentPosition repeats the
   * same failure forever and the pill appears to do nothing. In that state the
   * only route forward is manual entry, so the pill takes the user to the
   * search field. For a transient failure (position unavailable, timeout) a
   * retry is genuinely worth attempting, so that is what it does.
   */
  const handleLocationPill = () => {
    if (locationState.status === 'denied') {
      handleNavigate('report');
      return;
    }
    requestGpsLocation();
  };

  // ── Render ──
  const onChat = activePage === null;

  const SECTOR_LIST: { id: 'agriculture' | 'aviation' | 'marine' | 'urban'; label: string; icon: typeof Sprout }[] = [
    { id: 'agriculture', label: 'Agriculture', icon: Sprout },
    { id: 'aviation', label: 'Aviation', icon: Plane },
    { id: 'marine', label: 'Marine', icon: Anchor },
    { id: 'urban', label: 'Smart City', icon: Building2 },
  ];

  const climateMetrics = [
    { label: 'Warming rate', value: `+${climateInfo?.warmingRatePerDecade}°C`, sub: 'per decade', icon: Flame },
    { label: 'Baseline mean', value: `${climateInfo?.baselineMeanTemperature}°C`, sub: '30-year normal', icon: Thermometer },
    { label: 'Annual rain', value: `${climateInfo?.baselineAnnualPrecipitation} mm`, sub: 'per year', icon: Droplets },
  ] as const;

  return (
    <div className="app">
      <IconRail activePage={activePage} onNavigate={handleNavigate} onGoHome={navigateHome} />

      <div className="main">
        <AppHeader
          locationName={location?.name ?? null}
          locationStatus={locationState.status}
          lang={selectedLang}
          onLanguageChange={setSelectedLang}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLocationClick={handleLocationPill}
          drawerOpen={drawerOpen}
          onToggleDrawer={() => setDrawerOpen(v => !v)}
        />

        <WarningBulletin warning={activeWarning} outOfScope={imdOutOfScope} />

        {onChat ? (
          <AIChatWorkspace lang={selectedLang} />
        ) : (
          <main className="page-view" aria-label={NAV_LABELS[activePage] ?? activePage}>
            <div className="page-view-inner">
              {activePage === 'forecast' && (location ? (
                <div style={P.panel} className="page-panel">
                  <header>
                    <h1 style={P.h1}>7-Day Forecast for {location.name}</h1>
                  </header>
                  {forecastError && forecastList.length === 0 ? (
                    <div style={S.error} role="alert">
                      <p style={{ margin: 0, fontWeight: 600 }}>Unable to load the forecast.</p>
                      <p style={{ margin: '6px 0 0', fontSize: '12.5px' }}>{forecastError}</p>
                      <button type="button" style={{ ...S.btn, marginTop: '10px' }} onClick={() => retryFetch('forecast')}>Retry</button>
                    </div>
                  ) : forecastList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }} aria-busy={forecastLoading}>Loading forecast…</div>
                  ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: '10px' }}>
                    {forecastList.map((day: any, i: number) => (
                      <div key={i} style={P.metaCard}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--slate-teal)' }}>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : day.date}</div>
                        <div style={{ fontSize: '17px', fontWeight: 800, margin: '6px 0', fontVariantNumeric: 'tabular-nums' }}>{Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{day.weatherDescription}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--ink)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <CloudRain size={12} style={{ color: 'var(--slate-teal)' }} /> {day.precipitationProbabilityMax}%
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              ) : (
                <NoLocation feature="7-Day Forecast" />
              ))}

              {activePage === 'nwp' && (location ? (
                <>
                  {nwpComparison && nwpComparison.models.length > 0 && (
                    <div style={P.panel} className="page-panel">
                      <header>
                        <h1 style={P.h1}>NWP Multi-Model Ensemble for {location.name}</h1>
                      </header>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ ...S.badge, background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' }}>
                          Consensus: {nwpComparison.consensus?.consensusScorePercentage}% ({nwpComparison.consensus?.confidenceLevel})
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>{nwpComparison.consensus?.synopticSummary}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '10px' }}>
                        {nwpComparison.models?.map((m: any, i: number) => (
                          <div key={i} style={P.metaCard}>
                            <strong style={{ color: 'var(--slate-teal)' }}>{m.modelName}</strong> <span style={{ color: 'var(--muted)', fontSize: '12px' }}>({m.resolution})</span>
                            <div style={{ fontSize: '12.5px', margin: '4px 0', color: 'var(--ink)' }}>
                              Max <b style={{ fontVariantNumeric: 'tabular-nums' }}>{m.maxTemp}°C</b> · Min <b style={{ fontVariantNumeric: 'tabular-nums' }}>{m.minTemp}°C</b>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Rain: {m.totalPrecipitation} mm · Wind: {m.maxWindSpeed} km/h</div>
                            <div style={{ fontSize: '11.5px', color: 'var(--slate-teal)', marginTop: '4px' }}>{m.synopticCondition}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {nwpComparison && nwpComparison.models.length === 0 && (
                    <div style={P.panel} className="page-panel">
                      <header>
                        <h1 style={P.h1}>NWP Multi-Model Ensemble for {location.name}</h1>
                      </header>
                      <p style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)', margin: 0 }}>
                        No NWP model data is currently available.
                      </p>
                    </div>
                  )}

                  {nwpError && !nwpComparison && (
                    <div style={P.panel} className="page-panel">
                      <header>
                        <h1 style={P.h1}>NWP Multi-Model Ensemble for {location.name}</h1>
                      </header>
                      <div style={S.error} role="alert">
                        <p style={{ margin: 0, fontWeight: 600 }}>Unable to load NWP models.</p>
                        <p style={{ margin: '6px 0 0', fontSize: '12.5px' }}>The weather-model service did not return usable data ({nwpError}).</p>
                        <button type="button" style={{ ...S.btn, marginTop: '10px' }} onClick={() => retryFetch('nwp')}>Retry</button>
                      </div>
                    </div>
                  )}

                  {!nwpComparison && !nwpError && (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }} aria-busy={nwpLoading}>Loading NWP models…</div>
                  )}
                </>
              ) : (
                <NoLocation feature="NWP models" />
              ))}

              {activePage === 'sectors' && (location ? (
                <div style={P.panel} className="page-panel">
                  <header>
                    <h1 style={P.h1}>Sector advisories for {location.name}</h1>
                  </header>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {SECTOR_LIST.map(({ id, label, icon: Icon }) => (
                      <button key={id} type="button" onClick={() => setActiveSector(id)} aria-pressed={activeSector === id}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '7px',
                          background: activeSector === id ? 'var(--slate-teal-tint)' : 'var(--paper)',
                          color: activeSector === id ? 'var(--slate-teal)' : 'var(--muted)',
                          border: `1px solid ${activeSector === id ? 'var(--slate-teal)' : 'var(--line)'}`,
                          padding: '6px 14px', borderRadius: 'var(--radius-btn)', cursor: 'pointer',
                          fontSize: '12.5px', fontWeight: 600, fontFamily: 'var(--font-ui)',
                        }}>
                        <Icon size={15} /> {label}
                      </button>
                    ))}
                  </div>
                  {sectorError && !sectorAdvisory ? (
                    <div style={S.error} role="alert">
                      <p style={{ margin: 0, fontWeight: 600 }}>Unable to load {activeSector} advisory.</p>
                      <p style={{ margin: '6px 0 0', fontSize: '12.5px' }}>{sectorError}</p>
                      <button type="button" style={{ ...S.btn, marginTop: '10px' }} onClick={() => retryFetch('sector')}>Retry</button>
                    </div>
                  ) : sectorLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>Loading {activeSector} advisory…</div>
                  ) : (<>
                    {activeSector === 'agriculture' && sectorAdvisory?.agriculture && (
                      <div className="sector-cards" style={{ fontSize: '13px', lineHeight: '1.7' }}>
                        {[
                          { icon: Sprout, title: 'Sowing advice', text: sectorAdvisory.agriculture.sowingAdvisory, accent: 'var(--slate-teal)', border: 'var(--slate-teal)' },
                          { icon: Droplets, title: 'Irrigation', text: sectorAdvisory.agriculture.irrigationRecommendation, accent: 'var(--slate-teal)', border: 'var(--slate-teal)' },
                          { icon: SprayCan, title: 'Spraying window', text: sectorAdvisory.agriculture.sprayingWindow, accent: 'var(--brass)', border: 'var(--brass)' },
                        ].map(({ icon: Icon, title, text, accent, border }) => (
                          <div key={title} style={{ background: 'var(--mist)', border: `1px solid ${border}`, padding: '12px', borderRadius: 'var(--radius-card)' }}>
                            <p style={{ margin: '0 0 4px', fontWeight: 600, color: accent, display: 'flex', alignItems: 'center', gap: '7px' }}>
                              <Icon size={15} /> {title}
                            </p>
                            <p style={{ margin: 0, color: 'var(--ink)' }}>{text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeSector === 'aviation' && sectorAdvisory?.aviation && (
                      <div className="sector-cards" style={{ fontSize: '13px', lineHeight: '1.7' }}>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <Plane size={15} /> Flight category
                          </p>
                          <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>{sectorAdvisory.aviation.flightCategory}</p>
                        </div>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: 0, color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{sectorAdvisory.aviation.metarCode}</p>
                        </div>
                      </div>
                    )}
                    {activeSector === 'marine' && sectorAdvisory?.marine && (
                      <div className="sector-cards" style={{ fontSize: '13px', lineHeight: '1.7' }}>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <Anchor size={15} /> Fishermen directive
                          </p>
                          <p style={{ margin: 0, color: 'var(--ink)' }}>{sectorAdvisory.marine.fishermenAction}</p>
                        </div>
                      </div>
                    )}
                    {activeSector === 'urban' && sectorAdvisory?.smartCity && (
                      <div className="sector-cards" style={{ fontSize: '13px', lineHeight: '1.7' }}>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <Waves size={15} /> Flood risk
                          </p>
                          <p style={{ margin: 0, color: 'var(--ink)' }}>{sectorAdvisory.smartCity.waterloggingFloodRisk}</p>
                        </div>
                      </div>
                    )}
                  </>)}
                </div>
              ) : (
                <NoLocation feature="Sector advisories" />
              ))}

              {activePage === 'alerts' && (location ? (
                <div style={P.panel} className="page-panel">
                  <header>
                    <h1 style={P.h1}>
                      {imdOutOfScope
                        ? 'Weather warnings'
                        : `IMD colour-coded early warnings for ${location.name}`}
                    </h1>
                  </header>
                  {/* Out of IMD's jurisdiction. "IMD Green" would assert that
                      IMD surveyed this place and found nothing — a claim IMD
                      makes nowhere outside India. Say what is actually true. */}
                  {imdOutOfScope ? (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                      <ShieldOff size={36} style={{ margin: '0 auto 8px' }} />
                      <p style={{ margin: 0 }}><strong>No IMD warning coverage for this location</strong></p>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        The India Meteorological Department issues warnings for districts in India,
                        so no warning status is available for {location.name}.
                      </span>
                    </div>
                  ) : alertsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--watch-green)' }}>
                      <CheckCircle size={36} style={{ margin: '0 auto 8px' }} />
                      <p style={{ margin: 0 }}><strong>IMD Green: normal weather conditions</strong></p>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>No severe weather warnings for {location.name}.</span>
                    </div>
                  ) : alertsList.map((a: any) => (
                    <div key={a.id} style={{ background: 'var(--mist)', borderLeft: `4px solid ${tierBorder(severityOf(a))}`, padding: '11px 14px', borderRadius: 'var(--radius-chip)', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', marginBottom: '4px', alignItems: 'center' }}>
                        <span style={{ ...S.badge, ...tierBadge(severityOf(a)) }}>{a.severity ?? 'Warning'}</span>
                        {a.informationClass && <span style={{ color: 'var(--muted)' }}>{a.informationClass}</span>}
                      </div>
                      <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>{a.title}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--ink)', maxWidth: '78ch' }}>{a.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <NoLocation feature="Alerts & history" />
              ))}

              {activePage === 'climate' && (location ? (
                <div style={P.panel} className="page-panel">
                  <header>
                    <h1 style={P.h1}>Climate analysis for {location.name}</h1>
                  </header>
                  {climateError && !climateInfo ? (
                    <div style={S.error} role="alert">
                      <p style={{ margin: 0, fontWeight: 600 }}>Unable to load climate data.</p>
                      <p style={{ margin: '6px 0 0', fontSize: '12.5px' }}>{climateError}</p>
                      <button type="button" style={{ ...S.btn, marginTop: '10px' }} onClick={() => retryFetch('climate')}>Retry</button>
                    </div>
                  ) : !climateInfo ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }} aria-busy={climateLoading}>
                      <p style={{ margin: 0 }}>Loading climate data for <strong>{location.name}</strong>…</p>
                    </div>
                  ) : (<>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '10px' }}>
                      {climateMetrics.map(({ label, value, sub, icon: Icon }) => (
                        <div key={label} style={P.metaCard}>
                          <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Icon size={13} style={{ color: 'var(--slate-teal)' }} /> {label}
                          </div>
                          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
                          <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                    {climateInfo.yearlyMetrics?.length > 0 && (
                      <div style={P.metaCard}>
                        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <TrendingUp size={15} style={{ color: 'var(--slate-teal)' }} /> Year-by-year temperature
                        </p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px', overflowX: 'auto', paddingBottom: '4px' }}>
                          {climateInfo.yearlyMetrics.map((ym: any, i: number) => {
                            const temps = climateInfo.yearlyMetrics.map((y: any) => y.meanTemperature || 0);
                            const mn = Math.min(...temps), mx = Math.max(...temps), rng = mx - mn || 1;
                            const h = Math.max(8, ((ym.meanTemperature - mn) / rng) * 64 + 8);
                            const warm = ym.meanTemperature > (mn + mx) / 2;
                            return (
                              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', minWidth: '32px' }}>
                                <div title={`${ym.year}: ${ym.meanTemperature}°C`}
                                  style={{ width: '20px', height: `${h}px`, background: warm ? 'var(--slate-teal)' : 'var(--line)', borderRadius: '3px 3px 0 0' }} />
                                <span style={{ fontSize: '9px', color: 'var(--muted)', writingMode: 'vertical-rl' }}>{ym.year}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div style={{ ...P.metaCard, padding: 0, overflow: 'hidden' }}>
                      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <MapIcon size={15} style={{ color: 'var(--slate-teal)' }} /> Location map for {location.name}
                      </div>
                      <ClimateMapEmbed lat={location.latitude} lon={location.longitude} label={location.name} />
                    </div>
                  </>)}
                </div>
              ) : (
                <NoLocation feature="Climate analysis" />
              ))}

              {activePage === 'route' && <RouteWeatherView />}
              {activePage === 'report' && <WeatherReportView />}
              {activePage === 'map' && <WeatherMapView />}
              {activePage === 'radar' && <WeatherRadarView />}
            </div>
          </main>
        )}

        <footer className="app-footer" aria-label="Site links">
          <span>© 2026 WeatherGPT</span>
          <span className="app-footer-links">
            <a href="/privacy.html">Privacy Policy</a>
            <span className="app-footer-sep" aria-hidden="true">·</span>
            <a href="/terms.html">Terms of Use</a>
          </span>
          <span className="app-footer-src">Weather data: Open-Meteo · IMD warnings · Map tiles: OpenStreetMap</span>
        </footer>
      </div>

      <MobileDrawer
        open={drawerOpen}
        activePage={activePage}
        onNavigate={handleNavigate}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

const NAV_LABELS: Record<NavPage, string> = {
  forecast: 'Forecast',
  nwp: 'NWP models',
  sectors: 'Sectors',
  alerts: 'Alerts & history',
  climate: 'Climate',
  route: 'Route weather',
  report: 'Weather report',
  map: 'Weather map',
  radar: 'Radar',
};