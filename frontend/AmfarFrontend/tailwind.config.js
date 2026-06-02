/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amfar: {
          gold: "#D9A441",
          goldDark: "#8B6914",
          goldLight: "#E8C46A",
          black: "#111111",
          grayBg: "#F2F2F2",
        }
      }
    },
  },
  plugins: [],
}
