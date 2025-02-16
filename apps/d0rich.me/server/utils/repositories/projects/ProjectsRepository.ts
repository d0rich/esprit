import { normalizeURL, withTrailingSlash, joinURL } from 'ufo'
import type { D0xigenProjectMeta } from '../../types'
import { GithubRepository } from '../github'
import { NetlifyRepository } from '../netlify'
import { CloudflareRepository } from '../cloudflare'

export class ProjectsRepository {
  async getProjects() {
    const parsedProjects = await this.parseProjects()
    const externalProjects = await GithubRepository.getExternalReposPagesMeta()
    return [...parsedProjects, ...externalProjects].filter(
      (project) => typeof project === 'object'
    )
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

  private async parseProjects() {
    const pages = await GithubRepository.getMyGithubReposWithPages()
    const cloudflareDomains =
      await CloudflareRepository.getCloudflarePagesDomains()
    const netlifySites = await NetlifyRepository.getNetlifySites()
    const allSitesUrls = Array.from(
      new Set(
        [
          ...cloudflareDomains.map((domain) => `https://${domain}`),
          ...netlifySites.map((site) => site.url),
          ...pages.map((page) => page.homepage || '')
        ].map((url) => withTrailingSlash(normalizeURL(url)))
      )
    )
    const d0xigenProjectsPromises = allSitesUrls.map(async (url) => {
      try {
        return await $fetch<D0xigenProjectMeta>(
          joinURL(url, '_d0rich/meta.json')
        )
      } catch (e) {
        return undefined
      }
    })
    const d0xigenProjectsWithEmpty = await Promise.all(d0xigenProjectsPromises)
    const d0xigenProjects = d0xigenProjectsWithEmpty.filter(
      (project) => !!project
    ) as D0xigenProjectMeta[]
    const projectsMap = new Map<string, D0xigenProjectMeta>()
    for (const project of d0xigenProjects) {
      projectsMap.set(project.url, project)
    }
    return projectsMap.values()
  }
}
