<script setup lang="ts">
import { computed } from 'vue'
import { createAvatar } from '@dicebear/core'
import { shapes } from '@dicebear/collection'

const props = defineProps({
  address: {
    type: String,
    required: true
  }
})

const avatar = computed(() => {
  return createAvatar(shapes, {
    seed: props.address
  }).toString()
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <figure v-html="avatar" />
</template>
