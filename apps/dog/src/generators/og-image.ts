import nodeHtmlToImage from 'node-html-to-image'
import { storage } from '../storage'

export interface OgImageOptions {
  title: string
  description: string
}

export async function getOgImageHtml(options: OgImageOptions) {
  const template = await storage.getItem('templates:og-image.html')
  if (!template) {
    throw new Error('Missing og:image HTML template')
  }
  const background = await storage.getItem('templates:background.svg')
  if (!background) {
    throw new Error('Missing og:image SVG background')
  }
  return template
    .toString()
    .replace('{{background}}', background.toString())
    .replace('{{title}}', options.title)
    .replace('{{description}}', options.description)
}

export async function getOgImageJpeg(options: OgImageOptions) {
  const html = await getOgImageHtml(options)
  const image = await nodeHtmlToImage({
    html,
    waitUntil: 'networkidle0',
    type: 'jpeg'
  })
  return image
}
