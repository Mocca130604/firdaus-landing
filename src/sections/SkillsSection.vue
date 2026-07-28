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
  <section class="py-12 px-gutter max-w-container-max mx-auto" id="skills">
    <div class="mb-10 max-w-3xl">
      <h2 class="font-display text-headline-lg mb-stack-md border-l-4 border-primary pl-6">TECHNICAL ARSENAL</h2>
      <p class="font-body-lg text-on-surface-variant leading-relaxed">
        The core technologies powering my digital explorations. Click a planet or tag to initiate system diagnostics.
      </p>
    </div>

    <div class="grid gap-6 xl:grid-cols-2">
      <!-- Interactive Planet Orbit System -->
      <div class="glass-panel relative min-h-[620px] overflow-hidden rounded-3xl p-6 border border-primary/20">
        <div class="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div
          class="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-500 shadow-[0_0_70px_rgba(255,194,79,0.35)]" />
        <div v-for="ring in orbitRings" :key="ring"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
          :style="{ width: `${ring * 2}px`, height: `${ring * 2}px` }" />

        <PlanetSkill v-for="skill in primarySkills" :key="skill.name" :skill="skill" @select="openOrbit" />
      </div>

      <!-- Bento Grid of Groups & Code Block -->
      <div class="grid gap-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="group in skillGroups" :key="group.title" class="glass-panel rounded-2xl p-6 border border-primary/20 flex flex-col justify-between hover:scale-[1.01] transition-all">
            <div>
              <div class="mb-4 flex items-center justify-between">
                <h3 class="font-display text-lg font-bold text-white uppercase">{{ group.title }}</h3>
                <span
                  class="rounded-full border border-secondary-fixed-dim/20 bg-secondary-fixed-dim/5 px-3 py-1 text-xs uppercase tracking-wider text-secondary-fixed-dim">
                  {{ group.skills.length }} tech
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="skill in group.skills" :key="skill.name" type="button"
                  class="rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-sm text-white/80 transition hover:border-secondary-fixed-dim/40 hover:text-white hover:bg-secondary-fixed-dim/5"
                  @click="openOrbit(skill)">
                  {{ skill.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Capability Matrix Code Window -->
        <div class="glass-panel p-5 rounded-2xl border border-primary/20 flex flex-col">
          <div class="flex items-center gap-2 code-window-header p-3 rounded-t-xl -mx-5 -mt-5 mb-4 px-5">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="ml-4 font-code-sm text-xs text-on-surface-variant opacity-60">capability_matrix.ts</span>
          </div>
          <div class="font-code-sm text-sm leading-relaxed text-secondary-fixed-dim bg-black/40 p-4 rounded-xl">
            <span class="text-primary">const</span> <span class="text-on-surface">developer</span> = {<br>
            &nbsp;&nbsp;name: <span class="text-secondary-fixed">"Firdaus Mochamad"</span>,<br>
            &nbsp;&nbsp;experience: <span class="text-secondary-fixed">"3+ Solar Cycles"</span>,<br>
            &nbsp;&nbsp;stack: [<span class="text-secondary-fixed">"Vue"</span>, <span class="text-secondary-fixed">"React"</span>, <span class="text-secondary-fixed">"TypeScript"</span>, <span class="text-secondary-fixed">"Tailwind"</span>],<br>
            &nbsp;&nbsp;focus: <span class="text-secondary-fixed">"High-End UI/UX Fidelity"</span><br>
            };
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Skills Modal Details -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="selectedSkill"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
        @click.self="closeOrbit">
        <transition appear enter-active-class="transition duration-300 ease-out" enter-from-class="scale-90 opacity-0"
          enter-to-class="scale-100 opacity-100" leave-active-class="transition duration-200 ease-in"
          leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
          <div v-if="selectedSkill"
            class="glass-panel relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-secondary-fixed-dim/30 p-6 sm:p-8">
            <button type="button"
              class="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-secondary-fixed-dim/40 hover:text-white"
              @click="closeOrbit">
              <X class="h-5 w-5" />
            </button>

            <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p class="font-label-caps text-secondary-fixed-dim uppercase tracking-[0.2em]">Skill Detail</p>
                <div class="mt-4 flex items-center gap-3">
                  <div class="h-4 w-4 rounded-full bg-gradient-to-r" :class="selectedSkill.color" />
                  <h3 class="font-display text-3xl font-bold text-white">{{ selectedSkill.name }}</h3>
                </div>
                <p class="mt-4 text-base leading-7 text-white/72">{{ selectedSkill.description }}</p>

                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                  <div v-for="item in detailItems" :key="item.label"
                    class="glass-panel rounded-xl border border-primary/20 p-4">
                    <component :is="item.icon" class="h-5 w-5 text-secondary-fixed-dim" />
                    <p class="mt-3 font-label-caps text-xs text-white/45 uppercase">{{ item.label }}</p>
                    <p class="mt-1 text-sm font-medium text-white/85">{{ item.value }}</p>
                  </div>
                </div>

                <div class="mt-6 rounded-xl border border-secondary-fixed-dim/20 bg-secondary-fixed-dim/5 p-4">
                  <div class="flex items-center gap-2 text-secondary-fixed-dim">
                    <Sparkles class="h-4 w-4" />
                    <span class="text-sm font-medium">Catatan penggunaan</span>
                  </div>
                  <p class="mt-3 text-sm leading-7 text-white/70">{{ selectedSkill.detail }}</p>
                </div>
              </div>

              <!-- Interactive Orbit View -->
              <div
                class="glass-panel relative min-h-[520px] overflow-hidden rounded-[1.75rem] border border-primary/20 bg-black/40">
                <div
                  class="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-500 shadow-[0_0_90px_rgba(255,194,79,0.42)]" />

                <div v-for="ring in orbitRings" :key="`modal-${ring}`"
                  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  :class="ring === selectedSkill.orbit ? 'border-secondary-fixed-dim/45 shadow-[0_0_30px_rgba(0,240,255,0.12)]' : 'border-white/5'"
                  :style="{ width: `${ring * 2}px`, height: `${ring * 2}px` }" />

                <div v-for="skill in primarySkills" :key="`preview-${skill.name}`"
                  class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br text-center text-white shadow-planet transition duration-300"
                  :class="[skill.color, skill.name === selectedSkill.name ? 'z-20 ring-4 ring-secondary-fixed-dim/30 shadow-[0_0_50px_rgba(0,240,255,0.35)]' : 'opacity-85']"
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
