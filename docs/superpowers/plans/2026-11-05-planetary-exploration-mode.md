# Planetary Exploration Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the 3D portfolio background into an expansive, interactive Planetary Exploration Mode where visitors can freely fly the rocket across a 5-planet solar system using both Mouse and WASD controls, triggering holographic portfolio dossiers when approaching each celestial body.

**Architecture:** A decoupled `ExplorationManager` orchestrates smooth switching between the vertical guided `Story Mode` and free 3D `Planetary Exploration Mode`. A procedural `PlanetaryScene` adds 5 stylized celestial bodies representing portfolio domains, while `FlightController` translates dual inputs (Mouse + WASD) into realistic rocket physics. A `ProximityDetector` calculates orbital gravity radii to display localized holographic cards (`FlightHUD`), backed by the existing `i18n` and `portfolioData` modules.

**Tech Stack:** Three.js (WebGL), GSAP (camera transitions), Vanilla ES Modules, Vite, CSS3 3D Holograms.

**Spec:** `C:\Users\Firdaus\.gemini\antigravity\brain\9a4e45cf-4edd-4617-a245-17c327859c92\planetary_exploration_design.md`

## Global Constraints

- **Language Support:** All holographic dossier cards, radar labels, and control instructions must strictly support active language switching (`en`, `id`, `ja`) via `src/config/i18n.js`.
- **Palette Integrity:** Dark cosmic slate `#06090e`, Japanese crimson `#e63946`, lunar ice cyan `#38bdf8`, cyber lime `#2ed573`.
- **60 FPS Performance:** Procedural low-poly geometries with optimized materials, avoiding heavy external GLTF asset stalls.
- **Dual Input Concurrency:** Mouse aiming/thrusting and Keyboard WASD/Arrow steering must work independently and simultaneously without input conflict.
- **Story Mode Non-Regression:** Entering and exiting exploration mode must restore the user's scroll position and HUD telemetry without desyncing the 3D rocket.

## Review Focus

1. **Camera Transition Disorientation:** Switching between vertical scroll camera and 3D chase camera must interpolate smoothly with GSAP without clipping through geometries or jarring snaps.
2. **Input Trapping & Form Conflict:** When typing in the contact form or modal, flight keyboard inputs (`W`, `A`, `S`, `D`, `Space`) must be ignored so users can type words with 'wasd' freely.
3. **Orbital Boundary Containment:** Flying too far into deep space (e.g. `> 600 units`) must smoothly steer the rocket back toward the planetary core with a "Navigational Horizon Warning" rather than stranding the user in darkness.
4. **Mobile Fallback & Touch Controls:** Mobile devices without physical keyboards must support touch drag steering and on-screen thrust/break buttons.
5. **Booster Re-attachment Consistency:** If entering exploration mode after booster separation, the rocket must retain its orbital configuration and properly restore when returning to Earth.

---

### Task 1: Planetary Sector 3D Scene Graph

**Files:**
- Create: `src/scenes/PlanetaryScene.js`
- Modify: `src/core/SceneManager.js:40-60`

**Interfaces:**
- Produces: `PlanetaryScene` instance with `group: THREE.Group`, `planets: Array<PlanetObject>`, `update(delta: number): void`, `setVisible(visible: boolean): void`.

- [ ] **Step 1: Create `src/scenes/PlanetaryScene.js`**
  - Implement 5 distinct celestial bodies with procedural Three.js meshes:
    1. **Terra Yokohama (`id: 'about'`, `pos: [0, 0, 0]`):** Earth sphere with land/ocean materials, atmospheric glow shield, and miniature Mount Fuji vertex mesh.
    2. **Planet Arsenal (`id: 'skills'`, `pos: [160, 30, -140]`):** Golden-amber gas giant with glowing orbital particle rings representing the tech stack.
    3. **Planet Odyssey (`id: 'experience'`, `pos: [-150, 45, -170]`):** Crimson Martian planet with crater bump maps and orbital elevator beacon.
    4. **Planet Enterprise (`id: 'projects'`, `pos: [120, 60, -280]`):** Deep cyan ice giant surrounded by 3 orbiting project data relay satellites.
    5. **The Moon (`id: 'contact'`, `pos: [0, 80, -360]`):** High-detail lunar sphere with landing pad, glowing beacon lights, and communication dish.
  - Add atmospheric particles, star dust, and orbital guide rings for each planet.

- [ ] **Step 2: Connect `PlanetaryScene` into `SceneManager.js`**
  - Instantiate `PlanetaryScene` in `SceneManager`.
  - Add `this.planetaryScene.group` to the main scene with initial `visible = false` (enabled only in Exploration Mode).

- [ ] **Step 3: Verification**
  - Run `bun run build` to verify zero compile or import errors in `PlanetaryScene.js`.

---

### Task 2: Dual Flight Controller Engine

**Files:**
- Create: `src/core/FlightController.js`

**Interfaces:**
- Consumes: `rocket: Rocket`, `camera: THREE.PerspectiveCamera`
- Produces: `FlightController` with methods `update(delta: number): FlightState`, `enable(): void`, `disable(): void`, `reset(position: THREE.Vector3): void`.

- [ ] **Step 1: Implement Keyboard & Mouse Input Listeners in `src/core/FlightController.js`**
  - State tracking:
    - Keys: `keys = { forward: false, backward: false, left: false, right: false, boost: false }`.
    - Mouse: `mouse = { x: 0, y: 0, isDown: false }` normalized between `[-1, 1]`.
  - Ignore keyboard input when active element is an `INPUT`, `TEXTAREA`, or modal dialog.
  - Key bindings: `KeyW`, `ArrowUp` -> `forward`; `KeyS`, `ArrowDown` -> `backward`; `KeyA`, `ArrowLeft` -> `left`; `KeyD`, `ArrowRight` -> `right`; `Space` -> `boost`.

- [ ] **Step 2: Implement Physics Simulation & Rocket Banking**
  - Euler & Quaternion orientation modeling:
    - Mouse coordinates drive target yaw and pitch smoothly with `lerp(0.08)`.
    - Turning left/right applies bank roll angle (`rotation.z` tilts into the turn).
  - Acceleration & Speed:
    - Base cruise speed: `15 units/s`; Boost speed: `35 units/s`.
    - Smooth inertia drag (`velocity.multiplyScalar(0.96)`).
  - Thruster audio & particle sync:
    - Emits thruster intensity (`0.0` to `1.0`) to trigger audio synthesizer pitch and flame particle count.

- [ ] **Step 3: Implement Space Boundaries & Soft Repulsion**
  - If rocket distance from center `> 550 units`, gently curve direction back towards `(0, 40, -180)` to prevent drifting into empty void.

- [ ] **Step 4: Verification**
  - Run `bun run build` to ensure clean bundling of physics calculations.

---

### Task 3: Proximity Detection & Localized Holographic Dossiers

**Files:**
- Create: `src/core/ProximityDetector.js`
- Modify: `src/config/i18n.js` (add exploration HUD translations)

**Interfaces:**
- Consumes: `rocketPosition: THREE.Vector3`, `planets: Array<PlanetObject>`, `i18n: Object`
- Produces: `ProximityDetector` with `check(rocketPosition): PlanetEvent | null`, `onEnter: (planet) => void`, `onLeave: (planet) => void`.

- [ ] **Step 1: Implement Orbit Proximity Calculation**
  - Distance check: `dist = rocketPosition.distanceTo(planet.position)`.
  - Trigger zones:
    - `dist <= 48`: Enter gravity orbit -> `onPlanetEnter(planet)`.
    - `dist >= 62`: Leave gravity orbit -> `onPlanetLeave(planet)`.
  - Hysteresis buffer (`48` vs `62`) prevents jittering at the boundary.

- [ ] **Step 2: Add Exploration Texts to `src/config/i18n.js`**
  - Add `exploration` keys to `en`, `id`, `ja`:
    - Button: `btnExplore: 'EXPLORATION MODE'`, `btnExit: 'EXIT TO STORY'`.
    - Controls hint: `controlsHint: 'W/A/S/D or Mouse to Steer • Click/W to Thrust • Space for Boost'`.
    - Planet titles & action buttons: `breakOrbit: 'BREAK ORBIT'`, `viewDossier: 'VIEW FULL DOSSIER'`.
    - Distance label: `distanceUnit: 'KM'`.

- [ ] **Step 3: Verification**
  - Verify `getI18n()` returns valid exploration strings across all three languages.

---

### Task 4: 3D Radar Compass & Exploration HUD Overlay

**Files:**
- Create: `src/components/FlightHUD.js`
- Modify: `src/components/UIOverlay.js`
- Modify: `src/style.css`

**Interfaces:**
- Consumes: `FlightState`, `PlanetList`, `CurrentLang`
- Produces: `FlightHUD` with `render()`, `update(flightData, activePlanet)`, `show()`, `hide()`.

- [ ] **Step 1: Create HUD Elements in `src/components/FlightHUD.js`**
  - **3D Radar Compass (`.flight-radar`):**
    - Circular radar display showing green blips for all 5 planets positioned relative to rocket heading.
    - Active target indicator showing name and distance in KM.
  - **Speedometer & Throttle Gauge (`.flight-speedometer`):**
    - Digital Mach meter showing `Mach 0.0` to `Mach 14.2`.
    - Thruster flame status bar.
  - **Controls Legend Pill (`.flight-controls-legend`):**
    - Compact cyber pill: `[MOUSE / WASD] STEER • [CLICK / W] THRUST • [SPACE] BOOST`.
  - **Holographic Planet Card (`.planet-hologram-card`):**
    - Floating cyber-dossier showing Planet Badge, Planet Name, Summary, Key Highlights, and "Open Details" action.

- [ ] **Step 2: Add CSS Styles in `src/style.css`**
  - Radar circle with rotating radar sweep line animation.
  - Hologram scanline and neon cyan glow (`rgba(56, 189, 248, 0.2)`).
  - Responsive layout for tablet and mobile screens.

- [ ] **Step 3: Verification**
  - Check HTML markup rendering and verify styles in `style.css`.

---

### Task 5: Exploration Manager & Mode Transitions

**Files:**
- Create: `src/core/ExplorationManager.js`
- Modify: `src/main.js:10-90`

**Interfaces:**
- Consumes: `SceneManager`, `ScrollController`, `UIOverlay`, `Rocket`
- Produces: `ExplorationManager` with `enterExplorationMode()`, `exitExplorationMode()`, `update(delta)`.

- [ ] **Step 1: Implement Mode State Machine in `src/core/ExplorationManager.js`**
  - `isExplorationMode: boolean = false`.
  - `enterExplorationMode()`:
    1. Lock page scroll (`document.body.style.overflow = 'hidden'`).
    2. Hide standard story cards with GSAP fade out.
    3. Enable `PlanetaryScene` (`planetaryScene.setVisible(true)`).
    4. Animate camera smoothly from current scroll position to third-person chase camera behind the rocket (`gsap.to(camera.position, { duration: 1.5, ... })`).
    5. Activate `FlightController` and `FlightHUD`.
  - `exitExplorationMode()`:
    1. Deactivate `FlightController` and hide `FlightHUD`.
    2. Animate camera and rocket smoothly back to the last Story Mode position.
    3. Hide `PlanetaryScene`.
    4. Restore story sections and unlock page scrolling.

- [ ] **Step 2: Add HUD Toggle Button in `src/components/UIOverlay.js`**
  - Add `[ 🛸 PLANETARY EXPLORE ]` button into `.hud-controls` header.
  - Add click event listener to invoke `explorationManager.enterExplorationMode()`.

- [ ] **Step 3: Connect into Main Animation Loop (`src/main.js`)**
  - In `App.animate()`:
    - If `isExplorationMode`: route update to `explorationManager.update(delta)`.
    - Else: continue normal `scrollController.update(delta)`.

- [ ] **Step 4: Verification**
  - Test building with `bun run build`. Verify smooth switching back and forth without console errors.

---

### Task 6: Build Verification, Mirror Sync, and Netlify Deployment

**Files:**
- Modify: `G:\Codingan\Portofolio\firdaus-landing` (Sync all files)

**Interfaces:**
- Produces: Successful production build on Netlify via `https://github.com/Mocca130604/firdaus-landing.git`.

- [ ] **Step 1: Local Production Build Test**
  - Run `bun run build` in `portofolio-treejs`. Verify zero build errors and clean bundle size.

- [ ] **Step 2: Sync to Mirror Repository**
  - Copy updated files to `G:\Codingan\Portofolio\firdaus-landing`.
  - Verify build in mirror repository with `bun run build`.

- [ ] **Step 3: Git Commit & Push**
  - Commit message: `feat(exploration): add 3D planetary exploration mode with dual mouse & WASD controls`
  - Push branch `main` to `https://github.com/Mocca130604/firdaus-landing.git`.

- [ ] **Step 4: Live Verification**
  - Inspect live website `https://firdauscode.space/` to verify CI/CD deployment success.

