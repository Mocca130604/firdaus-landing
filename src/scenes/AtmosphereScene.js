import * as THREE from 'three';
import { createAnimeToonMaterial } from '../core/AnimeStyle.js';

/**
 * Atmosphere Scene (Alt 20 - 100)
 * Features:
 * - 3D procedural fluffy cel-shaded clouds (Makoto Shinkai / Ghibli sky aesthetic)
 * - Atmospheric fog gradient
 * - Gentle drifting animation
 */
export class AtmosphereScene {
  constructor() {
    this.group = new THREE.Group();
    this.clouds = [];
    this.buildAtmosphere();
  }

  buildAtmosphere() {
    const cloudMat = createAnimeToonMaterial({
      color: 0xffffff,
      roughness: 0.9,
      transparent: true,
      opacity: 0.92,
    });

    // Cloud layers at altitudes 25, 45, 65, 85
    const layerConfigs = [
      { y: 28, count: 8, spread: 50, scaleMin: 1.5, scaleMax: 2.8 },
      { y: 50, count: 10, spread: 65, scaleMin: 2.0, scaleMax: 3.5 },
      { y: 72, count: 8, spread: 80, scaleMin: 2.5, scaleMax: 4.2 },
      { y: 95, count: 6, spread: 90, scaleMin: 3.0, scaleMax: 5.0 }
    ];

    layerConfigs.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const cloudScale = layer.scaleMin + Math.random() * (layer.scaleMax - layer.scaleMin);
        const cloud = this.createPuffyCloud(cloudScale, cloudMat);

        // Position in ring around rocket trajectory (keep central corridor clear for rocket climb)
        const angle = (i / layer.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const radius = 10 + Math.random() * layer.spread;
        const px = Math.cos(angle) * radius;
        const pz = Math.sin(angle) * radius;
        const py = layer.y + (Math.random() - 0.5) * 8;

        cloud.position.set(px, py, pz);

        this.clouds.push({
          mesh: cloud,
          speed: 0.02 + Math.random() * 0.03,
          orbitRadius: radius,
          angle: angle,
          baseY: py
        });

        this.group.add(cloud);
      }
    });
  }

  createPuffyCloud(scale, material) {
    const cloud = new THREE.Group();

    // Combine several overlapping low-poly spheres to create a fluffy cumulus shape
    const sphereCount = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < sphereCount; i++) {
      const radius = (1.0 + Math.random() * 0.9) * scale;
      const sphereGeo = new THREE.IcosahedronGeometry(radius, 1);
      const puff = new THREE.Mesh(sphereGeo, material);

      puff.position.set(
        (Math.random() - 0.5) * 3.5 * scale,
        (Math.random() - 0.3) * 1.5 * scale,
        (Math.random() - 0.5) * 3.5 * scale
      );
      cloud.add(puff);
    }

    return cloud;
  }

  update(delta) {
    // Slowly drift and rotate clouds
    const time = Date.now() * 0.0005;
    this.clouds.forEach(c => {
      c.angle += c.speed * delta * 0.2;
      c.mesh.position.x = Math.cos(c.angle) * c.orbitRadius;
      c.mesh.position.z = Math.sin(c.angle) * c.orbitRadius;
      c.mesh.position.y = c.baseY + Math.sin(time + c.orbitRadius) * 0.8;
      c.mesh.rotation.y += delta * 0.04;
    });
  }
}

