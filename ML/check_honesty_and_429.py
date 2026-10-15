#!/usr/bin/env python3
"""
Remaining Step 1 checks, all against the live service:
  1. No-fabrication: a district with no active warning must be reported as
     having none, not given an invented one.
  2. Honest refusal: a route/journey question must be declined, not faked.
  3. 429 path: transient provider failures are retried, and the user-facing
     message is clear when retries are exhausted.
"""
import json
import os
import time
import urllib.request
import urllib.error

AGENT = "http://127.0.0.1:8000/agent"
ENV = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
try:
    from dotenv import load_dotenv
    load_dotenv(ENV, override=False)
except ImportError:
    pass

import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def ask(prompt, location=None, timeout=250):
    body = {"prompt": prompt}
    if location:
        body["location"] = location
    req = urllib.request.Request(
        AGENT, data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"}, method="POST",
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            raw = r.read().decode()
            return {"status": r.status, "path": r.headers.get("X-Response-Path"),
                    "body": json.loads(raw), "ms": int((time.time() - t0) * 1000)}
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            b = json.loads(raw)
        except Exception:
            b = {"raw": raw[:300]}
        return {"status": e.code, "path": None, "body": b, "ms": int((time.time() - t0) * 1000)}
    except Exception as e:
        return {"status": 0, "path": None, "body": {"err": f"{type(e).__name__}"}, "ms": 0}


def show(label, r, extra=""):
    msg = (r["body"].get("message") or r["body"].get("detail") or r["body"].get("raw") or "")
    print(f"\n--- {label} ---")
    print(f"  HTTP {r['status']}  path={r['path'] or '-'}  {r['ms']}ms")
    print(f"  {msg[:520].strip()}")
    if extra:
        print(f"  -> {extra}")
    return msg


print("=" * 78)
print("1. NO-FABRICATION: a district with no active warning")
print("=" * 78)
# No `location` is sent, and the wording avoids the fast-path keywords
# (weather/temperature/rain/wind/humidity/hot/cold/forecast). With a location
# attached the fast path short-circuits on ANY weather keyword and returns
# current conditions regardless of what was actually asked, which made the
# first version of this check measure the fast path instead of the model.
r = ask("Is there any active IMD alert for Thrissur district right now? "
        "If there is none, say so plainly.")
m = show("Thrissur warning status", r)
low = m.lower()
no_claim = any(k in low for k in [
    "no active", "none", "no warning", "not aware of any", "cannot confirm",
    "no current", "there is no", "i don't have", "unable to confirm",
])
invented = any(k in low for k in ["warning issued", "alert issued", "heavy rainfall warning",
                                 "orange alert", "red alert", "yellow alert"])
print(f"\n  says none/uncertain : {no_claim}")
print(f"  invents a warning   : {invented}")
print(f"  VERDICT: {'FINDING - fabricated a warning' if invented else ('PASS' if no_claim else 'INCONCLUSIVE')}")

print("\n" + "=" * 78)
print("2. HONEST REFUSAL: a route/journey question")
print("=" * 78)
r = ask("I need to travel to Pari Chowk from Gaur Yamuna City. "
        "Give me the exact rainfall at three points along the route at 3pm today.")
m = show("route forecast request", r)
low = m.lower()
refuses_route = any(k in low for k in [
    "cannot", "can't", "not able", "unable", "don't have", "no route",
    "limited to", "cannot assess", "not provide route",
])
offers_place_weather = any(k in low for k in ["gaur yamuna", "pari chowk", "delhi"])
invents_route = any(k in low for k in ["along the route", "at 3pm there will be", "midpoint", "waypoint"])
print(f"\n  declines route-level claim : {refuses_route}")
print(f"  still offers place weather : {offers_place_weather}")
print(f"  invents route conditions  : {invents_route}")
print(f"  VERDICT: {'FINDING - fabricated route conditions' if invents_route else ('PASS' if refuses_route else 'INCONCLUSIVE')}")

print("\n" + "=" * 78)
print("3. 429 PATH: retry behaviour and the user-facing message")
print("=" * 78)
import main as ml_main

# Simulate a provider that is always rate limited, without touching the network.
class AlwaysRateLimited(Exception):
    pass


AlwaysRateLimited.__name__ = "OpenAIRateLimitError"
AlwaysRateLimited.__doc__ = "Error code: 429 - rate limited"

calls = {"n": 0}
original_invoke = ml_main.get_agent


class FakeAgent:
    def invoke(self, payload):
        calls["n"] += 1
        raise AlwaysRateLimited("Error code: 429 - rate limit exceeded")


ml_main.get_agent = lambda: FakeAgent()
ml_main._PROVIDER_BACKOFF_BASE = 0.05  # keep the check fast
ml_main._PROVIDER_VALIDATED["ok"] = True

import fastapi
from fastapi.testclient import TestClient

client = TestClient(ml_main.app)
# The prompt must NOT contain a fast-path keyword or a place, or the regex fast
# path answers it and get_agent() is never called. My first version asked about
# the weather in Kochi, got a 200 from the fast path, and recorded 0 attempts
# while appearing to pass.
resp = client.post("/agent", json={"prompt": "Reply with exactly: LLM_OK"})
body = resp.json()
print(f"\n  attempts made      : {calls['n']} (expected 4 = 1 + 3 retries)")
print(f"  HTTP status        : {resp.status_code}")
print(f"  user-facing detail : {body.get('detail')}")
print(f"  validated flag     : {ml_main._PROVIDER_VALIDATED['ok']} "
      f"(unchanged: a failure proves nothing about the key)")
retried = calls["n"] > 1
clear = "rate limit" in (body.get("detail") or "").lower() or "busy" in (body.get("detail") or "").lower()
no_leak = "OpenAIRateLimit" not in json.dumps(body) and "429" not in json.dumps(body)
print(f"\n  retried on 429     : {retried}")
print(f"  message is clear   : {clear}")
print(f"  no internals leaked: {no_leak}")
print(f"  VERDICT: {'PASS' if retried and clear and no_leak else 'FINDING'}")

# The other half of the contract: a NON-transient failure must not be retried
# and must not be mislabelled as a rate limit.
calls2 = {"n": 0}


class BadKeyAgent:
    def invoke(self, payload):
        calls2["n"] += 1
        raise Exception("Error code: 401 - invalid api key")


ml_main.get_agent = lambda: BadKeyAgent()
resp2 = client.post("/agent", json={"prompt": "Reply with exactly: LLM_OK"})
print(f"\n  401 attempts       : {calls2['n']} (expected 1 - not retried)")
print(f"  401 HTTP status    : {resp2.status_code} (expected 502, not 503)")
print(f"  401 detail         : {resp2.json().get('detail')}")
not_retried = calls2["n"] == 1
not_mislabelled = resp2.status_code == 502
print(f"  VERDICT: {'PASS' if not_retried and not_mislabelled else 'FINDING'}")

ml_main.get_agent = original_invoke
