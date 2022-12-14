/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebarBlue: "#150050",
        sidebarHover: "#220181",
        sidebarActive: "#0b002b",
      },
      height: {
        132: "46rem",
        131: "45rem",
        130: "40rem",
        128: "36rem",
        125: "32rem",
      },
      width: {
        128: "50rem",
      },
    },
  },
  plugins: [],
};
