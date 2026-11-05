import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/**
 * Core Scene, Camera, Renderer, and Post-Processing Manager
 */
export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = window.innerWidth < 768;

    // Camera shake intensity
    this.shakeIntensity = 0;

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initPostProcessing();
    this.initResize();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f1523); // Refined dark twilight slate
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.isMobile ? 55 : 45,
      this.width / this.height,
      0.1,
      800
    );
    // Initial camera position at Japan launchpad, framing rocket and Fuji in background
    this.camera.position.set(0, 7.5, 22);
    this.cameraTarget = new THREE.Vector3(0, 6.0, 0);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: !this.isMobile,
      stencil: false,
      depth: true
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = !this.isMobile;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }

  initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);

    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Subtle bloom for engine flames, city lights, and stars
    const bloomResolution = new THREE.Vector2(this.width, this.height);
    this.bloomPass = new UnrealBloomPass(
      bloomResolution,
      this.isMobile ? 0.45 : 0.75, // strength
      0.4,                         // radius
      0.82                         // threshold
    );
    this.composer.addPass(this.bloomPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);
  }

  triggerCameraShake(intensity = 0.4) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }

  updateSkyGradient(progress) {
    // Dynamic cohesive Sky color interpolation: Dark Slate Twilight -> Deep Navy -> Obsidian Space
    let skyColor;
    if (progress < 0.20) {
      // Twilight slate-indigo to deep navy
      const t = progress / 0.20;
      skyColor = new THREE.Color(0x0f1523).lerp(new THREE.Color(0x0a0f1d), t);
    } else if (progress < 0.50) {
      // Deep navy to deep space black
      const t = (progress - 0.20) / 0.30;
      skyColor = new THREE.Color(0x0a0f1d).lerp(new THREE.Color(0x04060a), t);
    } else {
      // Pure deep space obsidian
      skyColor = new THREE.Color(0x04060a);
    }

    this.scene.background.copy(skyColor);
  }

  updateCamera(targetPos, scrollVelocity, delta) {
    // Smooth camera follow vertically
    const targetCamY = targetPos.y + 6.0;

    // Dynamic horizontal framing and zoom based on stage
    // When near launch: offset camera for scenic view of Japan
    // In space: orbit slightly or dynamic distance
    let targetCamZ = this.isMobile ? 26 : 22;
    let targetCamX = 0;

    if (targetPos.y < 30) {
      // Ground view with slight angle to show pagoda and Fuji
      targetCamX = 4;
      targetCamZ = this.isMobile ? 24 : 20;
    } else if (targetPos.y > 350) {
      // Moon view: closer dramatic landing perspective
      targetCamX = 3;
      targetCamZ = 16;
    }

    // Camera follow lerp
    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.08;
    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.05;

    // Apply Camera Shake (dampens each frame)
    if (this.shakeIntensity > 0.001) {
      const shakeX = (Math.random() - 0.5) * this.shakeIntensity;
      const shakeY = (Math.random() - 0.5) * this.shakeIntensity;
      this.camera.position.x += shakeX;
      this.camera.position.y += shakeY;
      this.shakeIntensity *= 0.92; // smooth decay
    }

    // Look at rocket center
    this.cameraTarget.set(targetPos.x, targetPos.y + 3.5, targetPos.z);
    this.camera.lookAt(this.cameraTarget);
  }

  render() {
    this.composer.render();
  }

  initResize() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.isMobile = window.innerWidth < 768;

      this.camera.aspect = this.width / this.height;
      this.camera.fov = this.isMobile ? 55 : 45;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));
      this.composer.setSize(this.width, this.height);
    });
  }
}

