<script setup>
defineProps({
  stats: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="py-12 px-gutter max-w-container-max mx-auto" id="about">
    <div class="mb-10 max-w-3xl">
      <h2 class="font-display text-headline-lg mb-stack-md border-l-4 border-primary pl-6">ABOUT THE MISSION</h2>
      <p class="font-body-lg text-on-surface-variant leading-relaxed">
        I build modern frontend experiences that feel fast, intuitive, and reliable. My work centers on the Vue.js ecosystem, modular architecture, and responsive interfaces that help products scale without losing polish.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="glass-panel rounded-3xl p-8 flex flex-col justify-between border border-primary/20">
        <p class="font-body-md text-on-surface-variant leading-relaxed mb-8">
          Over the last 3+ years, I’ve focused on translating product goals into maintainable frontend systems. I care deeply about clean components, smooth user journeys, and performance details that make an application feel premium. My strongest experience is with Vue, Nuxt, Tailwind CSS, and scalable UI architecture, while also collaborating comfortably across API-driven products and business platforms.
        </p>
        <div class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="glass-panel p-5 rounded-2xl border border-secondary-fixed-dim/20"
          >
            <p class="font-label-caps text-secondary-fixed-dim uppercase mb-2">{{ stat.label }}</p>
            <p class="font-display text-headline-md text-xl font-bold text-white">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <div class="grid gap-4">
        <div class="glass-panel rounded-2xl p-6 border border-primary/20 hover:scale-[1.02] transition-all">
          <p class="font-label-caps text-secondary-fixed-dim uppercase mb-2">Focus</p>
          <h3 class="font-headline-md text-lg text-white">Scalable component systems</h3>
        </div>
        <div class="glass-panel rounded-2xl p-6 border border-primary/20 hover:scale-[1.02] transition-all">
          <p class="font-label-caps text-secondary-fixed-dim uppercase mb-2">Approach</p>
          <h3 class="font-headline-md text-lg text-white">Responsive, performance-first interfaces</h3>
        </div>
        <div class="glass-panel rounded-2xl p-6 border border-primary/20 hover:scale-[1.02] transition-all">
          <p class="font-label-caps text-secondary-fixed-dim uppercase mb-2">Strength</p>
          <h3 class="font-headline-md text-lg text-white">Vue architecture with polished interaction design</h3>
        </div>
      </div>
    </div>
  </section>
</template>

