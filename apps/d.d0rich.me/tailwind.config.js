/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@d0rich/esprit-design/tailwind.config')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography')]
}
