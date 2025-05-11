import VueGtag from 'vue-gtag'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    config: { id: 'G-5CD4H1LHBZ' }
  })
})
