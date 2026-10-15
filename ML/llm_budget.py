"""
Short-TTL answer cache, and the ranked model fallback list.

WHY A CACHE EXISTS. The provider allowance is the binding constraint, not
latency: this key is on OpenRouter's free tier, which allows 50 model requests
per day. A demo where several people ask the same question — or ask the same
question twice after a typo — burns allowance for no new information. A short
TTL removes exactly that waste while still going stale quickly, because a
weather answer that is 60 seconds old is fine and one that is 10 minutes old is
not.

The cache is keyed on the NORMALISED prompt, so "Will it rain in Kochi?" and
"will it rain in kochi?" and trailing-whitespace variants share an entry. It is
in-process and deliberately not persistent: a stale entry surviving a restart
would be worse than a miss.

WHY A FALLBACK LIST. Free models sit on shared upstream pools and fail
intermittently (429, 503). When the primary is busy, a different free model on
a different provider usually answers. The list is ordered by measured
tool-calling behaviour, not by the model page, and each entry records when it
was actually verified.
"""

import os
import re
import time
from typing import Optional

# How long an answer stays fresh. Short by design: the point is to collapse
# repeats within a session, not to serve stale weather.
ANSWER_CACHE_TTL_SECONDS = int(os.environ.get("LLM_ANSWER_CACHE_TTL", "60"))
# Bound the cache so a long session cannot grow it without limit.
ANSWER_CACHE_MAX_ENTRIES = 256

_answer_cache: "dict[str, tuple[float, str]]" = {}


def _normalise_prompt(prompt: str) -> str:
    return re.sub(r"\s+", " ", (prompt or "").strip().lower())


def cache_get(prompt: str) -> Optional[str]:
    key = _normalise_prompt(prompt)
    if not key:
        return None
    hit = _answer_cache.get(key)
    if not hit:
        return None
    stored_at, answer = hit
    if time.time() - stored_at > ANSWER_CACHE_TTL_SECONDS:
        _answer_cache.pop(key, None)
        return None
    return answer


def cache_put(prompt: str, answer: str) -> None:
    key = _normalise_prompt(prompt)
    if not key:
        return
    if len(_answer_cache) >= ANSWER_CACHE_MAX_ENTRIES:
        # Drop the oldest entry. A plain FIFO is enough: there is no value in
        # LRU here because entries are all short-lived by TTL anyway.
        oldest = min(_answer_cache.items(), key=lambda kv: kv[1][0])[0]
        _answer_cache.pop(oldest, None)
    _answer_cache[key] = (time.time(), answer)


def cache_clear() -> None:
    _answer_cache.clear()


def cache_stats() -> dict:
    now = time.time()
    live = [k for k, (t, _) in _answer_cache.items() if now - t <= ANSWER_CACHE_TTL_SECONDS]
    return {"entries": len(_answer_cache), "live": len(live), "ttl_seconds": ANSWER_CACHE_TTL_SECONDS}


def active_model() -> str:
    """The model that will actually be used, after environment overrides."""
    return os.environ.get("LLM_MODEL") or DEFAULT_MODEL


def is_free_tier_model(model_id: str) -> bool:
    """
    Whether the model sits on the free tier.

    Reported so the 50-request-per-day constraint is visible in /health rather
    than only in this file. It is informational: nothing here changes the
    model, and the choice of paid versus free remains an operator decision.
    """
    return ":free" in (model_id or "").lower()


# ---------------------------------------------------------------------------
# Ranked free-model fallback list
# ---------------------------------------------------------------------------
#
# Ordered by what was MEASURED, not by what a model page advertises. The
# original default, google/gemma-4-26b-a4b-it:free, advertises tool support and
# was unusable: every request returned 429 from a saturated upstream pool.
#
# `verified` records the date and what was checked. `tool_call` is the result
# of smoke_test_llm.py, which asserts a real tool call, real execution, and
# that the tool's value reaches the final answer.

MODEL_FALLBACKS = [
    {
        "model": "nvidia/nemotron-3-super-120b-a12b:free",
        "verified": "2026-09-28",
        "tool_call": True,
        "notes": "smoke_test_llm.py 13/13: real tool call, real execution, tool value in the final answer. Intermittent 503 from Nvidia under load, mitigated by retry/backoff.",
    },
    {
        "model": "liquid/lfm-2.5-2.6b:free",
        "verified": "2026-09-28",
        "tool_call": True,
        "notes": "Emitted a real tool call when probed. Not run through the full smoke test. Much smaller model, so weaker answers; kept as a fallback only.",
    },
    {
        "model": "google/gemma-4-26b-a4b-it:free",
        "verified": "2026-09-28",
        "tool_call": False,
        "notes": "UNUSABLE on this key. Advertises tools, but every request 429s: limit_source=upstream_provider_shared_pool (Google AI Studio). Kept last for documentation, not expected to serve.",
    },
]

# Default stays a free model per instruction; a paid model can be selected with
# LLM_MODEL without touching code.
DEFAULT_MODEL = "nvidia/nemotron-3-super-120b-a12b:free"


def model_ranking() -> list:
    return sorted(MODEL_FALLBACKS, key=lambda m: (not m["tool_call"],))
