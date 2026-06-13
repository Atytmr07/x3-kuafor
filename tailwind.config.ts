import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ivory Editorial palette
        canvas: "#FAF8F5", // warm ivory
        linen: "#F3EFE9", // surface / cards
        putty: "#EDE8E1", // surface alt (accent sections)
        ink: "#1A1714", // primary text — near-black warm
        taupe: "#7A7269", // muted text
        rosegold: "#B8956A", // accent / rose gold
        mauve: "#9B7FA6", // dusty mauve accent
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderColor: {
        ink: "rgba(26,23,20,0.10)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
