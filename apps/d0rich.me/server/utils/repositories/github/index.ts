import { Octokit } from 'octokit'
import { GithubRepository as GithubRepositorySource } from './GithubRepository'

console.log('ENVIRONMENT_VARIABLES', process.env)

export const GithubRepository = new GithubRepositorySource(
  new Octokit({
    auth: process.env.GITHUB_TOKEN
  })
)
