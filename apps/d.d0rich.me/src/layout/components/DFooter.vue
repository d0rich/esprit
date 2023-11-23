<script setup lang="ts">
import {
  DWrapShape,
  DAnimationFloatingLetter,
  DBtn
} from '@d0rich/esprit-design'
import { RouterLink } from 'vue-router'
</script>

<template>
  <DWrapShape
    tag="footer"
    class="w-full -mt-[1rem]"
    shape-class="bg-white dark:bg-black"
    :shape-style="{
      clipPath: 'polygon(0 0, 100% 1rem, 100% 100%, 0 100%)'
    }"
  >
    <div class="pt-[1rem]">
      <div class="p-6 flex justify-between">
        <RouterLink
          class="flex items-end font-serif hover:underline"
          to="https://d0rich.me"
          target="_blank"
        >
          <DAnimationFloatingLetter
            class="inline-block w-8 -mx-1"
            path-class="fill-black dark:fill-white"
          />
          eveloped by d0rich
        </RouterLink>
        <div class="flex items-center gap-2 text-xl">
          <slot />
        </div>
      </div>
    </div>
  </DWrapShape>
</template>
