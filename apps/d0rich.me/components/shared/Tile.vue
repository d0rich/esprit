<script setup lang="ts">
import { DWrapShape, NuxtLink } from '#components'

defineProps<{
  image?: string
  imageAlt?: string
  path?: string
}>()
</script>

<template>
  <DWrapShape class="d-tile" shape-class="d-tile__shape">
    <template #shape-content>
      <div v-if="image" class="relative w-full h-full overflow-hidden">
        <img class="d-tile__image" :src="image" :alt="imageAlt" />
      </div>
    </template>
    <NuxtLink
      :to="path"
      class="block"
      style="padding: var(--shape-card--dense__padding)"
    >
      <slot />
    </NuxtLink>
  </DWrapShape>
</template>

<style>
.d-tile {
  @apply scale-90 hover:scale-100 transition-transform motion-reduce:transition-none;
}
.d-tile:has(:focus) {
  @apply scale-100;
}

.d-tile__shape {
  clip-path: var(--shape-card--dense);
  @apply bg-white dark:bg-black bg-opacity-70;
}

.d-tile__image {
  @apply absolute object-cover h-full
         translate-x-2/3 translate-y-2/3 -rotate-45
         transition-all motion-reduce:transition-none;
}

.d-tile:hover .d-tile__image,
.d-tile:has(:focus) .d-tile__image {
  @apply translate-x-1/2 translate-y-1/2 opacity-10;
}
</style>
