import express from 'express';

import signUpEmail from "../backend/api/signUpEmail.js";
import checkSignIn from "../backend/api/checkSignIn.js";
import saveFile from "../backend/api/saveFile.js";
import getUser from "../backend/api/getUser.js";
import submitCode from "../backend/api/submitCode.js";
import getFiles from "../backend/api/getFiles.js";
import createShareLink from "../backend/api/createShareLink.js";
import logout from "../backend/api/logout.js";
import deleteFile from "../backend/api/deleteFile.js";

import { supabase } from "../backend/api/supabase.js";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const app = express();

app.use(express.json());

app.post('/signUpEmail', signUpEmail);
app.post('/check-signed-in', checkSignIn);
app.post('/get-files', getFiles);
app.post('/save-file', saveFile);
app.post('/delete-file', deleteFile);
app.post('/logout', logout);
app.post('/get-user', getUser);
app.post('/submit-code', submitCode);
app.post('/create-share-link', createShareLink);
app.get('/read-share-link', async (req, res) => {
  const { id } = req.query;

  try {

    console.log("check in database");
    // check if email is in database
    let { data: file, error: fileError } = await supabase
      .from('share_link')
      .select('*')
      .eq('id', id)
      .single();

    if (fileError && fileError.message !== 'No rows found') {
      res.send("no share link here");
      return;
    }

    res.send(file.content);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.get('/assembly', (req, res) => {
  res.redirect('https://github.com/hackclub/blot/blob/main/docs/assembly/ASSEMBLY.md');
});
app.get('/welcome-qr-code', (req, res) => {
  res.redirect('/assembly');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../dist')));

app.use((req, res, next) => {
  let pathName = req.path;

  if (pathName === "/") pathName = "/index";

  if (req.path.indexOf('.') === -1) {
    const file = path.join(__dirname, '../dist', `${pathName}.html`);
    res.sendFile(file, (err) => {
      if (err) next();
    });
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const file = path.join(__dirname, '../dist', `404.html`);
  res.status(404).sendFile(file);
});
export default app;
