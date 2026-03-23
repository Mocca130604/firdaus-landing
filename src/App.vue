<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-vue-next'
import GalaxyBackground from './components/GalaxyBackground.vue'
import RocketLoader from './components/RocketLoader.vue'
import ScrollRadar from './components/ScrollRadar.vue'
import AboutSection from './sections/AboutSection.vue'
import ContactSection from './sections/ContactSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import HeroSection from './sections/HeroSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import SkillsSection from './sections/SkillsSection.vue'

const isReady = ref(false)
const mouse = ref({ x: 0, y: 0 })
const intro = 'Frontend Developer with 3+ years of experience specializing in Vue.js and Nuxt.js, building scalable web applications and modular frontend architectures. Experienced in developing responsive interfaces, microfrontend systems, and performance-focused applications using modern JavaScript, Tailwind CSS, and Laravel APIs.'

const aboutStats = [
  { label: 'Experience', value: '3+ Years' },
  { label: 'Primary Stack', value: 'Vue Ecosystem' },
  { label: 'Location', value: 'Malang, Indonesia' },
]

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      {
        name: 'Vue.js',
        level: 'Advanced',
        category: 'Frontend Framework',
        experience: '3+ years',
        color: 'from-emerald-400 to-green-600',
        orbit: 150,
        speed: '18s',
        size: 88,
        angle: 318,
        description: 'Framework utama untuk membangun SPA dan dashboard modular dengan component architecture yang rapi.',
        detail: 'Sering digunakan untuk membangun aplikasi bisnis yang scalable, reusable, dan mudah dirawat dalam jangka panjang.',
      },
      {
        name: 'Nuxt.js',
        level: 'Advanced',
        category: 'Meta Framework',
        experience: '2+ years',
        color: 'from-lime-300 to-emerald-500',
        orbit: 220,
        speed: '22s',
        size: 78,
        angle: 148,
        description: 'Digunakan untuk kebutuhan SSR, routing yang terstruktur, dan page architecture yang cepat dikembangkan.',
        detail: 'Cocok untuk landing page, portal, dan platform content-driven yang butuh performa serta struktur aplikasi yang solid.',
      },
      {
        name: 'Tailwind CSS',
        level: 'Advanced',
        category: 'CSS Framework',
        experience: '3+ years',
        color: 'from-cyan-300 to-sky-500',
        orbit: 290,
        speed: '26s',
        size: 96,
        angle: 160,
        description: 'Utility-first CSS untuk membangun UI modern yang konsisten, cepat, dan sangat fleksibel.',
        detail: 'Membantu mempercepat proses design-to-code dan menjaga konsistensi visual pada project dengan banyak komponen.',
      },
      {
        name: 'Bootstrap',
        level: 'Advanced',
        category: 'UI Framework',
        experience: '3 years',
        color: 'from-indigo-400 to-violet-600',
        orbit: 360,
        speed: '29s',
        size: 84,
        angle: 302,
        description: 'Framework UI yang efektif untuk dashboard cepat, layout stabil, dan implementasi komponen umum.',
        detail: 'Sering dipakai saat butuh delivery cepat pada sistem internal atau project dengan requirement UI yang familiar.',
      },
      {
        name: 'Vuetify',
        level: 'Intermediate',
        category: 'Vue UI Library',
        experience: '2 years',
        color: 'from-blue-300 to-indigo-600',
        orbit: 430,
        speed: '33s',
        size: 72,
        angle: 28,
        description: 'Library komponen berbasis Material Design untuk ekosistem Vue yang kompleks dan data-heavy.',
        detail: 'Membantu mempercepat pengembangan form, tabel, dan dashboard saat project membutuhkan komponen siap pakai.',
      },
      {
        name: 'SCSS',
        level: 'Advanced',
        category: 'Styling Language',
        experience: '3 years',
        color: 'from-pink-300 to-rose-500',
        orbit: 500,
        speed: '37s',
        size: 68,
        angle: 218,
        description: 'Dipakai ketika styling membutuhkan struktur yang lebih kompleks, nesting, variables, dan mixins.',
        detail: 'Sangat membantu untuk maintain style system pada project besar yang masih menggunakan pendekatan custom stylesheet.',
      },
    ],
  },
  {
    title: 'Backend',
    skills: [
      {
        name: 'Laravel',
        level: 'Intermediate',
        category: 'Backend Framework',
        experience: '2+ years',
        color: 'from-red-400 to-rose-600',
        orbit: 180,
        speed: '19s',
        size: 82,
        angle: 300,
        description: 'Digunakan untuk integrasi API, pengelolaan data, dan workflow aplikasi berbasis web.',
        detail: 'Paling sering dipakai saat berkolaborasi dengan backend atau saat project membutuhkan fullstack flow yang efisien.',
      },
      {
        name: 'MySQL',
        level: 'Intermediate',
        category: 'Database',
        experience: '2 years',
        color: 'from-amber-300 to-orange-500',
        orbit: 260,
        speed: '24s',
        size: 74,
        angle: 108,
        description: 'Mendukung pemahaman struktur data, relasi antar tabel, dan kebutuhan query untuk integrasi frontend.',
        detail: 'Digunakan terutama untuk memahami data flow aplikasi dan memastikan tampilan frontend sesuai dengan model data.',
      },
    ],
  },
  {
    title: 'Languages',
    skills: [
      {
        name: 'JavaScript',
        level: 'Advanced',
        category: 'Programming Language',
        experience: '3+ years',
        color: 'from-yellow-300 to-amber-500',
        orbit: 160,
        speed: '17s',
        size: 82,
        angle: 22,
        description: 'Bahasa inti untuk membangun interaksi, logic komponen, dan pengalaman frontend yang dinamis.',
        detail: 'Dipakai sehari-hari untuk state management, DOM interaction, data transformation, dan optimasi perilaku UI.',
      },
      {
        name: 'HTML',
        level: 'Advanced',
        category: 'Markup Language',
        experience: '3+ years',
        color: 'from-orange-300 to-red-500',
        orbit: 230,
        speed: '21s',
        size: 70,
        angle: 142,
        description: 'Fondasi struktur interface yang semantic, accessible, dan mudah dikembangkan.',
        detail: 'Digunakan untuk membentuk layout yang rapi sekaligus mendukung SEO, accessibility, dan maintainability.',
      },
      {
        name: 'CSS',
        level: 'Advanced',
        category: 'Styling Language',
        experience: '3+ years',
        color: 'from-sky-300 to-blue-600',
        orbit: 300,
        speed: '25s',
        size: 76,
        angle: 208,
        description: 'Mengatur visual hierarchy, responsive layout, animation ringan, dan micro interaction pada UI.',
        detail: 'Menjadi dasar untuk membuat tampilan profesional yang tetap ringan dan nyaman di berbagai ukuran layar.',
      },
      {
        name: 'PHP',
        level: 'Intermediate',
        category: 'Programming Language',
        experience: '2 years',
        color: 'from-fuchsia-300 to-purple-600',
        orbit: 370,
        speed: '31s',
        size: 72,
        angle: 336,
        description: 'Dipakai untuk kebutuhan integrasi backend, logic server-side sederhana, dan dukungan fullstack workflow.',
        detail: 'Membantu saat perlu membaca flow backend, memahami API source, atau menghubungkan frontend dengan logic aplikasi.',
      },
    ],
  },
  {
    title: 'Tools',
    skills: [
      {
        name: 'Git',
        level: 'Advanced',
        category: 'Version Control',
        experience: '3+ years',
        color: 'from-slate-300 to-slate-500',
        orbit: 180,
        speed: '20s',
        size: 74,
        angle: 192,
        description: 'Tool utama untuk versioning, kolaborasi branch, dan workflow pengembangan tim.',
        detail: 'Dipakai untuk menjaga ritme kolaborasi tetap aman dan terstruktur saat mengerjakan fitur maupun bug fixing.',
      },
      {
        name: 'VS Code',
        level: 'Expert',
        category: 'Development Tool',
        experience: '3+ years',
        color: 'from-blue-300 to-cyan-500',
        orbit: 260,
        speed: '23s',
        size: 78,
        angle: 18,
        description: 'Editor utama untuk workflow frontend modern dengan extension ecosystem yang mendukung produktivitas.',
        detail: 'Menjadi command center untuk coding, debugging, refactor, dan menjaga konsistensi project setup sehari-hari.',
      },
    ],
  },
]

const experiences = [
  {
    company: 'Datasea',
    period: 'Jul 2023 - Present',
    role: 'Frontend Developer',
    detail: 'Leading and scaling enterprise frontend delivery across procurement, recruitment, transport, and mining-related products.',
    description: 'Owns frontend architecture and implementation for multiple enterprise web products, with a strong focus on modular Vue applications, micro frontend delivery, maintainable standards, and efficient Laravel-backed fullstack collaboration.',
    projects: [
      'E-Procurement Product',
      'E-Recruitment Platform',
      'Transport Management System (TMS)',
      'Mining Management Project',
      'E-Procurement Blueprint',
    ],
    responsibilities: [
      'Served as Frontend Lead for the E-Procurement product and aligned frontend delivery with business goals.',
      'Architected and implemented a micro frontend framework in Vue.js for the E-Recruitment platform.',
      'Built enterprise-grade solutions with Laravel for TMS and E-Procurement blueprint workflows.',
      'Developed high-performance interfaces for mining and procurement modules with responsive data-heavy UI.',
      'Standardized frontend best practices, project structure, and maintainability across multiple products.',
    ],
    techStack: ['Vue.js', 'Nuxt.js', 'JavaScript', 'Tailwind CSS', 'SCSS', 'Laravel', 'REST API', 'MySQL', 'Vite', 'Git'],
    achievements: [
      'Established reusable frontend patterns that improved modularity across products.',
      'Enabled independent team delivery through micro frontend architecture.',
      'Improved application maintainability and load performance through standardized frontend practices.',
    ],
    workflow: ['Git', 'Jira', 'Agile/Scrum', 'Docker', 'Figma'],
  },
  {
    company: 'Pekerja Lepas',
    period: 'Jul 2022 - May 2023',
    role: 'Frontend Web Developer',
    detail: 'Delivered an end-to-end online course platform with smooth browsing, checkout, enrollment, and learning flows.',
    description: 'Handled freelance frontend delivery for an online learning product, building responsive and performant course experiences while coordinating critical commerce and enrollment workflows with backend services.',
    projects: [
      'Online Course Platform',
      'Course Catalog and Lesson Modules',
      'Checkout and Enrollment Workflow',
    ],
    responsibilities: [
      'Developed a complete online course experience for browsing, purchasing, and accessing digital content.',
      'Built high-performance Vue.js interfaces with fast page load and smooth lesson navigation.',
      'Integrated complex checkout flows with backend systems for secure payment handling.',
      'Implemented responsive design across desktop, tablet, and mobile devices.',
      'Managed dynamic application state for carts, enrollments, and progress tracking.',
    ],
    techStack: ['Vue.js', 'JavaScript', 'CSS', 'REST API', 'Git'],
    achievements: [
      'Delivered a seamless course purchase-to-learning journey for end users.',
      'Improved usability and consistency across multi-device learning flows.',
    ],
    workflow: ['Git', 'Agile/Scrum', 'Figma'],
  },
  {
    company: 'SIDIGS',
    period: 'Jun 2022 - May 2023',
    role: 'Frontend Developer',
    detail: 'Revamped student-facing web experiences and maintained core teacher platforms for daily academic operations.',
    description: 'Contributed to the modernization of SIDIGS web products by improving UI/UX, maintaining platform stability, and building reusable Nuxt-based components for a more scalable internal web ecosystem.',
    projects: [
      'Student Web Platform',
      'Teacher Web Platform',
      'Reusable Web Component Initiative',
    ],
    responsibilities: [
      'Executed a comprehensive revamp of the Student Web Platform to improve UI/UX and navigation efficiency.',
      'Maintained and optimized the Teacher Web Platform to support reliable daily academic operations.',
      'Developed reusable components using Nuxt.js and CSS for better scalability and maintainability.',
      'Ensured cross-browser compatibility and mobile responsiveness across web portals.',
    ],
    techStack: ['Vue.js', 'Nuxt.js', 'JavaScript', 'SCSS', 'REST API', 'Git'],
    achievements: [
      'Improved usability for thousands of users through a more modern and navigable student platform.',
      'Raised maintainability across the internal web ecosystem with reusable frontend building blocks.',
    ],
    workflow: ['Git', 'Agile/Scrum', 'Figma'],
  },
  {
    company: 'SyababStudio',
    period: 'Dec 2022 - Mar 2023',
    role: 'Frontend Developer',
    detail: 'Built an e-learning platform centered on course discovery, checkout, enrollment, and content consumption.',
    description: 'Worked closely with stakeholders to deliver an engaging e-learning platform, focusing on dynamic browsing experiences, purchase flows, responsive behavior, and UI/UX polish across devices.',
    projects: [
      'E-Learning Platform',
      'Course Catalog and Filtering System',
      'Checkout and Enrollment Workflow',
    ],
    responsibilities: [
      'Developed a comprehensive e-learning platform for purchasing and consuming online courses.',
      'Built dynamic course catalog and filtering experiences using Vue.js.',
      'Integrated secure checkout and enrollment workflows for active learning journeys.',
      'Optimized responsiveness and performance across desktop and mobile devices.',
      'Collaborated with stakeholders to implement intuitive UI/UX improvements.',
    ],
    techStack: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Git'],
    achievements: [
      'Increased user engagement through intuitive e-learning interaction patterns.',
      'Delivered a consistent learning experience across devices and screen sizes.',
    ],
    workflow: ['Git', 'Agile/Scrum', 'Figma'],
  },
  {
    company: 'Globy.id',
    period: 'Nov 2022 - Jan 2023',
    role: 'Frontend Web Developer',
    detail: 'Built a ticketing platform with transactional workflows, organizer dashboards, and strong monolithic Laravel maintainability.',
    description: 'Contributed to an event ticketing platform by building frontend-web functionality inside a monolithic Laravel architecture, with attention to payment flow reliability, dashboard usability, and backend-to-frontend consistency.',
    projects: [
      'Event Ticketing Platform',
      'Organizer Management Dashboard',
      'Payment and E-Ticket Workflow',
    ],
    responsibilities: [
      'Developed the event ticketing platform within a monolithic Laravel architecture.',
      'Engineered transactional flows including secure payments and automatic e-ticket generation.',
      'Built dashboards for organizers to track ticket sales and attendee data in real time.',
      'Optimized database and query performance for traffic spikes during ticket releases.',
      'Managed application flow from server-side logic to frontend rendering consistency.',
    ],
    techStack: ['Laravel', 'JavaScript', 'Blade', 'MySQL', 'Git'],
    achievements: [
      'Improved platform reliability for payment and ticket issuance workflows.',
      'Supported high-traffic event release periods with better query efficiency.',
    ],
    workflow: ['Git', 'Agile/Scrum'],
  },
  {
    company: 'Pekerja Lepas',
    period: 'Jun 2022 - Nov 2022',
    role: 'Full-stack Developer',
    detail: 'Handled freelance full-stack delivery during an early project phase before focusing more deeply on frontend specialization.',
    description: 'Worked as a freelance full-stack developer on client project delivery, covering both interface implementation and backend-connected application needs during a compact engagement period.',
    projects: [
      'Custom Web Application Delivery',
      'Frontend and Backend Integration',
      'Client Feature Implementation',
    ],
    responsibilities: [
      'Implemented web features across frontend and backend-connected flows.',
      'Handled application changes based on client and product requirements.',
      'Supported delivery of responsive interfaces and functional business logic.',
    ],
    techStack: ['JavaScript', 'PHP', 'MySQL', 'HTML', 'CSS', 'Git'],
    achievements: [
      'Delivered full-stack support across a short freelance engagement.',
      'Built a practical foundation for later frontend-focused product work.',
    ],
    workflow: ['Git', 'Agile/Scrum'],
  },
  {
    company: 'SIDIGS',
    period: 'Jul 2021 - Jul 2022',
    role: 'Mobile Developer',
    detail: 'Built the SIDIGS Student mobile app from the ground up with education-focused flows and strong usability fundamentals.',
    description: 'Developed the student mobile application using Flutter, implementing key academic features and iterating with the product team to improve usability and overall mobile experience.',
    projects: [
      'SIDIGS Student Mobile Application',
      'Student Profile Module',
      'Course Schedule and Academic Tracking',
    ],
    responsibilities: [
      'Developed the SIDIGS Student mobile application from the ground up.',
      'Implemented student profile, course schedule, and academic tracking features using Flutter.',
      'Delivered responsive and user-friendly mobile flows for educational management.',
      'Collaborated with the product team to iterate on user feedback and improve usability.',
    ],
    techStack: ['Flutter', 'Dart', 'REST API', 'Git'],
    achievements: [
      'Established the first version of the student mobile experience for SIDIGS.',
      'Built a strong product and usability foundation that carried into later frontend work.',
    ],
    workflow: ['Git', 'Agile/Scrum', 'Figma'],
  },
]


const projects = [
  {
    title: 'E-Procurement Product',
    description: 'Enterprise procurement platform focused on frontend leadership, modular workflows, and smoother alignment between technical delivery and business goals.',
    stack: ['Vue.js', 'Laravel', 'MySQL'],
    live: '#projects',
    github: '#',
  },
  {
    title: 'E-Recruitment Platform',
    description: 'Recruitment platform built with a micro frontend approach to support modular development, cleaner ownership, and independent team delivery.',
    stack: ['Vue.js', 'Nuxt.js', 'Micro Frontend'],
    live: '#projects',
    github: '#',
  },
  {
    title: 'Transport Management System (TMS)',
    description: 'Operational transport management system with Laravel-backed workflows, structured data handling, and responsive dashboards for business operations.',
    stack: ['Vue.js', 'Laravel', 'REST API'],
    live: '#projects',
    github: '#',
  },
  {
    title: 'Online Course Platform',
    description: 'End-to-end learning commerce platform covering course discovery, checkout, enrollment, and content access with a responsive user journey.',
    stack: ['Vue.js', 'JavaScript', 'REST API'],
    live: '#projects',
    github: '#',
  },
  {
    title: 'Event Ticketing Platform',
    description: 'Ticketing product with secure payment flow, e-ticket generation, and organizer dashboards built within a maintainable Laravel monolith.',
    stack: ['Laravel', 'Blade', 'MySQL'],
    live: '#projects',
    github: '#',
  },
  {
    title: 'SIDIGS Student Mobile Application',
    description: 'Education mobile app developed from the ground up for student profiles, schedules, and academic tracking with strong usability focus.',
    stack: ['Flutter', 'Dart', 'REST API'],
    live: '#projects',
    github: '#',
  },
]

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Mail, label: 'Email', value: 'firdausmochamad13@gmail.com', href: 'mailto:firdausmochamad13@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+62 895395200351', href: 'tel:+62895395200351' },
  { icon: MapPin, label: 'Location', value: 'Malang, Indonesia', href: '#contact' },
  { icon: Github, label: 'GitHub', value: 'Portfolio Ready', href: 'https://github.com/Mocca130604' },
  { icon: Linkedin, label: 'Linkedin', value: 'More Information', href: 'https://www.linkedin.com/in/firdaus-mochamad-a7809a205/' }
]

const parallaxStyle = computed(() => ({
  transform: `translate3d(${mouse.value.x * 14}px, ${mouse.value.y * 14}px, 0)`,
}))

const onMouseMove = (event) => {
  const { innerWidth, innerHeight } = window
  mouse.value = {
    x: (event.clientX / innerWidth - 0.5) * 1.2,
    y: (event.clientY / innerHeight - 0.5) * 1.2,
  }
}

const handleLoaded = () => {
  isReady.value = true
  requestAnimationFrame(() => {
    gsap.fromTo(
      '.journey-section',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out' },
    )
  })
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden bg-space-950 text-glow-text">
    <GalaxyBackground />
    <RocketLoader v-if="!isReady" @complete="handleLoaded" />
    <ScrollRadar v-else />

    <div class="pointer-events-none fixed inset-0 -z-10 bg-nebula-soft opacity-90 transition-transform duration-300"
      :style="parallaxStyle" />

    <div v-if="isReady" class="relative z-10">
      <header class="sticky top-0 z-30 border-b border-white/5 bg-space-950/50 backdrop-blur-xl">
        <div class="mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
          <a href="#hero" class="font-display text-lg font-bold tracking-[0.22em] text-white">
            FIRDAUS MOCHAMAD
          </a>
          <nav class="hidden items-center gap-6 md:flex">
            <a v-for="item in navItems" :key="item.label" :href="item.href"
              class="text-sm text-white/70 transition hover:text-glow-cyan">
              {{ item.label }}
            </a>
          </nav>
        </div>
      </header>

      <main class="mx-auto flex flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:px-10">
        <HeroSection id="hero" class="journey-section" name="Firdaus Mochamad" role="Frontend Developer" :intro="intro" />

        <AboutSection id="about" class="journey-section" :stats="aboutStats" />

        <SkillsSection id="skills" class="journey-section" :skill-groups="skillGroups" />

        <ExperienceSection id="experience" class="journey-section" :experiences="experiences" />

        <ProjectsSection id="projects" class="journey-section" :projects="projects" />

        <ContactSection id="contact" class="journey-section" name="Firdaus Mochamad" :social-links="socialLinks" />
      </main>
    </div>
  </div>
</template>

