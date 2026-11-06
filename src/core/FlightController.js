import * as THREE from 'three';
import { audioSynth } from '../config/audioSynth.js';

/**
 * Enhanced Arcade Flight Controller
 * - Responsive WASD / Arrow Keys with smooth banking roll
 * - Drag-to-Steer Mouse Control (Prevents unintended continuous spinning)
 * - Autopilot Waypoint Navigation (Click-to-Fly directly to any planet)
 * - Auto-Stabilization and smooth camera tracking
 */
export class FlightController {
  constructor(options = {}) {
    this.rocket = options.rocket;
    this.camera = options.camera;
    this.particleSystem = options.particleSystem;

    this.enabled = false;

    // 3D Transform & Physics State
    this.position = new THREE.Vector3(0, 20, -50);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.yaw = 0; // Rotation around Y
    this.pitch = 0; // Rotation around X
    this.roll = 0; // Rotation around Z (banking)
    this.targetRoll = 0;

    // Movement Tuning
    this.cruiseSpeed = 30;
    this.boostSpeed = 65;
    this.accelRate = 32;
    this.damping = 0.95;
    this.turnRate = 1.9;
    this.boundaryRadius = 550;

    // Input States
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
      boost: false,
    };

    // Mouse Drag-To-Steer State
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragDelta = { x: 0, y: 0 };

    // Autopilot State
    this.autopilot = {
      active: false,
      targetPos: null,
      targetName: null,
      onArrived: null,
    };

    // Camera Chase Offset
    this.camDistance = 26;
    this.camHeight = 8.5;
    this.camLookAhead = 15;

    this.initListeners();
  }

  initListeners() {
    this.onKeyDown = this.handleKeyDown.bind(this);
    this.onKeyUp = this.handleKeyUp.bind(this);
    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    // Touch events for mobile flight
    this.onTouchStart = (e) => {
      if (!this.enabled || !e.touches.length) return;
      if (e.target.closest('button, a, input, textarea')) return;
      this.isDragging = true;
      this.dragStart.x = e.touches[0].clientX;
      this.dragStart.y = e.touches[0].clientY;
      this.keys.forward = true;
    };
    this.onTouchMove = (e) => {
      if (!this.enabled || !this.isDragging || !e.touches.length) return;
      const dx = e.touches[0].clientX - this.dragStart.x;
      const dy = e.touches[0].clientY - this.dragStart.y;
      this.dragDelta.x = dx * 0.005;
      this.dragDelta.y = dy * 0.005;
    };
    this.onTouchEnd = () => {
      this.isDragging = false;
      this.dragDelta.x = 0;
      this.dragDelta.y = 0;
      this.keys.forward = false;
    };

    window.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchEnd, { passive: true });
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

    // Any manual keystroke cancels autopilot
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      if (this.autopilot.active) {
        this.cancelAutopilot();
      }
    }

    if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keys.forward = true;
    if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keys.backward = true;
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keys.left = true;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keys.right = true;
    if (e.code === 'KeyQ') this.keys.down = true;
    if (e.code === 'KeyE') this.keys.up = true;
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
    if (e.code === 'KeyQ') this.keys.down = false;
    if (e.code === 'KeyE') this.keys.up = false;
    if (e.code === 'Space') this.keys.boost = false;
  }

  handleMouseDown(e) {
    if (!this.enabled || this.isInputBlocked()) return;
    if (e.button !== 0) return; // Only left click

    // Don't steer if clicking on an interactive UI control
    if (e.target && e.target.closest('button, a, input, textarea, .hud-btn, .waypoint-btn, .lang-btn, .flight-radar-panel, .planet-hologram-card')) {
      return;
    }

    this.isDragging = true;
    this.dragStart.x = e.clientX;
    this.dragStart.y = e.clientY;
    this.dragDelta.x = 0;
    this.dragDelta.y = 0;
  }

  handleMouseMove(e) {
    if (!this.enabled || !this.isDragging) return;

    // Calculate drag offset from start point
    const dx = e.clientX - this.dragStart.x;
    const dy = e.clientY - this.dragStart.y;

    // Normalizing drag sensitivity
    this.dragDelta.x = Math.max(-1.5, Math.min(1.5, dx * 0.008));
    this.dragDelta.y = Math.max(-1.5, Math.min(1.5, dy * 0.008));

    if (this.autopilot.active) {
      this.cancelAutopilot();
    }
  }

  handleMouseUp(e) {
    if (e.button === 0) {
      this.isDragging = false;
      this.dragDelta.x = 0;
      this.dragDelta.y = 0;
    }
  }

  // ── Autopilot System ──────────────────────────────────────────────────────────
  flyTo(targetPos, targetName = '', onArrived = null) {
    if (!targetPos) return;
    this.autopilot.active = true;
    this.autopilot.targetPos = targetPos.clone();
    this.autopilot.targetName = targetName;
    this.autopilot.onArrived = onArrived;

    audioSynth.playStageChime();
  }

  cancelAutopilot() {
    this.autopilot.active = false;
    this.autopilot.targetPos = null;
    this.autopilot.targetName = null;
    this.autopilot.onArrived = null;
  }

  enable(startPosition) {
    this.enabled = true;
    if (startPosition) {
      this.position.copy(startPosition);
    }
    this.velocity.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.isDragging = false;
    this.cancelAutopilot();
  }

  disable() {
    this.enabled = false;
    this.isDragging = false;
    this.cancelAutopilot();
    this.keys = { forward: false, backward: false, left: false, right: false, up: false, down: false, boost: false };
  }

  update(delta) {
    if (!this.enabled || !this.rocket) return null;

    const dt = Math.min(delta, 0.1);

    let isThrusting = false;
    let isBoosting = false;

    // ── 1. AUTOPILOT STEERING & CRUISE ─────────────────────────────────────────
    if (this.autopilot.active && this.autopilot.targetPos) {
      const toTarget = this.autopilot.targetPos.clone().sub(this.position);
      const dist = toTarget.length();

      // Check if arrived within planet orbit range (< 44 KM)
      if (dist <= 44) {
        const onArr = this.autopilot.onArrived;
        this.cancelAutopilot();
        // Slow down into orbital holding
        this.velocity.multiplyScalar(0.2);
        if (onArr) onArr();
      } else {
        // Compute direction towards target
        const dir = toTarget.clone().normalize();
        const desiredYaw = Math.atan2(-dir.x, -dir.z);
        const desiredPitch = Math.asin(Math.max(-0.85, Math.min(0.85, dir.y)));

        // Smoothly interpolate current yaw and pitch towards target
        let yawDiff = desiredYaw - this.yaw;
        while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
        while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;

        this.yaw += yawDiff * Math.min(1.0, 2.5 * dt);
        this.pitch += (desiredPitch - this.pitch) * Math.min(1.0, 2.2 * dt);

        // Gentle banking while autopilot turns
        this.targetRoll = -yawDiff * 0.4;
        this.roll += (this.targetRoll - this.roll) * 0.12;

        // Drive forward at crisp cruise speed
        const heading = new THREE.Vector3(
          -Math.sin(this.yaw) * Math.cos(this.pitch),
          Math.sin(this.pitch),
          -Math.cos(this.yaw) * Math.cos(this.pitch)
        ).normalize();

        const autoSpeed = dist > 150 ? this.cruiseSpeed * 1.3 : this.cruiseSpeed;
        this.velocity.lerp(heading.multiplyScalar(autoSpeed), 0.15);
        isThrusting = true;
      }
    } else {
      // ── 2. MANUAL KEYBOARD & DRAG STEERING ───────────────────────────────────
      let turnInputX = 0;
      let turnInputY = 0;

      // Keyboard steering
      if (this.keys.left) turnInputX += 1.0;
      if (this.keys.right) turnInputX -= 1.0;
      if (this.keys.up) turnInputY += 0.8;
      if (this.keys.down) turnInputY -= 0.8;

      // Mouse drag steering (only when actively dragging)
      if (this.isDragging) {
        turnInputX -= this.dragDelta.x * 1.2;
        turnInputY -= this.dragDelta.y * 1.0;
      }

      // Update Yaw & Pitch
      this.yaw += turnInputX * this.turnRate * dt;
      this.pitch = Math.max(-Math.PI / 3.0, Math.min(Math.PI / 3.0, this.pitch + turnInputY * this.turnRate * dt));

      // Auto-leveling: When not pitching, softly decay pitch towards level
      if (Math.abs(turnInputY) < 0.05) {
        this.pitch += (0 - this.pitch) * 0.04;
      }

      // Dynamic banking roll on turns
      this.targetRoll = turnInputX * 0.52;
      this.roll += (this.targetRoll - this.roll) * 0.14;

      // Forward heading vector
      const heading = new THREE.Vector3(
        -Math.sin(this.yaw) * Math.cos(this.pitch),
        Math.sin(this.pitch),
        -Math.cos(this.yaw) * Math.cos(this.pitch)
      ).normalize();

      // Thrust / Acceleration
      isThrusting = this.keys.forward;
      isBoosting = this.keys.boost && isThrusting;
      const isBraking = this.keys.backward;

      let targetSpeed = 0;
      if (isBoosting) targetSpeed = this.boostSpeed;
      else if (isThrusting) targetSpeed = this.cruiseSpeed;
      else if (isBraking) targetSpeed = -this.cruiseSpeed * 0.4;

      if (isThrusting || isBraking) {
        this.velocity.addScaledVector(heading, (targetSpeed > 0 ? this.accelRate : -this.accelRate * 0.6) * dt);
      }

      // Inertia drag damping
      this.velocity.multiplyScalar(Math.pow(this.damping, dt * 60));

      // Speed clamping
      const maxSpeed = isBoosting ? this.boostSpeed : this.cruiseSpeed;
      if (this.velocity.length() > maxSpeed) {
        this.velocity.setLength(maxSpeed);
      }
    }

    // ── 3. UPDATE POSITION & BOUNDARY CHECK ─────────────────────────────────────
    this.position.addScaledVector(this.velocity, dt);

    // Soft Boundary Repulsion
    const distFromOrigin = this.position.length();
    if (distFromOrigin > this.boundaryRadius) {
      const pullDir = this.position.clone().negate().normalize();
      this.velocity.addScaledVector(pullDir, 35 * dt);
    }

    // ── 4. UPDATE ROCKET MESH TRANSFORM ────────────────────────────────────────
    this.rocket.group.position.copy(this.position);

    const heading = new THREE.Vector3(
      -Math.sin(this.yaw) * Math.cos(this.pitch),
      Math.sin(this.pitch),
      -Math.cos(this.yaw) * Math.cos(this.pitch)
    ).normalize();

    // Rocket alignment to heading with banking roll
    const euler = new THREE.Euler(this.pitch, this.yaw, this.roll, 'YXZ');
    this.rocket.group.rotation.copy(euler);

    // ── 5. CAMERA CHASE DYNAMICS ───────────────────────────────────────────────
    if (this.camera) {
      const camOffset = new THREE.Vector3(
        Math.sin(this.yaw) * this.camDistance,
        this.camHeight - Math.sin(this.pitch) * (this.camDistance * 0.35),
        Math.cos(this.yaw) * this.camDistance
      );

      const desiredCamPos = this.position.clone().add(camOffset);
      this.camera.position.lerp(desiredCamPos, 0.14);

      const lookTarget = this.position.clone().add(heading.clone().multiplyScalar(this.camLookAhead));
      this.camera.lookAt(lookTarget);
    }

    // ── 6. SOUND & ENGINE EMISSION ────────────────────────────────────────────
    const currentSpeed = this.velocity.length();
    const speedRatio = Math.min(1.0, currentSpeed / this.boostSpeed);

    if (isThrusting || currentSpeed > 4.0) {
      audioSynth.updateEngineThrust(Math.min(1.0, 0.3 + speedRatio * 0.7), 0.5);
    } else {
      audioSynth.updateEngineThrust(0.03, 0.5);
    }

    const mach = Math.round((currentSpeed / 3.0) * 10) / 10;

    return {
      position: this.position.clone(),
      velocity: this.velocity.clone(),
      speed: currentSpeed,
      speedMach: `Mach ${mach.toFixed(1)}`,
      heading,
      isThrusting,
      isBoosting,
      autopilot: this.autopilot.active ? this.autopilot.targetName : null,
    };
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
}
