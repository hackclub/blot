/*
@title: LeafyLine
@author: Udit Garg
@snapshot: LeafyLine.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);
const shaft = bt.resample(
  [
    [
      [0, 0],
      [1, 0],
      [0, -100],
      [3, -115], 
      [5, -130],
      [-1, 0],
      [0, 0],
    ],
  ],
  1
);
const vanes = [
  bt.catmullRom([
    [0, 0],
    [-16, 12],
    [-24, 65],
    [-12, 95],
    [0, 110], 
    [12, 95],
    [24, 65],
    [16, 12],
    [0, 0],
  ]),
];
const barbs = [];
for (let i = 0; i < shaft[0].length; i++) {
  const parity = i > shaft[0].length / 2 ? -1 : 1;
  const [x, y] = shaft[0][i];
  const offset = i % 2 === 0 ? 10 : 8; 
  const angle = 2 + (i % 3) * 1.5; 
  barbs.push(
    bt.catmullRom([
      [x, y],
      [x + parity * (offset - 4), y - angle],
      [x + parity * offset * 2, y + 2 * angle],
      [x + parity * (offset * 2.8), y + 4], 
    ])
  );
}
bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]]);
bt.cut(barbs, vanes);
const feather = [...shaft, ...barbs];
const featherBounds = bt.bounds(feather);
const scaleFactor = Math.min(
  width / featherBounds.width,
  height / featherBounds.height
);
bt.scale(feather, scaleFactor, featherBounds.cc);
bt.translate(feather, [width / 2, height / 2], featherBounds.cc);
bt.rotate(feather, 150);
drawLines(feather);
