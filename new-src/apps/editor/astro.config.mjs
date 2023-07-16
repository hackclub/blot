import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";
import prefresh from "@prefresh/vite";
import path from "path";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://editor.haxidraw.hackclub.com",
  integrations: [preact({ compat: true })],
  output: "server",
  // adapter: vercel(),
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    plugins: [prefresh()],
    ssr: {
      noExternal: ["niue"]
    },
    esbuild: {
      target: "es2020"
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020"
      }
    },
    build: {
      target: "es2020"
    }

    // resolve: {
    //   alias: {
    //     // preact
    //     "react": "preact/compat",
    //     "react-dom": "preact/compat",
    //     "react-dom/test-utils": "preact/test-utils"
    //   }
    // }
    // resolve: {
    //   alias: {
    //     "@": path.resolve("./src")
    //   }
    // }
    // for some reason typescript lsp support for this isn't working
  }
});