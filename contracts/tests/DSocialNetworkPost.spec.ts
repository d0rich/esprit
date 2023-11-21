import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import {
  DSocialNetworkAccount,
  MintNft
} from '../wrappers/DSocialNetworkAccount'
import '@ton-community/test-utils'
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'
import {
  getTestPostModel,
  registerTestAccountMessage
} from '../utils/test-fixtures'
import { parse } from '../utils/onchain-metadata-parser/parse'
import { DPost, type DPostModel } from '../models'

function stringifyModel(model: DPostModel): Record<keyof DPostModel, string> {
  return {
    ...model,
    date: model.date.toISOString(),
    author: model.author.toRawString()
  }
}

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let deployer: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>
  let dAccount: SandboxContract<DSocialNetworkAccount>
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

    const accountAddress = await dMaster.getGetAccountAddressByIndex(0n)

    expect(accountAddress).not.toBeNull()

    expect(registerResult.transactions).toHaveTransaction({
      from: dMaster.address,
      to: accountAddress!,
      success: true
    })

    expect(await dMaster.getGetAccountsCount()).toBe(1n)

    dAccount = blockchain.openContract(
      DSocialNetworkAccount.fromAddress(accountAddress!)
    )

    testPostModel = getTestPostModel(deployer.address)

    const createTestPostMessage: MintNft = {
      $$type: 'MintNft',
      query_id: 0n,
      individual_content: DPost.serializePostData(testPostModel)
    }

    const createPostResult = await dAccount.send(
      deployer.getSender(),
      { value: toNano('0.5') },
      createTestPostMessage
    )

    const postAddress = await dAccount.getGetNftAddressByIndex(0n)

    expect(postAddress).not.toBeNull()

    expect(createPostResult.transactions).toHaveTransaction({
      from: dAccount.address,
      to: postAddress!,
      success: true
    })

    expect(await dAccount.getGetNextItemIndex()).toBe(1n)

    dPost = blockchain.openContract(
      DSocialNetworkPost.fromAddress(postAddress!)
    )
  })

  it('Deployer shoud be owner of the post', async () => {
    const owner = await dPost.getOwner()

    expect(owner.toRawString()).toEqual(deployer.address.toRawString())
  })

  it('Post model should be serialized correctly', () => {
    const serializedModel = DPost.serializePostData(testPostModel)
    const deserializedPostData = DPost.deserializePostData(serializedModel)
    expect(stringifyModel(testPostModel)).toEqual(
      stringifyModel(deserializedPostData)
    )
  })

  it('Post should be readable', async () => {
    const getNftDataRes = await dPost.getGetNftData()
    await dAccount.getGetNftContent(
      getNftDataRes.index,
      getNftDataRes.individual_content
    )
  })

  it('Post NFT data shoud be parsed correctly', async () => {
    const postMetadata = await dPost.getGetPostInfo()
    expect(await parse(blockchain, dPost.address, dAccount.address)).toEqual({
      image: postMetadata.nft_content.image,
      name: postMetadata.nft_content.name,
      description: postMetadata.nft_content.description
    })
  })
})
