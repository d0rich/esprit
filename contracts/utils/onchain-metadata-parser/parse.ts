import { Blockchain } from '@ton-community/sandbox'
import { Address, Dictionary, TupleItemCell } from 'ton-core'
import { sha256 } from 'ton-crypto'
import { NFTDictValueSerializer } from './dict'

type BlockchainResponse = Awaited<
  ReturnType<Awaited<ReturnType<typeof Blockchain.create>>['runGetMethod']>
>

export async function parse(
  blockchain: Blockchain,
  mNftAddress: Address,
  mCollectionAddress: Address
) {
  const nftDataRes: BlockchainResponse = await blockchain.runGetMethod(
    mNftAddress,
    'get_nft_data',
    []
  )
  const nftContentRes: BlockchainResponse = await blockchain.runGetMethod(
    mCollectionAddress,
    'get_nft_content',
    [nftDataRes.stack[1], nftDataRes.stack[4]]
  )
  const dataCell = nftContentRes.stack[0] as TupleItemCell

  const data = dataCell.cell.asSlice()
  const start = data.loadUint(8)
  if (start !== 0) {
    throw new Error(`Unknown format: ${start}`)
  }

  const dict = data.loadDict(Dictionary.Keys.Buffer(32), NFTDictValueSerializer)

  const keys = ['image', 'name', 'description', 'content_url']
  const result: Record<string, string> = {}
  for (const key of keys) {
    const dictKey = await sha256(key)
    const dictValue = dict.get(dictKey)
    if (dictValue) {
      result[key] = dictValue.content.toString('utf-8')
    }
  }
  return result
}
