<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useTonConnectStore } from '../stores/tonConnectStore'

const buttonRootId = 'ton-connect-button-root'

const { setRenderRoot } = useTonConnectStore()
onMounted(() => {
  setRenderRoot(buttonRootId)
})
onBeforeUnmount(() => {
  setRenderRoot(null)
})
</script>

<template>
  <div :id="buttonRootId" />
</template>
