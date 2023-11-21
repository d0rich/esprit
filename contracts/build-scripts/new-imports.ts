import type {
  TupleItem,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  DictionaryValue
} from 'ton-core'

import { Cell } from 'ton-core/dist/boc/Cell'
import { Slice } from 'ton-core/dist/boc/Slice'
import { Address } from 'ton-core/dist/address/Address'
import { Builder, beginCell } from 'ton-core/dist/boc/Builder'
import { ComputeError } from 'ton-core/dist/contract/ComputeError'
import { contractAddress } from 'ton-core/dist/address/contractAddress'
import { TupleReader } from 'ton-core/dist/tuple/reader'
import { TupleBuilder } from 'ton-core/dist/tuple/builder'
import { Dictionary } from 'ton-core/dist/dict/Dictionary'
