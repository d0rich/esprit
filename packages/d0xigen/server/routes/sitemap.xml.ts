import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async () => {
  // Fetch all documents
  const docs = await queryCollection('content').all()
  console.log(docs)
  const sitemap = new SitemapStream({
    hostname: useAppConfig().d0xigen.url
  })

  for (const doc of docs) {
    sitemap.write({
      url: doc.path,
      changefreq: 'monthly'
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})
