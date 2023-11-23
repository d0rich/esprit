import { computed } from 'vue'
import { Address } from 'ton-core/dist/address/Address'
import { useTonConnectStore } from '../stores/tonConnectStore'

export function useSender() {
  const tonConnect = useTonConnectStore()
  return {
    send: tonConnect.sendTransaction,
    address: computed(() => {
      const addressString = tonConnect.wallet
      if (!addressString) return null
      return Address.parse(addressString)
    })
  }
}
