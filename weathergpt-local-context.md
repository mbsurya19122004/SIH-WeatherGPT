# WeatherGPT Local Worktree Context

Generated from the current uncommitted local working tree.

## Repository
```text
/home/abhay/Documents/projects/SIH-WeatherGPT
## main...origin/main
 M backend/src/main/java/com/weathergpt/controller/VoiceController.java
 M backend/src/main/java/com/weathergpt/dto/chat/ChatQueryRequest.java
 M backend/src/main/java/com/weathergpt/service/LlmQueryUnderstandingService.java
 M frontend/index.html
 M frontend/public/favicon.svg
 M frontend/src/App.tsx
 D frontend/src/components/MobileChatToggle.css
 D frontend/src/components/MobileChatToggle.tsx
 M frontend/src/components/MobileWeatherGPT.css
 M frontend/src/components/MobileWeatherGPT.tsx
 M frontend/src/main.tsx
 M frontend2/src/pages/ChatScreen.tsx
 M start.sh
?? .serena/
?? AGENTS.md
?? Redesign_Prompt.md
?? backend/src/test/java/com/weathergpt/LlmQueryUnderstandingServiceTest.java
?? docs/
?? frontend/public/privacy.html
?? frontend/public/terms.html
?? frontend/src/components/AnswerCard.tsx
?? frontend/src/components/AppHeader.tsx
?? frontend/src/components/IconRail.tsx
?? frontend/src/components/InputBar.tsx
?? frontend/src/components/MobileDrawer.tsx
?? frontend/src/components/WarningBulletin.tsx
?? frontend/src/components/WeatherMap.css
?? frontend/src/components/WeatherMapView.tsx
?? frontend/src/components/WeatherRadarView.tsx
?? frontend/src/components/mapData.ts
?? frontend/src/components/weatherField.ts
?? frontend/src/config/navigation.ts
?? frontend/src/hooks/useTheme.ts
?? frontend/src/location/
?? frontend/src/styles/
?? opencode.json
?? scripts/
?? tests/
?? weathergpt-local-context.md
```

## Diff Stat
```text
 .../com/weathergpt/controller/VoiceController.java |    7 +
 .../com/weathergpt/dto/chat/ChatQueryRequest.java  |   12 +
 .../service/LlmQueryUnderstandingService.java      |   10 +
 frontend/index.html                                |    4 +-
 frontend/public/favicon.svg                        |    8 +-
 frontend/src/App.tsx                               | 1988 +++++++-------
 frontend/src/components/MobileChatToggle.css       |   58 -
 frontend/src/components/MobileChatToggle.tsx       |   19 -
 frontend/src/components/MobileWeatherGPT.css       |  989 +++----
 frontend/src/components/MobileWeatherGPT.tsx       | 2861 +++++++-------------
 frontend/src/main.tsx                              |    9 +-
 frontend2/src/pages/ChatScreen.tsx                 |   26 +-
 start.sh                                           |   35 +-
 13 files changed, 2400 insertions(+), 3626 deletions(-)
```

## Changed / Untracked Files
```text
 M backend/src/main/java/com/weathergpt/controller/VoiceController.java
 M backend/src/main/java/com/weathergpt/dto/chat/ChatQueryRequest.java
 M backend/src/main/java/com/weathergpt/service/LlmQueryUnderstandingService.java
 M frontend/index.html
 M frontend/public/favicon.svg
 M frontend/src/App.tsx
 D frontend/src/components/MobileChatToggle.css
 D frontend/src/components/MobileChatToggle.tsx
 M frontend/src/components/MobileWeatherGPT.css
 M frontend/src/components/MobileWeatherGPT.tsx
 M frontend/src/main.tsx
 M frontend2/src/pages/ChatScreen.tsx
 M start.sh
?? .serena/
?? AGENTS.md
?? Redesign_Prompt.md
?? backend/src/test/java/com/weathergpt/LlmQueryUnderstandingServiceTest.java
?? docs/
?? frontend/public/privacy.html
?? frontend/public/terms.html
?? frontend/src/components/AnswerCard.tsx
?? frontend/src/components/AppHeader.tsx
?? frontend/src/components/IconRail.tsx
?? frontend/src/components/InputBar.tsx
?? frontend/src/components/MobileDrawer.tsx
?? frontend/src/components/WarningBulletin.tsx
?? frontend/src/components/WeatherMap.css
?? frontend/src/components/WeatherMapView.tsx
?? frontend/src/components/WeatherRadarView.tsx
?? frontend/src/components/mapData.ts
?? frontend/src/components/weatherField.ts
?? frontend/src/config/navigation.ts
?? frontend/src/hooks/useTheme.ts
?? frontend/src/location/
?? frontend/src/styles/
?? opencode.json
?? scripts/
?? tests/
?? weathergpt-local-context.md
```

## Frontend Tree
```text
frontend/debug_after_load.png
frontend/debug_fix_test.mjs
frontend/debug_header2.mjs
frontend/debug_header.js
frontend/debug_header.mjs
frontend/debug_header.png
frontend/debug_height.mjs
frontend/debug_scroll.mjs
frontend/debug_trace.mjs
frontend/debug_trace.png
frontend/.gitignore
frontend/index.html
frontend/.oxlintrc.json
frontend/package.json
frontend/package-lock.json
frontend/public/favicon.svg
frontend/public/icons.svg
frontend/public/privacy.html
frontend/public/robots.txt
frontend/public/terms.html
frontend/README.md
frontend/src/App.css
frontend/src/App.tsx
frontend/src/assets/hero.png
frontend/src/assets/react.svg
frontend/src/assets/vite.svg
frontend/src/components/AnswerCard.tsx
frontend/src/components/AppHeader.tsx
frontend/src/components/ChatDrawer.css
frontend/src/components/ChatDrawer.tsx
frontend/src/components/IconRail.tsx
frontend/src/components/InputBar.tsx
frontend/src/components/mapData.ts
frontend/src/components/MobileDrawer.tsx
frontend/src/components/MobileWeatherGPT.css
frontend/src/components/MobileWeatherGPT.tsx
frontend/src/components/WarningBulletin.tsx
frontend/src/components/weatherField.ts
frontend/src/components/WeatherMap.css
frontend/src/components/WeatherMapView.tsx
frontend/src/components/WeatherRadarView.tsx
frontend/src/components/WeeklyForecastFooter.css
frontend/src/components/WeeklyForecastFooter.tsx
frontend/src/config/api.ts
frontend/src/config/navigation.ts
frontend/src/hooks/useTheme.ts
frontend/src/hooks/useVoiceInput.ts
frontend/src/hooks/useVoiceOutput.ts
frontend/src/index.css
frontend/src/location/LocationContext.tsx
frontend/src/main.tsx
frontend/src/styles/design-tokens.css
frontend/src/styles/layout.css
frontend/src/types/index.d.ts
frontend/tsconfig.app.json
frontend/tsconfig.json
frontend/vite.config.ts
```

## Frontend2 Tree
```text
frontend2/eslint.config.js
frontend2/.gitignore
frontend2/index.html
frontend2/package.json
frontend2/package-lock.json
frontend2/public/favicon.svg
frontend2/public/icons.svg
frontend2/README.md
frontend2/src/App.css
frontend2/src/App.tsx
frontend2/src/assets/hero.png
frontend2/src/assets/react.svg
frontend2/src/assets/vite.svg
frontend2/src/index.css
frontend2/src/main.tsx
frontend2/src/pages/ChatScreen.tsx
frontend2/src/pages/GeminiChat.css
frontend2/tsconfig.app.json
frontend2/tsconfig.json
frontend2/tsconfig.node.json
frontend2/vite.config.ts
```

## Unstaged Frontend/Frontend2 Diff
```diff
diff --git i/frontend/index.html w/frontend/index.html
index d93ca80..e39e3f8 100644
--- i/frontend/index.html
+++ w/frontend/index.html
@@ -4,10 +4,10 @@
     <meta charset="UTF-8" />
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <meta name="description" content="WeatherGPT — AI-powered meteorological intelligence platform with NWP models, sector advisories, alerts, and climate analytics." />
+    <meta name="description" content="WeatherGPT: current weather and 7-day forecasts, IMD warnings by district, NWP model ensembles, sector advisories, climate analysis, route weather and precipitation radar for India." />
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
-    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" />
+    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
     <title>WeatherGPT</title>
   </head>
   <body>
diff --git i/frontend/public/favicon.svg w/frontend/public/favicon.svg
index 6893eb1..6689ba3 100644
--- i/frontend/public/favicon.svg
+++ w/frontend/public/favicon.svg
@@ -1 +1,7 @@
-<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
\ No newline at end of file
+<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
+  <rect width="64" height="64" rx="14" fill="#2E6E7D"/>
+  <g fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round">
+    <path stroke-width="4" d="M22 42a10 10 0 0 1-1-20 12 12 0 0 1 23-3 10 10 0 0 1 0 20z"/>
+    <path stroke-width="3" opacity="0.85" d="M26 46h14"/>
+  </g>
+</svg>
\ No newline at end of file
diff --git i/frontend/src/App.tsx w/frontend/src/App.tsx
index 057f47d..9c0aa5f 100644
--- i/frontend/src/App.tsx
+++ w/frontend/src/App.tsx
@@ -1,58 +1,76 @@
+import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
 import {
-  BarChart3,
+  Anchor,
   Bell,
+  Building2,
   CheckCircle,
-  Cloud,
-  Cpu,
+  CloudRain,
   Droplets,
-  Layers,
-  MapPin,
+  Flame,
+  Map as MapIcon,
   Mic,
-  Radar,
-  Send,
+  Plane,
+  SprayCan,
+  Sprout,
+  Thermometer,
   TrendingUp,
-  Volume2,
-  VolumeX,
+  Waves,
   Wind,
 } from 'lucide-react';
-import { useCallback, useEffect, useRef, useState } from 'react';
-import ReactMarkdown from 'react-markdown';
-import remarkGfm from 'remark-gfm';
-import './App.css';
-import ChatDrawer from './components/ChatDrawer';
-import MobileChatToggle from './components/MobileChatToggle';
-import MobileWeatherGPT from './components/MobileWeatherGPT';
+import AppHeader from './components/AppHeader';
+import AnswerCard from './components/AnswerCard';
+import IconRail from './components/IconRail';
+import InputBar from './components/InputBar';
+import MobileDrawer from './components/MobileDrawer';
+import WarningBulletin from './components/WarningBulletin';
+import type { ImdSeverity, ImdWarning } from './components/WarningBulletin';
+import WeatherMapView from './components/WeatherMapView';
+import WeatherRadarView from './components/WeatherRadarView';
+import type { NavPage } from './config/navigation';
 import {
   ADVISORIES_ENDPOINT,
   ALERTS_ENDPOINT,
   CHAT_ENDPOINT,
   CLIMATE_ENDPOINT,
-  ML_AGENT_ENDPOINT,
   ML_ROUTE_ENDPOINT,
   WEATHER_ENDPOINTS,
 } from './config/api';
+import { useTheme } from './hooks/useTheme';
 import { useVoiceInput } from './hooks/useVoiceInput';
 import { useVoiceOutput } from './hooks/useVoiceOutput';
+import { reverseGeocodeLabel, useLocation, type LocationPatch } from './location/LocationContext';
 
 // ─────────────────────────────────────────────────────────────────────
 // Types
 // ─────────────────────────────────────────────────────────────────────
 
-type MessageRole = 'user' | 'bot';
-type NavPage =
-  | 'forecast' | 'nwp' | 'sectors' | 'alerts' | 'climate'
-  | 'aichat' | 'route' | 'report' | 'map' | 'radar';
+interface ChatCard {
+  figure: string | number;
+  label: string;
+  body?: string;
+  confidence?: {
+    percent: number;
+    label?: string;
+    members?: number;
+    of?: number;
+  };
+  issuedAt?: string;
+  source?: string;
+}
 
-interface AiMessage { role: 'user' | 'assistant'; content: string; }
-interface Coordinates { latitude: number; longitude: number; accuracy?: number; }
-type LocationStatus = 'pending' | 'granted' | 'denied' | 'unsupported';
+interface ChatMessage {
+  id: string;
+  role: 'user' | 'bot';
+  content: string;
+  voiceAnswer?: string;
+  card?: ChatCard | null;
+}
 
 interface RouteApiResponse {
   message?: string;
   route_info?: any;
   risk_summary?: { HIGH?: number; MODERATE?: number; LOW?: number };
   weather_data?: WeatherPoint[] | any;
-  map_json?: any;
   index_html?: string;
 }
 interface WeatherPoint {
@@ -79,26 +97,59 @@ interface ForecastRecord {
 // Constants
 // ─────────────────────────────────────────────────────────────────────
 
-const LANGUAGES = [
-  { code: 'en', label: 'English',             speechLocale: 'en-IN' },
-  { code: 'hi', label: 'हिन्दी (Hindi)',       speechLocale: 'hi-IN' },
-  { code: 'ta', label: 'தமிழ் (Tamil)',        speechLocale: 'ta-IN' },
-  { code: 'te', label: 'తెలుగు (Telugu)',      speechLocale: 'te-IN' },
-  { code: 'bn', label: 'বাংলা (Bengali)',      speechLocale: 'bn-IN' },
-  { code: 'mr', label: 'मराठी (Marathi)',      speechLocale: 'mr-IN' },
-  { code: 'gu', label: 'ગુજરાતી (Gujarati)',   speechLocale: 'gu-IN' },
-];
-
 const WEATHER_CODE_DESCRIPTIONS: Record<number, string> = {
-  0:'☀️ Clear', 1:'🌤️ Mainly clear', 2:'⛅ Partly cloudy', 3:'☁️ Cloudy',
-  45:'🌫️ Fog', 48:'🌫️ Fog', 51:'🌦️ Light drizzle', 53:'🌦️ Drizzle',
-  55:'🌧️ Heavy drizzle', 61:'🌦️ Light rain', 63:'🌧️ Rain', 65:'🌧️ Heavy rain',
-  71:'🌨️ Light snow', 73:'❄️ Snow', 75:'❄️ Heavy snow',
-  80:'🌦️ Rain showers', 81:'🌧️ Rain showers', 82:'🌧️ Heavy showers',
-  95:'⛈️ Thunderstorm', 96:'⛈️ Thunderstorm + hail', 99:'⛈️ Thunderstorm + hail',
+  0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
+  45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Drizzle',
+  55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
+  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
+  80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
+  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with hail',
 };
-const wmoDesc = (code: number) => WEATHER_CODE_DESCRIPTIONS[code] ?? '🌤️ Unknown';
-const REPORT_CACHE_KEY = 'weatherGPT_offline_forecast';
+const wmoDesc = (code: number) => WEATHER_CODE_DESCRIPTIONS[code] ?? 'Unknown';
+const speechLocale = (lang: string) => (lang === 'hi' ? 'hi-IN' : 'en-IN');
+
+const COPY = {
+  en: {
+    inputPlaceholder: 'Ask about weather, in English or हिंदी…',
+    listening: 'Listening…',
+    intro: 'Ask about weather anywhere in India, by typing or by voice, in <b>English or हिंदी</b>. Active warnings for your district always come first.',
+    helper: 'Warnings interrupt this conversation automatically. They are never paraphrased.',
+  },
+  hi: {
+    inputPlaceholder: 'मौसम के बारे में पूछें, टाइप करें या बोलें…',
+    listening: 'सुन रहा हूँ…',
+    intro: 'भारत में कहीं भी मौसम के बारे में पूछें, लिखकर या बोलकर, <b>अंग्रेज़ी या हिंदी</b> में। आपके ज़िले की सक्रिय चेतावनी हमेशा सबसे पहले आएगी।',
+    helper: 'चेतावनियाँ इस बातचीत में अपने आप सबसे ऊपर आती हैं। उन्हें कभी बदलकर नहीं लिखा जाता।',
+  },
+};
+
+// Dev-only demo seam so components can be previewed without mutating the
+// deployed backend (open the app with ?demo=1 in dev).
+const IS_DEMO = import.meta.env.DEV
+  && typeof window !== 'undefined'
+  && new URLSearchParams(window.location.search).get('demo') === '1';
+
+const DEMO_WARNING: ImdWarning = {
+  district: 'Sitamarhi district',
+  severity: 'orange',
+  title: 'Heavy to very heavy rainfall warning',
+  text: '"Isolated heavy to very heavy rainfall (7-20 cm) very likely at one or two places over Sitamarhi and adjoining districts during the next 48 hours, with possibility of localised flooding in low-lying areas."',
+  issuedAt: '05:30 IST, 23 Sep',
+};
+
+const DEMO_MESSAGES: ChatMessage[] = [
+  { id: 'demo-user', role: 'user', content: 'Will it rain over Sitamarhi in the next two days?' },
+  {
+    id: 'demo-card', role: 'bot', content: 'Rain is likely from tomorrow afternoon, heaviest overnight. This is a district-level forecast for Sitamarhi, not a hyperlocal reading for a single village.',
+    card: {
+      figure: '62%',
+      label: 'Rain probability, next 48h',
+      confidence: { percent: 63, label: 'Moderate', members: 4, of: 6 },
+      issuedAt: 'Forecast issued 06:00 IST, 23 Sep',
+      source: 'IMD district FCST + GFS 12km',
+    },
+  },
+];
 
 // ─────────────────────────────────────────────────────────────────────
 // Weather report helpers (offline-capable)
@@ -113,16 +164,6 @@ async function geocodeCity(city: string): Promise<GeoResult> {
   return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
 }
 
-async function reverseGeocodeForReport(lat: number, lon: number): Promise<string> {
-  try {
-    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=10`);
-    if (!res.ok) throw new Error('');
-    const d = await res.json();
-    const a = d.address ?? {};
-    return a.city ?? a.town ?? a.village ?? a.county ?? d.display_name ?? 'Current location';
-  } catch { return 'Current location'; }
-}
-
 async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
   const url =
     `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
@@ -135,64 +176,160 @@ async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
   return {
     location: place, savedAt: new Date().toISOString(),
     hourly24h: {
-      time: d.hourly.time.slice(0,24), temperature: d.hourly.temperature_2m.slice(0,24),
-      humidity: d.hourly.relative_humidity_2m.slice(0,24),
-      precipitationProbability: d.hourly.precipitation_probability.slice(0,24),
-      weatherCode: d.hourly.weather_code.slice(0,24), wind: d.hourly.wind_speed_10m.slice(0,24),
+      time: d.hourly.time.slice(0, 24), temperature: d.hourly.temperature_2m.slice(0, 24),
+      humidity: d.hourly.relative_humidity_2m.slice(0, 24),
+      precipitationProbability: d.hourly.precipitation_probability.slice(0, 24),
+      weatherCode: d.hourly.weather_code.slice(0, 24), wind: d.hourly.wind_speed_10m.slice(0, 24),
     },
     daily7days: {
-      time: d.daily.time.slice(0,7), weatherCode: d.daily.weather_code.slice(0,7),
-      maxTemperature: d.daily.temperature_2m_max.slice(0,7),
-      minTemperature: d.daily.temperature_2m_min.slice(0,7),
-      precipitationProbability: d.daily.precipitation_probability_max.slice(0,7),
-      maxWind: d.daily.wind_speed_10m_max.slice(0,7),
+      time: d.daily.time.slice(0, 7), weatherCode: d.daily.weather_code.slice(0, 7),
+      maxTemperature: d.daily.temperature_2m_max.slice(0, 7),
+      minTemperature: d.daily.temperature_2m_min.slice(0, 7),
+      precipitationProbability: d.daily.precipitation_probability_max.slice(0, 7),
+      maxWind: d.daily.wind_speed_10m_max.slice(0, 7),
     },
   };
 }
-function loadCachedForecast(): ForecastRecord | null {
-  try { return JSON.parse(localStorage.getItem(REPORT_CACHE_KEY) ?? 'null'); } catch { return null; }
+/**
+ * Per-location cache key so a Delhi response can never satisfy a Ghaziabad
+ * request (§22): the key embeds the coordinates.
+ */
+function reportCacheKey(lat: number, lon: number): string {
+  return `weatherGPT_offline_forecast_${lat.toFixed(2)}_${lon.toFixed(2)}`;
 }
-function saveForecast(r: ForecastRecord) {
-  try { localStorage.setItem(REPORT_CACHE_KEY, JSON.stringify(r)); } catch { /* full */ }
+function loadCachedForecast(lat: number, lon: number): ForecastRecord | null {
+  try { return JSON.parse(localStorage.getItem(reportCacheKey(lat, lon)) ?? 'null'); } catch { return null; }
+}
+function saveForecast(r: ForecastRecord, lat: number, lon: number) {
+  try { localStorage.setItem(reportCacheKey(lat, lon), JSON.stringify(r)); } catch { /* storage full */ }
 }
 
 // ─────────────────────────────────────────────────────────────────────
-// Shared card styles (used by Route + Report views)
+// IMD severity helpers (bulletin + alerts list)
+// ─────────────────────────────────────────────────────────────────────
+
+function severityOf(a: any): ImdSeverity {
+  const raw = [a?.severity, a?.informationClass, a?.description, a?.title]
+    .filter(Boolean).join(' ').toLowerCase();
+  if (/\bred\b/.test(raw)) return 'red';
+  if (/\borange\b/.test(raw)) return 'orange';
+  if (/\byellow\b/.test(raw)) return 'yellow';
+  if (/\bgreen\b/.test(raw)) return 'green';
+  return 'red';
+}
+
+const tierBadge = (sev: ImdSeverity | undefined): React.CSSProperties => {
+  switch (sev) {
+    case 'green': return { background: 'var(--watch-green-tint)', color: 'var(--watch-green)', borderColor: 'var(--watch-green)' };
+    case 'yellow': return { background: 'var(--watch-yellow-tint)', color: 'var(--watch-yellow-deep)', borderColor: 'var(--watch-yellow)' };
+    case 'orange': return { background: 'var(--watch-orange-tint)', color: 'var(--watch-orange-deep)', borderColor: 'var(--watch-orange)' };
+    case 'red': return { background: 'var(--watch-red-tint)', color: 'var(--watch-red-deep)', borderColor: 'var(--watch-red)' };
+    default: return { background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' };
+  }
+};
+
+const tierBorder = (sev: ImdSeverity): string => {
+  switch (sev) {
+    case 'green': return 'var(--watch-green)';
+    case 'yellow': return 'var(--watch-yellow)';
+    case 'orange': return 'var(--watch-orange)';
+    case 'red': return 'var(--watch-red)';
+    default: return 'var(--slate-teal)';
+  }
+};
+
+// ─────────────────────────────────────────────────────────────────────
+// Shared card styles (Route + Report + secondary pages)
 // ─────────────────────────────────────────────────────────────────────
 
 const S: Record<string, React.CSSProperties> = {
-  scrollWrap:   { width:'100%', height:'100%', overflowY:'auto', overflowX:'hidden', padding:'20px 16px', boxSizing:'border-box' },
-  container:    { width:'100%', maxWidth:'1400px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'18px', boxSizing:'border-box' },
-  card:         { background:'rgba(10,22,36,0.55)', padding:'18px', borderRadius:'12px', border:'1px solid rgba(0,229,255,0.12)' },
-  cardTitle:    { margin:'0 0 14px', fontSize:'1rem', fontWeight:700, color:'#e0f7ff' },
-  label:        { fontSize:'0.75rem', fontWeight:600, color:'#7ab8d4' },
-  input:        { padding:'10px 13px', borderRadius:'8px', border:'1px solid rgba(0,229,255,0.2)', background:'rgba(5,11,18,0.8)', color:'#e8f4fc', fontSize:'0.9rem', outline:'none', width:'100%', boxSizing:'border-box' },
-  btn:          { padding:'12px 24px', background:'linear-gradient(120deg,#00c8ff 0%,#0078ff 100%)', color:'#050b12', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:700, fontSize:'0.92rem', width:'100%' },
-  error:        { padding:'12px 16px', background:'rgba(229,101,74,0.12)', border:'1px solid rgba(229,101,74,0.3)', color:'#f0a08c', borderRadius:'8px', fontSize:'0.875rem' },
-  successBanner:{ background:'rgba(0,229,255,0.08)', border:'1px solid rgba(0,229,255,0.25)', color:'#67e8f9', padding:'11px 15px', borderRadius:'8px', fontWeight:500, fontSize:'0.88rem' },
-  badge:        { display:'inline-block', padding:'3px 9px', borderRadius:'12px', fontWeight:600, fontSize:'0.7rem', border:'1px solid transparent' },
-  tableWrap:    { width:'100%', overflowX:'auto', borderRadius:'8px', border:'1px solid rgba(0,229,255,0.1)' },
-  table:        { width:'100%', borderCollapse:'collapse', textAlign:'left', fontSize:'0.85rem' },
-  th:           { borderBottom:'1px solid rgba(0,229,255,0.12)', padding:'10px 13px', background:'rgba(0,229,255,0.03)', fontWeight:600, color:'#7ab8d4', whiteSpace:'nowrap' },
-  tr:           { borderBottom:'1px solid rgba(0,229,255,0.05)' },
-  td:           { padding:'10px 13px', whiteSpace:'nowrap', color:'#b8d4e8' },
-  tdBold:       { padding:'10px 13px', fontWeight:600, whiteSpace:'nowrap', color:'#e0f7ff' },
-  tdIndex:      { padding:'10px 13px', color:'#4a6a7d', width:'36px' },
-  tdDesc:       { padding:'10px 13px', color:'#7ab8d4', minWidth:'180px', wordBreak:'break-word' },
-  jsonBlock:    { background:'rgba(5,11,18,0.8)', padding:'13px', borderRadius:'8px', overflowX:'auto', fontSize:'0.78rem', color:'#67e8f9', margin:0, border:'1px solid rgba(0,229,255,0.07)' },
-  mapWrapper:   { width:'100%', borderRadius:'8px', overflow:'hidden', border:'1px solid rgba(0,229,255,0.15)', background:'#fff' },
-  iframe:       { width:'100%', height:'380px', border:'none', display:'block' },
+  card: { background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' },
+  cardTitle: { margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--ink)' },
+  label: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted)' },
+  input: { padding: '10px 13px', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-ui)' },
+  btn: { padding: '11px 20px', background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', border: '1px solid var(--slate-teal)', borderRadius: 'var(--radius-btn)', cursor: 'pointer', fontWeight: 700, fontSize: '13.5px', fontFamily: 'var(--font-ui)' },
+  error: { padding: '11px 15px', background: 'var(--watch-red-tint)', border: '1px solid var(--watch-red)', color: 'var(--watch-red-deep)', borderRadius: 'var(--radius-card)', fontSize: '13px' },
+  successBanner: { padding: '11px 15px', background: 'var(--slate-teal-tint)', border: '1px solid var(--slate-teal)', color: 'var(--slate-teal)', borderRadius: 'var(--radius-card)', fontWeight: 500, fontSize: '13px' },
+  badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '2px 9px', borderRadius: 'var(--radius-chip)', fontWeight: 600, fontSize: '11px', border: '1px solid transparent' },
+  tableWrap: { width: '100%', overflowX: 'auto', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)' },
+  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
+  th: { borderBottom: '1px solid var(--line)', padding: '9px 13px', background: 'var(--mist)', fontWeight: 700, color: 'var(--muted)', whiteSpace: 'nowrap', fontSize: '11px', textTransform: 'uppercase' },
+  tr: { borderBottom: '1px solid var(--line)' },
+  td: { padding: '9px 13px', whiteSpace: 'nowrap', color: 'var(--ink)' },
+  tdBold: { padding: '9px 13px', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--ink)' },
+  tdIndex: { padding: '9px 13px', color: 'var(--muted)', width: '36px' },
+  tdDesc: { padding: '9px 13px', color: 'var(--ink)', minWidth: '180px', wordBreak: 'break-word', whiteSpace: 'normal' },
+  jsonBlock: { background: 'var(--mist)', padding: '13px', borderRadius: 'var(--radius-card)', overflowX: 'auto', fontSize: '12px', color: 'var(--ink)', margin: 0, border: '1px solid var(--line)', fontFamily: 'var(--font-mono)' },
+  mapWrapper: { width: '100%', borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--paper)' },
+  iframe: { width: '100%', height: '380px', border: 'none', display: 'block' },
+};
+
+// Token-based panel for rail/drawer destinations.
+const P: Record<string, React.CSSProperties> = {
+  panel: { background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' },
+  h2: { margin: 0, fontSize: '19px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' },
+  metaCard: { background: 'var(--mist)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '10px 12px' },
+  mono: { fontFamily: 'var(--font-mono)' },
 };
 
 const riskStyle = (risk?: string): React.CSSProperties => {
   switch (String(risk ?? '').toUpperCase()) {
-    case 'HIGH':     return { background:'rgba(229,101,74,0.16)', color:'#f0a08c', borderColor:'rgba(229,101,74,0.35)' };
-    case 'MODERATE': return { background:'rgba(224,166,63,0.16)', color:'#f0cf8f', borderColor:'rgba(224,166,63,0.35)' };
-    case 'LOW':      return { background:'rgba(0,229,255,0.1)',   color:'#67e8f9', borderColor:'rgba(0,229,255,0.3)' };
-    default:         return { background:'rgba(154,164,182,0.16)',color:'#c3cad6', borderColor:'rgba(154,164,182,0.35)' };
+    case 'HIGH': return { background: 'var(--watch-red-tint)', color: 'var(--watch-red-deep)', borderColor: 'var(--watch-red)' };
+    case 'MODERATE': return { background: 'var(--watch-orange-tint)', color: 'var(--watch-orange-deep)', borderColor: 'var(--watch-orange)' };
+    case 'LOW': return { background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' };
+    default: return { background: 'var(--mist)', color: 'var(--muted)', borderColor: 'var(--line)' };
   }
 };
 
+// ─────────────────────────────────────────────────────────────────────
+// Structured answer extraction from the Java chat backend
+// ─────────────────────────────────────────────────────────────────────
+
+function toAnswerCard(d: any): ChatCard | null {
+  if (!d || typeof d !== 'object') return null;
+  const m = d.metrics ?? {};
+  const tempRaw = d.temperature ?? m.temperature;
+  const humRaw = d.humidity ?? m.humidity;
+  const rainRaw = d.precipitationProbability ?? d.precipitation ?? m.precipitationProbability ?? m.precipitation;
+  const windRaw = d.wind ?? m.wind;
+  const cond = d.condition ?? m.condition;
+
+  let figure: string | number;
+  let label: string;
+  if (tempRaw != null) { figure = typeof tempRaw === 'number' ? `${Math.round(tempRaw)}°C` : String(tempRaw); label = 'Temperature'; }
+  else if (humRaw != null) { figure = typeof humRaw === 'number' ? `${Math.round(humRaw)}%` : String(humRaw); label = 'Humidity'; }
+  else if (rainRaw != null) { figure = typeof rainRaw === 'number' ? `${Math.round(rainRaw)}%` : String(rainRaw); label = 'Rain probability'; }
+  else if (windRaw != null) { figure = typeof windRaw === 'number' ? `${Math.round(windRaw)} km/h` : String(windRaw); label = 'Wind'; }
+  else if (cond != null) { figure = String(cond); label = 'Current weather'; }
+  else return null;
+
+  const confidence: ChatCard['confidence'] = (() => {
+    const ca = d.modelAgreement ?? d.model_agreement;
+    if (ca && typeof ca === 'object') {
+      const percent =
+        typeof ca.percent === 'number' ? ca.percent :
+        typeof ca.percentage === 'number' ? ca.percentage : 0;
+      const members = typeof ca.members === 'number' ? ca.members : undefined;
+      const of = typeof ca.of === 'number' ? ca.of : typeof ca.total === 'number' ? ca.total : undefined;
+      return { percent, label: ca.label || ca.level || undefined, members, of };
+    }
+    if (typeof d.confidence === 'number') return { percent: d.confidence };
+    return undefined;
+  })();
+
+  const issuedAt = d.issuedAt ?? d.issueTime ?? d.issued ?? d.savedAt;
+  const source = d.source ?? d.dataSource ?? d.data_source;
+
+  return {
+    figure,
+    label,
+    body: d.description ?? undefined,
+    confidence,
+    issuedAt: issuedAt != null ? String(issuedAt) : undefined,
+    source: source != null ? String(source) : undefined,
+  };
+}
+
 // ─────────────────────────────────────────────────────────────────────
 // ClimateMapEmbed — OSM map inside climate panel
 // ─────────────────────────────────────────────────────────────────────
@@ -204,202 +341,51 @@ function ClimateMapEmbed({ city }: { city: string }) {
 
   useEffect(() => {
     if (!ref.current || mapRef.current) return;
-    if (!document.querySelector('link[href*="leaflet"]')) {
-      const link = document.createElement('link');
-      link.rel = 'stylesheet';
-      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
-      document.head.appendChild(link);
-    }
+    let cancelled = false;
     import('leaflet').then((L) => {
-      delete (L.Icon.Default.prototype as any)._getIconUrl;
-      L.Icon.Default.mergeOptions({
-        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
-        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
-        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
-      });
+      if (mapRef.current) return;
       fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
         .then(r => r.json())
         .then(data => {
+          if (cancelled || mapRef.current) return;
           const r = data.results?.[0];
           const lat = r?.latitude ?? 20.5937;
           const lng = r?.longitude ?? 78.9629;
-          if (mapRef.current) return;
-          const map = L.map(ref.current!, { center: [lat, lng], zoom: 7 });
-          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
+          const map = L.map(ref.current!, { center: [lat, lng], zoom: 7, scrollWheelZoom: false });
+          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; OpenStreetMap contributors', maxZoom: 18,
           }).addTo(map);
-          L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo',
-            { opacity: 0.45, attribution: 'Weather &copy; OpenWeatherMap' }).addTo(map);
-          L.marker([lat, lng]).addTo(map).bindPopup(`📍 ${city}`).openPopup();
+          const icon = L.divIcon({
+            className: '',
+            html: '<div class="map-loc-dot"></div>',
+            iconSize: [12, 12], iconAnchor: [6, 6],
+          });
+          L.marker([lat, lng], { icon }).addTo(map).bindPopup(city);
           mapRef.current = map;
-          setLoaded(true);
+          if (!cancelled) setLoaded(true);
         })
         .catch(() => {
-          if (mapRef.current) return;
-          const map = L.map(ref.current!, { center: [20.5937, 78.9629], zoom: 5 });
-          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
+          if (cancelled || mapRef.current) return;
+          const map = L.map(ref.current!, { center: [20.5937, 78.9629], zoom: 5, scrollWheelZoom: false });
+          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
           mapRef.current = map;
-          setLoaded(true);
+          if (!cancelled) setLoaded(true);
         });
     });
-    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
+    return () => {
+      cancelled = true;
+      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
+    };
   }, [city]);
 
   return (
-    <div style={{ position:'relative', height:'280px', width:'100%' }}>
+    <div style={{ position: 'relative', height: '280px', width: '100%' }}>
       {!loaded && (
-        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(5,11,18,0.8)', zIndex:10, color:'#7ab8d4', fontSize:'13px' }}>
+        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--mist)', zIndex: 10, color: 'var(--muted)', fontSize: '13px' }}>
           Loading map…
         </div>
       )}
-      <div ref={ref} style={{ width:'100%', height:'100%' }} />
-    </div>
-  );
-}
-
-// ─────────────────────────────────────────────────────────────────────
-// WeatherMapView — full-screen map page
-// ─────────────────────────────────────────────────────────────────────
-
-function WeatherMapView({ location }: { location: Coordinates | null }) {
-  const ref = useRef<HTMLDivElement>(null);
-  const mapRef = useRef<any>(null);
-  const markerRef = useRef<any>(null);
-  const [layer, setLayer] = useState<'standard'|'temperature'|'precipitation'|'wind'>('standard');
-
-  useEffect(() => {
-    if (!ref.current || mapRef.current) return;
-    if (!document.querySelector('link[href*="leaflet"]')) {
-      const link = document.createElement('link'); link.rel = 'stylesheet';
-      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
-      document.head.appendChild(link);
-    }
-    import('leaflet').then((L) => {
-      delete (L.Icon.Default.prototype as any)._getIconUrl;
-      L.Icon.Default.mergeOptions({
-        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
-        iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
-        shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
-      });
-      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
-      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors', maxZoom:18 }).addTo(map);
-      mapRef.current = map;
-      if (location) {
-        markerRef.current = L.marker([location.latitude, location.longitude])
-          .addTo(map).bindPopup(`📍 Your Location`).openPopup();
-      }
-    });
-    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
-  }, []);
-
-  useEffect(() => {
-    if (!mapRef.current || !location) return;
-    import('leaflet').then((L) => {
-      if (markerRef.current) markerRef.current.setLatLng([location.latitude, location.longitude]);
-      else markerRef.current = L.marker([location.latitude, location.longitude]).addTo(mapRef.current).bindPopup('📍 Your Location').openPopup();
-      mapRef.current.setView([location.latitude, location.longitude], 8);
-    });
-  }, [location]);
-
-  const switchLayer = (type: typeof layer) => {
-    setLayer(type);
-    if (!mapRef.current) return;
-    import('leaflet').then((L) => {
-      const map = mapRef.current;
-      map.eachLayer((l: any) => { if (l instanceof L.TileLayer) map.removeLayer(l); });
-      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors', maxZoom:18 }).addTo(map);
-      const overlays: Record<string,string> = {
-        temperature:   'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo',
-        precipitation: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
-        wind:          'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=demo',
-      };
-      if (type !== 'standard' && overlays[type])
-        L.tileLayer(overlays[type], { opacity:0.55, attribution:'Weather &copy; OpenWeatherMap' }).addTo(map);
-    });
-  };
-
-  const layers: {id: typeof layer; label: string; emoji: string}[] = [
-    {id:'standard',      label:'Standard',    emoji:'🗺️'},
-    {id:'temperature',   label:'Temperature', emoji:'🌡️'},
-    {id:'precipitation', label:'Rain',        emoji:'🌧️'},
-    {id:'wind',          label:'Wind',        emoji:'💨'},
-  ];
-
-  return (
-    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%' }}>
-      <div style={{ padding:'10px 16px', background:'var(--glass-bg)', borderBottom:'1px solid var(--glass-border)', display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap', flexShrink:0 }}>
-        <span style={{ fontSize:'12px', color:'var(--text-secondary)', fontWeight:600, marginRight:'4px' }}>Layer:</span>
-        {layers.map(b => (
-          <button key={b.id} onClick={() => switchLayer(b.id)} style={{
-            padding:'5px 12px', borderRadius:'20px', border:'1px solid',
-            borderColor: layer===b.id ? 'var(--accent-cyan)' : 'var(--glass-border)',
-            background:  layer===b.id ? 'var(--accent-cyan-dim)' : 'transparent',
-            color:       layer===b.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
-            fontSize:'12px', fontWeight:600, cursor:'pointer',
-          }}>{b.emoji} {b.label}</button>
-        ))}
-        {location && <span style={{ marginLeft:'auto', fontSize:'11px', color:'var(--text-muted)' }}>📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>}
-      </div>
-      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
-        <div ref={ref} style={{ width:'100%', height:'100%', background:'#071018' }} />
-      </div>
-    </div>
-  );
-}
-
-// ─────────────────────────────────────────────────────────────────────
-// InteractiveRadarView
-// ─────────────────────────────────────────────────────────────────────
-
-function InteractiveRadarView({ location }: { location: Coordinates | null }) {
-  const ref = useRef<HTMLDivElement>(null);
-  const mapRef = useRef<any>(null);
-
-  useEffect(() => {
-    if (!ref.current || mapRef.current) return;
-    if (!document.querySelector('link[href*="leaflet"]')) {
-      const link = document.createElement('link'); link.rel = 'stylesheet';
-      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
-      document.head.appendChild(link);
-    }
-    import('leaflet').then((L) => {
-      delete (L.Icon.Default.prototype as any)._getIconUrl;
-      L.Icon.Default.mergeOptions({
-        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
-        iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
-        shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
-      });
-      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
-      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
-        attribution:'&copy; OpenStreetMap, &copy; CARTO', maxZoom:18,
-      }).addTo(map);
-      L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
-        { opacity:0.65, attribution:'Weather &copy; OpenWeatherMap' }).addTo(map);
-      L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=demo',
-        { opacity:0.4, attribution:'Clouds &copy; OpenWeatherMap' }).addTo(map);
-      if (location) {
-        const icon = L.divIcon({
-          className:'',
-          html:`<div style="width:14px;height:14px;background:rgba(0,229,255,0.9);border-radius:50%;border:2px solid white;box-shadow:0 0 0 4px rgba(0,229,255,0.3)"></div>`,
-          iconSize:[14,14], iconAnchor:[7,7],
-        });
-        L.marker([location.latitude, location.longitude], { icon }).addTo(map).bindPopup('📍 Your Location');
-      }
-      mapRef.current = map;
-    });
-    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
-  }, []);
-
-  return (
-    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%' }}>
-      <div style={{ padding:'10px 16px', background:'var(--glass-bg)', borderBottom:'1px solid var(--glass-border)', display:'flex', gap:'12px', alignItems:'center', flexShrink:0 }}>
-        <Radar size={16} style={{ color:'var(--accent-cyan)' }} />
-        <span style={{ fontSize:'13px', fontWeight:700, color:'var(--text-primary)' }}>Live Precipitation & Cloud Radar</span>
-        <span style={{ fontSize:'11px', color:'var(--text-muted)', marginLeft:'auto' }}>OpenStreetMap + OpenWeatherMap tiles</span>
-      </div>
-      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
-        <div ref={ref} style={{ width:'100%', height:'100%', background:'#050b12' }} />
-      </div>
+      <div ref={ref} style={{ width: '100%', height: '100%' }} />
     </div>
   );
 }
@@ -409,116 +395,126 @@ function InteractiveRadarView({ location }: { location: Coordinates | null }) {
 // ─────────────────────────────────────────────────────────────────────
 
 function RouteWeatherView() {
-  const [form, setForm] = useState({ origin:'Delhi', destination:'Agra', departure_time:'08:00' });
+  // The route planner is a user-driven journey form: origin defaults to the
+  // currently selected location, but the fields stay freely editable (a route
+  // analysis is not the same thing as "the selected weather location").
+  const { location: currentLocation } = useLocation();
+  const [form, setForm] = useState({ origin: currentLocation.name || 'Delhi', destination: 'Agra', departure_time: '08:00' });
   const [loading, setLoading] = useState(false);
-  const [resp, setResp] = useState<RouteApiResponse|null>(null);
-  const [err, setErr] = useState<string|null>(null);
+  const [resp, setResp] = useState<RouteApiResponse | null>(null);
+  const [err, setErr] = useState<string | null>(null);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault(); setLoading(true); setErr(null); setResp(null);
     try {
-      const res = await fetch(ML_ROUTE_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
+      const res = await fetch(ML_ROUTE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
       if (!res.ok) throw new Error(`Error ${res.status} - ${res.statusText}`);
       setResp(await res.json());
     } catch (e: any) { setErr(e.message || 'Failed to fetch route weather.'); }
     finally { setLoading(false); }
   };
 
+  const riskBoxes: { key: string; fg: string; bg: string; border: string }[] = [
+    { key: 'HIGH', fg: 'var(--watch-red-deep)', bg: 'var(--watch-red-tint)', border: 'var(--watch-red)' },
+    { key: 'MODERATE', fg: 'var(--watch-orange-deep)', bg: 'var(--watch-orange-tint)', border: 'var(--watch-orange)' },
+    { key: 'LOW', fg: 'var(--slate-teal)', bg: 'var(--slate-teal-tint)', border: 'var(--slate-teal)' },
+  ];
+
   return (
-    <div style={S.scrollWrap}>
-      <div style={S.container}>
-        <header>
-          <h2 style={{ margin:0, fontSize:'1.35rem', fontWeight:700, color:'var(--text-primary)' }}>Route weather analyzer</h2>
-          <p style={{ margin:'4px 0 0', fontSize:'0.85rem', color:'var(--text-muted)' }}>Check conditions and risk along a journey, point by point.</p>
-        </header>
+    <div style={S.card}>
+      <header>
+        <h2 style={P.h2}>Route weather analyzer</h2>
+        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Check conditions and risk along a journey, point by point.</p>
+      </header>
 
-        <form onSubmit={handleSubmit} style={{ ...S.card, display:'flex', flexDirection:'column', gap:'14px' }}>
-          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'14px' }}>
-            {(['origin','destination'] as const).map(field => (
-              <div key={field} style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
-                <label style={S.label}>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
-                <input style={S.input} type="text" name={field} value={form[field]}
-                  onChange={e => setForm({...form, [field]:e.target.value})} required
-                  placeholder={field==='origin' ? 'e.g. Delhi' : 'e.g. Agra'} />
-              </div>
-            ))}
-            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
-              <label style={S.label}>Departure time</label>
-              <input style={S.input} type="time" name="departure_time" value={form.departure_time}
-                onChange={e => setForm({...form, departure_time:e.target.value})} required />
+      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
+        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
+          {(['origin', 'destination'] as const).map(field => (
+            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
+              <label style={S.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
+              <input style={S.input} type="text" name={field} value={form[field]}
+                onChange={e => setForm({ ...form, [field]: e.target.value })} required
+                placeholder={field === 'origin' ? 'e.g. Delhi' : 'e.g. Agra'} />
             </div>
+          ))}
+          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
+            <label style={S.label}>Departure time</label>
+            <input style={S.input} type="time" name="departure_time" value={form.departure_time}
+              onChange={e => setForm({ ...form, departure_time: e.target.value })} required />
           </div>
-          <button type="submit" disabled={loading} style={S.btn}>{loading ? 'Analyzing route…' : 'Analyze route'}</button>
-        </form>
+        </div>
+        <button type="submit" disabled={loading} style={S.btn}>{loading ? 'Analyzing route…' : 'Analyze route'}</button>
+      </form>
 
-        {err && <div style={S.error}>{err}</div>}
+      {err && <div style={S.error}>{err}</div>}
 
-        {resp && (
-          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
-            {resp.message && <div style={S.successBanner}>{resp.message}</div>}
+      {resp && (
+        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
+          {resp.message && <div style={S.successBanner}>{resp.message}</div>}
 
-            {resp.risk_summary && (
-              <div style={S.card}>
-                <h3 style={S.cardTitle}>Risk summary</h3>
-                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'10px' }}>
-                  {([['HIGH','#f0a08c','rgba(229,101,74,0.3)'],['MODERATE','#f0cf8f','rgba(224,166,63,0.3)'],['LOW','#67e8f9','rgba(0,229,255,0.3)']] as const).map(([key,color,bc]) => (
-                    <div key={key} style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'14px', borderRadius:'8px', background:'rgba(5,11,18,0.8)', border:`1px solid ${bc}` }}>
-                      <span style={{ fontSize:'1.6rem', fontWeight:700, color }}>{(resp.risk_summary as any)[key] ?? 0}</span>
-                      <span style={{ fontSize:'0.7rem', color:'var(--text-muted)', marginTop:'4px' }}>{key.charAt(0)+key.slice(1).toLowerCase()}-risk waypoints</span>
-                    </div>
-                  ))}
-                </div>
-              </div>
-            )}
-
-            {resp.weather_data && (
-              <div style={S.card}>
-                <h3 style={S.cardTitle}>Waypoint forecasts</h3>
-                {Array.isArray(resp.weather_data) ? (
-                  <div style={S.tableWrap}>
-                    <table style={S.table}>
-                      <thead><tr>
-                        {['#','Point','Condition','Temp','Risk','Details'].map(h => <th key={h} style={S.th}>{h}</th>)}
-                      </tr></thead>
-                      <tbody>
-                        {resp.weather_data.map((item: WeatherPoint, i: number) => {
-                          const name   = item.location || item.point || item.name || `Point ${i+1}`;
-                          const cond   = item.weather || item.condition || item.sky || '—';
-                          const temp   = (item.temp ?? item.temperature) !== undefined ? `${item.temp ?? item.temperature}°C` : '—';
-                          const risk   = item.risk || item.risk_level || 'NORMAL';
-                          const detail = item.description || item.notes || item.summary ||
-                            Object.entries(item).filter(([k]) => !['location','point','weather','condition','temp','temperature','risk','risk_level'].includes(k)).map(([k,v]) => `${k}: ${v}`).join(', ');
-                          return (
-                            <tr key={i} style={S.tr}>
-                              <td style={S.tdIndex}>{i+1}</td>
-                              <td style={S.tdBold}>{name}</td>
-                              <td style={S.td}>{cond}</td>
-                              <td style={S.td}>{temp}</td>
-                              <td style={S.td}><span style={{...S.badge,...riskStyle(risk)}}>{risk.toUpperCase()}</span></td>
-                              <td style={S.tdDesc}>{detail || '—'}</td>
-                            </tr>
-                          );
-                        })}
-                      </tbody>
-                    </table>
+          {resp.risk_summary && (
+            <div style={S.card}>
+              <h3 style={S.cardTitle}>Risk summary</h3>
+              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '10px' }}>
+                {riskBoxes.map(({ key, fg, bg, border }) => (
+                  <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px', borderRadius: 'var(--radius-card)', background: bg, border: `1px solid ${border}` }}>
+                    <span style={{ fontSize: '1.6rem', fontWeight: 700, color: fg, fontVariantNumeric: 'tabular-nums' }}>{(resp.risk_summary as any)[key] ?? 0}</span>
+                    <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{key.charAt(0) + key.slice(1).toLowerCase()}-risk waypoints</span>
                   </div>
-                ) : (
-                  <pre style={S.jsonBlock}>{JSON.stringify(resp.weather_data, null, 2)}</pre>
-                )}
+                ))}
               </div>
-            )}
+            </div>
+          )}
 
-            {resp.index_html && (
-              <div style={S.card}>
-                <h3 style={S.cardTitle}>Route map</h3>
-                <div style={S.mapWrapper}>
-                  <iframe title="Route map" srcDoc={resp.index_html} style={S.iframe} />
+          {resp.weather_data && (
+            <div style={S.card}>
+              <h3 style={S.cardTitle}>Waypoint forecasts</h3>
+              {Array.isArray(resp.weather_data) ? (
+                <div style={S.tableWrap}>
+                  <table style={S.table}>
+                    <thead><tr>
+                      {['#', 'Point', 'Condition', 'Temp', 'Risk', 'Details'].map(h => <th key={h} style={S.th}>{h}</th>)}
+                    </tr></thead>
+                    <tbody>
+                      {resp.weather_data.map((item: WeatherPoint, i: number) => {
+                        const name = item.location || item.point || item.name || `Point ${i + 1}`;
+                        const cond = item.weather || item.condition || item.sky || 'n/a';
+                        const temp = (item.temp ?? item.temperature) !== undefined ? `${item.temp ?? item.temperature}°C` : 'n/a';
+                        const risk = item.risk || item.risk_level || 'NORMAL';
+                        const detail = item.description || item.notes || item.summary ||
+                          Object.entries(item)
+                            .filter(([k]) => !['location', 'point', 'weather', 'condition', 'temp', 'temperature', 'risk', 'risk_level'].includes(k))
+                            .map(([k, v]) => `${k}: ${v}`).join(', ');
+                        return (
+                          <tr key={i} style={S.tr}>
+                            <td style={S.tdIndex}>{i + 1}</td>
+                            <td style={S.tdBold}>{name}</td>
+                            <td style={S.td}>{cond}</td>
+                            <td style={S.td}>{temp}</td>
+                            <td style={S.td}><span style={{ ...S.badge, ...riskStyle(risk) }}>{risk.toUpperCase()}</span></td>
+                            <td style={S.tdDesc}>{detail || 'n/a'}</td>
+                          </tr>
+                        );
+                      })}
+                    </tbody>
+                  </table>
                 </div>
+              ) : (
+                <pre style={S.jsonBlock}>{JSON.stringify(resp.weather_data, null, 2)}</pre>
+              )}
+            </div>
+          )}
+
+          {resp.index_html && (
+            <div style={S.card}>
+              <h3 style={S.cardTitle}>Route map</h3>
+              <div style={S.mapWrapper}>
+                <iframe title="Route map" srcDoc={resp.index_html} style={S.iframe} />
               </div>
-            )}
-          </div>
-        )}
-      </div>
+            </div>
+          )}
+        </div>
+      )}
     </div>
   );
 }
@@ -527,13 +523,16 @@ function RouteWeatherView() {
 // WeatherReportView (offline-capable)
 // ─────────────────────────────────────────────────────────────────────
 
-function WeatherReportView({ location }: { location: Coordinates | null }) {
+function WeatherReportView() {
+  const { location, setLocation } = useLocation();
   const [cityInput, setCityInput] = useState('');
-  const [record, setRecord] = useState<ForecastRecord|null>(loadCachedForecast);
+  const [record, setRecord] = useState<ForecastRecord | null>(() =>
+    loadCachedForecast(location.latitude, location.longitude),
+  );
   const [loading, setLoading] = useState(false);
-  const [banner, setBanner] = useState<{tone:'error'|'info';text:string}|null>(null);
+  const [banner, setBanner] = useState<{ tone: 'error' | 'info'; text: string } | null>(null);
   const [online, setOnline] = useState(navigator.onLine);
-  const autoRef = useRef(false);
+  const lastKeyRef = useRef('');
 
   useEffect(() => {
     const on = () => setOnline(true), off = () => setOnline(false);
@@ -541,766 +540,707 @@ function WeatherReportView({ location }: { location: Coordinates | null }) {
     return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
   }, []);
 
+  // Follows the canonical location: show the per-location offline cache, or
+  // fetch the forecast for exactly these coordinates.
   useEffect(() => {
-    if (autoRef.current || record || !location) return;
-    autoRef.current = true;
+    const { latitude, longitude, name, source } = location;
+    const key = `${latitude},${longitude}`;
+    const cached = loadCachedForecast(latitude, longitude);
+    if (cached) {
+      setRecord(cached);
+      lastKeyRef.current = key;
+      return;
+    }
+    // Never keep another place's forecast on screen while this one loads.
+    if (lastKeyRef.current !== key) setRecord(null);
+    lastKeyRef.current = key;
+    let cancelled = false;
+    setLoading(true);
+    setBanner(null);
     (async () => {
-      setLoading(true);
       try {
-        const name = await reverseGeocodeForReport(location.latitude, location.longitude);
-        const r = await fetchForecastRecord({ latitude:location.latitude, longitude:location.longitude, name });
-        saveForecast(r); setRecord(r);
-      } catch { /* silent */ } finally { setLoading(false); }
+        const label = source !== 'default' && name ? name : await reverseGeocodeLabel(latitude, longitude);
+        const r = await fetchForecastRecord({ latitude, longitude, name: label });
+        if (!cancelled) { saveForecast(r, latitude, longitude); setRecord(r); }
+      } catch {
+        if (!cancelled) setBanner({ tone: 'error', text: 'Weather data unavailable for this location.' });
+      } finally { if (!cancelled) setLoading(false); }
     })();
-  }, [location, record]);
+    return () => { cancelled = true; };
+  }, [location]);
 
   const search = async (override?: string) => {
     const city = (override ?? cityInput).trim();
-    if (!city) { setBanner({tone:'error', text:'Enter a city.'}); return; }
+    if (!city) { setBanner({ tone: 'error', text: 'Enter a city.' }); return; }
     if (!online) {
-      if (record) setBanner({tone:'info', text:'Offline — showing cached forecast.'});
-      else setBanner({tone:'error', text:'Offline and no cached forecast.'});
+      if (record) setBanner({ tone: 'info', text: 'Offline. Showing cached forecast.' });
+      else setBanner({ tone: 'error', text: 'Offline and no cached forecast.' });
       return;
     }
     setLoading(true); setBanner(null);
     try {
       const place = await geocodeCity(city);
-      const r = await fetchForecastRecord(place);
-      saveForecast(r); setRecord(r);
+      // Search selects the canonical location: every location-aware feature
+      // (map, radar, warnings, chat context) now follows the searched city.
+      setLocation({ latitude: place.latitude, longitude: place.longitude, name: place.name, country: place.country, source: 'search' });
+      setCityInput('');
+      setLoading(false); // same-coords search won't re-trigger the location effect
     } catch (e: any) {
-      if (record) setBanner({tone:'info', text:`${e.message} Showing cached forecast.`});
-      else setBanner({tone:'error', text:e.message});
-    } finally { setLoading(false); }
+      if (record) setBanner({ tone: 'info', text: `${e.message} Showing cached forecast.` });
+      else setBanner({ tone: 'error', text: e.message });
+      setLoading(false);
+    }
   };
 
-  return (
-    <div style={S.scrollWrap}>
-      <div style={S.container}>
-        <header>
-          <h2 style={{ margin:0, fontSize:'1.35rem', fontWeight:700, color:'var(--text-primary)' }}>Weather report</h2>
-          <p style={{ margin:'4px 0 0', fontSize:'0.85rem', color:'var(--text-muted)' }}>Search any city. Forecast cached for offline use.</p>
-        </header>
+  const fmtTime = (t: string) => new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
+  const fmtDay = (t: string) => new Date(t).toLocaleDateString([], { weekday: 'long' });
 
-        <div style={{ display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap' }}>
-          <span style={{ padding:'6px 12px', borderRadius:'20px', fontSize:'0.78rem', fontWeight:600, border:'1px solid var(--glass-border)', color: online ? 'var(--accent-cyan)' : '#f87171' }}>
-            {online ? '🟢 Online' : '🔴 Offline'}
-          </span>
-          <input style={{...S.input, flex:1}} type="text" value={cityInput}
-            onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key==='Enter' && search()}
-            placeholder="Enter city e.g. Delhi" />
-          <button onClick={() => search()} disabled={loading}
-            style={{ padding:'10px 20px', background:'linear-gradient(120deg,#00c8ff 0%,#0078ff 100%)', color:'#050b12', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:700, fontSize:'0.88rem', whiteSpace:'nowrap' }}>
-            {loading ? 'Loading…' : 'Get weather'}
-          </button>
+  return (
+    <div style={S.card}>
+      <header>
+        <h2 style={P.h2}>Weather report</h2>
+        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Search any city. Forecast is cached for offline use.</p>
+      </header>
+
+      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
+        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: 'var(--radius-btn)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--line)', color: online ? 'var(--slate-teal)' : 'var(--muted)' }}>
+          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: online ? 'var(--slate-teal)' : 'var(--muted)' }} />
+          {online ? 'Online' : 'Offline'}
+        </span>
+        <input style={{ ...S.input, flex: 1, minWidth: '180px' }} type="text" value={cityInput}
+          onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()}
+          placeholder="Enter city, e.g. Delhi" />
+        <button onClick={() => search()} disabled={loading}
+          style={S.btn}>
+          {loading ? 'Loading…' : 'Get weather'}
+        </button>
+      </div>
+
+      {banner && <div style={banner.tone === 'error' ? S.error : S.successBanner}>{banner.text}</div>}
+
+      {!record && !loading && (
+        <div style={S.card}><p style={{ margin: 0, color: 'var(--muted)', fontSize: '13px' }}>Search a city to load a forecast.</p></div>
+      )}
+
+      {record && (<>
+        <div style={S.card}>
+          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
+            <div>
+              <h3 style={{ ...S.cardTitle, marginBottom: 2 }}>{record.location.name}{record.location.country ? `, ${record.location.country}` : ''}</h3>
+              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Updated {new Date(record.savedAt).toLocaleString()}</p>
+            </div>
+            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-teal)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(record.hourly24h.temperature[0])}°C</div>
+          </div>
+          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--ink)' }}>
+            <span>{wmoDesc(record.hourly24h.weatherCode[0])}</span>
+            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Droplets size={14} style={{ color: 'var(--slate-teal)' }} /> {record.hourly24h.humidity[0]}%</span>
+            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Wind size={14} style={{ color: 'var(--slate-teal)' }} /> {record.hourly24h.wind[0]} km/h</span>
+          </div>
         </div>
 
-        {banner && <div style={banner.tone==='error' ? S.error : S.successBanner}>{banner.text}</div>}
-
-        {!record && !loading && (
-          <div style={S.card}><p style={{ margin:0, color:'var(--text-muted)', fontSize:'0.88rem' }}>Search a city to load forecast.</p></div>
-        )}
-
-        {record && (<>
-          <div style={S.card}>
-            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'10px' }}>
-              <div>
-                <h3 style={{ ...S.cardTitle, marginBottom:'2px' }}>{record.location.name}{record.location.country ? `, ${record.location.country}` : ''}</h3>
-                <p style={{ margin:0, fontSize:'0.78rem', color:'var(--text-muted)' }}>Last updated: {new Date(record.savedAt).toLocaleString()}</p>
+        <div style={S.card}>
+          <h3 style={S.cardTitle}>24-hour forecast</h3>
+          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
+            {record.hourly24h.time.map((t, i) => (
+              <div key={t} style={{ flex: '0 0 auto', minWidth: '108px', padding: '12px', borderRadius: 'var(--radius-card)', background: 'var(--mist)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
+                <div style={{ fontSize: '11px', color: 'var(--slate-teal)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{fmtTime(t)}</div>
+                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(record.hourly24h.temperature[i])}°C</div>
+                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{wmoDesc(record.hourly24h.weatherCode[i])}</div>
+                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Droplets size={12} /> {record.hourly24h.humidity[i]}%</div>
+                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><CloudRain size={12} /> {record.hourly24h.precipitationProbability[i]}%</div>
+                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Wind size={12} /> {record.hourly24h.wind[i]} km/h</div>
               </div>
-              <div style={{ fontSize:'2.2rem', fontWeight:800, color:'var(--accent-cyan)' }}>{Math.round(record.hourly24h.temperature[0])}°C</div>
-            </div>
-            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', marginTop:'12px', fontSize:'0.85rem', color:'var(--text-secondary)' }}>
-              <span>{wmoDesc(record.hourly24h.weatherCode[0])}</span>
-              <span>💧 {record.hourly24h.humidity[0]}%</span>
-              <span>💨 {record.hourly24h.wind[0]} km/h</span>
-            </div>
+            ))}
           </div>
+        </div>
 
-          <div style={S.card}>
-            <h3 style={S.cardTitle}>24-hour forecast</h3>
-            <div style={{ display:'flex', gap:'10px', overflowX:'auto', paddingBottom:'4px' }}>
-              {record.hourly24h.time.map((t,i) => (
-                <div key={t} style={{ flex:'0 0 auto', minWidth:'108px', padding:'12px', borderRadius:'10px', background:'rgba(5,11,18,0.8)', border:'1px solid rgba(0,229,255,0.1)', display:'flex', flexDirection:'column', gap:'4px' }}>
-                  <div style={{ fontSize:'0.78rem', color:'var(--accent-cyan)', fontWeight:600 }}>{new Date(t).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}</div>
-                  <div style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--text-primary)' }}>{Math.round(record.hourly24h.temperature[i])}°C</div>
-                  <div style={{ fontSize:'0.75rem', color:'var(--text-secondary)' }}>{wmoDesc(record.hourly24h.weatherCode[i])}</div>
-                  <div style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>💧 {record.hourly24h.humidity[i]}%</div>
-                  <div style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>🌧️ {record.hourly24h.precipitationProbability[i]}%</div>
-                  <div style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>💨 {record.hourly24h.wind[i]} km/h</div>
-                </div>
-              ))}
-            </div>
+        <div style={S.card}>
+          <h3 style={S.cardTitle}>7-day forecast</h3>
+          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '10px' }}>
+            {record.daily7days.time.map((t, i) => (
+              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px', borderRadius: 'var(--radius-card)', background: 'var(--mist)', border: '1px solid var(--line)' }}>
+                <strong style={{ color: 'var(--ink)', fontSize: '13px' }}>{fmtDay(t)}</strong>
+                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{wmoDesc(record.daily7days.weatherCode[i])}</span>
+                <span style={{ fontSize: '12px', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '4px' }}><Thermometer size={12} style={{ color: 'var(--slate-teal)' }} /> {Math.round(record.daily7days.maxTemperature[i])}° / {Math.round(record.daily7days.minTemperature[i])}°</span>
+                <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><CloudRain size={12} /> {record.daily7days.precipitationProbability[i]}%</span>
+              </div>
+            ))}
           </div>
-
-          <div style={S.card}>
-            <h3 style={S.cardTitle}>7-day forecast</h3>
-            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'10px' }}>
-              {record.daily7days.time.map((t,i) => (
-                <div key={t} style={{ display:'flex', flexDirection:'column', gap:'4px', padding:'14px', borderRadius:'10px', background:'rgba(5,11,18,0.8)', border:'1px solid rgba(0,229,255,0.1)' }}>
-                  <strong style={{ color:'var(--text-primary)', fontSize:'0.82rem' }}>{new Date(t).toLocaleDateString([],{weekday:'long'})}</strong>
-                  <span style={{ fontSize:'0.8rem', color:'var(--text-secondary)' }}>{wmoDesc(record.daily7days.weatherCode[i])}</span>
-                  <span style={{ fontSize:'0.8rem', color:'var(--text-secondary)' }}>🌡️ {Math.round(record.daily7days.maxTemperature[i])}° / {Math.round(record.daily7days.minTemperature[i])}°</span>
-                  <span style={{ fontSize:'0.8rem', color:'var(--text-muted)' }}>🌧️ {record.daily7days.precipitationProbability[i]}%</span>
-                </div>
-              ))}
-            </div>
-          </div>
-        </>)}
-      </div>
+        </div>
+      </>)}
     </div>
   );
 }
 
 // ─────────────────────────────────────────────────────────────────────
-// AIChatView — powered by Python ML backend (Ollama/LangChain)
-// ─────────────────────────────────────────────────────────────────────
-
-const AI_SUGGESTIONS = [
-  { title:"Today's weather", text:"What's the current weather at my location?" },
-  { title:"Rain forecast",   text:"Will it rain in the next 24 hours?" },
-  { title:"Heat advisory",   text:"Is there a heatwave warning for Delhi?" },
-  { title:"Crop advisory",   text:"Should farmers in Punjab irrigate tomorrow?" },
-];
-
-function AIChatView({ location }: { location: Coordinates | null }) {
-  const [messages, setMessages] = useState<AiMessage[]>([]);
-  const [input, setInput] = useState('');
-  const [loading, setLoading] = useState(false);
-  const textareaRef = useRef<HTMLTextAreaElement>(null);
-  const endRef = useRef<HTMLDivElement>(null);
-
-  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, loading]);
-  useEffect(() => { textareaRef.current?.focus(); }, []);
-
-  const send = async (override?: string) => {
-    const prompt = (override ?? input).trim();
-    if (!prompt || loading) return;
-    setMessages(p => [...p, { role:'user', content:prompt }]);
-    setInput(''); setLoading(true);
-    if (textareaRef.current) textareaRef.current.style.height = 'auto';
-    try {
-      const res = await fetch(ML_AGENT_ENDPOINT, {
-        method:'POST', headers:{'Content-Type':'application/json'},
-        body: JSON.stringify({
-          prompt,
-          location: location ? { latitude:location.latitude, longitude:location.longitude, accuracy:location.accuracy } : null,
-        }),
-      });
-      if (!res.ok) throw new Error(`Status ${res.status}`);
-      const d = await res.json();
-      setMessages(p => [...p, { role:'assistant', content:d.message }]);
-    } catch {
-      setMessages(p => [...p, { role:'assistant', content:"⚠️ The AI service is temporarily unavailable. Please try again." }]);
-    } finally { setLoading(false); }
-  };
-
-  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
-    if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(); }
-  };
-
-  return (
-    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%', overflow:'hidden' }}>
-      {/* Chat body */}
-      <div style={{ flex:1, overflowY:'auto', padding:'24px 20px 12px' }}>
-        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
-          {messages.length === 0 && (
-            <div style={{ paddingTop:'6vh' }}>
-              <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:'var(--accent-cyan-dim)', border:'1px solid var(--accent-cyan)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px' }}>
-                <Cloud size={22} style={{ color:'var(--accent-cyan)' }} />
-              </div>
-              <h2 style={{ margin:'0 0 24px', fontSize:'clamp(20px,4vw,28px)', fontWeight:700, color:'var(--text-primary)', letterSpacing:'-0.4px', lineHeight:1.25 }}>
-                Where would you like weather updates for today?
-              </h2>
-              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'10px' }}>
-                {AI_SUGGESTIONS.map((s,i) => (
-                  <button key={i} onClick={() => send(s.text)} style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'12px', minHeight:'88px', padding:'14px', textAlign:'left', background:'var(--glass-bg)', borderRadius:'12px', border:'1px solid var(--glass-border)', cursor:'pointer', transition:'border-color 0.15s' }}>
-                    <p style={{ margin:0, fontSize:'13px', fontWeight:500, color:'var(--text-primary)', lineHeight:1.4 }}>{s.text}</p>
-                    <span style={{ fontSize:'11px', color:'var(--text-muted)' }}>{s.title}</span>
-                  </button>
-                ))}
-              </div>
-            </div>
-          )}
-
-          {messages.length > 0 && (
-            <div style={{ display:'flex', flexDirection:'column', gap:'18px', paddingBottom:'8px' }}>
-              {messages.map((m,i) => (
-                <div key={i} style={{ display:'flex', gap:'10px', justifyContent:m.role==='user'?'flex-end':'flex-start', alignItems:'flex-start' }}>
-                  {m.role==='assistant' && (
-                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'var(--accent-cyan)' }}>
-                      <Cloud size={14} />
-                    </div>
-                  )}
-                  <div style={{ maxWidth:'min(78%,720px)' }}>
-                    {m.role==='user' ? (
-                      <div style={{ background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', color:'var(--text-primary)', padding:'10px 15px', borderRadius:'16px', borderTopRightRadius:'4px', fontSize:'14px', lineHeight:1.55 }}>
-                        <p style={{ margin:0, whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{m.content}</p>
-                      </div>
-                    ) : (
-                      <div style={{ background:'var(--glass-bg)', border:'1px solid var(--glass-border)', padding:'12px 15px', borderRadius:'16px', borderTopLeftRadius:'4px', color:'var(--text-primary)', fontSize:'14px', lineHeight:1.65 }}>
-                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
-                      </div>
-                    )}
-                  </div>
-                  {m.role==='user' && (
-                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'var(--glass-bg-strong)', color:'var(--text-secondary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:600, flexShrink:0 }}>U</div>
-                  )}
-                </div>
-              ))}
-              {loading && (
-                <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
-                  <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-cyan)' }}>
-                    <Cloud size={14} />
-                  </div>
-                  <div style={{ width:'110px', height:'11px', borderRadius:'6px', background:'linear-gradient(90deg,var(--glass-bg) 25%,var(--glass-bg-strong) 50%,var(--glass-bg) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite' }} />
-                </div>
-              )}
-              <div ref={endRef} />
-            </div>
-          )}
-        </div>
-      </div>
-
-      {/* Input */}
-      <div style={{ padding:'10px 20px 16px', maxWidth:'860px', width:'100%', margin:'0 auto', boxSizing:'border-box', flexShrink:0 }}>
-        <div style={{ borderRadius:'24px', padding:'1px', background:'var(--glass-border)', transition:'background 0.2s' }}>
-          <div style={{ display:'flex', alignItems:'flex-end', background:'var(--glass-bg)', borderRadius:'23px', padding:'6px 6px 6px 18px' }}>
-            <textarea ref={textareaRef} value={input} onChange={e => { setInput(e.target.value); const t=e.target; t.style.height='auto'; t.style.height=`${Math.min(t.scrollHeight,120)}px`; }}
-              onKeyDown={handleKey} disabled={loading} rows={1} placeholder="Ask WeatherGPT (AI-powered)…"
-              style={{ width:'100%', background:'transparent', border:'none', outline:'none', padding:'9px 0', fontSize:'16px', color:'var(--text-primary)', resize:'none', maxHeight:'120px', fontFamily:'inherit', lineHeight:1.4 }} />
-            <button onClick={() => send()} disabled={!input.trim()||loading}
-              style={{ width:'34px', height:'34px', borderRadius:'50%', background: (!input.trim()||loading) ? 'var(--glass-bg-strong)' : 'linear-gradient(120deg,var(--accent-cyan) 0%,var(--accent-blue) 100%)', color: (!input.trim()||loading) ? 'var(--text-muted)' : '#050b12', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor: (!input.trim()||loading) ? 'not-allowed' : 'pointer', flexShrink:0 }}>
-              <Send size={14} />
-            </button>
-          </div>
-        </div>
-        <p style={{ fontSize:'10.5px', textAlign:'center', color:'var(--text-muted)', margin:'8px 0 0' }}>
-          Powered by OpenRouter + LangChain · answers are grounded in live weather data
-        </p>
-      </div>
-    </div>
-  );
-}
-
-// ─────────────────────────────────────────────────────────────────────
-// Root App component
+// Root App component — chat-first layout
 // ─────────────────────────────────────────────────────────────────────
 
 export default function App() {
-  // ── Java-backend chat / nav state ──
-  const [mobileChatOpen, setMobileChatOpen] = useState(false);
-  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
-  const [activeNav, setActiveNav] = useState<NavPage>('aichat');
-  const [selectedLang, setSelectedLang] = useState('en');
-  const [currentCity, setCurrentCity] = useState('Delhi');
-  const [gpsCoords, setGpsCoords] = useState<Coordinates|null>(null);
-  const [gpsWatching, setGpsWatching] = useState(false);
-  const [gpsWatchId, setGpsWatchId] = useState<number|null>(null);
+  const { theme, toggleTheme } = useTheme();
 
-  // ── Java-backend data state ──
-  const [messages, setMessages] = useState<{id:string;role:MessageRole;content:string;voiceAnswer?:string}[]>([{
-    id:'1', role:'bot',
-    content:"👋 Hello! I'm **WeatherGPT**, your AI meteorological assistant aligned with MoES / IMD.\n\nAsk me about live forecasts, crop advisories, NWP models or climate trends!",
-  }]);
+  // ── Navigation: chat is the primary view; rail/drawer hold the rest ──
+  const [activePage, setActivePage] = useState<NavPage | null>(null);
+  const [drawerOpen, setDrawerOpen] = useState(false);
+
+  // ── Chat state ──
+  const [messages, setMessages] = useState<ChatMessage[]>(IS_DEMO ? DEMO_MESSAGES : []);
   const [input, setInput] = useState('');
   const [isLoading, setIsLoading] = useState(false);
-  const [sectorLoading, setSectorLoading] = useState(false);
   const [voiceEnabled, setVoiceEnabled] = useState(false);
+  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('en');
+  // One canonical selected location: the header pill, GPS, search, map taps,
+  // chat resolutions and every data fetch all read/write this single state.
+  const { location, setLocation, locationKey } = useLocation();
+
+  // ── Java-backend data state (rail/drawer pages) ──
   const [forecastList, setForecastList] = useState<any[]>([]);
   const [nwpComparison, setNwpComparison] = useState<any>(null);
   const [sectorAdvisory, setSectorAdvisory] = useState<any>(null);
-  const [activeSector, setActiveSector] = useState<'agriculture'|'aviation'|'marine'|'urban'>('agriculture');
+  const [activeSector, setActiveSector] = useState<'agriculture' | 'aviation' | 'marine' | 'urban'>('agriculture');
   const [alertsList, setAlertsList] = useState<any[]>([]);
   const [climateInfo, setClimateInfo] = useState<any>(null);
-  const [isSpeakingId, setIsSpeakingId] = useState<string|null>(null);
-
-  // ── ML-backend / location state ──
-  const [gpsLocation, setGpsLocation] = useState<Coordinates|null>(null);
-  const [locationStatus, setLocationStatus] = useState<LocationStatus>('pending');
+  const [sectorLoading, setSectorLoading] = useState(false);
 
+  const loadedPagesRef = useRef<Set<NavPage>>(new Set());
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);
-  const activeLangObj = LANGUAGES.find(l => l.code===selectedLang) ?? LANGUAGES[0];
 
-  // ── Voice ──
-  const { status:sttStatus, isSupported:sttSupported, startListening, stopListening } = useVoiceInput({
-    lang: activeLangObj.speechLocale,
-    onTranscript: (text) => { if (text) setInput(text); },
-    onError: (err) => console.error('Voice error:', err),
-  });
-  const { speak, stop:stopSpeech, isSpeaking } = useVoiceOutput();
+  const copy = COPY[selectedLang];
+  const locale = speechLocale(selectedLang);
+
+  const { speak, stop: stopSpeech } = useVoiceOutput();
+
+  // ── Geolocation feeds the one canonical location ──
+  // Auto-fill runs only when nothing has been chosen yet (default source), so
+  // a saved choice or a deep link is never silently overridden (§7).
+  const gpsToCanonical = useCallback((coords: { latitude: number; longitude: number }) => {
+    setLocation({ latitude: coords.latitude, longitude: coords.longitude, source: 'gps' });
+    void reverseGeocodeLabel(coords.latitude, coords.longitude).then((name) => {
+      if (name === 'Selected point') return;
+      // Only fill the name if the user hasn't already moved to another place.
+      setLocation((prev) => (prev.latitude === coords.latitude && prev.longitude === coords.longitude ? { name } : {}));
+    });
+  }, [setLocation]);
 
-  // ── GPS (for map/radar pages) ──
   const requestLocation = useCallback(() => {
-    if (!('geolocation' in navigator)) { setLocationStatus('unsupported'); return; }
-    setLocationStatus('pending');
+    if (!('geolocation' in navigator)) return;
+    if (location.source !== 'default') return;
     navigator.geolocation.getCurrentPosition(
-      p => { setGpsLocation({ latitude:p.coords.latitude, longitude:p.coords.longitude, accuracy:p.coords.accuracy }); setLocationStatus('granted'); },
-      () => { setGpsLocation(null); setLocationStatus('denied'); },
-      { enableHighAccuracy:false, timeout:8000, maximumAge:300000 }
+      p => gpsToCanonical({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
+      () => { /* denial or timeout: keep current location */ },
+      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
     );
+  }, [location.source, gpsToCanonical]);
+
+  useEffect(() => { requestLocation(); }, [requestLocation]);
+
+  // Location pill: refresh the canonical location from device GPS.
+  const handleLocationClick = useCallback(() => {
+    if (!('geolocation' in navigator)) return;
+    navigator.geolocation.getCurrentPosition(
+      p => gpsToCanonical({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
+      () => { /* location access denied: keep last known place */ },
+      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
+    );
+  }, [gpsToCanonical]);
+
+  // Stable per-browser session id so session memory never bleeds across users.
+  const sessionId = useMemo(() => {
+    try {
+      let id = localStorage.getItem('weathergpt:sessionId');
+      if (!id) {
+        id = `web-${typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Date.now().toString(36)}`;
+        localStorage.setItem('weathergpt:sessionId', id);
+      }
+      return id;
+    } catch { return 'web-session'; }
   }, []);
 
-  useEffect(() => { requestLocation(); }, []);
-
-  // ── GPS watch (for header indicator) ──
-  const handleUseMyLocation = useCallback(() => {
-    if (!navigator.geolocation) { alert('Geolocation not supported'); return; }
-    if (gpsWatchId !== null) {
-      navigator.geolocation.clearWatch(gpsWatchId); setGpsWatching(false); setGpsWatchId(null); return;
-    }
-    const id = navigator.geolocation.watchPosition(
-      p => {
-        const {latitude,longitude,accuracy} = p.coords;
-        setCurrentCity(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
-        setGpsCoords({latitude,longitude,accuracy:accuracy??0});
-        setGpsWatching(true);
-        setGpsLocation({latitude,longitude,accuracy:accuracy??undefined});
-      },
-      err => console.warn('GPS error:', err),
-      { enableHighAccuracy:true, timeout:8000, maximumAge:0 }
-    );
-    setGpsWatchId(id); setGpsWatching(true);
-  }, [gpsWatchId]);
-
-  useEffect(() => () => { if (gpsWatchId!==null) navigator.geolocation.clearWatch(gpsWatchId); }, [gpsWatchId]);
-
-  // ── Scroll chat on new messages ──
-  useEffect(() => {
-    if (messages.length > 1 || isLoading) messagesEndRef.current?.scrollIntoView({behavior:'smooth'});
-  }, [messages, isLoading]);
-
-  // ── Fetch Java-backend data ──
-  useEffect(() => {
-    const ctrl = new AbortController();
-    (async () => {
-      try {
-        await fetchWeather(currentCity, ctrl.signal);
-        await fetchNwp(currentCity, ctrl.signal);
-        await fetchSector(currentCity, activeSector, ctrl.signal);
-        await fetchAlerts(currentCity, ctrl.signal);
-        await fetchClimate(currentCity, ctrl.signal);
-      } catch (e) { if (!(e instanceof Error && e.name==='AbortError')) console.warn('Initial load error:', e); }
-    })();
-    return () => ctrl.abort();
-  }, [currentCity, activeSector]);
-
-  const fetchWeather = async (city: string, signal?: AbortSignal) => {
-    try {
-      const f = await fetch(WEATHER_ENDPOINTS.FORECAST(city,7), {signal}); const fd = await f.json();
-      if (fd.success && fd.data?.days) setForecastList(fd.data.days);
-    } catch (e) { if (!(e instanceof Error && e.name==='AbortError')) console.warn('Weather error:', e); }
-  };
-  const fetchNwp = async (city: string, signal?: AbortSignal) => {
-    try { const r=await fetch(WEATHER_ENDPOINTS.NWP(city),{signal}); const d=await r.json(); if(d.success&&d.data) setNwpComparison(d.data); }
-    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('NWP error:',e); }
-  };
-  const fetchSector = async (city: string, sector: string, signal?: AbortSignal) => {
-    setSectorLoading(true);
-    try { const r=await fetch(ADVISORIES_ENDPOINT(city,sector),{signal}); const d=await r.json(); if(d.success&&d.data) setSectorAdvisory(d.data); }
-    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Sector error:',e); }
-    finally { setSectorLoading(false); }
-  };
-  const fetchAlerts = async (city: string, signal?: AbortSignal) => {
-    try { const r=await fetch(ALERTS_ENDPOINT(city),{signal}); const d=await r.json(); if(d.success&&d.data?.alerts) setAlertsList(d.data.alerts); }
-    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Alerts error:',e); }
-  };
-  const fetchClimate = async (city: string, signal?: AbortSignal) => {
-    try { const r=await fetch(CLIMATE_ENDPOINT(city),{signal}); const d=await r.json(); if(d.success&&d.data) setClimateInfo(d.data); }
-    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Climate error:',e); }
-  };
-
-  const toggleVoice = useCallback(() => {
-    if (sttStatus==='listening') { stopListening(); setVoiceEnabled(false); }
-    else { stopSpeech(); startListening(); setVoiceEnabled(true); }
-  }, [sttStatus, startListening, stopListening, stopSpeech]);
-
+  // ── Chat fetch (unchanged endpoint/payload; visual layer only) ──
   const handleSend = useCallback(async (customMsg?: string) => {
-    const text = (customMsg || input).trim();
+    const text = (customMsg ?? input).trim();
     if (!text || isLoading) return;
     if (!customMsg) setInput('');
     setIsLoading(true);
-    const userMsg = { id:Date.now().toString(), role:'user' as MessageRole, content:text };
+    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
     setMessages(p => [...p, userMsg]);
     try {
-      const res = await fetch(CHAT_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'},
-        body:JSON.stringify({ message:text, language:selectedLang, sector:activeSector, sessionId:'desktop-session' }) });
+      const res = await fetch(CHAT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
+        body: JSON.stringify({ message: text, language: selectedLang, sector: activeSector, sessionId, location: location.name }) });
       const d = await res.json();
       if (d.success && d.data) {
-        const bot = { id:(Date.now()+1).toString(), role:'bot' as MessageRole, content:d.data.answer||'Query processed.', voiceAnswer:d.data.voiceAnswer||d.data.answer };
+        const bot: ChatMessage = {
+          id: (Date.now() + 1).toString(), role: 'bot',
+          content: d.data.answer || 'Query processed.',
+          voiceAnswer: d.data.voiceAnswer || d.data.answer,
+          card: toAnswerCard(d.data),
+        };
         setMessages(p => [...p, bot]);
-        if (d.data.location?.name) setCurrentCity(d.data.location.name);
-        if (voiceEnabled && d.data.voiceAnswer) speak(d.data.voiceAnswer, activeLangObj.speechLocale);
+        // The AI's resolved location becomes the canonical location: the
+        // header, warnings, forecast and radar all follow the same state.
+        const resolved = d.data.location;
+        if (resolved && typeof resolved.name === 'string' && resolved.name.trim()) {
+          const patch: LocationPatch = { name: resolved.name, source: 'chat' };
+          if (typeof resolved.latitude === 'number' && typeof resolved.longitude === 'number') {
+            patch.latitude = resolved.latitude;
+            patch.longitude = resolved.longitude;
+          }
+          if (resolved.region) patch.region = resolved.region;
+          if (resolved.country) patch.country = resolved.country;
+          setLocation(patch);
+        }
+        if (voiceEnabled && d.data.voiceAnswer) speak(d.data.voiceAnswer, locale);
       } else {
-        setMessages(p => [...p, { id:(Date.now()+1).toString(), role:'bot', content:d.message||'Could not process query.' }]);
+        setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: 'bot', content: d.message || 'Could not process query.' }]);
       }
     } catch {
-      setMessages(p => [...p, { id:(Date.now()+1).toString(), role:'bot', content:'⚠️ Unable to connect to backend.' }]);
+      setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: 'bot', content: 'Unable to connect to backend.' }]);
     } finally { setIsLoading(false); }
-  }, [input, isLoading, selectedLang, activeSector, voiceEnabled, activeLangObj, speak]);
+  }, [input, isLoading, selectedLang, activeSector, voiceEnabled, locale, speak, sessionId, location.name, setLocation]);
 
-  const handleSpeakText = (msg: {id:string;content:string;voiceAnswer?:string}) => {
-    if (isSpeaking && isSpeakingId===msg.id) { stopSpeech(); setIsSpeakingId(null); }
-    else { stopSpeech(); speak((msg.voiceAnswer||msg.content).replace(/[*#`_~]/g,''), activeLangObj.speechLocale); setIsSpeakingId(msg.id); }
+  // ── Voice input (STT) — transcript sends directly through the chat path ──
+  const { status: sttStatus, isSupported: sttSupported, startListening, stopListening } = useVoiceInput({
+    lang: locale,
+    onTranscript: (text) => {
+      if (!text) return;
+      setInput('');
+      void handleSend(text);
+    },
+    onError: (err) => console.error('Voice error:', err),
+  });
+  const listening = sttStatus === 'listening';
+
+  const toggleListening = useCallback(() => {
+    if (listening) { stopListening(); stopSpeech(); setVoiceEnabled(false); }
+    else { stopSpeech(); startListening(); setVoiceEnabled(true); }
+  }, [listening, startListening, stopListening, stopSpeech]);
+
+  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);
+
+  // Location change: drop stale page data and re-arm the one-shot pages so
+  // every page re-queries against the new coordinates (§23).
+  useEffect(() => {
+    loadedPagesRef.current.clear();
+    setForecastList([]);
+    setNwpComparison(null);
+    setClimateInfo(null);
+    setSectorAdvisory(null);
+  }, [locationKey]);
+
+  // ── Data fetch for the rail/drawer pages (lazy, one shot per page) ──
+  useEffect(() => {
+    if (!activePage) return;
+    const ctrl = new AbortController();
+    const { signal } = ctrl;
+    const loaded = loadedPagesRef.current;
+    if (activePage === 'forecast' && !loaded.has('forecast')) { loaded.add('forecast'); void fetchWeather(location.name, signal); }
+    if (activePage === 'nwp' && !loaded.has('nwp')) { loaded.add('nwp'); void fetchNwp(location.name, signal); }
+    if (activePage === 'climate' && !loaded.has('climate')) { loaded.add('climate'); void fetchClimate(location.name, signal); }
+    if (activePage === 'sectors') void fetchSector(location.name, activeSector, signal);
+    return () => ctrl.abort();
+  }, [activePage, location.name, locationKey, activeSector]);
+
+  // Alerts are always fetched — the warning bulletin above the chat needs them.
+  useEffect(() => {
+    const ctrl = new AbortController();
+    void fetchAlerts(location.name, ctrl.signal);
+    return () => ctrl.abort();
+  }, [location.name]);
+
+  const fetchWeather = async (city: string, signal?: AbortSignal) => {
+    try {
+      const f = await fetch(WEATHER_ENDPOINTS.FORECAST(city, 7), { signal }); const fd = await f.json();
+      if (fd.success && fd.data?.days) setForecastList(fd.data.days);
+    } catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Weather error:', e); }
+  };
+  const fetchNwp = async (city: string, signal?: AbortSignal) => {
+    try { const r = await fetch(WEATHER_ENDPOINTS.NWP(city), { signal }); const d = await r.json(); if (d.success && d.data) setNwpComparison(d.data); }
+    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('NWP error:', e); }
+  };
+  const fetchSector = async (city: string, sector: string, signal?: AbortSignal) => {
+    setSectorLoading(true);
+    try { const r = await fetch(ADVISORIES_ENDPOINT(city, sector), { signal }); const d = await r.json(); if (d.success && d.data) setSectorAdvisory(d.data); }
+    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Sector error:', e); }
+    finally { setSectorLoading(false); }
+  };
+  const fetchAlerts = async (city: string, signal?: AbortSignal) => {
+    try { const r = await fetch(ALERTS_ENDPOINT(city), { signal }); const d = await r.json(); if (d.success && d.data?.alerts) setAlertsList(d.data.alerts); }
+    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Alerts error:', e); }
+  };
+  const fetchClimate = async (city: string, signal?: AbortSignal) => {
+    try { const r = await fetch(CLIMATE_ENDPOINT(city), { signal }); const d = await r.json(); if (d.success && d.data) setClimateInfo(d.data); }
+    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Climate error:', e); }
   };
 
-  // ── Mobile ──
-  if (typeof window!=='undefined' && window.innerWidth<=768) return <MobileWeatherGPT />;
+  // ── Active IMD warning (bulletin overrides routine answers structurally) ──
+  const activeWarning = useMemo<ImdWarning | null>(() => {
+    if (IS_DEMO) return DEMO_WARNING;
+    if (!alertsList.length) return null;
+    const a = alertsList[0];
+    const text = a.description || a.warning || a.message || '';
+    if (!text) return null;
+    return {
+      district: `${location.name} district`,
+      severity: severityOf(a),
+      title: a.title || undefined,
+      text,
+      issuedAt: a.issuedAt ?? a.issueTime ?? a.issued ?? undefined,
+    };
+  }, [alertsList, location.name]);
 
-  // ── Pages that use the full-viewport layout (no chat column) ──
-  const FULLSCREEN_PAGES: NavPage[] = ['aichat','route','report','map','radar'];
-  const isFullscreen = FULLSCREEN_PAGES.includes(activeNav);
-
-  // ── Shared header nav items ──
-  const ALL_NAV: {id:NavPage;label:string;icon:React.ReactNode;group:'java'|'ml'}[] = [
-    { id:'forecast', label:'Forecast', icon:<BarChart3 size={20}/>, group:'java' },
-    { id:'nwp',      label:'NWP Models',   icon:<Cpu size={20}/>,         group:'java' },
-    { id:'sectors',  label:'Sectors',      icon:<Layers size={20}/>,      group:'java' },
-    { id:'alerts',   label:'Alerts',       icon:<Bell size={20}/>,        group:'java' },
-    { id:'climate',  label:'Climate',      icon:<TrendingUp size={20}/>,  group:'java' },
-    { id:'aichat',   label:'AI Chat',      icon:<Cloud size={20}/>,       group:'ml'   },
-    { id:'route',    label:'Route Weather',icon:<Wind size={20}/>,        group:'ml'   },
-    { id:'report',   label:'Weather Report',icon:<Droplets size={20}/>,   group:'ml'   },
-    { id:'map',      label:'Weather Map',  icon:<MapPin size={20}/>,      group:'ml'   },
-    { id:'radar',    label:'Radar',        icon:<Radar size={20}/>,       group:'ml'   },
+  // ── Suggested chips ──
+  const chips: { key: string; icon: typeof Mic; label: string; fill?: string; voice?: boolean }[] = [
+    { key: 'rain', icon: CloudRain, label: `Will it rain in ${location.name} in 2 days?`, fill: `Will it rain over ${location.name} in the next two days?` },
+    { key: 'warn', icon: Bell, label: 'Any active warning for my district?', fill: 'Is there an active warning for my district?' },
+    { key: 'irrig', icon: Droplets, label: 'Should I irrigate tomorrow?', fill: 'Should farmers in this area irrigate tomorrow?' },
+    { key: 'voice', icon: Mic, label: 'Ask by voice', voice: true },
   ];
 
+  const onChipClick = (chip: (typeof chips)[number]) => {
+    if (chip.voice) { toggleListening(); return; }
+    if (chip.fill) { setInput(chip.fill); inputRef.current?.focus(); }
+  };
+
+  const handleNavigate = (page: NavPage) => {
+    setActivePage(page);
+    setDrawerOpen(false);
+  };
+
+  const navigateHome = () => {
+    setActivePage(null);
+    setDrawerOpen(false);
+  };
+
+  // ── Render ──
+  const onChat = activePage === null;
+
+  const SECTOR_LIST: { id: 'agriculture' | 'aviation' | 'marine' | 'urban'; label: string; icon: typeof Sprout }[] = [
+    { id: 'agriculture', label: 'Agriculture', icon: Sprout },
+    { id: 'aviation', label: 'Aviation', icon: Plane },
+    { id: 'marine', label: 'Marine', icon: Anchor },
+    { id: 'urban', label: 'Smart City', icon: Building2 },
+  ];
+
+  const climateMetrics = [
+    { label: 'Warming rate', value: `+${climateInfo?.warmingRatePerDecade}°C`, sub: 'per decade', icon: Flame },
+    { label: 'Baseline mean', value: `${climateInfo?.baselineMeanTemperature}°C`, sub: '30-year normal', icon: Thermometer },
+    { label: 'Annual rain', value: `${climateInfo?.baselineAnnualPrecipitation} mm`, sub: 'per year', icon: Droplets },
+  ] as const;
+
   return (
-    <div className="simple-weathergpt">
-      <div className="glass-orb glass-orb-1" aria-hidden="true" />
-      <div className="glass-orb glass-orb-2" aria-hidden="true" />
-      <div className="glass-orb glass-orb-3" aria-hidden="true" />
+    <div className="app">
+      <IconRail activePage={activePage} onNavigate={handleNavigate} onGoHome={navigateHome} />
 
-      {/* ── Sidebar ── */}
-      <aside className="sidebar">
-        <button className="sidebar-logo" title="WeatherGPT" aria-label="WeatherGPT">
-          <svg className="breeze-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
-            <path d="M2 16C2 23.7268 8.2732 30 16 30C23.7268 30 30 23.7268 30 16C30 8.2732 23.7268 2 16 2C8.2732 2 2 8.2732 2 16V16" stroke="white" strokeOpacity="0.225" strokeWidth="2.2" strokeLinecap="round"/>
-            <path d="M9 13.5C11.5 12 14 12 16.5 13.5C19 15 21.5 15 24 13.5" stroke="white" strokeOpacity="0.9" strokeWidth="2.2" strokeLinecap="round"/>
-            <path d="M8 17.5C10.5 16 13 16 15.5 17.5C18 19 20.5 19 23 17.5" stroke="white" strokeOpacity="0.9" strokeWidth="2.2" strokeLinecap="round"/>
-            <path d="M10 21.5C12 20.5 14 20.5 16 21.5C18 22.5 20 22.5 22 21.5" stroke="white" strokeOpacity="0.9" strokeWidth="2.2" strokeLinecap="round"/>
-          </svg>
-        </button>
+      <div className="main">
+        <AppHeader
+          locationName={location.name}
+          lang={selectedLang}
+          onLanguageChange={setSelectedLang}
+          theme={theme}
+          onToggleTheme={toggleTheme}
+          onLocationClick={handleLocationClick}
+          drawerOpen={drawerOpen}
+          onToggleDrawer={() => setDrawerOpen(v => !v)}
+        />
 
-        <nav className="sidebar-nav">
-          {/* Java-backend pages */}
-          <div style={{ padding:'4px 8px 2px', fontSize:'9px', fontWeight:700, color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Dashboard</div>
-          {ALL_NAV.filter(n => n.group==='java').map(n => (
-            <button key={n.id} className={`sidebar-item ${activeNav===n.id?'active':''}`} onClick={() => setActiveNav(n.id)} title={n.label} aria-label={n.label}>
-              {n.icon}
-            </button>
-          ))}
-          <div style={{ height:'1px', background:'var(--glass-border)', margin:'8px 10px' }} />
-          {/* ML-backend pages */}
-          <div style={{ padding:'4px 8px 2px', fontSize:'9px', fontWeight:700, color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase' }}>AI / Maps</div>
-          {ALL_NAV.filter(n => n.group==='ml').map(n => (
-            <button key={n.id} className={`sidebar-item ${activeNav===n.id?'active':''}`} onClick={() => setActiveNav(n.id)} title={n.label} aria-label={n.label}>
-              {n.icon}
-            </button>
-          ))}
-        </nav>
-      </aside>
+        <WarningBulletin warning={activeWarning} />
 
-      {/* ── Main ── */}
-      <main className="main-content">
-        {/* Header */}
-        <header className="simple-header">
-          <div className="header-brand">
-            <div className="header-logo-icon">
-              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
-                <path d="M2 16C2 23.7268 8.2732 30 16 30C23.7268 30 30 23.7268 30 16C30 8.2732 23.7268 2 16 2C8.2732 2 2 8.2732 2 16V16" stroke="currentColor" strokeOpacity="0.225" strokeWidth="2.2" strokeLinecap="round"/>
-                <path d="M9 13.5C11.5 12 14 12 16.5 13.5C19 15 21.5 15 24 13.5" stroke="currentColor" strokeOpacity="0.9" strokeWidth="2.2" strokeLinecap="round"/>
-                <path d="M8 17.5C10.5 16 13 16 15.5 17.5C18 19 20.5 19 23 17.5" stroke="currentColor" strokeOpacity="0.9" strokeWidth="2.2" strokeLinecap="round"/>
-                <path d="M10 21.5C12 20.5 14 20.5 16 21.5C18 22.5 20 22.5 22 21.5" stroke="currentColor" strokeOpacity="0.9" strokeWidth="2.2" strokeLinecap="round"/>
-              </svg>
-            </div>
-            <div className="header-title-group">
-              <h1>WeatherGPT</h1>
-              <p className="header-subtitle">AI-Powered Meteorological Intelligence</p>
-            </div>
-            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'4px' }}>
-              <span style={{ fontSize:'10px', color:'var(--text-secondary)', background:'var(--glass-bg)', padding:'2px 8px', borderRadius:'12px', border:'1px solid var(--glass-border)' }}>
-                {gpsCoords ? `📍 ${gpsCoords.latitude.toFixed(2)}, ${gpsCoords.longitude.toFixed(2)}` : locationStatus === 'denied' ? '📍 Location blocked' : locationStatus === 'unsupported' ? '📍 No GPS' : '📍 Set location'}
-              </span>
-              <button onClick={requestLocation} style={{ fontSize:'10px', padding:'2px 6px', borderRadius:'12px', border:'1px solid var(--accent-cyan)', background:'var(--accent-cyan-dim)', color:'var(--accent-cyan)', cursor:'pointer' }}>
-                Set
-              </button>
-            </div>
-          </div>
+        {onChat ? (
+          <>
+            <main className="stream chat-stream" aria-label="Chat">
+              <div className="col">
+                {messages.length === 0 && (
+                  <>
+                    <p className="intro" dangerouslySetInnerHTML={{ __html: copy.intro }} />
+                    <div className="chips">
+                      {chips.map(chip => {
+                        const Icon = chip.icon;
+                        return (
+                          <button key={chip.key} type="button" className="chip" onClick={() => onChipClick(chip)}>
+                            <Icon />
+                            {chip.label}
+                          </button>
+                        );
+                      })}
+                    </div>
+                  </>
+                )}
 
-          <nav className="header-nav">
-            {ALL_NAV.map(n => (
-              <button key={n.id} className={`header-nav-item ${activeNav===n.id?'active':''}`} onClick={() => setActiveNav(n.id)}>{n.label}</button>
-            ))}
-          </nav>
+                {messages.map(msg => (
+                  <div key={msg.id}>
+                    {msg.role === 'user' ? (
+                      <div className="msg-user">{msg.content}</div>
+                    ) : msg.card ? (
+                      <AnswerCard
+                        figure={msg.card.figure}
+                        label={msg.card.label}
+                        body={msg.card.body ?? msg.content}
+                        confidence={msg.card.confidence}
+                        issuedAt={msg.card.issuedAt}
+                        source={msg.card.source}
+                      />
+                    ) : (
+                      <div className="msg-assistant">{msg.content}</div>
+                    )}
+                  </div>
+                ))}
 
-          <div className="header-actions">
-            <button className="header-action-btn" onClick={handleUseMyLocation} title="Use My Location" aria-label="Use My Location">
-              {gpsWatching && gpsCoords ? (
-                <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px' }}>
-                  <span style={{ color:gpsCoords.accuracy!<=50?'#10b981':'#f59e0b' }}>●</span>
-                  <MapPin size={13} />
-                  <span style={{ color:'#94a3b8' }}>GPS {Math.round(gpsCoords.accuracy!)}m</span>
-                </span>
-              ) : (<MapPin size={16}/>)}
-            </button>
-            {!isFullscreen && (
-              <>
-                <button className={`header-action-btn voice-btn ${sttStatus==='listening'?'active':''}`} onClick={toggleVoice} disabled={!sttSupported} title="Voice Query" aria-label="Voice Query">
-                  <Mic size={16}/>
-                  <span className="voice-label">{sttStatus==='listening'?'Listening…':'Voice'}</span>
-                </button>
-                <button className="header-action-btn chat-btn" onClick={() => setChatDrawerOpen(!chatDrawerOpen)} title="Open Chat" aria-label="Open Chat">
-                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
-                  <span className="chat-label">Chat</span>
-                </button>
-              </>
-            )}
-            {isFullscreen && locationStatus !== 'pending' && (
-              <button className={`header-action-btn ${locationStatus==='granted'?'active':''}`} onClick={requestLocation} title="Location status" style={{ fontSize:'11px', gap:'4px' }}>
-                <MapPin size={14}/>
-                <span style={{ fontSize:'11px' }}>{locationStatus==='granted'?'GPS on':'GPS off'}</span>
-              </button>
-            )}
-          </div>
-        </header>
+                {isLoading && (
+                  <div className="typing-indicator" aria-label="Assistant typing" role="status">
+                    <span /><span /><span />
+                  </div>
+                )}
+                <div ref={messagesEndRef} />
+              </div>
+            </main>
 
-        {/* ── Full-screen pages (AI / Maps) ── */}
-        {isFullscreen && (
-          <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minHeight:0 }}>
-            {activeNav==='aichat'  && <AIChatView   location={gpsLocation} />}
-            {activeNav==='route'   && <RouteWeatherView />}
-            {activeNav==='report'  && <WeatherReportView location={gpsLocation} />}
-            {activeNav==='map'     && <WeatherMapView    location={gpsLocation} />}
-            {activeNav==='radar'   && <InteractiveRadarView location={gpsLocation} />}
-          </div>
-        )}
+            <InputBar
+              ref={inputRef}
+              value={input}
+              onChange={setInput}
+              onSend={(t) => void handleSend(t)}
+              onMicClick={toggleListening}
+              listening={listening}
+              micSupported={sttSupported}
+              disabled={isLoading}
+              placeholder={copy.inputPlaceholder}
+              helperText={copy.helper}
+            />
+          </>
+        ) : (
+          <main className="page-view" aria-label={NAV_LABELS[activePage] ?? activePage}>
+            <div className="page-view-inner">
+              {activePage === 'forecast' && (
+                <div style={P.panel}>
+                  <header>
+                    <h2 style={P.h2}>7-Day Forecast for {location.name}</h2>
+                  </header>
+                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: '10px' }}>
+                    {forecastList.map((day: any, i: number) => (
+                      <div key={i} style={P.metaCard}>
+                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--slate-teal)' }}>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : day.date}</div>
+                        <div style={{ fontSize: '17px', fontWeight: 800, margin: '6px 0', fontVariantNumeric: 'tabular-nums' }}>{Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°</div>
+                        <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{day.weatherDescription}</div>
+                        <div style={{ fontSize: '11.5px', color: 'var(--ink)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
+                          <CloudRain size={12} style={{ color: 'var(--slate-teal)' }} /> {day.precipitationProbabilityMax}%
+                        </div>
+                      </div>
+                    ))}
+                  </div>
+                </div>
+              )}
 
-        {/* ── Dashboard pages (Java backend) ── */}
-        {!isFullscreen && (<>
-          <div className="dashboard-view-container">
+              {activePage === 'nwp' && nwpComparison && (
+                <div style={P.panel}>
+                  <header>
+                    <h2 style={P.h2}>NWP Multi-Model Ensemble for {location.name}</h2>
+                  </header>
+                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
+                    <span style={{ ...S.badge, background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' }}>
+                      Consensus: {nwpComparison.consensus?.consensusScorePercentage}% ({nwpComparison.consensus?.confidenceLevel})
+                    </span>
+                  </div>
+                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>{nwpComparison.consensus?.synopticSummary}</p>
+                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '10px' }}>
+                    {nwpComparison.models?.map((m: any, i: number) => (
+                      <div key={i} style={P.metaCard}>
+                        <strong style={{ color: 'var(--slate-teal)' }}>{m.modelName}</strong> <span style={{ color: 'var(--muted)', fontSize: '12px' }}>({m.resolution})</span>
+                        <div style={{ fontSize: '12.5px', margin: '4px 0', color: 'var(--ink)' }}>
+                          Max <b style={{ fontVariantNumeric: 'tabular-nums' }}>{m.maxTemp}°C</b> · Min <b style={{ fontVariantNumeric: 'tabular-nums' }}>{m.minTemp}°C</b>
+                        </div>
+                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Rain: {m.totalPrecipitation} mm · Wind: {m.maxWindSpeed} km/h</div>
+                        <div style={{ fontSize: '11.5px', color: 'var(--slate-teal)', marginTop: '4px' }}>{m.synopticCondition}</div>
+                      </div>
+                    ))}
+                  </div>
+                </div>
+              )}
 
-            {activeNav==='forecast' && (
-              <div className="forecast-panel-desktop">
-                <h3 style={{ margin:'0 0 12px', fontSize:'16px' }}>📅 7-Day Forecast — {currentCity}</h3>
-                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))', gap:'10px', overflowX:'auto' }}>
-                  {forecastList.map((day,i) => (
-                    <div key={i} className="forecast-day-glass">
-                      <div style={{ fontSize:'12px', fontWeight:700, color:'#38bdf8' }}>{i===0?'Today':i===1?'Tomorrow':day.date}</div>
-                      <div style={{ fontSize:'16px', fontWeight:800, margin:'6px 0' }}>{Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°</div>
-                      <div style={{ fontSize:'11px', color:'#cbd5e1' }}>{day.weatherDescription}</div>
-                      <div style={{ fontSize:'11px', color:'#67e8f9', marginTop:'4px' }}>🌧️ {day.precipitationProbabilityMax}%</div>
+              {activePage === 'nwp' && !nwpComparison && (
+                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>Loading NWP models…</div>
+              )}
+
+              {activePage === 'sectors' && (
+                <div style={P.panel}>
+                  <header>
+                    <h2 style={P.h2}>Sector advisories for {location.name}</h2>
+                  </header>
+                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
+                    {SECTOR_LIST.map(({ id, label, icon: Icon }) => (
+                      <button key={id} type="button" onClick={() => setActiveSector(id)} aria-pressed={activeSector === id}
+                        style={{
+                          display: 'inline-flex', alignItems: 'center', gap: '7px',
+                          background: activeSector === id ? 'var(--slate-teal-tint)' : 'var(--paper)',
+                          color: activeSector === id ? 'var(--slate-teal)' : 'var(--muted)',
+                          border: `1px solid ${activeSector === id ? 'var(--slate-teal)' : 'var(--line)'}`,
+                          padding: '6px 14px', borderRadius: 'var(--radius-btn)', cursor: 'pointer',
+                          fontSize: '12.5px', fontWeight: 600, fontFamily: 'var(--font-ui)',
+                        }}>
+                        <Icon size={15} /> {label}
+                      </button>
+                    ))}
+                  </div>
+                  {sectorLoading ? (
+                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>Loading {activeSector} advisory…</div>
+                  ) : (<>
+                    {activeSector === 'agriculture' && sectorAdvisory?.agriculture && (
+                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
+                        {[
+                          { icon: Sprout, title: 'Sowing advice', text: sectorAdvisory.agriculture.sowingAdvisory, accent: 'var(--slate-teal)', border: 'var(--slate-teal)' },
+                          { icon: Droplets, title: 'Irrigation', text: sectorAdvisory.agriculture.irrigationRecommendation, accent: 'var(--slate-teal)', border: 'var(--slate-teal)' },
+                          { icon: SprayCan, title: 'Spraying window', text: sectorAdvisory.agriculture.sprayingWindow, accent: 'var(--brass)', border: 'var(--brass)' },
+                        ].map(({ icon: Icon, title, text, accent, border }) => (
+                          <div key={title} style={{ background: 'var(--mist)', border: `1px solid ${border}`, padding: '12px', borderRadius: 'var(--radius-card)' }}>
+                            <p style={{ margin: '0 0 4px', fontWeight: 600, color: accent, display: 'flex', alignItems: 'center', gap: '7px' }}>
+                              <Icon size={15} /> {title}
+                            </p>
+                            <p style={{ margin: 0, color: 'var(--ink)' }}>{text}</p>
+                          </div>
+                        ))}
+                      </div>
+                    )}
+                    {activeSector === 'aviation' && sectorAdvisory?.aviation && (
+                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
+                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
+                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
+                            <Plane size={15} /> Flight category
+                          </p>
+                          <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>{sectorAdvisory.aviation.flightCategory}</p>
+                        </div>
+                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
+                          <p style={{ margin: 0, color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{sectorAdvisory.aviation.metarCode}</p>
+                        </div>
+                      </div>
+                    )}
+                    {activeSector === 'marine' && sectorAdvisory?.marine && (
+                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
+                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
+                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
+                            <Anchor size={15} /> Fishermen directive
+                          </p>
+                          <p style={{ margin: 0, color: 'var(--ink)' }}>{sectorAdvisory.marine.fishermenAction}</p>
+                        </div>
+                      </div>
+                    )}
+                    {activeSector === 'urban' && sectorAdvisory?.smartCity && (
+                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
+                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
+                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
+                            <Waves size={15} /> Flood risk
+                          </p>
+                          <p style={{ margin: 0, color: 'var(--ink)' }}>{sectorAdvisory.smartCity.waterloggingFloodRisk}</p>
+                        </div>
+                      </div>
+                    )}
+                  </>)}
+                </div>
+              )}
+
+              {activePage === 'alerts' && (
+                <div style={P.panel}>
+                  <header>
+                    <h2 style={P.h2}>IMD colour-coded early warnings for {location.name}</h2>
+                  </header>
+                  {alertsList.length === 0 ? (
+                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--watch-green)' }}>
+                      <CheckCircle size={36} style={{ margin: '0 auto 8px' }} />
+                      <p style={{ margin: 0 }}><strong>IMD Green: normal weather conditions</strong></p>
+                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>No severe weather warnings for {location.name}.</span>
+                    </div>
+                  ) : alertsList.map((a: any) => (
+                    <div key={a.id} style={{ background: 'var(--mist)', borderLeft: `4px solid ${tierBorder(severityOf(a))}`, padding: '11px 14px', borderRadius: 'var(--radius-chip)', marginBottom: '8px' }}>
+                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', marginBottom: '4px', alignItems: 'center' }}>
+                        <span style={{ ...S.badge, ...tierBadge(severityOf(a)) }}>{a.severity ?? 'Warning'}</span>
+                        {a.informationClass && <span style={{ color: 'var(--muted)' }}>{a.informationClass}</span>}
+                      </div>
+                      <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>{a.title}</strong>
+                      <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--ink)' }}>{a.description}</p>
                     </div>
                   ))}
                 </div>
-              </div>
-            )}
+              )}
 
-            {/* NWP */}
-            {activeNav==='nwp' && nwpComparison && (
-              <div className="nwp-panel-desktop">
-                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
-                  <h3 style={{ margin:0, fontSize:'16px' }}>🛰️ NWP Multi-Model Ensemble</h3>
-                  <span style={{ background:'#0284c7', color:'white', padding:'4px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:700 }}>
-                    Consensus: {nwpComparison.consensus?.consensusScorePercentage}% ({nwpComparison.consensus?.confidenceLevel})
-                  </span>
-                </div>
-                <p style={{ fontSize:'13px', color:'#cbd5e1', margin:'0 0 12px' }}>{nwpComparison.consensus?.synopticSummary}</p>
-                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
-                  {nwpComparison.models?.map((m: any,i: number) => (
-                    <div key={i} style={{ background:'rgba(2,6,23,0.6)', padding:'12px', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.08)' }}>
-                      <strong style={{ color:'#38bdf8' }}>{m.modelName}</strong> ({m.resolution})
-                      <div style={{ fontSize:'12px', margin:'4px 0' }}>Max: {m.maxTemp}°C | Min: {m.minTemp}°C</div>
-                      <div style={{ fontSize:'12px', color:'#94a3b8' }}>Rain: {m.totalPrecipitation} mm | Wind: {m.maxWindSpeed} km/h</div>
-                      <div style={{ fontSize:'11px', color:'#67e8f9', marginTop:'4px' }}>{m.synopticCondition}</div>
+              {activePage === 'climate' && (
+                <div style={P.panel}>
+                  <header>
+                    <h2 style={P.h2}>Climate analysis for {location.name}</h2>
+                  </header>
+                  {!climateInfo ? (
+                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
+                      <p style={{ margin: 0 }}>Loading climate data for <strong>{location.name}</strong>…</p>
                     </div>
-                  ))}
-                </div>
-              </div>
-            )}
-
-            {/* Sectors */}
-            {activeNav==='sectors' && (
-              <div className="sector-panel-desktop">
-                <div style={{ display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap' }}>
-                  {(['agriculture','aviation','marine','urban'] as const).map(sec => (
-                    <button key={sec} onClick={() => setActiveSector(sec)} style={{ background:activeSector===sec?'#0284c7':'rgba(255,255,255,0.05)', color:'white', border:'none', padding:'6px 14px', borderRadius:'6px', cursor:'pointer', fontSize:'12px', fontWeight:600 }}>
-                      {sec==='agriculture'?'🌾 Agriculture':sec==='aviation'?'✈️ Aviation':sec==='marine'?'⚓ Marine':'🏙️ Smart City'}
-                    </button>
-                  ))}
-                </div>
-                {sectorLoading ? (
-                  <div style={{ textAlign:'center', padding:'20px', color:'#94a3b8' }}>Loading {activeSector} advisory… ⏳</div>
-                ) : (<>
-                  {activeSector==='agriculture' && sectorAdvisory?.agriculture && (
-                    <div style={{ fontSize:'12px', lineHeight:'1.7', display:'flex', flexDirection:'column', gap:'10px' }}>
-                      {[['🌾 Sowing Advice','rgba(34,197,94,0.1)','rgba(34,197,94,0.3)','#86efac',sectorAdvisory.agriculture.sowingAdvisory],
-                        ['💧 Irrigation','rgba(59,130,246,0.1)','rgba(59,130,246,0.3)','#93c5fd',sectorAdvisory.agriculture.irrigationRecommendation],
-                        ['🧪 Spraying','rgba(168,85,247,0.1)','rgba(168,85,247,0.3)','#d8b4fe',sectorAdvisory.agriculture.sprayingWindow]].map(([title,bg,bc,tc,text])=>(
-                        <div key={title as string} style={{ background:bg as string, border:`1px solid ${bc}`, padding:'12px', borderRadius:'8px' }}>
-                          <p style={{ margin:'0 0 4px', fontWeight:600, color:tc as string }}>{title as string}</p>
-                          <p style={{ margin:0, color:'#cbd5e1' }}>{text as string}</p>
+                  ) : (<>
+                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '10px' }}>
+                      {climateMetrics.map(({ label, value, sub, icon: Icon }) => (
+                        <div key={label} style={P.metaCard}>
+                          <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
+                            <Icon size={13} style={{ color: 'var(--slate-teal)' }} /> {label}
+                          </div>
+                          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
+                          <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>{sub}</div>
                         </div>
                       ))}
                     </div>
-                  )}
-                  {activeSector==='aviation' && sectorAdvisory?.aviation && (
-                    <div style={{ fontSize:'12px', lineHeight:'1.7', display:'flex', flexDirection:'column', gap:'10px' }}>
-                      <div style={{ background:'rgba(56,189,248,0.1)', border:'1px solid rgba(56,189,248,0.3)', padding:'12px', borderRadius:'8px' }}>
-                        <p style={{ margin:'0 0 4px', fontWeight:600 }}>✈️ Flight Category</p>
-                        <p style={{ margin:0, color:'#cbd5e1', fontWeight:700 }}>{sectorAdvisory.aviation.flightCategory}</p>
+                    {climateInfo.yearlyMetrics?.length > 0 && (
+                      <div style={P.metaCard}>
+                        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '7px' }}>
+                          <TrendingUp size={15} style={{ color: 'var(--slate-teal)' }} /> Year-by-year temperature
+                        </p>
+                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px', overflowX: 'auto', paddingBottom: '4px' }}>
+                          {climateInfo.yearlyMetrics.map((ym: any, i: number) => {
+                            const temps = climateInfo.yearlyMetrics.map((y: any) => y.meanTemperature || 0);
+                            const mn = Math.min(...temps), mx = Math.max(...temps), rng = mx - mn || 1;
+                            const h = Math.max(8, ((ym.meanTemperature - mn) / rng) * 64 + 8);
+                            const warm = ym.meanTemperature > (mn + mx) / 2;
+                            return (
+                              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', minWidth: '32px' }}>
+                                <div title={`${ym.year}: ${ym.meanTemperature}°C`}
+                                  style={{ width: '20px', height: `${h}px`, background: warm ? 'var(--slate-teal)' : 'var(--line)', borderRadius: '3px 3px 0 0' }} />
+                                <span style={{ fontSize: '9px', color: 'var(--muted)', writingMode: 'vertical-rl' }}>{ym.year}</span>
+                              </div>
+                            );
+                          })}
+                        </div>
                       </div>
-                      <div style={{ background:'rgba(17,24,39,0.8)', border:'1px solid rgba(255,255,255,0.1)', padding:'12px', borderRadius:'8px', fontFamily:'monospace', fontSize:'11px' }}>
-                        <p style={{ margin:0, color:'#93c5fd' }}>{sectorAdvisory.aviation.metarCode}</p>
-                      </div>
-                    </div>
-                  )}
-                  {activeSector==='marine' && sectorAdvisory?.marine && (
-                    <div style={{ fontSize:'12px', lineHeight:'1.7', display:'flex', flexDirection:'column', gap:'10px' }}>
-                      <div style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)', padding:'12px', borderRadius:'8px' }}>
-                        <p style={{ margin:'0 0 4px', fontWeight:600, color:'#67e8f9' }}>⚓ Fishermen Directive</p>
-                        <p style={{ margin:0, color:'#cbd5e1' }}>{sectorAdvisory.marine.fishermenAction}</p>
-                      </div>
-                    </div>
-                  )}
-                  {activeSector==='urban' && sectorAdvisory?.smartCity && (
-                    <div style={{ fontSize:'12px', lineHeight:'1.7', display:'flex', flexDirection:'column', gap:'10px' }}>
-                      <div style={{ background:'rgba(217,119,6,0.1)', border:'1px solid rgba(217,119,6,0.3)', padding:'12px', borderRadius:'8px' }}>
-                        <p style={{ margin:'0 0 4px', fontWeight:600, color:'#fcd34d' }}>🌊 Flood Risk</p>
-                        <p style={{ margin:0, color:'#cbd5e1' }}>{sectorAdvisory.smartCity.waterloggingFloodRisk}</p>
-                      </div>
-                    </div>
-                  )}
-                </>)}
-              </div>
-            )}
-
-            {/* Alerts */}
-            {activeNav==='alerts' && (
-              <div className="alerts-panel-desktop">
-                <h3 style={{ margin:'0 0 12px', fontSize:'16px' }}>🚨 IMD Colour-Coded Early Warnings</h3>
-                {alertsList.length===0 ? (
-                  <div style={{ textAlign:'center', padding:'20px', color:'#10b981' }}>
-                    <CheckCircle size={36}/>
-                    <p>🟢 <strong>IMD Green: Normal Weather Conditions</strong></p>
-                    <span style={{ fontSize:'12px', color:'#94a3b8' }}>No severe weather warnings for {currentCity}.</span>
-                  </div>
-                ) : alertsList.map((a: any) => (
-                  <div key={a.id} style={{ background:'rgba(2,6,23,0.5)', borderLeft:'4px solid #f59e0b', padding:'10px 14px', borderRadius:'6px', marginBottom:'8px' }}>
-                    <div style={{ display:'flex', gap:'8px', fontSize:'11px', marginBottom:'4px' }}>
-                      <span style={{ background:'#ef4444', color:'white', padding:'1px 6px', borderRadius:'4px' }}>{a.severity}</span>
-                      <span style={{ color:'#38bdf8' }}>{a.informationClass}</span>
-                    </div>
-                    <strong style={{ fontSize:'14px' }}>{a.title}</strong>
-                    <p style={{ margin:'4px 0', fontSize:'12px', color:'#cbd5e1' }}>{a.description}</p>
-                  </div>
-                ))}
-              </div>
-            )}
-
-            {/* Climate */}
-            {activeNav==='climate' && (
-              <div className="climate-panel-desktop" style={{ overflowY:'auto', flex:1 }}>
-                <h3 style={{ margin:'0 0 16px', fontSize:'16px' }}>📈 Climate Analysis — {currentCity}</h3>
-                {!climateInfo ? (
-                  <div style={{ textAlign:'center', padding:'40px', color:'#94a3b8' }}>
-                    <div style={{ fontSize:'32px', marginBottom:'12px' }}>📊</div>
-                    <p style={{ margin:0 }}>Loading climate data for <strong>{currentCity}</strong>…</p>
-                  </div>
-                ) : (<>
-                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'16px' }}>
-                    {[
-                      ['🔥 Warming','#f87171',`+${climateInfo.warmingRatePerDecade}°C`,'per decade'],
-                      ['🌡️ Baseline','#38bdf8',`${climateInfo.baselineMeanTemperature}°C`,'30-yr normal'],
-                      ['🌧️ Annual Rain','#67e8f9',`${climateInfo.baselineAnnualPrecipitation} mm`,'per year'],
-                    ].map(([label,color,val,sub])=>(
-                      <div key={label as string} style={{ background:'rgba(2,6,23,0.6)', border:`1px solid ${color}33`, padding:'12px', borderRadius:'10px', textAlign:'center' }}>
-                        <div style={{ fontSize:'11px', color:'#94a3b8', marginBottom:'4px' }}>{label as string}</div>
-                        <div style={{ fontSize:'22px', fontWeight:800, color:color as string }}>{val as string}</div>
-                        <div style={{ fontSize:'10px', color:'#64748b' }}>{sub as string}</div>
-                      </div>
-                    ))}
-                  </div>
-                  {climateInfo.yearlyMetrics?.length > 0 && (
-                    <div style={{ background:'rgba(2,6,23,0.55)', border:'1px solid rgba(255,255,255,0.07)', padding:'14px', borderRadius:'10px', marginBottom:'16px' }}>
-                      <p style={{ margin:'0 0 12px', fontSize:'13px', fontWeight:600, color:'#38bdf8' }}>📊 Year-by-Year Temperature</p>
-                      <div style={{ display:'flex', alignItems:'flex-end', gap:'4px', height:'80px', overflowX:'auto', paddingBottom:'4px' }}>
-                        {climateInfo.yearlyMetrics.map((ym: any, i: number) => {
-                          const temps = climateInfo.yearlyMetrics.map((y: any) => y.meanTemperature||0);
-                          const mn=Math.min(...temps), mx=Math.max(...temps), rng=mx-mn||1;
-                          const h=Math.max(8,((ym.meanTemperature-mn)/rng)*64+8);
-                          return (
-                            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'3px', minWidth:'32px' }}>
-                              <div title={`${ym.year}: ${ym.meanTemperature}°C`}
-                                style={{ width:'20px', height:`${h}px`, background:ym.meanTemperature>(mn+mx)/2?'linear-gradient(180deg,#f87171,#fb923c)':'linear-gradient(180deg,#38bdf8,#0ea5e9)', borderRadius:'3px 3px 0 0' }} />
-                              <span style={{ fontSize:'9px', color:'#64748b', writingMode:'vertical-rl' }}>{ym.year}</span>
-                            </div>
-                          );
-                        })}
-                      </div>
-                    </div>
-                  )}
-                  <div style={{ background:'rgba(2,6,23,0.55)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', overflow:'hidden', marginBottom:'16px', minHeight:'280px' }}>
-                    <div style={{ padding:'10px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)', fontSize:'13px', fontWeight:600, color:'#38bdf8' }}>🗺️ Location Map — {currentCity}</div>
-                    <ClimateMapEmbed city={currentCity} />
-                  </div>
-                </>)}
-              </div>
-            )}
-          </div>
-
-          {activeNav==='aichat' && (
-            <div className="simple-chat">
-              {messages.map(msg => (
-                <div key={msg.id} className={`message ${msg.role}`}>
-                  <div className="message-bubble">
-                    {msg.content.split('\n').map((line, i) => (
-                      <p key={i} className={line.startsWith('•')?'message-bullet':line.startsWith('**')?'message-bold':''}>
-                        {line.replace(/\*\*/g,'')}
-                      </p>
-                    ))}
-                    {msg.role==='bot' && (
-                      <button className="read-aloud-btn" onClick={() => handleSpeakText(msg)}
-                        style={{ background:'transparent', border:'none', color:'#38bdf8', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', marginTop:'6px', fontSize:'12px' }}>
-                          {isSpeaking&&isSpeakingId===msg.id ? <VolumeX size={14}/> : <Volume2 size={14}/>}
-                          <span>{isSpeaking&&isSpeakingId===msg.id?'Stop Speech':'Listen'}</span>
-                        </button>
                     )}
-                  </div>
-                </div>
-              ))}
-              {isLoading && (
-                <div className="message bot typing">
-                  <div className="typing-dots"><span/><span/><span/></div>
+                    <div style={{ ...P.metaCard, padding: 0, overflow: 'hidden' }}>
+                      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '7px' }}>
+                        <MapIcon size={15} style={{ color: 'var(--slate-teal)' }} /> Location map for {location.name}
+                      </div>
+                      <ClimateMapEmbed city={location.name} />
+                    </div>
+                  </>)}
                 </div>
               )}
-              <div ref={messagesEndRef} />
-            </div>
-          )}
 
-          {activeNav==='aichat' && (
-            <div className="input-area">
-            <div className="input-container">
-              <input ref={inputRef} type="text"
-                placeholder={voiceEnabled ? `Listening in ${activeLangObj.label}…` : `Ask WeatherGPT in ${activeLangObj.label}… (e.g. 'Rain in Delhi')`}
-                value={input} onChange={e => setInput(e.target.value)}
-                onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend();} }}
-                className={voiceEnabled?'voice-active':''} />
-              <button className={`mic-btn ${voiceEnabled?'active':''}`} onClick={toggleVoice} disabled={!sttSupported} title="Voice Input" aria-label="Voice Input"><Mic size={20}/></button>
-              <button className="send-btn" onClick={() => handleSend()} disabled={!input.trim()||isLoading} aria-label="Send"><Send size={18}/></button>
+              {activePage === 'route' && <RouteWeatherView />}
+              {activePage === 'report' && <WeatherReportView />}
+              {activePage === 'map' && <WeatherMapView />}
+              {activePage === 'radar' && <WeatherRadarView />}
             </div>
-            <p className="input-hint">Multilingual ({activeLangObj.label}) · Enter to send · MoES / IMD Aligned</p>
-            </div>
-          )}
+          </main>
+        )}
+      </div>
 
-          <footer className="simple-footer">
-            <p>WeatherGPT · MoES / IMD · Open-Meteo · Ollama (llama3.2)</p>
-          </footer>
-        </>)}
-      </main>
-
-      <ChatDrawer isOpen={chatDrawerOpen} onClose={() => setChatDrawerOpen(false)} selectedLang={selectedLang} onLanguageChange={setSelectedLang} />
-      <MobileChatToggle isOpen={mobileChatOpen} onClose={() => setMobileChatOpen(false)} />
+      <MobileDrawer
+        open={drawerOpen}
+        activePage={activePage}
+        onNavigate={handleNavigate}
+        onClose={() => setDrawerOpen(false)}
+      />
     </div>
   );
 }
+
+const NAV_LABELS: Record<NavPage, string> = {
+  forecast: 'Forecast',
+  nwp: 'NWP models',
+  sectors: 'Sectors',
+  alerts: 'Alerts & history',
+  climate: 'Climate',
+  route: 'Route weather',
+  report: 'Weather report',
+  map: 'Weather map',
+  radar: 'Radar',
+};
\ No newline at end of file
diff --git i/frontend/src/components/MobileChatToggle.css w/frontend/src/components/MobileChatToggle.css
deleted file mode 100644
index c875c29..0000000
--- i/frontend/src/components/MobileChatToggle.css
+++ /dev/null
@@ -1,58 +0,0 @@
-/* Mobile Chat Toggle Button */
-
-.mobile-chat-toggle {
-  position: fixed;
-  bottom: 20px;
-  right: 20px;
-  display: flex;
-  align-items: center;
-  gap: 8px;
-  padding: 12px 20px;
-  background: #00e5ff;
-  border: none;
-  border-radius: 0;
-  color: white;
-  font-size: 14px;
-  font-weight: 600;
-  cursor: pointer;
-  box-shadow: 0 4px 20px rgba(0, 229, 255, 0.4);
-  z-index: 999;
-  transition: all 0.3s ease;
-  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
-}
-
-.mobile-chat-toggle:hover {
-  transform: translateY(-2px);
-  box-shadow: 0 6px 24px rgba(0, 229, 255, 0.5);
-}
-
-.mobile-chat-toggle:active {
-  transform: translateY(0);
-}
-
-.mobile-chat-toggle.open {
-  background: #ff3b30;
-  box-shadow: 0 4px 20px rgba(255, 59, 48, 0.4);
-}
-
-.mobile-chat-toggle.open:hover {
-  box-shadow: 0 6px 24px rgba(255, 59, 48, 0.5);
-}
-
-.toggle-label {
-  text-transform: uppercase;
-  letter-spacing: 0.5px;
-}
-
-@media (min-width: 769px) {
-  .mobile-chat-toggle {
-    display: none;
-  }
-}
-
-/* Safe area inset for notched phones */
-@supports (padding-bottom: env(safe-area-inset-bottom)) {
-  .mobile-chat-toggle {
-    bottom: calc(20px + env(safe-area-inset-bottom));
-  }
-}
diff --git i/frontend/src/components/MobileChatToggle.tsx w/frontend/src/components/MobileChatToggle.tsx
deleted file mode 100644
index f19dcd1..0000000
--- i/frontend/src/components/MobileChatToggle.tsx
+++ /dev/null
@@ -1,19 +0,0 @@
-import { Sparkles } from 'lucide-react';
-import './MobileChatToggle.css';
-
-interface MobileChatToggleProps {
-  isOpen: boolean;
-  onClose: () => void;
-}
-
-export default function MobileChatToggle({ isOpen, onClose }: MobileChatToggleProps) {
-  if (typeof window === 'undefined') return null;
-  if (window.innerWidth > 768) return null;
-
-  return (
-    <button className={`mobile-chat-toggle ${isOpen ? 'open' : ''}`} onClick={onClose}>
-      <Sparkles size={16} />
-      <span className="toggle-label">WeatherGPT</span>
-    </button>
-  );
-}
diff --git i/frontend/src/components/MobileWeatherGPT.css w/frontend/src/components/MobileWeatherGPT.css
index bea30ad..d71d396 100644
--- i/frontend/src/components/MobileWeatherGPT.css
+++ w/frontend/src/components/MobileWeatherGPT.css
@@ -1,694 +1,371 @@
-/* WeatherGPT Mobile Interface Stylesheet */
+/* ─── Mobile WeatherGPT — Rebuilt to mirror web app ─── */
 
 :root {
-  --bg-primary: #070d14;
-  --bg-card: rgba(18, 28, 44, 0.75);
-  --bg-card-hover: rgba(28, 42, 65, 0.85);
-  --border-card: rgba(56, 189, 248, 0.2);
-  --accent-cyan: #38bdf8;
-  --accent-cyan-bright: #00e5ff;
-  --text-primary: #f8fafc;
-  --text-secondary: #94a3b8;
-  --text-muted: #64748b;
-  --green-bright: #10b981;
-  --orange-bright: #f59e0b;
-  --red-bright: #ef4444;
+  --m-bg: #070d14;
+  --m-bg-card: rgba(18, 28, 44, 0.75);
+  --m-border: rgba(56, 189, 248, 0.2);
+  --m-accent: #38bdf8;
+  --m-accent-dim: rgba(56, 189, 248, 0.12);
+  --m-text: #f8fafc;
+  --m-text-sec: #94a3b8;
+  --m-text-mut: #64748b;
+  --m-green: #10b981;
+  --m-red: #ef4444;
+  --m-orange: #f59e0b;
+  --m-header-h: 56px;
+  --m-tab-h: 44px;
+  --m-bottom-h: 60px;
 }
 
-.mobile-weathergpt-container {
-  display: flex;
-  flex-direction: column;
-  height: 100vh;
-  height: 100dvh;
-  width: 100%;
-  max-width: 600px;
-  margin: 0 auto;
-  background: #0f172a;
-  color: var(--text-primary);
-  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
-  overflow: hidden;
-  position: relative;
+.mob-wrap {
+  display: flex; flex-direction: column; height: 100vh; height: 100dvh;
+  width: 100%; max-width: 600px; margin: 0 auto; background: var(--m-bg);
+  color: var(--m-text); font-family: system-ui, -apple-system, sans-serif;
+  overflow: hidden; position: relative;
 }
 
-/* Header */
-.mobile-chat-header {
-  display: flex;
-  align-items: center;
-  justify-content: space-between;
-  padding-top: max(12px, env(safe-area-inset-top));
-  background: rgba(11, 19, 34, 0.9);
-  backdrop-filter: blur(12px);
-  border-bottom: 1px solid var(--border-card);
-  z-index: 10;
-  position: relative;
-  top: 0;
+/* ─── Header ─── */
+.mob-header {
+  display: flex; align-items: center; justify-content: space-between;
+  padding: 0 14px; height: var(--m-header-h);
+  background: rgba(11, 19, 34, 0.92); backdrop-filter: blur(12px);
+  border-bottom: 1px solid var(--m-border); flex-shrink: 0; z-index: 20;
+}
+.mob-brand { display: flex; align-items: center; gap: 8px; }
+.mob-brand svg { width: 28px; height: 28px; }
+.mob-title { font-size: 15px; font-weight: 700; margin: 0; color: var(--m-text); }
+.mob-subtitle { font-size: 10px; color: var(--m-text-sec); margin: 0; }
+.mob-header-actions { display: flex; align-items: center; gap: 6px; }
+.mob-hamburger {
+  background: transparent; border: 1px solid var(--m-border); border-radius: 8px;
+  padding: 6px 8px; color: var(--m-accent); cursor: pointer; display: flex; align-items: center;
 }
 
-.mobile-header-left {
-  display: flex;
-  align-items: center;
-  gap: 10px;
-}
-
-/* Branding logo — Breeze icon kept well-spaced and independent as a branding icon */
-.mobile-branding-logo {
-  display: flex;
-  flex-direction: row;
-  justify-content: center;
-  align-items: center;
-  width: 40px;
-  height: 40px;
-  border-radius: 12px;
-  background: rgba(255, 255, 255, 0.04);
-  border: 1px solid rgba(255, 255, 255, 0.08);
-  cursor: pointer;
-  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
-  flex-shrink: 0;
-}
-
-.mobile-branding-logo:hover {
-  background: rgba(56, 189, 248, 0.08);
-  border-color: rgba(56, 189, 248, 0.3);
-  transform: scale(1.04);
-}
-
-.mobile-breeze-icon {
-  width: 28px;
-  height: 28px;
-  flex-shrink: 0;
-}
-
-.mobile-header-title .mobile-title {
-  font-size: 15px;
-  font-weight: 700;
-  margin: 0;
-  letter-spacing: -0.3px;
-  color: white;
-}
-
-.mobile-subtitle {
-  font-size: 11px;
-  color: var(--text-secondary);
-  margin: 0;
-  display: flex;
-  align-items: center;
-  gap: 5px;
-}
-
-.status-dot {
-  width: 7px;
-  height: 7px;
-  border-radius: 50%;
-  background: var(--green-bright);
-  box-shadow: 0 0 8px var(--green-bright);
-  display: inline-block;
-}
-
-.mobile-header-actions {
-  display: flex;
-  align-items: center;
-  gap: 8px;
-}
-
-.lang-picker-wrapper {
-  display: flex;
-  align-items: center;
-  gap: 4px;
-  background: rgba(30, 41, 59, 0.8);
-  border: 1px solid rgba(255, 255, 255, 0.15);
-  border-radius: 6px;
-  padding: 4px 6px;
-}
-
-.globe-icon {
-  color: var(--accent-cyan);
-}
-
-.lang-select {
-  background: transparent;
-  border: none;
-  color: var(--text-primary);
-  font-size: 11px;
-  font-weight: 600;
-  cursor: pointer;
-  outline: none;
-}
-
-.lang-select option {
-  background: #0f172a;
-  color: white;
-}
-
-.gps-btn {
-  background: rgba(30, 41, 59, 0.8);
-  border: 1px solid var(--border-card);
-  color: var(--accent-cyan);
-  border-radius: 6px;
-  padding: 6px;
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  cursor: pointer;
-  transition: all 0.2s;
-}
-
-.gps-btn:hover {
-  background: var(--accent-cyan);
-  color: #070d14;
-}
-
-/* Nav Tabs */
-.mobile-nav-tabs {
-  display: flex;
-  overflow-x: auto;
-  white-space: nowrap;
-  padding: 6px 12px;
-  gap: 6px;
-  background: rgba(15, 23, 42, 0.85);
-  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
+/* ─── Tab Bar ─── */
+.mob-tabs {
+  display: flex; overflow-x: auto; flex-shrink: 0; height: var(--m-tab-h);
+  background: rgba(11, 19, 34, 0.85); border-bottom: 1px solid var(--m-border);
   scrollbar-width: none;
 }
-
-.mobile-nav-tabs::-webkit-scrollbar {
-  display: none;
+.mob-tabs::-webkit-scrollbar { display: none; }
+.mob-tab {
+  flex-shrink: 0; padding: 0 12px; font-size: 11.5px; font-weight: 600;
+  color: var(--m-text-sec); border: none; border-bottom: 2px solid transparent;
+  cursor: pointer; background: transparent; white-space: nowrap;
+  display: flex; align-items: center; gap: 4px; transition: all 0.15s;
+}
+.mob-tab.active {
+  color: var(--m-accent); border-bottom-color: var(--m-accent);
+  background: var(--m-accent-dim);
+}
+.mob-tab .tab-badge {
+  background: var(--m-red); color: #fff; font-size: 9px; padding: 1px 5px;
+  border-radius: 10px; font-weight: 800;
 }
 
-.nav-tab {
-  background: rgba(255, 255, 255, 0.04);
-  border: 1px solid rgba(255, 255, 255, 0.08);
-  color: var(--text-secondary);
-  border-radius: 20px;
-  padding: 6px 12px;
-  font-size: 12px;
-  font-weight: 600;
-  cursor: pointer;
-  display: flex;
-  align-items: center;
-  gap: 4px;
-  transition: all 0.2s;
-}
-
-.nav-tab.active {
-  background: var(--accent-cyan-dim);
-  border-color: var(--accent-cyan);
-  color: var(--text-primary);
-}
-
-.tab-badge {
-  background: var(--red-bright);
-  color: white;
-  font-size: 10px;
-  padding: 1px 5px;
-  border-radius: 10px;
-  font-weight: 800;
-}
-
-/* Content Area */
-.mobile-content-area {
-  flex: 1;
-  overflow-y: auto;
-  padding: 12px 16px 80px;
-}
-
-/* Quick Chips */
-.quick-chip-tray {
-  display: flex;
-  overflow-x: auto;
-  gap: 6px;
-  padding-bottom: 10px;
-  margin-bottom: 10px;
+/* ─── Content ─── */
+.mob-content {
+  flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px 14px 14px;
   scrollbar-width: none;
 }
+.mob-content::-webkit-scrollbar { display: none; }
 
-.quick-chip-tray::-webkit-scrollbar {
-  display: none;
+/* ─── Bottom Input Bar (AI Chat) ─── */
+.mob-bottom-bar {
+  display: flex; align-items: center; gap: 8px; padding: 8px 12px;
+  background: rgba(11, 19, 34, 0.95); backdrop-filter: blur(14px);
+  border-top: 1px solid var(--m-border); flex-shrink: 0; height: var(--m-bottom-h);
+}
+.mob-input {
+  flex: 1; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255,255,255,0.12);
+  border-radius: 20px; padding: 9px 14px; color: var(--m-text); font-size: 13px; outline: none;
+}
+.mob-input:focus { border-color: var(--m-accent); }
+.mob-send-btn {
+  width: 36px; height: 36px; border-radius: 50%; border: none; cursor: pointer;
+  background: linear-gradient(120deg, var(--m-accent) 0%, #0078ff 100%); color: #050b12;
+  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
+}
+.mob-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
+.mob-voice-btn {
+  width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--m-border);
+  background: var(--m-accent-dim); color: var(--m-accent); cursor: pointer;
+  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
 }
 
-.chip {
-  background: rgba(30, 41, 59, 0.6);
-  border: 1px solid rgba(56, 189, 248, 0.25);
-  color: #bae6fd;
-  border-radius: 14px;
-  padding: 5px 10px;
-  font-size: 11px;
-  font-weight: 500;
-  white-space: nowrap;
-  cursor: pointer;
-  transition: all 0.2s;
+/* ─── Chat ─── */
+.mob-chat-msg { display: flex; gap: 8px; margin-bottom: 10px; align-items: flex-start; }
+.mob-chat-msg.bot { justify-content: flex-start; }
+.mob-chat-msg.user { justify-content: flex-end; }
+.mob-bubble {
+  max-width: 85%; padding: 10px 14px; border-radius: 14px 14px 14px 4px;
+  font-size: 13.5px; line-height: 1.5; background: var(--m-bg-card);
+  border: 1px solid var(--m-border); color: var(--m-text);
 }
-
-.chip:hover {
-  background: rgba(56, 189, 248, 0.2);
-  border-color: var(--accent-cyan);
+.mob-bubble.user {
+  background: #0284c7; border: none; border-radius: 14px 14px 4px 14px; color: #fff;
 }
-
-/* Chat Messages */
-.mobile-chat-body {
-  display: flex;
-  flex-direction: column;
-  gap: 12px;
+.mob-bubble p { margin: 0 0 4px; }
+.mob-msg-meta { font-size: 10px; color: var(--m-text-mut); margin-top: 4px; }
+.mob-chat-listen {
+  background: var(--m-accent-dim); border: 1px solid var(--m-border); color: var(--m-accent);
+  border-radius: 8px; padding: 3px 8px; font-size: 10px; cursor: pointer; display: inline-flex;
+  align-items: center; gap: 4px; margin-top: 4px;
 }
-
-.mobile-message.bot .bot-message-container {
-  background: var(--bg-card);
-  border: 1px solid var(--border-card);
-  border-radius: 14px 14px 14px 4px;
-  padding: 14px;
-  max-width: 90%;
-  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
-}
-
-.bot-message-section p {
-  margin: 4px 0;
-  font-size: 13.5px;
-  line-height: 1.5;
-  color: #e2e8f0;
-}
-
-.bullet-line {
-  padding-left: 6px;
-  color: #38bdf8 !important;
-}
-
-.bold-line {
-  font-weight: 700;
-  color: #38bdf8;
-}
-
-.bot-message-footer {
-  display: flex;
-  align-items: center;
-  justify-content: space-between;
-  margin-top: 10px;
-  padding-top: 8px;
-  border-top: 1px solid rgba(255, 255, 255, 0.08);
-}
-
-.voice-read-btn {
-  background: rgba(56, 189, 248, 0.15);
-  border: 1px solid rgba(56, 189, 248, 0.35);
-  color: var(--accent-cyan);
-  border-radius: 12px;
-  padding: 4px 10px;
-  font-size: 11px;
-  font-weight: 600;
-  display: flex;
-  align-items: center;
-  gap: 5px;
-  cursor: pointer;
-  transition: all 0.2s;
-}
-
-.voice-read-btn:hover {
-  background: rgba(56, 189, 248, 0.3);
-}
-
-.source-tag {
-  font-size: 10px;
-  color: var(--text-muted);
-}
-
-.mobile-message.user {
-  align-self: flex-end;
-  max-width: 80%;
-}
-
-.user-message-bubble {
-  background: #0284c7;
-  color: white;
-  border-radius: 0;
-  padding: 10px 14px;
-  font-size: 13.5px;
-  line-height: 1.4;
-  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
-}
-
-.typing-dots {
-  display: flex;
-  gap: 4px;
-  padding: 8px 12px;
-}
-
+.typing-dots { display: flex; gap: 4px; padding: 8px 12px; }
 .typing-dots span {
-  width: 6px;
-  height: 6px;
-  border-radius: 50%;
-  background: var(--accent-cyan);
+  width: 6px; height: 6px; border-radius: 50%; background: var(--m-accent);
   animation: pulse-dot 1.2s infinite ease-in-out;
 }
-
 .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
 .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
-
 @keyframes pulse-dot {
   0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
   40% { opacity: 1; transform: scale(1.1); }
 }
-
-/* NWP Models Pane */
-.section-title {
-  font-size: 15px;
-  font-weight: 700;
-  margin: 4px 0 2px;
-  color: white;
+.mob-suggestions {
+  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
+  gap: 8px; margin-bottom: 14px;
 }
-
-.section-sub {
-  font-size: 11.5px;
-  color: var(--text-secondary);
-  margin-bottom: 12px;
+.mob-suggestion {
+  text-align: left; padding: 12px; background: var(--m-bg-card); border-radius: 12px;
+  border: 1px solid var(--m-border); cursor: pointer; transition: border-color 0.15s; color: var(--m-text);
 }
-
-.consensus-banner {
-  display: flex;
-  align-items: center;
-  gap: 14px;
-  background: rgba(14, 165, 233, 0.12);
-  border: 1px solid var(--accent-cyan);
-  border-radius: 14px;
-  padding: 12px 14px;
-  margin-bottom: 14px;
-}
-
-.score-ring {
-  width: 55px;
-  height: 55px;
-  border-radius: 50%;
-  border: 3px solid var(--accent-cyan);
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
-  flex-shrink: 0;
-}
-
-.score-num { font-size: 16px; font-weight: 800; color: white; }
-.score-lbl { font-size: 9px; color: var(--accent-cyan); text-transform: uppercase; }
-
-.consensus-info strong { color: #38bdf8; font-size: 12.5px; }
-.consensus-info p { margin: 3px 0; font-size: 12px; color: #cbd5e1; }
-.spread-note { font-size: 10.5px; color: var(--text-muted); }
-
-.models-table {
-  display: flex;
-  flex-direction: column;
-  gap: 10px;
-}
-
-.model-row {
-  background: var(--bg-card);
-  border: 1px solid var(--border-card);
-  border-radius: 12px;
-  padding: 12px;
-}
-
-.model-header {
-  display: flex;
-  justify-content: space-between;
-  margin-bottom: 6px;
-}
-
-.model-name { font-weight: 700; font-size: 13px; color: #e2e8f0; }
-.model-res { font-size: 11px; color: var(--accent-cyan); background: rgba(56, 189, 248, 0.1); padding: 2px 6px; border-radius: 6px; }
-.model-stats { display: flex; flex-wrap: wrap; gap: 10px; font-size: 11.5px; color: var(--text-secondary); }
-.model-stats strong { color: white; }
-.model-syn { font-size: 11px; color: var(--text-muted); margin-top: 5px; }
-
-/* Sectors Pane */
-.sector-selector-bar {
-  display: flex;
-  gap: 6px;
-  margin-bottom: 14px;
-  overflow-x: auto;
-  scrollbar-width: none;
-}
-
-.sector-tab {
-  background: rgba(30, 41, 59, 0.6);
-  border: 1px solid rgba(255, 255, 255, 0.1);
-  color: var(--text-secondary);
-  border-radius: 8px;
-  padding: 8px 12px;
-  font-size: 12px;
-  font-weight: 600;
-  cursor: pointer;
-}
-
-.sector-tab.active {
-  background: #0284c7;
-  color: white;
-  border-color: var(--accent-cyan);
-}
-
-.sector-advisory-card {
-  background: var(--bg-card);
-  border: 1px solid var(--border-card);
-  border-radius: 14px;
-  padding: 16px;
-}
-
-.advisory-title {
-  margin: 0 0 12px;
-  font-size: 14px;
-  color: white;
-  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
-  padding-bottom: 8px;
-}
-
-.directive-item {
-  background: rgba(255, 255, 255, 0.03);
-  border-left: 3px solid var(--accent-cyan);
-  border-radius: 4px;
-  padding: 8px 10px;
-  margin-bottom: 8px;
-  font-size: 12.5px;
-  color: #e2e8f0;
-}
-
-.alert-success { border-left-color: var(--green-bright); }
-.alert-danger { border-left-color: var(--red-bright); }
-.cat-badge { background: #0284c7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
-.code-box { background: #020617; padding: 8px; border-radius: 6px; font-size: 11px; margin-bottom: 8px; overflow-x: auto; }
-
-
-
-/* Alerts Pane */
-.alerts-list {
-  display: flex;
-  flex-direction: column;
-  gap: 10px;
-}
-
-.green-alert-box {
-  background: rgba(16, 185, 129, 0.12);
-  border: 1px solid var(--green-bright);
-  border-radius: 14px;
-  padding: 20px;
-  text-align: center;
-}
-
-.green-icon { color: var(--green-bright); margin-bottom: 8px; }
-.green-alert-box h4 { margin: 0 0 4px; color: var(--green-bright); font-size: 15px; }
-.green-alert-box p { margin: 0; font-size: 12px; color: #cbd5e1; }
-
-.alert-card {
-  background: var(--bg-card);
-  border-radius: 12px;
-  padding: 14px;
-  border-left: 4px solid var(--orange-bright);
-}
-
-.alert-card.extreme { border-left-color: var(--red-bright); background: rgba(239, 68, 68, 0.1); }
-.alert-card.severe { border-left-color: #f97316; background: rgba(249, 115, 22, 0.1); }
-.alert-card.moderate { border-left-color: var(--orange-bright); }
-
-.alert-card-header {
-  display: flex;
-  gap: 6px;
-  margin-bottom: 6px;
-}
-
-.alert-severity-badge {
-  background: var(--red-bright);
-  color: white;
-  font-size: 10px;
-  font-weight: 700;
-  padding: 2px 6px;
-  border-radius: 4px;
-}
-
-.alert-type-badge {
-  background: rgba(255, 255, 255, 0.1);
-  color: #e2e8f0;
-  font-size: 10px;
-  padding: 2px 6px;
-  border-radius: 4px;
-}
-
-.info-class-badge {
-  background: rgba(56, 189, 248, 0.15);
-  color: var(--accent-cyan);
-  font-size: 10px;
-  padding: 2px 6px;
-  border-radius: 4px;
-  margin-left: auto;
-}
-
-.alert-card-title {
-  margin: 0 0 4px;
-  font-size: 13.5px;
-  color: white;
-}
-
-.alert-card-desc {
-  margin: 0 0 8px;
-  font-size: 12px;
-  color: #cbd5e1;
-  line-height: 1.4;
-}
-
-.alert-card-meta {
-  font-size: 10.5px;
-  color: var(--text-muted);
-}
-
-/* Climate Pane */
-.climate-card {
-  background: var(--bg-card);
-  border: 1px solid var(--border-card);
-  border-radius: 14px;
-  padding: 16px;
-}
-
-.climate-stats-grid {
-  display: grid;
-  grid-template-columns: repeat(3, 1fr);
-  gap: 8px;
+.mob-suggestion:hover { border-color: var(--m-accent); }
+.mob-suggestion p { margin: 0 0 6px; font-size: 13px; line-height: 1.4; }
+.mob-suggestion span { font-size: 10px; color: var(--m-text-mut); }
+.mob-chat-icon {
+  width: 40px; height: 40px; border-radius: 12px; background: var(--m-accent-dim);
+  border: 1px solid var(--m-accent); display: flex; align-items: center; justify-content: center;
   margin-bottom: 16px;
 }
+.mob-welcome { padding-top: 4vh; }
+.mob-welcome h2 { margin: 0 0 20px; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
 
-.c-stat {
-  background: rgba(255, 255, 255, 0.03);
-  padding: 8px;
-  border-radius: 8px;
-  text-align: center;
+/* ─── Generic Screen ─── */
+.mob-screen { display: flex; flex-direction: column; gap: 12px; }
+.mob-screen h3 { margin: 0; font-size: 15px; font-weight: 700; color: var(--m-text); }
+.mob-screen p { margin: 0; font-size: 12px; color: var(--m-text-sec); line-height: 1.5; }
+.mob-card {
+  background: var(--m-bg-card); border: 1px solid var(--m-border); border-radius: 12px;
+  padding: 14px;
+}
+.mob-card-title { font-size: 14px; font-weight: 700; margin: 0 0 10px; color: var(--m-text); }
+.mob-loading { text-align: center; padding: 30px; color: var(--m-text-mut); font-size: 13px; }
+.mob-empty { text-align: center; padding: 20px; color: var(--m-text-sec); font-size: 13px; }
+.mob-chip {
+  display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 14px;
+  background: rgba(30, 41, 59, 0.6); border: 1px solid var(--m-border); color: #bae6fd;
+  font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.2s; flex-shrink: 0;
+}
+.mob-chip:hover { background: var(--m-accent-dim); border-color: var(--m-accent); }
+.mob-chip-row { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none; }
+.mob-chip-row::-webkit-scrollbar { display: none; }
+.mob-badge {
+  display: inline-block; padding: 2px 7px; border-radius: 10px; font-size: 9px;
+  font-weight: 700; background: var(--m-accent); color: #050b12;
+}
+.mob-badge-red { background: var(--m-red); color: #fff; }
+
+/* ─── Forecast ─── */
+.mob-forecast-grid {
+  display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
+  gap: 8px; overflow-x: auto; padding-bottom: 4px;
+}
+.mob-forecast-day {
+  background: rgba(5, 11, 18, 0.8); border: 1px solid rgba(0, 229, 255, 0.1);
+  border-radius: 10px; padding: 10px; text-align: center; flex-shrink: 0; min-width: 100px;
+}
+.mob-forecast-day strong { font-size: 13px; color: #38bdf8; display: block; margin-bottom: 4px; }
+.mob-forecast-day .temp { font-size: 15px; font-weight: 800; color: var(--m-text); display: block; }
+.mob-forecast-day .desc { font-size: 10px; color: var(--m-text-sec); display: block; margin-top: 2px; }
+.mob-forecast-day .rain { font-size: 9px; color: var(--m-accent); margin-top: 2px; display: block; }
+
+/* ─── NWP ─── */
+.mob-nwp-model {
+  background: rgba(5, 11, 18, 0.8); border: 1px solid var(--m-border);
+  border-radius: 10px; padding: 12px; margin-bottom: 8px;
+}
+.mob-nwp-model h4 { margin: 0 0 6px; font-size: 13px; color: #38bdf8; }
+.mob-nwp-model p { margin: 2px 0; font-size: 11px; color: var(--m-text-sec); }
+.mob-consensus {
+  display: flex; align-items: center; gap: 12px; background: rgba(14, 165, 233, 0.12);
+  border: 1px solid var(--m-accent); border-radius: 14px; padding: 12px; margin-bottom: 14px;
+}
+.mob-score {
+  width: 50px; height: 50px; border-radius: 50%; border: 3px solid var(--m-accent);
+  display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;
+}
+.mob-score span:first-child { font-size: 14px; font-weight: 800; color: #fff; }
+.mob-score span:last-child { font-size: 8px; color: var(--m-accent); text-transform: uppercase; }
+
+/* ─── Sectors ─── */
+.mob-sector-tabs {
+  display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto; scrollbar-width: none;
+}
+.mob-sector-tabs::-webkit-scrollbar { display: none; }
+.mob-sector-tab {
+  flex-shrink: 0; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--m-border);
+  background: rgba(30, 41, 59, 0.6); color: var(--m-text-sec); font-size: 11.5px;
+  font-weight: 600; cursor: pointer; white-space: nowrap;
+}
+.mob-sector-tab.active { background: #0284c7; color: #fff; border-color: var(--m-accent); }
+.mob-directive {
+  background: rgba(255,255,255,0.03); border-left: 3px solid var(--m-accent);
+  border-radius: 4px; padding: 8px 10px; margin-bottom: 6px; font-size: 12px; color: #e2e8f0;
+}
+.mob-directive strong { color: #fff; }
+.mob-directive.alert-success { border-left-color: var(--m-green); }
+.mob-directive.alert-danger { border-left-color: var(--m-red); }
+
+/* ─── Alerts ─── */
+.mob-alert-card {
+  background: var(--m-bg-card); border-radius: 12px; padding: 14px;
+  border-left: 4px solid var(--m-orange); margin-bottom: 8px;
+}
+.mob-alert-card.extreme { border-left-color: var(--m-red); background: rgba(239,68,68,0.1); }
+.mob-alert-card.severe { border-left-color: #f97316; background: rgba(249,115,22,0.1); }
+.mob-alert-header { display: flex; gap: 6px; margin-bottom: 6px; flex-wrap: wrap; }
+.mob-green-alert {
+  background: rgba(16,185,129,0.12); border: 1px solid var(--m-green);
+  border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 10px;
+}
+.mob-green-alert h4 { margin: 0 0 4px; color: var(--m-green); font-size: 15px; }
+.mob-green-alert p { margin: 0; font-size: 12px; color: #cbd5e1; }
+
+/* ─── Climate ─── */
+.mob-climate-grid {
+  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px;
+}
+.mob-climate-stat {
+  background: rgba(255,255,255,0.03); padding: 10px; border-radius: 8px; text-align: center;
+}
+.mob-climate-stat .lbl { font-size: 9px; color: var(--m-text-mut); display: block; margin-bottom: 4px; }
+.mob-climate-stat .val { font-size: 12px; font-weight: 700; color: #fff; display: block; }
+.mob-climate-stat .val.hot { color: #f87171; }
+.mob-trend-bars {
+  display: flex; align-items: flex-end; justify-content: space-between;
+  height: 100px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 10px;
+}
+.mob-bar-col { display: flex; flex-direction: column; align-items: center; width: 20px; }
+.mob-bar-fill { width: 12px; border-radius: 3px 3px 0 0; }
+.mob-bar-fill.pos { background: #ef4444; }
+.mob-bar-fill.neg { background: #38bdf8; }
+.mob-bar-label { font-size: 8px; color: var(--m-text-mut); margin-top: 3px; writing-mode: vertical-rl; }
+
+/* ─── Route Weather ─── */
+.mob-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
+.mob-form-label { font-size: 11px; font-weight: 600; color: #7ab8d4; margin-bottom: 4px; display: block; }
+.mob-form-input {
+  width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid var(--m-border);
+  background: rgba(5,11,18,0.8); color: var(--m-text); font-size: 13px; outline: none; box-sizing: border-box;
+}
+.mob-form-input:focus { border-color: var(--m-accent); }
+.mob-btn {
+  padding: 12px; background: linear-gradient(120deg, #00c8ff 0%, #0078ff 100%); color: #050b12;
+  border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 14px; width: 100%;
+}
+.mob-btn:disabled { opacity: 0.5; cursor: not-allowed; }
+.mob-risk-grid {
+  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 10px;
+}
+.mob-risk-card {
+  padding: 12px; border-radius: 8px; text-align: center; background: rgba(5,11,18,0.8);
+}
+.mob-risk-card .count { font-size: 20px; font-weight: 800; display: block; }
+.mob-risk-card .lbl { font-size: 9px; color: var(--m-text-mut); margin-top: 2px; display: block; }
+.mob-risk-card.high .count { color: #f0a08c; }
+.mob-risk-card.mod .count { color: #f0cf8f; }
+.mob-risk-card.low .count { color: #67e8f9; }
+
+/* ─── Map ─── */
+.mob-map-toolbar {
+  display: flex; gap: 6px; align-items: center; flex-wrap: wrap; padding: 8px 0; flex-shrink: 0;
+}
+.mob-layer-btn {
+  padding: 5px 12px; border-radius: 20px; border: 1px solid var(--m-border); background: transparent;
+  color: var(--m-text-sec); font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.15s;
+}
+.mob-layer-btn.active { border-color: var(--m-accent); background: var(--m-accent-dim); color: var(--m-accent); }
+.mob-map-container { flex: 1; min-height: 300px; border-radius: 8px; overflow: hidden; background: #071018; position: relative; }
+.mob-map-container .leaflet-container { width: 100%; height: 100%; }
+
+/* ─── Radar ─── */
+.mob-radar-container { flex: 1; min-height: 300px; border-radius: 8px; overflow: hidden; background: #050b12; position: relative; }
+.mob-radar-container .leaflet-container { width: 100%; height: 100%; }
+
+/* ─── Report ─── */
+.mob-report-current {
+  display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;
+}
+.mob-report-temp { font-size: 30px; font-weight: 800; color: var(--m-accent); }
+.mob-report-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: 12px; color: var(--m-text-sec); }
+.mob-report-hourly {
+  display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;
+}
+.mob-report-hourly::-webkit-scrollbar { display: none; }
+.mob-hour-card {
+  flex: 0 0 auto; min-width: 90px; padding: 10px; border-radius: 10px;
+  background: rgba(5,11,18,0.8); border: 1px solid rgba(0,229,255,0.1);
+}
+.mob-hour-card .time { font-size: 10px; color: var(--m-accent); font-weight: 600; }
+.mob-hour-card .temp { font-size: 14px; font-weight: 700; color: var(--m-text); margin: 2px 0; }
+.mob-hour-card .desc { font-size: 9px; color: var(--m-text-sec); }
+.mob-hour-card .meta { font-size: 8px; color: var(--m-text-mut); margin-top: 2px; }
+.mob-report-daily {
+  display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px;
+}
+.mob-day-card {
+  display: flex; flex-direction: column; gap: 3px; padding: 12px; border-radius: 10px;
+  background: rgba(5,11,18,0.8); border: 1px solid rgba(0,229,255,0.1);
+}
+.mob-day-card strong { font-size: 11px; color: var(--m-text); }
+.mob-day-card span { font-size: 10px; color: var(--m-text-sec); }
+
+/* ─── Floating Chat Button ─── */
+.mob-float-chat {
+  position: absolute; bottom: calc(var(--m-bottom-h) + 10px); right: 16px; z-index: 30;
+  width: 52px; height: 52px; border-radius: 50%; border: none; cursor: pointer;
+  background: linear-gradient(120deg, var(--m-accent) 0%, #0078ff 100%);
+  color: #050b12; display: flex; align-items: center; justify-content: center;
+  box-shadow: 0 4px 20px rgba(0, 229, 255, 0.35); transition: transform 0.15s;
+}
+.mob-float-chat:active { transform: scale(0.92); }
+
+/* ─── Drawer ─── */
+.mob-drawer-overlay {
+  position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 40;
+}
+.mob-drawer {
+  position: absolute; top: 0; right: 0; bottom: 0; width: 280px; z-index: 50;
+  background: rgba(11, 19, 34, 0.98); border-left: 1px solid var(--m-border);
+  padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;
+}
+.mob-drawer-close {
+  align-self: flex-end; background: transparent; border: none; color: var(--m-text-sec);
+  cursor: pointer; padding: 4px;
+}
+.mob-drawer h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--m-text-mut); margin: 12px 0 6px; }
+.mob-drawer-item {
+  display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px;
+  background: transparent; border: none; color: var(--m-text); cursor: pointer; font-size: 14px;
+  text-align: left; width: 100%; transition: background 0.15s;
+}
+.mob-drawer-item:hover { background: var(--m-bg-card); }
+.mob-drawer-item.active { background: var(--m-accent-dim); color: var(--m-accent); }
+
+/* ─── Section Header ─── */
+.mob-section-header { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
+.mob-section-header h3 { margin: 0; }
+.mob-gps-pill {
+  margin-left: auto; font-size: 10px; padding: 2px 8px; border-radius: 10px;
+  border: 1px solid var(--m-border); color: var(--m-text-sec);
 }
 
-.c-lbl { font-size: 10px; color: var(--text-muted); display: block; }
-.c-val { font-size: 12.5px; font-weight: 700; color: white; margin-top: 3px; display: block; }
-.c-val.hot { color: #f87171; }
+/* ─── Weather Code Descriptions ─── */
+.mob-wmo { font-size: 11px; color: var(--m-text-sec); margin: 4px 0; }
 
-.trend-title { font-size: 13px; color: white; margin: 12px 0 8px; }
-
-.trend-bars {
-  display: flex;
-  align-items: flex-end;
-  justify-content: space-between;
-  height: 120px;
-  padding-bottom: 16px;
-  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
-  margin-bottom: 14px;
-}
-
-.year-bar-col {
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  width: 22px;
-}
-
-.bar-anomaly { font-size: 9px; color: #f87171; margin-bottom: 2px; }
-.bar-fill { width: 14px; border-radius: 4px 4px 0 0; }
-.bar-fill.pos { background: #ef4444; }
-.bar-fill.neg { background: #38bdf8; }
-.bar-year { font-size: 9px; color: var(--text-muted); margin-top: 4px; }
-
-.climate-insights-box h4 { margin: 0 0 6px; font-size: 12.5px; color: #38bdf8; }
-.climate-insights-box ul { margin: 0; padding-left: 16px; font-size: 11.5px; color: #cbd5e1; }
-.climate-insights-box li { margin-bottom: 4px; }
-
-/* Bottom Input Bar */
-.mobile-input-bar {
-  position: absolute;
-  bottom: 0;
-  left: 0;
-  right: 0;
-  display: flex;
-  align-items: center;
-  gap: 8px;
-  padding: 10px 14px;
-  background: rgba(11, 19, 34, 0.95);
-  backdrop-filter: blur(14px);
-  border-top: 1px solid var(--border-card);
-  z-index: 20;
-}
-
-.mobile-input-field {
-  flex: 1;
-  background: rgba(30, 41, 59, 0.7);
-  border: 1px solid rgba(255, 255, 255, 0.15);
-  border-radius: 20px;
-  padding: 10px 16px;
-  color: white;
-  font-size: 13px;
-  outline: none;
-}
-
-.mobile-input-field:focus {
-  border-color: var(--accent-cyan);
-}
-
-.mobile-voice-btn {
-  width: 38px;
-  height: 38px;
-  border-radius: 50%;
-  background: rgba(56, 189, 248, 0.15);
-  border: 1px solid rgba(56, 189, 248, 0.35);
-  color: var(--accent-cyan);
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  cursor: pointer;
-  transition: all 0.2s;
-  flex-shrink: 0;
-}
-
-.mobile-voice-btn.pulsing {
-  background: var(--red-bright);
-  color: white;
-  border-color: var(--red-bright);
-  animation: pulse-ring 1.2s infinite;
-}
-
-@keyframes pulse-ring {
-  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
-  70% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
-  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
-}
-
-.mobile-send-btn {
-  width: 38px;
-  height: 38px;
-  border-radius: 0;
-  background: #0284c7;
-  border: none;
-  color: white;
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  cursor: pointer;
-  flex-shrink: 0;
-  transition: opacity 0.2s;
-}
-
-.mobile-send-btn:disabled {
-  opacity: 0.4;
-  cursor: not-allowed;
-}
-
-.loading-state {
-  text-align: center;
-  padding: 30px;
-  color: var(--text-muted);
-  font-size: 13px;
+/* ─── Reduced motion ─── */
+@media (prefers-reduced-motion: reduce) {
+  .typing-dots span { animation: none; opacity: 1; }
 }
diff --git i/frontend/src/components/MobileWeatherGPT.tsx w/frontend/src/components/MobileWeatherGPT.tsx
index ba56080..1ff372a 100644
--- i/frontend/src/components/MobileWeatherGPT.tsx
+++ w/frontend/src/components/MobileWeatherGPT.tsx
@@ -1,1858 +1,1061 @@
-
 import {
-  CheckCircle,
-  MapPin,
-  Mic,
-  Send,
-  Volume2,
-  VolumeX,
-} from "lucide-react";
-import { useCallback, useEffect, useMemo, useRef, useState } from "react";
+  MapPin, Menu, X, Send, Mic, Sparkles, Cloud, Radar
+} from 'lucide-react';
+import { useCallback, useEffect, useRef, useState } from 'react';
+import ReactMarkdown from 'react-markdown';
+import remarkGfm from 'remark-gfm';
+import './MobileWeatherGPT.css';
+import {
+  CHAT_ENDPOINT, ML_AGENT_ENDPOINT, ML_ROUTE_ENDPOINT,
+  WEATHER_ENDPOINTS, ADVISORIES_ENDPOINT, ALERTS_ENDPOINT, CLIMATE_ENDPOINT,
+} from '../config/api';
+import { useVoiceInput } from '../hooks/useVoiceInput';
+import { useVoiceOutput } from '../hooks/useVoiceOutput';
 
-import { API_BASE_URL } from "../config/api";
-import { useVoiceInput } from "../hooks/useVoiceInput";
-import { useVoiceOutput } from "../hooks/useVoiceOutput";
-
-import "./MobileWeatherGPT.css";
-
-interface ChatMessage {
-  id: string;
-  role: "bot" | "user";
-  content: string;
-  timestamp: Date;
-  voiceText?: string;
-  structuredData?: any;
+// ─── Types ───
+type NavPage = 'forecast'|'nwp'|'sectors'|'alerts'|'climate'|'aichat'|'route'|'report'|'map'|'radar';
+interface AiMessage { role: 'user'|'assistant'; content: string; }
+interface Coordinates { latitude: number; longitude: number; accuracy?: number; }
+type LocationStatus = 'pending'|'granted'|'denied'|'unsupported';
+interface HourlyBlock {
+  time: string[]; temperature: number[]; humidity: number[];
+  precipitationProbability: number[]; weatherCode: number[]; wind: number[];
 }
+interface DailyBlock {
+  time: string[]; weatherCode: number[]; maxTemperature: number[];
+  minTemperature: number[]; precipitationProbability: number[]; maxWind: number[];
+}
+interface GeoResult { latitude: number; longitude: number; name: string; country?: string; }
+interface ForecastRecord {
+  location: GeoResult; savedAt: string;
+  hourly24h: HourlyBlock; daily7days: DailyBlock;
+}
+// ─── Constants ───
 
-type ActiveTab =
-  | "chat"
-  | "nwp"
-  | "sectors"
-  | "alerts"
-  | "climate";
-
-type Sector = "agriculture" | "aviation" | "marine" | "urban";
-
-const LANGUAGES = [
-  { code: "en", label: "English", speechLocale: "en-IN" },
-  { code: "hi", label: "हिन्दी (Hindi)", speechLocale: "hi-IN" },
-  { code: "ta", label: "தமிழ் (Tamil)", speechLocale: "ta-IN" },
-  { code: "te", label: "తెలుగు (Telugu)", speechLocale: "te-IN" },
-  { code: "bn", label: "বাংলা (Bengali)", speechLocale: "bn-IN" },
-  { code: "mr", label: "मराठी (Marathi)", speechLocale: "mr-IN" },
-  { code: "gu", label: "ગુજરાતી (Gujarati)", speechLocale: "gu-IN" },
+const WEATHER_CODE_DESCRIPTIONS: Record<number,string> = {
+  0:'☀️ Clear',1:'🌤️ Mainly clear',2:'⛅ Partly cloudy',3:'☁️ Cloudy',
+  45:'🌫️ Fog',48:'🌫️ Fog',51:'🌦️ Light drizzle',53:'🌦️ Drizzle',
+  55:'🌧️ Heavy drizzle',61:'🌦️ Light rain',63:'🌧️ Rain',65:'🌧️ Heavy rain',
+  71:'🌨️ Light snow',73:'❄️ Snow',75:'❄️ Heavy snow',
+  80:'🌦️ Rain showers',81:'🌧️ Rain showers',82:'🌧️ Heavy showers',
+  95:'⛈️ Thunderstorm',96:'⛈️ Thunderstorm + hail',99:'⛈️ Thunderstorm + hail',
+};
+const wmoDesc = (code: number) => WEATHER_CODE_DESCRIPTIONS[code] ?? '🌤️ Unknown';
+const AI_SUGGESTIONS = [
+  { title:"Today's weather", text:"What's the current weather at my location?" },
+  { title:"Rain forecast", text:"Will it rain in the next 24 hours?" },
+  { title:"Heat advisory", text:"Is there a heatwave warning for Delhi?" },
+  { title:"Crop advisory", text:"Should farmers in Punjab irrigate tomorrow?" },
 ];
 
-export default function MobileWeatherGPT() {
-  const [activeTab, setActiveTab] = useState<ActiveTab>("chat");
+const TAB_ITEMS: { id: NavPage; label: string; emoji: string }[] = [
+  { id:'aichat', label:'AI Chat', emoji:'💬' },
+  { id:'forecast', label:'Forecast', emoji:'📅' },
+  { id:'nwp', label:'NWP', emoji:'🛰️' },
+  { id:'sectors', label:'Sectors', emoji:'🌾' },
+  { id:'alerts', label:'Alerts', emoji:'🚨' },
+  { id:'climate', label:'Climate', emoji:'📈' },
+  { id:'route', label:'Route', emoji:'🛣️' },
+  { id:'report', label:'Report', emoji:'📋' },
+  { id:'map', label:'Map', emoji:'🗺️' },
+  { id:'radar', label:'Radar', emoji:'📡' },
+];
 
-  // Language is fixed to English because the language selector was removed.
-  const selectedLang = "en";
+// ─── Shared styles ───
+const S: Record<string, React.CSSProperties> = {
+  scrollWrap: { width:'100%', height:'100%', overflowY:'auto', overflowX:'hidden', padding:'16px', boxSizing:'border-box' },
+  container:  { width:'100%', maxWidth:'1400px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'16px', boxSizing:'border-box' },
+  card:       { background:'rgba(10,22,36,0.55)', padding:'16px', borderRadius:'12px', border:'1px solid rgba(0,229,255,0.12)' },
+  cardTitle:  { margin:'0 0 10px', fontSize:'0.95rem', fontWeight:700, color:'#e0f7ff' },
+  label:      { fontSize:'0.75rem', fontWeight:600, color:'#7ab8d4' },
+  input:      { padding:'10px 13px', borderRadius:'8px', border:'1px solid rgba(0,229,255,0.2)', background:'rgba(5,11,18,0.8)', color:'#e8f4fc', fontSize:'0.9rem', outline:'none', width:'100%', boxSizing:'border-box' },
+  btn:        { padding:'12px 24px', background:'linear-gradient(120deg,#00c8ff 0%,#0078ff 100%)', color:'#050b12', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:700, fontSize:'0.92rem', width:'100%' },
+  error:      { padding:'12px 16px', background:'rgba(229,101,74,0.12)', border:'1px solid rgba(229,101,74,0.3)', color:'#f0a08c', borderRadius:'8px', fontSize:'0.875rem' },
+  successBanner:{ background:'rgba(0,229,255,0.08)', border:'1px solid rgba(0,229,255,0.25)', color:'#67e8f9', padding:'11px 15px', borderRadius:'8px', fontWeight:500, fontSize:'0.88rem' },
+  jsonBlock:    { background:'rgba(5,11,18,0.8)', padding:'13px', borderRadius:'8px', overflowX:'auto', fontSize:'0.78rem', color:'#67e8f9', margin:0, border:'1px solid rgba(0,229,255,0.07)' },
+};
 
-  // Location
-  const [currentCity, setCurrentCity] = useState("Delhi");
-  const [gpsCoords, setGpsCoords] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
-  const [gpsWatching, setGpsWatching] = useState(false);
-  const [gpsWatchId, setGpsWatchId] = useState<number | null>(null);
-
-  // Chat
-  const [input, setInput] = useState("");
-  const [isLoading, setIsLoading] = useState(false);
-  const [messages, setMessages] = useState<ChatMessage[]>([
-    {
-      id: "welcome",
-      role: "bot",
-      content:
-        "👋 Greetings! I am **WeatherGPT**, your AI meteorological & disaster decision-support assistant aligned with MoES / IMD.\n\nAsk me in your preferred language about forecasts, crop advisories, NWP multi-model predictions, or extreme weather alerts!",
-      timestamp: new Date(),
+// ─── Helper functions ───
+async function geocodeCity(city: string): Promise<GeoResult> {
+  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
+  if (!res.ok) throw new Error('Unable to look up that location.');
+  const data = await res.json();
+  if (!data.results?.length) throw new Error('Location not found.');
+  const r = data.results[0];
+  return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
+}
+async function reverseGeocodeForReport(lat: number, lon: number): Promise<string> {
+  try {
+    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=10`);
+    if (!res.ok) throw new Error('');
+    const d = await res.json();
+    const a = d.address ?? {};
+    return a.city ?? a.town ?? a.village ?? a.county ?? d.display_name ?? 'Current location';
+  } catch { return 'Current location'; }
+}
+async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
+  const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
+    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m` +
+    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
+    `&forecast_days=7&timezone=auto`;
+  const res = await fetch(url);
+  if (!res.ok) throw new Error('Weather request failed.');
+  const d = await res.json();
+  return {
+    location: place, savedAt: new Date().toISOString(),
+    hourly24h: {
+      time: d.hourly.time.slice(0,24), temperature: d.hourly.temperature_2m.slice(0,24),
+      humidity: d.hourly.relative_humidity_2m.slice(0,24),
+      precipitationProbability: d.hourly.precipitation_probability.slice(0,24),
+      weatherCode: d.hourly.weather_code.slice(0,24), wind: d.hourly.wind_speed_10m.slice(0,24),
     },
-  ]);
-
-  // Voice
-  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
-
-  // Live data
-  const [nwpData, setNwpData] = useState<any>(null);
-  const [sectorData, setSectorData] = useState<any>(null);
-  const [activeSector, setActiveSector] =
-    useState<Sector>("agriculture");
-  const [alertsData, setAlertsData] = useState<any>(null);
-  const [climateData, setClimateData] = useState<any>(null);
-
-  const messagesEndRef = useRef<HTMLDivElement | null>(null);
-  const inputRef = useRef<HTMLInputElement | null>(null);
-
-  const activeLangObj = useMemo(
-    () =>
-      LANGUAGES.find((language) => language.code === selectedLang) ??
-      LANGUAGES[0],
-    [selectedLang]
-  );
-
-  const { speak, stop: stopSpeech, isSpeaking } = useVoiceOutput();
-
-  const {
-    status: voiceStatus,
-    isSupported: voiceSupported,
-    startListening,
-    stopListening,
-  } = useVoiceInput({
-    lang: activeLangObj.speechLocale,
-
-    onTranscript: (text: string) => {
-      if (!text) return;
-
-      setInput(text);
+    daily7days: {
+      time: d.daily.time.slice(0,7), weatherCode: d.daily.weather_code.slice(0,7),
+      maxTemperature: d.daily.temperature_2m_max.slice(0,7),
+      minTemperature: d.daily.temperature_2m_min.slice(0,7),
+      precipitationProbability: d.daily.precipitation_probability_max.slice(0,7),
+      maxWind: d.daily.wind_speed_10m_max.slice(0,7),
     },
-  });
+  };
+}
 
-  /*
-   * Scroll chat to bottom whenever messages/loading changes.
-   */
+
+// ─── WeatherMapView (Leaflet, same layer model as web + humidity overlay) ───
+function MobileMapView({ location }: { location: Coordinates|null }) {
+  const ref = useRef<HTMLDivElement>(null);
+  const mapRef = useRef<any>(null);
+  const markerRef = useRef<any>(null);
+  const [layer, setLayer] = useState<'standard'|'temperature'|'precipitation'|'wind'|'humidity'>('standard');
+  const [humidityData, setHumidityData] = useState<any>(null);
+  const [loading, setLoading] = useState(false);
+
+  // Load humidity/climate data for color-gradient overlay
   useEffect(() => {
-    messagesEndRef.current?.scrollIntoView({
-      behavior: "smooth",
-    });
-  }, [messages, isLoading]);
+    if (layer !== 'humidity') { setHumidityData(null); return; }
+    setLoading(true);
+    if (location) {
+      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=relative_humidity_2m,temperature_2m&forecast_days=1&timezone=auto`)
+        .then(r => r.json())
+        .then(d => { setHumidityData(d); setLoading(false); })
+        .catch(() => setLoading(false));
+    } else { setLoading(false); }
+  }, [layer, location]);
 
   useEffect(() => {
-    if (inputRef.current) {
-      inputRef.current.focus();
+    if (!ref.current || mapRef.current) return;
+    if (!document.querySelector('link[href*="leaflet"]')) {
+      const link = document.createElement('link'); link.rel='stylesheet';
+      link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
     }
+    import('leaflet').then((L) => {
+      delete (L.Icon.Default.prototype as any)._getIconUrl;
+      L.Icon.Default.mergeOptions({
+        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
+        iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
+        shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
+      });
+      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
+      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors', maxZoom:18 }).addTo(map);
+      mapRef.current = map;
+      if (location) {
+        markerRef.current = L.marker([location.latitude, location.longitude]).addTo(map).bindPopup('📍 Your Location').openPopup();
+      }
+    });
+    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
   }, []);
 
-  /*
-   * Stop speech when changing language.
-   */
   useEffect(() => {
-    stopSpeech();
-    setIsSpeakingId(null);
-  }, [selectedLang, stopSpeech]);
+    if (!mapRef.current || !location) return;
+    import('leaflet').then((L) => {
+      if (markerRef.current) markerRef.current.setLatLng([location.latitude, location.longitude]);
+      else markerRef.current = L.marker([location.latitude, location.longitude]).addTo(mapRef.current).bindPopup('📍 Your Location').openPopup();
+      mapRef.current.setView([location.latitude, location.longitude], 8);
+    });
+  }, [location]);
 
-  /*
-   * API helper.
-   */
-  const fetchJson = useCallback(
-    async <T,>(url: string, signal?: AbortSignal): Promise<T> => {
-      const response = await fetch(url, {
-        signal,
-        headers: {
-          Accept: "application/json",
-        },
-      });
-
-      if (!response.ok) {
-        throw new Error(
-          `Request failed: ${response.status} ${response.statusText}`
-        );
-      }
-
-      return response.json();
-    },
-    []
-  );
-
-  /*
-   * Fetch NWP models.
-   */
-  const fetchNwp = useCallback(
-    async (city: string, signal?: AbortSignal) => {
-      try {
-        const response = await fetchJson<any>(
-          `${API_BASE_URL}/api/weather/nwp?location=${encodeURIComponent(
-            city
-          )}`,
-          signal
-        );
-
-        if (response.success && response.data) {
-          setNwpData(response.data);
-        }
-      } catch (error) {
-        if (error instanceof Error && error.name === "AbortError") {
-          return;
-        }
-
-        console.warn("Could not fetch NWP:", error);
-      }
-    },
-    [fetchJson]
-  );
-
-  /*
-   * Fetch sector advisories.
-   */
-  const fetchSectorAdvisories = useCallback(
-    async (
-      city: string,
-      sector: Sector,
-      signal?: AbortSignal
-    ) => {
-      try {
-        const response = await fetchJson<any>(
-          `${API_BASE_URL}/api/weather/advisories?location=${encodeURIComponent(
-            city
-          )}&sector=${encodeURIComponent(sector)}`,
-          signal
-        );
-
-        if (response.success && response.data) {
-          setSectorData(response.data);
-        }
-      } catch (error) {
-        if (error instanceof Error && error.name === "AbortError") {
-          return;
-        }
-
-        console.warn("Could not fetch sector advisories:", error);
-      }
-    },
-    [fetchJson]
-  );
-
-  /*
-   * Fetch alerts.
-   */
-  const fetchAlerts = useCallback(
-    async (city: string, signal?: AbortSignal) => {
-      try {
-        const response = await fetchJson<any>(
-          `${API_BASE_URL}/api/alerts/early-warnings?location=${encodeURIComponent(
-            city
-          )}`,
-          signal
-        );
-
-        if (response.success && response.data) {
-          setAlertsData(response.data);
-        }
-      } catch (error) {
-        if (error instanceof Error && error.name === "AbortError") {
-          return;
-        }
-
-        console.warn("Could not fetch alerts:", error);
-      }
-    },
-    [fetchJson]
-  );
-
-  /*
-   * Fetch climate data.
-   */
-  const fetchClimate = useCallback(
-    async (city: string, signal?: AbortSignal) => {
-      try {
-        const response = await fetchJson<any>(
-          `${API_BASE_URL}/api/weather/climate?location=${encodeURIComponent(
-            city
-          )}&startYear=2015&endYear=2024`,
-          signal
-        );
-
-        if (response.success && response.data) {
-          setClimateData(response.data);
-        }
-      } catch (error) {
-        if (error instanceof Error && error.name === "AbortError") {
-          return;
-        }
-
-        console.warn("Could not fetch climate data:", error);
-      }
-    },
-    [fetchJson]
-  );
-
-  /*
-   * Initial / location-change data loading.
-   */
-  useEffect(() => {
-    const controller = new AbortController();
-
-    const loadAll = async () => {
-      await Promise.allSettled([
-        fetchNwp(currentCity, controller.signal),
-        fetchSectorAdvisories(
-          currentCity,
-          activeSector,
-          controller.signal
-        ),
-        fetchAlerts(currentCity, controller.signal),
-        fetchClimate(currentCity, controller.signal),
-      ]);
-    };
-
-    loadAll();
-
-    return () => {
-      controller.abort();
-    };
-  },     [
-    currentCity,
-    activeSector,
-    fetchNwp,
-    fetchSectorAdvisories,
-    fetchAlerts,
-    fetchClimate,
-  ]);
-
-  /*
-   * Use browser GPS location.
-   * Starts a real-time watch so the displayed location stays
-   * current as the device moves; precise fix requested via
-   * enableHighAccuracy + maximumAge === 0.
-   *
-   * Each fresh fix also immediately refreshes the advisory
-   * data for the Agriculture, Smart City and Marine sectors.
-   */
-  /*
-   * Fetch advisories for a GPS location and post them to the chat.
-   */
-  const loadAdvisoriesForLocation = useCallback(async (latitude: number, longitude: number) => {
-    setIsLoading(true);
-
-    const userMessage: ChatMessage = {
-      id: Date.now().toString(),
-      role: "user",
-      content: `📍 My GPS location: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
-      timestamp: new Date(),
-    };
-
-    setMessages((previous) => [...previous, userMessage]);
-
-    try {
-      const response = await fetchJson<any>(
-        `${API_BASE_URL}/api/weather/advisories?latitude=${latitude}&longitude=${longitude}&sector=all`
-      );
-
-      if (response.success && response.data) {
-        setSectorData(response.data);
-
-        const agriculture = response.data.agriculture ?? {};
-        const marine = response.data.marine ?? {};
-
-        const botMessage: ChatMessage = {
-          id: `${Date.now()}-bot`,
-          role: "bot",
-          content:
-            `📍 **Field Location Coordinates: ${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E**\n\n` +
-            `Hyper-local advisories retrieved for Agriculture, Smart City, and Severe Weather.\n\n` +
-            `• Sowing Advisory: ${agriculture.sowingAdvisory ?? "Normal"}\n` +
-            `• Irrigation: ${agriculture.irrigationRecommendation ?? "Adequate"}` +
-            `• Marine/Fisheries: ${marine.fishermenAction ?? "Safe"}`,
-          timestamp: new Date(),
-        };
-
-        setMessages((previous) => [...previous, botMessage]);
-      }
-    } catch (error) {
-      console.error("GPS advisory request failed:", error);
-
-      setMessages((previous) => [
-        ...previous,
-        {
-          id: `${Date.now()}-error`,
-          role: "bot",
-          content:
-            "⚠️ Unable to retrieve hyper-local weather advisories.",
-          timestamp: new Date(),
-        },
-      ]);
-    } finally {
-      setIsLoading(false);
-    }
-  }, [fetchJson]);
-
-  const handleUseMyLocation = useCallback(async () => {
-    if (!navigator.geolocation) {
-      window.alert("Geolocation is not supported by your browser.");
-      return;
-    }
-
-    // Toggle off an active watch
-    if (gpsWatchId !== null) {
-      navigator.geolocation.clearWatch(gpsWatchId);
-      setGpsWatching(false);
-      setGpsWatchId(null);
-      setGpsCoords(null);
-      return;
-    }
-
-    const watchOptions: PositionOptions = {
-      enableHighAccuracy: true, // request GPS / precise fix
-      timeout: 8000,
-      maximumAge: 0, // never use a cached position — always get a fresh fix
-    };
-
-    const watchId = navigator.geolocation.watchPosition(
-      async (position) => {
-        const { latitude, longitude, accuracy } = position.coords;
-
-        setCurrentCity(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
-        setGpsCoords({ latitude, longitude, accuracy: accuracy ?? 0 });
-        setGpsWatching(true);
-
-        console.info(
-          `GPS fix: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} | accuracy: ${Math.round(accuracy ?? 0)}m`
-        );
-
-        // Fetch advisories on the first good fix only (don't spam the backend while the user stands still).
-        await loadAdvisoriesForLocation(latitude, longitude);
-      },
-      (error) => {
-        if (error.code === error.PERMISSION_DENIED) {
-          window.alert(
-            `Location access denied. Please enable location for this site (and turn on \"Use precise location\" in your browser prompt), then try again.`
-          );
-        } else if (error.code === error.POSITION_UNAVAILABLE) {
-          console.warn("GPS signal unavailable:", error.message);
-        } else if (error.code === error.TIMEOUT) {
-          console.warn("GPS fix timed out:", error.message);
-        } else {
-          console.error("GPS watch error:", error);
-        }
-        // Keep watching — real devices often recover from temporary unavailability
-      },
-      watchOptions
-    );
-
-    setGpsWatchId(watchId);
-    setGpsWatching(true);
-  }, [gpsWatchId, loadAdvisoriesForLocation]);
-
-  /*
-   * Tear down the GPS watch whenever the component unmounts
-   * so we stop consuming battery and geolocation resources.
-   */
-  useEffect(() => {
-    return () => {
-      if (gpsWatchId !== null) {
-        navigator.geolocation.clearWatch(gpsWatchId);
-      }
-    };
-  }, [gpsWatchId]);
-
-  /*
-   * Send chat query.
-   */
-  const handleSend = useCallback(
-    async (customMessage?: string) => {
-      const textToSend = (
-        customMessage !== undefined ? customMessage : input
-      ).trim();
-
-      if (!textToSend || isLoading) {
-        return;
-      }
-
-      setInput("");
-      setIsLoading(true);
-
-      const userMessage: ChatMessage = {
-        id: `${Date.now()}-user`,
-        role: "user",
-        content: textToSend,
-        timestamp: new Date(),
+  const switchLayer = (type: typeof layer) => {
+    setLayer(type);
+    if (!mapRef.current) return;
+    import('leaflet').then((L) => {
+      const map = mapRef.current;
+      map.eachLayer((l: any) => { if (l instanceof L.TileLayer) map.removeLayer(l); });
+      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors', maxZoom:18 }).addTo(map);
+      const overlays: Record<string,string> = {
+        temperature: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo',
+        precipitation: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
+        wind: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=demo',
       };
-
-      setMessages((previous) => [
-        ...previous,
-        userMessage,
-      ]);
-
-      try {
-        const response = await fetch(
-          `${API_BASE_URL}/api/chat/query`,
-          {
-            method: "POST",
-            headers: {
-              "Content-Type": "application/json",
-              Accept: "application/json",
-            },
-            body: JSON.stringify({
-              message: textToSend,
-              language: selectedLang,
-              sector: activeSector,
-              sessionId: "mobile-session-01",
-            }),
-          }
-        );
-
-        if (!response.ok) {
-          throw new Error(
-            `Chat request failed: ${response.status}`
-          );
-        }
-
-        const data = await response.json();
-
-        if (data.success && data.data) {
-          const botData = data.data;
-
-          const answer =
-            botData.answer || "Query processed.";
-
-          const botMessage: ChatMessage = {
-            id: `${Date.now()}-bot`,
-            role: "bot",
-            content: answer,
-            voiceText: botData.voiceAnswer || answer,
-            structuredData: botData,
-            timestamp: new Date(),
-          };
-
-          setMessages((previous) => [
-            ...previous,
-            botMessage,
-          ]);
-
-          /*
-           * Backend can return a resolved location.
-           */
-          if (botData.location?.name) {
-            setCurrentCity(botData.location.name);
-          }
-
-          /*
-           * Speak automatically for non-English languages
-           * or when voiceAnswer was returned.
-           */
-          if (
-            botData.voiceAnswer &&
-            selectedLang !== "en"
-          ) {
-            stopSpeech();
-
-            speak(
-              botData.voiceAnswer,
-              activeLangObj.speechLocale
-            );
-          }
-        } else {
-          const errorAnswer =
-            data.message ||
-            "I couldn't process that query. Please try asking about weather in a city.";
-
-          setMessages((previous) => [
-            ...previous,
-            {
-              id: `${Date.now()}-error`,
-              role: "bot",
-              content: `⚠️ ${errorAnswer}`,
-              timestamp: new Date(),
-            },
-          ]);
-        }
-      } catch (error) {
-        console.error("WeatherGPT chat error:", error);
-
-        setMessages((previous) => [
-          ...previous,
-          {
-            id: `${Date.now()}-network-error`,
-            role: "bot",
-            content:
-              "⚠️ Unable to reach WeatherGPT backend. Please verify your internet connection and backend server.",
-            timestamp: new Date(),
-          },
-        ]);
-      } finally {
-        setIsLoading(false);
-      }
-    },
-    [
-      input,
-      isLoading,
-      selectedLang,
-      activeSector,
-      activeLangObj.speechLocale,
-      speak,
-      stopSpeech,
-    ]
-  );
-
-  /*
-   * Toggle speech recognition.
-   */
-  const toggleListen = useCallback(() => {
-    if (!voiceSupported) {
-      return;
-    }
-
-    if (voiceStatus === "listening") {
-      stopListening();
-      return;
-    }
-
-    stopSpeech();
-    setIsSpeakingId(null);
-
-    startListening();
-  }, [
-    voiceSupported,
-    voiceStatus,
-    stopListening,
-    stopSpeech,
-    startListening,
-  ]);
-
-  /*
-   * Read a bot message aloud.
-   */
-  const handleReadAloud = useCallback(
-    (message: ChatMessage) => {
-      if (
-        isSpeaking &&
-        isSpeakingId === message.id
-      ) {
-        stopSpeech();
-        setIsSpeakingId(null);
-        return;
-      }
-
-      stopSpeech();
-
-      const textToSpeak =
-        message.voiceText ||
-        message.content
-          .replace(/\*\*/g, "")
-          .replace(/[*#`_~]/g, "")
-          .replace(/•/g, "");
-
-      speak(
-        textToSpeak,
-        activeLangObj.speechLocale
-      );
-
-      setIsSpeakingId(message.id);
-    },
-    [
-      isSpeaking,
-      isSpeakingId,
-      stopSpeech,
-      speak,
-      activeLangObj.speechLocale,
-    ]
-  );
-
-  /*
-   * Stop tracking message once speech ends.
-   */
-  useEffect(() => {
-    if (!isSpeaking) {
-      setIsSpeakingId(null);
-    }
-  }, [isSpeaking]);
-
-  /*
-   * Render chat text.
-   */
-  const renderBotMessage = (content: string) => {
-    return content.split("\n\n").map(
-      (paragraph, paragraphIndex) => (
-        <div
-          key={paragraphIndex}
-          className="bot-message-section"
-        >
-          {paragraph.split("\n").map(
-            (line, lineIndex) => {
-              const cleanedLine = line.replace(
-                /\*\*/g,
-                ""
-              );
-
-              const isBullet =
-                cleanedLine.trim().startsWith("•");
-
-              return (
-                <p
-                  key={lineIndex}
-                  className={
-                    isBullet
-                      ? "bullet-line"
-                      : ""
-                  }
-                >
-                  {cleanedLine}
-                </p>
-              );
-            }
-          )}
-        </div>
-      )
-    );
+      if (type !== 'standard' && type !== 'humidity' && overlays[type])
+        L.tileLayer(overlays[type], { opacity:0.55, attribution:'Weather &copy; OpenWeatherMap' }).addTo(map);
+    });
   };
 
+  const layers: {id: typeof layer; label: string; emoji: string}[] = [
+    {id:'standard', label:'Standard', emoji:'🗺️'},
+    {id:'temperature', label:'Temperature', emoji:'🌡️'},
+    {id:'precipitation', label:'Rain', emoji:'🌧️'},
+    {id:'wind', label:'Wind', emoji:'💨'},
+    {id:'humidity', label:'Humidity', emoji:'💧'},
+  ];
+
+  // Generate humidity color-gradient overlay using canvas
+  const humidityGradientRef = useRef<HTMLDivElement>(null);
+  useEffect(() => {
+    if (layer !== 'humidity' || !humidityData || !humidityGradientRef.current) return;
+    const container = humidityGradientRef.current;
+    const canvas = document.createElement('canvas');
+    canvas.width = 360; canvas.height = 180;
+    const ctx = canvas.getContext('2d');
+    if (!ctx) return;
+    // Draw a color-gradient based on humidity data
+    const humidityValues = humidityData?.hourly?.relative_humidity_2m || [];
+    if (!humidityValues.length) return;
+    const maxH = Math.max(...humidityValues);
+    const minH = Math.min(...humidityValues);
+    const rng = maxH - minH || 1;
+    const imgData = ctx.createImageData(360, 180);
+    for (let y = 0; y < 180; y++) {
+      for (let x = 0; x < 360; x++) {
+        const idx = (y * 360 + x) * 4;
+        const t = (x / 360) * (humidityValues.length - 1);
+        const idx2 = Math.floor(t);
+        const val = humidityValues[Math.min(idx2, humidityValues.length - 1)];
+        const norm = (val - minH) / rng;
+        // Color gradient: blue (low humidity) -> cyan -> green -> yellow -> red (high humidity)
+        if (norm < 0.25) { const n = norm / 0.25; imgData.data[idx]=0; imgData.data[idx+1]=Math.floor(100+n*155); imgData.data[idx+2]=255; }
+        else if (norm < 0.5) { const n = (norm-0.25)/0.25; imgData.data[idx]=0; imgData.data[idx+1]=Math.floor(200+n*55); imgData.data[idx+2]=Math.floor(255-n*100); }
+        else if (norm < 0.75) { const n = (norm-0.5)/0.25; imgData.data[idx]=Math.floor(n*255); imgData.data[idx+1]=255; imgData.data[idx+2]=Math.floor(155-n*155); }
+        else { const n = (norm-0.75)/0.25; imgData.data[idx]=255; imgData.data[idx+1]=Math.floor(255-n*200); imgData.data[idx+2]=0; }
+        imgData.data[idx+3] = 160;
+      }
+    }
+    ctx.putImageData(imgData, 0, 0);
+    container.appendChild(canvas);
+    return () => { if (canvas.parentNode) canvas.parentNode.removeChild(canvas); };
+  }, [layer, humidityData]);
+
   return (
-    <div className="mobile-weathergpt-container">
-      {/* Header */}
-
-      <header className="mobile-chat-header">
-        <div className="mobile-header-left">
-          <button
-            type="button"
-            className="mobile-branding-logo"
-            title="WeatherGPT"
-            aria-label="WeatherGPT"
-          >
-            <svg
-              className="mobile-breeze-icon"
-              viewBox="0 0 32 32"
-              fill="none"
-              xmlns="http://www.w3.org/2000/svg"
-              aria-hidden="true"
-            >
-              <path
-                d="M2 16C2 23.7268 8.2732 30 16 30C23.7268 30 30 23.7268 30 16C30 8.2732 23.7268 2 16 2C8.2732 2 2 8.2732 2 16V16"
-                stroke="white"
-                strokeOpacity="0.225"
-                strokeWidth="2.2"
-                strokeLinecap="round"
-              />
-
-              <path
-                d="M9 13.5C11.5 12 14 12 16.5 13.5C19 15 21.5 15 24 13.5"
-                stroke="white"
-                strokeOpacity="0.9"
-                strokeWidth="2.2"
-                strokeLinecap="round"
-              />
-
-              <path
-                d="M8 17.5C10.5 16 13 16 15.5 17.5C18 19 20.5 19 23 17.5"
-                stroke="white"
-                strokeOpacity="0.9"
-                strokeWidth="2.2"
-                strokeLinecap="round"
-              />
-
-              <path
-                d="M10 21.5C12 20.5 14 20.5 16 21.5C18 22.5 20 22.5 22 21.5"
-                stroke="white"
-                strokeOpacity="0.9"
-                strokeWidth="2.2"
-                strokeLinecap="round"
-              />
-            </svg>
-          </button>
-
-          <div className="mobile-header-title">
-            <h1 className="mobile-title">
-              WeatherGPT Intelligence
-            </h1>
-
-            <p className="mobile-subtitle">
-              <span className="status-dot" />
-              MoES / IMD Multi-Model Ensemble •
-              Latency: 142ms
-            </p>
-          </div>
-        </div>
-
-        <div className="mobile-header-actions">
-          <button
-            type="button"
-            className="gps-btn"
-            onClick={handleUseMyLocation}
-            title="Use My Location"
-            aria-label="Use my location"
-          >
-            {gpsWatching && gpsCoords ? (
-              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
-                <span style={{ color: gpsCoords.accuracy <= 50 ? '#10b981' : '#f59e0b' }}>●</span>
-                <MapPin size={14} />
-                <span style={{ fontSize: '11px', color: '#94a3b8' }}>GPS {Math.round(gpsCoords.accuracy)}m</span>
-              </span>
-            ) : (
-              <MapPin size={16} />
-            )}
-          </button>
-        </div>
-      </header>
-
-      {/* Navigation */}
-
-      <nav
-        className="mobile-nav-tabs"
-        style={{
-          display: "grid",
-          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
-          gridTemplateRows: "repeat(2, auto)",
-          gap: "6px",
-          width: "100%",
-          padding: "6px 18px",
-          boxSizing: "border-box",
-          overflow: "hidden",
-        }}
-      >
-        {/* FIRST ROW: Alerts, Chat, Climate */}
-
-        <button
-          type="button"
-          className={`nav-tab ${
-            activeTab === "alerts" ? "active" : ""
-          }`}
-          onClick={() => setActiveTab("alerts")}
-          style={{
-            width: "100%",
-            minWidth: 0,
-            maxWidth: "none",
-            boxSizing: "border-box",
-            whiteSpace: "nowrap",
-            justifyContent: "center",
-          }}
-        >
-          🚨 Alerts{" "}
-          {Number(alertsData?.totalAlerts ?? 0) > 0 && (
-            <span className="tab-badge">
-              {alertsData.totalAlerts}
-            </span>
-          )}
-        </button>
-
-        <button
-          type="button"
-          className={`nav-tab ${
-            activeTab === "chat" ? "active" : ""
-          }`}
-          onClick={() => setActiveTab("chat")}
-          style={{
-            width: "100%",
-            minWidth: 0,
-            maxWidth: "none",
-            boxSizing: "border-box",
-            whiteSpace: "nowrap",
-            justifyContent: "center",
-          }}
-        >
-          💬 Chat
-        </button>
-
-        <button
-          type="button"
-          className={`nav-tab ${
-            activeTab === "climate" ? "active" : ""
-          }`}
-          onClick={() => setActiveTab("climate")}
-          style={{
-            width: "100%",
-            minWidth: 0,
-            maxWidth: "none",
-            boxSizing: "border-box",
-            whiteSpace: "nowrap",
-            justifyContent: "center",
-          }}
-        >
-          📈 Climate
-        </button>
-
-        {/* SECOND ROW: NWP Models, Sectors */}
-
-        <button
-          type="button"
-          className={`nav-tab ${
-            activeTab === "nwp" ? "active" : ""
-          }`}
-          onClick={() => setActiveTab("nwp")}
-          style={{
-            width: "100%",
-            minWidth: 0,
-            maxWidth: "none",
-            boxSizing: "border-box",
-            whiteSpace: "nowrap",
-            justifyContent: "center",
-          }}
-        >
-          🛰️ NWP Models
-        </button>
-
-        <button
-          type="button"
-          className={`nav-tab ${
-            activeTab === "sectors" ? "active" : ""
-          }`}
-          onClick={() => setActiveTab("sectors")}
-          style={{
-            width: "100%",
-            minWidth: 0,
-            maxWidth: "none",
-            boxSizing: "border-box",
-            whiteSpace: "nowrap",
-            justifyContent: "center",
-          }}
-        >
-          🌾 Sectors
-        </button>
-      </nav>
-
-      {/* Main content */}
-
-      <div className="mobile-content-area">
-        {/* CHAT */}
-
-        {activeTab === "chat" && (
-          <div className="mobile-chat-body">
-            <div className="quick-chip-tray">
-              <button
-                type="button"
-                className="chip"
-                onClick={() =>
-                  handleSend(
-                    `Weather in ${currentCity}`
-                  )
-                }
-              >
-                🌤️ Weather in {currentCity}
-              </button>
-
-              <button
-                type="button"
-                className="chip"
-                onClick={() =>
-                  handleSend(
-                    `Will it rain tomorrow in ${currentCity}?`
-                  )
-                }
-              >
-                🌧️ Rain Tomorrow
-              </button>
-
-              <button
-                type="button"
-                className="chip"
-                onClick={() =>
-                  handleSend(
-                    `Sowing advisory for ${currentCity}`
-                  )
-                }
-              >
-                🌾 Sowing Guidance
-              </button>
-
-              <button
-                type="button"
-                className="chip"
-                onClick={() =>
-                  handleSend(
-                    `Compare GFS and ECMWF models for ${currentCity}`
-                  )
-                }
-              >
-                🛰️ NWP Models
-              </button>
-
-              <button
-                type="button"
-                className="chip"
-                onClick={() =>
-                  handleSend(
-                    `Climate trend for ${currentCity}`
-                  )
-                }
-              >
-                📈 Climate Trend
-              </button>
-            </div>
-
-            {messages.map((message) => (
-              <div
-                key={message.id}
-                className={`mobile-message ${message.role}`}
-              >
-                {message.role === "bot" ? (
-                  <div className="bot-message-container">
-                    <div className="bot-message-content">
-                      {renderBotMessage(
-                        message.content
-                      )}
-                    </div>
-
-                    <div className="bot-message-footer">
-                      <button
-                        type="button"
-                        className="voice-read-btn"
-                        onClick={() =>
-                          handleReadAloud(message)
-                        }
-                        title="Read aloud"
-                      >
-                        {isSpeaking &&
-                        isSpeakingId ===
-                          message.id ? (
-                          <VolumeX size={15} />
-                        ) : (
-                          <Volume2 size={15} />
-                        )}
-
-                        <span>
-                          {isSpeaking &&
-                          isSpeakingId ===
-                            message.id
-                            ? "Stop Speech"
-                            : "Listen"}
-                        </span>
-                      </button>
-
-                      <span className="source-tag">
-                        MoES / IMD Synoptic Data
-                      </span>
-                    </div>
-                  </div>
-                ) : (
-                  <div className="user-message-container">
-                    <div className="user-message-bubble">
-                      {message.content}
-                    </div>
-                  </div>
-                )}
-              </div>
-            ))}
-
-            {isLoading && (
-              <div className="mobile-message bot typing-message">
-                <div className="typing-dots">
-                  <span />
-                  <span />
-                  <span />
-                </div>
-              </div>
-            )}
-
-            <div ref={messagesEndRef} />
-          </div>
-        )}
-
-        {/* NWP */}
-
-        {activeTab === "nwp" && (
-          <div className="nwp-pane">
-            <h3 className="section-title">
-              🛰️ Numerical Weather Prediction
-              (NWP) Ensemble
-            </h3>
-
-            <p className="section-sub">
-              Direct comparison across NOAA GFS,
-              ECMWF IFS (High Res), and WRF
-              regional models.
-            </p>
-
-            {nwpData ? (
-              <div>
-                <div className="consensus-banner">
-                  <div className="score-ring">
-                    <span className="score-num">
-                      {nwpData.consensus
-                        ?.consensusScorePercentage ??
-                        "--"}
-                      %
-                    </span>
-
-                    <span className="score-lbl">
-                      Consensus
-                    </span>
-                  </div>
-
-                  <div className="consensus-info">
-                    <strong>
-                      Confidence:{" "}
-                      {nwpData.consensus
-                        ?.confidenceLevel ??
-                        "Unknown"}
-                    </strong>
-
-                    <p>
-                      {nwpData.consensus
-                        ?.synopticSummary ??
-                        "No summary available."}
-                    </p>
-
-                    <span className="spread-note">
-                      Thermal Spread:{" "}
-                      {nwpData.consensus
-                        ?.tempSpread ?? "--"}
-                      °C • Rain Spread:{" "}
-                      {nwpData.consensus
-                        ?.precipSpread ?? "--"}{" "}
-                      mm
-                    </span>
-                  </div>
-                </div>
-
-                <div className="models-table">
-                  {Array.isArray(
-                    nwpData.models
-                  ) &&
-                    nwpData.models.map(
-                      (
-                        model: any,
-                        index: number
-                      ) => (
-                        <div
-                          key={
-                            model.modelName ??
-                            index
-                          }
-                          className="model-row"
-                        >
-                          <div className="model-header">
-                            <span className="model-name">
-                              {model.modelName ??
-                                "Unknown Model"}
-                            </span>
-
-                            <span className="model-res">
-                              {model.resolution ??
-                                "--"}
-                            </span>
-                          </div>
-
-                          <div className="model-stats">
-                            <span>
-                              Max:{" "}
-                              <strong>
-                                {model.maxTemp ??
-                                  "--"}
-                                °C
-                              </strong>
-                            </span>
-
-                            <span>
-                              Min:{" "}
-                              <strong>
-                                {model.minTemp ??
-                                  "--"}
-                                °C
-                              </strong>
-                            </span>
-
-                            <span>
-                              Rain:{" "}
-                              <strong>
-                                {model.totalPrecipitation ??
-                                  "--"}{" "}
-                                mm
-                              </strong>{" "}
-                              (
-                              {model.precipitationProbability ??
-                                "--"}
-                              %)
-                            </span>
-
-                            <span>
-                              Wind:{" "}
-                              <strong>
-                                {model.maxWindSpeed ??
-                                  "--"}{" "}
-                                km/h
-                              </strong>
-                            </span>
-                          </div>
-
-                          <div className="model-syn">
-                            {model.synopticCondition ??
-                              "No synoptic condition available."}
-                          </div>
-                        </div>
-                      )
-                    )}
-                </div>
-              </div>
-            ) : (
-              <div className="loading-state">
-                Loading NWP model data...
-              </div>
-            )}
-          </div>
-        )}
-
-        {/* SECTORS */}
-
-        {activeTab === "sectors" && (
-          <div className="sectors-pane">
-            <div className="sector-selector-bar">
-              <button
-                type="button"
-                className={`sector-tab ${
-                  activeSector ===
-                  "agriculture"
-                    ? "active"
-                    : ""
-                }`}
-                onClick={() =>
-                  setActiveSector(
-                    "agriculture"
-                  )
-                }
-              >
-                🌾 Agriculture
-              </button>
-
-              <button
-                type="button"
-                className={`sector-tab ${
-                  activeSector ===
-                  "aviation"
-                    ? "active"
-                    : ""
-                }`}
-                onClick={() =>
-                  setActiveSector("aviation")
-                }
-              >
-                ✈️ Aviation
-              </button>
-
-              <button
-                type="button"
-                className={`sector-tab ${
-                  activeSector ===
-                  "marine"
-                    ? "active"
-                    : ""
-                }`}
-                onClick={() =>
-                  setActiveSector("marine")
-                }
-              >
-                ⚓ Marine
-              </button>
-
-              <button
-                type="button"
-                className={`sector-tab ${
-                  activeSector ===
-                  "urban"
-                    ? "active"
-                    : ""
-                }`}
-                onClick={() =>
-                  setActiveSector("urban")
-                }
-              >
-                🏙️ Smart City
-              </button>
-            </div>
-
-            {sectorData ? (
-              <div className="sector-advisory-card">
-                {/* Agriculture */}
-
-                {activeSector ===
-                  "agriculture" &&
-                  sectorData.agriculture && (
-                    <div>
-                      <h4 className="advisory-title">
-                        🌱 Agromet
-                        Crop-Weather
-                        Directives
-                      </h4>
-
-                      <div className="directive-item alert-success">
-                        <strong>
-                          Sowing Advice:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .agriculture
-                            .sowingAdvisory
-                        }
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Irrigation:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .agriculture
-                            .irrigationRecommendation
-                        }
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Chemical Spraying:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .agriculture
-                            .sprayingWindow
-                        }
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Harvest Window:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .agriculture
-                            .harvestingGuidance
-                        }
-                      </div>
-
-                      <div className="metric-pills">
-                        <span>
-                          Soil Moisture:{" "}
-                          <strong>
-                            {
-                              sectorData
-                                .agriculture
-                                .soilMoistureIndex
-                            }
-                            %
-                          </strong>
-                        </span>
-
-                        <span>
-                          Pest Risk:{" "}
-                          <strong>
-                            {
-                              sectorData
-                                .agriculture
-                                .pestDiseaseRisk
-                            }
-                          </strong>
-                        </span>
-                      </div>
-                    </div>
-                  )}
-
-                {/* Aviation */}
-
-                {activeSector ===
-                  "aviation" &&
-                  sectorData.aviation && (
-                    <div>
-                      <h4 className="advisory-title">
-                        ✈️ Airport &
-                        Aviation Weather
-                        Briefing
-                      </h4>
-
-                      <div className="directive-item">
-                        <strong>
-                          Flight Category:
-                        </strong>{" "}
-                        <span className="cat-badge">
-                          {
-                            sectorData
-                              .aviation
-                              .flightCategory
-                          }
-                        </span>
-                      </div>
-
-                      <div className="code-box">
-                        <code>
-                          {
-                            sectorData
-                              .aviation
-                              .metarCode
-                          }
-                        </code>
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Visibility:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .aviation
-                            .visibilityKm
-                        }{" "}
-                        km |{" "}
-                        <strong>
-                          Ceiling:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .aviation
-                            .cloudCeiling
-                        }
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Crosswind:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .aviation
-                            .crosswindKnots
-                        }{" "}
-                        kt |{" "}
-                        <strong>
-                          Turbulence:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .aviation
-                            .turbulenceRisk
-                        }
-                      </div>
-                    </div>
-                  )}
-
-                {/* Marine */}
-
-                {activeSector ===
-                  "marine" &&
-                  sectorData.marine && (
-                    <div>
-                      <h4 className="advisory-title">
-                        ⚓ Marine &
-                        Coastal Fisheries
-                        Advisory
-                      </h4>
-
-                      <div
-                        className={`directive-item ${
-                          sectorData.marine
-                            .fishermenWarningActive
-                            ? "alert-danger"
-                            : "alert-success"
-                        }`}
-                      >
-                        <strong>
-                          Fishermen Directive:
-                        </strong>{" "}
-                        {
-                          sectorData.marine
-                            .fishermenAction
-                        }
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Sea State:
-                        </strong>{" "}
-                        {
-                          sectorData.marine
-                            .seaState
-                        }{" "}
-                        (Wave Height:{" "}
-                        {
-                          sectorData.marine
-                            .waveHeightMeters
-                        }{" "}
-                        m)
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Wind:
-                        </strong>{" "}
-                        {
-                          sectorData.marine
-                            .windSpeedKnots
-                        }{" "}
-                        knots (Beaufort Scale{" "}
-                        {
-                          sectorData.marine
-                            .windBeaufortScale
-                        }
-                        )
-                      </div>
-                    </div>
-                  )}
-
-                {/* Urban */}
-
-                {activeSector ===
-                  "urban" &&
-                  sectorData.smartCity && (
-                    <div>
-                      <h4 className="advisory-title">
-                        🏙️ Smart City
-                        Weather & Heat
-                        Island Monitoring
-                      </h4>
-
-                      <div className="directive-item">
-                        <strong>
-                          Flood /
-                          Waterlogging Risk:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .smartCity
-                            .waterloggingFloodRisk
-                        }
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Heat Island Index:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .smartCity
-                            .urbanHeatIslandIndex
-                        }{" "}
-                        (Heat Index:{" "}
-                        {
-                          sectorData
-                            .smartCity
-                            .outdoorWorkHeatIndex
-                        }
-                        °C)
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Outdoor Labor
-                          Safety:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .smartCity
-                            .outdoorLaborSafety
-                        }
-                      </div>
-
-                      <div className="directive-item">
-                        <strong>
-                          Municipal Storm
-                          Pumping:
-                        </strong>{" "}
-                        {
-                          sectorData
-                            .smartCity
-                            .municipalPumpingAdvice
-                        }
-                      </div>
-                    </div>
-                  )}
-              </div>
-            ) : (
-              <div className="loading-state">
-                Loading sector advisories...
-              </div>
-            )}
-          </div>
-        )}
-
-        {/* ALERTS */}
-
-        {activeTab === "alerts" && (
-          <div className="alerts-pane">
-            <h3 className="section-title">
-              🚨 IMD Extreme Weather
-              Alerts & Early Warnings
-            </h3>
-
-            <p className="section-sub">
-              Standardized MoES/IMD
-              colour-coded warnings
-              (Green, Yellow, Orange, Red).
-            </p>
-
-            {alertsData &&
-            Array.isArray(
-              alertsData.alerts
-            ) ? (
-              <div className="alerts-list">
-                {alertsData.alerts.length ===
-                0 ? (
-                  <div className="green-alert-box">
-                    <CheckCircle
-                      size={32}
-                      className="green-icon"
-                    />
-
-                    <h4>
-                      🟢 IMD Green: Normal
-                      Weather
-                    </h4>
-
-                    <p>
-                      No severe weather
-                      warnings active for{" "}
-                      {currentCity}.
-                      Standard
-                      meteorological
-                      conditions prevail.
-                    </p>
-                  </div>
-                ) : (
-                  alertsData.alerts.map(
-                    (alert: any, index: number) => {
-                      const severity =
-                        String(
-                          alert.severity ??
-                            ""
-                        ).toLowerCase();
-
-                      return (
-                        <div
-                          key={
-                            alert.id ??
-                            `alert-${index}`
-                          }
-                          className={`alert-card ${severity}`}
-                        >
-                          <div className="alert-card-header">
-                            <span className="alert-severity-badge">
-                              {alert.severity ??
-                                "Unknown"}
-                            </span>
-
-                            <span className="alert-type-badge">
-                              {alert.alertType ??
-                                "Weather Alert"}
-                            </span>
-
-                            <span className="info-class-badge">
-                              {alert.informationClass ??
-                                "Information"}
-                            </span>
-                          </div>
-
-                          <h4 className="alert-card-title">
-                            {alert.title ??
-                              "Weather Alert"}
-                          </h4>
-
-                          <p className="alert-card-desc">
-                            {alert.description ??
-                              "No description available."}
-                          </p>
-
-                          <div className="alert-card-meta">
-                            <span>
-                              Source:{" "}
-                              {alert.source ??
-                                "Unknown"}
-                            </span>
-                          </div>
-                        </div>
-                      );
-                    }
-                  )
-                )}
-              </div>
-            ) : (
-              <div className="loading-state">
-                Checking early warnings...
-              </div>
-            )}
-          </div>
-        )}
-
-        {/* CLIMATE */}
-
-        {activeTab === "climate" && (
-          <div className="climate-pane">
-            <h3 className="section-title">
-              📈 10-Year Climate Trend
-              Analytics
-            </h3>
-
-            <p className="section-sub">
-              Decadal climate analytics over{" "}
-              {currentCity} based on
-              historical reanalysis records.
-            </p>
-
-            {climateData ? (
-              <div className="climate-card">
-                <div className="climate-stats-grid">
-                  <div className="c-stat">
-                    <span className="c-lbl">
-                      Decadal Warming Rate
-                    </span>
-
-                    <span className="c-val hot">
-                      +
-                      {climateData.warmingRatePerDecade ??
-                        "--"}
-                      °C / dec
-                    </span>
-                  </div>
-
-                  <div className="c-stat">
-                    <span className="c-lbl">
-                      Baseline Mean Temp
-                    </span>
-
-                    <span className="c-val">
-                      {climateData.baselineMeanTemperature ??
-                        "--"}
-                      °C
-                    </span>
-                  </div>
-
-                  <div className="c-stat">
-                    <span className="c-lbl">
-                      Annual Rain Baseline
-                    </span>
-
-                    <span className="c-val">
-                      {climateData.baselineAnnualPrecipitation ??
-                        "--"}{" "}
-                      mm
-                    </span>
-                  </div>
-                </div>
-
-                <h4 className="trend-title">
-                  Yearly Mean Temperature
-                  Deviation
-                </h4>
-
-                <div className="trend-bars">
-                  {Array.isArray(
-                    climateData.yearlyMetrics
-                  ) &&
-                    climateData.yearlyMetrics.map(
-                      (metric: any) => {
-                        const anomaly = Number(
-                          metric.tempAnomalyVsBaseline ??
-                            0
-                        );
-
-                        const height = Math.min(
-                          100,
-                          Math.max(
-                            20,
-                            Math.abs(
-                              anomaly * 40
-                            )
-                          )
-                        );
-
-                        return (
-                          <div
-                            key={metric.year}
-                            className="year-bar-col"
-                          >
-                            <span className="bar-anomaly">
-                              {anomaly > 0
-                                ? `+${anomaly}`
-                                : anomaly}
-                              °
-                            </span>
-
-                            <div
-                              className={`bar-fill ${
-                                anomaly > 0
-                                  ? "pos"
-                                  : "neg"
-                              }`}
-                              style={{
-                                height: `${height}px`,
-                              }}
-                            />
-
-                            <span className="bar-year">
-                              {String(
-                                metric.year
-                              ).substring(2)}
-                            </span>
-                          </div>
-                        );
-                      }
-                    )}
-                </div>
-
-                <div className="climate-insights-box">
-                  <h4>
-                    Key Meteorological
-                    Findings:
-                  </h4>
-
-                  <ul>
-                    {Array.isArray(
-                      climateData.climateInsights
-                    ) &&
-                      climateData.climateInsights.map(
-                        (
-                          insight: string,
-                          index: number
-                        ) => (
-                          <li key={index}>
-                            {insight}
-                          </li>
-                        )
-                      )}
-                  </ul>
-                </div>
-              </div>
-            ) : (
-              <div className="loading-state">
-                Loading climate analytics...
-              </div>
-            )}
-          </div>
-        )}
+    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%' }}>
+      <div style={{ padding:'8px 12px', background:'var(--glass-bg)', borderBottom:'1px solid var(--glass-border)', display:'flex', gap:'6px', alignItems:'center', flexWrap:'wrap', flexShrink:0 }}>
+        <span style={{ fontSize:'11px', color:'var(--text-secondary)', fontWeight:600, marginRight:'2px' }}>Layer:</span>
+        {layers.map(b => (
+          <button key={b.id} onClick={() => switchLayer(b.id)} style={{
+            padding:'4px 10px', borderRadius:'16px', border:'1px solid',
+            borderColor: layer===b.id ? 'var(--accent-cyan)' : 'var(--glass-border)',
+            background:  layer===b.id ? 'var(--accent-cyan-dim)' : 'transparent',
+            color:       layer===b.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
+            fontSize:'11px', fontWeight:600, cursor:'pointer',
+          }}>{b.emoji} {b.label}</button>
+        ))}
+        {location && <span style={{ marginLeft:'auto', fontSize:'10px', color:'var(--text-muted)' }}>📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>}
       </div>
-
-      {/* Input */}
-
-      <div className="mobile-input-bar">
-        <input
-          ref={inputRef}
-          type="text"
-          className="mobile-input-field"
-          placeholder={
-            voiceStatus === "listening"
-              ? `Listening in ${activeLangObj.label}...`
-              : "Ask WeatherGPT (e.g. Sowing in Pune, Rain in Delhi)..."
-          }
-          value={input}
-          onChange={(event) =>
-            setInput(event.target.value)
-          }
-          onKeyDown={(event) => {
-            if (
-              event.key === "Enter" &&
-              !event.shiftKey
-            ) {
-              event.preventDefault();
-              handleSend();
-            }
-          }}
-          disabled={isLoading}
-          aria-label="Ask WeatherGPT"
-        />
-
-        <button
-          type="button"
-          className={`mobile-voice-btn ${
-            voiceStatus === "listening"
-              ? "pulsing"
-              : ""
-          }`}
-          onClick={toggleListen}
-          disabled={!voiceSupported || isLoading}
-          title={
-            voiceSupported
-              ? "Speak in your language"
-              : "Voice not supported in this browser"
-          }
-          aria-label="Voice input"
-        >
-          <Mic size={18} />
-        </button>
-
-        <button
-          type="button"
-          className="mobile-send-btn"
-          onClick={() => handleSend()}
-          disabled={
-            !input.trim() || isLoading
-          }
-          title="Send message"
-          aria-label="Send message"
-        >
-          <Send size={18} />
-        </button>
+      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
+        <div ref={ref} style={{ width:'100%', height:'100%', background:'#071018' }} />
+        {layer === 'humidity' && (
+          <div ref={humidityGradientRef} style={{ position:'absolute', inset:0, zIndex:5, pointerEvents:'none' }}>
+            {loading && !humidityData && (
+              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(5,11,18,0.6)', color:'#7ab8d4', fontSize:'13px' }}>Loading humidity overlay…</div>
+            )}
+            {humidityData && (
+              <div style={{ position:'absolute', bottom:8, right:8, background:'rgba(5,11,18,0.85)', padding:'6px 10px', borderRadius:'8px', border:'1px solid rgba(0,229,255,0.2)', fontSize:'10px', color:'#e0f7ff', zIndex:10 }}>
+                💧 Humidity Color Gradient — {humidityData.hourly?.relative_humidity_2m ? `${Math.min(...humidityData.hourly.relative_humidity_2m)}% – ${Math.max(...humidityData.hourly.relative_humidity_2m)}%` : 'Live'}
+              </div>
+            )}
+          </div>
+        )}
       </div>
     </div>
   );
 }
 
+// ─── Interactive Radar View ───
+function MobileRadarView({ location }: { location: Coordinates|null }) {
+  const ref = useRef<HTMLDivElement>(null);
+  const mapRef = useRef<any>(null);
+  useEffect(() => {
+    if (!ref.current || mapRef.current) return;
+    if (!document.querySelector('link[href*="leaflet"]')) {
+      const link = document.createElement('link'); link.rel='stylesheet';
+      link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
+    }
+    import('leaflet').then((L) => {
+      delete (L.Icon.Default.prototype as any)._getIconUrl;
+      L.Icon.Default.mergeOptions({
+        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
+        iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
+        shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
+      });
+      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
+      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution:'&copy; OpenStreetMap, &copy; CARTO', maxZoom:18 }).addTo(map);
+      L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo', { opacity:0.65, attribution:'Weather &copy; OpenWeatherMap' }).addTo(map);
+      L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=demo', { opacity:0.4, attribution:'Clouds &copy; OpenWeatherMap' }).addTo(map);
+      if (location) {
+        const icon = L.divIcon({
+          className:'', html:`<div style="width:14px;height:14px;background:rgba(0,229,255,0.9);border-radius:50%;border:2px solid white;box-shadow:0 0 0 4px rgba(0,229,255,0.3)"></div>`,
+          iconSize:[14,14], iconAnchor:[7,7],
+        });
+        L.marker([location.latitude, location.longitude], { icon }).addTo(map).bindPopup('📍 Your Location');
+      }
+      mapRef.current = map;
+    });
+    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
+  }, []);
+  return (
+    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%' }}>
+      <div style={{ padding:'8px 12px', background:'var(--glass-bg)', borderBottom:'1px solid var(--glass-border)', display:'flex', gap:'12px', alignItems:'center', flexShrink:0 }}>
+        <Radar size={14} style={{ color:'var(--accent-cyan)' }} />
+        <span style={{ fontSize:'12px', fontWeight:700, color:'var(--text-primary)' }}>Live Precipitation & Cloud Radar</span>
+      </div>
+      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
+        <div ref={ref} style={{ width:'100%', height:'100%', background:'#050b12' }} />
+      </div>
+    </div>
+  );
+}
+
+
+// ─── AI Chat View ───
+function AIChatView({ location, onNavigate }: { location: Coordinates|null; onNavigate?: (page: NavPage)=>void }) {
+  const [messages, setMessages] = useState<AiMessage[]>([{
+    role:'assistant', content:"👋 Hello! I'm **WeatherGPT**, your AI meteorological assistant aligned with MoES / IMD.\n\nAsk me about live forecasts, crop advisories, NWP models or climate trends!",
+  }]);
+  const [input, setInput] = useState('');
+  const [loading, setLoading] = useState(false);
+  const textareaRef = useRef<HTMLTextAreaElement>(null);
+  const endRef = useRef<HTMLDivElement>(null);
+
+  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, loading]);
+
+  const send = async (override?: string) => {
+    const prompt = (override ?? input).trim();
+    if (!prompt || loading) return;
+    setMessages(p => [...p, { role:'user', content:prompt }]);
+    setInput(''); setLoading(true);
+    if (textareaRef.current) textareaRef.current.style.height = 'auto';
+    try {
+      const res = await fetch(ML_AGENT_ENDPOINT, {
+        method:'POST', headers:{'Content-Type':'application/json'},
+        body: JSON.stringify({
+          prompt,
+          location: location ? { latitude:location.latitude, longitude:location.longitude, accuracy:location.accuracy } : null,
+        }),
+      });
+      if (!res.ok) throw new Error(`Status ${res.status}`);
+      const d = await res.json();
+      setMessages(p => [...p, { role:'assistant', content:d.message }]);
+    } catch {
+      setMessages(p => [...p, { role:'assistant', content:"⚠️ The AI service is temporarily unavailable. Please try again." }]);
+    } finally { setLoading(false); }
+  };
+
+  return (
+    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%', overflow:'hidden' }}>
+      <div style={{ flex:1, overflowY:'auto', padding:'16px 14px 8px' }}>
+        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
+          {messages.length <= 1 && (
+            <div style={{ paddingTop:'2vh' }}>
+              <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:'var(--accent-cyan-dim)', border:'1px solid var(--accent-cyan)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
+                <Cloud size={20} style={{ color:'var(--accent-cyan)' }} />
+              </div>
+              <h2 style={{ margin:'0 0 16px', fontSize:'clamp(18px,4vw,24px)', fontWeight:700, color:'var(--text-primary)', letterSpacing:'-0.4px', lineHeight:1.25 }}>
+                Where would you like weather updates for today?
+              </h2>
+              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'8px' }}>
+                {AI_SUGGESTIONS.map((s,i) => (
+                  <button key={i} onClick={() => send(s.text)} style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'10px', minHeight:'80px', padding:'12px', textAlign:'left', background:'var(--glass-bg)', borderRadius:'12px', border:'1px solid var(--glass-border)', cursor:'pointer', transition:'border-color 0.15s' }}>
+                    <p style={{ margin:0, fontSize:'13px', fontWeight:500, color:'var(--text-primary)', lineHeight:1.4 }}>{s.text}</p>
+                    <span style={{ fontSize:'11px', color:'var(--text-muted)' }}>{s.title}</span>
+                  </button>
+                ))}
+              </div>
+              <div style={{ marginTop:'16px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
+                <span style={{ fontSize:'11px', color:'var(--text-muted)', marginRight:'4px', alignSelf:'center' }}>Quick:</span>
+                {['NWP Models','Sectors','Alerts','Climate','Route Weather'].map(t => (
+                  <button key={t} onClick={() => { const map: Record<string,NavPage>={ 'NWP Models':'nwp','Sectors':'sectors','Alerts':'alerts','Climate':'climate','Route Weather':'route'}; onNavigate?.(map[t]); }}
+                    style={{ padding:'4px 10px', borderRadius:'12px', background:'var(--glass-bg)', border:'1px solid var(--glass-border)', color:'var(--accent-cyan)', fontSize:'11px', cursor:'pointer' }}>
+                    {t}
+                  </button>
+                ))}
+              </div>
+            </div>
+          )}
+          {messages.length > 1 && (
+            <div style={{ display:'flex', flexDirection:'column', gap:'14px', paddingBottom:'6px' }}>
+              {messages.map((m,i) => (
+                <div key={i} style={{ display:'flex', gap:'8px', justifyContent:m.role==='user'?'flex-end':'flex-start', alignItems:'flex-start' }}>
+                  {m.role==='assistant' && (
+                    <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'var(--accent-cyan)' }}>
+                      <Cloud size={12} />
+                    </div>
+                  )}
+                  <div style={{ maxWidth:'min(78%,720px)' }}>
+                    {m.role==='user' ? (
+                      <div style={{ background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', color:'var(--text-primary)', padding:'8px 12px', borderRadius:'16px', borderTopRightRadius:'4px', fontSize:'14px', lineHeight:1.5 }}>
+                        <p style={{ margin:0, whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{m.content}</p>
+                      </div>
+                    ) : (
+                      <div style={{ background:'var(--glass-bg)', border:'1px solid var(--glass-border)', padding:'10px 12px', borderRadius:'16px', borderTopLeftRadius:'4px', color:'var(--text-primary)', fontSize:'14px', lineHeight:1.65 }}>
+                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
+                      </div>
+                    )}
+                  </div>
+                  {m.role==='user' && (
+                    <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:'var(--glass-bg-strong)', color:'var(--text-secondary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:600, flexShrink:0 }}>U</div>
+                  )}
+                </div>
+              ))}
+              {loading && (
+                <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
+                  <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-cyan)' }}>
+                    <Cloud size={12} />
+                  </div>
+                  <div style={{ width:'90px', height:'10px', borderRadius:'6px', background:'linear-gradient(90deg,var(--glass-bg) 25%,var(--glass-bg-strong) 50%,var(--glass-bg) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite' }} />
+                </div>
+              )}
+              <div ref={endRef} />
+            </div>
+          )}
+        </div>
+      </div>
+    </div>
+  );
+}
+
+// ─── Forecast View ───
+function ForecastView({ forecastList }: { forecastList: any[] }) {
+  if (!forecastList?.length) return <div className="mob-loading">No forecast data</div>;
+  return (
+    <div className="mob-screen">
+      {forecastList.map((day, i) => (
+        <div key={i} className="mob-forecast-day">
+          <strong>{i===0?'Today':i===1?'Tomorrow':day.date || `Day ${i+1}`}</strong>
+          <span className="temp">{Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°</span>
+          <span className="desc">{day.weatherDescription || '—'}</span>
+          <span className="rain">🌧️ {day.precipitationProbabilityMax ?? '--'}%</span>
+        </div>
+      ))}
+    </div>
+  );
+}
+
+// ─── NWP View ───
+function NWPView({ nwpComparison }: { nwpComparison: any }) {
+  if (!nwpComparison) return <div className="mob-loading">Loading NWP data…</div>;
+  return (
+    <div className="mob-screen">
+      <div className="mob-consensus">
+        <div className="mob-score">
+          <span>{nwpComparison.consensus?.consensusScorePercentage ?? '--'}%</span>
+          <span>Score</span>
+        </div>
+        <div>
+          <strong style={{ fontSize:'13px', color:'#38bdf8' }}>Confidence: {nwpComparison.consensus?.confidenceLevel ?? '—'}</strong>
+          <p style={{ fontSize:'11px', color:'var(--text-muted)', margin:'4px 0 0' }}>{nwpComparison.consensus?.synopticSummary || '—'}</p>
+          <p style={{ fontSize:'10px', color:'var(--text-muted)', margin:'2px 0 0' }}>
+            Spread: {nwpComparison.consensus?.tempSpread ?? '--'}°C • Rain: {nwpComparison.consensus?.precipSpread ?? '--'}mm
+          </p>
+        </div>
+      </div>
+      {(nwpComparison.models || []).map((m: any, i: number) => (
+        <div key={i} className="mob-nwp-model">
+          <h4>{m.modelName} ({m.resolution})</h4>
+          <p>Max: {m.maxTemp}°C | Min: {m.minTemp}°C</p>
+          <p>Rain: {m.totalPrecipitation}mm | Wind: {m.maxWindSpeed}km/h</p>
+          <p style={{ color:'var(--accent-cyan)', marginTop:'4px' }}>{m.synopticCondition}</p>
+        </div>
+      ))}
+    </div>
+  );
+}
+
+// ─── Sectors View ───
+function SectorsView({ sectorAdvisory, activeSector, setActiveSector, sectorLoading }: { sectorAdvisory: any; activeSector: string; setActiveSector: (s: 'agriculture'|'aviation'|'marine'|'urban')=>void; sectorLoading: boolean }) {
+  const sectors = ['agriculture','aviation','marine','urban'] as const;
+  return (
+    <div className="mob-screen">
+      <div className="mob-sector-tabs">
+        {sectors.map(sec => (
+          <button key={sec} onClick={() => setActiveSector(sec)} className={`mob-sector-tab ${activeSector===sec?'active':''}`}>
+            {sec==='agriculture'?'🌾 Ag':sec==='aviation'?'✈️ Avi':sec==='marine'?'⚓ Marine':'🏙️ City'}
+          </button>
+        ))}
+      </div>
+      {sectorLoading ? <div className="mob-loading">Loading…</div> : !sectorAdvisory ? <div className="mob-empty">No advisory data</div> : (
+        <div className="mob-card">
+          {activeSector==='agriculture' && sectorAdvisory.agriculture && (
+            <>
+              <div className="mob-directive alert-success"><strong>Sowing:</strong> {sectorAdvisory.agriculture.sowingAdvisory}</div>
+              <div className="mob-directive alert-success"><strong>Irrigation:</strong> {sectorAdvisory.agriculture.irrigationRecommendation}</div>
+              <div className="mob-directive"><strong>Spraying:</strong> {sectorAdvisory.agriculture.sprayingWindow}</div>
+            </>
+          )}
+          {activeSector==='aviation' && sectorAdvisory.aviation && (
+            <>
+              <div className="mob-directive"><strong>Flight Category:</strong> {sectorAdvisory.aviation.flightCategory}</div>
+              <code style={{ display:'block', background:'rgba(5,11,18,0.8)', padding:'8px', borderRadius:'6px', fontSize:'11px', color:'#93c5fd', marginTop:'6px' }}>{sectorAdvisory.aviation.metarCode}</code>
+            </>
+          )}
+          {activeSector==='marine' && sectorAdvisory.marine && (
+            <div className="mob-directive"><strong>Fishermen:</strong> {sectorAdvisory.marine.fishermenAction}</div>
+          )}
+          {activeSector==='urban' && sectorAdvisory.smartCity && (
+            <>
+              <div className="mob-directive alert-danger"><strong>Flood Risk:</strong> {sectorAdvisory.smartCity.waterloggingFloodRisk}</div>
+              <div className="mob-directive"><strong>Heat Island:</strong> {sectorAdvisory.smartCity.urbanHeatIslandIndex}°C</div>
+            </>
+          )}
+        </div>
+      )}
+    </div>
+  );
+}
+
+// ─── Alerts View ───
+function AlertsView({ alertsList, currentCity }: { alertsList: any[]; currentCity: string }) {
+  return (
+    <div className="mob-screen">
+      <h3>🚨 IMD Early Warnings — {currentCity}</h3>
+      {alertsList.length===0 ? (
+        <div className="mob-card" style={{ textAlign:'center', padding:'24px' }}>
+          <p style={{ color:'var(--green)', fontSize:'24px', marginBottom:'8px' }}>🟢</p>
+          <p style={{ fontWeight:700, color:'var(--green)' }}>IMD Green: Normal Weather</p>
+          <p style={{ color:'var(--text-muted)', fontSize:'12px', marginTop:'4px' }}>No severe warnings for {currentCity}.</p>
+        </div>
+      ) : alertsList.map((a: any) => {
+        const sev = String(a.severity ?? '').toLowerCase();
+        return (
+          <div key={a.id} className={`mob-alert-card ${sev==='extreme'?'extreme':sev==='severe'?'severe':''}`}>
+            <div className="mob-alert-header">
+              <span className="mob-badge mob-badge-red">{a.severity}</span>
+              <span className="mob-badge">{a.informationClass}</span>
+            </div>
+            <p style={{ fontWeight:600, margin:'4px 0' }}>{a.title}</p>
+            <p style={{ fontSize:'12px', color:'var(--text-sec)' }}>{a.description}</p>
+          </div>
+        );
+      })}
+    </div>
+  );
+}
+
+// ─── Climate View ───
+function ClimateView({ climateInfo, currentCity }: { climateInfo: any; currentCity: string }) {
+  if (!climateInfo) return <div className="mob-loading">Loading climate data…</div>;
+  return (
+    <div className="mob-screen">
+      <h3>📈 Climate Analysis — {currentCity}</h3>
+      <div className="mob-climate-grid">
+        <div className="mob-climate-stat">
+          <span className="lbl">Warming/dec</span>
+          <span className="val hot">+{climateInfo.warmingRatePerDecade}°C</span>
+        </div>
+        <div className="mob-climate-stat">
+          <span className="lbl">Baseline Temp</span>
+          <span className="val">{climateInfo.baselineMeanTemperature}°C</span>
+        </div>
+        <div className="mob-climate-stat">
+          <span className="lbl">Rain/yr</span>
+          <span className="val">{climateInfo.baselineAnnualPrecipitation}mm</span>
+        </div>
+      </div>
+      {climateInfo.yearlyMetrics?.length > 0 && (
+        <div className="mob-card">
+          <h4 className="mob-card-title">📊 Year-by-Year Temperature</h4>
+          <div className="mob-trend-bars">
+            {climateInfo.yearlyMetrics.map((ym: any, i: number) => {
+              const temps = climateInfo.yearlyMetrics.map((y: any) => y.meanTemperature||0);
+              const mn=Math.min(...temps), mx=Math.max(...temps), rng=mx-mn||1;
+              const h=Math.max(8,((ym.meanTemperature-mn)/rng)*64+8);
+              return (
+                <div key={i} className="mob-bar-col">
+                  <div className={`mob-bar-fill ${ym.meanTemperature>(mn+mx)/2?'pos':'neg'}`} style={{ height:`${h}px` }} title={`${ym.year}: ${ym.meanTemperature}°C`} />
+                  <span className="mob-bar-label">{ym.year}</span>
+                </div>
+              );
+            })}
+          </div>
+        </div>
+      )}
+    </div>
+  );
+}
+
+// ─── Route Weather View ───
+function RouteWeatherView() {
+  const [form, setForm] = useState({ origin:'Delhi', destination:'Agra', departure_time:'08:00' });
+  const [loading, setLoading] = useState(false);
+  const [resp, setResp] = useState<any>(null);
+  const [err, setErr] = useState<string|null>(null);
+
+  const handleSubmit = async (e: React.FormEvent) => {
+    e.preventDefault(); setLoading(true); setErr(null); setResp(null);
+    try {
+      const res = await fetch(ML_ROUTE_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
+      if (!res.ok) throw new Error(`Error ${res.status}`);
+      setResp(await res.json());
+    } catch (e: any) { setErr(e.message || 'Failed to fetch route weather.'); }
+    finally { setLoading(false); }
+  };
+
+  return (
+    <div style={S.scrollWrap}>
+      <div style={S.container}>
+        <header>
+          <h2 style={{ margin:0, fontSize:'1.2rem', fontWeight:700, color:'var(--text-primary)' }}>Route weather analyzer</h2>
+          <p style={{ margin:'4px 0 0', fontSize:'0.82rem', color:'var(--text-muted)' }}>Check conditions and risk along a journey. Ask <strong style={{ color:'var(--accent-cyan)' }}>AI Chat</strong> for route insights.</p>
+        </header>
+        <form onSubmit={handleSubmit} style={{ ...S.card, display:'flex', flexDirection:'column', gap:'12px' }}>
+          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
+            {(['origin','destination'] as const).map(field => (
+              <div key={field} style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
+                <label style={S.label}>{field}</label>
+                <input style={S.input} type="text" name={field} value={form[field]} onChange={e => setForm({...form, [field]:e.target.value})} required placeholder={field==='origin'?'e.g. Delhi':'e.g. Agra'} />
+              </div>
+            ))}
+            <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
+              <label style={S.label}>Departure</label>
+              <input style={S.input} type="time" name="departure_time" value={form.departure_time} onChange={e => setForm({...form, departure_time:e.target.value})} required />
+            </div>
+          </div>
+          <button type="submit" disabled={loading} style={S.btn}>{loading?'Analyzing…':'Analyze route'}</button>
+        </form>
+        {err && <div style={S.error}>{err}</div>}
+        {resp && resp.risk_summary && (
+          <div style={S.card}>
+            <h3 style={S.cardTitle}>Risk summary</h3>
+            <div className="mob-risk-grid">
+              <div className="mob-risk-card high"><span className="count">{resp.risk_summary.HIGH ?? 0}</span><span className="lbl">High-risk</span></div>
+              <div className="mob-risk-card mod"><span className="count">{resp.risk_summary.MODERATE ?? 0}</span><span className="lbl">Moderate</span></div>
+              <div className="mob-risk-card low"><span className="count">{resp.risk_summary.LOW ?? 0}</span><span className="lbl">Low-risk</span></div>
+            </div>
+          </div>
+        )}
+        {resp && resp.weather_data && (
+          <div style={S.card}>
+            <h3 style={S.cardTitle}>Waypoint forecasts</h3>
+            {Array.isArray(resp.weather_data) ? (
+              <div style={{ overflowX:'auto' }}>
+                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.8rem' }}>
+                  <thead><tr>{['#','Point','Condition','Temp','Risk'].map(h=><th key={h} style={{ padding:'8px', borderBottom:'1px solid var(--glass-border)', fontSize:'11px', color:'#7ab8d4', textAlign:'left' }}>{h}</th>)}</tr></thead>
+                  <tbody>
+                    {resp.weather_data.map((item: any, i: number) => (
+                      <tr key={i} style={{ borderBottom:'1px solid rgba(0,229,255,0.05)' }}>
+                        <td style={{ padding:'8px', color:'#4a6a7d' }}>{i+1}</td>
+                        <td style={{ padding:'8px', fontWeight:600, color:'#e0f7ff' }}>{item.location||item.point||`Point ${i+1}`}</td>
+                        <td style={{ padding:'8px', color:'#b8d4e8' }}>{item.weather||item.condition||'—'}</td>
+                        <td style={{ padding:'8px', color:'#b8d4e8' }}>{(item.temp??item.temperature)??'—'}°C</td>
+                        <td style={{ padding:'8px' }}><span className="mob-badge" style={{ background: (item.risk||'NORMAL').toUpperCase()==='HIGH'?'rgba(229,101,74,0.3)':(item.risk||'NORMAL').toUpperCase()==='MODERATE'?'rgba(224,166,63,0.3)':'rgba(0,229,255,0.1)', color:(item.risk||'NORMAL').toUpperCase()==='HIGH'?'#f0a08c':(item.risk||'NORMAL').toUpperCase()==='MODERATE'?'#f0cf8f':'#67e8f9' }}>{(item.risk||'NORMAL').toUpperCase()}</span></td>
+                      </tr>
+                    ))}
+                  </tbody>
+                </table>
+              </div>
+            ) : <pre style={S.jsonBlock}>{JSON.stringify(resp.weather_data, null, 2)}</pre>}
+          </div>
+        )}
+      </div>
+    </div>
+  );
+}
+
+// ─── Weather Report View ───
+function WeatherReportView({ location }: { location: Coordinates|null }) {
+  const [cityInput, setCityInput] = useState('');
+  const [record, setRecord] = useState<ForecastRecord|null>(null);
+  const [loading, setLoading] = useState(false);
+  const [banner, setBanner] = useState<{tone:'error'|'info';text:string}|null>(null);
+  const [online, setOnline] = useState(navigator.onLine);
+  const autoRef = useRef(false);
+
+  useEffect(() => {
+    const on=()=>setOnline(true), off=()=>setOnline(false);
+    window.addEventListener('online',on); window.addEventListener('offline',off);
+    return ()=>{ window.removeEventListener('online',on); window.removeEventListener('offline',off); };
+  }, []);
+
+  useEffect(() => {
+    if (autoRef.current || record || !location) return;
+    autoRef.current = true;
+    (async () => {
+      setLoading(true);
+      try {
+        const name = await reverseGeocodeForReport(location.latitude, location.longitude);
+        const r = await fetchForecastRecord({ latitude:location.latitude, longitude:location.longitude, name });
+        setRecord(r);
+      } catch { /* silent */ } finally { setLoading(false); }
+    })();
+  }, [location, record]);
+
+  const search = async (override?: string) => {
+    const city = (override ?? cityInput).trim();
+    if (!city) { setBanner({tone:'error', text:'Enter a city.'}); return; }
+    if (!online) {
+      if (record) setBanner({tone:'info', text:'Offline — cached forecast.'});
+      else setBanner({tone:'error', text:'Offline and no cached forecast.'});
+      return;
+    }
+    setLoading(true); setBanner(null);
+    try {
+      const place = await geocodeCity(city);
+      const r = await fetchForecastRecord(place);
+      setRecord(r);
+    } catch (e: any) {
+      if (record) setBanner({tone:'info', text:`${e.message} Cached.`});
+      else setBanner({tone:'error', text:e.message});
+    } finally { setLoading(false); }
+  };
+
+  return (
+    <div style={S.scrollWrap}>
+      <div style={S.container}>
+        <header>
+          <h2 style={{ margin:0, fontSize:'1.2rem', fontWeight:700, color:'var(--text-primary)' }}>Weather report</h2>
+          <p style={{ margin:'4px 0 0', fontSize:'0.82rem', color:'var(--text-muted)' }}>Search any city. Ask <strong style={{ color:'var(--accent-cyan)' }}>AI Chat</strong> for natural language queries.</p>
+        </header>
+        <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }}>
+          <span style={{ padding:'4px 10px', borderRadius:'12px', fontSize:'10px', fontWeight:600, border:'1px solid var(--glass-border)', color: online?'var(--accent-cyan)':'#f87171' }}>{online?'🟢 Online':'🔴 Offline'}</span>
+          <input style={{...S.input, flex:1}} type="text" value={cityInput} onChange={e=>setCityInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder="City e.g. Delhi" />
+          <button onClick={()=>search()} disabled={loading} style={S.btn}>{loading?'…':'Search'}</button>
+        </div>
+        {banner && <div style={banner.tone==='error'?S.error:S.successBanner}>{banner.text}</div>}
+        {!record && !loading && <div style={S.card}><p style={{margin:0, color:'var(--text-muted)', fontSize:'0.85rem'}}>Search a city to load forecast.</p></div>}
+        {record && (
+          <>
+            <div style={S.card}>
+              <div className="mob-report-current">
+                <div>
+                  <h3 style={{ margin:0, fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>{record.location.name}{record.location.country?`, ${record.location.country}`:''}</h3>
+                  <p style={{ margin:0, fontSize:'10px', color:'var(--text-muted)' }}>Updated: {new Date(record.savedAt).toLocaleString()}</p>
+                </div>
+                <div className="mob-report-temp">{Math.round(record.hourly24h.temperature[0])}°C</div>
+              </div>
+              <div className="mob-report-meta">
+                <span>{wmoDesc(record.hourly24h.weatherCode[0])}</span>
+                <span>💧 {record.hourly24h.humidity[0]}%</span>
+                <span>💨 {record.hourly24h.wind[0]} km/h</span>
+              </div>
+            </div>
+            <div style={S.card}>
+              <h3 style={S.cardTitle}>24-hour forecast</h3>
+              <div className="mob-report-hourly">
+                {record.hourly24h.time.map((t,i)=>(
+                  <div key={t} className="mob-hour-card">
+                    <div className="time">{new Date(t).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}</div>
+                    <div className="temp">{Math.round(record.hourly24h.temperature[i])}°C</div>
+                    <div className="desc">{wmoDesc(record.hourly24h.weatherCode[i])}</div>
+                    <div className="meta">💧 {record.hourly24h.humidity[i]}%</div>
+                    <div className="meta">🌧️ {record.hourly24h.precipitationProbability[i]}%</div>
+                  </div>
+                ))}
+              </div>
+            </div>
+            <div style={S.card}>
+              <h3 style={S.cardTitle}>7-day forecast</h3>
+              <div className="mob-report-daily">
+                {record.daily7days.time.map((t,i)=>(
+                  <div key={t} className="mob-day-card">
+                    <strong>{new Date(t).toLocaleDateString([],{weekday:'short'})}</strong>
+                    <span>{wmoDesc(record.daily7days.weatherCode[i])}</span>
+                    <span>🌡️ {Math.round(record.daily7days.maxTemperature[i])}° / {Math.round(record.daily7days.minTemperature[i])}°</span>
+                    <span style={{color:'var(--text-muted)'}}>🌧️ {record.daily7days.precipitationProbability[i]}%</span>
+                  </div>
+                ))}
+              </div>
+            </div>
+          </>
+        )}
+      </div>
+    </div>
+  );
+}
+
+
+// ─── Root App Component ───
+export default function MobileWeatherGPT() {
+  // ── Navigation ──
+  const [activeNav, setActiveNav] = useState<NavPage>('aichat');
+  const [drawerOpen, setDrawerOpen] = useState(false);
+
+  // ── Location state ──
+  const [gpsLocation, setGpsLocation] = useState<Coordinates|null>(null);
+  const [locationStatus, setLocationStatus] = useState<LocationStatus>('pending');
+  const [currentCity, setCurrentCity] = useState('Delhi');
+
+  // ── AI Chat data (Java backend) ──
+  const [chatMessages, setChatMessages] = useState<{id:string;role:'user'|'bot';content:string;voiceAnswer?:string}[]>([{
+    id:'1', role:'bot', content:"👋 Hello! I'm **WeatherGPT**, your AI meteorological assistant aligned with MoES / IMD.\n\nAsk me about live forecasts, crop advisories, NWP models or climate trends!",
+  }]);
+  const [chatInput, setChatInput] = useState('');
+  const [isChatLoading, setIsChatLoading] = useState(false);
+  const [selectedLang] = useState('en');
+  const [voiceEnabled, setVoiceEnabled] = useState(false);
+
+  // ── Screen data state ──
+  const [forecastList, setForecastList] = useState<any[]>([]);
+  const [nwpComparison, setNwpComparison] = useState<any>(null);
+  const [sectorAdvisory, setSectorAdvisory] = useState<any>(null);
+  const [activeSector, setActiveSector] = useState<'agriculture'|'aviation'|'marine'|'urban'>('agriculture');
+  const [alertsList, setAlertsList] = useState<any[]>([]);
+  const [climateInfo, setClimateInfo] = useState<any>(null);
+  const [sectorLoading, setSectorLoading] = useState(false);
+
+  // ── Voice ──
+  const { status:sttStatus, isSupported:sttSupported, startListening, stopListening } = useVoiceInput({
+    lang: 'en-IN',
+    onTranscript: (text) => { if (text) setChatInput(text); },
+    onError: (err) => console.error('Voice error:', err),
+  });
+  const { speak, stop:stopSpeech } = useVoiceOutput();
+
+  // Chat messages end ref
+  const chatEndRef = useRef<HTMLDivElement>(null);
+  const chatInputRef = useRef<HTMLInputElement>(null);
+
+  // GPS location request
+  const requestLocation = useCallback(() => {
+    if (!('geolocation' in navigator)) { setLocationStatus('unsupported'); return; }
+    setLocationStatus('pending');
+    navigator.geolocation.getCurrentPosition(
+      p => { setGpsLocation({ latitude:p.coords.latitude, longitude:p.coords.longitude, accuracy:p.coords.accuracy }); setLocationStatus('granted'); },
+      () => { setGpsLocation(null); setLocationStatus('denied'); },
+      { enableHighAccuracy:false, timeout:8000, maximumAge:300000 }
+    );
+  }, []);
+
+  useEffect(() => { requestLocation(); }, [requestLocation]);
+
+  // Fetch all Java-backend data on city/sector change
+  useEffect(() => {
+    const ctrl = new AbortController();
+    (async () => {
+      try {
+        await fetchWeather(currentCity, ctrl.signal);
+        await fetchNwp(currentCity, ctrl.signal);
+        await fetchSector(currentCity, activeSector, ctrl.signal);
+        await fetchAlerts(currentCity, ctrl.signal);
+        await fetchClimate(currentCity, ctrl.signal);
+      } catch (e) { if (!(e instanceof Error && e.name==='AbortError')) console.warn('Initial load error:', e); }
+    })();
+    return () => ctrl.abort();
+  }, [currentCity, activeSector]);
+
+  const fetchWeather = async (city: string, signal?: AbortSignal) => {
+    try {
+      const f = await fetch(WEATHER_ENDPOINTS.FORECAST(city,7), {signal}); const fd = await f.json();
+      if (fd.success && fd.data?.days) setForecastList(fd.data.days);
+    } catch (e) { if (!(e instanceof Error && e.name==='AbortError')) console.warn('Weather error:', e); }
+  };
+  const fetchNwp = async (city: string, signal?: AbortSignal) => {
+    try { const r=await fetch(WEATHER_ENDPOINTS.NWP(city),{signal}); const d=await r.json(); if(d.success&&d.data) setNwpComparison(d.data); }
+    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('NWP error:',e); }
+  };
+  const fetchSector = async (city: string, sector: string, signal?: AbortSignal) => {
+    setSectorLoading(true);
+    try { const r=await fetch(ADVISORIES_ENDPOINT(city,sector),{signal}); const d=await r.json(); if(d.success&&d.data) setSectorAdvisory(d.data); }
+    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Sector error:',e); }
+    finally { setSectorLoading(false); }
+  };
+  const fetchAlerts = async (city: string, signal?: AbortSignal) => {
+    try { const r=await fetch(ALERTS_ENDPOINT(city),{signal}); const d=await r.json(); if(d.success&&d.data?.alerts) setAlertsList(d.data.alerts); }
+    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Alerts error:',e); }
+  };
+  const fetchClimate = async (city: string, signal?: AbortSignal) => {
+    try { const r = await fetch(CLIMATE_ENDPOINT(city),{signal}); const d = await r.json(); if(d.success&&d.data) setClimateInfo(d.data); }
+    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Climate error:',e); }
+  };
+
+  // Send chat message
+  const handleSendChat = useCallback(async (customMsg?: string) => {
+    const text = (customMsg ?? chatInput).trim();
+    if (!text || isChatLoading) return;
+    if (!customMsg) setChatInput('');
+    setIsChatLoading(true);
+    const userMsg = { id:Date.now().toString(), role:'user' as const, content:text };
+    setChatMessages(p => [...p, userMsg]);
+    try {
+      const res = await fetch(CHAT_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'},
+        body:JSON.stringify({ message:text, language:selectedLang, sector:activeSector, sessionId:'mobile-session-01' }) });
+      const d = await res.json();
+      if (d.success && d.data) {
+        const bot = { id:(Date.now()+1).toString(), role:'bot' as const, content:d.data.answer||'Query processed.', voiceAnswer:d.data.voiceAnswer||d.data.answer };
+        setChatMessages(p => [...p, bot]);
+        if (d.data.location?.name) setCurrentCity(d.data.location.name);
+        if (voiceEnabled && d.data.voiceAnswer) speak(d.data.voiceAnswer, 'en-IN');
+      } else {
+        setChatMessages(p => [...p, { id:(Date.now()+1).toString(), role:'bot', content:d.message||'Could not process query.' }]);
+      }
+    } catch {
+      setChatMessages(p => [...p, { id:(Date.now()+1).toString(), role:'bot', content:'⚠️ Unable to connect to backend.' }]);
+    } finally { setIsChatLoading(false); }
+  }, [chatInput, isChatLoading, selectedLang, activeSector, voiceEnabled]);
+
+  // Toggle voice
+  const toggleVoice = useCallback(() => {
+    if (sttStatus==='listening') { stopListening(); setVoiceEnabled(false); }
+    else { stopSpeech(); startListening(); setVoiceEnabled(true); }
+  }, [sttStatus, startListening, stopListening, stopSpeech]);
+
+  // Scroll chat on new messages
+  useEffect(() => {
+    if (chatMessages.length > 1 || isChatLoading) chatEndRef.current?.scrollIntoView({behavior:'smooth'});
+  }, [chatMessages, isChatLoading]);
+
+  // ─── Navigation helpers ───
+  const navigate = (page: NavPage) => {
+    setActiveNav(page);
+    setDrawerOpen(false);
+  };
+
+  // ─── AI Chat input bar (always visible for chat-first UX) ───
+  const renderBottomBar = () => {
+    if (activeNav === 'aichat') {
+      return (
+        <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'6px 10px 10px', background:'rgba(11,19,34,0.95)', borderTop:'1px solid var(--glass-border)', flexShrink:0 }}>
+          <input
+            ref={chatInputRef} type="text" placeholder="Ask WeatherGPT AI…" value={chatInput}
+            onChange={e => setChatInput(e.target.value)}
+            onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSendChat();} }}
+            style={{ flex:1, padding:'9px 14px', borderRadius:'20px', border:'1px solid var(--glass-border)', background:'rgba(30,41,59,0.7)', color:'#e8f4fc', fontSize:'13px', outline:'none' }}
+          />
+          {sttSupported && (
+            <button onClick={toggleVoice} style={{ width:'34px', height:'34px', borderRadius:'50%', border:'1px solid var(--glass-border)', background: voiceEnabled?'var(--accent-cyan-dim)':'transparent', color:'var(--accent-cyan)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
+              <Mic size={14} />
+            </button>
+          )}
+          <button onClick={() => handleSendChat()} disabled={!chatInput.trim()||isChatLoading} style={{ width:'34px', height:'34px', borderRadius:'50%', border:'none', background:!chatInput.trim()||isChatLoading?'var(--glass-bg-strong)':'linear-gradient(120deg,var(--accent-cyan) 0%,var(--accent-blue) 100%)', color:!chatInput.trim()||isChatLoading?'var(--text-muted)':'#050b12', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
+            <Send size={14} />
+          </button>
+        </div>
+      );
+    }
+    // On other tabs, show chat-first input bar
+    return (
+      <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'6px 10px 10px', background:'rgba(11,19,34,0.95)', borderTop:'1px solid var(--glass-border)', flexShrink:0 }}>
+        <input
+          ref={chatInputRef} type="text" placeholder="Ask AI Chat anything…" value={chatInput}
+          onChange={e => setChatInput(e.target.value)}
+          onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSendChat();} }}
+          style={{ flex:1, padding:'9px 14px', borderRadius:'20px', border:'1px solid var(--glass-border)', background:'rgba(30,41,59,0.7)', color:'#e8f4fc', fontSize:'13px', outline:'none' }}
+        />
+        <button onClick={() => navigate('aichat')} style={{ padding:'8px 12px', borderRadius:'16px', background:'var(--accent-cyan-dim)', border:'1px solid var(--accent-cyan)', color:'var(--accent-cyan)', fontSize:'11px', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>
+          AI Chat
+        </button>
+        <button onClick={() => handleSendChat()} disabled={!chatInput.trim()||isChatLoading} style={{ width:'34px', height:'34px', borderRadius:'50%', border:'none', background:!chatInput.trim()||isChatLoading?'var(--glass-bg-strong)':'linear-gradient(120deg,var(--accent-cyan) 0%,var(--accent-blue) 100%)', color:!chatInput.trim()||isChatLoading?'var(--text-muted)':'#050b12', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
+          <Send size={14} />
+        </button>
+      </div>
+    );
+  };
+
+  // ─── Tab bar ───
+  const renderTabs = () => (
+    <nav className="mob-tabs">
+      {TAB_ITEMS.map(t => (
+        <button key={t.id} className={`mob-tab ${activeNav===t.id?'active':''}`} onClick={() => navigate(t.id)}>
+          {t.emoji} {t.label}
+          {t.id==='alerts' && alertsList.length > 0 && (
+            <span className="tab-badge mob-badge" style={{ marginLeft:'3px' }}>{alertsList.length}</span>
+          )}
+        </button>
+      ))}
+    </nav>
+  );
+
+  // ─── Header ───
+  const renderHeader = () => (
+    <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 12px', height:'52px', background:'rgba(11,19,34,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border-card)', flexShrink:0, zIndex:20 }}>
+      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
+        <button onClick={() => setDrawerOpen(true)} style={{ background:'transparent', border:'none', color:'var(--accent-cyan)', cursor:'pointer', display:'flex', padding:'4px' }} aria-label="Open menu">
+          <Menu size={20} />
+        </button>
+        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
+          <Cloud size={22} style={{ color:'var(--accent-cyan)' }} />
+          <span style={{ fontSize:'14px', fontWeight:700, color:'var(--m-text)' }}>WeatherGPT</span>
+        </div>
+      </div>
+      <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
+        <button onClick={requestLocation} style={{ fontSize:'10px', padding:'3px 8px', borderRadius:'10px', border:'1px solid var(--accent-cyan)', background:'var(--accent-cyan-dim)', color:'var(--accent-cyan)', cursor:'pointer', display:'flex', alignItems:'center', gap:'3px' }}>
+          <MapPin size={12} />
+          {gpsLocation ? `${gpsLocation.latitude.toFixed(2)},${gpsLocation.longitude.toFixed(2)}` : locationStatus==='denied'?'Blocked':'📍 Set'}
+        </button>
+      </div>
+    </header>
+  );
+
+  // ─── Drawer ───
+  const renderDrawer = () => {
+    const drawerItems: { id: NavPage; label: string; emoji: string }[] = [
+      { id:'nwp', label:'NWP Models', emoji:'🛰️' },
+      { id:'sectors', label:'Sectors', emoji:'🌾' },
+      { id:'alerts', label:'Alerts', emoji:'🚨' },
+      { id:'climate', label:'Climate', emoji:'📈' },
+      { id:'report', label:'Weather Report', emoji:'📋' },
+    ];
+    return (
+      <>
+        {drawerOpen && <div className="mob-drawer-overlay" onClick={() => setDrawerOpen(false)} />}
+        {drawerOpen && (
+          <div className="mob-drawer">
+            <button className="mob-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><X size={22} /></button>
+            <h3>More Sections</h3>
+            {drawerItems.map(item => (
+              <button key={item.id} className={`mob-drawer-item ${activeNav===item.id?'active':''}`} onClick={() => navigate(item.id)}>
+                <span>{item.emoji}</span> {item.label}
+              </button>
+            ))}
+          </div>
+        )}
+      </>
+    );
+  };
+
+  // ─── Fullscreen pages (AI / Maps) ───
+  const FULLSCREEN_PAGES: NavPage[] = ['aichat','route','map','radar'];
+  const isFullscreen = FULLSCREEN_PAGES.includes(activeNav);
+
+  // ─── Mobile chat toggle (quick access to AI Chat from anywhere) ───
+  const renderFloatChat = () => {
+    if (activeNav === 'aichat') return null;
+    return (
+      <button className="mob-float-chat" onClick={() => navigate('aichat')} aria-label="Open AI Chat" title="Ask AI Chat">
+        <Sparkles size={22} />
+      </button>
+    );
+  };
+
+  // ─── Tab content ───
+  const renderContent = () => {
+    if (isFullscreen) {
+      return (
+        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minHeight:0 }}>
+          {activeNav==='aichat' && <AIChatView location={gpsLocation} />}
+          {activeNav==='route' && <RouteWeatherView />}
+          {activeNav==='map' && <MobileMapView location={gpsLocation} />}
+          {activeNav==='radar' && <MobileRadarView location={gpsLocation} />}
+        </div>
+      );
+    }
+    return (
+      <div className="mob-content">
+        {activeNav==='forecast' && <ForecastView forecastList={forecastList} />}
+        {activeNav==='nwp' && <NWPView nwpComparison={nwpComparison} />}
+        {activeNav==='sectors' && <SectorsView sectorAdvisory={sectorAdvisory} activeSector={activeSector} setActiveSector={setActiveSector} sectorLoading={sectorLoading} />}
+        {activeNav==='alerts' && <AlertsView alertsList={alertsList} currentCity={currentCity} />}
+        {activeNav==='climate' && <ClimateView climateInfo={climateInfo} currentCity={currentCity} />}
+        {activeNav==='report' && <WeatherReportView location={gpsLocation} />}
+        {activeNav==='aichat' && <div className="mob-loading">AI Chat is the default screen — select another tab or use the drawer.</div>}
+      </div>
+    );
+  };
+
+  return (
+    <div className="mob-wrap">
+      {renderHeader()}
+      {renderTabs()}
+      {renderContent()}
+      {renderBottomBar()}
+      {renderFloatChat()}
+      {renderDrawer()}
+    </div>
+  );
+}
diff --git i/frontend/src/main.tsx w/frontend/src/main.tsx
index bef5202..12f6101 100644
--- i/frontend/src/main.tsx
+++ w/frontend/src/main.tsx
@@ -1,10 +1,15 @@
 import { StrictMode } from 'react'
 import { createRoot } from 'react-dom/client'
 import './index.css'
+import './styles/design-tokens.css'
+import './styles/layout.css'
 import App from './App.tsx'
+import { LocationProvider } from './location/LocationContext'
 
 createRoot(document.getElementById('root')!).render(
   <StrictMode>
-    <App />
+    <LocationProvider>
+      <App />
+    </LocationProvider>
   </StrictMode>,
-)
+)
\ No newline at end of file
diff --git i/frontend2/src/pages/ChatScreen.tsx w/frontend2/src/pages/ChatScreen.tsx
index e074d93..5bce2de 100644
--- i/frontend2/src/pages/ChatScreen.tsx
+++ w/frontend2/src/pages/ChatScreen.tsx
@@ -394,7 +394,12 @@ const routeStyles: { [key: string]: React.CSSProperties } = {
    same Open-Meteo data source and localStorage caching,
    rebuilt as React state instead of direct DOM manipulation.
 ---------------------------------------------------- */
-const WEATHER_REPORT_STORAGE_KEY = "weatherGPT_offline_forecast";
+// Per-location cache keys: a forecast saved for Delhi must never be served
+// for Ghaziabad (global location architecture, §22). A pointer keeps the
+// "last saved forecast" offline fallback working across locations.
+const LAST_CACHE_KEY = "weatherGPT_offline_forecast_last";
+const reportCacheKey = (lat: number, lon: number) =>
+  `weatherGPT_offline_forecast_${lat.toFixed(2)}_${lon.toFixed(2)}`;
 
 const WEATHER_CODE_DESCRIPTIONS: Record<number, string> = {
   0: "☀️ Clear",
@@ -510,18 +515,22 @@ async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
   };
 }
 
-function loadPersistedForecast(): ForecastRecord | null {
+function loadPersistedForecast(lat?: number, lon?: number): ForecastRecord | null {
   try {
-    const saved = localStorage.getItem(WEATHER_REPORT_STORAGE_KEY);
+    const key = lat != null && lon != null ? reportCacheKey(lat, lon) : (localStorage.getItem(LAST_CACHE_KEY) ?? "");
+    if (!key) return null;
+    const saved = localStorage.getItem(key);
     return saved ? JSON.parse(saved) : null;
   } catch {
     return null;
   }
 }
 
-function persistForecast(record: ForecastRecord) {
+function persistForecast(record: ForecastRecord, lat: number, lon: number) {
   try {
-    localStorage.setItem(WEATHER_REPORT_STORAGE_KEY, JSON.stringify(record));
+    const key = reportCacheKey(lat, lon);
+    localStorage.setItem(key, JSON.stringify(record));
+    localStorage.setItem(LAST_CACHE_KEY, key);
   } catch {
     // Storage full or unavailable — the report still works for this session.
   }
@@ -536,7 +545,8 @@ function WeatherReportView({ location }: { location: Coordinates | null }) {
   const autoLoadedRef = useRef(false);
 
   useEffect(() => {
-    const saved = loadPersistedForecast();
+    // This location's own cache first, else the most recently saved forecast.
+    const saved = loadPersistedForecast(location?.latitude, location?.longitude);
     if (saved) setRecord(saved);
 
     const goOnline = () => setOnline(true);
@@ -560,7 +570,7 @@ function WeatherReportView({ location }: { location: Coordinates | null }) {
         const name = await reverseGeocodeForReport(location.latitude, location.longitude);
         const place: GeoResult = { latitude: location.latitude, longitude: location.longitude, name };
         const next = await fetchForecastRecord(place);
-        persistForecast(next);
+        persistForecast(next, location.latitude, location.longitude);
         setRecord(next);
       } catch {
         // Silent — the user can still search manually.
@@ -593,7 +603,7 @@ function WeatherReportView({ location }: { location: Coordinates | null }) {
     try {
       const place = await geocodeCity(city);
       const next = await fetchForecastRecord(place);
-      persistForecast(next);
+      persistForecast(next, place.latitude, place.longitude);
       setRecord(next);
     } catch (err: any) {
       const saved = loadPersistedForecast();
```

## Staged Frontend/Frontend2 Diff
```diff
```

## Chat / Location / API References
```text
frontend/src/components/ChatDrawer.css:1:/* ===== ChatDrawer Component — Mobile Chat Conversation UI =====
frontend/src/components/ChatDrawer.tsx:5:import './ChatDrawer.css';
frontend/src/components/ChatDrawer.tsx:16:interface ChatDrawerProps {
frontend/src/components/ChatDrawer.tsx:23:export default function ChatDrawer({
frontend/src/components/ChatDrawer.tsx:28:}: ChatDrawerProps) {
frontend/src/components/ChatDrawer.tsx:98:        const res = await fetch('/api/chat/query', {
frontend/src/components/MobileWeatherGPT.tsx:7:import './MobileWeatherGPT.css';
frontend/src/components/MobileWeatherGPT.tsx:9:  CHAT_ENDPOINT, ML_AGENT_ENDPOINT, ML_ROUTE_ENDPOINT,
frontend/src/components/MobileWeatherGPT.tsx:18:interface Coordinates { latitude: number; longitude: number; accuracy?: number; }
frontend/src/components/MobileWeatherGPT.tsx:28:interface GeoResult { latitude: number; longitude: number; name: string; country?: string; }
frontend/src/components/MobileWeatherGPT.tsx:85:  return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
frontend/src/components/MobileWeatherGPT.tsx:97:  const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
frontend/src/components/MobileWeatherGPT.tsx:137:      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=relative_humidity_2m,temperature_2m&forecast_days=1&timezone=auto`)
frontend/src/components/MobileWeatherGPT.tsx:157:      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
frontend/src/components/MobileWeatherGPT.tsx:161:        markerRef.current = L.marker([location.latitude, location.longitude]).addTo(map).bindPopup('📍 Your Location').openPopup();
frontend/src/components/MobileWeatherGPT.tsx:170:      if (markerRef.current) markerRef.current.setLatLng([location.latitude, location.longitude]);
frontend/src/components/MobileWeatherGPT.tsx:171:      else markerRef.current = L.marker([location.latitude, location.longitude]).addTo(mapRef.current).bindPopup('📍 Your Location').openPopup();
frontend/src/components/MobileWeatherGPT.tsx:172:      mapRef.current.setView([location.latitude, location.longitude], 8);
frontend/src/components/MobileWeatherGPT.tsx:250:        {location && <span style={{ marginLeft:'auto', fontSize:'10px', color:'var(--text-muted)' }}>📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>}
frontend/src/components/MobileWeatherGPT.tsx:288:      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
frontend/src/components/MobileWeatherGPT.tsx:297:        L.marker([location.latitude, location.longitude], { icon }).addTo(map).bindPopup('📍 Your Location');
frontend/src/components/MobileWeatherGPT.tsx:318:function AIChatView({ location, onNavigate }: { location: Coordinates|null; onNavigate?: (page: NavPage)=>void }) {
frontend/src/components/MobileWeatherGPT.tsx:336:      const res = await fetch(ML_AGENT_ENDPOINT, {
frontend/src/components/MobileWeatherGPT.tsx:340:          location: location ? { latitude:location.latitude, longitude:location.longitude, accuracy:location.accuracy } : null,
frontend/src/components/MobileWeatherGPT.tsx:682:        const name = await reverseGeocodeForReport(location.latitude, location.longitude);
frontend/src/components/MobileWeatherGPT.tsx:683:        const r = await fetchForecastRecord({ latitude:location.latitude, longitude:location.longitude, name });
frontend/src/components/MobileWeatherGPT.tsx:774:export default function MobileWeatherGPT() {
frontend/src/components/MobileWeatherGPT.tsx:780:  const [gpsLocation, setGpsLocation] = useState<Coordinates|null>(null);
frontend/src/components/MobileWeatherGPT.tsx:815:  const requestLocation = useCallback(() => {
frontend/src/components/MobileWeatherGPT.tsx:816:    if (!('geolocation' in navigator)) { setLocationStatus('unsupported'); return; }
frontend/src/components/MobileWeatherGPT.tsx:818:    navigator.geolocation.getCurrentPosition(
frontend/src/components/MobileWeatherGPT.tsx:819:      p => { setGpsLocation({ latitude:p.coords.latitude, longitude:p.coords.longitude, accuracy:p.coords.accuracy }); setLocationStatus('granted'); },
frontend/src/components/MobileWeatherGPT.tsx:825:  useEffect(() => { requestLocation(); }, [requestLocation]);
frontend/src/components/MobileWeatherGPT.tsx:876:      const res = await fetch(CHAT_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'},
frontend/src/components/MobileWeatherGPT.tsx:977:        <button onClick={requestLocation} style={{ fontSize:'10px', padding:'3px 8px', borderRadius:'10px', border:'1px solid var(--accent-cyan)', background:'var(--accent-cyan-dim)', color:'var(--accent-cyan)', cursor:'pointer', display:'flex', alignItems:'center', gap:'3px' }}>
frontend/src/components/MobileWeatherGPT.tsx:979:          {gpsLocation ? `${gpsLocation.latitude.toFixed(2)},${gpsLocation.longitude.toFixed(2)}` : locationStatus==='denied'?'Blocked':'📍 Set'}
frontend/src/components/MobileWeatherGPT.tsx:1031:          {activeNav==='aichat' && <AIChatView location={gpsLocation} />}
frontend/src/components/MobileWeatherGPT.tsx:1033:          {activeNav==='map' && <MobileMapView location={gpsLocation} />}
frontend/src/components/MobileWeatherGPT.tsx:1034:          {activeNav==='radar' && <MobileRadarView location={gpsLocation} />}
frontend/src/components/MobileWeatherGPT.tsx:1045:        {activeNav==='report' && <WeatherReportView location={gpsLocation} />}
frontend/src/components/mapData.ts:9:  latitude: number;
frontend/src/components/mapData.ts:10:  longitude: number;
frontend/src/components/mapData.ts:89:  const res = await fetch(`${OPEN_METEO}&latitude=${lat}&longitude=${lon}`);
frontend/src/components/mapData.ts:179:const cityGeocodeCache: Record<string, { latitude: number; longitude: number }> = {};
frontend/src/components/mapData.ts:182:): Promise<{ latitude: number; longitude: number } | null> {
frontend/src/components/mapData.ts:193:    const out = { latitude: r.latitude, longitude: r.longitude };
frontend/src/components/mapData.ts:285:  const res = await fetch(`${OPEN_METEO_HOURLY}&latitude=${lat}&longitude=${lon}`);
frontend/src/components/mapData.ts:452:  /** Half-extent along longitude in degrees (includes aspect variation). */
frontend/src/components/mapData.ts:454:  /** Half-extent along latitude in degrees. */
frontend/src/components/WeatherMapView.tsx:134:      const lat = location.latitude;
frontend/src/components/WeatherMapView.tsx:135:      const lon = location.longitude;
frontend/src/components/WeatherMapView.tsx:158:            prev.latitude === lat && prev.longitude === lon
frontend/src/components/WeatherMapView.tsx:159:              ? { latitude: lat, longitude: lon, name, source: 'map' }
frontend/src/components/WeatherMapView.tsx:194:      dotRef.current.setLatLng([location.latitude, location.longitude]);
frontend/src/components/WeatherMapView.tsx:196:      dotRef.current = L.marker([location.latitude, location.longitude], {
frontend/src/components/WeatherMapView.tsx:207:    map.setView([location.latitude, location.longitude], Math.max(map.getZoom(), 8));
frontend/src/components/WeatherMapView.tsx:208:    void fetchPointWeather(location.latitude, location.longitude)
frontend/src/components/WeatherMapView.tsx:218:      const pt = map.latLngToContainerPoint([location.latitude, location.longitude]);
frontend/src/components/WeatherMapView.tsx:248:        const g = await fetchGrid(location.latitude, location.longitude);
frontend/src/components/WeatherMapView.tsx:253:        const rings = { lat: location.latitude, lon: location.longitude, radiiKm: QUERY_RINGS_KM };
frontend/src/components/WeatherMapView.tsx:303:    `${Math.abs(location.latitude).toFixed(4)}° ${location.latitude >= 0 ? 'N' : 'S'}, ` +
frontend/src/components/WeatherMapView.tsx:304:    `${Math.abs(location.longitude).toFixed(4)}° ${location.longitude >= 0 ? 'E' : 'W'}`;
frontend/src/components/WeatherRadarView.tsx:104:      const lat = location.latitude;
frontend/src/components/WeatherRadarView.tsx:105:      const lon = location.longitude;
frontend/src/components/WeatherRadarView.tsx:129:            prev.latitude === lat && prev.longitude === lon
frontend/src/components/WeatherRadarView.tsx:130:              ? { latitude: lat, longitude: lon, name, source: 'map' }
frontend/src/components/WeatherRadarView.tsx:161:      dotRef.current.setLatLng([location.latitude, location.longitude]);
frontend/src/components/WeatherRadarView.tsx:163:      dotRef.current = L.marker([location.latitude, location.longitude], {
frontend/src/components/WeatherRadarView.tsx:174:    map.setView([location.latitude, location.longitude], Math.max(map.getZoom(), 7));
frontend/src/components/WeatherRadarView.tsx:175:    void fetchPointWeather(location.latitude, location.longitude)
frontend/src/components/WeatherRadarView.tsx:190:        const res = await fetchRadarFrames(location.latitude, location.longitude);
frontend/src/config/api.ts:20:// Kept for MobileWeatherGPT backward compatibility.
frontend/src/config/api.ts:58:export const CHAT_ENDPOINT =
frontend/src/config/api.ts:59:  `${JAVA_API_BASE}/api/chat/query`;
frontend/src/config/api.ts:67:export const ML_AGENT_ENDPOINT =
frontend/src/config/api.ts:68:  `${ML_API_BASE}/agent`;
frontend/src/types/index.d.ts:6:  latitude: number
frontend/src/types/index.d.ts:7:  longitude: number
frontend/src/App.tsx:33:  CHAT_ENDPOINT,
frontend/src/App.tsx:82:interface GeoResult { latitude: number; longitude: number; name: string; country?: string; }
frontend/src/App.tsx:164:  return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
frontend/src/App.tsx:169:    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
frontend/src/App.tsx:352:          const lat = r?.latitude ?? 20.5937;
frontend/src/App.tsx:353:          const lng = r?.longitude ?? 78.9629;
frontend/src/App.tsx:530:    loadCachedForecast(location.latitude, location.longitude),
frontend/src/App.tsx:546:    const { latitude, longitude, name, source } = location;
frontend/src/App.tsx:547:    const key = `${latitude},${longitude}`;
frontend/src/App.tsx:548:    const cached = loadCachedForecast(latitude, longitude);
frontend/src/App.tsx:562:        const label = source !== 'default' && name ? name : await reverseGeocodeLabel(latitude, longitude);
frontend/src/App.tsx:563:        const r = await fetchForecastRecord({ latitude, longitude, name: label });
frontend/src/App.tsx:564:        if (!cancelled) { saveForecast(r, latitude, longitude); setRecord(r); }
frontend/src/App.tsx:585:      setLocation({ latitude: place.latitude, longitude: place.longitude, name: place.name, country: place.country, source: 'search' });
frontend/src/App.tsx:717:  const gpsToCanonical = useCallback((coords: { latitude: number; longitude: number }) => {
frontend/src/App.tsx:718:    setLocation({ latitude: coords.latitude, longitude: coords.longitude, source: 'gps' });
frontend/src/App.tsx:719:    void reverseGeocodeLabel(coords.latitude, coords.longitude).then((name) => {
frontend/src/App.tsx:722:      setLocation((prev) => (prev.latitude === coords.latitude && prev.longitude === coords.longitude ? { name } : {}));
frontend/src/App.tsx:726:  const requestLocation = useCallback(() => {
frontend/src/App.tsx:727:    if (!('geolocation' in navigator)) return;
frontend/src/App.tsx:729:    navigator.geolocation.getCurrentPosition(
frontend/src/App.tsx:730:      p => gpsToCanonical({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
frontend/src/App.tsx:736:  useEffect(() => { requestLocation(); }, [requestLocation]);
frontend/src/App.tsx:740:    if (!('geolocation' in navigator)) return;
frontend/src/App.tsx:741:    navigator.geolocation.getCurrentPosition(
frontend/src/App.tsx:742:      p => gpsToCanonical({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
frontend/src/App.tsx:769:      const res = await fetch(CHAT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
frontend/src/App.tsx:785:          if (typeof resolved.latitude === 'number' && typeof resolved.longitude === 'number') {
frontend/src/App.tsx:786:            patch.latitude = resolved.latitude;
frontend/src/App.tsx:787:            patch.longitude = resolved.longitude;
frontend/src/location/LocationContext.tsx:22: *  - gps     : browser geolocation (auto-fill only when nothing was chosen;
frontend/src/location/LocationContext.tsx:47:  latitude: number;
frontend/src/location/LocationContext.tsx:48:  longitude: number;
frontend/src/location/LocationContext.tsx:58:  Pick<SelectedLocation, 'latitude' | 'longitude' | 'name' | 'region' | 'country'>
frontend/src/location/LocationContext.tsx:67:  latitude: 28.6139,
frontend/src/location/LocationContext.tsx:68:  longitude: 77.209,
frontend/src/location/LocationContext.tsx:87:  if (!isLat(o.latitude) || !isLon(o.longitude)) return null;
frontend/src/location/LocationContext.tsx:94:    latitude: o.latitude as number,
frontend/src/location/LocationContext.tsx:95:    longitude: o.longitude as number,
frontend/src/location/LocationContext.tsx:111:    latitude: lat,
frontend/src/location/LocationContext.tsx:112:    longitude: lon,
frontend/src/location/LocationContext.tsx:164:  const locationKey = `${location.latitude.toFixed(4)},${location.longitude.toFixed(4)}`;
frontend/vite.config.ts:23:      '/agent': {
frontend2/src/App.tsx:1:import ChatScreen from "./pages/ChatScreen";
frontend2/src/App.tsx:4:  return <ChatScreen />;
frontend2/src/pages/ChatScreen.tsx:40:const API_URL = import.meta.env.VITE_API_BASE_URL;
frontend2/src/pages/ChatScreen.tsx:431:  latitude: number;
frontend2/src/pages/ChatScreen.tsx:432:  longitude: number;
frontend2/src/pages/ChatScreen.tsx:469:  return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
frontend2/src/pages/ChatScreen.tsx:472:async function reverseGeocodeForReport(latitude: number, longitude: number): Promise<string> {
frontend2/src/pages/ChatScreen.tsx:474:    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&zoom=10`;
frontend2/src/pages/ChatScreen.tsx:487:    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
frontend2/src/pages/ChatScreen.tsx:549:    const saved = loadPersistedForecast(location?.latitude, location?.longitude);
frontend2/src/pages/ChatScreen.tsx:562:  // If we already have the browser's geolocation and nothing saved yet, load it automatically.
frontend2/src/pages/ChatScreen.tsx:570:        const name = await reverseGeocodeForReport(location.latitude, location.longitude);
frontend2/src/pages/ChatScreen.tsx:571:        const place: GeoResult = { latitude: location.latitude, longitude: location.longitude, name };
frontend2/src/pages/ChatScreen.tsx:573:        persistForecast(next, location.latitude, location.longitude);
frontend2/src/pages/ChatScreen.tsx:606:      persistForecast(next, place.latitude, place.longitude);
frontend2/src/pages/ChatScreen.tsx:757:  const defaultLat = location?.latitude ?? 20.5937;
frontend2/src/pages/ChatScreen.tsx:758:  const defaultLng = location?.longitude ?? 78.9629;
frontend2/src/pages/ChatScreen.tsx:794:        markerRef.current = L.marker([location.latitude, location.longitude])
frontend2/src/pages/ChatScreen.tsx:796:          .bindPopup(`📍 Your Location<br>Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`)
frontend2/src/pages/ChatScreen.tsx:814:        markerRef.current.setLatLng([location.latitude, location.longitude]);
frontend2/src/pages/ChatScreen.tsx:816:        markerRef.current = L.marker([location.latitude, location.longitude])
frontend2/src/pages/ChatScreen.tsx:821:      mapInstanceRef.current.setView([location.latitude, location.longitude], 8);
frontend2/src/pages/ChatScreen.tsx:894:            📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
frontend2/src/pages/ChatScreen.tsx:931:      const centerLat = location?.latitude ?? 20.5937;
frontend2/src/pages/ChatScreen.tsx:932:      const centerLng = location?.longitude ?? 78.9629;
frontend2/src/pages/ChatScreen.tsx:965:        L.marker([location.latitude, location.longitude], { icon: pulseIcon })
frontend2/src/pages/ChatScreen.tsx:1007:  latitude: number;
frontend2/src/pages/ChatScreen.tsx:1008:  longitude: number;
frontend2/src/pages/ChatScreen.tsx:1014:export default function ChatScreen() {
frontend2/src/pages/ChatScreen.tsx:1030:  const requestLocation = () => {
frontend2/src/pages/ChatScreen.tsx:1031:    if (!("geolocation" in navigator)) {
frontend2/src/pages/ChatScreen.tsx:1036:    navigator.geolocation.getCurrentPosition(
frontend2/src/pages/ChatScreen.tsx:1039:          latitude: pos.coords.latitude,
frontend2/src/pages/ChatScreen.tsx:1040:          longitude: pos.coords.longitude,
frontend2/src/pages/ChatScreen.tsx:1055:    requestLocation();
frontend2/src/pages/ChatScreen.tsx:1081:      const response = await fetch(`${API_URL}/agent`, {
frontend2/src/pages/ChatScreen.tsx:1087:            ? { latitude: location.latitude, longitude: location.longitude, accuracy: location.accuracy }
frontend2/src/pages/ChatScreen.tsx:1171:              onClick={() => locationStatus !== "pending" && requestLocation()}
frontend2/vite.config.ts:11:      '/agent': { target: 'http://localhost:8000', changeOrigin: true },
```

## File: frontend/src/App.tsx
```text
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Anchor,
  Bell,
  Building2,
  CheckCircle,
  CloudRain,
  Droplets,
  Flame,
  Map as MapIcon,
  Mic,
  Plane,
  SprayCan,
  Sprout,
  Thermometer,
  TrendingUp,
  Waves,
  Wind,
} from 'lucide-react';
import AppHeader from './components/AppHeader';
import AnswerCard from './components/AnswerCard';
import IconRail from './components/IconRail';
import InputBar from './components/InputBar';
import MobileDrawer from './components/MobileDrawer';
import WarningBulletin from './components/WarningBulletin';
import type { ImdSeverity, ImdWarning } from './components/WarningBulletin';
import WeatherMapView from './components/WeatherMapView';
import WeatherRadarView from './components/WeatherRadarView';
import type { NavPage } from './config/navigation';
import {
  ADVISORIES_ENDPOINT,
  ALERTS_ENDPOINT,
  CHAT_ENDPOINT,
  CLIMATE_ENDPOINT,
  ML_ROUTE_ENDPOINT,
  WEATHER_ENDPOINTS,
} from './config/api';
import { useTheme } from './hooks/useTheme';
import { useVoiceInput } from './hooks/useVoiceInput';
import { useVoiceOutput } from './hooks/useVoiceOutput';
import { reverseGeocodeLabel, useLocation, type LocationPatch } from './location/LocationContext';

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────

interface ChatCard {
  figure: string | number;
  label: string;
  body?: string;
  confidence?: {
    percent: number;
    label?: string;
    members?: number;
    of?: number;
  };
  issuedAt?: string;
  source?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  voiceAnswer?: string;
  card?: ChatCard | null;
}

interface RouteApiResponse {
  message?: string;
  route_info?: any;
  risk_summary?: { HIGH?: number; MODERATE?: number; LOW?: number };
  weather_data?: WeatherPoint[] | any;
  index_html?: string;
}
interface WeatherPoint {
  location?: string; point?: string; weather?: string; condition?: string;
  temp?: number | string; temperature?: number | string;
  risk?: string; risk_level?: string; description?: string; notes?: string;
  [key: string]: any;
}
interface GeoResult { latitude: number; longitude: number; name: string; country?: string; }
interface HourlyBlock {
  time: string[]; temperature: number[]; humidity: number[];
  precipitationProbability: number[]; weatherCode: number[]; wind: number[];
}
interface DailyBlock {
  time: string[]; weatherCode: number[]; maxTemperature: number[];
  minTemperature: number[]; precipitationProbability: number[]; maxWind: number[];
}
interface ForecastRecord {
  location: GeoResult; savedAt: string;
  hourly24h: HourlyBlock; daily7days: DailyBlock;
}

// ─────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────

const WEATHER_CODE_DESCRIPTIONS: Record<number, string> = {
  0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Drizzle',
  55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with hail',
};
const wmoDesc = (code: number) => WEATHER_CODE_DESCRIPTIONS[code] ?? 'Unknown';
const speechLocale = (lang: string) => (lang === 'hi' ? 'hi-IN' : 'en-IN');

const COPY = {
  en: {
    inputPlaceholder: 'Ask about weather, in English or हिंदी…',
    listening: 'Listening…',
    intro: 'Ask about weather anywhere in India, by typing or by voice, in <b>English or हिंदी</b>. Active warnings for your district always come first.',
    helper: 'Warnings interrupt this conversation automatically. They are never paraphrased.',
  },
  hi: {
    inputPlaceholder: 'मौसम के बारे में पूछें, टाइप करें या बोलें…',
    listening: 'सुन रहा हूँ…',
    intro: 'भारत में कहीं भी मौसम के बारे में पूछें, लिखकर या बोलकर, <b>अंग्रेज़ी या हिंदी</b> में। आपके ज़िले की सक्रिय चेतावनी हमेशा सबसे पहले आएगी।',
    helper: 'चेतावनियाँ इस बातचीत में अपने आप सबसे ऊपर आती हैं। उन्हें कभी बदलकर नहीं लिखा जाता।',
  },
};

// Dev-only demo seam so components can be previewed without mutating the
// deployed backend (open the app with ?demo=1 in dev).
const IS_DEMO = import.meta.env.DEV
  && typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).get('demo') === '1';

const DEMO_WARNING: ImdWarning = {
  district: 'Sitamarhi district',
  severity: 'orange',
  title: 'Heavy to very heavy rainfall warning',
  text: '"Isolated heavy to very heavy rainfall (7-20 cm) very likely at one or two places over Sitamarhi and adjoining districts during the next 48 hours, with possibility of localised flooding in low-lying areas."',
  issuedAt: '05:30 IST, 23 Sep',
};

const DEMO_MESSAGES: ChatMessage[] = [
  { id: 'demo-user', role: 'user', content: 'Will it rain over Sitamarhi in the next two days?' },
  {
    id: 'demo-card', role: 'bot', content: 'Rain is likely from tomorrow afternoon, heaviest overnight. This is a district-level forecast for Sitamarhi, not a hyperlocal reading for a single village.',
    card: {
      figure: '62%',
      label: 'Rain probability, next 48h',
      confidence: { percent: 63, label: 'Moderate', members: 4, of: 6 },
      issuedAt: 'Forecast issued 06:00 IST, 23 Sep',
      source: 'IMD district FCST + GFS 12km',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────
// Weather report helpers (offline-capable)
// ─────────────────────────────────────────────────────────────────────

async function geocodeCity(city: string): Promise<GeoResult> {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
  if (!res.ok) throw new Error('Unable to look up that location.');
  const data = await res.json();
  if (!data.results?.length) throw new Error('Location not found.');
  const r = data.results[0];
  return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
}

async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
    `&forecast_days=7&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather request failed.');
  const d = await res.json();
  return {
    location: place, savedAt: new Date().toISOString(),
    hourly24h: {
      time: d.hourly.time.slice(0, 24), temperature: d.hourly.temperature_2m.slice(0, 24),
      humidity: d.hourly.relative_humidity_2m.slice(0, 24),
      precipitationProbability: d.hourly.precipitation_probability.slice(0, 24),
      weatherCode: d.hourly.weather_code.slice(0, 24), wind: d.hourly.wind_speed_10m.slice(0, 24),
    },
    daily7days: {
      time: d.daily.time.slice(0, 7), weatherCode: d.daily.weather_code.slice(0, 7),
      maxTemperature: d.daily.temperature_2m_max.slice(0, 7),
      minTemperature: d.daily.temperature_2m_min.slice(0, 7),
      precipitationProbability: d.daily.precipitation_probability_max.slice(0, 7),
      maxWind: d.daily.wind_speed_10m_max.slice(0, 7),
    },
  };
}
/**
 * Per-location cache key so a Delhi response can never satisfy a Ghaziabad
 * request (§22): the key embeds the coordinates.
 */
function reportCacheKey(lat: number, lon: number): string {
  return `weatherGPT_offline_forecast_${lat.toFixed(2)}_${lon.toFixed(2)}`;
}
function loadCachedForecast(lat: number, lon: number): ForecastRecord | null {
  try { return JSON.parse(localStorage.getItem(reportCacheKey(lat, lon)) ?? 'null'); } catch { return null; }
}
function saveForecast(r: ForecastRecord, lat: number, lon: number) {
  try { localStorage.setItem(reportCacheKey(lat, lon), JSON.stringify(r)); } catch { /* storage full */ }
}

// ─────────────────────────────────────────────────────────────────────
// IMD severity helpers (bulletin + alerts list)
// ─────────────────────────────────────────────────────────────────────

function severityOf(a: any): ImdSeverity {
  const raw = [a?.severity, a?.informationClass, a?.description, a?.title]
    .filter(Boolean).join(' ').toLowerCase();
  if (/\bred\b/.test(raw)) return 'red';
  if (/\borange\b/.test(raw)) return 'orange';
  if (/\byellow\b/.test(raw)) return 'yellow';
  if (/\bgreen\b/.test(raw)) return 'green';
  return 'red';
}

const tierBadge = (sev: ImdSeverity | undefined): React.CSSProperties => {
  switch (sev) {
    case 'green': return { background: 'var(--watch-green-tint)', color: 'var(--watch-green)', borderColor: 'var(--watch-green)' };
    case 'yellow': return { background: 'var(--watch-yellow-tint)', color: 'var(--watch-yellow-deep)', borderColor: 'var(--watch-yellow)' };
    case 'orange': return { background: 'var(--watch-orange-tint)', color: 'var(--watch-orange-deep)', borderColor: 'var(--watch-orange)' };
    case 'red': return { background: 'var(--watch-red-tint)', color: 'var(--watch-red-deep)', borderColor: 'var(--watch-red)' };
    default: return { background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' };
  }
};

const tierBorder = (sev: ImdSeverity): string => {
  switch (sev) {
    case 'green': return 'var(--watch-green)';
    case 'yellow': return 'var(--watch-yellow)';
    case 'orange': return 'var(--watch-orange)';
    case 'red': return 'var(--watch-red)';
    default: return 'var(--slate-teal)';
  }
};

// ─────────────────────────────────────────────────────────────────────
// Shared card styles (Route + Report + secondary pages)
// ─────────────────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  card: { background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' },
  cardTitle: { margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--ink)' },
  label: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted)' },
  input: { padding: '10px 13px', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-ui)' },
  btn: { padding: '11px 20px', background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', border: '1px solid var(--slate-teal)', borderRadius: 'var(--radius-btn)', cursor: 'pointer', fontWeight: 700, fontSize: '13.5px', fontFamily: 'var(--font-ui)' },
  error: { padding: '11px 15px', background: 'var(--watch-red-tint)', border: '1px solid var(--watch-red)', color: 'var(--watch-red-deep)', borderRadius: 'var(--radius-card)', fontSize: '13px' },
  successBanner: { padding: '11px 15px', background: 'var(--slate-teal-tint)', border: '1px solid var(--slate-teal)', color: 'var(--slate-teal)', borderRadius: 'var(--radius-card)', fontWeight: 500, fontSize: '13px' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '2px 9px', borderRadius: 'var(--radius-chip)', fontWeight: 600, fontSize: '11px', border: '1px solid transparent' },
  tableWrap: { width: '100%', overflowX: 'auto', borderRadius: 'var(--radius-card)', border: '1px solid var(--line)' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  th: { borderBottom: '1px solid var(--line)', padding: '9px 13px', background: 'var(--mist)', fontWeight: 700, color: 'var(--muted)', whiteSpace: 'nowrap', fontSize: '11px', textTransform: 'uppercase' },
  tr: { borderBottom: '1px solid var(--line)' },
  td: { padding: '9px 13px', whiteSpace: 'nowrap', color: 'var(--ink)' },
  tdBold: { padding: '9px 13px', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--ink)' },
  tdIndex: { padding: '9px 13px', color: 'var(--muted)', width: '36px' },
  tdDesc: { padding: '9px 13px', color: 'var(--ink)', minWidth: '180px', wordBreak: 'break-word', whiteSpace: 'normal' },
  jsonBlock: { background: 'var(--mist)', padding: '13px', borderRadius: 'var(--radius-card)', overflowX: 'auto', fontSize: '12px', color: 'var(--ink)', margin: 0, border: '1px solid var(--line)', fontFamily: 'var(--font-mono)' },
  mapWrapper: { width: '100%', borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--paper)' },
  iframe: { width: '100%', height: '380px', border: 'none', display: 'block' },
};

// Token-based panel for rail/drawer destinations.
const P: Record<string, React.CSSProperties> = {
  panel: { background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' },
  h2: { margin: 0, fontSize: '19px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' },
  metaCard: { background: 'var(--mist)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: '10px 12px' },
  mono: { fontFamily: 'var(--font-mono)' },
};

const riskStyle = (risk?: string): React.CSSProperties => {
  switch (String(risk ?? '').toUpperCase()) {
    case 'HIGH': return { background: 'var(--watch-red-tint)', color: 'var(--watch-red-deep)', borderColor: 'var(--watch-red)' };
    case 'MODERATE': return { background: 'var(--watch-orange-tint)', color: 'var(--watch-orange-deep)', borderColor: 'var(--watch-orange)' };
    case 'LOW': return { background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' };
    default: return { background: 'var(--mist)', color: 'var(--muted)', borderColor: 'var(--line)' };
  }
};

// ─────────────────────────────────────────────────────────────────────
// Structured answer extraction from the Java chat backend
// ─────────────────────────────────────────────────────────────────────

function toAnswerCard(d: any): ChatCard | null {
  if (!d || typeof d !== 'object') return null;
  const m = d.metrics ?? {};
  const tempRaw = d.temperature ?? m.temperature;
  const humRaw = d.humidity ?? m.humidity;
  const rainRaw = d.precipitationProbability ?? d.precipitation ?? m.precipitationProbability ?? m.precipitation;
  const windRaw = d.wind ?? m.wind;
  const cond = d.condition ?? m.condition;

  let figure: string | number;
  let label: string;
  if (tempRaw != null) { figure = typeof tempRaw === 'number' ? `${Math.round(tempRaw)}°C` : String(tempRaw); label = 'Temperature'; }
  else if (humRaw != null) { figure = typeof humRaw === 'number' ? `${Math.round(humRaw)}%` : String(humRaw); label = 'Humidity'; }
  else if (rainRaw != null) { figure = typeof rainRaw === 'number' ? `${Math.round(rainRaw)}%` : String(rainRaw); label = 'Rain probability'; }
  else if (windRaw != null) { figure = typeof windRaw === 'number' ? `${Math.round(windRaw)} km/h` : String(windRaw); label = 'Wind'; }
  else if (cond != null) { figure = String(cond); label = 'Current weather'; }
  else return null;

  const confidence: ChatCard['confidence'] = (() => {
    const ca = d.modelAgreement ?? d.model_agreement;
    if (ca && typeof ca === 'object') {
      const percent =
        typeof ca.percent === 'number' ? ca.percent :
        typeof ca.percentage === 'number' ? ca.percentage : 0;
      const members = typeof ca.members === 'number' ? ca.members : undefined;
      const of = typeof ca.of === 'number' ? ca.of : typeof ca.total === 'number' ? ca.total : undefined;
      return { percent, label: ca.label || ca.level || undefined, members, of };
    }
    if (typeof d.confidence === 'number') return { percent: d.confidence };
    return undefined;
  })();

  const issuedAt = d.issuedAt ?? d.issueTime ?? d.issued ?? d.savedAt;
  const source = d.source ?? d.dataSource ?? d.data_source;

  return {
    figure,
    label,
    body: d.description ?? undefined,
    confidence,
    issuedAt: issuedAt != null ? String(issuedAt) : undefined,
    source: source != null ? String(source) : undefined,
  };
}

// ─────────────────────────────────────────────────────────────────────
// ClimateMapEmbed — OSM map inside climate panel
// ─────────────────────────────────────────────────────────────────────

function ClimateMapEmbed({ city }: { city: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    let cancelled = false;
    import('leaflet').then((L) => {
      if (mapRef.current) return;
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
        .then(r => r.json())
        .then(data => {
          if (cancelled || mapRef.current) return;
          const r = data.results?.[0];
          const lat = r?.latitude ?? 20.5937;
          const lng = r?.longitude ?? 78.9629;
          const map = L.map(ref.current!, { center: [lat, lng], zoom: 7, scrollWheelZoom: false });
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors', maxZoom: 18,
          }).addTo(map);
          const icon = L.divIcon({
            className: '',
            html: '<div class="map-loc-dot"></div>',
            iconSize: [12, 12], iconAnchor: [6, 6],
          });
          L.marker([lat, lng], { icon }).addTo(map).bindPopup(city);
          mapRef.current = map;
          if (!cancelled) setLoaded(true);
        })
        .catch(() => {
          if (cancelled || mapRef.current) return;
          const map = L.map(ref.current!, { center: [20.5937, 78.9629], zoom: 5, scrollWheelZoom: false });
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
          mapRef.current = map;
          if (!cancelled) setLoaded(true);
        });
    });
    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, [city]);

  return (
    <div style={{ position: 'relative', height: '280px', width: '100%' }}>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--mist)', zIndex: 10, color: 'var(--muted)', fontSize: '13px' }}>
          Loading map…
        </div>
      )}
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RouteWeatherView
// ─────────────────────────────────────────────────────────────────────

function RouteWeatherView() {
  // The route planner is a user-driven journey form: origin defaults to the
  // currently selected location, but the fields stay freely editable (a route
  // analysis is not the same thing as "the selected weather location").
  const { location: currentLocation } = useLocation();
  const [form, setForm] = useState({ origin: currentLocation.name || 'Delhi', destination: 'Agra', departure_time: '08:00' });
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<RouteApiResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr(null); setResp(null);
    try {
      const res = await fetch(ML_ROUTE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error(`Error ${res.status} - ${res.statusText}`);
      setResp(await res.json());
    } catch (e: any) { setErr(e.message || 'Failed to fetch route weather.'); }
    finally { setLoading(false); }
  };

  const riskBoxes: { key: string; fg: string; bg: string; border: string }[] = [
    { key: 'HIGH', fg: 'var(--watch-red-deep)', bg: 'var(--watch-red-tint)', border: 'var(--watch-red)' },
    { key: 'MODERATE', fg: 'var(--watch-orange-deep)', bg: 'var(--watch-orange-tint)', border: 'var(--watch-orange)' },
    { key: 'LOW', fg: 'var(--slate-teal)', bg: 'var(--slate-teal-tint)', border: 'var(--slate-teal)' },
  ];

  return (
    <div style={S.card}>
      <header>
        <h2 style={P.h2}>Route weather analyzer</h2>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Check conditions and risk along a journey, point by point.</p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
          {(['origin', 'destination'] as const).map(field => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={S.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input style={S.input} type="text" name={field} value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })} required
                placeholder={field === 'origin' ? 'e.g. Delhi' : 'e.g. Agra'} />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={S.label}>Departure time</label>
            <input style={S.input} type="time" name="departure_time" value={form.departure_time}
              onChange={e => setForm({ ...form, departure_time: e.target.value })} required />
          </div>
        </div>
        <button type="submit" disabled={loading} style={S.btn}>{loading ? 'Analyzing route…' : 'Analyze route'}</button>
      </form>

      {err && <div style={S.error}>{err}</div>}

      {resp && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {resp.message && <div style={S.successBanner}>{resp.message}</div>}

          {resp.risk_summary && (
            <div style={S.card}>
              <h3 style={S.cardTitle}>Risk summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '10px' }}>
                {riskBoxes.map(({ key, fg, bg, border }) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px', borderRadius: 'var(--radius-card)', background: bg, border: `1px solid ${border}` }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 700, color: fg, fontVariantNumeric: 'tabular-nums' }}>{(resp.risk_summary as any)[key] ?? 0}</span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{key.charAt(0) + key.slice(1).toLowerCase()}-risk waypoints</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resp.weather_data && (
            <div style={S.card}>
              <h3 style={S.cardTitle}>Waypoint forecasts</h3>
              {Array.isArray(resp.weather_data) ? (
                <div style={S.tableWrap}>
                  <table style={S.table}>
                    <thead><tr>
                      {['#', 'Point', 'Condition', 'Temp', 'Risk', 'Details'].map(h => <th key={h} style={S.th}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {resp.weather_data.map((item: WeatherPoint, i: number) => {
                        const name = item.location || item.point || item.name || `Point ${i + 1}`;
                        const cond = item.weather || item.condition || item.sky || 'n/a';
                        const temp = (item.temp ?? item.temperature) !== undefined ? `${item.temp ?? item.temperature}°C` : 'n/a';
                        const risk = item.risk || item.risk_level || 'NORMAL';
                        const detail = item.description || item.notes || item.summary ||
                          Object.entries(item)
                            .filter(([k]) => !['location', 'point', 'weather', 'condition', 'temp', 'temperature', 'risk', 'risk_level'].includes(k))
                            .map(([k, v]) => `${k}: ${v}`).join(', ');
                        return (
                          <tr key={i} style={S.tr}>
                            <td style={S.tdIndex}>{i + 1}</td>
                            <td style={S.tdBold}>{name}</td>
                            <td style={S.td}>{cond}</td>
                            <td style={S.td}>{temp}</td>
                            <td style={S.td}><span style={{ ...S.badge, ...riskStyle(risk) }}>{risk.toUpperCase()}</span></td>
                            <td style={S.tdDesc}>{detail || 'n/a'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre style={S.jsonBlock}>{JSON.stringify(resp.weather_data, null, 2)}</pre>
              )}
            </div>
          )}

          {resp.index_html && (
            <div style={S.card}>
              <h3 style={S.cardTitle}>Route map</h3>
              <div style={S.mapWrapper}>
                <iframe title="Route map" srcDoc={resp.index_html} style={S.iframe} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// WeatherReportView (offline-capable)
// ─────────────────────────────────────────────────────────────────────

function WeatherReportView() {
  const { location, setLocation } = useLocation();
  const [cityInput, setCityInput] = useState('');
  const [record, setRecord] = useState<ForecastRecord | null>(() =>
    loadCachedForecast(location.latitude, location.longitude),
  );
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{ tone: 'error' | 'info'; text: string } | null>(null);
  const [online, setOnline] = useState(navigator.onLine);
  const lastKeyRef = useRef('');

  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener('online', on); window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // Follows the canonical location: show the per-location offline cache, or
  // fetch the forecast for exactly these coordinates.
  useEffect(() => {
    const { latitude, longitude, name, source } = location;
    const key = `${latitude},${longitude}`;
    const cached = loadCachedForecast(latitude, longitude);
    if (cached) {
      setRecord(cached);
      lastKeyRef.current = key;
      return;
    }
    // Never keep another place's forecast on screen while this one loads.
    if (lastKeyRef.current !== key) setRecord(null);
    lastKeyRef.current = key;
    let cancelled = false;
    setLoading(true);
    setBanner(null);
    (async () => {
      try {
        const label = source !== 'default' && name ? name : await reverseGeocodeLabel(latitude, longitude);
        const r = await fetchForecastRecord({ latitude, longitude, name: label });
        if (!cancelled) { saveForecast(r, latitude, longitude); setRecord(r); }
      } catch {
        if (!cancelled) setBanner({ tone: 'error', text: 'Weather data unavailable for this location.' });
      } finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [location]);

  const search = async (override?: string) => {
    const city = (override ?? cityInput).trim();
    if (!city) { setBanner({ tone: 'error', text: 'Enter a city.' }); return; }
    if (!online) {
      if (record) setBanner({ tone: 'info', text: 'Offline. Showing cached forecast.' });
      else setBanner({ tone: 'error', text: 'Offline and no cached forecast.' });
      return;
    }
    setLoading(true); setBanner(null);
    try {
      const place = await geocodeCity(city);
      // Search selects the canonical location: every location-aware feature
      // (map, radar, warnings, chat context) now follows the searched city.
      setLocation({ latitude: place.latitude, longitude: place.longitude, name: place.name, country: place.country, source: 'search' });
      setCityInput('');
      setLoading(false); // same-coords search won't re-trigger the location effect
    } catch (e: any) {
      if (record) setBanner({ tone: 'info', text: `${e.message} Showing cached forecast.` });
      else setBanner({ tone: 'error', text: e.message });
      setLoading(false);
    }
  };

  const fmtTime = (t: string) => new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const fmtDay = (t: string) => new Date(t).toLocaleDateString([], { weekday: 'long' });

  return (
    <div style={S.card}>
      <header>
        <h2 style={P.h2}>Weather report</h2>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Search any city. Forecast is cached for offline use.</p>
      </header>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: 'var(--radius-btn)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--line)', color: online ? 'var(--slate-teal)' : 'var(--muted)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: online ? 'var(--slate-teal)' : 'var(--muted)' }} />
          {online ? 'Online' : 'Offline'}
        </span>
        <input style={{ ...S.input, flex: 1, minWidth: '180px' }} type="text" value={cityInput}
          onChange={e => setCityInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="Enter city, e.g. Delhi" />
        <button onClick={() => search()} disabled={loading}
          style={S.btn}>
          {loading ? 'Loading…' : 'Get weather'}
        </button>
      </div>

      {banner && <div style={banner.tone === 'error' ? S.error : S.successBanner}>{banner.text}</div>}

      {!record && !loading && (
        <div style={S.card}><p style={{ margin: 0, color: 'var(--muted)', fontSize: '13px' }}>Search a city to load a forecast.</p></div>
      )}

      {record && (<>
        <div style={S.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ ...S.cardTitle, marginBottom: 2 }}>{record.location.name}{record.location.country ? `, ${record.location.country}` : ''}</h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Updated {new Date(record.savedAt).toLocaleString()}</p>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-teal)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(record.hourly24h.temperature[0])}°C</div>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--ink)' }}>
            <span>{wmoDesc(record.hourly24h.weatherCode[0])}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Droplets size={14} style={{ color: 'var(--slate-teal)' }} /> {record.hourly24h.humidity[0]}%</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Wind size={14} style={{ color: 'var(--slate-teal)' }} /> {record.hourly24h.wind[0]} km/h</span>
          </div>
        </div>

        <div style={S.card}>
          <h3 style={S.cardTitle}>24-hour forecast</h3>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {record.hourly24h.time.map((t, i) => (
              <div key={t} style={{ flex: '0 0 auto', minWidth: '108px', padding: '12px', borderRadius: 'var(--radius-card)', background: 'var(--mist)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '11px', color: 'var(--slate-teal)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{fmtTime(t)}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(record.hourly24h.temperature[i])}°C</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{wmoDesc(record.hourly24h.weatherCode[i])}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Droplets size={12} /> {record.hourly24h.humidity[i]}%</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><CloudRain size={12} /> {record.hourly24h.precipitationProbability[i]}%</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Wind size={12} /> {record.hourly24h.wind[i]} km/h</div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <h3 style={S.cardTitle}>7-day forecast</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '10px' }}>
            {record.daily7days.time.map((t, i) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px', borderRadius: 'var(--radius-card)', background: 'var(--mist)', border: '1px solid var(--line)' }}>
                <strong style={{ color: 'var(--ink)', fontSize: '13px' }}>{fmtDay(t)}</strong>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{wmoDesc(record.daily7days.weatherCode[i])}</span>
                <span style={{ fontSize: '12px', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '4px' }}><Thermometer size={12} style={{ color: 'var(--slate-teal)' }} /> {Math.round(record.daily7days.maxTemperature[i])}° / {Math.round(record.daily7days.minTemperature[i])}°</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><CloudRain size={12} /> {record.daily7days.precipitationProbability[i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </>)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Root App component — chat-first layout
// ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // ── Navigation: chat is the primary view; rail/drawer hold the rest ──
  const [activePage, setActivePage] = useState<NavPage | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Chat state ──
  const [messages, setMessages] = useState<ChatMessage[]>(IS_DEMO ? DEMO_MESSAGES : []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('en');
  // One canonical selected location: the header pill, GPS, search, map taps,
  // chat resolutions and every data fetch all read/write this single state.
  const { location, setLocation, locationKey } = useLocation();

  // ── Java-backend data state (rail/drawer pages) ──
  const [forecastList, setForecastList] = useState<any[]>([]);
  const [nwpComparison, setNwpComparison] = useState<any>(null);
  const [sectorAdvisory, setSectorAdvisory] = useState<any>(null);
  const [activeSector, setActiveSector] = useState<'agriculture' | 'aviation' | 'marine' | 'urban'>('agriculture');
  const [alertsList, setAlertsList] = useState<any[]>([]);
  const [climateInfo, setClimateInfo] = useState<any>(null);
  const [sectorLoading, setSectorLoading] = useState(false);

  const loadedPagesRef = useRef<Set<NavPage>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = COPY[selectedLang];
  const locale = speechLocale(selectedLang);

  const { speak, stop: stopSpeech } = useVoiceOutput();

  // ── Geolocation feeds the one canonical location ──
  // Auto-fill runs only when nothing has been chosen yet (default source), so
  // a saved choice or a deep link is never silently overridden (§7).
  const gpsToCanonical = useCallback((coords: { latitude: number; longitude: number }) => {
    setLocation({ latitude: coords.latitude, longitude: coords.longitude, source: 'gps' });
    void reverseGeocodeLabel(coords.latitude, coords.longitude).then((name) => {
      if (name === 'Selected point') return;
      // Only fill the name if the user hasn't already moved to another place.
      setLocation((prev) => (prev.latitude === coords.latitude && prev.longitude === coords.longitude ? { name } : {}));
    });
  }, [setLocation]);

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) return;
    if (location.source !== 'default') return;
    navigator.geolocation.getCurrentPosition(
      p => gpsToCanonical({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
      () => { /* denial or timeout: keep current location */ },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, [location.source, gpsToCanonical]);

  useEffect(() => { requestLocation(); }, [requestLocation]);

  // Location pill: refresh the canonical location from device GPS.
  const handleLocationClick = useCallback(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      p => gpsToCanonical({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
      () => { /* location access denied: keep last known place */ },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, [gpsToCanonical]);

  // Stable per-browser session id so session memory never bleeds across users.
  const sessionId = useMemo(() => {
    try {
      let id = localStorage.getItem('weathergpt:sessionId');
      if (!id) {
        id = `web-${typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Date.now().toString(36)}`;
        localStorage.setItem('weathergpt:sessionId', id);
      }
      return id;
    } catch { return 'web-session'; }
  }, []);

  // ── Chat fetch (unchanged endpoint/payload; visual layer only) ──
  const handleSend = useCallback(async (customMsg?: string) => {
    const text = (customMsg ?? input).trim();
    if (!text || isLoading) return;
    if (!customMsg) setInput('');
    setIsLoading(true);
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(p => [...p, userMsg]);
    try {
      const res = await fetch(CHAT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: selectedLang, sector: activeSector, sessionId, location: location.name }) });
      const d = await res.json();
      if (d.success && d.data) {
        const bot: ChatMessage = {
          id: (Date.now() + 1).toString(), role: 'bot',
          content: d.data.answer || 'Query processed.',
          voiceAnswer: d.data.voiceAnswer || d.data.answer,
          card: toAnswerCard(d.data),
        };
        setMessages(p => [...p, bot]);
        // The AI's resolved location becomes the canonical location: the
        // header, warnings, forecast and radar all follow the same state.
        const resolved = d.data.location;
        if (resolved && typeof resolved.name === 'string' && resolved.name.trim()) {
          const patch: LocationPatch = { name: resolved.name, source: 'chat' };
          if (typeof resolved.latitude === 'number' && typeof resolved.longitude === 'number') {
            patch.latitude = resolved.latitude;
            patch.longitude = resolved.longitude;
          }
          if (resolved.region) patch.region = resolved.region;
          if (resolved.country) patch.country = resolved.country;
          setLocation(patch);
        }
        if (voiceEnabled && d.data.voiceAnswer) speak(d.data.voiceAnswer, locale);
      } else {
        setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: 'bot', content: d.message || 'Could not process query.' }]);
      }
    } catch {
      setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: 'bot', content: 'Unable to connect to backend.' }]);
    } finally { setIsLoading(false); }
  }, [input, isLoading, selectedLang, activeSector, voiceEnabled, locale, speak, sessionId, location.name, setLocation]);

  // ── Voice input (STT) — transcript sends directly through the chat path ──
  const { status: sttStatus, isSupported: sttSupported, startListening, stopListening } = useVoiceInput({
    lang: locale,
    onTranscript: (text) => {
      if (!text) return;
      setInput('');
      void handleSend(text);
    },
    onError: (err) => console.error('Voice error:', err),
  });
  const listening = sttStatus === 'listening';

  const toggleListening = useCallback(() => {
    if (listening) { stopListening(); stopSpeech(); setVoiceEnabled(false); }
    else { stopSpeech(); startListening(); setVoiceEnabled(true); }
  }, [listening, startListening, stopListening, stopSpeech]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  // Location change: drop stale page data and re-arm the one-shot pages so
  // every page re-queries against the new coordinates (§23).
  useEffect(() => {
    loadedPagesRef.current.clear();
    setForecastList([]);
    setNwpComparison(null);
    setClimateInfo(null);
    setSectorAdvisory(null);
  }, [locationKey]);

  // ── Data fetch for the rail/drawer pages (lazy, one shot per page) ──
  useEffect(() => {
    if (!activePage) return;
    const ctrl = new AbortController();
    const { signal } = ctrl;
    const loaded = loadedPagesRef.current;
    if (activePage === 'forecast' && !loaded.has('forecast')) { loaded.add('forecast'); void fetchWeather(location.name, signal); }
    if (activePage === 'nwp' && !loaded.has('nwp')) { loaded.add('nwp'); void fetchNwp(location.name, signal); }
    if (activePage === 'climate' && !loaded.has('climate')) { loaded.add('climate'); void fetchClimate(location.name, signal); }
    if (activePage === 'sectors') void fetchSector(location.name, activeSector, signal);
    return () => ctrl.abort();
  }, [activePage, location.name, locationKey, activeSector]);

  // Alerts are always fetched — the warning bulletin above the chat needs them.
  useEffect(() => {
    const ctrl = new AbortController();
    void fetchAlerts(location.name, ctrl.signal);
    return () => ctrl.abort();
  }, [location.name]);

  const fetchWeather = async (city: string, signal?: AbortSignal) => {
    try {
      const f = await fetch(WEATHER_ENDPOINTS.FORECAST(city, 7), { signal }); const fd = await f.json();
      if (fd.success && fd.data?.days) setForecastList(fd.data.days);
    } catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Weather error:', e); }
  };
  const fetchNwp = async (city: string, signal?: AbortSignal) => {
    try { const r = await fetch(WEATHER_ENDPOINTS.NWP(city), { signal }); const d = await r.json(); if (d.success && d.data) setNwpComparison(d.data); }
    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('NWP error:', e); }
  };
  const fetchSector = async (city: string, sector: string, signal?: AbortSignal) => {
    setSectorLoading(true);
    try { const r = await fetch(ADVISORIES_ENDPOINT(city, sector), { signal }); const d = await r.json(); if (d.success && d.data) setSectorAdvisory(d.data); }
    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Sector error:', e); }
    finally { setSectorLoading(false); }
  };
  const fetchAlerts = async (city: string, signal?: AbortSignal) => {
    try { const r = await fetch(ALERTS_ENDPOINT(city), { signal }); const d = await r.json(); if (d.success && d.data?.alerts) setAlertsList(d.data.alerts); }
    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Alerts error:', e); }
  };
  const fetchClimate = async (city: string, signal?: AbortSignal) => {
    try { const r = await fetch(CLIMATE_ENDPOINT(city), { signal }); const d = await r.json(); if (d.success && d.data) setClimateInfo(d.data); }
    catch (e) { if (!(e instanceof Error && e.name === 'AbortError')) console.warn('Climate error:', e); }
  };

  // ── Active IMD warning (bulletin overrides routine answers structurally) ──
  const activeWarning = useMemo<ImdWarning | null>(() => {
    if (IS_DEMO) return DEMO_WARNING;
    if (!alertsList.length) return null;
    const a = alertsList[0];
    const text = a.description || a.warning || a.message || '';
    if (!text) return null;
    return {
      district: `${location.name} district`,
      severity: severityOf(a),
      title: a.title || undefined,
      text,
      issuedAt: a.issuedAt ?? a.issueTime ?? a.issued ?? undefined,
    };
  }, [alertsList, location.name]);

  // ── Suggested chips ──
  const chips: { key: string; icon: typeof Mic; label: string; fill?: string; voice?: boolean }[] = [
    { key: 'rain', icon: CloudRain, label: `Will it rain in ${location.name} in 2 days?`, fill: `Will it rain over ${location.name} in the next two days?` },
    { key: 'warn', icon: Bell, label: 'Any active warning for my district?', fill: 'Is there an active warning for my district?' },
    { key: 'irrig', icon: Droplets, label: 'Should I irrigate tomorrow?', fill: 'Should farmers in this area irrigate tomorrow?' },
    { key: 'voice', icon: Mic, label: 'Ask by voice', voice: true },
  ];

  const onChipClick = (chip: (typeof chips)[number]) => {
    if (chip.voice) { toggleListening(); return; }
    if (chip.fill) { setInput(chip.fill); inputRef.current?.focus(); }
  };

  const handleNavigate = (page: NavPage) => {
    setActivePage(page);
    setDrawerOpen(false);
  };

  const navigateHome = () => {
    setActivePage(null);
    setDrawerOpen(false);
  };

  // ── Render ──
  const onChat = activePage === null;

  const SECTOR_LIST: { id: 'agriculture' | 'aviation' | 'marine' | 'urban'; label: string; icon: typeof Sprout }[] = [
    { id: 'agriculture', label: 'Agriculture', icon: Sprout },
    { id: 'aviation', label: 'Aviation', icon: Plane },
    { id: 'marine', label: 'Marine', icon: Anchor },
    { id: 'urban', label: 'Smart City', icon: Building2 },
  ];

  const climateMetrics = [
    { label: 'Warming rate', value: `+${climateInfo?.warmingRatePerDecade}°C`, sub: 'per decade', icon: Flame },
    { label: 'Baseline mean', value: `${climateInfo?.baselineMeanTemperature}°C`, sub: '30-year normal', icon: Thermometer },
    { label: 'Annual rain', value: `${climateInfo?.baselineAnnualPrecipitation} mm`, sub: 'per year', icon: Droplets },
  ] as const;

  return (
    <div className="app">
      <IconRail activePage={activePage} onNavigate={handleNavigate} onGoHome={navigateHome} />

      <div className="main">
        <AppHeader
          locationName={location.name}
          lang={selectedLang}
          onLanguageChange={setSelectedLang}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLocationClick={handleLocationClick}
          drawerOpen={drawerOpen}
          onToggleDrawer={() => setDrawerOpen(v => !v)}
        />

        <WarningBulletin warning={activeWarning} />

        {onChat ? (
          <>
            <main className="stream chat-stream" aria-label="Chat">
              <div className="col">
                {messages.length === 0 && (
                  <>
                    <p className="intro" dangerouslySetInnerHTML={{ __html: copy.intro }} />
                    <div className="chips">
                      {chips.map(chip => {
                        const Icon = chip.icon;
                        return (
                          <button key={chip.key} type="button" className="chip" onClick={() => onChipClick(chip)}>
                            <Icon />
                            {chip.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {messages.map(msg => (
                  <div key={msg.id}>
                    {msg.role === 'user' ? (
                      <div className="msg-user">{msg.content}</div>
                    ) : msg.card ? (
                      <AnswerCard
                        figure={msg.card.figure}
                        label={msg.card.label}
                        body={msg.card.body ?? msg.content}
                        confidence={msg.card.confidence}
                        issuedAt={msg.card.issuedAt}
                        source={msg.card.source}
                      />
                    ) : (
                      <div className="msg-assistant">{msg.content}</div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="typing-indicator" aria-label="Assistant typing" role="status">
                    <span /><span /><span />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </main>

            <InputBar
              ref={inputRef}
              value={input}
              onChange={setInput}
              onSend={(t) => void handleSend(t)}
              onMicClick={toggleListening}
              listening={listening}
              micSupported={sttSupported}
              disabled={isLoading}
              placeholder={copy.inputPlaceholder}
              helperText={copy.helper}
            />
          </>
        ) : (
          <main className="page-view" aria-label={NAV_LABELS[activePage] ?? activePage}>
            <div className="page-view-inner">
              {activePage === 'forecast' && (
                <div style={P.panel}>
                  <header>
                    <h2 style={P.h2}>7-Day Forecast for {location.name}</h2>
                  </header>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: '10px' }}>
                    {forecastList.map((day: any, i: number) => (
                      <div key={i} style={P.metaCard}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--slate-teal)' }}>{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : day.date}</div>
                        <div style={{ fontSize: '17px', fontWeight: 800, margin: '6px 0', fontVariantNumeric: 'tabular-nums' }}>{Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{day.weatherDescription}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--ink)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <CloudRain size={12} style={{ color: 'var(--slate-teal)' }} /> {day.precipitationProbabilityMax}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePage === 'nwp' && nwpComparison && (
                <div style={P.panel}>
                  <header>
                    <h2 style={P.h2}>NWP Multi-Model Ensemble for {location.name}</h2>
                  </header>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ ...S.badge, background: 'var(--slate-teal-tint)', color: 'var(--slate-teal)', borderColor: 'var(--slate-teal)' }}>
                      Consensus: {nwpComparison.consensus?.consensusScorePercentage}% ({nwpComparison.consensus?.confidenceLevel})
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>{nwpComparison.consensus?.synopticSummary}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '10px' }}>
                    {nwpComparison.models?.map((m: any, i: number) => (
                      <div key={i} style={P.metaCard}>
                        <strong style={{ color: 'var(--slate-teal)' }}>{m.modelName}</strong> <span style={{ color: 'var(--muted)', fontSize: '12px' }}>({m.resolution})</span>
                        <div style={{ fontSize: '12.5px', margin: '4px 0', color: 'var(--ink)' }}>
                          Max <b style={{ fontVariantNumeric: 'tabular-nums' }}>{m.maxTemp}°C</b> · Min <b style={{ fontVariantNumeric: 'tabular-nums' }}>{m.minTemp}°C</b>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Rain: {m.totalPrecipitation} mm · Wind: {m.maxWindSpeed} km/h</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--slate-teal)', marginTop: '4px' }}>{m.synopticCondition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePage === 'nwp' && !nwpComparison && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>Loading NWP models…</div>
              )}

              {activePage === 'sectors' && (
                <div style={P.panel}>
                  <header>
                    <h2 style={P.h2}>Sector advisories for {location.name}</h2>
                  </header>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {SECTOR_LIST.map(({ id, label, icon: Icon }) => (
                      <button key={id} type="button" onClick={() => setActiveSector(id)} aria-pressed={activeSector === id}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '7px',
                          background: activeSector === id ? 'var(--slate-teal-tint)' : 'var(--paper)',
                          color: activeSector === id ? 'var(--slate-teal)' : 'var(--muted)',
                          border: `1px solid ${activeSector === id ? 'var(--slate-teal)' : 'var(--line)'}`,
                          padding: '6px 14px', borderRadius: 'var(--radius-btn)', cursor: 'pointer',
                          fontSize: '12.5px', fontWeight: 600, fontFamily: 'var(--font-ui)',
                        }}>
                        <Icon size={15} /> {label}
                      </button>
                    ))}
                  </div>
                  {sectorLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>Loading {activeSector} advisory…</div>
                  ) : (<>
                    {activeSector === 'agriculture' && sectorAdvisory?.agriculture && (
                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                          { icon: Sprout, title: 'Sowing advice', text: sectorAdvisory.agriculture.sowingAdvisory, accent: 'var(--slate-teal)', border: 'var(--slate-teal)' },
                          { icon: Droplets, title: 'Irrigation', text: sectorAdvisory.agriculture.irrigationRecommendation, accent: 'var(--slate-teal)', border: 'var(--slate-teal)' },
                          { icon: SprayCan, title: 'Spraying window', text: sectorAdvisory.agriculture.sprayingWindow, accent: 'var(--brass)', border: 'var(--brass)' },
                        ].map(({ icon: Icon, title, text, accent, border }) => (
                          <div key={title} style={{ background: 'var(--mist)', border: `1px solid ${border}`, padding: '12px', borderRadius: 'var(--radius-card)' }}>
                            <p style={{ margin: '0 0 4px', fontWeight: 600, color: accent, display: 'flex', alignItems: 'center', gap: '7px' }}>
                              <Icon size={15} /> {title}
                            </p>
                            <p style={{ margin: 0, color: 'var(--ink)' }}>{text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeSector === 'aviation' && sectorAdvisory?.aviation && (
                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <Plane size={15} /> Flight category
                          </p>
                          <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>{sectorAdvisory.aviation.flightCategory}</p>
                        </div>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: 0, color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{sectorAdvisory.aviation.metarCode}</p>
                        </div>
                      </div>
                    )}
                    {activeSector === 'marine' && sectorAdvisory?.marine && (
                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <Anchor size={15} /> Fishermen directive
                          </p>
                          <p style={{ margin: 0, color: 'var(--ink)' }}>{sectorAdvisory.marine.fishermenAction}</p>
                        </div>
                      </div>
                    )}
                    {activeSector === 'urban' && sectorAdvisory?.smartCity && (
                      <div style={{ fontSize: '13px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ background: 'var(--mist)', border: '1px solid var(--line)', padding: '12px', borderRadius: 'var(--radius-card)' }}>
                          <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--slate-teal)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <Waves size={15} /> Flood risk
                          </p>
                          <p style={{ margin: 0, color: 'var(--ink)' }}>{sectorAdvisory.smartCity.waterloggingFloodRisk}</p>
                        </div>
                      </div>
                    )}
                  </>)}
                </div>
              )}

              {activePage === 'alerts' && (
                <div style={P.panel}>
                  <header>
                    <h2 style={P.h2}>IMD colour-coded early warnings for {location.name}</h2>
                  </header>
                  {alertsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--watch-green)' }}>
                      <CheckCircle size={36} style={{ margin: '0 auto 8px' }} />
                      <p style={{ margin: 0 }}><strong>IMD Green: normal weather conditions</strong></p>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>No severe weather warnings for {location.name}.</span>
                    </div>
                  ) : alertsList.map((a: any) => (
                    <div key={a.id} style={{ background: 'var(--mist)', borderLeft: `4px solid ${tierBorder(severityOf(a))}`, padding: '11px 14px', borderRadius: 'var(--radius-chip)', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', marginBottom: '4px', alignItems: 'center' }}>
                        <span style={{ ...S.badge, ...tierBadge(severityOf(a)) }}>{a.severity ?? 'Warning'}</span>
                        {a.informationClass && <span style={{ color: 'var(--muted)' }}>{a.informationClass}</span>}
                      </div>
                      <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>{a.title}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--ink)' }}>{a.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activePage === 'climate' && (
                <div style={P.panel}>
                  <header>
                    <h2 style={P.h2}>Climate analysis for {location.name}</h2>
                  </header>
                  {!climateInfo ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                      <p style={{ margin: 0 }}>Loading climate data for <strong>{location.name}</strong>…</p>
                    </div>
                  ) : (<>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '10px' }}>
                      {climateMetrics.map(({ label, value, sub, icon: Icon }) => (
                        <div key={label} style={P.metaCard}>
                          <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Icon size={13} style={{ color: 'var(--slate-teal)' }} /> {label}
                          </div>
                          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
                          <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                    {climateInfo.yearlyMetrics?.length > 0 && (
                      <div style={P.metaCard}>
                        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <TrendingUp size={15} style={{ color: 'var(--slate-teal)' }} /> Year-by-year temperature
                        </p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px', overflowX: 'auto', paddingBottom: '4px' }}>
                          {climateInfo.yearlyMetrics.map((ym: any, i: number) => {
                            const temps = climateInfo.yearlyMetrics.map((y: any) => y.meanTemperature || 0);
                            const mn = Math.min(...temps), mx = Math.max(...temps), rng = mx - mn || 1;
                            const h = Math.max(8, ((ym.meanTemperature - mn) / rng) * 64 + 8);
                            const warm = ym.meanTemperature > (mn + mx) / 2;
                            return (
                              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', minWidth: '32px' }}>
                                <div title={`${ym.year}: ${ym.meanTemperature}°C`}
                                  style={{ width: '20px', height: `${h}px`, background: warm ? 'var(--slate-teal)' : 'var(--line)', borderRadius: '3px 3px 0 0' }} />
                                <span style={{ fontSize: '9px', color: 'var(--muted)', writingMode: 'vertical-rl' }}>{ym.year}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div style={{ ...P.metaCard, padding: 0, overflow: 'hidden' }}>
                      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <MapIcon size={15} style={{ color: 'var(--slate-teal)' }} /> Location map for {location.name}
                      </div>
                      <ClimateMapEmbed city={location.name} />
                    </div>
                  </>)}
                </div>
              )}

              {activePage === 'route' && <RouteWeatherView />}
              {activePage === 'report' && <WeatherReportView />}
              {activePage === 'map' && <WeatherMapView />}
              {activePage === 'radar' && <WeatherRadarView />}
            </div>
          </main>
        )}
      </div>

      <MobileDrawer
        open={drawerOpen}
        activePage={activePage}
        onNavigate={handleNavigate}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

const NAV_LABELS: Record<NavPage, string> = {
  forecast: 'Forecast',
  nwp: 'NWP models',
  sectors: 'Sectors',
  alerts: 'Alerts & history',
  climate: 'Climate',
  route: 'Route weather',
  report: 'Weather report',
  map: 'Weather map',
  radar: 'Radar',
};```

## File: frontend/src/config/api.ts
```text
/**
 * API Configuration
 *
 * Java backend (Spring Boot) → Railway
 * Python ML backend (FastAPI) → Railway
 *
 * In production, requests go directly to the Railway backends.
 * In development, these URLs also work directly, so no Vite proxy
 * is required for these API calls.
 */

// ── Backend base URLs ────────────────────────────────────────────────

export const JAVA_API_BASE =
  "https://sih-weathergpt-production.up.railway.app";

export const ML_API_BASE =
  "https://bubbly-abundance-production-4c2a.up.railway.app";

// Kept for MobileWeatherGPT backward compatibility.
export const API_BASE_URL = "";

// ── Java backend endpoints ──────────────────────────────────────────

export const WEATHER_ENDPOINTS = {
  CURRENT: (location: string) =>
    `${JAVA_API_BASE}/api/weather/current?location=${encodeURIComponent(location)}`,

  FORECAST: (location: string, days = 7) =>
    `${JAVA_API_BASE}/api/weather/forecast?location=${encodeURIComponent(location)}&days=${days}`,

  NWP: (location: string) =>
    `${JAVA_API_BASE}/api/weather/nwp?location=${encodeURIComponent(location)}`,
};

export const ADVISORIES_ENDPOINT = (
  location: string,
  sector: string,
) =>
  `${JAVA_API_BASE}/api/weather/advisories?location=${encodeURIComponent(
    location,
  )}&sector=${encodeURIComponent(sector)}`;

export const ALERTS_ENDPOINT = (location: string) =>
  `${JAVA_API_BASE}/api/alerts/early-warnings?location=${encodeURIComponent(
    location,
  )}`;

export const CLIMATE_ENDPOINT = (
  location: string,
  startYear = 2015,
  endYear = 2024,
) =>
  `${JAVA_API_BASE}/api/weather/climate?location=${encodeURIComponent(
    location,
  )}&startYear=${startYear}&endYear=${endYear}`;

export const CHAT_ENDPOINT =
  `${JAVA_API_BASE}/api/chat/query`;

// ── Python ML backend endpoints ─────────────────────────────────────

/**
 * AI agent chat
 * LangChain + OpenRouter + FastAPI
 */
export const ML_AGENT_ENDPOINT =
  `${ML_API_BASE}/agent`;

/**
 * Route weather analysis
 */
export const ML_ROUTE_ENDPOINT =
  `${ML_API_BASE}/route-weather`;

// ── In-flight deduplication helper ──────────────────────────────────

const _inFlight = new Map<string, Promise<Response>>();

export function fetchWithDedup(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const key = `${options?.method ?? "GET"}:${url}`;

  const existing = _inFlight.get(key);

  if (existing) {
    return existing;
  }

  const p = fetch(url, options).finally(() => {
    _inFlight.delete(key);
  });

  _inFlight.set(key, p);

  return p;
}
```

## File: frontend/src/components/ChatDrawer.tsx
```text
import { ChevronLeft, Mic, MoreVertical, Send, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { useVoiceOutput } from '../hooks/useVoiceOutput';
import './ChatDrawer.css';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: Date;
  voiceText?: string;
  structuredData?: any;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLang?: string;
  onLanguageChange?: (lang: string) => void;
}

export default function ChatDrawer({
  isOpen,
  onClose,
  selectedLang = 'en',

}: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      content:
        "Hello! I'm WeatherGPT, your AI weather assistant. Ask me about the weather in any location.",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { speak, stop: stopSpeech } = useVoiceOutput();

  const LANGUAGE_LOCALES: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    bn: 'bn-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
  };

  const { status: voiceStatus, startListening, stopListening } = useVoiceInput({
    lang: LANGUAGE_LOCALES[selectedLang] || 'en-IN',
    onTranscript: (text) => {
      if (!text) return;
      setInput(text);
      handleSendMessage(text);
    },
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/chat/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            language: selectedLang,
            sector: 'general',
            sessionId: 'desktop-drawer-session',
          }),
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);
        const d = await res.json();

        if (d.success && d.data) {
          const botResponse: ChatMessage = {
            id: `bot-${Date.now()}`,
            role: 'bot',
            content: d.data.answer || 'Query processed.',
            voiceText: d.data.voiceAnswer || d.data.answer,
            structuredData: d.data,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        } else {
          setMessages((prev) => [
            ...prev,
            { id: `bot-${Date.now()}`, role: 'bot', content: d.message || 'Could not process query.', timestamp: new Date() },
          ]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prev) => [
          ...prev,
          { id: `bot-${Date.now()}`, role: 'bot', content: '⚠️ Unable to reach backend. Is the Java server running on :8080?', timestamp: new Date() },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedLang]
  );

  const handleSpeakMessage = useCallback(
    (messageId: string, text: string) => {
      if (isSpeakingId === messageId) {
        stopSpeech();
        setIsSpeakingId(null);
      } else {
        setIsSpeakingId(messageId);
        speak(text);
      }
    },
    [isSpeakingId, speak, stopSpeech, selectedLang]
  );

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className={`chat-drawer-container ${isClosing ? 'is-closing' : ''}`}>
      {/* Header */}
      <div className="chat-drawer-header">
        <div className="cdr-header-left">
          <button
            className="cdr-back-btn"
            onClick={handleClose}
            aria-label="Close chat drawer"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="cdr-header-title-group">
            <h2 className="cdr-header-title">WeatherGPT</h2>
            <p className="cdr-header-status">
              <span className="cdr-status-indicator" />
              Online
            </p>
          </div>
        </div>

        <div className="cdr-header-right">
          <button
            className="cdr-menu-btn"
            onClick={() => console.log('Menu clicked')}
            aria-label="More options"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="chat-drawer-stream" ref={streamRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`cdr-msg-wrap ${msg.role}`}>
            {msg.role === 'bot' && (
              <div className="cdr-msg-bubble bot">
                <p className="cdr-msg-text">{msg.content}</p>

                {msg.structuredData && (
                  <div className="cdr-msg-data-section">
                    <div className="cdr-data-card">
                      <div className="cdr-card-header">
                        <h3 className="cdr-card-title">
                          {msg.structuredData.location}
                        </h3>
                        <p className="cdr-card-meta">
                          {msg.structuredData.date}
                        </p>
                      </div>

                      <div className="cdr-data-row">
                        <span className="cdr-data-label">
                          {msg.structuredData.condition}
                        </span>
                      </div>

                      <div className="cdr-data-row">
                        <span className="cdr-data-label">Humidity</span>
                        <span className="cdr-data-value">
                          {msg.structuredData.metrics.humidity}
                        </span>
                      </div>
                      <div className="cdr-data-row">
                        <span className="cdr-data-label">Wind</span>
                        <span className="cdr-data-value">
                          {msg.structuredData.metrics.wind}
                        </span>
                      </div>
                      <div className="cdr-data-row">
                        <span className="cdr-data-label">Precipitation</span>
                        <span className="cdr-data-value">
                          {msg.structuredData.metrics.precipitation}
                        </span>
                      </div>

                      {msg.structuredData.description && (
                        <p className="cdr-data-desc">
                          {msg.structuredData.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="cdr-msg-footer">
                  <span className="cdr-msg-timestamp">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <button
                    className={`cdr-speak-btn ${
                      isSpeakingId === msg.id ? 'is-speaking' : ''
                    }`}
                    onClick={() =>
                      handleSpeakMessage(
                        msg.id,
                        msg.voiceText || msg.content
                      )
                    }
                    disabled={isLoading}
                    aria-label={`${
                      isSpeakingId === msg.id ? 'Stop' : 'Listen to'
                    } message`}
                  >
                    {isSpeakingId === msg.id ? (
                      <>
                        <VolumeX size={12} />
                        Stop
                      </>
                    ) : (
                      <>
                        <span>🔊</span>
                        Listen
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {msg.role === 'user' && (
              <div className="cdr-msg-bubble user">
                <p className="cdr-msg-text">{msg.content}</p>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="cdr-msg-wrap bot">
            <div className="cdr-typing-bubble">
              <div className="cdr-typing-dot" />
              <div className="cdr-typing-dot" />
              <div className="cdr-typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="chat-drawer-input-bar">
        <div className="chat-drawer-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-drawer-input"
            placeholder="Ask about the weather..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(input);
              }
            }}
            disabled={isLoading}
            aria-label="Chat input"
          />

          <button
            className="cdr-input-btn"
            onClick={() => {
              if (voiceStatus === 'listening') {
                stopListening();
              } else {
                startListening();
              }
            }}
            title={voiceStatus === 'listening' ? 'Stop listening' : 'Start listening'}
            aria-label={voiceStatus === 'listening' ? 'Stop listening' : 'Start listening'}
          >
            <Mic size={18} />
          </button>
        </div>

        <button
          className="cdr-send-btn"
          onClick={() => handleSendMessage(input)}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
```

## File: frontend/src/components/MobileWeatherGPT.tsx
```text
import {
  MapPin, Menu, X, Send, Mic, Sparkles, Cloud, Radar
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MobileWeatherGPT.css';
import {
  CHAT_ENDPOINT, ML_AGENT_ENDPOINT, ML_ROUTE_ENDPOINT,
  WEATHER_ENDPOINTS, ADVISORIES_ENDPOINT, ALERTS_ENDPOINT, CLIMATE_ENDPOINT,
} from '../config/api';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { useVoiceOutput } from '../hooks/useVoiceOutput';

// ─── Types ───
type NavPage = 'forecast'|'nwp'|'sectors'|'alerts'|'climate'|'aichat'|'route'|'report'|'map'|'radar';
interface AiMessage { role: 'user'|'assistant'; content: string; }
interface Coordinates { latitude: number; longitude: number; accuracy?: number; }
type LocationStatus = 'pending'|'granted'|'denied'|'unsupported';
interface HourlyBlock {
  time: string[]; temperature: number[]; humidity: number[];
  precipitationProbability: number[]; weatherCode: number[]; wind: number[];
}
interface DailyBlock {
  time: string[]; weatherCode: number[]; maxTemperature: number[];
  minTemperature: number[]; precipitationProbability: number[]; maxWind: number[];
}
interface GeoResult { latitude: number; longitude: number; name: string; country?: string; }
interface ForecastRecord {
  location: GeoResult; savedAt: string;
  hourly24h: HourlyBlock; daily7days: DailyBlock;
}
// ─── Constants ───

const WEATHER_CODE_DESCRIPTIONS: Record<number,string> = {
  0:'☀️ Clear',1:'🌤️ Mainly clear',2:'⛅ Partly cloudy',3:'☁️ Cloudy',
  45:'🌫️ Fog',48:'🌫️ Fog',51:'🌦️ Light drizzle',53:'🌦️ Drizzle',
  55:'🌧️ Heavy drizzle',61:'🌦️ Light rain',63:'🌧️ Rain',65:'🌧️ Heavy rain',
  71:'🌨️ Light snow',73:'❄️ Snow',75:'❄️ Heavy snow',
  80:'🌦️ Rain showers',81:'🌧️ Rain showers',82:'🌧️ Heavy showers',
  95:'⛈️ Thunderstorm',96:'⛈️ Thunderstorm + hail',99:'⛈️ Thunderstorm + hail',
};
const wmoDesc = (code: number) => WEATHER_CODE_DESCRIPTIONS[code] ?? '🌤️ Unknown';
const AI_SUGGESTIONS = [
  { title:"Today's weather", text:"What's the current weather at my location?" },
  { title:"Rain forecast", text:"Will it rain in the next 24 hours?" },
  { title:"Heat advisory", text:"Is there a heatwave warning for Delhi?" },
  { title:"Crop advisory", text:"Should farmers in Punjab irrigate tomorrow?" },
];

const TAB_ITEMS: { id: NavPage; label: string; emoji: string }[] = [
  { id:'aichat', label:'AI Chat', emoji:'💬' },
  { id:'forecast', label:'Forecast', emoji:'📅' },
  { id:'nwp', label:'NWP', emoji:'🛰️' },
  { id:'sectors', label:'Sectors', emoji:'🌾' },
  { id:'alerts', label:'Alerts', emoji:'🚨' },
  { id:'climate', label:'Climate', emoji:'📈' },
  { id:'route', label:'Route', emoji:'🛣️' },
  { id:'report', label:'Report', emoji:'📋' },
  { id:'map', label:'Map', emoji:'🗺️' },
  { id:'radar', label:'Radar', emoji:'📡' },
];

// ─── Shared styles ───
const S: Record<string, React.CSSProperties> = {
  scrollWrap: { width:'100%', height:'100%', overflowY:'auto', overflowX:'hidden', padding:'16px', boxSizing:'border-box' },
  container:  { width:'100%', maxWidth:'1400px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'16px', boxSizing:'border-box' },
  card:       { background:'rgba(10,22,36,0.55)', padding:'16px', borderRadius:'12px', border:'1px solid rgba(0,229,255,0.12)' },
  cardTitle:  { margin:'0 0 10px', fontSize:'0.95rem', fontWeight:700, color:'#e0f7ff' },
  label:      { fontSize:'0.75rem', fontWeight:600, color:'#7ab8d4' },
  input:      { padding:'10px 13px', borderRadius:'8px', border:'1px solid rgba(0,229,255,0.2)', background:'rgba(5,11,18,0.8)', color:'#e8f4fc', fontSize:'0.9rem', outline:'none', width:'100%', boxSizing:'border-box' },
  btn:        { padding:'12px 24px', background:'linear-gradient(120deg,#00c8ff 0%,#0078ff 100%)', color:'#050b12', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:700, fontSize:'0.92rem', width:'100%' },
  error:      { padding:'12px 16px', background:'rgba(229,101,74,0.12)', border:'1px solid rgba(229,101,74,0.3)', color:'#f0a08c', borderRadius:'8px', fontSize:'0.875rem' },
  successBanner:{ background:'rgba(0,229,255,0.08)', border:'1px solid rgba(0,229,255,0.25)', color:'#67e8f9', padding:'11px 15px', borderRadius:'8px', fontWeight:500, fontSize:'0.88rem' },
  jsonBlock:    { background:'rgba(5,11,18,0.8)', padding:'13px', borderRadius:'8px', overflowX:'auto', fontSize:'0.78rem', color:'#67e8f9', margin:0, border:'1px solid rgba(0,229,255,0.07)' },
};

// ─── Helper functions ───
async function geocodeCity(city: string): Promise<GeoResult> {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
  if (!res.ok) throw new Error('Unable to look up that location.');
  const data = await res.json();
  if (!data.results?.length) throw new Error('Location not found.');
  const r = data.results[0];
  return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
}
async function reverseGeocodeForReport(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=10`);
    if (!res.ok) throw new Error('');
    const d = await res.json();
    const a = d.address ?? {};
    return a.city ?? a.town ?? a.village ?? a.county ?? d.display_name ?? 'Current location';
  } catch { return 'Current location'; }
}
async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
    `&forecast_days=7&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather request failed.');
  const d = await res.json();
  return {
    location: place, savedAt: new Date().toISOString(),
    hourly24h: {
      time: d.hourly.time.slice(0,24), temperature: d.hourly.temperature_2m.slice(0,24),
      humidity: d.hourly.relative_humidity_2m.slice(0,24),
      precipitationProbability: d.hourly.precipitation_probability.slice(0,24),
      weatherCode: d.hourly.weather_code.slice(0,24), wind: d.hourly.wind_speed_10m.slice(0,24),
    },
    daily7days: {
      time: d.daily.time.slice(0,7), weatherCode: d.daily.weather_code.slice(0,7),
      maxTemperature: d.daily.temperature_2m_max.slice(0,7),
      minTemperature: d.daily.temperature_2m_min.slice(0,7),
      precipitationProbability: d.daily.precipitation_probability_max.slice(0,7),
      maxWind: d.daily.wind_speed_10m_max.slice(0,7),
    },
  };
}


// ─── WeatherMapView (Leaflet, same layer model as web + humidity overlay) ───
function MobileMapView({ location }: { location: Coordinates|null }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [layer, setLayer] = useState<'standard'|'temperature'|'precipitation'|'wind'|'humidity'>('standard');
  const [humidityData, setHumidityData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load humidity/climate data for color-gradient overlay
  useEffect(() => {
    if (layer !== 'humidity') { setHumidityData(null); return; }
    setLoading(true);
    if (location) {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=relative_humidity_2m,temperature_2m&forecast_days=1&timezone=auto`)
        .then(r => r.json())
        .then(d => { setHumidityData(d); setLoading(false); })
        .catch(() => setLoading(false));
    } else { setLoading(false); }
  }, [layer, location]);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link'); link.rel='stylesheet';
      link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
    }
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors', maxZoom:18 }).addTo(map);
      mapRef.current = map;
      if (location) {
        markerRef.current = L.marker([location.latitude, location.longitude]).addTo(map).bindPopup('📍 Your Location').openPopup();
      }
    });
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !location) return;
    import('leaflet').then((L) => {
      if (markerRef.current) markerRef.current.setLatLng([location.latitude, location.longitude]);
      else markerRef.current = L.marker([location.latitude, location.longitude]).addTo(mapRef.current).bindPopup('📍 Your Location').openPopup();
      mapRef.current.setView([location.latitude, location.longitude], 8);
    });
  }, [location]);

  const switchLayer = (type: typeof layer) => {
    setLayer(type);
    if (!mapRef.current) return;
    import('leaflet').then((L) => {
      const map = mapRef.current;
      map.eachLayer((l: any) => { if (l instanceof L.TileLayer) map.removeLayer(l); });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap contributors', maxZoom:18 }).addTo(map);
      const overlays: Record<string,string> = {
        temperature: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo',
        precipitation: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
        wind: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=demo',
      };
      if (type !== 'standard' && type !== 'humidity' && overlays[type])
        L.tileLayer(overlays[type], { opacity:0.55, attribution:'Weather &copy; OpenWeatherMap' }).addTo(map);
    });
  };

  const layers: {id: typeof layer; label: string; emoji: string}[] = [
    {id:'standard', label:'Standard', emoji:'🗺️'},
    {id:'temperature', label:'Temperature', emoji:'🌡️'},
    {id:'precipitation', label:'Rain', emoji:'🌧️'},
    {id:'wind', label:'Wind', emoji:'💨'},
    {id:'humidity', label:'Humidity', emoji:'💧'},
  ];

  // Generate humidity color-gradient overlay using canvas
  const humidityGradientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (layer !== 'humidity' || !humidityData || !humidityGradientRef.current) return;
    const container = humidityGradientRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = 360; canvas.height = 180;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Draw a color-gradient based on humidity data
    const humidityValues = humidityData?.hourly?.relative_humidity_2m || [];
    if (!humidityValues.length) return;
    const maxH = Math.max(...humidityValues);
    const minH = Math.min(...humidityValues);
    const rng = maxH - minH || 1;
    const imgData = ctx.createImageData(360, 180);
    for (let y = 0; y < 180; y++) {
      for (let x = 0; x < 360; x++) {
        const idx = (y * 360 + x) * 4;
        const t = (x / 360) * (humidityValues.length - 1);
        const idx2 = Math.floor(t);
        const val = humidityValues[Math.min(idx2, humidityValues.length - 1)];
        const norm = (val - minH) / rng;
        // Color gradient: blue (low humidity) -> cyan -> green -> yellow -> red (high humidity)
        if (norm < 0.25) { const n = norm / 0.25; imgData.data[idx]=0; imgData.data[idx+1]=Math.floor(100+n*155); imgData.data[idx+2]=255; }
        else if (norm < 0.5) { const n = (norm-0.25)/0.25; imgData.data[idx]=0; imgData.data[idx+1]=Math.floor(200+n*55); imgData.data[idx+2]=Math.floor(255-n*100); }
        else if (norm < 0.75) { const n = (norm-0.5)/0.25; imgData.data[idx]=Math.floor(n*255); imgData.data[idx+1]=255; imgData.data[idx+2]=Math.floor(155-n*155); }
        else { const n = (norm-0.75)/0.25; imgData.data[idx]=255; imgData.data[idx+1]=Math.floor(255-n*200); imgData.data[idx+2]=0; }
        imgData.data[idx+3] = 160;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    container.appendChild(canvas);
    return () => { if (canvas.parentNode) canvas.parentNode.removeChild(canvas); };
  }, [layer, humidityData]);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%' }}>
      <div style={{ padding:'8px 12px', background:'var(--glass-bg)', borderBottom:'1px solid var(--glass-border)', display:'flex', gap:'6px', alignItems:'center', flexWrap:'wrap', flexShrink:0 }}>
        <span style={{ fontSize:'11px', color:'var(--text-secondary)', fontWeight:600, marginRight:'2px' }}>Layer:</span>
        {layers.map(b => (
          <button key={b.id} onClick={() => switchLayer(b.id)} style={{
            padding:'4px 10px', borderRadius:'16px', border:'1px solid',
            borderColor: layer===b.id ? 'var(--accent-cyan)' : 'var(--glass-border)',
            background:  layer===b.id ? 'var(--accent-cyan-dim)' : 'transparent',
            color:       layer===b.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            fontSize:'11px', fontWeight:600, cursor:'pointer',
          }}>{b.emoji} {b.label}</button>
        ))}
        {location && <span style={{ marginLeft:'auto', fontSize:'10px', color:'var(--text-muted)' }}>📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>}
      </div>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <div ref={ref} style={{ width:'100%', height:'100%', background:'#071018' }} />
        {layer === 'humidity' && (
          <div ref={humidityGradientRef} style={{ position:'absolute', inset:0, zIndex:5, pointerEvents:'none' }}>
            {loading && !humidityData && (
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(5,11,18,0.6)', color:'#7ab8d4', fontSize:'13px' }}>Loading humidity overlay…</div>
            )}
            {humidityData && (
              <div style={{ position:'absolute', bottom:8, right:8, background:'rgba(5,11,18,0.85)', padding:'6px 10px', borderRadius:'8px', border:'1px solid rgba(0,229,255,0.2)', fontSize:'10px', color:'#e0f7ff', zIndex:10 }}>
                💧 Humidity Color Gradient — {humidityData.hourly?.relative_humidity_2m ? `${Math.min(...humidityData.hourly.relative_humidity_2m)}% – ${Math.max(...humidityData.hourly.relative_humidity_2m)}%` : 'Live'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Interactive Radar View ───
function MobileRadarView({ location }: { location: Coordinates|null }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link'); link.rel='stylesheet';
      link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
    }
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      const map = L.map(ref.current!, { center:[location?.latitude??20.5937, location?.longitude??78.9629], zoom:5 });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution:'&copy; OpenStreetMap, &copy; CARTO', maxZoom:18 }).addTo(map);
      L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo', { opacity:0.65, attribution:'Weather &copy; OpenWeatherMap' }).addTo(map);
      L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=demo', { opacity:0.4, attribution:'Clouds &copy; OpenWeatherMap' }).addTo(map);
      if (location) {
        const icon = L.divIcon({
          className:'', html:`<div style="width:14px;height:14px;background:rgba(0,229,255,0.9);border-radius:50%;border:2px solid white;box-shadow:0 0 0 4px rgba(0,229,255,0.3)"></div>`,
          iconSize:[14,14], iconAnchor:[7,7],
        });
        L.marker([location.latitude, location.longitude], { icon }).addTo(map).bindPopup('📍 Your Location');
      }
      mapRef.current = map;
    });
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%' }}>
      <div style={{ padding:'8px 12px', background:'var(--glass-bg)', borderBottom:'1px solid var(--glass-border)', display:'flex', gap:'12px', alignItems:'center', flexShrink:0 }}>
        <Radar size={14} style={{ color:'var(--accent-cyan)' }} />
        <span style={{ fontSize:'12px', fontWeight:700, color:'var(--text-primary)' }}>Live Precipitation & Cloud Radar</span>
      </div>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <div ref={ref} style={{ width:'100%', height:'100%', background:'#050b12' }} />
      </div>
    </div>
  );
}


// ─── AI Chat View ───
function AIChatView({ location, onNavigate }: { location: Coordinates|null; onNavigate?: (page: NavPage)=>void }) {
  const [messages, setMessages] = useState<AiMessage[]>([{
    role:'assistant', content:"👋 Hello! I'm **WeatherGPT**, your AI meteorological assistant aligned with MoES / IMD.\n\nAsk me about live forecasts, crop advisories, NWP models or climate trends!",
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, loading]);

  const send = async (override?: string) => {
    const prompt = (override ?? input).trim();
    if (!prompt || loading) return;
    setMessages(p => [...p, { role:'user', content:prompt }]);
    setInput(''); setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    try {
      const res = await fetch(ML_AGENT_ENDPOINT, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          prompt,
          location: location ? { latitude:location.latitude, longitude:location.longitude, accuracy:location.accuracy } : null,
        }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const d = await res.json();
      setMessages(p => [...p, { role:'assistant', content:d.message }]);
    } catch {
      setMessages(p => [...p, { role:'assistant', content:"⚠️ The AI service is temporarily unavailable. Please try again." }]);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', width:'100%', overflow:'hidden' }}>
      <div style={{ flex:1, overflowY:'auto', padding:'16px 14px 8px' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          {messages.length <= 1 && (
            <div style={{ paddingTop:'2vh' }}>
              <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:'var(--accent-cyan-dim)', border:'1px solid var(--accent-cyan)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
                <Cloud size={20} style={{ color:'var(--accent-cyan)' }} />
              </div>
              <h2 style={{ margin:'0 0 16px', fontSize:'clamp(18px,4vw,24px)', fontWeight:700, color:'var(--text-primary)', letterSpacing:'-0.4px', lineHeight:1.25 }}>
                Where would you like weather updates for today?
              </h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'8px' }}>
                {AI_SUGGESTIONS.map((s,i) => (
                  <button key={i} onClick={() => send(s.text)} style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'10px', minHeight:'80px', padding:'12px', textAlign:'left', background:'var(--glass-bg)', borderRadius:'12px', border:'1px solid var(--glass-border)', cursor:'pointer', transition:'border-color 0.15s' }}>
                    <p style={{ margin:0, fontSize:'13px', fontWeight:500, color:'var(--text-primary)', lineHeight:1.4 }}>{s.text}</p>
                    <span style={{ fontSize:'11px', color:'var(--text-muted)' }}>{s.title}</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop:'16px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
                <span style={{ fontSize:'11px', color:'var(--text-muted)', marginRight:'4px', alignSelf:'center' }}>Quick:</span>
                {['NWP Models','Sectors','Alerts','Climate','Route Weather'].map(t => (
                  <button key={t} onClick={() => { const map: Record<string,NavPage>={ 'NWP Models':'nwp','Sectors':'sectors','Alerts':'alerts','Climate':'climate','Route Weather':'route'}; onNavigate?.(map[t]); }}
                    style={{ padding:'4px 10px', borderRadius:'12px', background:'var(--glass-bg)', border:'1px solid var(--glass-border)', color:'var(--accent-cyan)', fontSize:'11px', cursor:'pointer' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.length > 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:'14px', paddingBottom:'6px' }}>
              {messages.map((m,i) => (
                <div key={i} style={{ display:'flex', gap:'8px', justifyContent:m.role==='user'?'flex-end':'flex-start', alignItems:'flex-start' }}>
                  {m.role==='assistant' && (
                    <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'var(--accent-cyan)' }}>
                      <Cloud size={12} />
                    </div>
                  )}
                  <div style={{ maxWidth:'min(78%,720px)' }}>
                    {m.role==='user' ? (
                      <div style={{ background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', color:'var(--text-primary)', padding:'8px 12px', borderRadius:'16px', borderTopRightRadius:'4px', fontSize:'14px', lineHeight:1.5 }}>
                        <p style={{ margin:0, whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{m.content}</p>
                      </div>
                    ) : (
                      <div style={{ background:'var(--glass-bg)', border:'1px solid var(--glass-border)', padding:'10px 12px', borderRadius:'16px', borderTopLeftRadius:'4px', color:'var(--text-primary)', fontSize:'14px', lineHeight:1.65 }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                  {m.role==='user' && (
                    <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:'var(--glass-bg-strong)', color:'var(--text-secondary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:600, flexShrink:0 }}>U</div>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                  <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:'var(--glass-bg-strong)', border:'1px solid var(--glass-border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-cyan)' }}>
                    <Cloud size={12} />
                  </div>
                  <div style={{ width:'90px', height:'10px', borderRadius:'6px', background:'linear-gradient(90deg,var(--glass-bg) 25%,var(--glass-bg-strong) 50%,var(--glass-bg) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite' }} />
                </div>
              )}
              <div ref={endRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Forecast View ───
function ForecastView({ forecastList }: { forecastList: any[] }) {
  if (!forecastList?.length) return <div className="mob-loading">No forecast data</div>;
  return (
    <div className="mob-screen">
      {forecastList.map((day, i) => (
        <div key={i} className="mob-forecast-day">
          <strong>{i===0?'Today':i===1?'Tomorrow':day.date || `Day ${i+1}`}</strong>
          <span className="temp">{Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°</span>
          <span className="desc">{day.weatherDescription || '—'}</span>
          <span className="rain">🌧️ {day.precipitationProbabilityMax ?? '--'}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── NWP View ───
function NWPView({ nwpComparison }: { nwpComparison: any }) {
  if (!nwpComparison) return <div className="mob-loading">Loading NWP data…</div>;
  return (
    <div className="mob-screen">
      <div className="mob-consensus">
        <div className="mob-score">
          <span>{nwpComparison.consensus?.consensusScorePercentage ?? '--'}%</span>
          <span>Score</span>
        </div>
        <div>
          <strong style={{ fontSize:'13px', color:'#38bdf8' }}>Confidence: {nwpComparison.consensus?.confidenceLevel ?? '—'}</strong>
          <p style={{ fontSize:'11px', color:'var(--text-muted)', margin:'4px 0 0' }}>{nwpComparison.consensus?.synopticSummary || '—'}</p>
          <p style={{ fontSize:'10px', color:'var(--text-muted)', margin:'2px 0 0' }}>
            Spread: {nwpComparison.consensus?.tempSpread ?? '--'}°C • Rain: {nwpComparison.consensus?.precipSpread ?? '--'}mm
          </p>
        </div>
      </div>
      {(nwpComparison.models || []).map((m: any, i: number) => (
        <div key={i} className="mob-nwp-model">
          <h4>{m.modelName} ({m.resolution})</h4>
          <p>Max: {m.maxTemp}°C | Min: {m.minTemp}°C</p>
          <p>Rain: {m.totalPrecipitation}mm | Wind: {m.maxWindSpeed}km/h</p>
          <p style={{ color:'var(--accent-cyan)', marginTop:'4px' }}>{m.synopticCondition}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Sectors View ───
function SectorsView({ sectorAdvisory, activeSector, setActiveSector, sectorLoading }: { sectorAdvisory: any; activeSector: string; setActiveSector: (s: 'agriculture'|'aviation'|'marine'|'urban')=>void; sectorLoading: boolean }) {
  const sectors = ['agriculture','aviation','marine','urban'] as const;
  return (
    <div className="mob-screen">
      <div className="mob-sector-tabs">
        {sectors.map(sec => (
          <button key={sec} onClick={() => setActiveSector(sec)} className={`mob-sector-tab ${activeSector===sec?'active':''}`}>
            {sec==='agriculture'?'🌾 Ag':sec==='aviation'?'✈️ Avi':sec==='marine'?'⚓ Marine':'🏙️ City'}
          </button>
        ))}
      </div>
      {sectorLoading ? <div className="mob-loading">Loading…</div> : !sectorAdvisory ? <div className="mob-empty">No advisory data</div> : (
        <div className="mob-card">
          {activeSector==='agriculture' && sectorAdvisory.agriculture && (
            <>
              <div className="mob-directive alert-success"><strong>Sowing:</strong> {sectorAdvisory.agriculture.sowingAdvisory}</div>
              <div className="mob-directive alert-success"><strong>Irrigation:</strong> {sectorAdvisory.agriculture.irrigationRecommendation}</div>
              <div className="mob-directive"><strong>Spraying:</strong> {sectorAdvisory.agriculture.sprayingWindow}</div>
            </>
          )}
          {activeSector==='aviation' && sectorAdvisory.aviation && (
            <>
              <div className="mob-directive"><strong>Flight Category:</strong> {sectorAdvisory.aviation.flightCategory}</div>
              <code style={{ display:'block', background:'rgba(5,11,18,0.8)', padding:'8px', borderRadius:'6px', fontSize:'11px', color:'#93c5fd', marginTop:'6px' }}>{sectorAdvisory.aviation.metarCode}</code>
            </>
          )}
          {activeSector==='marine' && sectorAdvisory.marine && (
            <div className="mob-directive"><strong>Fishermen:</strong> {sectorAdvisory.marine.fishermenAction}</div>
          )}
          {activeSector==='urban' && sectorAdvisory.smartCity && (
            <>
              <div className="mob-directive alert-danger"><strong>Flood Risk:</strong> {sectorAdvisory.smartCity.waterloggingFloodRisk}</div>
              <div className="mob-directive"><strong>Heat Island:</strong> {sectorAdvisory.smartCity.urbanHeatIslandIndex}°C</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Alerts View ───
function AlertsView({ alertsList, currentCity }: { alertsList: any[]; currentCity: string }) {
  return (
    <div className="mob-screen">
      <h3>🚨 IMD Early Warnings — {currentCity}</h3>
      {alertsList.length===0 ? (
        <div className="mob-card" style={{ textAlign:'center', padding:'24px' }}>
          <p style={{ color:'var(--green)', fontSize:'24px', marginBottom:'8px' }}>🟢</p>
          <p style={{ fontWeight:700, color:'var(--green)' }}>IMD Green: Normal Weather</p>
          <p style={{ color:'var(--text-muted)', fontSize:'12px', marginTop:'4px' }}>No severe warnings for {currentCity}.</p>
        </div>
      ) : alertsList.map((a: any) => {
        const sev = String(a.severity ?? '').toLowerCase();
        return (
          <div key={a.id} className={`mob-alert-card ${sev==='extreme'?'extreme':sev==='severe'?'severe':''}`}>
            <div className="mob-alert-header">
              <span className="mob-badge mob-badge-red">{a.severity}</span>
              <span className="mob-badge">{a.informationClass}</span>
            </div>
            <p style={{ fontWeight:600, margin:'4px 0' }}>{a.title}</p>
            <p style={{ fontSize:'12px', color:'var(--text-sec)' }}>{a.description}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Climate View ───
function ClimateView({ climateInfo, currentCity }: { climateInfo: any; currentCity: string }) {
  if (!climateInfo) return <div className="mob-loading">Loading climate data…</div>;
  return (
    <div className="mob-screen">
      <h3>📈 Climate Analysis — {currentCity}</h3>
      <div className="mob-climate-grid">
        <div className="mob-climate-stat">
          <span className="lbl">Warming/dec</span>
          <span className="val hot">+{climateInfo.warmingRatePerDecade}°C</span>
        </div>
        <div className="mob-climate-stat">
          <span className="lbl">Baseline Temp</span>
          <span className="val">{climateInfo.baselineMeanTemperature}°C</span>
        </div>
        <div className="mob-climate-stat">
          <span className="lbl">Rain/yr</span>
          <span className="val">{climateInfo.baselineAnnualPrecipitation}mm</span>
        </div>
      </div>
      {climateInfo.yearlyMetrics?.length > 0 && (
        <div className="mob-card">
          <h4 className="mob-card-title">📊 Year-by-Year Temperature</h4>
          <div className="mob-trend-bars">
            {climateInfo.yearlyMetrics.map((ym: any, i: number) => {
              const temps = climateInfo.yearlyMetrics.map((y: any) => y.meanTemperature||0);
              const mn=Math.min(...temps), mx=Math.max(...temps), rng=mx-mn||1;
              const h=Math.max(8,((ym.meanTemperature-mn)/rng)*64+8);
              return (
                <div key={i} className="mob-bar-col">
                  <div className={`mob-bar-fill ${ym.meanTemperature>(mn+mx)/2?'pos':'neg'}`} style={{ height:`${h}px` }} title={`${ym.year}: ${ym.meanTemperature}°C`} />
                  <span className="mob-bar-label">{ym.year}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Route Weather View ───
function RouteWeatherView() {
  const [form, setForm] = useState({ origin:'Delhi', destination:'Agra', departure_time:'08:00' });
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr(null); setResp(null);
    try {
      const res = await fetch(ML_ROUTE_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setResp(await res.json());
    } catch (e: any) { setErr(e.message || 'Failed to fetch route weather.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={S.scrollWrap}>
      <div style={S.container}>
        <header>
          <h2 style={{ margin:0, fontSize:'1.2rem', fontWeight:700, color:'var(--text-primary)' }}>Route weather analyzer</h2>
          <p style={{ margin:'4px 0 0', fontSize:'0.82rem', color:'var(--text-muted)' }}>Check conditions and risk along a journey. Ask <strong style={{ color:'var(--accent-cyan)' }}>AI Chat</strong> for route insights.</p>
        </header>
        <form onSubmit={handleSubmit} style={{ ...S.card, display:'flex', flexDirection:'column', gap:'12px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
            {(['origin','destination'] as const).map(field => (
              <div key={field} style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                <label style={S.label}>{field}</label>
                <input style={S.input} type="text" name={field} value={form[field]} onChange={e => setForm({...form, [field]:e.target.value})} required placeholder={field==='origin'?'e.g. Delhi':'e.g. Agra'} />
              </div>
            ))}
            <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
              <label style={S.label}>Departure</label>
              <input style={S.input} type="time" name="departure_time" value={form.departure_time} onChange={e => setForm({...form, departure_time:e.target.value})} required />
            </div>
          </div>
          <button type="submit" disabled={loading} style={S.btn}>{loading?'Analyzing…':'Analyze route'}</button>
        </form>
        {err && <div style={S.error}>{err}</div>}
        {resp && resp.risk_summary && (
          <div style={S.card}>
            <h3 style={S.cardTitle}>Risk summary</h3>
            <div className="mob-risk-grid">
              <div className="mob-risk-card high"><span className="count">{resp.risk_summary.HIGH ?? 0}</span><span className="lbl">High-risk</span></div>
              <div className="mob-risk-card mod"><span className="count">{resp.risk_summary.MODERATE ?? 0}</span><span className="lbl">Moderate</span></div>
              <div className="mob-risk-card low"><span className="count">{resp.risk_summary.LOW ?? 0}</span><span className="lbl">Low-risk</span></div>
            </div>
          </div>
        )}
        {resp && resp.weather_data && (
          <div style={S.card}>
            <h3 style={S.cardTitle}>Waypoint forecasts</h3>
            {Array.isArray(resp.weather_data) ? (
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.8rem' }}>
                  <thead><tr>{['#','Point','Condition','Temp','Risk'].map(h=><th key={h} style={{ padding:'8px', borderBottom:'1px solid var(--glass-border)', fontSize:'11px', color:'#7ab8d4', textAlign:'left' }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {resp.weather_data.map((item: any, i: number) => (
                      <tr key={i} style={{ borderBottom:'1px solid rgba(0,229,255,0.05)' }}>
                        <td style={{ padding:'8px', color:'#4a6a7d' }}>{i+1}</td>
                        <td style={{ padding:'8px', fontWeight:600, color:'#e0f7ff' }}>{item.location||item.point||`Point ${i+1}`}</td>
                        <td style={{ padding:'8px', color:'#b8d4e8' }}>{item.weather||item.condition||'—'}</td>
                        <td style={{ padding:'8px', color:'#b8d4e8' }}>{(item.temp??item.temperature)??'—'}°C</td>
                        <td style={{ padding:'8px' }}><span className="mob-badge" style={{ background: (item.risk||'NORMAL').toUpperCase()==='HIGH'?'rgba(229,101,74,0.3)':(item.risk||'NORMAL').toUpperCase()==='MODERATE'?'rgba(224,166,63,0.3)':'rgba(0,229,255,0.1)', color:(item.risk||'NORMAL').toUpperCase()==='HIGH'?'#f0a08c':(item.risk||'NORMAL').toUpperCase()==='MODERATE'?'#f0cf8f':'#67e8f9' }}>{(item.risk||'NORMAL').toUpperCase()}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <pre style={S.jsonBlock}>{JSON.stringify(resp.weather_data, null, 2)}</pre>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Weather Report View ───
function WeatherReportView({ location }: { location: Coordinates|null }) {
  const [cityInput, setCityInput] = useState('');
  const [record, setRecord] = useState<ForecastRecord|null>(null);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{tone:'error'|'info';text:string}|null>(null);
  const [online, setOnline] = useState(navigator.onLine);
  const autoRef = useRef(false);

  useEffect(() => {
    const on=()=>setOnline(true), off=()=>setOnline(false);
    window.addEventListener('online',on); window.addEventListener('offline',off);
    return ()=>{ window.removeEventListener('online',on); window.removeEventListener('offline',off); };
  }, []);

  useEffect(() => {
    if (autoRef.current || record || !location) return;
    autoRef.current = true;
    (async () => {
      setLoading(true);
      try {
        const name = await reverseGeocodeForReport(location.latitude, location.longitude);
        const r = await fetchForecastRecord({ latitude:location.latitude, longitude:location.longitude, name });
        setRecord(r);
      } catch { /* silent */ } finally { setLoading(false); }
    })();
  }, [location, record]);

  const search = async (override?: string) => {
    const city = (override ?? cityInput).trim();
    if (!city) { setBanner({tone:'error', text:'Enter a city.'}); return; }
    if (!online) {
      if (record) setBanner({tone:'info', text:'Offline — cached forecast.'});
      else setBanner({tone:'error', text:'Offline and no cached forecast.'});
      return;
    }
    setLoading(true); setBanner(null);
    try {
      const place = await geocodeCity(city);
      const r = await fetchForecastRecord(place);
      setRecord(r);
    } catch (e: any) {
      if (record) setBanner({tone:'info', text:`${e.message} Cached.`});
      else setBanner({tone:'error', text:e.message});
    } finally { setLoading(false); }
  };

  return (
    <div style={S.scrollWrap}>
      <div style={S.container}>
        <header>
          <h2 style={{ margin:0, fontSize:'1.2rem', fontWeight:700, color:'var(--text-primary)' }}>Weather report</h2>
          <p style={{ margin:'4px 0 0', fontSize:'0.82rem', color:'var(--text-muted)' }}>Search any city. Ask <strong style={{ color:'var(--accent-cyan)' }}>AI Chat</strong> for natural language queries.</p>
        </header>
        <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ padding:'4px 10px', borderRadius:'12px', fontSize:'10px', fontWeight:600, border:'1px solid var(--glass-border)', color: online?'var(--accent-cyan)':'#f87171' }}>{online?'🟢 Online':'🔴 Offline'}</span>
          <input style={{...S.input, flex:1}} type="text" value={cityInput} onChange={e=>setCityInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder="City e.g. Delhi" />
          <button onClick={()=>search()} disabled={loading} style={S.btn}>{loading?'…':'Search'}</button>
        </div>
        {banner && <div style={banner.tone==='error'?S.error:S.successBanner}>{banner.text}</div>}
        {!record && !loading && <div style={S.card}><p style={{margin:0, color:'var(--text-muted)', fontSize:'0.85rem'}}>Search a city to load forecast.</p></div>}
        {record && (
          <>
            <div style={S.card}>
              <div className="mob-report-current">
                <div>
                  <h3 style={{ margin:0, fontSize:'1rem', fontWeight:700, color:'var(--text-primary)' }}>{record.location.name}{record.location.country?`, ${record.location.country}`:''}</h3>
                  <p style={{ margin:0, fontSize:'10px', color:'var(--text-muted)' }}>Updated: {new Date(record.savedAt).toLocaleString()}</p>
                </div>
                <div className="mob-report-temp">{Math.round(record.hourly24h.temperature[0])}°C</div>
              </div>
              <div className="mob-report-meta">
                <span>{wmoDesc(record.hourly24h.weatherCode[0])}</span>
                <span>💧 {record.hourly24h.humidity[0]}%</span>
                <span>💨 {record.hourly24h.wind[0]} km/h</span>
              </div>
            </div>
            <div style={S.card}>
              <h3 style={S.cardTitle}>24-hour forecast</h3>
              <div className="mob-report-hourly">
                {record.hourly24h.time.map((t,i)=>(
                  <div key={t} className="mob-hour-card">
                    <div className="time">{new Date(t).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}</div>
                    <div className="temp">{Math.round(record.hourly24h.temperature[i])}°C</div>
                    <div className="desc">{wmoDesc(record.hourly24h.weatherCode[i])}</div>
                    <div className="meta">💧 {record.hourly24h.humidity[i]}%</div>
                    <div className="meta">🌧️ {record.hourly24h.precipitationProbability[i]}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={S.card}>
              <h3 style={S.cardTitle}>7-day forecast</h3>
              <div className="mob-report-daily">
                {record.daily7days.time.map((t,i)=>(
                  <div key={t} className="mob-day-card">
                    <strong>{new Date(t).toLocaleDateString([],{weekday:'short'})}</strong>
                    <span>{wmoDesc(record.daily7days.weatherCode[i])}</span>
                    <span>🌡️ {Math.round(record.daily7days.maxTemperature[i])}° / {Math.round(record.daily7days.minTemperature[i])}°</span>
                    <span style={{color:'var(--text-muted)'}}>🌧️ {record.daily7days.precipitationProbability[i]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// ─── Root App Component ───
export default function MobileWeatherGPT() {
  // ── Navigation ──
  const [activeNav, setActiveNav] = useState<NavPage>('aichat');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Location state ──
  const [gpsLocation, setGpsLocation] = useState<Coordinates|null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('pending');
  const [currentCity, setCurrentCity] = useState('Delhi');

  // ── AI Chat data (Java backend) ──
  const [chatMessages, setChatMessages] = useState<{id:string;role:'user'|'bot';content:string;voiceAnswer?:string}[]>([{
    id:'1', role:'bot', content:"👋 Hello! I'm **WeatherGPT**, your AI meteorological assistant aligned with MoES / IMD.\n\nAsk me about live forecasts, crop advisories, NWP models or climate trends!",
  }]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [selectedLang] = useState('en');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // ── Screen data state ──
  const [forecastList, setForecastList] = useState<any[]>([]);
  const [nwpComparison, setNwpComparison] = useState<any>(null);
  const [sectorAdvisory, setSectorAdvisory] = useState<any>(null);
  const [activeSector, setActiveSector] = useState<'agriculture'|'aviation'|'marine'|'urban'>('agriculture');
  const [alertsList, setAlertsList] = useState<any[]>([]);
  const [climateInfo, setClimateInfo] = useState<any>(null);
  const [sectorLoading, setSectorLoading] = useState(false);

  // ── Voice ──
  const { status:sttStatus, isSupported:sttSupported, startListening, stopListening } = useVoiceInput({
    lang: 'en-IN',
    onTranscript: (text) => { if (text) setChatInput(text); },
    onError: (err) => console.error('Voice error:', err),
  });
  const { speak, stop:stopSpeech } = useVoiceOutput();

  // Chat messages end ref
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // GPS location request
  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) { setLocationStatus('unsupported'); return; }
    setLocationStatus('pending');
    navigator.geolocation.getCurrentPosition(
      p => { setGpsLocation({ latitude:p.coords.latitude, longitude:p.coords.longitude, accuracy:p.coords.accuracy }); setLocationStatus('granted'); },
      () => { setGpsLocation(null); setLocationStatus('denied'); },
      { enableHighAccuracy:false, timeout:8000, maximumAge:300000 }
    );
  }, []);

  useEffect(() => { requestLocation(); }, [requestLocation]);

  // Fetch all Java-backend data on city/sector change
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        await fetchWeather(currentCity, ctrl.signal);
        await fetchNwp(currentCity, ctrl.signal);
        await fetchSector(currentCity, activeSector, ctrl.signal);
        await fetchAlerts(currentCity, ctrl.signal);
        await fetchClimate(currentCity, ctrl.signal);
      } catch (e) { if (!(e instanceof Error && e.name==='AbortError')) console.warn('Initial load error:', e); }
    })();
    return () => ctrl.abort();
  }, [currentCity, activeSector]);

  const fetchWeather = async (city: string, signal?: AbortSignal) => {
    try {
      const f = await fetch(WEATHER_ENDPOINTS.FORECAST(city,7), {signal}); const fd = await f.json();
      if (fd.success && fd.data?.days) setForecastList(fd.data.days);
    } catch (e) { if (!(e instanceof Error && e.name==='AbortError')) console.warn('Weather error:', e); }
  };
  const fetchNwp = async (city: string, signal?: AbortSignal) => {
    try { const r=await fetch(WEATHER_ENDPOINTS.NWP(city),{signal}); const d=await r.json(); if(d.success&&d.data) setNwpComparison(d.data); }
    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('NWP error:',e); }
  };
  const fetchSector = async (city: string, sector: string, signal?: AbortSignal) => {
    setSectorLoading(true);
    try { const r=await fetch(ADVISORIES_ENDPOINT(city,sector),{signal}); const d=await r.json(); if(d.success&&d.data) setSectorAdvisory(d.data); }
    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Sector error:',e); }
    finally { setSectorLoading(false); }
  };
  const fetchAlerts = async (city: string, signal?: AbortSignal) => {
    try { const r=await fetch(ALERTS_ENDPOINT(city),{signal}); const d=await r.json(); if(d.success&&d.data?.alerts) setAlertsList(d.data.alerts); }
    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Alerts error:',e); }
  };
  const fetchClimate = async (city: string, signal?: AbortSignal) => {
    try { const r = await fetch(CLIMATE_ENDPOINT(city),{signal}); const d = await r.json(); if(d.success&&d.data) setClimateInfo(d.data); }
    catch(e){ if(!(e instanceof Error&&e.name==='AbortError')) console.warn('Climate error:',e); }
  };

  // Send chat message
  const handleSendChat = useCallback(async (customMsg?: string) => {
    const text = (customMsg ?? chatInput).trim();
    if (!text || isChatLoading) return;
    if (!customMsg) setChatInput('');
    setIsChatLoading(true);
    const userMsg = { id:Date.now().toString(), role:'user' as const, content:text };
    setChatMessages(p => [...p, userMsg]);
    try {
      const res = await fetch(CHAT_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ message:text, language:selectedLang, sector:activeSector, sessionId:'mobile-session-01' }) });
      const d = await res.json();
      if (d.success && d.data) {
        const bot = { id:(Date.now()+1).toString(), role:'bot' as const, content:d.data.answer||'Query processed.', voiceAnswer:d.data.voiceAnswer||d.data.answer };
        setChatMessages(p => [...p, bot]);
        if (d.data.location?.name) setCurrentCity(d.data.location.name);
        if (voiceEnabled && d.data.voiceAnswer) speak(d.data.voiceAnswer, 'en-IN');
      } else {
        setChatMessages(p => [...p, { id:(Date.now()+1).toString(), role:'bot', content:d.message||'Could not process query.' }]);
      }
    } catch {
      setChatMessages(p => [...p, { id:(Date.now()+1).toString(), role:'bot', content:'⚠️ Unable to connect to backend.' }]);
    } finally { setIsChatLoading(false); }
  }, [chatInput, isChatLoading, selectedLang, activeSector, voiceEnabled]);

  // Toggle voice
  const toggleVoice = useCallback(() => {
    if (sttStatus==='listening') { stopListening(); setVoiceEnabled(false); }
    else { stopSpeech(); startListening(); setVoiceEnabled(true); }
  }, [sttStatus, startListening, stopListening, stopSpeech]);

  // Scroll chat on new messages
  useEffect(() => {
    if (chatMessages.length > 1 || isChatLoading) chatEndRef.current?.scrollIntoView({behavior:'smooth'});
  }, [chatMessages, isChatLoading]);

  // ─── Navigation helpers ───
  const navigate = (page: NavPage) => {
    setActiveNav(page);
    setDrawerOpen(false);
  };

  // ─── AI Chat input bar (always visible for chat-first UX) ───
  const renderBottomBar = () => {
    if (activeNav === 'aichat') {
      return (
        <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'6px 10px 10px', background:'rgba(11,19,34,0.95)', borderTop:'1px solid var(--glass-border)', flexShrink:0 }}>
          <input
            ref={chatInputRef} type="text" placeholder="Ask WeatherGPT AI…" value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSendChat();} }}
            style={{ flex:1, padding:'9px 14px', borderRadius:'20px', border:'1px solid var(--glass-border)', background:'rgba(30,41,59,0.7)', color:'#e8f4fc', fontSize:'13px', outline:'none' }}
          />
          {sttSupported && (
            <button onClick={toggleVoice} style={{ width:'34px', height:'34px', borderRadius:'50%', border:'1px solid var(--glass-border)', background: voiceEnabled?'var(--accent-cyan-dim)':'transparent', color:'var(--accent-cyan)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Mic size={14} />
            </button>
          )}
          <button onClick={() => handleSendChat()} disabled={!chatInput.trim()||isChatLoading} style={{ width:'34px', height:'34px', borderRadius:'50%', border:'none', background:!chatInput.trim()||isChatLoading?'var(--glass-bg-strong)':'linear-gradient(120deg,var(--accent-cyan) 0%,var(--accent-blue) 100%)', color:!chatInput.trim()||isChatLoading?'var(--text-muted)':'#050b12', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Send size={14} />
          </button>
        </div>
      );
    }
    // On other tabs, show chat-first input bar
    return (
      <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'6px 10px 10px', background:'rgba(11,19,34,0.95)', borderTop:'1px solid var(--glass-border)', flexShrink:0 }}>
        <input
          ref={chatInputRef} type="text" placeholder="Ask AI Chat anything…" value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSendChat();} }}
          style={{ flex:1, padding:'9px 14px', borderRadius:'20px', border:'1px solid var(--glass-border)', background:'rgba(30,41,59,0.7)', color:'#e8f4fc', fontSize:'13px', outline:'none' }}
        />
        <button onClick={() => navigate('aichat')} style={{ padding:'8px 12px', borderRadius:'16px', background:'var(--accent-cyan-dim)', border:'1px solid var(--accent-cyan)', color:'var(--accent-cyan)', fontSize:'11px', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>
          AI Chat
        </button>
        <button onClick={() => handleSendChat()} disabled={!chatInput.trim()||isChatLoading} style={{ width:'34px', height:'34px', borderRadius:'50%', border:'none', background:!chatInput.trim()||isChatLoading?'var(--glass-bg-strong)':'linear-gradient(120deg,var(--accent-cyan) 0%,var(--accent-blue) 100%)', color:!chatInput.trim()||isChatLoading?'var(--text-muted)':'#050b12', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Send size={14} />
        </button>
      </div>
    );
  };

  // ─── Tab bar ───
  const renderTabs = () => (
    <nav className="mob-tabs">
      {TAB_ITEMS.map(t => (
        <button key={t.id} className={`mob-tab ${activeNav===t.id?'active':''}`} onClick={() => navigate(t.id)}>
          {t.emoji} {t.label}
          {t.id==='alerts' && alertsList.length > 0 && (
            <span className="tab-badge mob-badge" style={{ marginLeft:'3px' }}>{alertsList.length}</span>
          )}
        </button>
      ))}
    </nav>
  );

  // ─── Header ───
  const renderHeader = () => (
    <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 12px', height:'52px', background:'rgba(11,19,34,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border-card)', flexShrink:0, zIndex:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <button onClick={() => setDrawerOpen(true)} style={{ background:'transparent', border:'none', color:'var(--accent-cyan)', cursor:'pointer', display:'flex', padding:'4px' }} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <Cloud size={22} style={{ color:'var(--accent-cyan)' }} />
          <span style={{ fontSize:'14px', fontWeight:700, color:'var(--m-text)' }}>WeatherGPT</span>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
        <button onClick={requestLocation} style={{ fontSize:'10px', padding:'3px 8px', borderRadius:'10px', border:'1px solid var(--accent-cyan)', background:'var(--accent-cyan-dim)', color:'var(--accent-cyan)', cursor:'pointer', display:'flex', alignItems:'center', gap:'3px' }}>
          <MapPin size={12} />
          {gpsLocation ? `${gpsLocation.latitude.toFixed(2)},${gpsLocation.longitude.toFixed(2)}` : locationStatus==='denied'?'Blocked':'📍 Set'}
        </button>
      </div>
    </header>
  );

  // ─── Drawer ───
  const renderDrawer = () => {
    const drawerItems: { id: NavPage; label: string; emoji: string }[] = [
      { id:'nwp', label:'NWP Models', emoji:'🛰️' },
      { id:'sectors', label:'Sectors', emoji:'🌾' },
      { id:'alerts', label:'Alerts', emoji:'🚨' },
      { id:'climate', label:'Climate', emoji:'📈' },
      { id:'report', label:'Weather Report', emoji:'📋' },
    ];
    return (
      <>
        {drawerOpen && <div className="mob-drawer-overlay" onClick={() => setDrawerOpen(false)} />}
        {drawerOpen && (
          <div className="mob-drawer">
            <button className="mob-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><X size={22} /></button>
            <h3>More Sections</h3>
            {drawerItems.map(item => (
              <button key={item.id} className={`mob-drawer-item ${activeNav===item.id?'active':''}`} onClick={() => navigate(item.id)}>
                <span>{item.emoji}</span> {item.label}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  // ─── Fullscreen pages (AI / Maps) ───
  const FULLSCREEN_PAGES: NavPage[] = ['aichat','route','map','radar'];
  const isFullscreen = FULLSCREEN_PAGES.includes(activeNav);

  // ─── Mobile chat toggle (quick access to AI Chat from anywhere) ───
  const renderFloatChat = () => {
    if (activeNav === 'aichat') return null;
    return (
      <button className="mob-float-chat" onClick={() => navigate('aichat')} aria-label="Open AI Chat" title="Ask AI Chat">
        <Sparkles size={22} />
      </button>
    );
  };

  // ─── Tab content ───
  const renderContent = () => {
    if (isFullscreen) {
      return (
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minHeight:0 }}>
          {activeNav==='aichat' && <AIChatView location={gpsLocation} />}
          {activeNav==='route' && <RouteWeatherView />}
          {activeNav==='map' && <MobileMapView location={gpsLocation} />}
          {activeNav==='radar' && <MobileRadarView location={gpsLocation} />}
        </div>
      );
    }
    return (
      <div className="mob-content">
        {activeNav==='forecast' && <ForecastView forecastList={forecastList} />}
        {activeNav==='nwp' && <NWPView nwpComparison={nwpComparison} />}
        {activeNav==='sectors' && <SectorsView sectorAdvisory={sectorAdvisory} activeSector={activeSector} setActiveSector={setActiveSector} sectorLoading={sectorLoading} />}
        {activeNav==='alerts' && <AlertsView alertsList={alertsList} currentCity={currentCity} />}
        {activeNav==='climate' && <ClimateView climateInfo={climateInfo} currentCity={currentCity} />}
        {activeNav==='report' && <WeatherReportView location={gpsLocation} />}
        {activeNav==='aichat' && <div className="mob-loading">AI Chat is the default screen — select another tab or use the drawer.</div>}
      </div>
    );
  };

  return (
    <div className="mob-wrap">
      {renderHeader()}
      {renderTabs()}
      {renderContent()}
      {renderBottomBar()}
      {renderFloatChat()}
      {renderDrawer()}
    </div>
  );
}
```

## File: frontend2/src/App.tsx
```text
import ChatScreen from "./pages/ChatScreen";

function App() {
  return <ChatScreen />;
}

export default App;```

## File: frontend2/src/pages/ChatScreen.tsx
```text
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./GeminiChat.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RiskSummary {
  HIGH?: number;
  MODERATE?: number;
  LOW?: number;
}

interface WeatherPoint {
  location?: string;
  point?: string;
  weather?: string;
  condition?: string;
  temp?: number | string;
  temperature?: number | string;
  risk?: string;
  risk_level?: string;
  description?: string;
  notes?: string;
  [key: string]: any;
}

interface RouteApiResponse {
  message?: string;
  route_info?: any;
  risk_summary?: RiskSummary;
  weather_data?: WeatherPoint[] | any;
  map_json?: any;
  index_html?: string;
}

const API_URL = import.meta.env.VITE_API_BASE_URL;

/* ----------------------------------------------------
   ICONS — a small consistent glyph set (no emoji)
---------------------------------------------------- */
const IconCloudSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17h9.5a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6-1.6A4 4 0 0 0 7 17z" />
    <path d="M4 20h1M6.5 20h1M9 20h1" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const IconRoute = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h7a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h7" />
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <rect x="7" y="11" width="3" height="8" />
    <rect x="12.5" y="7" width="3" height="12" />
    <rect x="18" y="13" width="3" height="6" />
  </svg>
);

const IconRadar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path d="M12 12L18 6" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.3l.06.06A1.65 1.65 0 0 0 8.92 4.7H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.3 9v.08c.16.43.5.78.99.92H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconRain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 13a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.6 1.7A3.5 3.5 0 0 0 6.5 13H16z" />
    <path d="M8 17l-1 2M12 17l-1 2M16 17l-1 2" />
  </svg>
);



const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconChevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "left" ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
  </svg>
);

const NAV_ITEMS = [
  { id: "chat", label: "Assistant chat", icon: <IconChat /> },
  { id: "route", label: "Route weather", icon: <IconRoute />, badge: "New" },
  { id: "report", label: "Weather report", icon: <IconChart /> },
  { id: "map", label: "Weather map", icon: <IconPin /> },
  { id: "radar", label: "Interactive radar", icon: <IconRadar /> },
  { id: "settings", label: "Settings", icon: <IconSettings /> },
];

const suggestions = [
  { icon: <IconCloudSun />, title: "Today's weather", text: "What's the current weather forecast for my location?" },
  { icon: <IconRain />, title: "Rain forecast", text: "Will it rain in the next 24 hours?" },

];

/* ----------------------------------------------------
   SUB-COMPONENT: Route Weather Details View
---------------------------------------------------- */
function RouteWeatherView() {
  const [formData, setFormData] = useState({
    origin: "Delhi",
    destination: "Agra",
    departure_time: "08:00",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RouteApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${API_URL}/route-weather`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} - ${res.statusText}`);

      const data: RouteApiResponse = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather route analysis.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeStyle = (risk?: string) => {
    const r = String(risk || "").toUpperCase();
    switch (r) {
      case "HIGH":
        return { backgroundColor: "rgba(229, 101, 74, 0.16)", color: "#f0a08c", borderColor: "rgba(229, 101, 74, 0.35)" };
      case "MODERATE":
        return { backgroundColor: "rgba(224, 166, 63, 0.16)", color: "#f0cf8f", borderColor: "rgba(224, 166, 63, 0.35)" };
      case "LOW":
        return { backgroundColor: "rgba(70, 201, 166, 0.16)", color: "#8fe0cb", borderColor: "rgba(70, 201, 166, 0.35)" };
      default:
        return { backgroundColor: "rgba(154, 164, 182, 0.16)", color: "#c3cad6", borderColor: "rgba(154, 164, 182, 0.35)" };
    }
  };

  return (
    <div style={routeStyles.scrollWrapper}>
      <div style={routeStyles.container}>
        <header style={routeStyles.header}>
          <h2 style={routeStyles.headerTitle}>Route weather analyzer</h2>
          <p style={routeStyles.headerSubtitle}>Check conditions and risk along a journey, point by point.</p>
        </header>

        <form onSubmit={handleSubmit} style={routeStyles.form}>
          <div style={routeStyles.formGrid}>
            <div style={routeStyles.inputGroup}>
              <label style={routeStyles.label}>Origin</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                style={routeStyles.input}
                placeholder="e.g. Delhi"
              />
            </div>

            <div style={routeStyles.inputGroup}>
              <label style={routeStyles.label}>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                style={routeStyles.input}
                placeholder="e.g. Agra"
              />
            </div>

            <div style={routeStyles.inputGroup}>
              <label style={routeStyles.label}>Departure time</label>
              <input
                type="time"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                required
                style={routeStyles.input}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={routeStyles.button}>
            {loading ? "Analyzing route…" : "Analyze route"}
          </button>
        </form>

        {error && <div style={routeStyles.error}>{error}</div>}

        {response && (
          <div style={routeStyles.resultsContainer}>
            {response.message && (
              <div style={routeStyles.successBanner}>{response.message}</div>
            )}

            {response.risk_summary && (
              <div style={routeStyles.card}>
                <h3 style={routeStyles.cardTitle}>Risk summary</h3>
                <div style={routeStyles.riskGrid}>
                  <div style={{ ...routeStyles.riskMetricCard, borderColor: "rgba(229, 101, 74, 0.3)" }}>
                    <span style={{ ...routeStyles.riskCount, color: "#f0a08c" }}>{response.risk_summary.HIGH ?? 0}</span>
                    <span style={routeStyles.riskLabel}>High-risk waypoints</span>
                  </div>
                  <div style={{ ...routeStyles.riskMetricCard, borderColor: "rgba(224, 166, 63, 0.3)" }}>
                    <span style={{ ...routeStyles.riskCount, color: "#f0cf8f" }}>{response.risk_summary.MODERATE ?? 0}</span>
                    <span style={routeStyles.riskLabel}>Moderate-risk waypoints</span>
                  </div>
                  <div style={{ ...routeStyles.riskMetricCard, borderColor: "rgba(70, 201, 166, 0.3)" }}>
                    <span style={{ ...routeStyles.riskCount, color: "#8fe0cb" }}>{response.risk_summary.LOW ?? 0}</span>
                    <span style={routeStyles.riskLabel}>Low-risk waypoints</span>
                  </div>
                </div>
              </div>
            )}

            {response.weather_data && (
              <div style={routeStyles.card}>
                <h3 style={routeStyles.cardTitle}>Waypoint forecasts</h3>
                {Array.isArray(response.weather_data) ? (
                  <div style={routeStyles.tableWrapper}>
                    <table style={routeStyles.table}>
                      <thead>
                        <tr>
                          <th style={routeStyles.th}>#</th>
                          <th style={routeStyles.th}>Point</th>
                          <th style={routeStyles.th}>Condition</th>
                          <th style={routeStyles.th}>Temp</th>
                          <th style={routeStyles.th}>Risk</th>
                          <th style={routeStyles.th}>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {response.weather_data.map((item: WeatherPoint, index: number) => {
                          const pointName = item.location || item.point || item.name || `Point ${index + 1}`;
                          const condition = item.weather || item.condition || item.sky || "—";
                          const tempVal = item.temp ?? item.temperature;
                          const tempDisplay = tempVal !== undefined ? `${tempVal}°C` : "—";
                          const riskVal = item.risk || item.risk_level || "NORMAL";
                          const desc = item.description || item.notes || item.summary || (
                            typeof item === "object" ? Object.entries(item)
                              .filter(([k]) => !["location", "point", "weather", "condition", "temp", "temperature", "risk", "risk_level"].includes(k))
                              .map(([k, v]) => `${k}: ${v}`).join(", ") : String(item)
                          );

                          return (
                            <tr key={index} style={routeStyles.tr}>
                              <td style={routeStyles.tdIndex}>{index + 1}</td>
                              <td style={routeStyles.tdBold}>{pointName}</td>
                              <td style={routeStyles.td}>{condition}</td>
                              <td style={routeStyles.td}>{tempDisplay}</td>
                              <td style={routeStyles.td}>
                                <span style={{ ...routeStyles.badge, ...getRiskBadgeStyle(riskVal) }}>
                                  {riskVal.toUpperCase()}
                                </span>
                              </td>
                              <td style={routeStyles.tdDesc}>{desc || "—"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <pre style={routeStyles.jsonBlock}>{JSON.stringify(response.weather_data, null, 2)}</pre>
                )}
              </div>
            )}

            {response.index_html && (
              <div style={routeStyles.card}>
                <h3 style={routeStyles.cardTitle}>Route map</h3>
                <div style={routeStyles.mapWrapper}>
                  <iframe title="Route map preview" srcDoc={response.index_html} style={routeStyles.iframe} />
                </div>
              </div>
            )}

            {response.route_info && (
              <div style={routeStyles.card}>
                <h3 style={routeStyles.cardTitle}>Route parameters</h3>
                <pre style={routeStyles.jsonBlock}>
                  {typeof response.route_info === "object" ? JSON.stringify(response.route_info, null, 2) : response.route_info}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const routeStyles: { [key: string]: React.CSSProperties } = {
  scrollWrapper: { width: "100%", height: "100%", minWidth: 0, overflowY: "auto", overflowX: "hidden", padding: "20px 16px", boxSizing: "border-box" },
  container: { width: "100%", maxWidth: "1400px", minWidth: 0, margin: "0 auto", display: "flex", flexDirection: "column", gap: "18px", boxSizing: "border-box" },
  header: { textAlign: "left" },
  headerTitle: { margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.02em", color: "#edf0f5" },
  headerSubtitle: { margin: "4px 0 0 0", fontSize: "0.85rem", color: "#9aa4b6" },
  form: { display: "flex", flexDirection: "column", gap: "14px", backgroundColor: "#10151d", padding: "18px", borderRadius: "12px", border: "1px solid rgba(237,240,245,0.07)", minWidth: 0, boxSizing: "border-box" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", minWidth: 0 },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 },
  label: { fontSize: "0.75rem", fontWeight: 600, color: "#9aa4b6" },
  input: { padding: "10px 13px", borderRadius: "8px", border: "1px solid rgba(237,240,245,0.14)", backgroundColor: "#0a0e15", color: "#edf0f5", fontSize: "0.9rem", outline: "none", width: "100%", minWidth: 0, boxSizing: "border-box" },
  button: { padding: "12px 24px", background: "linear-gradient(120deg, #f0a83c 0%, #d9633b 100%)", color: "#14100a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.92rem", width: "100%" },
  error: { padding: "12px 16px", backgroundColor: "rgba(229, 101, 74, 0.12)", border: "1px solid rgba(229, 101, 74, 0.3)", color: "#f0a08c", borderRadius: "8px", fontSize: "0.875rem" },
  resultsContainer: { display: "flex", flexDirection: "column", gap: "18px" },
  successBanner: { backgroundColor: "rgba(70, 201, 166, 0.1)", border: "1px solid rgba(70, 201, 166, 0.25)", color: "#8fe0cb", padding: "11px 15px", borderRadius: "8px", fontWeight: 500, fontSize: "0.88rem" },
  card: { backgroundColor: "#10151d", padding: "18px", borderRadius: "12px", border: "1px solid rgba(237,240,245,0.07)" },
  cardTitle: { margin: "0 0 14px 0", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.02rem", fontWeight: 600, color: "#edf0f5" },
  riskGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" },
  riskMetricCard: { display: "flex", flexDirection: "column", alignItems: "center", padding: "14px", borderRadius: "8px", backgroundColor: "#0a0e15", border: "1px solid transparent" },
  riskCount: { fontSize: "1.6rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" },
  riskLabel: { fontSize: "0.7rem", color: "#9aa4b6", marginTop: "4px" },
  badge: { display: "inline-block", padding: "3px 9px", borderRadius: "12px", fontWeight: 600, fontSize: "0.7rem", border: "1px solid transparent" },
  tableWrapper: { width: "100%", overflowX: "auto", borderRadius: "8px", border: "1px solid rgba(237,240,245,0.07)" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" },
  th: { borderBottom: "1px solid rgba(237,240,245,0.1)", padding: "10px 13px", backgroundColor: "rgba(237,240,245,0.02)", fontWeight: 600, color: "#9aa4b6", whiteSpace: "nowrap" },
  tr: { borderBottom: "1px solid rgba(237,240,245,0.05)" },
  tdIndex: { padding: "10px 13px", color: "#5f6a7d", width: "36px" },
  tdBold: { padding: "10px 13px", fontWeight: 600, whiteSpace: "nowrap", color: "#edf0f5" },
  td: { padding: "10px 13px", whiteSpace: "nowrap", color: "#c3cad6" },
  tdDesc: { padding: "10px 13px", color: "#9aa4b6", minWidth: "180px", wordBreak: "break-word" },
  jsonBlock: { backgroundColor: "#0a0e15", padding: "13px", borderRadius: "8px", overflowX: "auto", fontSize: "0.78rem", color: "#8fe0cb", margin: 0, border: "1px solid rgba(237,240,245,0.05)" },
  mapWrapper: { width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(237,240,245,0.1)", backgroundColor: "#fff" },
  iframe: { width: "100%", height: "380px", border: "none", display: "block" },
};

/* ----------------------------------------------------
   SUB-COMPONENT: Weather Report (offline-capable)
   Adapted from the standalone WeatherGPT offline-mode app —
   same Open-Meteo data source and localStorage caching,
   rebuilt as React state instead of direct DOM manipulation.
---------------------------------------------------- */
// Per-location cache keys: a forecast saved for Delhi must never be served
// for Ghaziabad (global location architecture, §22). A pointer keeps the
// "last saved forecast" offline fallback working across locations.
const LAST_CACHE_KEY = "weatherGPT_offline_forecast_last";
const reportCacheKey = (lat: number, lon: number) =>
  `weatherGPT_offline_forecast_${lat.toFixed(2)}_${lon.toFixed(2)}`;

const WEATHER_CODE_DESCRIPTIONS: Record<number, string> = {
  0: "☀️ Clear",
  1: "🌤️ Mainly clear",
  2: "⛅ Partly cloudy",
  3: "☁️ Cloudy",
  45: "🌫️ Fog",
  48: "🌫️ Fog",
  51: "🌦️ Light drizzle",
  53: "🌦️ Drizzle",
  55: "🌧️ Heavy drizzle",
  61: "🌦️ Light rain",
  63: "🌧️ Rain",
  65: "🌧️ Heavy rain",
  71: "🌨️ Light snow",
  73: "❄️ Snow",
  75: "❄️ Heavy snow",
  80: "🌦️ Rain showers",
  81: "🌧️ Rain showers",
  82: "🌧️ Heavy showers",
  95: "⛈️ Thunderstorm",
  96: "⛈️ Thunderstorm + hail",
  99: "⛈️ Thunderstorm + hail",
};

const getWeatherCodeDescription = (code: number) => WEATHER_CODE_DESCRIPTIONS[code] || "🌤️ Unknown";

interface GeoResult {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
}

interface HourlyBlock {
  time: string[];
  temperature: number[];
  humidity: number[];
  precipitationProbability: number[];
  weatherCode: number[];
  wind: number[];
}

interface DailyBlock {
  time: string[];
  weatherCode: number[];
  maxTemperature: number[];
  minTemperature: number[];
  precipitationProbability: number[];
  maxWind: number[];
}

interface ForecastRecord {
  location: GeoResult;
  savedAt: string;
  hourly24h: HourlyBlock;
  daily7days: DailyBlock;
}

async function geocodeCity(city: string): Promise<GeoResult> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Unable to look up that location.");
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error("Location not found.");
  const r = data.results[0];
  return { latitude: r.latitude, longitude: r.longitude, name: r.name, country: r.country };
}

async function reverseGeocodeForReport(latitude: number, longitude: number): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&zoom=10`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("reverse lookup failed");
    const data = await res.json();
    const addr = data.address || {};
    return addr.city || addr.town || addr.village || addr.county || data.display_name || "Current location";
  } catch {
    return "Current location";
  }
}

async function fetchForecastRecord(place: GeoResult): Promise<ForecastRecord> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
    `&forecast_days=7&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather request failed.");
  const data = await res.json();

  return {
    location: place,
    savedAt: new Date().toISOString(),
    hourly24h: {
      time: data.hourly.time.slice(0, 24),
      temperature: data.hourly.temperature_2m.slice(0, 24),
      humidity: data.hourly.relative_humidity_2m.slice(0, 24),
      precipitationProbability: data.hourly.precipitation_probability.slice(0, 24),
      weatherCode: data.hourly.weather_code.slice(0, 24),
      wind: data.hourly.wind_speed_10m.slice(0, 24),
    },
    daily7days: {
      time: data.daily.time.slice(0, 7),
      weatherCode: data.daily.weather_code.slice(0, 7),
      maxTemperature: data.daily.temperature_2m_max.slice(0, 7),
      minTemperature: data.daily.temperature_2m_min.slice(0, 7),
      precipitationProbability: data.daily.precipitation_probability_max.slice(0, 7),
      maxWind: data.daily.wind_speed_10m_max.slice(0, 7),
    },
  };
}

function loadPersistedForecast(lat?: number, lon?: number): ForecastRecord | null {
  try {
    const key = lat != null && lon != null ? reportCacheKey(lat, lon) : (localStorage.getItem(LAST_CACHE_KEY) ?? "");
    if (!key) return null;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function persistForecast(record: ForecastRecord, lat: number, lon: number) {
  try {
    const key = reportCacheKey(lat, lon);
    localStorage.setItem(key, JSON.stringify(record));
    localStorage.setItem(LAST_CACHE_KEY, key);
  } catch {
    // Storage full or unavailable — the report still works for this session.
  }
}

function WeatherReportView({ location }: { location: Coordinates | null }) {
  const [cityInput, setCityInput] = useState("");
  const [record, setRecord] = useState<ForecastRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{ tone: "error" | "info"; text: string } | null>(null);
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const autoLoadedRef = useRef(false);

  useEffect(() => {
    // This location's own cache first, else the most recently saved forecast.
    const saved = loadPersistedForecast(location?.latitude, location?.longitude);
    if (saved) setRecord(saved);

    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // If we already have the browser's geolocation and nothing saved yet, load it automatically.
  useEffect(() => {
    if (autoLoadedRef.current || record || !location) return;
    autoLoadedRef.current = true;

    (async () => {
      setLoading(true);
      try {
        const name = await reverseGeocodeForReport(location.latitude, location.longitude);
        const place: GeoResult = { latitude: location.latitude, longitude: location.longitude, name };
        const next = await fetchForecastRecord(place);
        persistForecast(next, location.latitude, location.longitude);
        setRecord(next);
      } catch {
        // Silent — the user can still search manually.
      } finally {
        setLoading(false);
      }
    })();
  }, [location, record]);

  const runSearch = async (cityOverride?: string) => {
    const city = (cityOverride ?? cityInput).trim();
    if (!city) {
      setBanner({ tone: "error", text: "Enter a city to look up." });
      return;
    }

    if (!online) {
      const saved = loadPersistedForecast();
      if (saved) {
        setRecord(saved);
        setBanner({ tone: "info", text: "You're offline — showing the last saved forecast." });
      } else {
        setBanner({ tone: "error", text: "You're offline and no forecast has been saved yet." });
      }
      return;
    }

    setLoading(true);
    setBanner(null);
    try {
      const place = await geocodeCity(city);
      const next = await fetchForecastRecord(place);
      persistForecast(next, place.latitude, place.longitude);
      setRecord(next);
    } catch (err: any) {
      const saved = loadPersistedForecast();
      if (saved) {
        setRecord(saved);
        setBanner({ tone: "info", text: `${err.message || "Couldn't refresh."} Showing the last saved forecast.` });
      } else {
        setBanner({ tone: "error", text: err.message || "Unable to get weather data." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={routeStyles.scrollWrapper}>
      <div style={routeStyles.container}>
        <header style={routeStyles.header}>
          <h2 style={routeStyles.headerTitle}>Weather report</h2>
          <p style={routeStyles.headerSubtitle}>
            Search any city, or use your current location. The latest forecast is cached on this device for offline viewing.
          </p>
        </header>

        <div style={reportStyles.searchRow}>
          <span className={`location-indicator ${online ? "granted" : "denied"}`} style={reportStyles.statusPill} title={online ? "Online" : "Offline — showing cached data"}>
            {online ? "🟢 Online" : "🔴 Offline"}
          </span>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Enter city e.g. Delhi"
            style={{ ...routeStyles.input, flex: 1 }}
          />
          <button onClick={() => runSearch()} disabled={loading} style={reportStyles.searchButton}>
            {loading ? "Loading…" : "Get weather"}
          </button>
        </div>

        {banner && (
          <div style={banner.tone === "error" ? routeStyles.error : routeStyles.successBanner}>{banner.text}</div>
        )}

        {!record && !loading && (
          <div style={routeStyles.card}>
            <p style={{ margin: 0, color: "#9aa4b6", fontSize: "0.88rem" }}>
              Search for a location to load the forecast.
            </p>
          </div>
        )}

        {record && (
          <>
            <div style={routeStyles.card}>
              <div style={reportStyles.currentRow}>
                <div>
                  <h3 style={{ ...routeStyles.cardTitle, marginBottom: "2px" }}>
                    {record.location.name}{record.location.country ? `, ${record.location.country}` : ""}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#5f6a7d" }}>
                    Last updated: {new Date(record.savedAt).toLocaleString()}
                  </p>
                </div>
                <div style={reportStyles.bigTemp}>{Math.round(record.hourly24h.temperature[0])}°C</div>
              </div>
              <div style={reportStyles.currentMeta}>
                <span>{getWeatherCodeDescription(record.hourly24h.weatherCode[0])}</span>
                <span>💧 Humidity: {record.hourly24h.humidity[0]}%</span>
                <span>💨 Wind: {record.hourly24h.wind[0]} km/h</span>
              </div>
            </div>

            <div style={routeStyles.card}>
              <h3 style={routeStyles.cardTitle}>24-hour forecast</h3>
              <div style={reportStyles.hourlyStrip}>
                {record.hourly24h.time.map((t, i) => (
                  <div key={t} style={reportStyles.hourCard}>
                    <div style={reportStyles.hourTime}>
                      {new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </div>
                    <div style={reportStyles.hourTemp}>{Math.round(record.hourly24h.temperature[i])}°C</div>
                    <div style={reportStyles.hourCondition}>{getWeatherCodeDescription(record.hourly24h.weatherCode[i])}</div>
                    <div style={reportStyles.hourMeta}>💧 {record.hourly24h.humidity[i]}%</div>
                    <div style={reportStyles.hourMeta}>🌧️ {record.hourly24h.precipitationProbability[i]}%</div>
                    <div style={reportStyles.hourMeta}>💨 {record.hourly24h.wind[i]} km/h</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={routeStyles.card}>
              <h3 style={routeStyles.cardTitle}>7-day forecast</h3>
              <div style={reportStyles.dailyGrid}>
                {record.daily7days.time.map((t, i) => (
                  <div key={t} style={reportStyles.dayCard}>
                    <strong style={{ color: "#edf0f5", fontSize: "0.82rem" }}>
                      {new Date(t).toLocaleDateString([], { weekday: "long" })}
                    </strong>
                    <span style={{ fontSize: "0.8rem" }}>{getWeatherCodeDescription(record.daily7days.weatherCode[i])}</span>
                    <span style={{ fontSize: "0.8rem", color: "#c3cad6" }}>
                      🌡️ {Math.round(record.daily7days.maxTemperature[i])}° / {Math.round(record.daily7days.minTemperature[i])}°
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#9aa4b6" }}>
                      🌧️ {record.daily7days.precipitationProbability[i]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p style={reportStyles.offlineNote}>
              📦 Stored {record.hourly24h.time.length} hourly and {record.daily7days.time.length} daily records on this
              device — this forecast stays available even without a connection.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const reportStyles: { [key: string]: React.CSSProperties } = {
  searchRow: { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" },
  statusPill: { padding: "6px 12px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 600, width: "auto", height: "auto", cursor: "default" },
  searchButton: { padding: "10px 20px", background: "linear-gradient(120deg, #f0a83c 0%, #d9633b 100%)", color: "#14100a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem", whiteSpace: "nowrap" },
  currentRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" },
  bigTemp: { fontSize: "2.2rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "#f0a83c" },
  currentMeta: { display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "12px", fontSize: "0.85rem", color: "#c3cad6" },
  hourlyStrip: { display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" },
  hourCard: { flex: "0 0 auto", minWidth: "108px", padding: "12px", borderRadius: "10px", backgroundColor: "#0a0e15", border: "1px solid rgba(237,240,245,0.07)", display: "flex", flexDirection: "column", gap: "4px" },
  hourTime: { fontSize: "0.78rem", color: "#9aa4b6", fontWeight: 600 },
  hourTemp: { fontSize: "1.1rem", fontWeight: 700, color: "#edf0f5" },
  hourCondition: { fontSize: "0.75rem", color: "#c3cad6" },
  hourMeta: { fontSize: "0.7rem", color: "#5f6a7d" },
  dailyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" },
  dayCard: { display: "flex", flexDirection: "column", gap: "4px", padding: "14px", borderRadius: "10px", backgroundColor: "#0a0e15", border: "1px solid rgba(237,240,245,0.07)" },
  offlineNote: { margin: 0, fontSize: "0.78rem", color: "#5f6a7d", textAlign: "center" },
};

/* ----------------------------------------------------
   SUB-COMPONENT: Weather Map (OpenStreetMap via Leaflet)
---------------------------------------------------- */
function WeatherMapView({ location }: { location: Coordinates | null }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [mapLayer, setMapLayer] = useState<'standard' | 'temperature' | 'precipitation' | 'wind'>('standard');

  const defaultLat = location?.latitude ?? 20.5937;
  const defaultLng = location?.longitude ?? 78.9629;

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      // Fix Leaflet default icon path issue in Vite
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapContainerRef.current!, {
        center: [defaultLat, defaultLng],
        zoom: 5,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      // Add OpenWeatherMap weather layer (free tier)
      // Temperature layer via Open-Meteo tile proxy
      const rainLayer = L.tileLayer(
        'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
        { opacity: 0.5, attribution: 'Weather &copy; OpenWeatherMap' }
      );

      (map as any)._weatherLayer = rainLayer;
      mapInstanceRef.current = map;

      if (location) {
        markerRef.current = L.marker([location.latitude, location.longitude])
          .addTo(map)
          .bindPopup(`📍 Your Location<br>Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`)
          .openPopup();
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker when location changes
  useEffect(() => {
    if (!mapInstanceRef.current || !location) return;
    import('leaflet').then((L) => {
      if (markerRef.current) {
        markerRef.current.setLatLng([location.latitude, location.longitude]);
      } else {
        markerRef.current = L.marker([location.latitude, location.longitude])
          .addTo(mapInstanceRef.current)
          .bindPopup(`📍 Your Location`)
          .openPopup();
      }
      mapInstanceRef.current.setView([location.latitude, location.longitude], 8);
    });
  }, [location]);

  const switchLayer = (type: 'standard' | 'temperature' | 'precipitation' | 'wind') => {
    setMapLayer(type);
    if (!mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      // Remove all tile layers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) map.removeLayer(layer);
      });
      // Re-add base OSM layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
      // Overlay weather layer from Open-Meteo tile service
      const overlays: Record<string, string> = {
        temperature: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo',
        precipitation: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
        wind: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=demo',
      };
      if (type !== 'standard' && overlays[type]) {
        L.tileLayer(overlays[type], { opacity: 0.55, attribution: 'Weather &copy; OpenWeatherMap' }).addTo(map);
      }
    });
  };

  const layerButtons: { id: 'standard' | 'temperature' | 'precipitation' | 'wind'; label: string; emoji: string }[] = [
    { id: 'standard', label: 'Standard', emoji: '🗺️' },
    { id: 'temperature', label: 'Temperature', emoji: '🌡️' },
    { id: 'precipitation', label: 'Rain', emoji: '🌧️' },
    { id: 'wind', label: 'Wind', emoji: '💨' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: 'var(--bg-deep)' }}>
      {/* Toolbar */}
      <div style={{
        padding: '10px 16px',
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginRight: '4px', fontWeight: 600 }}>Layer:</span>
        {layerButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => switchLayer(btn.id)}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: mapLayer === btn.id ? 'var(--accent-amber)' : 'var(--border-strong)',
              background: mapLayer === btn.id ? 'rgba(240,168,60,0.12)' : 'transparent',
              color: mapLayer === btn.id ? 'var(--accent-amber)' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {btn.emoji} {btn.label}
          </button>
        ))}
        {location && (
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
            📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </span>
        )}
      </div>
      {/* Map */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: '100%', background: '#1a1a2e' }}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   SUB-COMPONENT: Interactive Radar (OpenStreetMap + weather overlay)
---------------------------------------------------- */
function InteractiveRadarView({ location }: { location: Coordinates | null }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const centerLat = location?.latitude ?? 20.5937;
      const centerLng = location?.longitude ?? 78.9629;

      const map = L.map(mapContainerRef.current!, {
        center: [centerLat, centerLng],
        zoom: 5,
        zoomControl: true,
      });

      // Dark base map for radar feel
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 18,
      }).addTo(map);

      // Rain/precipitation overlay
      L.tileLayer(
        'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo',
        { opacity: 0.65, attribution: 'Weather &copy; OpenWeatherMap' }
      ).addTo(map);

      // Clouds overlay
      L.tileLayer(
        'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=demo',
        { opacity: 0.4, attribution: 'Clouds &copy; OpenWeatherMap' }
      ).addTo(map);

      if (location) {
        const pulseIcon = L.divIcon({
          className: '',
          html: `<div style="width:14px;height:14px;background:rgba(240,168,60,0.9);border-radius:50%;border:2px solid white;box-shadow:0 0 0 4px rgba(240,168,60,0.3);animation:pulse 1.5s infinite"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker([location.latitude, location.longitude], { icon: pulseIcon })
          .addTo(map)
          .bindPopup('📍 Your Location');
      }

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: 'var(--bg-deep)' }}>
      <div style={{
        padding: '10px 16px',
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>📡 Live Precipitation & Cloud Radar</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto' }}>Powered by OpenStreetMap + OpenWeatherMap tiles</span>
      </div>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%', background: '#0a0e15' }} />
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   MAIN APP COMPONENT
---------------------------------------------------- */
interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

type LocationStatus = "pending" | "granted" | "denied" | "unsupported";

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("pending");

  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );
  const [activeNav, setActiveNav] = useState("chat");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      return;
    }
    setLocationStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setLocationStatus("granted");
      },
      () => {
        setLocation(null);
        setLocationStatus("denied");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  };

  // Ask for location once on load so it's ready by the time the first message sends.
  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const sendMessage = async (overridePrompt?: string) => {
    const prompt = (overridePrompt || input).trim();
    if (!prompt || loading) return;

    const userMessage: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const response = await fetch(`${API_URL}/agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          location: location
            ? { latitude: location.latitude, longitude: location.longitude, accuracy: location.accuracy }
            : null,
        }),
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Agent error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect to the WeatherGPT server. Please verify your connection or API server status." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const selectNav = (id: string) => {
    setActiveNav(id);
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {isSidebarOpen && <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="brand-mark"><IconCloudSun /></div>
          {isSidebarOpen && <span className="brand-title">WeatherGPT</span>}
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => selectNav(item.id)}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              title={!isSidebarOpen ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-label">{item.label}</span>}
              {isSidebarOpen && item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="toggle-sidebar-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle sidebar">
            <span className="toggle-icon"><IconChevron dir={isSidebarOpen ? "left" : "right"} /></span>
            {isSidebarOpen && <span className="toggle-label">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-viewport">
        <header className="gemini-header">
          <div className="header-left">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="menu-trigger-btn" aria-label="Open sidebar">
                <IconMenu />
              </button>
            )}
            <span className="current-view-title">{NAV_ITEMS.find((item) => item.id === activeNav)?.label}</span>
          </div>

          <div className="header-right">
            <button
              className={`location-indicator ${locationStatus}`}
              onClick={() => locationStatus !== "pending" && requestLocation()}
              title={
                locationStatus === "granted"
                  ? "Sharing your location with WeatherGPT"
                  : locationStatus === "denied"
                  ? "Location blocked — click to try again"
                  : locationStatus === "unsupported"
                  ? "Location isn't available in this browser"
                  : "Requesting your location…"
              }
              aria-label="Location status"
            >
              <IconPin />
            </button>
            {activeNav === "chat" && messages.length > 0 && (
              <button onClick={clearChat} className="clear-chat-btn">Clear chat</button>
            )}
            <div className="avatar-badge-outer">
              <div className="avatar-badge-inner">AI</div>
            </div>
          </div>
        </header>

        <div className="view-container">
          {activeNav === "chat" && (
            <div className="gemini-chat-container">
              <main className="chat-body">
                <div className="chat-wrapper">
                  {messages.length === 0 && (
                    <div className="empty-state">
                      <div className="empty-state-mark"><IconCloudSun /></div>
                      <h2 className="greeting-subtext">Where would you like weather updates for today?</h2>

                      <div className="suggestion-grid">
                        {suggestions.map((item, idx) => (
                          <button key={idx} onClick={() => sendMessage(item.text)} className="suggestion-card">
                            <p>{item.text}</p>
                            <div className="suggestion-card-footer">
                              <span className="suggestion-title">{item.title}</span>
                              <div className="suggestion-icon-circle">{item.icon}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.length > 0 && (
                    <div className="message-list">
                      {messages.map((msg, index) => {
                        const isUser = msg.role === "user";
                        return (
                          <div key={index} className={`message-row ${isUser ? "user" : "assistant"}`}>
                            {!isUser && <div className="assistant-avatar"><IconCloudSun /></div>}

                            <div className="message-bubble-container">
                              {isUser ? (
                                <div className="user-bubble"><p>{msg.content}</p></div>
                              ) : (
                                <div className="assistant-bubble">
                                  <div className="assistant-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                  </div>
                                </div>
                              )}
                            </div>

                            {isUser && <div className="user-avatar">U</div>}
                          </div>
                        );
                      })}

                      {loading && (
                        <div className="loading-row">
                          <div className="assistant-avatar"><IconCloudSun /></div>
                          <div className="pulse-bar" />
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
              </main>

              <div className="input-area">
                <div className="input-pill-wrapper">
                  <div className="input-pill">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      disabled={loading}
                      rows={1}
                      placeholder="Ask WeatherGPT..."
                      className="chat-textarea"
                    />
                    <button onClick={() => sendMessage()} disabled={!input.trim() || loading} className="send-btn" aria-label="Send message">
                      <IconSend />
                    </button>
                  </div>
                </div>
                <p className="disclaimer-text">WeatherGPT may display inaccurate info, including about weather conditions.</p>
              </div>
            </div>
          )}

          {activeNav === "route" && <RouteWeatherView />}

          {activeNav === "report" && <WeatherReportView location={location} />}

          {activeNav === "map" && <WeatherMapView location={location} />}

          {activeNav === "radar" && <InteractiveRadarView location={location} />}

          {activeNav !== "chat" && activeNav !== "route" && activeNav !== "report" && activeNav !== "map" && activeNav !== "radar" && (
            <div className="route-placeholder-screen">
              <div className="placeholder-card">
                <span className="placeholder-icon">{NAV_ITEMS.find((item) => item.id === activeNav)?.icon}</span>
                <h2>{NAV_ITEMS.find((item) => item.id === activeNav)?.label}</h2>
                <p>This page route is ready to hold custom components and widgets.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## File: frontend2/src/pages/GeminiChat.css
```text
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap");

/* ---------------------------------------------
   Tokens — atmospheric / instrument-panel theme
--------------------------------------------- */
:root {
  --bg-deep: #0a0e15;
  --bg-panel: #10151d;
  --bg-panel-raised: #161c26;
  --bg-panel-hover: #1c2330;

  --accent-amber: #f0a83c;
  --accent-rust: #d9633b;
  --accent-teal: #46c9a6;
  --accent-horizon: linear-gradient(120deg, #f0a83c 0%, #d9633b 100%);

  --risk-high: #e5654a;
  --risk-mod: #e0a63f;
  --risk-low: #46c9a6;

  --text-primary: #edf0f5;
  --text-secondary: #9aa4b6;
  --text-muted: #5f6a7d;

  --border: rgba(237, 240, 245, 0.07);
  --border-strong: rgba(237, 240, 245, 0.14);

  --font-display: "Space Grotesk", "Segoe UI", sans-serif;
  --font-body: "Inter", "Segoe UI", sans-serif;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;

  --sidebar-w: 248px;
  --sidebar-w-collapsed: 64px;
  --header-h: 56px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-deep);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(237, 240, 245, 0.12); border-radius: 8px; }
::-webkit-scrollbar-thumb:hover { background: rgba(237, 240, 245, 0.2); }

button, input, textarea {
  font-family: var(--font-body);
}

a, button, [tabindex] {
  outline: none;
}
a:focus-visible, button:focus-visible, [tabindex]:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--accent-amber);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* ---------------------------------------------
   App shell
--------------------------------------------- */
.app-layout {
  display: flex;
  height: 100dvh;
  width: 100%;
  background-color: var(--bg-deep);
  overflow: hidden;
  position: relative;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-panel);
  border-right: 1px solid var(--border);
  transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 40;
  flex-shrink: 0;
}

.sidebar.open { width: var(--sidebar-w); }
.sidebar.collapsed { width: var(--sidebar-w-collapsed); }

.sidebar-header {
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  background: rgba(240, 168, 60, 0.12);
  border: 1px solid rgba(240, 168, 60, 0.28);
  flex-shrink: 0;
  color: var(--accent-amber);
}

.brand-mark svg { width: 17px; height: 17px; }

.brand-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: var(--text-primary);
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 11px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  width: 100%;
  text-align: left;
}

.nav-item:hover {
  background: var(--bg-panel-hover);
  color: var(--text-primary);
}

.nav-item.active {
  background: rgba(240, 168, 60, 0.1);
  color: var(--accent-amber);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-icon svg { width: 18px; height: 18px; }

.nav-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-badge {
  font-size: 9.5px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;
  background: var(--accent-horizon);
  color: #14100a;
  letter-spacing: 0.2px;
}

.sidebar-footer {
  padding: 8px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

.toggle-sidebar-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 9px 11px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.toggle-sidebar-btn:hover {
  color: var(--text-primary);
  background: var(--bg-panel-hover);
}

.toggle-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.toggle-label {
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
}

.sidebar-backdrop {
  display: none;
}

/* ---------------------------------------------
   Main viewport
--------------------------------------------- */
.main-viewport {
  flex: 1 1 0%;
  width: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-deep);
  overflow-x: hidden;
}

.gemini-header {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: rgba(10, 14, 21, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 20;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.current-view-title {
  font-family: var(--font-display);
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.menu-trigger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.menu-trigger-btn svg { width: 19px; height: 19px; }

.menu-trigger-btn:hover {
  background: var(--bg-panel-hover);
  color: var(--text-primary);
}

.clear-chat-btn {
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.clear-chat-btn:hover {
  color: var(--text-primary);
  border-color: var(--accent-amber);
}

.location-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  cursor: default;
  flex-shrink: 0;
  transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}

.location-indicator svg { width: 15px; height: 15px; }

.location-indicator.granted {
  color: var(--accent-teal);
  border-color: rgba(70, 201, 166, 0.3);
  background: rgba(70, 201, 166, 0.08);
}

.location-indicator.pending {
  color: var(--text-secondary);
}

.location-indicator.denied,
.location-indicator.unsupported {
  color: var(--text-muted);
  cursor: pointer;
}

.location-indicator.denied:hover {
  color: var(--accent-amber);
  border-color: rgba(240, 168, 60, 0.3);
  background: rgba(240, 168, 60, 0.08);
}

.avatar-badge-outer {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--accent-horizon);
  padding: 1.5px;
  flex-shrink: 0;
}

.avatar-badge-inner {
  width: 100%;
  height: 100%;
  background-color: var(--bg-deep);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

/* Routed view area */
.view-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

/* ---------------------------------------------
   Chat
--------------------------------------------- */
.gemini-chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
  background-color: var(--bg-deep);
  font-family: var(--font-body);
  color: var(--text-primary);
  overflow: hidden;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 28px 20px 12px;
  width: 100%;
}

.chat-wrapper {
  max-width: 1400px;
  width: 100%;
  min-width: 0;
  margin: 0 auto;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 6vh;
}

.empty-state-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: rgba(240, 168, 60, 0.1);
  border: 1px solid rgba(240, 168, 60, 0.25);
  color: var(--accent-amber);
  margin-bottom: 18px;
}

.empty-state-mark svg { width: 24px; height: 24px; }

.greeting-subtext {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 28px 0;
  letter-spacing: -0.4px;
  line-height: 1.25;
  max-width: 26ch;
}

.suggestion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  width: 100%;
}

.suggestion-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  min-height: 96px;
  padding: 16px;
  text-align: left;
  background-color: var(--bg-panel);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.suggestion-card:hover {
  background-color: var(--bg-panel-hover);
  border-color: var(--border-strong);
}

.suggestion-card p {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.suggestion-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.suggestion-title {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
}

.suggestion-icon-circle {
  width: 26px;
  height: 26px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-panel-raised);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-amber);
  flex-shrink: 0;
}

.suggestion-icon-circle svg { width: 14px; height: 14px; }

/* Messages */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 8px;
}

.message-row {
  display: flex;
  gap: 12px;
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-row.user {
  justify-content: flex-end;
}

.message-row.assistant {
  justify-content: flex-start;
  align-items: flex-start;
}

.assistant-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-panel-raised);
  border: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-amber);
  flex-shrink: 0;
}

.assistant-avatar svg { width: 15px; height: 15px; }

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-panel-raised);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.message-bubble-container {
  max-width: min(78%, 760px);
  min-width: 0;
  align-self: flex-start;
  text-align: left;
}

.message-row.user .message-bubble-container {
  align-self: flex-end;
}

.user-bubble {
  background: var(--bg-panel-raised);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 10px 15px;
  border-radius: var(--radius-lg);
  border-top-right-radius: 4px;
  font-size: 14px;
  line-height: 1.55;
  text-align: left;
}

.user-bubble p {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.assistant-bubble {
  background-color: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  border-top-left-radius: 4px;
  padding: 12px 15px;
  text-align: left;
}

.assistant-content {
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.65;
  text-align: left;
}

.assistant-content * {
  text-align: left;
}

.assistant-content p { margin: 0 0 8px 0; }
.assistant-content p:last-child { margin-bottom: 0; }

.assistant-content ul,
.assistant-content ol {
  padding-left: 20px;
  margin: 0 0 8px 0;
}

.loading-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.pulse-bar {
  width: 110px;
  height: 11px;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--bg-panel) 25%, var(--bg-panel-raised) 50%, var(--bg-panel) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Input area */
.input-area {
  padding: 10px 20px calc(16px + env(safe-area-inset-bottom));
  max-width: 1400px;
  width: 100%;
  min-width: 0;
  margin: 0 auto;
  box-sizing: border-box;
  flex-shrink: 0;
}

.input-pill-wrapper {
  position: relative;
  border-radius: 24px;
  padding: 1px;
  background: var(--border-strong);
  transition: background 0.2s ease;
}

.input-pill-wrapper:focus-within {
  background: var(--accent-horizon);
}

.input-pill {
  display: flex;
  align-items: flex-end;
  background-color: var(--bg-panel);
  border-radius: 23px;
  padding: 6px 6px 6px 18px;
}

.chat-textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 9px 0;
  font-size: 16px;
  color: var(--text-primary);
  resize: none;
  max-height: 120px;
  font-family: var(--font-body);
  line-height: 1.4;
}

.chat-textarea::placeholder { color: var(--text-muted); }

.send-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--accent-horizon);
  color: #14100a;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) { transform: scale(1.05); }

.send-btn:disabled {
  background: var(--bg-panel-raised);
  color: var(--text-muted);
  cursor: not-allowed;
}

.send-btn svg { width: 15px; height: 15px; }

.disclaimer-text {
  font-size: 10.5px;
  text-align: center;
  color: var(--text-muted);
  margin: 8px 0 0 0;
}

/* Placeholder screens */
.route-placeholder-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
}

.placeholder-card {
  text-align: center;
  padding: 36px 32px;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  max-width: 380px;
  width: 100%;
}

.placeholder-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 0 auto 14px;
  border-radius: var(--radius-md);
  background: rgba(240, 168, 60, 0.1);
  color: var(--accent-amber);
}

.placeholder-icon svg { width: 22px; height: 22px; }

.placeholder-card h2 {
  margin: 0 0 6px 0;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
}

.placeholder-card p {
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ---------------------------------------------
   Mobile — sidebar becomes an overlay drawer
--------------------------------------------- */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 240px !important;
    transform: translateX(-100%);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  }

  .sidebar.open { transform: translateX(0); }

  .sidebar.collapsed .sidebar-header .brand-title,
  .sidebar.collapsed .nav-label,
  .sidebar.collapsed .nav-badge,
  .sidebar.collapsed .toggle-label {
    display: inline;
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(4, 6, 10, 0.55);
    z-index: 35;
    animation: fadeIn 0.2s ease-out forwards;
  }

  .gemini-header { padding: 0 14px; }
  .chat-body { padding: 20px 14px 8px; }
  .input-area { padding: 8px 14px calc(14px + env(safe-area-inset-bottom)); }

  .suggestion-grid { grid-template-columns: 1fr; }
  .greeting-subtext { max-width: none; }

  .message-bubble-container { max-width: 90%; }

  .clear-chat-btn { padding: 6px 10px; font-size: 11px; }
}

@media (max-width: 420px) {
  .brand-title { font-size: 15px; }
  .empty-state-mark { width: 38px; height: 38px; }
}```

