/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./src/_app.tsx",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1E1E1E",
        primary: {
          DEFAULT: "#694fff",
          50: "#f3f2ff",
          100: "#e8e8ff",
          200: "#d4d4ff",
          300: "#b6b1ff",
          400: "#9185ff",
          500: "#694fff",
          600: "#5a30f7",
          700: "#4c1ee3",
          800: "#3f18bf",
          900: "#35169c",
        },
        secondary: "FF4FCB",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
