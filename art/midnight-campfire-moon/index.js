/*
@title: Midnight Campfire
@author: moon-hacks
@snapshot: snap1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const lines = [];

// border frame
const m = 8;
lines.push([
  [m, m],
  [width - m, m],
  [width - m, height - m],
  [m, height - m],
  [m, m]
]);

// crescent moon (top-right)
const moonX = 96;
const moonY = 96;
const moonR = 10;
const moonOuter = [];
const moonInner = [];
const steps = 30;

for (let i = -steps/2; i <= steps/2; i++) {
  const a = (i / steps) * Math.PI;
  moonOuter.push([moonX + moonR * Math.cos(a), moonY + moonR * Math.sin(a)]);
  // inner curve with offset center to form crescent
  moonInner.push([moonX + 4 + (moonR - 2) * Math.cos(a), moonY + (moonR - 2) * Math.sin(a)]);
}
lines.push(moonOuter);
lines.push(moonInner);

// stars in the sky
const starCount = bt.randIntInRange(18, 26);
for (let i = 0; i < starCount; i++) {
  const x = bt.randInRange(m + 4, width - m - 4);
  const y = bt.randInRange(72, height - m - 4);

  // don't draw inside the moon
  if (Math.hypot(x - moonX, y - moonY) < 14) continue;

  const s = bt.randInRange(0.6, 1.2);
  lines.push([[x - s, y], [x + s, y]]);
  lines.push([[x, y - s], [x, y + s]]);
}

// shooting star
const shootX = bt.randInRange(18, 40);
const shootY = bt.randInRange(95, 108);
lines.push([[shootX, shootY], [shootX + 16, shootY - 7]]);
lines.push([[shootX + 3, shootY - 1], [shootX + 12, shootY - 5]]);

// back mountain range (tall jagged peaks)
const backMt = [];
const peakPoints = [
  [m, 45],
  [22, 62],
  [38, 54],
  [58, 75],
  [74, 58],
  [92, 70],
  [106, 52],
  [width - m, 46]
];

// add some noise variation to the peaks
for (let i = 0; i < peakPoints.length - 1; i++) {
  const p1 = peakPoints[i];
  const p2 = peakPoints[i + 1];
  const segments = 4;
  for (let s = 0; s < segments; s++) {
    const t = s / segments;
    const x = p1[0] + (p2[0] - p1[0]) * t;
    const y = p1[1] + (p2[1] - p1[1]) * t + (s > 0 ? bt.randInRange(-1.5, 1.5) : 0);
    backMt.push([x, y]);
  }
}
backMt.push(peakPoints[peakPoints.length - 1]);
lines.push(backMt);

// mountain ridge detail lines (shading lines from peak down)
const ridges = [
  [[22, 62], [30, 48]],
  [[58, 75], [68, 52]],
  [[92, 70], [84, 50]]
];
for (const r of ridges) {
  lines.push(r);
}

// front rolling hills
const hill1 = [];
for (let x = m; x <= width - m; x += 3) {
  const y = 35 + Math.sin(x * 0.05 + 1) * 6 + Math.cos(x * 0.1) * 2;
  hill1.push([x, y]);
}
lines.push(hill1);

const ground = [];
for (let x = m; x <= width - m; x += 3) {
  const y = 22 + Math.sin(x * 0.04) * 3;
  ground.push([x, y]);
}
lines.push(ground);

// helper: draw pine tree
function drawTree(x, y, h) {
  const w = h * 0.45;
  // trunk
  lines.push([[x, y], [x, y + h * 0.3]]);
  // 3 triangle foliage layers
  const b1 = y + h * 0.2;
  lines.push([[x - w, b1], [x, b1 + h * 0.45], [x + w, b1]]);
  const b2 = y + h * 0.45;
  lines.push([[x - w * 0.8, b2], [x, b2 + h * 0.4], [x + w * 0.8, b2]]);
  const b3 = y + h * 0.7;
  lines.push([[x - w * 0.55, b3], [x, y + h], [x + w * 0.55, b3]]);
}

// trees scattered on hills
const treeSpots = [
  [14, 34, 10], [20, 36, 12], [28, 38, 9], [34, 36, 11],
  [84, 38, 12], [92, 36, 10], [100, 34, 13], [108, 32, 9],
  [15, 23, 8], [24, 21, 9], [98, 22, 9], [106, 20, 8]
];
for (const [tx, ty, th] of treeSpots) {
  drawTree(tx, ty, th);
}

// tent (center left)
const tentX = 48;
const tentY = 22;
const tentW = 16;
const tentH = 12;

// outer triangle
lines.push([
  [tentX, tentY],
  [tentX + tentW / 2, tentY + tentH],
  [tentX + tentW, tentY],
  [tentX, tentY]
]);
// tent entrance flap
lines.push([
  [tentX + tentW / 2, tentY + tentH],
  [tentX + tentW / 2 - 2, tentY]
]);
lines.push([
  [tentX + tentW / 2, tentY + tentH],
  [tentX + tentW / 2 + 2, tentY]
]);
// tent stake rope lines
lines.push([[tentX, tentY], [tentX - 4, tentY - 2]]);
lines.push([[tentX + tentW, tentY], [tentX + tentW + 4, tentY - 2]]);

// campfire (center right)
const fireX = 72;
const fireY = 21;

// logs (crossing sticks)
lines.push([[fireX - 4, fireY], [fireX + 4, fireY + 2]]);
lines.push([[fireX - 4, fireY + 2], [fireX + 4, fireY]]);
lines.push([[fireX - 3, fireY - 1], [fireX + 3, fireY - 1]]);

// flame flames
lines.push([
  [fireX - 2, fireY + 1],
  [fireX - 1, fireY + 6],
  [fireX, fireY + 3],
  [fireX + 1, fireY + 7],
  [fireX + 2, fireY + 1]
]);
lines.push([
  [fireX - 0.5, fireY + 2],
  [fireX, fireY + 5],
  [fireX + 0.5, fireY + 2]
]);

// smoke rising and curling
lines.push([
  [fireX, fireY + 8],
  [fireX - 1, fireY + 12],
  [fireX + 1, fireY + 16],
  [fireX, fireY + 20],
  [fireX + 2, fireY + 24]
]);
lines.push([
  [fireX + 1, fireY + 9],
  [fireX + 2, fireY + 13],
  [fireX, fireY + 17],
  [fireX + 3, fireY + 22]
]);

drawLines(lines);
