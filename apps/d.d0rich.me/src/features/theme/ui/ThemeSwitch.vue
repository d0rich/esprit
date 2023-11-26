<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { DBtn } from '@d0rich/esprit-design'

import { useThemeStore, type ColorMode } from '../stores/themeStore'

const theme = useThemeStore()
const modes = ref<
  {
    name: ColorMode
    icon: string
  }[]
>([
  { name: 'system', icon: 'ic:sharp-monitor' },
  { name: 'light', icon: 'ic:sharp-light-mode' },
  { name: 'dark', icon: 'ic:sharp-dark-mode' }
])

const currentMode = computed(() => {
  return modes.value.find((m) => m.name === theme.theme)
})

function switchMode() {
  const currentModeIndex = modes.value.findIndex((m) => m === currentMode.value)
  const nextModeIndex = (currentModeIndex + 1) % modes.value.length
  theme.setTheme(modes.value[nextModeIndex].name)
}
</script>

<template>
  <DBtn no-rotate @click="switchMode">
    <Icon :icon="currentMode?.icon || ''" />
  </DBtn>
</template>
../stores/themeStore
