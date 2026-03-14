<script setup>
import { Mail, MapPin, Phone, Send } from 'lucide-vue-next'

defineProps({
  name: String,
  email: String,
  phone: String,
  location: String,
})
</script>

<template>
  <section class="section-frame px-6 py-12 sm:px-8 lg:px-12">
    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Planet Five</p>
        <h2 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Space Terminal</h2>
        <p class="mt-4 text-base leading-8 text-white/70">
          If you’re looking for a frontend engineer who cares about architecture, polish, and performance, let’s connect.
        </p>

        <div class="mt-8 space-y-4">
          <div class="glass-panel flex items-center gap-4 rounded-2xl p-4">
            <Mail class="h-5 w-5 text-glow-cyan" />
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/45">Email</p>
              <p class="text-sm text-white/80">{{ email }}</p>
            </div>
          </div>
          <div class="glass-panel flex items-center gap-4 rounded-2xl p-4">
            <Phone class="h-5 w-5 text-glow-cyan" />
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/45">Phone</p>
              <p class="text-sm text-white/80">{{ phone }}</p>
            </div>
          </div>
          <div class="glass-panel flex items-center gap-4 rounded-2xl p-4">
            <MapPin class="h-5 w-5 text-glow-cyan" />
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/45">Location</p>
              <p class="text-sm text-white/80">{{ location }}</p>
            </div>
          </div>
        </div>
      </div>

      <form class="glass-panel rounded-[2rem] border border-glow-cyan/15 p-6 animate-pulse-glow">
        <div class="grid gap-5">
          <label class="block">
            <span class="mb-2 block text-sm text-white/70">Name</span>
            <input
              type="text"
              :placeholder="name"
              class="w-full rounded-2xl border border-white/10 bg-space-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-glow-cyan/45"
            />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm text-white/70">Email</span>
            <input
              type="email"
              :placeholder="email"
              class="w-full rounded-2xl border border-white/10 bg-space-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-glow-cyan/45"
            />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm text-white/70">Message</span>
            <textarea
              rows="6"
              placeholder="Tell me about your mission..."
              class="w-full rounded-2xl border border-white/10 bg-space-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-glow-cyan/45"
            />
          </label>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-glow-primary to-glow-cyan px-6 py-3 text-sm font-semibold text-space-950 transition hover:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
          >
            <Send class="h-4 w-4" />
            Send Message
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
