import * as THREE from 'three';
import { createAnimeToonMaterial, addAnimeOutline } from '../core/AnimeStyle.js';

/**
 * Deep Space Scene (Alt 120 - 320)
 * Features:
 * - Parallax dual-layer starfield
 * - Luminous cosmic nebula dust
 * - Floating low-poly rocky asteroids with tumbling physics
 * - High-tech orbital communication satellite with solar panels
 * - 3D Orbital Checkpoint Stations (Visualizing Skills & Telemetry in 3D)
 */
export class SpaceScene {
  constructor() {
    this.group = new THREE.Group();
    this.asteroids = [];
    this.satellites = [];
    this.checkpointRings = [];
    this.stars = null;
    this.nebulaPoints = null;

    this.buildSpace();
  }

  buildSpace() {
    this.createStarfield();
    this.createNebula();
    this.createAsteroidBelt();
    this.createSatellites();
    this.createOrbitalCheckpoints();
  }

  createStarfield() {
    const starCount = 3000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Cylinder distribution around rocket path (Y from 100 to 450, radius from 40 to 280)
      const angle = Math.random() * Math.PI * 2;
      const radius = 50 + Math.random() * 230;

      positions[i * 3 + 0] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 90 + Math.random() * 360;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Color variation: white, cyan, gold, soft violet
      const colorType = Math.random();
      if (colorType < 0.6) {
        colors[i * 3 + 0] = 0.95;
        colors[i * 3 + 1] = 0.98;
        colors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.8) {
        colors[i * 3 + 0] = 0.4;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1.0; // Cyan tint
      } else {
        colors[i * 3 + 0] = 1.0;
        colors[i * 3 + 1] = 0.85;
        colors[i * 3 + 2] = 0.5; // Golden yellow
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });

    this.stars = new THREE.Points(geo, starMat);
    this.group.add(this.stars);
  }

  createNebula() {
    const nebulaCount = 400;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(nebulaCount * 3);
    const colors = new Float32Array(nebulaCount * 3);

    // Refined, monochromatic stardust haze (cool slate-blue and subtle lunar ice)
    const palette = [
      new THREE.Color(0x1e293b), // Slate cosmic shadow
      new THREE.Color(0x38bdf8), // Subtle ice cyan
      new THREE.Color(0x64748b)  // Silvery stardust
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 110;

      positions[i * 3 + 0] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 130 + Math.random() * 220;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 14.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.nebulaPoints = new THREE.Points(geo, mat);
    this.group.add(this.nebulaPoints);
  }

  createAsteroidBelt() {
    const rockMat = createAnimeToonMaterial({
      color: 0x64748b,
      roughness: 0.8,
    });

    // 16 Asteroids floating along the space highway
    for (let i = 0; i < 16; i++) {
      const radius = 1.2 + Math.random() * 3.5;
      const rockGeo = new THREE.DodecahedronGeometry(radius, 1);

      // Deform vertices for craggy asteroid look
      const pos = rockGeo.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const d = 1 + (Math.random() - 0.5) * 0.4;
        pos.setXYZ(j, pos.getX(j) * d, pos.getY(j) * d, pos.getZ(j) * d);
      }
      rockGeo.computeVertexNormals();

      const asteroid = new THREE.Mesh(rockGeo, rockMat);
      addAnimeOutline(asteroid, 0.04, 0x070c18);

      const angle = Math.random() * Math.PI * 2;
      const dist = 14 + Math.random() * 45;
      const py = 140 + Math.random() * 180;

      asteroid.position.set(Math.cos(angle) * dist, py, Math.sin(angle) * dist);

      this.asteroids.push({
        mesh: asteroid,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        orbitSpeed: (Math.random() - 0.5) * 0.005,
        angle: angle,
        dist: dist,
        baseY: py
      });

      this.group.add(asteroid);
    }
  }

  createSatellites() {
    // Communications Satellite at Alt 175
    const satGroup = new THREE.Group();
    satGroup.position.set(-18, 175, 12);

    const goldFoilMat = createAnimeToonMaterial({
      color: 0xf59e0b,
      emissive: 0xb45309,
      emissiveIntensity: 0.2,
      roughness: 0.3,
    });

    const solarMat = createAnimeToonMaterial({
      color: 0x1d4ed8,
      emissive: 0x1e40af,
      emissiveIntensity: 0.2,
      roughness: 0.4,
    });

    const frameMat = createAnimeToonMaterial({
      color: 0x334155,
      roughness: 0.5,
    });

    // Satellite Main Bus / Body
    const busGeo = new THREE.BoxGeometry(2.0, 3.0, 2.0);
    const bus = new THREE.Mesh(busGeo, goldFoilMat);
    addAnimeOutline(bus, 0.04, 0x090d16);
    satGroup.add(bus);

    // Parabolic Dish Antenna
    const dishGeo = new THREE.CylinderGeometry(1.6, 0.2, 0.6, 16, 1, true);
    const dish = new THREE.Mesh(dishGeo, frameMat);
    dish.position.set(0, 2.0, 0);
    dish.rotation.x = Math.PI * 0.2;
    addAnimeOutline(dish, 0.04, 0x090d16);
    satGroup.add(dish);

    // Twin Solar Panel Wings
    [-1, 1].forEach(side => {
      const panelGroup = new THREE.Group();
      panelGroup.position.set(side * 3.8, 0, 0);

      const panelGeo = new THREE.BoxGeometry(4.5, 1.6, 0.08);
      const panel = new THREE.Mesh(panelGeo, solarMat);
      addAnimeOutline(panel, 0.04, 0x090d16);
      panelGroup.add(panel);

      const mountGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8);
      const mount = new THREE.Mesh(mountGeo, frameMat);
      mount.rotation.z = Math.PI / 2;
      mount.position.set(-side * 2.3, 0, 0);
      panelGroup.add(mount);

      satGroup.add(panelGroup);
    });

    // Blinking telemetry LED
    const ledGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(0, -1.6, 1.05);
    satGroup.add(led);

    this.satellites.push({
      mesh: satGroup,
      ledMat: ledMat,
      rotY: 0.008
    });

    this.group.add(satGroup);
  }

  createOrbitalCheckpoints() {
    // 3D Orbital Rings indicating portfolio stages (Skills & Projects zones)
    const ringHeights = [160, 220, 280];
    const ringTitles = ['FRONTEND & ARCHITECTURE', 'BACKEND & LOGISTICS', 'ENTERPRISE AI & MCP'];

    ringHeights.forEach((height, idx) => {
      const checkpoint = new THREE.Group();
      checkpoint.position.set(0, height, 0);

      // Outer holographic ring (Cohesive technical Ice Cyan / Slate Silver)
      const ringGeo = new THREE.TorusGeometry(8.5, 0.08, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      checkpoint.add(ring);

      // 4 Orbital Satellite Nodes along the ring
      for (let i = 0; i < 4; i++) {
        const nodeGeo = new THREE.OctahedronGeometry(0.35, 0);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
        const node = new THREE.Mesh(nodeGeo, nodeMat);

        const a = (i / 4) * Math.PI * 2;
        node.position.set(Math.cos(a) * 8.5, 0, Math.sin(a) * 8.5);
        checkpoint.add(node);
      }

      this.checkpointRings.push({
        group: checkpoint,
        speed: (idx % 2 === 0 ? 1 : -1) * 0.008
      });

      this.group.add(checkpoint);
    });
  }

  update(delta) {
    // Rotate Asteroids
    this.asteroids.forEach(a => {
      a.mesh.rotation.x += a.rotSpeedX;
      a.mesh.rotation.y += a.rotSpeedY;
      a.mesh.rotation.z += a.rotSpeedZ;
      a.angle += a.orbitSpeed * delta;
      a.mesh.position.x = Math.cos(a.angle) * a.dist;
      a.mesh.position.z = Math.sin(a.angle) * a.dist;
    });

    // Orbit & Blink Satellite
    this.satellites.forEach(s => {
      s.mesh.rotation.y += s.rotY;
      const blink = Math.sin(Date.now() * 0.006) > 0.3;
      s.ledMat.color.setHex(blink ? 0x00ff88 : 0x003311);
    });

    // Rotate Orbital Checkpoint rings
    this.checkpointRings.forEach(cr => {
      cr.group.rotation.y += cr.speed;
    });

    // Subtle star twinkling
    if (this.stars) {
      this.stars.rotation.y += 0.0003;
    }
  }
}

