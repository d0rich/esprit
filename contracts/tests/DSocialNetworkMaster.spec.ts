import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import { DSocialNetworkBlog } from '../wrappers/DSocialNetworkBlog'
import '@ton-community/test-utils'
import { registerTestAccountMessage } from '../utils/test-fixtures'

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let deployer: Awaited<ReturnType<typeof blockchain.treasury>>
  let dMaster: SandboxContract<DSocialNetworkMaster>

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
  })

  it('deployer shoud be owner', async () => {
    const owner = await dMaster.getOwner()

    expect(owner.toRawString()).toEqual(deployer.address.toRawString())
  })

  it('Create blog', async () => {
    const createBlogResult = await dMaster.send(
      deployer.getSender(),
      { value: toNano('1') },
      registerTestAccountMessage
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
      to: deployer.address,
      success: true
    })

    expect(await dMaster.getGetBlogsCount()).toBe(1n)

    blockchain.openContract(DSocialNetworkBlog.fromAddress(blogAddress!))
  })
})
