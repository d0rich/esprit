<script setup lang="ts">
import { Icon } from '#components'
import DCard from '~/components/content/DCard.vue'
import DCardTitle from '~/components/content/DCardTitle.vue'
</script>

<template>
  <DCard mode="homepage-skills" dense>
    <DCardTitle>Motivation</DCardTitle>
    <div class="text-xl text-black">
      I have 2 main motivations burning inside me:
      <ul class="list-disc pl-5">
        <li>
          <strong>Impact 🌍</strong> - I want to create software that makes a
          difference in people's lives.
        </li>
        <li>
          <strong>Automatisation 🤖</strong> - I love to make things working on
          their own.
        </li>
      </ul>
    </div>
  </DCard>
</template>
