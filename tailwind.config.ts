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
          50: "#faf0f2",
          100: "#f5e0e5",
          200: "#ecc4ce",
          300: "#df9aab",
          400: "#cc6b84",
          500: "#86223c",
          600: "#751e35",
          700: "#62192d",
          800: "#4f1424",
          900: "#3c101c",
          950: "#260912",
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
        soft: "0 4px 24px -4px rgba(134, 34, 60, 0.08), 0 8px 16px -6px rgba(134, 34, 60, 0.04)",
        "soft-lg": "0 12px 40px -8px rgba(134, 34, 60, 0.12), 0 4px 16px -4px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
