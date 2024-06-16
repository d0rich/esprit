import { serverQueryContent } from '#content/server'

// Add required routes to prerender in nuxt.config.ts
export default defineEventHandler(async (event) => {
  const resumeList = await serverQueryContent(event, '/resume/leads')
    .only(['_path' as const, 'title' as const])
    .find()
  return resumeList.map((resume) => ({
    title: resume.title,
    path: resume._path?.replace('/resume/leads', '/resume')
  }))
})
