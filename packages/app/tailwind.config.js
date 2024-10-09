/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./lib/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
