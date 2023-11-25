import type { PostOnChain, PostOffChain } from '../model'
import { useAppConfig } from '../../../shared/composables/useAppConfig'
import { etxChar, stxChar } from './symbols'

const config = useAppConfig()

export function convertPostToOnChain(model: PostOffChain): PostOnChain {
  const name = `Post on D from ${model.date.toLocaleDateString(
    'de-DE'
  )} by ${model.author.toRawString()}`
  const stringBuilder: string[] = []
  stringBuilder.push(`Posted: ${model.date.toLocaleDateString('de-DE')}`)
  stringBuilder.push(`Author: ${model.author.toString()}`)
  stringBuilder.push(`See on D: ${model.url}`)
  stringBuilder.push('')
  // TODO: Convert markdown to plain text
  stringBuilder.push(model.contentMd)
  stringBuilder.push('', '', '')
  stringBuilder.push('===== Technical information =====')
  stringBuilder.push(
    `${stxChar}${JSON.stringify({
      url: model.url,
      date: model.date.toISOString(),
      author: model.author.toRawString(),
      contentMd: model.contentMd
    })}${etxChar}`
  )
  return {
    $$type: 'NftMetadata',
    image: `https://${
      config.network === 'TESTNET' ? 'testnet.' : ''
    }d.d0rich.me/metadata/covers/post.jpg`,
    name,
    description: stringBuilder.join('\n')
  }
}
