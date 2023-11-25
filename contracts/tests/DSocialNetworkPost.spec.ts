import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import {
  DSocialNetworkBlog,
  MintNft,
  NftMetadata
} from '../wrappers/DSocialNetworkBlog'
import '@ton-community/test-utils'
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'
import {
  getTestPostModel,
  createBlogMessage,
  createPostFee,
  createBlogFee,
  deployMasterFee
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
  let user: Awaited<ReturnType<typeof blockchain.treasury>>
  let anotherUser: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>
  let dBlog: SandboxContract<DSocialNetworkBlog>
  let testPostModel: DPostModel
  let dPost: SandboxContract<DSocialNetworkPost>

  it('User shoud be owner of the post', async () => {
    const owner = await dPost.getOwner()

    expect(owner.toRawString()).toEqual(user.address.toRawString())
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

  it('Post should be editable', async () => {
    const newPostMetadata: NftMetadata = {
      $$type: 'NftMetadata',
      name: 'New post name',
      description: 'New post description',
      image: 'New post cover'
    }

    const editPostResult = await dPost.send(
      user.getSender(),
      { value: toNano('0.1') },
      {
        $$type: 'EditBlogPost',
        query_id: 0n,
        new_metadata: newPostMetadata
      }
    )

    // Should top up post balance
    expect(editPostResult.transactions).toHaveTransaction({
      from: user.address,
      to: dPost.address,
      success: true
    })

    // Should return excesses to owner
    expect(editPostResult.transactions).toHaveTransaction({
      from: dPost.address,
      to: user.address,
      success: true
    })

    const postMetadata = await dPost.getGetPostInfo()

    expect(postMetadata.nft_content).toEqual(newPostMetadata)
  })

  it('Post should not be editable by another user', async () => {
    const oldPostMetadata = await dPost.getGetPostInfo()

    const newPostMetadata: NftMetadata = {
      $$type: 'NftMetadata',
      name: 'New post name',
      description: 'New post description',
      image: 'New post cover'
    }

    await dPost.send(
      anotherUser.getSender(),
      { value: toNano('0.1') },
      {
        $$type: 'EditBlogPost',
        query_id: 0n,
        new_metadata: newPostMetadata
      }
    )

    const postMetadata = await dPost.getGetPostInfo()

    expect(postMetadata.nft_content).toEqual(oldPostMetadata.nft_content)
  })

  // Preparation

  beforeEach(async () => {
    blockchain = await Blockchain.create()
    dMaster = blockchain.openContract(await DSocialNetworkMaster.fromInit())
    deployer = await blockchain.treasury('deployer')
    user = await blockchain.treasury('user')
    anotherUser = await blockchain.treasury('anotherUser')
    const deployResult = await dMaster.send(
      deployer.getSender(),
      { value: deployMasterFee },
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

    const createBlogResult = await dMaster.send(
      user.getSender(),
      { value: createBlogFee },
      createBlogMessage
    )

    const blogAddress = await dMaster.getGetBlogAddressByIndex(0n)

    expect(blogAddress).not.toBeNull()

    expect(createBlogResult.transactions).toHaveTransaction({
      from: dMaster.address,
      to: blogAddress!,
      success: true
    })

    expect(await dMaster.getGetBlogsCount()).toBe(1n)

    dBlog = blockchain.openContract(
      DSocialNetworkBlog.fromAddress(blogAddress!)
    )

    testPostModel = getTestPostModel(
      user.address,
      (await dBlog.getGetNftAddressByIndex(await dBlog.getGetNextItemIndex()))!,
      dBlog.address
    )

    const createTestPostMessage: MintNft = {
      $$type: 'MintNft',
      query_id: 0n,
      individual_content: serializePostData(testPostModel)
    }

    const createPostResult = await dBlog.send(
      user.getSender(),
      { value: createPostFee },
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
})
