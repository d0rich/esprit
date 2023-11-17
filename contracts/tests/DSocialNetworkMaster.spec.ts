import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import { DSocialNetworkAccount } from '../wrappers/DSocialNetworkAccount'
import '@ton-community/test-utils'

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
  })

  it('deployer shoud be owner', async () => {
    const owner = await dMaster.getOwner()

    expect(owner.toRawString()).toEqual(deployer.address.toRawString())
  })

  it('register account', async () => {
    const registerResult = await dMaster.send(
      deployer.getSender(),
      { value: toNano('0.5') },
      {
        $$type: 'RegisterAccount',
        query_id: 0n,
        account_name: 'test',
        account_description: 'Test account description'
      }
    )

    const accountAddress = await dMaster.getGetAccountAddressByIndex(0n)

    expect(accountAddress).not.toBeNull()

    expect(registerResult.transactions).toHaveTransaction({
      from: dMaster.address,
      to: accountAddress!,
      success: true
    })

    expect(await dMaster.getGetAccountsCount()).toBe(1n)

    blockchain.openContract(DSocialNetworkAccount.fromAddress(accountAddress!))

    // console.log(await dAccount.getGetAccountInfo())
    // console.log(await dAccount.getRoyaltyParams())
  })
})
