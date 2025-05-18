<script setup lang="ts">
import AvatarAnimated from '../AvatarAnimated.vue'
</script>

<template>
  <section class="intro-main">
    <div class="intro-bw-section">
      <AvatarAnimated :frame="true" :bg-style="{fill: '#22c55e'}" />
    </div>
  </section>
</template>

<style>
.intro-main {
  height: 100dvh;
  height: 100vh;
  background: radial-gradient(#22c55e, #15803d);
}
.intro-bw-section {
  padding: 2rem;
  height: 100%;
  width: 30%;
  background-image: url('~/assets/img/bg/d-bw.webp');
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, calc(100% - 2rem) 0, 100% 100%, 0 100%);
}

@media screen and (max-width: 640px) {
  .intro-main {
    height: 100vh;
    background: radial-gradient(#22c55e, #15803d);
  }
  .intro-bw-section {
    width: 100%;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), 0 100%);
    background-image: url('~/assets/img/bg/d-bw.webp');
    background-size: cover;
    background-position: center;
  }

}
</style>
