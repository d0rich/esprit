<script setup lang="ts">
import { definePageMeta } from '#imports'
import AsyncSafeSeoWithOg from '~/components/AsyncSafeSeoWithOg.vue'
import HomepageB1Intro from '~/components/homepage/old/B1Intro.vue'
import HomepageB2Sitemap from '~/components/homepage/old/B2Sitemap.vue'
import HomepageB3Skills from '~/components/homepage/old/B3Skills.vue'
import HomepageB4Story from '~/components/homepage/old/B4Story.vue'

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
