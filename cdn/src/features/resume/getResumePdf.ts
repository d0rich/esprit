import { BrowserStore } from '../../store/browser'
import { config } from '../../config'
import { consola } from 'consola'

export async function getResumePdf(path: string) {
  const browser = await BrowserStore.getBrowser()
  const page = await browser.newPage()
  await page.goto(config.MAIN_BASE_URL + path, {
    waitUntil: 'domcontentloaded'
  })
  consola.debug('Page loaded: ', config.MAIN_BASE_URL + path)
  await page.emulateMediaType('print')
  consola.debug('Emulated media type: print')
  await page.evaluate(() => {
    const html = document.querySelector('html')
    if (html) {
      html.className = 'light'
    }
  })
  consola.debug('Page evaluated')
  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4',
    margin: {
      top: '1cm',
      bottom: '1cm'
    }
  })
  consola.debug('PDF generated')
  await page.close()
  return pdf
}
