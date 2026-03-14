<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['complete'])

const progress = ref(0)
const loaderRef = ref(null)
const rocketRef = ref(null)
const smokeRef = ref([])

const setSmokeRef = (el) => {
  if (el) smokeRef.value.push(el)
}

onMounted(() => {
  smokeRef.value = []
  const tl = gsap.timeline({
    onComplete: () => emit('complete'),
  })

  tl.to(progress, {
    value: 100,
    duration: 2.2,
    ease: 'power2.inOut',
    onUpdate: () => {
      progress.value = Math.round(progress.value)
    },
  })
    .to(smokeRef.value, {
      y: -20,
      opacity: 0.7,
      scale: 1.6,
      stagger: 0.08,
      repeat: 3,
      yoyo: true,
      duration: 0.4,
    }, 0.2)
    .to(rocketRef.value, {
      y: -380,
      scale: 0.88,
      rotate: -4,
      duration: 1,
      ease: 'power4.in',
    })
    .to(loaderRef.value, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
    }, '-=0.25')
})
</script>

<template>
  <div
    ref="loaderRef"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(124,157,255,0.2),transparent_35%),#0B0F1A]"
  >
    <div class="relative flex flex-col items-center">
      <div class="absolute top-44 flex gap-3">
        <span
          v-for="index in 6"
          :key="index"
          :ref="setSmokeRef"
          class="h-8 w-8 rounded-full bg-white/10 blur-sm"
        />
      </div>

      <div ref="rocketRef" class="relative mb-8 flex flex-col items-center">
        <div class="h-24 w-12 rounded-t-full bg-gradient-to-b from-white to-slate-300 shadow-[0_0_45px_rgba(124,157,255,0.25)]" />
        <div class="absolute top-10 h-8 w-4 rounded-full bg-glow-cyan/60 blur-md" />
        <div class="absolute top-12 h-4 w-4 rounded-full bg-space-950" />
        <div class="absolute top-16 -left-4 h-10 w-5 rounded-bl-3xl bg-glow-primary" />
        <div class="absolute top-16 -right-4 h-10 w-5 rounded-br-3xl bg-glow-primary" />
        <div class="h-4 w-12 rounded-b-full bg-slate-300" />
        <div class="mt-1 h-12 w-5 rounded-b-full bg-gradient-to-b from-orange-300 via-orange-500 to-transparent blur-[1px]" />
      </div>

      <div class="glass-panel w-[290px] rounded-3xl p-5 text-center sm:w-[360px]">
        <p class="font-display text-sm uppercase tracking-[0.4em] text-glow-cyan/80">Launch Sequence</p>
        <h1 class="mt-3 font-display text-3xl font-bold text-white">Preparing Galaxy Journey</h1>
        <div class="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-gradient-to-r from-glow-primary via-glow-secondary to-glow-cyan transition-[width] duration-200"
            :style="{ width: `${progress}%` }"
          />
        </div>
        <p class="mt-3 text-sm text-white/70">{{ progress }}% systems online</p>
      </div>
    </div>
  </div>
</template>
