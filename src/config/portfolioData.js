/**
 * Firdaus Mochamad - Portfolio Data
 * "The Journey: Japan to the Moon"
 */

export const portfolioData = {
  personal: {
    name: "Firdaus Mochamad",
    japaneseName: "フィルダウス・モチャマド",
    title: "Frontend & Full-Stack Developer",
    subtitle: "Enterprise Web Applications • Micro Frontends • Modern UI/UX",
    location: "Yokohama, Kanagawa, Japan",
    email: "medioid13@gmail.com",
    phone: "+62 8988130604",
    whatsapp: "https://wa.me/628988130604",
    linkedin: "https://www.linkedin.com/in/firdaus-mochamad-a7809a205",
    github: "https://github.com/mocca130604",
    website: "https://firdauscode.space",
    summary:
      "Detail-oriented Frontend and Full-Stack Developer with 4+ years of experience engineering scalable, interactive enterprise web applications. Proven track record of leading the frontend lifecycle for E-Procurement platforms, architecting Vue.js Micro Frontend ecosystems for enterprise E-Recruitment, and designing robust full-stack solutions with Laravel, Nuxt.js, and Model Context Protocol (MCP) integrations.",
    tagline: "Building resilient enterprise architectures and cinematic digital experiences.",
    quote: "「一歩一歩、月へ」 — Step by step, to the Moon."
  },

  missionStats: {
    experienceYears: "4+",
    projectsDelivered: "15+",
    enterpriseClients: "5+",
    codeQuality: "100%"
  },

  skills: {
    frontend: [
      { name: "Vue.js", level: "Expert", icon: "vue" },
      { name: "Nuxt.js", level: "Expert", icon: "nuxt" },
      { name: "React.js", level: "Advanced", icon: "react" },
      { name: "JavaScript / ESNext", level: "Expert", icon: "js" },
      { name: "TypeScript", level: "Advanced", icon: "ts" },
      { name: "Tailwind CSS", level: "Expert", icon: "tailwind" },
      { name: "HTML5 / SCSS", level: "Expert", icon: "html" },
      { name: "Three.js & 3D Web", level: "Proficient", icon: "three" }
    ],
    backend: [
      { name: "Laravel", level: "Expert", icon: "laravel" },
      { name: "PHP", level: "Expert", icon: "php" },
      { name: "MySQL & Stored Procedures", level: "Advanced", icon: "mysql" },
      { name: "RESTful API Design", level: "Expert", icon: "api" },
      { name: "Database Optimization", level: "Advanced", icon: "db" }
    ],
    architectureAndAI: [
      { name: "Micro Frontend Architecture", level: "Architect", icon: "mfe" },
      { name: "Model Context Protocol (MCP)", level: "Pioneer", icon: "mcp" },
      { name: "Deterministic LLM Integration", level: "Advanced", icon: "ai" },
      { name: "Enterprise Design Systems", level: "Lead", icon: "ds" }
    ],
    mobileAndTools: [
      { name: "Flutter", level: "Intermediate", icon: "flutter" },
      { name: "Git & CI/CD", level: "Advanced", icon: "git" },
      { name: "Vite / Webpack", level: "Advanced", icon: "vite" },
      { name: "Docker", level: "Proficient", icon: "docker" }
    ]
  },

  projects: [
    {
      id: "tms-kraftheinz",
      missionCode: "MSN-01 // TMS",
      title: "Transportation Management System (TMS)",
      client: "KraftHeinz / Datasea",
      role: "Full-stack Developer",
      period: "2023 - 2024",
      category: "Enterprise Logistics",
      summary:
        "Engineered an enterprise-grade full-stack logistics and shipment management platform handling complex transportation workflows across multiple supply-chain hubs.",
      highlights: [
        "Architected scalable backend workflows using Laravel and Blade templates.",
        "Implemented high-performance Stored Procedures (SPs) and optimized database views to process massive freight dispatch data.",
        "Delivered intuitive real-time tracking dashboards for fleet operators and distribution managers."
      ],
      techStack: ["Laravel", "Blade", "MySQL", "Stored Procedures", "JavaScript", "Bootstrap"],
      links: {
        demo: "#",
        github: "https://github.com/mocca130604"
      }
    },
    {
      id: "recruitment-buma",
      missionCode: "MSN-02 // MFE",
      title: "E-Recruitment Micro Frontend Platform",
      client: "BUMA (Bukit Makmur) / Datasea",
      role: "Frontend Developer",
      period: "2023 - 2024",
      category: "Micro Frontend Architecture",
      summary:
        "Designed and deployed a modern Micro Frontend architecture utilizing Vue.js for high-volume enterprise applicant tracking and recruitment.",
      highlights: [
        "Decoupled legacy monolithic portal into autonomous micro-apps with independent CI/CD release cycles.",
        "Implemented shared state contracts and federated module communication with zero cross-app latency.",
        "Modernized candidate application flow, dramatically improving user engagement and funnel conversion."
      ],
      techStack: ["Vue.js", "Micro Frontends", "Tailwind CSS", "Pinia", "REST APIs", "Vite"],
      links: {
        demo: "#",
        github: "https://github.com/mocca130604"
      }
    },
    {
      id: "evoq-procurement",
      missionCode: "MSN-03 // MCP",
      title: "EVOQ E-Procurement & MCP Server",
      client: "Datasea Base Product",
      role: "Frontend Developer & AI Engineer",
      period: "2023 - Present",
      category: "Enterprise AI & Base Product",
      summary:
        "Spearheaded key frontend modules, engineered custom design systems, and built a Model Context Protocol (MCP) server to encode business and low-code rules for deterministic LLM execution.",
      highlights: [
        "Created a unified reusable enterprise Design System package across all procurement modules.",
        "Engineered low-code generation rules into an active Model Context Protocol (MCP) server.",
        "Optimized invoice tracking and supplier bidding modules for corporate clients including Aryanobel and 7Event."
      ],
      techStack: ["Nuxt.js", "Vue.js", "MCP (Model Context Protocol)", "TypeScript", "Tailwind CSS"],
      links: {
        demo: "#",
        github: "https://github.com/mocca130604"
      }
    },
    {
      id: "globy-ticketing",
      missionCode: "MSN-04 // TICKET",
      title: "GLOBY.ID Event Ticketing Platform",
      client: "GLOBY.ID",
      role: "Frontend Web / Fullstack Developer",
      period: "2022 - 2023",
      category: "High-Traffic E-Commerce",
      summary:
        "Developed a high-reliability event ticketing platform capable of handling immense traffic spikes during flash sales and concert ticket releases.",
      highlights: [
        "Engineered transactional payment processing with instantaneous QR automated e-ticket issuance.",
        "Constructed comprehensive organizer analytics dashboards for live revenue and attendee tracking.",
        "Tuned database queries and redis caching to withstand thousands of concurrent buyers."
      ],
      techStack: ["Laravel", "MySQL", "Midtrans Payment Gateway", "Blade", "SCSS", "JavaScript"],
      links: {
        demo: "#",
        github: "https://github.com/mocca130604"
      }
    },
    {
      id: "sidigs-suite",
      missionCode: "MSN-05 // EDU",
      title: "SIDIGS Academic Suite & Mobile App",
      client: "SIDIGS",
      role: "Frontend & Mobile Developer",
      period: "2021 - 2023",
      category: "EdTech & Mobile",
      summary:
        "Executed complete revamp of the Student Web Platform from Vue.js to Nuxt.js, modernizing UI/UX for thousands of students, while building native Flutter mobile apps.",
      highlights: [
        "Revamped student portal to Nuxt.js with SSR, boosting load speeds and user satisfaction.",
        "Built cross-platform Flutter applications for students and teachers with schedule and academic tracking.",
        "Constructed reusable web component libraries with custom CSS modules."
      ],
      techStack: ["Nuxt.js", "Vue.js", "Flutter", "Dart", "CSS3", "REST APIs"],
      links: {
        demo: "#",
        github: "https://github.com/mocca130604"
      }
    }
  ],

  timeline: [
    {
      stage: "STAGE 1: IGNITION & ASCENT",
      stageSub: "Ground Foundations (2021 - 2022)",
      company: "SIDIGS & Freelance",
      role: "Frontend Developer & Mobile Developer",
      period: "July 2021 - May 2023",
      description:
        "Ignited career in cross-platform mobile development (Flutter) and frontend modernization (Vue.js to Nuxt.js). Developed academic suites and freelance E-Learning portals.",
      milestone: "Built solid foundation in mobile and reactive web technologies."
    },
    {
      stage: "STAGE 2: BOOSTER ACCELERATION",
      stageSub: "Full-Stack Scaling (2022 - 2023)",
      company: "GLOBY.ID & SyababStudio",
      role: "Frontend Web & Fullstack Developer",
      period: "Nov 2022 - Mar 2023",
      description:
        "Engineered transactional ticketing monoliths, payment gateway integrations, and high-concurrency event dashboards with Laravel and Vue.",
      milestone: "Mastered high-traffic database optimization & transactional integrity."
    },
    {
      stage: "STAGE 3: ORBITAL INSERTION & AI",
      stageSub: "Enterprise Architecture & Innovation (2023 - Present)",
      company: "Datasea",
      role: "Frontend Developer / Fullstack Developer",
      period: "July 2023 - Present (3+ Years)",
      description:
        "Leading frontend architecture for enterprise E-Procurement platforms. Architecting Vue.js Micro Frontends for BUMA, engineering KraftHeinz TMS fullstack workflows, and establishing organization-wide AI & Model Context Protocol (MCP) standards.",
      milestone: "Driving enterprise architecture, micro-frontends, and AI LLM integrations."
    }
  ],

  education: [
    {
      institution: "BINUS University Online Learning",
      degree: "Bachelor of Computer Science (Teknik Informatika)",
      period: "May 2023 - June 2027 (Expected)",
      details: "Focusing on Software Architecture, Distributed Systems, and Advanced Algorithms."
    },
    {
      institution: "SMK Telkom Malang",
      degree: "Software Engineering (Rekayasa Perangkat Lunak)",
      period: "July 2019 - July 2022",
      details: "Foundational training in web, mobile, database systems, and software engineering discipline."
    }
  ]
};

