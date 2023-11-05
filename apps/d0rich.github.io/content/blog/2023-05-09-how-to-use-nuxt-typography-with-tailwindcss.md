---
description: Small hack to use Nuxt Typography with TailwindCSS
date: 2023-05-09
tags:
  - Frontend
  - Nuxt.js
  - TailwindCSS
---

# How to use Nuxt Typography with TailwindCSS

TailwindCSS is a great CSS framework, loved by many developers. And also it has [a typography plugin](https://tailwindcss.com/docs/typography-plugin), which is very useful for creating beautiful and readable text.

Unfortunately, CSS is not enough to describe complex elements like codeblock with copy button. Here is where [Nuxt typography](https://typography.nuxt.space/) goes. It is set of typography elements for [Nuxt content](https://content.nuxtjs.org/).

## Problems of Nuxt typography configuration

Nuxt typography is implemented on base of [pinceau](https://github.com/Tahul/pinceau), so it can be [conveniently configured](https://typography.nuxt.space/#configuration) via `tokens.config.ts` file. For example:

```ts [tokens.config.ts]
import { defineTheme } from 'pinceau'
export default defineTheme({
  typography: {
    // This will change the general line-break size
    letterSpacings: {
      tight: '-0.035em',
      wide: '0.035em'
    },
  },
  prose: {
    // This will change the fontSize of the `<ProseH1>` component
    h1: {
      fontSize: '{typography.2xl.fontSize}'
    }
  }
})
```

But it is not possible to use TailwindCSS classes or values in this configuration file. 

## Solution

Technically all these values are stored as CSS variables in result. So you can make these variables point to other CSS variables, which are defined in TailwindCSS.

In my case I want to change fonts in typography. Let's see an example.

### Step 1: Create TailwindCSS plugin

First of all we need to create custom plugin for TailwindCSS. It will define CSS variables for fonts.

```js [nuxt-typography.js]
// Import function for creating plugin
/** @type {import('tailwindcss/plugin')} */
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ 
    // Function for adding utilities
    addUtilities, 
    // Function for getting values from current TailwindCSS theme
    theme 
  }) {
  addUtilities({
    // Create utility class with required variables
    '.nuxt-typography-connector': {
      // Define your CSS variables
      '--tw-typography-font-sans': theme('fontFamily.sans'),
      '--tw-typography-font-serif': theme('fontFamily.serif'),
      '--tw-typography-font-mono': theme('fontFamily.mono'),
      '--tw-typography-font-dialog': theme('fontFamily.dialog')
    }
  })
})
```

Don't forget to add this plugin to your `tailwind.config.js`:

```js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    // ...
    require('./nuxt-typography.js')
  ]
}
```

### Step 2: Use created utility class on `:root`

Now we need to use created utility class on `:root` element. It will make CSS variables available for all elements on page.

```css [tailwind.css]
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  @apply nuxt-typography-connector;
}
```

### Step 3: Use CSS variables in Nuxt typography configuration

Now we can use CSS variables in Nuxt typography configuration:

```ts [tokens.config.ts]
import { defineTheme } from 'pinceau'

export default defineTheme({
  typography: {
    font: {
      body: 'var(--tw-typography-font-serif)',
      code: 'var(--tw-typography-font-mono)',
      display: 'var(--tw-typography-font-serif)'
    }
  }
})
```

Done! Now your typography will use fonts from TailwindCSS.

## How to do that without plugin

If you don't want to create plugin for TailwindCSS, you can apply style to content, which will override existing fonts with TailwindCSS ones:

```css
.blog-fonts {
  @apply [&_p]:!font-sans [&_a]:!font-sans [&_em]:!font-sans [&_li]:!font-sans
         [&_ul]:!font-sans [&_ol]:!font-sans [&_blockquote]:!font-sans
         [&_strong]:!font-sans [&_del]:!font-sans [&_hr]:!font-sans
         [&_table]:!font-sans [&_thead]:!font-sans [&_tbody]:!font-sans [&_tr]:!font-sans
         [&_th]:!font-sans [&_td]:!font-sans [&_sup]:!font-sans [&_sub]:!font-sans
         [&_h1]:!font-sans [&_h2]:!font-sans [&_h3]:!font-sans [&_h4]:!font-sans [&_h5]:!font-sans [&_h6]:!font-sans;
}
```

::alert{type=info}
  You should apply styles with `!important`. In other case it won't work.
::

It is not very convenient, but it works. Choose configs for Nuxt typography carefully, because it is not easy to change them later.