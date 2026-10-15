import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

/**
 * Lint gate for the WeatherGPT frontend.
 *
 * Kept deliberately narrow: correctness rules that catch real defects, not a
 * style opinion. Anything that would flood the first run with hundreds of
 * cosmetic violations is left out so the gate stays useful.
 */
export default tseslint.config(
  { ignores: ["dist/**", "probe-dist/**", "node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Live, but as a warning: a genuine correctness signal worth seeing,
      // without blocking on the stale-disable cleanup.
      "react-hooks/exhaustive-deps": "warn",

      // 60 pre-existing occurrences across the codebase. Making this "error"
      // on day one would leave the gate permanently red and therefore ignored,
      // which is worse than having no gate. It stays visible as a warning with
      // a known count so the debt is tracked rather than hidden; removing it
      // properly is its own task.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Tests and config files are plain node scripts.
    files: ["**/*.test.ts"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
);
