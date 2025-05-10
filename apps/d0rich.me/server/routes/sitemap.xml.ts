import { SitemapStream, streamToPromise } from 'sitemap'
import { addTrailingSlash } from '~/utils/seo'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const blogDocs = await queryCollection(event, 'blog')
    .where('draft', '=', 0)
    .all()
  const sitemap = new SitemapStream({
    hostname: 'https://d0rich.me'
  })
  sitemap.write({
    url: '/',
    changefreq: 'monthly'
  })
  sitemap.write({
    url: '/projects/',
    changefreq: 'monthly'
  })
  sitemap.write({
    url: '/blog/',
    changefreq: 'monthly'
  })
  for (const doc of blogDocs) {
    if (typeof doc.path === 'undefined') {
      continue
    }
    sitemap.write({
      url: addTrailingSlash(doc.path),
      changefreq: 'monthly'
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})
