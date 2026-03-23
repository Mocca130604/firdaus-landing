<script setup>
import { onMounted, ref } from 'vue'
import { ChevronDown, Sparkles } from 'lucide-vue-next'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const visibleItems = ref([])
const expandedItems = ref([])

const isExpanded = (index) => expandedItems.value.includes(index)

const toggleItem = (index) => {
  if (isExpanded(index)) {
    expandedItems.value = expandedItems.value.filter((itemIndex) => itemIndex !== index)
    return
  }

  expandedItems.value = [...expandedItems.value, index]
}

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

        <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in item.techStack?.slice(0, 3)"
              :key="tech"
              class="rounded-full border border-glow-cyan/20 bg-glow-cyan/8 px-3 py-1 text-xs text-glow-cyan shadow-[0_0_18px_rgba(0,229,255,0.08)]"
            >
              {{ tech }}
            </span>
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-glow-cyan/25 bg-glow-cyan/10 px-4 py-2 text-sm font-medium text-white transition hover:border-glow-cyan/45 hover:bg-glow-cyan/15"
            @click="toggleItem(index)"
          >
            {{ isExpanded(index) ? 'Hide Details' : 'View Details' }}
            <ChevronDown class="h-4 w-4 transition duration-300" :class="isExpanded(index) ? 'rotate-180' : ''" />
          </button>
        </div>

        <transition
          enter-active-class="overflow-hidden transition-all duration-300 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[1200px] opacity-100"
          leave-active-class="overflow-hidden transition-all duration-250 ease-in"
          leave-from-class="max-h-[1200px] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="isExpanded(index)" class="mt-6 border-t border-white/8 pt-6">
            <div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div class="space-y-5">
                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p class="text-xs uppercase tracking-[0.28em] text-glow-cyan/75">Role Description</p>
                  <p class="mt-3 text-sm leading-7 text-white/72">{{ item.description }}</p>
                </div>

                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p class="text-xs uppercase tracking-[0.28em] text-glow-cyan/75">Projects / Products Worked On</p>
                  <ul class="mt-3 space-y-2">
                    <li
                      v-for="project in item.projects"
                      :key="project"
                      class="flex gap-3 text-sm leading-7 text-white/72"
                    >
                      <span class="mt-2 h-2 w-2 rounded-full bg-glow-cyan/80" />
                      <span>{{ project }}</span>
                    </li>
                  </ul>
                </div>

                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p class="text-xs uppercase tracking-[0.28em] text-glow-cyan/75">Responsibilities</p>
                  <ul class="mt-3 space-y-2">
                    <li
                      v-for="responsibility in item.responsibilities"
                      :key="responsibility"
                      class="flex gap-3 text-sm leading-7 text-white/72"
                    >
                      <span class="mt-2 h-2 w-2 rounded-full bg-white/70" />
                      <span>{{ responsibility }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="space-y-5">
                <div class="rounded-[1.5rem] border border-glow-cyan/15 bg-glow-cyan/5 p-4">
                  <p class="text-xs uppercase tracking-[0.28em] text-glow-cyan/75">Tech Stack</p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="tech in item.techStack"
                      :key="tech"
                      class="rounded-full border border-glow-cyan/25 bg-space-950/70 px-3 py-1 text-xs text-glow-cyan shadow-[0_0_18px_rgba(0,229,255,0.12)]"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <div class="flex items-center gap-2">
                    <Sparkles class="h-4 w-4 text-glow-cyan" />
                    <p class="text-xs uppercase tracking-[0.28em] text-glow-cyan/75">Achievements / Impact</p>
                  </div>
                  <ul class="mt-3 space-y-2">
                    <li
                      v-for="achievement in item.achievements"
                      :key="achievement"
                      class="flex gap-3 text-sm leading-7 text-white/72"
                    >
                      <span class="mt-2 h-2 w-2 rounded-full bg-emerald-300/80" />
                      <span>{{ achievement }}</span>
                    </li>
                  </ul>
                </div>

                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p class="text-xs uppercase tracking-[0.28em] text-glow-cyan/75">Tools & Workflow</p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="tool in item.workflow"
                      :key="tool"
                      class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                    >
                      {{ tool }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
