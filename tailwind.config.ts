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
        primary:  "#f72a42",
        accent:   "#FF6A13",
        secondary: "#d7d7d3",
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        premium: ["var(--font-pt-sans-narrow)", "PT Sans Narrow", "sans-serif"],
        exo:     ["var(--font-exo)", "Exo", "sans-serif"],
      },
      backgroundImage: {
        "glass":       "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "brand-grad":  "linear-gradient(135deg, #f72a42 0%, #FF6A13 100%)",
      },
      boxShadow: {
        glow:           "0 0 20px rgba(247, 42, 66, 0.4)",
        "glow-lg":      "0 0 40px rgba(247, 42, 66, 0.5)",
        "glow-accent":  "0 0 20px rgba(255, 106, 19, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
