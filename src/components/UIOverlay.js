import { portfolioData } from '../config/portfolioData.js';
import { audioSynth } from '../config/audioSynth.js';

/**
 * UI Overlay Manager
 * Renders semantic HTML panels, telemetry HUD, countdown loading screen, and interactive controls.
 */
export class UIOverlay {
  constructor(scrollController) {
    this.scrollController = scrollController;
    this.container = document.getElementById('ui-overlay');
    this.loadingScreen = document.getElementById('loading-screen');
    this.hudElement = null;

    this.initHTML();
    this.initAudioToggle();
    this.initNavigation();
    this.initContactModal();
    this.initLanyardTilt();
  }

  initHTML() {
    this.container.innerHTML = `
      <!-- TOP HUD TELEMETRY -->
      <header class="hud-top" role="banner">
        <div class="hud-brand">
          <div class="hud-logo-icon">🚀</div>
          <div class="hud-logo-text">
            <span class="hud-callsign">RYUSEI-1 // ${portfolioData.personal.japaneseName}</span>
            <span class="hud-pilot">${portfolioData.personal.name}</span>
          </div>
        </div>

        <div class="hud-nav-pills" role="navigation" aria-label="Flight Waypoints">
          <button class="nav-pill active" data-target="hero">01 // Pad</button>
          <button class="nav-pill" data-target="about">02 // About</button>
          <button class="nav-pill" data-target="skills">03 // Skills</button>
          <button class="nav-pill" data-target="projects">04 // Missions</button>
          <button class="nav-pill" data-target="experience">05 // Stages</button>
          <button class="nav-pill" data-target="contact">06 // Moon Pass</button>
        </div>

        <div class="hud-controls">
          <button id="btn-audio-toggle" class="hud-btn" aria-label="Toggle Audio Sound">
            <span class="audio-icon">🔈</span>
            <span class="audio-label">AUDIO: OFF</span>
          </button>
        </div>
      </header>

      <!-- SIDE ALTITUDE PROGRESS BAR (0 KM -> 384,400 KM) -->
      <aside class="hud-altitude-bar" aria-label="Altitude Flight Tracker">
        <div class="altitude-track">
          <div class="altitude-fill" id="hud-altitude-fill"></div>
          <div class="altitude-marker" id="hud-altitude-marker">
            <div class="rocket-ping"></div>
            <div class="marker-tag" id="hud-marker-tag">0 KM</div>
          </div>
        </div>
        <div class="altitude-ticks">
          <span class="tick" data-target="contact" title="Moon">MOON (384.4k km)</span>
          <span class="tick" data-target="experience" title="Lunar Transfer">LUNAR (300k km)</span>
          <span class="tick" data-target="projects" title="Deep Space">DEEP SPACE (150k km)</span>
          <span class="tick" data-target="skills" title="LEO Orbit">ORBIT (450 km)</span>
          <span class="tick" data-target="about" title="Atmosphere">ATMOS (80 km)</span>
          <span class="tick active" data-target="hero" title="Japan Pad">JAPAN (0 km)</span>
        </div>
      </aside>

      <!-- BOTTOM TELEMETRY STATUS BAR -->
      <footer class="hud-bottom" role="status">
        <div class="telemetry-item">
          <span class="tel-label">MISSION STAGE</span>
          <span class="tel-val stage-badge" id="hud-stage-name">LAUNCH PAD</span>
        </div>
        <div class="telemetry-item">
          <span class="tel-label">ALTITUDE</span>
          <span class="tel-val" id="hud-alt-val">0 KM</span>
        </div>
        <div class="telemetry-item">
          <span class="tel-label">VELOCITY</span>
          <span class="tel-val" id="hud-vel-val">Mach 0</span>
        </div>
        <div class="telemetry-item hide-mobile">
          <span class="tel-label">COORDINATES</span>
          <span class="tel-val">35.6762° N, 139.6503° E</span>
        </div>
      </footer>

      <!-- SCROLLABLE CONTENT SECTIONS -->
      <main class="story-scroll-container">
        <!-- SECTION 1: HERO / LAUNCHPAD (JAPAN) -->
        <section class="story-section section-hero active-stage" id="sec-hero">
          <div class="section-card hero-card">
            <div class="badge-tag">JAPAN SPACEPORT // TANEGASHIMA // 種子島</div>
            <h1 class="hero-title">
              <span class="hero-kanji">${portfolioData.personal.japaneseName}</span>
              <span class="hero-name">${portfolioData.personal.name}</span>
            </h1>
            <h2 class="hero-role">${portfolioData.personal.title}</h2>
            <p class="hero-subtitle">${portfolioData.personal.subtitle}</p>
            <p class="hero-tagline">${portfolioData.personal.tagline}</p>

            <div class="hero-stats-row">
              <div class="stat-box">
                <span class="stat-number">4+</span>
                <span class="stat-text">Years Experience</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">15+</span>
                <span class="stat-text">Projects Shipped</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">Enterprise</span>
                <span class="stat-text">Micro Frontends & AI</span>
              </div>
            </div>

            <div class="hero-cta">
              <button class="btn-primary" id="btn-scroll-launch">
                <span>SCROLL TO LIFT-OFF</span>
                <span class="btn-arrow">↓</span>
              </button>
              <a href="#sec-contact" class="btn-secondary" id="btn-hero-contact">Hubungi Saya</a>
            </div>

            <div class="scroll-indicator">
              <span class="mouse-icon"></span>
              <span class="scroll-text">SCROLL TO LAUNCH ROCKET TO THE MOON</span>
            </div>
          </div>
        </section>

        <!-- SECTION 2: ABOUT ME (ATMOSPHERIC ASCENT) -->
        <section class="story-section section-about" id="sec-about">
          <div class="section-card">
            <div class="badge-tag">ALTITUDE 80-120 KM // ATMOSPHERIC TRAJECTORY</div>
            <h2 class="section-heading">About Me <span class="sub-kanji">自己紹介</span></h2>
            <p class="about-summary">${portfolioData.personal.summary}</p>

            <div class="about-grid">
              <div class="about-card">
                <div class="card-icon">🏢</div>
                <h3>Enterprise Frontend Lead</h3>
                <p>Specialized in architecting high-scale Vue.js Micro Frontend ecosystems and driving enterprise E-Procurement transformations.</p>
              </div>
              <div class="about-card">
                <div class="card-icon">⚡</div>
                <h3>Full-Stack & Database Tuning</h3>
                <p>Engineering resilient backend systems with Laravel, complex SQL Stored Procedures, and high-concurrency event engines.</p>
              </div>
              <div class="about-card">
                <div class="card-icon">🤖</div>
                <h3>Model Context Protocol (MCP)</h3>
                <p>Early adopter and implementer of MCP servers and deterministic LLM prompt engineering for corporate productivity.</p>
              </div>
            </div>

            <div class="education-block">
              <h3 class="subsection-title">Education & Academic Background</h3>
              <div class="edu-items">
                ${portfolioData.education
                  .map(
                    edu => `
                  <div class="edu-item">
                    <div class="edu-header">
                      <strong>${edu.institution}</strong>
                      <span class="edu-period">${edu.period}</span>
                    </div>
                    <div class="edu-degree">${edu.degree}</div>
                    <div class="edu-details">${edu.details}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 3: SKILLS (ORBITAL CHECKPOINT) -->
        <section class="story-section section-skills" id="sec-skills">
          <div class="section-card wide-card">
            <div class="badge-tag">ALTITUDE 450 KM // LOW EARTH ORBIT STATION // スキル</div>
            <h2 class="section-heading">Orbital Skills Checkpoints</h2>
            <p class="section-desc">Technical arsenal and battle-tested proficiencies powering mission-critical web software.</p>

            <div class="skills-dock-container">
              <!-- Frontend Station -->
              <div class="skill-category-card">
                <div class="cat-header">
                  <span class="cat-icon">🎨</span>
                  <h3>Frontend Ecosystem</h3>
                </div>
                <div class="skill-tags">
                  ${portfolioData.skills.frontend
                    .map(s => `<span class="skill-pill"><span class="pill-name">${s.name}</span><span class="pill-level">${s.level}</span></span>`)
                    .join('')}
                </div>
              </div>

              <!-- Backend Station -->
              <div class="skill-category-card">
                <div class="cat-header">
                  <span class="cat-icon">⚙️</span>
                  <h3>Backend & Databases</h3>
                </div>
                <div class="skill-tags">
                  ${portfolioData.skills.backend
                    .map(s => `<span class="skill-pill"><span class="pill-name">${s.name}</span><span class="pill-level">${s.level}</span></span>`)
                    .join('')}
                </div>
              </div>

              <!-- AI & Architecture Station -->
              <div class="skill-category-card">
                <div class="cat-header">
                  <span class="cat-icon">🧠</span>
                  <h3>AI & Architecture</h3>
                </div>
                <div class="skill-tags">
                  ${portfolioData.skills.architectureAndAI
                    .map(s => `<span class="skill-pill highlight-ai"><span class="pill-name">${s.name}</span><span class="pill-level">${s.level}</span></span>`)
                    .join('')}
                </div>
              </div>

              <!-- Mobile & DevOps Station -->
              <div class="skill-category-card">
                <div class="cat-header">
                  <span class="cat-icon">📱</span>
                  <h3>Mobile & Tooling</h3>
                </div>
                <div class="skill-tags">
                  ${portfolioData.skills.mobileAndTools
                    .map(s => `<span class="skill-pill"><span class="pill-name">${s.name}</span><span class="pill-level">${s.level}</span></span>`)
                    .join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 4: PROJECTS (DEEP SPACE MISSION DOSSIERS) -->
        <section class="story-section section-projects" id="sec-projects">
          <div class="section-card wide-card">
            <div class="badge-tag">ALTITUDE 150,000 KM // DEEP SPACE EXPLORATION // プロジェクト</div>
            <h2 class="section-heading">Mission Dossiers (Featured Projects)</h2>
            <p class="section-desc">Key enterprise systems, architectural triumphs, and high-performance solutions deployed to production.</p>

            <div class="projects-carousel">
              ${portfolioData.projects
                .map(
                  (p, idx) => `
                <article class="project-dossier-card" data-index="${idx}">
                  <div class="card-top">
                    <span class="mission-code">${p.missionCode}</span>
                    <span class="mission-category">${p.category}</span>
                  </div>
                  <h3 class="project-title">${p.title}</h3>
                  <div class="project-meta">
                    <span class="meta-item"><strong>Client:</strong> ${p.client}</span>
                    <span class="meta-item"><strong>Role:</strong> ${p.role}</span>
                    <span class="meta-item"><strong>Timeline:</strong> ${p.period}</span>
                  </div>
                  <p class="project-summary">${p.summary}</p>

                  <div class="project-highlights">
                    <ul>
                      ${p.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                  </div>

                  <div class="project-tech-chips">
                    ${p.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
                  </div>

                  <div class="project-links">
                    <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="link-btn">
                      <span>View GitHub</span> ↗
                    </a>
                    <button class="link-btn outline btn-project-detail" data-id="${p.id}">
                      <span>Mission Log</span>
                    </button>
                  </div>
                </article>
              `
                )
                .join('')}
            </div>
          </div>
        </section>

        <!-- SECTION 5: EXPERIENCE / TIMELINE (FLIGHT STAGES) -->
        <section class="story-section section-experience" id="sec-experience">
          <div class="section-card experience-wrapper">
            <div class="badge-tag">ALTITUDE 300,000 KM // LUNAR TRANSFER ORBIT // 経歴</div>
            <h2 class="section-heading">Flight Stages (Career Journey)</h2>
            <p class="section-desc">Sequential stage separations — each booster jettisoned marks a new altitude of expertise.</p>
          </div>

          <!-- Individual experience cards -->
          <div class="flight-stages-grid">
            ${portfolioData.timeline.map((t, idx) => `
              <article class="flight-stage-card" aria-label="${t.stage}">

                <!-- Stage number badge (rocket booster indicator) -->
                <div class="fsc-number-badge">
                  <span class="fsc-num">0${idx + 1}</span>
                  <div class="fsc-num-glow"></div>
                </div>

                <!-- Top bar: stage label + connector line -->
                <div class="fsc-top-bar">
                  <div class="fsc-stage-label">${t.stage}</div>
                  <div class="fsc-connector-line"></div>
                </div>

                <!-- Card body -->
                <div class="fsc-body">

                  <!-- Header row: company + period -->
                  <div class="fsc-header-row">
                    <div class="fsc-company-block">
                      <span class="fsc-company-icon">🏢</span>
                      <div class="fsc-company-info">
                        <span class="fsc-company-name">${t.company}</span>
                        <span class="fsc-stage-sub">${t.stageSub || ''}</span>
                      </div>
                    </div>
                    <div class="fsc-period-badge">${t.period}</div>
                  </div>

                  <!-- Role title -->
                  <h3 class="fsc-role-title">${t.role}</h3>

                  <!-- Divider -->
                  <div class="fsc-divider"></div>

                  <!-- Description -->
                  <p class="fsc-description">${t.description}</p>

                  <!-- Key milestone footer -->
                  <div class="fsc-milestone">
                    <div class="fsc-milestone-label">
                      <span class="fsc-milestone-icon">◈</span>
                      KEY MILESTONE
                    </div>
                    <p class="fsc-milestone-text">${t.milestone}</p>
                  </div>

                </div>

                <!-- Bottom status strip -->
                <div class="fsc-status-strip">
                  <span class="fsc-status-dot"></span>
                  <span class="fsc-status-text">STAGE SEPARATION COMPLETE</span>
                  <span class="fsc-status-alt">ALT ${
                    idx === 0 ? '80 KM' : idx === 1 ? '450 KM' : '7,800 KM'
                  }</span>
                </div>

              </article>
            `).join('')}

            <!-- Education cards -->
            ${portfolioData.education.map((e, idx) => `
              <article class="flight-stage-card fsc-education" aria-label="Education: ${e.institution}">

                <div class="fsc-number-badge edu-badge">
                  <span class="fsc-num">🎓</span>
                </div>

                <div class="fsc-top-bar">
                  <div class="fsc-stage-label">EDUCATION LOG // 学歴</div>
                  <div class="fsc-connector-line"></div>
                </div>

                <div class="fsc-body">
                  <div class="fsc-header-row">
                    <div class="fsc-company-block">
                      <span class="fsc-company-icon">🏛</span>
                      <div class="fsc-company-info">
                        <span class="fsc-company-name">${e.institution}</span>
                        <span class="fsc-stage-sub">${e.degree}</span>
                      </div>
                    </div>
                    <div class="fsc-period-badge">${e.period}</div>
                  </div>

                  <div class="fsc-divider"></div>
                  <p class="fsc-description">${e.details}</p>
                </div>

                <div class="fsc-status-strip edu-strip">
                  <span class="fsc-status-dot edu-dot"></span>
                  <span class="fsc-status-text">CREDENTIALS VERIFIED</span>
                </div>

              </article>
            `).join('')}
          </div>
        </section>

        <!-- SECTION 6: CONTACT & MISSION COMPLETE (THE MOON) -->
        <section class="story-section section-contact" id="sec-contact">
          <div class="section-card moon-contact-card">
            <div class="badge-tag">ALTITUDE 384,400 KM // MOON TOUCHDOWN // 月面着陸成功</div>
            <h2 class="section-heading">
              Mission Complete
              <span class="sub-kanji">任務完了</span>
            </h2>
            <p class="contact-lead">
              The rocket has landed safely in Mare Tranquillitatis. Here is your official flight clearance and mission pass — let's connect and build the next ambitious platform together.
            </p>

            <!-- LANYARD MISSION PASS CARD -->
            <div class="lanyard-wrapper">
              <div class="lanyard-strap">
                <span class="strap-text">LUNAR EXPEDITION 2026 • CREW PASS • JAXA / RYUSEI-1 • FLIGHT CLEARANCE</span>
              </div>
              <div class="lanyard-clip">
                <div class="clip-ring"></div>
                <div class="clip-metal"></div>
                <div class="clip-hook"></div>
              </div>

              <!-- Interactive 3D Mission Pass ID Card -->
              <div class="mission-pass-card" id="mission-pass-card">
                <div class="card-slot-punch"></div>
                <div class="card-hologram-sheen"></div>

                <!-- Card Header -->
                <div class="pass-header">
                  <div class="pass-agency">
                    <span class="agency-symbol">✦</span>
                    <div class="agency-info">
                      <strong>LUNAR EXPEDITION COMMAND</strong>
                      <span>SURFACE OPERATIONS CLEARANCE</span>
                    </div>
                  </div>
                  <div class="pass-clearance-badge">LEVEL 5 ACCESS</div>
                </div>

                <!-- Card Body / Bio -->
                <div class="pass-body">
                  <div class="pass-avatar-box">
                    <div class="pass-avatar">
                      <div class="avatar-icon">👨‍🚀</div>
                      <div class="avatar-scan-line"></div>
                    </div>
                    <div class="chip-hologram" title="Biometric Security Chip">
                      <div class="chip-grid"></div>
                    </div>
                  </div>

                  <div class="pass-identity">
                    <div class="identity-kanji">${portfolioData.personal.japaneseName}</div>
                    <h3 class="identity-name">${portfolioData.personal.name}</h3>
                    <div class="identity-role">${portfolioData.personal.title}</div>
                    <div class="identity-dept">Enterprise Architecture & Micro Frontends</div>
                    <div class="identity-base">Base Station: <strong>Yokohama, Kanagawa, JP</strong></div>
                  </div>
                </div>

                <!-- Telemetry Specs Grid -->
                <div class="pass-specs-grid">
                  <div class="spec-cell">
                    <span class="spec-lbl">SERIAL ID</span>
                    <span class="spec-val">FM-2026-ALPHA-01</span>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-lbl">CALLSIGN</span>
                    <span class="spec-val">RYUSEI-LEAD</span>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-lbl">TOUCHDOWN LOC</span>
                    <span class="spec-val">MARE TRANQUILLITATIS</span>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-lbl">MISSION STATUS</span>
                    <span class="spec-val spec-verified">● TOUCHDOWN VERIFIED</span>
                  </div>
                </div>

                <!-- Authorized Capabilities -->
                <div class="pass-protocols">
                  <span class="protocol-lbl">AUTHORIZED CAPABILITIES & PROTOCOLS:</span>
                  <div class="protocol-chips">
                    <span class="p-chip">Vue.js / Nuxt.js</span>
                    <span class="p-chip">Laravel / PHP</span>
                    <span class="p-chip">Micro Frontends</span>
                    <span class="p-chip">Model Context Protocol (MCP)</span>
                    <span class="p-chip">Three.js / WebGL</span>
                    <span class="p-chip">SQL Stored Procedures</span>
                  </div>
                </div>

                <!-- Barcode & Security Strip -->
                <div class="pass-barcode-strip">
                  <div class="barcode-lines" aria-hidden="true"></div>
                  <div class="barcode-auth">SECURE BIOMETRIC HASH: SHA256-FM-384400-LUNA • JAXA VALIDATED</div>
                </div>
              </div>
            </div>

            <!-- CONTACT TILES & CHANNELS -->
            <div class="contact-info-grid">
              <a href="mailto:${portfolioData.personal.email}" class="contact-tile">
                <div class="tile-icon">✉️</div>
                <div class="tile-meta">
                  <span class="tile-label">Direct Communication</span>
                  <strong class="tile-value">${portfolioData.personal.email}</strong>
                </div>
              </a>

              <a href="${portfolioData.personal.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-tile">
                <div class="tile-icon">💼</div>
                <div class="tile-meta">
                  <span class="tile-label">LinkedIn Network</span>
                  <strong class="tile-value">firdaus-mochamad</strong>
                </div>
              </a>

              <a href="${portfolioData.personal.github}" target="_blank" rel="noopener noreferrer" class="contact-tile">
                <div class="tile-icon">🐙</div>
                <div class="tile-meta">
                  <span class="tile-label">Code Repositories</span>
                  <strong class="tile-value">mocca130604</strong>
                </div>
              </a>

              <a href="${portfolioData.personal.whatsapp}" target="_blank" rel="noopener noreferrer" class="contact-tile">
                <div class="tile-icon">💬</div>
                <div class="tile-meta">
                  <span class="tile-label">Direct Channel (WhatsApp)</span>
                  <strong class="tile-value">${portfolioData.personal.phone}</strong>
                </div>
              </a>
            </div>

            <!-- EMBEDDED EMAIL TERMINAL (EMAILJS) -->
            <div class="email-terminal-container">
              <div class="email-terminal-header">
                <div class="terminal-dot"></div>
                <span class="terminal-title">LUNAR TRANSMISSION TERMINAL // DIRECT EMAIL</span>
                <span class="terminal-badge">EMAILJS SECURE LINK</span>
              </div>

              <form class="emailjs-contact-form" id="lunar-email-form">
                <div class="form-row-2">
                  <div class="form-group">
                    <label for="lunar-name">CALLSIGN / YOUR NAME *</label>
                    <input type="text" id="lunar-name" required placeholder="e.g. Commander Sarah Vance" autocomplete="name">
                  </div>
                  <div class="form-group">
                    <label for="lunar-email">RETURN FREQUENCY / YOUR EMAIL *</label>
                    <input type="email" id="lunar-email" required placeholder="sarah@deepspace.org" autocomplete="email">
                  </div>
                </div>

                <div class="form-group">
                  <label for="lunar-subject">MISSION OBJECTIVE / SUBJECT *</label>
                  <input type="text" id="lunar-subject" required placeholder="e.g. Enterprise Vue / Nuxt Project Opportunity">
                </div>

                <div class="form-group">
                  <label for="lunar-message">MESSAGE PAYLOAD *</label>
                  <textarea id="lunar-message" rows="4" required placeholder="Share your project vision, timeline, or engineering challenge..."></textarea>
                </div>

                <div class="form-feedback" id="lunar-form-feedback" style="display: none;"></div>

                <div class="form-submit-row">
                  <button type="submit" class="btn-primary" id="btn-lunar-submit">
                    <span>TRANSMIT VIA EMAILJS</span>
                    <span class="btn-icon">⚡</span>
                  </button>
                  <span class="form-note">Encrypted direct transmission to ${portfolioData.personal.email}</span>
                </div>
              </form>
            </div>

            <div class="contact-action-row">
              <button class="btn-secondary" id="btn-open-contact-modal">
                <span>Open Expanded Comm-Terminal</span>
                <span>📡</span>
              </button>
              <button class="btn-secondary" id="btn-relaunch">
                <span>Relaunch to Earth (Kembali ke Bumi)</span>
                <span>↑</span>
              </button>
            </div>

            <footer class="footer-sign">
              <p>Designed & Engineered by <strong>${portfolioData.personal.name}</strong> • Three.js + GSAP • ${portfolioData.personal.quote}</p>
            </footer>
          </div>
        </section>
      </main>

      <!-- TRANSMISSION CONTACT MODAL -->
      <div class="contact-modal" id="contact-modal" aria-hidden="true" role="dialog" aria-labelledby="modal-title">
        <div class="modal-backdrop" id="modal-backdrop"></div>
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 id="modal-title">📡 Transmission Terminal // Send Message</h3>
            <button class="btn-close-modal" id="btn-close-modal" aria-label="Close dialog">✕</button>
          </div>
          <form class="transmission-form" id="transmission-form">
            <div class="form-group">
              <label for="input-sender">Callsign / Your Name</label>
              <input type="text" id="input-sender" required placeholder="e.g. John Doe / Engineering Lead">
            </div>
            <div class="form-group">
              <label for="input-email">Communication Frequency / Email</label>
              <input type="email" id="input-email" required placeholder="name@company.com">
            </div>
            <div class="form-group">
              <label for="input-subject">Mission Objective / Subject</label>
              <input type="text" id="input-subject" required placeholder="e.g. Enterprise Vue/Nuxt Project Opportunity">
            </div>
            <div class="form-group">
              <label for="input-message">Message Payload</label>
              <textarea id="input-message" rows="4" required placeholder="Share your project vision, timeline, or requirements..."></textarea>
            </div>
            <div class="form-feedback" id="modal-form-feedback" style="display: none;"></div>
            <div class="modal-actions">
              <button type="submit" class="btn-primary" id="btn-send-transmission">
                <span>Transmit Message via EmailJS</span>
                <span>⚡</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  initAudioToggle() {
    const btn = document.getElementById('btn-audio-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isUnmuted = audioSynth.toggleMute();
      btn.querySelector('.audio-icon').textContent = isUnmuted ? '🔊' : '🔈';
      btn.querySelector('.audio-label').textContent = isUnmuted ? 'AUDIO: ON' : 'AUDIO: OFF';
      btn.classList.toggle('active', isUnmuted);
    });
  }

  initNavigation() {
    // Nav pills click
    const pills = this.container.querySelectorAll('.nav-pill, .tick');
    pills.forEach(pill => {
      pill.addEventListener('click', e => {
        const target = pill.getAttribute('data-target');
        if (target) {
          audioSynth.playBeep(660, 0.05);
          this.scrollController.scrollToSection(target);
        }
      });
    });

    // Launch button in Hero
    const btnLaunch = document.getElementById('btn-scroll-launch');
    if (btnLaunch) {
      btnLaunch.addEventListener('click', (e) => {
        e.preventDefault();
        audioSynth.playStageChime();
        this.scrollController.scrollToSection('about');
      });
    }

    // Hero contact button
    const btnHeroContact = document.getElementById('btn-hero-contact');
    if (btnHeroContact) {
      btnHeroContact.addEventListener('click', e => {
        e.preventDefault();
        this.scrollController.scrollToSection('contact');
      });
    }

    // Relaunch button
    const btnRelaunch = document.getElementById('btn-relaunch');
    if (btnRelaunch) {
      btnRelaunch.addEventListener('click', () => {
        audioSynth.playStageChime();
        this.scrollController.scrollToSection('hero');
      });
    }
  }

  async sendEmailJS({ name, email, subject, message, feedbackEl, submitBtn }) {
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'qlOofHooGvOu4A1PL';
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_z0s5kvg';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_9bmvewb';

    feedbackEl.style.display = 'block';
    feedbackEl.className = 'form-feedback feedback-loading';
    feedbackEl.innerHTML = `<span class="feedback-spinner">⏳</span> TRANSMITTING SIGNAL VIA EMAILJS PROTOCOL...`;

    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            to_name: portfolioData.personal.name,
            to_email: portfolioData.personal.email,
            from_name: name.trim(),
            from_email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `Transmission failed (Status: ${response.status})`);
      }

      // Transmission success
      audioSynth.playStageChime();
      feedbackEl.className = 'form-feedback feedback-success';
      feedbackEl.innerHTML = `✓ TRANSMISSION CONFIRMED // Signal received successfully! Firdaus will respond to <strong>${email}</strong> shortly.`;

      return true;
    } catch (err) {
      console.error('EmailJS Error:', err);
      feedbackEl.className = 'form-feedback feedback-error';
      feedbackEl.innerHTML = `⚠ TRANSMISSION ERROR: ${err.message || 'Network anomaly'}. Direct dispatch available at <a href="mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}">${portfolioData.personal.email}</a>`;
      return false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = originalBtnHTML;
    }
  }

  initContactModal() {
    const openBtn = document.getElementById('btn-open-contact-modal');
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const modalForm = document.getElementById('transmission-form');
    const modalFeedback = document.getElementById('modal-form-feedback');

    const open = () => {
      audioSynth.playBeep(880, 0.06);
      modal.classList.add('visible');
      modal.setAttribute('aria-hidden', 'false');
    };

    const close = () => {
      modal.classList.remove('visible');
      modal.setAttribute('aria-hidden', 'true');
    };

    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);

    // Modal Form EmailJS submission
    if (modalForm) {
      modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btn-send-transmission');
        const name = document.getElementById('input-sender').value;
        const email = document.getElementById('input-email').value;
        const subject = document.getElementById('input-subject').value;
        const message = document.getElementById('input-message').value;

        const ok = await this.sendEmailJS({
          name,
          email,
          subject,
          message,
          feedbackEl: modalFeedback,
          submitBtn,
        });

        if (ok) {
          modalForm.reset();
          setTimeout(() => close(), 2800);
        }
      });
    }

    // In-Page Lunar Email Form submission
    const lunarForm = document.getElementById('lunar-email-form');
    const lunarFeedback = document.getElementById('lunar-form-feedback');
    const lunarSubmitBtn = document.getElementById('btn-lunar-submit');

    if (lunarForm && lunarFeedback && lunarSubmitBtn) {
      lunarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('lunar-name').value;
        const email = document.getElementById('lunar-email').value;
        const subject = document.getElementById('lunar-subject').value;
        const message = document.getElementById('lunar-message').value;

        const ok = await this.sendEmailJS({
          name,
          email,
          subject,
          message,
          feedbackEl: lunarFeedback,
          submitBtn: lunarSubmitBtn,
        });

        if (ok) {
          lunarForm.reset();
        }
      });
    }
  }

  initLanyardTilt() {
    const card = document.getElementById('mission-pass-card');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Realistic subtle 3D card tilt
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      const sheen = card.querySelector('.card-hologram-sheen');
      if (sheen) {
        sheen.style.opacity = '1';
        sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.22), rgba(255, 255, 255, 0.04) 40%, transparent 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
      const sheen = card.querySelector('.card-hologram-sheen');
      if (sheen) {
        sheen.style.opacity = '0';
      }
    });
  }

  updateTelemetry(data) {
    const { progress, stage, altitudeKm, velocityDisplay } = data;

    // Altitude Fill & Marker
    const fill = document.getElementById('hud-altitude-fill');
    const marker = document.getElementById('hud-altitude-marker');
    const tag = document.getElementById('hud-marker-tag');

    if (fill && marker) {
      const pPercent = Math.min(Math.max(progress * 100, 0), 100);
      fill.style.height = `${pPercent}%`;
      marker.style.bottom = `${pPercent}%`;
      if (tag) tag.textContent = `${altitudeKm.toLocaleString()} KM`;
    }

    // Telemetry text readouts
    const stageNameEl = document.getElementById('hud-stage-name');
    const altValEl = document.getElementById('hud-alt-val');
    const velValEl = document.getElementById('hud-vel-val');

    if (stageNameEl && stage) stageNameEl.textContent = stage.name;
    if (altValEl) altValEl.textContent = `${altitudeKm.toLocaleString()} KM`;
    if (velValEl) velValEl.textContent = velocityDisplay;

    // Highlight active nav pill
    if (stage) {
      const pills = this.container.querySelectorAll('.nav-pill');
      pills.forEach(pill => {
        pill.classList.toggle('active', pill.getAttribute('data-target') === stage.id);
      });
    }

    // Dynamic opacity/visibility of sections
    this.updateSectionVisibility(progress);
  }

  updateSectionVisibility(progress) {
    const sections = ['sec-hero', 'sec-about', 'sec-skills', 'sec-projects', 'sec-experience', 'sec-contact'];
    const windowHeight = window.innerHeight || 800;

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // An element is active if it is currently in view
      const isVisible = rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.20;

      el.classList.toggle('active-stage', isVisible);
    });
  }
}
