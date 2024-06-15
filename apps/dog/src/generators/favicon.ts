import nodeHtmlToImage from 'node-html-to-image'
import pngToIco from 'png-to-ico'
import { storage } from '../storage'

export interface FaviconOptions {
  title: string
}

export async function getFaviconHtml(options: FaviconOptions) {
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
    .replace('{{signature}}', options.title[0])
}

export async function getFaviconPng(options: FaviconOptions) {
  const html = await getFaviconHtml(options)
  const png = await nodeHtmlToImage({
    html,
    waitUntil: 'networkidle0',
    type: 'png',
    transparent: true
  })
  return png
}

export async function getFaviconIco(options: FaviconOptions) {
  const ico = await pngToIco(await getFaviconPng(options))
  return ico
}
