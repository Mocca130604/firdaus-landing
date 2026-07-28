<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  name: String,
  role: String,
  intro: String,
})

const tiltRef = ref(null)
let targetRotateY = 0
let targetRotateX = 0
let currentRotateY = 0
let currentRotateX = 0
let rafId = null

const handleMouseMove = (e) => {
  // Calculate target rotation degrees (max 15 deg)
  targetRotateY = ((window.innerWidth / 2 - e.clientX) / window.innerWidth) * 30 // -15 to 15
  targetRotateX = -((window.innerHeight / 2 - e.clientY) / window.innerHeight) * 30 // -15 to 15
}

const updateTilt = () => {
  if (tiltRef.value) {
    currentRotateY += (targetRotateY - currentRotateY) * 0.08
    currentRotateX += (targetRotateX - currentRotateX) * 0.08
    tiltRef.value.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`
  }
  rafId = requestAnimationFrame(updateTilt)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  rafId = requestAnimationFrame(updateTilt)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section class="min-h-[calc(100vh-10rem)] flex items-center pt-10 overflow-hidden px-gutter max-w-container-max mx-auto" id="home">
    <div class="grid lg:grid-cols-2 gap-stack-lg items-center relative z-10 w-full">
      <div>
        <h2 class="font-label-caps text-primary mb-4 tracking-[0.3em] uppercase">Available for missions</h2>
        <h1 class="font-display text-display mb-6 leading-tight text-glow">Firdaus <br><span class="text-secondary-fixed-dim">Mochamad</span></h1>
        <p class="font-body-lg text-on-surface-variant max-w-xl mb-10">
          A Frontend Developer with 3+ years of expertise in crafting high-performance, immersive digital experiences. Engineering the future of the web with Vue.js, React, and precision-coded interfaces.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#projects" class="px-8 py-4 bg-primary text-on-primary font-headline-md text-body-md font-bold rounded-lg hover:shadow-[0_0_24px_rgba(189,0,255,0.45)] transition-all flex items-center gap-2">
            View Missions
            <ArrowRight class="h-4 w-4" />
          </a>
          <a href="#contact" class="px-8 py-4 border border-secondary-fixed-dim text-secondary-fixed-dim font-headline-md text-body-md font-bold rounded-lg hover:bg-secondary-fixed-dim/10 transition-all">Initiate Contact</a>
        </div>
      </div>
      <div class="hidden lg:flex justify-center items-center relative">
        <!-- Tilt Wrapper -->
        <div ref="tiltRef" class="transition-transform duration-75 ease-out" style="perspective: 1000px; transform-style: preserve-3d;">
          <!-- Circular Orbit Graphic -->
          <div class="orbit-container">
            <div class="orbit-item" style="top: 0%; left: 50%; transform: translate(-50%, -50%);"><span class="material-symbols-outlined text-secondary-fixed-dim">javascript</span></div>
            <div class="orbit-item" style="top: 25%; left: 93%; transform: translate(-50%, -50%);"><span class="material-symbols-outlined text-secondary-fixed-dim">data_object</span></div>
            <div class="orbit-item" style="top: 75%; left: 93%; transform: translate(-50%, -50%);"><span class="material-symbols-outlined text-secondary-fixed-dim">code</span></div>
            <div class="orbit-item" style="top: 100%; left: 50%; transform: translate(-50%, -50%);"><span class="material-symbols-outlined text-secondary-fixed-dim">css</span></div>
            <div class="orbit-item" style="top: 75%; left: 7%; transform: translate(-50%, -50%);"><span class="material-symbols-outlined text-secondary-fixed-dim">html</span></div>
            <div class="orbit-item" style="top: 25%; left: 7%; transform: translate(-50%, -50%);"><span class="material-symbols-outlined text-secondary-fixed-dim">terminal</span></div>
          </div>
        </div>
        <!-- Center Core -->
        <div class="absolute w-32 h-32 rounded-full bg-primary/20 backdrop-blur-2xl border border-primary/40 flex items-center justify-center animate-pulse">
          <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1;">rocket_launch</span>
        </div>
      </div>
    </div>
  </section>
</template>


