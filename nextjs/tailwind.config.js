/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    colors: {
      transparent: "transparent",
      blue: "#4763FF",
      red: "#C94040",
      orange: "#FF7B47",
      green: "#38C4B2",
      white: {
        text: "#2E2E2E",
        DEFAULT: "#ffffff",

        600: "#F9F9F9",
        800: "#979797",
      },
      black: {
        text: "#FCFCFC",
        DEFAULT: "#000000",

        600: "#1A1A1A",
        800: "#979797",
      },
    },
    fontFamily: {
      sans: ["rubik", "sans-serif"],
    },
  },
  plugins: [],
};
