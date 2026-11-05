import * as THREE from 'three';

/**
 * Earth & Japanese Landscape Scene (Start 0km)
 * Features:
 * - Snow-capped low-poly Mount Fuji
 * - Japanese 5-tier Pagoda temple with lantern illumination
 * - Vermilion red Torii gate
 * - Sakura cherry blossom trees
 * - Tokyo distant skyline with glowing skyscraper windows
 * - High-tech launch gantry tower & platform
 */
export class EarthJapanScene {
  constructor() {
    this.group = new THREE.Group();
    this.lanternLights = [];
    this.buildLandscape();
  }

  buildLandscape() {
    // 1. Terrain & Water
    this.createTerrain();

    // 2. Mount Fuji
    this.createMountFuji();

    // 3. Traditional Japanese Pagoda
    this.createPagoda();

    // 4. Red Torii Gate
    this.createToriiGate();

    // 5. Sakura Trees
    this.createSakuraGrove();

    // 6. Tokyo Skyline Silhouette
    this.createTokyoSkyline();

    // 7. Launch Gantry Tower & Pad
    this.createLaunchPad();
  }

  createTerrain() {
    // Main grass/soil ground
    const groundGeo = new THREE.PlaneGeometry(350, 350, 32, 32);
    // Slight undulation
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Gentle rolling hillocks away from center
      const dist = Math.sqrt(x * x + y * y);
      if (dist > 25) {
        pos.setZ(i, Math.sin(x * 0.05) * Math.cos(y * 0.05) * 1.8);
      }
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x223a2a, // Deep mossy cedar green
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    this.group.add(ground);

    // Reflective Water Lake near Torii Gate
    const waterGeo = new THREE.PlaneGeometry(80, 50);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1b3b4b,
      roughness: 0.2,
      metalness: 0.7,
      transparent: true,
      opacity: 0.88
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(-30, -0.4, 20);
    this.group.add(water);
  }

  createMountFuji() {
    const fujiGroup = new THREE.Group();
    fujiGroup.position.set(-65, -0.5, -95);

    // Main Mountain Body (Low poly conical with wide curved skirts)
    const baseRadius = 55;
    const topRadius = 8;
    const height = 48;
    const fujiGeo = new THREE.CylinderGeometry(topRadius, baseRadius, height, 24, 8);

    // Displace vertices to create classic Mt. Fuji concave sweeping slopes and low-poly ridges
    const pos = fujiGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const ratio = (y + height / 2) / height; // 0 at bottom, 1 at top
      const factor = Math.pow(1 - ratio, 1.8); // graceful concave curve

      let x = pos.getX(i);
      let z = pos.getZ(i);

      // subtle ridge noise
      const angle = Math.atan2(z, x);
      const noise = 1 + Math.sin(angle * 7) * 0.035;

      pos.setX(i, x * (1 + factor * 0.4) * noise);
      pos.setZ(i, z * (1 + factor * 0.4) * noise);
    }
    fujiGeo.computeVertexNormals();

    // Mountain lower volcanic rock material
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x242838, // Slate indigo volcanic rock
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true
    });
    const mountain = new THREE.Mesh(fujiGeo, rockMat);
    mountain.position.y = height / 2;
    mountain.receiveShadow = true;
    fujiGroup.add(mountain);

    // Snow Cap Crown
    const snowHeight = 16;
    const snowGeo = new THREE.CylinderGeometry(topRadius * 1.01, 23, snowHeight, 24, 4);
    const sPos = snowGeo.attributes.position;
    for (let i = 0; i < sPos.count; i++) {
      const y = sPos.getY(i);
      const ratio = (y + snowHeight / 2) / snowHeight;
      // Snow fingers dripping down valleys
      const angle = Math.atan2(sPos.getZ(i), sPos.getX(i));
      const drip = (1 - ratio) * Math.sin(angle * 12) * 2.5;
      sPos.setY(i, y + drip);
    }
    snowGeo.computeVertexNormals();

    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.05,
      flatShading: true
    });

    const snowCap = new THREE.Mesh(snowGeo, snowMat);
    snowCap.position.y = height - snowHeight / 2 + 0.1;
    fujiGroup.add(snowCap);

    // Crater Rim
    const craterGeo = new THREE.CylinderGeometry(6, 7.5, 3, 24, 1, true);
    const craterMat = new THREE.MeshStandardMaterial({
      color: 0x1d212a,
      roughness: 0.9,
      flatShading: true,
      side: THREE.BackSide
    });
    const crater = new THREE.Mesh(craterGeo, craterMat);
    crater.position.y = height + 1;
    fujiGroup.add(crater);

    this.group.add(fujiGroup);
  }

  createPagoda() {
    const pagoda = new THREE.Group();
    pagoda.position.set(28, 0, -22);

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x3d1c15, // Dark Japanese cedar wood
      roughness: 0.7,
      flatShading: true
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x232c33, // Japanese dark slate roof tiles
      roughness: 0.5,
      flatShading: true
    });

    const vermilionMat = new THREE.MeshStandardMaterial({
      color: 0xb33927,
      roughness: 0.5,
      flatShading: true
    });

    // 5 Tiers
    let currentY = 0;
    const tiers = 5;

    // Stone Foundation
    const baseGeo = new THREE.BoxGeometry(7, 1.2, 7);
    const base = new THREE.Mesh(baseGeo, new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.9, flatShading: true }));
    base.position.y = 0.6;
    pagoda.add(base);
    currentY += 1.2;

    for (let i = 0; i < tiers; i++) {
      const scale = 1 - i * 0.12;
      const tierHeight = 2.4 * scale;

      // Wall / Columns
      const wallGeo = new THREE.BoxGeometry(4.2 * scale, tierHeight, 4.2 * scale);
      const wall = new THREE.Mesh(wallGeo, vermilionMat);
      wall.position.y = currentY + tierHeight / 2;
      pagoda.add(wall);

      // Wooden pillars at corners
      [-1, 1].forEach(px => {
        [-1, 1].forEach(pz => {
          const colGeo = new THREE.CylinderGeometry(0.18 * scale, 0.18 * scale, tierHeight, 8);
          const col = new THREE.Mesh(colGeo, woodMat);
          col.position.set(px * 2.1 * scale, currentY + tierHeight / 2, pz * 2.1 * scale);
          pagoda.add(col);
        });
      });

      currentY += tierHeight;

      // Curved Eaves Roof
      const roofRadius = 6.8 * scale;
      const roofGeo = new THREE.ConeGeometry(roofRadius, 1.4 * scale, 4);
      // Rotate 45 deg so corners align nicely
      roofGeo.rotateY(Math.PI / 4);

      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = currentY + 0.6 * scale;
      roof.castShadow = true;
      pagoda.add(roof);

      currentY += 1.1 * scale;
    }

    // Pagoda Finial (Sorin / spire on top)
    const sorinGeo = new THREE.CylinderGeometry(0.08, 0.3, 4.5, 8);
    const sorinMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden bronze
      metalness: 0.8,
      roughness: 0.3
    });
    const sorin = new THREE.Mesh(sorinGeo, sorinMat);
    sorin.position.y = currentY + 2.2;
    pagoda.add(sorin);

    // Warm Hanging Lanterns
    const lanternGeo = new THREE.BoxGeometry(0.5, 0.7, 0.5);
    const lanternMat = new THREE.MeshBasicMaterial({ color: 0xffb142 });
    [-2.2, 2.2].forEach(lx => {
      const lantern = new THREE.Mesh(lanternGeo, lanternMat);
      lantern.position.set(lx, 3.2, 2.2);
      pagoda.add(lantern);

      const pLight = new THREE.PointLight(0xffb142, 1.2, 10);
      pLight.position.set(lx, 3.2, 2.2);
      pagoda.add(pLight);
      this.lanternLights.push(pLight);
    });

    this.group.add(pagoda);
  }

  createToriiGate() {
    const torii = new THREE.Group();
    torii.position.set(-25, 0, 18);
    torii.rotation.y = Math.PI * 0.15;

    const vermilionMat = new THREE.MeshStandardMaterial({
      color: 0xd63031, // Vibrant Japanese vermilion
      roughness: 0.4,
      flatShading: true
    });

    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x1e272e,
      roughness: 0.6,
      flatShading: true
    });

    // Twin Pillars (Hashira) with slight inward tilt
    [-3.2, 3.2].forEach(x => {
      const pillarGeo = new THREE.CylinderGeometry(0.38, 0.46, 8.5, 12);
      const pillar = new THREE.Mesh(pillarGeo, vermilionMat);
      pillar.position.set(x, 4.25, 0);
      pillar.rotation.z = x > 0 ? 0.03 : -0.03;
      pillar.castShadow = true;
      torii.add(pillar);

      // Stone ring base (Kamebara)
      const baseGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.5, 12);
      const base = new THREE.Mesh(baseGeo, blackMat);
      base.position.set(x, 0.25, 0);
      torii.add(base);
    });

    // Lower Tie-Beam (Nuki)
    const nukiGeo = new THREE.BoxGeometry(8.5, 0.45, 0.45);
    const nuki = new THREE.Mesh(nukiGeo, vermilionMat);
    nuki.position.set(0, 6.5, 0);
    nuki.castShadow = true;
    torii.add(nuki);

    // Central Strut (Gakuzuka)
    const gakuzukaGeo = new THREE.BoxGeometry(0.4, 1.2, 0.3);
    const gakuzuka = new THREE.Mesh(gakuzukaGeo, vermilionMat);
    gakuzuka.position.set(0, 7.3, 0);
    torii.add(gakuzuka);

    // Upper Crossbeam (Shimaki)
    const shimakiGeo = new THREE.BoxGeometry(9.6, 0.55, 0.65);
    const shimaki = new THREE.Mesh(shimakiGeo, vermilionMat);
    shimaki.position.set(0, 8.1, 0);
    torii.add(shimaki);

    // Top Curved Roof Beam (Kasagi) with upturned edges
    const kasagiGeo = new THREE.BoxGeometry(10.5, 0.6, 0.9);
    const kasagi = new THREE.Mesh(kasagiGeo, blackMat);
    kasagi.position.set(0, 8.6, 0);
    kasagi.castShadow = true;
    torii.add(kasagi);

    this.group.add(torii);
  }

  createSakuraGrove() {
    // Several sakura trees arranged around the foreground and near the pagoda
    const treePositions = [
      { x: -16, z: 8, scale: 1.1 },
      { x: -28, z: 2, scale: 1.25 },
      { x: -12, z: -15, scale: 0.95 },
      { x: 18, z: -12, scale: 1.15 },
      { x: 24, z: 10, scale: 1.3 },
      { x: 38, z: -8, scale: 1.05 }
    ];

    treePositions.forEach(p => {
      const tree = this.buildSingleSakuraTree(p.scale);
      tree.position.set(p.x, 0, p.z);
      this.group.add(tree);
    });
  }

  buildSingleSakuraTree(scale = 1.0) {
    const tree = new THREE.Group();

    // Wood Material
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      roughness: 0.85,
      flatShading: true
    });

    // Blossom Foliage Materials (delicate, serene pale sakura blush)
    const pinkMat1 = new THREE.MeshStandardMaterial({
      color: 0xfce7f3, // Soft ivory blush
      roughness: 0.8,
      flatShading: true
    });
    const pinkMat2 = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9, // Subtle pale slate white
      roughness: 0.8,
      flatShading: true
    });

    // Gnarled Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.35 * scale, 0.65 * scale, 5.0 * scale, 8);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 2.5 * scale;
    trunk.rotation.z = (Math.random() - 0.5) * 0.15;
    trunk.castShadow = true;
    tree.add(trunk);

    // Blossom Cloud Clusters (Low poly icosahedrons clustered organically)
    const clusterOffsets = [
      { x: 0, y: 5.5, z: 0, r: 2.3, mat: pinkMat1 },
      { x: -1.6, y: 4.8, z: 1.1, r: 1.8, mat: pinkMat2 },
      { x: 1.7, y: 5.1, z: -1.0, r: 1.9, mat: pinkMat1 },
      { x: 0.5, y: 6.8, z: 0.6, r: 1.6, mat: pinkMat2 },
      { x: -1.0, y: 6.2, z: -1.2, r: 1.5, mat: pinkMat1 }
    ];

    clusterOffsets.forEach(c => {
      const blossomGeo = new THREE.IcosahedronGeometry(c.r * scale, 1);
      const blossomMesh = new THREE.Mesh(blossomGeo, c.mat);
      blossomMesh.position.set(c.x * scale, c.y * scale, c.z * scale);
      blossomMesh.castShadow = true;
      tree.add(blossomMesh);
    });

    return tree;
  }

  createTokyoSkyline() {
    const cityGroup = new THREE.Group();
    cityGroup.position.set(55, 0, -85);

    const bldgMat = new THREE.MeshStandardMaterial({
      color: 0x151b29,
      roughness: 0.6,
      metalness: 0.3,
      flatShading: true
    });

    // Refined subtle window lights (soft warm white and cool silver, not disco neon)
    const windowMatWarm = new THREE.MeshBasicMaterial({ color: 0xf1f5f9 });
    const windowMatCyan = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });

    // Generate clusters of varied skyscrapers
    for (let i = 0; i < 35; i++) {
      const width = 3 + Math.random() * 4.5;
      const depth = 3 + Math.random() * 4.5;
      const height = 15 + Math.random() * 32;

      const bldgGeo = new THREE.BoxGeometry(width, height, depth);
      const bldg = new THREE.Mesh(bldgGeo, bldgMat);

      const px = (i % 7) * 7.5 - 25 + (Math.random() - 0.5) * 4;
      const pz = Math.floor(i / 7) * 7.5 - 15 + (Math.random() - 0.5) * 4;

      bldg.position.set(px, height / 2, pz);
      cityGroup.add(bldg);

      // Add glowing windows on some buildings
      if (Math.random() < 0.7) {
        const winGeo = new THREE.PlaneGeometry(width * 0.75, height * 0.7);
        const winMesh = new THREE.Mesh(winGeo, Math.random() < 0.6 ? windowMatWarm : windowMatCyan);
        winMesh.position.set(px, height / 2, pz + depth / 2 + 0.05);
        cityGroup.add(winMesh);
      }

      // Antenna beacon atop tall towers
      if (height > 35) {
        const antennaGeo = new THREE.CylinderGeometry(0.08, 0.15, 6, 6);
        const antenna = new THREE.Mesh(antennaGeo, bldgMat);
        antenna.position.set(px, height + 3, pz);
        cityGroup.add(antenna);

        const beaconGeo = new THREE.SphereGeometry(0.35, 8, 8);
        const beacon = new THREE.Mesh(beaconGeo, new THREE.MeshBasicMaterial({ color: 0xff3838 }));
        beacon.position.set(px, height + 6.2, pz);
        cityGroup.add(beacon);
      }
    }

    this.group.add(cityGroup);
  }

  createLaunchPad() {
    const padGroup = new THREE.Group();
    padGroup.position.set(0, 0, 0);

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x485460,
      metalness: 0.8,
      roughness: 0.35,
      flatShading: true
    });

    const yellowAccentMat = new THREE.MeshStandardMaterial({
      color: 0xfbc531,
      roughness: 0.4,
      flatShading: true
    });

    // Circular Launch Table / Mount
    const mountGeo = new THREE.CylinderGeometry(4.5, 5.5, 1.2, 16);
    const mount = new THREE.Mesh(mountGeo, steelMat);
    mount.position.y = 0.6;
    mount.receiveShadow = true;
    padGroup.add(mount);

    // Flame Trench Opening ring
    const trenchGeo = new THREE.RingGeometry(1.6, 3.2, 16);
    const trenchMat = new THREE.MeshBasicMaterial({ color: 0x050508, side: THREE.DoubleSide });
    const trench = new THREE.Mesh(trenchGeo, trenchMat);
    trench.rotation.x = -Math.PI / 2;
    trench.position.y = 1.21;
    padGroup.add(trench);

    // Launch Gantry Tower (Lattice steel structure)
    const towerX = 4.2;
    const towerZ = 0;
    const towerHeight = 16.5;

    // 4 Main corner columns
    [-1, 1].forEach(gx => {
      [-1, 1].forEach(gz => {
        const colGeo = new THREE.CylinderGeometry(0.18, 0.22, towerHeight, 8);
        const col = new THREE.Mesh(colGeo, steelMat);
        col.position.set(towerX + gx * 1.4, towerHeight / 2, towerZ + gz * 1.4);
        col.castShadow = true;
        padGroup.add(col);
      });
    });

    // Horizontal truss platforms every 3 meters
    for (let y = 3; y <= towerHeight; y += 3) {
      const trussGeo = new THREE.BoxGeometry(3.1, 0.25, 3.1);
      const truss = new THREE.Mesh(trussGeo, yellowAccentMat);
      truss.position.set(towerX, y, towerZ);
      padGroup.add(truss);
    }

    // Retractable Gantry Service Arms pointing toward rocket
    [6.5, 11.5].forEach(armY => {
      const armGeo = new THREE.BoxGeometry(2.8, 0.35, 0.6);
      const arm = new THREE.Mesh(armGeo, steelMat);
      arm.position.set(towerX - 1.5, armY, towerZ);
      padGroup.add(arm);

      // Arm clamp
      const clampGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.3, 12, 1, true, -Math.PI / 2, Math.PI);
      const clamp = new THREE.Mesh(clampGeo, yellowAccentMat);
      clamp.position.set(towerX - 2.8, armY, towerZ);
      clamp.rotation.z = Math.PI / 2;
      padGroup.add(clamp);
    });

    // Floodlight Beams aimed at rocket
    const spotGeo = new THREE.BoxGeometry(0.6, 0.6, 0.8);
    const spotMesh = new THREE.Mesh(spotGeo, steelMat);
    spotMesh.position.set(towerX - 1.2, 14.5, towerZ);
    spotMesh.lookAt(0, 7, 0);
    padGroup.add(spotMesh);

    const padSpot = new THREE.SpotLight(0xfff1cf, 3.5, 25, Math.PI / 4, 0.4);
    padSpot.position.set(towerX - 1.2, 14.5, towerZ);
    padSpot.target.position.set(0, 6, 0);
    padGroup.add(padSpot);
    padGroup.add(padSpot.target);

    this.group.add(padGroup);
  }
}

