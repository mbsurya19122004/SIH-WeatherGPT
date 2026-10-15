# WeatherGPT — Complete Radar + Weather-Field Redesign Prompt

This document combines the full **Radar-page/backend inspection specification** with the corrected **large weather-region visual direction** from the reference screenshots.

The backend/data inspection requirements come first. The visual implementation requirements then define the intended Temperature/Rain field appearance.

---

# PART A — RADAR PAGE, BACKEND INSPECTION & PRODUCT REDESIGN

Redesign and fix the standalone **Current Precipitation Radar** page in WeatherGPT.

The goal is to turn this route into a genuinely useful **precipitation intelligence view**, rather than another static weather map. Fix the current rendering problems first, then implement the radar-specific UX described below.

## 0. MANDATORY BACKEND INSPECTION — DO THIS BEFORE UI CHANGES

Before modifying the Radar UI or renderer, inspect the actual backend/data pipeline end-to-end.

This is a required deliverable, not an optional investigation.

### Inspect all relevant layers

Identify and document:

- Radar page route and frontend entry point.
- API/client function used to fetch precipitation.
- Backend endpoint(s) serving radar/precipitation data.
- Response schema and representative payload.
- Data source/provider.
- Update frequency and timestamp semantics.
- Geographic coverage.
- Spatial resolution.
- Whether data is:
  - point observations
  - station observations
  - regular grid
  - irregular grid
  - interpolated model output
  - actual radar imagery/reflectivity
  - another derived precipitation product
- Units and value semantics, especially whether values are:
  - instantaneous intensity
  - accumulation
  - forecast
  - observed rainfall
- Null/missing-value representation.
- Zero-value behavior.
- Whether historical frames exist.
- Whether forecast frames exist.
- Whether frame timestamps are available.
- Whether district boundaries already exist.
- Whether warning polygons/geographic extents exist.
- Whether lightning data exists.
- Whether user/location-aware precipitation queries exist.
- Whether the Weather Map Rain layer consumes the same source/data.
- Whether there are already shared precipitation/color-scale utilities that should be reused.

### Also inspect the existing Weather Map

Trace the Weather Map's Rain layer and determine:

```text
Weather Map Rain
      ↓
data source
      ↓
normalization
      ↓
color scale
      ↓
geometry generation
      ↓
renderer

```

Compare this against:

```text
Radar precipitation
      ↓
data source
      ↓
normalization
      ↓
color scale
      ↓
geometry generation
      ↓
renderer

```

Explicitly identify duplicated logic and opportunities to consolidate them.

### Backend inspection deliverable

Before implementation, produce a concise engineering note in the repository, for example:

```text
docs/radar-data-capability.md

```

or the project's existing equivalent documentation location.

The document must contain:

```text
# Radar Data Capability Report

## Data source
...

## Endpoint(s)
...

## Response shape
...

## Spatial model
Point / grid / radar / other

## Temporal model
Current only / historical / forecast / both

## Units
...

## Geographic coverage
...

## Update cadence
...

## Zero / null semantics
...

## District data
Available / unavailable

## Warning polygons
Available / unavailable

## Lightning
Available / unavailable

## Rain movement support
Possible / not possible
Reason: ...

## Rain ETA support
Possible / not possible
Reason: ...

## Recommended UI capabilities
...

## Unsupported capabilities
...

## Data honesty constraints
...

```

Do not fill this document with assumptions.

Every capability must be classified as:

- **Available**
- **Derivable**
- **Unavailable**
- **Unknown**

"Unknown" means the implementation has not found sufficient evidence yet. Do not silently treat Unknown as Available.

### Evidence requirement

For every major capability, reference the actual implementation evidence:

- endpoint/function name
- file/module path
- response fields
- schema/type definition
- relevant backend service

The goal is to make it possible for another engineer to audit why a feature was considered supported.

### Backend-first decision gate

After inspection, derive a simple implementation matrix:

| CapabilityBackend supportFrontend action |     |                  |
| ---------------------------------------- | --- | ---------------- |
| Current precipitation                    | ... | Implement / omit |
| Historical frames                        | ... | Implement / omit |
| Forecast frames                          | ... | Implement / omit |
| District boundaries                      | ... | Implement / omit |
| Warning polygons                         | ... | Implement / omit |
| Lightning                                | ... | Implement / omit |
| Rain movement                            | ... | Implement / omit |
| Rain ETA                                 | ... | Implement / omit |

Do not implement UI controls for capabilities marked Unavailable.

Do not fabricate data to make a capability appear functional.

Only after this inspection and decision matrix are complete should the visual implementation begin.

---

# 1. FIX THE BASEMAP

The Radar page is currently using CARTO without a configured API key, producing:

`API KEY REQUIRED — carto.com/basemaps/apikey`

Remove that implementation.

Use the same working **OpenStreetMap tile source already used by the Weather Map** so the two map pages share one reliable basemap integration.

Do not introduce another map provider just for this route.

Do not ship an unconfigured API-key-based tile provider.

---

# 2. FIX THE PRECIPITATION RENDERING

The current radar precipitation overlay renders hard-edged rectangular/square grid cells.

Replace that completely.

There must be **no visible rectangular or square precipitation cells anywhere in the final implementation.**

Every precipitation point, or the center of every backend grid cell, should render as a **soft elliptical radial gradient**.

### Rendering behavior

For each data point:

- Use an SVG `radialGradient` if the map overlay is SVG-based.
- Use a blurred radial fill if the existing implementation is canvas-based.
- Preserve the actual precipitation color/value at the center.
- Fade smoothly toward transparent at the perimeter.

Preferred gradient behavior:

```text
0%      solid / full-opacity value color
40-50%  same color with reduced opacity
100%    fully transparent

```

The center must remain clearly legible.

The softness should affect the transition between observations, not destroy the readability of the observation itself.

### Shape

Use ellipses rather than perfect circles.

A slight horizontal/vertical stretch is acceptable.

Keep the aspect ratio subtle so the shape does NOT imply directional motion. Directional information belongs to wind/movement visualization.

Vary ellipse dimensions slightly where useful to prevent a repetitive "polka-dot" pattern.

### Coverage

Size ellipses relative to the spacing of actual observations.

Requirements:

- Adjacent ellipses should overlap enough to create a continuous precipitation field.
- Do not leave obvious bare-map gaps between neighboring observations.
- Do not make one observation so large that it falsely implies coverage far beyond the source data.
- Preserve the distinction between interpolation/visual smoothing and actual measured coverage.

### Blending

Where gradients overlap:

- Prefer `mix-blend-mode: screen` if compatible with the current rendering architecture.
- Otherwise use an additive/max-value style composition.
- Avoid visible double-exposure circles.
- Avoid visible seams.

### Styling restrictions

Do NOT:

- use `<rect>` cells
- use square tiles
- draw borders around cells
- add ellipse strokes
- add visible outlines
- use hard-edged masks
- create checkerboard/grid aesthetics

The fade itself is the only edge treatment.

---

# 3. SHARE THE RAIN RENDERER

The Weather Map already has a Rain layer that is supposed to follow the same soft-ellipse visual language.

If Radar and Weather Map are displaying the same underlying precipitation concept, extract a reusable precipitation rendering component/util so there is one implementation.

For example:

```text
PrecipitationField
  ├── data normalization
  ├── color scale
  ├── radial gradient generation
  ├── ellipse sizing
  ├── overlap blending
  └── empty-state handling

```

Do not maintain two separate precipitation rendering implementations that can drift apart.

The Radar precipitation field and Weather Map Rain layer should feel like the same design system.

---

# 4. HONEST ZERO-PRECIPITATION STATE

The current page can show a fully colored grid even when readings are:

`0.0 mm/h`

and the range is:

`0.0–0.0`

That is misleading.

When all visible precipitation values are zero, or below a clearly defined "no meaningful precipitation" threshold:

**Do not render the precipitation field.**

Show the clean basemap instead.

Display a concise state such as:

```text
No precipitation detected

No meaningful rainfall is currently
detected in this area.

Updated 02:30 IST

```

Do not show meaningless colored gradients when the dataset contains no meaningful variation.

Do not show a fake rainbow legend for an all-zero dataset.

Only render the precipitation color field when there is actual precipitation variation.

---

# 5. RADAR PAGE IDENTITY

The Weather Map answers:

> "What is the weather here?"

The Radar page should answer:

> "Where is precipitation, how is it changing, and what does it mean?"

Do not simply reproduce the Weather Map Rain layer as a second page.

Make Radar primarily **precipitation + spatial context + time**.

---

# 6. PAGE HEADER

Create a clean header such as:

```text
Precipitation Radar

India / Uttar Pradesh

● Live
Updated 02:30 IST

```

Use sentence case.

Do NOT use:

`PRECIPITATION`

Use:

`Precipitation`

Radar data is time-sensitive, so the update timestamp must be visible.

---

# 7. MAIN RADAR MAP

The map should dominate the page.

The map should support these conceptual layers:

```text
Base map
Precipitation
District boundaries
Active warnings
Location

```

Only show layers for which actual data exists.

Keep controls compact and unobtrusive.

Do not cover the map with large decorative cards.

---

# 8. LAYER CONTROL

Add a compact layer control, preferably floating over the map:

```text
Layers

☑ Precipitation
☑ Districts
☑ Warnings
☐ Lightning
☐ Wind

```

Only expose supported layers.

Do not present unavailable features as functional controls.

---

# 9. PRECIPITATION OPACITY

Add a simple overlay-opacity control.

Example:

```text
Opacity
──────●────
       72%

```

The purpose is to allow users to preserve base-map readability while keeping precipitation visible.

Do not make the default opacity so strong that streets, districts, or labels become difficult to read.

---

# 10. TIMELINE / RADAR PLAYBACK

Only implement this if backend inspection confirms genuine temporal frames.

If historical and/or forecast frames exist, create:

```text
◀    Play    ───────●────────────────    LIVE    ▶

```

with actual backend timestamps.

Support:

- Play
- Pause
- Scrub
- Previous frame
- Next frame
- Live

Do NOT:

- fake radar motion
- animate a static snapshot
- invent timestamps
- interpolate frames unless that behavior is explicitly documented and defensible

If there is no temporal frame support, omit the entire playback control.

---

# 11. CURRENT PRECIPITATION SUMMARY

Add a compact information panel, preferably below or alongside the map.

Example:

```text
Current precipitation

Heavy rain      3 areas
Moderate        7 areas
Light           14 areas

Maximum         38.2 mm/h
Updated         02:30 IST

```

Only display metrics that can be derived from actual data.

Do not fabricate geographic counts from sparse observations.

---

# 12. DISTRICT INTERACTION

Only implement if actual district geographic data exists.

Render faint district boundary lines.

Allow district selection.

Example:

```text
Ghaziabad

Rain intensity
12.8 mm/h

Trend
Increasing

Active warning
Thunderstorm · Orange

Updated
02:30 IST

```

Clearly distinguish point readings from district-level summaries.

Do not present one station's value as a district-wide measurement.

---

# 13. ACTIVE WARNING POLYGONS

Only implement when the backend provides actual geographic warning extents.

Render them directly over the precipitation map.

Clicking a polygon can open:

```text
Orange Warning

Thunderstorm with gusty winds

Valid until 04:00 IST

Source: IMD

```

Use actual source data.

Do not invent polygon geometry from a district name.

---

# 14. RAIN MOVEMENT

Only implement where multiple genuine temporal frames make movement analysis defensible.

Use actual spatial changes between frames.

Possible UI:

```text
Rain movement

↗ NE

```

Do not infer movement from one static frame.

---

# 15. "RAIN APPROACHING YOU"

Only implement when both location and temporal/spatial precipitation data support a defensible estimate.

Example:

```text
Rain approaching

Moderate precipitation
currently 18 km southwest

Estimated arrival
~35 min

```

Do not show speculative ETAs as fact.

---

# 16. LIGHTNING

Only implement if the backend/provider provides real lightning observations.

Do not fabricate lightning detections.

Keep this as a secondary layer.

---

# 17. LEGEND

Keep the precipitation legend visually clear against the softer field.

Example:

```text
Precipitation

0      2.5      10      25      50+ mm/h
│───────│────────│────────│────────│

```

For an all-zero/no-meaningful-precipitation state, hide or simplify the precipitation legend.

---

# 18. DATA HONESTY

The visual smoothing must never imply more certainty than the source data provides.

If the backend provides sparse observations, do not present the visualization as actual radar reflectivity unless it really is radar data.

Use terminology based on the backend inspection:

```text
Precipitation observations

```

or

```text
Estimated precipitation field

```

or the correct source-specific terminology.

Document this decision in `docs/radar-data-capability.md`.

---

# 19. VISUAL DIRECTION

The final experience should feel:

- meteorological
- calm
- data-driven
- spatial
- modern
- technically credible

It should NOT feel:

- like a debug grid
- like a game UI
- like a generic dashboard
- like a collection of floating cards
- overly neon
- overly animated
- AI-generated/vibe-coded

Use the Weather Map's existing **Wind contour rings** as a reference for softness and compositing.

---

# 20. RESPONSIVE DESIGN

Desktop:

- map is dominant
- controls float over map
- timeline spans the width below map
- summary information remains compact

Mobile:

- map remains primary
- controls collapse into compact controls
- timeline becomes horizontally scrollable or compact
- district/warning details become bottom sheets or stacked panels
- controls should never consume most of the map viewport

---

# 21. REMOVE CURRENT VISUAL ISSUES

Specifically eliminate:

- CARTO API-key placeholder
- hard precipitation squares
- precipitation cell borders
- excessive all-caps labels
- fake-looking colored grids for 0.0 mm/h
- duplicate precipitation implementations
- oversized dashboard cards obscuring the map
- unsupported/fake radar animation

Also verify that the yellow-bordered:

`Display / Sun Blast / Brightness / Scale`

overlay visible in the screenshot is external to WeatherGPT. Do not attempt to implement or fix it unless it is actually part of the application.

---

# 22. IMPLEMENTATION PRIORITY

### P0

1. Perform and document backend inspection.
2. Replace CARTO with the existing working OSM basemap.
3. Replace square precipitation cells with soft radial-gradient ellipses.
4. Share the precipitation renderer with Weather Map Rain where practical.
5. Implement truthful zero-precipitation state.
6. Add correct precipitation legend and timestamp.
7. Fix typography/casing.

### P1

8. Add opacity control.
9. Add district boundaries if supported.
10. Add real radar timeline/playback if supported.

### P2

11. Add warning polygons if supported.
12. Add clickable district precipitation summaries.
13. Add useful precipitation statistics.

### P3

14. Add rain-movement visualization if supported.
15. Add "rain approaching" estimation if supported.
16. Add lightning if supported.

---

# 23. TEST / DEMO REQUIREMENT

After implementation, verify the page using two map areas:

### Area A — label-dense

A dense urban area with many roads, labels, and administrative boundaries.

Evaluate:

- precipitation opacity
- map readability
- gradient softness
- district boundaries
- legend contrast

### Area B — open terrain

A relatively open/rural area with sparse labels.

Evaluate:

- continuity of the precipitation field
- ellipse overlap
- natural fade behavior
- whether individual observations become unrealistically large

Show both states using **real non-zero precipitation data** when available.

Also test:

1. all-zero precipitation
2. low precipitation
3. multiple overlapping precipitation values
4. high precipitation
5. district selection, if supported
6. warning overlays, if supported
7. timeline playback, if supported

Do not stop at an all-zero screenshot.

---

# 24. FINAL ENGINEERING DELIVERABLES

The implementation is not complete until all of the following exist:

### Code

Working Radar redesign integrated into the application.

### Backend capability report

A committed/created document such as:

```text
docs/radar-data-capability.md

```

containing the backend inspection findings and evidence.

### Capability matrix

A clear mapping of backend support → implemented/omitted frontend features.

### Visual verification

Evidence that the precipitation field has been tested over:

- a label-dense area
- an open-terrain area
- a real non-zero precipitation dataset

### Regression verification

Confirm that the Weather Map's existing Rain layer was not broken by the shared renderer/refactor.

---

## Final product direction

The finished Radar page should communicate this hierarchy immediately:

```text
WHERE IS RAIN?
        ↓
HOW MUCH?
        ↓
IS IT MOVING?
        ↓
WHAT AREA IS AFFECTED?
        ↓
IS THERE A WARNING?
        ↓
WHAT DOES IT MEAN FOR ME?

```

Prioritize real data, spatial clarity, and trustworthy visualization over decorative complexity.

Most importantly: **inspect the backend first, document what is actually possible, and make the UI conform to those capabilities. Never reverse-engineer imaginary backend capabilities from the desired UI.**

---

# PART B — REFERENCE-MATCHING TEMPERATURE & RAIN WEATHER-FIELD VISUALIZATION


Redesign and fix the **Temperature** and **Rain** map overlays to match the visual language shown in the attached reference screenshots.

The current implementation is visually wrong because it renders many small dark/blurred spots that look like individual heat points or a kernel-density plot.

That is **not** the desired result.

The reference design uses **large, translucent, overlapping elliptical weather regions** that create broad continuous zones across the map.

## PRIMARY VISUAL TARGET

Use the attached reference screenshots as the primary visual reference.

The intended appearance is:

```text
          ┌──────── LARGE TEMPERATURE ZONE ────────┐
       ╭─────────────────────────────────────────────╮
      /                                               \
     /                    cool                        \
    /                                                   \
    \                                                   /
     \                     ╭────────────╮              /
      \                   ╱   warm       ╲            /
       ╲                ╱                 ╲          /
        ╲______________╱___________________╲________╱

                  query point
                       •
                concentric rings
```

The map should read as a **smooth spatial weather field**, not as a collection of point markers.

---

# 1. DO NOT REPEAT THE PREVIOUS IMPLEMENTATION

The current implementation produces something similar to:

```text
      ●
          ●
   ●            ●
        ●
             ●
```

where every observation appears as a small dark blurred spot.

Remove that visual treatment.

Do NOT:

- render tiny Gaussian blobs around every point
- render small fuzzy circles
- create a polka-dot appearance
- create a dense collection of heatmap points
- make every data point visually obvious
- reproduce the screenshot where dark black/gray spots appear around Delhi
- use hard square/rectangular cells
- use cell borders
- create a checkerboard/grid appearance

The user should perceive **regions**, not individual blobs.

---

# 2. DESIRED GEOMETRY

Each significant spatial observation/cluster should contribute to a **large elliptical region**.

The ellipses should be substantially larger than the previous point blobs.

Think:

```text
Previous:
   (small)
    ●

Desired:

        ______________________
      /                        \
     /                          \
    |                            |
     \                          /
      \________________________/
```

Use broad ellipses with overlapping coverage.

The goal is approximately:

```text
      LARGE COOL REGION

                    LARGE WARM REGION
             ______________________
          __/                      \__
        _/                            \_

                         LARGE HOT REGION
                    ______________________
                 __/                      \__
```

rather than:

```text
● ● ● ● ●
 ● ● ● ●
● ● ● ● ●
```

---

# 3. TEMPERATURE LAYER

Match the attached **Temperature** reference.

The Temperature field should contain broad zones using the existing temperature color scale.

For example:

```text
Cool
  blue / teal

Moderate
  yellow / muted transitional tone

Warm
  orange

Hot
  deeper warm tone
```

Do not invent a new palette if the application already has a temperature scale.

Preserve the existing legend and make the visual field correspond to that scale.

### Region behavior

Each temperature zone should be:

- large
- translucent
- elliptical
- softly blended into neighboring zones
- clearly distinguishable at its center
- free of outlines
- visually subordinate to map labels

The reference has large overlapping regions.

Reproduce that overall visual structure.

---

# 4. RAIN LAYER

The Rain layer should use the **same geometric language** as Temperature.

This is important.

Temperature:

```text
large translucent elliptical zones
```

Rain:

```text
large translucent elliptical zones
```

Only the data/color scale changes.

Do NOT make Temperature look like a heatmap while Rain becomes something completely different.

The two layers should obviously belong to the same visualization system.

---

# 5. RADIAL GRADIENT, BUT NOT A TINY POINT GRADIENT

Use radial gradients, but apply them to the **large regions**.

A region can use:

```text
0%
strong readable center

35-50%
reduced opacity

70-80%
soft transition

100%
transparent
```

The fade should happen over the entire large ellipse.

Do not create a tiny gradient concentrated around the observation coordinate.

Conceptually:

```text
       transparent
      /------------\
     /              \
    /    readable    \
   |       core       |
    \                /
     \______________/
       transparent
```

The center should remain strong enough that the underlying weather value is not visually washed out.

---

# 6. IMPORTANT: LARGE REGIONS, NOT LARGE CIRCLES

Do not simply increase the radius of the old blobs.

The result should not look like:

```text
⭕     ⭕      ⭕
```

Instead, regions should overlap and form a compositional field:

```text
        ╭───────────────╮
     ╭──╯               ╰──╮
     │        COOL          │
     ╰──╮               ╭──╯
        ╰───────┬───────╯
                │
           ╭────┴────────────╮
        ╭──╯                  ╰──╮
        │        WARM             │
        ╰──╮                  ╭──╯
           ╰────────┬─────────╯
                    │
                 HOT ZONE
```

Use subtle horizontal/vertical stretching.

Different regions can have slightly different aspect ratios.

This prevents repetitive circles and gives the map a more organic weather-field appearance.

---

# 7. OPACITY

The reference screenshots use **large translucent color fields over the map**.

Match that visual density.

The overlay must be visible immediately, but the base map must remain readable.

Target behavior:

```text
Weather field = primary data layer
Base map       = still readable underneath
Labels         = visible
Roads          = visible
```

Do not make the field nearly opaque.

Do not make it so transparent that the temperature/rain differences disappear.

---

# 8. OVERLAP BEHAVIOR

When two large regions overlap, they should visually merge.

Example:

```text
        BLUE
    ╭────────────╮
    │            │
    │      ╭────────────╮
    │      │            │
    ╰──────│   YELLOW   │
           │            │
           ╰────────────╯
```

The overlap should feel intentional rather than like two separate stickers.

Use:

- `mix-blend-mode: screen`, where compatible
- controlled opacity
- radial fading
- consistent compositing

Do not create sharp overlap boundaries.

---

# 9. DO NOT USE STROKES

Never draw a border around the temperature/rain ellipses.

No:

```css
stroke: ...
border: ...
outline: ...
```

The edge should come entirely from transparency/fading.

The only visible contour lines should be the existing **Wind/query rings**, which are separate from the weather-field regions.

---

# 10. PRESERVE THE WIND VISUAL LANGUAGE

The screenshots show that the Wind layer already has:

- concentric rings around the query point
- a central marker
- directional wind indicators
- a small tooltip/value label

Keep this concept.

The Temperature and Rain layers should sit naturally underneath/around this visual language.

Do not make the weather fields compete with the query rings.

The rings should remain crisp and lightweight.

---

# 11. QUERY POINT

Keep the central query marker:

```text
          ◎
```

and the small contextual tooltip:

```text
31°C at this point
```

or the appropriate Rain value.

The marker should remain visually above the weather field.

Do not let a large gradient obscure it.

---

# 12. MAP BACKGROUND

The reference screenshots intentionally use a subdued dark map presentation for visualization.

Keep the existing map implementation unless there is a technical reason not to.

The weather field should be composed over the real map.

Do not replace the map with a fake canvas/grid background.

For the actual production map, preserve:

- roads
- terrain
- labels
- geographic context

The visualization must work on top of real map content.

---

# 13. LEGEND

Keep the existing legend design.

Temperature:

```text
Temperature

18°C ───────────────── 42°C
```

Rain:

```text
Rainfall, next 24h

0 mm ───────────────── 80 mm
```

Adjust only when necessary to visually harmonize with the softer field.

The legend should remain small and unobtrusive in the lower-left.

Do not create a giant legend panel.

---

# 14. DATA-TO-REGION MAPPING

This is a key implementation requirement.

Before rendering, inspect how the backend provides the data.

If it is a gridded field:

- use grid centers as anchors
- aggregate/interpolate neighboring values
- generate a small number of meaningful broad regions
- do not expose every grid cell visually

If it is sparse point data:

- use the points as field anchors
- determine reasonable spatial influence based on point spacing
- avoid implying precision beyond the actual observation coverage

The visualization may smooth the field for readability, but **must not pretend that every pixel represents a measured observation**.

---

# 15. REGION SIZING

Region size should be based on actual spatial spacing.

Use something conceptually similar to:

```text
regionRadius ≈ localPointSpacing × influenceFactor
```

The influence factor should create substantial overlap.

Avoid:

```text
tinyRadius
```

and avoid:

```text
hugeRadius spanning the entire country from one reading
```

Each region should cover its local area naturally.

The output should resemble broad weather masses rather than isolated station readings.

---

# 16. REDUCE VISUAL REPETITION

Do not generate every ellipse with the same:

- width
- height
- opacity
- rotation

Subtle variations are allowed.

For example:

```text
Ellipse A
width: 420
height: 300

Ellipse B
width: 500
height: 340

Ellipse C
width: 380
height: 280
```

Keep variations restrained.

The field should feel organic, not randomly generated.

---

# 17. TEMPERATURE EXAMPLE

For a temperature field such as:

```text
24°C
28°C
31°C
35°C
40°C
```

the map should conceptually look like:

```text
       COOLER REGION
    ╭──────────────────╮
   /                    \
  /      24-28°C         \
  \                      /
   \__________    ______/
              \  /
               \/
          30-35°C REGION
        ╭───────────────╮
       /                 \
      /       35°C        \
      \                    /
       ╰─────────┬────────╯
                 │
             HOTTER ZONE
```

Not:

```text
24° ●
28° ●
31° ●
35° ●
40° ●
```

---

# 18. RAIN EXAMPLE

For rainfall values such as:

```text
0
4
15
32
52
```

the visualization should read as:

```text
       LOW / NO RAIN

             ╭──────────────╮
          ╭──╯              ╰──╮
          │     MODERATE       │
          ╰──╮              ╭──╯
             ╰──────┬───────╯
                    │
             ╭──────┴─────────╮
          ╭──╯                 ╰──╮
          │       HEAVY RAIN      │
          ╰───────────────────────╯
```

with the strongest precipitation represented by the appropriate strongest color.

---

# 19. ZERO-RAIN STATE

Keep the previously specified truthful empty-state behavior.

If all visible rainfall values are effectively zero:

Do not manufacture large colored regions.

Instead:

```text
No precipitation detected

No meaningful rainfall is currently
detected in this area.

Updated 02:30 IST
```

Show the normal base map underneath.

---

# 20. DO NOT OVERENGINEER THE VISUALIZATION

Do not turn this into a complex scientific visualization library.

The target is the visual language in the attached screenshots.

The hierarchy should be:

```text
REAL MAP
   ↓
LARGE WEATHER REGIONS
   ↓
QUERY POINT + CONTOUR RINGS
   ↓
SMALL LEGEND / CONTROLS
```

not:

```text
MAP
+ grid
+ hundreds of blobs
+ labels
+ markers
+ borders
+ cards
+ animation
+ excessive tooltips
```

---

# 21. REQUIRED BACKEND INSPECTION

Before implementing the new renderer, inspect the actual backend as previously requested.

Create/update:

```text
docs/radar-data-capability.md
```

and document:

- precipitation endpoint
- response structure
- spatial representation
- number/density of observations
- units
- timestamps
- historical frames
- forecast frames
- district data
- warning polygons
- lightning
- what can actually be derived

Classify each capability:

```text
Available
Derivable
Unavailable
Unknown
```

Do not fabricate unavailable data.

---

# 22. REQUIRED IMPLEMENTATION

After backend inspection:

1. Identify the existing Temperature renderer.
2. Identify the existing Rain renderer.
3. Identify the existing Wind contour renderer.
4. Extract/reuse the common spatial-field logic where practical.
5. Replace the tiny-point/blob rendering with broad elliptical regions.
6. Preserve actual values and the existing color scale.
7. Keep query rings above the field.
8. Ensure the map remains readable.
9. Keep Temperature and Rain visually consistent.

---

# 23. VISUAL VERIFICATION

Do not judge the implementation from one artificial canvas.

Verify it against real map backgrounds.

Test both:

### Label-dense area

Use a city/urban map with many roads and labels.

Verify:

- map remains readable
- colors remain distinguishable
- large fields do not obscure everything
- region transitions feel natural

### Open terrain

Use a relatively sparse rural/open area.

Verify:

- fields do not look like giant stickers
- individual regions blend naturally
- there are no ugly gaps
- coverage remains believable

Also test multiple zoom levels.

---

# 24. SUCCESS CRITERIA

The redesign is successful when the result looks visually closer to the attached reference screenshots:

### Temperature

Large overlapping colored elliptical regions with smooth transparency.

### Rain

Large overlapping rainfall regions using the same visual language.

### Wind

Existing contour rings remain crisp and lightweight.

### Overall

The map should immediately read as:

**"This is a spatial weather field."**

It should NOT read as:

**"These are dozens of weather data points rendered as blobs."**

The most important change is therefore:

> **Stop visualizing the observations as individual points. Visualize them as broad overlapping weather regions anchored by the underlying observations.**

Use the attached screenshots as the visual target throughout implementation and compare the final result against them before considering the task complete.
