import { toNano } from 'ton-core'
import { NetworkProvider } from '@ton-community/blueprint'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import { DSocialNetworkBlog, MintNft } from '../wrappers/DSocialNetworkBlog'
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'
import {
  getTestPostModel,
  registerTestAccountMessage
} from '../utils/test-fixtures'

import { serializePostData } from '../utils/stub-post-serialization'

export async function run(provider: NetworkProvider) {
  const dMaster = provider.open(await DSocialNetworkMaster.fromInit())

  await dMaster.send(
    provider.sender(),
    {
      value: toNano('0.1')
    },
    {
      $$type: 'Deploy',
      queryId: 0n
    }
  )

  await provider.waitForDeploy(dMaster.address)

  await dMaster.send(
    provider.sender(),
    { value: toNano('1') },
    registerTestAccountMessage
  )

  const blogAddress = await dMaster.getGetBlogAddressByIndex(0n)

  const dBlog = provider.open(DSocialNetworkBlog.fromAddress(blogAddress!))

  await provider.waitForDeploy(dBlog.address)

  const testPostModel = getTestPostModel(
    provider.sender().address!,
    (await dBlog.getGetNftAddressByIndex(await dBlog.getGetNextItemIndex()))!,
    dBlog.address
  )

  const createTestPostMessage: MintNft = {
    $$type: 'MintNft',
    query_id: 0n,
    individual_content: serializePostData(testPostModel)
  }

  await dBlog.send(
    provider.sender(),
    { value: toNano('0.2') },
    createTestPostMessage
  )

  const postAddress = await dBlog.getGetNftAddressByIndex(0n)

  const dPost = provider.open(DSocialNetworkPost.fromAddress(postAddress!))
  await provider.waitForDeploy(dPost.address)
}
