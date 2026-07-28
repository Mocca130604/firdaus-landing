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
  <section class="py-12 px-gutter max-w-container-max mx-auto" id="projects">
    <div class="mb-10 max-w-3xl ml-auto text-right">
      <h2 class="font-display text-headline-lg mb-stack-md border-r-4 border-secondary-fixed-dim pr-6 text-right">MISSION LOGS</h2>
      <p class="font-body-lg text-on-surface-variant leading-relaxed">
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
