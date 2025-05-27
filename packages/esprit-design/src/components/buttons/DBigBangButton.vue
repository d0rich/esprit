<script lang="ts">
import { computed } from 'vue'
import { useDBigBangButtonUtils } from '../../composables/big-bang-button-utils'
import { useLink } from '../../composables/router'
import type { RouteLocationRaw } from 'vue-router'

export default {
  name: 'DBigBangButton'
}
</script>

<script setup lang="ts">
const emit = defineEmits(['click'])
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'button'
  },
  to: {
    type: [String, Object as () => RouteLocationRaw],
    default: ''
  }
})

const { text: animationText } = useDBigBangButtonUtils()

const { linkComponent: currentTag } = useLink(props)

const symbols = computed(() => props.text.split(''))

function onClick(event: MouseEvent) {
  animationText.value = props.text
  emit('click', event)
}
</script>

<template>
  <Component :is="currentTag" :to="to" class="big-bang-button" @click="onClick">
    <span v-for="(symbol, index) in symbols" :key="index" v-text="symbol" />
  </Component>
</template>

<style>
.big-bang-button {
  @apply text-3xl font-bold uppercase cursor-pointer;
}

.big-bang-button:hover > span {
  @apply inline-block transition-all motion-reduce:transition-none;
}

.big-bang-button:hover > span:nth-of-type(4n + 1) {
  @apply rotate-12 translate-x-1 -translate-y-2;
}
.big-bang-button:hover > span:nth-of-type(4n + 2) {
  @apply -rotate-6 translate-y-3;
}
.big-bang-button:hover > span:nth-of-type(4n + 3) {
  @apply -rotate-12 translate-x-1 -translate-y-2;
}
.big-bang-button:hover > span:nth-of-type(4n + 4) {
  @apply -rotate-6 translate-x-1 -translate-y-1;
}
.big-bang-button:hover > span:first {
  @apply rotate-12 -translate-x-2 -translate-y-2;
}
</style>
