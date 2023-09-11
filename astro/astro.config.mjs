import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'
import prefresh from '@prefresh/vite'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://editor.haxidraw.hackclub.com',
  output: 'hybrid',
  adapter: vercel(),
  markdown: {
    syntaxHighlight: "prism"
  },
  vite: {
    plugins: [prefresh()],
    ssr: {
      noExternal: ['niue']
    },
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
  integrations: [preact({
    compat: true
  }), mdx()]
})
