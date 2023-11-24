import { Address } from 'ton-core'
import {
  DSocialNetworkPost,
  type NftMetadata
} from '@d0rich/contracts/wrappers/DSocialNetworkPost'

export type DPostModel = {
  url: string
  date: Date
  author: Address
  contentMd: string
}

/** Start of text symbol */
const stxChar = String.fromCharCode(2)
/** End of text symbol */
const etxChar = String.fromCharCode(3)

export class DPost {
  model?: DPostModel

  // eslint-disable-next-line no-useless-constructor
  constructor(public readonly contract: DSocialNetworkPost) {}

  static serializePostData(model: DPostModel): NftMetadata {
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
      image: 'https://d.d0rich.me/metadata/.jpg',
      name,
      description: stringBuilder.join('\n')
    }
  }

  static deserializePostData(metadata: NftMetadata): DPostModel {
    const modelJSON = metadata.description.split(etxChar)[0].split(stxChar)[1]
    const model: DPostModel = JSON.parse(modelJSON)
    model.date = new Date(model.date)
    model.author = Address.parseRaw(model.author as unknown as string)
    return model
  }
}
