import fs from 'fs';
import { extractFrontmatter } from "../extractFrontmatter.js";

const GALLERY_NOT_TO_DISPLAY = [

  // TODO: Purge some art piecesw
];

export function getDirectories(srcPath) {
  return fs.readdirSync(srcPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

export function extractKeyValuePairs(str) {
  const regex = /@(\w+):\s*(.+)/g;
  const matches = [...str.matchAll(regex)];
  return matches.reduce((acc, match) => {
    acc[match[1]] = match[2];
    return acc;
  }, {});
}