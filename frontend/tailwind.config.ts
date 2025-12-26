import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        ivory: {
          50: '#FEFEFE',
          100: '#FDFCFA',
          200: '#FAF8F4',
        },
        slate: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
        // Guest Menu Colors
        gold: {
          500: '#ca8a04',
          600: '#a16207',
        },
        'premium-beige': '#FAFAF9',
        'premium-black': '#1C1917',
        'premium-gray': '#44403C',
        'premium-border': 'rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(173, 181, 189, 0.08)',
        'hover': '0 10px 25px -5px rgba(173, 181, 189, 0.15)',
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'skeleton': 'skeleton 1.5s infinite linear',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'skeleton': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
