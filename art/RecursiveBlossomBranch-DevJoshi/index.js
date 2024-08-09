/* 
@title: Recursive Blossom Branch
@author: Dev Joshi
@snapshot: Screenshot-1.png
*/
/* I used Hayden Kong's plant generation code as a reference/starting code for my project, so I can understand an approach on how to generate a tree like structure. */

const width = 200;
const height = 200;
setDocDimensions(width, height);

const SEED = Math.floor(bt.rand() * 1000000);
bt.setRandSeed(SEED);

const rr = bt.randInRange;
const PI = Math.PI;

const trunkLength = rr(102, 138); 
const branchFactor = 0.4; 
const branchAngle = PI / 2.64; 
const maxDepth = 3; 
const trunkWidth = rr(5, 20); 
const branchWidthFactor = 0.2; 
const blossomDensity = 0.8; 
const blossomSize = rr(1, 5); 

function drawBranch(startX, startY, length, angle, depth, width) {
  if (depth > maxDepth) return;

  const endX = startX + length * Math.cos(angle);
  const endY = startY + length * Math.sin(angle);

  const branch = bt.catmullRom([
    [startX, startY],
    [startX + length / 3 * Math.cos(angle + rr(-0.1, 0.1)), startY + length / 3 * Math.sin(angle + rr(-0.1, 0.1))],
    [startX + length * 2 / 3 * Math.cos(angle + rr(-0.2, 0.2)), startY + length * 2 / 3 * Math.sin(angle + rr(-0.2, 0.2))],
    [endX, endY]
  ], 10);

  const leftSide = branch.map(([x, y]) => [x - width / 2 + rr(-0.2, 0.2), y]);
  const rightSide = branch.map(([x, y]) => [x + width / 2 + rr(-0.2, 0.2), y]).reverse();

  drawLines([leftSide.concat(rightSide, [leftSide[0]])]);

  for (let i = 0.3; i <= 0.7; i += 0.1) {
    if (bt.rand() < blossomDensity) {
      const blossomX = startX + (length * i) * Math.cos(angle);
      const blossomY = startY + (length * i) * Math.sin(angle);
      drawBlossom(blossomX, blossomY);
    }
  }

  for (let i = 1; i <= 2; i++) {
    const midX = startX + (length * i / 3) * Math.cos(angle);
    const midY = startY + (length * i / 3) * Math.sin(angle);
    const newAngle1 = angle + rr(-branchAngle, branchAngle);
    const newAngle2 = angle + rr(-branchAngle, branchAngle);
    
    drawBranch(midX, midY, length * branchFactor, newAngle1, depth + 1, width * branchWidthFactor);
    drawBranch(midX, midY, length * branchFactor, newAngle2, depth + 1, width * branchWidthFactor);
  }

  drawBranch(endX, endY, length * branchFactor, angle - branchAngle, depth + 1, width * branchWidthFactor);
  drawBranch(endX, endY, length * branchFactor, angle + branchAngle, depth + 1, width * branchWidthFactor);
}

function drawBlossom(x, y) {
  const petals = 5;
  const blossom = [];
  for (let i = 0; i < petals; i++) {
    const petalAngle = (2 * PI / petals) * i + rr(-PI / 12, PI / 12);
    const petalX = x + blossomSize * Math.cos(petalAngle);
    const petalY = y + blossomSize * Math.sin(petalAngle);
    blossom.push([x, y], [petalX, petalY]);
  }
  drawLines([blossom]);
}

const startX = rr(-12, 0);
const startY = rr(16, 108);
drawBranch(startX, startY, trunkLength, rr(-PI / 12, PI / 12), 0, trunkWidth);

console.log("Seed:", SEED);
