import * as fs from 'fs'
import { parse } from 'node-html-parser'
import { launch } from 'puppeteer'

export async function fetchPageWithCss(path: string) {
  const html = await $fetch<string>(path)
  const parsedHtml = parse(html)
  const head = parsedHtml.querySelector('head')
  if (!head) throw new Error('<head> tag is not found')
  const cssRels = head.querySelectorAll('link')
  for (const cssRel of cssRels) {
    const href = cssRel.getAttribute('href')
    if (!href?.endsWith('.css')) continue
    const style = fs.readFileSync('./.nuxt/dist/client' + href, {
      encoding: 'utf-8'
    })
    head.appendChild(parse(`<style>${style}</style>`))
  }
  // Add Roboto Slab from Google fonts
  head.appendChild(
    parse('<link rel="preconnect" href="https://fonts.googleapis.com">')
  )
  head.appendChild(
    parse(
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    )
  )
  head.appendChild(
    parse(
      '<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">'
    )
  )
  return parsedHtml.toString()
}

export async function savePdf(path: string) {
  const browser = await launch({ headless: true })
  const page = await browser.newPage()
  if (useRuntimeConfig().public.isDev) {
    // If in development mode
    await page.goto('http://localhost:3000' + path, {
      waitUntil: 'networkidle0'
    })
  } else {
    // If prerender
    await page.setContent(await fetchPageWithCss(path), {
      waitUntil: ['domcontentloaded', 'networkidle0']
    })
  }
  await page.emulateMediaType('print')
  await page.evaluate(() => {
    const html = document.querySelector('html')
    if (html) {
      html.className = 'light'
      html.querySelectorAll('a').forEach((a) => {
        const href = a.getAttribute('href')
        if (!href) return
        if (href.startsWith('/')) a.href = 'https://d0rich.me' + href
      })
    }
  })
  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4'
  })
  await browser.close()
  return pdf
}
