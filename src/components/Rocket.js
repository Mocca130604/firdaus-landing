import * as THREE from 'three';

/**
 * Procedural Stylized Multi-Stage Rocket ("Ryusei-1" / 流星-1)
 * Features detachable boosters, detailed engine bells, fins, and telemetry markings.
 */
export class Rocket {
  constructor() {
    this.group = new THREE.Group();
    this.boosters = [];
    this.boostersDetached = false;
    this.mainEngineLight = null;

    this.init();
  }

  init() {
    // High-tech Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f6fa,
      roughness: 0.35,
      metalness: 0.25,
      flatShading: true
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e272e,
      roughness: 0.4,
      metalness: 0.6,
      flatShading: true
    });

    const redAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd63031, // Japanese vermilion red
      roughness: 0.3,
      metalness: 0.1,
      flatShading: true
    });

    const engineMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x2f3640,
      roughness: 0.2,
      metalness: 0.9,
      flatShading: true
    });

    const engineNozzleGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa33
    });

    // --- 1. Core Fuselage ---
    // Lower Core Stage
    const lowerCoreGeo = new THREE.CylinderGeometry(0.85, 0.9, 5.0, 16);
    const lowerCore = new THREE.Mesh(lowerCoreGeo, bodyMaterial);
    lowerCore.position.y = 2.5;
    lowerCore.castShadow = true;
    lowerCore.receiveShadow = true;
    this.group.add(lowerCore);

    // Interstage Ring
    const interstageGeo = new THREE.CylinderGeometry(0.86, 0.86, 0.5, 16);
    const interstage = new THREE.Mesh(interstageGeo, darkMaterial);
    interstage.position.y = 5.25;
    this.group.add(interstage);

    // Upper Stage
    const upperCoreGeo = new THREE.CylinderGeometry(0.85, 0.85, 4.0, 16);
    const upperCore = new THREE.Mesh(upperCoreGeo, bodyMaterial);
    upperCore.position.y = 7.5;
    upperCore.castShadow = true;
    this.group.add(upperCore);

    // Red Japanese stripe band
    const redStripeGeo = new THREE.CylinderGeometry(0.86, 0.86, 0.4, 16);
    const redStripe = new THREE.Mesh(redStripeGeo, redAccentMaterial);
    redStripe.position.y = 8.8;
    this.group.add(redStripe);

    // Red Sun emblem circle (Hinomaru) on side of rocket
    const emblemGeo = new THREE.CircleGeometry(0.35, 16);
    const emblemMat = new THREE.MeshBasicMaterial({ color: 0xd63031, side: THREE.DoubleSide });
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.position.set(0, 7.8, 0.865);
    this.group.add(emblem);

    // Nose Cone (Capsule)
    const noseGeo = new THREE.ConeGeometry(0.85, 2.5, 16);
    const nose = new THREE.Mesh(noseGeo, bodyMaterial);
    nose.position.y = 10.75;
    nose.castShadow = true;
    this.group.add(nose);

    // Launch escape / telemetry antenna tip
    const antennaGeo = new THREE.CylinderGeometry(0.04, 0.08, 1.2, 8);
    const antenna = new THREE.Mesh(antennaGeo, darkMaterial);
    antenna.position.y = 12.4;
    this.group.add(antenna);

    // --- 2. Main Aerodynamic Fins ---
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(1.3, -0.6);
    finShape.lineTo(1.1, -1.8);
    finShape.lineTo(0, -1.4);
    finShape.closePath();

    const finExtrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const finGeo = new THREE.ExtrudeGeometry(finShape, finExtrudeSettings);

    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeo, redAccentMaterial);
      fin.position.y = 1.4;
      fin.rotation.y = (Math.PI / 2) * i;
      fin.castShadow = true;
      this.group.add(fin);
    }

    // --- 3. Twin Solid Rocket Boosters (SRBs) ---
    const boosterOffset = 1.45;
    [-1, 1].forEach((side, index) => {
      const boosterGroup = new THREE.Group();
      boosterGroup.position.set(side * boosterOffset, 2.2, 0);

      // Booster body
      const bBodyGeo = new THREE.CylinderGeometry(0.48, 0.48, 5.2, 12);
      const bBody = new THREE.Mesh(bBodyGeo, bodyMaterial);
      bBody.castShadow = true;
      boosterGroup.add(bBody);

      // Booster Nose Cone
      const bNoseGeo = new THREE.ConeGeometry(0.48, 1.5, 12);
      const bNose = new THREE.Mesh(bNoseGeo, darkMaterial);
      bNose.position.y = 3.35;
      boosterGroup.add(bNose);

      // Booster Nozzle
      const bNozzleGeo = new THREE.CylinderGeometry(0.25, 0.42, 0.6, 12, 1, true);
      const bNozzle = new THREE.Mesh(bNozzleGeo, engineMetalMaterial);
      bNozzle.position.y = -2.8;
      boosterGroup.add(bNozzle);

      // Booster nozzle interior glow
      const bGlow = new THREE.Mesh(new THREE.CircleGeometry(0.28, 12), engineNozzleGlowMaterial);
      bGlow.rotation.x = Math.PI / 2;
      bGlow.position.y = -2.7;
      boosterGroup.add(bGlow);

      // Booster Mounting Struts
      const strutGeo = new THREE.BoxGeometry(0.4, 0.15, 0.2);
      const upperStrut = new THREE.Mesh(strutGeo, darkMaterial);
      upperStrut.position.set(-side * 0.35, 1.5, 0);
      boosterGroup.add(upperStrut);

      const lowerStrut = new THREE.Mesh(strutGeo, darkMaterial);
      lowerStrut.position.set(-side * 0.35, -1.5, 0);
      boosterGroup.add(lowerStrut);

      this.boosters.push({
        mesh: boosterGroup,
        side: side,
        baseX: side * boosterOffset,
        baseY: 2.2,
        baseZ: 0
      });

      this.group.add(boosterGroup);
    });

    // --- 4. Main Engine Cluster ---
    const engineCluster = new THREE.Group();
    engineCluster.position.y = -0.2;

    // Central primary engine
    const mainNozzleGeo = new THREE.CylinderGeometry(0.35, 0.65, 0.9, 16, 1, true);
    const mainNozzle = new THREE.Mesh(mainNozzleGeo, engineMetalMaterial);
    mainNozzle.position.y = 0;
    engineCluster.add(mainNozzle);

    const mainGlow = new THREE.Mesh(new THREE.CircleGeometry(0.45, 16), engineNozzleGlowMaterial);
    mainGlow.rotation.x = Math.PI / 2;
    mainGlow.position.y = 0.1;
    engineCluster.add(mainGlow);

    this.group.add(engineCluster);

    // Dynamic light under engines
    this.mainEngineLight = new THREE.PointLight(0xff7700, 2.5, 30);
    this.mainEngineLight.position.set(0, -0.6, 0);
    this.group.add(this.mainEngineLight);

    // Initial scale and orientation
    this.group.position.set(0, 0, 0);
  }

  update(progress, scrollVelocity, delta) {
    // Subtle aerodynamic sway / roll based on velocity
    const targetRoll = scrollVelocity * 0.003;
    const targetPitch = Math.sin(Date.now() * 0.003) * 0.02 + scrollVelocity * 0.001;
    this.group.rotation.z += (targetRoll - this.group.rotation.z) * 0.1;
    this.group.rotation.x += (targetPitch - this.group.rotation.x) * 0.1;

    // Booster stage separation logic (Smooth, reversible & tied to scroll progress)
    // Detachment triggers at progress ~ 0.28 (troposphere to orbit) and smoothly separates
    const sepStart = 0.28;
    const sepDuration = 0.14;

    if (progress < sepStart) {
      // Fully attached to fuselage
      this.boostersDetached = false;
      this.boosters.forEach(b => {
        b.mesh.position.set(b.baseX, b.baseY, b.baseZ);
        b.mesh.rotation.set(0, 0, 0);
        b.mesh.visible = true;
      });
    } else {
      // Detached & drifting outward/downward
      this.boostersDetached = true;
      const t = Math.min((progress - sepStart) / sepDuration, 1.0);
      const ease = t * t * (3 - 2 * t); // smoothstep
      const extraDrift = Math.max(0, progress - (sepStart + sepDuration)) * 18.0;

      this.boosters.forEach(b => {
        const driftX = b.side * (ease * 6.5 + extraDrift * 0.8);
        const driftY = -(ease * 9.5 + extraDrift * 1.5);
        const driftZ = -(ease * 4.0 + extraDrift * 0.5);
        const rotZ = -b.side * (ease * 0.65 + extraDrift * 0.1);
        const rotX = ease * 0.45 + extraDrift * 0.1;

        b.mesh.position.set(b.baseX + driftX, b.baseY + driftY, b.baseZ + driftZ);
        b.mesh.rotation.set(rotX, 0, rotZ);

        // Hide when far away in deep space (> 0.60)
        b.mesh.visible = progress < 0.60;
      });
    }

    // Engine light pulse
    const flicker = 0.8 + Math.random() * 0.4;
    if (this.mainEngineLight) {
      this.mainEngineLight.intensity = Math.max(0.5, flicker * (1.5 + Math.abs(scrollVelocity) * 2.0));
    }
  }

  getThrusterWorldPositions() {
    const mainPos = new THREE.Vector3();
    this.group.getWorldPosition(mainPos);
    mainPos.y -= 0.6; // Base of rocket

    const leftBoosterPos = new THREE.Vector3();
    const rightBoosterPos = new THREE.Vector3();

    if (!this.boostersDetached && this.boosters.length === 2) {
      this.boosters[0].mesh.getWorldPosition(leftBoosterPos);
      leftBoosterPos.y -= 2.8;

      this.boosters[1].mesh.getWorldPosition(rightBoosterPos);
      rightBoosterPos.y -= 2.8;

      return [mainPos, leftBoosterPos, rightBoosterPos];
    }

    return [mainPos];
  }
}

