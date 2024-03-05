/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@d0rich/esprit-design/tailwind.config')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch' // add required value here
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
}
