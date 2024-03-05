import { toNano } from '@ton/core'
import { NetworkProvider } from '@ton/blueprint'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'

export async function run(provider: NetworkProvider) {
  const dSocialNetworkMaster = provider.open(
    await DSocialNetworkMaster.fromInit()
  )

  await dSocialNetworkMaster.send(
    provider.sender(),
    {
      value: toNano('0.05')
    },
    {
      $$type: 'Deploy',
      queryId: 0n
    }
  )

  await provider.waitForDeploy(dSocialNetworkMaster.address)

  // run methods on `dSocialNetworkMaster`
}
