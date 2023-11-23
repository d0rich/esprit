import { ref } from 'vue'
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

function setOptions(
  options: Omit<InstanceType<typeof TonConnectUI>['uiOptions'], 'buttonRootId'>
) {
  tonconnect.value.uiOptions = {
    ...options,
    buttonRootId: tonconnect.value.uiOptions.buttonRootId
  }
}

function setRenderRoot(rootId: string | null) {
  tonconnect.value.uiOptions = {
    ...tonconnect.value.uiOptions,
    buttonRootId: rootId
  }
}

/**
 * Initialize TonConnect UI only in component, which is always rendered.
 *
 */
export function useTonConnect() {
  return { tonconnect: tonconnect.value, setOptions, setRenderRoot }
}
