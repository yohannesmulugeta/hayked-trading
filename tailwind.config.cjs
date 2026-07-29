/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hayked: {
          950: '#07231c',
          900: '#0b3027',
          800: '#103d32',
          700: '#175745',
          gold: '#c69a50',
          cream: '#f7f3ea'
        }
      }
    }
  },
  plugins: []
};
