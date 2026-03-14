<script setup>
import { computed, ref } from 'vue'
import { BriefcaseBusiness, CircleGauge, Layers3, Orbit, Sparkles, X } from 'lucide-vue-next'
import PlanetSkill from '../components/PlanetSkill.vue'

const props = defineProps({
  skillGroups: {
    type: Array,
    required: true,
  },
})

const selectedSkill = ref(null)
const primarySkills = computed(() => props.skillGroups[0]?.skills ?? [])
const orbitRings = computed(() => [...new Set(primarySkills.value.map((skill) => skill.orbit))].sort((a, b) => a - b))

const orbitPreviewStyle = (skill) => {
  const angle = ((skill.angle ?? 0) * Math.PI) / 180
  const x = Math.cos(angle) * skill.orbit
  const y = Math.sin(angle) * skill.orbit

  return {
    width: `${skill.size || 88}px`,
    height: `${skill.size || 88}px`,
    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
  }
}

const detailItems = computed(() => {
  if (!selectedSkill.value) return []

  return [
    {
      label: 'Level',
      value: selectedSkill.value.level,
      icon: CircleGauge,
    },
    {
      label: 'Kategori',
      value: selectedSkill.value.category,
      icon: Layers3,
    },
    {
      label: 'Pengalaman',
      value: selectedSkill.value.experience,
      icon: BriefcaseBusiness,
    },
    {
      label: 'Orbit',
      value: `${selectedSkill.value.orbit}px`,
      icon: Orbit,
    },
  ]
})

const openOrbit = (skill) => {
  selectedSkill.value = skill
}

const closeOrbit = () => {
  selectedSkill.value = null
}
</script>

<template>
  <section class="section-frame px-6 py-12 sm:px-8 lg:px-12">
    <div class="mb-8 max-w-2xl">
      <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Planet Two</p>
      <h2 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Skill Planet System</h2>
      <p class="mt-4 text-base leading-8 text-white/70">
        My core stack is mapped like an orbiting solar system, with each planet representing a technology used to build
        maintainable, elegant frontend products.
      </p>
      <p class="mt-3 text-sm text-glow-cyan/75">Klik salah satu planet untuk melihat keseluruhan orbit dan detail
        skill-nya.</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-2">
      <div class="glass-panel relative min-h-[620px] overflow-hidden rounded-[2rem] p-6">
        <div
          class="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-500 shadow-[0_0_70px_rgba(255,194,79,0.35)]" />
        <div v-for="ring in orbitRings" :key="ring"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          :style="{ width: `${ring * 2}px`, height: `${ring * 2}px` }" />

        <PlanetSkill v-for="skill in primarySkills" :key="skill.name" :skill="skill" @select="openOrbit" />
      </div>

      <div class="grid gap-5">
        <div v-for="group in skillGroups" :key="group.title" class="glass-panel rounded-[1.75rem] p-5">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="font-display text-2xl text-white">{{ group.title }}</h3>
            <span
              class="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-glow-cyan/70">
              {{ group.skills.length }} tech
            </span>
          </div>
          <div class="flex flex-wrap gap-3">
            <button v-for="skill in group.skills" :key="skill.name" type="button"
              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-glow-cyan/40 hover:text-white"
              @click="openOrbit(skill)">
              {{ skill.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="selectedSkill"
        class="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 px-4 backdrop-blur-md"
        @click.self="closeOrbit">
        <transition appear enter-active-class="transition duration-300 ease-out" enter-from-class="scale-90 opacity-0"
          enter-to-class="scale-100 opacity-100" leave-active-class="transition duration-200 ease-in"
          leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
          <div v-if="selectedSkill"
            class="glass-panel relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-glow-cyan/20 p-6 sm:p-8">
            <button type="button"
              class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-glow-cyan/40 hover:text-white"
              @click="closeOrbit">
              <X class="h-5 w-5" />
            </button>

            <div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p class="font-display text-sm uppercase tracking-[0.4em] text-glow-cyan/75">Skill Detail</p>
                <div class="mt-4 flex items-center gap-3">
                  <div class="h-4 w-4 rounded-full bg-gradient-to-r" :class="selectedSkill.color" />
                  <h3 class="font-display text-4xl font-bold text-white">{{ selectedSkill.name }}</h3>
                </div>
                <p class="mt-4 text-base leading-7 text-white/72">{{ selectedSkill.description }}</p>

                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                  <div v-for="item in detailItems" :key="item.label"
                    class="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                    <component :is="item.icon" class="h-5 w-5 text-glow-cyan" />
                    <p class="mt-3 text-xs uppercase tracking-[0.28em] text-white/45">{{ item.label }}</p>
                    <p class="mt-2 text-sm font-medium text-white/85">{{ item.value }}</p>
                  </div>
                </div>

                <div class="mt-6 rounded-[1.5rem] border border-glow-cyan/15 bg-glow-cyan/5 p-4">
                  <div class="flex items-center gap-2 text-glow-cyan">
                    <Sparkles class="h-4 w-4" />
                    <span class="text-sm font-medium">Catatan penggunaan</span>
                  </div>
                  <p class="mt-3 text-sm leading-7 text-white/70">{{ selectedSkill.detail }}</p>
                </div>
              </div>

              <div
                class="glass-panel relative min-h-[520px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-space-950/55">
                <div
                  class="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-500 shadow-[0_0_90px_rgba(255,194,79,0.42)]" />

                <div v-for="ring in orbitRings" :key="`modal-${ring}`"
                  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  :class="ring === selectedSkill.orbit ? 'border-glow-cyan/45 shadow-[0_0_30px_rgba(0,229,255,0.12)]' : 'border-white/8'"
                  :style="{ width: `${ring * 2}px`, height: `${ring * 2}px` }" />

                <div v-for="skill in primarySkills" :key="`preview-${skill.name}`"
                  class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br text-center text-white shadow-planet transition duration-300"
                  :class="[skill.color, skill.name === selectedSkill.name ? 'z-20 ring-4 ring-glow-cyan/30 shadow-[0_0_50px_rgba(0,229,255,0.35)]' : 'opacity-85']"
                  :style="orbitPreviewStyle(skill)">
                  <span class="px-2 font-display font-semibold"
                    :style="{ fontSize: skill.size && skill.size < 78 ? '0.7rem' : '0.82rem', lineHeight: '1.15' }">
                    {{ skill.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </section>
</template>
