import nodeHtmlToImage from 'node-html-to-image'

const bufferCache = new Map<string, Buffer>()

export async function getOgImageHtml() {
  const appConfig = useAppConfig()
  const storage = useStorage('assets:server')
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
    .replace('{{title}}', appConfig.d0xigen.title)
    .replace('{{description}}', appConfig.d0xigen.description)
}

export async function getOgImageJpeg() {
  if (bufferCache.has('og-image.jpeg')) {
    return bufferCache.get('og-image.jpeg')!
  }
  const html = await getOgImageHtml()
  const image = await nodeHtmlToImage({
    html,
    waitUntil: 'networkidle0',
    type: 'jpeg'
  })
  bufferCache.set('og-image.jpeg', image as Buffer)
  return image
}
