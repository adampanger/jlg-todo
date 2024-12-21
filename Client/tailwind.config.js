/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        todo: {
          bg: "#282828",
          itembg: "#3C3C3C",
          text: "#ff8000",
          accent: "#47c7fc",
          light: "#e2e2e2",
        },
      },
    },
  },
  plugins: [],
};
