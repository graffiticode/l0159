/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./lib/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        fall: 'fall 3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
