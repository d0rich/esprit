<script setup lang="ts">
import AvatarAnimated from '../../AvatarAnimated.vue'
import Languages from './Languages.vue'
import SocialLinks from './SocialLinks.vue'
import Passions from './Passions.vue'
import { ProseCode, Icon, Head, Link } from '#components'
</script>

<template>
  <section class="intro-main">
    <Head>
      <Link rel="preload" as="image" href="~/assets/img/bg/d-bw.svg" />
    </Head>
    <div class="intro-bw-section">
      <AvatarAnimated
        class="w-48"
        :frame="true"
        :bg-style="{ fill: '#22c55e' }"
      />
    </div>
    <div class="intro-text grid grid-rows-[1fr_auto]">
      <div class="flex flex-col justify-center sm:items-start items-center p-4">
        <p
          class="text-balance text-center sm:text-left"
          aria-label="Introduction"
        >
          <span role="img" aria-label="Waving hand">👋</span>
          Hello, my name is <strong>Nikolai Dorofeev</strong> (a.k.a.
          <ProseCode style="font-size: 0.875em" aria-hidden="true" role="text">
            d0rich</ProseCode
          >
          <span class="sr-only">Dorich</span>
          )
        </p>
        <p class="my-[1em]">
          <Languages />
        </p>
        <p class="text-balance text-center sm:text-left">
          I'm a <strong>software engineer</strong> and a
          <strong>student</strong> with a passion for
        </p>
        <p class="text-balance text-center sm:text-left h-[2em]">
          <Passions />
        </p>
      </div>
      <address class="mt-4">
        <p class="text-center sm:text-left">
          <Icon
            name="mdi:map-marker"
            class="inline-block"
            aria-hidden="true"
            focusable="false"
          />
          <span class="sr-only">Location:</span>
          Tbilisi, Georgia
        </p>
        <SocialLinks class="pb-5 mt-3" />
      </address>
    </div>
  </section>
</template>

<style>
.intro-main {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  min-height: 100vh;
  min-height: 100svh;
  background: radial-gradient(#22c55e, #15803d);
}
.intro-bw-section {
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 35%;
  min-width: 16rem;
  inset: 0;
  background-image:
    url('~/assets/img/bg/d-bw.svg'),
    radial-gradient(#000, #fff);
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, calc(100% - 2rem) 0, 100% 100%, 0 100%);
}
.intro-text {
  @apply text-3xl;
}

@media screen and (max-width: 640px) {
  .intro-main {
    display: grid;
    grid-template-rows: auto 1fr;
  }
  .intro-bw-section {
    padding-top: 5rem;
    width: 100%;
    max-height: 16rem;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), 0 100%);
  }
}

@media screen and (max-width: 640px) and (max-height: 895px) {
  .intro-text {
    @apply text-2xl;
  }
}
</style>
