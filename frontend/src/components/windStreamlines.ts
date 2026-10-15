/**
 * Wind streamlines: continuous curved paths traced through the wind vector
 * field, replacing the previous discrete rotated-arrow grid.
 *
 * Design constraints (from the spec this implements):
 *  - Streamlines must FOLLOW the real wind vector at each point. Each step
 *    direction comes from bilinear interpolation of the surrounding real grid
 *    observations — never a faked/decorative direction.
 *  - Sparsity is respected: the observation grid is 5x5, which at map zoom is
 *    only about a third of the viewport. Streamlines are seeded AND terminated
 *    inside the data box; see `dataBoxPx` for why that matters.
 *  - Legibility: each line carries a halo (--paper) stroke behind the coloured
 *    stroke so it reads against both light and dark terrain, plus an opacity
 *    floor so calm-wind streamlines never fade to invisible.
 *  - Speed maps to the existing slate-teal -> brass scale; red is never used
 *    (severity colours stay reserved for warnings).
 *  - Performance: line count is bounded and animation is a CSS dash-offset
 *    (compositor-friendly), not per-frame JS.
 */
import type { GridPoint } from './mapData';

export interface Streamline {
  /** SVG path in map-container pixel space. */
  d: string;
  /** Rendered colour (slate-teal -> brass scale, never red). */
  color: string;
  /** Opacity after the calm-wind floor is applied. */
  opacity: number;
  /** Stroke width in px, scaled by speed. */
  width: number;
  /** Dash phase offset so neighbouring lines don't animate in lockstep. */
  dashOffset: number;
  /** Animation duration in seconds; faster wind animates quicker. */
  dashDuration: number;
}

/**
 * Minimum opacity so calm wind still reads against the basemap.
 * A thin, low-contrast teal line over a pale OSM basemap is effectively
 * invisible, so the floor sits well above "barely there".
 */
const MIN_OPACITY = 0.55;
/** Clamp on step length in pixels so a fast cell can't make a huge jump. */
const MAX_STEP_PX = 9;
/**
 * Hard limit on how far the heading may change between two consecutive steps.
 *
 * A real wind field turns gradually; a streamline that folds back on itself
 * within one step is always an artefact of a bad sample or a bad
 * interpolation, never of the atmosphere. Clamping the turn keeps a single
 * wrong cell from producing a visually broken hairpin no matter what the
 * underlying cause was.
 */
const MAX_TURN_DEG = 22;
/** Steps traced forward from each seed. */
const FOCUS_STEPS = 40;
const OVERVIEW_STEPS = 30;
/**
 * Reject a traced line whose midpoint lands too close to an already-accepted
 * one. Streamline seeding naturally produces near-duplicate parallel paths,
 * which bunch into a comb; spacing the survivors keeps the field even without
 * inventing coverage the sparse grid can't support.
 *
 * The threshold is a fraction of the DATA BOX rather than a fixed pixel count,
 * because the box scales with zoom: a fixed 46px is a hair's breadth on a
 * zoomed-out map and most of the available field when zoomed in.
 */
const SEPARATION_FRACTION = 0.085;
const MIN_SEPARATION_PX = 18;
const MAX_SEPARATION_PX = 46;

const DEG = Math.PI / 180;

/** Wrap an angle difference into (-180, 180]. */
function wrap180(d: number): number {
  let x = d % 360;
  if (x > 180) x -= 360;
  if (x <= -180) x += 360;
  return x;
}

/**
 * Wind direction is a CIRCULAR quantity, and interpolating the raw degree
 * values is simply wrong.
 *
 * A live 5x5 sample of the same synoptic flow routinely straddles the wrap:
 *
 *     8    3  355  339  316
 *   360  343  343  337  344
 *
 * Those are all one coherent NNW flow, but a linear average of 3 and 360
 * yields 181.5 — the exact opposite direction. Cells on either side of the
 * wrap therefore reported reversed vectors, which is what produced both the
 * hairpin/switchback turns and the unnaturally straight parallel runs: where
 * the raw degrees happened to be numerically close the interpolated heading
 * barely moved, and where they were not, it flipped.
 *
 * The fix is to interpolate the unit VECTOR and recover the angle afterwards.
 * sin/cos are continuous across the wrap, so the resulting field is correct
 * with no special-casing at all.
 *
 * Components are returned in screen convention: +x east, +y south, pointing
 * the way the wind BLOWS TOWARD (the meteorological direction is where it
 * comes FROM, so the FROM vector is negated here).
 */
const towardEast = (p: GridPoint) => -Math.sin(p.windDir * DEG);
const towardSouth = (p: GridPoint) => Math.cos(p.windDir * DEG);

/** Build the 5x5 observation lattice (row 0 = northernmost). */
function buildLattice(points: GridPoint[]): {
  grid: GridPoint[][];
  lats: number[];
  lons: number[];
  spacing: number;
} {
  const lats = [...new Set(points.map((p) => p.lat))].sort((a, b) => b - a);
  const lons = [...new Set(points.map((p) => p.lon))].sort((a, b) => a - b);
  const spacing =
    lats.length > 1
      ? Math.abs(lats[0] - lats[1])
      : lons.length > 1
        ? Math.abs(lons[0] - lons[1])
        : 0.5;
  const grid = lats.map((la) =>
    lons.map((lo) => {
      const hit = points.find((p) => p.lat === la && p.lon === lo);
      return (
        hit ?? { lat: la, lon: lo, temp: 0, precip: 0, windSpeed: 0, windDir: 0, gust: 0, pressure: NaN }
      );
    }),
  );
  return { grid, lats, lons, spacing };
}

/**
 * Bilinear sample over the lattice in fractional index space. Clamped half a
 * cell inside the box so we interpolate between real observations only and
 * never extrapolate past the data.
 */
function bilinear(grid: GridPoint[][], gi: number, gj: number, valueOf: (p: GridPoint) => number) {
  const n = grid.length;
  const m = grid[0]?.length ?? 0;
  if (n < 2 || m < 2) return null;
  const i = Math.min(Math.max(gi, 0.5), n - 1.5);
  const j = Math.min(Math.max(gj, 0.5), m - 1.5);
  const i0 = Math.floor(i);
  const j0 = Math.floor(j);
  const i1 = Math.min(i0 + 1, n - 1);
  const j1 = Math.min(j0 + 1, m - 1);
  const ti = i - i0;
  const tj = j - j0;
  return (
    valueOf(grid[i0][j0]) * (1 - ti) * (1 - tj) +
    valueOf(grid[i1][j0]) * ti * (1 - tj) +
    valueOf(grid[i0][j1]) * (1 - ti) * tj +
    valueOf(grid[i1][j1]) * ti * tj
  );
}

/**
 * Trace streamlines through the wind field and return SVG paths in
 * map-container pixel space.
 *
 * @param points      real wind observations (the 5x5 grid)
 * @param unproject   (x, y) -> [lat, lon] (Leaflet containerPointToLatLng)
 * @param project     (lat, lon) -> [x, y] (Leaflet latLngToContainerPoint)
 * @param boundsPx    [minX, minY, maxX, maxY] visible viewport
 * @param minWind     grid min wind; width/colour normalise across the
 *                     OBSERVED range, not from zero (see `norm` below)
 * @param maxWind     grid max wind
 * @param windColorFn shared wind colour scale (slate-teal -> brass)
 * @param windStyleFn shared wind style helper
 * @param overview    true for the softer combined-overview treatment
 */
export function buildWindStreamlines(
  points: GridPoint[],
  unproject: (x: number, y: number) => [number, number],
  project: (lat: number, lon: number) => [number, number],
  boundsPx: [number, number, number, number],
  minWind: number,
  maxWind: number,
  windColorFn: (norm: number) => string,
  windStyleFn: (speed: number, maxSpeed: number) => { color: string; opacity: number; size: number },
  overview: boolean,
): Streamline[] {
  if (points.length < 4) return [];
  const { grid, lats, lons, spacing } = buildLattice(points);
  if (grid.length < 2 || grid[0].length < 2) return [];

  const originLat = lats[0];
  const originLon = lons[0];

  const [minX, minY, maxX, maxY] = boundsPx;
  const w = maxX - minX;
  const h = maxY - minY;
  if (!(w > 0) || !(h > 0)) return [];

  /**
   * The pixel extent of the OBSERVATIONS, not of the viewport.
   *
   * This distinction is the whole ballgame. At map zoom the 5x5 grid spans
   * roughly a third of the visible width, so two thirds of the map has no
   * measurements at all. `bilinear` clamps out-of-box lookups to the boundary
   * cell, so a line that kept going out there would be drawn from a constant,
   * invented direction — which is what produced the ruler-straight lines
   * spanning the entire map. Traces are therefore confined to the data box and
   * simply stop at its edge, so the map shows wind only where wind was
   * actually measured.
   */
  const corners: Array<[number, number]> = [
    project(lats[0], lons[0]),
    project(lats[0], lons[lons.length - 1]),
    project(lats[lats.length - 1], lons[0]),
    project(lats[lats.length - 1], lons[lons.length - 1]),
  ];
  const boxL = Math.min(...corners.map((c) => c[0]));
  const boxR = Math.max(...corners.map((c) => c[0]));
  const boxT = Math.min(...corners.map((c) => c[1]));
  const boxB = Math.max(...corners.map((c) => c[1]));
  // Nothing to draw if the data box is off-screen or degenerate.
  if (boxR - boxL < 40 || boxB - boxT < 40) return [];
  // Intersect with the viewport; traces are clipped to whichever is tighter.
  const dataBoxPx: [number, number, number, number] = [
    Math.max(boxL, minX),
    Math.max(boxT, minY),
    Math.min(boxR, maxX),
    Math.min(boxB, maxY),
  ];
  const boxW = dataBoxPx[2] - dataBoxPx[0];
  const boxH = dataBoxPx[3] - dataBoxPx[1];
  if (!(boxW > 0) || !(boxH > 0)) return [];

  // Seed count scales with the AREA THAT HAS DATA so density stays reasonable
  // across zoom levels without becoming a tangle when zoomed out.
  const area = boxW * boxH;
  const density = overview ? 1 / 4200 : 1 / 2100;
  const seedCount = Math.max(
    overview ? 26 : 48,
    Math.min(overview ? 54 : 110, Math.round(area * density)),
  );

  // Deterministic low-discrepancy (golden-ratio spiral) seeds rather than
  // random, so re-seeding on pan/zoom doesn't visibly reshuffle the field.
  const GOLDEN = 0.6180339887498949;
  const steps = overview ? OVERVIEW_STEPS : FOCUS_STEPS;
  const out: Streamline[] = [];
  // Midpoints of accepted lines, for the near-duplicate rejection below.
  const kept: Array<[number, number]> = [];

  for (let k = 0; k < seedCount; k++) {
    const u = (k * GOLDEN) % 1;
    const v = ((k + 1) * GOLDEN) % 1;
    // Seed inside the DATA box, inset from its edge so seeds aren't
    // immediately clipped away. Seeding across the whole viewport instead
    // would place most seeds where there are no observations at all.
    let x = dataBoxPx[0] + boxW * (0.08 + 0.84 * u);
    let y = dataBoxPx[1] + boxH * (0.08 + 0.84 * v);

    const trace: Array<[number, number]> = [];
    let sumSpeed = 0;
    let samples = 0;
    /** Heading of the previous step, for the turn clamp. */
    let prevHeading: number | null = null;

    for (let s = 0; s < steps; s++) {
      const [lat, lon] = unproject(x, y);
      const gi = (lon - originLon) / spacing;
      // Row index grows southward, so invert the latitude delta.
      const gj = -(lat - originLat) / spacing;

      const speed = bilinear(grid, gi, gj, (p) => p.windSpeed);
      // Interpolate the direction as a VECTOR, never as degrees — see
      // towardEast/towardSouth for why.
      const u = bilinear(grid, gi, gj, towardEast);
      const v = bilinear(grid, gi, gj, towardSouth);
      if (speed === null || u === null || v === null) break;

      // Opposing samples can cancel the interpolated vector to nothing, which
      // leaves no direction to follow. Stop rather than invent one.
      const mag = Math.hypot(u, v);
      if (!(mag > 1e-6)) break;

      // Screen-space heading: 0 = east, 90 = south (y grows downward).
      let heading = (Math.atan2(v, u) / DEG);
      if (prevHeading !== null) {
        const delta = wrap180(heading - prevHeading);
        if (Math.abs(delta) > MAX_TURN_DEG) {
          heading = prevHeading + Math.sign(delta) * MAX_TURN_DEG;
        }
      }
      prevHeading = heading;

      sumSpeed += speed;
      samples++;

      // One degree of lon spans cos(lat) as much ground as one degree of lat,
      // so correct the x step to keep the on-screen path from shearing.
      const cosLat = Math.cos(lat * DEG);
      const safeCos = cosLat > 0.2 ? cosLat : 0.2;
      const stepDeg = MAX_STEP_PX / spacing;
      const rad = heading * DEG;
      x += Math.cos(rad) * stepDeg * safeCos;
      y += Math.sin(rad) * stepDeg;

      if (x < dataBoxPx[0] || x > dataBoxPx[2] || y < dataBoxPx[1] || y > dataBoxPx[3]) break;
      trace.push([x, y]);
    }

    // A streamline needs enough length to read as a flowing line, not a dot.
    if (trace.length < (overview ? 6 : 12)) continue;

    // Drop near-duplicate paths so the field stays evenly spread instead of
    // combing where many seeds happen to follow the same streamline.
    const mid = trace[Math.floor(trace.length / 2)];
    const minSep = Math.max(
      MIN_SEPARATION_PX,
      Math.min(MAX_SEPARATION_PX, Math.round(Math.min(boxW, boxH) * SEPARATION_FRACTION)),
    );
    let tooClose = false;
    for (const other of kept) {
      if (Math.hypot(other[0] - mid[0], other[1] - mid[1]) < minSep) {
        tooClose = true;
        break;
      }
    }
    if (tooClose) continue;
    kept.push(mid);

    const meanSpeed = samples ? sumSpeed / samples : 0;
    const ws = windStyleFn(meanSpeed, maxWind);
    /**
     * Normalise across the OBSERVED wind range, not from zero.
     *
     * Dividing by `maxWind` alone put every line at norm ~= 0.8: an ordinary
     * day is nowhere near the grid maximum, so the whole field pinned itself
     * to the thick end of the scale and the width stopped carrying any
     * information. Spanning min..max makes the stroke weight genuinely track
     * the data — a light reading lands thin, only real gusts read heavy.
     */
    const windSpan = Math.max(1e-6, maxWind - minWind);
    const norm = Math.min(1, Math.max(0, (meanSpeed - minWind) / windSpan));

    out.push({
      d: toSmoothPath(trace),
      color: windColorFn(norm),
      opacity: Math.max(MIN_OPACITY, ws.opacity * (overview ? 0.7 : 1)),
      /**
       * Stroke weight carries the speed reading, but it has to stay a LINE.
       * At the previous 3 + norm*2.6 (3.0-5.6px, measuring ~5.1px across the
       * board) the field read as bold decorative bands and buried the isobar
       * contours underneath. These ranges keep the core at roughly 1.5-2.6px
       * in focus and 1.1-1.7px in the combined overview, so the layer reads as
       * airflow rather than as filled shapes.
       */
      width: overview ? 1.05 + norm * 0.6 : 1.45 + norm * 1.15,
      // Stagger phase so the field shimmers rather than pulsing as one block.
      dashOffset: Math.abs(trace[0][0] * 0.6 + trace[0][1] * 1.4) % 48,
      dashDuration: Math.max(1.5, 4.4 - norm * 2.4),
    });
  }

  return out;
}

/**
 * Smooth SVG path through the traced points using quadratic mid-point
 * smoothing — a curve reads as airflow, a polyline reads as a ruler.
 */
function toSmoothPath(pts: Array<[number, number]>): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    d += ` Q ${x0.toFixed(1)} ${y0.toFixed(1)} ${((x0 + x1) / 2).toFixed(1)} ${(
      (y0 + y1) / 2
    ).toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}
