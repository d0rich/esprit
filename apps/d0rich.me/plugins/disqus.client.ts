// @ts-expect-error
import VueDisqus from 'vue-disqus'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDisqus, {
    shortname: 'd0rich-me'
  })
})
