/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indoss: {
          ink: "#232323",
          accent: "#F6921E",
          teal: "#0A3F40",
          aqua: "#8DB1B2",
          sand: "#EFDCA2",
          mist: "#F6F7F7",
        },
      },
      fontFamily: {
        display: ["'Adobe Caslon Pro'", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 40px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
