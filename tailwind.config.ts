import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a3558",
          50: "#f0f4f9",
          100: "#d9e4f0",
          200: "#b3c9e1",
          300: "#7aa3cc",
          400: "#4a7db5",
          500: "#2d5f9a",
          600: "#1a3558",
          700: "#152c49",
          800: "#0f2038",
          900: "#0a1628",
        },
        red: {
          austria: "#c8102e",
          "austria-dark": "#a50d25",
          "austria-light": "#e8192f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(26,53,88,0.08)",
        "card-hover": "0 8px 32px 0 rgba(26,53,88,0.16)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0a1628 0%, #1a3558 50%, #2d5f9a 100%)",
        "section-gradient": "linear-gradient(180deg, #f0f4f9 0%, #ffffff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
