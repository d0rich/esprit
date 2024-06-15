import { BrowserStore } from '../../store/browser'

export async function getResumePdf(path: string) {
  const browser = await BrowserStore.getBrowser()
  const page = await browser.newPage()
  await page.goto('http://d0rich.me' + path, {
    waitUntil: 'networkidle0'
  })
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
  await page.close()
  return pdf
}
