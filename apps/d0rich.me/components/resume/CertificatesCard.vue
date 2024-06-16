<script setup lang="ts">
import type { ResumeData } from '~/server/routes/api/resume/data'

defineProps<{
  cerificates: ResumeData['certificates']
}>()
</script>

<template>
  <DCard dense class="">
    <ul class="resume-sertificates-card__list">
      <li
        v-for="cert in cerificates"
        :key="cert._id"
        class="break-inside-avoid"
      >
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
        <ContentRendererMarkdown
          tag="span"
          :value="cert"
          :components="{ p: 'span' }"
        />
      </li>
    </ul>
  </DCard>
</template>

<style>
.resume-sertificates-card__list {
  @apply pl-5 space-y-3 list-disc;
}
a.resume-sertificates-card__place {
  @apply underline dark:text-blue-300 text-blue-800;
}
</style>
