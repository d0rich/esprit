// @ts-expect-error
import VueDisqus from 'vue-disqus'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDisqus, {
    shortname: 'd0rich-me'
  })
})
