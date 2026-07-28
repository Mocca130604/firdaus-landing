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
  <article class="group glass-panel flex h-full flex-col rounded-2xl p-8 border border-primary/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-secondary-fixed-dim/40">
    <div class="mb-5 flex items-center justify-between">
      <span class="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
        Mission
      </span>
      <div class="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary-fixed-dim/20 blur-xl transition duration-300 group-hover:scale-125" />
    </div>
    <h3 class="font-display text-2xl font-bold text-white group-hover:text-glow transition-colors">{{ project.title }}</h3>
    <p class="mt-4 flex-1 text-sm leading-7 text-white/70">{{ project.description }}</p>
    <div class="mt-5 flex flex-wrap gap-2">
      <span
        v-for="tag in project.stack"
        :key="tag"
        class="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary font-bold uppercase"
      >
        {{ tag }}
      </span>
    </div>
    <div class="mt-6 flex items-center gap-3">
      <a
        :href="project.live"
        class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary-fixed-dim px-5 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-primary/20 transition hover:shadow-primary/30"
      >
        <ArrowUpRight class="h-4 w-4" />
        Live Demo
      </a>
      <a
        :href="project.github"
        class="inline-flex items-center gap-2 rounded-lg border border-secondary-fixed-dim text-secondary-fixed-dim px-5 py-2.5 text-sm font-bold transition hover:bg-secondary-fixed-dim/10"
      >
        <Github class="h-4 w-4" />
        GitHub
      </a>
    </div>
  </article>
</template>
