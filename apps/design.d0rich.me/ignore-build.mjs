import { execSync } from 'child_process'

const cachedCommitRef =
  process.env.CACHED_COMMIT_REF || 'd06423d365fa9cf3ef99a8653abbf1a83fe7d3bb'
const commitRef = process.env.COMMIT_REF || 'HEAD'

const changesList = execSync(
  `git diff --name-only ${cachedCommitRef} ${commitRef}`
).toString()

const isDesignD0richMeChanged = changesList.includes('apps/design.d0rich.me')
const isNuxtDesignSystemChanged = changesList.includes(
  'packages/nuxt-design-system'
)
const isEspritDesignChanged = changesList.includes('packages/esprit-design')

const ignoreBuild =
  !isDesignD0richMeChanged &&
  !isNuxtDesignSystemChanged &&
  !isEspritDesignChanged

process.exit(ignoreBuild ? 0 : 1)
