/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        indoss: {
          charcoal: "#232323", // text, strong anchors
          orange: "#F6921E",   // CTA, highlights
          aqua: "#8DB1B2",     // accents, cards
          beige: "#EFDCA2",    // soft backgrounds
          teal: "#0A3F40",     // deep sections, footer
          mist: "#F6F7F7",     // main background
        },
      },
      fontFamily: {
        serif: ['"Adobe Caslon Pro"', '"Playfair Display"', "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.08)",
        glow: "0 0 0 1px rgba(246,146,30,0.5), 0 18px 45px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "morse-pattern":
          "radial-gradient(circle at 2px 2px, rgba(246,146,30,0.35) 2px, transparent 0)",
      },
    },
  },
  plugins: [],
};
