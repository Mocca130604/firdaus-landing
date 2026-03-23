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
    <div class="mb-8 max-w-3xl">
      <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Planet Three</p>
      <h2 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Space Station Timeline</h2>
      <p class="mt-4 text-base leading-8 text-white/70">
        A professional product timeline that highlights the systems I helped build, the engineering responsibilities I owned, and the technical decisions behind each role.
      </p>
    </div>

    <ExperienceTimeline :items="experiences" />
  </section>
</template>
