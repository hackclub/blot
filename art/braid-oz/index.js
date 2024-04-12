/*
@title: Braid
@author: Oz Nova
@snapshot: 0.png
*/

const w = 14; // triangular tile length
const h = w * Math.sqrt(3) / 2;
const a = 8; // ribbon spacing
const b = 2.0; // ribbon thickness

const rect = (w, h) => [
  [0, 0],
  [w, 0],
  [w, h],
  [0, h],
  [0, 0]
];

// Construct the triangular tile
const under = [
  rect(b, w),
  ...bt.translate([rect(b, w)],
    [h - a - a - b, 0],
    [0, 0])
];
bt.translate(under, [a, 0]);
const over = bt.copy(under);
bt.rotate(over, 120, [h / 3, w / 2]);
const tile = [...over, ...bt.cover(under, over)];
bt.cut(tile, [
  [
    [0, 0],
    [0, w],
    [h, w / 2],
    [0, 0]
  ]
]);

// Rotate triangle 6x to make hexagon
const hex = [];
for (let theta = 0; theta < 360; theta += 60) {
  hex.push(
    ...bt.rotate(bt.copy(tile),
      theta,
      [0, 0])
  );
}

// Tile hexagons in grid
const width = 125;
const height = 125;
const lines = []
for (let y = 0; y < height / w; y++) {
  for (let x = 0; x < width / w; x++) {
    const c = bt.copy(hex);
    bt.translate(c, [(y % 2 + 2 * x) * h, y * w * 3 / 2], [0, 0]);
    lines.push(...c);
  }
}

bt.translate(lines, [width / 2, height / 2], bt.bounds(lines).cc);
bt.cut(lines, [rect(width, height)]);

setDocDimensions(width, height);
drawLines(lines);





