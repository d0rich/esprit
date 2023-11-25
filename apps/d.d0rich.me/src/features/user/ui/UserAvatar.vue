<script setup lang="ts">
import { computed } from 'vue'
import { createAvatar } from '@dicebear/core'
import { adventurerNeutral } from '@dicebear/collection'

const props = defineProps({
  wallet: {
    type: String,
    required: true
  }
})

const avatar = computed(() => {
  return createAvatar(adventurerNeutral, {
    seed: props.wallet
  }).toString()
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <figure v-html="avatar" />
</template>
