/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5f6FFF", // Preserves your existing primary color
          900: '#0d47a1',     // New shade
          600: '#1976d2'      // New shade
        },
        accent: {
          300: '#4dd0e1',     // New accent colors
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
        }
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))' // Your existing setting
      },
      animation: {
        'pulse-slow': 'pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rotate': 'rotate 60s linear infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out'
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.05' }
        },
        'rotate': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        'fadeInUp': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ]
}