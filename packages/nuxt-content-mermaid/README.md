# @d0rich/nuxt-content-mermaid

This layer allows you to use [mermaid](https://mermaid-js.github.io/mermaid/#/) in your [nuxt content](https://content.nuxtjs.org/) markdown files.

## Setup

1. Add `@d0rich/nuxt-content-mermaid` dependency to your project

```bash
npm install @d0rich/nuxt-content-mermaid # or yarn add @d0rich/nuxt-content-mermaid
```

2. Add `@d0rich/nuxt-content-mermaid` to the `buildModules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  extends: [
    // Put this layer before one with nuxt content
    '@d0rich/nuxt-content-mermaid'
  ]
})
```

3. Configure layer in `app.config.ts`

```ts
export default defineAppConfig({
  contentMermaid: {
    enabled: true,
    /**
     * @default 'default'
     * @description 'default' or '@nuxtjs/color-mode'
     */
    color: 'default',
    spinnerComponent: 'DAnimationSpinner'
  }
})
```

4. Add code block to your markdown file with `mermaid` language specified.