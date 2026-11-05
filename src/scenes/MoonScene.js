import * as THREE from 'three';

/**
 * Moon Landing Scene (Finish Alt ~384)
 * Features:
 * - Cratered lunar surface with procedural elevation & impact craters
 * - High-tech Lunar Landing Pad & Touchdown Beacons
 * - "Mission Complete" Japanese / Mission Flag
 * - "Earthrise" (Distant view of glowing blue Earth)
 * - Scattered lunar boulders & rocks
 */
export class MoonScene {
  constructor() {
    this.group = new THREE.Group();
    this.beacons = [];
    this.flagCloth = null;
    this.earthMesh = null;
    this.cloudsMesh = null;

    this.buildMoon();
  }

  buildMoon() {
    const moonBaseY = 370;

    // 1. Lunar Surface
    this.createLunarTerrain(moonBaseY);

    // 2. Landing Pad
    this.createLandingPad(moonBaseY);

    // 3. "Mission Complete" Flag
    this.createMissionFlag(moonBaseY);

    // 4. Distant Earth ("Earthrise")
    this.createEarth(moonBaseY);

    // 5. Lunar Boulders
    this.createBoulders(moonBaseY);
  }

  createLunarTerrain(baseY) {
    // Large circular segment with cratered displacements
    const groundGeo = new THREE.PlaneGeometry(180, 180, 48, 48);
    const pos = groundGeo.attributes.position;

    // Crater centers (x, y, radius, depth)
    const craters = [
      { x: -25, y: -20, r: 18, depth: 3.5 },
      { x: 30, y: 15, r: 14, depth: 2.8 },
      { x: -35, y: 30, r: 12, depth: 2.2 },
      { x: 20, y: -35, r: 16, depth: 3.0 },
      { x: -10, y: 40, r: 9, depth: 1.8 }
    ];

    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);

      let elevation = 0;
      // Slight curvature
      const distFromCenter = Math.sqrt(px * px + py * py);
      elevation -= Math.pow(distFromCenter / 90, 2) * 6;

      // Crater depressions and raised rim ridges
      craters.forEach(c => {
        const dx = px - c.x;
        const dy = py - c.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < c.r) {
          const t = d / c.r;
          // Crater bowl
          elevation -= (1 - Math.pow(t, 2)) * c.depth;
        } else if (d < c.r * 1.35) {
          // Crater rim elevation
          const t = (d - c.r) / (c.r * 0.35);
          elevation += Math.sin(t * Math.PI) * (c.depth * 0.38);
        }
      });

      // Fine regolith roughness
      elevation += (Math.sin(px * 0.8) * Math.cos(py * 0.8)) * 0.4;

      pos.setZ(i, elevation);
    }
    groundGeo.computeVertexNormals();

    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x95a5a6, // Light lunar grey
      roughness: 0.95,
      metalness: 0.05,
      flatShading: true
    });

    const ground = new THREE.Mesh(groundGeo, moonMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, baseY, 0);
    ground.receiveShadow = true;
    this.group.add(ground);
  }

  createLandingPad(baseY) {
    const pad = new THREE.Group();
    pad.position.set(0, baseY + 0.1, 0);

    const padMat = new THREE.MeshStandardMaterial({
      color: 0x2d3436,
      roughness: 0.5,
      metalness: 0.6,
      flatShading: true
    });

    const borderMat = new THREE.MeshStandardMaterial({
      color: 0xf39c12, // Warning yellow
      roughness: 0.4
    });

    // Hexagonal Landing Pad
    const hexGeo = new THREE.CylinderGeometry(5.2, 5.5, 0.4, 6);
    const hexMesh = new THREE.Mesh(hexGeo, padMat);
    hexMesh.receiveShadow = true;
    pad.add(hexMesh);

    // Glowing Target Ring
    const targetGeo = new THREE.RingGeometry(2.2, 2.6, 24);
    const targetMat = new THREE.MeshBasicMaterial({ color: 0x00cec9, side: THREE.DoubleSide });
    const targetMesh = new THREE.Mesh(targetGeo, targetMat);
    targetMesh.rotation.x = -Math.PI / 2;
    targetMesh.position.y = 0.22;
    pad.add(targetMesh);

    // Inner landing cross '+'
    const crossGeo = new THREE.BoxGeometry(2.5, 0.02, 0.3);
    const crossMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const c1 = new THREE.Mesh(crossGeo, crossMat);
    c1.position.y = 0.23;
    pad.add(c1);

    const c2 = new THREE.Mesh(crossGeo, crossMat);
    c2.rotation.y = Math.PI / 2;
    c2.position.y = 0.23;
    pad.add(c2);

    // 6 Perimeter Guidance Beacons
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const bx = Math.cos(angle) * 5.2;
      const bz = Math.sin(angle) * 5.2;

      const pylonGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.8, 8);
      const pylon = new THREE.Mesh(pylonGeo, padMat);
      pylon.position.set(bx, 0.4, bz);
      pad.add(pylon);

      const lightGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const lightMat = new THREE.MeshBasicMaterial({ color: 0x00cec9 });
      const light = new THREE.Mesh(lightGeo, lightMat);
      light.position.set(bx, 0.9, bz);
      pad.add(light);

      this.beacons.push({ mesh: light, mat: lightMat, phase: i * 0.5 });
    }

    this.group.add(pad);
  }

  createMissionFlag(baseY) {
    const flagGroup = new THREE.Group();
    flagGroup.position.set(6.5, baseY, 3.5);

    // Titanium Flag Pole
    const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, 4.2, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xdfe6e9, metalness: 0.9, roughness: 0.2 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 2.1;
    flagGroup.add(pole);

    // Cross-arm to keep flag extended in vacuum
    const armGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.2, 8);
    const arm = new THREE.Mesh(armGeo, poleMat);
    arm.rotation.z = Math.PI / 2;
    arm.position.set(1.1, 4.15, 0);
    flagGroup.add(arm);

    // Flag Fabric with "Mission Complete" insignia
    const flagCanvas = document.createElement('canvas');
    flagCanvas.width = 512;
    flagCanvas.height = 320;
    const ctx = flagCanvas.getContext('2d');

    // Clean white flag with gold trim
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 320);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, 502, 310);

    // Japanese Rising Sun (Hinomaru)
    ctx.beginPath();
    ctx.arc(140, 160, 65, 0, Math.PI * 2);
    ctx.fillStyle = '#d63031';
    ctx.fill();

    // Mission Complete Text
    ctx.fillStyle = '#1e272e';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('MISSION COMPLETE', 230, 130);

    ctx.fillStyle = '#0984e3';
    ctx.font = '600 22px sans-serif';
    ctx.fillText('FIRDAUS MOCHAMAD', 230, 170);

    ctx.fillStyle = '#636e72';
    ctx.font = '16px monospace';
    ctx.fillText('LUNA TOUCHDOWN • 2026', 230, 205);

    const flagTexture = new THREE.CanvasTexture(flagCanvas);
    const clothGeo = new THREE.PlaneGeometry(2.2, 1.4, 12, 6);
    const clothMat = new THREE.MeshStandardMaterial({
      map: flagTexture,
      roughness: 0.6,
      side: THREE.DoubleSide
    });

    this.flagCloth = new THREE.Mesh(clothGeo, clothMat);
    this.flagCloth.position.set(1.1, 3.4, 0);
    this.flagCloth.castShadow = true;
    flagGroup.add(this.flagCloth);

    this.group.add(flagGroup);
  }

  createEarth(baseY) {
    // Distant glowing Earth visible in lunar black sky
    const earthGroup = new THREE.Group();
    earthGroup.position.set(-45, baseY + 45, -70);

    // Blue Marble Sphere
    const earthGeo = new THREE.SphereGeometry(14, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x0984e3,
      roughness: 0.45,
      metalness: 0.1
    });
    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(this.earthMesh);

    // Atmosphere Rim Glow
    const rimGeo = new THREE.SphereGeometry(14.6, 32, 32);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0x74b9ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    earthGroup.add(rim);

    // Continents & Swirling Clouds
    const cloudGeo = new THREE.SphereGeometry(14.15, 24, 24);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      roughness: 0.9
    });
    this.cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(this.cloudsMesh);

    this.group.add(earthGroup);
  }

  createBoulders(baseY) {
    const boulderMat = new THREE.MeshStandardMaterial({
      color: 0x7f8c8d,
      roughness: 0.95,
      flatShading: true
    });

    for (let i = 0; i < 22; i++) {
      const radius = 0.4 + Math.random() * 1.4;
      const bGeo = new THREE.DodecahedronGeometry(radius, 0);
      const boulder = new THREE.Mesh(bGeo, boulderMat);

      const angle = Math.random() * Math.PI * 2;
      const dist = 9 + Math.random() * 40;
      boulder.position.set(Math.cos(angle) * dist, baseY + radius * 0.6, Math.sin(angle) * dist);
      boulder.rotation.set(Math.random(), Math.random(), Math.random());
      boulder.castShadow = true;
      this.group.add(boulder);
    }
  }

  update(delta) {
    const time = Date.now() * 0.001;

    // Guidance Beacons Sequential Pulse
    this.beacons.forEach(b => {
      const intensity = 0.5 + 0.5 * Math.sin(time * 3 + b.phase);
      b.mat.color.setRGB(0, 0.8 * intensity, 0.8 * intensity);
    });

    // Subtle flag flutter
    if (this.flagCloth) {
      const pos = this.flagCloth.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const wave = Math.sin(time * 2.5 + x * 3) * (x / 2.2) * 0.12;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
    }

    // Earth slow axial rotation
    if (this.earthMesh) this.earthMesh.rotation.y += 0.0015;
    if (this.cloudsMesh) this.cloudsMesh.rotation.y += 0.0022;
  }
}

