<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const visibleItems = ref([])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute('data-index'))
        if (entry.isIntersecting && !visibleItems.value.includes(index)) {
          visibleItems.value.push(index)
        }
      })
    },
    { threshold: 0.25 },
  )

  document.querySelectorAll('[data-timeline-item]').forEach((item) => observer.observe(item))
})
</script>

<template>
  <div class="relative ml-4 border-l border-white/10 pl-8 sm:ml-8">
    <div
      v-for="(item, index) in items"
      :key="item.company + index"
      :data-index="index"
      data-timeline-item
      class="group relative mb-10 last:mb-0"
    >
      <div
        class="absolute -left-[42px] top-3 flex h-7 w-7 items-center justify-center rounded-full border border-glow-cyan/40 bg-space-900 transition duration-500"
        :class="visibleItems.includes(index) ? 'shadow-[0_0_24px_rgba(0,229,255,0.45)]' : 'shadow-none'"
      >
        <div class="h-2.5 w-2.5 rounded-full bg-glow-cyan" />
      </div>

      <div class="glass-panel rounded-3xl p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-white/15">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-display text-xl font-semibold text-white">{{ item.company }}</p>
            <p class="text-sm uppercase tracking-[0.25em] text-glow-cyan/80">{{ item.role }}</p>
          </div>
          <p class="text-sm text-white/50">{{ item.period }}</p>
        </div>
        <p class="mt-4 text-sm leading-7 text-white/70">{{ item.detail }}</p>
      </div>
    </div>
  </div>
</template>
