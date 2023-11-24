import { Address } from 'ton-core'
import { MintNft } from '../wrappers/DSocialNetworkMaster'
import { DPostModel } from './stub-post-serialization'

export const createBlogMessage: MintNft = {
  $$type: 'MintNft',
  query_id: 0n,
  individual_content: {
    $$type: 'NftMetadata',
    name: 'Test blog',
    description: 'Test blog description',
    image: 'https://d.d0rich.me/metadata/covers/blog.jpg'
  }
}

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
