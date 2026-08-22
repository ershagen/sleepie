import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sleepie: {
          black: "#0a0a0a",
          offwhite: "#fafaf9",
          white: "#ffffff",
          /** Brand sage — logo + soft accents */
          green: {
            DEFAULT: "#6B8F71",
            light: "#8AAB90",
            dark: "#557A5C",
            muted: "#E8F0E9",
          },
          gray: {
            50: "#f7f7f6",
            100: "#efefed",
            200: "#e4e4e1",
            300: "#d1d1cd",
            400: "#a3a39d",
            500: "#73736e",
            600: "#52524e",
            700: "#3d3d3a",
            800: "#262624",
            900: "#171716",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        tighter: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
