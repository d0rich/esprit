import { resolveDynamicComponent, computed } from 'vue'
import type { RouterLink as _RouterLink, RouteLocationRaw } from 'vue-router'

export interface LinkProps {
  readonly href?: string
  readonly replace?: boolean
  readonly to?: RouteLocationRaw
  readonly exact?: boolean
}

export function useLink(props: LinkProps) {
  const RouterLink = resolveDynamicComponent('RouterLink') as
    | typeof _RouterLink
    | string
  const NuxtLink = resolveDynamicComponent('NuxtLink') as
    | typeof _RouterLink
    | string

  const isLink = computed(() => !!(props.href || props.to))

  if (typeof NuxtLink !== 'string') {
    return {
      isLink,
      linkComponent: NuxtLink
    }
  }

  if (typeof RouterLink !== 'string') {
    return {
      isLink,
      linkComponent: RouterLink
    }
  }

  return {
    isLink,
    linkComponent: 'a'
  }
}
