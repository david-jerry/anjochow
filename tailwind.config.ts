import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xxs: '325px',
        ...defaultTheme.screens
      },
      fontSize: {
        xxs: '0.55rem',
        s: "0.65rem",
        ...defaultTheme.fontSize
      },
      fontFamily: {
        cursive: ['var(--font-cs)'],
        bfo: ['var(--font-bfo)'],
      },
      colors: {
        primary: "#D62402",
        secondary: "#FFC533",
        lightBg: "#F1F6F9",
        lightText: "#212A3E",
        lightTextSec: "#394867",
        darkBg: "#070F2B",
        darkText: "#F2EFE5",
        darkTextSec: "#C7C8CC",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
};
export default config;
