<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useTonConnectStore } from '../stores/tonConnectStore'

const buttonRootId = 'ton-connect-button-root'

const tonConnect = useTonConnectStore()
onMounted(() => {
  tonConnect.setRenderRoot(buttonRootId)
})
onBeforeUnmount(() => {
  tonConnect.setRenderRoot(null)
})
</script>

<template>
  <div :id="buttonRootId" />
</template>
