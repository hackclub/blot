import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
// import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://blot.hackclub.com',
  integrations: [
    preact(),
    mdx()
  ]
})
