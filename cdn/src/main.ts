import { BrowserStore } from './store/browser'
import { saveAllResume } from './features/resume/saveAllResume'

async function main() {
  const browser = await BrowserStore.getBrowser()
  await saveAllResume()
  await browser.close()
}

main()
