export default defineNuxtConfig({
  extends: ['@d0rich/nuxt-design-system'],
  colorMode: {
    preference: 'light'
  },
  nitro: {
    prerender: {
      routes: ['/_d0rich/meta.json']
    }
  }
})
