import type { Octokit } from 'octokit'
import type { EndpointOptions } from '@octokit/types'
import { createStorage } from 'unstorage'
import type { D0xigenProjectMeta } from '../../types'
import { externalRepos, type GithubExternalRepo } from './externalRepos'

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

  getExternalReposPagesMeta() {
    const pagesPromises = externalRepos.map((repo) =>
      this.externalReposToD0xigenProjectsMeta(repo)
    )
    return Promise.all(pagesPromises)
  }

  private async externalReposToD0xigenProjectsMeta(
    repo: GithubExternalRepo
  ): Promise<D0xigenProjectMeta> {
    const { owner, repo: repoName } = repo
    const { hash, date } = await this.getRepoLastCommitDateAndHash(
      owner,
      repoName
    )
    const repoMeta = await this.getRepoMeta(owner, repoName)
    return {
      title: repoMeta.title,
      description: repoMeta.description,
      image: this.getRepoCoverImageUrl(owner, repoName, hash),
      url: repoMeta.url,
      last_updated: date.toISOString(),
      tags: repo.tags,
      complexity: repo.complexity
    }
  }

  private async getRepoMeta(owner: string, repo: string) {
    const { data } = await this.octokit.rest.repos.get({ owner, repo })
    return {
      title: data.name,
      description: data.description ?? '',
      url: data.html_url
    }
  }

  private getRepoCoverImageUrl(owner: string, repo: string, hash: string) {
    return `https://opengraph.githubassets.com/${hash}/${owner}/${repo}`
  }

  private async getRepoLastCommitDateAndHash(owner: string, repo: string) {
    const { data: commits } = await this.octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 1
    })
    const lastCommit = commits[0]
    return {
      hash: lastCommit.sha,
      date: new Date(lastCommit.commit.author?.date ?? '')
    }
  }

  private async getMyGithubRepos() {
    return await this.octokit.rest.repos.listForUser({
      username: 'd0rich',
      type: 'owner',
      per_page: 100
    })
  }

  async getMyGithubReposWithPages() {
    const repos = await this.getMyGithubRepos()
    return repos.data.filter((repo) => repo.homepage)
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
