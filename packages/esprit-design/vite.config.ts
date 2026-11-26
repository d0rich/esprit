import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: resolve(__dirname, 'tailwind.config.js')
        }),
        autoprefixer()
      ]
    }
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, 'src'),
      name: 'EspritDesign',
      fileName: 'esprit-design',
      cssFileName: 'style'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'gsap'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          gsap: 'gsap'
        }
      }
    }
  }
})
