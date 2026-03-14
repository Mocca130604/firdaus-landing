<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
const shootingStars = ref([
  { top: '12%', left: '78%', delay: '0s' },
  { top: '32%', left: '62%', delay: '1.5s' },
  { top: '56%', left: '86%', delay: '3.4s' },
])

let animationFrame
let stars = []

const setupStars = (canvas, ctx) => {
  const dpr = window.devicePixelRatio || 1
  const width = window.innerWidth
  const height = window.innerHeight

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const total = Math.min(200, Math.floor((width * height) / 8500))
  stars = Array.from({ length: total }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.2,
    alpha: Math.random() * 0.7 + 0.2,
    velocity: Math.random() * 0.08 + 0.02,
  }))
}

const animate = (ctx) => {
  const width = window.innerWidth
  const height = window.innerHeight
  ctx.clearRect(0, 0, width, height)

  stars.forEach((star) => {
    star.y += star.velocity
    if (star.y > height) {
      star.y = -4
      star.x = Math.random() * width
    }

    ctx.beginPath()
    ctx.fillStyle = `rgba(230, 236, 255, ${star.alpha})`
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fill()
  })

  animationFrame = requestAnimationFrame(() => animate(ctx))
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  setupStars(canvas, ctx)
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  setupStars(canvas, ctx)
  animate(ctx)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
    <canvas ref="canvasRef" class="absolute inset-0" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,157,255,0.16),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(0,229,255,0.08),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(155,140,255,0.12),transparent_30%)]" />
    <div
      v-for="(star, index) in shootingStars"
      :key="index"
      class="absolute h-px w-32 bg-gradient-to-l from-white via-glow-cyan to-transparent opacity-0 blur-[1px] animate-shooting"
      :style="{ top: star.top, left: star.left, animationDelay: star.delay }"
    />
  </div>
</template>
