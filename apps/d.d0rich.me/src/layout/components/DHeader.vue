<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { DWrapShape, DBtn, DAnimationHypnosis } from '@d0rich/esprit-design'
import { useAppConfig } from '../../shared/composables/useAppConfig'
import ThemeSwitch from '../../features/theme/ui/ThemeSwitch.vue'

const appConfig = useAppConfig()
const showSideBar = ref(false)
</script>

<template>
  <DWrapShape
    tag="header"
    class="fixed top-0 z-50 left-0 right-0"
    shape-class="bg-white dark:bg-black"
    :shape-style="{
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1rem), 0 100%)'
    }"
  >
    <nav class="p-4 font-serif font-semibold">
      <DBtn
        tag="button"
        class="!inline-block text-2xl lg:!hidden"
        @click="showSideBar = !showSideBar"
      >
        <Icon :icon="showSideBar ? 'ic:sharp-menu-open' : 'ic:sharp-menu'" />
      </DBtn>
      <RouterLink to="/">
        <DAnimationHypnosis class="inline-block w-12 -my-2" />
        <span class="pointer-events-none">{{ appConfig.network }}</span>
      </RouterLink>
      <div class="flex items-center gap-2 text-xl float-right">
        <ThemeSwitch />
      </div>
    </nav>
  </DWrapShape>
</template>
