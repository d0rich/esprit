import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import {
  DSocialNetworkBlog,
  EditBlogMetadata,
  MintNft
} from '../wrappers/DSocialNetworkBlog'
import '@ton-community/test-utils'
import {
  getTestPostModel,
  createBlogMessage,
  createPostFee,
  createBlogFee,
  deployMasterFee
} from '../utils/test-fixtures'
import { serializePostData } from '../utils/stub-post-serialization'
import { parse } from '../utils/onchain-metadata-parser/parse'
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let deployer: Awaited<ReturnType<typeof blockchain.treasury>>
  let user: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>
  let dBlog: SandboxContract<DSocialNetworkBlog>

  it('User shoud be owner of the blog', async () => {
    const owner = await dBlog.getOwner()

    expect(owner.toRawString()).toEqual(user.address.toRawString())
  })

  it('Should create post', async () => {
    const testPostModel = getTestPostModel(
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

    const dPost = blockchain.openContract(
      DSocialNetworkPost.fromAddress(postAddress!)
    )

    // Should top up post balance
    expect(createPostResult.transactions).toHaveTransaction({
      from: dBlog.address,
      to: dPost.address,
      success: true
    })

    // Should return excesses to user
    expect(createPostResult.transactions).toHaveTransaction({
      from: dPost.address,
      to: user.address,
      success: true
    })

    // Should send fee to owner
    expect(createPostResult.transactions).toHaveTransaction({
      from: dBlog.address,
      to: deployer.address,
      success: true
    })

    expect(await dBlog.getGetNextItemIndex()).toBe(1n)
  })

  it('Should edit blog metadata correctly', async () => {
    const editBlogMetadataMessage: EditBlogMetadata = {
      $$type: 'EditBlogMetadata',
      query_id: 0n,
      new_metadata: {
        $$type: 'NftCollectionMetadata',
        name: 'New blog name',
        description: 'New blog description',
        image: 'New blog avatar'
      }
    }

    const editBlogMetadataResult = await dBlog.send(
      user.getSender(),
      { value: toNano('0.2') },
      editBlogMetadataMessage
    )

    // Should pay for changes
    expect(editBlogMetadataResult.transactions).toHaveTransaction({
      from: user.address,
      to: dBlog.address,
      success: true
    })

    // Should return excesses
    expect(editBlogMetadataResult.transactions).toHaveTransaction({
      from: dBlog.address,
      to: user.address,
      success: true
    })

    const newMetadata = await dBlog.getGetBlogInfo()

    expect(newMetadata.collection_content).toEqual(
      editBlogMetadataMessage.new_metadata
    )
  })

  it('Blog NFT data shoud be parsed correctly', async () => {
    const blogMetadata = await dBlog.getGetBlogInfo()
    const parsedPostMetadata = await parse(
      blockchain,
      dBlog.address,
      dMaster.address
    )
    expect(parsedPostMetadata).toEqual({
      image: blogMetadata.collection_content.image,
      name: blogMetadata.collection_content.name,
      description: blogMetadata.collection_content.description
    })
  })

  // Preparation

  beforeEach(async () => {
    blockchain = await Blockchain.create()
    dMaster = blockchain.openContract(await DSocialNetworkMaster.fromInit())
    deployer = await blockchain.treasury('deployer')
    user = await blockchain.treasury('user')
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
  })
})
