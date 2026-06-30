/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4ED',
        olive: {
          DEFAULT: '#6B7A4E',
          50: '#f6f7f4',
          100: '#e8eae3',
          200: '#d4d7ca',
          300: '#b5bba4',
          400: '#969f7e',
          500: '#6B7A4E',
          600: '#586742',
          700: '#485537',
          800: '#3a442d',
          900: '#303928',
        },
        border: '#E7E2D7',
        text: {
          primary: '#262626',
          secondary: '#525252',
          muted: '#737373',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay-1': 'fadeUp 0.8s ease-out 0.1s forwards',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.2s forwards',
        'fade-up-delay-3': 'fadeUp 0.8s ease-out 0.3s forwards',
        'fade-up-delay-4': 'fadeUp 0.8s ease-out 0.4s forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'typing': 'typing 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 32px -8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
