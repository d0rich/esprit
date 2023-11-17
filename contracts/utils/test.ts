import { RegisterAccount } from '../wrappers/DSocialNetworkMaster'
import { MintNft } from '../wrappers/DSocialNetworkAccount'

export const registerTestAccountMessage: RegisterAccount = {
  $$type: 'RegisterAccount',
  query_id: 0n,
  account_metadata_json: JSON.stringify({
    image: 'https://d0rich.me/og/image.jpg',
    name: 'test',
    description: 'Test account description',
    social_links: ['https://d0rich.t.me']
  })
}

export const createTestPostMessage: MintNft = {
  $$type: 'MintNft',
  query_id: 0n,
  individual_content: JSON.stringify({
    name: 'Test post',
    description: 'Test post description',
    image: 'https://d0rich.me/og/image.jpg',
    content_url: 'https://test.com/content.txt'
  })
}
