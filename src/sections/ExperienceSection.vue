<script setup>
import ExperienceTimeline from '../components/ExperienceTimeline.vue'

defineProps({
  experiences: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section-frame px-6 py-12 sm:px-8 lg:px-12">
    <div class="mb-8 max-w-2xl">
      <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Planet Three</p>
      <h2 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Space Station Timeline</h2>
      <p class="mt-4 text-base leading-8 text-white/70">
        A career path shaped by product work, frontend architecture, and interface quality across internal tools, platforms, and freelance builds.
      </p>
    </div>

    <ExperienceTimeline :items="experiences" />
  </section>
</template>
