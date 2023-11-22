import { execSync } from 'child_process'

const cachedCommitRef =
  process.env.CACHED_COMMIT_REF || 'd06423d365fa9cf3ef99a8653abbf1a83fe7d3bb'
const commitRef = process.env.COMMIT_REF || 'HEAD'

const changesList = execSync(
  `git diff --name-only ${cachedCommitRef} ${commitRef}`
).toString()

// Apps
const isD0richMeChanged = changesList.includes('apps/d0rich.me')
const isD0xigenD0richMeChanged = changesList.includes('apps/d0xigen.d0rich.me')
const isDesignD0richMeChanged = changesList.includes('apps/design.d0rich.me')
const isDD0richMeChanged = changesList.includes('apps/d.d0rich.me')

//  Contracts

const areContractsChanged = changesList.includes('contracts/contracts')

// Packages
const isNuxtContentMermaidChanged = changesList.includes(
  'packages/nuxt-content-mermaid'
)
const isNuxtDesignSystemChanged = changesList.includes(
  'packages/nuxt-design-system'
)

const isEspritDesignChanged = changesList.includes('packages/esprit-design')

const ignoreD0richMeBuild =
  !isD0richMeChanged &&
  !isNuxtContentMermaidChanged &&
  !isNuxtDesignSystemChanged &&
  !isEspritDesignChanged

const ignoreD0xigenD0richMeBuild =
  !isD0xigenD0richMeChanged &&
  !isNuxtContentMermaidChanged &&
  !isNuxtDesignSystemChanged &&
  !isEspritDesignChanged

const ignoreDesignD0richMeBuild =
  !isDesignD0richMeChanged &&
  !isNuxtDesignSystemChanged &&
  !isEspritDesignChanged

const ignoreDD0richMeBuild =
  !isDD0richMeChanged && !areContractsChanged && !isEspritDesignChanged

export {
  ignoreD0richMeBuild,
  ignoreD0xigenD0richMeBuild,
  ignoreDesignD0richMeBuild,
  ignoreDD0richMeBuild
}
