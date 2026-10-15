/**
 * P1-001 regression guard: the five map layer pills must all stay visible and
 * tappable at every viewport AFTER P3-012 raised .chip to a 44px touch target.
 * Taller chips change wrapping, so this must be re-run after any chip sizing
 * change.
 */
import { createRequire } from 'node:module';
const require = createRequire('/home/abhay/.npm/_npx/e41f203b7505f1fb/node_modules/');
const { chromium } = require('playwright');

const URL = 'http://127.0.0.1:5173/';
let pass = 0, fail = 0;
const check = (n, ok, d) => {
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d !== undefined ? ' — ' + d : ''}`);
  ok ? pass++ : fail++;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VIEWPORTS = [
  { name: 'iphone-se', width: 375, height: 667 },
  { name: 'iphone-14', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const browser = await chromium.launch();
console.log('=== P1-001 regression after P3-012 (chips now >=44px) ===');

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.width < 800,
    hasTouch: vp.width < 800,
  });
  const page = await ctx.newPage();
  // Seed a location first: the map toolbar (and therefore the pills) only
  // renders once a location exists. Without this the pill assertions pass
  // VACUOUSLY against an empty list, which is how the first run of this
  // harness reported 28/28 while actually testing nothing.
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('weathergpt.selectedLocation.v1', JSON.stringify({
      latitude: 28.6139, longitude: 77.209, name: 'Delhi', region: 'Delhi',
      district: 'New Delhi', country: 'India', source: 'search',
    }));
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(1500);

  // Open the Map view (the pills live there).
  const opened = await page.evaluate(() => {
    const railBtn = [...document.querySelectorAll('.rail button')]
      .find((b) => /map/i.test(b.getAttribute('aria-label') || ''));
    if (railBtn) { railBtn.click(); return 'rail'; }
    return 'drawer';
  });
  if (opened === 'drawer') {
    await page.locator('.rail-toggle').first().click().catch(() => {});
    await sleep(600);
    await page.locator('.drawer-nav-item', { hasText: /^map$/i }).first().click().catch(() => {});
  }
  await sleep(2200);

  const m = await page.evaluate(() => {
    const pills = [...document.querySelectorAll('.map-toolbar .map-layer-pill, .map-layer-pill')]
      .filter((e) => e.offsetParent !== null);
    const toolbar = document.querySelector('.map-toolbar');
    const zoom = document.querySelector('.leaflet-control-zoom, .map-zoom');
    const meta = document.querySelector('.map-meta');
    const rect = (e) => {
      if (!e) return null;
      const r = e.getBoundingClientRect();
      return { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), b: Math.round(r.bottom) };
    };
    const overlaps = (a, c) => a && c && a.l < c.r && c.l < a.r && a.t < c.b && c.t < a.b;
    return {
      pills: pills.map((p) => ({ label: (p.textContent || '').trim(), ...rect(p) })),
      toolbar: toolbar ? { ...rect(toolbar), wrap: getComputedStyle(toolbar).flexWrap } : null,
      zoom: rect(zoom), meta: rect(meta),
      anyOverlapsZoom: pills.some((p) => overlaps(p, rect(zoom))),
      anyOverlapsMeta: pills.some((p) => overlaps(p, rect(meta))),
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    };
  });

  console.log(`\n  --- ${vp.name} (${vp.width}x${vp.height}) ---`);
  const countOk = m.pills.length === 5;
  check(`${vp.name}: exactly 5 pills present`, countOk,
    m.pills.map((p) => p.label).join(', ') || 'NONE RENDERED');
  if (!countOk) {
    // Guard against vacuous passes: every remaining check below filters on the
    // pill list, so with zero pills they would all "pass" while testing
    // nothing. Report them as failures instead.
    check(`${vp.name}: (skipped) layout checks need pills to be present`, false,
      'blocked: no pills rendered');
    await ctx.close();
    continue;
  }
  check(`${vp.name}: no horizontal page overflow`, m.scrollW <= m.clientW + 1,
    `scrollW=${m.scrollW} clientW=${m.clientW}`);
  const off = m.pills.filter((p) => p.l < 0 || p.r > m.clientW);
  check(`${vp.name}: all pills inside the viewport`, off.length === 0,
    off.map((p) => `${p.label}(${p.l}-${p.r})`).join(', ') || 'all inside');
  // P3-012's 44px floor is deliberately scoped to touch viewports
  // (@media max-width: 720px). A mouse-driven 1440px desktop keeps the
  // compact 33px pill, which is the intended design, not a regression.
  const isTouchViewport = vp.width <= 720;
  const small = m.pills.filter((p) => (p.b - p.t) < 44);
  if (isTouchViewport) {
    check(`${vp.name}: every pill is >=44px tall on this touch viewport`, small.length === 0,
      small.map((p) => `${p.label}:${p.b - p.t}px`).join(', ') || 'all >=44px');
  } else {
    check(`${vp.name}: pills stay compact (touch floor not applied off-touch)`, small.length === 5,
      `heights: ${[...new Set(m.pills.map((p) => p.b - p.t))].join(',')}px`);
  }
  check(`${vp.name}: no pill overlaps the zoom control`, m.anyOverlapsZoom === false);
  check(`${vp.name}: no pill overlaps the coordinate readout`, m.anyOverlapsMeta === false);
  const rows = new Set(m.pills.map((p) => p.t)).size;
  console.log(`         rows=${rows} wrap=${m.toolbar?.wrap ?? '?'} pills=${m.pills.map((p) => `${p.label}:${p.l}-${p.r}`).join(' ')}`);

  // Every pill must actually be clickable and switch the active layer.
  const clickable = await page.evaluate(async () => {
    const pills = [...document.querySelectorAll('.map-layer-pill')].filter((e) => e.offsetParent !== null);
    const results = [];
    for (const p of pills) {
      const label = (p.textContent || '').trim();
      const r = p.getBoundingClientRect();
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      const hit = p.contains(top) || top === p;
      p.click();
      await new Promise((res) => setTimeout(res, 700));
      const active = p.className.includes('active') || p.getAttribute('aria-pressed') === 'true'
        || p.getAttribute('aria-selected') === 'true';
      results.push({ label, hit, active });
    }
    return results;
  });
  const notHit = clickable.filter((c) => !c.hit);
  check(`${vp.name}: every pill is hit-testable at its centre`, notHit.length === 0,
    notHit.map((c) => c.label).join(', ') || 'all hittable');
  const notActive = clickable.filter((c) => !c.active);
  check(`${vp.name}: every pill activates on click`, notActive.length === 0,
    notActive.map((c) => c.label).join(', ') || 'all activated');

  await ctx.close();
}

await browser.close();
console.log(`\n===== ${pass} passed, ${fail} failed =====`);
process.exit(fail ? 1 : 0);
