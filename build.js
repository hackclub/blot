// should be in same directory as server
import { JSDOM } from 'jsdom';
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import alias from 'esbuild-plugin-alias';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';

import { execSync } from 'child_process';

import { wrapHTML } from "./backend/wrapHTML.js";

import navBar from "./backend/pages/navBar.js";
import guides from "./backend/pages/guides.js";
import gallery from "./backend/pages/gallery.js";
import landing from "./backend/pages/landing.js";
import docs from "./backend/pages/docs.js";
import submitting from "./backend/pages/submitting.js";

const OUTPUT_DIR = "./dist"; 

// Function to bundle script sources found in HTML
export const bundleHtmlScripts = async (name, htmlContent, outputPath = OUTPUT_DIR) => {
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;
  const scripts = [...document.querySelectorAll('script[src]')];

  for (const script of scripts) {
    const src = script.getAttribute('src');

    if (src.includes("http") || script.hasAttribute("leave-it")) continue;

    const inputFile = path.resolve(src); // Assuming src is a relative path
    const outputFile = path.join(outputPath, 'assets', path.basename(src));

    // Use esbuild to bundle the script
    await esbuild.build({
      entryPoints: [inputFile],
      bundle: true,
      sourcemap: true,
      outfile: outputFile,
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      inject: ['./backend/preact-shim.js'],
      plugins: [inlineWorkerPlugin()]
    }).catch(() => process.exit(1));;

    // Update script src to point to the new bundled file
    script.setAttribute('src', "./" + path.relative(outputPath, outputFile));
  }

  // Write the modified HTML to the dist directory
  fs.writeFileSync(path.join(outputPath, `${name}.html`), dom.serialize(), 'utf-8');
};

export function deleteAllFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      // Recursively delete everything in the subdirectory
      deleteAllFiles(entryPath);

      // Delete the now-empty subdirectory
      fs.rmdirSync(entryPath);
    } else {
      // Delete the file
      fs.unlinkSync(entryPath);
    }
  }
}

export async function build(htmls) {

  if (!fs.existsSync(OUTPUT_DIR)) {
    // If the folder does not exist, create it
    fs.mkdirSync(OUTPUT_DIR);
    console.log(`Folder '${OUTPUT_DIR}' created.`);
  } else {
    // If the folder exists, print a message
    console.log(`Folder '${OUTPUT_DIR}' already exists.`);
  }


  // console.time("DELETE")
  await deleteAllFiles(OUTPUT_DIR);
  // console.timeEnd("DELETE")

  // console.time("BUILD")
  await Promise.all(Object.entries(htmls).map(async ([name, content]) => {
    return bundleHtmlScripts(name, content);
  }));
  // console.timeEnd("BUILD")

  // console.time("COPY")
  await fs.cpSync("./public", OUTPUT_DIR, { recursive: true });
  // console.timeEnd("COPY")
}

await build({
  index: wrapHTML(`
    ${navBar(true)}
    ${landing()}
  `),
  docs: wrapHTML(`
    ${navBar()}
    ${docs()}
  `),
  submitting: wrapHTML(`
    ${navBar()}
    ${submitting()}
  `),
  editor: wrapHTML(`
    <!-- TODO: add automatically when building -->
    <link rel="stylesheet" href='./assets/initApp.css'>



    <main></main>
    <script type="module" src="./src/initApp.js"></script>
  `),
  guides: wrapHTML(`
    ${navBar()}
    ${guides()}
  `),
  gallery: wrapHTML(`
    ${navBar()}
    ${gallery()}
  `),
  404: wrapHTML(`
    ${navBar()}
    <div class="p-2">nothing here</div>
  `),
  test: wrapHTML(`
    ${navBar()}
    <div class="bg-red-400">test another page</div>
  `),

});

execSync('npx tailwindcss -i ./styles.css -o ./dist/styles.css');
