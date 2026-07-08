/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0A0F1D",
        cardBg: "#111827",
        tealGlow: "#00e6b4",
        cyanGlow: "#06B6D4",
      },
    },
  },
  plugins: [],
}
