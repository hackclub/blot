// an express server that serves static files. allow access to the parent directory

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// for the root path, serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
app.use(express.static(join(__dirname, '..'))); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}
);