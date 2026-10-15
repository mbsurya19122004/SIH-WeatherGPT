/**
 * Probe entry: imports the REAL config/api.ts and writes the resolved base URLs
 * to a file so a test can assert on effective behaviour rather than on whether
 * a string happens to be embedded in the bundle.
 */
import { JAVA_API_BASE, ML_API_BASE, USING_PRODUCTION_API } from "./src/config/api";
import { writeFileSync } from "node:fs";

writeFileSync(
  process.env.PROBE_OUT || "/tmp/opencode/probe-out.json",
  JSON.stringify({ JAVA_API_BASE, ML_API_BASE, USING_PRODUCTION_API }, null, 2),
);
