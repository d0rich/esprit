import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import {
  DSocialNetworkBlog,
  EditBlogMetadata,
  MintNft
} from '../wrappers/DSocialNetworkBlog'
import '@ton-community/test-utils'
import { getTestPostModel, createBlogMessage } from '../utils/test-fixtures'
import { serializePostData } from '../utils/stub-post-serialization'
import { parse } from '../utils/onchain-metadata-parser/parse'

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let deployer: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>
  let dBlog: SandboxContract<DSocialNetworkBlog>

  beforeEach(async () => {
    blockchain = await Blockchain.create()
    dMaster = blockchain.openContract(await DSocialNetworkMaster.fromInit())
    deployer = await blockchain.treasury('deployer')
    const deployResult = await dMaster.send(
      deployer.getSender(),
      { value: toNano('0.1') },
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
      { value: toNano('1') },
      createBlogMessage
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
  })

  it('deployer shoud be owner of the account', async () => {
    const owner = await dBlog.getOwner()

    expect(owner.toRawString()).toEqual(deployer.address.toRawString())
  })

  it('should create post', async () => {
    const testPostModel = getTestPostModel(
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
      { value: toNano('0.2') },
      createTestPostMessage
    )

    const postAddress = await dBlog.getGetNftAddressByIndex(0n)

    expect(postAddress).not.toBeNull()

    // Should top up post balance
    expect(createPostResult.transactions).toHaveTransaction({
      from: dBlog.address,
      to: postAddress!,
      success: true
    })

    // Should return excesses to owner
    expect(createPostResult.transactions).toHaveTransaction({
      from: postAddress!,
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
      deployer.getSender(),
      { value: toNano('0.2') },
      editBlogMetadataMessage
    )

    // Should pay for changes
    expect(editBlogMetadataResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: dBlog.address,
      success: true
    })

    // Should return excesses
    expect(editBlogMetadataResult.transactions).toHaveTransaction({
      from: dBlog.address,
      to: deployer.address,
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
})
