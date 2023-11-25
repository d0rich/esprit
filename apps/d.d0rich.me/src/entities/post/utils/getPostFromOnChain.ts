import { Address } from 'ton-core/dist/address/Address'
import type { PostOnChain, PostOffChain } from '../model'
import { etxChar, stxChar } from './symbols'

export function getPostFromOnChain(metadata: PostOnChain): PostOffChain {
  const modelJSON = metadata.description.split(etxChar)[0].split(stxChar)[1]
  const model: Record<keyof PostOffChain, string> = JSON.parse(modelJSON)
  return {
    ...model,
    date: new Date(model.date),
    author: Address.parseRaw(model.author)
  }
}
