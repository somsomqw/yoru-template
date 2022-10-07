/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        112: "28rem",
        128: "32rem",
        256: "64rem",
        268: "68rem",
      },
    },
  },
  plugins: [],
};
