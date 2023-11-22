import { Address } from 'ton-core'
import { NftMetadata } from '../wrappers/DSocialNetworkPost'

/** Start of text symbol */
const stxChar = String.fromCharCode(2)
/** End of text symbol */
const etxChar = String.fromCharCode(3)

export type DPostModel = {
  url: string
  date: Date
  author: Address
  contentMd: string
}

export function stringifyPostModel(
  model: DPostModel
): Record<keyof DPostModel, string> {
  return {
    ...model,
    date: model.date.toISOString(),
    author: model.author.toRawString()
  }
}

export function serializePostData(model: DPostModel): NftMetadata {
  const name = `Post on D from ${model.date.toLocaleDateString(
    'de-DE'
  )} by ${model.author.toRawString()}`
  const stringBuilder: string[] = []
  stringBuilder.push(`Posted: ${model.date.toLocaleDateString('de-DE')}`)
  stringBuilder.push(`Author: ${model.author.toString()}`)
  stringBuilder.push(`See on D: ${model.url}`)
  stringBuilder.push('')
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
    image: 'https://d.d0rich.me/metadata/covers/post.jpg',
    name,
    description: stringBuilder.join('\n')
  }
}

export function deserializePostData(metadata: NftMetadata): DPostModel {
  const modelJSON = metadata.description.split(etxChar)[0].split(stxChar)[1]
  const model: DPostModel = JSON.parse(modelJSON)
  model.date = new Date(model.date)
  model.author = Address.parseRaw(model.author as unknown as string)
  return model
}
