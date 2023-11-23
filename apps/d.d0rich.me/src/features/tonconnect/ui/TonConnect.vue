<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useTonConnect } from '../composables/useTonConnect'

const buttonRootId = 'ton-connect-button-root'

const { setRenderRoot } = useTonConnect()
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
