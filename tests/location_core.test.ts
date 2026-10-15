/**
 * Zero-dependency unit tests for the canonical location core
 * (frontend/src/location/locationCore.ts).
 *
 * Run with the Node built-in test runner, no npm packages involved:
 *
 *     node --test tests/location_core.test.ts
 *
 * Covers the §no-location invariants at the pure-logic level:
 *   1. deep-link parsing — valid params, missing params, out-of-range values
 *      (and the historical "Number(null) → (0,0)" path being gone);
 *   2. sanitize — unknown source / invalid coords / partial patches rejected,
 *      "Selected point" label fill;
 *   3. no-location guard — null location ⇒ null identity key (no cache or
 *      effect can misfire), and no data can create a location from nothing;
 *   4. cache keying — coordinate-keyed so one place can never satisfy another.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  locationKeyOf,
  parseDeepLink,
  reportCacheKey,
  sanitize,
  SELECTED_POINT_LABEL,
} from '../frontend/src/location/locationCore.ts';

// ── 1. Deep-link parsing ──────────────────────────────────────────────

test('deep link: valid lat/lon/name yields a url-source location', () => {
  const loc = parseDeepLink('?lat=28.6139&lon=77.2090&name=Delhi');
  assert.ok(loc);
  assert.equal(loc.latitude, 28.6139);
  assert.equal(loc.longitude, 77.209);
  assert.equal(loc.name, 'Delhi');
  assert.equal(loc.source, 'url');
});

test('deep link: no name → generic "Selected point" label', () => {
  const loc = parseDeepLink('?lat=11.11&lon=22.22');
  assert.ok(loc);
  assert.equal(loc.name, SELECTED_POINT_LABEL);
});

test('deep link: missing params (plain "/" load) → null, never a fake (0,0)', () => {
  assert.equal(parseDeepLink(''), null);
  assert.equal(parseDeepLink('?lang=hi'), null);
  assert.equal(parseDeepLink('?lat=&lon='), null);
  assert.equal(parseDeepLink('?name=Delhi'), null); // name alone can't select
});

test('deep link: out-of-range or non-numeric coords → null', () => {
  assert.equal(parseDeepLink('?lat=95&lon=77'), null); // lat > 90
  assert.equal(parseDeepLink('?lat=-91&lon=77'), null); // lat < -90
  assert.equal(parseDeepLink('?lat=28.6&lon=200'), null); // lon > 180
  assert.equal(parseDeepLink('?lat=28.6&lon=-181'), null); // lon < -180
  assert.equal(parseDeepLink('?lat=abc&lon=def'), null); // NaN → range guard
  assert.equal(parseDeepLink('?lat=28.6&lon='), null); // blank lon
});

test('deep link: explicitly supplied 0,0 IS a valid deep link (real intent)', () => {
  // The old bug was Number(null) → 0 when params were absent. With params
  // actually present, (0,0) is a legitimate user-supplied coordinate.
  const loc = parseDeepLink('?lat=0&lon=0');
  assert.ok(loc);
  assert.equal(loc.latitude, 0);
  assert.equal(loc.longitude, 0);
});

// ── 2. sanitize — the guard that prevents invented locations ─────────

test('sanitize: rejects unknown sources (no "default"/"auto" leak)', () => {
  assert.equal(sanitize({ latitude: 1, longitude: 2, name: 'x', source: 'default' }), null);
  assert.equal(sanitize({ latitude: 1, longitude: 2, name: 'x', source: 'auto' }), null);
  assert.equal(sanitize({ latitude: 1, longitude: 2, name: 'x', source: 'history' }), null);
});

test('sanitize: rejects missing or out-of-range coordinates', () => {
  assert.equal(sanitize({ latitude: 10, source: 'gps' }), null); // no longitude
  assert.equal(sanitize({ longitude: 10, source: 'gps' }), null); // no latitude
  assert.equal(sanitize({ latitude: 91, longitude: 0, source: 'gps' }), null);
  assert.equal(sanitize({ latitude: 0, longitude: 181, source: 'gps' }), null);
  assert.equal(sanitize({ latitude: NaN, longitude: 0, source: 'gps' }), null);
  assert.equal(sanitize({ latitude: Infinity, longitude: 0, source: 'gps' }), null);
  assert.equal(sanitize(null), null);
  assert.equal(sanitize('28.6,77.2'), null); // string payload is not a location
});

test('sanitize: a partial name-only patch can never create a location', () => {
  assert.equal(sanitize({ name: 'Noida' }), null); // no coords at all
  assert.equal(sanitize({ name: 'Noida', latitude: 28.57, longitude: 77.32 }), null); // no source
});

test('sanitize: blank name → "Selected point"; valid names are trimmed', () => {
  const blank = sanitize({ latitude: 1, longitude: 2, name: '   ', source: 'map' });
  assert.equal(blank?.name, SELECTED_POINT_LABEL);
  const trimmed = sanitize({ latitude: 1, longitude: 2, name: '  Pune  ', source: 'search' });
  assert.equal(trimmed?.name, 'Pune');
});

test('sanitize: valid coords + real source pass through, region/country kept', () => {
  const loc = sanitize({
    latitude: 28.57,
    longitude: 77.32,
    name: 'Noida',
    region: 'Uttar Pradesh',
    country: 'India',
    source: 'search',
  });
  assert.deepEqual(loc, {
    latitude: 28.57,
    longitude: 77.32,
    name: 'Noida',
    region: 'Uttar Pradesh',
    // `district` was added to SelectedLocation for IMD warning bulletins and
    // is deliberately absent from this search result, but `sanitize` always
    // returns the key (as undefined) so the shape stays stable. deepEqual
    // distinguishes a missing key from an explicit undefined, so the
    // expectation has to list it.
    district: undefined,
    country: 'India',
    source: 'search',
  });
});

// ── 3. No-location guard: null identity, no cache misfire ────────────

test('locationKey: null location → null key (no cache/effect can fire)', () => {
  assert.equal(locationKeyOf(null), null);
});

test('locationKey: rounds to 4 decimals for a stable identity', () => {
  const loc = { latitude: 28.61389, longitude: 77.20901, name: 'Delhi', source: 'gps' as const };
  assert.equal(locationKeyOf(loc), '28.6139,77.2090');
});

// ── 4. Coordinate-keyed caches ───────────────────────────────────────

test('reportCacheKey: embeds coordinates so one place can never satisfy another', () => {
  assert.equal(
    reportCacheKey(28.6139, 77.2090),
    'weatherGPT_offline_forecast_28.61_77.21',
  );
  assert.notEqual(
    reportCacheKey(28.6139, 77.2090),
    reportCacheKey(28.57, 77.32), // Delhi ≠ Noida
  );
});