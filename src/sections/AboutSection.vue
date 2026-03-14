<script setup>
defineProps({
  stats: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section-frame px-6 py-12 sm:px-8 lg:px-12">
    <div class="mb-8 max-w-2xl">
      <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Planet One</p>
      <h2 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">About This Mission</h2>
      <p class="mt-4 text-base leading-8 text-white/70">
        I build modern frontend experiences that feel fast, intuitive, and reliable. My work centers on the Vue.js ecosystem, modular architecture, and responsive interfaces that help products scale without losing polish.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div class="glass-panel rounded-[2rem] p-6">
        <p class="text-sm leading-8 text-white/75">
          Over the last 3+ years, I’ve focused on translating product goals into maintainable frontend systems. I care deeply about clean components, smooth user journeys, and performance details that make an application feel premium. My strongest experience is with Vue, Nuxt, Tailwind CSS, and scalable UI architecture, while also collaborating comfortably across API-driven products and business platforms.
        </p>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-3xl border border-white/10 bg-white/5 p-4"
          >
            <p class="text-xs uppercase tracking-[0.32em] text-white/45">{{ stat.label }}</p>
            <p class="mt-3 font-display text-xl font-semibold text-white">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <div class="grid gap-4">
        <div class="glass-panel animate-drift rounded-[1.75rem] p-5 [animation-delay:0.4s]">
          <p class="text-xs uppercase tracking-[0.32em] text-glow-cyan/70">Focus</p>
          <h3 class="mt-3 font-display text-2xl text-white">Scalable component systems</h3>
        </div>
        <div class="glass-panel animate-drift rounded-[1.75rem] p-5 [animation-delay:1.1s]">
          <p class="text-xs uppercase tracking-[0.32em] text-glow-cyan/70">Approach</p>
          <h3 class="mt-3 font-display text-2xl text-white">Responsive, performance-first interfaces</h3>
        </div>
        <div class="glass-panel animate-drift rounded-[1.75rem] p-5 [animation-delay:1.8s]">
          <p class="text-xs uppercase tracking-[0.32em] text-glow-cyan/70">Strength</p>
          <h3 class="mt-3 font-display text-2xl text-white">Vue architecture with polished interaction design</h3>
        </div>
      </div>
    </div>
  </section>
</template>
