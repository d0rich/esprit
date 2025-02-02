<script setup lang="ts">
import * as storyAnimations from '~~/utils/homepage/story'

const { data } = useAsyncData('homepage', async () => {
  const introPromise = queryCollection('home_story')
    .path('/homepage/story/intro')
    .first()
  const blocksPromise = queryCollection('home_story')
    .where('path', 'LIKE', '/homepage/story/blocks/%')
    .order('date', 'DESC')
    .all()
  const [intro, blocks] = await Promise.all([introPromise, blocksPromise])
  return { intro, blocks }
})

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
  // applyContentRevealAnimation(cards)
})
</script>

<template>
  <DWrapBackground
    v-if="data"
    id="story"
    tag="section"
    overlay-class="story__bg-overlay"
  >
    <template #svg>
      <div class="sticky top-[25vh] mt-28 w-full h-screen overflow-hidden">
        <div class="mx-auto max-w-3xl">
          <DAnimationSpinner class="h-[50vh] -ml-[20vh]" />
        </div>
      </div>
    </template>
    <div class="pt-20" />
    <h1>Story</h1>
    <div class="max-w-7xl px-3 mx-auto -mb-10 sm:-mb-32">
      <div class="flex items-center justify-center">
        <img
          src="~/assets/img/avatar-transparent-frame.webp"
          class="character"
          alt="Nikolai Dorofeev avatar"
        />
        <DWrapShape class="bubble-1" shape-class="bubble-1__shape">
          <template #bg-overlay>
            <div
              class="absolute inset-0 bg-white"
              style="clip-path: var(--shape-bubble--right__outline)"
            />
          </template>
          <ContentRenderer
            :value="data.intro"
            tag="div"
            class="bubble-1__text"
          />
        </DWrapShape>
      </div>
    </div>
    <div
      :ref="
        (el) => {
          storyContainer = el as Element
        }
      "
      class="story-blocks"
    >
      <svg
        :ref="
          (el) => {
            svg = el as SVGElement & SVGSVGElement
          }
        "
        height="100%"
        width="100%"
        class="story-progress"
        viewBox="0 0 10 100"
      >
        <polygon
          :ref="
            (el) => {
              linePlaceholder = el as SVGPolygonElement
            }
          "
          class="fill-black"
        />
        <polygon
          :ref="
            (el) => {
              line = el as SVGPolygonElement
            }
          "
          class="fill-white"
        />
      </svg>
      <div class="story-blocks__cards">
        <DCard
          v-for="(doc, index) in data.blocks"
          :key="doc.id"
          :ref="
            (el: ComponentPublicInstance) => {
              cards[index] = el
              return undefined
            }
          "
          mode="homepage-story"
          class="my-20"
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
  @apply font-dialog bg-[url('~/assets/img/bg/timeline.webp')] bg-fixed bg-cover bg-center;
}

#story .story__bg-overlay {
  background: var(--d-card-x-ray--idle__white),
    rgb(202 138 4 / var(--tw-bg-opacity));
  @apply backdrop-saturate-50 bg-opacity-90;
}

#story h1 {
  background: var(--d-card-x-ray--idle__color),
    rgb(255 255 255 / var(--tw-bg-opacity));
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
  @apply pr-3;
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
