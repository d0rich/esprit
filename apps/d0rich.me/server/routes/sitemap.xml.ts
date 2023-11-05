import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'
import { useBlogNavigationConfig } from '~~/composables/navigation'
import { addTrailingSlash } from '~/utils/seo'

export default defineEventHandler(async (event) => {
  const config = useBlogNavigationConfig()
  // Fetch all documents
  const blogDocs = await serverQueryContent(event, '/blog')
    .where(config.filter)
    .find()
  const resumeDocs = await serverQueryContent(event, '/resume/leads')
    .where(config.filter)
    .find()
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
    if (typeof doc._path === 'undefined') {
      continue
    }
    sitemap.write({
      url: addTrailingSlash(doc._path),
      changefreq: 'monthly'
    })
  }
  for (const doc of resumeDocs) {
    if (typeof doc._path === 'undefined') {
      continue
    }
    sitemap.write({
      url: addTrailingSlash(doc._path.replace('/resume/leads', '/resume')),
      changefreq: 'monthly'
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})
