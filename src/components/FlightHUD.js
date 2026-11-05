import { getI18n, getCurrentLang } from '../config/i18n.js';
import { audioSynth } from '../config/audioSynth.js';

/**
 * Flight HUD Component
 * Displays 3D Radar Compass, Speedometer, Control Hints, and Floating Planet Hologram Dossiers.
 */
export class FlightHUD {
  constructor(options = {}) {
    this.container = null;
    this.onExit = options.onExit || (() => {});
    this.onBreakOrbit = options.onBreakOrbit || (() => {});
    this.onTargetPlanet = options.onTargetPlanet || (() => {});
    this.onViewDossier = options.onViewDossier || (() => {});

    this.activePlanet = null;
    this.visible = false;

    this.initDOM();
  }

  initDOM() {
    this.container = document.createElement('div');
    this.container.id = 'flight-hud-overlay';
    this.container.className = 'flight-hud-container';
    this.container.style.display = 'none';

    document.body.appendChild(this.container);
    this.render();
  }

  render() {
    const lang = getCurrentLang();
    const t = getI18n(lang).exploration;

    this.container.innerHTML = `
      <!-- TOP EXPLORATION STATUS BAR -->
      <div class="flight-top-bar">
        <div class="flight-status-badge" id="flight-status-badge">
          <span class="status-dot"></span>
          <span class="status-text" id="flight-status-text">${t.cruisingStatus}</span>
        </div>

        <div class="flight-controls-hint hide-mobile">
          <span class="hint-icon">🎮</span>
          <span class="hint-text">${t.controlsHint}</span>
        </div>

        <button class="flight-btn-exit" id="btn-exit-exploration" title="Return to Story Scroll">
          <span>${t.btnExit}</span>
        </button>
      </div>

      <!-- BOTTOM-LEFT 3D SECTOR RADAR -->
      <div class="flight-radar-panel">
        <div class="radar-header">
          <span class="radar-title">${t.radarTitle}</span>
          <span class="radar-range">500 KM</span>
        </div>
        <div class="radar-scope" id="radar-scope">
          <div class="radar-sweep"></div>
          <div class="radar-ring ring-1"></div>
          <div class="radar-ring ring-2"></div>
          <div class="radar-cross-h"></div>
          <div class="radar-cross-v"></div>
          <div class="radar-center-ship">▲</div>
          <div class="radar-blips" id="radar-blips"></div>
        </div>
      </div>

      <!-- BOTTOM-RIGHT SPEEDOMETER & TELEMETRY -->
      <div class="flight-speed-panel">
        <div class="speed-label">VELOCITY</div>
        <div class="speed-value" id="flight-speed-mach">Mach 0.0</div>
        <div class="throttle-bar-container">
          <div class="throttle-fill" id="flight-throttle-fill"></div>
        </div>
      </div>

      <!-- FLOATING ORBITAL HOLOGRAM DOSSIER CARD -->
      <div class="planet-hologram-card" id="planet-hologram-card" style="display: none;">
        <div class="holo-header">
          <div class="holo-badge" id="holo-badge">PLANET ARSENAL</div>
          <button class="holo-close-btn" id="btn-holo-close">✕</button>
        </div>
        <h3 class="holo-title" id="holo-title">Planet Title</h3>
        <p class="holo-desc" id="holo-desc">Planet Description</p>
        <div class="holo-actions">
          <button class="btn-primary btn-sm" id="btn-holo-view-dossier">
            <span>${t.viewDossier}</span>
            <span>📖</span>
          </button>
          <button class="btn-secondary btn-sm" id="btn-holo-break-orbit">
            <span>${t.breakOrbit}</span>
            <span>⚡</span>
          </button>
        </div>
      </div>
    `;

    // Bind event listeners
    const btnExit = this.container.querySelector('#btn-exit-exploration');
    if (btnExit) {
      btnExit.addEventListener('click', () => {
        audioSynth.playStageChime();
        this.onExit();
      });
    }

    const btnCloseHolo = this.container.querySelector('#btn-holo-close');
    const btnBreak = this.container.querySelector('#btn-holo-break-orbit');
    if (btnCloseHolo) {
      btnCloseHolo.addEventListener('click', () => this.hideHologram());
    }
    if (btnBreak) {
      btnBreak.addEventListener('click', () => {
        audioSynth.playBeep(700, 0.06);
        this.hideHologram();
        this.onBreakOrbit();
      });
    }

    const btnViewDossier = this.container.querySelector('#btn-holo-view-dossier');
    if (btnViewDossier) {
      btnViewDossier.addEventListener('click', () => {
        audioSynth.playBeep(880, 0.08);
        if (this.activePlanet) {
          this.onViewDossier(this.activePlanet);
        }
      });
    }
  }

  show() {
    this.visible = true;
    this.container.style.display = 'block';
    this.render();
  }

  hide() {
    this.visible = false;
    this.container.style.display = 'none';
    this.hideHologram();
  }

  showHologram(planet) {
    this.activePlanet = planet;
    const holoEl = document.getElementById('planet-hologram-card');
    const badgeEl = document.getElementById('holo-badge');
    const titleEl = document.getElementById('holo-title');
    const descEl = document.getElementById('holo-desc');

    if (!holoEl || !planet) return;

    const lang = getCurrentLang();
    const t = getI18n(lang).exploration;
    const pInfo = t.planets[planet.id] || { name: planet.name, sub: planet.sub, desc: '' };

    if (badgeEl) badgeEl.textContent = pInfo.sub;
    if (titleEl) titleEl.textContent = pInfo.name;
    if (descEl) descEl.textContent = pInfo.desc;

    holoEl.style.display = 'block';
    holoEl.classList.add('holo-glow-in');

    const statusText = document.getElementById('flight-status-text');
    if (statusText) {
      statusText.textContent = `${t.orbitStatus}: ${pInfo.name}`;
      statusText.style.color = '#38bdf8';
    }
  }

  hideHologram() {
    this.activePlanet = null;
    const holoEl = document.getElementById('planet-hologram-card');
    if (holoEl) {
      holoEl.style.display = 'none';
      holoEl.classList.remove('holo-glow-in');
    }

    const lang = getCurrentLang();
    const t = getI18n(lang).exploration;
    const statusText = document.getElementById('flight-status-text');
    if (statusText) {
      statusText.textContent = t.cruisingStatus;
      statusText.style.color = '#e2e8f0';
    }
  }

  update({ flightData, proximityData, planets, rocketYaw }) {
    if (!this.visible || !flightData) return;

    // 1. Update Speedometer
    const speedEl = document.getElementById('flight-speed-mach');
    const throttleEl = document.getElementById('flight-throttle-fill');
    if (speedEl) speedEl.textContent = flightData.speedMach;
    if (throttleEl) {
      const pct = Math.min(100, Math.round((flightData.speed / 64) * 100));
      throttleEl.style.width = `${pct}%`;
      throttleEl.style.background = flightData.isBoosting
        ? 'linear-gradient(90deg, #38bdf8, #2ed573)'
        : 'linear-gradient(90deg, #e63946, #38bdf8)';
    }

    // 2. Update Proximity Hologram
    if (proximityData?.activePlanet) {
      if (!this.activePlanet || this.activePlanet.id !== proximityData.activePlanet.id) {
        this.showHologram(proximityData.activePlanet);
      }
    } else if (this.activePlanet) {
      this.hideHologram();
    }

    // 3. Update Radar Blips
    const blipsContainer = document.getElementById('radar-blips');
    if (blipsContainer && planets && planets.length) {
      const rPos = flightData.position;
      const maxRange = 500;
      const scopeRadius = 60; // Pixels from radar center

      let html = '';
      for (const p of planets) {
        // Delta in X and Z
        const dx = p.position.x - rPos.x;
        const dz = p.position.z - rPos.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        // Angle relative to world, then subtract rocket yaw
        const angle = Math.atan2(dx, dz) - (rocketYaw || 0);

        const normalizedDist = Math.min(dist / maxRange, 1.0);
        const bx = Math.sin(angle) * (normalizedDist * scopeRadius) + scopeRadius;
        const by = Math.cos(angle) * (normalizedDist * scopeRadius) + scopeRadius;

        const isTarget = proximityData?.activePlanet?.id === p.id;
        const pColor = isTarget ? '#2ed573' : (p.id === 'contact' ? '#e2e8f0' : (p.id === 'about' ? '#38bdf8' : (p.id === 'skills' ? '#f59e0b' : '#e63946')));

        html += `
          <div class="radar-blip ${isTarget ? 'blip-target' : ''}" style="left: ${bx}px; top: ${by}px; background-color: ${pColor};" title="${p.name} (${Math.round(dist)} KM)"></div>
        `;
      }
      blipsContainer.innerHTML = html;
    }
  }

  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
