import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll Controller
 * Bridges HTML scroll positions with 3D Rocket height and UI overlay triggers.
 * Also drives the Auto-Scroll (cinematic playback) mode.
 */
export class ScrollController {
  constructor(options = {}) {
    this.onProgressUpdate = options.onProgressUpdate || (() => {});
    this.onStageChange    = options.onStageChange    || (() => {});
    this.onShake          = options.onShake          || (() => {});

    this.progress      = 0;
    this.targetProgress = 0;
    this.scrollVelocity = 0;
    this.lastScrollY   = 0;
    this.lastTime      = performance.now();

    this.maxRocketY = 370; // Height of Lunar Landing Pad in 3D world units
    this.currentStageIndex = 0;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Auto-Scroll state ──────────────────────────────────────────────────────
    // speed = progress-units per millisecond → full trip in ~90 s at 1× speed
    this._auto = {
      active:    false,
      speed:     0.00018,
      lastTs:    null,
    };

    this.stages = [
      { id: 'hero',       name: 'LAUNCH PAD // YOKOHAMA',          minProgress: 0,    maxProgress: 0.14, km: 0,      velocity: 'Mach 0' },
      { id: 'about',      name: 'ASCENT & TROPOSPHERE',            minProgress: 0.14, maxProgress: 0.32, km: 120,    velocity: 'Mach 6.2' },
      { id: 'skills',     name: 'ORBITAL CHECKPOINT // SKILLS',    minProgress: 0.32, maxProgress: 0.52, km: 450,    velocity: '7.8 km/s' },
      { id: 'projects',   name: 'DEEP SPACE DOSSIER // PROJECTS',  minProgress: 0.52, maxProgress: 0.74, km: 180000, velocity: '10.9 km/s' },
      { id: 'experience', name: 'FLIGHT STAGES // TIMELINE',       minProgress: 0.74, maxProgress: 0.90, km: 320000, velocity: '6.4 km/s' },
      { id: 'contact',    name: 'LUNAR BASE // MISSION COMPLETE',  minProgress: 0.90, maxProgress: 1.0,  km: 384400, velocity: 'Touchdown' }
    ];

    this.initScroll();
    this._initAutoScrollButton();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //  Manual Scroll
  // ─────────────────────────────────────────────────────────────────────────────

  initScroll() {
    const sync = () => this.handleScroll();
    window.addEventListener('scroll',    sync, { passive: true });
    document.addEventListener('scroll',  sync, { passive: true });
    window.addEventListener('resize',    sync, { passive: true });
    window.addEventListener('wheel',     sync, { passive: true });
    window.addEventListener('touchmove', sync, { passive: true });

    // Any manual scroll input while auto-scroll is running → pause it
    const pauseOnManual = () => {
      if (this._auto.active) this.stopAutoScroll();
    };
    window.addEventListener('wheel',     pauseOnManual, { passive: true });
    window.addEventListener('touchstart', pauseOnManual, { passive: true });
    window.addEventListener('keydown', (e) => {
      const scrollKeys = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '];
      if (scrollKeys.includes(e.key)) pauseOnManual();
    });

    setTimeout(() => this.handleScroll(), 50);
  }

  handleScroll() {
    if (this._auto.active) return; // auto mode drives scroll position directly

    const scrollY = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop
      || 0;

    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight
    );
    const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    const docHeight    = scrollHeight - clientHeight;
    const rawProgress  = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

    const now = performance.now();
    const dt  = (now - this.lastTime) || 16;
    const dy  = scrollY - this.lastScrollY;

    this.scrollVelocity  = (dy / dt) * 15;
    this.targetProgress  = rawProgress;
    this.lastScrollY     = scrollY;
    this.lastTime        = now;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //  Auto-Scroll (Cinematic Mode)
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Inject the auto-scroll play/pause button into the HUD.
   * Called once from the constructor; waits for DOM to be ready via rAF.
   */
  _initAutoScrollButton() {
    const inject = () => {
      // Try to attach after UIOverlay has built the DOM
      const controls = document.querySelector('.hud-controls');
      if (!controls) {
        // DOM not ready yet — retry next frame
        requestAnimationFrame(inject);
        return;
      }

      // Avoid double-inject (HMR)
      if (document.getElementById('btn-autoscroll')) return;

      const btn = document.createElement('button');
      btn.id = 'btn-autoscroll';
      btn.className = 'hud-btn autoscroll-btn';
      btn.setAttribute('aria-label', 'Toggle Auto-Scroll Cinematic Mode');
      btn.setAttribute('title', 'Auto-Scroll: plays the full journey automatically');
      btn.innerHTML = `<span class="autoscroll-icon">▶</span><span class="autoscroll-label">AUTO</span>`;

      btn.addEventListener('click', () => this.toggleAutoScroll());

      // Insert before the audio button
      controls.insertBefore(btn, controls.firstChild);
    };

    requestAnimationFrame(inject);
  }

  /** Toggle between play and pause */
  toggleAutoScroll() {
    if (this._auto.active) {
      this.stopAutoScroll();
    } else {
      // If we're at the end, restart from zero
      if (this.targetProgress >= 0.99) {
        this._scrollPageTo(0);
        this.targetProgress = 0;
        this.progress = 0;
      }
      this.startAutoScroll();
    }
  }

  startAutoScroll() {
    this._auto.active = true;
    this._auto.lastTs  = null;
    this._updateAutoBtn(true);

    // Drive via rAF loop independent of the main render loop
    const tick = (ts) => {
      if (!this._auto.active) return;

      if (this._auto.lastTs === null) this._auto.lastTs = ts;
      const dt = ts - this._auto.lastTs;
      this._auto.lastTs = ts;

      this.targetProgress = Math.min(1, this.targetProgress + this._auto.speed * dt);

      // Sync the real page scroll so section IntersectionObserver etc. still fire
      this._syncPageScroll();

      // Auto-stop at the end
      if (this.targetProgress >= 1) {
        this.targetProgress = 1;
        this.stopAutoScroll();
        return;
      }

      this._auto.raf = requestAnimationFrame(tick);
    };

    this._auto.raf = requestAnimationFrame(tick);
  }

  stopAutoScroll() {
    this._auto.active = false;
    if (this._auto.raf) {
      cancelAnimationFrame(this._auto.raf);
      this._auto.raf = null;
    }
    this._updateAutoBtn(false);
  }

  /** Silently push window.scrollY to match current targetProgress (keeps other scroll listeners in sync) */
  _syncPageScroll() {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const docHeight   = scrollHeight - (window.innerHeight || 1);
    const targetScrollY = this.targetProgress * docHeight;

    // Use scrollTo without behavior so it's instant & doesn't re-trigger handleScroll meaningfully
    window.scrollTo(0, targetScrollY);
  }

  _scrollPageTo(progress) {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const docHeight = scrollHeight - (window.innerHeight || 1);
    window.scrollTo(0, progress * docHeight);
  }

  _updateAutoBtn(isPlaying) {
    const btn  = document.getElementById('btn-autoscroll');
    if (!btn) return;
    const icon  = btn.querySelector('.autoscroll-icon');
    const label = btn.querySelector('.autoscroll-label');
    if (icon)  icon.textContent  = isPlaying ? '⏸' : '▶';
    if (label) label.textContent = isPlaying ? 'PAUSE' : 'AUTO';
    btn.classList.toggle('autoscroll-active', isPlaying);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //  Main update loop (called from App.animate)
  // ─────────────────────────────────────────────────────────────────────────────

  update(delta) {
    // In manual mode, re-read scroll position each frame
    if (!this._auto.active) {
      this.handleScroll();
    }

    // Smooth lerp towards target
    const lerpSpeed = this.prefersReducedMotion ? 0.35 : 0.12;
    this.progress += (this.targetProgress - this.progress) * lerpSpeed;

    // Smooth velocity decay
    this.scrollVelocity *= 0.88;

    // Calculate current Rocket Y in 3D world
    const rocketY = this.progress * this.maxRocketY;

    // Determine current Stage & Telemetry
    const currentStage = this.getStageForProgress(this.progress);

    // Camera shake during initial launch thrust (0.02 to 0.16)
    if (this.progress > 0.02 && this.progress < 0.16 && Math.abs(this.scrollVelocity) > 0.3) {
      this.onShake(0.18 + Math.min(0.35, Math.abs(this.scrollVelocity) * 0.03));
    }

    // Broadcast update to App, SceneManager, UIOverlay
    this.onProgressUpdate({
      progress:        this.progress,
      rocketY:         rocketY,
      scrollVelocity:  this.scrollVelocity,
      stage:           currentStage,
      altitudeKm:      Math.round(this.calculateAltitudeKm(this.progress)),
      velocityDisplay: this.calculateVelocityDisplay(this.progress)
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //  Helpers
  // ─────────────────────────────────────────────────────────────────────────────

  getStageForProgress(p) {
    for (let i = 0; i < this.stages.length; i++) {
      const s = this.stages[i];
      if (p >= s.minProgress && p <= s.maxProgress) {
        if (i !== this.currentStageIndex) {
          this.currentStageIndex = i;
          this.onStageChange(s);
        }
        return s;
      }
    }
    return this.stages[this.stages.length - 1];
  }

  calculateAltitudeKm(p) {
    if (p < 0.15) {
      return (p / 0.15) * 80;
    } else if (p < 0.4) {
      return 80 + Math.pow((p - 0.15) / 0.25, 1.8) * 920;
    } else {
      return 1000 + Math.pow((p - 0.4) / 0.6, 2.2) * 383400;
    }
  }

  calculateVelocityDisplay(p) {
    if (p < 0.02) return 'Mach 0 (Pre-Launch)';
    if (p < 0.1)  return 'Mach 2.4 (Ascending)';
    if (p < 0.25) return 'Mach 9.8 (Hypersonic)';
    if (p < 0.45) return '7.8 km/s (Orbital)';
    if (p < 0.8)  return '11.2 km/s (Lunar Transit)';
    if (p < 0.95) return '1.6 km/s (Lunar Descent)';
    return '0 km/s (Touchdown)';
  }

  scrollToSection(sectionId) {
    // Stop auto-scroll when user clicks nav
    this.stopAutoScroll();

    const secEl = document.getElementById('sec-' + sectionId);
    if (secEl) {
      secEl.scrollIntoView({
        behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center'
      });
      return;
    }

    const targetMap = {
      hero:       0.0,
      about:      0.20,
      skills:     0.40,
      projects:   0.62,
      experience: 0.82,
      contact:    0.98
    };

    const targetP  = targetMap[sectionId] ?? 0;
    this._scrollPageTo(targetP);
    this.targetProgress = targetP;
  }
}
