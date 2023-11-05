<script setup lang="ts">
const { $mermaid } = useNuxtApp()

const props = defineProps<{
  code: string
}>()

const decodedCode = computed(() => {
  return atob(props.code)
})

const spinner = resolveComponent(useAppConfig().contentMermaid.spinnerComponent)
const codeBlock = ref<HTMLElement | null>(null)
const isDiagramLoading = ref(true)

async function renderMermaidDiagram() {
  isDiagramLoading.value = true
  if (codeBlock.value && $mermaid) {
    try {
      await $mermaid.run({
        nodes: [codeBlock.value],
        suppressErrors: true
      })
    } catch (e) {}

    isDiagramLoading.value = false
  }
}

onMounted(() => {
  setTimeout(() => {
    renderMermaidDiagram()
  }, 100)
})
</script>

<template>
  <figure ref="root" class="mermaid-container">
    <pre
      ref="codeBlock"
      :class="{
        'opacity-0': isDiagramLoading
      }"
      v-text="decodedCode"
    ></pre>
    <div>
      <div v-if="isDiagramLoading" class="mermaid-placeholder font-serif">
        <component :is="spinner" class="mermaid-placeholder__spinner" />
        Mermaid diagram is loading...
      </div>
    </div>
  </figure>
</template>

<style>
.mermaid-container {
  position: relative;
}
.mermaid-placeholder {
  position: absolute;
  inset: 0;
}

.mermaid-placeholder__spinner {
  max-height: calc(100% - 2rem);
}

.opacity-0 {
  opacity: 0;
}
</style>
