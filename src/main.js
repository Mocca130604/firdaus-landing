import * as THREE from 'three';
import { SceneManager } from './core/SceneManager.js';
import { Lighting } from './core/Lighting.js';
import { ScrollController } from './core/ScrollController.js';
import { EarthJapanScene } from './scenes/EarthJapanScene.js';
import { AtmosphereScene } from './scenes/AtmosphereScene.js';
import { SpaceScene } from './scenes/SpaceScene.js';
import { MoonScene } from './scenes/MoonScene.js';
import { Rocket } from './components/Rocket.js';
import { ParticleSystem } from './components/ParticleSystem.js';
import { UIOverlay } from './components/UIOverlay.js';
import { audioSynth } from './config/audioSynth.js';

class App {
  constructor() {
    this.container = document.getElementById('webgl-container');
    this.clock = new THREE.Clock();

    this.sceneManager = null;
    this.lighting = null;
    this.rocket = null;
    this.particleSystem = null;
    this.scrollController = null;
    this.uiOverlay = null;

    // Scenes
    this.earthJapan = null;
    this.atmosphere = null;
    this.space = null;
    this.moon = null;

    this.currentRocketY = 0;
    this.currentScrollProgress = 0;
    this.currentScrollVelocity = 0;

    this.init();
  }

  init() {
    // 1. Core Scene & Lighting
    this.sceneManager = new SceneManager(this.container);
    this.lighting = new Lighting(this.sceneManager.scene);

    // 2. Add Environment Scenes
    this.earthJapan = new EarthJapanScene();
    this.sceneManager.scene.add(this.earthJapan.group);

    this.atmosphere = new AtmosphereScene();
    this.sceneManager.scene.add(this.atmosphere.group);

    this.space = new SpaceScene();
    this.sceneManager.scene.add(this.space.group);

    this.moon = new MoonScene();
    this.sceneManager.scene.add(this.moon.group);

    // 3. Rocket Component
    this.rocket = new Rocket();
    this.sceneManager.scene.add(this.rocket.group);

    // 4. Particle System (Thruster Fire, Smoke, Sakura Petals)
    this.particleSystem = new ParticleSystem(
      this.sceneManager.scene,
      this.sceneManager.isMobile
    );

    // 5. Scroll Controller
    this.scrollController = new ScrollController({
      onProgressUpdate: (data) => this.handleProgressUpdate(data),
      onStageChange: (stage) => this.handleStageChange(stage),
      onShake: (intensity) => this.sceneManager.triggerCameraShake(intensity)
    });

    // 6. UI Overlay
    this.uiOverlay = new UIOverlay(this.scrollController);

    // 7. Loading Screen & Countdown
    this.handleLoadingSequence();

    // 8. Start Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  handleLoadingSequence() {
    const loadingScreen = document.getElementById('loading-screen');
    const countdownEl = document.getElementById('countdown-display');
    const progressFill = document.getElementById('loading-progress-fill');
    const btnInit = document.getElementById('btn-init-flight');

    let dismissed = false;
    const dismissLoading = () => {
      if (dismissed) return;
      dismissed = true;
      clearInterval(interval);
      audioSynth.init();
      audioSynth.playStageChime();
      if (loadingScreen) loadingScreen.classList.add('hidden');
    };

    if (btnInit) {
      btnInit.classList.add('ready');
      btnInit.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissLoading();
      });
    }

    if (loadingScreen) {
      loadingScreen.addEventListener('click', dismissLoading);
    }

    const onUserScroll = () => {
      dismissLoading();
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('keydown', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
    };
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('keydown', onUserScroll, { passive: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true });

    let count = 3;
    let progress = 0;

    const interval = setInterval(() => {
      if (dismissed) {
        clearInterval(interval);
        return;
      }
      progress += 25;
      if (progressFill) progressFill.style.width = `${progress}%`;

      if (count > 1) {
        count--;
        if (countdownEl) countdownEl.textContent = count;
      } else {
        clearInterval(interval);
        if (countdownEl) {
          countdownEl.textContent = 'IGNITION';
          countdownEl.style.fontSize = '2.5rem';
          countdownEl.style.color = '#2ed573';
        }
        if (progressFill) progressFill.style.width = '100%';
        // Auto-dismiss 800ms after ignition if not yet clicked
        setTimeout(() => {
          dismissLoading();
        }, 800);
      }
    }, 500);
  }

  handleProgressUpdate(data) {
    this.currentScrollProgress = data.progress;
    this.currentRocketY = data.rocketY;
    this.currentScrollVelocity = data.scrollVelocity;

    // Update UI HUD
    this.uiOverlay.updateTelemetry(data);

    // Update Audio engine thrust & frequency
    const thrustAmount = Math.min(1.0, Math.abs(data.scrollVelocity) * 0.15 + (data.progress > 0.02 && data.progress < 0.95 ? 0.35 : 0.05));
    audioSynth.updateEngineThrust(thrustAmount, data.progress);
  }

  handleStageChange(stage) {
    audioSynth.playBeep(740, 0.08);
  }

  animate() {
    requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);

    // Update Scroll Controller
    this.scrollController.update(delta);

    // Update Rocket position
    this.rocket.group.position.y = this.currentRocketY;
    this.rocket.update(this.currentScrollProgress, this.currentScrollVelocity, delta);

    // Update Camera tracking
    this.sceneManager.updateCamera(this.rocket.group.position, this.currentScrollVelocity, delta);

    // Update Sky & Lighting
    this.sceneManager.updateSkyGradient(this.currentScrollProgress);
    this.lighting.update(this.currentScrollProgress, this.sceneManager.camera.position.y);

    // Update Thruster & Sakura Particles
    const nozzlePositions = this.rocket.getThrusterWorldPositions();
    const thrustIntensity = Math.min(1.2, 0.4 + Math.abs(this.currentScrollVelocity) * 0.2);
    this.particleSystem.update(delta, nozzlePositions, thrustIntensity, this.currentRocketY);

    // Update Environment Scenes
    this.atmosphere.update(delta);
    this.space.update(delta);
    this.moon.update(delta);

    // Render Scene with Post-Processing Bloom
    this.sceneManager.render();
  }
}

// Start Application on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  new App();
});

