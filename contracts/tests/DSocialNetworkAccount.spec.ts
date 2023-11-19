import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import {
  DSocialNetworkAccount,
  MintNft
} from '../wrappers/DSocialNetworkAccount'
import '@ton-community/test-utils'
import {
  getTestPostModel,
  registerTestAccountMessage
} from '../utils/test-fixtures'
import { DPost } from '../models'

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let deployer: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>
  let dAccount: SandboxContract<DSocialNetworkAccount>

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
  })

  it('deployer shoud be owner of the account', async () => {
    const owner = await dAccount.getOwner()

    expect(owner.toRawString()).toEqual(deployer.address.toRawString())
  })

  it('should create post', async () => {
    const testPostModel = getTestPostModel(deployer.address)

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
  })
})
