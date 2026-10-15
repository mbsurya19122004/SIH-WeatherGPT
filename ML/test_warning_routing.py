#!/usr/bin/env python3
"""
FIX 1 verification: warning intent routes to a deterministic lookup.

Every case asserts TWO things:
  * the answer is correct for the case, and
  * ZERO model calls were made.

The second assertion is the important one. "The answer looks right" is
compatible with a model having produced it, and this whole fix exists because a
model can produce a plausible wrong warning. The proof is that `get_agent` is
never called, not that the text reads well.
"""
import json
import os
import sys
from unittest import mock

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
_ENV = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
try:
    from dotenv import load_dotenv
    load_dotenv(_ENV, override=False)
except ImportError:
    pass

import main as ml
import imd_warnings
from fastapi.testclient import TestClient

PASS, FAIL = [], []


class Msg:
    """Minimal stand-in for an AIMessage; the service reads `.content`."""

    def __init__(self, content):
        self.content = content


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f" — {detail}" if detail else ""))


def no_model_calls():
    """Patch get_agent so any model call is a hard, visible failure."""
    calls = []

    class Tripwire:
        def invoke(self, payload):
            calls.append(payload)
            raise AssertionError("MODEL WAS CALLED — this path must be deterministic")

    return mock.patch.object(ml, "get_agent", lambda: Tripwire()), calls


KOCHI = {"latitude": 9.9312, "longitude": 76.2673, "name": "Kochi", "region": "Kerala",
         "district": "Ernakulam", "country": "India", "source": "gps"}
DELHI = {"latitude": 28.6139, "longitude": 77.209, "name": "Delhi", "region": "Delhi",
         "district": "New Delhi", "country": "India", "source": "gps"}
TOKYO = {"latitude": 35.68, "longitude": 139.69, "name": "Tokyo", "region": "Tokyo",
         "district": "Chiyoda", "country": "Japan", "source": "gps"}

THRISSUR_GEO = {
    "name": "Thrissur", "admin1": "Kerala", "country": "India",
    "latitude": 10.5276, "longitude": 76.2144,
}
THRISSUR_ADMIN = {"name": "Thrissur", "district": "Thrissur", "state": "Kerala", "country": "India"}
TOKYO_ADMIN = {"name": "Tokyo", "district": "Chiyoda", "state": "Tokyo", "country": "Japan"}

VERBATIM = ("Heavy rainfall likely to continue over Thrissur district until 17 July, "
            "with isolated very heavy rainfall over the hills.")
FIXTURE_ALERT = {
    "id": "imd-test-1",
    "title": "Heavy to very heavy rainfall warning",
    "description": VERBATIM,
    "severity": "SEVERE",
    "source": "IMD",
    "issuedAt": "05:30 IST, 23 Sep",
}


def run_case(name, prompt, location, geo_result, admin_result, alerts, provider_status="",
             official_active=False, fetch_fails=False, expect=None, fetch_calls=None):
    patcher, calls = no_model_calls()
    with patcher:
        with mock.patch.object(imd_warnings, "_geocode", return_value=geo_result), \
             mock.patch.object(imd_warnings, "_reverse_geocode", return_value=admin_result), \
             mock.patch.object(imd_warnings, "fetch_warnings") as fw:
            if fetch_fails:
                fw.return_value = {"ok": False, "reason": "could not reach the warning service (TimeoutError)"}
            else:
                fw.return_value = {
                    "ok": True, "alerts": alerts, "provider_status": provider_status,
                    "provider_active": official_active, "total": len(alerts),
                }
            client = TestClient(ml.app)
            r = client.post("/agent", json={"prompt": prompt, **({"location": location} if location else {})})
            if fetch_calls is not None:
                fetch_calls.append(fw.call_count)
    body = r.json()
    msg = body.get("message") or body.get("detail") or ""
    path = r.headers.get("X-Response-Path")
    print(f"\n--- {name} ---")
    print(f"  HTTP {r.status_code}  path={path}")
    print(f"  {msg[:300].strip()}")
    check(f"{name}: answered by the deterministic warnings path",
          path == "warnings_deterministic", f"path={path}")
    check(f"{name}: ZERO model calls", len(calls) == 0, f"{len(calls)} call(s)")
    if expect:
        expect(r, msg, path)
    return msg, r


def main():
    print("=" * 78)
    print("FIX 1 — warning intent routing (all cases must consume zero model calls)")
    print("=" * 78)

    # 1. The reported defect: a warning question answered with the caller's weather.
    print("\n### 1. The Thrissur example (the reported defect)")
    fetch_calls = []
    run_case(
        "Thrissur warning question",
        "Is there any active IMD alert for Thrissur district right now?",
        KOCHI, THRISSUR_GEO, THRISSUR_ADMIN, [],
        fetch_calls=fetch_calls,
        expect=lambda r, m, p: (
            check("  answers for THRISSUR, not the caller's Kochi location",
                  "Thrissur" in m and "No active IMD warning for Thrissur" in m, m[:90]),
            check("  does NOT answer with current conditions",
                  "temperature" not in m.lower() and "°C" not in m, m[:90]),
        ),
    )
    check("  issued exactly one warning lookup", fetch_calls == [1], f"{fetch_calls}")

    # 2. No active warning.
    print("\n### 2. No active warning")
    run_case(
        "no active warning",
        "Any weather warning for Thrissur district?",
        DELHI, THRISSUR_GEO, THRISSUR_ADMIN, [],
        provider_status="IMD Green: Normal atmospheric conditions.",
        official_active=False,
        expect=lambda r, m, p: (
            check("  says no active warning", "No active IMD warning for Thrissur" in m, m[:90]),
            check("  includes the as-of time", "as of" in m, m[:110]),
            check("  does NOT relay 'IMD Green' as an assertion of a survey",
                  "IMD Green" not in m, m[:90]),
        ),
    )

    # 3. A fixture warning: verbatim text and severity.
    print("\n### 3. Active warning (fixture) — verbatim text and severity")
    run_case(
        "active warning",
        "Is there any active IMD alert for Thrissur district right now?",
        DELHI, THRISSUR_GEO, THRISSUR_ADMIN, [FIXTURE_ALERT],
        official_active=True,
        expect=lambda r, m, p: (
            check("  relays the warning text VERBATIM", VERBATIM in m, m[:120]),
            check("  carries the severity", "SEVERE" in m, m[:120]),
            check("  carries the tier colour mapping", "orange" in m, m[:120]),
            check("  carries the source", "source: IMD" in m, m[:140]),
            check("  carries the issue time", "05:30 IST, 23 Sep" in m, m[:140]),
            check("  does NOT paraphrase or soften",
                  "may" not in m.lower().split("|")[0] and "possibly" not in m.lower(), m[:120]),
        ),
    )

    # 4. Named place must beat the saved/own location.
    print("\n### 4. Named place wins over the caller's location")
    seen = []
    def expect4(r, m, p):
        seen.append(m)
    run_case(
        "named place vs caller location",
        "Any cyclone warning in Odisha right now?",
        KOCHI, {"name": "Puri", "admin1": "Odisha", "country": "India",
                "latitude": 19.8135, "longitude": 85.8312},
        {"name": "Puri", "district": "Puri", "state": "Odisha", "country": "India"},
        [], expect=expect4,
    )
    check("  answered for the NAMED place (Odisha), not Kochi",
          "Odisha" in seen[-1] or "Puri" in seen[-1], seen[-1][:90])

    # 5. Fetch failure must never become "no warning".
    print("\n### 5. Fetch failure — must NOT say 'no warning'")
    run_case(
        "fetch failure",
        "Is there any active IMD alert for Thrissur district right now?",
        DELHI, THRISSUR_GEO, THRISSUR_ADMIN, [],
        fetch_fails=True,
        expect=lambda r, m, p: (
            check("  does NOT claim there is no warning", "No active IMD warning" not in m, m[:110]),
            check("  says the check could not be completed",
                  "could not complete" in m.lower(), m[:110]),
            check("  names the reason", "timeout" in m.lower() or "could not reach" in m.lower(), m[:110]),
        ),
    )

    # 6. Outside India.
    print("\n### 6. Outside India — neutral no-coverage")
    run_case(
        "non-India location",
        "Is there any active IMD alert for Tokyo right now?",
        DELHI, {"name": "Tokyo", "admin1": "Tokyo", "country": "Japan",
                "latitude": 35.68, "longitude": 139.69},
        TOKYO_ADMIN, [], official_active=False,
        expect=lambda r, m, p: (
            check("  states IMD does not cover it", "not in India" in m, m[:110]),
            check("  does NOT claim a warning exists or does not exist",
                  "No active IMD warning" not in m and "warning has been issued" not in m.lower(), m[:110]),
        ),
    )

    # 7. A conditions question must still reach the fast path, not the warnings path.
    print("\n### 7. A conditions question is NOT diverted to the warnings path")
    patcher, calls = no_model_calls()
    with patcher:
        with mock.patch.object(imd_warnings, "_geocode", return_value=None):
            client = TestClient(ml.app)
            r = client.post("/agent", json={"prompt": "What is the current weather in Kochi?",
                                            "location": KOCHI})
    path = r.headers.get("X-Response-Path")
    print(f"  HTTP {r.status_code}  path={path}")
    check("  current-conditions question still uses the conditions path",
          path == "fast_path", f"path={path}")
    check("  and still consumes zero model calls", len(calls) == 0, f"{len(calls)} call(s)")

    # 8. Intent detection unit checks.
    print("\n### 8. Intent detection")
    from imd_warnings import is_warning_question, extract_place_for_warning
    warn_q = [
        "Is there any active IMD alert for Thrissur district right now?",
        "Any weather warning for Kochi?",
        "is there a cyclone warning in Odisha",
        "heatwave alert for Delhi",
        "flood warning in Assam?",
        "red alert status for Mumbai",
        "Is there a flood risk for Kerala",
    ]
    cond_q = [
        "What is the temperature in Kochi?",
        "Will it rain in Mumbai right now",
        "Is it hot in New York right now",
        "What is the current weather forecast for my location?",
    ]
    # Definitional questions are NOT warning lookups. The first version routed
    # these to the district lookup, which answered "I could not work out which
    # place you mean" — worse than not intercepting them at all.
    definitional = [
        "Explain the difference between warning and advisory.",
        "What does a red alert mean?",
        "What is a cyclone?",
        "How do I read a wind speed of 25 km/h?",
    ]
    bad = [q for q in warn_q if not is_warning_question(q)]
    check("  all warning questions detected", not bad, "; ".join(bad))
    misrouted = [q for q in cond_q if is_warning_question(q)]
    check("  no conditions question misrouted", not misrouted, "; ".join(misrouted))
    definitional_misrouted = [q for q in definitional if is_warning_question(q)]
    check("  no definitional question treated as a warning lookup",
          not definitional_misrouted, "; ".join(definitional_misrouted))
    p = extract_place_for_warning("Is there any active IMD alert for Thrissur district right now?")
    check("  place extracted from the Thrissur question",
          p and "thrissur" in p.lower(), str(p))
    p2 = extract_place_for_warning("Any cyclone warning in Odisha?")
    check("  place extracted from a terse question",
          p2 and "odisha" in p2.lower(), str(p2))

    # 9. A warning question with no place and no caller location is AMBIGUOUS and
    #    must fall through to the agent, not to a lookup that cannot succeed.
    print("\n### 9. Ambiguous warning question falls through to the agent")
    fell = []

    class RecordingAgent:
        def invoke(self, payload):
            fell.append(payload)
            return {"messages": [Msg("Here is a general explanation of IMD warnings.")]}

    with mock.patch("imd_warnings.fetch_warnings"):
        with mock.patch.object(ml, "get_agent", lambda: RecordingAgent()):
            c2 = TestClient(ml.app)
            r2 = c2.post("/agent", json={"prompt": "Is there any active warning right now?"})
    print(f"  HTTP {r2.status_code}  path={r2.headers.get('X-Response-Path')}")
    check("  no-place warning question reaches the agent",
          r2.headers.get("X-Response-Path") == "llm_backed" and len(fell) == 1,
          f"path={r2.headers.get('X-Response-Path')} calls={len(fell)}")

    # 10. A warning question WITH a caller location must not crash. LocationPayload
    #     carries lat/lon only, and an earlier version read location.name.
    print("\n### 10. Warning question with a caller location (regression: AttributeError)")
    with mock.patch("imd_warnings.fetch_warnings",
                    return_value={"ok": True, "alerts": [], "provider_status": "",
                                  "provider_active": False, "total": 0}), \
         mock.patch("imd_warnings._reverse_geocode", return_value=THRISSUR_ADMIN):
        c3 = TestClient(ml.app)
        r3 = c3.post("/agent", json={"prompt": "Any warning right now?",
                                     "location": {"latitude": 9.9312, "longitude": 76.2673}})
    print(f"  HTTP {r3.status_code}  path={r3.headers.get('X-Response-Path')}")
    print(f"  {(r3.json().get('message') or r3.json().get('detail') or '')[:110]}")
    check("  does not crash on a location-only payload", r3.status_code == 200, str(r3.status_code))
    check("  answers deterministically using the reverse-geocoded district",
          r3.headers.get("X-Response-Path") == "warnings_deterministic",
          str(r3.headers.get("X-Response-Path")))

    print("\n" + "=" * 78)
    print(f"RESULT: {len(PASS)} passed, {len(FAIL)} failed")
    if FAIL:
        for f in FAIL:
            print(f"  FAILED: {f}")
    print("=" * 78)
    return 1 if FAIL else 0


if __name__ == "__main__":
    sys.exit(main())
