import * as THREE from 'three';
import { createAnimeToonMaterial, AnimeColors, addAnimeOutline } from '../core/AnimeStyle.js';

/**
 * Earth & Japanese Landscape Scene (Start 0km)
 * Enhanced with 2D Cartoon / Makoto Shinkai Anime Cel-Shaded aesthetics:
 * - Snow-capped Mount Fuji with discrete anime cel-shading & ink outlines
 * - Layered mountain ridges for atmospheric distance
 * - Japanese 5-tier Pagoda temple with lantern illumination & cel outlines
 * - Vermilion red Torii gate with authentic ink outlines
 * - Red arched wooden bridge (Taiko-bashi) crossing the koi pond
 * - Flagstone stone path connecting Torii, Bridge, Launchpad, and Pagoda
 * - Japanese Stone Lanterns (Tōrō) with warm glowing fireboxes
 * - Japanese Pine Trees (Matsu) & Bamboo groves
 * - Cherry Blossom (Sakura) grove with drifting petals
 * - Tokyo distant skyline with glowing skyscraper windows
 * - High-tech launch gantry tower with cartoon cel outlines
 */
export class EarthJapanScene {
  constructor() {
    this.group = new THREE.Group();
    this.lanternLights = [];
    this.distantClouds = [];
    this.buildLandscape();
  }

  buildLandscape() {
    // 1. Terrain & Water
    this.createTerrain();

    // 2. Mountain Ridges & Mount Fuji
    this.createLayeredMountains();
    this.createMountFuji();
    this.createLowAnimeClouds();

    // 3. Traditional Japanese Pagoda
    this.createPagoda();

    // 4. Red Torii Gate
    this.createToriiGate();

    // 5. Connecting Stone Path & Taiko-bashi Arched Bridge
    this.createStonePathAndBridge();

    // 6. Japanese Stone Lanterns (Tōrō)
    this.createStoneLanterns();

    // 7. Vegetation: Sakura, Matsu Pine, Bamboo, and Grass Tufts
    this.createSakuraGrove();
    this.createJapanesePineTrees();
    this.createBambooGrove();
    this.createGrassTufts();

    // 8. Tokyo Skyline Silhouette
    this.createTokyoSkyline();

    // 9. Launch Gantry Tower & Pad
    this.createLaunchPad();
  }

  createTerrain() {
    // Main grass/soil ground with stepped anime contour
    const groundGeo = new THREE.PlaneGeometry(350, 350, 40, 40);
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      if (dist > 18) {
        pos.setZ(i, Math.sin(x * 0.05) * Math.cos(y * 0.05) * 2.2);
      }
    }
    groundGeo.computeVertexNormals();

    const groundMat = createAnimeToonMaterial({
      color: 0x1d3a28, // Anime lush cedar green
      roughness: 0.8,
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    this.group.add(ground);

    // Reflective Water Lake / Koi Pond
    const waterGeo = new THREE.PlaneGeometry(85, 55, 16, 16);
    const waterMat = createAnimeToonMaterial({
      color: 0x1e40af,
      roughness: 0.15,
      transparent: true,
      opacity: 0.88,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(-28, -0.38, 16);
    this.group.add(water);

    // Pond shoreline stone border
    const stoneRingMat = createAnimeToonMaterial({ color: 0x475569, roughness: 0.9 });
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const rx = 40 + Math.sin(i * 3) * 3;
      const rz = 24 + Math.cos(i * 2) * 2;
      const sGeo = new THREE.DodecahedronGeometry(0.8 + (i % 3) * 0.35, 0);
      const stone = new THREE.Mesh(sGeo, stoneRingMat);
      stone.position.set(-28 + Math.cos(angle) * rx, -0.2, 16 + Math.sin(angle) * rz);
      stone.rotation.set(i * 0.5, i * 0.8, 0);
      addAnimeOutline(stone, 0.04, 0x0f172a);
      this.group.add(stone);
    }
  }

  createLayeredMountains() {
    // 2 Layered mountain silhouettes in front of Mount Fuji for Shinkai depth
    const mountainMat1 = createAnimeToonMaterial({
      color: 0x172554, // Deep twilight indigo ridge
      roughness: 0.9,
    });
    const mountainMat2 = createAnimeToonMaterial({
      color: 0x1e1b4b, // Dark purple-navy mid ridge
      roughness: 0.9,
    });

    const ridges = [
      { x: -95, z: -70, y: 12, w: 90, h: 26, mat: mountainMat1 },
      { x: -35, z: -85, y: 10, w: 80, h: 22, mat: mountainMat2 },
    ];

    ridges.forEach(r => {
      const geo = new THREE.ConeGeometry(r.w / 2, r.h, 7);
      const mesh = new THREE.Mesh(geo, r.mat);
      mesh.position.set(r.x, r.y - 0.5, r.z);
      mesh.scale.set(1.4, 1.0, 0.5);
      addAnimeOutline(mesh, 0.02, 0x090d16);
      this.group.add(mesh);
    });
  }

  createMountFuji() {
    const fujiGroup = new THREE.Group();
    fujiGroup.position.set(-65, -0.5, -95);

    const baseRadius = 55;
    const topRadius = 8;
    const height = 48;
    const fujiGeo = new THREE.CylinderGeometry(topRadius, baseRadius, height, 28, 8);

    const pos = fujiGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const ratio = (y + height / 2) / height;
      const factor = Math.pow(1 - ratio, 1.8);

      let x = pos.getX(i);
      let z = pos.getZ(i);

      const angle = Math.atan2(z, x);
      const noise = 1 + Math.sin(angle * 7) * 0.035;

      pos.setX(i, x * (1 + factor * 0.4) * noise);
      pos.setZ(i, z * (1 + factor * 0.4) * noise);
    }
    fujiGeo.computeVertexNormals();

    // Mountain lower volcanic rock material (Cel-shaded Anime)
    const rockMat = createAnimeToonMaterial({
      color: AnimeColors.fujiMountain,
      roughness: 0.85,
    });
    const mountain = new THREE.Mesh(fujiGeo, rockMat);
    mountain.position.y = height / 2;
    mountain.receiveShadow = true;
    addAnimeOutline(mountain, 0.015, 0x090d16);
    fujiGroup.add(mountain);

    // Snow Cap Crown (Crisp Anime Cel Snow)
    const snowHeight = 16;
    const snowGeo = new THREE.CylinderGeometry(topRadius * 1.01, 23, snowHeight, 28, 4);
    const sPos = snowGeo.attributes.position;
    for (let i = 0; i < sPos.count; i++) {
      const y = sPos.getY(i);
      const ratio = (y + snowHeight / 2) / snowHeight;
      const angle = Math.atan2(sPos.getZ(i), sPos.getX(i));
      const drip = (1 - ratio) * Math.sin(angle * 12) * 2.5;
      sPos.setY(i, y + drip);
    }
    snowGeo.computeVertexNormals();

    const snowMat = createAnimeToonMaterial({
      color: AnimeColors.fujiSnow,
      roughness: 0.6,
    });

    const snowCap = new THREE.Mesh(snowGeo, snowMat);
    snowCap.position.y = height - snowHeight / 2 + 0.1;
    addAnimeOutline(snowCap, 0.02, 0x1e1b4b);
    fujiGroup.add(snowCap);

    // Crater Rim
    const craterGeo = new THREE.CylinderGeometry(6, 7.5, 3, 24, 1, true);
    const craterMat = new THREE.MeshBasicMaterial({ color: 0x111827, side: THREE.BackSide });
    const crater = new THREE.Mesh(craterGeo, craterMat);
    crater.position.y = height + 1;
    fujiGroup.add(crater);

    this.group.add(fujiGroup);
  }

  createLowAnimeClouds() {
    // Stylized flat anime clouds drifting near Mount Fuji base
    const cloudMat = createAnimeToonMaterial({
      color: 0xfff1f2, // Soft twilight rose-white
      transparent: true,
      opacity: 0.85,
    });

    const cloudConfigs = [
      { x: -45, y: 16, z: -75, w: 28, h: 4, d: 8, speed: 0.4 },
      { x: -80, y: 22, z: -85, w: 34, h: 5, d: 9, speed: 0.3 },
      { x: -20, y: 19, z: -70, w: 22, h: 3.5, d: 7, speed: 0.5 },
    ];

    cloudConfigs.forEach(c => {
      const group = new THREE.Group();
      group.position.set(c.x, c.y, c.z);

      const count = 4;
      for (let i = 0; i < count; i++) {
        const r = (c.h / 2) * (1 + (i % 2) * 0.4);
        const geo = new THREE.SphereGeometry(r, 12, 12);
        const mesh = new THREE.Mesh(geo, cloudMat);
        mesh.scale.set(1.8, 0.7, 1.2);
        mesh.position.set((i - count / 2) * (c.w / count) * 0.7, 0, 0);
        addAnimeOutline(mesh, 0.03, 0x831843);
        group.add(mesh);
      }

      this.distantClouds.push({ group, speed: c.speed, baseX: c.x });
      this.group.add(group);
    });
  }

  createPagoda() {
    const pagoda = new THREE.Group();
    pagoda.position.set(30, 0, -22);

    const woodMat = createAnimeToonMaterial({
      color: 0x3d1c15,
      roughness: 0.7,
    });

    const roofMat = createAnimeToonMaterial({
      color: 0x1e293b,
      roughness: 0.5,
    });

    const vermilionMat = createAnimeToonMaterial({
      color: AnimeColors.toriiVermilion,
      roughness: 0.4,
    });

    // Stone Foundation
    const baseGeo = new THREE.BoxGeometry(7.5, 1.2, 7.5);
    const baseMat = createAnimeToonMaterial({ color: 0x475569, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.6;
    addAnimeOutline(base, 0.03, 0x090d16);
    pagoda.add(base);

    let currentY = 1.2;
    const tiers = 5;

    for (let i = 0; i < tiers; i++) {
      const scale = 1 - i * 0.12;
      const tierHeight = 2.4 * scale;

      // Wall / Columns
      const wallGeo = new THREE.BoxGeometry(4.2 * scale, tierHeight, 4.2 * scale);
      const wall = new THREE.Mesh(wallGeo, vermilionMat);
      wall.position.y = currentY + tierHeight / 2;
      addAnimeOutline(wall, 0.03, 0x180d16);
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
      roofGeo.rotateY(Math.PI / 4);

      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = currentY + 0.6 * scale;
      roof.castShadow = true;
      addAnimeOutline(roof, 0.035, 0x090d16);
      pagoda.add(roof);

      currentY += 1.1 * scale;
    }

    // Pagoda Finial (Sorin / spire on top)
    const sorinGeo = new THREE.CylinderGeometry(0.08, 0.3, 4.5, 8);
    const sorinMat = createAnimeToonMaterial({
      color: 0xf59e0b,
      emissive: 0xb45309,
      emissiveIntensity: 0.3,
      roughness: 0.3,
    });
    const sorin = new THREE.Mesh(sorinGeo, sorinMat);
    sorin.position.y = currentY + 2.2;
    addAnimeOutline(sorin, 0.04, 0x111827);
    pagoda.add(sorin);

    // Warm Hanging Lanterns
    const lanternGeo = new THREE.BoxGeometry(0.5, 0.7, 0.5);
    const lanternMat = new THREE.MeshBasicMaterial({ color: 0xffb142 });
    [-2.2, 2.2].forEach(lx => {
      const lantern = new THREE.Mesh(lanternGeo, lanternMat);
      lantern.position.set(lx, 3.2, 2.2);
      addAnimeOutline(lantern, 0.05, 0x78350f);
      pagoda.add(lantern);

      const pLight = new THREE.PointLight(0xffb142, 1.4, 12);
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

    const vermilionMat = createAnimeToonMaterial({
      color: AnimeColors.toriiVermilion,
      roughness: 0.35,
    });

    const blackMat = createAnimeToonMaterial({
      color: 0x1e293b,
      roughness: 0.5,
    });

    // Twin Pillars (Hashira) with slight inward tilt & anime outlines
    [-3.2, 3.2].forEach(x => {
      const pillarGeo = new THREE.CylinderGeometry(0.38, 0.46, 8.5, 12);
      const pillar = new THREE.Mesh(pillarGeo, vermilionMat);
      pillar.position.set(x, 4.25, 0);
      pillar.rotation.z = x > 0 ? 0.03 : -0.03;
      pillar.castShadow = true;
      addAnimeOutline(pillar, 0.04, 0x180d16);
      torii.add(pillar);

      // Stone ring base (Kamebara)
      const baseGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.5, 12);
      const base = new THREE.Mesh(baseGeo, blackMat);
      base.position.set(x, 0.25, 0);
      addAnimeOutline(base, 0.04, 0x090d16);
      torii.add(base);
    });

    // Lower Tie-Beam (Nuki)
    const nukiGeo = new THREE.BoxGeometry(8.5, 0.45, 0.45);
    const nuki = new THREE.Mesh(nukiGeo, vermilionMat);
    nuki.position.set(0, 6.5, 0);
    nuki.castShadow = true;
    addAnimeOutline(nuki, 0.04, 0x180d16);
    torii.add(nuki);

    // Central Strut (Gakuzuka)
    const gakuzukaGeo = new THREE.BoxGeometry(0.4, 1.2, 0.3);
    const gakuzuka = new THREE.Mesh(gakuzukaGeo, vermilionMat);
    gakuzuka.position.set(0, 7.3, 0);
    addAnimeOutline(gakuzuka, 0.04, 0x180d16);
    torii.add(gakuzuka);

    // Upper Crossbeam (Shimaki)
    const shimakiGeo = new THREE.BoxGeometry(9.6, 0.55, 0.65);
    const shimaki = new THREE.Mesh(shimakiGeo, vermilionMat);
    shimaki.position.set(0, 8.1, 0);
    addAnimeOutline(shimaki, 0.04, 0x180d16);
    torii.add(shimaki);

    // Top Curved Roof Beam (Kasagi) with upturned edges
    const kasagiGeo = new THREE.BoxGeometry(10.5, 0.6, 0.9);
    const kasagi = new THREE.Mesh(kasagiGeo, blackMat);
    kasagi.position.set(0, 8.6, 0);
    kasagi.castShadow = true;
    addAnimeOutline(kasagi, 0.04, 0x090d16);
    torii.add(kasagi);

    this.group.add(torii);
  }

  createStonePathAndBridge() {
    // 1. Red Arched Wooden Footbridge (Taiko-bashi) crossing the pond
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(-18, 0, 16);
    bridgeGroup.rotation.y = Math.PI * 0.15;

    const redWood = createAnimeToonMaterial({ color: 0xef4444, roughness: 0.4 });
    const darkWood = createAnimeToonMaterial({ color: 0x1e293b, roughness: 0.6 });

    // Curved Bridge Deck
    const deckSegments = 9;
    for (let i = 0; i < deckSegments; i++) {
      const t = (i / (deckSegments - 1)) - 0.5; // -0.5 to 0.5
      const plankGeo = new THREE.BoxGeometry(2.4, 0.2, 0.95);
      const plank = new THREE.Mesh(plankGeo, darkWood);
      const py = 0.5 + (0.25 - t * t) * 2.2;
      plank.position.set(0, py, t * 10);
      plank.rotation.x = -t * 0.45;
      addAnimeOutline(plank, 0.035, 0x090d16);
      bridgeGroup.add(plank);

      // Red Railing posts on both sides
      [-1.15, 1.15].forEach(rx => {
        const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6);
        const post = new THREE.Mesh(postGeo, redWood);
        post.position.set(rx, py + 0.45, t * 10);
        addAnimeOutline(post, 0.04, 0x180d16);
        bridgeGroup.add(post);
      });
    }

    // Handrail beams
    [-1.15, 1.15].forEach(rx => {
      const railGeo = new THREE.BoxGeometry(0.12, 0.12, 10.5);
      const rail = new THREE.Mesh(railGeo, redWood);
      rail.position.set(rx, 1.45, 0);
      addAnimeOutline(rail, 0.04, 0x180d16);
      bridgeGroup.add(rail);
    });

    this.group.add(bridgeGroup);

    // 2. Stepping Stone Pathway connecting Torii -> Bridge -> Launch Pad Courtyard -> Pagoda
    const stoneMat = createAnimeToonMaterial({ color: 0x64748b, roughness: 0.9 });
    const pathWaypoints = [
      // From Torii toward Bridge
      { x: -25, z: 18 }, { x: -23, z: 17 }, { x: -20, z: 16 },
      // From Bridge toward Launchpad
      { x: -14, z: 15 }, { x: -11, z: 13 }, { x: -8, z: 10 }, { x: -5, z: 7 }, { x: -3, z: 4 }, { x: -1.5, z: 1.5 },
      // Surrounding launchpad flagstones
      { x: -4, z: -1 }, { x: -4, z: 1 }, { x: -2, z: 4 }, { x: 2, z: 4 }, { x: 4, z: 2 },
      // Toward Pagoda
      { x: 6, z: -2 }, { x: 10, z: -6 }, { x: 15, z: -10 }, { x: 20, z: -14 }, { x: 25, z: -18 }, { x: 28, z: -20 }
    ];

    pathWaypoints.forEach((pt, idx) => {
      const w = 1.6 + ((idx % 3) * 0.25);
      const d = 1.3 + ((idx % 2) * 0.3);
      const paverGeo = new THREE.CylinderGeometry(w / 2, (w / 2) * 1.05, 0.18, 7);
      const paver = new THREE.Mesh(paverGeo, stoneMat);
      paver.position.set(pt.x, -0.38, pt.z);
      paver.rotation.y = idx * 0.7;
      paver.scale.set(1.0, 1.0, d / w);
      addAnimeOutline(paver, 0.04, 0x0f172a);
      this.group.add(paver);
    });
  }

  createStoneLanterns() {
    // Traditional Japanese Stone Lanterns (Ishidōrō / Tōrō) with glowing firebox
    const lanternPositions = [
      { x: -22, z: 21 },
      { x: -28, z: 15 },
      { x: -14, z: 19 },
      { x: -7, z: 12 },
      { x: 3, z: 5 },
      { x: 23, z: -16 },
      { x: 34, z: -18 }
    ];

    const stoneMat = createAnimeToonMaterial({ color: 0x475569, roughness: 0.85 });
    const fireboxMat = new THREE.MeshBasicMaterial({ color: 0xffb703 });

    lanternPositions.forEach(lp => {
      const lantern = new THREE.Group();
      lantern.position.set(lp.x, -0.4, lp.z);

      // Base (Kiso)
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.85, 0.4, 6), stoneMat);
      base.position.y = 0.2;
      addAnimeOutline(base, 0.04, 0x090d16);
      lantern.add(base);

      // Post (Sao)
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 1.2, 8), stoneMat);
      post.position.y = 1.0;
      addAnimeOutline(post, 0.04, 0x090d16);
      lantern.add(post);

      // Middle platform (Chūdai)
      const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.5, 0.3, 6), stoneMat);
      mid.position.y = 1.75;
      addAnimeOutline(mid, 0.04, 0x090d16);
      lantern.add(mid);

      // Glowing Firebox (Hibukuro)
      const firebox = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), fireboxMat);
      firebox.position.y = 2.2;
      addAnimeOutline(firebox, 0.05, 0xd97706);
      lantern.add(firebox);

      // Flared Roof (Kasa) with upturned corners
      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.2, 0.55, 6), stoneMat);
      roof.position.y = 2.75;
      addAnimeOutline(roof, 0.04, 0x090d16);
      lantern.add(roof);

      // Jewel Finial (Hōju)
      const finial = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), stoneMat);
      finial.position.y = 3.15;
      addAnimeOutline(finial, 0.04, 0x090d16);
      lantern.add(finial);

      // Warm Amber Glow PointLight
      const pLight = new THREE.PointLight(0xffb703, 1.2, 8);
      pLight.position.set(0, 2.2, 0);
      lantern.add(pLight);
      this.lanternLights.push(pLight);

      this.group.add(lantern);
    });
  }

  createJapanesePineTrees() {
    // Matsu (Japanese Black Pine / Cloud-cut Pine)
    const pinePositions = [
      { x: -38, z: 8, scale: 1.15, rotY: 0.4 },
      { x: -32, z: -12, scale: 1.3, rotY: 1.2 },
      { x: 12, z: 12, scale: 1.1, rotY: -0.6 },
      { x: 38, z: -4, scale: 1.25, rotY: 2.1 },
    ];

    const barkMat = createAnimeToonMaterial({ color: 0x271e18, roughness: 0.9 });
    const needleMat = createAnimeToonMaterial({ color: 0x14532d, roughness: 0.8 });

    pinePositions.forEach(pp => {
      const pine = new THREE.Group();
      pine.position.set(pp.x, -0.4, pp.z);
      pine.rotation.y = pp.rotY;

      // Curved twisting trunk
      const trunk1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 3.5, 7), barkMat);
      trunk1.position.set(0, 1.75, 0);
      trunk1.rotation.z = 0.18;
      addAnimeOutline(trunk1, 0.04, 0x090d16);
      pine.add(trunk1);

      const trunk2 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, 3.2, 7), barkMat);
      trunk2.position.set(0.6, 4.4, 0.3);
      trunk2.rotation.z = -0.22;
      addAnimeOutline(trunk2, 0.04, 0x090d16);
      pine.add(trunk2);

      // Tiered horizontal cloud needle pads
      const pads = [
        { x: -0.6, y: 3.2, z: 0.2, rx: 1.8, rz: 1.3 },
        { x: 1.3, y: 4.8, z: 0.4, rx: 2.2, rz: 1.6 },
        { x: 0.4, y: 6.2, z: 0.1, rx: 1.9, rz: 1.4 },
        { x: 0.8, y: 7.2, z: -0.2, rx: 1.4, rz: 1.1 },
      ];

      pads.forEach(p => {
        const padGeo = new THREE.CylinderGeometry(p.rx, p.rx * 1.15, 0.6, 8);
        const pad = new THREE.Mesh(padGeo, needleMat);
        pad.scale.set(1.0, 0.8, p.rz / p.rx);
        pad.position.set(p.x, p.y, p.z);
        addAnimeOutline(pad, 0.035, 0x052e16);
        pine.add(pad);
      });

      pine.scale.multiplyScalar(pp.scale);
      this.group.add(pine);
    });
  }

  createBambooGrove() {
    // Clustered Bamboo stalks near the pond edge
    const grovePositions = [
      { cx: -36, cz: 28, count: 14 },
      { cx: -15, cz: 28, count: 12 },
    ];

    const bambooMat = createAnimeToonMaterial({ color: 0x4ade80, roughness: 0.6 });
    const leafMat = createAnimeToonMaterial({ color: 0x16a34a, roughness: 0.7 });

    grovePositions.forEach(g => {
      for (let i = 0; i < g.count; i++) {
        const bx = g.cx + (Math.random() - 0.5) * 5;
        const bz = g.cz + (Math.random() - 0.5) * 5;
        const height = 6.0 + Math.random() * 4.5;

        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, height, 7), bambooMat);
        stalk.position.set(bx, height / 2 - 0.4, bz);
        stalk.rotation.z = (Math.random() - 0.5) * 0.08;
        addAnimeOutline(stalk, 0.04, 0x14532d);
        this.group.add(stalk);

        // Clustered leaves on top
        for (let j = 0; j < 3; j++) {
          const leafGeo = new THREE.ConeGeometry(0.6, 1.4, 4);
          const leaf = new THREE.Mesh(leafGeo, leafMat);
          leaf.position.set(bx + (Math.random() - 0.5) * 0.5, height - 0.5 + j * 0.6, bz);
          leaf.rotation.set(0.4, j * 2.0, 0);
          addAnimeOutline(leaf, 0.04, 0x052e16);
          this.group.add(leaf);
        }
      }
    });
  }

  createGrassTufts() {
    // Stylized Anime Grass Clumps and Wildflowers scattered across ground
    const grassMat = createAnimeToonMaterial({ color: 0x22c55e, roughness: 0.8 });
    const flowerMatYellow = createAnimeToonMaterial({ color: 0xfef08a, roughness: 0.4 });
    const flowerMatWhite = createAnimeToonMaterial({ color: 0xffffff, roughness: 0.4 });

    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 5 + Math.random() * 38;
      const gx = Math.cos(angle) * dist;
      const gz = Math.sin(angle) * dist;

      // Don't place in pond or under rocket pad
      if (gx > -40 && gx < -16 && gz > 5 && gz < 30) continue;
      if (Math.abs(gx) < 3.5 && Math.abs(gz) < 3.5) continue;

      const tuftGroup = new THREE.Group();
      tuftGroup.position.set(gx, -0.4, gz);

      // 3 Blades of grass
      for (let b = 0; b < 3; b++) {
        const bladeGeo = new THREE.ConeGeometry(0.12, 0.7 + Math.random() * 0.4, 4);
        const blade = new THREE.Mesh(bladeGeo, grassMat);
        blade.position.set((b - 1) * 0.16, 0.35, 0);
        blade.rotation.z = (b - 1) * 0.35;
        tuftGroup.add(blade);
      }

      // 30% chance to have a small wildflower
      if (Math.random() < 0.35) {
        const fMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.14, 6, 6),
          Math.random() < 0.5 ? flowerMatYellow : flowerMatWhite
        );
        fMesh.position.set(0, 0.75, 0);
        tuftGroup.add(fMesh);
      }

      this.group.add(tuftGroup);
    }
  }

  createSakuraGrove() {
    const treePositions = [
      { x: -16, z: 8, scale: 1.15 },
      { x: -28, z: 2, scale: 1.3 },
      { x: -12, z: -15, scale: 1.05 },
      { x: 18, z: -12, scale: 1.2 },
      { x: 24, z: 10, scale: 1.35 },
      { x: 38, z: -8, scale: 1.15 },
      { x: -8, z: -25, scale: 1.2 },
      { x: 8, z: 22, scale: 1.25 }
    ];

    treePositions.forEach(p => {
      const tree = this.buildSingleSakuraTree(p.scale);
      tree.position.set(p.x, -0.4, p.z);
      this.group.add(tree);
    });
  }

  buildSingleSakuraTree(scale = 1.0) {
    const tree = new THREE.Group();

    const trunkMat = createAnimeToonMaterial({
      color: 0x3d271d,
      roughness: 0.85,
    });

    const pinkMat1 = createAnimeToonMaterial({
      color: AnimeColors.sakuraBlossom,
      roughness: 0.6,
    });
    const pinkMat2 = createAnimeToonMaterial({
      color: AnimeColors.sakuraHighlight,
      roughness: 0.5,
    });

    // Gnarled Trunk with anime outline
    const trunkGeo = new THREE.CylinderGeometry(0.35 * scale, 0.65 * scale, 5.0 * scale, 8);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 2.5 * scale;
    trunk.rotation.z = (Math.random() - 0.5) * 0.15;
    trunk.castShadow = true;
    addAnimeOutline(trunk, 0.04, 0x090d16);
    tree.add(trunk);

    // Blossom Cloud Clusters with anime outlines
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
      addAnimeOutline(blossomMesh, 0.035, 0x831843);
      tree.add(blossomMesh);
    });

    return tree;
  }

  createTokyoSkyline() {
    const cityGroup = new THREE.Group();
    cityGroup.position.set(55, 0, -85);

    const bldgMat = createAnimeToonMaterial({
      color: 0x151b29,
      roughness: 0.6,
    });

    const windowMatWarm = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const windowMatCyan = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });

    for (let i = 0; i < 35; i++) {
      const width = 3 + Math.random() * 4.5;
      const depth = 3 + Math.random() * 4.5;
      const height = 15 + Math.random() * 32;

      const bldgGeo = new THREE.BoxGeometry(width, height, depth);
      const bldg = new THREE.Mesh(bldgGeo, bldgMat);

      const px = (i % 7) * 7.5 - 25 + (Math.random() - 0.5) * 4;
      const pz = Math.floor(i / 7) * 7.5 - 15 + (Math.random() - 0.5) * 4;

      bldg.position.set(px, height / 2 - 0.5, pz);
      addAnimeOutline(bldg, 0.03, 0x090d16);
      cityGroup.add(bldg);

      // Glowing anime windows
      if (Math.random() < 0.7) {
        const winGeo = new THREE.PlaneGeometry(width * 0.75, height * 0.7);
        const winMesh = new THREE.Mesh(winGeo, Math.random() < 0.6 ? windowMatWarm : windowMatCyan);
        winMesh.position.set(px, height / 2 - 0.5, pz + depth / 2 + 0.05);
        cityGroup.add(winMesh);
      }

      // Antenna beacon atop tall towers
      if (height > 35) {
        const antennaGeo = new THREE.CylinderGeometry(0.08, 0.15, 6, 6);
        const antenna = new THREE.Mesh(antennaGeo, bldgMat);
        antenna.position.set(px, height + 2.5, pz);
        cityGroup.add(antenna);

        const beaconGeo = new THREE.SphereGeometry(0.35, 8, 8);
        const beacon = new THREE.Mesh(beaconGeo, new THREE.MeshBasicMaterial({ color: 0xff3838 }));
        beacon.position.set(px, height + 5.7, pz);
        cityGroup.add(beacon);
      }
    }

    this.group.add(cityGroup);
  }

  createLaunchPad() {
    const padGroup = new THREE.Group();
    padGroup.position.set(0, 0, 0);

    const steelMat = createAnimeToonMaterial({
      color: 0x334155,
      roughness: 0.5,
    });

    const yellowAccentMat = createAnimeToonMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
    });

    // Circular Launch Table / Mount with Anime outline
    const mountGeo = new THREE.CylinderGeometry(4.5, 5.5, 1.2, 18);
    const mount = new THREE.Mesh(mountGeo, steelMat);
    mount.position.y = 0.6;
    mount.receiveShadow = true;
    addAnimeOutline(mount, 0.03, 0x090d16);
    padGroup.add(mount);

    // Flame Trench Opening ring
    const trenchGeo = new THREE.RingGeometry(1.6, 3.2, 18);
    const trenchMat = new THREE.MeshBasicMaterial({ color: 0x050508, side: THREE.DoubleSide });
    const trench = new THREE.Mesh(trenchGeo, trenchMat);
    trench.rotation.x = -Math.PI / 2;
    trench.position.y = 1.21;
    padGroup.add(trench);

    // Launch Gantry Tower (Lattice steel structure) with Anime Outlines
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
        addAnimeOutline(col, 0.04, 0x090d16);
        padGroup.add(col);
      });
    });

    // Horizontal truss platforms every 3 meters
    for (let y = 3; y <= towerHeight; y += 3) {
      const trussGeo = new THREE.BoxGeometry(3.1, 0.25, 3.1);
      const truss = new THREE.Mesh(trussGeo, yellowAccentMat);
      truss.position.set(towerX, y, towerZ);
      addAnimeOutline(truss, 0.035, 0x090d16);
      padGroup.add(truss);
    }

    // Retractable Gantry Service Arms pointing toward rocket
    [6.5, 11.5].forEach(armY => {
      const armGeo = new THREE.BoxGeometry(2.8, 0.35, 0.6);
      const arm = new THREE.Mesh(armGeo, steelMat);
      arm.position.set(towerX - 1.5, armY, towerZ);
      addAnimeOutline(arm, 0.04, 0x090d16);
      padGroup.add(arm);

      // Arm clamp
      const clampGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.3, 12, 1, true, -Math.PI / 2, Math.PI);
      const clamp = new THREE.Mesh(clampGeo, yellowAccentMat);
      clamp.position.set(towerX - 2.8, armY, towerZ);
      clamp.rotation.z = Math.PI / 2;
      addAnimeOutline(clamp, 0.04, 0x090d16);
      padGroup.add(clamp);
    });

    // Floodlight Beams aimed at rocket
    const spotGeo = new THREE.BoxGeometry(0.6, 0.6, 0.8);
    const spotMesh = new THREE.Mesh(spotGeo, steelMat);
    spotMesh.position.set(towerX - 1.2, 14.5, towerZ);
    spotMesh.lookAt(0, 7, 0);
    addAnimeOutline(spotMesh, 0.04, 0x090d16);
    padGroup.add(spotMesh);

    const padSpot = new THREE.SpotLight(0xfff1cf, 3.5, 25, Math.PI / 4, 0.4);
    padSpot.position.set(towerX - 1.2, 14.5, towerZ);
    padSpot.target.position.set(0, 6, 0);
    padGroup.add(padSpot);
    padGroup.add(padSpot.target);

    this.group.add(padGroup);
  }

  update(delta) {
    // 1. Gently drift distant low anime clouds
    this.distantClouds.forEach(c => {
      c.group.position.x += c.speed * delta;
      if (c.group.position.x > c.baseX + 18) {
        c.group.position.x = c.baseX - 18;
      }
    });

    // 2. Subtle organic flicker on traditional lanterns
    const time = Date.now() * 0.003;
    this.lanternLights.forEach((light, idx) => {
      light.intensity = 1.1 + Math.sin(time + idx * 1.5) * 0.15;
    });
  }
}
