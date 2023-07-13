/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#1DA1F2",
          dark: "#1A91DA",
          light: "#A8DDEA",
        },
        gray: {
          dark: "#657786",
          light: "#AAB8C2",
          extraLight: "#E1E8ED",
          lightest: "#F5F8FA",
        },
        black: {
          black: "#14171A",
        },
      },
    },
  },
  plugins: [],
};
