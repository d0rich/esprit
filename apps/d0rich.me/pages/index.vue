<script setup lang="ts">
definePageMeta({
  colorMode: 'dark'
})
</script>

<template>
  <div class="-mt-20">
    <AsyncSafeSeoWithOg og-title="Homepage" />
    <!-- Intro block -->
    <HomepageB1Intro />
    <!-- Block about sections -->
    <HomepageB2Sitemap />
    <!-- Block about skills -->
    <HomepageB3Skills />
    <HomepageB4Story />
  </div>
</template>
