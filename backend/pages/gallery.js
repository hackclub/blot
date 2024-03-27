import fs from 'fs';
import { extractFrontmatter } from "../extractFrontmatter.js";

const GALLERY_NOT_TO_DISPLAY = [
  // "amongUs-SahilDasari",
  // "leaf-leo",
  // "Donut-BrightLi",
  // "blot-ayush",

  "BitMap-AdityaPV",
  "blotfont-geschmit",
  "BlotGrapher-V205",
  "dexter_sunnyhouse",
  "eca-henry",
  "emoji_generator_samarpan",
  "flower-sahitid",
  "fractalTree-maggieClaireBelle",
  "fractures-msw",
  "french-fries-eric",
  "hilbert_golf-henry",
  "L-system-reva",
  "lampda-snipchu",
  "landscape-henry",
  "linesCircles-yutaro",
  "Mandelbrot-Oskar",
  "mazeGenerator-Evan",
  "Minesweeper-LiterallyEverything",
  "QR-sam",
  "raymarching-henry",
  "roots-kai",
  "self_portrait-kieran",
  "SpiderWeb-Michelle",
  "square-disarray-leo",
  "SudokuGenerator-Ivan",
  "sunset-ameya",
  "tidal-flats-leo",
  "tree-leo",
  "weatherreport-rivques",
  "word_search-scott_c"
]

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function extractKeyValuePairs(str) {
  const regex = /@(\w+):\s*(.+)/g;
  const matches = [...str.matchAll(regex)];
  return matches.reduce((acc, match) => {
    acc[match[1]] = match[2];
    return acc;
  }, {});
}

export default function() {

  const directories = getDirectories("./art");
  const files = [];


  directories.forEach((dir, i) => {
    if (GALLERY_NOT_TO_DISPLAY.includes(dir)) return;
    const file = fs.readFileSync(`./art/${dir}/index.js`, 'utf8');

    const metadata = extractKeyValuePairs(file);

    if (Object.keys(metadata).length === 0) return; 

    const result = {
      dir: dir,
      img: `https://raw.githubusercontent.com/hackclub/blot/main/art/${dir}/snapshots/${metadata.snapshot}`,
      href: `/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/${dir}/index.js`,
      alt: dir
    }

    files.push(result);

  })

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

      .description {
        padding: 0.3rem;
        margin-left: 40px;
        width: 60%;
        margin: auto;
        padding-bottom: 30px;
        text-align: center;
      }

      .guides-title {
        font-size: 3rem;
        font-weight: 700;
      }

      .guides-sub-title {
        font-size: 1.7rem;
        font-weight: 300;
      }

      #container {
        margin: 0 auto;
      }

      #gallery {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
      }

      #content {
        font-size: 1.1rem;
      }

      .frame {
        padding: 0;
        margin: 0.5rem;
        border: solid 15px #555;
        box-shadow: -3px -3px 12px #999;
        width: 30%;
        min-width: 300px;
        aspect-ratio: 1;
        float: left;
        margin-bottom: 1rem;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: all 0.2s;
      }

      .frame:hover {
        transform: scale(101%);
      }

      .gallery-img {
        max-width: 100%;
        width: 100%;
        max-height: 100%;
        height: 100%;
        object-fit: contain;
        border: 1px solid #aaa;
      }

      .border {
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 100%;
        background-color: white;
        margin: 0;
        border: solid 10px white;
        box-shadow: -3px -3px 12px #999;
      }

      .gallery-a {
        box-sizing: border-box;
        margin: 0;
        min-width: 0;
        color: #ec3750;
        -webkit-text-decoration: underline;
        text-decoration: underline;
        text-underline-position: under;
      }

      a:hover {
        text-decoration-style: wavy;
      }
    </style>

    <div id="container">
      <div class="description">
        <div class="guides-title">Gallery</div>
        <div class="guides-sub-title">
          A gallery of various art pieces created by Hack Clubbers!
        </div>
        <div class="guides-sub-title">
          Teenagers can submit art to the gallery to get their own Blot. Guide to
          submission is <a class="gallery-a"
            href="https://github.com/hackclub/blot/blob/main/docs/GET_A_BLOT.md"
            >here</a
          >.
        </div>
      </div>
      <div id="gallery">
        ${
          files.map(file => {
            return `
              <div class="frame">
                <a class="border gallery-a" href=${file.href}>
                  <img class="thumbnail gallery-img" alt=${file.alt} src=${file.img} />
                </a>
              </div>
            `
          }).join(" ")
        }
      </div>
    </div>
   
  `
}


