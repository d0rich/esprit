<script setup lang="ts">
import { ref } from 'vue'
import ProseCodeCopyButton from '../ProseCodeCopyButton.vue'

withDefaults(
  defineProps<{
    code?: string
    language?: string
    filename?: string
    meta?: string
    highlights?: number[]
    style?: string | object
  }>(),
  {
    code: '',
    highlights: () => []
  }
)

const hovered = ref(false)
</script>

<template>
  <div
    :class="[`highlight-${language}`]"
    class="prose-code not-prose"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <span v-if="filename" class="filename">
      {{ filename }}
    </span>

    <pre :class="$props.class" :style="style" :data-language="language">
        <slot />
    </pre>
    <ProseCodeCopyButton :show="hovered" :content="code" class="copy-button" />
  </div>
</template>

<style>
.prose-code {
  @apply text-xs relative overflow-hidden w-full dark:bg-neutral-800 bg-neutral-200;
}

.prose-code code {
  @apply w-full flex flex-col;
}

.prose-code .line {
  @apply inline-table min-h-4;
}

.prose-code pre {
  display: flex;
  flex: 1;
  overflow-x: auto;
  margin: 0;
  @apply p-2;
}

.prose-code pre code {
  padding-inline-end: 30px;
}

.prose-code .line.highlight {
  @apply bg-neutral-700;
}

.prose-code .filename {
  @apply absolute opacity-0 top-0 right-0 p-2 text-xs font-mono transition-opacity dark:bg-neutral-700 dark:text-neutral-100 bg-neutral-100 text-neutral-900;
}

.prose-code .copy-button {
  @apply absolute bottom-0 right-0;
}

.prose-code:hover .filename {
  @apply opacity-100;
}

.prose-code:hover .filename:hover {
  @apply opacity-0;
}
</style>
