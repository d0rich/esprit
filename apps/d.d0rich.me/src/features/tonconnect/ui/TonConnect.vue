<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { THEME } from '@tonconnect/ui'
import { useTonConnectStore } from '../stores/tonConnectStore'
import { useThemeStore } from '../../theme/stores/themeStore'

const buttonRootId = 'ton-connect-button-root'

const tonConnectStore = useTonConnectStore()
const themeStore = useThemeStore()

themeStore.$subscribe(() => {
  if (themeStore.explicitTheme === 'dark') {
    tonConnectStore.setOptions({
      uiPreferences: {
        theme: THEME.DARK
      }
    })
  } else {
    tonConnectStore.setOptions({
      uiPreferences: {
        theme: THEME.LIGHT
      }
    })
  }
})

onMounted(() => {
  tonConnectStore.setRenderRoot(buttonRootId)
})
onBeforeUnmount(() => {
  tonConnectStore.setRenderRoot(null)
})
</script>

<template>
  <div :id="buttonRootId" />
</template>
