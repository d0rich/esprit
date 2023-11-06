import { execSync } from 'child_process'

const cachedCommitRef =
  process.env.CACHED_COMMIT_REF || 'd06423d365fa9cf3ef99a8653abbf1a83fe7d3bb'
const commitRef = process.env.COMMIT_REF || 'HEAD'

const changesList = execSync(
  `git diff --name-only ${cachedCommitRef} ${commitRef}`
).toString()

const isD0richMeChanged = changesList.includes('apps/d0rich.me')
const isNuxtContentMermaidChanged = changesList.includes(
  'packages/nuxt-content-mermaid'
)
const isNuxtDesignSystemChanged = changesList.includes(
  'packages/nuxt-design-system'
)

const ignoreBuild =
  !isD0richMeChanged &&
  !isNuxtContentMermaidChanged &&
  !isNuxtDesignSystemChanged

process.exit(ignoreBuild ? 0 : 1)
