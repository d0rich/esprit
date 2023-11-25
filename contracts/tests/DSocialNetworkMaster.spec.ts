import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import { DSocialNetworkBlog } from '../wrappers/DSocialNetworkBlog'
import '@ton-community/test-utils'
import {
  createBlogFee,
  createBlogMessage,
  deployMasterFee
} from '../utils/test-fixtures'

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let deployer: Awaited<ReturnType<typeof blockchain.treasury>>
  let user: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>

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
  })

  it('deployer shoud be owner', async () => {
    const owner = await dMaster.getOwner()

    expect(owner.toRawString()).toEqual(deployer.address.toRawString())
  })

  it('Create blog', async () => {
    const createBlogResult = await dMaster.send(
      user.getSender(),
      { value: createBlogFee },
      createBlogMessage
    )

    const blogAddress = await dMaster.getGetBlogAddressByIndex(0n)

    expect(blogAddress).not.toBeNull()

    // Should top up blog balance
    expect(createBlogResult.transactions).toHaveTransaction({
      from: dMaster.address,
      to: blogAddress!,
      success: true
    })

    // Should return excesses
    expect(createBlogResult.transactions).toHaveTransaction({
      from: blogAddress!,
      to: user.address,
      success: true
    })

    // Should send fee to owner
    expect(createBlogResult.transactions).toHaveTransaction({
      from: dMaster.address,
      to: deployer.address,
      success: true
    })

    expect(await dMaster.getGetBlogsCount()).toBe(1n)

    blockchain.openContract(DSocialNetworkBlog.fromAddress(blogAddress!))
  })
})
