import type { Address } from 'ton-core'

export type PostOffChain = {
  url: string
  date: Date
  author: Address
  contentMd: string
}
