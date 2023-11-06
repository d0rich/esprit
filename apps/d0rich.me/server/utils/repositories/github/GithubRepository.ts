import type { Octokit } from 'octokit'
import type { EndpointOptions } from '@octokit/types'
import { createStorage } from 'unstorage'

export class GithubRepository {
  constructor(public readonly octokit: Octokit) {
    this.initCaching(octokit)
  }

  async getMyGithubReposPagesMeta() {
    const reposWithPages = await this.getMyGithubReposWithPages()
    const pagesPromises = reposWithPages.map(async (repo) => {
      const response = await this.octokit.rest.repos.getPages({
        owner: repo.owner.login,
        repo: repo.name
      })
      return response.data
    })
    return Promise.all(pagesPromises)
  }

  private async getRepoLastCommitDate(owner: string, repo: string) {
    const { data: commits } = await this.octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 1
    })
    const lastCommit = commits[0]
    return new Date(lastCommit.commit.author?.date ?? '')
  }

  private async getMyGithubRepos() {
    return await this.octokit.rest.repos.listForUser({
      username: 'd0rich',
      type: 'owner',
      per_page: 100
    })
  }

  private async getMyGithubReposWithPages() {
    const repos = await this.getMyGithubRepos()
    return repos.data.filter((repo) => repo.has_pages)
  }

  private initCaching(octokit: Octokit) {
    const cache = createStorage()

    octokit.hook.after('request', async (response, options) => {
      await cache.setItem(getCacheKey(options), response)
    })
    octokit.hook.wrap('request', async (request, options) => {
      const cacheKey = getCacheKey(options)
      if (await cache.hasItem(cacheKey)) {
        const storageValue = await cache.getItem(cacheKey)
        if (!storageValue) {
          throw new Error('Storage value does not exist')
        }
        if (typeof storageValue !== 'object') {
          throw new TypeError('Storage value is not an object')
        }
        return storageValue as ReturnType<typeof request>
      }
      return request(options)
    })

    function getCacheKey(options: EndpointOptions) {
      let url = options.url
      for (const [key, value] of Object.entries(options)) {
        if (typeof value === 'string') url = url.replace(`{${key}}`, value)
      }
      return url
    }
  }
}
