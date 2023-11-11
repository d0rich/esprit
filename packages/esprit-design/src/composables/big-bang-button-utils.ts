import { ref } from 'vue'

const bigBangButtonAnimationText = ref('')

export const useDBigBangButtonUtils = () => ({
  text: bigBangButtonAnimationText
})
