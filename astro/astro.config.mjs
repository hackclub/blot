import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://blot.hackclub.com',
  output: "server",
  integrations: [preact(), tailwind()],
  adapter: vercel()
});