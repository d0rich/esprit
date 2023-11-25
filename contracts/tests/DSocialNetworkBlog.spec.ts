import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { Cell, toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import {
  DSocialNetworkBlog,
  EditBlogMetadata
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
  let anotherUser: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>
  let dBlog: SandboxContract<DSocialNetworkBlog>

  describe('Ownership', () => {
    it('User shoud be owner of the blog', async () => {
      const owner = await dBlog.getOwner()

      expect(owner.toRawString()).toEqual(user.address.toRawString())
    })
    it('Blog should be transferable', async () => {
      const transferResult = await dBlog.send(
        user.getSender(),
        { value: toNano('10') },
        {
          $$type: 'Transfer',
          query_id: 0n,
          new_owner: anotherUser.address,
          custom_payload: null,
          forward_amount: toNano('5'),
          forward_payload: Cell.EMPTY,
          response_destination: user.address
        }
      )

      // Should top up post balance
      expect(transferResult.transactions).toHaveTransaction({
        from: user.address,
        to: dBlog.address,
        success: true
      })

      // Should return excesses to owner
      expect(transferResult.transactions).toHaveTransaction({
        from: dBlog.address,
        to: user.address,
        success: true
      })

      // Should forward some amount to new owner
      expect(transferResult.transactions).toHaveTransaction({
        from: dBlog.address,
        to: user.address,
        success: true
      })

      const owner = await dBlog.getOwner()

      expect(owner.toRawString()).toEqual(anotherUser.address.toRawString())
    })

    it('Another user can not initiate blog transfer', async () => {
      await dBlog.send(
        anotherUser.getSender(),
        { value: toNano('10') },
        {
          $$type: 'Transfer',
          query_id: 0n,
          new_owner: anotherUser.address,
          custom_payload: null,
          forward_amount: toNano('5'),
          forward_payload: Cell.EMPTY,
          response_destination: user.address
        }
      )

      const owner = await dBlog.getOwner()

      expect(owner.toRawString()).toEqual(user.address.toRawString())
    })
  })

  describe('Metadata', () => {
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

    it('Another user should not edit blog metadata', async () => {
      const oldMetadata = await dBlog.getGetBlogInfo()

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

      await dBlog.send(
        anotherUser.getSender(),
        { value: toNano('0.2') },
        editBlogMetadataMessage
      )

      const newMetadata = await dBlog.getGetBlogInfo()

      expect(newMetadata.collection_content).toEqual(
        oldMetadata.collection_content
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

  describe('Posts creation', () => {
    it('Should create post', async () => {
      const testPostModel = getTestPostModel(
        user.address,
        (await dBlog.getGetNftAddressByIndex(
          await dBlog.getGetNextItemIndex()
        ))!,
        dBlog.address
      )

      const createPostResult = await dBlog.send(
        user.getSender(),
        { value: createPostFee },
        {
          $$type: 'MintNft',
          query_id: 0n,
          individual_content: serializePostData(testPostModel)
        }
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

    it('Should not create post with insufficient fee', async () => {
      const testPostModel = getTestPostModel(
        user.address,
        (await dBlog.getGetNftAddressByIndex(
          await dBlog.getGetNextItemIndex()
        ))!,
        dBlog.address
      )

      const createPostResult = await dBlog.send(
        user.getSender(),
        { value: toNano('0.1') },
        {
          $$type: 'MintNft',
          query_id: 0n,
          individual_content: serializePostData(testPostModel)
        }
      )

      const postAddress = await dBlog.getGetNftAddressByIndex(0n)

      expect(postAddress).not.toBeNull()

      const dPost = blockchain.openContract(
        DSocialNetworkPost.fromAddress(postAddress!)
      )

      // Should not top up post balance
      expect(createPostResult.transactions).not.toHaveTransaction({
        from: dBlog.address,
        to: dPost.address,
        success: true
      })

      expect(await dBlog.getGetNextItemIndex()).not.toBe(1n)
    })

    it('Another user should not be able to create posts', async () => {
      const testPostModel = getTestPostModel(
        anotherUser.address,
        (await dBlog.getGetNftAddressByIndex(
          await dBlog.getGetNextItemIndex()
        ))!,
        dBlog.address
      )

      const createPostResult = await dBlog.send(
        anotherUser.getSender(),
        { value: createPostFee },
        {
          $$type: 'MintNft',
          query_id: 0n,
          individual_content: serializePostData(testPostModel)
        }
      )

      const postAddress = await dBlog.getGetNftAddressByIndex(0n)

      expect(postAddress).not.toBeNull()

      const dPost = blockchain.openContract(
        DSocialNetworkPost.fromAddress(postAddress!)
      )

      // Should not top up post balance
      expect(createPostResult.transactions).not.toHaveTransaction({
        from: dBlog.address,
        to: dPost.address,
        success: true
      })

      expect(await dBlog.getGetNextItemIndex()).not.toBe(1n)
    })
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
  })
})
