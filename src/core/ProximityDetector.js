/**
 * Proximity Detector
 * Calculates distance from rocket to each planet and triggers orbital lock / holographic cards.
 */
export class ProximityDetector {
  constructor(options = {}) {
    this.planets = options.planets || [];
    this.onEnter = options.onEnter || (() => {});
    this.onLeave = options.onLeave || (() => {});

    this.activePlanetId = null;

    // Thresholds (units)
    this.enterThreshold = 48;
    this.leaveThreshold = 64; // Hysteresis buffer
  }

  setPlanets(planets) {
    this.planets = planets;
  }

  update(rocketPosition) {
    if (!rocketPosition || !this.planets.length) return null;

    let closestPlanet = null;
    let closestDist = Infinity;

    for (const p of this.planets) {
      const dist = rocketPosition.distanceTo(p.position);
      if (dist < closestDist) {
        closestDist = dist;
        closestPlanet = p;
      }
    }

    // Check if we entered a planet's gravity orbit
    if (closestPlanet && closestDist <= this.enterThreshold) {
      if (this.activePlanetId !== closestPlanet.id) {
        this.activePlanetId = closestPlanet.id;
        this.onEnter(closestPlanet, closestDist);
      }
      return {
        activePlanet: closestPlanet,
        distance: closestDist,
        inOrbit: true,
      };
    }

    // Check if we exited the current active orbit
    if (this.activePlanetId) {
      const currentPlanet = this.planets.find((p) => p.id === this.activePlanetId);
      if (!currentPlanet || rocketPosition.distanceTo(currentPlanet.position) >= this.leaveThreshold) {
        const leftPlanet = currentPlanet;
        this.activePlanetId = null;
        this.onLeave(leftPlanet);
      }
    }

    return {
      activePlanet: null,
      closestPlanet,
      closestDistance: closestDist,
      inOrbit: false,
    };
  }

  reset() {
    this.activePlanetId = null;
  }
}

