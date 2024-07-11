/*
@title: TreeGEN
@author: Elijah
@snapshot: tree.png
*/

// Modify the seed
let seed = 42;

const width = 125;
const height = 125;

setDocDimensions(width, height);

function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const finalLines = [];

function createTree(x, y, length, angle, depth, branchWidth) {
  if (depth === 0) return;

  const x1 = x + length * Math.cos(angle);
  const y1 = y - length * Math.sin(angle);

  finalLines.push([
    [x, y],
    [x1, y1]
  ]);

  const newLength = length * (0.7 + 0.3 * random());
  const angle1 = angle + (Math.PI / 4) * (0.7 + 0.3 * random());
  const angle2 = angle - (Math.PI / 4) * (0.7 + 0.3 * random());

  createTree(x1, y1, newLength, angle1, depth - 1, branchWidth * 0.7);
  createTree(x1, y1, newLength, angle2, depth - 1, branchWidth * 0.7);
}

createTree(width / 2, height, 30, -Math.PI / 2, 5, 10);

bt.rotate(finalLines, random() * 360);
bt.scale(finalLines, 1 + random() * 0.5);

drawLines(finalLines);

function setSeed(newSeed) {
  seed = newSeed;
  finalLines.length = 0;
  createTree(width / 2, height, 30, -Math.PI / 2, 5, 10);
  bt.rotate(finalLines, random() * 360);
  bt.scale(finalLines, 1 + random() * 0.5);
  drawLines(finalLines);
}

setSeed(12345);