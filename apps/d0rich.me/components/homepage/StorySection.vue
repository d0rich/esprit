<script setup lang="ts">
import { useAsyncData, queryCollection } from '#imports'
import {
  DWrapBackground,
  DAnimationSpinner,
  ContentRenderer
} from '#components'
import { dateToMonthYear } from '~~/utils/date'
import DCard from '~/components/content/DCard.vue'
import DCardTitle from '~/components/content/DCardTitle.vue'

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

// Automatically generated
const progressBarPoints =
  '7 0 9 13 7 20 7 30 6 40 8 50 6 60 9 73 6 85 8 90 7 100 0 100 3 92 2 80 4 70 1 64 3 47 0 36 2 30 1 20 3 10 2 0'
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
    <div class="story-blocks">
      <svg
        height="100%"
        width="100%"
        class="story-progress"
        viewBox="0 0 10 100"
      >
        <polygon
          class="fill-black progress-bar__background"
          :points="progressBarPoints"
        />
        <polygon
          class="fill-white progress-bar__thumb"
          :points="progressBarPoints"
        />
      </svg>
      <div class="story-blocks__cards">
        <DCard v-for="doc in data" :key="doc.id" mode="homepage-story">
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
<style>
/* Progress bar animations */

#story .story-progress {
  display: none;
}

@supports (animation-timeline: view()) {
  #story .story-progress {
    display: block;
  }
  #story .story-blocks {
    view-timeline-name: --progressBarReveal;
    view-timeline-inset: 80vh 30vh;
  }
  .progress-bar__thumb {
    animation: pogress-bar-scroll linear both;
    animation-timeline: --progressBarReveal;
  }
}

@media (prefers-reduced-motion: reduce) {
  #story .story-progress {
    display: block;
  }
}

/* Automatically generated */
@keyframes pogress-bar-scroll {
  0% {
    clip-path: polygon(
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      7px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px,
      2px 0px
    );
  }

  10% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      9px 13px,
      9px 13px,
      9px 13px,
      9px 13px,
      9px 13px,
      9px 13px,
      9px 13px,
      9px 13px,
      9px 13px,
      3px 10px,
      3px 10px,
      3px 10px,
      3px 10px,
      3px 10px,
      3px 10px,
      3px 10px,
      3px 10px,
      3px 10px,
      3px 10px,
      2px 0px
    );
  }

  20% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 20px,
      7px 20px,
      7px 20px,
      7px 20px,
      7px 20px,
      7px 20px,
      7px 20px,
      7px 20px,
      1px 20px,
      1px 20px,
      1px 20px,
      1px 20px,
      1px 20px,
      1px 20px,
      1px 20px,
      1px 20px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  30% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      7px 30px,
      7px 30px,
      7px 30px,
      7px 30px,
      7px 30px,
      7px 30px,
      7px 30px,
      2px 30px,
      2px 30px,
      2px 30px,
      2px 30px,
      2px 30px,
      2px 30px,
      2px 30px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  40% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      6px 40px,
      6px 40px,
      6px 40px,
      6px 40px,
      6px 40px,
      6px 40px,
      6px 40px,
      0px 36px,
      0px 36px,
      0px 36px,
      0px 36px,
      0px 36px,
      0px 36px,
      0px 36px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  50% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      6px 40px,
      8px 50px,
      8px 50px,
      8px 50px,
      8px 50px,
      8px 50px,
      8px 50px,
      3px 47px,
      3px 47px,
      3px 47px,
      3px 47px,
      3px 47px,
      3px 47px,
      0px 36px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  60% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      6px 40px,
      8px 50px,
      6px 60px,
      6px 60px,
      6px 60px,
      6px 60px,
      6px 60px,
      1px 64px,
      1px 64px,
      1px 64px,
      1px 64px,
      1px 64px,
      3px 47px,
      0px 36px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  70% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      6px 40px,
      8px 50px,
      6px 60px,
      9px 73px,
      9px 73px,
      9px 73px,
      9px 73px,
      4px 70px,
      4px 70px,
      4px 70px,
      4px 70px,
      1px 64px,
      3px 47px,
      0px 36px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  80% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      6px 40px,
      8px 50px,
      6px 60px,
      9px 73px,
      6px 85px,
      6px 85px,
      6px 85px,
      2px 80px,
      2px 80px,
      2px 80px,
      4px 70px,
      1px 64px,
      3px 47px,
      0px 36px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  90% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      6px 40px,
      8px 50px,
      6px 60px,
      9px 73px,
      6px 85px,
      8px 90px,
      8px 90px,
      3px 92px,
      3px 92px,
      2px 80px,
      4px 70px,
      1px 64px,
      3px 47px,
      0px 36px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }

  100% {
    clip-path: polygon(
      7px 0px,
      9px 13px,
      7px 20px,
      7px 30px,
      6px 40px,
      8px 50px,
      6px 60px,
      9px 73px,
      6px 85px,
      8px 90px,
      7px 100px,
      0px 100px,
      3px 92px,
      2px 80px,
      4px 70px,
      1px 64px,
      3px 47px,
      0px 36px,
      2px 30px,
      1px 20px,
      3px 10px,
      2px 0px
    );
  }
}
</style>
