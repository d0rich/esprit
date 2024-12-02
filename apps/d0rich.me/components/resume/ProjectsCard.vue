<script setup lang="ts">
import type { ResumeData } from '~/server/routes/api/resume/data'

defineProps<{
  projects: ResumeData['projects']
}>()
</script>

<template>
  <DCard
    dense
    class="prose prose-blue dark:prose-invert print:prose-sm max-w-screen-lg"
  >
    <ul>
      <li
        v-for="project in projects"
        :key="project.url"
        class="break-inside-avoid first:break-after-avoid"
      >
        <NuxtLink
          class="resume-projects-card__place"
          :href="addTrailingSlash(project.url)"
        >
          {{ project.title }} </NuxtLink
        >: {{ project.description }}
      </li>
    </ul>
  </DCard>
</template>
