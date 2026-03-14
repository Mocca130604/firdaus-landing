/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#0B0F1A',
          900: '#121A2C',
          800: '#17233C',
        },
        glow: {
          primary: '#7C9DFF',
          secondary: '#9B8CFF',
          cyan: '#00E5FF',
          text: '#E6ECFF',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        alt: ['Satoshi', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        planet: '0 0 30px rgba(124, 157, 255, 0.2), 0 0 80px rgba(0, 229, 255, 0.12)',
        panel: '0 10px 40px rgba(5, 10, 30, 0.55)',
      },
      backgroundImage: {
        'nebula-soft':
          'radial-gradient(circle at top, rgba(124,157,255,0.2), transparent 40%), radial-gradient(circle at 80% 20%, rgba(155,140,255,0.15), transparent 35%), radial-gradient(circle at 50% 80%, rgba(0,229,255,0.12), transparent 30%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0, 229, 255, 0.2)' },
          '50%': { boxShadow: '0 0 26px rgba(0, 229, 255, 0.35)' },
        },
        shooting: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(0.4)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translate3d(-320px, 180px, 0) scale(1)', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        orbit: 'orbit var(--orbit-duration, 22s) linear infinite',
        'pulse-glow': 'pulseGlow 2.8s ease-in-out infinite',
        shooting: 'shooting 2.6s linear infinite',
      },
    },
  },
  plugins: [],
}
