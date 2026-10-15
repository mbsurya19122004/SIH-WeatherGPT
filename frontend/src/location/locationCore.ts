/**
 * Pure, framework-free core of the canonical selected-location model.
 *
 * Everything in this module is free of React, the DOM and network access, so
 * it is directly unit-testable with zero dependencies (see the node tests in
 * `tests/location_core.test.ts`). All canonical-location invariants live here:
 *
 *  - a location needs BOTH valid coordinates AND a real source — a partial
 *    patch can never invent coordinates or a source (§sanitize);
 *  - `null` means "no location selected yet": nothing is ever chosen
 *    implicitly; only real sources (GPS, map tap, search, chat, deep link)
 *    create a location (docs/location-architecture.md);
 *  - coordinates are the identity; `name` is a display label only —
 *    reverse-geocode failure keeps the coordinates with a generic label;
 *  - cache keys are coordinate-derived so one place can never satisfy
 *    another's request, and a null location yields null keys.
 */

export type LocationSource = 'url' | 'gps' | 'map' | 'search' | 'chat';

export interface SelectedLocation {
  latitude: number;
  longitude: number;
  /** Display name (reverse-geocoded, search result, or chat resolution).
   *  Never authoritative — coordinates are. Falls back to
   *  {@link SELECTED_POINT_LABEL} when a place has no better name. */
  name: string;
  /** Admin1 (state / county) when the source provides it. */
  region?: string;
  /**
   * Administrative DISTRICT, resolved by reverse geocoding — e.g. "Kochi".
   *
   * This is deliberately NOT derived from `name`. The display name and the
   * district are different concepts: `name` may be a fully qualified
   * "Kochi, Kerala, India", a POI, or "Selected point", and appending
   * "district" to any of those produces nonsense like
   * "Kochi, Kerala, India district" — which is exactly what an IMD warning
   * must never be labelled with. Anything needing a district (warning
   * bulletins, and only for India) reads this field.
   */
  district?: string;
  /** Country when the source provides it. */
  country?: string;
  /** How this location was selected — auditable, never user-visible. */
  source: LocationSource;
}

/**
 * India-specific warning bulletins (IMD) are only meaningful inside India.
 *
 * This is the single gate for IMD warning requests: a resolved country that
 * is not "India" must never reach the IMD endpoint, because the response
 * would be an Indian district warning attached to a foreign coordinate.
 */
export function isInIndia(loc: Pick<SelectedLocation, 'country'> | null | undefined): boolean {
  return typeof loc?.country === 'string' && loc.country.trim().toLowerCase() === 'india';
}

/** Coordinate range guard for latitudes: must be a finite number in [-90, 90]. */
export function isLat(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= -90 && v <= 90;
}

/** Coordinate range guard for longitudes: must be a finite number in [-180, 180]. */
export function isLon(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= -180 && v <= 180;
}

const SOURCES: LocationSource[] = ['url', 'gps', 'map', 'search', 'chat'];

/** Generic display label used when a coordinate has no better place name. */
export const SELECTED_POINT_LABEL = 'Selected point';

/**
 * Validate + coerce raw truth into a canonical location. Returns null when
 * the coordinates are missing/out of range or the source is unknown, so a
 * partial patch like `{ name }` can never invent coordinates or a source —
 * the caller merges a partial patch with the previous location first (§guard:
 * no data can create a location out of nothing).
 */
export function sanitize(raw: unknown): SelectedLocation | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (!isLat(o.latitude) || !isLon(o.longitude)) return null;
  if (!SOURCES.includes(o.source as LocationSource)) return null;
  const name =
    typeof o.name === 'string' && o.name.trim() ? o.name.trim() : SELECTED_POINT_LABEL;
  return {
    latitude: o.latitude as number,
    longitude: o.longitude as number,
    name,
    region: typeof o.region === 'string' ? o.region : undefined,
    district: typeof o.district === 'string' ? o.district : undefined,
    country: typeof o.country === 'string' ? o.country : undefined,
    source: o.source as LocationSource,
  };
}

/**
 * Deep-link support: parse `?lat=..&lon=..&name=..` from a URL search string.
 * The params must ACTUALLY be present: without them the result is null (a
 * plain "/" load starts with no location). Historically `Number(null)`
 * yielded 0, which passed the range check and silently became a fake (0,0)
 * location — that path is gone: no params, no location. An explicitly
 * supplied `lat=0&lon=0` is a valid deep link, like any other coordinate.
 */
export function parseDeepLink(search: string): SelectedLocation | null {
  if (search.trim() === '') return null;
  const params = new URLSearchParams(search);
  const latRaw = params.get('lat');
  const lonRaw = params.get('lon');
  if (
    latRaw === null ||
    lonRaw === null ||
    latRaw.trim() === '' ||
    lonRaw.trim() === ''
  ) {
    return null;
  }
  const lat = Number(latRaw);
  const lon = Number(lonRaw);
  if (!isLat(lat) || !isLon(lon)) return null;
  return sanitize({
    latitude: lat,
    longitude: lon,
    name: params.get('name') ?? SELECTED_POINT_LABEL,
    source: 'url',
  });
}

// ── Session persistence (P2-004) ─────────────────────────────────────
//
// The selected location is the input to every data page, so losing it on
// refresh meant re-picking a city on every reload. It is restored from
// localStorage on boot.
//
// This reverses an earlier decision recorded in this codebase ("no
// localStorage read, no default city"). The reasoning still holds for a
// *default* city: nothing here invents a location. A stored value is only ever
// a location the user actually chose, and it is re-validated through
// `sanitize()` on read, so a hand-edited or stale entry cannot inject an
// out-of-range coordinate or an unknown `source`.
//
// Priority on boot is unchanged: a deep link in the URL wins over the stored
// value, so a shared link always shows the place it names.

const STORAGE_KEY = 'weathergpt.selectedLocation.v1';

/**
 * Read the previously selected location.
 *
 * Returns null — never throws — when localStorage is unavailable (Safari
 * private mode, disabled cookies, a quota-exhausted origin) or when the stored
 * value is absent, unparseable, or fails `sanitize`. An empty or blocked store
 * therefore degrades to the previous behaviour: no location, no requests.
 */
export function loadStoredLocation(): SelectedLocation | null {
  if (typeof window === 'undefined') return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked or unavailable. Not an error worth surfacing: the app
    // simply starts with no location, exactly as it did before.
    return null;
  }
  if (!raw) return null;
  try {
    return sanitize(JSON.parse(raw));
  } catch {
    // Corrupt entry. Drop it so it cannot fail again on every future load.
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing further to do */
    }
    return null;
  }
}

/** Persist the selected location. Silently no-ops when storage is blocked. */
export function storeLocation(loc: SelectedLocation | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (loc === null) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  } catch {
    // Quota exceeded or storage blocked: persistence is a convenience, so
    // failing to save must never break the interaction that triggered it.
  }
}

/**
 * Stable identity (lat,lon rounded to 4 decimals) for cache keys/effects.
 * Null-safe: no location → null key, so caches and effects never misfire on
 * a "no location" state (no-location → no weather request, ever).
 */
export function locationKeyOf(loc: SelectedLocation | null): string | null {
  return loc ? `${loc.latitude.toFixed(4)},${loc.longitude.toFixed(4)}` : null;
}

/**
 * Per-location offline-forecast cache key: embeds rounded coordinates so one
 * place's record can never satisfy another's request (§cache rules). The
 * cache stores data keyed by coordinates — it never creates or resurrects a
 * location: `loadCachedForecast` only reads the entry for the CURRENT
 * coordinates, and no code path persists the canonical selection itself.
 */
export function reportCacheKey(lat: number, lon: number): string {
  return `weatherGPT_offline_forecast_${lat.toFixed(2)}_${lon.toFixed(2)}`;
}