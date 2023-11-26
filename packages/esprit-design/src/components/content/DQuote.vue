<script setup lang="ts">
import DWrapShape from '../utils/DWrapShape.vue'

defineProps({
  direction: {
    type: String as () => 'left' | 'right',
    default: 'right'
  }
})
</script>

<template>
  <DWrapShape
    tag="blockquote"
    class="d-blockquote"
    :class="{
      'd-blockquote--left': direction === 'left',
      'd-blockquote--right': direction === 'right'
    }"
    shape-class="d-blockquote__shape"
  >
    <template #bg-overlay>
      <div class="d-blockquote__outline" />
    </template>
    <div class="d-blockquote__body">
      <slot />
    </div>
  </DWrapShape>
</template>

<style>
.d-blockquote {
  @apply font-dialog text-black dark:text-white my-6;
}

.d-blockquote__outline {
  @apply absolute inset-0 bg-black dark:bg-white;
}

.d-blockquote__shape {
  @apply bg-white dark:bg-black opacity-80;
}

/* Right */

.d-blockquote--right .d-blockquote__body {
  padding: var(--shape-bubble--right__padding);
}

.d-blockquote--right .d-blockquote__outline {
  clip-path: var(--shape-bubble--right__outline);
}

.d-blockquote--right .d-blockquote__shape {
  clip-path: var(--shape-bubble--right);
}

/* Left */

.d-blockquote--left .d-blockquote__body {
  padding: var(--shape-bubble--left__padding);
}

.d-blockquote--left .d-blockquote__outline {
  clip-path: var(--shape-bubble--left__outline);
}

.d-blockquote--left .d-blockquote__shape {
  clip-path: var(--shape-bubble--left);
}
</style>
