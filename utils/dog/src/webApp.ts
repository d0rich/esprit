import { run } from '@backroad/backroad'
import { getFaviconIco, getOgImageJpeg } from './generators/index.js'
import { bufferToImgSrc } from './utils/bufferToImgSrc.js'

export function runWebGenerator() {
  run((br) => {
    br.title({
      label: '🐶Dog'
    })
    br.write({
      body: `
# 🐶Dog: Generate OG images

[backroad](https://backroad.sudomakes.art/) doesn't support a lot of usefull features yet.

You need to reaload page in order to see the generated images.
You might want to use CLI instead.
`
    })
    const [col1, col2] = br.columns({ columns: 2 })
    const title = col1.textInput({
      label: 'Title',
      placeholder: 'My awesome docs'
    })
    const description = col1.textInput({
      label: 'Description',
      placeholder: '💪Understand the power of d0xigen'
    })
    const faviconSrc = br.getOrDefault('favicon', null)
    const ogImageSrc = br.getOrDefault('ogImage', null)
    const generate = col1.button({
      label: 'Generate'
    })
    if (faviconSrc) {
      col2.image({
        src: faviconSrc,
        label: 'Favicon'
      })
    }
    if (ogImageSrc) {
      col2.image({
        src: ogImageSrc,
        label: 'OG Image'
      })
    }
    if (generate) {
      br.setValue('favicon', null)
      br.setValue('ogImage', null)
      getOgImageJpeg({ title, description }).then((res) =>
        br.setValue('ogImage', bufferToImgSrc(res as Buffer))
      )
      getFaviconIco({ title }).then((res) =>
        br.setValue('favicon', bufferToImgSrc(res, 'ico'))
      )
    }
  })
}
