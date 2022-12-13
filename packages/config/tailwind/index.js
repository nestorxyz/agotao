/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        black: "#0A0B0D",
        primary: "#694FFF",
      },
    },
  },
  plugins: [],
};
