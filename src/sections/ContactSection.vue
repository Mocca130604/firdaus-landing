<script setup>
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  name: String,
  socialLinks: {
    type: Array,
    default: () => [],
  },
})

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

const contactForm = reactive({
  name: '',
  email: '',
  message: '',
})

const formError = ref('')
const submitState = ref('idle')

const isConfigured = computed(() => Boolean(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID))

const submitMessage = async () => {
  if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
    formError.value = 'Please complete your name, email, and message first.'
    submitState.value = 'error'
    return
  }

  if (!isConfigured.value) {
    formError.value = 'EmailJS is not configured yet. Add your keys to the local .env file first.'
    submitState.value = 'error'
    return
  }

  formError.value = ''
  submitState.value = 'loading'

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_name: 'Firdaus Mochamad',
          to_email: 'medioid13@gmail.com',
          from_name: contactForm.name.trim(),
          from_email: contactForm.email.trim(),
          reply_to: contactForm.email.trim(),
          message: contactForm.message.trim(),
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Email send failed')
    }

    submitState.value = 'success'
    contactForm.name = ''
    contactForm.email = ''
    contactForm.message = ''
  } catch (error) {
    submitState.value = 'error'
    const message = error instanceof Error ? error.message : 'Unknown EmailJS error'
    formError.value = `EmailJS error: ${message}`
    console.error(error)
  }
}
</script>

<template>
  <section class="section-frame px-6 py-12 sm:px-8 lg:px-12">
    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p class="font-display text-sm uppercase tracking-[0.45em] text-glow-cyan/80">Planet Five</p>
        <h2 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Space Terminal</h2>
        <p class="mt-4 text-base leading-8 text-white/70">
          If you're looking for a frontend engineer who cares about architecture, polish, and performance, let's
          connect.
        </p>

        <div class="mt-8 space-y-4">
          <a v-for="item in socialLinks" :key="item.label" :href="item.href"
            class="glass-panel flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1">
            <component :is="item.icon" class="h-5 w-5 text-glow-cyan" />
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/45">{{ item.label }}</p>
              <p class="text-sm text-white/80">{{ item.value }}</p>
            </div>
          </a>
        </div>
      </div>

      <form class="glass-panel rounded-[2rem] border border-glow-cyan/15 p-6 animate-pulse-glow"
        @submit.prevent="submitMessage">
        <div class="grid gap-5">
          <label class="block">
            <span class="mb-2 block text-sm text-white/70">Name</span>
            <input v-model="contactForm.name" type="text" :placeholder="props.name"
              class="w-full rounded-2xl border border-white/10 bg-space-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-glow-cyan/45" />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm text-white/70">Email</span>
            <input v-model="contactForm.email" type="email" placeholder="your@email.com"
              class="w-full rounded-2xl border border-white/10 bg-space-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-glow-cyan/45" />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm text-white/70">Message</span>
            <textarea v-model="contactForm.message" rows="6" placeholder="Tell me about your mission..."
              class="w-full rounded-2xl border border-white/10 bg-space-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-glow-cyan/45" />
          </label>
          <p v-if="!isConfigured" class="text-sm text-amber-200/90">
            Add your EmailJS configuration to the local <code>.env</code> file before testing this form.
          </p>
          <p v-if="formError" class="text-sm text-rose-300">{{ formError }}</p>
          <p v-else-if="submitState === 'success'" class="text-sm text-emerald-300">Your message has been sent
            successfully.</p>
          <button type="submit" :disabled="submitState === 'loading'"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-glow-primary to-glow-cyan px-6 py-3 text-sm font-semibold text-space-950 transition hover:shadow-[0_0_24px_rgba(0,229,255,0.35)] disabled:cursor-not-allowed disabled:opacity-70">
            {{ submitState === 'loading' ? 'Sending...' : 'Send Message' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
