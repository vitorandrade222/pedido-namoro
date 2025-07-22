/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // importante: para apps React
    "./public/index.html",
  ],
  theme: {
    extend: {
      animation: {
        pulseHeart: "pulseHeart 1.5s ease-in-out infinite",
      },
      keyframes: {
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" }, // Aumenta a pulsação
        }

      },
    },
  },
  plugins: [],
}
