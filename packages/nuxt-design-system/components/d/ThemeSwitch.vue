<script setup lang="ts">
const colorMode = useColorMode()
const modes = ref([
  { name: 'system', icon: 'ic:sharp-monitor' },
  { name: 'light', icon: 'ic:sharp-light-mode' },
  { name: 'dark', icon: 'ic:sharp-dark-mode' }
])

const currentMode = computed(() => {
  const mode = colorMode.preference
  return modes.value.find((m) => m.name === mode)
})

function switchMode() {
  const currentModeIndex = modes.value.findIndex((m) => m === currentMode.value)
  const nextModeIndex = (currentModeIndex + 1) % modes.value.length
  colorMode.preference = modes.value[nextModeIndex].name
}
</script>

<template>
  <DBtn no-rotate @click="switchMode">
    <Icon :name="currentMode?.icon || ''" />
  </DBtn>
</template>
