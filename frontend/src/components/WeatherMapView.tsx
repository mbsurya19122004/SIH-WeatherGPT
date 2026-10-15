import { CloudRain, Map as MapIcon, MapPin, Thermometer, Wind, Activity } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';
import { reverseGeocode, useLocation } from '../location/LocationContext';
import { WeatherField } from './weatherField';
import {
  GridResult,
  MEANINGFUL_RAIN,
  NEUTRAL_MAP_VIEWPORT,
  NEUTRAL_MAP_ZOOM,
  OSM_TILE_ATTR,
  OSM_TILE_URL,
  PointWeather,
  compass,
  fetchGrid,
  fetchPointWeather,
  fieldGradient,
  windColor,
  windStyle,
} from './mapData';
import { buildWindStreamlines, type Streamline } from './windStreamlines';
import {
  buildPressureLayer,
  pressureWashColor,
  type PressureLayer,
} from './pressureLayer';

const QUERY_RINGS_KM = [25, 50, 75];

const OSM_ATTR = OSM_TILE_ATTR;

// Overview = combined low-intensity view; Temperature/Precipitation/Wind = focus modes
// Radar = real reflectivity composite from RainViewer (global radar mosaic)
type LayerId = 'standard' | 'temperature' | 'precipitation' | 'wind' | 'radar';

const LAYERS: { id: LayerId; label: string; Icon: typeof MapIcon }[] = [
  { id: 'standard', label: 'Overview', Icon: MapIcon },
  { id: 'temperature', label: 'Temperature', Icon: Thermometer },
  { id: 'precipitation', label: 'Rain', Icon: CloudRain },
  { id: 'wind', label: 'Wind', Icon: Wind },
  { id: 'radar', label: 'Radar', Icon: Activity },
];

// Overview mode intensity multipliers (applied to field opacity / wind arrow opacity)
const OVERVIEW_INTENSITY = {
  temperature: 0.45,  // ~half of full intensity (full is ~0.5 core alpha)
  precipitation: 0.45,
  wind: 0.4,          // wind arrows at 40% opacity, same density
  windDensity: 0.5,   // render ~50% of wind arrows in overview
};

interface LegendSpec {
  title: string;
  gradient: string;
  from: string;
  to: string;
}

/**
 * Per-dimension data availability.
 *
 * Temperature, Rain, Wind and pressure all arrive in ONE grid, so a failed
 * fetch genuinely means everything failed and the full-view message is the
 * honest thing to show. But an individual dimension can still be absent from
 * a grid that otherwise loaded (e.g. the source omitted pressure), and that
 * must not be reported as a total outage. `gridFailed` is the total case;
 * the rest are scoped notes against just the layer that lost its data.
 */
interface LayerAvailability {
  gridFailed: boolean;
  temperature: boolean;
  precipitation: boolean;
  wind: boolean;
  pressure: boolean;
}

function legendFor(layer: LayerId, grid: GridResult | null): LegendSpec | null {
  if (layer === 'standard' || layer === 'radar' || !grid) return null;
  if (layer === 'temperature') {
    return {
      title: 'Temperature',
      // Legend bar is sampled from the SAME scale the field uses, across the
      // visible data range, so the legend and the map always agree.
      gradient: fieldGradient('temperature', grid.minTemp, grid.maxTemp),
      from: `${Math.round(grid.minTemp)}°C`,
      to: `${Math.round(grid.maxTemp)}°C`,
    };
  }
  if (layer === 'precipitation') {
    // All-zero / below-threshold area: no field, no legend - see the
    // "No precipitation detected" empty state rendered by the view.
    if (grid.maxRain <= MEANINGFUL_RAIN) return null;
    return {
      title: 'Precipitation',
      gradient: fieldGradient('precipitation', grid.minRain, grid.maxRain),
      from: `${grid.minRain.toFixed(1)} mm/h`,
      to: `${grid.maxRain.toFixed(1)} mm/h`,
    };
  }
  return {
    title: 'Wind speed',
    gradient: fieldGradient('wind', grid.minWind, grid.maxWind),
    from: `${Math.round(grid.minWind)} km/h`,
    to: `${Math.round(grid.maxWind)} km/h`,
  };
}

/** The Wind layer shows two dimensions, so its legend carries both. */
function windPressureNote(grid: GridResult | null): string | null {
  if (!grid || grid.minPressure == null || grid.maxPressure == null) return null;
  return `Pressure ${Math.round(grid.minPressure)}–${Math.round(grid.maxPressure)} hPa · isobars every 4 hPa`;
}

/**
 * The honest note for the CURRENT view, scoped to what actually failed.
 * Returns null when everything the view needs loaded fine, so a healthy
 * layer never carries a warning it doesn't deserve.
 */
function partialNote(layer: LayerId, a: LayerAvailability): string | null {
  const missing: string[] = [];
  if (layer === 'standard' || layer === 'temperature') {
    if (!a.temperature) missing.push('Temperature');
  }
  if (layer === 'standard' || layer === 'precipitation') {
    if (!a.precipitation) missing.push('Rain');
  }
  if (layer === 'standard' || layer === 'wind') {
    if (!a.wind) missing.push('Wind');
    else if (!a.pressure) missing.push('Pressure (isobars)');
  }
  if (missing.length === 0) return null;
  if (missing.length === 1) return `${missing[0]} data unavailable right now.`;
  return `${missing.join(' and ')} data unavailable right now.`;
}

/** Nearest real observation to a lat/lon — the probe never invents a value. */
function nearestPoint(grid: GridResult, lat: number, lon: number) {
  let best: (typeof grid.points)[number] | null = null;
  let bestD = Infinity;
  for (const p of grid.points) {
    const d = Math.hypot(p.lat - lat, p.lon - lon);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best;
}

/** Small arrow glyph for a bearing in degrees. */
function arrowGlyph(bearing: number): string {
  const arrows = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
  return arrows[Math.round((((bearing % 360) + 360) % 360) / 45) % 8];
}

/** "HH:MM" clock in Asia/Kolkata for the empty-state "Updated" label. */
function istClock(epochMs: number): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    }).format(new Date(epochMs));
  } catch {
    return '--:--';
  }
}

function readingText(layer: LayerId, p: PointWeather | null): string | null {
  if (!p) return null;
  if (layer === 'precipitation' && p.precip != null) {
    return `${p.precip.toFixed(1)} mm/h at this point`;
  }
  if (layer === 'wind' && p.windSpeed != null) {
    return `${compass(p.windDir ?? 0)}, ${Math.round(p.windSpeed)} km/h, gusting ${Math.round(p.gust ?? p.windSpeed)}`;
  }
  if (p.temp != null) return `${Math.round(p.temp)}°C at this point`;
  return null;
}

/**
 * Weather Map view: real OpenStreetMap tiles, functional data layers
 * (temperature / rain / wind) rendered from a live Open-Meteo grid, a
 * slate-teal pulsed location dot with concentric query rings, a reading tag
 * at the point, and a bottom-left legend for the active layer. The anchor is
 * the single canonical selected location; tapping the map selects a new
 * location and every other feature re-queries against it. If tiles fail to
 * load, the surface falls back to a dark contour-texture instead of an empty
 * tile state.
 */
export default function WeatherMapView() {
  const { location, setLocation } = useLocation();
  const mountRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const dotRef = useRef<any>(null);
  const cellRef = useRef<any>(null);
  // Three separate field layers for cross-fade transitions
  const tempFieldRef = useRef<WeatherField | null>(null);
  const precipFieldRef = useRef<WeatherField | null>(null);
  const windLayerRef = useRef<any>(null); // L.layerGroup for wind arrows
  const [ready, setReady] = useState(false);
  const [layer, setLayer] = useState<LayerId>('standard');
  const [grid, setGrid] = useState<GridResult | null>(null);
  const [gridAt, setGridAt] = useState<number>(0);
  const [point, setPoint] = useState<PointWeather | null>(null);
  const [tilesFailed, setTilesFailed] = useState(false);
  const [layerLoading, setLayerLoading] = useState(false);
  const [avail, setAvail] = useState<LayerAvailability>({
    gridFailed: false,
    temperature: false,
    precipitation: false,
    wind: false,
    pressure: false,
  });
  const [readingPos, setReadingPos] = useState<{ x: number; y: number } | null>(null);
  // Wind streamlines: traced paths through the wind vector field, re-seeded on
  // pan/zoom so coverage stays reasonable at any zoom level.
  const [streamlines, setStreamlines] = useState<Streamline[]>([]);
  // Synoptic pressure field: isobars, L/H systems and the background wash.
  const [pressure, setPressure] = useState<PressureLayer | null>(null);
  // Hover/tap readout for the pressure field (null = not over the map).
  const [probe, setProbe] = useState<{ x: number; y: number; text: string } | null>(null);
  // Container pixel size the streamline paths were traced against; the SVG
  // viewBox is re-synced on pan/zoom/resize so paths stay aligned.
  const [mapW, setMapW] = useState(0);
  const [mapH, setMapH] = useState(0);
  /**
   * Leaflet pane that hosts the map-DATA overlays (pressure wash, isobars,
   * wind streamlines).
   *
   * These have to live inside Leaflet's pane tree, not beside it. In Leaflet
   * 1.9.4 `.leaflet-map-pane` itself carries `z-index: 400` and a transform, so
   * it is a stacking context: the entire basemap subtree — tiles included —
   * paints at the 400 tier regardless of the tile pane's own 200. An overlay
   * parked next to it at 300/320 therefore renders UNDERNEATH the tiles and is
   * invisible. A pane at 500 sits above overlayPane (400, the temperature/rain
   * field canvases) and below markerPane (600, the query dot), which is the
   * order the layer spec calls for.
   */
  const [fieldPane, setFieldPane] = useState<HTMLElement | null>(null);
  const fieldPaneRef = useRef<HTMLElement | null>(null);
  // Latest grid + active layer, read by the pan/zoom re-seed handler without
  // re-subscribing the map listener on every layer change.
  const gridRef = useRef<GridResult | null>(null);
  const layerRef = useRef<LayerId>('standard');
  // Pan/zoom handler plus the latest reseed function, held in refs so the map
  // listener is attached exactly once (mount) and never re-subscribes.
  const mapReSeedRef = useRef<(() => void) | null>(null);
  const reseedStreamlinesRef = useRef<
    ((map: any, grid: GridResult, layer: LayerId) => void) | null
  >(null);
  // RainViewer radar state
  const radarTileLayerRef = useRef<any>(null);
  const [radarFrames, setRadarFrames] = useState<Array<{ time: number; path: string }>>([]);
  const [radarFrameIndex, setRadarFrameIndex] = useState(0);
  const [radarHost, setRadarHost] = useState<string>('');
  const [radarLoading, setRadarLoading] = useState(false);
  const [radarError, setRadarError] = useState<string | null>(null);
  const reading = readingText(layer, point);

  /**
   * Trace (or re-trace) the wind streamline field for the current viewport.
   * Called on layer change and on every pan/zoom/resize: the SVG paths live in
   * container pixel space, so they must be regenerated whenever that space
   * changes or they drift out of alignment with the basemap.
   */
  const reseedStreamlines = (map: any, grid: GridResult, activeLayer: LayerId) => {
    const wantWind = activeLayer === 'standard' || activeLayer === 'wind';
    if (!wantWind) {
      setStreamlines([]);
      setPressure(null);
      setMapW(0);
      setMapH(0);
      return;
    }
    const size = map.getSize();
    if (!size || size.x <= 0 || size.y <= 0) {
      setStreamlines([]);
      setPressure(null);
      setMapW(0);
      setMapH(0);
      return;
    }
    const project = (la: number, lo: number): [number, number] => {
      const pt = map.latLngToContainerPoint([la, lo]);
      return [pt.x, pt.y];
    };
    const unproject = (x: number, y: number): [number, number] => {
      const ll = map.containerPointToLatLng([x, y]);
      return [ll.lat, ll.lng];
    };

    // The overlay pane is a child of Leaflet's map pane, which Leaflet
    // translates to follow the pan/zoom. The overlays are drawn in CONTAINER
    // pixel space, so the pane has to be shifted back by that same offset or
    // every path lands thousands of pixels away.
    //
    // Two Leaflet 1.9.4 details are load-bearing here:
    //  - `getPane()` with no argument returns undefined; it indexes `_panes` by
    //    the string it is given, so the map pane must be requested by name.
    //  - The offset comes from the map pane's computed transform, NOT from
    //    `getPixelOrigin()`, which returns projected WORLD coordinates (values
    //    in the tens of thousands) rather than the on-screen offset.
    const pane = fieldPaneRef.current;
    const mapPane: HTMLElement | undefined = map.getPane?.('mapPane');
    if (pane && mapPane) {
      const t = getComputedStyle(mapPane).transform;
      // `none` means the map is at its identity position; nothing to cancel.
      const m = t && t !== 'none' ? new DOMMatrixReadOnly(t) : null;
      const dx = m ? m.m41 : 0;
      const dy = m ? m.m42 : 0;
      // The pane's containing block is the map pane, which is itself 0x0, so a
      // percentage size would resolve to zero and `overflow: hidden` would clip
      // the whole field away. The pane is therefore sized in real pixels from
      // the map container and offset by the inverse of the map pane's shift.
      pane.style.width = `${size.x}px`;
      pane.style.height = `${size.y}px`;
      pane.style.transform = `translate3d(${-dx}px, ${-dy}px, 0)`;
    }

    setStreamlines(
      buildWindStreamlines(
        grid.points,
        unproject,
        project,
        [0, 0, size.x, size.y],
        grid.minWind,
        grid.maxWind,
        windColor,
        windStyle,
        activeLayer === 'standard',
      ),
    );

    // Pressure layer: derived from the same real grid. If the source gave no
    // pressure the renderer returns empty isobars, and the wind layer simply
    // continues without them — a missing MSLP field never takes down wind.
    const lats = [...new Set(grid.points.map((p) => p.lat))].sort((a, b) => b - a);
    const lons = [...new Set(grid.points.map((p) => p.lon))].sort((a, b) => a - b);
    setPressure(
      buildPressureLayer(grid.points, project, lats, lons, activeLayer === 'standard'),
    );
    setMapW(size.x);
    setMapH(size.y);
  };
  // Publish the latest reseed function + active layer for the mount-time
  // pan/zoom handler to call without re-subscribing the map listener.
  reseedStreamlinesRef.current = reseedStreamlines;
  layerRef.current = layer;

  // One-shot map initialisation.
  useEffect(() => {
    let cancelled = false;
    let map: any = null;
    let ro: ResizeObserver | null = null;
    (async () => {
      const L = await import('leaflet');
      if (cancelled || !mountRef.current) return;
      LRef.current = L;
      // No location → neutral world viewport (pixels only — never a weather
      // query, never canonical state). The real selection drives the view
      // through the location-change effect below (§no-location).
      map = L.map(mountRef.current, {
        center: location ? [location.latitude, location.longitude] : NEUTRAL_MAP_VIEWPORT,
        zoom: location ? 8 : NEUTRAL_MAP_ZOOM,
      });
      const tiles = L.tileLayer(OSM_TILE_URL, { maxZoom: 19, attribution: OSM_ATTR });
      let errors = 0;
      tiles.on('tileerror', () => {
        errors += 1;
        if (errors >= 6) setTilesFailed(true);
      });
      tiles.addTo(map);
      mapRef.current = map;

      // Pane for the map-data overlays — see the fieldPane declaration for why
      // this has to be a real Leaflet pane. 500 places it above the
      // temperature/rain field canvases (overlayPane 400) and below the query
      // marker (markerPane 600).
      // Named 'field', not 'fieldPane': Leaflet builds the class as
      // `leaflet-<name>-pane`, so this yields `leaflet-field-pane`, which is
      // what the stylesheet targets.
      const pane = map.createPane('field');
      pane.style.zIndex = '500';
      pane.style.pointerEvents = 'none';
      fieldPaneRef.current = pane;
      setFieldPane(pane);

      setReady(true);

      // Tapping the map selects the canonical location: the query dot, rings
      // and reading move here, and the header, warnings, forecast, radar and
      // AI context all re-query against these coordinates (§5, §16).
      map.on('click', (e: any) => {
        const lat = e.latlng.lat as number;
        const lon = e.latlng.lng as number;
        // Resolve the administrative pieces, not just a display label: the
        // district drives India-only warning bulletins, and the country gates
        // whether IMD applies at all.
        void reverseGeocode(lat, lon).then(({ name, district, state, country }) => {
          // A tap is always a real selection — including the very first one
          // (location === null → this tap becomes the only source). Only a
          // re-tap on the exact current coordinates is a no-op.
          setLocation((prev) =>
            prev && prev.latitude === lat && prev.longitude === lon
              ? {}
              : { latitude: lat, longitude: lon, name, district, region: state, country, source: 'map' },
          );
        });
      });

      // Hover / tap readout for the synoptic layer. Reads the same real grid
      // the field is drawn from; never interpolated beyond what was observed.
      const probeAt = (e: any) => {
        const g = gridRef.current;
        if (!g) return;
        const p = nearestPoint(g, e.latlng.lat, e.latlng.lng);
        if (!p || !Number.isFinite(p.pressure)) {
          setProbe(null);
          return;
        }
        const pt = map.latLngToContainerPoint(e.latlng);
        // Arrow shows where the wind is going (bearing + 180).
        const towards = (p.windDir + 180) % 360;
        setProbe({
          x: pt.x,
          y: pt.y,
          text: `${Math.round(p.pressure)} hPa · ${Math.round(p.windSpeed)} km/h ${arrowGlyph(towards)} ${compass(towards)}`,
        });
      };
      map.on('mousemove', probeAt);
      map.on('mouseout', () => setProbe(null));

      // Self-heal sizing races: if the container had zero size when
      // Leaflet initialised (e.g. mid-layout mount), refit it now and on
      // any later resize so the map is never stuck blank.
      requestAnimationFrame(() => map.invalidateSize());
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => map.invalidateSize());
        ro.observe(mountRef.current);
      }
      // Re-seed the wind field on any pan/zoom/resize so streamline coverage
      // stays reasonable at every zoom level instead of stretching or bunching.
      const re = () => {
        if (cancelled) return;
        if (!gridRef.current) return;
        const size = map.getSize();
        if (size.x > 0 && size.y > 0) {
          setMapW(size.x);
          setMapH(size.y);
        }
        reseedStreamlinesRef.current?.(map, gridRef.current, layerRef.current);
      };
      map.on('moveend zoomend resize', re);
      mapReSeedRef.current = re;
    })();
    return () => {
      cancelled = true;
      const map0 = mapRef.current;
      if (map0 && mapReSeedRef.current) {
        map0.off('moveend zoomend resize', mapReSeedRef.current);
      }
      mapReSeedRef.current = null;
      tempFieldRef.current?.dispose();
      tempFieldRef.current = null;
      precipFieldRef.current?.dispose();
      precipFieldRef.current = null;
      if (windLayerRef.current) {
        map?.removeLayer(windLayerRef.current);
        windLayerRef.current = null;
      }
      if (ro) ro.disconnect();
      if (map) map.remove();
      mapRef.current = null;
      LRef.current = null;
      setReady(false);
    };
    // location is captured at mount; live updates come from the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch RainViewer radar metadata (host + past frames) on mount
  useEffect(() => {
    let cancelled = false;
    setRadarLoading(true);
    setRadarError(null);
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.host && data.radar?.past?.length) {
          setRadarHost(data.host);
          setRadarFrames(data.radar.past);
          setRadarFrameIndex(data.radar.past.length - 1); // start at latest
        } else {
          setRadarError('No radar frames available');
        }
      })
      .catch((e) => {
        if (!cancelled) setRadarError(e.message || 'Failed to load radar metadata');
      })
      .finally(() => {
        if (!cancelled) setRadarLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Canonical location changes: move the dot, recentre, refresh the reading.
  // location === null → drop every location-bound artifact (dot, rings,
  // point reading, grid, field) and park the map on the neutral viewport:
  // no stale place data may linger after the location is cleared (§no-location).
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;
    if (!location) {
      if (dotRef.current) {
        dotRef.current.remove();
        dotRef.current = null;
      }
      if (cellRef.current) {
        cellRef.current.clearLayers();
        cellRef.current.remove();
        cellRef.current = null;
      }
      tempFieldRef.current?.clear();
      precipFieldRef.current?.clear();
      if (windLayerRef.current) {
        windLayerRef.current.clearLayers();
        map.removeLayer(windLayerRef.current);
        windLayerRef.current = null;
      }
      setPoint(null);
      setReadingPos(null);
      setGrid(null);
      setStreamlines([]);
      setPressure(null);
      setAvail({ gridFailed: false, temperature: false, precipitation: false, wind: false, pressure: false });
      setLayerLoading(false);
      map.setView(NEUTRAL_MAP_VIEWPORT as [number, number], NEUTRAL_MAP_ZOOM);
      return;
    }
    if (dotRef.current) {
      dotRef.current.setLatLng([location.latitude, location.longitude]);
    } else {
      // The dot marks where the numbers on screen came from. It is not a
      // control: `interactive: false` already means tapping it does nothing.
      //
      // Leaflet nonetheless gave it role="button" and tabindex="0", so a
      // keyboard or screen-reader user tabbed onto a 12x12 element that
      // announced as the bare word "button" and did nothing when activated. A
      // control with no action must not advertise itself as one.
      //
      // `keyboard: false` removes the role and the tab stop. `alt` and `title`
      // still name it, so anyone who reaches the element another way learns
      // which place it marks instead of getting nothing.
      dotRef.current = L.marker([location.latitude, location.longitude], {
        icon: L.divIcon({
          className: 'map-loc-dot-marker',
          html: '<div class="map-loc-dot"></div>',
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        }),
        alt: `Weather location: ${location.name || 'selected point'}`,
        title: location.name || 'Selected point',
        keyboard: false,
        interactive: false,
        zIndexOffset: 900,
      }).addTo(map);
    }
    map.setView([location.latitude, location.longitude], Math.max(map.getZoom(), 8));
    void fetchPointWeather(location.latitude, location.longitude)
      .then(setPoint)
      .catch(() => undefined);
  }, [location, ready]);

  // Keep the reading tag pinned above the location dot.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !location) return;
    const update = () => {
      const pt = map.latLngToContainerPoint([location.latitude, location.longitude]);
      setReadingPos({ x: pt.x, y: pt.y });
    };
    update();
    map.on('move zoom moveend zoomend', update);
    return () => {
      map.off('move zoom moveend zoomend', update);
    };
  }, [location, reading]);

  // Render data layers with cross-fade transitions between overview and focus modes
  useEffect(() => {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map || !location) return;

    let cancelled = false;
    setLayerLoading(true);

    (async () => {
      try {
        const g = await fetchGrid(location.latitude, location.longitude);
        if (cancelled || !mapRef.current) return;
        setGrid(g);
        setGridAt(Date.now());
        gridRef.current = g;

        // Per-dimension availability from the grid that DID load. A dimension
        // with no real observation is reported against itself only; the other
        // layers keep rendering normally.
        const anyPressure = g.points.some((p) => Number.isFinite(p.pressure));
        setAvail({
          gridFailed: false,
          temperature: g.points.some((p) => Number.isFinite(p.temp)),
          precipitation: g.points.some((p) => Number.isFinite(p.precip)),
          wind: g.points.some((p) => Number.isFinite(p.windSpeed)),
          pressure: anyPressure,
        });

        const rings = { lat: location.latitude, lon: location.longitude, radiiKm: QUERY_RINGS_KM };

        // Initialize three separate field layers if needed
        if (!tempFieldRef.current) tempFieldRef.current = new WeatherField(map);
        if (!precipFieldRef.current) precipFieldRef.current = new WeatherField(map);

        // Determine visibility/opacity for each layer based on current mode
        const isOverview = layer === 'standard';
        const isTempFocus = layer === 'temperature';
        const isPrecipFocus = layer === 'precipitation';
        const isWindFocus = layer === 'wind';

        // Temperature field
        const tempVisible = isOverview || isTempFocus;
        const tempOpacity = isOverview ? OVERVIEW_INTENSITY.temperature : 1.0;
        const tempDry = isOverview ? false : (g.maxRain <= MEANINGFUL_RAIN); // in focus, precip dry check doesn't apply to temp
        tempFieldRef.current.set({
          points: g.points,
          mode: 'temperature',
          field: tempVisible && !tempDry,
          rings: isOverview ? undefined : rings, // only show rings in focus modes
        });
        tempFieldRef.current.setOpacity(tempOpacity);

        // Precipitation field
        const precipDry = g.maxRain <= MEANINGFUL_RAIN;
        const precipVisible = (isOverview || isPrecipFocus) && !precipDry;
        const precipOpacity = isOverview ? OVERVIEW_INTENSITY.precipitation : 1.0;
        precipFieldRef.current.set({
          points: g.points,
          mode: 'precipitation',
          field: precipVisible,
          rings: isOverview ? undefined : rings,
        });
        precipFieldRef.current.setOpacity(precipOpacity);

        // Wind field: streamlines + synoptic pressure. Isolated in its own
        // try/catch so a fault in the isobar/streamline renderer can never
        // propagate up and blank the temperature and rain layers with it.
        if (windLayerRef.current) {
          map.removeLayer(windLayerRef.current);
          windLayerRef.current = null;
        }
        const windVisible = isOverview || isWindFocus;
        if (windVisible) {
          try {
            reseedStreamlines(map, g, layer);
            setAvail((a) => ({ ...a, wind: true, pressure: anyPressure }));
          } catch (e) {
            console.warn('[WeatherMap] wind/pressure layer failed, other layers kept:', e);
            setStreamlines([]);
            setPressure(null);
            setAvail((a) => ({ ...a, wind: false, pressure: false }));
          }
        } else {
          setStreamlines([]);
          setPressure(null);
          setMapW(0);
          setMapH(0);
        }
        layerRef.current = layer;

        // Radar tile layer (RainViewer)
        if (radarTileLayerRef.current) {
          map.removeLayer(radarTileLayerRef.current);
          radarTileLayerRef.current = null;
        }
        if (layer === 'radar' && radarHost && radarFrames.length > 0) {
          const frame = radarFrames[radarFrameIndex];
          const tileUrl = `${radarHost}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`;
          radarTileLayerRef.current = L.tileLayer(tileUrl, {
            maxZoom: 7,
            attribution: 'Radar © <a href="https://www.rainviewer.com/" target="_blank" rel="noopener">RainViewer</a> ' + OSM_ATTR,
            opacity: 0.8,
          }).addTo(map);
        }
      } catch (err) {
        // Distinguish the two failure kinds. A rejected/unavailable GRID is a
        // genuine total outage and the honest response is the full-view
        // message. Anything else is a per-layer rendering fault: keep the
        // layers that already drew, and say which one could not, rather than
        // reporting a partial failure as a total one.
        console.warn('[WeatherMap] layer effect failed:', err);
        if (!cancelled) {
          const gridBroken = !gridRef.current;
          if (gridBroken) {
            setGrid(null);
            setStreamlines([]);
            setPressure(null);
            setAvail({ gridFailed: true, temperature: false, precipitation: false, wind: false, pressure: false });
          } else {
            // Grid is fine: narrow the failure to the layer we were drawing.
            const partial: LayerAvailability = {
              gridFailed: false,
              temperature: true,
              precipitation: true,
              wind: true,
              pressure: true,
            };
            if (layer === 'standard' || layer === 'temperature') partial.temperature = false;
            if (layer === 'standard' || layer === 'precipitation') partial.precipitation = false;
            if (layer === 'standard' || layer === 'wind') {
              partial.wind = false;
              partial.pressure = false;
            }
            setAvail(partial);
            if (!partial.wind) {
              setStreamlines([]);
              setPressure(null);
            }
          }
        }
      } finally {
        if (!cancelled) setLayerLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [layer, location, ready]);

  const activeLabel = LAYERS.find((l) => l.id === layer)?.label ?? 'layer';
  const legend = legendFor(layer, grid);
  const coords = location
    ? `${Math.abs(location.latitude).toFixed(4)}° ${location.latitude >= 0 ? 'N' : 'S'}, ` +
      `${Math.abs(location.longitude).toFixed(4)}° ${location.longitude >= 0 ? 'E' : 'W'}`
    : 'No location selected';

  /**
   * The map-data overlays, portalled into Leaflet's `fieldPane`.
   * Painted back-to-front: pressure wash (background field), isobars with
   * their hPa labels and L/H systems, then the animated wind streamlines.
   */
  const fieldOverlays = (
    <>
      {/* Soft pressure-gradient wash: a background field, never competing
          with the basemap, the isobars or the streamlines. */}
      {pressure && pressure.min != null && pressure.max != null && pressure.max > pressure.min && (
        <div
          className="pressure-wash"
          style={{
            background: `linear-gradient(160deg, ${pressureWashColor(1)} 0%, ${pressureWashColor(
              0.55,
            )} 45%, ${pressureWashColor(0)} 100%)`,
          }}
        />
      )}
      {pressure && pressure.isobars.length > 0 && (
        <svg
          className="pressure-field"
          viewBox={`0 0 ${mapW || 1} ${mapH || 1}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* Isobars with hPa labels along the line. */}
          {pressure.isobars.map((b, i) => (
            <g key={`b${i}`}>
              <path d={b.d} className="isobar-halo" />
              <path d={b.d} className="isobar" />
              {b.labelAt.map(([lx, ly], k) => (
                <g key={k}>
                  <rect x={lx - 17} y={ly - 8} width={34} height={16} rx={3} className="isobar-label-bg" />
                  <text x={lx} y={ly + 4} className="isobar-label" textAnchor="middle">
                    {b.value}
                  </text>
                </g>
              ))}
            </g>
          ))}
          {/* L / H systems: only where the data shows a real interior
              extremum. Orange/teal, never the reserved watch-red. */}
          {pressure.systems.map((s, i) => {
            const c = s.kind === 'L' ? 'low' : 'high';
            const ll = mapRef.current?.latLngToContainerPoint([s.lat, s.lon]);
            if (!ll) return null;
            return (
              <g key={`s${i}`} className={`pressure-system ${c}`}>
                <circle cx={ll.x} cy={ll.y} r={11} className={`pressure-system-ring ${c}`} />
                <text x={ll.x} y={ll.y + 5} className={`pressure-system-label ${c}`} textAnchor="middle">
                  {s.kind}
                </text>
                <title>{`${s.kind === 'L' ? 'Low' : 'High'} pressure ${Math.round(s.value)} hPa`}</title>
              </g>
            );
          })}
        </svg>
      )}
      {streamlines.length > 0 && (
        <svg
          className="wind-streamlines"
          viewBox={`0 0 ${mapW || 1} ${mapH || 1}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {streamlines.map((s, i) => (
            <g key={i}>
              {/* Casing behind the coloured stroke so the line reads against
                  both light and dark basemap terrain. Kept deliberately tight
                  to the core: at the old +3.4px on a 5px stroke the halo was
                  the dominant shape and the line read as a thick band. */}
              <path d={s.d} className="wind-stream-halo" strokeWidth={s.width + 1.7} />
              <path
                d={s.d}
                className="wind-stream"
                stroke={s.color}
                strokeWidth={s.width}
                strokeOpacity={s.opacity}
                /* A travelling dash, not a string of dots. Round caps on a
                   short dash at the old 5px weight rendered as a chain of
                   blobs; with a thin core, a longer dash and butt caps this
                   reads as motion along a line. The period must match the
                   wind-stream-flow keyframe below or the loop will visibly
                   jump. */
                strokeDasharray="26 16"
                style={{
                  strokeDashoffset: s.dashOffset,
                  animationDuration: `${s.dashDuration}s`,
                }}
              />
            </g>
          ))}
        </svg>
      )}
    </>
  );

  return (
    <div className={`map-view ${tilesFailed ? 'tiles-failed' : ''}`}>
      {/* The map view had no heading at all, so it was the one page with
          neither an h1 nor an h2 for assistive tech to navigate by. Visually
          hidden: the layer pills are the visible interface and adding a
          visible title would displace them. */}
      <h1 className="sr-only">Weather map</h1>
      <div className="map-toolbar">
        {LAYERS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`map-layer-pill ${layer === id ? 'active' : ''}`}
            aria-pressed={layer === id}
            onClick={() => setLayer(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
        <span className="map-meta">{coords}</span>
      </div>
      {layer === 'radar' && radarFrames.length > 0 && (
        <div className="radar-time-controls">
          <div className="radar-time-label">
            {radarLoading ? 'Loading radar…' : (
              <>
                Frame {radarFrameIndex + 1} / {radarFrames.length} —
                <strong>{new Date(radarFrames[radarFrameIndex].time * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })} IST</strong>
              </>
            )}
          </div>
          <input
            type="range"
            min={0}
            max={radarFrames.length - 1}
            value={radarFrameIndex}
            onChange={(e) => setRadarFrameIndex(Number(e.target.value))}
            className="radar-time-slider"
            aria-label="Radar time frame"
          />
          <div className="radar-time-ticks">
            <span>Latest</span>
            <span>Oldest</span>
          </div>
          {radarError && <div className="radar-error">{radarError}</div>}
        </div>
      )}
      <div className="map-surface">
        <div ref={mountRef} className="map-leaf" />
        {/* Map-DATA overlays live in Leaflet's `fieldPane` (see fieldPane),
            not here: `.leaflet-map-pane` is itself a z-index:400 stacking
            context, so an overlay parked beside it renders underneath the
            basemap. Portalled in so Leaflet's pane ordering governs them.
            Order inside the pane is DOM order: wash, isobars, streamlines. */}
        {fieldPane && createPortal(fieldOverlays, fieldPane)}
        {!location && (
          <div className="weather-empty">
            <MapPin aria-hidden />
            <div className="weather-empty-title">No location selected</div>
            <div className="weather-empty-body">
              Tap the map to choose where to check the weather, search a city on the Weather
              report page, or enable GPS from the header pill. No weather data is requested until
              a location exists.
            </div>
          </div>
        )}
        {probe && (
          <div className="pressure-probe" style={{ left: probe.x, top: probe.y }}>
            {probe.text}
          </div>
        )}
        {layerLoading && <div className="map-loading">Loading {activeLabel.toLowerCase()} layer…</div>}
        {/* Full-view message ONLY when the whole grid failed — the one case
            where a blank map is the accurate thing to show. */}
        {avail.gridFailed && (
          <div className="map-layer-error">
            Live {activeLabel.toLowerCase()} data is unavailable right now. Showing the base map
            with your location reading.
          </div>
        )}
        {/* Per-layer honest notes: scoped to the layer that actually lost its
            data, so a partial failure is never reported as a total one. */}
        {!avail.gridFailed && partialNote(layer, avail) && (
          <div className="map-layer-note">{partialNote(layer, avail)}</div>
        )}
        {layer === 'precipitation' && grid && grid.maxRain <= MEANINGFUL_RAIN && !layerLoading && !avail.gridFailed && (
          <div className="weather-empty">
            <CloudRain aria-hidden />
            <div className="weather-empty-title">No precipitation detected</div>
            <div className="weather-empty-body">
              No meaningful rainfall is currently detected in this area.
            </div>
            <div className="weather-empty-meta">Updated {istClock(gridAt)} IST</div>
          </div>
        )}
        {legend && (
          <div className="map-legend">
            <div className="legend-title">{legend.title}</div>
            <div className="legend-bar" style={{ background: legend.gradient }} />
            <div className="legend-range">
              <span>{legend.from}</span>
              <span>{legend.to}</span>
            </div>
            {layer === 'wind' && windPressureNote(grid) && (
              <div className="legend-note">{windPressureNote(grid)}</div>
            )}
          </div>
        )}
        {reading && readingPos && (
          <div className="map-reading" style={{ left: readingPos.x, top: readingPos.y - 30 }}>
            {reading}
          </div>
        )}
      </div>
    </div>
  );
}