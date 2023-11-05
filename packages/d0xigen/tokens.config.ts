import { defineTheme } from 'pinceau'

export default defineTheme({
  // @ts-ignore
  typography: {
    font: {
      body: 'var(--tw-typography-font-sans)',
      code: 'var(--tw-typography-font-mono)',
      display: 'var(--tw-typography-font-sans)'
    }
  },
  prose: {
    img: {
      borderRadius: '{typography.radii.none}'
    }
  }
})
