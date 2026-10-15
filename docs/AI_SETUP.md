# AI development setup

Configured on 2026-09-17 for OpenCode server 2.0.3. Application code and application dependencies were not changed.

## Scope

- Global `~/.config/opencode/opencode.json`: Context7 public documentation MCP and local Serena MCP. Existing update policy preserved. No model or provider credentials changed.
- Repository `opencode.json`: `/spec`, `/context`, `/verify` prompts and generated-directory watcher exclusions.
- `AGENTS.md`: project working instructions. `docs/SRS.md`: draft requirements, not stakeholder approval. `docs/ARCHITECTURE.md`: implementation map and known gaps.
- `.serena/project.yml`: Java, TypeScript (including JavaScript), and Python language servers; source/cache/secret exclusions. Serena manages its LSPs; no unsupported native OpenCode LSP fields have been invented.
- `scripts/ai_context.py`: opt-in public documentation cache in `.cache/ai-context/`. Seven-day TTL, 2 MiB response limit, HTTPS allowlist, atomic cache records. This is not model prompt caching and does not intercept Context7 responses.

## Daily workflow

1. Start in the repository root; inspect `git status` before work.
2. `/spec <change>` maps the request to requirements and acceptance checks before editing.
3. `/context <topic>` locates relevant symbols and loads only needed reference material.
4. Implement a small change. Prefer Serena symbol navigation for cross-file questions when connected, ordinary reads/search for small tasks.
5. `/verify <component>` runs relevant existing checks and reports failures separately from skipped checks.

```sh
opencode mcp list
python3 scripts/ai_context.py list
python3 scripts/ai_context.py fetch opencode-v2-config
python3 scripts/ai_context.py show opencode-v2-config
python3 -m unittest discover -s tests -p 'test_ai_context.py' -v
```

`show` is offline-only and refuses stale content. Fetch only the pages needed; use `fetch NAME --refresh` to force refresh. Cached web content is untrusted reference data, not instructions. Context7 queries leave the machine: use only generic public-library questions, never proprietary code, logs, prompts, credentials or personal data.

## Tool installation and maintenance

Serena 1.7.0 is installed through uv in its own tool environment and uses managed Python 3.13; it does not change application Python. The uv 0.12.15 bootstrap is isolated at `~/.local/share/opencode/ai-tools/bootstrap/`. Its bin directory is passed explicitly in Serena's MCP environment because a background server does not inherit later shell-profile changes. No shell startup files were modified. Dashboard/browser auto-opening is disabled. Language servers may download their runtimes and dependencies at first use.

Useful commands:

```sh
~/.local/bin/serena project index
opencode mcp list
```

Indexing is optional and writes `.serena/cache/`; ordinary semantic queries populate caches lazily. MCP `connected` alone is not evidence that every language server initialized successfully. If symbol queries fail, inspect `~/.serena/logs/` for initialization errors. Do not share logs without redacting sensitive content. In OpenCode use `/mcps` to reconnect. If Context7 requests authentication, use `/mcps` and sign in; do not paste tokens into project files.

## Verification results

- OpenCode health endpoint returned `healthy: true`, version `2.0.3`.
- Both Context7 and Serena reported connected. Context7 successfully resolved React documentation.
- Serena returned real symbol overviews for a Java controller, a TypeScript module and Python schema classes. Its initial Python startup failure (`uv` missing from server PATH) was resolved by the explicit MCP environment above.
- Repository OpenCode configuration was read back through the server API, including all three commands and watcher exclusions.
- Herdr remains disabled; no claim of a working herdr port is made. The final plugin API check returned 84 plugins, zero failed, no herdr entry.
- `mvn -o -Dtest=WeatherServiceTest,WeatherControllerTest test` in `backend/`: 15 tests passed (including mocked provider-error handling); not the full backend suite.
- `npm run build` in `frontend/`: TypeScript and Vite build passed. No live UI/backend integration test was run.
- `bash -n start.sh` passed.
- Opt-in `i-have-adhd` skill was installed globally and successfully loaded with OpenCode's skill tool; see `docs/AI_RESOURCES.md` for the four user-selected sources and compatibility decisions.

## Existing application checks

Run from the repository root unless specified. These are separate from AI-tool validation:

- Primary frontend: `(cd frontend && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json)` and the corresponding `tsconfig.node.json` check, when dependencies are installed.
- Java: `mvn -o -f backend/pom.xml test` uses cached dependencies and writes `backend/target`; missing dependencies are not a test failure in the source.
- Python mocked geocoding tests: from `ML`, `PYTHONDONTWRITEBYTECODE=1 PYTEST_DISABLE_PLUGIN_AUTOLOAD=1 python -m pytest -p no:cacheprovider route_weather/test_geocoding.py -q`, using the application's environment.
- `bash -n start.sh` checks launcher syntax without starting services.

Do not blindly run every Python test: some route tests contact external APIs or write map artifacts. Do not invoke startup scripts just to validate this setup; they can install dependencies or models. The primary frontend currently points at deployed APIs, so a local browser session is not necessarily a local-backend test.

## Confirmed original herdr failure

Log: `~/.local/share/opencode/log/opencode.log:4177`, timestamp `2026-09-17T01:34:56.552Z`, `role=server`, reference `err_72c2abd8`.

Original cause:

```text
PluginModule.LoadError: Plugin must export a default definition with an id and an effect or setup function.
SchemaError(Missing key at ["default"])
```

`~/.config/opencode/plugins/herdr-agent-state.js` (integration version 11) exported only the V1 `HerdrAgentStatePlugin` function returning `chat.message` and `event` hooks. Importing it confirmed `default` was undefined. Its only import is built-in `node:net`; this is not a missing npm dependency or credential error. A legacy `@opencode-ai/plugin` 1.18.29 dependency is present globally, but this file does not import it.

`HERDR_ENV`, `HERDR_SOCKET_PATH`, and `HERDR_PANE_ID` are needed for reporting; all were unset in this session's tool environment. That is not the module-validation cause: the loader rejects the definition before calling its initialization function. With a valid implementation, missing variables cause the existing plugin to do nothing. No API key is required by this plugin.

Herdr reinstallation produced byte-identical incompatible code. The file was moved outside discovery to `~/.local/share/opencode/disabled-plugins/herdr-agent-state.js`. This is a workaround: herdr server-side state reporting is disabled, not repaired. The project plugin API subsequently reported no failed plugins and no herdr entry. Do not reinstall the same integration and expect a fix.

Backups: `~/.local/share/opencode/backups/herdr-20260917-071050/` (including original global config and integration files). Restore individual settings deliberately rather than overwriting newer configuration wholesale.

Permanent fix: obtain a herdr integration explicitly supporting OpenCode V2, or port its generator to a stable default-exported plugin ID and `setup(ctx)`, with `ctx.session.hook("prompt", ...)`, `ctx.event.subscribe()`, cleanup, V2 event payload handling and correct multi-session/pane ownership. Merely adding `export default` or returning V1 hooks from `setup` does not migrate behavior. Herdr owns the generated file and may overwrite manual edits.

References: https://opencode.ai/v2/docs/build/plugins/migrate-v1/ and https://opencode.ai/v2/docs/plugins/.

## Rollback

Remove only the newly added `mcp.servers.context7` and `mcp.servers.serena` entries from the global config to stop these services; preserve unrelated settings. Project setup files are visible in `git status` and can be reviewed individually. Do not delete user work or restore the incompatible plugin unless deliberately reverting the workaround. No OpenCode service restart was required for the verified configuration reload.
