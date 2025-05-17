export default defineNuxtConfig({
  extends: ['@d0rich/nuxt-design-system'],

  imports: {
    autoImport: true
  },

  colorMode: {
    preference: 'light'
  },

  nitro: {
    prerender: {
      routes: [
        '/'
        // '/_d0rich/meta.json'
      ]
    }
  },

  compatibilityDate: '2024-12-02'
})
