/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FE8C00",
        heading: "#101010",
        para1: "#878787", 
      },
      fontSize: {
        h1: '32px',
      },
      lineHeight: {
        lead1: 40,
      },
      borderColor: {
        border_1: "#EDEDED",
        border_2:"#d4d4d4"
      },
      fontFamily: {
        inter_400: "Inter-Regular",
        inter_500: "Inter-Medium",
        inter_600: "Inter-SemiBold",
        inter_700: "Inter-Bold",
        inter_800: "Inter-ExtraBold",
        inter_black: "Inter-Black",
      }
    },
  },
  plugins: [],
}

