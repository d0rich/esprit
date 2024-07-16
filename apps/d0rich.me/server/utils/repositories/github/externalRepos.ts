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
    tags: ['web3', 'TON', 'storage', 'front-end', 'back-end'],
    complexity: 4
  },
  {
    owner: 'ton-developers',
    repo: 'ton-validators-map',
    tags: ['TON', 'front-end', 'geoJSON', 'SVG', 'animations'],
    complexity: 3
  },
  {
    owner: 'ton-org',
    repo: 'ton',
    tags: ['TON', 'blockchain'],
    complexity: 3
  }
]
