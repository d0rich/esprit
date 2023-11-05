import nodeHtmlToImage from 'node-html-to-image'
import pngToIco from 'png-to-ico'

const bufferCache = new Map<string, Buffer>()

export async function getFaviconHtml() {
  const appConfig = useAppConfig()
  const storage = useStorage('assets:server')
  const template = await storage.getItem('templates:favicon.html')
  if (!template) {
    throw new Error('Missing favicon HTML template')
  }
  const background = await storage.getItem('templates:favicon.svg')
  if (!background) {
    throw new Error('Missing favicon SVG background')
  }
  return template
    .toString()
    .replace('{{background}}', background.toString())
    .replace('{{signature}}', appConfig.d0xigen.title[0])
}

export async function getFaviconPng() {
  if (bufferCache.has('favicon.png')) {
    return bufferCache.get('favicon.png')!
  }
  const html = await getFaviconHtml()
  const png = await nodeHtmlToImage({
    html,
    waitUntil: 'networkidle0',
    type: 'png',
    transparent: true
  })
  bufferCache.set('favicon.png', png as Buffer)
  return png
}

export async function getFaviconIco() {
  if (bufferCache.has('favicon.ico')) {
    return bufferCache.get('favicon.ico')!
  }
  const ico = await pngToIco(await getFaviconPng())
  bufferCache.set('favicon.ico', ico as Buffer)
  return ico
}
