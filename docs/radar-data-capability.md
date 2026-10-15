# Radar Data Capability Report

Status: evidence-based engineering note for the Radar redesign. Every claim below
points at the file/module where it was observed. Capability classifications:
**Available / Derivable / Unavailable / Unknown**. "Unknown" means no sufficient
evidence was found yet and the feature is treated as Unavailable in the UI.

_Last updated: 2026-09-23_

---

## Data source

Open-Meteo forecast API, called **directly from the browser** (no backend proxy
on this path).

Evidence:

- `frontend/src/components/mapData.ts:52-53` — `OPEN_METEO =
  https://api.open-meteo.com/v1/forecast?current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=kmh`
- `fetchPointWeather()` — `frontend/src/components/mapData.ts:55`
- `fetchGrid()` — `frontend/src/components/mapData.ts:95` (5x5 grid, see Spatial model)

Open-Meteo itself aggregates NWP model output (GFS / ICON / ECMWF-family grids,
per their documentation). The radar overlay is therefore an **interpolated model
output field**, not radar reflectivity. UI copy must say "estimated precipitation
field" / "Precipitation observations", never "radar reflectivity".

## Endpoint(s)

- `GET https://api.open-meteo.com/v1/forecast?current=…&latitude=…&longitude=…`
  (point observations, one call per grid point)
- Reporter: `frontend/src/components/WeatherRadarView.tsx` calls `fetchGrid()`
  via `frontend/src/components/mapData.ts`.
- Java backend has **no** radar/precipitation-grid endpoint. Precipitation in the
  Java backend is a different product (7-day daily NWP sums):
  - `backend/.../nwp/NwpModelService.java`
  - `backend/.../weather/provider/OpenMeteoWeatherProvider.java` (daily vars)
  - `backend/.../weather/query/…` (chat queries only)
- Python ML backend exposes `/route-weather` and `/agent`
  (`frontend/src/config/api.ts:67-74`); neither serves precipitation grids.

## Response shape

```
{
  current: { time, temperature_2m, precipitation, wind_speed_10m,
             wind_direction_10m, wind_gusts_10m }
}
```

Read at: `frontend/src/components/mapData.ts:59-67`. Nullability: a point is
dropped when `temp` or `windSpeed` is null (`mapData.ts:117`); `precipitation`
null is coerced to `0` (`mapData.ts:122`).

## Spatial model

- Regular 5x5 grid at 0.5 deg spacing (~55 km), centred on the anchor point:
  `mapData.ts:44-45` (`GRID = 5`, `SPACING = 0.5`), offsets at `mapData.ts:100-102`.
- Coverage: a 2 x 2 deg box (roughly 220 x 220 km at Indian latitudes).
- The field is **point/model-output based**, not observed radar imagery.

## Temporal model

- Current client request: `current=…` only — a single "now" frame
  (`mapData.ts:53`).
- **Historical frames: Unavailable** — no endpoint or client path requests
  past observations; Open-Meteo's forecast API does not serve past radar frames.
- **Forecast frames: Implemented** — Open-Meteo `hourly=precipitation` with
  `forecast_hours=6` is requested per grid cell by `fetchRadarFrames()`
  (`mapData.ts`); the Radar timeline scrubs through now … +5 h model forecast
  frames using the API's own `hourly.time` timestamps (Asia/Kolkata via
  `timezone=auto`). Every non-Live frame is labelled as forecast.

## Units

- `precipitation`: mm (per-hour precipitation rate semantics, displayed as mm/h)
- `temperature_2m`: deg C
- `wind_speed_10m` / `wind_gusts_10m`: km/h (`wind_speed_unit=kmh`,
  `mapData.ts:53`)
- `wind_direction_10m`: degrees

## Geographic coverage

Narrow: the ~2 x 2 deg grid around the current anchor (GPS or city fallback).
Not India-wide, not sub-district.

## Update cadence

Live fetch on each location visit; client-side 10-minute cache per anchor
(`mapData.ts:69-70`, `CACHE_TTL = 10 * 60 * 1000`). Open-Meteo forecasts update
sub-hourly; timestamps come from the API response.

## Zero / null semantics

- Missing points are dropped unless they can be recovered (see Fetch resilience).
- `precipitation === 0` is a valid, common value; `minRain`/`maxRain` can be
  `0.0 – 0.0` (the misleading all-zero colored-grid state we must eliminate).
- Define a "no meaningful precipitation" threshold (0.05 mm/h) below which the
  field is not rendered.
- Radar truth gate: the field and legend render only when the **active frame**
  exceeds 0.05 mm/h; otherwise a concise "No precipitation detected" state is
  shown with the clean basemap (implemented in
  `frontend/src/components/WeatherRadarView.tsx` via `MEANINGFUL_RAIN`).
- Weather Map Rain uses the **same threshold**: an all-zero area renders no
  coloured field and no legend, only the query rings / location reading plus
  the "No precipitation detected" message
  (`frontend/src/components/WeatherMapView.tsx`).

## Fetch resilience

Observed flakiness: transient per-cell request failures drop cells, which
punctured the rendered field with bare-map holes. Fixed in
`frontend/src/components/mapData.ts` (`fetchCell` / `idwFill`):

- Each grid cell is fetched with 2 attempts and a short backoff.
- Cells that still fail are filled with inverse-distance weighting (1/d^2,
  capped at 1.5 deg) over the fetched neighbours of the **same** model field.
- Fills are interpolation, never fabrication: they reuse neighbouring model
  values on the same grid and only apply to cells that failed to load. If no
  neighbour is within the cap, the cell stays missing (never invented).
- Same behaviour in the hourly frame path (`fetchRadarFrames`), per hour.
- Fully failing grids (all cells unreachable) still raise and surface the
  layer error banner; we never render a fabricated field wholesale.

## District data

**Unavailable.** No district boundary GeoJSON/shapefile exists anywhere in the
repo (no `*.geojson`/`*.shp` under `frontend/`, `backend/`, `ML/`). The only
`route_weather_data.json` files are route-weather artifacts
(`route_weather/map/…`, `ML/map/…`), not administrative polygons. District
boundary overlay and district selection are **omitted**.

## Warning polygons

**Unavailable as polygons.** Backend warnings are text DTOs:
`weather/dto/alert/WeatherAlertDto.java` — `affectedLocations` is a list of
place-name strings (`WeatherAlertDto.java:74-78`), with optional central
lat/lon (`:80-84`, may be null). No polygon geometry is produced.

- `ImdEarlyWarningService` generates **automated advisories** from thresholds
  (`informationClass = AUTOMATED_ADVISORY`, `official = false`),
  `ImdEarlyWarningService.java:120-193` — these must never be presented as
  official IMD bulletins.
- WIS2 ingest accepts GeoJSON `geometry` (point or polygon)
  (`ingest/dto/Wis2NotificationDto.java:25`, `controller/IngestController.java`
  `POST /api/…/wis2`) but is a push-ingest surface with **no query endpoint and
  no evidence of a live feed**; classification **Unknown** → treated as
  Unavailable for the UI.

Action: Radar may show a **text-only "active warnings" line** sourced from
`GET {JAVA_API_BASE}/api/alerts/early-warnings?location=…`
(`frontend/src/config/api.ts:44-47`), labelled as advisory vs official per
`WeatherAlertDto.informationClass`. No polygon overlays.

## Lightning

**Unavailable as data.** No lightning data product anywhere. "Lightning" appears
only as static advisory copy inside an automated thunderstorm alert
(`ImdEarlyWarningService.java:174-189`). Lightning layer is omitted.

## Rain movement support

**Implemented as a forecast trend** (`rainMovement` in `mapData.ts`). With
real forecast frames (now … +5 h), the precip-weighted centroid of the rainy
cells (>= 1 mm/h) is compared between the first and last frame; if the shift
exceeds ~0.12 deg the bearing is shown in the radar summary as
"Rain approaching from NE (model forecast trend)". Constraints respected:

- Only with multiple genuine frames (never inferred from one static frame).
- Labelled as "forecast trend", not observed motion.
- Diffuse/static systems with no defensible shift show no movement line at
  all rather than a fabricated direction.

## Rain ETA support

**Not implemented.** The grid is ~55 km resolution and frames are model
forecasts; a "rain arriving at your location in N minutes" estimate would be
speculative. Omitted; documented as Unsupported (see Data honesty).

## Recommended UI capabilities

| Capability | Classification | Frontend action |
| --- | --- | --- |
| Current precipitation | Available (derived model grid) | Broad translucent weather regions (regional aggregation), honest labeling |
| Historical frames | Unavailable | Omit |
| Forecast frames | Derivable | Implemented: short model-forecast timeline (now…+5 h) with real API timestamps |
| District boundaries | Unavailable | Omit (no UI) |
| Warning polygons | Unavailable (text only) | Omit; text-only advisory line in radar summary |
| Lightning | Unavailable | Omit |
| Rain movement | Derivable | Implemented as labelled forecast trend (centroid shift) |
| Rain ETA | Unsupported (coarse grid + forecast) | Omit |
| Opacity control | Available (renderer feature) | Implemented over-map slider (20-100%) |
| Zero state | Available (data) | Truthful empty state + badge; legend hidden while dry |
| Basemap | Available | OSM shared with Weather Map (CARTO/API-key removed) |
| Layer control | Available | Compact checkbox panel; unsupported layers are NOT exposed as controls |

## Radar page implementation (2026-09-23)

Built in `frontend/src/components/WeatherRadarView.tsx` + shared renderer
`frontend/src/components/weatherField.ts` (+ CSS in
`frontend/src/components/WeatherMap.css`):

- Page identity: header "Precipitation Radar", region line `India / {city}`,
  Live/Forecast status chip, "Updated HH:MM IST" (fetch time, Asia/Kolkata).
- Over-map controls: layer checkbox (Precipitation only), opacity slider.
- Summary panel: intensity counts per **grid cell** (Heavy/Moderate/Light +
  dry), max mm/h, at-location reading, movement trend, advisory line.
- Timeline: Live + prev/play/next/scrub over real forecast frames; every
  non-Live frame is labelled "Forecast for HH:MM IST".
- Truthful empty state, legend tied to the active frame's meaningfulness.
- Regional aggregation renderer: see
  `frontend/src/components/mapData.ts` (`regionalize()`, deterministic k-means
  on the 5x5 grid into up to 6 broad regions) + `weatherField.ts` (one large
  translucent soft ellipse per region, radial gradient fading to the region's
  own colour, normal alpha compositing, no 'screen' blend, no strokes). The
  query point is never the field's source: it stays a separate marker, reading
  tag and concentric rings above the field.
- Profile/UI copy follows the design system (no em dashes, no emoji, no
  pill buttons, slate-teal accents; watch-green reserved for "No active
  warnings").

## Unsupported capabilities

- Historical radar playback, radar reflectivity display
- District-level summaries and clickable districts
- Warning polygon overlays with geometry
- Lightning detections
- Precise ETA estimates ("rain arrives in N min")
- India-wide radar coverage

## Data honesty constraints

- Terminology: "Estimated precipitation field" / "Precipitation observations",
  never "radar reflectivity" — the source is interpolated NWP model output
  (`mapData.ts` Open-Meteo path).
- Visual smoothing (large translucent regions) is interpolation for readability
  and must not imply measured coverage far beyond the 0.5 deg grid. Regions are
  spatial clusters of the real grid cells, and each region fades to
  transparency before implying coverage far outside the sampled box.
- Counts in the summary panel are counts of **grid cells** (25 cells at 0.5 deg),
  not district or population areas.
- Warnings shown are automated advisories unless the API marks
  `informationClass = OFFICIAL_WARNING` (`WeatherAlertDto.java:40-52`,
  `ImdEarlyWarningService.java` produces `AUTOMATED_ADVISORY` only).
- Forecast frames carry their real Open-Meteo hourly timestamps; scrubber labels
  every non-LIVE frame as forecast.

## Verification notes

- The yellow-bordered `Display / Sun Blast / Brightness / Scale` overlay seen in
  screenshots is **external to WeatherGPT**: no matching strings exist under
  `frontend/src/`. Not implemented or fixed here.
- Shared renderer: Weather Map Rain and Radar precipitation both consume the same
  `WeatherField` (see `frontend/src/components/weatherField.ts`); a single
  normalization → color scale → regionalization → geometry → renderer path.
  Previously each of the 25 grid cells anchored its own ellipse with the
  canvas `screen` blend, which unioned alpha into one opaque central mass;
  now `regionalize()` (mapData.ts) clusters the cells into broad regions and
  the renderer paints each region once with source-over alpha.