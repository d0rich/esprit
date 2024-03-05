/* eslint-disable */
import { Builder, Dictionary, Slice } from '@ton/core'
import { flattenSnakeCell, ParseChunkDict } from './nftContent'

interface ChunkDictValue {
  content: Buffer
}

interface NFTDictValue {
  content: Buffer
}

export const ChunkDictValueSerializer = {
  serialize(src: ChunkDictValue, builder: Builder) {},
  parse(src: Slice): ChunkDictValue {
    const snake = flattenSnakeCell(src.loadRef())
    return { content: snake }
  }
}

export const NFTDictValueSerializer = {
  serialize(src: NFTDictValue, builder: Builder) {},
  parse(src: Slice): NFTDictValue {
    const ref = src.loadRef().asSlice()

    const start = ref.loadUint(8)
    if (start === 0) {
      const snake = flattenSnakeCell(ref.asCell())
      return { content: snake }
    }

    if (start === 1) {
      return { content: ParseChunkDict(ref) }
    }

    return { content: Buffer.from([]) }
  }
}
