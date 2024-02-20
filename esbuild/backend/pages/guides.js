import fs from 'fs';
import { extractFrontmatter } from "../extractFrontmatter.js";

export default function() {

  let _ = fs.readFileSync("../guides/!metadata.json", 'utf8')
  let files = JSON.parse(_);
  
  const frontmatters = files.map(fileData => {
    const fileName = fileData.title;
    const file = fs.readFileSync(
      `../guides/${fileName}`, 
      'utf8'
    );

    return extractFrontmatter(file)
  });

  return `
    <style>
      body,
      html {
        background-size: 40px 40px;
        background-image: linear-gradient(to right, #ddd 1px, transparent 1px),
          linear-gradient(to bottom, #ddd 1px, transparent 1px);
        min-height: 100vh;
        font-family:
          'Phantom Sans',
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif;
      }
    </style>

    <div class="p-1 ml-10">
      <div class="text-[3rem] font-[700]">Guides</div>
      <div class="text-[1.7rem] font-[300]">
        A collection of various guides created by Hack Clubbers that anyone can
        learn from and contribute to!
      </div>
    </div>

    <div class="flex flex-row flex-wrap items-center justify-around w-screen gap-y-6 my-5">
      ${
        files.map((file, i) => {
            return (
              `<a
                class="no-underline text-current w-[30%] min-w-[300px] max-w-[400px] aspect-[1] rounded-[27px] flex items-center flex-col justify-around p-[17px] shadow-md transition-transform duration-300 ease-in-out transition-shadow hover:scale-105 hover:shadow-lg"
                style="background-image: linear-gradient(170deg, #cecef9, #e7f0fb);"
                href=${`/editor?guide=${file.title}`}>
                <img
                  class="max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                  src=${frontmatters[i].thumbnail}
                />
                <div class="p-2.5">${frontmatters[i].title}</div>
              </a>`
            )
          }).join(" ")
      }
    </div>
   
  `
}


