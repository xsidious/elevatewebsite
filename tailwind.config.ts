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
        primary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fde047",
          400: "#fcdb36",
          500: "#ffd700",
          600: "#e6c200",
          700: "#b39600",
          800: "#806b00",
          900: "#4d4000",
          950: "#1a1600",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-overlay": "linear-gradient(105deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 45%, transparent 70%)",
        "section-soft": "linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(255, 215, 0, 0.2), 0 8px 16px -6px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 12px 40px -8px rgba(255, 215, 0, 0.25), 0 4px 16px -4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
