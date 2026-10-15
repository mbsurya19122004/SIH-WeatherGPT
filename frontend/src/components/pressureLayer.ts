/**
 * Synoptic pressure layer: isobar contours, a soft pressure-gradient wash,
 * and L/H system markers, all derived from the real MSLP field.
 *
 * Honesty rules this module follows:
 *  - Isobars are ONLY produced from cells that carry an actual pressure
 *    observation. GridPoint.pressure is NaN when the source had no reading,
 *    and those cells are dropped rather than filled in, so a contour is never
 *    drawn through invented data.
 *  - The observation grid is sparse (5x5). Contours are traced on a cell
 *    lattice at a fixed interval with linear interpolation along cell edges
 *    (marching squares). The result is a coarse, honest representation — it
 *    is not smoothed into detail the data cannot support.
 *  - L/H markers require a genuine interior extremum, not just the lowest
 *    cell in a corner.
 */
import type { GridPoint } from './mapData';

export interface Isobar {
  /** SVG path in map-container pixel space. */
  d: string;
  /** The contour's pressure value in hPa (e.g. 1004). */
  value: number;
  /** Label anchor points along the line, already in pixel space. */
  labelAt: Array<[number, number]>;
}

export interface PressureSystem {
  kind: 'L' | 'H';
  lat: number;
  lon: number;
  /** hPa at the extremum. */
  value: number;
}

export interface PressureLayer {
  isobars: Isobar[];
  systems: PressureSystem[];
  /** Observed MSLP range, or null when no cell reported pressure. */
  min: number | null;
  max: number | null;
}

/** Standard synoptic interval. */
const INTERVAL_HPA = 4;
/** A cell edge must be crossed with at least this much contrast to contour. */
const MIN_SPAN_FOR_SYSTEM = 6;

type Lattice = {
  /** rows = lat descending (north at row 0), cols = lon ascending. */
  rows: number;
  cols: number;
  /** pressure[row][col], NaN where unobserved. */
  p: (number | null)[][];
};

/** Build a rectangular lattice of real pressure observations. */
function buildLattice(points: GridPoint[]): Lattice | null {
  const lats = [...new Set(points.map((p) => p.lat))].sort((a, b) => b - a);
  const lons = [...new Set(points.map((p) => p.lon))].sort((a, b) => a - b);
  if (lats.length < 2 || lons.length < 2) return null;

  const p: (number | null)[][] = lats.map((la) =>
    lons.map((lo) => {
      const hit = points.find((q) => q.lat === la && q.lon === lo);
      const v = hit?.pressure;
      return typeof v === 'number' && Number.isFinite(v) ? v : null;
    }),
  );
  // Require the majority of cells to be real observations; otherwise the
  // field is too sparse to contour honestly.
  const total = p.length * p[0].length;
  const real = p.flat().filter((v) => v != null).length;
  if (total === 0 || real / total < 0.55) return null;

  return { rows: lats.length, cols: lons.length, p };
}

/**
 * Trace isobars over the lattice.
 *
 * Works in lattice space then projects each vertex to pixels, so the contour
 * geometry follows the real grid topology rather than screen-space artefacts.
 */
export function buildPressureLayer(
  points: GridPoint[],
  project: (lat: number, lon: number) => [number, number],
  lats: number[],
  lons: number[],
  overview: boolean,
): PressureLayer {
  const lat = lats.length ? lats : [...new Set(points.map((p) => p.lat))].sort((a, b) => b - a);
  const lon = lons.length ? lons : [...new Set(points.map((p) => p.lon))].sort((a, b) => a - b);
  const observed = points.map((p) => p.pressure).filter((v) => Number.isFinite(v));
  if (observed.length < 4) {
    return { isobars: [], systems: [], min: null, max: null };
  }
  const min = Math.min(...observed);
  const max = Math.max(...observed);

  const lat0 = buildLattice(points);
  if (!lat0) return { isobars: [], systems: [], min, max };

  // Overview draws fewer, coarser contours so the combined view stays calm.
  const interval = overview ? INTERVAL_HPA * 2 : INTERVAL_HPA;
  const levels: number[] = [];
  const first = Math.ceil(min / interval) * interval;
  for (let v = first; v <= max; v += interval) levels.push(v);

  const isobars: Isobar[] = [];
  for (const level of levels) {
    for (const seg of traceLevel(lat0, level)) {
      if (seg.length < 2) continue;
      // Project to pixels and simplify collinear runs.
      const px = seg.map(([r, c]) => {
        const la = lerpCoord(lat, r);
        const lo = lerpCoord(lon, c);
        return project(la, lo);
      });
      // A contour vertex that failed to resolve to real coordinates is
      // dropped rather than passed to the projection with undefined, which
      // would throw and be misreported as a data outage.
      if (px.some(([x, y]) => !Number.isFinite(x) || !Number.isFinite(y))) continue;
      // A contour fragment only a few pixels long is a single-cell crossing
      // that never developed into a real line. Drawing it produces a stray
      // tick on the map with nothing to connect it to.
      if (polyLength(px) < 14) continue;
      const d = toPath(px);
      if (!d) continue;
      isobars.push({
        d,
        value: level,
        // Only the long runs of a contour carry a label. A short fragment has
        // no room for legible text and labelling every stub would bury the
        // field under repeated numbers, so short fragments stay unlabelled.
        labelAt:
          polyLength(px) >= (overview ? 240 : 150)
            ? sampleLabels(px, overview ? 520 : 320)
            : [],
      });
    }
  }

  return { isobars, systems: findSystems(points), min, max };
}

/**
 * Resolve a FRACTIONAL lattice index to a coordinate.
 *
 * traceLevel emits fractional indices for edge crossings (c + t). Indexing
 * the coordinate array with those directly yields undefined, so the
 * bracketing real samples are interpolated instead.
 */
function lerpCoord(arr: number[], idx: number): number {
  const i0 = Math.floor(idx);
  const i1 = i0 + 1;
  const t = idx - i0;
  const a = arr[i0];
  const b = arr[i1];
  if (a === undefined) return b === undefined ? NaN : b;
  if (b === undefined) return a;
  return a + (b - a) * t;
}

/** Where the contour crosses an edge between two cells. */
function edgeCross(
  a: number | null,
  b: number | null,
  level: number,
): number | null {
  if (a == null || b == null) return null;
  // Exact hit on a corner: ambiguous, skip rather than guess.
  if (a === level && b === level) return null;
  if ((a < level && b < level) || (a > level && b > level)) return null;
  const t = (level - a) / (b - a);
  if (!Number.isFinite(t) || t < 0 || t > 1) return null;
  return t;
}

/** Trace all contour segments at one level (marching squares). */
function traceLevel(lat: Lattice, level: number): Array<Array<[number, number]>> {
  const segs: Array<Array<[number, number]>> = [];
  const { rows, cols, p } = lat;

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const a = p[r][c];
      const b = p[r][c + 1];
      const d = p[r + 1][c + 1];
      const e = p[r + 1][c];

      // Edge crossing fractions, null when the level does not cross.
      const top = edgeCross(a, b, level); // between (r,c)-(r,c+1)
      const right = edgeCross(b, d, level); // between (r,c+1)-(r+1,c+1)
      const bottom = edgeCross(d, e, level); // between (r+1,c+1)-(r+1,c)
      const left = edgeCross(e, a, level); // between (r+1,c)-(r,c)

      // Named vertices rather than a bare ordered list, so a saddle can be
      // paired explicitly instead of relying on list order.
      const v: Record<string, [number, number]> = {};
      if (top != null) v.top = [r, c + top];
      if (right != null) v.right = [r + 1 - right, c + 1];
      if (bottom != null) v.bottom = [r + 1, c + 1 - bottom];
      if (left != null) v.left = [r + 1 - left, c];
      const names = Object.keys(v);
      if (names.length < 2) continue;

      if (names.length === 2) {
        // Ordinary cell: one segment joining the two crossings.
        segs.push([v[names[0]], v[names[1]]]);
        continue;
      }

      // Saddle: four crossings. The asymptotic decider compares the level
      // with the cell's mean to pick which opposite edges connect. Walking
      // the crossings in a ring instead would emit duplicated vertices that
      // collapse the polyline to a single degenerate point.
      const mean = (a! + b! + d! + e!) / 4;
      const pairs =
        mean > level
          ? [['top', 'left'], ['right', 'bottom']]
          : [['top', 'right'], ['bottom', 'left']];
      for (const [x, y] of pairs) {
        if (v[x] && v[y]) segs.push([v[x], v[y]]);
      }
    }
  }
  return mergeSegments(segs);
}

/** Join segment endpoints that coincide into longer polylines. */
function mergeSegments(segs: Array<Array<[number, number]>>): Array<Array<[number, number]>> {
  const EPS = 1e-6;
  const eq = (a: [number, number], b: [number, number]) =>
    Math.abs(a[0] - b[0]) < EPS && Math.abs(a[1] - b[1]) < EPS;

  const out: Array<Array<[number, number]>> = [];
  const pool = segs.map((s) => s.slice());

  while (pool.length) {
    let cur = pool.pop()!;
    let grew = true;
    while (grew) {
      grew = false;
      for (let i = 0; i < pool.length; i++) {
        const s = pool[i];
        if (eq(cur[cur.length - 1], s[0])) {
          cur = cur.concat(s.slice(1));
        } else if (eq(cur[cur.length - 1], s[s.length - 1])) {
          cur = cur.concat(s.slice(0, -1).reverse());
        } else if (eq(cur[0], s[s.length - 1])) {
          cur = s.slice(0, -1).concat(cur);
        } else if (eq(cur[0], s[0])) {
          cur = s.slice(1).reverse().concat(cur);
        } else {
          continue;
        }
        pool.splice(i, 1);
        grew = true;
        break;
      }
    }
    out.push(cur);
  }
  return out;
}

/** Collapse collinear points and emit a path. */
function toPath(pts: Array<[number, number]>): string | null {
  if (pts.length < 2) return null;
  const simple = pts.filter((p, i) => {
    if (i === 0 || i === pts.length - 1) return true;
    const [px, py] = pts[i - 1];
    const [cx, cy] = p;
    const [nx, ny] = pts[i + 1];
    // Keep the point when the direction changes.
    return Math.abs((cx - px) * (ny - cy) - (cy - py) * (nx - cx)) > 1e-6;
  });
  // A polyline that simplifies down to a single point draws nothing at all;
  // emitting it would only produce a zero-area path in the DOM.
  if (simple.length < 2) return null;
  const a = simple[0];
  const b = simple[simple.length - 1];
  if (Math.abs(a[0] - b[0]) < 1e-6 && Math.abs(a[1] - b[1]) < 1e-6 && simple.length === 2) {
    return null;
  }
  return (
    'M ' +
    simple.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')
  );
}

/** Total pixel length of a polyline. */
function polyLength(pts: Array<[number, number]>): number {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  return total;
}

/** Evenly spaced label anchors along a pixel polyline. */
function sampleLabels(pts: Array<[number, number]>, spacing: number): Array<[number, number]> {
  if (pts.length < 2) return [];
  let total = 0;
  const segs: number[] = [];
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    segs.push(d);
    total += d;
  }
  // Too short to carry a label legibly.
  if (total < 60) return [];

  const out: Array<[number, number]> = [];
  const count = Math.max(1, Math.floor(total / spacing));
  for (let k = 1; k <= count; k++) {
    const want = (total * k) / (count + 1);
    let acc = 0;
    for (let i = 0; i < segs.length; i++) {
      if (acc + segs[i] >= want) {
        const t = segs[i] === 0 ? 0 : (want - acc) / segs[i];
        out.push([
          pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t,
          pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t,
        ]);
        break;
      }
      acc += segs[i];
    }
  }
  return out;
}

/**
 * Find genuine interior pressure extrema.
 *
 * A cell only counts as a system when it is a strict local min/max against
 * every one of its eight neighbours AND sits in the interior of the observed
 * box. An extremum on the boundary is a trend, not a closed system, and a 1 hPa
 * wobble between two samples is sampling noise, not a low. Both guards exist
 * because the observation grid is only 5x5: without them almost every cell
 * qualifies and the map fills up with L/H marks.
 */
function findSystems(points: GridPoint[]): PressureSystem[] {
  const obs = points.filter((p) => Number.isFinite(p.pressure));
  if (obs.length < 9) return [];
  const vals = obs.map((p) => p.pressure);
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
  const span = Math.max(...vals) - Math.min(...vals);
  if (span < MIN_SPAN_FOR_SYSTEM) return [];

  // Interior test: the cell must have a full ring of neighbours on every side,
  // so a closed contour could in principle surround it.
  const lats = [...new Set(obs.map((p) => p.lat))].sort((a, b) => b - a);
  const lons = [...new Set(obs.map((p) => p.lon))].sort((a, b) => a - b);
  const rOf = (v: number) => lats.findIndex((x) => Math.abs(x - v) < 1e-6);
  const cOf = (v: number) => lons.findIndex((x) => Math.abs(x - v) < 1e-6);

  const found: Array<PressureSystem & { score: number }> = [];
  for (const p of obs) {
    const r = rOf(p.lat);
    const c = cOf(p.lon);
    if (r <= 0 || r >= lats.length - 1 || c <= 0 || c >= lons.length - 1) continue;

    const neighbours = obs.filter((q) => {
      const dr = rOf(q.lat);
      const dc = cOf(q.lon);
      if (dr < 0 || dc < 0) return false;
      return Math.abs(dr - r) <= 1 && Math.abs(dc - c) <= 1 && (dr !== r || dc !== c);
    });
    if (neighbours.length < 8) continue;

    const isMin = neighbours.every((q) => q.pressure > p.pressure);
    const isMax = neighbours.every((q) => q.pressure < p.pressure);
    if (!isMin && !isMax) continue;

    // Prominence: how far the extremum stands from the field mean. At this
    // resolution the meaningful test is the departure from the field, NOT the
    // gap to the runner-up — a real high is often flat-topped over ~50 km, and
    // rejecting it for sitting 0.4 hPa above its neighbour would be measuring
    // sample spacing rather than meteorology. The closest-neighbour test is
    // kept only to discard an exact plateau, which is not a peak at all.
    const prominence = Math.abs(p.pressure - mean);
    const closest = Math.min(...neighbours.map((q) => Math.abs(q.pressure - p.pressure)));
    if (prominence < 2.0 || closest < 0.2) continue;

    found.push({
      kind: isMin ? 'L' : 'H',
      lat: p.lat,
      lon: p.lon,
      value: p.pressure,
      score: prominence,
    });
  }

  // Keep only the most significant few; beyond that the marks stop being
  // informative and start competing with the contours.
  return found
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ kind, lat, lon, value }) => ({ kind, lat, lon, value }));
}

/**
 * Pressure wash colour at a normalised pressure (0 = lowest, 1 = highest).
 * Stays inside the app's slate-teal family: deeper, more saturated toward low
 * pressure, pale and cool toward high. Never a warning colour.
 */
export function pressureWashColor(t: number): string {
  const k = Math.max(0, Math.min(1, t));
  // Low pressure (k=0) -> deep slate-teal; high (k=1) -> pale cool mist.
  const stops: Array<[number, number, number, number]> = [
    [0, 30, 84, 96],
    [0.5, 78, 138, 148],
    [1, 214, 232, 232],
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, r0, g0, b0] = stops[i];
    const [t1, r1, g1, b1] = stops[i + 1];
    if (k <= t1) {
      const f = (k - t0) / (t1 - t0 || 1);
      return `rgb(${Math.round(r0 + (r1 - r0) * f)}, ${Math.round(g0 + (g1 - g0) * f)}, ${Math.round(
        b0 + (b1 - b0) * f,
      )})`;
    }
  }
  return 'rgb(214,232,232)';
}
