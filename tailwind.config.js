/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Sans-serif'],
    },
    extend: {
      colors: {
        primary: '#3FA7E1',
        primaryDark: '#3795CA',
        primaryLight: '#6BBBE8',
        agileGreen: '#30B110',
        agileRed: '#EE2222',
        agileBlue: '#3FA7E1',
      },
      backgroundImage: {
        'blue-banner': "url('/src/assets/images/blueBackground.png')",
      },
    },
  },
  plugins: [],
}
