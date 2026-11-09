/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy & Gold Luxe System
        navy: {
          DEFAULT: '#0B1F3B',
          dark: '#071629',
          light: '#14315A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          hover: '#B9952D',
          light: '#F5E6BD',
          accent: '#E5C158',
        },
        surface: {
          soft: '#F5F7FA',
          border: '#E0E6ED',
          white: '#FFFFFF',
          muted: '#667085',
        },
        brand: {
          // Palette mapping for legacy classes
          orange: '#D4AF37', // Gold
          orangeHover: '#B9952D', // Gold Hover
          accent: '#D4AF37', // Gold
          dark: '#0B1F3B', // Deep Navy
          navy: '#0B1F3B',
          navyDark: '#071629',
          gold: '#D4AF37',
          goldHover: '#B9952D',
          muted: '#667085',
          border: '#E0E6ED',
          warmBg: '#F5F7FA',
          cream: '#F5F7FA',
          footer: '#0B1F3B',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 4px 20px -2px rgba(11, 31, 59, 0.05)',
        card: '0 8px 30px rgba(11, 31, 59, 0.05)',
        cardHover: '0 16px 40px rgba(11, 31, 59, 0.12)',
        float: '0 20px 45px -10px rgba(7, 22, 41, 0.22)',
        goldGlow: '0 12px 30px -5px rgba(212, 175, 55, 0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '0.88', transform: 'scale(1)' },
          '50%': { opacity: '0.42', transform: 'scale(1.08)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        fadeInUp: 'fadeInUp 0.35s ease-out forwards',
        cursorBlink: 'cursorBlink 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
