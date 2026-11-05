import * as THREE from 'three';
import { gsap } from 'gsap';
import { FlightController } from './FlightController.js';
import { ProximityDetector } from './ProximityDetector.js';
import { FlightHUD } from '../components/FlightHUD.js';
import { audioSynth } from '../config/audioSynth.js';

/**
 * Exploration Manager
 * State machine and coordinator for Planetary Exploration Mode.
 */
export class ExplorationManager {
  constructor(options = {}) {
    this.sceneManager = options.sceneManager;
    this.scrollController = options.scrollController;
    this.uiOverlay = options.uiOverlay;
    this.rocket = options.rocket;
    this.planetaryScene = options.planetaryScene;
    this.particleSystem = options.particleSystem;

    this.isExplorationMode = false;

    // Saved state for smooth restoration
    this.savedCameraPos = new THREE.Vector3();
    this.savedRocketPos = new THREE.Vector3();
    this.savedRocketRot = new THREE.Euler();

    // Flight Subsystems
    this.flightController = new FlightController({
      rocket: this.rocket,
      camera: this.sceneManager.camera,
      particleSystem: this.particleSystem,
    });

    this.proximityDetector = new ProximityDetector({
      planets: this.planetaryScene.planets,
      onEnter: (planet) => this.handlePlanetEnter(planet),
      onLeave: (planet) => this.handlePlanetLeave(planet),
    });

    this.flightHUD = new FlightHUD({
      onExit: () => this.exitExplorationMode(),
      onBreakOrbit: () => this.breakOrbit(),
      onViewDossier: (planet) => this.viewDossier(planet),
    });
  }

  enterExplorationMode() {
    if (this.isExplorationMode) return;
    this.isExplorationMode = true;

    // Stop standard auto-scroll if active
    if (this.scrollController?.stopAutoScroll) {
      this.scrollController.stopAutoScroll();
    }

    // Save story mode camera and rocket transform
    this.savedCameraPos.copy(this.sceneManager.camera.position);
    this.savedRocketPos.copy(this.rocket.group.position);
    this.savedRocketRot.copy(this.rocket.group.rotation);

    // Disable page scrolling
    document.body.style.overflow = 'hidden';

    // Fade out story scroll container and altitude bar
    const storyContainer = document.querySelector('.story-scroll-container');
    const altBar = document.querySelector('.hud-altitude-bar');
    const bottomBar = document.querySelector('.hud-bottom');
    const navPills = document.querySelector('.hud-nav-pills');

    if (storyContainer) {
      storyContainer.style.transition = 'opacity 0.6s ease';
      storyContainer.style.opacity = '0';
      storyContainer.style.pointerEvents = 'none';
    }
    if (altBar) {
      altBar.style.transition = 'opacity 0.4s ease';
      altBar.style.opacity = '0';
      altBar.style.pointerEvents = 'none';
    }
    if (bottomBar) {
      bottomBar.style.transition = 'opacity 0.4s ease';
      bottomBar.style.opacity = '0';
      bottomBar.style.pointerEvents = 'none';
    }
    if (navPills) {
      navPills.style.transition = 'opacity 0.4s ease';
      navPills.style.opacity = '0';
      navPills.style.pointerEvents = 'none';
    }

    // Enable Planetary Scene
    this.planetaryScene.setVisible(true);

    // Starting exploration position
    const startPos = new THREE.Vector3(0, 20, -50);
    this.rocket.group.position.copy(startPos);
    this.rocket.group.rotation.set(0, 0, 0);

    // Smooth camera transition into flight chase position
    const targetCamPos = new THREE.Vector3(0, 30, -22);
    gsap.to(this.sceneManager.camera.position, {
      x: targetCamPos.x,
      y: targetCamPos.y,
      z: targetCamPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.flightController.enable(startPos);
        this.flightHUD.show();
        audioSynth.playStageChime();
      },
    });

    // Update HUD toggle button active state
    const exploreBtn = document.getElementById('btn-planetary-explore');
    if (exploreBtn) exploreBtn.classList.add('active');
  }

  exitExplorationMode() {
    if (!this.isExplorationMode) return;
    this.isExplorationMode = false;

    // Disable flight input & hide flight HUD
    this.flightController.disable();
    this.flightHUD.hide();
    this.proximityDetector.reset();

    // Hide Planetary Scene
    this.planetaryScene.setVisible(false);

    // Re-enable page scrolling
    document.body.style.overflow = '';

    // Animate camera and rocket back to saved story position
    gsap.to(this.sceneManager.camera.position, {
      x: this.savedCameraPos.x,
      y: this.savedCameraPos.y,
      z: this.savedCameraPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    gsap.to(this.rocket.group.position, {
      x: this.savedRocketPos.x,
      y: this.savedRocketPos.y,
      z: this.savedRocketPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.rocket.group.rotation.copy(this.savedRocketRot);
      },
    });

    // Restore story scroll container and telemetry HUDs
    const storyContainer = document.querySelector('.story-scroll-container');
    const altBar = document.querySelector('.hud-altitude-bar');
    const bottomBar = document.querySelector('.hud-bottom');
    const navPills = document.querySelector('.hud-nav-pills');

    if (storyContainer) {
      storyContainer.style.opacity = '1';
      storyContainer.style.pointerEvents = 'auto';
    }
    if (altBar) {
      altBar.style.opacity = '1';
      altBar.style.pointerEvents = 'auto';
    }
    if (bottomBar) {
      bottomBar.style.opacity = '1';
      bottomBar.style.pointerEvents = 'auto';
    }
    if (navPills) {
      navPills.style.opacity = '1';
      navPills.style.pointerEvents = 'auto';
    }

    // Update HUD toggle button active state
    const exploreBtn = document.getElementById('btn-planetary-explore');
    if (exploreBtn) exploreBtn.classList.remove('active');
  }

  breakOrbit() {
    if (!this.isExplorationMode) return;
    // Apply forward turbo burst to escape gravity
    this.flightController.keys.boost = true;
    this.flightController.keys.forward = true;
    setTimeout(() => {
      this.flightController.keys.boost = false;
    }, 1200);
  }

  viewDossier(planet) {
    if (!planet) return;
    // Map planet id to story section
    const sectionMap = {
      about: 'about',
      skills: 'skills',
      experience: 'experience',
      projects: 'projects',
      contact: 'contact',
    };

    const targetSection = sectionMap[planet.id] || 'hero';
    this.exitExplorationMode();

    setTimeout(() => {
      if (this.scrollController?.scrollToSection) {
        this.scrollController.scrollToSection(targetSection);
      }
    }, 300);
  }

  handlePlanetEnter(planet) {
    audioSynth.playBeep(780, 0.08);
  }

  handlePlanetLeave(planet) {
    // Left orbit
  }

  update(delta) {
    if (!this.isExplorationMode) return;

    // 1. Update Planetary Scene animations
    this.planetaryScene.update(delta);

    // 2. Update Flight Controller physics & inputs
    const flightData = this.flightController.update(delta);

    // 3. Update Proximity Detector
    let proximityData = null;
    if (flightData) {
      proximityData = this.proximityDetector.update(flightData.position);
    }

    // 4. Update Flight HUD (radar, speedometer, hologram)
    this.flightHUD.update({
      flightData,
      proximityData,
      planets: this.planetaryScene.planets,
      rocketYaw: this.flightController.yaw,
    });
  }
}
