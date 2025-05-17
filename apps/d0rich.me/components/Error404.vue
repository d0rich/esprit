<script setup lang="ts">
import { DCharacter, DBigBangButton } from '#components'
import AsyncSafeSeoWithOg from '~/components/AsyncSafeSeoWithOg.vue'
</script>

<template>
  <section class="flex justify-evenly items-center flex-wrap gap-4">
    <AsyncSafeSeoWithOg title="Error 404" />
    <DCharacter
      class="w-[clamp(300px,_50%,_430px)]"
      pose="idle"
      no-image
      shape-class="fill-red-600"
    />
    <div>
      <h1 class="text-4xl mb-4 text-red-400">Oops! Error 404</h1>
      <p class="mb-4">Sorry, but it seems this page does not exist 😔</p>
      <DBigBangButton class="underline" text="To Homepage" to="/" />
    </div>
  </section>
</template>
