import { portfolioData } from '../config/portfolioData.js';
import { audioSynth } from '../config/audioSynth.js';
import {
  getCurrentLang,
  setLang,
  getI18n,
  getLocalizedProjects,
  getLocalizedTimeline,
  getLocalizedEducation,
  onLanguageChange
} from '../config/i18n.js';

/**
 * UI Overlay Manager
 * Renders semantic HTML panels, telemetry HUD, countdown loading screen,
 * multi-language switcher (EN, ID, JA), and interactive controls.
 */
export class UIOverlay {
  constructor(scrollController, options = {}) {
    this.scrollController = scrollController;
    this.onToggleExploration = options.onToggleExploration || null;
    this.container = document.getElementById('ui-overlay');
    this.loadingScreen = document.getElementById('loading-screen');
    this.currentLang = getCurrentLang();
    this.lastTelemetryData = null;

    // Listen to language changes
    this.unsubscribeLang = onLanguageChange((lang) => {
      this.currentLang = lang;
      this.render();
    });

    this.render();
  }

  setExplorationCallback(callback) {
    this.onToggleExploration = callback;
    this.initExplorationButton();
  }

  render() {
    // Preserve any existing form input values across language toggle
    const savedForms = {
      lunarName: document.getElementById('lunar-name')?.value || '',
      lunarEmail: document.getElementById('lunar-email')?.value || '',
      lunarSubject: document.getElementById('lunar-subject')?.value || '',
      lunarMessage: document.getElementById('lunar-message')?.value || '',
      modalSender: document.getElementById('input-sender')?.value || '',
      modalEmail: document.getElementById('input-email')?.value || '',
      modalSubject: document.getElementById('input-subject')?.value || '',
      modalMessage: document.getElementById('input-message')?.value || '',
    };

    const isAudioActive = document.getElementById('btn-audio-toggle')?.classList.contains('active') || false;

    const t = getI18n(this.currentLang);
    const projects = getLocalizedProjects(this.currentLang);
    const timeline = getLocalizedTimeline(this.currentLang);
    const education = getLocalizedEducation(this.currentLang);

    this.container.innerHTML = `
      <!-- TOP HUD TELEMETRY -->
      <header class="hud-top" role="banner">
        <div class="hud-brand">
          <div class="hud-logo-icon">🚀</div>
          <div class="hud-logo-text">
            <span class="hud-callsign">${t.hud.callsign}</span>
            <span class="hud-pilot">${t.hud.pilot}</span>
          </div>
        </div>

        <div class="hud-nav-pills" role="navigation" aria-label="Flight Waypoints">
          <button class="nav-pill active" data-target="hero">${t.hud.nav.hero}</button>
          <button class="nav-pill" data-target="about">${t.hud.nav.about}</button>
          <button class="nav-pill" data-target="skills">${t.hud.nav.skills}</button>
          <button class="nav-pill" data-target="projects">${t.hud.nav.projects}</button>
          <button class="nav-pill" data-target="experience">${t.hud.nav.experience}</button>
          <button class="nav-pill" data-target="contact">${t.hud.nav.contact}</button>
        </div>

        <div class="hud-controls">
          <!-- LANGUAGE SELECTOR -->
          <div class="hud-lang-selector" role="group" aria-label="Select Language">
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">EN</button>
            <button class="lang-btn ${this.currentLang === 'id' ? 'active' : ''}" data-lang="id" title="Bahasa Indonesia">ID</button>
            <button class="lang-btn ${this.currentLang === 'ja' ? 'active' : ''}" data-lang="ja" title="日本語">JA</button>
          </div>

          <!-- AUTO-SCROLL BUTTON -->
          <button id="btn-autoscroll" class="hud-btn autoscroll-btn" aria-label="Toggle Auto-Scroll Cinematic Mode" title="Auto-Scroll: plays the full journey automatically">
            <span class="autoscroll-icon">▶</span>
            <span class="autoscroll-label">${t.hud.auto}</span>
          </button>

          <!-- AUDIO TOGGLE BUTTON -->
          <button id="btn-audio-toggle" class="hud-btn ${isAudioActive ? 'active' : ''}" aria-label="Toggle Audio Sound">
            <span class="audio-icon">${isAudioActive ? '🔊' : '🔈'}</span>
            <span class="audio-label">${isAudioActive ? t.hud.audioOn : t.hud.audioOff}</span>
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
          <span class="tick" data-target="contact" title="Moon">${t.hud.altitudeTicks.moon}</span>
          <span class="tick" data-target="experience" title="Lunar Transfer">${t.hud.altitudeTicks.lunar}</span>
          <span class="tick" data-target="projects" title="Deep Space">${t.hud.altitudeTicks.deepSpace}</span>
          <span class="tick" data-target="skills" title="LEO Orbit">${t.hud.altitudeTicks.orbit}</span>
          <span class="tick" data-target="about" title="Atmosphere">${t.hud.altitudeTicks.atmos}</span>
          <span class="tick active" data-target="hero" title="Japan Pad">${t.hud.altitudeTicks.pad}</span>
        </div>
      </aside>

      <!-- BOTTOM TELEMETRY STATUS BAR -->
      <footer class="hud-bottom" role="status">
        <div class="telemetry-item">
          <span class="tel-label">${t.hud.telemetry.stage}</span>
          <span class="tel-val stage-badge" id="hud-stage-name">${t.hud.stages.hero}</span>
        </div>
        <div class="telemetry-item">
          <span class="tel-label">${t.hud.telemetry.altitude}</span>
          <span class="tel-val" id="hud-alt-val">0 KM</span>
        </div>
        <div class="telemetry-item">
          <span class="tel-label">${t.hud.telemetry.velocity}</span>
          <span class="tel-val" id="hud-vel-val">Mach 0</span>
        </div>
        <div class="telemetry-item hide-mobile">
          <span class="tel-label">${t.hud.telemetry.coordinates}</span>
          <span class="tel-val">35.6762° N, 139.6503° E</span>
        </div>
      </footer>

      <!-- SCROLLABLE CONTENT SECTIONS -->
      <main class="story-scroll-container">
        <!-- SECTION 1: HERO / LAUNCHPAD (JAPAN) -->
        <section class="story-section section-hero active-stage" id="sec-hero">
          <div class="section-card hero-card">
            <div class="badge-tag">${t.hero.badge}</div>
            <h1 class="hero-title">
              <span class="hero-kanji">${portfolioData.personal.japaneseName}</span>
              <span class="hero-name">${portfolioData.personal.name}</span>
            </h1>
            <h2 class="hero-role">${t.hero.role}</h2>
            <p class="hero-subtitle">${t.hero.subtitle}</p>
            <p class="hero-tagline">${t.hero.tagline}</p>

            <div class="hero-stats-row">
              <div class="stat-box">
                <span class="stat-number">${portfolioData.missionStats.experienceYears}</span>
                <span class="stat-text">${t.hero.statExp}</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">${portfolioData.missionStats.projectsDelivered}</span>
                <span class="stat-text">${t.hero.statProjects}</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">Enterprise</span>
                <span class="stat-text">${t.hero.statSpecialty}</span>
              </div>
            </div>

            <div class="hero-cta">
              <button class="btn-primary" id="btn-scroll-launch">
                <span>${t.hero.btnLaunch}</span>
                <span class="btn-arrow">↓</span>
              </button>
              <a href="#sec-contact" class="btn-secondary" id="btn-hero-contact">${t.hero.btnContact}</a>
            </div>

            <div class="scroll-indicator">
              <span class="mouse-icon"></span>
              <span class="scroll-text">${t.hero.scrollIndicator}</span>
            </div>
          </div>
        </section>

        <!-- SECTION 2: ABOUT ME (ATMOSPHERIC ASCENT) -->
        <section class="story-section section-about" id="sec-about">
          <div class="section-card">
            <div class="badge-tag">${t.about.badge}</div>
            <h2 class="section-heading">${t.about.heading} <span class="sub-kanji">${t.about.subKanji}</span></h2>
            <p class="about-summary">${t.about.summary}</p>

            <div class="about-grid">
              <div class="about-card">
                <div class="card-icon">🏢</div>
                <h3>${t.about.card1Title}</h3>
                <p>${t.about.card1Desc}</p>
              </div>
              <div class="about-card">
                <div class="card-icon">⚡</div>
                <h3>${t.about.card2Title}</h3>
                <p>${t.about.card2Desc}</p>
              </div>
              <div class="about-card">
                <div class="card-icon">🤖</div>
                <h3>${t.about.card3Title}</h3>
                <p>${t.about.card3Desc}</p>
              </div>
            </div>

            <div class="education-block">
              <h3 class="subsection-title">${t.about.eduTitle}</h3>
              <div class="edu-items">
                ${education
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
            <div class="badge-tag">${t.skills.badge}</div>
            <h2 class="section-heading">${t.skills.heading}</h2>
            <p class="section-desc">${t.skills.desc}</p>

            <div class="skills-dock-container">
              <!-- Frontend Station -->
              <div class="skill-category-card">
                <div class="cat-header">
                  <span class="cat-icon">🎨</span>
                  <h3>${t.skills.catFrontend}</h3>
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
                  <h3>${t.skills.catBackend}</h3>
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
                  <h3>${t.skills.catAI}</h3>
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
                  <h3>${t.skills.catMobile}</h3>
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
            <div class="badge-tag">${t.projects.badge}</div>
            <h2 class="section-heading">${t.projects.heading}</h2>
            <p class="section-desc">${t.projects.desc}</p>

            <div class="projects-carousel">
              ${projects
                .map(
                  (p, idx) => `
                <article class="project-dossier-card" data-index="${idx}">
                  <div class="card-top">
                    <span class="mission-code">${p.missionCode}</span>
                    <span class="mission-category">${p.category}</span>
                  </div>
                  <h3 class="project-title">${p.title}</h3>
                  <div class="project-meta">
                    <span class="meta-item"><strong>${t.projects.clientLabel}</strong> ${p.client}</span>
                    <span class="meta-item"><strong>${t.projects.roleLabel}</strong> ${p.role}</span>
                    <span class="meta-item"><strong>${t.projects.timelineLabel}</strong> ${p.period}</span>
                  </div>
                  <p class="project-summary">${p.summary}</p>

                  <div class="project-highlights">
                    <ul>
                      ${p.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                  </div>

                  <div class="project-tech-chips">
                    ${p.techStack.map(tech => `<span class="tech-chip">${tech}</span>`).join('')}
                  </div>

                  <div class="project-links">
                    <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="link-btn">
                      <span>${t.projects.viewGithub}</span> ↗
                    </a>
                    <button class="link-btn outline btn-project-detail" data-id="${p.id}">
                      <span>${t.projects.missionLog}</span>
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
            <div class="badge-tag">${t.experience.badge}</div>
            <h2 class="section-heading">${t.experience.heading}</h2>
            <p class="section-desc">${t.experience.desc}</p>
          </div>

          <!-- Individual experience cards -->
          <div class="flight-stages-grid">
            ${timeline.map((item, idx) => `
              <article class="flight-stage-card" aria-label="${item.stage}">

                <!-- Stage number badge (rocket booster indicator) -->
                <div class="fsc-number-badge">
                  <span class="fsc-num">0${idx + 1}</span>
                  <div class="fsc-num-glow"></div>
                </div>

                <!-- Top bar: stage label + connector line -->
                <div class="fsc-top-bar">
                  <div class="fsc-stage-label">${item.stage}</div>
                  <div class="fsc-connector-line"></div>
                </div>

                <!-- Card body -->
                <div class="fsc-body">

                  <!-- Header row: company + period -->
                  <div class="fsc-header-row">
                    <div class="fsc-company-block">
                      <span class="fsc-company-icon">🏢</span>
                      <div class="fsc-company-info">
                        <span class="fsc-company-name">${item.company}</span>
                        <span class="fsc-stage-sub">${item.stageSub || ''}</span>
                      </div>
                    </div>
                    <div class="fsc-period-badge">${item.period}</div>
                  </div>

                  <!-- Role title -->
                  <h3 class="fsc-role-title">${item.role}</h3>

                  <!-- Divider -->
                  <div class="fsc-divider"></div>

                  <!-- Description -->
                  <p class="fsc-description">${item.description}</p>

                  <!-- Key milestone footer -->
                  <div class="fsc-milestone">
                    <div class="fsc-milestone-label">
                      <span class="fsc-milestone-icon">◈</span>
                      ${t.experience.keyMilestone}
                    </div>
                    <p class="fsc-milestone-text">${item.milestone}</p>
                  </div>

                </div>

                <!-- Bottom status strip -->
                <div class="fsc-status-strip">
                  <span class="fsc-status-dot"></span>
                  <span class="fsc-status-text">${t.experience.stageSeparation}</span>
                  <span class="fsc-status-alt">ALT ${
                    idx === 0 ? '80 KM' : idx === 1 ? '450 KM' : '7,800 KM'
                  }</span>
                </div>

              </article>
            `).join('')}

            <!-- Education cards -->
            ${education.map((e, idx) => `
              <article class="flight-stage-card fsc-education" aria-label="Education: ${e.institution}">

                <div class="fsc-number-badge edu-badge">
                  <span class="fsc-num">🎓</span>
                </div>

                <div class="fsc-top-bar">
                  <div class="fsc-stage-label">${t.experience.eduLog}</div>
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
                  <span class="fsc-status-text">${t.experience.credentialsVerified}</span>
                </div>

              </article>
            `).join('')}
          </div>
        </section>

        <!-- SECTION 6: CONTACT & MISSION COMPLETE (THE MOON) -->
        <section class="story-section section-contact" id="sec-contact">
          <div class="section-card moon-contact-card">
            <div class="badge-tag">${t.contact.badge}</div>
            <h2 class="section-heading">
              ${t.contact.heading}
              <span class="sub-kanji">${t.contact.subKanji}</span>
            </h2>
            <p class="contact-lead">${t.contact.lead}</p>

            <!-- LANYARD MISSION PASS CARD -->
            <div class="lanyard-wrapper">
              <div class="lanyard-strap">
                <span class="strap-text">${t.contact.strapText}</span>
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
                      <strong>${t.contact.agencyName}</strong>
                      <span>${t.contact.agencySub}</span>
                    </div>
                  </div>
                  <div class="pass-clearance-badge">${t.contact.levelBadge}</div>
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
                    <div class="identity-role">${t.contact.role}</div>
                    <div class="identity-dept">${t.contact.dept}</div>
                    <div class="identity-base"><strong>${t.contact.baseStation}</strong></div>
                  </div>
                </div>

                <!-- Telemetry Specs Grid -->
                <div class="pass-specs-grid">
                  <div class="spec-cell">
                    <span class="spec-lbl">${t.contact.serialId}</span>
                    <span class="spec-val">FM-2026-ALPHA-01</span>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-lbl">${t.contact.callsign}</span>
                    <span class="spec-val">RYUSEI-LEAD</span>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-lbl">${t.contact.touchdownLoc}</span>
                    <span class="spec-val">MARE TRANQUILLITATIS</span>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-lbl">${t.contact.missionStatus}</span>
                    <span class="spec-val spec-verified">${t.contact.touchdownVerified}</span>
                  </div>
                </div>

                <!-- Authorized Capabilities -->
                <div class="pass-protocols">
                  <span class="protocol-lbl">${t.contact.protocolsLabel}</span>
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
                  <div class="barcode-auth">${t.contact.hashSecurity}</div>
                </div>
              </div>
            </div>

            <!-- CONTACT TILES & CHANNELS -->
            <div class="contact-info-grid">
              <a href="mailto:${portfolioData.personal.email}" class="contact-tile">
                <div class="tile-icon">✉️</div>
                <div class="tile-meta">
                  <span class="tile-label">${t.contact.directComm}</span>
                  <strong class="tile-value">${portfolioData.personal.email}</strong>
                </div>
              </a>

              <a href="${portfolioData.personal.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-tile">
                <div class="tile-icon">💼</div>
                <div class="tile-meta">
                  <span class="tile-label">${t.contact.linkedinNet}</span>
                  <strong class="tile-value">firdaus-mochamad</strong>
                </div>
              </a>

              <a href="${portfolioData.personal.github}" target="_blank" rel="noopener noreferrer" class="contact-tile">
                <div class="tile-icon">🐙</div>
                <div class="tile-meta">
                  <span class="tile-label">${t.contact.codeRepo}</span>
                  <strong class="tile-value">mocca130604</strong>
                </div>
              </a>

              <a href="${portfolioData.personal.whatsapp}" target="_blank" rel="noopener noreferrer" class="contact-tile">
                <div class="tile-icon">💬</div>
                <div class="tile-meta">
                  <span class="tile-label">${t.contact.directChannel}</span>
                  <strong class="tile-value">${portfolioData.personal.phone}</strong>
                </div>
              </a>
            </div>

            <!-- EMBEDDED EMAIL TERMINAL (EMAILJS) -->
            <div class="email-terminal-container">
              <div class="email-terminal-header">
                <div class="terminal-dot"></div>
                <span class="terminal-title">${t.contact.terminalTitle}</span>
                <span class="terminal-badge">${t.contact.terminalBadge}</span>
              </div>

              <form class="emailjs-contact-form" id="lunar-email-form">
                <div class="form-row-2">
                  <div class="form-group">
                    <label for="lunar-name">${t.contact.labelName}</label>
                    <input type="text" id="lunar-name" required placeholder="${t.contact.placeholderName}" autocomplete="name" value="${savedForms.lunarName}">
                  </div>
                  <div class="form-group">
                    <label for="lunar-email">${t.contact.labelEmail}</label>
                    <input type="email" id="lunar-email" required placeholder="${t.contact.placeholderEmail}" autocomplete="email" value="${savedForms.lunarEmail}">
                  </div>
                </div>

                <div class="form-group">
                  <label for="lunar-subject">${t.contact.labelSubject}</label>
                  <input type="text" id="lunar-subject" required placeholder="${t.contact.placeholderSubject}" value="${savedForms.lunarSubject}">
                </div>

                <div class="form-group">
                  <label for="lunar-message">${t.contact.labelMessage}</label>
                  <textarea id="lunar-message" rows="4" required placeholder="${t.contact.placeholderMessage}">${savedForms.lunarMessage}</textarea>
                </div>

                <div class="form-feedback" id="lunar-form-feedback" style="display: none;"></div>

                <div class="form-submit-row">
                  <button type="submit" class="btn-primary" id="btn-lunar-submit">
                    <span>${t.contact.btnSubmit}</span>
                    <span class="btn-icon">⚡</span>
                  </button>
                  <span class="form-note">${t.contact.encryptedNote} ${portfolioData.personal.email}</span>
                </div>
              </form>
            </div>

            <div class="contact-action-row">
              <button class="btn-secondary" id="btn-open-contact-modal">
                <span>${t.contact.btnModalOpen}</span>
                <span>📡</span>
              </button>
              <button class="btn-secondary" id="btn-relaunch">
                <span>${t.contact.btnRelaunch}</span>
                <span>↑</span>
              </button>
            </div>

            <footer class="footer-sign">
              <p>${t.contact.footerQuote}</p>
            </footer>
          </div>
        </section>
      </main>

      <!-- TRANSMISSION CONTACT MODAL -->
      <div class="contact-modal" id="contact-modal" aria-hidden="true" role="dialog" aria-labelledby="modal-title">
        <div class="modal-backdrop" id="modal-backdrop"></div>
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 id="modal-title">${t.modal.title}</h3>
            <button class="btn-close-modal" id="btn-close-modal" aria-label="Close dialog">✕</button>
          </div>
          <form class="transmission-form" id="transmission-form">
            <div class="form-group">
              <label for="input-sender">${t.modal.labelName}</label>
              <input type="text" id="input-sender" required placeholder="${t.modal.placeholderName}" value="${savedForms.modalSender}">
            </div>
            <div class="form-group">
              <label for="input-email">${t.modal.labelEmail}</label>
              <input type="email" id="input-email" required placeholder="${t.modal.placeholderEmail}" value="${savedForms.modalEmail}">
            </div>
            <div class="form-group">
              <label for="input-subject">${t.modal.labelSubject}</label>
              <input type="text" id="input-subject" required placeholder="${t.modal.placeholderSubject}" value="${savedForms.modalSubject}">
            </div>
            <div class="form-group">
              <label for="input-message">${t.modal.labelMessage}</label>
              <textarea id="input-message" rows="4" required placeholder="${t.modal.placeholderMessage}">${savedForms.modalMessage}</textarea>
            </div>
            <div class="form-feedback" id="modal-form-feedback" style="display: none;"></div>
            <div class="modal-actions">
              <button type="submit" class="btn-primary" id="btn-send-transmission">
                <span>${t.modal.btnSend}</span>
                <span>⚡</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Initialize all interactive listeners
    this.initAudioToggle();
    this.initNavigation();
    this.initContactModal();
    this.initLanyardTilt();
    this.initLanguageSelector();
    this.initExplorationButton();

    // Rebind autoscroll button
    if (this.scrollController?.bindAutoScrollButton) {
      this.scrollController.bindAutoScrollButton();
    }

    // Refresh telemetry display if we have cached telemetry
    if (this.lastTelemetryData) {
      this.updateTelemetry(this.lastTelemetryData);
    }
  }

  initLanguageSelector() {
    const buttons = this.container.querySelectorAll('.hud-lang-selector .lang-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        if (lang && lang !== this.currentLang) {
          audioSynth.playBeep(880, 0.05);
          setLang(lang);
        }
      });
    });
  }

  initExplorationButton() {
    const btn = document.getElementById('btn-planetary-explore');
    if (!btn) return;
    btn.onclick = (e) => {
      e.preventDefault();
      if (this.onToggleExploration) {
        this.onToggleExploration();
      }
    };
  }

  initAudioToggle() {
    const btn = document.getElementById('btn-audio-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isUnmuted = audioSynth.toggleMute();
      const t = getI18n(this.currentLang);
      btn.querySelector('.audio-icon').textContent = isUnmuted ? '🔊' : '🔈';
      btn.querySelector('.audio-label').textContent = isUnmuted ? t.hud.audioOn : t.hud.audioOff;
      btn.classList.toggle('active', isUnmuted);
    });
  }

  initNavigation() {
    // Nav pills & ticks click
    const pills = this.container.querySelectorAll('.nav-pill, .tick');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
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
    const t = getI18n(this.currentLang);

    feedbackEl.style.display = 'block';
    feedbackEl.className = 'form-feedback feedback-loading';
    feedbackEl.innerHTML = `<span class="feedback-spinner">⏳</span> ${t.emailFeedback.loading}`;

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
      feedbackEl.innerHTML = t.emailFeedback.success(email);

      return true;
    } catch (err) {
      console.error('EmailJS Error:', err);
      feedbackEl.className = 'form-feedback feedback-error';
      feedbackEl.innerHTML = t.emailFeedback.error(err.message || 'Network anomaly', portfolioData.personal.email, subject, message);
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
    if (!data) return;
    this.lastTelemetryData = data;
    const { progress, stage, altitudeKm, velocityDisplay } = data;
    const t = getI18n(this.currentLang);

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

    if (stageNameEl && stage) {
      stageNameEl.textContent = t.hud.stages[stage.id] || stage.name;
    }
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
      const isVisible = rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.20;

      el.classList.toggle('active-stage', isVisible);
    });
  }
}
