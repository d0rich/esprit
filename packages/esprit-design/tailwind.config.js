const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', '"Noto Color Emoji"', ...defaultTheme.fontFamily.sans],
      serif: [
        '"Roboto Slab"',
        '"Noto Color Emoji"',
        ...defaultTheme.fontFamily.sans
      ],
      mono: [
        '"JetBrains Mono"',
        '"Noto Color Emoji"',
        ...defaultTheme.fontFamily.mono
      ],
      dialog: ['Arsenal', '"Noto Color Emoji"']
    },
    extend: {
      screens: {
        print: { raw: 'print' }
      }
    }
  },
  plugins: [require('./plugins/shadows')]
}
