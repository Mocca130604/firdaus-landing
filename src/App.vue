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
  { company: 'Datasea', period: '2023 - Present', role: 'Frontend Developer', detail: 'Building scalable internal products with modular Vue architecture and polished UI systems.' },
  { company: 'Globy.id', period: '2022 - 2023', role: 'Frontend Developer', detail: 'Delivered responsive interfaces and product improvements with a strong focus on usability and maintainability.' },
  { company: 'SIDIGS', period: '2022 - 2023', role: 'Frontend Developer', detail: 'Contributed to web application features, performance tuning, and reusable frontend patterns.' },
  { company: 'Syabab Studio', period: 'Freelance', role: 'Frontend Developer', detail: 'Partnered on client-facing websites and dashboards with custom interactions and responsive layouts.' },
  { company: 'Freelance Developer', period: 'Independent', role: 'Web Developer', detail: 'Handled end-to-end development for business websites and application interfaces.' },
  { company: 'Flutter Developer', period: 'Earlier Role', role: 'Mobile Developer', detail: 'Built cross-platform mobile experiences and carried that product mindset into frontend web work.' },
]

const projects = [
  { title: 'Transportation Management System', description: 'Operations dashboard for tracking logistics, scheduling, and fleet coordination with a clean data-rich UI.', stack: ['Vue 3', 'Tailwind CSS', 'GSAP'], live: '#projects', github: '#' },
  { title: 'E-Procurement Platform', description: 'Procurement workflow platform designed for vendor management, approvals, and transparent purchasing pipelines.', stack: ['Vue', 'Laravel', 'MySQL'], live: '#projects', github: '#' },
  { title: 'E-Learning Platform', description: 'Learning portal with responsive course flows, user-friendly navigation, and scalable frontend modules.', stack: ['Nuxt', 'Tailwind CSS', 'API Integration'], live: '#projects', github: '#' },
  { title: 'E-Class Platform', description: 'Modern classroom experience for assignments, student tracking, and content delivery across devices.', stack: ['Vue', 'SCSS', 'JavaScript'], live: '#projects', github: '#' },
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
        <HeroSection id="hero" class="journey-section" name="Firdaus Mochamad" role="Frontend Developer"
          intro="Frontend Developer with 3+ years of experience building scalable and user-friendly web applications, specializing in the Vue.js ecosystem and performance-focused interfaces."
          :social-links="socialLinks" />

        <AboutSection id="about" class="journey-section" :stats="aboutStats" />

        <SkillsSection id="skills" class="journey-section" :skill-groups="skillGroups" />

        <ExperienceSection id="experience" class="journey-section" :experiences="experiences" />

        <ProjectsSection id="projects" class="journey-section" :projects="projects" />

        <ContactSection id="contact" class="journey-section" name="Firdaus Mochamad" email="firdausmochamad13@gmail.com"
          phone="+62 895395200351" location="Malang, Indonesia" />
      </main>
    </div>
  </div>
</template>
