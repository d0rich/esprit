import { tmpStorage } from "./storage";
import { getFaviconIco, getOgImageJpeg } from "./generators";

async function main() {
  const favicon = await getFaviconIco({ title: 'D' })
  await tmpStorage.setItemRaw('favicon.ico', favicon)
  const ogImage = await getOgImageJpeg({ title: 'Dog', description: 'Generate OG images' })
  await tmpStorage.setItemRaw('og-image.jpeg', ogImage)
}

main()
