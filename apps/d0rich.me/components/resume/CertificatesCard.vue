<script setup lang="ts">
import type { ResumeData } from '~/server/routes/api/resume/data'

defineProps<{
  cerificates: ResumeData['certificates']
}>()
</script>

<template>
  <DCard
    dense
    class="prose prose-blue dark:prose-invert print:prose-sm max-w-screen-lg"
  >
    <ul>
      <li v-for="cert in cerificates" :key="cert.id" class="break-inside-avoid">
        {{ cert.title }}
        (<NuxtLink
          class="resume-sertificates-card__place"
          :href="cert.place.link"
        >
          {{ cert.place.title }} </NuxtLink
        >,
        <time :datetime="cert.daterange.end">
          {{
            cert.daterange.end ? dateToMonthYear(cert.daterange.end) : 'Present'
          }} </time
        >):
        <ContentRenderer tag="span" :value="cert" />
      </li>
    </ul>
  </DCard>
</template>

<style>
a.resume-sertificates-card__place {
  @apply underline dark:text-blue-300 text-blue-800;
}
</style>
