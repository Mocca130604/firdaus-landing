import * as THREE from 'three';
import { createAnimeToonMaterial } from '../core/AnimeStyle.js';

/**
 * Planetary Sector Scene for Exploration Mode
 * Styled with Anime Cel-Shaded aesthetics (3D Toon):
 * 1. Terra Yokohama (Base - About Me & Philosophy)
 * 2. Planet Arsenal (Golden Gas Giant with Tech Particle Rings - Skills & Stack)
 * 3. Planet Odyssey (Crimson Canyon World - Career Flight Stages)
 * 4. Planet Enterprise (Deep Cyan Neon Giant with Orbiting Satellites - Projects)
 * 5. The Moon (Mare Tranquillitatis - Contact Pass & Transmission Terminal)
 */
export class PlanetaryScene {
  constructor() {
    this.group = new THREE.Group();
    this.group.visible = false; // Initially hidden in Story Mode

    this.planets = [];
    this.rotatingObjects = [];

    this.buildSolarSystem();
  }

  buildSolarSystem() {
    // 1. Terra Yokohama (About Me)
    this.createTerraYokohama({
      id: 'about',
      name: 'Terra Yokohama',
      sub: 'Base Station // Origin & Philosophy',
      pos: new THREE.Vector3(0, 0, 0),
      radius: 24,
      color: 0x1e3a8a,
      atmosphereColor: 0x38bdf8,
    });

    // 2. Planet Arsenal (Skills & Tech Stack)
    this.createPlanetArsenal({
      id: 'skills',
      name: 'Planet Arsenal',
      sub: 'Orbital Ring // Tech Arsenal & Skills',
      pos: new THREE.Vector3(160, 30, -140),
      radius: 20,
      color: 0xd97706,
      atmosphereColor: 0xf59e0b,
    });

    // 3. Planet Odyssey (Career Journey Stages)
    this.createPlanetOdyssey({
      id: 'experience',
      name: 'Planet Odyssey',
      sub: 'Crimson Station // Career Flight Stages',
      pos: new THREE.Vector3(-150, 45, -170),
      radius: 18,
      color: 0x991b1b,
      atmosphereColor: 0xe63946,
    });

    // 4. Planet Enterprise (Featured Projects Dossier)
    this.createPlanetEnterprise({
      id: 'projects',
      name: 'Planet Enterprise',
      sub: 'Cyan Hub // Mission Dossiers & Projects',
      pos: new THREE.Vector3(120, 60, -280),
      radius: 22,
      color: 0x0284c7,
      atmosphereColor: 0x06b6d4,
    });

    // 5. The Moon (Mission Complete & Terminal)
    this.createTheMoon({
      id: 'contact',
      name: 'The Moon',
      sub: 'Mare Tranquillitatis // Mission Clearance',
      pos: new THREE.Vector3(0, 80, -360),
      radius: 17,
      color: 0x94a3b8,
      atmosphereColor: 0xe2e8f0,
    });

    // Cosmic Dust & Sector Constellations
    this.createCosmicEnvironment();
  }

  createTerraYokohama(cfg) {
    const pGroup = new THREE.Group();
    pGroup.position.copy(cfg.pos);

    // Planet Body (Anime Cel-Shaded)
    const geo = new THREE.SphereGeometry(cfg.radius, 32, 32);
    const mat = createAnimeToonMaterial({
      color: cfg.color,
    });
    const mesh = new THREE.Mesh(geo, mat);
    pGroup.add(mesh);

    // Atmospheric Glow Shell
    const glowGeo = new THREE.SphereGeometry(cfg.radius * 1.15, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: cfg.atmosphereColor,
      transparent: true,
      opacity: 0.16,
      wireframe: true,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    pGroup.add(glowMesh);

    // Beacon Pin / Spaceport Light
    const pinGeo = new THREE.CylinderGeometry(0.5, 0.5, 8, 8);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pin = new THREE.Mesh(pinGeo, pinMat);
    pin.position.set(0, cfg.radius + 3, 0);
    pGroup.add(pin);

    // Glowing Pulse Sphere on Pin Top
    const pulseGeo = new THREE.SphereGeometry(1.4, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    pulse.position.set(0, cfg.radius + 7, 0);
    pGroup.add(pulse);

    this.group.add(pGroup);
    this.planets.push({
      id: cfg.id,
      name: cfg.name,
      sub: cfg.sub,
      position: cfg.pos,
      radius: cfg.radius,
      color: cfg.color,
      mesh: pGroup,
    });

    this.rotatingObjects.push({ mesh, speedY: 0.003 });
    this.rotatingObjects.push({ mesh: glowMesh, speedY: -0.002 });
  }

  createPlanetArsenal(cfg) {
    const pGroup = new THREE.Group();
    pGroup.position.copy(cfg.pos);

    // Planet Body (Amber gold cel-shaded)
    const geo = new THREE.SphereGeometry(cfg.radius, 32, 32);
    const mat = createAnimeToonMaterial({
      color: cfg.color,
      roughness: 0.35,
    });
    const mesh = new THREE.Mesh(geo, mat);
    pGroup.add(mesh);

    // Tech Holographic Ring System (Saturn-like)
    const ringGeo = new THREE.RingGeometry(cfg.radius * 1.4, cfg.radius * 2.3, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: cfg.atmosphereColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    ring.rotation.y = 0.2;
    pGroup.add(ring);

    // Orbiting Tech Satellites / Nodes
    const satelliteGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const sDist = cfg.radius * 1.85;
      const sGeo = new THREE.OctahedronGeometry(1.6, 0);
      const sMat = createAnimeToonMaterial({
        color: 0xfef08a,
        emissive: 0xd97706,
        emissiveIntensity: 0.4,
      });
      const sat = new THREE.Mesh(sGeo, sMat);
      sat.position.set(Math.cos(angle) * sDist, Math.sin(angle) * 3, Math.sin(angle) * sDist);
      satelliteGroup.add(sat);
    }
    satelliteGroup.rotation.x = Math.PI / 2.5;
    pGroup.add(satelliteGroup);

    this.group.add(pGroup);
    this.planets.push({
      id: cfg.id,
      name: cfg.name,
      sub: cfg.sub,
      position: cfg.pos,
      radius: cfg.radius,
      color: cfg.color,
      mesh: pGroup,
    });

    this.rotatingObjects.push({ mesh, speedY: 0.005 });
    this.rotatingObjects.push({ mesh: satelliteGroup, speedY: 0.015 });
  }

  createPlanetOdyssey(cfg) {
    const pGroup = new THREE.Group();
    pGroup.position.copy(cfg.pos);

    // Crimson Mars Body (Anime cel-shaded)
    const geo = new THREE.SphereGeometry(cfg.radius, 28, 28);
    const mat = createAnimeToonMaterial({
      color: cfg.color,
      roughness: 0.6,
    });
    const mesh = new THREE.Mesh(geo, mat);
    pGroup.add(mesh);

    // Dual Orbit Rings (Stage Boosters trajectory)
    const oRingGeo = new THREE.RingGeometry(cfg.radius * 1.3, cfg.radius * 1.35, 32);
    const oRingMat = new THREE.MeshBasicMaterial({
      color: 0xff4d4f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const oRing = new THREE.Mesh(oRingGeo, oRingMat);
    oRing.rotation.x = Math.PI / 3;
    pGroup.add(oRing);

    // Glowing Career Beacon
    const bGeo = new THREE.ConeGeometry(2, 6, 8);
    const bMat = new THREE.MeshBasicMaterial({ color: 0xff7875 });
    const beacon = new THREE.Mesh(bGeo, bMat);
    beacon.position.set(0, cfg.radius + 3, 0);
    pGroup.add(beacon);

    this.group.add(pGroup);
    this.planets.push({
      id: cfg.id,
      name: cfg.name,
      sub: cfg.sub,
      position: cfg.pos,
      radius: cfg.radius,
      color: cfg.color,
      mesh: pGroup,
    });

    this.rotatingObjects.push({ mesh, speedY: 0.004 });
    this.rotatingObjects.push({ mesh: oRing, speedY: -0.008 });
  }

  createPlanetEnterprise(cfg) {
    const pGroup = new THREE.Group();
    pGroup.position.copy(cfg.pos);

    // Cyan Neon Ice Giant Body (Anime cel-shaded)
    const geo = new THREE.SphereGeometry(cfg.radius, 32, 32);
    const mat = createAnimeToonMaterial({
      color: cfg.color,
      roughness: 0.3,
    });
    const mesh = new THREE.Mesh(geo, mat);
    pGroup.add(mesh);

    // 3 Orbiting Project Relay Nodes
    const projectSatGroup = new THREE.Group();
    const projectColors = [0x38bdf8, 0x22d3ee, 0x818cf8];
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const dist = cfg.radius * 1.7;
      const sGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
      const sMat = createAnimeToonMaterial({
        color: projectColors[i],
        emissive: projectColors[i],
        emissiveIntensity: 0.35,
      });
      const pCube = new THREE.Mesh(sGeo, sMat);
      pCube.position.set(Math.cos(angle) * dist, Math.sin(angle) * 4, Math.sin(angle) * dist);
      projectSatGroup.add(pCube);
    }
    pGroup.add(projectSatGroup);

    // Data Flow Rings
    const ringGeo = new THREE.TorusGeometry(cfg.radius * 1.7, 0.4, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    pGroup.add(ring);

    this.group.add(pGroup);
    this.planets.push({
      id: cfg.id,
      name: cfg.name,
      sub: cfg.sub,
      position: cfg.pos,
      radius: cfg.radius,
      color: cfg.color,
      mesh: pGroup,
    });

    this.rotatingObjects.push({ mesh, speedY: 0.006 });
    this.rotatingObjects.push({ mesh: projectSatGroup, speedY: 0.02 });
  }

  createTheMoon(cfg) {
    const pGroup = new THREE.Group();
    pGroup.position.copy(cfg.pos);

    // Lunar Sphere with Craters (Anime cel-shaded)
    const geo = new THREE.SphereGeometry(cfg.radius, 28, 28);
    const mat = createAnimeToonMaterial({
      color: cfg.color,
      roughness: 0.7,
    });
    const mesh = new THREE.Mesh(geo, mat);
    pGroup.add(mesh);

    // Lunar Landing Pad Hexagon on North Pole
    const padGeo = new THREE.CylinderGeometry(5, 5, 0.8, 6);
    const padMat = createAnimeToonMaterial({
      color: 0x1e293b,
      roughness: 0.4,
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(0, cfg.radius + 0.4, 0);
    pGroup.add(pad);

    // Blinking Touchdown Beacon
    const bGeo = new THREE.SphereGeometry(1.2, 12, 12);
    const bMat = new THREE.MeshBasicMaterial({ color: 0x2ed573 });
    const beacon = new THREE.Mesh(bGeo, bMat);
    beacon.position.set(0, cfg.radius + 3.2, 0);
    pGroup.add(beacon);

    this.group.add(pGroup);
    this.planets.push({
      id: cfg.id,
      name: cfg.name,
      sub: cfg.sub,
      position: cfg.pos,
      radius: cfg.radius,
      color: cfg.color,
      mesh: pGroup,
    });

    this.rotatingObjects.push({ mesh, speedY: 0.002 });
  }

  createCosmicEnvironment() {
    // Sector Guide Constellation Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
    });

    const points = this.planets.map((p) => p.position);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const orbitLines = new THREE.Line(lineGeo, lineMat);
    this.group.add(orbitLines);

    // Ambient floating cosmic dust particles
    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 800;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 300 + 40;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 800 - 150;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 1.8,
      transparent: true,
      opacity: 0.35,
    });
    const cosmicPoints = new THREE.Points(pGeo, pMat);
    this.group.add(cosmicPoints);
  }

  setVisible(visible) {
    this.group.visible = visible;
  }

  update(delta) {
    if (!this.group.visible) return;

    for (const obj of this.rotatingObjects) {
      if (obj.mesh) {
        if (obj.speedY) obj.mesh.rotation.y += obj.speedY * delta * 60;
        if (obj.speedX) obj.mesh.rotation.x += obj.speedX * delta * 60;
      }
    }
  }
}

