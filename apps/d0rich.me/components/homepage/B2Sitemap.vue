<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
  type ComponentPublicInstance
} from 'vue'
import { useAsyncData } from '#app'
import { queryCollection } from '#imports'
import { withTrailingSlash } from 'ufo'

import * as sectionsAnimations from '~~/utils/homepage/sections'

const { data } = useAsyncData(() => queryCollection('home_sections').all())

const sectionsLineColor = computed(() => {
  if (currentSection.value === 'portfolio') return 'fill-red-700'
  if (currentSection.value === 'blog') return 'fill-cyan-700'
  if (currentSection.value === 'resume') return 'fill-blue-700'
  return 'fill-green-700'
})

const disconnectObserver = ref(() => {})
const currentSection = ref<'portfolio' | 'blog' | 'resume' | null>(null)

const svgRef = ref<SVGSVGElement | null>(null)
const polygonRef = ref<SVGPolygonElement | null>(null)
const sections = ref<Element[]>([])
const sectionsMasks = ref<ComponentPublicInstance[]>([])
const sectionsContent = ref<Element[]>([])

onMounted(() => {
  sectionsAnimations.applyLineAnimation(svgRef, polygonRef)
  disconnectObserver.value = sectionsAnimations.setupCurrentSectionObserver(
    sections,
    currentSection
  )
  sectionsAnimations.applyContentRevealAnimation(sectionsMasks, sectionsContent)
})

onBeforeUnmount(() => disconnectObserver.value())
</script>

<template>
  <DWrapBackground
    id="sitemap"
    tag="section"
    overlay-class="backdrop-saturate-50 bg-neutral-900 bg-opacity-90"
  >
    <template #svg>
      <div class="absolute inset-0 overflow-hidden">
        <DAnimationFloatingLetter
          class="absolute w-56 inset-0 left-1/3 mx-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-32 inset-0 bottom-1/2 right-2/3 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-52 inset-0 left-1/3 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-60 inset-0 bottom-1/3 left-3/4 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-48 inset-0 top-1/2 right-1/3 m-auto"
          :path-class="sectionsLineColor"
        />
        <DAnimationFloatingLetter
          class="absolute w-96 inset-0 top-3/4 left-1/4 m-auto"
          :path-class="sectionsLineColor"
        />
      </div>
      <svg
        :ref="
          (el) => {
            svgRef = el as SVGSVGElement
          }
        "
        height="100%"
        width="100%"
        class="absolute top-0 w-full h-full sharp-shadow ss-r-4 ss-b-2 ss-neutral-900"
        viewBox="70 0 10 100"
        preserveAspectRatio="xMidYMin"
      >
        <polygon
          :ref="
            (el) => {
              polygonRef = el as SVGPolygonElement
            }
          "
          class="transition-colors"
          :class="sectionsLineColor"
        />
      </svg>
    </template>
    <div class="pt-20" />
    <h1>Sitemap</h1>
    <div class="w-full max-w-6xl mx-auto overflow-hidden">
      <div
        v-for="(doc, index) in data"
        :key="doc.id"
        :ref="
          (el) => {
            sections[index] = el as Element
          }
        "
        class="section-description"
      >
        <DMask
          :ref="
            (el: ComponentPublicInstance) => {
              sectionsMasks[index] = el
              return undefined
            }
          "
          :mask="doc.mask"
          color
          class="section-description__image"
        />
        <div
          :ref="(el) => (sectionsContent[index] = el as Element)"
          class="section-description__text"
        >
          <DBigBangButton
            :to="withTrailingSlash(doc.link)"
            :text="doc.title"
            class="underline"
          />
          <ContentRenderer :value="doc" />
        </div>
      </div>
    </div>
  </DWrapBackground>
</template>

<style>
#sitemap {
  @apply bg-[url('~/assets/img/bg/hightech-city.webp')] bg-cover bg-center;
}

#sitemap h1 {
  @apply text-center text-7xl sm:text-8xl font-serif pt-3 mb-5 sm:mb-9 mx-2 font-bold;
}

.section-description {
  @apply flex flex-col md:flex-row justify-around items-end;
}

.section-description__image {
  @apply max-w-full w-96 sharp-shadow ss-r-2 ss-b-1 self-start;
}

.section-description__text {
  @apply font-serif max-w-lg lg:max-w-xl p-10 pt-0;
  text-shadow: var(--tw-shadow-color) 1px 0 0;
}

.section-description__text > p {
  @apply mb-3;
}

.section-description__text > p::first-letter {
  background-color: var(--tw-shadow-color);
}

.section-description:nth-of-type(1) .section-description__image {
  @apply ss-red-800;
}

.section-description:nth-of-type(1) .section-description__text {
  @apply shadow-red-600;
}

.section-description:nth-of-type(2) {
  @apply md:flex-row-reverse;
}

.section-description:nth-of-type(2) .section-description__image {
  @apply ss-cyan-800 self-end;
}

.section-description:nth-of-type(2) .section-description__text {
  @apply shadow-cyan-600 sm:text-right self-start;
}

.section-description:nth-of-type(3) .section-description__image {
  @apply ss-blue-800;
}

.section-description:nth-of-type(3) .section-description__text {
  @apply shadow-blue-600;
}
</style>
