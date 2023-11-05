export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook(
    'content:file:beforeParse',
    (file: { _id: string; body: string }) => {
      if (!useAppConfig().contentMermaid.enabled) return

      if (file._id.endsWith('.md')) {
        const mermaidCodeRegex = /```mermaid([\s\S]*?)```/gm
        file.body = file.body.replace(mermaidCodeRegex, (_, code) => {
          const encodedCode = Buffer.from(code.trim()).toString('base64')
          return `<mermaid code="${encodedCode}"></mermaid>`
        })
      }
    }
  )
})
