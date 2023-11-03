import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import nodejs from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  adapter: nodejs({
    mode: 'middleware'
  }),
  output: 'hybrid',
  integrations: [preact()],
  markdown: {
    shikiConfig: {
      theme: 'css-variables'
    }
  }
})
