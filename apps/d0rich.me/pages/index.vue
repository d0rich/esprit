<script setup lang="ts">
import { definePageMeta } from '#imports'
import AsyncSafeSeoWithOg from '~/components/AsyncSafeSeoWithOg.vue'
import IntroSection from '~/components/homepage/IntroSection/index.vue'
import SkillsSection from '~/components/homepage/SkillsSection/Index.vue'
import StorySection from '~/components/homepage/StorySection.vue'
import ContentSection from '~/components/homepage/ContentSection/Index.vue'

definePageMeta({
  colorMode: 'dark'
})
</script>

<template>
  <div class="-mt-20">
    <AsyncSafeSeoWithOg og-title="Homepage" />
    <IntroSection />
    <ContentSection />
    <!-- Block about skills -->
    <SkillsSection />
    <StorySection />
  </div>
</template>
