import { ref, computed } from 'vue'
import type { SenderArguments } from 'ton-core'
import { Address } from 'ton-core/dist/address/Address'
import { CHAIN } from '@tonconnect/protocol'
import { TonConnectUI } from '@tonconnect/ui'
import { useAppConfig } from '@/shared/composables/useAppConfig'

const config = useAppConfig()

const tonconnect = ref<TonConnectUI>(
  new TonConnectUI({
    manifestUrl:
      window.location.origin +
      '/tonconnect' +
      (config.network === 'TESTNET' ? '-testnet' : '') +
      '-manifest.json'
  })
)

const wallet = ref(tonconnect.value.wallet)
const cancelWalletSubscription = tonconnect.value.onStatusChange(
  (status) => (wallet.value = status)
)

export function useTonConnect() {
  return {
    tonconnect: tonconnect.value,
    isConnected: computed(() => !!wallet.value?.account.address),
    wallet: computed(() => wallet.value?.account.address ?? null),
    network: computed(() => {
      const chain = wallet.value?.account.chain
      if (chain === CHAIN.MAINNET) return 'MAINNET'
      if (chain === CHAIN.TESTNET) return 'TESTNET'
      return null
    }),
    sender: {
      send: sendTransaction,
      address: computed(() => {
        const addressString = wallet.value?.account.address
        if (!addressString) return null
        return Address.parse(addressString)
      })
    },
    setOptions,
    setRenderRoot,
    cleanupSubscriptions: cleanup
  }
}

function sendTransaction(args: SenderArguments) {
  return tonconnect.value.sendTransaction({
    messages: [
      {
        address: args.to.toString(),
        amount: args.value.toString(),
        payload: args.body?.toBoc().toString('base64')
      }
    ],
    validUntil: Date.now() + 5 * 60 * 1000 // 5 minutes for user to approve
  })
}

/**
 * Cancel all subscriptions for TonConnectUI
 */
function cleanup() {
  cancelWalletSubscription()
}

/**
 * Define styles for the TonConnectUI button
 * @param options UI options of TonConnectUI
 */
function setOptions(
  options: Omit<InstanceType<typeof TonConnectUI>['uiOptions'], 'buttonRootId'>
) {
  tonconnect.value.uiOptions = {
    ...options,
    buttonRootId: tonconnect.value.uiOptions.buttonRootId
  }
}

/**
 * Set buttonRootId element and makes button render in it
 * @param rootId id of the element where the button will be rendered
 */
function setRenderRoot(rootId: string | null) {
  tonconnect.value.uiOptions = {
    ...tonconnect.value.uiOptions,
    buttonRootId: rootId
  }
}
