"""
Deterministic IMD warning lookup.

This module answers warning questions WITHOUT a model. That is the whole point:
a warning is either issued or it is not, and that is a fact with a source, not
something to be generated. A model asked "is there a warning in Thrissur" can
invent one, soften one, or refuse to answer; none of those are acceptable for
the one class of output where being wrong could get someone hurt.

Rules this module obeys, all of them testable:
  * An active warning is relayed VERBATIM, with issue time and source.
  * "None active" is only ever said when a fetch actually succeeded and
    returned an empty list. A failed fetch says the check could not be
    completed, never "no warning".
  * A location outside India gets a no-coverage statement. IMD does not publish
    for other countries, and claiming either presence or absence of an Indian
    warning there would be a claim about a survey nobody made.
  * A place named in the question wins over the caller's own location. Asking
    about Thrissur while standing in Kochi must answer for Thrissur.
"""

import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from typing import Any, Optional

IST = timezone(timedelta(hours=5, minutes=30))

# Where the Java backend (the owner of IMD data) is listening.
JAVA_BASE = os.environ.get("JAVA_API_BASE", "http://localhost:8080").rstrip("/")

FETCH_TIMEOUT = 12

# Java's AlertSeverity enum, mapped to the tiers the UI renders.
SEVERITY_TO_TIER = {
    "LOW": "green",
    "MODERATE": "yellow",
    "SEVERE": "orange",
    "EXTREME": "red",
}

# ---------------------------------------------------------------------------
# Intent detection
# ---------------------------------------------------------------------------

# Words that mean "is there a hazard warning here", as opposed to "what is the
# weather". Matched on word boundaries so "alerting" does not trip "alert".
WARNING_TERMS = (
    r"warning", r"alerts?", r"advisory", r"advisories", r"imd",
    r"cyclone", r"heatwave", r"heat wave", r"cold wave", r"flood",
    r"red alert", r"orange alert", r"yellow alert", r"green alert",
    r"\bwarned?\b", r"\bcaution\b", r"hazard", r"severe weather",
)

# A question shaped like "is there <hazard> for <place>" is warning intent even
# if it avoids the vocabulary above.
HAZARD_QUESTION = re.compile(
    r"\b(is|are)\s+(there|any)\b[^?.]{0,60}?\b(for|in|at|near)\b", re.IGNORECASE
)

# Place words that mark a location in a warning question. Ordered longest first
# so "Gaur Yamuna City" is preferred over "Gaur".
PLACE_STOPWORDS = {
    "is", "are", "there", "any", "the", "a", "an", "for", "in", "at", "near",
    "of", "do", "does", "i", "we", "you", "current", "currently", "right",
    "now", "today", "active", "warning", "warnings", "alert", "alerts",
    "advisory", "imd", "district", "please", "tell", "me", "about", "check",
    "has", "have", "had", "weather", "forecast", "rain", "raining", "hot",
    "cold", "wind", "temperature", "humidity", "and", "or", "but", "what",
    "whats", "whats", "condition", "conditions", "right", "please", "need",
    "want", "know", "if", "when", "where", "which", "who", "why", "how",
}


# A question about what a WARNING TERM MEANS, rather than about whether one is
# active somewhere. These must fall through to the agent: routing "what does a
# red alert mean?" to a district lookup answered "I could not work out which
# place you mean", which is worse than not routing it at all.
EXPLANATORY = re.compile(
    r"\b(what\s+(does|do)\b[^?.]{0,40}\bmean\b"
    r"|explain\b"
    r"|difference\s+between\b"
    r"|what\s+is\s+(a|an|the)\s+(cyclone|heatwave|flood|advisory|alert|warning|monsoon)\b"
    r"|how\s+do\s+i\s+(read|interpret|understand)\b"
    r"|define\b)",
    re.IGNORECASE,
)


def is_warning_question(prompt: str) -> bool:
    """
    Whether the prompt is asking about a hazard WARNING rather than conditions.

    Biased toward TRUE, because a false negative hands a warning question to a
    model that can invent one. The bias is bounded by two later gates: an
    explanatory question is never warning intent, and a warning question must
    resolve to a place (named in the question, or supplied by the caller)
    before this module answers anything.
    """
    if EXPLANATORY.search(prompt):
        return False
    text = prompt.lower()
    if re.search("|".join(WARNING_TERMS), text):
        return True
    if HAZARD_QUESTION.search(prompt) and re.search(r"storm|rain|wind|heat|cold|flood|cyclone|weather", text):
        return True
    return False


def extract_place_for_warning(prompt: str) -> Optional[str]:
    """
    Pull the place out of a warning question, so it beats the caller's location.

    "Is there any active IMD alert for Thrissur district right now?"
      -> "Thrissur district"
    "Any cyclone warning in Odisha?"
      -> "Odisha"
    """
    # Prefer an explicit "for <place>" / "in <place>" clause.
    m = re.search(
        r"\b(?:for|in|at|near|around)\s+([A-Za-z][A-Za-z .'-]*?)"
        r"(?=\s+(?:right\s+now|now|today|currently|this\s+week|at\s+the\s+moment)\b|[?.!,;]|$)",
        prompt,
        re.IGNORECASE,
    )
    if m:
        words = [w for w in m.group(1).split() if w.lower().strip(".,'") not in PLACE_STOPWORDS]
        cand = " ".join(words).strip()
        if cand:
            return cand

    # Otherwise fall back to the longest capitalised run in the sentence, which
    # for a place name is a decent heuristic and never invents a location.
    runs = re.findall(r"\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})\b", prompt)
    runs = [r for r in runs if r.lower() not in PLACE_STOPWORDS and len(r) > 2]
    if runs:
        return max(runs, key=len)
    return None


def _ist_now() -> str:
    return datetime.now(IST).strftime("%d %b %Y, %H:%M IST")


# ---------------------------------------------------------------------------
# District resolution and the warning fetch
# ---------------------------------------------------------------------------

def _reverse_geocode(lat: float, lon: float) -> dict:
    """
    Resolve a coordinate to its administrative pieces.

    `district` is the county, because a warning is issued for a DISTRICT. It is
    kept separate from the display name: appending "district" to a qualified
    name produces nonsense like "Kochi, Kerala, India district".
    """
    url = (
        f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}"
        f"&format=jsonv2&zoom=10"
    )
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "WeatherGPT/1.0"})
        with urllib.request.urlopen(req, timeout=FETCH_TIMEOUT) as r:
            d = json.loads(r.read().decode())
    except Exception:
        return {}
    a = d.get("address") or {}
    return {
        "name": a.get("city") or a.get("town") or a.get("village") or a.get("county") or "",
        "district": a.get("county") or a.get("city_district") or "",
        "state": a.get("state") or "",
        "country": a.get("country") or "",
    }


def _geocode(place: str) -> Optional[dict]:
    from agent import geocode_place

    try:
        raw = geocode_place.invoke({"place_name": place})
        d = json.loads(raw)
    except Exception:
        return None
    if "error" in d:
        return None
    return d


def _is_in_india(country: Optional[str]) -> bool:
    return isinstance(country, str) and country.strip().lower() == "india"


def _resolve_district(lat, lon, geo: dict, asked_place: Optional[str]):
    """
    Find something to CALL this place, preferring the administrative district.

    Returns `(name, source)`. The order matters: a warning is issued for a
    district, so a district beats a city, a city beats a state, and a state
    beats nothing. `source` records which, so a reader can tell a real district
    from a fallback.

    Returns `("", "")` when nothing could be resolved. The caller must treat
    that as UNKNOWN, never as "no warning".
    """
    admin = _reverse_geocode(float(lat), float(lon))
    for key in ("district", "city_district"):
        v = (admin.get(key) or "").strip()
        if v:
            return v, "district"
    for src, keys in ((geo, ("name",)), (admin, ("city", "town", "village", "county"))):
        for k in keys:
            v = (src.get(k) or "").strip()
            if v:
                return v, "city"
    v = (admin.get("state") or geo.get("admin1") or "").strip()
    if v:
        return v, "state"
    v = (asked_place or "").strip()
    if v:
        return v, "asked"
    return "", ""


def _require_name(name: str, source: str, asked_place: Optional[str] = None) -> str:
    """
    Return a non-blank place name, or fail the response build.

    A hard guard, not a tidy-up. The bug it prevents was an answer reading
    "No active IMD warning for  as of ...", which looks absurd but is genuinely
    dangerous: a user cannot tell the district was never identified, so a blank
    reads as a check that came back clean. Substituting a placeholder would
    hide the same failure. Raising surfaces it and turns an unfounded
    assurance into a visible error.
    """
    candidate = (name or "").strip()
    if candidate:
        return candidate
    fallback = (asked_place or "").strip()
    if fallback:
        return fallback
    raise ValueError(
        "refusing to build a warning answer with a blank place name "
        f"(source={source!r}); the district was never identified"
    )


def fetch_warnings(lat: float, lon: float, name: str) -> dict:
    """
    Ask the Java backend for warnings at a coordinate.

    Returns a dict that always carries `ok`, so a failure can never be mistaken
    for an empty result. That distinction is the whole safety property here.
    """
    params = urllib.parse.urlencode(
        {"latitude": lat, "longitude": lon, "name": name}
    )
    url = f"{JAVA_BASE}/api/alerts/early-warnings?{params}"
    try:
        req = urllib.request.Request(url, headers={"Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=FETCH_TIMEOUT) as r:
            raw = r.read().decode()
    except urllib.error.HTTPError as e:
        return {"ok": False, "reason": f"upstream returned HTTP {e.code}"}
    except Exception as e:
        return {"ok": False, "reason": f"could not reach the warning service ({type(e).__name__})"}

    try:
        d = json.loads(raw)
    except Exception:
        return {"ok": False, "reason": "the warning service returned an unreadable response"}

    if not d.get("success"):
        return {"ok": False, "reason": "the warning service reported a failure"}
    data = d.get("data") or {}
    return {
        "ok": True,
        "alerts": data.get("alerts") or [],
        "provider_status": data.get("providerStatus") or "",
        "provider_active": bool(data.get("officialProviderActive")),
        "total": data.get("totalAlerts") or 0,
    }


# ---------------------------------------------------------------------------
# The answer
# ---------------------------------------------------------------------------

def warning_response(prompt: str, location: Optional[dict] = None) -> Optional[str]:
    """
    Answer a warning question deterministically, or return None to fall through.

    Returning None means "this is not a warning question after all", which lets
    the caller continue to the conditions path or the agent.
    """
    if not is_warning_question(prompt):
        return None

    asked_place = extract_place_for_warning(prompt)
    geo: Optional[dict] = None
    district = ""
    region = ""
    used_named_place = False

    if asked_place:
        geo = _geocode(asked_place)
        used_named_place = geo is not None
    if geo is None and location:
        # No usable place in the question, so the caller's own coordinates are
        # the best available. LocationPayload carries lat/lon only — it has no
        # name field — so the district is resolved by reverse geocoding rather
        # than read off the payload. An earlier version read `location.name`
        # and raised AttributeError, so "Any warning right now?" with a
        # location crashed the request instead of answering it.
        geo = {
            "latitude": location.latitude,
            "longitude": location.longitude,
        }
    if geo is None:
        # No place named and none supplied. A warning question with nothing to
        # look up is ambiguous, and the instruction is explicit: ambiguous goes
        # to the agent, not to a lookup that cannot succeed. Returning None
        # falls through.
        return None

    lat, lon = geo.get("latitude"), geo.get("longitude")
    if lat is None or lon is None:
        return None

    # Resolve the district, and if that fails, resolve SOMETHING nameable. The
    # reported bug was "No active IMD warning for  as of ...": a location
    # chosen by city search can arrive with coordinates but no district (the
    # frontend's resolveDistrict() swallows any reverse-geocode failure), and
    # this code then reverse-geocoded again, got nothing, and formatted an
    # empty string into a sentence that asserts no warning.
    district, label_source = _resolve_district(lat, lon, geo, asked_place)

    if not district:
        # Coordinates in hand but no identifiable district. Saying "no active
        # warning" would assert a fact about a place we failed to identify,
        # which is the same class of error as reporting a failed fetch as an
        # absence. Say what is true, and offer the way out.
        return (
            "I could not identify which district these coordinates fall in, so I "
            "cannot complete an IMD warning check for them. I am not going to "
            "guess and tell you there is no warning. Please search for your city "
            "or district by name, and I will check that instead."
        )

    admin = _reverse_geocode(float(lat), float(lon))
    region = admin.get("state") or ""
    country = (admin.get("country") or geo.get("country") or "").strip()

    # A district that resolved is a name. Never build a sentence around a blank.
    place_label = _require_name(district, label_source, asked_place)

    if not _is_in_india(country):
        return (
            f"{place_label} is not in India. "
            "IMD publishes weather warnings for districts in India only, so there is no "
            "Indian warning to report there. Weather for that place is still available."
        )

    result = fetch_warnings(float(lat), float(lon), district)

    # A failed fetch must NEVER become "no warning".
    if not result["ok"]:
        return (
            f"I could not complete the IMD warning check for {place_label} "
            f"just now ({result['reason']}). "
            "I am not going to guess: please retry in a moment, or check the IMD warnings page."
        )

    alerts = result["alerts"]
    if not alerts:
        return (
            f"No active IMD warning for {place_label} as of {_ist_now()}."
        )

    lines = []
    for a in alerts:
        sev = (a.get("severity") or "").upper()
        tier = SEVERITY_TO_TIER.get(sev, "red")
        title = (a.get("title") or "Weather warning").strip()
        # Verbatim. The description is never paraphrased, softened or summarised.
        body = (a.get("description") or "").strip()
        source = (a.get("source") or "IMD").strip()
        issued = (a.get("issuedAt") or a.get("issueTime") or a.get("issued") or "").strip()
        head = f"[{sev or 'UNKNOWN'}/{tier}] {title}"
        # place_label is guaranteed non-blank by _require_name above, so the
        # header can never read "for " with nothing after it.
        head += f" for {place_label}"
        parts = [head]
        if body:
            parts.append(body)
        meta = []
        if issued:
            meta.append(f"issued {issued}")
        meta.append(f"source: {source}")
        parts.append(" | ".join(meta))
        lines.append("\n".join(parts))
    return "\n\n".join(lines)
