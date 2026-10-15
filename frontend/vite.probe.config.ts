import { defineConfig } from "vite";

/**
 * Minimal SSR config used only by the Step 0 safety test, to build
 * `probe-env.ts` into a runnable node script that resolves the real
 * `src/config/api.ts` under a given set of VITE_* variables.
 */
export default defineConfig({
  build: {
    ssr: "probe-env.ts",
    outDir: "probe-dist",
    emptyOutDir: true,
    minify: false,
  },
});
