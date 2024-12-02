<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import { useClipboard, onClickOutside } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    content?: string
    show?: boolean
  }>(),
  {
    content: '',
    show: false
  }
)

const copyButtonRef = ref<HTMLElement>()

const { copy: copyToClipboard } = useClipboard()
onClickOutside(copyButtonRef, () => {
  if (state.value === 'copied') {
    state.value = 'init'
  }
})

const state = ref('init')

const copy = (_e: MouseEvent) => {
  copyToClipboard(props.content)
    .then(() => {
      state.value = 'copied'
    })
    .catch((err) => {
       
      console.warn('Couldn\'t copy to clipboard!', err)
    })
}
</script>

<template>
  <button
    class="prose-copy-code-btn"
    ref="copyButtonRef"
    :class="[(show || state === 'copied') && 'show']"
    @click="copy"
  >
    <span class="sr-only">Copy to clipboard</span>
    <span class="icon-wrapper">
      <Transition name="fade">
        <Icon
          v-if="state === 'copied'"
          name="mdi-light:clipboard-check"
          size="18"
          class="copied"
        />
        <Icon v-else name="mdi-light:clipboard" size="18" />
      </Transition>
    </span>
  </button>
</template>

<style>
.prose-copy-code-btn {
  @apply p-1 m-1 transition-all transform scale-75 opacity-0
         focus:opacity-100 focus:outline-none;
}
.prose-copy-code-btn.show {
  @apply transform scale-100 opacity-100;
}
.icon-wrapper {
  @apply block relative w-4 h-4;
}
.icon-wrapper .icon {
  @apply block absolute;
}
.icon-wrapper .fade-enter-active,
.icon-wrapper .fade-leave-active {
  transition: opacity 200ms;
}
.icon-wrapper .fade-enter-from,
.icon-wrapper .fade-leave-to {
  opacity: 0;
}
</style>
