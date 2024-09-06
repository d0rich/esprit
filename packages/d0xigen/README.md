# d0xigen

Hello 👋, you are currently viewing the documentation for _d0xigen_ - UI layer for documentation to my projects. And yeah, this is me: [d0rich](https://github.com/d0rich).

I have created this theme to make my documentation sites look the same. Also, d0xigen makes it easier for me to create documentation sites for my projects. All for me, but you can use it too.

Let's try to use it!

## Installation

Like all front-end projects, this one is created within Node.js ecosystem. Layer itself is available as a package on npm.

```bash
npm install d0xigen@latest
```

## Usage

_d0xigen_ is a [Nuxt 3 layer](https://nuxt.com/docs/getting-started/layers). So, you need to install Nuxt 3 first. I believe you can do it yourself.

### Extending Nuxt 3

All is required is to extend your Nuxt app with _d0xigen_ in `nuxt.config.ts`.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['d0xigen']
})
```

### Meta information

And technically it will work. But I believe you want to customize at least general information.

You can specify it inside `app.config.ts` in `d0xigen` section.

```ts 
// app.config.ts
export default defineAppConfig({
  d0xigen: {
    title: 'd0xigen',
    description: '🌬🕮 Docs to breath life into your project',
    url: 'https://d0xigen.d0rich.me',
    author: 'Nikolai Dorofeev',
    social: {
      github: 'https://github.com/d0rich/d0xigen'
    }
  }
})
```

### Creating content

Run project in development mode:

```shell
npx nuxt dev
```

That's it! You can start creating content. Create `content` folder for that and enjoy features of [Nuxt Content](https://content.nuxtjs.org/).
