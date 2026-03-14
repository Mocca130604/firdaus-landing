<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div class="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
    <div class="glass-panel flex w-16 flex-col items-center rounded-full px-3 py-4">
      <div class="relative flex h-40 w-2 items-end rounded-full bg-white/8">
        <div
          class="w-full rounded-full bg-gradient-to-t from-glow-cyan via-glow-primary to-white transition-all duration-200"
          :style="{ height: `${Math.max(progress, 8)}%` }"
        />
      </div>
      <span class="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/55">Radar</span>
    </div>
  </div>
</template>
