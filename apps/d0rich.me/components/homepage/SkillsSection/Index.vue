<script setup lang="ts">
import { DWrapBackground, DAnimationHypnosis, Icon } from '#components'

import DStats from '~/components/content/DStats.vue'
import DCard from '~/components/content/DCard.vue'
import DCardTitle from '~/components/content/DCardTitle.vue'
import BackgroundCard from './BackgroundCard.vue'
</script>

<template>
  <DWrapBackground id="skills" tag="section">
    <div class="pt-20" />
    <h1>Professional</h1>
    <div
      class="max-w-7xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-5"
    >
      <BackgroundCard class="max-w-xl background-card" />
      <DStats
        class="max-w-sm min-w-96"
        :titles="['Front-End', 'Back-End', 'Web3', 'Design', 'Needs']"
        :values="[5, 5, 3, 4, 5]"
      />
    </div>
    <div style="height: 20vh" />

    <template #svg>
      <div class="w-full h-full overflow-hidden">
        <div class="relative w-full h-full max-w-3xl mx-auto">
          <DAnimationHypnosis
            class="absolute inset-0 mx-auto right-2/3 top-28 w-80 -rotate-12"
          />
          <DAnimationHypnosis
            class="absolute inset-0 m-auto left-1/4 bottom-64 w-96 rotate-12"
          />
          <DAnimationHypnosis class="absolute -left-40 bottom-5 w-96" />
        </div>
      </div>
    </template>
  </DWrapBackground>
</template>

<style scoped>
#skills {
  background:
    var(--d-card-x-ray--action__white), radial-gradient(#22d3ee, #0e7490);
  contain: layout;
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

<style>
@supports (animation-timeline: view()) {
  #skills .background-card {
    position: relative;
    animation: slide-right linear both;
    animation-timeline: view(y 80% 40%);
  }
}

@keyframes slide-left {
  from {
    left: -100vw;
  }
  to {
    left: 0vw;
  }
}
@keyframes slide-right {
  from {
    right: -100vw;
  }
  to {
    right: 0vw;
  }
}
</style>
