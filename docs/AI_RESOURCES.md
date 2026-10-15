# Selected AI engineering resources

Reviewed 2026-09-17. These are references, not permission to execute their installers or override project instructions.

| Resource | Use here | Compatibility / boundary |
| --- | --- | --- |
| https://github.com/ayghri/i-have-adhd | Action-first, numbered, low-distraction responses; globally available opt-in `i-have-adhd` skill | Local Markdown adaptation using OpenCode V2 skill metadata; no third-party server hook needed. A style preference, not a medical diagnosis. |
| https://aiengineeringfromscratch.com/ | Agent-assisted engineering and software fundamentals; learn one concept with one small exercise and an explicit test | Course, not an LSP or MCP server. Do not install the entire course or modify WeatherGPT to follow a lesson without a task. Source: https://github.com/rohitg00/ai-engineering-from-scratch |
| https://github.com/openai/plugins/tree/main/plugins | Browse relevant web UI, data visualization and product-design workflows | Repository README describes Codex plugin examples using `.codex-plugin/plugin.json`, not OpenCode V2 server definitions. Review individual skills and dependencies before adapting. No bulk installation. |
| https://pi-docs.aiuo.net/ | Documentation structure: product intent → architecture boundary → contract → implementation → acceptance checks / ADR | This site documents PI-Desktop (Electron, Rust host, SQLite and pi sidecar), not OpenCode or WeatherGPT. Do not transplant its runtime APIs or database schemas. |

## Working loop

1. State one user outcome and a relevant draft SRS requirement.
2. Trace one request through the actual components; mark unknowns.
3. Implement one bounded change and a regression check.
4. Record what passed, what failed, and the next smallest action.

Use `docs/SRS.md` and `docs/ARCHITECTURE.md` for this repository's evidence. Use `/spec`, `/context` and `/verify` to apply the loop. For a lesson, request: “Use AI Engineering from Scratch to teach one concept relevant to this change, in a separate scratch exercise.”

## Output style

Invoke `/i-have-adhd` or explicitly request the skill. Say `normal mode` or `stop adhd mode` to stop applying it in the current conversation. It is not a runtime-enforced toggle or a claim about the user's health. No always-on flag or unsupported V1 plugin configuration was installed.
