import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { SenderArguments, Sender } from '@ton/core'
import { Address } from '@ton/core/dist/address/Address'
import { CHAIN } from '@tonconnect/protocol'
import { TonConnectUI } from '@tonconnect/ui'
import { getHttpEndpoint, type Network } from '@orbs-network/ton-access'
import { TonClient } from '@ton/ton/dist/client/TonClient'
import { useAppConfig } from '@/shared/composables/useAppConfig'

export const useTonConnectStore = defineStore('ton-connect', () => {
  const config = useAppConfig()

  // State
  const tonConnect = ref(
    new TonConnectUI({
      manifestUrl:
        window.location.origin +
        '/tonconnect' +
        (config.network === 'TESTNET' ? '-testnet' : '') +
        '-manifest.json',
      language: 'en',
      uiPreferences: {
        borderRadius: 'none'
      }
    })
  )
  const buttonRootId = ref<string | null>(null)

  const wallet = ref(tonConnect.value.wallet)

  const cancelWalletSubscription = tonConnect.value.onStatusChange(
    (status) => (wallet.value = status)
  )

  const walletAddress = computed(() => wallet.value?.account.address ?? null)
  const currentNetwork = computed<Network | undefined>(() => {
    const chain = wallet.value?.account.chain
    if (chain === CHAIN.MAINNET) return 'mainnet'
    if (chain === CHAIN.TESTNET) return 'testnet'
    return undefined
  })

  const tonClient = ref<TonClient | null>(null)

  const stopRefreshingTonClient = watch(currentNetwork, async (network) => {
    if (!network) {
      tonClient.value = new TonClient({
        endpoint: await getHttpEndpoint({
          network: config.network === 'MAINNET' ? 'mainnet' : 'testnet'
        })
      })
      return
    }
    tonClient.value = new TonClient({
      endpoint: await getHttpEndpoint({ network })
    })
  })

  return {
    tonConnect,
    tonClient,
    isConnected: computed(() => !!wallet.value?.account.address),
    wallet: walletAddress,
    network: currentNetwork,
    sendTransaction,
    setOptions,
    setRenderRoot,
    cleanupSubscriptions: cleanup,
    sender: computed<Sender>(() => {
      return {
        send: async (args) => {
          await sendTransaction(args)
        },
        address: walletAddress.value
          ? Address.parse(walletAddress.value)
          : undefined
      }
    })
  }

  // Actions

  function sendTransaction(args: SenderArguments) {
    return tonConnect.value.sendTransaction({
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
    stopRefreshingTonClient()
  }

  /**
   * Define styles for the TonConnectUI button
   * @param options UI options of TonConnectUI
   */
  function setOptions(
    options: Omit<
      InstanceType<typeof TonConnectUI>['uiOptions'],
      'buttonRootId'
    >
  ) {
    tonConnect.value.uiOptions = {
      ...options,
      buttonRootId: buttonRootId.value
    }
  }

  /**
   * Set buttonRootId element and makes button render in it
   * @param rootId id of the element where the button will be rendered
   */
  function setRenderRoot(rootId: string | null) {
    buttonRootId.value = rootId
    tonConnect.value.uiOptions = {
      ...tonConnect.value.uiOptions,
      buttonRootId: rootId
    }
  }
})
