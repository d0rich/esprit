import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import { DSocialNetworkBlog, MintNft } from '../wrappers/DSocialNetworkBlog'
import '@ton-community/test-utils'
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'
import {
  getTestPostModel,
  registerTestAccountMessage
} from '../utils/test-fixtures'
import { parse } from '../utils/onchain-metadata-parser/parse'
import {
  deserializePostData,
  serializePostData,
  stringifyPostModel,
  type DPostModel
} from '../utils/stub-post-serialization'

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let deployer: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>
  let dBlog: SandboxContract<DSocialNetworkBlog>
  let testPostModel: DPostModel
  let dPost: SandboxContract<DSocialNetworkPost>

  beforeEach(async () => {
    blockchain = await Blockchain.create()
    dMaster = blockchain.openContract(await DSocialNetworkMaster.fromInit())
    deployer = await blockchain.treasury('deployer')
    const deployResult = await dMaster.send(
      deployer.getSender(),
      { value: toNano('0.05') },
      {
        $$type: 'Deploy',
        queryId: 0n
      }
    )

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: dMaster.address,
      deploy: true,
      success: true
    })

    const registerResult = await dMaster.send(
      deployer.getSender(),
      { value: toNano('0.5') },
      registerTestAccountMessage
    )

    const blogAddress = await dMaster.getGetBlogAddressByIndex(0n)

    expect(blogAddress).not.toBeNull()

    expect(registerResult.transactions).toHaveTransaction({
      from: dMaster.address,
      to: blogAddress!,
      success: true
    })

    expect(await dMaster.getGetBlogsCount()).toBe(1n)

    dBlog = blockchain.openContract(
      DSocialNetworkBlog.fromAddress(blogAddress!)
    )

    testPostModel = getTestPostModel(
      deployer.address,
      (await dBlog.getGetNftAddressByIndex(await dBlog.getGetNextItemIndex()))!,
      dBlog.address
    )

    const createTestPostMessage: MintNft = {
      $$type: 'MintNft',
      query_id: 0n,
      individual_content: serializePostData(testPostModel)
    }

    const createPostResult = await dBlog.send(
      deployer.getSender(),
      { value: toNano('0.5') },
      createTestPostMessage
    )

    const postAddress = await dBlog.getGetNftAddressByIndex(0n)

    expect(postAddress).not.toBeNull()

    expect(createPostResult.transactions).toHaveTransaction({
      from: dBlog.address,
      to: postAddress!,
      success: true
    })

    expect(await dBlog.getGetNextItemIndex()).toBe(1n)

    dPost = blockchain.openContract(
      DSocialNetworkPost.fromAddress(postAddress!)
    )
  })

  it('Deployer shoud be owner of the post', async () => {
    const owner = await dPost.getOwner()

    expect(owner.toRawString()).toEqual(deployer.address.toRawString())
  })

  it('Post model should be serialized correctly', () => {
    const serializedModel = serializePostData(testPostModel)
    const deserializedPostData = deserializePostData(serializedModel)
    expect(stringifyPostModel(testPostModel)).toEqual(
      stringifyPostModel(deserializedPostData)
    )
  })

  it('Post should be readable', async () => {
    const getNftDataRes = await dPost.getGetNftData()
    await dBlog.getGetNftContent(
      getNftDataRes.index,
      getNftDataRes.individual_content
    )
  })

  it('Post NFT data shoud be parsed correctly', async () => {
    const postMetadata = await dPost.getGetPostInfo()
    const parsedPostMetadata = await parse(
      blockchain,
      dPost.address,
      dBlog.address
    )
    expect(parsedPostMetadata).toEqual({
      image: postMetadata.nft_content.image,
      name: postMetadata.nft_content.name,
      description: postMetadata.nft_content.description
    })
  })
})
