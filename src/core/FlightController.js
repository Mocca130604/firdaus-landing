import * as THREE from 'three';
import { audioSynth } from '../config/audioSynth.js';

/**
 * Dual Flight Controller
 * Provides concurrent Mouse and Keyboard (WASD / Arrow Keys) 3D flight controls.
 */
export class FlightController {
  constructor(options = {}) {
    this.rocket = options.rocket;
    this.camera = options.camera;
    this.particleSystem = options.particleSystem;

    this.enabled = false;

    // Movement state
    this.position = new THREE.Vector3(0, 15, -40);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.yaw = 0; // Left-right rotation
    this.pitch = 0; // Up-down rotation
    this.roll = 0; // Banking roll angle
    this.targetRoll = 0;

    // Input state
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      boost: false,
    };

    this.mouse = {
      x: 0,
      y: 0,
      isDown: false,
    };

    // Physics parameters
    this.maxCruiseSpeed = 32;
    this.maxBoostSpeed = 64;
    this.acceleration = 24;
    this.drag = 0.94;
    this.turnSpeed = 1.8;
    this.boundaryRadius = 550;

    // Camera chase settings
    this.camDistance = 28;
    this.camHeight = 9.5;
    this.camLookAhead = 14;

    this.initListeners();
  }

  initListeners() {
    this.onKeyDown = this.handleKeyDown.bind(this);
    this.onKeyUp = this.handleKeyUp.bind(this);
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  isInputBlocked() {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      return true;
    }
    const modal = document.getElementById('contact-modal');
    if (modal && modal.classList.contains('visible')) {
      return true;
    }
    return false;
  }

  handleKeyDown(e) {
    if (!this.enabled || this.isInputBlocked()) return;

    if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.forward = true;
    if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.backward = true;
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.left = true;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.right = true;
    if (e.code === 'Space') {
      e.preventDefault();
      this.keys.boost = true;
    }
  }

  handleKeyUp(e) {
    if (!this.enabled) return;

    if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.forward = false;
    if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.backward = false;
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.left = false;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.right = false;
    if (e.code === 'Space') this.keys.boost = false;
  }

  handleMouseMove(e) {
    if (!this.enabled) return;

    // Normalize mouse coords (-1 to +1 from screen center)
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    this.mouse.x = (e.clientX - halfW) / halfW;
    this.mouse.y = (e.clientY - halfH) / halfH;
  }

  handleMouseDown(e) {
    if (!this.enabled || this.isInputBlocked()) return;
    if (e.button === 0) {
      // Avoid intercepting clicks on buttons or HUD elements
      if (e.target && e.target.closest('button, a, input, textarea, .hud-btn, .nav-pill, .lang-btn')) {
        return;
      }
      this.mouse.isDown = true;
    }
  }

  handleMouseUp(e) {
    if (!this.enabled) return;
    if (e.button === 0) {
      this.mouse.isDown = false;
    }
  }

  enable(startPosition) {
    this.enabled = true;
    if (startPosition) {
      this.position.copy(startPosition);
    }
    this.velocity.set(0, 0, 0);
    this.keys.forward = false;
    this.keys.backward = false;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.boost = false;
    this.mouse.isDown = false;
  }

  disable() {
    this.enabled = false;
    this.keys.forward = false;
    this.keys.backward = false;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.boost = false;
    this.mouse.isDown = false;
  }

  update(delta) {
    if (!this.enabled || !this.rocket) return null;

    const dt = Math.min(delta, 0.1);

    // 1. Steering & Orientation (Combining Mouse Aim and WASD / Arrow Keys)
    let steerX = 0;
    let steerY = 0;

    // Mouse aiming contribution (slight deadzone of 0.08)
    if (Math.abs(this.mouse.x) > 0.08) {
      steerX -= this.mouse.x * 0.9;
    }
    if (Math.abs(this.mouse.y) > 0.08) {
      steerY -= this.mouse.y * 0.7;
    }

    // Keyboard steering contribution
    if (this.keys.left) steerX += 1.0;
    if (this.keys.right) steerX -= 1.0;

    // Update yaw and pitch
    this.yaw += steerX * this.turnSpeed * dt;
    this.pitch = Math.max(-Math.PI / 3.2, Math.min(Math.PI / 3.2, this.pitch + steerY * this.turnSpeed * dt));

    // Dynamic banking roll
    this.targetRoll = steerX * 0.55;
    this.roll += (this.targetRoll - this.roll) * 0.12;

    // Compute 3D forward heading vector from yaw and pitch
    const heading = new THREE.Vector3(
      -Math.sin(this.yaw) * Math.cos(this.pitch),
      Math.sin(this.pitch),
      -Math.cos(this.yaw) * Math.cos(this.pitch)
    ).normalize();

    // 2. Thrust & Acceleration
    const isForward = this.keys.forward || this.mouse.isDown;
    const isBackward = this.keys.backward;
    const isBoost = this.keys.boost && isForward;

    let targetMaxSpeed = this.maxCruiseSpeed;
    if (isBoost) targetMaxSpeed = this.maxBoostSpeed;

    if (isForward) {
      this.velocity.addScaledVector(heading, this.acceleration * (isBoost ? 1.8 : 1.0) * dt);
    } else if (isBackward) {
      this.velocity.addScaledVector(heading, -this.acceleration * 0.5 * dt);
    }

    // Apply drag damping
    this.velocity.multiplyScalar(Math.pow(this.drag, dt * 60));

    // Clamp maximum speed
    const currentSpeed = this.velocity.length();
    if (currentSpeed > targetMaxSpeed) {
      this.velocity.setLength(targetMaxSpeed);
    }

    // 3. Update Position
    this.position.addScaledVector(this.velocity, dt);

    // Soft Boundary Repulsion (keep inside sector)
    const distFromCenter = this.position.length();
    if (distFromCenter > this.boundaryRadius) {
      const returnDir = this.position.clone().negate().normalize();
      this.velocity.addScaledVector(returnDir, 25 * dt);
    }

    // 4. Update Rocket Mesh Transform
    this.rocket.group.position.copy(this.position);

    // Calculate rotation matching heading + banking roll
    const euler = new THREE.Euler(this.pitch, this.yaw, this.roll, 'YXZ');
    this.rocket.group.rotation.copy(euler);

    // 5. Update Chase Camera
    if (this.camera) {
      const camOffset = new THREE.Vector3(
        Math.sin(this.yaw) * this.camDistance,
        this.camHeight - Math.sin(this.pitch) * (this.camDistance * 0.4),
        Math.cos(this.yaw) * this.camDistance
      );

      const targetCamPos = this.position.clone().add(camOffset);
      this.camera.position.lerp(targetCamPos, 0.15);

      const lookTarget = this.position.clone().add(heading.clone().multiplyScalar(this.camLookAhead));
      this.camera.lookAt(lookTarget);
    }

    // 6. Thruster Audio & Particle Effects
    const speedRatio = currentSpeed / this.maxBoostSpeed;
    const thrustActive = isForward || speedRatio > 0.1;

    if (thrustActive) {
      audioSynth.updateEngineThrust(Math.min(1.0, 0.3 + speedRatio * 0.7), 0.5);
    } else {
      audioSynth.updateEngineThrust(0.04, 0.5);
    }

    const mach = Math.round((currentSpeed / 3.0) * 10) / 10;

    return {
      position: this.position.clone(),
      velocity: this.velocity.clone(),
      speed: currentSpeed,
      speedMach: `Mach ${mach}`,
      heading,
      isThrusting: isForward,
      isBoosting: isBoost,
    };
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
}
