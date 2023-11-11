import { toNano } from 'ton-core'
import { NetworkProvider } from '@ton-community/blueprint'
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'

export async function run(provider: NetworkProvider) {
  const dSocialNetworkPost = provider.open(await DSocialNetworkPost.fromInit())

  await dSocialNetworkPost.send(
    provider.sender(),
    {
      value: toNano('0.05')
    },
    {
      $$type: 'Deploy',
      queryId: 0n
    }
  )

  await provider.waitForDeploy(dSocialNetworkPost.address)

  // run methods on `dSocialNetworkPost`
}
