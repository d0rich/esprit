export const useBlogNavigationConfig = () => {
  const config = useRuntimeConfig()
  return {
    itemsOnPage: 6
  }
}

export const useProjectsNavigationConfig = () => {
  return {
    itemsOnPage: 5
  }
}
