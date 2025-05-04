/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./lib/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        fall: 'fall 3s linear infinite',
        launch: 'launch 1.2s ease-out forwards',
        explode: 'explode 0.8s ease-out forwards',
      },
      fontFamily: {
        'garamond': ['"EB Garamond"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
