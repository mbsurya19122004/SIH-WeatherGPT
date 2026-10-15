/**
 * Canonical selected-location state for the entire app.
 *
 * One location, every consumer:
 *
 *        LocationProvider
 *              │
 *   ┌──────────┼──────────────┬─────────────┐
 *   │          │              │             │
 * Header     Weather Map    Radar        Forecast
 *   │          │              │             │
 * Warnings  report cache   point rain    charts / AI
 *
 * `location === null` is a first-class state: **no location has been selected
 * yet**. Nothing is ever chosen implicitly. A location exists only after a
 * REAL source provides one — a GPS fix, an explicit map tap, a search result,
 * a chat resolution or a deep link. There is no default city, no persistence
 * round-trip (old sessions never silently rehydrate a previous pick) and no
 * hydration: a fresh visit starts `null` and stays `null` until the user (or
 * the browser's geolocation, with permission) supplies coordinates.
 *
 * Every consumer must treat `location === null` as "no weather requests" —
 * see docs/location-architecture.md.
 *
 * Selection sources (see docs/location-architecture.md):
 *  - url  : ?lat=..&lon=..&name=.. deep link (explicit intent)
 *  - gps  : browser geolocation (auto-fill only when nothing was chosen; the
 *           location pill click always refreshes it)
 *  - map  : tap on the Weather Map or Radar map
 *  - search  : Weather report city search
 *  - chat : location resolved by the AI assistant's answer
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  loadStoredLocation,
  locationKeyOf,
  parseDeepLink,
  sanitize,
  storeLocation,
  type LocationSource,
  type SelectedLocation,
} from './locationCore';

// Re-exported so existing consumers keep importing from LocationContext.
export type { LocationSource, SelectedLocation } from './locationCore';

export type LocationPatch = Partial<
  Pick<SelectedLocation, 'latitude' | 'longitude' | 'name' | 'region' | 'district' | 'country'>
> & { source?: LocationSource };

/**
 * Discriminated status of the location feature. `status === 'selected'`
 * means a real location exists (location === null only in the other states).
 * `requesting-gps` is transient: the browser geolocation call is in flight.
 * `denied` / `error` mean GPS failed AND no location has been selected by any
 * other real source (a later map tap / search / deep link always recovers).
 */
export type LocationState =
  | { status: 'none' }
  | { status: 'requesting-gps' }
  | { status: 'selected' }
  /**
   * The location came from localStorage, not from something the user just did
   * (P3-014). It is a real prior choice, but it is NOT evidence of where the
   * user is now, so the UI must label it as saved and must not present IMD
   * warnings for it as though they were current conditions.
   */
  | { status: 'restored' }
  | { status: 'denied' }
  | { status: 'error' };

/** True when the shown location is a restored prior choice, not a live one. */
export function isRestoredState(state: LocationState): boolean {
  return state.status === 'restored';
}

/**
 * Mount-time seed from the URL deep link ONLY. Nothing else may seed the
 * canonical state — no localStorage read, no default city. Delegates to the
 * pure {@link parseDeepLink} core function so the parse logic is unit-
 * testable without a DOM (tests/location_core.test.ts).
 */
function initFromUrl(): SelectedLocation | null {
  if (typeof window === 'undefined') return null;
  return parseDeepLink(window.location.search);
}

// GeolocationPositionError code for "permission denied".
const PERMISSION_DENIED_CODE = 1;

const GPS_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 8000,
  maximumAge: 300000,
};

interface LocationContextValue {
  /**
   * The one canonical selected location. `null` until a real source (GPS,
   * map tap, search, chat resolution, deep link) provides one — every data
   * page must treat `null` as "no location, no weather requests".
   */
  location: SelectedLocation | null;
  /** Discriminated status for the header pill / no-location UI. */
  state: LocationState;
  /** Stable identity (lat,lon rounded) for cache keys and effects; null-safe. */
  locationKey: string | null;
  /** Update the canonical location. Invalid/unknown patches are ignored. */
  setLocation: (
    patch: LocationPatch | ((prev: SelectedLocation | null) => LocationPatch),
  ) => void;
  /** Force a GPS refresh (header location pill). Explicit intent: it replaces
   *  whatever is selected right now; a failure keeps the existing location. */
  requestGpsLocation: () => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  // Boot priority: a URL deep link wins, then the location the user last chose
  // (P2-004). Nothing here invents a location: there is still no default city,
  // and a stored value is re-validated by `sanitize()` on read. Resolved once
  // so `location` and `status` cannot disagree about what booted.
  //
  // WHY the old "no localStorage read" rule was revised: that rule existed to
  // stop a hardcoded city being shown as if it were live. Restoring the user's
  // own last choice cannot do that, PROVIDED it is always labelled as saved and
  // never treated as a current fix — which is what the `restored` status
  // enforces, and why a restored location may not present IMD warnings on its
  // own.
  const [boot] = useState<{ location: SelectedLocation | null; restored: boolean }>(
    () => {
      const deepLink = initFromUrl();
      if (deepLink) return { location: deepLink, restored: false };
      const stored = loadStoredLocation();
      return { location: stored, restored: stored !== null };
    },
  );
  const [location, setLocationState] = useState<SelectedLocation | null>(boot.location);
  const [status, setStatus] = useState<LocationState['status']>(
    boot.location ? (boot.restored ? 'restored' : 'selected') : 'none',
  );

  // Distinguishes the mount-time auto-fill (only fills while nothing was
  // chosen) from an explicit pill click (always replaces the selection).
  const explicitGpsRef = useRef(false);

  // Latest location readable inside async GPS callbacks.
  const locationRef = useRef(location);
  locationRef.current = location;

  // Whether the current location is a restored prior choice rather than
  // something the user just did (P3-014). A ref, not state: the GPS callbacks
  // need to read it without re-subscribing, and a successful fix clears it.
  const restoredRef = useRef(boot.restored);

  const setLocation = useCallback<LocationContextValue['setLocation']>((patch) => {
    setLocationState((prev) => {
      const next = typeof patch === 'function' ? patch(prev) : patch;
      // Full replacement: when the patch carries coordinates it must also
      // carry a real source, or it cannot become a selection.
      if ('latitude' in next || 'longitude' in next) {
        const merged = sanitize({ ...prev, ...next, source: next.source ?? prev?.source });
        return merged ?? prev;
      }
      // Name/region/country-only patch (e.g. the reverse-geocode label fill):
      // only meaningful when a location already exists.
      if (!prev) return prev;
      return sanitize({ ...prev, ...next, source: next.source ?? prev.source }) ?? prev;
    });
    // An explicit selection is a live choice, so the saved marker must not
    // survive it.
    restoredRef.current = false;
    setStatus('selected');
  }, []);

  const runGpsRequest = useCallback((explicit: boolean) => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setStatus('error');
      return;
    }
    explicitGpsRef.current = explicit;
    setStatus('requesting-gps');
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lon = p.coords.longitude;
        // Read BEFORE mutating: the state updater runs later, by which point
        // the ref has already been cleared.
        const wasRestored = restoredRef.current;
        setLocationState((prev) => {
          // The guard exists to protect a selection the user made THIS session
          // from being overwritten by a slow auto-fill. A restored location is
          // not that: it is prior evidence, and a fresh fix must be able to
          // replace it. Without this the refresh cleared the saved marker while
          // keeping the old coordinates, i.e. it claimed to be live without
          // being live.
          if (!explicit && prev && !wasRestored) return prev;
          return sanitize({ latitude: lat, longitude: lon, source: 'gps' });
        });
        // A real fix is live evidence of where the user is, so the saved
        // marker clears even when the coordinates end up unchanged.
        restoredRef.current = false;
        setStatus('selected');
        void reverseGeocode(lat, lon).then(({ name, district, state, country }) => {
          if (name === 'Selected point') return;
          // Only fill the administrative pieces if the fix still matches the
          // current location.
          //
          // `reverseGeocode` is used rather than the label-only helper because
          // `country` is what gates India-only services: filling only the name
          // left a GPS fix with no country, so `isInIndia` was always false and
          // a user standing in India could never receive IMD warnings.
          setLocationState((prev) =>
            prev && prev.latitude === lat && prev.longitude === lon
              ? sanitize({ ...prev, name, district, region: state, country })
              : prev,
          );
        });
      },
      (err) => {
        const denied = err?.code === PERMISSION_DENIED_CODE;
        // A failed refresh must not demote a usable location. If one exists it
        // stays, and a restored one stays marked restored: the user still has
        // not given us a current fix.
        setStatus(() => (locationRef.current ? (restoredRef.current ? 'restored' : 'selected') : denied ? 'denied' : 'error'));
      },
      GPS_OPTIONS,
    );
  }, []);

  /**
   * Mount behaviour (P3-014).
   *
   * With no location at all, ask once as before. With a restored one, only
   * refresh if permission has ALREADY been granted — a fresh fix is better
   * evidence than storage, so it wins when it arrives, and the `restored` flag
   * clears with it. Crucially, `permissions.query()` is a silent status check:
   * it never shows a prompt, so restoring a location can never surprise the
   * user with a permission dialog they did not ask for.
   */
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) return;

    if (!locationRef.current) {
      runGpsRequest(false);
      return;
    }
    if (!boot.restored) return; // deep link: leave it alone

    let cancelled = false;
    navigator.permissions
      ?.query({ name: 'geolocation' })
      .then((result) => {
        if (cancelled || result.state !== 'granted') return;
        runGpsRequest(false);
      })
      .catch(() => {
        /* Permissions API unavailable: keep the restored location, still
           labelled as saved. Silent by design. */
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestGpsLocation = useCallback(() => {
    // An explicit click is the user asking for a current fix, so whatever we
    // had is replaced and the saved marker must not survive it.
    restoredRef.current = false;
    runGpsRequest(true);
  }, [runGpsRequest]);

  const locationKey = locationKeyOf(location);

  // Mirror the canonical location into localStorage (P2-004) so a refresh does
  // not throw the selection away. This is a cache of the user's own choice, not
  // a source of truth: `loadStoredLocation` re-validates on read, and a blocked
  // or full store is a silent no-op.
  useEffect(() => {
    storeLocation(location);
  }, [location]);

  const value = useMemo<LocationContextValue>(
    () => ({ location, state: { status }, locationKey, setLocation, requestGpsLocation }),
    [location, status, locationKey, setLocation, requestGpsLocation],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used inside <LocationProvider>');
  return ctx;
}

/**
 * Friendly place name for a coordinate (Nominatim reverse geocoding). Used
 * when the user taps the map — the dot/rings move immediately, and the name
 * fills in as soon as the lookup returns. Never blocks the UI.
 */
export async function reverseGeocodeLabel(lat: number, lon: number): Promise<string> {
  return (await reverseGeocode(lat, lon)).name;
}

/**
 * Reverse-geocode a coordinate into the administrative pieces the product
 * actually needs.
 *
 * `name` is a display label only. `district` is the administrative district,
 * kept SEPARATE because warning bulletins must be labelled with the district
 * ("Kochi district"), never with a composite display name
 * ("Kochi, Kerala, India district"). `country` is the resolved country and is
 * what gates India-only services such as IMD warnings.
 */
export async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<{ name: string; district?: string; state?: string; country?: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=10`,
    );
    if (!res.ok) return { name: 'Selected point' };
    const d = await res.json();
    const a = d.address ?? {};
    return {
      name: a.city ?? a.town ?? a.village ?? a.county ?? d.display_name ?? 'Selected point',
      district: a.county ?? a.city_district ?? undefined,
      state: a.state ?? undefined,
      country: a.country ?? undefined,
    };
  } catch {
    return { name: 'Selected point' };
  }
}