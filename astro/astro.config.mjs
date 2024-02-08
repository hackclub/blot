import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://blot.hackclub.com',
  integrations: [preact(), tailwind()],
  redirects: {
    '/assembly': {
      status: 302,
      destination: 'https://github.com/hackclub/blot/blob/main/docs/ASSEMBLY.md'
    }
  }
})
