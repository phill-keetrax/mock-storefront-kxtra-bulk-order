/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}", // Also check /src folder if you move files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}