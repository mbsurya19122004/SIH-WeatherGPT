import json
import logging
import os
import re
import time
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from agent import (LEAK_REFUSAL, OPENROUTER_BASE_URL, build_agent, geocode_place,
                    get_weather, looks_like_prompt_leak)
from imd_warnings import warning_response
from llm_budget import (active_model, cache_get, cache_put, cache_stats,
                        is_free_tier_model)
from route_weather.analyzer import analyze_route
from route_weather.exceptions import GeocodingServiceError, LocationNotFoundError
from route_weather.geocoding import get_coordinates
from route_weather.route_api import get_route
from route_weather.route_processor import add_arrival_times, sample_route
from route_weather.weather_api import get_weather_for_route

# =========================================================
# FASTAPI APP & MIDDLEWARE
# =========================================================

app = FastAPI(
    title="WeatherGPT API",
    description="Unified API for Crop/Weather Agent and Route Weather Analysis.",
    version="1.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger("weathergpt.ml")

# The service logs its own startup state: which model, whether a key was found,
# which directory it started from, and which .env it loaded. That output is the
# whole point of those checks, so the logger has to actually emit.
#
# It did not. `logger.info(...)` went to a logger with no handler and no
# configured root, because uvicorn configures only its own "uvicorn.*" loggers
# and never touches the root one. The startup check therefore ran, computed the
# right answer, and printed nothing at all -- the worst possible failure for a
# diagnostic, since it looks exactly like "no problems found". Caught by
# reading the log after a real restart, not by any test: asserting on a return
# value cannot tell you that a message failed to appear.
#
# A dedicated handler on this logger, with propagate off, keeps uvicorn's own
# formatting and handlers untouched.
if not logger.handlers:
    _handler = logging.StreamHandler()
    _handler.setFormatter(logging.Formatter("%(levelname)s %(name)s: %(message)s"))
    logger.addHandler(_handler)
    logger.setLevel(logging.INFO)
    logger.propagate = False

# =========================================================
# ENVIRONMENT
# =========================================================
# The operator keeps OPENROUTER_API_KEY in a .env file at the project root.
# Without this the key was only ever read from the process environment, so a
# perfectly good .env was ignored and the service answered 503 "not
# configured", which is indistinguishable from a wrong key. Values are never
# logged: only the fact that a file was found is reported, at DEBUG level.
#
# Real environment variables win over .env (override=False), so a value can be
# overridden without editing the file.
_PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_ML_DIR = os.path.dirname(os.path.abspath(__file__))

# Where the service was started from, and which file (if any) it actually
# loaded. The reported bug was a chat answering "not configured" while a valid
# key sat in the project-root .env: the two processes disagreed about the world
# and neither said so. The only cure is to record the inputs at import time and
# then, at startup, compare them against the .env on disk and shout when they
# differ. `/health` publishes the same facts so the disagreement is visible
# from outside the process, not only in a log nobody is reading.
_START_CWD = os.getcwd()
_ENV_FILE_LOADED: Optional[str] = None
_ENV_FILES_ON_DISK: list = []
_ENV_DOTENV_MISSING = False

for _candidate in (
    os.path.join(_PROJECT_ROOT, ".env"),
    os.path.join(_ML_DIR, ".env"),
):
    if os.path.isfile(_candidate):
        _ENV_FILES_ON_DISK.append(_candidate)
        if _ENV_FILE_LOADED is None:
            try:
                from dotenv import load_dotenv

                load_dotenv(_candidate, override=False)
                _ENV_FILE_LOADED = _candidate
            except ImportError:  # pragma: no cover - dependency guard
                _ENV_DOTENV_MISSING = True
                logger.warning(
                    "Found %s but python-dotenv is not installed; export "
                    "OPENROUTER_API_KEY in the shell instead.",
                    _candidate,
                )


def key_in_file(path: str) -> Optional[bool]:
    """
    Whether `path` defines a non-empty OPENROUTER_API_KEY, read without the
    value ever being returned or logged.

    Three states matter, not two: absent file, present-but-blank, and
    present-and-set. Collapsing them is what made the original failure hard to
    read. Returns None when the file does not exist.

    Quoting and trailing comments are handled because a hand-written .env very
    often contains `OPENROUTER_API_KEY=""  # add yours here`, and calling that
    a usable key would have this function pronounce a process healthy on the
    strength of a file that configures nothing. That is the same class of error
    as the original bug: a confident statement about a credential that is not
    there.
    """
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as fh:
            for raw in fh:
                line = raw.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, value = line.partition("=")
                if key.strip() != "OPENROUTER_API_KEY":
                    continue
                value = value.strip()
                if value[:1] in ("'", '"'):
                    # Quoted: the value is what sits between the quotes. The
                    # closing quote is NOT the last character when a comment
                    # follows, so it has to be located rather than assumed.
                    quote = value[0]
                    close = value.find(quote, 1)
                    inner = value[1:close] if close != -1 else value[1:]
                    return bool(inner.strip())
                # Unquoted: a trailing `#` begins a comment, as dotenv treats it.
                value = value.split(" #", 1)[0].split("\t#", 1)[0].strip()
                return bool(value)
    except OSError:
        return None
    return False


def env_disagreement() -> Optional[str]:
    """
    Describe a mismatch between the .env on disk and what this process loaded.

    Returns None when the process is consistent with disk. Otherwise a short
    human-readable reason, e.g. "a project-root .env defines OPENROUTER_API_KEY
    but this process did not load it". This is the single place that decides
    whether the running service can be trusted to know about the key, and it
    deliberately never reads or returns the key itself.
    """
    if _ENV_DOTENV_MISSING and _ENV_FILES_ON_DISK:
        return (
            "python-dotenv is not installed, so the .env file was found but "
            "not loaded; export OPENROUTER_API_KEY in the shell instead"
        )
    in_process = agent_configured()
    for path in _ENV_FILES_ON_DISK:
        if key_in_file(path) and not in_process:
            return (
                f"{path} defines OPENROUTER_API_KEY but this process did not "
                "load it; the running service will report 503 not-configured "
                "while the key exists on disk"
            )
    if in_process and not any(key_in_file(p) for p in _ENV_FILES_ON_DISK):
        return (
            "OPENROUTER_API_KEY is set in the process environment but no .env "
            "on disk defines it; the service is running on a key you cannot "
            "see in the file"
        )
    return None


# =========================================================
# INITIALIZATION (OPENROUTER / LANGCHAIN AGENT)
# =========================================================

# The model provider is OpenRouter (see agent.py). The agent is built lazily so
# the service starts, and /health reports liveness, even when
# OPENROUTER_API_KEY is absent — a missing key then surfaces as a clear 503 at
# request time rather than preventing the process from booting.
_agent_instance = None


def get_agent():
    global _agent_instance
    if _agent_instance is None:
        # Reads OPENROUTER_API_KEY / LLM_MODEL from the environment.
        _agent_instance = build_agent()
    return _agent_instance


def agent_configured() -> bool:
    """Whether a model provider key is present. Never returns the key itself."""
    return bool(os.environ.get("OPENROUTER_API_KEY"))


@app.on_event("startup")
def log_provider_state() -> None:
    """
    Log the model in use and the key state at startup.

    Both facts matter operationally and neither is visible from outside the
    process. Which model is active determines answer quality and tool-calling
    reliability; whether a key was found determines whether the agent works at
    all, and a missing .env produces the same 503 as a wrong key. The key
    itself is never logged, only whether one is present.
    """
    model = active_model()
    logger.info("model provider : openrouter (%s)", OPENROUTER_BASE_URL)
    logger.info("model in use   : %s", model)
    if is_free_tier_model(model):
        logger.info(
            "model tier     : FREE — subject to a daily request allowance "
            "(50/day on the current key). The chat will answer until that "
            "allowance is used, then report the reset time. Weather, "
            "forecasts and warnings are unaffected and never consume it."
        )
    else:
        logger.info("model tier     : paid / BYOK — no free-tier daily cap")

    # These three lines are the cure for "it says not configured but the key
    # is right there". Without them the only evidence is that a key was found,
    # which is indistinguishable from a process started in the wrong directory,
    # before the .env existed, or by an older revision that had no loader.
    logger.info("service cwd    : %s", _START_CWD)
    # Build the sentence, then log it whole. Doing it this way removes the
    # whole class of "two placeholders, one of them nested inside an argument"
    # mistake, which is exactly what shipped in the first version of this line:
    # logging raised TypeError, the traceback filled the startup log, and the
    # env file path -- the one fact this whole function exists to report -- was
    # the one line that never appeared.
    if _ENV_FILE_LOADED:
        _env_line = _ENV_FILE_LOADED
    else:
        _seen = ", ".join(_ENV_FILES_ON_DISK) or "no .env at project root or in ML/"
        _env_line = f"NONE FOUND (checked: {_seen})"
    logger.info("env file loaded: %s", _env_line)
    if agent_configured():
        logger.info("api key        : present (value never logged)")
    else:
        logger.warning(
            "api key        : NOT FOUND. The agent will return 503 until "
            "OPENROUTER_API_KEY is set in the environment or a project-root "
            ".env. Deterministic weather and warning paths still work."
        )

    # The loud one: this process and the .env on disk tell different stories.
    # Do not let a user debug a key that was never the problem.
    mismatch = env_disagreement()
    if mismatch:
        logger.error(
            "ENV MISMATCH   : %s. Restart the service from the project root "
            "so it loads the same .env you are editing.",
            mismatch,
        )


# Set only by a real, successful provider round trip (see weather_agent).
# It is process-local and starts False, so a freshly started service never
# claims validation it has not performed.
_PROVIDER_VALIDATED = {"ok": False}

# Free-tier provider resilience. Shared upstream pools return 429 (rate limited)
# and 503 (overloaded) intermittently; both are retried with linear backoff
# before the user is told anything.
_PROVIDER_ATTEMPTS = 4
_PROVIDER_BACKOFF_BASE = 3.0
_TRANSIENT_EXC_NAMES = ("RateLimit", "Overloaded", "ServiceUnavailable", "APIConnection", "Timeout")
_TRANSIENT_MSG_HINTS = ("429", "503", "rate limit", "rate-limit", "overloaded", "temporarily")


def _is_transient_provider_error(e: Exception) -> bool:
    """
    Whether a provider failure is worth retrying.

    The exception CLASS is not sufficient on its own: OpenRouter surfaces an
    upstream 429/503 as a plain ValueError whose message is the error dict, so
    the message is inspected too. Without that, a busy provider looked like a
    hard failure and the user saw "the model could not be reached".
    """
    if any(t in type(e).__name__ for t in _TRANSIENT_EXC_NAMES):
        return True
    return any(t in str(e).lower() for t in _TRANSIENT_MSG_HINTS)


def _daily_cap_info(e: Exception) -> Optional[datetime]:
    """
    If this 429 is the DAILY free-model cap, return the reset time.

    The daily cap must be handled differently from a short-window rate limit:
    retrying 3+6+9 seconds cannot help, and telling the user to "try again in a
    few moments" is actively misleading when the next opportunity is tomorrow.

    The reset time is read from the rate-limit headers when the SDK exposes
    them, and otherwise from the error body, whose `metadata.headers` carries
    `X-RateLimit-Reset` as epoch milliseconds.
    """
    text = str(e)
    is_daily = "free-models-per-day" in text or "free_tier_daily" in text
    if not is_daily:
        return None

    reset_ms = None
    # Prefer structured headers off the exception response, if present.
    response = getattr(e, "response", None)
    headers = getattr(response, "headers", None)
    if headers is not None:
        try:
            raw = headers.get("X-RateLimit-Reset")
            if raw:
                reset_ms = int(raw)
        except (TypeError, ValueError):
            reset_ms = None
    if reset_ms is None:
        m = re.search(r"X-RateLimit-Reset'?:\s*'?(\d{10,})", text)
        if m:
            reset_ms = int(m.group(1))
    if reset_ms is None:
        return None
    # OpenRouter reports epoch milliseconds.
    seconds = reset_ms / 1000 if reset_ms > 1e11 else reset_ms
    try:
        return datetime.fromtimestamp(seconds, tz=timezone(timedelta(hours=5, minutes=30)))
    except (OverflowError, OSError, ValueError):
        return None


@app.get("/health")
def health():
    """
    Liveness for this service.

    Deliberately cheap and deliberately honest:
      - reports that the FastAPI process is serving;
      - reports whether a model provider is CONFIGURED (a boolean, never the
        key, and never a network call);
      - makes no LLM completion, because /health is polled by start-up scripts
        and an expensive call would make start-up slow and flaky.

    It does not probe any model endpoint. The previous implementation reported
    on a local Ollama server, which no longer exists in this architecture.
    """
    return {
        "status": "ok",
        "service": "weathergpt-ml",
        "version": "1.0.1",
        "model_provider": "openrouter",
        # Present/absent only, never the value and never its length: a key is a
        # credential and a health endpoint is the wrong place to describe one.
        "model_provider_configured": agent_configured(),
        # "configured" must never be mistaken for "working". A key can be
        # present and still be a placeholder from a stale process, which is
        # exactly what happened once: /health said configured: true because a
        # leftover process carried a throwaway value, while no real key existed
        # anywhere. So validation is tracked SEPARATELY and is only ever set by
        # an actual provider call. Until one succeeds this stays false, which
        # makes the two states impossible to confuse.
        "model_provider_validated": bool(_PROVIDER_VALIDATED["ok"]),
        # F-3 visibility. The active model and whether it is on the free tier
        # are reported here so the state is readable without opening the code.
        # This is deliberately informational: it changes nothing, and it exists
        # because the 50-request-per-day allowance is an operator decision that
        # should not require reading a source file to discover.
        "model": active_model(),
        "model_is_free_tier": is_free_tier_model(active_model()),
        "answer_cache": cache_stats(),
        # Why the boolean above is what it is. "configured" alone cannot tell a
        # healthy process from one started in the wrong directory, before the
        # .env existed, or by a revision with no loader at all, which is
        # precisely the confusion behind the reported "not configured while the
        # key exists". These fields let anyone answer that question from
        # outside the process. Paths only; no credential is ever included, and
        # `mismatch` is null when the process agrees with the file on disk.
        "env": {
            "cwd": _START_CWD,
            "loaded": _ENV_FILE_LOADED,
            "found_on_disk": list(_ENV_FILES_ON_DISK),
            "mismatch": env_disagreement(),
        },
    }


# =========================================================
# REQUEST / RESPONSE MODELS
# =========================================================

class LocationPayload(BaseModel):
    latitude: float
    longitude: float
    accuracy: Optional[float] = None


class AgentRequest(BaseModel):
    prompt: str
    location: Optional[LocationPayload] = None


class AgentResponse(BaseModel):
    message: str


class RouteWeatherRequest(BaseModel):
    origin: str
    destination: str
    departure_time: str


class RouteWeatherResponse(BaseModel):
    message: str
    routes: list[dict[str, Any]]  # Each route: route_info, risk_summary, weather_data, map_json
    index_html: str  # HTML for the primary (first) route


# =========================================================
# HELPER FUNCTIONS
# =========================================================

def reverse_geocode(latitude: float, longitude: float) -> Optional[str]:
    """
    Turn coordinates into a human-readable place name using OpenStreetMap's
    free Nominatim reverse-geocoding endpoint. Returns None on any failure
    so the caller can fall back to raw coordinates instead of erroring out.
    """
    try:
        params = urllib.parse.urlencode(
            {
                "lat": latitude,
                "lon": longitude,
                "format": "jsonv2",
                "zoom": 10,
                "addressdetails": 1,
            }
        )
        url = f"https://nominatim.openstreetmap.org/reverse?{params}"
        req = urllib.request.Request(
            url,
            headers={
                # Nominatim requires an identifying User-Agent for API use.
                "User-Agent": "WeatherGPT/1.0 (weather assistant app)"
            },
        )
        with urllib.request.urlopen(req, timeout=5) as res:
            data = json.loads(res.read().decode("utf-8"))

        address = data.get("address", {})
        city = (
            address.get("city")
            or address.get("town")
            or address.get("village")
            or address.get("county")
        )
        state = address.get("state")
        country = address.get("country")

        parts = [part for part in (city, state, country) if part]
        if parts:
            return ", ".join(parts)

        return data.get("display_name")
    except Exception:
        return None


def build_location_context(location: Optional[LocationPayload]) -> Optional[dict[str, str]]:
    """
    Turn a LocationPayload into a system message that tells the agent the
    user's current place, so it can answer "my location" style queries
    without asking the user to type a city.
    """
    if location is None:
        return None

    place_name = reverse_geocode(location.latitude, location.longitude)

    if place_name:
        location_desc = (
            f"{place_name} (approximately {location.latitude:.4f}, {location.longitude:.4f})"
        )
    else:
        location_desc = f"coordinates {location.latitude:.4f}, {location.longitude:.4f}"

    return {
        "role": "system",
        "content": (
            f"The user's current device location is: {location_desc}. "
            "If the user asks about 'my location', 'here', 'current location', "
            "or otherwise doesn't name a place, use this location directly instead "
            "of asking them to provide one."
        ),
    }


def generate_index_html(map_data: dict[str, Any]) -> str:
    """
    Generate a standalone Leaflet map HTML page matching the CLI output fields.
    """
    map_data_json = json.dumps(
        map_data,
        indent=2,
        ensure_ascii=False,
    )

    return f"""<!DOCTYPE html>
<html>
<head>
    <title>WeatherGPT Map</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
        body {{ margin: 0; padding: 0; }}
        #map {{ height: 100vh; width: 100vw; }}
        .leaflet-popup-content {{
            font-family: Arial, sans-serif;
            font-size: 13px;
            line-height: 1.4;
        }}
        .risk-HIGH {{ color: #d9534f; font-weight: bold; }}
        .risk-MODERATE {{ color: #f0ad4e; font-weight: bold; }}
        .risk-LOW {{ color: #5cb85c; font-weight: bold; }}
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        const mapData = {map_data_json};
        const map = L.map('map');
        
        L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png', {{
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }}).addTo(map);

        if (mapData.route && mapData.route.length > 0) {{
            const polyline = L.polyline(mapData.route, {{color: 'blue'}}).addTo(map);
            map.fitBounds(polyline.getBounds());
        }}

        if (mapData.weather_points) {{
            mapData.weather_points.forEach(pt => {{
                // Robust lat/lon extraction
                const lat = pt.lat ?? pt.latitude ?? (Array.isArray(pt.coordinates) ? pt.coordinates[1] : null);
                const lon = pt.lon ?? pt.lng ?? pt.longitude ?? (Array.isArray(pt.coordinates) ? pt.coordinates[0] : null);

                if (lat !== null && lon !== null) {{
                    const popupContent = `
                        <div>
                            <b>Distance:</b> ${{pt.distance_from_start !== undefined ? pt.distance_from_start.toFixed(1) : 'N/A'}} km<br>
                            <b>Arrival:</b> ${{pt.arrival_time ? pt.arrival_time.substring(11, 16) : 'N/A'}}<br>
                            <b>Condition:</b> ${{pt.condition || 'N/A'}}<br>
                            <b>Temperature:</b> ${{pt.temperature !== undefined ? pt.temperature : 'N/A'}} °C<br>
                            <b>Rain probability:</b> ${{pt.rain_probability !== undefined ? pt.rain_probability : 'N/A'}}%<br>
                            <b>Wind:</b> ${{pt.wind_speed !== undefined ? pt.wind_speed : 'N/A'}} km/h<br>
                            <b>Risk:</b> <span class="risk-${{pt.risk}}">${{pt.risk || 'N/A'}}</span>
                        </div>
                    `;

                    L.marker([lat, lon])
                     .bindPopup(popupContent)
                     .addTo(map);
                }}
            }});
        }}
    </script>
</body>
</html>"""


# =========================================================
# ENDPOINTS
# =========================================================

@app.get("/")
def root():
    return {
        "message": "welcome to WeatherGPT",
        "services": ["weather_agent", "route_weather"],
    }



# Filler words that can sit between a place name and a time expression. The
# original capture regex kept them, so "in Greater Noida right now" resolved the
# place as "Greater Noida right" and the geocoder correctly reported no such
# place — a real locality became unresolvable because of grammar, not data.
_PLACE_NOISE = {
    "right", "just", "now", "at", "the", "moment", "currently", "today",
    "tomorrow", "please", "and", "also", "a", "an", "is", "it", "for",
    "here", "there", "over", "around", "nearby", "near",
}

# Time expressions the capture must stop before. A comma is a terminator ONLY
# when it ends the clause: "in Kochi, Japan" must keep ", Japan", while
# "in Kochi, and should I wear boots" must stop at the comma. A capitalised word
# after the comma marks a region qualifier, which is how place names are
# written; a lowercase word is ordinary clause punctuation.
#
# The capital-letter test is wrapped in a case-sensitive group on purpose:
# these patterns compile with re.IGNORECASE, and under IGNORECASE a bare [A-Z]
# also matches lowercase — which would make the negative lookahead fail at
# every comma and swallow the rest of the sentence.
_PLACE_STOP = (
    r"(?=\s+(?:today|tomorrow|now|currently|this\s+week|tonight)\b"
    r"|[?.!;]"
    r"|,(?!\s*(?-i:[A-Z]))"
    r"|$)"
)


def extract_place(prompt: str) -> Optional[str]:
    """
    Pull a place name out of a short weather question.

    Returns None when the phrase is a pronoun or a description rather than a
    name ("my location", "here"), so the caller can fall through to the model
    instead of asking a geocoder to resolve a non-place.
    """
    match = re.search(
        r"\b(?:in|at|for|near)\s+([A-Za-z][A-Za-z .',-]*?)" + _PLACE_STOP,
        prompt,
        re.IGNORECASE,
    )
    if not match:
        return None

    # Trim trailing filler: "Greater Noida right" -> "Greater Noida".
    words = match.group(1).split()
    while words and words[-1].lower().strip(".,'") in _PLACE_NOISE:
        words.pop()
    # Drop a dangling separator left behind once the filler is gone, so
    # "Kochi, right" cannot reach the geocoder as "Kochi,".
    place = " ".join(words).strip().strip(",").strip()
    if not place:
        return None

    # Pronouns and bare descriptions are not places. Returning None sends the
    # question to the model, which can ask for clarification.
    if place.lower() in {"my location", "the location", "my area", "here", "there", "outside"}:
        return None
    return place


def fast_weather_response(prompt: str, location: Optional[LocationPayload] = None) -> Optional[str]:
    text = prompt.lower().strip()
    weather_terms = (
        "weather", "temperature", "temp", "rain", "rainfall",
        "raining", "precipitation", "wind", "humidity",
        "hot", "cold", "forecast"
    )
    if not any(term in text for term in weather_terms):
        return None

    if location:
        weather_raw = get_weather.invoke({
            "latitude": location.latitude,
            "longitude": location.longitude,
        })
        location_name = "your location"
    else:
        place = extract_place(prompt)
        if not place:
            return None
        geo_raw = geocode_place.invoke({"place_name": place})
        geo = json.loads(geo_raw)

        if "error" in geo:
            # A qualifier the geocoder could not honour is actionable — the
            # user can fix it. Surface that specific reason instead of
            # flattening it into "couldn't find", which sends them looking for
            # a spelling mistake that isn't there. Transport failures keep the
            # generic wording, because their message carries a requests
            # exception string that must never reach a user.
            if geo.get("reason") == "qualifier_mismatch":
                return geo["error"]
            return f"Sorry, I couldn't find {place}."

        # Name the place we ACTUALLY used. The geocoder's bare "name" is not
        # enough: "Kochi" resolves to Kochi, Japan here, and answering
        # "Kochi: 21.7°C" would present one country's weather as if it were
        # unambiguously the place the user asked about. When the geocoder
        # reports a collision, say so and ask which one is meant rather than
        # picking silently.
        if geo.get("ambiguous"):
            # One line per candidate, and only the parts that actually
            # disambiguate: repeating the name as its own region ("Kochi,
            # Kochi, Japan") reads like a bug and helps nobody.
            seen = set()
            options = []
            for c in geo.get("candidates", []):
                cname = c.get("name")
                country = c.get("country")
                if not cname or not country:
                    continue
                # Keep the name, drop a region that merely repeats it
                # ("Kochi, Kochi" -> "Kochi"), then the country.
                parts = [cname]
                region = c.get("admin1")
                if region and region.strip().lower() != cname.strip().lower():
                    parts.append(region)
                parts.append(country)
                label = ", ".join(parts)
                if label.lower() in seen:
                    continue
                seen.add(label.lower())
                options.append(label)
            joined = "; ".join(options[:3])
            return (
                f"\"{place}\" matches more than one place ({joined}). "
                "Which one did you mean?"
            )

        # Name the place actually used, without repeating a name as its own
        # region: "Kochi, Japan", not "Kochi, Kochi, Japan".
        name = geo.get("name") or place
        parts = [
            p for p in (name, geo.get("admin1"), geo.get("country"))
            if p and p.strip().lower() != name.strip().lower()
        ]
        location_name = ", ".join([name, *parts])

        weather_raw = get_weather.invoke({
            "latitude": geo["latitude"],
            "longitude": geo["longitude"],
        })

    weather = json.loads(weather_raw)

    if "error" in weather:
        return "Sorry, I couldn't fetch the weather right now."

    current = weather["current"]
    today = weather["today_forecast"]

    if "rain" in text or "precipitation" in text or "raining" in text:
        chance = today["chance_of_rain_percent"]
        amount = today["total_precipitation_mm"]
        if chance is not None:
            answer = f"{location_name}: today's rain chance is {chance}%"
            if amount is not None:
                answer += f", with about {amount} mm of precipitation expected"
            return answer + "."
    elif "temperature" in text or "temp" in text or "hot" in text or "cold" in text:
        return (
            f"{location_name}: currently {current['temperature_c']}°C, "
            f"feels like {current['feels_like_c']}°C. "
            f"Today's range is {today['min_temp_c']}°C to {today['max_temp_c']}°C."
        )
    elif "wind" in text:
        return f"{location_name}: current wind speed is {current['windspeed_kmh']} km/h."
    elif "humidity" in text:
        return f"{location_name}: current humidity is {current['humidity_percent']}%."
    else:
        return (
            f"{location_name}: {current['temperature_c']}°C, "
            f"{current['condition']}, humidity {current['humidity_percent']}%, "
            f"wind {current['windspeed_kmh']} km/h. "
            f"Today's rain chance is {today['chance_of_rain_percent']}%."
        )


@app.post("/agent", response_model=AgentResponse)
def weather_agent(request: AgentRequest):
    """
    Answer a weather question.

    Two distinct paths, and the difference matters for testing:

      FAST_PATH  `fast_weather_response` recognises simple, unambiguous
                 questions and answers them from Open-Meteo directly WITHOUT
                 calling a model. This is product functionality (fast, free,
                 deterministic for the common cases) and it is kept.

      LLM_BACKED anything else is sent to the OpenRouter-hosted model with the
                 weather tools available.

    Responses declare which path served them in the `X-Response-Path` header, so
    a test (or an operator) can tell a regex answer from real model inference
    without guessing. Prompt-security results from the fast path are NOT
    evidence about the model.
    """
    # A warning question is answered DETERMINISTICALLY, before anything else and
    # with no model involved. A warning is a fact with a source: a model can
    # invent one, soften one, or refuse to answer, and none of those are
    # acceptable for the one output where being wrong could matter. This runs
    # BEFORE the conditions fast path, which used to answer "is there an IMD
    # alert for Thrissur?" with the caller's current temperature.
    warning_answer = warning_response(request.prompt, request.location)
    if warning_answer is not None:
        return JSONResponse(
            content={"message": warning_answer},
            headers={"X-Response-Path": "warnings_deterministic"},
        )

    fast_response = fast_weather_response(request.prompt, request.location)
    if fast_response is not None:
        return JSONResponse(
            content={"message": fast_response},
            headers={"X-Response-Path": "fast_path"},
        )

    if not agent_configured():
        raise HTTPException(
            status_code=503,
            # Shown to the user now, so it must not name environment variables
            # or internal services. The key state belongs in the startup log
            # and /health, where an operator will look for it.
            detail=(
                "The weather assistant is not set up on this server, so it "
                "cannot answer questions. Weather, forecasts and warnings "
                "still work."
            ),
        )

    messages: list[dict[str, str]] = []

    location_context = build_location_context(request.location)
    if location_context:
        messages.append(location_context)

    messages.append(
        {
            "role": "user",
            "content": request.prompt,
        }
    )

    # Free-tier models sit on shared upstream pools and fail transiently with
    # 429 (rate limited) or 503 (provider overloaded) for reasons unrelated to
    # this service. Those are retried with linear backoff, because reporting
    # them as "the model is unavailable" would be untrue: nothing is broken,
    # the provider is momentarily busy.
    # A short-TTL cache in front of the model. The binding constraint is the
    # daily free-tier allowance (50 requests/day on this key), not latency, and
    # repeated or rephrased questions are the cheapest waste to remove. Fast
    # paths have already returned by this point, so a hit here means a genuine
    # repeat of an identical model-backed question.
    cached = cache_get(request.prompt)
    if cached is not None:
        return JSONResponse(
            content={"message": cached},
            headers={"X-Response-Path": "llm_backed_cached"},
        )

    answer = None
    last_error: Exception | None = None
    daily_cap_reset: Optional[datetime] = None
    for attempt in range(_PROVIDER_ATTEMPTS):
        try:
            result = get_agent().invoke({"messages": messages})
            # A completed round trip is the only thing that marks the key
            # validated. A failure proves nothing about the key.
            _PROVIDER_VALIDATED["ok"] = True
            answer = result["messages"][-1].content
            # Hard control: the model reproduced the system prompt verbatim
            # under direct extraction, and again inside a refusal, so every
            # answer is checked before it leaves the service. See
            # agent.looks_like_prompt_leak.
            if looks_like_prompt_leak(answer):
                logger.warning("output guard: answer matched the system prompt, refusing")
                answer = LEAK_REFUSAL
            break
        except RuntimeError:
            # Missing key / misconfiguration: not transient, never retried.
            raise
        except Exception as e:  # noqa: BLE001 - filtered below
            # A daily-cap 429 is NOT retried. Waiting cannot help, and the
            # short-window backoff would turn a clear "tomorrow" into an
            # 18-second wait followed by the same failure.
            reset_at = _daily_cap_info(e)
            if reset_at is not None:
                daily_cap_reset = reset_at
                last_error = e
                break
            if not _is_transient_provider_error(e) or attempt == _PROVIDER_ATTEMPTS - 1:
                last_error = e
                break
            delay = _PROVIDER_BACKOFF_BASE * (attempt + 1)
            logger.warning(
                "transient provider failure (%s); retry %s/%s in %.1fs",
                type(e).__name__, attempt + 1, _PROVIDER_ATTEMPTS - 1, delay,
            )
            time.sleep(delay)

    if answer is None:
        # The detail is logged server-side; the client gets a stable,
        # non-leaking message naming the actual cause class.
        logger.exception("agent invocation failed")
        if daily_cap_reset is not None:
            # Say what is actually true, and when it changes. "Try again in a
            # few moments" would be wrong here and would send the user away
            # for a wait that cannot succeed.
            when = daily_cap_reset.strftime("%d %b %Y, %H:%M IST")
            raise HTTPException(
                status_code=503,
                detail=(
                    "The AI assistant has reached its daily limit and resets at "
                    f"{when}. Weather, forecasts and warnings still work."
                ),
            )
        if last_error is not None and _is_transient_provider_error(last_error):
            raise HTTPException(
                status_code=503,
                detail=(
                    "The weather assistant is busy right now: the model "
                    "provider is rate limiting requests. Please try again in a "
                    "few moments."
                ),
            )
        raise HTTPException(
            status_code=502,
            # The exception class name is an implementation detail. The operator
        # gets it from the logger.exception() call immediately above; the user
        # gets the fact and a next step.
        detail="The weather model could not be reached. Please try again in a moment.",
        )

    cache_put(request.prompt, answer)

    return JSONResponse(
        content={"message": answer},
        headers={"X-Response-Path": "llm_backed"},
    )


@app.post("/route-weather", response_model=RouteWeatherResponse)
def route_weather(request: RouteWeatherRequest):
    # 1. Geocode locations with proper error handling
    try:
        origin = get_coordinates(request.origin)
    except LocationNotFoundError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    except GeocodingServiceError as e:
        raise HTTPException(
            status_code=503,
            detail=str(e)
        )
    
    try:
        destination = get_coordinates(request.destination)
    except LocationNotFoundError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    except GeocodingServiceError as e:
        raise HTTPException(
            status_code=503,
            detail=str(e)
        )

    # 2. Parse departure time
    today = datetime.now().strftime("%Y-%m-%d")
    departure_time = datetime.strptime(
        f"{today} {request.departure_time}",
        "%Y-%m-%d %H:%M",
    )

    # 3. Fetch routes (with alternatives)
    routes = get_route(origin, destination, alternatives=True)

    all_routes_data = []
    primary_map_data = None

    for idx, route in enumerate(routes):
        # Sample route points
        route_points = sample_route(
            route["coordinates"],
            interval_km=30,
        )

        # Add estimated arrival times along route
        route_points = add_arrival_times(
            route_points,
            route["distance_km"],
            route["duration_minutes"],
            departure_time,
        )

        # Fetch and analyze weather
        weather_data = get_weather_for_route(route_points)
        analyzed_data = analyze_route(weather_data)

        # Risk summary aggregation
        high = sum(1 for item in analyzed_data if item["risk"] == "HIGH")
        moderate = sum(1 for item in analyzed_data if item["risk"] == "MODERATE")
        low = sum(1 for item in analyzed_data if item["risk"] == "LOW")

        # Build route label
        risk_parts = []
        if high > 0: risk_parts.append(f"{high} high-risk")
        if moderate > 0: risk_parts.append(f"{moderate} moderate-risk")
        if low > 0: risk_parts.append(f"{low} low-risk")
        risk_label = ", ".join(risk_parts) if risk_parts else "No risk"
        
        route_label = f"Route {chr(65 + idx)} · {route['distance_km']:.0f} km, {route['duration_minutes']:.0f} min · {risk_label}"
        if idx == 0:
            route_label = f"Route A (primary) · {route['distance_km']:.0f} km, {route['duration_minutes']:.0f} min · {risk_label}"

        # Construct map JSON
        map_data = {
            "route": [
                [coordinate[1], coordinate[0]]
                for coordinate in route["coordinates"]
            ],
            "weather_points": [
                {
                    **weather,
                    "lat": weather.get("lat") or weather.get("latitude") or (weather.get("coordinates", [None, None])[1] if isinstance(weather.get("coordinates"), (list, tuple)) else None),
                    "lon": weather.get("lon") or weather.get("lng") or weather.get("longitude") or (weather.get("coordinates", [None, None])[0] if isinstance(weather.get("coordinates"), (list, tuple)) else None),
                    "arrival_time": weather["arrival_time"].isoformat() if hasattr(weather.get("arrival_time"), "isoformat") else str(weather.get("arrival_time")),
                    "weather_time": weather["weather_time"].isoformat() if hasattr(weather.get("weather_time"), "isoformat") else str(weather.get("weather_time")),
                }
                for weather in analyzed_data
            ],
            "route_info": {
                "origin": request.origin,
                "destination": request.destination,
                "distance_km": route["distance_km"],
                "duration_minutes": route["duration_minutes"],
                "departure_time": departure_time.isoformat(),
                "route_index": idx,
                "route_label": route_label,
            },
        }

        # Save primary route artifacts
        if idx == 0:
            primary_map_data = map_data
            map_folder = os.path.join(os.path.dirname(__file__), "map")
            os.makedirs(map_folder, exist_ok=True)

            json_path = os.path.join(map_folder, "route_weather_data.json")
            with open(json_path, "w", encoding="utf-8") as file:
                json.dump(map_data, file, indent=2)

            index_html = generate_index_html(map_data)
            html_path = os.path.join(map_folder, "index.html")
            with open(html_path, "w", encoding="utf-8") as file:
                file.write(index_html)

        all_routes_data.append({
            "route_info": map_data["route_info"],
            "risk_summary": {"HIGH": high, "MODERATE": moderate, "LOW": low},
            "weather_data": analyzed_data,
            "map_json": map_data,
        })

    return {
        "message": f"WeatherGPT route analysis complete — {len(all_routes_data)} route(s) analyzed",
        "routes": all_routes_data,
        "index_html": generate_index_html(primary_map_data) if primary_map_data else "",
    }
