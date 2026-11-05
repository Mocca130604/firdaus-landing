import * as THREE from 'three';

/**
 * Dynamic Lighting Manager
 * Cohesive, subtle cinematic lighting without harsh oversaturated rainbow hues.
 */
export class Lighting {
  constructor(scene) {
    this.scene = scene;

    // 1. Ambient Light (Subtle cool slate-indigo)
    this.ambientLight = new THREE.AmbientLight(0x1e293b, 0.85);
    this.scene.add(this.ambientLight);

    // 2. Primary Directional Light (Crisp daylight white)
    this.sunLight = new THREE.DirectionalLight(0xf8fafc, 1.9);
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

    // 3. Rim / Hemisphere Light (Cool sky / dark ground)
    this.hemiLight = new THREE.HemisphereLight(0x94a3b8, 0x0f172a, 0.5);
    this.scene.add(this.hemiLight);

    // 4. Fog (Clean deep twilight atmosphere)
    this.scene.fog = new THREE.FogExp2(0x0f172a, 0.006);
  }

  update(progress, cameraY) {
    // Keep directional sunlight following camera vertically
    this.sunLight.position.y = cameraY + 45;
    this.sunLight.target.position.set(0, cameraY, 0);
    this.sunLight.target.updateMatrixWorld();

    if (progress < 0.25) {
      // Earth Atmosphere / Japan Launch Site
      const t = progress / 0.25;
      this.ambientLight.color.setHex(0x1e293b);
      this.ambientLight.intensity = 0.85 - t * 0.2;

      this.sunLight.color.setHex(0xf8fafc);
      this.sunLight.intensity = 1.9;

      // Fog transitions smoothly into deep space
      const c1 = new THREE.Color(0x0f172a);
      const c2 = new THREE.Color(0x04060a);
      const fogColor = c1.lerp(c2, t);
      this.scene.fog.color.copy(fogColor);
      this.scene.fog.density = 0.006 - t * 0.003;

    } else {
      // Deep Space & Lunar surface (High contrast, crisp directional illumination)
      this.ambientLight.color.setHex(0x0f172a);
      this.ambientLight.intensity = 0.45;

      this.sunLight.color.setHex(0xffffff);
      this.sunLight.intensity = 2.1;

      this.scene.fog.color.setHex(0x04060a);
      this.scene.fog.density = 0.0001; // virtually no fog in space vacuum
    }
  }
}
