import { BrowserStore } from './store/browser'
import { saveAllResume } from './features/resume/saveAllResume'
import { dist, publicFolder } from './store/dist'

async function main() {
  for (const file of await publicFolder.getKeys()) {
    await dist.setItemRaw(file, await publicFolder.getItemRaw(file))
  }
  const browser = await BrowserStore.getBrowser()
  await saveAllResume()
  await browser.close()
}

main()
