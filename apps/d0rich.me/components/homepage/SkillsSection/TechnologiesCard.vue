<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, computed } from 'vue'
import { useAsyncData, queryCollection } from '#imports'
import { Icon } from '#components'
import { usePreferredReducedMotion } from '@vueuse/core'

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

const prefersReducedMotion = usePreferredReducedMotion()

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
  if (prefersReducedMotion.value === 'reduce') {
    intervalId = setInterval(() => {
      for (let i = 0; i < 4; i++) {
        switchTechnology()
      }
    }, 2000)
    return
  }
  intervalId = setInterval(switchTechnology, 300)
})
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
<template>
  <DCard mode="homepage-skills">
    <DCardTitle>Technologies</DCardTitle>
    <div class="text-xl">
      It is hard to list all the technologies I have worked with 🤓.
      <div class="grid grid-cols-[auto_1fr] gap-x-10 mt-5 items-center">
        <div>For example:</div>
        <ul
          class="my-16 relative h-[1.5em]"
          aria-live="polite"
          aria-atomic="true"
        >
          <li
            v-for="technology in [
              nextTechnology,
              currentTechnology,
              prevTechnology,
              disappearingTechnology
            ]"
            :key="technology.title"
            class="rotate-item"
            tabindex="-1"
          >
            <span>{{ technology.title }}{{ ' ' }}</span>
            <Icon :name="technology.icon!" :aria-label="technology.title" />
          </li>
        </ul>
      </div>
      <p class="text-balance">
        This experience makes me truly technology-agnostic professional 🤹‍♂️,
        allowing to focus on the main goal –
        <strong>delivering the best products 🚀</strong>.
      </p>
    </div>
  </DCard>
</template>

<style scoped>
.rotate-item {
  top: 0;
  white-space: nowrap;
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

@media (prefers-reduced-motion: reduce) {
  .rotate-item:nth-child(n) {
    transition: none;
    animation: none;
  }
}

@keyframes rotate-enter {
  from {
    opacity: 0;
    rotate: -24deg;
  }
  50% {
    opacity: 1;
  }
  to {
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
  50% {
    opacity: 0;
  }
  to {
    rotate: 24deg;
  }
}
</style>
