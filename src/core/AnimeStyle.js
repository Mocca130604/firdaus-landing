import * as THREE from 'three';

/**
 * Anime Art Style Utility Module
 * Provides discrete cel-shaded toon gradients, anime inverted-hull outlines,
 * anime 4-point star textures, and Makoto Shinkai-inspired sky color palettes.
 */

// 1. Discrete 4-step Cel-Shading Ramp Texture
export function createToonGradient(steps = 4) {
  const canvas = document.createElement('canvas');
  canvas.width = steps;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  // Defined anime light steps: deep shadow (65), mid shadow (130), midtone (195), highlight (255)
  const ramp = [65, 130, 195, 255];
  for (let i = 0; i < steps; i++) {
    const val = ramp[i] || Math.floor(65 + (i / (steps - 1)) * 190);
    ctx.fillStyle = `rgb(${val},${val},${val})`;
    ctx.fillRect(i, 0, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

export const animeToonGradient = createToonGradient(4);

// 2. Helper to create Cel-Shaded Toon Material
export function createAnimeToonMaterial(params = {}) {
  return new THREE.MeshToonMaterial({
    gradientMap: animeToonGradient,
    ...params,
  });
}

// 3. Anime Inverted-Hull Cel Outline
export function createAnimeOutline(geometry, width = 0.04, color = 0x070c18) {
  const outlineMat = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.BackSide,
  });

  const outlineMesh = new THREE.Mesh(geometry.clone(), outlineMat);
  outlineMesh.scale.multiplyScalar(1.0 + width);
  return outlineMesh;
}

// 4. Procedural 4-point Anime Twinkle Star Canvas Texture
export function createAnimeStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const cx = 32;
  const cy = 32;

  // Soft circular glow
  const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
  radial.addColorStop(0, 'rgba(255, 255, 255, 1)');
  radial.addColorStop(0.25, 'rgba(125, 211, 252, 0.7)');
  radial.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
  radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 64, 64);

  // Vertical flare ray
  const vGrad = ctx.createLinearGradient(cx, 0, cx, 64);
  vGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(cx - 1.5, 2, 3, 60);

  // Horizontal flare ray
  const hGrad = ctx.createLinearGradient(0, cy, 64, cy);
  hGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hGrad;
  ctx.fillRect(2, cy - 1.5, 60, 3);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 5. Anime Color Palette Definitions
export const AnimeColors = {
  // Ground / Shinkai Twilight Sunset
  skyZenith: 0x161338,     // Deep cosmic indigo
  skyHorizon: 0xe06d53,    // Makoto Shinkai warm golden-vermilion dusk
  skyTwilightBand: 0x86244e,// Rich magenta rose twilight
  sunWarmth: 0xfff3e0,     // Warm golden anime sunlight
  ambientCool: 0x221d45,   // Soft anime purple ambient fill

  // Objects
  fujiSnow: 0xf8fafc,      // Crisp anime snowcap
  fujiMountain: 0x242e47,  // Deep navy cel mountain body
  toriiVermilion: 0xe63946,// Vibrant anime torii red
  sakuraBlossom: 0xfda4af, // Bright glowing cherry blossom pink
  sakuraHighlight: 0xffe4e6,

  // Rocket
  rocketWhite: 0xf8fafc,
  rocketCrimson: 0xe63946,
  rocketNavy: 0x0f172a,
  rocketCyanGlow: 0x38bdf8,
};
