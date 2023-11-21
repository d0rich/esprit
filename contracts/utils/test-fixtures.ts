import { Address, Dictionary } from 'ton-core'
import { CreateBlog } from '../wrappers/DSocialNetworkMaster'
import { NftMetadataAttribute } from '../wrappers/DSocialNetworkBlog'
import { DPostModel } from './stub-post-serialization'

export const registerTestAccountMessage: CreateBlog = {
  $$type: 'CreateBlog',
  query_id: 0n,
  blog_name: 'test',
  blog_description: 'Test account description'
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
  blogContractAddress: Address
): DPostModel {
  return {
    url: `https://d.d0rich.me/${blogContractAddress.toString()}/${postContractAddress.toString()}`,
    date: new Date(),
    author,
    contentMd: 'This is my first post on D'
  }
}
