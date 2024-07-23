/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        border_2: "#d4d4d4"
      }, 
      screens: {
        xs: "475px",
        xxs: "375px",
        mlg: "850px",
      }
    },
  },
  plugins: [],
}