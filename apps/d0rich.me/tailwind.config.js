/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@d0rich/nuxt-design-system/tailwind.config')],
  content: ['./{components,layouts,pages}/**/*.vue']
}
