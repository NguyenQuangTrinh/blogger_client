/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        'h1': {
          fontSize: theme('fontSize.2xl'), fontWeight: theme("fontWeight.bold")
        },
        'h2': { fontSize: theme('fontSize.xl'),fontWeight: theme("fontWeight.bold") },
        'h3': { fontSize: theme('fontSize.lg'), fontWeight: theme("fontWeight.bold") },
      })
    })
  ],
}

