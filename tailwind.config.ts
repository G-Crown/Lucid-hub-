import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // === LUCID HUB BRAND PALETTE ===
        brand: {
          blue:       '#1A1AFF',
          'blue-bright': '#3B3BFF',
          'blue-deep':   '#0A1628',
          'blue-dark':   '#0E1F3D',
          'blue-mid':    '#162E5C',
          'blue-light':  '#E6E6FF',
          gold:          '#F5AB00',
          'gold-light':  '#FFD54F',
          'gold-dim':    '#C48A00',
        },
        cream: {
          DEFAULT: '#F7F5F0',
          dark:    '#EDE9E1',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl2': '20px',
      },
      backgroundImage: {
        'hero-grid': "linear-gradient(rgba(26,26,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
export default config
