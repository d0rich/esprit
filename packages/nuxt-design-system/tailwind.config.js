/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@d0rich/esprit-design/tailwind.config')],
  plugins: [
    require('@tailwindcss/typography'),
    require('./plugins/tailwind/nuxt-typography')
  ]
}
