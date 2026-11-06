import * as THREE from 'three';
import { AnimeColors } from './AnimeStyle.js';

/**
 * Dynamic Lighting Manager
 * Tuned for Anime Cel-Shading: Crisp stepped shadows, warm sun rim, and lavender-cyan ambient fill.
 */
export class Lighting {
  constructor(scene) {
    this.scene = scene;

    // 1. Ambient Light (Anime lavender-indigo shadow tint)
    this.ambientLight = new THREE.AmbientLight(0x2d2b55, 1.1);
    this.scene.add(this.ambientLight);

    // 2. Primary Directional Sun Light (Crisp warm golden-white anime sun)
    this.sunLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    this.sunLight.position.set(-35, 55, 30);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 180;
    this.sunLight.shadow.camera.left = -40;
    this.sunLight.shadow.camera.right = 40;
    this.sunLight.shadow.camera.top = 40;
    this.sunLight.shadow.camera.bottom = -40;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // 3. Rim / Hemisphere Light (Anime sky blue zenith / warm rose horizon fill)
    this.hemiLight = new THREE.HemisphereLight(0xa5b4fc, 0x1e1b4b, 0.7);
    this.scene.add(this.hemiLight);

    // 4. Fog (Clean deep twilight atmosphere)
    this.scene.fog = new THREE.FogExp2(0x161338, 0.005);
  }

  update(progress, cameraY) {
    // Keep directional sunlight following camera vertically
    this.sunLight.position.y = cameraY + 45;
    this.sunLight.target.position.set(0, cameraY, 0);
    this.sunLight.target.updateMatrixWorld();

    if (progress < 0.25) {
      // Earth Atmosphere / Japan Launch Site (Warm anime sunset twilight)
      const t = progress / 0.25;
      this.ambientLight.color.setHex(0x2d2b55);
      this.ambientLight.intensity = 1.1 - t * 0.25;

      this.sunLight.color.setHex(0xfff5ea);
      this.sunLight.intensity = 2.2;

      // Fog transitions smoothly into deep space
      const c1 = new THREE.Color(0x161338);
      const c2 = new THREE.Color(0x04060a);
      const fogColor = c1.lerp(c2, t);
      this.scene.fog.color.copy(fogColor);
      this.scene.fog.density = 0.005 - t * 0.003;

    } else {
      // Deep Space & Lunar surface (High contrast, crisp directional illumination)
      this.ambientLight.color.setHex(0x181e36);
      this.ambientLight.intensity = 0.6;

      this.sunLight.color.setHex(0xffffff);
      this.sunLight.intensity = 2.4;

      this.scene.fog.color.setHex(0x04060a);
      this.scene.fog.density = 0.0001; // virtually no fog in space vacuum
    }
  }
}
