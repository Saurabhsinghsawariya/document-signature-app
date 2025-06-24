/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
