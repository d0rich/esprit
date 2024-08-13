<script setup lang="ts">
import type { ResumeData } from '~/server/routes/api/resume/data'

defineProps<{
  projects: ResumeData['projects']
}>()
</script>

<template>
  <DCard dense>
    <ul class="resume-projects-card__list">
      <li
        v-for="project in projects"
        :key="project.url"
        class="break-inside-avoid"
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

<style>
.resume-projects-card__list {
  @apply pl-5 space-y-3 list-disc print:text-sm;
}
a.resume-projects-card__place {
  @apply underline dark:text-blue-300 text-blue-800;
}
</style>
