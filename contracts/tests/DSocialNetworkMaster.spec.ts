import { Blockchain, SandboxContract } from '@ton-community/sandbox'
import { toNano } from 'ton-core'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import '@ton-community/test-utils'

describe('DSocialNetworkMaster', () => {
  let blockchain: Blockchain
  let dSocialNetworkMaster: SandboxContract<DSocialNetworkMaster>

  beforeEach(async () => {
    blockchain = await Blockchain.create()

    dSocialNetworkMaster = blockchain.openContract(
      await DSocialNetworkMaster.fromInit()
    )

    const deployer = await blockchain.treasury('deployer')

    const deployResult = await dSocialNetworkMaster.send(
      deployer.getSender(),
      {
        value: toNano('0.05')
      },
      {
        $$type: 'Deploy',
        queryId: 0n
      }
    )

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: dSocialNetworkMaster.address,
      deploy: true,
      success: true
    })
  })

  it('should deploy', async () => {
    // the check is done inside beforeEach
    // blockchain and dSocialNetworkMaster are ready to use
  })
})
