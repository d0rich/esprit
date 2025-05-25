<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { queryCollection, useAsyncData } from '#imports'

const { data: languagesData } = await useAsyncData('languages', () =>
  queryCollection('home_lists').where('name', '=', 'Languages').first()
)

const languages = languagesData.value?.items || []

const currentLanguage = ref(languages[0])
function changeLanguage() {
  const currentIndex = languages.findIndex(
    (lang) => lang.title === currentLanguage.value.title
  )
  const nextIndex = (currentIndex + 1) % languages.length
  currentLanguage.value = languages[nextIndex]
}

let timer: NodeJS.Timeout | null = null
onMounted(() => {
  timer = setInterval(() => {
    changeLanguage()
  }, 2000)
})
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <span>
    I speak

    <!-- Visual dynamic content (hidden from screen readers) -->
    <Transition name="slide-fade" mode="out-in">
      <strong :key="currentLanguage.title" class="font-bold" aria-hidden="true">
        {{ currentLanguage.title }} <span>{{ currentLanguage.emoji }}</span>
      </strong>
    </Transition>

    <!-- Static description for screen readers -->
    <span class="sr-only"
      >Multiple languages including English, French, and Russian</span
    >
  </span>
</template>

<style scoped>
/* slide-fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  display: inline-block;
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-from {
  transform: translateY(-1em);
}
.slide-fade-leave-to {
  transform: translateY(1em);
}
</style>
