/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3FA7E1',
        primaryDark: '#3795CA',
        primaryLight: '#6BBBE8',
      },
      backgroundImage: {
        'blue-banner': "url('/src/assets/images/blueBackground.png')",
      },
    },
  },
  plugins: [],
}
