import type { FileBeforeParseHook } from '@nuxt/content'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('mermaid.content.ts')
  nuxtApp.hooks.hook(
    // @ts-ignore
    'content:file:beforeParse',
    (ctx: FileBeforeParseHook) => {
      console.log('content:file:beforeParse', ctx)
      if (!useAppConfig().contentMermaid.enabled) return

      if (ctx.file.extension === 'md') {
        const mermaidCodeRegex = /```mermaid([\s\S]*?)```/gm
        ctx.file.body = ctx.file.body.replace(mermaidCodeRegex, (_, code) => {
          const encodedCode = Buffer.from(code.trim()).toString('base64')
          return `<mermaid code="${encodedCode}"></mermaid>`
        })
      }
    }
  )
})
