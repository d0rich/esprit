import { toNano, Cell } from 'ton-core'
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
      account_name: 'test',
      account_description: 'Test account description'
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
      individual_content: {
        $$type: 'NftMetadata',
        name: 'Test post',
        description: 'Test post description',
        image: 'https://test.com/image.png',
        content_url: 'https://test.com/content.txt',
        attributes: Cell.EMPTY
      }
    }
  )

  const postAddress = await dAccount.getGetNftAddressByIndex(0n)

  const dPost = provider.open(DSocialNetworkPost.fromAddress(postAddress!))
  await provider.waitForDeploy(dPost.address)
}
