// should be in same directory as server

import { JSDOM } from 'jsdom';
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import alias from 'esbuild-plugin-alias';

// Function to bundle script sources found in HTML
export const bundleHtmlScripts = async (name, htmlContent, outputPath = "./dist") => {
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;
  const scripts = [...document.querySelectorAll('script[src]')];

  for (const script of scripts) {
    const src = script.getAttribute('src');

    if (src.includes("http")) continue;

    const inputFile = path.resolve(src); // Assuming src is a relative path
    const outputFile = path.join(outputPath, 'assets', path.basename(src));

    // Use esbuild to bundle the script
    await esbuild.build({
      entryPoints: [inputFile],
      bundle: true,
      outfile: outputFile,
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      inject: ['./backend/preact-shim.js'],
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
  await deleteAllFiles("./dist");

  await Promise.all(Object.entries(htmls).map(async ([name, content]) => {
    return bundleHtmlScripts(name, content);
  }));

  await fs.cpSync("./public", "./dist", { recursive: true });
}
