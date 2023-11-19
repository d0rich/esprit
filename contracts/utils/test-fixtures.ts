import { Address, Dictionary } from 'ton-core'
import { RegisterAccount } from '../wrappers/DSocialNetworkMaster'
import {
  MintNft,
  NftMetadataAttribute
} from '../wrappers/DSocialNetworkAccount'
import { DPost } from '../models'

export const registerTestAccountMessage: RegisterAccount = {
  $$type: 'RegisterAccount',
  query_id: 0n,
  account_name: 'test',
  account_description: 'Test account description'
  // account_metadata_json: JSON.stringify({
  //   image: 'https://d0rich.me/og/image.jpg',
  //   name: 'test',
  //   description: 'Test account description',
  //   social_links: ['https://d0rich.t.me']
  // })
}

const testNftAttributes = Dictionary.empty<bigint, NftMetadataAttribute>()
testNftAttributes.set(0n, {
  $$type: 'NftMetadataAttribute',
  trait_type: 'content',
  value: 'My first post'
})

export function getCreateTestPostMessage(author: Address): MintNft {
  return {
    $$type: 'MintNft',
    query_id: 0n,
    individual_content: DPost.serializePostData({
      url: 'https://d0rich.me',
      date: new Date(),
      author,
      content: 'This is my first post on D'
    })
  }
}
