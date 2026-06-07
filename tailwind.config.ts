import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        rosewood: "#8f3f54",
        blush: "#fff1f4",
        sage: "#6f8f7d"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(31, 41, 51, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
