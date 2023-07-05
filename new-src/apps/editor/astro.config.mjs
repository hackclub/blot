import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";
import prefresh from "@prefresh/vite";
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://editor.haxidraw.hackclub.com",
  integrations: [preact()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [prefresh()],
    // resolve: {
    //   alias: {
    //     "@": path.resolve("./src")
    //   }
    // }
    // for some reason typescript lsp support for this isn't working
  }
});