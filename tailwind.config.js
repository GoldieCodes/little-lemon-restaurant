/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      yellow: "#F4CE14",
      green: "#495E57",
      ash: "#EDEFEE",
      dark: "#333333",
      pinkish: "#FBDABB",
      brownish: "#EE9972",
    },
    fontFamily: {
      sans: ["var(--font-karla)"],
      serif: ["var(--font-markazi)"],
    },
    fontSize: {
      "3xl": "4rem",
      "2xl": "2.5rem",
      xs: "13px",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
  },
  plugins: [],
}
