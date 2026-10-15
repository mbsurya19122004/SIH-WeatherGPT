# WeatherGPT — Architecture

**DRAFT — code-derived, not user-approved.** Inspected 2026-09-17 at HEAD `e193ab9`. This describes source structure and defaults, not verified deployment topology or production readiness. No services were started or external providers exercised for this document.

## Components and boundaries

```text
Primary browser UI: frontend/ (React + TypeScript + Vite, local :5173)
  ├─ weather / Java chat / climate / NWP / advisories / alerts
  │    → backend/ (Java 17, Maven, Spring Boot 3.2.5, default :8080)
  │         ├─ controllers → domain services → Open-Meteo providers
  │         ├─ account/auth services → JPA repositories → in-memory H2
  │         └─ process-local station cache and SSE subscribers
  └─ agent chat / route-weather
       → ML/ (Python FastAPI, startup script :8000)
            ├─ LangChain agent → Ollama (default) or OpenRouter
            ├─ geocoding → route sampling / arrival times → weather → risk
            └─ generated JSON + HTML in shared ML/map/

Separate components, not implicitly one integrated pipeline:
  frontend2/     chat-focused React client, local :5174
  voice_service/ Python FastAPI STT/TTS, startup script :8001
  route_weather/ standalone route prototype
  offline_weather/ standalone web app with service worker
```

Evidence: `start.sh`, `backend/pom.xml`, `mise.toml`, `frontend/package.json`, `frontend/vite.config.ts`, `frontend2/vite.config.ts`, `ML/main.py`, `ML/agent.py`, `voice_service/main.py`. Java voice interfaces currently have no-op implementations; the separate Python service's existence does not prove it is wired into them.

## Main flows

- **Weather:** `frontend/src/config/api.ts` builds endpoint URLs. `backend/src/main/java/com/weathergpt/controller/WeatherController.java` delegates to `service/WeatherService.java`; `weather/GeocodingProvider.java` and `weather/WeatherProvider.java` abstract the Open-Meteo implementations. Java controllers typically wrap DTOs with `dto/ApiResponse.java`.
- **Java chat:** `controller/ChatController.java` → `service/WeatherQueryService.java` → query interpretation, location/time resolution, weather retrieval and response generation/localization. Python chat is a different API/response contract, not simply this controller's transport.
- **Python chat:** `ML/main.py` handles `/agent`, including a fast weather path; `ML/agent.py:build_agent` selects Ollama by default or OpenRouter through `LLM_PROVIDER`, with geocoding/weather tools. A provider setting does not establish model availability or output correctness.
- **Routes:** `ML/main.py:route_weather` geocodes endpoints, obtains the route, samples approximately every 30 km, estimates arrival times, fetches weather and aggregates risk. It returns map data/HTML and writes `ML/map/route_weather_data.json` and `ML/map/index.html`. These fixed shared files are a concurrency/privacy and test-side-effect concern, not per-user durable storage.
- **Accounts:** Java auth controllers/services use JWT/security filters and JPA user/token repositories. `config/SecurityConfig.java` permits public weather/chat/alerts **and ingest** routes, protects remaining account-specific routes, and requires ADMIN for admin endpoints. This is the observed policy, not a security approval.
- **Events/telemetry:** `ingest/Wis2IngestionService.java` uses a `ConcurrentHashMap` and process-local SSE emitters; `controller/AlertStreamController.java` exposes an alert stream. Seeded station data and accepted WIS2-style HTTP messages do not establish a live broker feed or durable event bus.

Java paths in this section are relative to `backend/src/main/java/com/weathergpt/` unless fully qualified.

## Data truth and incomplete integrations

| Area | Actual implementation / consequence |
| --- | --- |
| Current weather / forecast | Open-Meteo provider adapters exist; availability and freshness depend on external services. |
| Climate | `backend/src/main/java/com/weathergpt/climate/ClimateAnalysisService.java` makes an archive request but calculates returned metrics synthetically regardless of the response. Fixed trend/insight values must not be represented as measured historical analysis. |
| NWP | `backend/src/main/java/com/weathergpt/nwp/NwpModelService.java` attempts multi-model parsing, supplies parser defaults and constructs a fallback ensemble from a baseline/current forecast when needed. Model labels do not guarantee independently sourced runs. |
| Official warnings | `backend/src/main/java/com/weathergpt/weather/alert/NoOpAlertProvider.java` returns no official alerts and says integration is pending. `ImdEarlyWarningService.java` generates threshold advisories marked `official=false` / `AUTOMATED_ADVISORY`, despite IMD-styled titles. |
| Storage | `backend/src/main/resources/application.properties` configures `jdbc:h2:mem:weathergptdb`, not durable production PostgreSQL. Account/token data and process-local telemetry do not survive process lifetime as a production persistence guarantee. The development profile enables the H2 console. |
| Voice | `backend/src/main/java/com/weathergpt/voice/` contains no-op defaults; `voice_service/main.py` offers separate `/stt/transcribe`, `/tts/synthesize`, `/tts/speak` and `/health` endpoints. End-to-end integration must be established separately. |

## Deployment/configuration hazards

`frontend/src/config/api.ts` currently hardcodes these **public endpoint URLs**:

- Java: `https://sih-weathergpt-production.up.railway.app`
- Python ML: `https://bubbly-abundance-production-4c2a.up.railway.app`

These absolute URLs bypass the `/api`, `/agent` and `/route-weather` localhost proxies in `frontend/vite.config.ts`. Consequently, starting a local UI does **not** ensure local backend traffic. A future approved change should centralize environment-specific base URLs, align CORS, and verify request targets with mocks before any live checks. This document does not change those URLs or confirm deployed service health.

Other configuration concerns:
- Java's default frontend link origin is port 3000 in `backend/src/main/resources/application.properties`, whereas the primary Vite UI uses 5173; deployment/email-link and CORS settings need coordinated review.
- That properties file contains a JWT signing-secret fallback. Its value is intentionally not reproduced. Remove insecure defaults and externally manage/rotate affected credentials as appropriate; do not print configuration wholesale.
- `start.sh` can pull an Ollama model; its default start path invokes voice startup even though comments describe voice as optional. Setup installs dependencies. Do not run startup/setup for routine inspection.
- Python route calls and browser map assets involve external services; route/location data and model prompts cross trust boundaries. Retention, consent, provider usage limits and data-isolation policy are not established here.

## Validation and change guidance

See `AGENTS.md` for exact source-verified build/test commands and the distinction between `ML/route_weather/test_geocoding.py` (mocked pytest) and root `route_weather/test_geocoding.py` (live-call script). Backend tests cover providers, weather/query flows, auth, alerts, climate, NWP, localization and sector advisories; test presence does not prove meteorological validity or production readiness. Primary UI has a build script but no declared test script. No build or test was run for these documentation-only additions.

Use `docs/SRS.md` IDs when proposing behavioral changes. Priorities needing user decisions are truthful provenance, local/deployed API separation, durable/private storage, official-feed integration and explicit voice/model support—not an assumed rewrite or automatic dependency installation.
