import { useState } from '#app'

export const useLayoutState = () => ({
  showHeader: useState(() => true)
})
