import { useProjectsNavigationConfig } from '~~/composables/navigation'
import { ProjectsRepository } from '~~/server/utils/repositories/projects'

export default defineEventHandler(async (event) => {
  const page = Number.parseInt(getRouterParam(event, 'page'))
  if (!page) {
    throw new Error('Invalid page number')
  }
  const config = useProjectsNavigationConfig()
  const paginationMeta = await ProjectsRepository.getPaginationMeta(
    config.itemsOnPage
  )
  return {
    _page: page,
    _itemsOnPage: config.itemsOnPage,
    _pagesCount: paginationMeta.pagesCount,
    items: await ProjectsRepository.getPaginatedProjects(
      page,
      config.itemsOnPage
    )
  }
})
