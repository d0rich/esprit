<script lang="ts">
import Stats from '@d0rich/nuxt-design-system/components/d/Stats.vue'

export default Stats
</script>

<style>
.d-stats__icon--single {
  @apply w-full h-full;
}
.d-stats__icon--double:first-child {
  @apply w-2/3 h-auto mt-[20%];
}
.d-stats__icon--double:last-child {
  @apply w-2/3 h-auto ml-[20%] -mt-[40%];
}
</style>
