<script setup lang="ts">
import { DWrapBackground, DAnimationHypnosis, Icon } from '#components'

import TechnologiesCard from './TechnologiesCard.vue'
import ProfessionalStats from './ProfessionalStats.vue'
import FocusCard from './FocusCard.vue'
import MotivationCard from './MotivationCard.vue'
import VideoCard from './VideoCard.vue'
</script>

<template>
  <DWrapBackground id="essence" tag="section">
    <div class="pt-10" />
    <a href="#essence">
      <h1>Essence</h1>
    </a>

    <div
      class="max-w-7xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-5"
    >
      <FocusCard class="max-w-xl focus-card" />
      <MotivationCard class="max-w-xl motivation-card" />
      <TechnologiesCard class="max-w-xl technologies-card" />
      <ProfessionalStats class="max-w-sm min-w-96 professional-stats" />
      <VideoCard class="max-w-xl video-card" />
    </div>
    <div style="height: 20vh" />

    <template #svg>
      <div class="relative w-full h-full max-w-3xl mx-auto" aria-hidden="true">
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
#essence {
  background:
    var(--d-card-x-ray--action__white), radial-gradient(#22d3ee, #0e7490);
  contain: layout;
  @apply font-dialog;
}

#essence h1 {
  background:
    var(--d-card-x-ray--action__color), rgb(255 255 255 / var(--tw-bg-opacity));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  @apply text-center text-7xl sm:text-8xl pt-3 sm:mb-9 mx-2 mb-20 font-bold;
}

@media (min-width: 768px) {
  #essence .video-card {
    /* Make it 2 columns */
    grid-column: 1 / span 2;
  }
}
</style>

<style>
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    #essence .focus-card,
    #essence .technologies-card,
    #essence .video-card {
      position: relative;
      animation: slide-left ease-in-out both;
      animation-timeline: view(y 95% 0);
    }

    #essence .motivation-card,
    #essence .professional-stats {
      position: relative;
      animation: slide-right ease-in-out both;
      animation-timeline: view(y 95% 0);
    }
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
