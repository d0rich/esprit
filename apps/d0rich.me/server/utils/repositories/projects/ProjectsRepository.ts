import type { D0xigenProjectMeta } from '../../types'
import { GithubRepository } from '../github'

export class ProjectsRepository {
  async getProjects() {
    const pages = await GithubRepository.getMyGithubReposPagesMeta()
    const d0xigenProjectsPromises = pages.map(async (pagesProject) => {
      try {
        return await $fetch<D0xigenProjectMeta>(
          pagesProject.html_url + '/_d0rich/meta.json'
        )
      } catch (e) {}
    })
    const d0xigenProjectsWithEmpty = await Promise.all(d0xigenProjectsPromises)
    return d0xigenProjectsWithEmpty.filter(
      (project) => !!project
    ) as D0xigenProjectMeta[]
  }

  async getProjectsSortedByDate() {
    const projects = await this.getProjects()
    return projects.sort(
      (a, b) =>
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    )
  }

  async getProjectsByTags(...tags: string[]) {
    const projects = await this.getProjectsSortedByDate()
    if (!tags.length) return projects
    return projects.filter((project) => {
      for (const tag of tags) {
        if (project.tags.includes(tag)) return true
      }
      return false
    })
  }

  async getPaginatedProjects(page: number, itemsOnPage: number) {
    const projects = await this.getProjectsSortedByDate()
    const startIndex = (page - 1) * itemsOnPage
    const endIndex = startIndex + itemsOnPage
    return projects.slice(startIndex, endIndex)
  }

  async getPaginationMeta(itemsOnPage: number) {
    const projects = await this.getProjects()
    const pagesCount = Math.ceil(projects.length / itemsOnPage)
    return {
      itemsOnPage,
      pagesCount
    }
  }
}
