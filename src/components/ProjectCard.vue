<script setup>
import { ArrowUpRight, Github } from 'lucide-vue-next'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="group section-frame flex h-full flex-col rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-2 hover:border-glow-cyan/20">
    <div class="mb-5 flex items-center justify-between">
      <span class="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-glow-cyan/80">
        Mission
      </span>
      <div class="h-12 w-12 rounded-full bg-gradient-to-br from-glow-primary/30 to-glow-cyan/20 blur-xl transition duration-300 group-hover:scale-125" />
    </div>
    <h3 class="font-display text-2xl font-semibold text-white">{{ project.title }}</h3>
    <p class="mt-4 flex-1 text-sm leading-7 text-white/70">{{ project.description }}</p>
    <div class="mt-5 flex flex-wrap gap-2">
      <span
        v-for="tag in project.stack"
        :key="tag"
        class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
      >
        {{ tag }}
      </span>
    </div>
    <div class="mt-6 flex items-center gap-3">
      <a
        :href="project.live"
        class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-glow-primary to-glow-cyan px-4 py-2 text-sm font-medium text-space-950 transition hover:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
      >
        <ArrowUpRight class="h-4 w-4" />
        Live Demo
      </a>
      <a
        :href="project.github"
        class="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-glow-cyan/30 hover:text-white"
      >
        <Github class="h-4 w-4" />
        GitHub
      </a>
    </div>
  </article>
</template>
