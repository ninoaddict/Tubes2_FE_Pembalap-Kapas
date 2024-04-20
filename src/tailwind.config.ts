import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#BB86FC",
        onPrimary: "#000000",
        primaryVariant: "#3700B3",
        secondary: "#03DAC6",
        onSecondary: "#000000",
        background: "#121212",
        surface: "#121212",
        error: "#CF6679",
        onBackground: "#E9E9E9",
        onSurface: "#E9E9E9",
        onError: "#000000",
        kuning: "#FFEE00",
      },
      fontFamily: {
        "linux-libertine": "Linux Libertine",
      },
    },
  },
  plugins: [],
};
export default config;
