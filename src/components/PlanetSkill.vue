<script setup>
import { computed } from 'vue'

const emit = defineEmits(['select'])

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
  centered: {
    type: Boolean,
    default: false,
  },
})

const orbitDurationSeconds = computed(() => Number.parseFloat(props.skill.speed || '22') || 22)

const styleVars = computed(() => ({
  '--orbit-radius': `${props.skill.orbit}px`,
  '--orbit-duration': props.skill.speed,
  animationDelay: `-${(orbitDurationSeconds.value * (props.skill.angle ?? 0)) / 360}s`,
}))

const planetStyle = computed(() => ({
  width: `${props.skill.size || 88}px`,
  height: `${props.skill.size || 88}px`,
}))

const labelStyle = computed(() => ({
  fontSize: props.skill.size && props.skill.size < 78 ? '0.7rem' : '0.82rem',
  lineHeight: '1.15',
}))
</script>

<template>
  <div v-if="!centered" class="absolute left-1/2 top-1/2">
    <div class="animate-orbit" :style="styleVars">
      <div class="group relative -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          class="planet-surface flex items-center justify-center rounded-full bg-gradient-to-br text-center shadow-planet transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(0,229,255,0.35)]"
          :class="skill.color"
          :style="planetStyle"
          @click="emit('select', skill)">
          <span class="px-2 font-display font-semibold text-white" :style="labelStyle">{{ skill.name }}</span>
        </button>
        <div
          class="pointer-events-none absolute left-1/2 top-full mt-3 hidden w-max -translate-x-1/2 rounded-full border border-white/10 bg-space-950/95 px-3 py-2 text-xs text-white/80 shadow-panel group-hover:block">
          {{ skill.level }} • klik untuk lihat orbit
        </div>
      </div>
    </div>
  </div>

  <div v-else class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
    <button
      type="button"
      class="planet-surface flex items-center justify-center rounded-full bg-gradient-to-br text-center shadow-planet transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(0,229,255,0.35)]"
      :class="skill.color"
      :style="planetStyle"
      @click="emit('select', skill)">
      <span class="px-2 font-display font-semibold text-white" :style="labelStyle">{{ skill.name }}</span>
    </button>
  </div>
</template>
