<template>
  <code class="not-prose prose-code-inline">
    <slot />
  </code>
</template>

<style>
.prose-code-inline {
  @apply px-1 py-0.5 text-sm
       dark:bg-neutral-800 border dark:border-neutral-700
       bg-neutral-200 border-neutral-400;
}
</style>
