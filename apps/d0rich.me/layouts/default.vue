<script setup lang="ts">
import DHeader from '~~/components/layouts/DHeader.vue'
import DFooter from '~~/components/layouts/DFooter.vue'
import SectionsTransitionWrapper from '~~/components/layouts/SectionsTransitionWrapper.vue'
</script>

<template>
  <div id="default-layout">
    <div class="fixed w-screen z-50">
      <DHeader class="mx-auto max-w-md sm:max-w-md" />
    </div>
    <main class="pt-20 print:pt-0 min-h-[calc(100vh_-_200px)]">
      <slot />
    </main>
    <DFooter />
    <SectionsTransitionWrapper />
  </div>
</template>

<style>
#default-layout {
  @apply w-full h-full z-40;
  --page-transition-length: 0.4s;
}
</style>

<style>
.section-leave-active,
.section-enter-active {
  transition: all var(--page-transition-length);
}
.section-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.section-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

#default-layout:has(.section-enter-active, .section-leave-active) {
  overflow: hidden;
}
</style>

<style>
::-webkit-scrollbar {
  width: 0.7rem;
  height: 0.4rem;
}

.dark ::-webkit-scrollbar-track {
  @apply bg-neutral-900;
}

.dark ::-webkit-scrollbar-thumb {
  @apply bg-neutral-300;
}

.dark ::-webkit-scrollbar-thumb:hover {
  @apply bg-neutral-50;
}

::-webkit-scrollbar-track {
  @apply bg-neutral-200;
}

::-webkit-scrollbar-thumb {
  @apply bg-neutral-500;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-neutral-700;
}
</style>
