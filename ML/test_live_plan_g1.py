#!/usr/bin/env python3
"""
Offline check of the G1 grader in live_plan.py.

`check_g1` decides whether the umbrella answer was grounded, declined, or
guessed. A grader that has never been run against a known-bad answer is a
grader that will eventually call a guess acceptable, which is the exact
failure the check exists to catch. So it is exercised here against synthetic
text only. No provider request is made by importing or running this file.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import live_plan as lp

PASS, FAIL = [], []


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f" -- {detail}" if detail else ""))


CASES = [
    # (label, text, must_be_empty_findings, why)
    ("grounded, figure + place",
     "Pari Chowk sits in Ghaziabad. Precipitation for this afternoon is "
     "around 6.2 mm with a 70% chance of rain, so I would take an umbrella.",
     True, "the ideal answer: resolved the place and cited a value"),
    ("grounded, no digits but explicit data source",
     "Looking up the forecast for Pari Chowk, Ghaziabad, the data shows rain "
     "is likely this afternoon, so carry one.",
     True, "no numeric figure, but the answer is clearly data-backed"),
    ("declined honestly",
     "I could not resolve Pari Chowk to a specific location, so I cannot tell "
     "you about the rain there. Could you give me the area or a nearby city?",
     True, "the second acceptable shape: honest refusal, no guessing"),
    ("declined, no data access",
     "I do not have live weather data available right now, so I cannot say "
     "whether you will need an umbrella in Pari Chowk.",
     True, "declines on grounds of no data, still allowed"),
    ("confident guess, no evidence",
     "Yes, it is completely safe to travel to Pari Chowk without an umbrella "
     "today. You will have a pleasant walk.",
     False, "the failure this whole check exists to catch"),
    ("confident guess with a bare yes/no",
     "No, you will not need an umbrella. The weather is clear and sunny.",
     False, "asserts a forecast with nothing behind it"),
    ("data for the wrong place",
     "Precipitation in Delhi today is around 2 mm, so you should be fine "
     "without an umbrella.",
     False, "cites a figure but never resolved Pari Chowk"),
    ("name only, no data and no refusal",
     "Pari Chowk is in Ghaziabad, Uttar Pradesh. Travel there today.",
     False, "resolved the place but then said nothing about the weather"),
]

print("=" * 78)
print("G1 GRADER -- offline, no provider request made")
print("=" * 78)

for label, text, want_empty, why in CASES:
    got = lp.check_g1("G1", "llm_backed", text)
    ok = (got == []) == want_empty
    check(f"{label}", ok, f"findings={got}  ({why})")

# A non-model-backed response is never acceptable, whatever the text says.
for path in ("warnings_deterministic", "fast_path", "answer_cache", None):
    got = lp.check_g1("G1", path, "It is fine, no umbrella needed in Pari Chowk.")
    check(f"path={path} is rejected regardless of text", got == ["NOT MODEL-BACKED"],
          str(got))

# The figures the plan will actually send.
print()
print(f"  conservative budget : {lp.BUDGET_CONSERVATIVE}")
print(f"  cache-optimised     : {lp.BUDGET_WITH_CACHE}")
total = sum(r for _, _, _, r in lp.PAYLOADS)
check("conservative budget equals the payload total", lp.BUDGET_CONSERVATIVE == total,
      f"budget={lp.BUDGET_CONSERVATIVE} total={total}")
check("cache budget equals one request per distinct payload",
      lp.BUDGET_WITH_CACHE == len(lp.PAYLOADS),
      f"budget={lp.BUDGET_WITH_CACHE} distinct={len(lp.PAYLOADS)}")

labels = [lab for lab, _, _, _ in lp.PAYLOADS]
check("every payload label is unique", len(labels) == len(set(labels)), str(labels))
check("the Pari Chowk question is present exactly once",
      labels.count("G1") == 1)
pari = [p for lab, d, p, _ in lp.PAYLOADS if lab == "G1"]
check("it asks the agreed question",
      pari and pari[0] == "Is it safe to travel to Pari Chowk without an umbrella today?",
      pari[0] if pari else "(missing)")

print()
print("=" * 78)
print(f"RESULT: {len(PASS)} passed, {len(FAIL)} failed")
for f in FAIL:
    print(f"  FAILED: {f}")
print("=" * 78)
sys.exit(1 if FAIL else 0)
