#!/usr/bin/env python3
"""
BUG 2: "not configured" returned while a valid key existed in .env.

The failure is not a bad key. It is that the process answering :8000 and the
.env on disk were talking about different worlds, and neither said so. Two
mechanisms are under test:

  A. the port guard must REFUSE to start a service on an occupied port, so a
     stale process can never keep serving code you did not just start;
  B. the service must report the inputs it loaded and shout when they disagree
     with the .env on disk.

Every case uses throwaway .env files in a temp dir. The real key is never
read, copied, logged, or printed, and a tripwire below fails the run if the
value of a key ever appears in output.
"""
import json
import re
import os
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from unittest import mock

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, "ML"))

PASS, FAIL = [], []


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f" -- {detail}" if detail else ""))


# A canary, not a fake credential. It deliberately does NOT use the
# "sk-or-v1-" prefix: a committed string matching the real OpenRouter key
# format teaches every future secret scan on this repository to ignore that
# prefix, which is precisely how a real key would slip through unnoticed.
FAKE_KEY = "QA-CANARY-7f3a91c4-never-log-this"

print("=" * 78)
print("BUG 2 -- not-configured while the key exists")
print("=" * 78)

# ---------------------------------------------------------------- part A
print("\n### A. The port guard fires on the real occupied port")
# start.sh hardcodes its ports (BACKEND_PORT=8080, ML_PORT=8000, ...), so there
# is no env override to borrow. That is fine: the port that is actually
# occupied right now is :8000, held by the real ML service. Testing the guard
# against THAT is the reported scenario rather than a synthetic stand-in for
# it, so the test uses the live process instead of a fake one.
ML_PORT = "8000"


def owning_pids(port):
    r = subprocess.run(["bash", "-c",
                        f"ss -ltnp 2>/dev/null | grep ':{port} ' || true"],
                       capture_output=True, text=True, timeout=30)
    return re.findall(r"pid=(\d+)", r.stdout)


live_pids = owning_pids(ML_PORT)
print(f"  -- :{ML_PORT} is held by pids {live_pids or '(nothing listening)'} --")
r = subprocess.run(["bash", os.path.join(REPO, "start.sh"), "ml"],
                   capture_output=True, text=True, cwd=REPO, timeout=90)
out = (r.stdout or "") + (r.stderr or "")
print("\n--- ./start.sh ml with :%s occupied ---" % ML_PORT)
print("\n".join("    " + l for l in out.strip().splitlines()[:14]))

check("A1: refuses with a non-zero exit code", r.returncode != 0, f"exit {r.returncode}")
check("A2: names the occupied port", ML_PORT in out)
check("A3: says it is refusing", "efus" in out,
      out.strip().splitlines()[0][:60] if out.strip() else "(no output)")
check("A4: never says it is 'assuming' the service is running",
      "assuming" not in out.lower())
check("A5: tells the operator how to stop the stale process",
      "start.sh stop" in out or "lsof -ti" in out)
check("A6: does NOT leak the key into the guard output", FAKE_KEY not in out)
check("A7: names the OWNING process, not just the port",
      all(f"pid {p}" in out for p in live_pids) if live_pids else True,
      f"expected pid(s) {live_pids} in output")
check("A8: explains WHY this matters (stale run, valid key reported missing)",
      "stale" in out.lower())

# The full-stack path must refuse too, not just the single-service one.
r3 = subprocess.run(["bash", os.path.join(REPO, "start.sh"), "start"],
                    capture_output=True, text=True, cwd=REPO, timeout=90)
out3 = (r3.stdout or "") + (r3.stderr or "")
check("A9: the full-stack 'start' path also refuses", r3.returncode != 0,
      f"exit {r3.returncode}")
check("A10: and it names the port too", ML_PORT in out3)

# A free port must still be allowed to start. This only runs when :8000 is
# genuinely free, which the caller arranges by stopping the ML service first.
if not live_pids:
    r2 = subprocess.run(["bash", "-c", "timeout 12 bash start.sh ml 2>&1 | head -30"],
                        capture_output=True, text=True, cwd=REPO, timeout=60)
    out2 = (r2.stdout or "") + (r2.stderr or "")
    check("A11: a FREE :8000 is still allowed to start", "efus" not in out2.lower(),
          out2.strip().splitlines()[-1][:70] if out2.strip() else "(no output)")
    check("A12: and it really does bind the port", "ML backend" in out2,
          out2.strip().splitlines()[-1][:70] if out2.strip() else "(no output)")
else:
    print("  [SKIP] A11/A12: :8000 is held by the live service, so the "
          "free-port case could not be tested in this pass. NOT VERIFIED here.")

# ---------------------------------------------------------------- part B
print("\n### B. The service reports its env inputs, and shouts on disagreement")
import main as ml

tmp = tempfile.mkdtemp(prefix="qa-env-")
env_path = os.path.join(tmp, ".env")


def with_env(contents, key_in_process, fn):
    """Re-run env_disagreement() under a controlled disk/process state."""
    if contents is None:
        if os.path.exists(env_path):
            os.remove(env_path)
    else:
        open(env_path, "w", encoding="utf-8").write(contents)
    with mock.patch.object(ml, "_ENV_FILES_ON_DISK", [env_path] if contents is not None else []), \
         mock.patch.object(ml, "_ENV_FILE_LOADED", env_path if contents is not None else None), \
         mock.patch.object(ml, "_ENV_DOTENV_MISSING", False), \
         mock.patch.dict(os.environ, {}, clear=False):
        os.environ.pop("OPENROUTER_API_KEY", None)
        if key_in_process:
            os.environ["OPENROUTER_API_KEY"] = FAKE_KEY
        return fn()


# B1: the reported bug. A .env defines a key, the process did not load it.
verdict = with_env(f"OPENROUTER_API_KEY={FAKE_KEY}\n", False, ml.env_disagreement)
print(f"  -- key on disk, not loaded -> {verdict}")
check("B1: DETECTS the reported disagreement", verdict is not None)
check("B2: names the file that holds the key", verdict and env_path in verdict)
check("B3: does not print the key", verdict and FAKE_KEY not in verdict)

# B2: the healthy case must stay silent.
verdict = with_env(f"OPENROUTER_API_KEY={FAKE_KEY}\n", True, ml.env_disagreement)
print(f"  -- key on disk, loaded -> {verdict}")
check("B4: healthy state reports NO mismatch", verdict is None, str(verdict))

# B3: a stale process holding a key no file explains.
verdict = with_env(None, True, ml.env_disagreement)
print(f"  -- key only in process env -> {verdict}")
check("B5: detects a key with no file behind it", verdict is not None)
check("B6: does not print the key", verdict and FAKE_KEY not in verdict)

# B4: a blank value in the file is NOT a usable key.
verdict = with_env("OPENROUTER_API_KEY=\nOTHER=1\n", False, ml.env_disagreement)
check("B7: a blank key in .env is not reported as a disagreement", verdict is None, str(verdict))

# B5: python-dotenv missing while a .env exists.
def _dotenv_missing():
    with mock.patch.object(ml, "_ENV_DOTENV_MISSING", True):
        return ml.env_disagreement()


verdict = with_env(f"OPENROUTER_API_KEY={FAKE_KEY}\n", False, _dotenv_missing)
print(f"  -- .env found, python-dotenv missing -> {verdict}")
check("B8: detects a .env that was found but never loaded", verdict is not None)
check("B9: names the missing dependency", verdict and "dotenv" in verdict.lower())

# key_in_file tri-state
open(env_path, "w", encoding="utf-8").write(f"OPENROUTER_API_KEY={FAKE_KEY}\n")
check("B10: key_in_file sees a real key", ml.key_in_file(env_path) is True)
open(env_path, "w", encoding="utf-8").write('OPENROUTER_API_KEY=""  # c\n')
check("B11: key_in_file sees a quoted-empty key as absent", ml.key_in_file(env_path) is False)
check("B12: key_in_file on a missing file is None, not False", ml.key_in_file("/nope/.env") is None)
# `export KEY=...` is not dotenv syntax: python-dotenv ignores it, so
# reporting "not configured" is the answer that AGREES with what the
# process will actually do. Disagreement is the bug, not a False here.
open(env_path, "w", encoding="utf-8").write("export OPENROUTER_API_KEY=sk-x\n")
check("B13: a quoted-empty key with a comment reads as absent",
      ml.key_in_file(env_path) is False)
open(env_path, "w", encoding="utf-8").write("OPENROUTER_API_KEY=\"\"  # c\n")
check("B14: ...and does so even with a trailing comment",
      ml.key_in_file(env_path) is False)
open(env_path, "w", encoding="utf-8").write("export OPENROUTER_API_KEY=sk-x\n")
check("B15: an export-prefixed key agrees with what dotenv will load",
      ml.key_in_file(env_path) is False)

# ---------------------------------------------------------------- part C
print("\n### C. /health publishes the diagnosis")
body = ml.health()
env_block = body.get("env")
check("C1: /health has an env block", isinstance(env_block, dict), str(type(env_block)))
if isinstance(env_block, dict):
    check("C2: /health reports the service cwd", bool(env_block.get("cwd")), str(env_block.get("cwd")))
    check("C3: /health reports which file was loaded, or none",
          "loaded" in env_block, str(env_block.get("loaded")))
    check("C4: /health reports a mismatch field", "mismatch" in env_block, str(env_block.get("mismatch")))
    check("C5: /health agrees with model_provider_configured",
          (env_block.get("mismatch") is None) == bool(body.get("model_provider_configured")),
          f"configured={body.get('model_provider_configured')} mismatch={env_block.get('mismatch')}")
    check("C6: the key never appears in /health", FAKE_KEY not in json.dumps(body))
    check("C7: the key length never appears in /health", "73" not in json.dumps(body))

check("C8: /health stays serialisable as JSON", isinstance(json.dumps(body), str))

# Real .env, real state, no key echoed.
real = ml.health()
print("\n  -- /health against the real project .env --")
print("     " + json.dumps(real.get("env"), indent=None))
check("C9: no key in the real /health", FAKE_KEY not in json.dumps(real))

shutil.rmtree(tmp, ignore_errors=True)

# ---------------------------------------------------------------- part D
print("\n### D. The startup check actually PRINTS (the silent-logger bug)")
# This block exists because of a defect no assertion caught. The startup
# function computed the right answer and logged it to a logger with no handler,
# because uvicorn configures only "uvicorn.*" and never the root logger. The
# check ran, agreed with /health, and printed nothing, which is
# indistinguishable from "no problems". A diagnostic that cannot be seen is
# not a diagnostic, so emitting the record is now itself under test.
import logging

log_records = []


class Capture(logging.Handler):
    def emit(self, record):
        log_records.append(record)


cap = Capture()
lg = logging.getLogger("weathergpt.ml")
lg.addHandler(cap)
had_handlers = len(lg.handlers)
try:
    ml.log_provider_state()
finally:
    if len(lg.handlers) > had_handlers:
        lg.removeHandler(cap)

texts = [r.getMessage() for r in log_records]
levels = [r.levelname for r in log_records]
print("\n  -- records emitted by log_provider_state() --")
for r in log_records:
    print(f"     {r.levelname:8} {r.getMessage()[:96]}")

check("D1: the startup check emits records at all", len(log_records) > 0,
      f"{len(log_records)} record(s)")
check("D2: the logger has a handler, so output is visible", lg.handlers != [],
      f"{len(lg.handlers)} handler(s)")
check("D3: the env file line is actually printed",
      any("env file loaded" in t for t in texts),
      next((t for t in texts if "env file loaded" in t), "(missing)"))
check("D4: the cwd line is actually printed", any("service cwd" in t for t in texts))
check("D5: the key state is actually printed",
      any("api key" in t for t in texts))
check("D6: no record raised while formatting (no TypeError traceback)",
      not any("not all arguments converted" in str(r.exc_info) for r in log_records))
check("D7: the real key never reaches a log record", FAKE_KEY not in "\n".join(texts))

# And the loud path: a genuine disagreement must produce an ERROR record.
log_records.clear()
with mock.patch.object(ml, "_ENV_FILES_ON_DISK", [env_path]), \
     mock.patch.object(ml, "_ENV_FILE_LOADED", None), \
     mock.patch.object(ml, "_ENV_DOTENV_MISSING", False), \
     mock.patch.object(ml, "env_disagreement",
                       return_value=f"{env_path} defines OPENROUTER_API_KEY but "
                                    "this process did not load it"):
    os.environ.pop("OPENROUTER_API_KEY", None)
    ml.log_provider_state()
loud = [r.getMessage() for r in log_records if r.levelname == "ERROR"]
print("\n  -- on disagreement --")
for r in log_records:
    if r.levelname == "ERROR":
        print(f"     ERROR    {r.getMessage()[:110]}")
check("D8: a disagreement is logged at ERROR", bool(loud))
check("D9: the ERROR names the cause", loud and "did not load" in loud[0])
check("D10: the ERROR tells the operator what to do",
      loud and "Restart the service" in loud[0])
check("D11: the ERROR does not contain the key", FAKE_KEY not in "\n".join(
      r.getMessage() for r in log_records))

def _reload_main():
    """Re-import the module so a mutated source is actually re-executed."""
    import importlib
    import sys
    sys.modules.pop("main", None)
    return importlib.import_module("main")


def _post_agent(prompt, agent_exc=None, key="test-key"):
    """
    Drive the REAL /agent handler and return (status, detail).

    Each failure mode is produced by making the agent raise the exception the
    provider would really raise, so the assertions run against the code that
    ships rather than a string constant that happens to look right. A mutation
    to main.py's message changes the result.
    """
    from fastapi.testclient import TestClient

    m = _reload_main()

    class Boom:
        def invoke(self, payload):
            raise agent_exc

    saved_key = os.environ.get("OPENROUTER_API_KEY")
    saved_agent = m._agent_instance
    saved_warn = m.warning_response
    try:
        if key is None:
            os.environ.pop("OPENROUTER_API_KEY", None)
        else:
            os.environ["OPENROUTER_API_KEY"] = key
        m._agent_instance = Boom() if agent_exc is not None else None
        # Bypass the deterministic warning fast path and the answer cache so the
        # provider branch is the one under test.
        m.warning_response = lambda *a, **k: None
        client = TestClient(m.app, raise_server_exceptions=False)
        r = client.post("/agent", json={"prompt": prompt})
        try:
            detail = r.json().get("detail", "")
        except Exception:
            detail = r.text[:200]
        return r.status_code, detail
    finally:
        m.warning_response = saved_warn
        m._agent_instance = saved_agent
        if saved_key is None:
            os.environ.pop("OPENROUTER_API_KEY", None)
        else:
            os.environ["OPENROUTER_API_KEY"] = saved_key


def _daily_cap_exception():
    """
    The exception OpenRouter raises when the free-model daily allowance is spent.

    Built by concatenation rather than a nested-escaped literal: the real error
    text is itself a JSON document embedded in a Python dict rendered as a
    string, and hand-escaping that reliably produces a syntax error instead of
    the fixture. `_daily_cap_info` keys on the two substrings below, and the
    reset time is read from the headers, exactly as it is in production.
    """
    raw = (
        '{"error":{"code":429,"message":"Rate limit exceeded",'
        '"metadata":{"limit_source":"free-models-per-day"}}}'
    )
    text = "Error code: 429 - {'error': {'code': '429', " + repr(raw) + "}"
    e = Exception(text)
    resp = type("R", (), {})()
    resp.headers = {"X-RateLimit-Reset": "1790640000000", "X-RateLimit-Limit": "50",
                    "X-RateLimit-Remaining": "0"}
    e.response = resp
    return e


# ---------------------------------------------------------------- part E
print("\n### E · the error the user actually sees (M-01)")
# The frontend used to read `detail`, log it, and substitute a hardcoded string
# per status, so a spent daily allowance reached the phone as "this server has
# not been configured". Both halves are asserted, and the backend half drives
# the real /agent handler with the exceptions the provider actually raises.

PROMPT = "is it safe to travel to Pari Chowk without an umbrella today?"

# --- no key on the service
st, d = _post_agent(PROMPT, key=None)
print(f"  no key       {st}: {d[:120]}")
check("E1: a keyless service answers 503", st == 503, str(st))
check("E2: the not-configured detail names no environment variable",
      "OPENROUTER" not in d and "API_KEY" not in d, d[:80])
check("E3: the not-configured detail names no internal service",
      "ML service" not in d, d[:80])
check("E4: the not-configured detail says what still works",
      "still work" in d.lower(), d[:100])

# --- the daily allowance is spent
st, d = _post_agent(PROMPT, agent_exc=_daily_cap_exception())
print(f"  daily cap    {st}: {d[:120]}")
check("E5: a spent allowance answers 503", st == 503, str(st))
check("E6: the daily-cap detail says the limit is a daily one",
      "daily limit" in d.lower(), d[:100])
check("E7: the daily-cap detail states WHEN it resets", "reset" in d.lower(), d[:100])
check("E8: the daily-cap detail includes the actual reset time",
      "05:30" in d, d[:110])
check("E9: the daily-cap detail says what still works",
      "still work" in d.lower())
check("E10: the daily-cap detail leaks no env var or service name",
      "OPENROUTER" not in d and "ML service" not in d)

# --- the model is unreachable
st, d = _post_agent(PROMPT, agent_exc=ValueError("some upstream failure"))
print(f"  unreachable  {st}: {d[:120]}")
check("E11: an unreachable model answers 502", st == 502, str(st))
check("E12: the 502 detail names no exception class",
      not any(x in d for x in ("Error", "Exception", "ValueError", "Timeout")), d[:90])
check("E13: the 502 detail still says what to do next",
      "try again" in d.lower(), d[:90])

# --- the live service, if it is up
try:
    req = urllib.request.Request(
        "http://127.0.0.1:8000/agent",
        data=json.dumps({"prompt": PROMPT}).encode(),
        headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            _ls, _ld = r.status, json.loads(r.read().decode()).get("detail", "")
    except urllib.error.HTTPError as e:
        _ls, _ld = e.code, json.loads(e.read().decode()).get("detail", "")
    print(f"  live         {_ls}: {_ld[:120]}")
    check("E14: the live service returns a usable detail", bool(_ld.strip()))
    check("E15: the live detail leaks no env var or service name",
          "OPENROUTER" not in _ld and "ML service" not in _ld, _ld[:90])
except Exception as e:
    print(f"  (live service unreachable: {type(e).__name__})")
    check("E14: the live service returns a usable detail", False, type(e).__name__)

# --- the frontend half, from source
_frontend = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..",
                              "frontend", "src", "components",
                              "AIChatWorkspace.tsx"), encoding="utf-8").read()
check("E16: the frontend still reads `detail` from the error body", "detail" in _frontend)
# The phrase survives in the comment explaining the fix, so look for it being
# ASSIGNED to the string the user is shown, not merely present in the file.
_bad = re.search(r"content\s*=\s*[^;]*has not been configured", _frontend, re.S)
check("E17: the false 'not configured' copy is assigned to no user-facing string",
      _bad is None, (_bad.group(0)[:70] + "...") if _bad else "only in an explanatory comment")
# Assert the CONTROL FLOW, not the presence of an identifier. A mutation that
# makes the `if` constant-false leaves the word "sayable" in the file, so a
# substring check passed on a frontend that had been reverted to discarding the
# detail entirely -- which is precisely the bug being guarded.
_pref = re.search(
    r"if\s*\(\s*sayable\s*\)\s*\{\s*\n\s*content\s*=\s*sayable\s*;", _frontend)
check("E18: the frontend prefers a non-empty detail when one is present",
      _pref is not None,
      "found: content = sayable guarded by `if (sayable)`" if _pref
      else "the guard `if (sayable) { content = sayable; }` is missing")
check("E19: a per-status fallback still exists for a detail-less response",
      "unavailable right now" in _frontend)

print("\n" + "=" * 78)
print(f"RESULT: {len(PASS)} passed, {len(FAIL)} failed")
for f in FAIL:
    print(f"  FAILED: {f}")
print("=" * 78)
sys.exit(1 if FAIL else 0)
