import type { D0xigenProjectMeta } from '../../types'

export type GithubExternalRepo = Omit<
  D0xigenProjectMeta,
  'last_updated' | 'image' | 'description' | 'title' | 'url'
> & {
  repo: string
  owner: string
}

export const externalRepos: GithubExternalRepo[] = [
  {
    owner: 'alefmanvladimir',
    repo: 'BigFiles',
    tags: ['TON', 'blockchain', 'storage', 'front-end', 'back-end'],
    complexity: 4
  }
]
