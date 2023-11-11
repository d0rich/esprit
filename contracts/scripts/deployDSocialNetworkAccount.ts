import { toNano } from 'ton-core'
import { NetworkProvider } from '@ton-community/blueprint'
import { DSocialNetworkAccount } from '../wrappers/DSocialNetworkAccount'

export async function run(provider: NetworkProvider) {
  const dSocialNetworkAccount = provider.open(
    await DSocialNetworkAccount.fromInit()
  )

  await dSocialNetworkAccount.send(
    provider.sender(),
    {
      value: toNano('0.05')
    },
    {
      $$type: 'Deploy',
      queryId: 0n
    }
  )

  await provider.waitForDeploy(dSocialNetworkAccount.address)

  // run methods on `dSocialNetworkAccount`
}
