import * as THREE from 'three';

/**
 * Unified Particle System
 * Manages:
 * 1. Rocket Thruster Fire & Smoke trails
 * 2. Drifting Japanese Sakura (cherry blossom) petals
 * 3. Space dust & sparks
 */
export class ParticleSystem {
  constructor(scene, isMobile = false) {
    this.scene = scene;
    this.isMobile = isMobile;

    // Thruster Particle parameters
    this.maxThrusterParticles = isMobile ? 350 : 700;
    this.thrusterGeo = null;
    this.thrusterPoints = null;
    this.thrusterData = [];

    // Sakura Petals parameters
    this.maxSakuraParticles = isMobile ? 250 : 600;
    this.sakuraGeo = null;
    this.sakuraPoints = null;
    this.sakuraData = [];

    this.initThrusterParticles();
    this.initSakuraParticles();
  }

  // Create soft round blurred particle texture procedurally
  createParticleTexture(isSakura = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    if (isSakura) {
      // Petal shape
      ctx.beginPath();
      ctx.ellipse(32, 32, 26, 14, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffb7b2';
      ctx.fill();

      // Soft edge highlight
      const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 28);
      grad.addColorStop(0, 'rgba(255, 230, 240, 0.9)');
      grad.addColorStop(0.6, 'rgba(255, 154, 162, 0.8)');
      grad.addColorStop(1, 'rgba(255, 183, 178, 0)');
      ctx.fillStyle = grad;
      ctx.fill();
    } else {
      // Soft radial glow for fire & smoke
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 200, 50, 0.8)');
      grad.addColorStop(0.7, 'rgba(240, 80, 20, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  initThrusterParticles() {
    this.thrusterGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.maxThrusterParticles * 3);
    const colors = new Float32Array(this.maxThrusterParticles * 3);
    const sizes = new Float32Array(this.maxThrusterParticles);

    for (let i = 0; i < this.maxThrusterParticles; i++) {
      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = -9999; // start hidden
      positions[i * 3 + 2] = 0;

      colors[i * 3 + 0] = 1;
      colors[i * 3 + 1] = 0.6;
      colors[i * 3 + 2] = 0.2;

      sizes[i] = 0;

      this.thrusterData.push({
        alive: false,
        life: 0,
        maxLife: 1.0,
        vx: 0,
        vy: 0,
        vz: 0,
        type: 'fire', // 'fire' or 'smoke'
        size: 1.0
      });
    }

    this.thrusterGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.thrusterGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.thrusterGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const thrusterMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: this.createParticleTexture(false),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.thrusterPoints = new THREE.Points(this.thrusterGeo, thrusterMat);
    this.scene.add(this.thrusterPoints);
  }

  emitThruster(nozzlePositions, thrustIntensity = 1.0) {
    if (thrustIntensity <= 0.01) return;

    const spawnPerFrame = Math.floor((this.isMobile ? 4 : 8) * thrustIntensity);
    let spawned = 0;

    for (let i = 0; i < this.maxThrusterParticles && spawned < spawnPerFrame; i++) {
      const p = this.thrusterData[i];
      if (!p.alive) {
        p.alive = true;
        p.life = 0;
        p.type = Math.random() < 0.6 ? 'fire' : 'smoke';
        p.maxLife = p.type === 'fire' ? 0.35 + Math.random() * 0.25 : 0.85 + Math.random() * 0.45;

        // Choose one of nozzle positions
        const nozzle = nozzlePositions[Math.floor(Math.random() * nozzlePositions.length)];
        const spread = p.type === 'fire' ? 0.25 : 0.55;

        const posAttr = this.thrusterGeo.attributes.position.array;
        posAttr[i * 3 + 0] = nozzle.x + (Math.random() - 0.5) * spread;
        posAttr[i * 3 + 1] = nozzle.y - 0.2;
        posAttr[i * 3 + 2] = nozzle.z + (Math.random() - 0.5) * spread;

        // Downward exhaust velocity
        p.vx = (Math.random() - 0.5) * 0.3;
        p.vy = -(1.2 + Math.random() * 1.8) * thrustIntensity;
        p.vz = (Math.random() - 0.5) * 0.3;
        p.size = p.type === 'fire' ? 1.5 + Math.random() * 1.2 : 2.5 + Math.random() * 2.0;

        spawned++;
      }
    }
  }

  initSakuraParticles() {
    this.sakuraGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.maxSakuraParticles * 3);
    const colors = new Float32Array(this.maxSakuraParticles * 3);

    for (let i = 0; i < this.maxSakuraParticles; i++) {
      // Spawn in Japanese garden zone around the base (X: -45 to 45, Y: 0 to 40, Z: -45 to 45)
      positions[i * 3 + 0] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = Math.random() * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90;

      // Soft pink variations
      const tone = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 0] = 1.0;
      colors[i * 3 + 1] = 0.65 * tone;
      colors[i * 3 + 2] = 0.75 * tone;

      this.sakuraData.push({
        vx: 0.05 + Math.random() * 0.08,
        vy: -(0.03 + Math.random() * 0.04),
        vz: 0.02 + Math.random() * 0.04,
        swaySpeed: 1.5 + Math.random() * 2.0,
        swayOffset: Math.random() * Math.PI * 2
      });
    }

    this.sakuraGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.sakuraGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const sakuraMat = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      map: this.createParticleTexture(true),
      transparent: true,
      opacity: 0.9,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    this.sakuraPoints = new THREE.Points(this.sakuraGeo, sakuraMat);
    this.scene.add(this.sakuraPoints);
  }

  update(delta, nozzlePositions, thrustIntensity = 1.0, rocketY = 0) {
    const time = Date.now() * 0.001;

    // --- Update Thruster Particles ---
    this.emitThruster(nozzlePositions, thrustIntensity);

    const pos = this.thrusterGeo.attributes.position.array;
    const col = this.thrusterGeo.attributes.color.array;
    const siz = this.thrusterGeo.attributes.size.array;

    for (let i = 0; i < this.maxThrusterParticles; i++) {
      const p = this.thrusterData[i];
      if (p.alive) {
        p.life += delta;
        const progress = p.life / p.maxLife;

        if (progress >= 1.0) {
          p.alive = false;
          pos[i * 3 + 1] = -9999;
          continue;
        }

        // Move particle
        pos[i * 3 + 0] += p.vx;
        pos[i * 3 + 1] += p.vy;
        pos[i * 3 + 2] += p.vz;

        if (p.type === 'fire') {
          // Fire color fades from intense white-yellow to deep orange-red
          col[i * 3 + 0] = 1.0;
          col[i * 3 + 1] = Math.max(0.05, 0.9 * (1.0 - progress));
          col[i * 3 + 2] = Math.max(0.0, 0.3 * (1.0 - progress * 2));
          siz[i] = p.size * (1.0 - progress * 0.6);
        } else {
          // Smoke expands and fades to grey
          col[i * 3 + 0] = 0.6 + progress * 0.2;
          col[i * 3 + 1] = 0.6 + progress * 0.2;
          col[i * 3 + 2] = 0.65 + progress * 0.2;
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vz += (Math.random() - 0.5) * 0.04;
          siz[i] = p.size * (1.0 + progress * 2.2);
        }
      }
    }

    this.thrusterGeo.attributes.position.needsUpdate = true;
    this.thrusterGeo.attributes.color.needsUpdate = true;
    this.thrusterGeo.attributes.size.needsUpdate = true;

    // --- Update Sakura Petals ---
    // Only animate sakura when near the ground (rocketY < 60) to save CPU
    if (rocketY < 75 && this.sakuraPoints) {
      this.sakuraPoints.visible = true;
      const sPos = this.sakuraGeo.attributes.position.array;

      for (let i = 0; i < this.maxSakuraParticles; i++) {
        const s = this.sakuraData[i];

        // Gentle sinusoidal drifting
        const sway = Math.sin(time * s.swaySpeed + s.swayOffset) * 0.04;

        sPos[i * 3 + 0] += s.vx + sway;
        sPos[i * 3 + 1] += s.vy;
        sPos[i * 3 + 2] += s.vz + sway * 0.5;

        // Reset if touches ground or leaves bounds
        if (sPos[i * 3 + 1] < 0.2 || sPos[i * 3 + 0] > 50) {
          sPos[i * 3 + 0] = -45 + (Math.random() - 0.5) * 30;
          sPos[i * 3 + 1] = 25 + Math.random() * 12;
          sPos[i * 3 + 2] = (Math.random() - 0.5) * 90;
        }
      }
      this.sakuraGeo.attributes.position.needsUpdate = true;
    } else if (this.sakuraPoints) {
      this.sakuraPoints.visible = false;
    }
  }

  dispose() {
    if (this.thrusterGeo) this.thrusterGeo.dispose();
    if (this.sakuraGeo) this.sakuraGeo.dispose();
    if (this.thrusterPoints) this.scene.remove(this.thrusterPoints);
    if (this.sakuraPoints) this.scene.remove(this.sakuraPoints);
  }
}

