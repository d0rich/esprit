<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { DWrapShape, DBtn } from '@d0rich/esprit-design'
import { useAppConfig } from '../../shared/composables/useAppConfig'
import ThemeSwitch from '../../features/theme/ui/ThemeSwitch.vue'

const appConfig = useAppConfig()
defineProps({
  showSideBar: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:showSideBar'])
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
    <nav class="flex justify-between p-4 font-serif font-semibold">
      <div class="flex items-center">
        <DBtn
          tag="button"
          class="!inline-block text-2xl lg:!hidden"
          @click="$emit('update:showSideBar', !showSideBar)"
        >
          <Icon :icon="showSideBar ? 'ic:sharp-menu-open' : 'ic:sharp-menu'" />
        </DBtn>
        <RouterLink to="/">
          <img
            alt="D blogs logo"
            src="/favicon.svg"
            class="dark:invert inline-block w-8 mx-2"
          />
          <span class="pointer-events-none">{{ appConfig.network }}</span>
        </RouterLink>
      </div>
      <div class="flex items-center gap-2 text-xl">
        <ThemeSwitch />
      </div>
    </nav>
  </DWrapShape>
</template>
