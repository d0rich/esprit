import { toNano } from 'ton-core'
import { NetworkProvider } from '@ton-community/blueprint'
import { DSocialNetworkMaster } from '../wrappers/DSocialNetworkMaster'
import { DSocialNetworkAccount } from '../wrappers/DSocialNetworkAccount'
import { DSocialNetworkPost } from '../wrappers/DSocialNetworkPost'

export async function run(provider: NetworkProvider) {
  const dMaster = provider.open(await DSocialNetworkMaster.fromInit())

  await dMaster.send(
    provider.sender(),
    {
      value: toNano('0.05')
    },
    {
      $$type: 'Deploy',
      queryId: 0n
    }
  )

  await provider.waitForDeploy(dMaster.address)

  await dMaster.send(
    provider.sender(),
    { value: toNano('0.5') },
    {
      $$type: 'RegisterAccount',
      query_id: 0n,
      account_metadata_json: JSON.stringify({
        image: 'https://d0rich.me/og/image.jpg',
        name: 'test',
        description: 'Test account description',
        social_links: ['https://d0rich.t.me']
      })
    }
  )

  const accountAddress = await dMaster.getGetAccountAddressByIndex(0n)

  const dAccount = provider.open(
    DSocialNetworkAccount.fromAddress(accountAddress!)
  )

  await provider.waitForDeploy(dAccount.address)

  await dAccount.send(
    provider.sender(),
    { value: toNano('0.5') },
    {
      $$type: 'MintNft',
      query_id: 0n,
      individual_content: JSON.stringify({
        name: 'Test post',
        description: 'Test post description',
        image: 'https://d0rich.me/og/image.jpg',
        content_url: 'https://test.com/content.txt'
      })
    }
  )

  const postAddress = await dAccount.getGetNftAddressByIndex(0n)

  const dPost = provider.open(DSocialNetworkPost.fromAddress(postAddress!))
  await provider.waitForDeploy(dPost.address)
}
