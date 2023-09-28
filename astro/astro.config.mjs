import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'

export default defineConfig({
  site: 'https://blot.hackclub.com',
  integrations: [preact()],
  output: 'server'
})
