/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundPosition: {
        "position-4": "40% 50vh, top left, center right, center top",
        "position-5": "60% 80vh, top left, center right",
      },
      screens: {
        xs: "475px",
      },
    },
    colors: {
      yellow: "#F4CE14",
      green: "#495E57",
      ash: "#EDEFEE",
      dark: "#333333",
      pinkish: "#FBDABB",
      brownish: "#EE9972",
      orange: "#ff9100",
    },
    fontFamily: {
      sans: ["var(--font-karla)"],
      serif: ["var(--font-markazi)"],
    },
    fontSize: {
      "3xl": "4.5rem",
      "2xl": "2.7rem",
      xs: "14px",
      sm: "1rem",
      base: "1.2rem",
      lg: "1.5rem",
      xl: "2rem",
    },
  },
  plugins: [],
}
