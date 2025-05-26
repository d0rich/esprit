<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, computed } from 'vue'
import { useAsyncData, queryCollection } from '#imports'
import { DWrapBackground, DAnimationHypnosis, Icon } from '#components'

import DStats from '~/components/content/DStats.vue'
import DCard from '~/components/content/DCard.vue'
import DCardTitle from '~/components/content/DCardTitle.vue'

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const { data: technologiesData } = await useAsyncData(
  () =>
    queryCollection('home_lists').where('name', '=', 'Technologies').first(),
  {
    transform: (data) => {
      shuffle(data.items)
      return data
    }
  }
)
if (!technologiesData.value) {
  throw new Error('Technologies data not found')
}

const technologies = technologiesData.value.items
const currentTechnologyIndex = ref(0)

const disappearingTechnology = computed(() => {
  return technologies[
    (currentTechnologyIndex.value - 2 + technologies.length) %
      technologies.length
  ]
})
const prevTechnology = computed(() => {
  return technologies[
    (currentTechnologyIndex.value - 1 + technologies.length) %
      technologies.length
  ]
})
const currentTechnology = computed(() => {
  return technologies[currentTechnologyIndex.value]
})
const nextTechnology = computed(() => {
  return technologies[(currentTechnologyIndex.value + 1) % technologies.length]
})

function switchTechnology() {
  currentTechnologyIndex.value =
    (currentTechnologyIndex.value + 1) % technologies.length
}

let intervalId: ReturnType<typeof setInterval>
onMounted(() => {
  intervalId = setInterval(switchTechnology, 300)
})
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <DWrapBackground id="skills" tag="section" class="overflow-hidden">
    <div class="pt-20" />
    <h1>Professional</h1>
    <div class="max-w-7xl mx-auto px-3">
      <div class="skills-group">
        <DStats
          :titles="['Front-End', 'Back-End', 'Web3', 'Design', 'Needs']"
          :values="[5, 5, 3, 4, 5]"
        />
        <DCard mode="homepage-skills">
          <DCardTitle>Background</DCardTitle>
          <div class="text-xl font-semibold">
            I worked with a vide range of technologies
            <div class="grid grid-cols-[auto_1fr] gap-x-10 items-center">
              <div>such as:</div>
              <div class="my-20 relative">
                <div
                  v-for="technology in [
                    nextTechnology,
                    currentTechnology,
                    prevTechnology,
                    disappearingTechnology
                  ]"
                  :key="technology.title"
                  class="rotate-item"
                >
                  {{ technology.title }}
                  <Icon :name="technology.icon!" />
                </div>
              </div>
            </div>
          </div>
        </DCard>
      </div>
    </div>
    <div style="height: 20vh" />

    <template #svg>
      <div class="relative w-full h-full max-w-3xl mx-auto">
        <DAnimationHypnosis
          class="absolute inset-0 mx-auto right-2/3 top-28 w-80 -rotate-12"
        />
        <DAnimationHypnosis
          class="absolute inset-0 m-auto left-1/4 bottom-64 w-96 rotate-12"
        />
        <DAnimationHypnosis class="absolute -left-40 bottom-5 w-96" />
      </div>
    </template>
  </DWrapBackground>
</template>

<style scoped>
#skills {
  background:
    var(--d-card-x-ray--action__white), radial-gradient(#22d3ee, #0e7490);
  @apply font-dialog;
}

#skills h1 {
  background:
    var(--d-card-x-ray--action__color), rgb(255 255 255 / var(--tw-bg-opacity));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  @apply text-center text-7xl sm:text-8xl pt-3 sm:mb-9 mx-2 mb-20 font-bold;
}

#skills .skills-group {
  @apply flex flex-col-reverse items-center md:flex-row
         mb-36;
}

#skills .skills-group:nth-child(2n) {
  @apply md:flex-row-reverse;
}

#skills .skills-group > :nth-child(1) {
  @apply md:w-1/3;
}

#skills .skills-group > :nth-child(2) {
  @apply md:w-2/3;
}
</style>

<style scoped>
/* slide-fade transition */
.rotate-item {
  top: 0;
  transform-origin: -6em 50%;
  translate: 0;
  --animation-length: 0.3s;
  --animation-ease: linear;
  transition: var(--animation-length) var(--animation-ease);
  transition-property: opacity, transform;
  @apply font-bold absolute;
}

.rotate-item:nth-child(1) {
  rotate: -12deg;
  animation: rotate-enter var(--animation-length) var(--animation-ease) forwards;
}

.rotate-item:nth-child(2) {
  rotate: 0deg;
  animation: rotate-1-2 var(--animation-length) var(--animation-ease) forwards;
}
.rotate-item:nth-child(3) {
  rotate: 12deg;
  animation: rotate-2-3 var(--animation-length) var(--animation-ease) forwards;
}
.rotate-item:nth-child(4) {
  rotate: 24deg;
  opacity: 0;
  animation: rotate-leave var(--animation-length) var(--animation-ease) forwards;
}

@keyframes rotate-enter {
  from {
    opacity: 0;
    rotate: -24deg;
  }
  to {
    opacity: 1;
    rotate: -12deg;
  }
}

@keyframes rotate-1-2 {
  from {
    rotate: -12deg;
  }
  to {
    rotate: 0deg;
  }
}

@keyframes rotate-2-3 {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 12deg;
  }
}

@keyframes rotate-leave {
  from {
    opacity: 1;
    rotate: 12deg;
  }
  to {
    opacity: 0;
    rotate: 24deg;
  }
}
</style>
