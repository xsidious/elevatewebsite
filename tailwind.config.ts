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
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
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
        soft: "0 4px 24px -4px rgba(245, 158, 11, 0.12), 0 8px 16px -6px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 12px 40px -8px rgba(245, 158, 11, 0.18), 0 4px 16px -4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
