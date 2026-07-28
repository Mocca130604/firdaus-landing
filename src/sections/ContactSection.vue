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
  <section class="py-12 px-gutter relative overflow-hidden" id="contact">
    <div class="max-w-container-max mx-auto relative z-10">
      <div class="glass-panel p-10 md:p-16 rounded-[3rem] text-center max-w-4xl mx-auto border border-primary/20 shadow-panel">
        <h2 class="font-display text-display mb-stack-md text-glow">CONNECT</h2>
        <p class="font-body-lg text-on-surface-variant mb-8 max-w-xl mx-auto">
          Ready to initiate a new project or collaborate on something cosmic? Drop a signal below.
        </p>

        <!-- Social Badges Grid -->
        <div class="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl mx-auto">
          <a v-for="item in socialLinks" :key="item.label" :href="item.href"
            class="glass-panel flex items-center gap-3 rounded-full px-5 py-2.5 text-sm text-white/80 border border-primary/10 transition hover:-translate-y-1 hover:border-secondary-fixed-dim/40 hover:text-white">
            <component :is="item.icon" class="h-4 w-4 text-secondary-fixed-dim" />
            <span class="font-label-caps text-xs uppercase tracking-wider">{{ item.label }}</span>
          </a>
        </div>

        <!-- Contact Form -->
        <form class="space-y-6 text-left max-w-lg mx-auto" @submit.prevent="submitMessage">
          <div class="relative">
            <input v-model="contactForm.name" type="text" :placeholder="`Your Name (e.g. ${props.name})`"
              class="w-full bg-white/5 border border-primary/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-on-surface-variant/50 text-white" />
          </div>
          <div class="relative">
            <input v-model="contactForm.email" type="email" placeholder="Signal Origin (Email)"
              class="w-full bg-white/5 border border-primary/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-on-surface-variant/50 text-white" />
          </div>
          <div class="relative">
            <textarea v-model="contactForm.message" rows="4" placeholder="Transmission Details (Tell me about your mission...)"
              class="w-full bg-white/5 border border-primary/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-on-surface-variant/50 text-white"></textarea>
          </div>
          <p v-if="!isConfigured" class="text-sm text-amber-200/90 text-center font-code-sm">
            Add your EmailJS configuration to the local <code>.env</code> file before testing this form.
          </p>
          <p v-if="formError" class="text-sm text-rose-400 text-center">{{ formError }}</p>
          <p v-else-if="submitState === 'success'" class="text-sm text-emerald-400 text-center">Your transmission has been received successfully.</p>
          <button :disabled="submitState === 'loading'" class="w-full bg-gradient-to-r from-primary to-secondary-fixed-dim text-on-primary font-headline-md py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-transform" type="submit">
            {{ submitState === 'loading' ? 'Sending Transmission...' : 'Send Transmission' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
