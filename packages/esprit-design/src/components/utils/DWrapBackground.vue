<script setup lang="ts">
import { type StyleValue, computed } from 'vue'

defineOptions({
  name: 'DWrapBackground'
})
const props = defineProps({
  overlayClass: {
    type: [String, Object as () => Record<string, boolean>],
    default: ''
  },
  overlayStyle: {
    type: Object as () => StyleValue,
    default: () => {}
  },
  dotsClass: {
    type: [String, Object as () => Record<string, boolean>],
    default: ''
  },
  dotsStyle: {
    type: Object as () => StyleValue,
    default: () => {}
  },
  dots: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'div'
  }
})

const slots = defineSlots<{
  svg?: () => {}
  default?: () => {}
}>()

const isOverlayStyleEmpty = computed(() => {
  if (typeof props.overlayStyle === 'string') return !props.overlayStyle.trim()
  if (Array.isArray(props.overlayStyle)) return props.overlayStyle.length === 0
  if (props.overlayStyle === null) return true
  if (props.overlayStyle === undefined) return true
  return Object.keys(props.overlayStyle).length === 0
})
</script>

<template>
  <Component :is="tag" class="mbg__main-container">
    <div
      v-if="overlayClass || !isOverlayStyleEmpty || slots.svg || slots.default"
      class="mbg__relative-container"
    >
      <div
        v-if="overlayClass || !isOverlayStyleEmpty"
        class="mbg__layer"
        :class="overlayClass"
        :style="overlayStyle"
      />
      <div v-if="slots.svg" class="mbg__layer">
        <slot name="svg" />
      </div>
      <div
        v-if="dots"
        class="mbg__layer mbg__dots"
        :class="dotsClass"
        :style="dotsStyle"
      />
      <div v-if="slots.default" class="mbg__content">
        <slot />
      </div>
    </div>
  </Component>
</template>

<style>
.mbg__main-container {
  isolation: isolate;
}
.mbg__relative-container {
  @apply relative w-full h-full;
}
.mbg__layer {
  inset: 0;
  @apply absolute;
}
.mbg__dots {
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(0)" opacity="0.2" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g  fill="%23250E17"><circle cx="25" cy="25" r="12.5"/><circle cx="75" cy="75" r="12.5"/><circle cx="75" cy="25" r="12.5"/><circle cx="25" cy="75" r="12.5"/></g></svg>');
  background-size: 2rem;
}
.mbg__content {
  @apply relative z-[1];
}
</style>
