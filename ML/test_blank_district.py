#!/usr/bin/env python3
"""
BUG 1: blank district in the warning answer.

Reported: with the header showing "Delhi", "What weather warnings affect my
area?" answered "No active IMD warning for  as of ...". The district was empty,
so the app asserted no warning without knowing which district it checked.

Every case asserts the answer is right AND that zero model calls were made: the
failure mode being guarded is an unfounded assurance, which a model would make
worse, not better.
"""
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

import imd_warnings
import main as ml
from fastapi.testclient import TestClient

PASS, FAIL = [], []


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f" — {detail}" if detail else ""))


NO_ALERT = {"ok": True, "alerts": [], "provider_status": "",
            "provider_active": False, "total": 0}


def tripwire():
    calls = []

    class Boom:
        def invoke(self, payload):
            calls.append(payload)
            raise AssertionError("MODEL WAS CALLED — the warning path must be deterministic")

    return mock.patch.object(ml, "get_agent", lambda: Boom()), calls


def run(name, prompt, location, admin, geo, expect=None, alerts=None):
    patcher, calls = tripwire()
    with patcher:
        with mock.patch.object(imd_warnings, "_geocode", return_value=geo), \
             mock.patch.object(imd_warnings, "_reverse_geocode", return_value=admin), \
             mock.patch.object(imd_warnings, "fetch_warnings",
                               return_value=(alerts or NO_ALERT)):
            r = TestClient(ml.app).post("/agent", json={"prompt": prompt, **({"location": location} if location else {})})
    msg = r.json().get("message", "")
    print(f"\n--- {name} ---")
    print(f"  {msg[:300]}")
    check(f"{name}: deterministic path", r.headers.get("X-Response-Path") == "warnings_deterministic",
          str(r.headers.get("X-Response-Path")))
    check(f"{name}: ZERO model calls", len(calls) == 0, f"{len(calls)} call(s)")
    # The core invariant: a blank place name must never be rendered.
    check(f"{name}: no blank place name in the answer",
          " for  " not in msg and "for  as of" not in msg, repr(msg[:60]))
    if expect:
        expect(r, msg)
    return msg


# LocationPayload carries lat/lon only — a city-search location with no district.
DELHI = {"latitude": 28.6139, "longitude": 77.209}

print("=" * 78)
print("BUG 1 — blank district in the warning answer")
print("=" * 78)

print("\n### 1. Location WITH a district (the working case, regression guard)")
run("district present", "What weather warnings affect my area?", DELHI,
    {"name": "New Delhi", "district": "New Delhi", "state": "Delhi", "country": "India"},
    None,
    expect=lambda r, m: check("  names the district", "New Delhi" in m, m[:80]))

print("\n### 2. Coordinates but NO district, reverse geocode SUCCEEDS (the reported bug)")
run("coords, no district, geocodes", "What weather warnings affect my area?", DELHI,
    {"name": "Delhi", "district": "New Delhi", "state": "Delhi", "country": "India"},
    None,
    expect=lambda r, m: (
        check("  resolves the district before answering", "New Delhi" in m, m[:90]),
        check("  and may then say no active warning", "No active IMD warning for New Delhi" in m, m[:90]),
    ))

print("\n### 3. Coordinates, NO district, reverse geocode returns NOTHING")
# No district, no city, no state. The spec is explicit: refuse rather than
# assert. My first version of this case expected a city-name fallback, which
# would have meant labelling a city as a district — the same category error as
# the original bug, with a word in the blank instead of nothing.
run("geocode empty", "What weather warnings affect my area?", DELHI,
    {"name": "Delhi", "district": "", "state": "", "country": ""}, None,
    expect=lambda r, m: (
        check("  refuses when the district is unresolvable",
              "could not" in m.lower(), m[:110]),
        check("  does NOT assert no warning on a blank district",
              "No active IMD warning" not in m, m[:110]),
    ))

print("\n### 4. Reverse geocode FAILS entirely (must refuse, not assume)")
run("geocode fails", "What weather warnings affect my area?", DELHI, {}, None,
    expect=lambda r, m: (
        check("  says the check could not be completed",
              "could not complete" in m.lower() or "could not identify" in m.lower(), m[:110]),
        check("  NEVER claims there is no active warning",
              "No active IMD warning" not in m, m[:110]),
        check("  offers the manual search", "search" in m.lower(), m[:130]),
    ))

print("\n### 5. City-search result flowing in end to end")
# The frontend's resolveDistrict() can leave district undefined; the request
# that follows carries only coordinates. Same shape, asked with a place name.
run("city search flow", "Any warning for Delhi right now?",
    {"latitude": 28.6139, "longitude": 77.209},
    {"name": "Delhi", "district": "New Delhi", "state": "Delhi", "country": "India"},
    {"name": "Delhi", "admin1": "Delhi", "country": "India",
     "latitude": 28.6139, "longitude": 77.209},
    expect=lambda r, m: check("  answers for the searched place", "New Delhi" in m or "Delhi" in m, m[:90]))

print("\n### 6. The hard guard itself")
try:
    imd_warnings._require_name("", "district", None)
    check("  _require_name refuses a blank name", False, "it returned instead of raising")
except ValueError as e:
    check("  _require_name refuses a blank name", True, str(e)[:70])
check("  _require_name accepts a real name",
      imd_warnings._require_name("Ernakulam", "district", None) == "Ernakulam")
try:
    imd_warnings._require_name("", "district", "")
    check("  _require_name refuses even with an empty fallback", False, "returned")
except ValueError:
    check("  _require_name refuses even with an empty fallback", True)

print("\n### 7. Fallback chain, in order")
# _reverse_geocode is mocked: without it this loop makes real Nominatim calls
# and every case returns whatever Kochi resolves to, which is how the first
# version of this check "failed" all five rows.
for admin, geo, expected, src in [
    ({"district": "Ernakulam", "city": "Kochi"}, None, "Ernakulam", "district"),
    ({"district": "", "city": "Kochi"}, None, "Kochi", "city"),
    ({"district": "", "city": "", "state": "Kerala"}, None, "Kerala", "state"),
    ({}, {"name": "Delhi"}, "Delhi", "city"),
    ({}, None, "", ""),
]:
    with mock.patch.object(imd_warnings, "_reverse_geocode", return_value=admin):
        got, src_got = imd_warnings._resolve_district(9.93, 76.27, geo or {}, None)
    check(f"  chain: admin={str(admin)[:26]:28} -> {got!r} ({src_got})",
          got == expected and src_got == src)

print("\n" + "=" * 78)
print(f"RESULT: {len(PASS)} passed, {len(FAIL)} failed")
for f in FAIL:
    print(f"  FAILED: {f}")
print("=" * 78)
sys.exit(1 if FAIL else 0)
