import { useState } from '#imports'

export const useLayoutState = () => ({
  showHeader: useState(() => true)
})
