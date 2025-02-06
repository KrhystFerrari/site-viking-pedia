/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EF4444", // Vermelho
        secondary: "#000000", // Preto
        accent: "#FFFFFF", // Branco
      },
    },
  },
  plugins: [],
}