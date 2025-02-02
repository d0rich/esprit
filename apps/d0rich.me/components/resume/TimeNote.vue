<script setup lang="ts">
import type { ResumeWorkExperienceCollectionItem } from '@nuxt/content'
import { dateToMonthYear, formatYearMonthDateDiff } from '~/utils/date'

export interface TimeNote extends ResumeWorkExperienceCollectionItem {}

defineProps<{
  timenote: TimeNote
}>()
</script>

<template>
  <DCard dense>
    <DCardTitle
      class="break-inside-avoid-page break-after-avoid-page not-prose"
    >
      <span class="dark:text-black text-white print:text-black">
        {{ timenote.title }}
      </span>
      <template #extra>
        <Component
          :is="timenote.place.link ? 'a' : 'span'"
          :href="timenote.place.link"
          target="_blank"
          class="timenote__place-link"
        >
          {{ timenote.place.title }}
        </Component>
      </template>
    </DCardTitle>
    <p class="timenote__daterange">
      <time :datetime="timenote.daterange.start">
        {{ dateToMonthYear(timenote.daterange.start) }}
      </time>
      -
      <time :datetime="timenote.daterange.end">
        {{
          timenote.daterange.end
            ? dateToMonthYear(timenote.daterange.end)
            : 'Present'
        }}
      </time>
      <span v-if="timenote.daterange.start">
        ({{
          formatYearMonthDateDiff(
            new Date(timenote.daterange.start),
            new Date(timenote.daterange.end ?? new Date())
          )
        }})
      </span>
    </p>
    <ContentRenderer
      class="prose prose-blue dark:prose-invert print:prose-sm max-w-screen-lg break-inside-avoid-page"
      :value="timenote"
    />
  </DCard>
</template>

<style>
a.timenote__place-link {
  @apply underline print:ml-2;
}
.timenote__daterange {
  @apply text-blue-600 dark:text-blue-300 print:text-sm
         break-inside-avoid break-after-avoid-page;
}
</style>
