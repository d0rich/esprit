import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    config: { id: useAppConfig().d0xigen.features?.gtag?.id ?? '' }
  })
})
