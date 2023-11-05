import type { Mermaid } from 'mermaid'
// @ts-ignore 2307
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs'

declare module '#app' {
  interface NuxtApp {
    $mermaid: Mermaid | undefined
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $mermaid: Mermaid | undefined
  }
}

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  if (!appConfig.contentMermaid.enabled) {
    return {
      provide: {
        mermaid: undefined
      }
    }
  }
  if (appConfig.contentMermaid.color === '@nuxtjs/color-mode') {
    try {
      // @ts-ignore
      const colorMode = useColorMode()
      mermaid.initialize({
        startOnLoad: false,
        theme: colorMode.value
      })

      watch(colorMode, (mode) => {
        mermaid.initialize({
          theme: mode.value
        })
      })
    } catch (e) {
      throw new Error(
        '@nuxtjs/color-mode is required with current options for mermaid plugin.'
      )
    }
  } else {
    mermaid.initialize({
      startOnLoad: false
    })
  }

  return {
    provide: {
      mermaid: mermaid as Mermaid | undefined
    }
  }
})
