import type { ComponentPublicInstance } from 'vue'

export const elFromNodeRef = (
  el: ComponentPublicInstance | Element | null
): Element | null => {
  if ((el as ComponentPublicInstance | null)?.$) return null
  return el as Element | null
}

export const componentFromNodeRef = (
  el: ComponentPublicInstance | Element | null
): ComponentPublicInstance | null => {
  if ((el as Element | null)?.attributes) return null
  return el as ComponentPublicInstance | null
}
