import { serverQueryContent } from '#content/server'
import { savePdf } from '~~/server/utils/puppeteer'

// Add required routes to prerender in nuxt.config.ts
export default defineEventHandler(async (event) => {
  const fileName = getRouterParam(event, 'type.pdf')
  if (!fileName) throw new Error('File name not found')
  const spec = fileName
    .replace('.pdf', '')
    .replace('Nikolai_Dorofeev-', '')
    .replaceAll('_', ' ')
  const resume = await serverQueryContent(event, '/resume/leads')
    .where({
      title: spec
    })
    .only('_path' as const)
    .findOne()
  if (!resume._path) throw new Error('Resume not found')
  const pdf = await savePdf(resume._path.replace('/resume/leads', '/resume'))
  return pdf
})
