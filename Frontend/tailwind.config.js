/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mypurple: {
          300: "#e0e7fe",
          500: "#3e38a7",
          600: "#5046e4",
        },
        myBg: {
          100: "#eeeeef",
          300: "#e6e9ed",
          600: "#95989c",
        },
      },
    },
  },
  plugins: [],
};
