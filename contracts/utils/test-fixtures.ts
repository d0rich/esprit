import { Address, Dictionary } from 'ton-core'
import { RegisterAccount } from '../wrappers/DSocialNetworkMaster'
import { NftMetadataAttribute } from '../wrappers/DSocialNetworkAccount'
import { DPostModel } from './stub-post-serialization'

export const registerTestAccountMessage: RegisterAccount = {
  $$type: 'RegisterAccount',
  query_id: 0n,
  account_name: 'test',
  account_description: 'Test account description'
}

const testNftAttributes = Dictionary.empty<bigint, NftMetadataAttribute>()
testNftAttributes.set(0n, {
  $$type: 'NftMetadataAttribute',
  trait_type: 'content',
  value: 'My first post'
})

export function getTestPostModel(
  author: Address,
  postContractAddress: Address,
  accountContractAddress: Address
): DPostModel {
  return {
    url: `https://d.d0rich.me/${accountContractAddress.toString()}/${postContractAddress.toString()}`,
    date: new Date(),
    author,
    contentMd: 'This is my first post on D'
  }
}
