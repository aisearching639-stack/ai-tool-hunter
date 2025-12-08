import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}', // Trea 補上了這一行，很重要
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        'primary-dark': '#0062cc',
        'accent-purple': '#8A2BE2',
        'accent-green': '#00FF9D',
        'accent-gold': '#FFD700',
        secondary: '#007BFF',
        accent: '#8A2BE2',
        neon: '#39FF14',
        'background-dark': '#121212',
        'surface-dark': '#1E1E1E',
        'surface-darker': '#181818',
        'border-dark': '#333333',
        'text-light': '#B0B0B0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px rgba(0, 123, 255, 0.3)',
        'neon-purple': '0 0 10px rgba(138, 43, 226, 0.3)',
        'neon-green': '0 0 10px rgba(57, 255, 20, 0.3)',
        glow: '0 0 20px rgba(0, 123, 255, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/line-clamp'),
  ],
}

export default config