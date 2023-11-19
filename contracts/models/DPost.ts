import { Address } from 'ton-core'
import { DSocialNetworkPost, NftMetadata } from '../wrappers/DSocialNetworkPost'

export type DPostModel = {
  url: string
  date: Date
  author: Address
  content: string
}

const nullChar = String.fromCharCode(0)
/** Start of heading symbol */
const sohChar = String.fromCharCode(1)
/** Start of text symbol */
const stxChar = String.fromCharCode(2)
/** End of text symbol */
const etxChar = String.fromCharCode(3)
/** End of query symbol */
const enqChar = String.fromCharCode(5)

export class DPost {
  model?: DPostModel

  // eslint-disable-next-line no-useless-constructor
  constructor(public readonly contract: DSocialNetworkPost) {}

  static serializePostData(model: DPostModel): NftMetadata {
    const name = `Post on D from ${model.date.toLocaleDateString('de-DE')} by ${model.author.toRawString()}`
    const stringBuilder: string[] = []
    stringBuilder.push(`${nullChar}Posted: ${model.date.toLocaleDateString('de-DE')}`)
    stringBuilder.push(`${nullChar}Author: ${model.author.toRawString()}`)
    stringBuilder.push(`${nullChar}See on D: ${model.url}`)
    stringBuilder.push(nullChar)
    stringBuilder.push(`${stxChar}${model.content}${etxChar}`)
    stringBuilder.push(nullChar)
    stringBuilder.push(nullChar)
    stringBuilder.push(`${nullChar}=== Technical information ===`)
    stringBuilder.push(nullChar)
    stringBuilder.push(nullChar)
    stringBuilder.push(`${sohChar}${JSON.stringify({
      url: model.url,
      date: model.date.toISOString(),
      author: model.author.toRawString(),
      content: model.content
    })}${enqChar}`)
    return {
      $$type: 'NftMetadata',
      image: 'https://d0rich.me/og/image.jpg',
      name,
      description: stringBuilder.join('\n')
    }
  }

  static deserializePostData(metadata: NftMetadata): DPostModel {
    const modelJSON = metadata.description.split(enqChar)[0].split(sohChar)[1]
    const model: DPostModel = JSON.parse(modelJSON)
    model.date = new Date(model.date)
    model.author = Address.parseRaw(model.author as unknown as string)
    return model
  }
}
