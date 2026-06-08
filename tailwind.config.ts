import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        rosewood: "#0E2A24",
        blush: "#F7F2E8",
        sage: "#7FA99B",
        emeraldPremium: "#0F8A6C",
        champagne: "#E8D7B9"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(14, 42, 36, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
