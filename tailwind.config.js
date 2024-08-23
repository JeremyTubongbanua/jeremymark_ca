/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#9F7AEA',
          500: '#805AD5',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'lg': '1rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        slideIn: 'slideIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
