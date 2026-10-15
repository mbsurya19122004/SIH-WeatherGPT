#!/usr/bin/env bash
# Step 0 safety gate: prove the Java API base cannot silently reach production.
#
# Asserts on EFFECTIVE behaviour: a probe imports the real src/config/api.ts
# and reports which base URL it resolved to. String presence in a bundle is not
# a valid assertion here, because Vite statically inlines the env value even
# when the runtime guard goes on to refuse it.
set -u
FRONTEND="$(cd "$(dirname "$0")/../frontend" && pwd)"
PROD="sih-weathergpt-production.up.railway.app"
pass=0; fail=0

probe() { # label expected_java_base [env assignments...]
  local label="$1" want="$2"; shift 2
  local out="/tmp/opencode/probe/$RANDOM$RANDOM"
  rm -rf "$out"; mkdir -p "$out"
  if ! (cd "$FRONTEND" && env PROBE_OUT="$out/result.json" "$@" \
        npx vite build --config vite.probe.config.ts \
        --outDir "$out/dist" --emptyOutDir >"$out/build.log" 2>&1); then
    printf '  [FAIL] %s (build failed)\n' "$label"
    tail -4 "$out/build.log" | sed 's/^/         /'
    fail=$((fail+1)); return
  fi
  # vite ssr build emits a runnable node entry; run it to resolve the config.
  if ! (cd "$FRONTEND" && env PROBE_OUT="$out/result.json" \
        node "$out/dist/probe-env.js" >/dev/null 2>&1); then
    printf '  [FAIL] %s (probe did not run)\n' "$label"
    tail -4 "$out/build.log" | sed 's/^/         /'
    fail=$((fail+1)); return
  fi
  local got
  got=$(node -e "try{console.log(require('$out/result.json').JAVA_API_BASE)}catch(e){console.log('(no output)')}")
  if [ "$got" = "$want" ]; then
    printf '  [PASS] %s\n         -> %s\n' "$label" "$got"
    pass=$((pass+1))
  else
    printf '  [FAIL] %s\n         wanted %s\n         got    %s\n' "$label" "$want" "$got"
    fail=$((fail+1))
  fi
}

echo "=== Step 0: production-write safety gate (effective base URL) ==="
probe "no env at all            -> localhost" "http://localhost:8080"
probe "explicit localhost        -> honoured" "http://localhost:8080" VITE_JAVA_API_BASE=http://localhost:8080
probe "127.0.0.1 counts as local -> honoured" "http://127.0.0.1:8080" VITE_JAVA_API_BASE=http://127.0.0.1:8080
probe "prod host, NO opt-in      -> REFUSED"  "http://localhost:8080" VITE_JAVA_API_BASE=https://$PROD
probe "prod host + opt-in        -> allowed"  "https://$PROD"        VITE_JAVA_API_BASE=https://$PROD VITE_USE_PRODUCTION_API=true
probe "opt-in=false is not opt-in-> REFUSED"  "http://localhost:8080" VITE_JAVA_API_BASE=https://$PROD VITE_USE_PRODUCTION_API=false
probe "trailing slash normalised -> honoured" "http://localhost:8080" VITE_JAVA_API_BASE=http://localhost:8080///

echo
echo "===== $pass passed, $fail failed ====="
[ "$fail" -eq 0 ]
