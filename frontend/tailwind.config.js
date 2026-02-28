/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      maxWidth: {
        '300': '300px',
        '400': '400px',
      },
      height: {
        '125': '31.25rem',
        '150': '37.5rem',
      },
    },
  },
  plugins: [],
}
