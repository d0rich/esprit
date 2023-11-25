import { computed, type ComputedRef } from 'vue'
import type { ContractProvider, Contract } from 'ton-core'
import { useTonConnectStore } from '../stores/tonConnectStore'

export function useContractProvider(
  contract: Contract
): ComputedRef<ContractProvider | null> {
  const tonConnect = useTonConnectStore()
  return computed(() => {
    return (
      tonConnect.tonClient?.provider(contract.address, contract.init ?? null) ??
      null
    )
  })
}
