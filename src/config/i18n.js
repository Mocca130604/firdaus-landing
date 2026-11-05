/**
 * Internationalization (i18n) Module
 * Supports English ('en' - Default), Indonesian ('id'), and Japanese ('ja').
 */

const STORAGE_KEY = 'portfolio_lang';
const DEFAULT_LANG = 'en';

export const translations = {
  en: {
    meta: {
      title: 'Firdaus Mochamad — Frontend & Full-Stack Developer | The Journey',
      description: 'Interactive 3D Portfolio of Firdaus Mochamad — Frontend & Full-Stack Developer based in Yokohama & Indonesia. Specializing in Enterprise Vue.js/Nuxt, Micro Frontends, Laravel, Three.js, and AI MCP Integrations.',
    },
    loading: {
      badge: 'MISSION BRIEFING // JAXA-STYLE EXPEDITION',
      title: 'THE JOURNEY',
      subtitle: 'Interactive 3D rocket journey from Japan spaceport to the Moon.<br>Frontend &amp; Full-Stack Developer Portfolio — <strong>Firdaus Mochamad</strong>.',
      countdownLabel: 'T-MINUS COUNTDOWN',
      btnLaunch: 'IGNITION & LAUNCH (START JOURNEY)',
    },
    hud: {
      callsign: 'RYUSEI-1 // フィルダウス・モチャマド',
      pilot: 'Firdaus Mochamad',
      nav: {
        hero: '01 // Pad',
        about: '02 // About',
        skills: '03 // Skills',
        projects: '04 // Missions',
        experience: '05 // Stages',
        contact: '06 // Moon Pass',
      },
      audioOn: 'AUDIO: ON',
      audioOff: 'AUDIO: OFF',
      auto: 'AUTO',
      pause: 'PAUSE',
      altitudeTicks: {
        moon: 'MOON (384.4k km)',
        lunar: 'LUNAR (300k km)',
        deepSpace: 'DEEP SPACE (150k km)',
        orbit: 'ORBIT (450 km)',
        atmos: 'ATMOS (80 km)',
        pad: 'JAPAN (0 km)',
      },
      telemetry: {
        stage: 'MISSION STAGE',
        altitude: 'ALTITUDE',
        velocity: 'VELOCITY',
        coordinates: 'COORDINATES',
      },
      stages: {
        hero: 'LAUNCH PAD // YOKOHAMA',
        about: 'ASCENT & TROPOSPHERE',
        skills: 'ORBITAL CHECKPOINT // SKILLS',
        projects: 'DEEP SPACE DOSSIER // PROJECTS',
        experience: 'FLIGHT STAGES // TIMELINE',
        contact: 'LUNAR BASE // MISSION COMPLETE',
      },
      velocities: {
        preLaunch: 'Mach 0 (Pre-Launch)',
        ascending: 'Mach 2.4 (Ascending)',
        hypersonic: 'Mach 9.8 (Hypersonic)',
        orbital: '7.8 km/s (Orbital)',
        lunarTransit: '11.2 km/s (Lunar Transit)',
        lunarDescent: '1.6 km/s (Lunar Descent)',
        touchdown: '0 km/s (Touchdown)',
      },
    },
    hero: {
      badge: 'JAPAN SPACEPORT // YOKOHAMA // 種子島',
      role: 'Frontend & Full-Stack Developer',
      subtitle: 'Enterprise Web Applications • Micro Frontends • Modern UI/UX',
      tagline: 'Building resilient enterprise architectures and cinematic digital experiences.',
      statExp: 'Years Experience',
      statProjects: 'Projects Shipped',
      statSpecialty: 'Micro Frontends & AI',
      btnLaunch: 'SCROLL TO LIFT-OFF',
      btnContact: 'Get In Touch',
      scrollIndicator: 'SCROLL TO LAUNCH ROCKET TO THE MOON',
    },
    about: {
      badge: 'ALTITUDE 80-120 KM // ATMOSPHERIC TRAJECTORY',
      heading: 'About Me',
      subKanji: '自己紹介',
      summary: 'Detail-oriented Frontend and Full-Stack Developer with 4+ years of experience engineering scalable, interactive enterprise web applications. Proven track record of leading the frontend lifecycle for E-Procurement platforms, architecting Vue.js Micro Frontend ecosystems for enterprise E-Recruitment, and designing robust full-stack solutions with Laravel, Nuxt.js, and Model Context Protocol (MCP) integrations.',
      card1Title: 'Enterprise Frontend Lead',
      card1Desc: 'Specialized in architecting high-scale Vue.js Micro Frontend ecosystems and driving enterprise E-Procurement transformations.',
      card2Title: 'Full-Stack & Database Tuning',
      card2Desc: 'Engineering resilient backend systems with Laravel, complex SQL Stored Procedures, and high-concurrency event engines.',
      card3Title: 'Model Context Protocol (MCP)',
      card3Desc: 'Early adopter and implementer of MCP servers and deterministic LLM prompt engineering for corporate productivity.',
      eduTitle: 'Education & Academic Background',
    },
    skills: {
      badge: 'ALTITUDE 450 KM // LOW EARTH ORBIT STATION // スキル',
      heading: 'Orbital Skills Checkpoints',
      desc: 'Technical arsenal and battle-tested proficiencies powering mission-critical web software.',
      catFrontend: 'Frontend Ecosystem',
      catBackend: 'Backend & Databases',
      catAI: 'AI & Architecture',
      catMobile: 'Mobile & Tooling',
    },
    projects: {
      badge: 'ALTITUDE 150,000 KM // DEEP SPACE EXPLORATION // プロジェクト',
      heading: 'Mission Dossiers (Featured Projects)',
      desc: 'Key enterprise systems, architectural triumphs, and high-performance solutions deployed to production.',
      clientLabel: 'Client:',
      roleLabel: 'Role:',
      timelineLabel: 'Timeline:',
      viewGithub: 'View GitHub',
      missionLog: 'Mission Log',
    },
    experience: {
      badge: 'ALTITUDE 300,000 KM // LUNAR TRANSFER ORBIT // 経歴',
      heading: 'Flight Stages (Career Journey)',
      desc: 'Sequential stage separations — each booster jettisoned marks a new altitude of expertise.',
      keyMilestone: 'KEY MILESTONE',
      stageSeparation: 'STAGE SEPARATION COMPLETE',
      eduLog: 'EDUCATION LOG // 学歴',
      credentialsVerified: 'CREDENTIALS VERIFIED',
    },
    contact: {
      badge: 'ALTITUDE 384,400 KM // MOON TOUCHDOWN // 月面着陸成功',
      heading: 'Mission Complete',
      subKanji: '任務完了',
      lead: "The rocket has landed safely in Mare Tranquillitatis. Here is your official flight clearance and mission pass — let's connect and build the next ambitious platform together.",
      strapText: 'LUNAR EXPEDITION 2026 • CREW PASS • JAXA / RYUSEI-1 • FLIGHT CLEARANCE',
      agencyName: 'LUNAR EXPEDITION COMMAND',
      agencySub: 'SURFACE OPERATIONS CLEARANCE',
      levelBadge: 'LEVEL 5 ACCESS',
      role: 'Frontend & Full-Stack Developer',
      dept: 'Enterprise Architecture & Micro Frontends',
      baseStation: 'Base Station: Yokohama, Kanagawa, JP',
      serialId: 'SERIAL ID',
      callsign: 'CALLSIGN',
      touchdownLoc: 'TOUCHDOWN LOC',
      missionStatus: 'MISSION STATUS',
      touchdownVerified: '● TOUCHDOWN VERIFIED',
      protocolsLabel: 'AUTHORIZED CAPABILITIES & PROTOCOLS:',
      hashSecurity: 'SECURE BIOMETRIC HASH: SHA256-FM-384400-LUNA • JAXA VALIDATED',
      directComm: 'Direct Communication',
      linkedinNet: 'LinkedIn Network',
      codeRepo: 'Code Repositories',
      directChannel: 'Direct Channel (WhatsApp)',
      terminalTitle: 'LUNAR TRANSMISSION TERMINAL // DIRECT EMAIL',
      terminalBadge: 'EMAILJS SECURE LINK',
      labelName: 'CALLSIGN / YOUR NAME *',
      placeholderName: 'e.g. Commander Sarah Vance',
      labelEmail: 'RETURN FREQUENCY / YOUR EMAIL *',
      placeholderEmail: 'sarah@deepspace.org',
      labelSubject: 'MISSION OBJECTIVE / SUBJECT *',
      placeholderSubject: 'e.g. Enterprise Vue / Nuxt Project Opportunity',
      labelMessage: 'MESSAGE PAYLOAD *',
      placeholderMessage: 'Share your project vision, timeline, or engineering challenge...',
      btnSubmit: 'TRANSMIT VIA EMAILJS',
      encryptedNote: 'Encrypted direct transmission to',
      btnModalOpen: 'Open Expanded Comm-Terminal',
      btnRelaunch: 'Relaunch to Earth (Return to Earth)',
      footerQuote: 'Designed & Engineered by Firdaus Mochamad • Three.js + GSAP • 「一歩一歩、月へ」 — Step by step, to the Moon.',
    },
    modal: {
      title: '📡 Transmission Terminal // Send Message',
      labelName: 'Callsign / Your Name',
      placeholderName: 'e.g. John Doe / Engineering Lead',
      labelEmail: 'Communication Frequency / Email',
      placeholderEmail: 'name@company.com',
      labelSubject: 'Mission Objective / Subject',
      placeholderSubject: 'e.g. Enterprise Vue/Nuxt Project Opportunity',
      labelMessage: 'Message Payload',
      placeholderMessage: 'Share your project vision, timeline, or requirements...',
      btnSend: 'Transmit Message via EmailJS',
    },
    emailFeedback: {
      loading: '⏳ TRANSMITTING SIGNAL VIA EMAILJS PROTOCOL...',
      success: (email) => `✓ TRANSMISSION CONFIRMED // Signal received successfully! Firdaus will respond to <strong>${email}</strong> shortly.`,
      error: (err, email, subject, message) => `⚠ TRANSMISSION ERROR: ${err}. Direct dispatch available at <a href="mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}">${email}</a>`,
    },
    exploration: {
      btnExplore: '🛸 PLANETARY EXPLORE',
      btnExit: '✕ EXIT TO STORY',
      controlsHint: 'MOUSE / WASD: STEER • CLICK / W: THRUST • SPACE: BOOST',
      breakOrbit: 'BREAK ORBIT',
      viewDossier: 'VIEW DOSSIER',
      distUnit: 'KM',
      orbitStatus: '● IN GRAVITY ORBIT',
      cruisingStatus: 'CRUISING SECTOR',
      radarTitle: '3D SECTOR RADAR',
      planets: {
        about: {
          name: 'TERRA YOKOHAMA',
          sub: 'BASE STATION // ORIGIN',
          desc: 'Spaceport origins in Japan. Enterprise frontend leadership, full-stack architectures, and AI MCP integrations.',
        },
        skills: {
          name: 'PLANET ARSENAL',
          sub: 'ORBITAL RING // TECH STACK',
          desc: 'Technical arsenal: Vue.js, Nuxt, React, Laravel, TypeScript, Three.js, and Model Context Protocol (MCP).',
        },
        experience: {
          name: 'PLANET ODYSSEY',
          sub: 'CRIMSON STATION // CAREER STAGES',
          desc: '4+ years of flight stages: SIDIGS (Mobile/EdTech), GLOBY (Ticketing), and Datasea (Enterprise Base Product).',
        },
        projects: {
          name: 'PLANET ENTERPRISE',
          sub: 'CYAN HUB // MISSION DOSSIERS',
          desc: 'Flagship systems deployed: KraftHeinz TMS, BUMA Micro Frontends, and EVOQ E-Procurement platforms.',
        },
        contact: {
          name: 'THE MOON',
          sub: 'MARE TRANQUILLITATIS // TERMINAL',
          desc: 'Lunar touchdown completed. Official clearance pass & direct encrypted EmailJS transmission channel.',
        },
      },
    },
  },

  id: {
    meta: {
      title: 'Firdaus Mochamad — Frontend & Full-Stack Developer | The Journey',
      description: 'Portfolio interaktif 3D Firdaus Mochamad — Frontend & Full-Stack Developer berbasis di Yokohama & Indonesia. Spesialisasi Enterprise Vue.js/Nuxt, Micro Frontends, Laravel, Three.js, dan Integrasi AI MCP.',
    },
    loading: {
      badge: 'BRIEFING MISI // EKSPEDISI STANDAR JAXA',
      title: 'THE JOURNEY',
      subtitle: 'Perjalanan interaktif roket dari landasan Jepang menuju Bulan.<br>Portofolio Frontend &amp; Full-Stack Developer — <strong>Firdaus Mochamad</strong>.',
      countdownLabel: 'HITUNG MUNDUR T-MINUS',
      btnLaunch: 'PENYALAAN & PELUNCURAN (MULAI PERJALANAN)',
    },
    hud: {
      callsign: 'RYUSEI-1 // フィルダウス・モチャマド',
      pilot: 'Firdaus Mochamad',
      nav: {
        hero: '01 // Landasan',
        about: '02 // Tentang',
        skills: '03 // Keahlian',
        projects: '04 // Proyek',
        experience: '05 // Tahapan',
        contact: '06 // Paspor Bulan',
      },
      audioOn: 'AUDIO: AKTIF',
      audioOff: 'AUDIO: MATI',
      auto: 'OTOMATIS',
      pause: 'JEDA',
      altitudeTicks: {
        moon: 'BULAN (384.4k km)',
        lunar: 'LUNAR (300k km)',
        deepSpace: 'LUAR ANGKASA (150k km)',
        orbit: 'ORBIT (450 km)',
        atmos: 'ATMOSFER (80 km)',
        pad: 'JEPANG (0 km)',
      },
      telemetry: {
        stage: 'TAHAP MISI',
        altitude: 'KETINGGIAN',
        velocity: 'KECEPATAN',
        coordinates: 'KOORDINAT',
      },
      stages: {
        hero: 'LANDASAN PELUNCURAN // YOKOHAMA',
        about: 'PENDAKIAN & TROPOSFER',
        skills: 'POS PEMERIKSAAN ORBIT // KEAHLIAN',
        projects: 'BERKAS MISI LUAR ANGKASA // PROYEK',
        experience: 'TAHAPAN PENERBANGAN // PERJALANAN',
        contact: 'PANGKALAN BULAN // MISI SELESAI',
      },
      velocities: {
        preLaunch: 'Mach 0 (Pra-Peluncuran)',
        ascending: 'Mach 2.4 (Mendaki)',
        hypersonic: 'Mach 9.8 (Hipersonik)',
        orbital: '7.8 km/s (Orbit)',
        lunarTransit: '11.2 km/s (Transit Lunar)',
        lunarDescent: '1.6 km/s (Desensus Lunar)',
        touchdown: '0 km/s (Mendarat)',
      },
    },
    hero: {
      badge: 'PANGKALAN ANTARIKSA JEPANG // YOKOHAMA // 種子島',
      role: 'Frontend & Full-Stack Developer',
      subtitle: 'Aplikasi Web Enterprise • Micro Frontend • UI/UX Modern',
      tagline: 'Membangun arsitektur enterprise tangguh dan pengalaman digital sinematik.',
      statExp: 'Tahun Pengalaman',
      statProjects: 'Proyek Selesai',
      statSpecialty: 'Micro Frontend & AI',
      btnLaunch: 'GULIR UNTUK MELUNCUR',
      btnContact: 'Hubungi Saya',
      scrollIndicator: 'GULIR UNTUK MELUNCURKAN ROKET KE BULAN',
    },
    about: {
      badge: 'KETINGGIAN 80-120 KM // TRAYEKTORI ATMOSFER',
      heading: 'Tentang Saya',
      subKanji: '自己紹介',
      summary: 'Frontend dan Full-Stack Developer berpengalaman 4+ tahun dalam merancang dan mengembangkan aplikasi web skala enterprise yang interaktif dan skalabel. Berpengalaman memimpin lifecycle frontend platform E-Procurement, mengarsiteki ekosistem Micro Frontend Vue.js untuk E-Recruitment korporat, serta membangun solusi full-stack tangguh dengan Laravel, Nuxt.js, dan integrasi Model Context Protocol (MCP).',
      card1Title: 'Lead Frontend Enterprise',
      card1Desc: 'Spesialis arsitektur ekosistem Micro Frontend Vue.js berskala besar dan transformasi platform E-Procurement enterprise.',
      card2Title: 'Full-Stack & Optimasi Database',
      card2Desc: 'Membangun sistem backend tangguh dengan Laravel, Stored Procedures SQL kompleks, dan engine event berkonkurensi tinggi.',
      card3Title: 'Model Context Protocol (MCP)',
      card3Desc: 'Penerap awal server MCP dan prompt engineering LLM deterministik untuk otomatisasi dan produktivitas korporat.',
      eduTitle: 'Pendidikan & Latar Belakang Akademis',
    },
    skills: {
      badge: 'KETINGGIAN 450 KM // STASIUN ORBIT BUMI RENDAH // スキル',
      heading: 'Pos Pemeriksaan Keahlian',
      desc: 'Gudang persenjataan teknis dan kemampuan teruji yang menggerakkan sistem web mission-critical.',
      catFrontend: 'Ekosistem Frontend',
      catBackend: 'Backend & Basis Data',
      catAI: 'AI & Arsitektur',
      catMobile: 'Mobile & Peralatan',
    },
    projects: {
      badge: 'KETINGGIAN 150.000 KM // EKSPLORASI LUAR ANGKASA // プロジェクト',
      heading: 'Berkas Misi (Proyek Unggulan)',
      desc: 'Sistem enterprise utama, keberhasilan arsitektur, dan solusi performa tinggi yang diluncurkan ke tahap produksi.',
      clientLabel: 'Klien:',
      roleLabel: 'Peran:',
      timelineLabel: 'Waktu:',
      viewGithub: 'Lihat GitHub',
      missionLog: 'Catatan Misi',
    },
    experience: {
      badge: 'KETINGGIAN 300.000 KM // TRAYEKTORI TRANSISI LUNAR // 経歴',
      heading: 'Tahapan Terbang (Perjalanan Karier)',
      desc: 'Pemisahan tahapan roket berurutan — setiap pendorong yang dilepas menandai ketinggian baru keahlian.',
      keyMilestone: 'PENCAPAIAN UTAMA',
      stageSeparation: 'PEMISAHAN BOOSTER SELESAI',
      eduLog: 'CATATAN PENDIDIKAN // 学歴',
      credentialsVerified: 'KREDENSIAL TERVERIFIKASI',
    },
    contact: {
      badge: 'KETINGGIAN 384.400 KM // PENDARATAN BULAN // 月面着陸成功',
      heading: 'Misi Selesai',
      subKanji: '任務完了',
      lead: 'Roket telah mendarat dengan aman di Mare Tranquillitatis. Inilah izin penerbangan dan paspor misi resmi Anda — mari terhubung dan bangun platform ambisius berikutnya bersama.',
      strapText: 'EKSPEDISI BULAN 2026 • PASPOR KRU • JAXA / RYUSEI-1 • IZIN PENERBANGAN',
      agencyName: 'KOMANDO EKSPEDISI BULAN',
      agencySub: 'IZIN OPERASI PERMUKAAN',
      levelBadge: 'AKSES TINGKAT 5',
      role: 'Frontend & Full-Stack Developer',
      dept: 'Arsitektur Enterprise & Micro Frontend',
      baseStation: 'Stasiun Pangkalan: Yokohama, Kanagawa, JP',
      serialId: 'ID SERIAL',
      callsign: 'TANDA PANGGIL',
      touchdownLoc: 'LOKASI PENDARATAN',
      missionStatus: 'STATUS MISI',
      touchdownVerified: '● PENDARATAN TERVERIFIKASI',
      protocolsLabel: 'KEMAMPUAN & PROTOKOL TEROTORISASI:',
      hashSecurity: 'HASH BIOMETRIK AMAN: SHA256-FM-384400-LUNA • VALIDASI JAXA',
      directComm: 'Komunikasi Langsung',
      linkedinNet: 'Jaringan LinkedIn',
      codeRepo: 'Repositori Kode',
      directChannel: 'Saluran Langsung (WhatsApp)',
      terminalTitle: 'TERMINAL TRANSMISI BULAN // EMAIL LANGSUNG',
      terminalBadge: 'KONEKSI AMAN EMAILJS',
      labelName: 'TANDA PANGGIL / NAMA ANDA *',
      placeholderName: 'cth. Komandan Sarah Vance',
      labelEmail: 'FREKUENSI BALIK / EMAIL ANDA *',
      placeholderEmail: 'sarah@deepspace.org',
      labelSubject: 'TUJUAN MISI / SUBJEK *',
      placeholderSubject: 'cth. Peluang Proyek Enterprise Vue / Nuxt',
      labelMessage: 'MUATAN PESAN *',
      placeholderMessage: 'Ceritakan visi proyek, jadwal waktu, atau tantangan rekayasa Anda...',
      btnSubmit: 'KIRIM VIA EMAILJS',
      encryptedNote: 'Transmisi langsung terenkripsi ke',
      btnModalOpen: 'Buka Terminal Komunikasi Luas',
      btnRelaunch: 'Luncurkan Kembali ke Bumi',
      footerQuote: 'Dirancang & Direkayasa oleh Firdaus Mochamad • Three.js + GSAP • 「一歩一歩、月へ」 — Selangkah demi selangkah menuju Bulan.',
    },
    modal: {
      title: '📡 Terminal Transmisi // Kirim Pesan',
      labelName: 'Tanda Panggil / Nama Anda',
      placeholderName: 'cth. Budi Santoso / Engineering Lead',
      labelEmail: 'Frekuensi Komunikasi / Email',
      placeholderEmail: 'nama@perusahaan.com',
      labelSubject: 'Tujuan Misi / Subjek',
      placeholderSubject: 'cth. Peluang Proyek Enterprise Vue/Nuxt',
      labelMessage: 'Muatan Pesan',
      placeholderMessage: 'Bagikan visi proyek, jadwal waktu, atau kebutuhan Anda...',
      btnSend: 'Kirim Pesan via EmailJS',
    },
    emailFeedback: {
      loading: '⏳ MENGIRIM SINYAL MELALUI PROTOKOL EMAILJS...',
      success: (email) => `✓ TRANSMISI TERKONFIRMASI // Sinyal berhasil diterima! Firdaus akan segera membalas ke <strong>${email}</strong>.`,
      error: (err, email, subject, message) => `⚠ GANGGUAN TRANSMISI: ${err}. Pengiriman langsung dapat melalui <a href="mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}">${email}</a>`,
    },
    exploration: {
      btnExplore: '🛸 JELAJAH PLANET',
      btnExit: '✕ KEMBALI KE CERITA',
      controlsHint: 'MOUSE / WASD: KEMUDI • KLIK / W: GAS • SPASI: BOOST',
      breakOrbit: 'TINGGALKAN ORBIT',
      viewDossier: 'LIHAT BERKAS',
      distUnit: 'KM',
      orbitStatus: '● DALAM ORBIT GRAVITASI',
      cruisingStatus: 'JELAJAH SEKTOR',
      radarTitle: 'RADAR 3D SEKTOR',
      planets: {
        about: {
          name: 'TERRA YOKOHAMA',
          sub: 'STASIUN BASIS // PROFIL',
          desc: 'Titik awal peluncuran Jepang. Kepemimpinan frontend enterprise, arsitektur full-stack, dan inovasi AI MCP.',
        },
        skills: {
          name: 'PLANET ARSENAL',
          sub: 'CINCIN ORBIT // KEAHLIAN',
          desc: 'Persenjataan teknologi: Vue.js, Nuxt, React, Laravel, TypeScript, Three.js, dan Model Context Protocol (MCP).',
        },
        experience: {
          name: 'PLANET ODYSSEY',
          sub: 'STASIUN MERAH // PERJALANAN KARIER',
          desc: 'Tahapan karier 4+ tahun: SIDIGS (Mobile/EdTech), GLOBY (Ticketing), dan Datasea (Enterprise Base Product).',
        },
        projects: {
          name: 'PLANET ENTERPRISE',
          sub: 'HUB CYAN // BERKAS PROYEK',
          desc: 'Sistem produksi enterprise: TMS KraftHeinz, Micro Frontend BUMA, dan platform E-Procurement EVOQ.',
        },
        contact: {
          name: 'BULAN (THE MOON)',
          sub: 'MARE TRANQUILLITATIS // TERMINAL',
          desc: 'Pendaratan Bulan sukses. Paspor resmi misi lunar & transmisi langsung terenkripsi melalui EmailJS.',
        },
      },
    },
  },

  ja: {
    meta: {
      title: 'フィルダウス・モチャマド — フロントエンド & フルスタックエンジニア | The Journey',
      description: '横浜およびインドネシアを拠点とするフィルダウス・モチャマドのインタラクティブ3Dポートフォリオ。エンタープライズVue.js/Nuxt、マイクロフロントエンド、Laravel、Three.js、AI MCP統合を専門としています。',
    },
    loading: {
      badge: 'ミッションブリーフィング // JAXA規格月探査',
      title: 'THE JOURNEY',
      subtitle: '日本の宇宙港から月面を目指すインタラクティブなロケットフライト。<br>フロントエンド &amp; フルスタックエンジニア ポートフォリオ — <strong>フィルダウス・モチャマド</strong>。',
      countdownLabel: '打ち上げカウントダウン',
      btnLaunch: '点火 & 発射 (ミッション開始)',
    },
    hud: {
      callsign: 'RYUSEI-1 // フィルダウス・モチャマド',
      pilot: 'フィルダウス・モチャマド',
      nav: {
        hero: '01 // 発射台',
        about: '02 // 概要',
        skills: '03 // スキル',
        projects: '04 // 実績',
        experience: '05 // 経歴',
        contact: '06 // 月面パス',
      },
      audioOn: '音声: オン',
      audioOff: '音声: オフ',
      auto: '自動飛行',
      pause: '一時停止',
      altitudeTicks: {
        moon: '月面 (38.4万 km)',
        lunar: '月遷移軌道 (30万 km)',
        deepSpace: '深宇宙 (15万 km)',
        orbit: '低軌道 (450 km)',
        atmos: '大気圏 (80 km)',
        pad: '日本 (0 km)',
      },
      telemetry: {
        stage: 'ミッション段階',
        altitude: '高度',
        velocity: '速度',
        coordinates: '座標',
      },
      stages: {
        hero: '発射台 // 横浜',
        about: '上昇 & 対流圏突破',
        skills: '軌道ステーション // スキル',
        projects: '深宇宙探査 // 実績',
        experience: '推進ステージ // キャリア経歴',
        contact: '月面基地 // ミッション完了',
      },
      velocities: {
        preLaunch: 'マッハ 0 (発射前)',
        ascending: 'マッハ 2.4 (上昇中)',
        hypersonic: 'マッハ 9.8 (極超音速)',
        orbital: '7.8 km/s (軌道速度)',
        lunarTransit: '11.2 km/s (月遷移飛行)',
        lunarDescent: '1.6 km/s (月面降下)',
        touchdown: '0 km/s (着陸完了)',
      },
    },
    hero: {
      badge: '日本宇宙港 // 横浜 // 種子島',
      role: 'フロントエンド & フルスタックエンジニア',
      subtitle: 'エンタープライズWebアプリケーション • マイクロフロントエンド • モダンUI/UX',
      tagline: '堅牢なエンタープライズアーキテクチャと映画的なデジタル体験の構築。',
      statExp: '年の実務経験',
      statProjects: 'プロジェクト納品',
      statSpecialty: 'マイクロフロントエンド & AI',
      btnLaunch: 'スクロールで打ち上げ',
      btnContact: 'お問い合わせ',
      scrollIndicator: 'スクロールして月へ向けロケットを発射',
    },
    about: {
      badge: '高度 80-120 KM // 大気圏突入・上昇軌道',
      heading: '自己紹介',
      subKanji: '経歴概要',
      summary: 'スケーラブルでインタラクティブなエンタープライズWebアプリケーションの開発において4年以上の実績を持つフロントエンドおよびフルスタックエンジニア。電子調達（E-Procurement）プラットフォームのフロントエンド統括、Vue.jsを用いたマイクロフロントエンド設計、Laravel、Nuxt.js、Model Context Protocol（MCP）を統合した堅牢なフルスタック開発に強みを持っています。',
      card1Title: 'エンタープライズ フロントエンドリード',
      card1Desc: '大規模なVue.jsマイクロフロントエンド設計および企業向け電子調達プラットフォームの刷新に特化。',
      card2Title: 'フルスタック & DBチューニング',
      card2Desc: 'Laravel、複雑なSQLストアドプロシージャ、高並行イベント処理基盤による堅牢なバックエンド開発。',
      card3Title: 'Model Context Protocol (MCP)',
      card3Desc: '企業の開発生産性を飛躍させるMCPサーバーおよび確定型LLMプロンプトエンジニアリングの実装。',
      eduTitle: '学歴・アカデミックバックグラウンド',
    },
    skills: {
      badge: '高度 450 KM // 地球低軌道ステーション // スキル',
      heading: 'オービタル スキルチェック',
      desc: 'ミッションクリティカルなWebシステムを支える実戦で培われた技術スタックと専門知識。',
      catFrontend: 'フロントエンド・エコシステム',
      catBackend: 'バックエンド & データベース',
      catAI: 'AI & アーキテクチャ',
      catMobile: 'モバイル & 開発ツール',
    },
    projects: {
      badge: '高度 150,000 KM // 深宇宙探査ミッション // プロジェクト',
      heading: 'ミッション実績 (主要プロジェクト)',
      desc: '本番運用実績のある主要エンタープライズシステム、アーキテクチャ設計、高負荷対応ソリューション。',
      clientLabel: 'クライアント:',
      roleLabel: '役割:',
      timelineLabel: '期間:',
      viewGithub: 'GitHubを見る',
      missionLog: 'ミッション詳細',
    },
    experience: {
      badge: '高度 300,000 KM // 月遷移軌道投入 // 経歴',
      heading: '推進ステージ (キャリア経歴)',
      desc: 'ロケットの多段分離 — 切り離された各ブースターは新たな高みへの到達を象徴しています。',
      keyMilestone: '主要マイルストーン',
      stageSeparation: 'ブースター切り離し完了',
      eduLog: '学歴ログ // 学歴',
      credentialsVerified: '資格・履修確認済み',
    },
    contact: {
      badge: '高度 384,400 KM // 月面軟着陸 // 月面着陸成功',
      heading: 'ミッション完了',
      subKanji: '任務完了',
      lead: 'ロケットは静かの海（Mare Tranquillitatis）に無事着陸しました。公式の月面アクセスパスを発行しました — 次なる革新的なプロジェクトを共に創り上げましょう。',
      strapText: '月探査ミッション 2026 • クルーパス • JAXA / RYUSEI-1 • 飛行認証',
      agencyName: '月面探査統合司令部',
      agencySub: '月面オペレーション許可証',
      levelBadge: 'レベル5 アクセス権限',
      role: 'フロントエンド & フルスタックエンジニア',
      dept: 'エンタープライズアーキテクチャ & マイクロフロントエンド',
      baseStation: '地上基地: 神奈川県横浜市',
      serialId: 'シリアルID',
      callsign: 'コールサイン',
      touchdownLoc: '着陸地点',
      missionStatus: 'ミッション状況',
      touchdownVerified: '● 月面着陸確認完了',
      protocolsLabel: '認可された専門スキル & 技術プロトコル:',
      hashSecurity: '暗号化生体認証ハッシュ: SHA256-FM-384400-LUNA • JAXA認証済',
      directComm: '直接メール連絡',
      linkedinNet: 'LinkedIn ネットワーク',
      codeRepo: 'コードリポジトリ',
      directChannel: 'ダイレクト連絡 (WhatsApp)',
      terminalTitle: '月面通信ターミナル // ダイレクトEメール',
      terminalBadge: 'EMAILJS セキュアリンク',
      labelName: 'コールサイン / お名前 *',
      placeholderName: '例: サラ・ヴァンス 開発責任者',
      labelEmail: '返信先 / メールアドレス *',
      placeholderEmail: 'sarah@company.com',
      labelSubject: 'ミッション目的 / 件名 *',
      placeholderSubject: '例: Vue/Nuxt エンタープライズ開発のご相談',
      labelMessage: 'メッセージ内容 *',
      placeholderMessage: 'プロジェクトの概要、スケジュール、技術要件などをお気軽にご記入ください...',
      btnSubmit: 'EMAILJS経由で送信',
      encryptedNote: '暗号化直接送信先:',
      btnModalOpen: '拡大通信ターミナルを開く',
      btnRelaunch: '地球へ再打ち上げ (トップに戻る)',
      footerQuote: '設計・開発: フィルダウス・モチャマド • Three.js + GSAP • 「一歩一歩、月へ」 — Step by step, to the Moon.',
    },
    modal: {
      title: '📡 通信ターミナル // メッセージ送信',
      labelName: 'コールサイン / お名前',
      placeholderName: '例: 山田 太郎 / 開発リード',
      labelEmail: '通信周波数 / メールアドレス',
      placeholderEmail: 'name@company.co.jp',
      labelSubject: 'ミッション目的 / 件名',
      placeholderSubject: '例: Vue/Nuxt エンタープライズ開発案件のご相談',
      labelMessage: 'メッセージ内容',
      placeholderMessage: 'プロジェクトの構想、開発要件、希望時期などをお書きください...',
      btnSend: 'EmailJS経由で送信する',
    },
    emailFeedback: {
      loading: '⏳ EMAILJSプロトコル経由で信号送信中...',
      success: (email) => `✓ 送信確認完了 // シグナルが正常に受信されました！フィルダウスより <strong>${email}</strong> へ速やかにご返信いたします。`,
      error: (err, email, subject, message) => `⚠ 送信エラー: ${err}。直接のご連絡は <a href="mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}">${email}</a> までお願いいたします。`,
    },
    exploration: {
      btnExplore: '🛸 惑星探査モード',
      btnExit: '✕ ストーリーに戻る',
      controlsHint: 'マウス / WASD: 操縦 • クリック / W: 推進 • スペース: 加速',
      breakOrbit: '軌道離脱',
      viewDossier: '詳細ドキュメント',
      distUnit: 'KM',
      orbitStatus: '● 惑星重力圏に投入',
      cruisingStatus: '通常巡航中',
      radarTitle: '3Dセクターレーダー',
      planets: {
        about: {
          name: 'テラ・横浜 (TERRA YOKOHAMA)',
          sub: '地上発射基地 // 自己紹介',
          desc: '日本宇宙港からの出発。大規模エンタープライズフロントエンド統括、フルスタック設計、AI MCP統合。',
        },
        skills: {
          name: 'アーセナル星 (PLANET ARSENAL)',
          sub: '軌道リング // 技術スタック',
          desc: '開発兵装: Vue.js, Nuxt, React, Laravel, TypeScript, Three.js, Model Context Protocol (MCP)。',
        },
        experience: {
          name: 'オデッセイ星 (PLANET ODYSSEY)',
          sub: '深紅ステーション // キャリア経歴',
          desc: '4年以上の歩み: SIDIGS（EdTech/Mobile）、GLOBY（チケッティング）、Datasea（調達基盤/MCP）。',
        },
        projects: {
          name: 'エンタープライズ星 (PLANET ENTERPRISE)',
          sub: 'シアンハブ // プロジェクト実績',
          desc: '本番稼働システム: KraftHeinz TMS、BUMAマイクロフロントエンド、EVOQ調達プラットフォーム。',
        },
        contact: {
          name: '月面基地 (THE MOON)',
          sub: '静かの海 // 通信ターミナル',
          desc: '月面軟着陸完了。公式月面クルーアクセスパスおよびEmailJS暗号化ダイレクト通信リンク。',
        },
      },
    },
  },
};

/**
 * Projects localization by language
 */
export const localizedProjects = {
  en: [
    {
      id: 'tms-kraftheinz',
      missionCode: 'MSN-01 // TMS',
      title: 'Transportation Management System (TMS)',
      client: 'KraftHeinz / Datasea',
      role: 'Full-stack Developer',
      period: '2023 - 2024',
      category: 'Enterprise Logistics',
      summary: 'Engineered an enterprise-grade full-stack logistics and shipment management platform handling complex transportation workflows across multiple supply-chain hubs.',
      highlights: [
        'Architected scalable backend workflows using Laravel and Blade templates.',
        'Implemented high-performance Stored Procedures (SPs) and optimized database views to process massive freight dispatch data.',
        'Delivered intuitive real-time tracking dashboards for fleet operators and distribution managers.',
      ],
      techStack: ['Laravel', 'Blade', 'MySQL', 'Stored Procedures', 'JavaScript', 'Bootstrap'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'recruitment-buma',
      missionCode: 'MSN-02 // MFE',
      title: 'E-Recruitment Micro Frontend Platform',
      client: 'BUMA (Bukit Makmur) / Datasea',
      role: 'Frontend Developer',
      period: '2023 - 2024',
      category: 'Micro Frontend Architecture',
      summary: 'Designed and deployed a modern Micro Frontend architecture utilizing Vue.js for high-volume enterprise applicant tracking and recruitment.',
      highlights: [
        'Decoupled legacy monolithic portal into autonomous micro-apps with independent CI/CD release cycles.',
        'Implemented shared state contracts and federated module communication with zero cross-app latency.',
        'Modernized candidate application flow, dramatically improving user engagement and funnel conversion.',
      ],
      techStack: ['Vue.js', 'Micro Frontends', 'Tailwind CSS', 'Pinia', 'REST APIs', 'Vite'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'evoq-procurement',
      missionCode: 'MSN-03 // MCP',
      title: 'EVOQ E-Procurement & MCP Server',
      client: 'Datasea Base Product',
      role: 'Frontend Developer & AI Engineer',
      period: '2023 - Present',
      category: 'Enterprise AI & Base Product',
      summary: 'Spearheaded key frontend modules, engineered custom design systems, and built a Model Context Protocol (MCP) server to encode business and low-code rules for deterministic LLM execution.',
      highlights: [
        'Created a unified reusable enterprise Design System package across all procurement modules.',
        'Engineered low-code generation rules into an active Model Context Protocol (MCP) server.',
        'Optimized invoice tracking and supplier bidding modules for corporate clients including Aryanobel and 7Event.',
      ],
      techStack: ['Nuxt.js', 'Vue.js', 'MCP (Model Context Protocol)', 'TypeScript', 'Tailwind CSS'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'globy-ticketing',
      missionCode: 'MSN-04 // TICKET',
      title: 'GLOBY.ID Event Ticketing Platform',
      client: 'GLOBY.ID',
      role: 'Frontend Web / Fullstack Developer',
      period: '2022 - 2023',
      category: 'High-Traffic E-Commerce',
      summary: 'Developed a high-reliability event ticketing platform capable of handling immense traffic spikes during flash sales and concert ticket releases.',
      highlights: [
        'Engineered transactional payment processing with instantaneous QR automated e-ticket issuance.',
        'Constructed comprehensive organizer analytics dashboards for live revenue and attendee tracking.',
        'Tuned database queries and redis caching to withstand thousands of concurrent buyers.',
      ],
      techStack: ['Laravel', 'MySQL', 'Midtrans Payment Gateway', 'Blade', 'SCSS', 'JavaScript'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'sidigs-suite',
      missionCode: 'MSN-05 // EDU',
      title: 'SIDIGS Academic Suite & Mobile App',
      client: 'SIDIGS',
      role: 'Frontend & Mobile Developer',
      period: '2021 - 2023',
      category: 'EdTech & Mobile',
      summary: 'Executed complete revamp of the Student Web Platform from Vue.js to Nuxt.js, modernizing UI/UX for thousands of students, while building native Flutter mobile apps.',
      highlights: [
        'Revamped student portal to Nuxt.js with SSR, boosting load speeds and user satisfaction.',
        'Built cross-platform Flutter applications for students and teachers with schedule and academic tracking.',
        'Constructed reusable web component libraries with custom CSS modules.',
      ],
      techStack: ['Nuxt.js', 'Vue.js', 'Flutter', 'Dart', 'CSS3', 'REST APIs'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
  ],

  id: [
    {
      id: 'tms-kraftheinz',
      missionCode: 'MSN-01 // TMS',
      title: 'Transportation Management System (TMS)',
      client: 'KraftHeinz / Datasea',
      role: 'Full-stack Developer',
      period: '2023 - 2024',
      category: 'Logistik Enterprise',
      summary: 'Merancang platform logistik dan manajemen pengiriman skala enterprise untuk menangani alur kerja transportasi kompleks di berbagai hub rantai pasok.',
      highlights: [
        'Mengarsiteki backend berskala besar dengan Laravel dan Blade templates.',
        'Mengimplementasikan Stored Procedures (SPs) performa tinggi serta database views teroptimasi untuk memproses data pengiriman muatan masif.',
        'Menyediakan dasbor pelacakan real-time intuitif bagi operator armada dan manajer distribusi.',
      ],
      techStack: ['Laravel', 'Blade', 'MySQL', 'Stored Procedures', 'JavaScript', 'Bootstrap'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'recruitment-buma',
      missionCode: 'MSN-02 // MFE',
      title: 'Platform Micro Frontend E-Recruitment',
      client: 'BUMA (Bukit Makmur) / Datasea',
      role: 'Frontend Developer',
      period: '2023 - 2024',
      category: 'Arsitektur Micro Frontend',
      summary: 'Merancang dan menerapkan arsitektur Micro Frontend modern berbasis Vue.js untuk pelacakan dan rekrutmen kandidat volume tinggi.',
      highlights: [
        'Memecah portal monolitik lawas menjadi mikro-aplikasi otonom dengan siklus rilis CI/CD independen.',
        'Mengimplementasikan kontrak state bersama dan komunikasi modul terfederasi tanpa latensi lintas-aplikasi.',
        'Memodernisasi alur lamaran kandidat, meningkatkan keterlibatan pengguna dan tingkat konversi funnel secara signifikan.',
      ],
      techStack: ['Vue.js', 'Micro Frontends', 'Tailwind CSS', 'Pinia', 'REST APIs', 'Vite'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'evoq-procurement',
      missionCode: 'MSN-03 // MCP',
      title: 'EVOQ E-Procurement & Server MCP',
      client: 'Datasea Base Product',
      role: 'Frontend Developer & AI Engineer',
      period: '2023 - Sekarang',
      category: 'Enterprise AI & Base Product',
      summary: 'Memimpin pengembangan modul frontend kunci, merancang design system kustom, dan membangun server Model Context Protocol (MCP) untuk enkoding aturan bisnis dan low-code.',
      highlights: [
        'Membangun paket Design System enterprise terpadu dan reusable di seluruh modul pengadaan.',
        'Mengembangkan aturan pembuatan kode otomatis ke dalam server aktif Model Context Protocol (MCP).',
        'Mengoptimalkan modul pelacakan faktur dan lelang pemasok untuk klien korporat seperti Aryanobel dan 7Event.',
      ],
      techStack: ['Nuxt.js', 'Vue.js', 'MCP (Model Context Protocol)', 'TypeScript', 'Tailwind CSS'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'globy-ticketing',
      missionCode: 'MSN-04 // TICKET',
      title: 'Platform Tiket Acara GLOBY.ID',
      client: 'GLOBY.ID',
      role: 'Frontend Web / Fullstack Developer',
      period: '2022 - 2023',
      category: 'E-Commerce Trafik Tinggi',
      summary: 'Mengembangkan platform tiket acara berkeandalan tinggi yang sanggup menangani lonjakan trafik masif selama flash sale dan penjualan tiket konser.',
      highlights: [
        'Mengembangkan pemrosesan pembayaran transaksional dengan penerbitan e-tiket otomatis berbasis QR instan.',
        'Membangun dasbor analitik komprehensif bagi penyelenggara untuk pemantauan pendapatan dan peserta secara langsung.',
        'Mengoptimasi kueri basis data dan cache Redis untuk melayani ribuan pembeli konkuren secara bersamaan.',
      ],
      techStack: ['Laravel', 'MySQL', 'Midtrans Payment Gateway', 'Blade', 'SCSS', 'JavaScript'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'sidigs-suite',
      missionCode: 'MSN-05 // EDU',
      title: 'SIDIGS Academic Suite & Aplikasi Mobile',
      client: 'SIDIGS',
      role: 'Frontend & Mobile Developer',
      period: '2021 - 2023',
      category: 'EdTech & Mobile',
      summary: 'Melakukan pembaruan menyeluruh platform web siswa dari Vue.js ke Nuxt.js, meningkatkan UI/UX untuk ribuan siswa sekaligus membangun aplikasi mobile Flutter.',
      highlights: [
        'Memperbarui portal siswa ke Nuxt.js dengan SSR, meningkatkan kecepatan muat dan kepuasan pengguna.',
        'Membangun aplikasi Flutter lintas platform bagi siswa dan guru dengan jadwal dan pemantauan nilai.',
        'Membangun pustaka komponen web reusable dengan modul CSS kustom.',
      ],
      techStack: ['Nuxt.js', 'Vue.js', 'Flutter', 'Dart', 'CSS3', 'REST APIs'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
  ],

  ja: [
    {
      id: 'tms-kraftheinz',
      missionCode: 'MSN-01 // TMS',
      title: '運行管理システム (TMS)',
      client: 'KraftHeinz / Datasea',
      role: 'フルスタックエンジニア',
      period: '2023 - 2024',
      category: 'エンタープライズ物流',
      summary: '複数のサプライチェーン拠点を横断する複雑な輸送ワークフローを処理する、エンタープライズ向け物流・出荷管理システムを開発。',
      highlights: [
        'LaravelとBladeテンプレートを用いたスケーラブルなバックエンド基盤を設計・構築。',
        '大量の輸送運行データを高速集計するため、高性能ストアドプロシージャおよび最適化ビューを実装。',
        '運行管理者および物流責任者向けに直感的なリアルタイム追跡ダッシュボードを提供。',
      ],
      techStack: ['Laravel', 'Blade', 'MySQL', 'Stored Procedures', 'JavaScript', 'Bootstrap'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'recruitment-buma',
      missionCode: 'MSN-02 // MFE',
      title: 'E-リクルーティング マイクロフロントエンド基盤',
      client: 'BUMA (Bukit Makmur) / Datasea',
      role: 'フロントエンドエンジニア',
      period: '2023 - 2024',
      category: 'マイクロフロントエンド',
      summary: '大量応募者を管理するエンタープライズ採用管理システム向けに、Vue.jsを活用した最新のマイクロフロントエンド基盤を設計・展開。',
      highlights: [
        '従来のモノリス型ポータルを自律的なマイクロアプリへ分離し、独立したCI/CDリリースサイクルを確立。',
        'アプリ間レイテンシゼロの共有状態管理およびモジュールフェデレーション通信規約を策定。',
        '応募フローを刷新し、候補者のエンゲージメントおよび応募完了率を大幅に改善。',
      ],
      techStack: ['Vue.js', 'Micro Frontends', 'Tailwind CSS', 'Pinia', 'REST APIs', 'Vite'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'evoq-procurement',
      missionCode: 'MSN-03 // MCP',
      title: 'EVOQ 電子調達 & MCPサーバー基盤',
      client: 'Datasea Base Product',
      role: 'フロントエンド & AIエンジニア',
      period: '2023 - 現在',
      category: 'エンタープライズAI & コアプロダクト',
      summary: '主要フロントエンドモジュールの統括、独自デザインシステムの開発、確定型LLM実行のための業務規約をエンコードしたModel Context Protocol（MCP）サーバーを構築。',
      highlights: [
        'すべての調達モジュールで再利用可能な共通エンタープライズデザインシステムを構築。',
        'ローコード生成ロジックをアクティブなModel Context Protocol（MCP）サーバーへ組み込み。',
        'Aryanobelや7Eventを含む法人顧客向けに請求書追跡およびサプライヤー入札モジュールを最適化。',
      ],
      techStack: ['Nuxt.js', 'Vue.js', 'MCP (Model Context Protocol)', 'TypeScript', 'Tailwind CSS'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'globy-ticketing',
      missionCode: 'MSN-04 // TICKET',
      title: 'GLOBY.ID イベントチケッティング基盤',
      client: 'GLOBY.ID',
      role: 'フロントエンド / フルスタックエンジニア',
      period: '2022 - 2023',
      category: '高負荷Eコマース',
      summary: 'フラッシュセールやコンサート発売時の急激なアクセス集中に耐えうる高信頼性イベントチケッティングプラットフォームを開発。',
      highlights: [
        'トランザクション決済処理とQRコード即時自動発券エンジンを構築。',
        '売上推移と来場者数をリアルタイムで可視化する詳細アナリティクスダッシュボードを開発。',
        '数千規模の同時購入リクエストに耐えるSQLクエリチューニングとRedisキャッシュ戦略を実施。',
      ],
      techStack: ['Laravel', 'MySQL', 'Midtrans Payment Gateway', 'Blade', 'SCSS', 'JavaScript'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
    {
      id: 'sidigs-suite',
      missionCode: 'MSN-05 // EDU',
      title: 'SIDIGS アカデミックスイート & モバイルアプリ',
      client: 'SIDIGS',
      role: 'フロントエンド & モバイルエンジニア',
      period: '2021 - 2023',
      category: '教育工学 & モバイル',
      summary: '受講生向けポータルをVue.jsからNuxt.jsへ刷新し、数千人の学習体験を向上させるとともに、Flutterによるクロスプラットフォームアプリを構築。',
      highlights: [
        'Nuxt.jsとSSRによるポータル刷新で表示速度とユーザー満足度を大幅に向上。',
        '時間割や学習進捗を管理できる教員・生徒向けFlutterクロスプラットフォームアプリを開発。',
        'カスタムCSSモジュールを備えた再利用可能なWebコンポーネントライブラリを構築。',
      ],
      techStack: ['Nuxt.js', 'Vue.js', 'Flutter', 'Dart', 'CSS3', 'REST APIs'],
      links: { demo: '#', github: 'https://github.com/mocca130604' },
    },
  ],
};

/**
 * Career timeline stages localization
 */
export const localizedTimeline = {
  en: [
    {
      stage: 'STAGE 1: IGNITION & ASCENT',
      stageSub: 'Ground Foundations (2021 - 2022)',
      company: 'SIDIGS & Freelance',
      role: 'Frontend Developer & Mobile Developer',
      period: 'July 2021 - May 2023',
      description: 'Ignited career in cross-platform mobile development (Flutter) and frontend modernization (Vue.js to Nuxt.js). Developed academic suites and freelance E-Learning portals.',
      milestone: 'Built solid foundation in mobile and reactive web technologies.',
    },
    {
      stage: 'STAGE 2: BOOSTER ACCELERATION',
      stageSub: 'Full-Stack Scaling (2022 - 2023)',
      company: 'GLOBY.ID & SyababStudio',
      role: 'Frontend Web & Fullstack Developer',
      period: 'Nov 2022 - Mar 2023',
      description: 'Engineered transactional ticketing monoliths, payment gateway integrations, and high-concurrency event dashboards with Laravel and Vue.',
      milestone: 'Mastered high-traffic database optimization & transactional integrity.',
    },
    {
      stage: 'STAGE 3: ORBITAL INSERTION & AI',
      stageSub: 'Enterprise Architecture & Innovation (2023 - Present)',
      company: 'Datasea',
      role: 'Frontend Developer / Fullstack Developer',
      period: 'July 2023 - Present (3+ Years)',
      description: 'Leading frontend architecture for enterprise E-Procurement platforms. Architecting Vue.js Micro Frontends for BUMA, engineering KraftHeinz TMS fullstack workflows, and establishing organization-wide AI & Model Context Protocol (MCP) standards.',
      milestone: 'Driving enterprise architecture, micro-frontends, and AI LLM integrations.',
    },
  ],

  id: [
    {
      stage: 'TAHAP 1: PENYALAAN & PENDAKIAN',
      stageSub: 'Fondasi Awal (2021 - 2022)',
      company: 'SIDIGS & Freelance',
      role: 'Frontend Developer & Mobile Developer',
      period: 'Juli 2021 - Mei 2023',
      description: 'Mengawali karier di ranah aplikasi mobile cross-platform (Flutter) dan modernisasi frontend (Vue.js ke Nuxt.js). Membangun sistem akademik dan portal E-Learning.',
      milestone: 'Membangun fondasi kokoh dalam teknologi mobile dan web reaktif.',
    },
    {
      stage: 'TAHAP 2: AKSELERASI PENDORONG',
      stageSub: 'Penskalaan Full-Stack (2022 - 2023)',
      company: 'GLOBY.ID & SyababStudio',
      role: 'Frontend Web & Fullstack Developer',
      period: 'Nov 2022 - Mar 2023',
      description: 'Mengembangkan sistem tiket transaksional monolitik, integrasi gerbang pembayaran, dan dasbor acara konkurensi tinggi dengan Laravel dan Vue.',
      milestone: 'Menguasai optimasi basis data trafik tinggi & integritas transaksional.',
    },
    {
      stage: 'TAHAP 3: INSERSI ORBIT & AI',
      stageSub: 'Arsitektur Enterprise & Inovasi (2023 - Sekarang)',
      company: 'Datasea',
      role: 'Frontend Developer / Fullstack Developer',
      period: 'Juli 2023 - Sekarang (3+ Tahun)',
      description: 'Memimpin arsitektur frontend platform E-Procurement enterprise. Mengarsiteki Micro Frontend Vue.js untuk BUMA, alur kerja fullstack TMS KraftHeinz, serta menetapkan standar AI & Model Context Protocol (MCP).',
      milestone: 'Menggerakkan arsitektur enterprise, micro-frontend, dan integrasi AI LLM.',
    },
  ],

  ja: [
    {
      stage: '第1段: 点火 & 初期上昇',
      stageSub: 'キャリア初期・基盤形成 (2021 - 2022)',
      company: 'SIDIGS & フリーランス',
      role: 'フロントエンド & モバイルエンジニア',
      period: '2021年7月 - 2023年5月',
      description: 'Flutterによるクロスプラットフォーム開発とVue.jsからNuxt.jsへのモダンWeb移行からキャリアを開始。教育機関向けシステムおよび学習ポータルを構築。',
      milestone: 'モバイル開発およびリアクティブWeb技術の強固な基盤を確立。',
    },
    {
      stage: '第2段: ブースター加速推進',
      stageSub: 'フルスタックスケーリング (2022 - 2023)',
      company: 'GLOBY.ID & SyababStudio',
      role: 'Webフロントエンド & フルスタックエンジニア',
      period: '2022年11月 - 2023年3月',
      description: 'LaravelとVueを用いたトランザクション決済チケッティング基盤、決済ゲートウェイ連携、高並行イベントダッシュボードを開発。',
      milestone: '高トラフィック下におけるデータベース最適化とトランザクション整合性を習得。',
    },
    {
      stage: '第3段: 軌道投入 & AI統合',
      stageSub: 'エンタープライズアーキテクチャ & AI革新 (2023 - 現在)',
      company: 'Datasea',
      role: 'フロントエンド / フルスタックエンジニア',
      period: '2023年7月 - 現在 (3年以上)',
      description: 'エンタープライズ電子調達基盤のフロントエンド設計を統括。大手鉱業BUMA向けVue.jsマイクロフロントエンド設計、KraftHeinz TMS物流連携、および企業内AI・Model Context Protocol (MCP)標準を牽引。',
      milestone: 'エンタープライズ設計、マイクロフロントエンド、生成AI統合を強力に主導。',
    },
  ],
};

/**
 * Education data localization
 */
export const localizedEducation = {
  en: [
    {
      institution: 'BINUS University Online Learning',
      degree: 'Bachelor of Computer Science (Teknik Informatika)',
      period: 'May 2023 - June 2027 (Expected)',
      details: 'Focusing on Software Architecture, Distributed Systems, and Advanced Algorithms.',
    },
    {
      institution: 'SMK Telkom Malang',
      degree: 'Software Engineering (Rekayasa Perangkat Lokasional)',
      period: 'July 2019 - July 2022',
      details: 'Foundational training in web, mobile, database systems, and software engineering discipline.',
    },
  ],
  id: [
    {
      institution: 'BINUS University Online Learning',
      degree: 'Sarjana Komputer (Teknik Informatika)',
      period: 'Mei 2023 - Juni 2027 (Perkiraan Lulus)',
      details: 'Fokus pada Arsitektur Perangkat Lunak, Sistem Terdistribusi, dan Algoritma Lanjutan.',
    },
    {
      institution: 'SMK Telkom Malang',
      degree: 'Rekayasa Perangkat Lunak (RPL)',
      period: 'Juli 2019 - Juli 2022',
      details: 'Pendidikan vokasi intensif dalam web, mobile, sistem basis data, dan disiplin rekayasa perangkat lunak.',
    },
  ],
  ja: [
    {
      institution: 'BINUS大学 オンラインラーニング',
      degree: '情報科学学士 (コンピュータサイエンス専攻)',
      period: '2023年5月 - 2027年6月 (卒業予定)',
      details: 'ソフトウェアアーキテクチャ、分散システム、高度なアルゴリズムを中心に専攻。',
    },
    {
      institution: 'SMK テルコム・マラン (情報技術高等専攻学校)',
      degree: 'ソフトウェア工学科 (Software Engineering)',
      period: '2019年7月 - 2022年7月',
      details: 'Web・モバイル開発、データベース設計、ソフトウェアエンジニアリング規律の専門技術教育を修了。',
    },
  ],
};

// Language change subscribers
const subscribers = new Set();

/**
 * Get currently selected language (default: 'en')
 */
export function getCurrentLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && (saved === 'en' || saved === 'id' || saved === 'ja')) {
    return saved;
  }
  return DEFAULT_LANG;
}

/**
 * Set active language
 */
export function setLang(lang) {
  if (lang !== 'en' && lang !== 'id' && lang !== 'ja') {
    lang = DEFAULT_LANG;
  }

  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;

  // Update dynamic page meta title & description
  const t = translations[lang] || translations.en;
  if (t?.meta?.title) {
    document.title = t.meta.title;
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t?.meta?.description) {
    metaDesc.setAttribute('content', t.meta.description);
  }

  // Notify listeners
  subscribers.forEach(cb => {
    try {
      cb(lang);
    } catch (err) {
      console.error('Error in i18n subscriber:', err);
    }
  });

  return lang;
}

/**
 * Subscribe to language changes
 */
export function onLanguageChange(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Get translation dictionary for a given language or current active language
 */
export function getI18n(lang = null) {
  const current = lang || getCurrentLang();
  return translations[current] || translations.en;
}

/**
 * Get localized project items
 */
export function getLocalizedProjects(lang = null) {
  const current = lang || getCurrentLang();
  return localizedProjects[current] || localizedProjects.en;
}

/**
 * Get localized timeline items
 */
export function getLocalizedTimeline(lang = null) {
  const current = lang || getCurrentLang();
  return localizedTimeline[current] || localizedTimeline.en;
}

/**
 * Get localized education items
 */
export function getLocalizedEducation(lang = null) {
  const current = lang || getCurrentLang();
  return localizedEducation[current] || localizedEducation.en;
}

