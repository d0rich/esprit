import { QueryBuilderWhere } from '@nuxt/content/dist/runtime/types'

export const useBlogNavigationConfig = () => {
  const config = useRuntimeConfig()
  const filterObject: QueryBuilderWhere = config.public.isProd
    ? { _draft: { $not: true } }
    : {}
  return {
    itemsOnPage: 6,
    filter: filterObject
  }
}

export const useProjectsNavigationConfig = () => {
  return {
    itemsOnPage: 5
  }
}
