import { Octokit } from 'octokit'
import { GithubRepository as GithubRepositorySource } from './GithubRepository'

export const GithubRepository = new GithubRepositorySource(
  new Octokit({
    auth: process.env.GITHUB_TOKEN || process.env.NUXT_PUBLIC_GITHUB_TOKEN
  })
)
