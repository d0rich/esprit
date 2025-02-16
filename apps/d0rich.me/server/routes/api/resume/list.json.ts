// Add required routes to prerender in nuxt.config.ts
export default defineEventHandler(async (event) => {
  const resumeList = await queryCollection(event, 'resume')
    .select('path', 'title')
    .all()
  return resumeList.map((resume) => ({
    title: resume.title,
    path: resume.path?.replace('/resume/leads', '/resume')
  }))
})
