"""
M-007 · the map's location dot is a focusable, unlabelled button with no action.

Found only in a state-dependent sweep: the dot appears once a location is set, so
a route-by-route walk that starts with no location never sees it. It is
`role="button"` and `tabindex="0"`, 12x12, with no accessible name — a keyboard
or screen-reader user tabs onto a control that does nothing and announces as
just "button".

`interactive: false` already says the app does not want taps on it, so the
correct fix is to remove the false button semantics rather than to label a
control that has no action. Checked in the rendered DOM, not the source, because
Leaflet injects role and tabindex itself and a source reading would miss them.
"""
import os
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PASS, FAIL = [], []


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f" -- {detail}" if detail else ""))


PROBE = r'''
const { launch, BASE } = await import('%s/harness.mjs');
const { browser, page } = await launch('375x667');
await page.addInitScript(() => {
  window.__set = (el, v) => {
    const p = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement : window.HTMLInputElement;
    Object.getOwnPropertyDescriptor(p.prototype, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
});
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(3400);

async function nav(label) {
  await page.evaluate(() => document.querySelector('button.rail-toggle')?.click());
  await page.waitForTimeout(320);
  await page.evaluate((l) => {
    [...document.querySelectorAll('.drawer-nav-item')].find((x) => x.textContent.trim() === l)?.click();
  }, label);
  await page.waitForTimeout(3000);
}

// Set a real location first: the dot does not exist without one.
await nav('Weather Report');
await page.evaluate(() => window.__set(document.querySelector('#report-city-input'), 'Thrissur'));
await page.waitForTimeout(300);
await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => /get weather/i.test(b.textContent))?.click());
await page.waitForTimeout(6000);

const out = {};
for (const view of ['Map', 'Radar', 'Route Weather']) {
  await nav(view);
  await page.waitForTimeout(5000);
  out[view] = await page.evaluate(() => {
    const dots = [...document.querySelectorAll('.leaflet-marker-icon')].map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const name = el.getAttribute('aria-label') || el.getAttribute('title') ||
        el.getAttribute('alt') || el.textContent?.trim();
      return {
        role: el.getAttribute('role'),
        tabindex: el.getAttribute('tabindex'),
        name: name || '',
        w: Math.round(r.width), h: Math.round(r.height),
        focusable: el.tabIndex >= 0,
        cursor: cs.cursor,
        inner: el.innerHTML.slice(0, 90),
        hasPopup: !!el.getAttribute('aria-label')?.length,
      };
    });
    // Can a keyboard user actually reach the dot, and does it do anything?
    const first = document.querySelector('.leaflet-marker-icon');
    let activates = null;
    if (first) {
      first.focus();
      const focused = document.activeElement === first;
      const before = document.activeElement;
      first.click();
      activates = { focusable: focused, clickChangedFocus: document.activeElement !== before || true };
    }
    return { dots, activates };
  });
}
console.log('RESULT ' + JSON.stringify(out));
await browser.close();
''' % ("file://" + os.path.join(REPO, "..", "qa", "mobile")) if False else r'''
const { launch, BASE } = await import('HARNESS');
const { browser, page } = await launch('375x667');
await page.addInitScript(() => {
  window.__set = (el, v) => {
    const p = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement : window.HTMLInputElement;
    Object.getOwnPropertyDescriptor(p.prototype, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
});
await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(3400);
async function nav(label) {
  await page.evaluate(() => document.querySelector('button.rail-toggle')?.click());
  await page.waitForTimeout(320);
  await page.evaluate((l) => {
    [...document.querySelectorAll('.drawer-nav-item')].find((x) => x.textContent.trim() === l)?.click();
  }, label);
  await page.waitForTimeout(3000);
}
await nav('Weather Report');
await page.evaluate(() => window.__set(document.querySelector('#report-city-input'), 'Thrissur'));
await page.waitForTimeout(300);
await page.evaluate(() => [...document.querySelectorAll('button')].find((b) => /get weather/i.test(b.textContent))?.click());
await page.waitForTimeout(6000);
const out = {};
for (const view of ['Map', 'Radar', 'Route Weather']) {
  await nav(view);
  await page.waitForTimeout(5000);
  out[view] = await page.evaluate(() => {
    const dots = [...document.querySelectorAll('.leaflet-marker-icon')].map((el) => {
      const r = el.getBoundingClientRect();
      const name = el.getAttribute('aria-label') || el.getAttribute('title') ||
        el.getAttribute('alt') || el.textContent?.trim();
      return { role: el.getAttribute('role'), tabindex: el.getAttribute('tabindex'),
        name: name || '', w: Math.round(r.width), h: Math.round(r.height),
        focusable: el.tabIndex >= 0, inner: el.innerHTML.slice(0, 80) };
    });
    return { dots };
  });
}
console.log('RESULT ' + JSON.stringify(out));
await browser.close();
'''

probe_path = "/tmp/opencode/qa/mobile/_dot_probe.mjs"
harness_uri = "file:///tmp/opencode/qa/mobile/harness.mjs"
with open(probe_path, "w", encoding="utf-8") as fh:
    fh.write(PROBE.replace("HARNESS", harness_uri))

print("=" * 78)
print("M-007 · the map's location dot: focusable button, no name, no action")
print("=" * 78)

r = subprocess.run(["node", probe_path], capture_output=True, text=True, timeout=420,
                   cwd=os.path.join(REPO, ".."))
line = [l for l in (r.stdout or "").splitlines() if l.startswith("RESULT ")]
if not line:
    print("  probe produced no result")
    print((r.stdout or "")[-1500:])
    print((r.stderr or "")[-1500:])
    sys.exit(1)

import json
data = json.loads(line[0][len("RESULT "):])

for view, payload in data.items():
    dots = payload["dots"]
    print(f"\n  --- {view}: {len(dots)} marker(s) ---")
    for d in dots:
        print(f"    {d['w']}x{d['h']} role={d['role']!r} tabindex={d['tabindex']!r} "
              f"focusable={d['focusable']} name={d['name']!r}")
        print(f"      inner: {d['inner']}")

    for d in dots:
        # A control with no action must not advertise itself as one.
        if d["role"] == "button":
            check(f"{view}: the location dot is not announced as a button", False,
                  f'role={d["role"]} with no accessible name')
        else:
            check(f"{view}: the location dot is not announced as a button", True,
                  f'role={d["role"]!r}')
        if d["focusable"]:
            check(f"{view}: the location dot is not in the tab order", False,
                  f'tabindex={d["tabindex"]} but it has no action to take')
        else:
            check(f"{view}: the location dot is not in the tab order", True,
                  f'tabindex={d["tabindex"]}')

print()
print(f"RESULT: {len(PASS)} passed, {len(FAIL)} failed")
for f in FAIL:
    print(f"  FAILED: {f}")
print("=" * 78)
sys.exit(1 if FAIL else 0)
