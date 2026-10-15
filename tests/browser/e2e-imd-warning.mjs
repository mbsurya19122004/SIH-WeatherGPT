/**
 * End-to-end IMD warning test.
 *
 * This is the feature the project is pitched on, and it previously failed
 * SILENTLY: a GPS fix never received a country, so isInIndia was always false
 * and no warning was ever fetched — with no error, because skipping is the
 * designed safe default. A test that only asserted "no request for non-India"
 * would have passed straight through that bug.
 *
 * So this drives the real path with a fixture warning for a specific district
 * and asserts the bulletin RENDERS, with verbatim text and the right severity
 * colour, for both selection routes: GPS and manual search. Then it asserts
 * the non-India path makes no request and shows the neutral state.
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

/**
 * Fixture: one severe (orange) warning for Ernakulam district, Kochi.
 * The text is deliberately distinctive so a verbatim match is meaningful
 * rather than matching any substring.
 */
const VERBATIM = 'Heavy rainfall likely to continue over Ernakulam district until 17 July, with isolated very heavy rainfall over the hills.';
const WARNING = {
  id: 'fixture-wrn-001',
  district: 'Ernakulam',
  state: 'Kerala',
  severity: 'SEVERE',
  headline: 'Heavy Rainfall Warning',
  description: VERBATIM,
  issuedAt: '05:30 IST, 23 Sep',
  validUntil: '05:30 IST, 24 Sep',
  source: 'IMD',
};

const warningJson = { success: true, data: { alerts: [WARNING] } };

/** Serve the fixture for any IMD request, and record every request seen. */
async function stub(page, calls) {
  await page.route('**/*', (r) => {
    const u = r.request().url();
    if (/\/api\/alerts\//.test(u)) {
      calls.push(u);
      return r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(warningJson) });
    }
    if (/nominatim\.openstreetmap\.org/.test(u)) {
      // Coordinate-aware. My first version returned India for every point,
      // which made the Tokyo case resolve as India and fail for the wrong
      // reason: the test was measuring its own stub, not the India gate.
      const m = /lat=([-\d.]+)&lon=([-\d.]+)/.exec(u);
      const lat = m ? Number(m[1]) : 0;
      const lon = m ? Number(m[2]) : 0;
      const inIndia = lat > 6 && lat < 36 && lon > 68 && lon < 98;
      return r.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          inIndia
            ? {
                display_name: 'Kochi, Kerala, India',
                address: { city: 'Kochi', county: 'Ernakulam', state: 'Kerala', country: 'India' },
              }
            : {
                display_name: 'Chiyoda City, Tokyo, Japan',
                address: { city: 'Tokyo', county: 'Chiyoda', state: 'Tokyo', country: 'Japan' },
              },
        ),
      });
    }
    return r.continue();
  });
}

const readBulletin = (page) => page.evaluate(() => {
  // Read the inner tiered element, not the outer wrapper: `.bulletin-wrap` is
  // the always-present container and carries no tier class, so selecting it
  // made the severity assertion read `bulletin-wrap show` and fail on a
  // correctly rendered red warning.
  const root = document.querySelector('.bulletin');
  if (!root) return { found: false, text: null, classes: null, color: null };
  const cs = getComputedStyle(root);
  return {
    found: true,
    text: (root.innerText || '').trim(),
    classes: root.className,
    color: cs.color,
    background: cs.backgroundColor,
  };
});

const browser = await chromium.launch();

// ── 1 · GPS route: a fix inside the warned district must render it ─────
console.log('=== 1 · GPS fix inside the warned district renders the warning ===');
{
  // Kochi, Ernakulam district: 9.9312, 76.2673
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    geolocation: { latitude: 9.9312, longitude: 76.2673 },
    permissions: ['geolocation'],
  });
  const page = await ctx.newPage();
  const calls = [];
  await stub(page, calls);
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(5000);

  const loc = await page.evaluate(() => {
    const raw = localStorage.getItem('weathergpt.selectedLocation.v1');
    const s = raw ? JSON.parse(raw) : null;
    return { source: s?.source, country: s?.country, district: s?.district, name: s?.name };
  });
  check('GPS fix produced a location', loc.source === 'gps', `source=${loc.source}`);
  // The regression this test exists for.
  check('GPS fix resolved a country (the bug that silenced all warnings)',
    loc.country === 'India', `country=${loc.country}`);
  check('GPS fix resolved the district used for the bulletin',
    loc.district === 'Ernakulam', `district=${loc.district}`);
  check('an IMD request WAS made for an Indian GPS fix',
    calls.length > 0, `${calls.length} call(s)`);

  const b = await readBulletin(page);
  check('a warning bulletin element rendered', b.found, b.classes || 'not found');
  check('the warning text appears VERBATIM', (b.text || '').includes(VERBATIM),
    (b.text || '').slice(0, 70));
  // The bulletin credits the full name, not the acronym. My first version
  // asserted /IMD/i and failed on perfectly correct copy.
  check('the bulletin is attributed to the India Meteorological Department',
    /India Meteorological Department/i.test(b.text || ''),
    (b.text || '').slice(-70));
  check('the district is named on the bulletin', /Ernakulam/i.test(b.text || ''));
  check('a SEVERE warning renders in the red tier', /tier-red/.test(b.classes || ''),
    b.classes);
  check('a SEVERE warning is not styled as the low/neutral tier',
    !/tier-none/.test(b.classes || ''), b.classes);
  await ctx.close();
}

// ── 2 · manual route: searching the same district also renders it ─────
console.log('\n=== 2 · manual selection inside the same district also renders it ===');
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const calls = [];
  await stub(page, calls);
  // Stub the city search so "Kochi" resolves to Kerala, not Japan.
  await page.route('**/geocoding-api.open-meteo.com/**', (r) => {
    const u = r.request().url();
    if (/name=Kochi(?!.*(?:Japan|Kerala))/.test(decodeURIComponent(u))) {
      return r.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{
            name: 'Kochi', latitude: 9.9312, longitude: 76.2673,
            country: 'India', admin1: 'Kerala',
          }],
        }),
      });
    }
    return r.continue();
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(2000);

  // Navigate to the report view, which owns the city search. At 1440px the
  // drawer is display:none, so this must go through the rail. (My first
  // version used the drawer unconditionally and timed out.)
  await page.locator('.rail button[aria-label="Weather Report"]').first().click().catch(async () => {
    await page.locator('.rail-toggle').first().click();
    await sleep(600);
    await page.locator('.drawer-nav-item', { hasText: /weather report/i }).first().click();
  });
  await sleep(1800);
  const input = page.locator('#report-city-input').first();
  await input.waitFor({ state: 'visible', timeout: 10000 });
  await input.fill('Kochi');
  await input.press('Enter');
  await sleep(5000);

  const loc = await page.evaluate(() => {
    const raw = localStorage.getItem('weathergpt.selectedLocation.v1');
    const s = raw ? JSON.parse(raw) : null;
    return { source: s?.source, country: s?.country, name: s?.name };
  });
  check('manual search produced a location', !!loc.source, `source=${loc.source}`);
  check('manual selection is not a stale "restored" state',
    loc.source === 'search', `source=${loc.source}`);
  check('an IMD request WAS made for the manually selected Indian city',
    calls.length > 0, `${calls.length} call(s)`);

  const b = await readBulletin(page);
  check('the warning bulletin rendered on the manual route',
    (b.text || '').includes(VERBATIM), (b.text || '').slice(0, 90));
  await ctx.close();
}

// ── 3 · outside India: no request, neutral no-coverage state ─────────
console.log('\n=== 3 · outside India: no IMD request, neutral no-coverage state ===');
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    geolocation: { latitude: 35.68, longitude: 139.69 }, // Tokyo
    permissions: ['geolocation'],
  });
  const page = await ctx.newPage();
  const calls = [];
  await stub(page, calls);
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(5000);

  const loc = await page.evaluate(() => {
    const raw = localStorage.getItem('weathergpt.selectedLocation.v1');
    const s = raw ? JSON.parse(raw) : null;
    return { country: s?.country };
  });
  check('the non-Indian fix resolved a non-Indian country',
    loc.country === 'Japan', `country=${loc.country}`);
  check('NO IMD request was made for a non-Indian location',
    calls.length === 0, `${calls.length} call(s)`);

  const b = await readBulletin(page);
  const text = (b.text || '').toLowerCase();
  // The rendered copy is "No IMD warning coverage for this location". My first
  // regex looked for "no coverage" and missed it.
  check('a no-coverage state is shown instead of the warning',
    /no imd warning coverage|no coverage|outside imd|does not cover|unavailable/i.test(text),
    (b.text || '').slice(0, 100));
  check('the foreign warning text is NOT shown', !(b.text || '').includes(VERBATIM));
  // `tier-none` is the correct neutral styling. What must NOT happen is a
  // coloured tier, because green would assert IMD surveyed the place and
  // found nothing, which it never did.
  check('the no-coverage state uses the neutral tier',
    /tier-none/.test(b.classes || ''), b.classes);
  check('the no-coverage state is NOT styled as a real severity tier',
    !/tier-(green|yellow|orange|red)/.test(b.classes || ''), b.classes);
  await ctx.close();
}

await browser.close();
console.log(`\n===== ${pass} passed, ${fail} failed =====`);
process.exit(fail ? 1 : 0);
