import type { NftCollectionMetadata } from '@d0rich/ton-contracts/wrappers/DSocialNetworkBlog'

export interface Blog extends Omit<NftCollectionMetadata, '$$type'> {}
