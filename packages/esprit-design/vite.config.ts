import fs from 'node:fs'
import { resolve } from 'path'
import { defineConfig, type Plugin } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

function compilePureCssPlugin(): Plugin {
  return {
    name: 'compile-pure-css',
    apply: 'build',
    async closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const tailwindCssPath = resolve(distDir, 'style.tailwind.css')
      const fallbackCssPath = resolve(distDir, 'style.css')
      const pureCssPath = resolve(distDir, 'style.pure.css')

      if (!fs.existsSync(tailwindCssPath)) {
        return
      }

      // Fallback: copy tailwind-based CSS as style.css
      fs.copyFileSync(tailwindCssPath, fallbackCssPath)

      // Compile pure CSS with resolved Tailwind utilities and @apply rules
      const srcStylePath = resolve(__dirname, 'src/style.css')
      const baseCss = fs.existsSync(srcStylePath)
        ? fs.readFileSync(srcStylePath, 'utf-8')
        : '@tailwind base;\n@tailwind components;\n@tailwind utilities;'
      const tailwindCss = fs.readFileSync(tailwindCssPath, 'utf-8')

      const combinedCss = `${baseCss}\n\n${tailwindCss}`

      const tailwindConfigPath = resolve(__dirname, 'tailwind.config.js')
      const result = await postcss([
        tailwindcss({ config: tailwindConfigPath }),
        autoprefixer()
      ]).process(combinedCss, {
        from: undefined,
        to: pureCssPath
      })

      fs.writeFileSync(pureCssPath, result.css)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: []
    }
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    }),
    compilePureCssPlugin()
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/index': resolve(__dirname, 'src/components/index.ts'),
        'composables/index': resolve(__dirname, 'src/composables/index.ts'),
        'utils/index': resolve(__dirname, 'src/utils/index.ts')
      },
      name: 'EspritDesign',
      formats: ['es'],
      cssFileName: 'style.tailwind'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        'gsap',
        /^@vueuse\//,
        '@vueuse/core',
        /^@iconify\//,
        '@iconify/vue'
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        globals: {
          vue: 'Vue',
          gsap: 'gsap'
        }
      }
    }
  }
})
