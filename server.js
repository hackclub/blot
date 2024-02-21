// should be top directory of project
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { build } from "./build.js";
import { wrapHTML } from "./backend/wrapHTML.js";

import navBar from "./backend/pages/navBar.js";
import guides from "./backend/pages/guides.js";
import gallery from "./backend/pages/gallery.js";
import landing from "./backend/pages/landing.js";

import checkSignIn from "./backend/api/checkSignIn.js";
import saveFile from "./backend/api/saveFile.js";
import getUser from "./backend/api/getUser.js";
import submitCode from "./backend/api/submitCode.js";
import getFiles from "./backend/api/getFiles.js";

build({
  index: wrapHTML(`
    ${navBar(true)}
    ${landing()}
  `),
  editor: wrapHTML(`
    <!-- TODO: add automatically when building -->
    <link rel="stylesheet" href='./assets/initApp.css'>
    
    <link rel="stylesheet" href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css'>

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
  assembly: wrapHTML(`
    ${navBar()}
    Go <a class="underline decoration-sky-500" href="https://github.com/hackclub/blot/blob/main/docs/ASSEMBLY.md">here</a>.
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

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/check-signed-in', checkSignIn);
app.post('/get-files', getFiles);
app.post('/save-file', saveFile);
app.post('/get-user', getUser);
app.post('/submit-code', submitCode);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'dist')));

app.use((req, res, next) => {
  let pathName = req.path;

  if (pathName === "/") pathName = "/index";

  if (req.path.indexOf('.') === -1) {
      const file = path.join(__dirname, 'dist', `${pathName}.html`);
      res.sendFile(file, (err) => {
          if (err) next();
      });
  } else {
      next();
  }
});

app.use((req, res, next) => {
  const file = path.join(__dirname, 'dist', `404.html`);
  res.status(404).sendFile(file);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


