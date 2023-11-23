<script setup lang="ts">
import DHeader from './components/DHeader.vue'
</script>

<template>
  <DHeader />
  <main class="pt-40">
    <slot />
  </main>
</template>
