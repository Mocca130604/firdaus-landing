<script setup>
import { ArrowRight, ChevronDown } from 'lucide-vue-next'

defineProps({
  name: String,
  role: String,
  intro: String,
})
</script>

<template>
  <section class="section-frame min-h-[calc(100vh-8rem)] rounded-[2rem] px-6 py-10 sm:px-8 lg:px-12">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,157,255,0.22),transparent_30%),radial-gradient(circle_at_70%_30%,rgba(0,229,255,0.12),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(155,140,255,0.16),transparent_28%)]" />
    <div class="relative grid min-h-[78vh] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Galaxy Journey</p>
        <h1 class="mt-5 max-w-3xl font-display text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          {{ name }}
        </h1>
        <p class="mt-4 text-xl text-glow-primary sm:text-2xl">{{ role }}</p>
        <p class="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
          {{ intro }}
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#projects"
            class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-glow-primary to-glow-cyan px-6 py-3 text-sm font-semibold text-space-950 transition hover:shadow-[0_0_28px_rgba(0,229,255,0.4)]">
            View Projects
            <ArrowRight class="h-4 w-4" />
          </a>
          <a href="#contact"
            class="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/80 transition hover:border-glow-cyan/30 hover:text-white">
            Contact Me
          </a>
        </div>
      </div>

      <div class="relative flex justify-center">
        <div
          class="absolute inset-8 rounded-full bg-gradient-to-br from-glow-primary/20 via-transparent to-glow-cyan/20 blur-3xl" />
        <div
          class="relative flex h-[440px] w-[320px] animate-drift items-center justify-center rounded-[45%] border border-white/10 bg-white/5 shadow-panel backdrop-blur-md">
          <div class="absolute inset-6 rounded-[44%] border border-white/10" />
          <div
            class="absolute top-12 h-24 w-24 rounded-full bg-gradient-to-br from-glow-secondary/70 to-glow-primary/20 blur-2xl" />
          <div class="relative flex flex-col items-center">
            <div class="relative h-28 w-28 rounded-full bg-gradient-to-b from-white via-slate-200 to-slate-500">
              <div class="absolute inset-x-3 top-5 h-10 rounded-full bg-space-950/90" />
              <div
                class="absolute left-1/2 top-12 h-14 w-16 -translate-x-1/2 rounded-[45%] bg-gradient-to-b from-white/90 to-slate-300" />
            </div>
            <div class="mt-3 h-32 w-24 rounded-[40%] bg-gradient-to-b from-slate-200 to-slate-400" />
            <div class="absolute left-1/2 top-40 h-40 w-40 -translate-x-1/2 rounded-full border border-glow-cyan/15" />
          </div>
          <div class="absolute bottom-8 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/50">
            Scroll to Explore
            <ChevronDown class="h-4 w-4 text-glow-cyan" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
