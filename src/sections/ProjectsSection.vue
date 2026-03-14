<script setup>
import ProjectCard from '../components/ProjectCard.vue'

defineProps({
  projects: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section-frame px-6 py-12 sm:px-8 lg:px-12">
    <div class="mb-8 max-w-2xl">
      <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Planet Four</p>
      <h2 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Space Missions</h2>
      <p class="mt-4 text-base leading-8 text-white/70">
        Selected product missions focused on user clarity, scalable frontend structure, and professional visual execution.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <ProjectCard
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </div>
  </section>
</template>
