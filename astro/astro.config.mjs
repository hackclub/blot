import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [preact(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'css-variables'
    }
  }
})
