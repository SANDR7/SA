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
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
    screens: {
      mobile: "320px",
      // => @media (min-width: 640px) { ... }
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      sans: ["rubik", "sans-serif"],
    },
  },
  plugins: [],
};
