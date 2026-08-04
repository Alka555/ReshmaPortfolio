import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",     // Mobile <768, Tablet 768-1023
      lg: "1024px",    // Desktop >=1024
      xl: "1280px",
      "2xl": "1400px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--color-midnight)",
        foreground: "var(--color-white)",
        midnight: {
          DEFAULT: "#08233a",
          900: "#0f375c",
        },
        navy: {
          DEFAULT: "#0e2f53",
          surface: "#0c2a4a",
        },
        gold: {
          DEFAULT: "#9FD0FF",
          hover: "#CDEEFF",
          dark: "#5E93C9",
          muted: "#9FD0FF33",
        },
        muted: {
          DEFAULT: "#8A94A6",
          foreground: "#8A94A6",
        },
        primary: {
          DEFAULT: "#1D4E7A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#101827",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        accent: {
          DEFAULT: "#9FD0FF",
          foreground: "#1D4E7A",
        },
        card: {
          DEFAULT: "#101827",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        "cinematic": "0 20px 40px -15px rgba(0,0,0,0.5)",
        "gold-glow": "0 0 40px -10px rgba(212, 175, 55, 0.15)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "28": "7rem",
        "32": "8rem",
        "40": "10rem",
        "48": "12rem",
      },
      fontFamily: {
        heading: ["var(--font-general-sans)", "Playfair Display", "Clash Display", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      transitionDuration: {
        fast: "300ms",
        medium: "500ms",
        slow: "800ms",
        cinematic: "1200ms",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.19, 1, 0.22, 1)",
        "slow-ease": "cubic-bezier(0.4, 0, 0, 1)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "blur-reveal": {
          "0%": { opacity: "0", filter: "blur(12px)", transform: "scale(1.05)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "scale(1)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "fade-in": "fade-in 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "blur-reveal": "blur-reveal 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "slow-zoom": "slow-zoom 10s linear infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
