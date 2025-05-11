import { useColorMode } from '@vueuse/core'
import { onBeforeMount, onBeforeUnmount } from 'vue'

export function usePrintSetup() {
  const colorMode = useColorMode()
  let colorBeforePrint = colorMode.value
  function beforePrint() {
    colorBeforePrint = colorMode.value
    colorMode.value = 'light'
  }
  function afterPrint() {
    colorMode.value = colorBeforePrint
  }
  onBeforeMount(() => {
    addEventListener('beforeprint', beforePrint)
    addEventListener('afterprint', afterPrint)
  })
  onBeforeUnmount(() => {
    removeEventListener('beforeprint', beforePrint)
    removeEventListener('afterprint', afterPrint)
  })
}
