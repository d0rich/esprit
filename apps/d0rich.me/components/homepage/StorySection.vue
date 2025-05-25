<script setup lang="ts">
import { onMounted, ref, type ComponentPublicInstance } from 'vue'
import { useAsyncData, queryCollection } from '#imports'
import {
  DWrapBackground,
  DCard,
  DCardTitle,
  DAnimationSpinner,
  ContentRenderer
} from '#components'
import { dateToMonthYear } from '~~/utils/date'
import * as storyAnimations from '~~/utils/homepage/story'

const { data } = useAsyncData(
  'homepage_story',
  async () => {
    return queryCollection('home_story')
      .where('path', 'LIKE', '/homepage/story/%')
      .order('date', 'DESC')
      .all()
  },
  {
    transform: (data) => {
      return data.sort((a, b) => {
        const dateA = a.date ? 0 : 1
        const dateB = b.date ? 0 : 1
        return dateB - dateA
      })
    }
  }
)

const storyContainer = ref<Element | null>(null)
const svg = ref<(SVGElement & SVGSVGElement) | null>(null)
const line = ref<SVGPolygonElement | null>(null)
const linePlaceholder = ref<SVGPolygonElement | null>(null)
const cards = ref<ComponentPublicInstance[]>([])

onMounted(() => {
  storyAnimations.applyProgressAnimation(
    storyContainer,
    svg,
    line,
    linePlaceholder
  )
})
</script>

<template>
  <DWrapBackground v-if="data" id="story" tag="section">
    <template #svg>
      <div class="sticky top-[25vh] mt-28 w-full h-screen overflow-hidden">
        <div class="mx-auto max-w-3xl">
          <DAnimationSpinner class="h-[50vh] -ml-[20vh]" />
        </div>
      </div>
    </template>
    <div class="pt-10" />
    <h1>Story</h1>
    <div :ref="(el) => (storyContainer = el as Element)" class="story-blocks">
      <svg
        :ref="(el) => (svg = el as SVGElement & SVGSVGElement)"
        height="100%"
        width="100%"
        class="story-progress"
        viewBox="0 0 10 100"
      >
        <polygon
          :ref="(el) => (linePlaceholder = el as SVGPolygonElement)"
          class="fill-black"
        />
        <polygon
          :ref="(el) => (line = el as SVGPolygonElement)"
          class="fill-white"
        />
      </svg>
      <div class="story-blocks__cards">
        <DCard
          v-for="(doc, index) in data"
          :key="doc.id"
          :ref="
            (el: ComponentPublicInstance) => {
              cards[index] = el
              return undefined
            }
          "
          mode="homepage-story"
        >
          <DCardTitle>
            <template #extra>
              {{ dateToMonthYear(doc.date) }}
            </template>
            {{ doc.title }}
          </DCardTitle>
          <ContentRenderer :value="doc" />
        </DCard>
      </div>
    </div>
  </DWrapBackground>
</template>

<style>
#story {
  background:
    var(--d-card-x-ray--idle__white), radial-gradient(#fde047, #ca8a04);
  @apply font-dialog;
}

#story h1 {
  background:
    var(--d-card-x-ray--idle__color), rgb(255 255 255 / var(--tw-bg-opacity));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  @apply text-center text-7xl sm:text-8xl pt-3 sm:mb-9 mx-2 mb-20 font-bold;
}

#story .character {
  @apply sm:h-96 sm:w-96 max-w-sm h-auto md:max-w-lg
         -ml-20 sm:ml-[unset] transition-all;
}

#story .bubble-1 {
  @apply max-w-md w-2/3
    -ml-40 sm:-ml-20
    sm:text-lg;
}

#story .bubble-1__shape {
  @apply bg-black bg-opacity-90;
  clip-path: var(--shape-bubble--right);
}

#story .bubble-1__text {
  padding: var(--shape-bubble--right__padding);
  @apply font-semibold;
}

#story .bubble-1__text > p {
  @apply mb-3;
}
#story .story-blocks {
  grid-template-columns: auto 1fr;
  column-gap: clamp(1rem, 5vw, 3rem);
  @apply grid justify-start max-w-3xl mx-auto;
}

#story .story-blocks__cards {
  padding-bottom: 60vh;
  overflow: hidden;
  @apply pr-3 grid grid-cols-1 gap-y-20;
}

#story .story-progress {
  position: sticky;
  top: 15vh;
  margin-top: 15vh;
  margin-bottom: 15vh;
  height: 70vh;
  @apply sharp-shadow ss-r-3 ss-b-1 ss-yellow-900 ml-3;
}
</style>
