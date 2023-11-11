<script lang="ts">
import DCard from '@d0rich/esprit-design/src/components/cards/DCard.vue'
export default DCard
</script>

<style>
:root {
  --d-card-x-ray--idle__position: calc(60vw - 50vh) -25vh / auto 150vh no-repeat
    fixed;
  --d-card-x-ray--idle__color: url('../../../assets/img/character/idle-shape-yellow-400.svg')
    var(--d-card-x-ray--idle__position);
  --d-card-x-ray--idle__white: url('../../../assets/img/character/idle-shape-white.svg')
    var(--d-card-x-ray--idle__position);
  --d-card-x-ray--action__position: center / auto 100vh no-repeat fixed;
  --d-card-x-ray--action__color: url('../../../assets/img/character/action-shape-cyan-400.svg')
    var(--d-card-x-ray--action__position);
  --d-card-x-ray--action__white: url('../../../assets/img/character/action-shape-white.svg')
    var(--d-card-x-ray--action__position);
}
</style>
