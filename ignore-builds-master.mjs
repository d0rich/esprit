import { execSync } from 'child_process'

const cachedCommitRef =
  process.env.CACHED_COMMIT_REF || 'd06423d365fa9cf3ef99a8653abbf1a83fe7d3bb'
const commitRef = process.env.COMMIT_REF || 'HEAD'

const changesList = execSync(
  `git diff --name-only ${cachedCommitRef} ${commitRef}`
).toString()

class Changed {
  constructor({ src = false, deps = false }) {
    this.src = src
    this.deps = deps
  }

  get any() {
    return this.src || this.deps
  }
}

// Packages
const espritDesignChange = new Changed({
  src: changesList.includes('packages/esprit-design'),
  deps: false
})

const nuxtDesignSystemChange = new Changed({
  src: changesList.includes('packages/nuxt-design-system'),
  deps: espritDesignChange.any
})

const nuxtContentMermaidChange = new Changed({
  src: changesList.includes('packages/nuxt-content-mermaid'),
  deps: false
})

const d0xigenChange = new Changed({
  src: changesList.includes('packages/d0xigen'),
  deps: nuxtDesignSystemChange.any || nuxtContentMermaidChange.any
})

// Apps
const d0richMeChange = new Changed({
  src: changesList.includes('apps/d0rich.me'),
  deps: nuxtDesignSystemChange.any || nuxtContentMermaidChange.any
})
const d0xigenD0richMeChange = new Changed({
  src: changesList.includes('apps/d0xigen.d0rich.me'),
  deps: d0xigenChange.any
})
const designD0richMeChange = new Changed({
  src: changesList.includes('apps/design.d0rich.me'),
  deps: nuxtDesignSystemChange.any
})
const dogD0richMeChange = new Changed({
  src: changesList.includes('apps/dog.d0rich.me'),
  deps: d0xigenChange.any
})

export const ignoreD0richMeBuild = !d0richMeChange.any
export const ignoreD0xigenD0richMeBuild = !d0xigenD0richMeChange.any
export const ignoreDesignD0richMeBuild = !designD0richMeChange.any
export const ignoreDogD0richMeBuild = !dogD0richMeChange.any
