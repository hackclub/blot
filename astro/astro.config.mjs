import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://blot.hackclub.com',
  integrations: [preact(), tailwind()],
  output: 'hybrid',
  adapter: vercel()
})
