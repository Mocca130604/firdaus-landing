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
  <section class="py-12 px-gutter max-w-container-max mx-auto" id="experience">
    <div class="mb-10 max-w-3xl">
      <h2 class="font-display text-headline-lg mb-stack-md border-l-4 border-primary pl-6">CHRONICLES</h2>
      <p class="font-body-lg text-on-surface-variant leading-relaxed">
        A professional product timeline that highlights the systems I helped build, the engineering responsibilities I owned, and the technical decisions behind each role.
      </p>
    </div>

    <ExperienceTimeline :items="experiences" />
  </section>
</template>
