import { defineTheme } from 'pinceau'

export default defineTheme({
  typography: {
    font: {
      body: 'var(--tw-typography-font-serif)',
      code: 'var(--tw-typography-font-mono)',
      display: 'var(--tw-typography-font-serif)'
    }
  },
  prose: {
    img: {
      borderRadius: '{typography.radii.none}'
    }
  }
})
