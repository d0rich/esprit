<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const languages = [
  {
    name: 'English',
    emoji: '🇬🇧'
  },
  {
    name: 'français',
    emoji: '🇫🇷'
  },
  {
    name: 'русский',
    emoji: '🇷🇺'
  }
]

const currentLanguage = ref(languages[0])
function changeLanguage() {
  const currentIndex = languages.findIndex(
    (lang) => lang.name === currentLanguage.value.name
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
      <strong :key="currentLanguage.name" class="font-bold" aria-hidden="true">
        {{ currentLanguage.name }} <span>{{ currentLanguage.emoji }}</span>
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
