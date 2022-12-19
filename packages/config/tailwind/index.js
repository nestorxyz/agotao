/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        black: "#1E1E1E",
        primary: "#694FFF",
      },
    },
  },
  plugins: [],
};
