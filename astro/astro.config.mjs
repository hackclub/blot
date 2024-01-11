import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vitePreact from '@preact/preset-vite'
import tailwind from '@astrojs/tailwind'
import wasm from 'vite-plugin-wasm'

// https://astro.build/config
export default defineConfig({
  site: 'https://blot.hackclub.com',
  integrations: [preact(), tailwind()],
  vite: {
    plugins: [{
      name: "preact:config",
      config() {
        return {
          resolve: {
            alias: {
              "react-dom/test-utils": "preact/test-utils",
              "react-dom": "preact/compat",
              react: "preact/compat"
            }
          }
        }
      }
    }, wasm()]
  }
})
