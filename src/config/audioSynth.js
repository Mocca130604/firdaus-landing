/**
 * Procedural Web Audio API Sound Engine
 * Provides authentic ambient, rocket engine rumble, and HUD beeps without any external audio files.
 */

class AudioSynthEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.initialized = false;

    // Nodes
    this.masterGain = null;
    this.ambientGain = null;
    this.engineGain = null;
    this.engineFilter = null;
    this.noiseNode = null;

    // Ambient Oscillators
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
  }

  init() {
    if (this.initialized) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient Drone (Atmospheric / Cosmic warmth)
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sawtooth';
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      const ambientFilter = this.ctx.createBiquadFilter();
      ambientFilter.type = 'lowpass';
      ambientFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.ambientOsc1.connect(ambientFilter);
      ambientFilter.connect(this.ambientGain);
      this.ambientOsc1.start();

      // Secondary sine drone
      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(110, this.ctx.currentTime);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientOsc2.start();

      // Rocket Engine Rumble (Filtered Noise Generator)
      this.setupEngineNoise();

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
    }
  }

  setupEngineNoise() {
    if (!this.ctx) return;

    // Create 2-second looped noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    // Generate pinkish/brownish noise for authentic deep rocket rumble
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(80, this.ctx.currentTime);

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0.01, this.ctx.currentTime);

    this.noiseNode.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    this.noiseNode.start();
  }

  updateEngineThrust(thrustAmount, progress) {
    if (!this.ctx || !this.engineGain || this.isMuted) return;

    // thrustAmount from 0 to 1
    const targetGain = Math.min(0.35, thrustAmount * 0.35);
    const targetFreq = 90 + thrustAmount * 280;

    const now = this.ctx.currentTime;
    this.engineGain.gain.setTargetAtTime(targetGain, now, 0.05);
    this.engineFilter.frequency.setTargetAtTime(targetFreq, now, 0.05);

    // If rocket reaches space (> 0.4), shift ambient drone from earthly warmth to ethereal cosmic frequency
    if (this.ambientOsc1 && this.ambientOsc2) {
      const spaceFreq1 = 55 + progress * 60;
      const spaceFreq2 = 110 + progress * 120;
      this.ambientOsc1.frequency.setTargetAtTime(spaceFreq1, now, 0.1);
      this.ambientOsc2.frequency.setTargetAtTime(spaceFreq2, now, 0.1);
    }
  }

  playBeep(freq = 880, duration = 0.08, type = 'sine') {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  playStageChime() {
    if (!this.ctx || this.isMuted) return;
    this.playBeep(523.25, 0.1, 'triangle'); // C5
    setTimeout(() => this.playBeep(659.25, 0.1, 'triangle'), 80); // E5
    setTimeout(() => this.playBeep(783.99, 0.16, 'sine'), 160); // G5
  }

  toggleMute() {
    if (!this.initialized) {
      this.init();
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.4;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }

    if (!this.isMuted) {
      this.playStageChime();
    }

    return !this.isMuted;
  }
}

export const audioSynth = new AudioSynthEngine();

