/**
 * API Configuration
 *
 * Java backend (Spring Boot)
 * Python ML backend (FastAPI)
 *
 * Both base URLs are environment-driven and default to LOCALHOST.
 *
 * Why this matters: this file previously hardcoded a deployed Railway host, so
 * a local `npm run dev` session talked to a real deployed service. Every test
 * run from a developer machine was therefore a production request. Reading the
 * base from the environment, defaulting to localhost, and requiring an
 * explicit opt-in flag for the deployed host means a mistake is opt-in rather
 * than the default.
 *
 * Configure with a Vite env var in `frontend/.env.local` (gitignored) or the
 * shell:
 *
 *   VITE_JAVA_API_BASE=http://localhost:8080     # default
 *   VITE_ML_API_BASE=http://localhost:8000       # default
 *
 * To deliberately point a local build at the deployed service, opt in
 * explicitly:
 *
 *   VITE_USE_PRODUCTION_API=true
 *   VITE_JAVA_API_BASE=https://sih-weathergpt-production.up.railway.app
 *
 * The opt-in is separate from the URL on purpose: naming a production host in a
 * variable should not be enough on its own to start mutating it.
 */

// ── Backend base URLs ────────────────────────────────────────────────

/** Trailing slashes are stripped so path joins never produce a double slash. */
function normalizeBase(url: string): string {
  return url.replace(/\/+$/, "");
}

function readEnv(key: string): string | undefined {
  // `import.meta.env` is a Vite construct and is `undefined` everywhere else:
  // the Node test runner, plain SSR, or any non-Vite consumer. Reading it
  // unguarded threw `TypeError: Cannot read properties of undefined`, which
  // broke `tests/radar_core.test.ts` at import time. The optional chain keeps
  // the static replacement Vite relies on while making the module safe to
  // import anywhere; with no env present the local defaults apply.
  const env = import.meta.env as Record<string, string | undefined> | undefined;
  // These keys must be written out in full rather than looked up dynamically,
  // because Vite statically replaces each `import.meta.env.X` expression.
  const table: Record<string, string | undefined> = {
    VITE_JAVA_API_BASE: env?.VITE_JAVA_API_BASE,
    VITE_ML_API_BASE: env?.VITE_ML_API_BASE,
    VITE_USE_PRODUCTION_API: env?.VITE_USE_PRODUCTION_API,
  };
  const raw = table[key];
  return raw && raw.trim() ? raw.trim() : undefined;
}

const USE_PRODUCTION = readEnv("VITE_USE_PRODUCTION_API") === "true";

const DEFAULT_JAVA_API_BASE = "http://localhost:8080";
const DEFAULT_ML_API_BASE = "http://localhost:8000";

/**
 * Resolve a base URL.
 *
 * Without the production opt-in, a host that is not local is refused and
 * replaced with the local default, and the reason is logged once. That way a
 * stale `VITE_JAVA_API_BASE` pointing at a deployed service cannot silently
 * take effect: you have to say you mean it.
 */
function resolveBase(
  envKey: string,
  localDefault: string,
  label: string,
): string {
  const configured = readEnv(envKey);
  if (!configured) return localDefault;

  const isLocal =
    /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/i.test(configured);

  if (!isLocal && !USE_PRODUCTION) {
    console.warn(
      `[api] Ignoring ${envKey}: it points at a non-local host and ` +
        `VITE_USE_PRODUCTION_API is not "true". Using ${localDefault} instead. ` +
        `Set VITE_USE_PRODUCTION_API=true to allow the deployed service.`,
    );
    return localDefault;
  }

  if (!isLocal) {
    console.warn(
      `[api] ${label} is pointed at a DEPLOYED service (${configured}). ` +
        `Any write, POST or DELETE from this session will affect it.`,
    );
  }
  return normalizeBase(configured);
}

export const JAVA_API_BASE = resolveBase(
  "VITE_JAVA_API_BASE",
  DEFAULT_JAVA_API_BASE,
  "Java backend",
);

export const ML_API_BASE = resolveBase(
  "VITE_ML_API_BASE",
  DEFAULT_ML_API_BASE,
  "ML backend",
);

/** True when either base resolves to a non-local deployed host. */
export const USING_PRODUCTION_API = USE_PRODUCTION;


// ── Java backend endpoints ──────────────────────────────────────────

/**
 * Coordinates plus a display label, used for weather queries.
 *
 * Coordinates are the AUTHORITATIVE way to ask the backend for weather: a
 * display label may be a reverse-geocoded POI (e.g. "16th Park View(GYC)",
 * "Selected point") that Open-Meteo geocoding cannot resolve, so the name is
 * strictly presentation-only and is sent alongside — never instead of — the
 * coordinate pair.
 */
export interface WeatherQueryCoords {
  latitude: number;
  longitude: number;
  name?: string;
}

/**
 * Build the location query for a Java backend endpoint: coordinates (with an
 * optional display `name`) take precedence; otherwise the human-readable
 * location string is sent as `location=` for backward-compatible geocoding.
 */
function encodeLocationQuery(
  location: string,
  coords?: WeatherQueryCoords,
): string {
  if (coords) {
    const params = new URLSearchParams();
    params.set('latitude', String(coords.latitude));
    params.set('longitude', String(coords.longitude));
    if (coords.name && coords.name.trim()) params.set('name', coords.name.trim());
    return params.toString();
  }
  return `location=${encodeURIComponent(location)}`;
}

export const WEATHER_ENDPOINTS = {
  CURRENT: (location: string, coords?: WeatherQueryCoords) =>
    `${JAVA_API_BASE}/api/weather/current?${encodeLocationQuery(location, coords)}`,

  FORECAST: (location: string, days = 7, coords?: WeatherQueryCoords) =>
    `${JAVA_API_BASE}/api/weather/forecast?${encodeLocationQuery(location, coords)}&days=${days}`,

  NWP: (location: string, coords?: WeatherQueryCoords) =>
    `${JAVA_API_BASE}/api/weather/nwp?${encodeLocationQuery(location, coords)}`,
};

export const ADVISORIES_ENDPOINT = (
  location: string,
  sector: string,
  coords?: WeatherQueryCoords,
) =>
  `${JAVA_API_BASE}/api/weather/advisories?${encodeLocationQuery(
    location,
    coords,
  )}&sector=${encodeURIComponent(sector)}`;

export const ALERTS_ENDPOINT = (
  location: string,
  coords?: WeatherQueryCoords,
) =>
  `${JAVA_API_BASE}/api/alerts/early-warnings?${encodeLocationQuery(
    location,
    coords,
  )}`;

export const CLIMATE_ENDPOINT = (
  location: string,
  startYear = 2015,
  endYear = 2024,
  coords?: WeatherQueryCoords,
) =>
  `${JAVA_API_BASE}/api/weather/climate?${encodeLocationQuery(
    location,
    coords,
  )}&startYear=${startYear}&endYear=${endYear}`;

// ── Python ML backend endpoints ─────────────────────────────────────

/**
 * AI agent chat
 * LangChain + OpenRouter + FastAPI
 */
export const ML_AGENT_ENDPOINT =
  `${ML_API_BASE}/agent`;

/**
 * Route weather analysis
 */
export const ML_ROUTE_ENDPOINT =
  `${ML_API_BASE}/route-weather`;

// ── In-flight deduplication helper ──────────────────────────────────

const _inFlight = new Map<string, Promise<Response>>();

export function fetchWithDedup(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const key = `${options?.method ?? "GET"}:${url}`;

  const existing = _inFlight.get(key);

  if (existing) {
    return existing;
  }

  const p = fetch(url, options).finally(() => {
    _inFlight.delete(key);
  });

  _inFlight.set(key, p);

  return p;
}

// ── Network/HTTP diagnostics ────────────────────────────────────────
//
// A plain `fetch()` failure from a different origin surfaces to the caller as
// "TypeError: NetworkError when attempting to fetch resource." with no way to
// tell a CORS block, an offline client, DNS trouble, an HTTP 5xx body, or an
// abort apart. `fetchWithDiagnostics` and `FetchDiagnosticError` keep that
// distinction so the UI can show a useful message while logging the request
// URL, HTTP status and response body for developers.

/**
 * Structured failure for a cross-origin API request:
 *  - "network": no HTTP response at all (CORS block, connectivity, DNS);
 *  - "http": an HTTP error response carrying a status (body captured when present).
 * AbortError is intentionally never wrapped so callers keep treating it as
 * user/component-driven cancellation rather than a real failure.
 */
export class FetchDiagnosticError extends Error {
  readonly kind: "network" | "http" | "invalid-response";
  readonly url: string;
  readonly status?: number;
  readonly statusText?: string;
  readonly bodyText?: string;
  readonly cause?: unknown;

  constructor(info: {
    kind: FetchDiagnosticError["kind"];
    url: string;
    status?: number;
    statusText?: string;
    bodyText?: string;
    cause?: unknown;
    message: string;
  }) {
    super(info.message);
    this.name = "FetchDiagnosticError";
    this.kind = info.kind;
    this.url = info.url;
    this.status = info.status;
    this.statusText = info.statusText;
    this.bodyText = info.bodyText;
    this.cause = info.cause;
  }

  /**
   * User-safe message for display in the UI. Never echoes raw response bodies;
   * only the message constructed from the status or the backend's ApiResponse
   * envelope `message` field.
   */
  toDisplayMessage(): string {
    if (this.kind === "network") {
      return "Could not reach the weather service (network/CORS error). Check your connection, then retry — see the browser console for the request URL and details.";
    }
    return this.message;
  }
}

/**
 * fetch() wrapper that turns transport-level failures (CORS blocks, offline,
 * DNS, proxy) into a {@link FetchDiagnosticError} while preserving AbortError
 * semantics unchanged. HTTP error statuses are NOT thrown here: the caller keeps
 * the Response so it can read the body for diagnostics.
 */
export async function fetchWithDiagnostics(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (cause) {
    const signalAborted = init?.signal?.aborted === true;
    const isAbort =
      signalAborted || (cause instanceof Error && cause.name === "AbortError");
    if (isAbort) throw cause; // keep AbortError recognizable for callers

    throw new FetchDiagnosticError({
      kind: "network",
      url,
      cause,
      message:
        cause instanceof Error
          ? cause.message
          : "Unknown network failure while reaching the weather server.",
    });
  }
}

/** Cap diagnostic bodies so a large error page never floods logs. */
export function truncateForDiagnostics(
  text: string,
  maxLength = 2000,
): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}
