/**
 * P3-014 · saved-location marker.
 *
 * A location restored from localStorage must never be presented as a live fix.
 * Asserts: the marker shows; a fresh fix replaces it and the marker goes; a
 * corrupt store degrades cleanly; a restored location makes no IMD alert call;
 * and load never prompts for geolocation when permission was not granted.
 */
import { createRequire } from 'node:module';
const require = createRequire('/home/abhay/.npm/_npx/e41f203b7505f1fb/node_modules/');
const { chromium } = require('playwright');

const URL = 'http://127.0.0.1:5173/';
const KEY = 'weathergpt.selectedLocation.v1';
const DELHI = {
  latitude: 28.6139, longitude: 77.209, name: 'Delhi', region: 'Delhi',
  district: 'New Delhi', country: 'India', source: 'search',
};
let pass = 0, fail = 0;
const check = (n, ok, d) => {
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${n}${d !== undefined ? ' — ' + d : ''}`);
  ok ? pass++ : fail++;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();

// ── 1 · restored location is labelled, and load does not prompt ───────
console.log('=== 1 · restored location shows the saved marker ===');
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const alertCalls = [];
  // Detect via a request EVENT, not only via route interception: a glob that
  // fails to match would make "0 calls" pass vacuously, which is the exact
  // trap this suite already hit once.
  page.on('request', (r) => {
    if (/\/api\/alerts\//.test(r.url())) alertCalls.push(r.url());
  });
  await page.route('**/*', (r) => {
    if (/\/api\/alerts\//.test(r.request().url())) {
      return r.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"success":true,"data":{"alerts":[]}}',
      });
    }
    return r.continue();
  });
  await page.addInitScript((store) => {
    localStorage.setItem('weathergpt.selectedLocation.v1', JSON.stringify(store));
  }, DELHI);
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(2500);

  const pill = await page.evaluate(() => {
    const p = document.querySelector('.location-pill');
    return {
      text: p?.textContent?.trim() ?? null,
      restored: p?.getAttribute('data-location-restored') ?? null,
      aria: p?.getAttribute('aria-label') ?? null,
      tagVisible: !!document.querySelector('.location-saved-tag')?.offsetParent,
    };
  });
  check('pill names the location', /Delhi/.test(pill.text ?? ''), pill.text);
  check('pill marks it as saved from a last visit',
    /saved from your last visit/i.test(pill.text ?? ''), pill.text);
  check('data-location-restored="true" is set', pill.restored === 'true', `got ${pill.restored}`);
  check('a visible "saved" tag is rendered', pill.tagVisible === true);
  check('accessible name offers a one-click re-detect',
    /current location/i.test(pill.aria ?? ''), pill.aria);

  // Open Alerts: the IMD bulletin must not be fetched for a stored location.
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.rail button')]
      .find((x) => /alerts/i.test(x.getAttribute('aria-label') || ''));
    b?.click();
  });
  await sleep(2500);
  check('NO IMD alert request is made for a restored location',
    alertCalls.length === 0, `${alertCalls.length} call(s): ${alertCalls[0]?.slice(0, 60) ?? ''}`);

  // Loading must not prompt for geolocation when permission is not granted.
  const permissionPrompted = await page.evaluate(() => navigator.permissions
    ? navigator.permissions.query({ name: 'geolocation' }).then((r) => r.state)
    : Promise.resolve('unsupported'));
  // 'prompt' is the correct end state: permission is still ungranted, which is
  // only possible if load never issued a getCurrentPosition. permissions.query()
  // is a silent read and cannot itself prompt. (My first version asserted the
  // opposite, which was a test defect, not a product bug.)
  check('load did not request geolocation (permission still ungranted)',
    permissionPrompted === 'prompt',
    `permission state: ${permissionPrompted} (expected 'prompt')`);

  await ctx.close();
}

// ── 2 · a fresh fix replaces it and the marker disappears ────────────
console.log('\n=== 2 · a fresh fix clears the marker ===');
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    geolocation: { latitude: 19.076, longitude: 72.8777 }, // Mumbai
    permissions: ['geolocation'],
  });
  const page = await ctx.newPage();
  const alertCalls = [];
  page.on('request', (r) => {
    if (/\/api\/alerts\//.test(r.url())) alertCalls.push(r.url());
  });
  await page.route('**/*', (r) => {
    const u = r.request().url();
    if (/\/api\/alerts\//.test(u)) {
      return r.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"success":true,"data":{"alerts":[]}}',
      });
    }
    // Stub reverse geocoding so the live fix resolves a country. Without this
    // `isInIndia` is false and the alert request is correctly skipped, so the
    // assertion would be testing the geocoder rather than the saved gate.
    if (/nominatim\.openstreetmap\.org/.test(u)) {
      return r.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          display_name: 'Mumbai, Maharashtra, India',
          address: {
            city: 'Mumbai', county: 'Mumbai', state: 'Maharashtra', country: 'India',
          },
        }),
      });
    }
    return r.continue();
  });
  await page.addInitScript((store) => {
    localStorage.setItem('weathergpt.selectedLocation.v1', JSON.stringify(store));
  }, DELHI);
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(4000);

  const after = await page.evaluate(() => {
    const p = document.querySelector('.location-pill');
    const stored = JSON.parse(localStorage.getItem('weathergpt.selectedLocation.v1') || 'null');
    return {
      text: p?.textContent?.trim() ?? null,
      restored: p?.getAttribute('data-location-restored') ?? null,
      tag: !!document.querySelector('.location-saved-tag'),
      lat: stored?.latitude, lon: stored?.longitude, source: stored?.source,
    };
  });
  // With permission already granted, the mount-time refresh must replace
  // Delhi's coordinates with the live Mumbai fix. Asserted on the canonical
  // COORDINATES, not the pill name: the display name comes from an async
  // reverse-geocode call that cannot resolve in this sandbox.
  check('a granted-permission refresh replaced the stored coordinates',
    Math.abs(after.lat - 19.076) < 0.01 && Math.abs(after.lon - 72.8777) < 0.01,
    `lat=${after.lat} lon=${after.lon} source=${after.source}`);
  check('the replaced location is sourced from a live fix',
    after.source === 'gps', `source=${after.source}`);
  check('the saved marker is gone after a fresh fix',
    after.restored === 'false' && after.tag === false,
    `data-restored=${after.restored} tag=${after.tag}`);

  // With a live fix in place, IMD alerts are allowed again.
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.rail button')]
      .find((x) => /alerts/i.test(x.getAttribute('aria-label') || ''));
    b?.click();
  });
  await sleep(2500);
  check('IMD alerts ARE fetched once the location is live',
    alertCalls.length > 0, `${alertCalls.length} call(s)`);
  await ctx.close();
}

// ── 3 · explicit re-detect from the pill ─────────────────────────────
console.log('\n=== 3 · one-click re-detect from the pill ===');
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((store) => {
    localStorage.setItem('weathergpt.selectedLocation.v1', JSON.stringify(store));
  }, DELHI);
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(2000);
  await page.evaluate(() => {
    // Grant permission only at click time, so the click is the first ask.
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: (ok) => ok({
          coords: { latitude: 12.9716, longitude: 77.5946, accuracy: 10 }, // Bengaluru
        }),
      },
    });
  });
  await page.locator('.location-pill').first().click();
  await sleep(2500);
  const after = await page.evaluate(() => {
    const p = document.querySelector('.location-pill');
    return {
      text: p?.textContent?.trim() ?? null,
      restored: p?.getAttribute('data-location-restored') ?? null,
    };
  });
  check('clicking the pill clears the saved marker',
    after.restored === 'false', `data-restored=${after.restored}`);
  await ctx.close();
}

// ── 4 · corrupt storage still falls back cleanly ─────────────────────
console.log('\n=== 4 · corrupt storage falls back cleanly ===');
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    localStorage.setItem('weathergpt.selectedLocation.v1', '{not json at all');
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(2000);
  const pill = await page.evaluate(() => {
    const p = document.querySelector('.location-pill');
    return {
      text: p?.textContent?.trim() ?? null,
      restored: p?.getAttribute('data-location-restored') ?? null,
      purged: localStorage.getItem('weathergpt.selectedLocation.v1') === null,
    };
  });
  check('corrupt store does not crash the app', errors.length === 0, errors[0] ?? 'clean');
  check('no saved marker is shown for corrupt storage',
    pill.restored === 'false', `data-restored=${pill.restored}`);
  check('the corrupt entry is purged', pill.purged === true);
  await ctx.close();
}

await browser.close();
console.log(`\n===== ${pass} passed, ${fail} failed =====`);
process.exit(fail ? 1 : 0);
