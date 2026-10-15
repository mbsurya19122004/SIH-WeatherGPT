# 🌦️ WeatherGPT

### AI-Powered Conversational Weather Intelligence Platform

WeatherGPT is an AI-powered conversational weather platform designed to make **real-time meteorological information, forecasts, warnings, historical analysis, and weather-based decision support** easily accessible through natural language.

Instead of requiring users to navigate multiple weather portals, bulletins, satellite products, and forecasting systems, WeatherGPT provides a unified conversational interface where users can simply ask questions such as:

> "Will it rain in Delhi tomorrow?"

> "Is it safe to travel to Dehradun this weekend?"

> "Give me a weather advisory for farmers in Punjab."

> "What is the temperature trend in Mumbai over the last 10 years?"

The system combines **weather APIs, meteorological datasets, forecasting models, GIS information, disaster warnings, and Large Language Models (LLMs)** to generate contextual and actionable weather intelligence.

---

## 🚨 Problem Statement

Weather information is often distributed across multiple platforms, including:

* Weather portals
* Government bulletins
* Satellite data
* Numerical Weather Prediction (NWP) models
* Disaster warning systems
* Historical climate databases
* Forecasting APIs

This makes it difficult for common users, researchers, farmers, disaster managers, and government agencies to quickly obtain the information they actually need.

WeatherGPT addresses this problem by providing a **single intelligent conversational interface** for accessing and understanding meteorological information.

---

# 🎯 Objectives

The primary objectives of WeatherGPT are:

* Provide real-time weather information.
* Enable natural-language weather queries.
* Integrate meteorological datasets and forecasting systems.
* Provide extreme-weather alerts and warnings.
* Generate location-specific weather advisories.
* Support multiple Indian languages.
* Provide historical weather and climate analysis.
* Enable voice-based interaction.
* Provide domain-specific decision support for agriculture, aviation, marine operations, and urban planning.

---

# ✨ Key Features

## 🌡️ 1. Real-Time Weather

Users can obtain current weather conditions for any supported location.

Example:

```text
User:
What's the weather in Greater Noida right now?

WeatherGPT:
Temperature: 31°C
Humidity: 68%
Wind: 14 km/h
Condition: Partly Cloudy
```

---

## 🔮 2. Natural Language Forecasting

Users don't need to understand weather APIs or technical terminology.

They can simply ask:

```text
Will it rain tomorrow?
```

or:

```text
Should I carry an umbrella to work tomorrow?
```

The AI converts the natural-language request into structured weather queries and generates an understandable response.

---

## 🛰️ 3. NWP Model Integration

WeatherGPT can integrate numerical weather prediction systems such as:

* GFS
* WRF
* Other regional forecasting models

These models can provide additional information for advanced forecasting and research use cases.

---

## ⚠️ 4. Extreme Weather Alerts

The system can consume warning information from meteorological and disaster-management systems.

Possible alerts include:

* 🌪️ Cyclones
* 🌧️ Heavy rainfall
* 🌊 Floods
* 🌡️ Heatwaves
* ❄️ Cold waves
* ⛈️ Thunderstorms
* 🌬️ Strong winds
* 🌊 Storm surges

The system can convert technical warnings into easy-to-understand instructions.

Example:

```text
⚠️ Heavy Rainfall Warning

Heavy rainfall is expected in your region over the next
24 hours.

Recommendation:
Avoid unnecessary travel and stay away from
low-lying and waterlogged areas.
```

---

## 📍 5. Location-Based Advisory

WeatherGPT can use a user's selected location to provide contextual recommendations.

Examples:

### Agriculture

```text
Rain is expected tomorrow evening.
Consider postponing irrigation and avoid spraying
pesticides before rainfall.
```

### Travel

```text
Thunderstorms are expected along your route.
Consider travelling after 7 PM.
```

### Urban Planning

```text
Heavy rainfall is expected over the next 6 hours.
Low-lying areas may experience waterlogging.
```

---

## 🌐 6. Multilingual Support

WeatherGPT is designed to support Indian languages.

Potential supported languages include:

* English
* Hindi
* Bengali
* Marathi
* Telugu
* Tamil
* Gujarati
* Kannada
* Malayalam
* Punjabi
* Odia

Example:

```text
User:
कल दिल्ली में बारिश होगी क्या?

WeatherGPT:
हाँ, कल दोपहर के समय हल्की बारिश होने की संभावना है।
```

---

## 📊 7. Historical Weather & Climate Analysis

Users can ask questions about historical weather trends.

Examples:

```text
What was the average temperature in Delhi during June
over the last 10 years?
```

```text
How has rainfall changed in Rajasthan over the last
20 years?
```

The system can provide:

* Temperature trends
* Rainfall trends
* Humidity trends
* Extreme weather frequency
* Historical comparisons
* Climate patterns

---

## 🎙️ 8. Voice Interaction

WeatherGPT can support voice-based interaction to improve accessibility, especially for users who may have difficulty typing.

Example workflow:

```text
🎙️ User speaks
       ↓
Speech-to-Text
       ↓
LLM Query Understanding
       ↓
Weather Data Retrieval
       ↓
AI Response Generation
       ↓
Text-to-Speech
       ↓
🔊 Voice Response
```

---

# 🧠 System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │ Mobile / Web / Voice│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   API Gateway       │
                    │  FastAPI / Node.js  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Query Understanding │
                    │       LLM           │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
          ┌───────────┐ ┌────────────┐ ┌────────────┐
          │ Weather   │ │ Forecast   │ │  Warning   │
          │   APIs    │ │   Models   │ │  Systems   │
          └─────┬─────┘ └──────┬─────┘ └──────┬─────┘
                │              │              │
                └──────────────┼──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Weather Data Layer  │
                    │ PostgreSQL/MongoDB  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ AI Response Engine  │
                    │ Context + Reasoning │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ User-Friendly       │
                    │ Weather Advisory    │
                    └─────────────────────┘
```

---

# 🏗️ Core Components

## 1. Frontend

The frontend provides the conversational interface.

Possible technologies:

* React Native
* Flutter
* React.js
* HTML/CSS/JavaScript

Main screens:

```text
Home
 ├── Chat
 ├── Current Weather
 ├── Forecast
 ├── Alerts
 ├── Weather Map
 ├── Climate Analysis
 └── Settings
```

---

## 2. Backend

The backend manages:

* User requests
* Authentication
* Weather API communication
* Database operations
* Forecast retrieval
* Alert processing
* LLM communication
* Location processing
* Real-time updates

Possible technologies:

```text
Python
FastAPI
Node.js
WebSocket
MQTT
```

---

## 3. AI Query Understanding Engine

The LLM acts as the natural-language understanding layer.

For example:

```text
"What will the weather be like in Agra tomorrow evening?"
```

can be converted into:

```json
{
  "location": "Agra",
  "date": "tomorrow",
  "time_range": "evening",
  "information_required": [
    "temperature",
    "rainfall",
    "wind",
    "weather_condition"
  ]
}
```

The backend then retrieves the required data.

---

# 🤖 AI Architecture

WeatherGPT should **not allow the LLM to invent weather information**.

Instead, the system follows a data-grounded architecture:

```text
User Question
      ↓
LLM
      ↓
Intent + Location + Time Extraction
      ↓
Weather API / Database / NWP Model
      ↓
Verified Weather Data
      ↓
LLM
      ↓
Contextual Response
```

This approach reduces hallucination and improves reliability.

---

# 🗄️ Data Sources

The platform can integrate multiple meteorological sources.

Potential data sources include:

* Weather APIs
* Government meteorological datasets
* Satellite products
* GFS
* WRF
* Historical climate datasets
* Disaster warning feeds
* GIS datasets

The architecture is designed so that additional data providers can be added without changing the entire application.

---

# 🛠️ Technology Stack

| Layer               | Technology                      |
| ------------------- | ------------------------------- |
| Frontend            | React Native / Flutter          |
| Backend             | Python / FastAPI                |
| Alternative Backend | Node.js                         |
| AI                  | OpenAI / Llama / Gemini         |
| Database            | PostgreSQL / MongoDB            |
| Real-Time           | WebSocket / MQTT                |
| Weather Models      | GFS / WRF                       |
| GIS                 | GeoPandas / PostGIS             |
| Containerization    | Docker                          |
| Orchestration       | Kubernetes                      |
| Voice               | Speech-to-Text + Text-to-Speech |
| API Communication   | REST / WebSocket                |

---

# 📁 Project Structure

```text
WeatherGPT/
│
├── frontend/
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── utils/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   │
│   ├── main.py
│   └── requirements.txt
│
├── ai/
│   ├── prompts/
│   ├── agents/
│   ├── tools/
│   └── query_engine/
│
├── data/
│   ├── weather/
│   ├── historical/
│   └── climate/
│
├── models/
│   └── nwp/
│
├── infrastructure/
│   ├── docker/
│   └── kubernetes/
│
├── .env.example
├── docker-compose.yml
└── README.md
```

---

# 🔄 Example Query Flow

Consider the query:

```text
"Will there be heavy rain in Mumbai tomorrow?"
```

### Step 1 — Query Understanding

The AI identifies:

```json
{
  "location": "Mumbai",
  "date": "tomorrow",
  "query_type": "rainfall",
  "severity": "heavy"
}
```

### Step 2 — Data Retrieval

Backend requests forecast data for Mumbai.

### Step 3 — Weather Analysis

The system evaluates:

* Rain probability
* Expected rainfall
* Wind speed
* Weather warnings
* Existing alerts

### Step 4 — AI Response

The LLM converts the structured information into a natural-language answer.

### Step 5 — Advisory

If necessary, the system provides an actionable recommendation.

---

# 🌾 Use Cases

## Agriculture

Farmers can ask:

```text
Will it rain tomorrow?
```

```text
Is it a good time to spray pesticides?
```

```text
What is the rainfall forecast for the next 7 days?
```

WeatherGPT can provide weather-based agricultural recommendations.

---

## ✈️ Aviation

Possible features:

* Weather briefing
* Wind conditions
* Visibility
* Thunderstorm information
* Rainfall
* Forecast summaries

---

## 🌊 Disaster Management

WeatherGPT can help communicate:

* Cyclone warnings
* Flood warnings
* Heavy rainfall alerts
* Heatwave warnings
* Severe thunderstorms

in simple, understandable language.

---

## 🏙️ Smart Cities

Cities can use WeatherGPT for:

* Rainfall monitoring
* Flood risk awareness
* Heatwave monitoring
* Air/weather condition monitoring
* Weather-based infrastructure planning

---

## 🔬 Climate Research

Researchers can query:

```text
Compare average rainfall between 2000 and 2025.
```

or:

```text
Show the temperature trend for Delhi over the last 20 years.
```

---

# ⚡ Real-Time Data Pipeline

WeatherGPT can use an event-driven architecture for real-time information.

```text
Meteorological Data
        ↓
Data Ingestion Service
        ↓
MQTT / WIS2.0 / WebSocket
        ↓
Data Processing
        ↓
Database / Cache
        ↓
Alert Detection
        ↓
Notification Service
        ↓
Users
```

This allows the platform to react quickly to newly available weather information.

---

# 🔔 Alert System

The alert engine can continuously evaluate incoming weather data.

Example:

```text
IF rainfall > threshold
        ↓
Check affected region
        ↓
Check warning level
        ↓
Generate alert
        ↓
Translate alert
        ↓
Send notification
```

Possible notification channels:

* Mobile push notifications
* SMS
* In-app alerts
* Voice notifications
* Web notifications

---

# 🌍 GIS & Location Intelligence

GIS functionality can be used to visualize weather conditions geographically.

Potential features:

* Interactive weather map
* Rainfall map
* Temperature map
* Wind map
* Cyclone tracking
* Flood-risk regions
* Alert zones

Location information can be represented using latitude/longitude and spatial databases such as PostGIS.

---

# 🔐 Security & Reliability

**Model output can never alter or soften a weather warning.** The warning
bulletin renders from IMD data, not from the assistant: it displays the
official text verbatim, is labelled as verbatim, and takes no model output at
all. A warning question is also answered by a deterministic lookup that never
calls the model. The model can put a wrong sentence in the chat, and cannot
change what you are told to do about a warning.

Weather information can influence important decisions, so the platform should prioritize reliability.

Recommended practices:

* API authentication
* Rate limiting
* Input validation
* Secure environment variables
* Database access control
* API timeout handling
* Weather-source verification
* Logging and monitoring
* Graceful failure when external APIs are unavailable

The AI should clearly distinguish between:

```text
Observed data
Forecast data
Historical data
AI-generated advisory
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/WeatherGPT.git

cd WeatherGPT
```

## 2. Create Virtual Environment

`start.sh` looks for the virtualenv at **`.venv`** in the project root. Use that
exact name, or the launcher falls back to the system `python3` and the services
fail on missing imports.

```bash
python3 -m venv .venv
```

### Windows

```powershell
.venv\Scripts\activate
```

### Linux/macOS

```bash
source .venv/bin/activate
```

## 3. Install Dependencies

There is no root-level `requirements.txt`. Python dependencies live per service,
and both run from the same `.venv`:

```bash
pip install -r ML/requirements.txt             # AI agent + route weather
pip install -r voice_service/requirements.txt  # optional, see 3a
```

`./start.sh setup` installs both. The second pulls PyTorch, so read 3a first if
you would rather not pay that cost.

### 3a. Voice service dependencies (opt-in)

The voice service is **optional**. It is a separate Python service that runs
from the same virtual environment as the ML service, and it needs three extra
packages:

| Package | Needed for | Notes |
|---|---|---|
| `python-multipart` | `/stt/transcribe` request parsing | tiny, pure Python |
| `openai-whisper` | speech-to-text | **pulls PyTorch — install the CPU build first** |
| `gTTS` / `pyttsx3` | text-to-speech | small |

**Install torch CPU-only first, then the rest.** This project transcribes CPU
audio and never uses CUDA, but the default torch pulls multi-gigabyte CUDA
wheels, and installing it with a download cache failed here with
`OSError: [Errno 122] Disk quota exceeded` while `df` reported 400 GB+ free:

```bash
pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch
pip install --no-cache-dir -r voice_service/requirements.txt
```

`./start.sh setup` does exactly this, in this order. Transcription also needs a
system `ffmpeg` on `PATH`; `start.sh` does not install system packages.

**To install them by hand instead:**

```bash
pip install python-multipart
pip install -r voice_service/requirements.txt   # includes openai-whisper
```

**To skip voice entirely** — the rest of the app does not need any of it:

```bash
pip install python-multipart
```

With that, the voice service starts and reports its real state instead of
crashing:
```bash
curl -s http://localhost:8001/health
# {"status":"healthy","voice_enabled":false,"stt_available":false,"tts_available":false}
```

`stt_available: false` / `tts_available: false` means exactly that — the service
is up, speech is not. The web app's text, map, forecast and chat features are
unaffected.

### Enabling voice (off by default, and it downloads a model)

**Voice is disabled by default and stays that way unless you turn it on.** The
switch is `VOICE_ENABLED`, and leaving it unset means the service runs as a
no-op: it starts, reports `stt_available: false`, and returns nothing for a
transcription request. That is deliberate, because turning it on has a cost
you should choose rather than discover.

To enable it, add this to the project-root `.env`:

```env
VOICE_ENABLED=true
```

or export it for one run:

```bash
VOICE_ENABLED=true ./start.sh
```

**What enabling it downloads on first use.** The first `/stt/transcribe` request
loads the Whisper `base` model, which is **roughly 140 MB** fetched from the
internet into `~/.cache/whisper`. It is a one-time download, but it happens at
the moment someone first speaks into the app, not at install time. If that is
not acceptable on a given machine, leave `VOICE_ENABLED` off. TTS via `gTTS`
also needs internet access at call time; `pyttsx3` is the offline option.

Be deliberate about this before a demo: enabling voice mid-session means the
first person to use it waits on a ~140 MB download.

## 4. Configure Environment Variables

Create a `.env` file **in the project root**. The ML service loads it on
startup, so a key placed here is picked up without exporting it in your shell.
`.env` is gitignored; never commit it.

```env
# Required for the AI chat agent. The provider is OpenRouter, reached through
# its OpenAI-compatible endpoint. Without this key the chat returns
# "not configured" and every non-fast-path question fails.
OPENROUTER_API_KEY=your_openrouter_key

# Optional. Overrides the free-tier default model if you want a different one.
# LLM_MODEL=google/gemma-4-26b-a4b-it:free
```

Weather data comes from Open-Meteo and needs no key. Verify what the service
resolved, without exposing the key:

```bash
curl -s http://localhost:8000/health
# {"status":"ok",...,"model_provider":"openrouter","model_provider_configured":true}
```

`model_provider_configured: false` means the key was not found, which usually
means the `.env` is in the wrong directory. A key that is present but rejected
surfaces as HTTP 502 on `/agent`, not 503.

## 5. Start the Services

The easiest route is the launcher, which starts all four services:

```bash
./start.sh
```

To run the Python ML backend on its own, note the entry point is
`ML/main.py`, so the module is `main` and it must be started from inside `ML/`:

```bash
cd ML
../.venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Backend will be available at:

```text
http://localhost:8000
```

## 6. Running the Tests

### Java backend

```bash
cd backend && mvn test
```

Last full run: **140 tests, 0 failures, 0 errors, 0 skipped** across 20 classes.

| Test class | Covers |
|---|---|
| `AuthControllerTest` | registration, login, JWT issuance |
| `JwtTokenProviderTest` | token signing, expiry, validation |
| `CorsConfigurationTest` | allowed origins and methods |
| `AlertServiceTest` | alert assembly and filtering |
| `AlertControllerTest` | alert endpoints |
| `NoOpAlertProviderTest` | the no-op provider fallback |
| `ImdEarlyWarningServiceTest` | IMD early-warning parsing |
| `WeatherServiceTest` | weather aggregation |
| `WeatherControllerTest` | weather endpoints |
| `WeatherCoordinateAwareEndpointsTest` | coordinate-first endpoint contract |
| `WeatherQueryFlowTest` | end-to-end query flow |
| `WeatherResponseGeneratorTest` | response text generation |
| `ClimateAnalysisServiceTest` | climate metric generation |
| `NwpModelServiceTest` | NWP model handling |
| `SectorAdvisoryServiceTest` | sector advisories |
| `OpenMeteoGeocodingProviderTest` | geocoding provider |
| `OpenMeteoWeatherProviderTest` | weather provider |
| `DeterministicWeatherQueryInterpreterTest` | query interpretation |
| `LlmQueryUnderstandingServiceTest` | LLM query understanding |
| `LocalizationServiceTest` | language handling |

### Frontend

```bash
cd frontend
npm run typecheck   # tsc -b --noEmit
npm run lint        # eslint src
npm test            # node --test ../tests/*.test.ts
npm run build       # tsc -b && vite build
```

`npm test` runs the zero-dependency Node test suites in `tests/`
(`location_core.test.ts`, `radar_core.test.ts`).

### API safety guard

```bash
./scripts/verify-api-safety.sh
```

Builds the app under seven `VITE_*` configurations and asserts the effective
API base URL, so a local session cannot silently reach a deployed service.

---

# 📡 Example API

### Current Weather

```http
GET /api/weather/current?lat=28.61&lon=77.23
```

### Forecast

```http
GET /api/weather/forecast?lat=28.61&lon=77.23&days=7
```

### Chat

```http
POST /api/chat
```

Request:

```json
{
  "message": "Will it rain tomorrow in Delhi?",
  "latitude": 28.61,
  "longitude": 77.23,
  "language": "en"
}
```

Response:

```json
{
  "answer": "There is a moderate chance of rainfall tomorrow...",
  "location": "Delhi",
  "language": "en",
  "sources": [
    "weather_forecast"
  ]
}
```

---

# 🐳 Docker

Build the application:

```bash
docker compose build
```

Run:

```bash
docker compose up
```

Stop:

```bash
docker compose down
```

---

# 📈 Scalability

WeatherGPT is designed to support large numbers of users.

A scalable deployment can use:

```text
                    Load Balancer
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Backend 1      Backend 2      Backend 3
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                    Redis Cache
                         │
                         ▼
                    PostgreSQL
```

Containerization with Docker and orchestration using Kubernetes can enable horizontal scaling.

Caching can also reduce repeated requests to external weather APIs.

---

# 🎯 Expected Outcomes

WeatherGPT aims to provide:

* Faster access to weather information.
* Better public understanding of forecasts.
* Improved disaster preparedness.
* Easier access to meteorological information.
* Location-specific weather advisories.
* Multilingual weather intelligence.
* Voice accessibility for rural users.
* Decision support for agriculture, aviation, marine operations, and smart cities.

---

# 📊 Evaluation Parameters

The platform can be evaluated using the following parameters:

### 1. Accuracy

How accurately does the system represent the underlying meteorological data?

### 2. Relevance

Does the response correctly answer the user's question?

### 3. Response Latency

How quickly can WeatherGPT retrieve and process information?

### 4. Multilingual Performance

How accurately can the platform understand and respond in Indian languages?

### 5. Accessibility

Can users easily interact with the system using text and voice?

### 6. Scalability

Can the platform handle a large number of concurrent users?

### 7. Real-Time Integration

How quickly can new weather observations and warnings reach users?

---

# 🔮 Future Enhancements

Possible future improvements include:

* AI-based personalized weather alerts.
* Satellite image analysis using computer vision.
* More advanced WRF/NWP integration.
* Agricultural crop-specific recommendations.
* Flood prediction models.
* Hyperlocal weather forecasting.
* Automatic disaster-response recommendations.
* Offline/low-connectivity mode.
* WhatsApp/SMS-based weather assistant.
* Personalized weather dashboards.
* Weather-aware route planning.
* Advanced climate-risk analysis.

---

# 💡 Why WeatherGPT?

Traditional weather applications mainly display weather information.

WeatherGPT focuses on **understanding the user's question and turning meteorological data into actionable intelligence.**

Instead of:

```text
Temperature: 34°C
Humidity: 72%
Rain Probability: 80%
Wind: 18 km/h
```

WeatherGPT can provide:

```text
🌧️ Rain is highly likely this evening.

If you're planning to travel, consider leaving earlier
because heavy rainfall may reduce visibility and cause
waterlogging in low-lying areas.
```

The goal is to move from **"weather data" → "weather intelligence."**

---

# 👥 Target Users

WeatherGPT can serve:

* 👨‍🌾 Farmers
* 🧑‍🔬 Researchers
* 🚨 Disaster-management teams
* 🏛️ Government agencies
* ✈️ Aviation professionals
* ⚓ Marine operators
* 🏙️ Smart-city authorities
* 🚗 Travelers
* 👨‍👩‍👧 General public
* 🌾 Rural communities

---

# 🏆 Project Vision

> **"Making weather intelligence accessible to everyone through natural language."**

WeatherGPT aims to bridge the gap between complex meteorological systems and everyday users by combining **AI, real-time weather data, forecasting models, GIS, multilingual NLP, and voice technology** into a single conversational platform.

---

# 📄 License

This project is developed for educational, research, and demonstration purposes.

Add an appropriate open-source license before public deployment.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new weather feature"
```

4. Push the branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# ⭐ Support

If you find WeatherGPT useful, consider giving the repository a ⭐ and contributing to its development.

**WeatherGPT — From weather data to intelligent decisions. 🌦️🤖**
