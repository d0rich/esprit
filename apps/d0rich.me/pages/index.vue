<script setup lang="ts">
import { definePageMeta } from '#imports'
import AsyncSafeSeoWithOg from '~/components/AsyncSafeSeoWithOg.vue'
import IntroSection from '~/components/homepage/IntroSection/index.vue'
import SkillsSection from '~/components/homepage/SkillsSection.vue'
import StorySection from '~/components/homepage/StorySection.vue'

definePageMeta({
  colorMode: 'dark'
})
</script>

<template>
  <div class="-mt-20">
    <AsyncSafeSeoWithOg og-title="Homepage" />
    <IntroSection />
    <!-- Block about skills -->
    <SkillsSection />
    <StorySection />
  </div>
</template>
