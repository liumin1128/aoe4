import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        units: "rgb(130 79 52)",
        buildings: "rgb(52 84 105)",
        technologies: "rgb(50 128 107)",

        item: {
          map: "#3A5D7E",
          unit: "#824F34",
          "unit-light": "#C36B3C",
          upgrade: "#32806B",
          tech: "#32806B",
          technology: "#32806B",
          "upgrade-light": "#08A67B",
          "tech-light": "#08A67B",
          "technology-light": "#08A67B",
          building: "#345469",
          "building-light": "#477899",
          ability: "#5C457B",
          "ability-light": "#6571A1",
        },

        bar: {
          upgrade: "#B16239",
          base: "#A9A9A9",
          tech: "#32806B",
          technology: "#32806B",
          unique: "#AF944E",
          building: "#477899",
          bonus: "#5B5B5B",
          ability: "#20263D",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
