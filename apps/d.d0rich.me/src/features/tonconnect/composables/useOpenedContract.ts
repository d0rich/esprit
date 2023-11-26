import { computed, type ComputedRef } from 'vue'
import type { OpenedContract, Contract } from '@ton/core'
import { useTonConnectStore } from '../stores/tonConnectStore'

export function useOpenedContract<T extends Contract>(
  contract: T
): ComputedRef<OpenedContract<T> | null> {
  const tonConnect = useTonConnectStore()
  return computed(() => {
    return tonConnect.tonClient?.open(contract) ?? null
  })
}
