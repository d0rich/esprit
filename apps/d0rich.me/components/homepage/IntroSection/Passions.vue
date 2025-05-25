<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { queryCollection, useAsyncData } from '#imports'

const { data: passionsData } = await useAsyncData('passions', () =>
  queryCollection('home_lists').where('name', '=', 'Passions').first()
)

const passions = passionsData.value?.items || []

const currentPassion = ref(passions[0])
function changePassion() {
  const randomIndex = Math.floor(Math.random() * passions.length)
  if (currentPassion.value.title === passions[randomIndex].title) {
    changePassion()
    return
  }
  currentPassion.value = passions[randomIndex]
}
function currentPassionText() {
  return currentPassion.value.emoji + ' ' + currentPassion.value.title
}

const printedText = ref(currentPassionText())
let intervalId: NodeJS.Timeout | undefined = undefined
function printText() {
  const text = currentPassionText()
  const symbols = Intl?.Segmenter
    ? [
        ...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)
      ].map((x) => x.segment)
    : text.split('')
  let index = 0
  printedText.value = ''
  intervalId = setInterval(() => {
    if (index < symbols.length) {
      printedText.value += symbols[index]
      index++
    } else {
      clearInterval(intervalId)
      intervalId = setTimeout(() => {
        clearText()
      }, 1000)
    }
  }, 100)
}
function clearText() {
  const text = printedText.value
  const symbols = Intl?.Segmenter
    ? [
        ...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)
      ].map((x) => x.segment)
    : text.split('')
  intervalId = setInterval(() => {
    if (printedText.value.length > 0) {
      symbols.pop()
      printedText.value = symbols.join('')
    } else {
      clearInterval(intervalId)
      changePassion()
      printText()
    }
  }, 50)
}

onMounted(() => {
  intervalId = setTimeout(() => {
    clearText()
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <span
    aria-live="polite"
    aria-atomic="true"
    :aria-label="currentPassion.title"
  >
    <strong>{{ printedText }}</strong
    ><span class="cursor" aria-hidden="true">|</span>
  </span>
</template>

<style scoped>
.cursor {
  display: inline-block;
  width: 1ch;
  height: 1em;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
