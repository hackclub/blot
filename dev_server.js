import app from './api/index.js'
import './build.js'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import express from 'express';
import path from 'path';

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
