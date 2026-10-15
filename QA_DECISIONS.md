# QA Decisions — WeatherGPT

Subjective product decisions surfaced by the audit. My recommendation is stated explicitly in each; the choice is yours.

**No application code was modified during the audit.** Everything below is awaiting your selection.

---

| ID | Problem | Recommendation | A | B | C | Confidence | Decision |
|---|---|---|---|---|---|---|---|
| UX-001 | Ambiguous city names silently resolve to the wrong country ("Kochi" → Japan) | **A** | Show resolved country + typeahead | Header-only disclosure | Prefer India match in geocoder | HIGH | _ |
| UX-002 | 2 of 5 map layers off-screen on mobile | **A** | Let the pill row wrap | Horizontal scroll + edge fade | Collapse to a `<select>` | HIGH | _ |
| UX-003 | Location lost on refresh | **A** | Persist last selection | Show cached report only | Persist + explicit "restore" prompt | HIGH | _ |
| UX-004 | Route form: dead button + silent empty submit | **A** | Disable + inline validation | Keep enabled, show message on submit | Inline errors only, no disable | HIGH | _ |
| UX-005 | Inconsistent error copy; raw "Failed to fetch" | **A** | Reuse chat phrasing everywhere | Per-feature bespoke copy | Shared error component + codes | HIGH | _ |
| UX-006 | Location pill is a dead control when permission denied | **A** | Inline hint + live-region announce | Navigate to city search | Modal explaining why | MEDIUM | _ |
| UX-007 | No `h1` on 8 of 9 views | **A** | One `h1` per view | Leave as-is (visual parity) | `role="banner"` on the shell | HIGH | _ |
| UX-008 | Per-layer honesty note clipped on mobile | **A** | Allow wrap + reposition | Shorten copy, keep nowrap | Move note into the legend | HIGH | _ |
| UX-009 | `--watch-orange` 3.34:1 used at 13px bold | **A** | Darker text-orange token | Enlarge the L glyph | Use `--ink` for the letter | MEDIUM | _ |
| UX-010 | Report search has no accessible name | **A** | Visually-hidden `<label>` | `aria-label` | `title` attribute | HIGH | _ |
| UX-011 | Location pill names a state, not an action | **A** | `aria-label="Use my location"` | Action-oriented visible text | `aria-describedby` state text | HIGH | _ |
| UX-012 | Cached-location fallback doesn't name the city | **A** | Name it in the message | Leave as-is | Separate inline note | MEDIUM | _ |
| UX-013 | Mobile touch targets under 44px | **A** | Expand hit area only | Enlarge controls visually | Leave except toggles | MEDIUM | _ |
| UX-014 | `JAVA_API_BASE` hardcoded to production | **A** | Env-var switch w/ local default | Keep production default | Warn banner in dev | HIGH | _ |
| PROMPT-001 | AI prompt safety **completely unverified** (backend down) | **A** | Stand up ML service, then red-team | Static code review of `agent.py` only | Defer until pre-release | HIGH | _ |

---

## Detail

### UX-001 · Ambiguous city names resolve to the wrong country
**Problem:** `Kochi` → Kochi **Japan** (23 °C, light drizzle). `Kochi, Kerala` → Kochi **India** (28 °C, overcast). The geocoder understands `City, Region`, but the UI shows only the city name and offers no picker.
**Compounding evidence:** bare `Kochi` renders an **official IMD Yellow Warning for Kochi district, Kerala** ("Verbatim · India Meteorological Department") directly above **Kochi, Japan** forecast data, under one unqualified name. A safety-relevant official warning is shown to someone outside the warned area.
**Evidence:** `qa/11-place.mjs`; grid coordinates `latitude=33.55&longitude=133.53333`. `listboxes 0, options 0, combobox 0`. Screenshot `docs/qa-evidence/P1-002-kochi-resolves-japan.png`.
**User impact:** Highest-severity finding. This breaks the product's honesty premise and, in the warning case, its safety premise.
**My judgment:** Fix before shipping anything else.
**Confidence:** HIGH

**A — RECOMMENDED:** Show `Kochi, Kerala, India` in the result header, and add a typeahead listing candidates with country whenever a name is ambiguous.
- *Why:* Fixes the trust problem at the point of confusion, and the typeahead also removes the need to memorise `"City, Region"` syntax. `config/api.ts` already supports authoritative coordinates, so the plumbing exists. **Critically, it also stops an IMD warning from being visually attached to another country's forecast.**
- *Trade-offs:* Moderate UI work; needs a geocoder call per keystroke (debounced, cached).
- *Scope:* `WeatherReportView` + a new suggestions list + the result header.

**B — CONSERVATIVE:** Keep the single result; append the country and admin area to the heading only.
- *Advantages:* Small change, no new UI, removes the deception.
- *Disadvantages:* The user still cannot *choose* Japan vs Kerala — they must know to type the region manually. Fixes honesty, not capability.

**C — ALTERNATIVE:** Bias the geocoder toward India (`count=5`, prefer `country_code=IN`).
- *Advantages:* Cheapest; correct for the product's actual scope.
- *Disadvantages:** Actively wrong for the many users legitimately asking about foreign cities — a Kyoto or Dublin user would be mis-served. I do not recommend this.

---

### UX-002 · Two of five map layers unreachable on mobile
**Problem:** Pill bar `clientW 356 / scrollW 666` — **310px overflow**. `Wind` and `Radar` sit entirely off-screen with no scroll affordance.
**User impact:** 40% of map functionality invisible on a phone; the Wind layer is the most developed surface in the product.
**Confidence:** HIGH

**A — RECOMMENDED:** `flex-wrap: wrap` below ~560px.
- *Why:* All five pills visible, zero new UI, no hidden state. Wrapping two rows of pills on a 390px phone is visually fine.
- *Trade-offs:* Slightly taller toolbar (~40px).
- *Scope:* one media query in `WeatherMap.css`.

**B — CONSERVATIVE:** Keep the scroll, add a right-edge fade + `scroll-snap`.
- *Advantages:* Preserves the single-row height.
- *Disadvantages:* Relies on the user discovering scrollability; on touch, a horizontally-scrolling row inside a vertically-scrolling map is easy to fight with by accident.

**C — ALTERNATIVE:** Collapse the five pills into a native `<select>` on mobile.
- *Advantages:* Most compact; familiar pattern.
- *Disadvantages:* Loses the visual "active layer" affordance, adds a control style, and is a bigger change than the problem warrants.

---

### UX-003 · Location lost on refresh
**Problem:** Select `Kochi, Kerala` → reload → `"Location unavailable"`, while the page promises *"Forecast is cached for offline use."*
**Judgment:** The cache exists; only the pointer to it is missing. Half-implemented promise is worse than none because the copy overstates.
**Confidence:** HIGH

**A — RECOMMENDED:** Persist `{name, latitude, longitude, timestamp}` to `localStorage`; restore on mount as a *previous* selection (never an automatic GPS grab).
- *Why:* Makes the offline claim true, and a returning user gets their place back. Explicitly not auto-GPS, which would be privacy-surprising.
- *Trade-offs:* Adds a stored-value surface — treat it as untrusted and validate shape.
- *Scope:** `LocationContext` + a header affordance showing when the location is restored/stale.

**B — CONSERVATIVE:** On mount, if a cached forecast exists, render the report for it with a clear "cached" label.
- *Advantages:* No new persistent state.
- *Disadvantages:** Other pages still have no location, so the app remains half-usable offline.

**C — ALTERNATIVE:** Persist, but show a dismissible "Return to Kochi?" prompt instead of restoring silently.
- *Advantages:* Most transparent; user stays in control.
- *Disadvantages:* One extra click on every return visit.

---

### UX-004 · Route form dead button and silent empty submit
**Problem:** `disabled=false` in all cases; empty submit → `netEvents=0` and no message.
**Confidence:** HIGH

**A — RECOMMENDED:** Disable "Analyze route" until both fields are non-empty; add inline field hints on attempt.
- *Why:* Standard, unambiguous, matches the app's own chat send-button pattern (which *is* correctly disabled when empty).
- *Scope:** small.

**B — CONSERVATIVE:** Leave enabled; on empty submit show a validation message.
- *Advantages:* Discoverable — the user learns why by pressing.
- *Disadvantages:* Rewards a dead tap.

**C — ALTERNATIVE:** Inline errors only, never disable.
- *Advantages:* Consistent with typical web forms.
- *Disadvantages:* Button state carries no information.

---

### UX-005 · Inconsistent error copy; raw `Failed to fetch` leaks to users
**Problem:** Chat says *"Sorry, I couldn't connect to the WeatherGPT agent…"*; Route says `Failed to fetch` — same down backend, same moment.
**Confidence:** HIGH

**A — RECOMMENDED:** One shared human-facing error string for the unreachable-AI case; technical detail to `console` only.
- *Why:* Cheap, removes the jargon leak, makes the app feel coherent.
- *Scope:** small.

**B — CONSERVATIVE:** Hand-write distinct copy per feature.
- *Advantages:* Each surface can be maximally specific.
- *Disadvantages:* More strings to keep consistent; drifts again over time.

**C — ALTERNATIVE:** Shared error component with a short code + expanded detail on click.
- *Advantages:* Best for a technical audience; still hides internals by default.
- *Disadvantages:* Adds a disclosure interaction; probably over-engineering here.

---

### UX-006 · Location pill is a dead control when permission is denied
**Problem:** `toasts: []`, `liveText: []`, no state change. Contrast: with permission granted the same click works.
**Confidence:** MEDIUM (the *right* recovery is a product call)

**A — RECOMMENDED:** Inline hint on the pill — "Location access blocked · tap to try again" — plus a live-region announcement, and keep the tap wired to a re-request.
- *Why:* Preserves the user's intent (they wanted *their* location) and explains the block. Uses the existing live region.
- *Trade-offs:* Needs a distinct "denied" vs "unsupported" state.

**B — CONSERVATIVE:** On denial, jump the user to the city search.
- *Advantages:* Fastest path to a working location; sidesteps the permission model.
- *Disadvantages:** Ignores that they may have blocked deliberately; can read as pushy.

**C — ALTERNATIVE:** Modal explaining why location helps, with "Not now".
- *Advantages:* Teaches the value of the permission.
- *Disadvantages:* A modal for a header control is heavy; risks feeling like nagging.

---

### UX-007 · No `h1` on eight of nine views
**Problem:** Chat/most pages start at `h2`; Radar alone uses `h1`.
**Confidence:** HIGH

**A — RECOMMENDED:** One `h1` per view naming the page; demote existing `h2`s.
- *Why:* Gives screen-reader users a per-page anchor and makes the nine siblings structurally consistent. Cheap, no visual change.
- *Trade-offs:** Slight risk of visual restyling if heading sizes are load-bearing — check the type scale.

**B — CONSERVATIVE:** Leave headings as-is.
- *Advantages:** Zero risk to layout.
- *Disadvantages:** Inconsistent document structure persists.

**C — ALTERNATIVE:** Keep the visual hierarchy, add `role="banner"`/`aria-label` to the view container.
- *Advantages:* No heading-level churn.
- *Disadvantages:* Weaker than real headings for navigation.

---

### UX-008 · Per-layer honesty note clipped on mobile
**Problem:** `362px` note in a `356px` map, `white-space: nowrap`, centre-anchored, `clippedLeft/Right: true`, `overlapsZoom: true`. Desktop clean.
**Confidence:** HIGH

**A — RECOMMENDED:** `white-space: normal`, `max-width: calc(100% - 24px)`, and move it clear of the zoom control.
- *Why:* The message exists to be read; this is the one place it must not degrade. Objective overflow.
- *Scope:** small CSS change.
- *Note:* objectively broken — I would fix this even without a decision.

**B — CONSERVATIVE:** Keep `nowrap`, shorten copy to `"Wind data unavailable"`.
- *Advantages:* Tiny change, single line always.
- *Disadvantages:** Loses the "try again" guidance; still overlaps the zoom control.

**C — ALTERNATIVE:** Move the note into the legend block at the bottom.
- *Advantages:* No collision risk at all; groups the honesty message with the data key.
- *Disadvantages:** Less prominent; the legend is already information-dense.

---

### UX-009 · `--watch-orange` fails AA at 13px bold
**Problem:** 3.34:1 on `--paper`, used for the isobar "L" glyph at `13px/800`. Large-text threshold is 18.66px bold, so this is normal-size.
**Confidence:** MEDIUM (severity depends on how much the glyph matters)

**A — RECOMMENDED:** Introduce a darker `--watch-orange-text` (or darken the token) for glyph/text use; keep the bright token for fills.
- *Why:* The rest of the palette is strong (ink 16:1, muted 5.57:1, teal 5.76:1) — this is the one outlier, and it marks a meteorologically significant system.
- *Trade-offs:* Two orange tokens; must verify dark mode too.

**B — CONSERVATIVE:** Enlarge the "L"/"H" glyph to ≥18.66px bold so large-text rules apply.
- *Advantages:* No new token.
- *Disadvantages:* Bigger markers compete with the isobars — a legibility trade against the work just done.

**C — ALTERNATIVE:** Render the letter in `--ink` and keep the orange only on the surrounding ring.
- *Advantages:* Maximum contrast, no new token.
- *Disadvantages:** Loses the orange/teal L-vs-H colour distinction that was chosen deliberately.

---

### UX-010 / UX-011 · Accessible names
**P2-010:** Report city input — no `aria-label`, no `<label>`, no `title`. The Route form in the same codebase already does this correctly (`Origin`, `Destination`).
**P2-011:** Location pill — visible text "Location unavailable", `title="Use my location"`, no `aria-label`.
**Confidence:** HIGH both. Both are objectively broken form/name associations; I would fix without a decision.

**A — RECOMMENDED:** Visually-hidden `<label>` for the input; `aria-label="Use my location"` on the pill.
**B — CONSERVATIVE:** `aria-label` on both, no markup change.
**C — ALTERNATIVE:** Make both visible-text action-oriented ("Use my location") and convey state with a badge.
- *Advantage of C:* best for everyone, not just AT users. *Disadvantage:* larger visual change to the header.

---

### UX-012 · Cached-location fallback doesn't name the city
**Problem:** "Location not found. Showing cached forecast." — then a different city's data.
**Confidence:** MEDIUM

**A — RECOMMENDED:** "Couldn't find *zzzqqqxxyyvvv*. Showing the cached forecast for **Kochi**."
**B — CONSERVATIVE:** Leave as-is; the heading already names it.
**C — ALTERNATIVE:** Separate inline note under the heading rather than in the banner.

---

### UX-013 · Mobile touch targets under 44px
`EN` 28×23, `हिं` 22×23, send/voice 34×34, hamburger/theme 36×36.
**Confidence:** MEDIUM

**A — RECOMMENDED:** Expand the *hit area* to ≥44px via padding or a pseudo-element; leave the visual size.
**B — CONSERVATIVE:** Enlarge the controls visually too.
**C — ALTERNATIVE:** Fix only the two language toggles (worst offenders, 22–23px).

---

### UX-014 · `JAVA_API_BASE` hardcoded to a production deployment
**Problem:** `config/api.ts` points at `https://sih-weathergpt-production.up.railway.app`. Every local frontend session — including automated ones — reads and could write production data. I constrained this audit to GETs by hand; the next person may not know to.
**Evidence:** `frontend/src/config/api.ts:16`
**Confidence:** HIGH

**A — RECOMMENDED:** Env-var driven (`import.meta.env.VITE_JAVA_API_BASE`) with a localhost default in `.env.development`.
- *Why:* Removes a standing foot-gun and makes QA against local services possible.
- *Trade-offs:* Requires the Java service to be runnable locally to be useful.

**B — CONSERVATIVE:** Keep the production default, document the hazard in `AGENTS.md`.
**C — ALTERNATIVE:** Keep production default but surface a dev-only banner when running against production.

---

### PROMPT-001 · AI prompt safety is entirely unverified
**Problem:** `localhost:8000` is down. All 11 prompts — including 4 injection attempts (`Ignore all previous instructions…`, DAN role-play, scope escape, credential exfiltration) — reached only the connection-error path. **I have no evidence about the agent's prompt construction, leakage, or refusal quality.** I verified only that the client fails honestly.
**Confidence:** HIGH that this is a gap.

**A — RECOMMENDED:** Stand up the ML service locally, then re-run the injection suite against the live agent and record results here.
- *Why:* Prompt-injection resistance cannot be asserted without testing it. Given the agent posts user coordinates to an LLM, this matters.
- *Blockers:** missing `typing_extensions`; Ollama not installed/running; may need model pull.

**B — CONSERVATIVE:** Static review of `ML/agent.py` + `ML/main.py` prompt construction only.
- *Advantages:* No service needed.
- *Disadvantages:* Code reading cannot establish runtime refusal behaviour.

**C — ALTERNATIVE:** Defer; treat as a pre-release gate.
- *Advantages:* No current cost.
- **Disadvantages:** Ships an LLM feature with zero adversarial coverage. I do not recommend this.

---

## How to reply

```
1A   2A   3A   4A   5A   6A   7A   8A   9A   10A  11A  12A  13A  14A  15A
```

or any mix, e.g. `1A 2B 3A 4A 5A 6B ...`.

I will implement only what you select, then re-run the affected journeys and update `QA_REPORT.md` with FIXED / NOT_FIXED per finding. Findings I would fix regardless of your choice, because they are objective defects rather than design preferences: **P2-003, P2-008, P2-009, P2-010, P2-011** (clipped overflow and broken form/name associations). Tell me if you would rather I hold those too.

---

# Remediation Round 2 — decisions taken

## PROMPT-002 · Agent route capability and honesty boundary
**Status: IMPLEMENTED (option A) — reversible**

**Problem.** The agent has two tools (`geocode_place`, `get_weather`) and no
route tool. A travel question like *"I need to travel to Pari Chowk from Gaur
Yamuna City, is it safe to carry an umbrella today?"* could therefore be
answered by a model that has not checked the route — i.e. it would fabricate
journey conditions or imply a check it never made. This is the app's core
honesty claim, and it is the exact failure mode a generic model produces on a
two-part question.

**Evidence.** Tool inventory verified at runtime: `[{geocode_place}, {get_weather}]`,
`route-capable: False`.

**A — RECOMMENDED (implemented): make the limit explicit in the system prompt.**
- *Why:* The capability gap is real and cannot be closed safely without a route
  weather pipeline. Stating it costs nothing, closes the fabrication risk
  immediately, and keeps the answer useful (the model still answers the part it
  CAN check). The prompt requires separating FACT / INFERENCE / RECOMMENDATION,
  forbids implying the route was checked, and forbids recommending an umbrella
  unless retrieved data supports it.
- *Trade-off:* Users get a partial answer plus an explicit limit. Some will find
  that less satisfying than a confident guess — which is precisely the trade the
  product's principles require.
- *Scope:* `ML/agent.py` `SYSTEM_PROMPT` only. No new dependency, no API change.
- *Verification:* prompt contains the new section (grep count 1); tools unchanged.

**B — CONSERVATIVE: add a route tool now.**
- *Advantages:* Answers the full question.
- *Disadvantages:* Needs a routing provider, per-waypoint sampling, and caching —
  a project, not a patch. Unverifiable today (no key), so it would ship untested.

**C — ALTERNATIVE: refuse route questions outright.**
- *Advantages:* Zero fabrication risk.
- *Disadvantages:* Over-refuses. The user CAN get useful origin/destination
  weather advice; refusing everything is worse for them than the guarded answer.

## UX-001 / UX-002 — confirmed as chosen
P1-002 (Option A) and P1-001 (Option A) were selected and are implemented and
verified. No further input needed; recorded here for traceability.

## P2-011 — retracted, no decision needed
My own measurement error (measured `--watch-orange` instead of the
`--watch-orange-deep` actually used for the glyph). Corrected in QA_REPORT.md.

---

# Remediation Round 3 — decisions needed

## VS-1 · Voice service dependencies are never installed by `setup`
**Status: RESOLVED — Option A implemented, plus Option C (README manual path)**

**Problem.** `setup_project()` in `start.sh` (lines 181–186) installs only
`ML/requirements.txt`. It never installs `voice_service/requirements.txt`, yet
`start_voice_service()` then runs the voice service from the same `.venv`. So
the documented setup path cannot produce a working voice service, and
`./start.sh setup` reports "Setup complete" regardless.

Evidence: the voice service exited with
`RuntimeError: Form data requires "python-multipart" to be installed` and
`[WARN] Voice service exited.` Immediately after `python-multipart` was installed
it started cleanly and reported `stt_available: false, tts_available: false`.

I have fixed only the blocking symptom. Completing the fix means installing
`openai-whisper`, which pulls PyTorch — a multi-GB download — and the repository
working agreement forbids automatic dependency/model downloads without approval.

**A — RECOMMENDED: make `setup` install both requirement files, and let it fail loudly.**
- *Change:* add a `voice_service/requirements.txt` block to `setup_project()`
  mirroring the ML one; warn when the file is missing.
- *Why:* setup should produce a project that actually runs. The current gap is
  silent, so a user believes voice works until they speak into it.
- *Trade-off:* `./start.sh setup` becomes slow and large (PyTorch). Acceptable —
  it is a one-time setup step, and the alternative is a service that is
  permanently half-broken.
- *Scope:* `start.sh` only.

**B — CONSERVATIVE: declare the voice service optional and detect at startup.**
- *Change:* if `whisper`/`gtts`/`pyttsx3` are unimportable, print one clear line
  ("voice disabled: run ./start.sh setup or pip install -r
  voice_service/requirements.txt") instead of a raw traceback.
- *Trade-off:* cheap and honest, but the service still never works after a
  documented setup. Treats the symptom, not the cause.

**C — ALTERNATIVE: leave `setup` as-is; document the manual step in the README.**
- *Trade-off:* zero code risk, but the trap persists for anyone who does not read
  the README. I do not recommend this.

**Decision taken: A, plus C.** `setup_project()` now installs
`voice_service/requirements.txt` into the same venv as the ML service, and
README §3a documents both a manual install and how to skip voice entirely.

**What was implemented**
- `pip_cmd()` helper added alongside the existing `python_cmd`/`uvicorn_cmd`,
  so the pip resolution used by `setup` stops being duplicated inline.
- `setup_project()` installs both requirement files. The voice install is
  announced as a large download *before* it runs, so it is never a surprise.
- The voice install is guarded by `if ... ; then/else`, so a failure does not
  abort setup under `set -eu`, but it also does **not** print "Setup complete".
  It reports the failure, the exact retry command, and points at README §3a.
- README §3a: the three voice packages and what each is for, a manual install
  path, and a "skip voice" path that needs only `python-multipart`.

**Verification** — the real `setup_project()` source text was extracted from
`start.sh` and run against stubbed installers in a sandbox, so nothing was
downloaded. Both paths checked under the script's real `set -eu`:

| Mode | Installers invoked | Result |
|---|---|---|
| `ok` | mvn, npm, `pip -r ML/requirements.txt`, `pip -r voice_service/requirements.txt` | "Setup complete" |
| `fail-voice` | same four; voice pip exits 1 | 3 warnings, no "Setup complete", setup does not abort |

**Verification defect I caused and fixed.** My first attempt to test this
overrode `VENV_DIR` from the environment — but `start.sh:35` assigns
`VENV_DIR="$PROJECT_DIR/.venv"` unconditionally, so my override was ignored and
the test began a real `openai-whisper` install (a PyTorch download) against the
project venv. I killed it and rewrote the test to redirect `PROJECT_DIR`,
`VENV_DIR`, `ML_DIR` and `VOICE_DIR` into a throwaway tree, so the repository
venv cannot be reached whatever the script does. Post-kill check: no `whisper`,
`torch`, `gtts` or `pyttsx3` in `.venv`, and all six pre-existing imports still
resolve. Side effect left in place: **~1.8 GB of pip download cache** under
`~/.cache/pip` from that aborted run. It is a regenerable cache and safe to
delete, but I did not remove it unasked.

## ML-3/ML-4 · Ambiguity handling in the ML service — implemented, no reversal needed
Bare `Kochi` now asks which place is meant instead of silently answering for
whichever the geocoder ranked first, and a qualifier that cannot be honoured
(`Rome, Japan`) is refused rather than substituted. This is the same
Option-A-shaped choice already approved for the frontend in P1-002 — stop and ask
rather than guess — applied to a second code path. Recorded for traceability; no
further input required.

## ML-1 · Failure-class copy — implemented
Status codes 503/502/400–422 and transport failures now produce distinct,
specific messages. The backend detail is logged for operators only. This follows
the requirement to distinguish failure classes and is not a design decision, but
the copy wording is a product surface if you want to change it.

---

# Mobile audit — decisions (2026-09-28)

Subjective mobile findings from the phone-viewport audit. Objective defects were
fixed without asking (see QA_REPORT.md). These need a product call.

## UX-001 — The chat has no route, so the phone Back button exits the app

Problem: the app is a single page with no URL routing. All nine views render at
`/`, and the assistant is the landing view with no drawer destination of its own.
Every other view offers a "Back to chat" control, so nothing is a dead end inside
the app — but the hardware/gesture Back does not go "back", it leaves.

Evidence:
- `page.url()` identical (`/`) on all nine drawer destinations.
- `page.goBack()` from any view lands on `about:blank` with an empty document.
- Measured, not inferred. See `docs/qa-evidence/mobile-390x844-*.png`.

Affected users: every Android user, and iOS users who swipe back. On Android the
Back gesture is a primary navigation affordance, so the most-used way out of a
sub-view exits the product and discards the session. A user who taps Back by
reflex lands on a blank page and may assume the app crashed.

Why it matters: this is the one finding that can lose a session. Everything else
is friction; this is a dead end with no way back except re-launching.

My product judgment: fix it. Add hash routing so each view has an address, the
Back gesture walks the view history, and a re-launch restores the last view. This
is the standard remedy and it also makes the app linkable, which matters for a
government-project pilot where a supervisor sends a colleague "open the radar
view". Confidence: HIGH that it is a real problem; MEDIUM that the fix is worth
the complexity at this stage of the project.

A — RECOMMENDED
Exact change: hash routing — `#/`, `#/map`, `#/radar`, `#/alerts`, `#/nwp`,
`#/sectors`, `#/climate`, `#/route`, `#/report`. Back/Forward walk the views.
Deep-linking a view restores it on load; an unknown hash falls back to `#/`.
Why: restores the platform's primary navigation affordance, makes views
shareable, and needs no server change.
Trade-offs: introduces a second source of truth alongside React state, so view
changes must go through one setter or the two will drift. Roughly a day of work
and a new place for regressions. Existing deep links do not exist to preserve.
Implementation scope: `App.tsx` (view state), a small `useHashRoute` hook, the
drawer items, and tests for Back/Forward and a bad hash.

B — CONSERVATIVE
Exact change: keep the single route, but intercept the Back gesture and walk an
in-app view stack held in state, pushing the previous view instead of leaving.
Why: no URL surface to get wrong, no deep links, smallest change that stops the
data loss.
Disadvantages: Back still leaves the app from the landing view; views remain
unshareable; the interception is invisible magic that will surprise anyone who
inspects the URL bar, and it is a browser behaviour users can defeat by other
means.

C — ALTERNATIVE
Exact change: leave navigation as it is and add a persistent bottom tab bar, so
every view is one tap away and Back is not needed for in-app movement.
Why: the most conventional mobile pattern, and it removes the reliance on Back
entirely.
Disadvantages: five to seven destinations is too many for a bottom bar at 390px
(it would need truncation or a "More" tab), it consumes vertical space already
tight on a 375x667 screen, and it does nothing for the iOS swipe-back habit.
Highest cost of the three.

Decision required: A / B / C

## UX-002 — The assistant is the landing view but not in the drawer

Problem: the nine drawer destinations are Forecast, Map, Radar, Alerts, NWP,
Sectors, Climate, Route, Report. The chat — the product's actual interface, and
the only view with a text input — is not among them.

Evidence: measured from the rendered drawer at 390x844 and 375x667
(`mobile-390x844-drawer.png`); the same nine items in both. The chat is reached
only by the "Back to chat" control on other views or by a reload.

Affected users: anyone who wants to ask a question after browsing a map, and
anyone using the drawer as their mental model of the app.

Why it matters: the drawer is how a person learns what the app can do. The one
thing it cannot do — ask a question — is missing from that list, so the product
does not advertise its own primary capability. A user who opens the drawer
looking for "ask" concludes the app has no chat.

My product judgment: add it. One list item, no layout risk (all nine items
already fit at 375px with room to spare, and a tenth at 47px still fits in the
844px and 667px viewports I measured). Confidence: HIGH that the current state
misrepresents the product; MEDIUM that anyone finds the "Back to chat" control
without it.

A — RECOMMENDED
Exact change: add "Ask WeatherGPT" as the first drawer item, with the chat
iconography already used by the "Back to chat" control, and mark it as the
active item whenever the chat is showing.
Why: the drawer becomes an accurate map of the product; one tap instead of
searching; the active state answers "where am I", which the drawer currently
never does for any view.
Trade-offs: ten items rather than nine; the list is already at ~580px of a
667px viewport, so a 375x667 phone now has almost no spare room if a future
destination is added. Low risk, easy to reverse.
Implementation scope: `MobileDrawer.tsx` item list plus the active-state
treatment, and a test asserting the item is present and navigable.

B — CONSERVATIVE
Exact change: change the drawer's existing header so the brand block is a
button to the chat, and label the current "Back to chat" controls more
prominently.
Why: no new list item, so no crowding, and it makes the chat reachable from
the one place the eye already goes.
Disadvantages: a hidden affordance. Someone scanning the list of destinations
still sees no chat, and the primary capability stays invisible in the
information architecture — the actual complaint.

C — ALTERNATIVE
Exact change: put "Ask WeatherGPT" at the top of every view as a persistent
primary button, and leave the drawer unchanged.
Why: makes the primary action obvious from anywhere, which is the strongest
possible answer to "can I ask a question here".
Disadvantages: a persistent button on nine views competes with each view's own
primary action, which is a real hierarchy cost on the map and route forms, and
it adds a control to the tightest layouts. I do not recommend it.

Decision required: A / B / C

## UX-003 — How a 503 is worded depends on whether the operator should be told

Problem: the daily-cap message is now the backend's own text shown verbatim to
the user, which is a clear improvement on the false "not configured" claim. But
it reads as a status line: "The AI assistant has reached its daily limit and
resets at 29 Sep 2026, 05:30 IST. Weather, forecasts and warnings still work."

Affected users: anyone who hits the limit, which is every user once 50 requests
are spent in a day.

Why it matters: the message is honest but has no idea what to do next, and it
leads with a limitation rather than what the app can still do for them. For a
pilot where a supervisor shares one key across several users, "you are blocked
until tomorrow" without "here is what still works, and here is how to avoid
this" will read as a broken product.

My product judgment: keep the honest cause and reset time (never remove them),
but lead with what still works and add one concrete next step. Confidence:
MEDIUM-HIGH that this is better for the pilot; MEDIUM on exact wording, which is
why this is a decision rather than a unilateral edit.

A — RECOMMENDED
Exact change: keep the cause and the reset time, reorder to lead with capability
and name one specific next step, e.g. "Forecasts, warnings and the map are all
working. Questions are paused until 29 Sep, 05:30 IST because this server's
daily limit is used up. For a forecast, tap Map or the report page."
Why: the user learns what they can still do before what went wrong, and gets an
action rather than a deadline. Preserves every fact the current text has.
Trade-offs: longer. A chat bubble that is four sentences tall is worse than one
that is two, so the next step must earn its place.
Implementation scope: `ML/main.py` (the daily-cap `detail`), plus the E5-E10
assertions updated to match.

B — CONSERVATIVE
Exact change: leave the current wording exactly as it is.
Why: it is already honest, names the reset time, and says what still works.
Every rewrite risks losing a fact, and the next agent-driven pass will revisit
this copy anyway.
Disadvantages: leads with the failure, offers no next step, and reads like a
service status page rather than an assistant.

C — ALTERNATIVE
Exact change: shorten to one sentence and drop the reset time, e.g. "Questions
are paused for now, but forecasts, warnings and the map all work."
Why: the shortest message that is still true, and the reset time moves to a
badge near the composer where it does not have to be read twice.
Disadvantages: a user who wants to know when it works again has to hunt for the
badge, and the time is the single most useful fact in the message. I do not
recommend discarding it.

Decision required: A / B / C
