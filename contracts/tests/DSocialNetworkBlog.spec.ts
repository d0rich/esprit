import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import { DSocialNetworkBlog, MintNft } from '../wrappers/DSocialNetworkBlog'
import '@ton-community/test-utils'
import {
  getTestPostModel,
  registerTestAccountMessage
} from '../utils/test-fixtures'
import { serializePostData } from '../utils/stub-post-serialization'

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
  })
})
