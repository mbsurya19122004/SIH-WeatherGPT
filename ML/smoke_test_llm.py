#!/usr/bin/env python3
"""
REAL provider smoke test.

Proves the full chain, bypassing the application's regex fast path:
  ChatOpenAI -> OpenRouter -> remote model -> tool call -> tool execution
  -> tool result returned to the model -> final answer.

A 200 from the app is NOT accepted as evidence: this asserts an actual
tool_call is emitted AND that the tool's real output reaches the final
answer. The API key is read from the environment and never printed.

Run from the ML directory so the project-root .env is picked up:
    ../.venv/bin/python smoke_test_llm.py
"""
import os
import sys
import time
import json

# Load the project-root .env exactly as the service does, so this test and the
# running service can never disagree about which key is in play.
_ENV_FILE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"
)
if os.path.isfile(_ENV_FILE):
    try:
        from dotenv import load_dotenv

        load_dotenv(_ENV_FILE, override=False)
    except ImportError:
        pass

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

import agent as agent_mod

API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not API_KEY:
    print("FAIL: OPENROUTER_API_KEY is not set in this environment")
    sys.exit(2)

print("=" * 74)
print("OPENROUTER SMOKE TEST — real remote inference + real tool calling")
print("=" * 74)
print(f"interpreter        : {sys.executable}")
print(f"base url           : {agent_mod.OPENROUTER_BASE_URL}")
print(f"configured model   : {os.environ.get('LLM_MODEL') or agent_mod.DEFAULT_MODEL}")
print(f"api key present    : {bool(API_KEY)} (len={len(API_KEY)}, value never printed)")
print()

# A local probe tool with a value the model can only know by calling it.
PROBE_VALUE = "7.4"


@tool
def probe_station_reading(station: str) -> str:
    """Return a station's current reading. Use this whenever asked for a reading."""
    return json.dumps({"station": station, "temp_c": PROBE_VALUE, "source": "live-probe"})


def line(label, ok, detail=""):
    print(f"  [{'PASS' if ok else 'FAIL'}] {label}" + (f" — {detail}" if detail else ""))
    return ok


TRANSIENT = ("RateLimit", "Overloaded", "ServiceUnavailable", "APIConnection", "Timeout")

# OpenRouter also surfaces an upstream 429/503 as a plain ValueError whose
# message is the error dict, so the exception CLASS alone does not identify a
# transient free-tier failure. The message is inspected as well.
TRANSIENT_MSG = ("429", "503", "rate limit", "rate-limit", "overloaded", "temporarily")


def _is_transient(e: Exception) -> bool:
    if any(t in type(e).__name__ for t in TRANSIENT):
        return True
    return any(t in str(e).lower() for t in TRANSIENT_MSG)


def with_retry(fn, attempts=5, base_delay=4.0):
    """
    Retry a call through free-tier transient failures.

    Free OpenRouter models sit on shared upstream pools and fail transiently
    with 429 (rate limited) or 503 (provider overloaded) for reasons that have
    nothing to do with this client. Retrying with linear backoff is the
    documented remedy; giving up on the first 429 would mean a smoke test that
    reports a model defect when the provider was merely busy.
    """
    last = None
    for i in range(attempts):
        try:
            return fn()
        except Exception as e:  # noqa: BLE001 - broad on purpose, filtered by _is_transient
            if not _is_transient(e):
                raise
            last = e
            wait = base_delay * (i + 1)
            print(f"       transient {type(e).__name__}; retry {i + 1}/{attempts - 1} in {wait:.0f}s")
            time.sleep(wait)
    raise last


results = []
llm = ChatOpenAI(
    model=os.environ.get("LLM_MODEL") or agent_mod.DEFAULT_MODEL,
    api_key=API_KEY,
    base_url=agent_mod.OPENROUTER_BASE_URL,
    temperature=0,
    max_retries=1,
    timeout=90,
)

# ── 1. Plain inference ─────────────────────────────────────────────────────
print("── 1. plain model inference ──")
t0 = time.time()
try:
    r = with_retry(lambda: llm.invoke([HumanMessage(content="Reply with exactly the word: PONG")]))
    txt = (r.content or "").strip()
    dt = time.time() - t0
    meta = r.response_metadata or {}
    results.append(line("remote model responded", bool(txt), f"{txt[:40]!r} in {dt:.1f}s"))
    results.append(line("provider metadata identifies a real model",
                        bool(meta.get("model_name") or meta.get("model")),
                        f"model_name={meta.get('model_name') or meta.get('model')}"))
    results.append(line("finish_reason present", bool(meta.get("finish_reason")),
                        str(meta.get("finish_reason"))))
    results.append(line("usage tokens reported", bool((r.usage_metadata or {}).get("total_tokens")),
                        f"tokens={(r.usage_metadata or {}).get('total_tokens')}"))
except Exception as e:
    results.append(line("remote model responded", False, f"{type(e).__name__}: {str(e)[:120]}"))

# ── 2. Native tool calling ─────────────────────────────────────────────────
print("\n── 2. native tool calling (the app's core requirement) ──")
t0 = time.time()
try:
    bound = llm.bind_tools([probe_station_reading])
    r = with_retry(lambda: bound.invoke([
        SystemMessage(content="You must call the probe tool to get readings. Never guess."),
        HumanMessage(content="What is the current reading at station KOC-1?"),
    ]))
    dt = time.time() - t0
    calls = getattr(r, "tool_calls", None) or []
    results.append(line("model emitted a real tool call", len(calls) > 0,
                        f"{len(calls)} call(s) in {dt:.1f}s"))
    if calls:
        c = calls[0]
        results.append(line("tool call has a name", c.get("name") == "probe_station_reading", str(c.get("name"))))
        results.append(line("tool call carries arguments", bool(c.get("args")), json.dumps(c.get("args"))[:80]))
        # Execute the tool for real, then let the model use the result.
        tool_out = probe_station_reading.invoke(c["args"])
        results.append(line("tool executed, real value returned", PROBE_VALUE in tool_out, tool_out[:70]))
        from langchain_core.messages import ToolMessage
        # `llm.invoke(messages)` returns a single AIMessage, not a message
        # list, so the conversation is rebuilt explicitly. Using r.messages here
        # was a bug in this script, not a model failure.
        convo = [
            SystemMessage(content="You must call the probe tool to get readings. Never guess."),
            HumanMessage(content="What is the current reading at station KOC-1?"),
            r,
            ToolMessage(content=tool_out, tool_call_id=c["id"]),
        ]
        r2 = with_retry(lambda: bound.invoke(convo))
        final = (r2.content or "")
        results.append(line("tool result reached the model and is in the final answer",
                            PROBE_VALUE in final, f"final={final.strip()[:70]!r}"))
except Exception as e:
    results.append(line("model emitted a real tool call", False, f"{type(e).__name__}: {str(e)[:140]}"))

# ── 3. The application's real agent, end to end ────────────────────────────
print("\n── 3. application agent (real tools: geocode_place + get_weather) ──")
t0 = time.time()
try:
    a = agent_mod.build_agent()
    res = with_retry(lambda: a.invoke({"messages": [HumanMessage(
        content="Use your tools to look up Mumbai and tell me the current temperature in Celsius.")]}))
    dt = time.time() - t0
    msgs = res["messages"]
    tool_msgs = [m for m in msgs if getattr(m, "type", "") == "tool"]
    results.append(line("agent invoked a real tool", len(tool_msgs) > 0,
                        f"{len(tool_msgs)} tool result(s) in {dt:.1f}s"))
    names = sorted({getattr(m, "name", "?") for m in tool_msgs})
    results.append(line("correct weather tools were used",
                        bool(names) and all(n in ("geocode_place", "get_weather") for n in names),
                        ", ".join(names)))
    answer = (msgs[-1].content or "")
    has_num = any(ch.isdigit() for ch in answer)
    results.append(line("final answer contains a real reading", has_num, answer.strip()[:90]))
    results.append(line("agent did not dump raw JSON", not answer.strip().startswith("{\"coord")))
except Exception as e:
    results.append(line("agent invoked a real tool", False, f"{type(e).__name__}: {str(e)[:140]}"))

print("\n" + "=" * 74)
passed = sum(1 for r in results if r)
print(f"SMOKE TEST: {passed}/{len(results)} checks passed")
print("=" * 74)
sys.exit(0 if passed == len(results) else 1)
