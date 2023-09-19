import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'
import prefresh from '@prefresh/vite'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://blot.hackclub.com',
  integrations: [
    preact({
      compat: true
    }),
    mdx()
  ],
  output: 'server',
  adapter: vercel(),
  markdown: {
    syntaxHighlight: 'prism'
  },
  vite: {
    plugins: [prefresh()],
    esbuild: {
      target: 'es2020'
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020'
      }
    },
    build: {
      target: 'es2020'
    }
  },
  integrations: [preact(), mdx()]
})
