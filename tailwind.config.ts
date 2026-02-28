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
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#fce635",
          500: "#fbe551",
          600: "#e4c73d",
          700: "#caa82a",
          800: "#a68b1e",
          900: "#857012",
          950: "#524607",
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
        soft: "0 4px 24px -4px rgba(251, 229, 81, 0.2), 0 8px 16px -6px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 12px 40px -8px rgba(251, 229, 81, 0.25), 0 4px 16px -4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
