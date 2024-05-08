/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5955DF",
      },
      backgroundImage: {
        "starting-banner": 'url("/banner-image.jpg")',
      },
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        robotoSlab: ["Roboto Slab", "sans-serif"],
      },
    },
  },
  plugins: [],
};
