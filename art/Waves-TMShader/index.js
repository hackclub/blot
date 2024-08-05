/*
@title: Waves
@author: TMShader
@snapshot: 1.png
*/

/* Variables */
const lineNum = 100;
const margin = 5;
const break_x = 4; /* 3-6 give reasonable results */
const random_start = 1;
const random_break = 1;
/* --- */

const width = 200;
const height = 200;

setDocDimensions(width, height);

const breakAvg = (breakx, y) => {
  const distance = Math.min(y - margin, height - y - margin) / (height - margin * 2);

  return [
    breakx[0] + bt.randInRange(-random_break, random_break),
    marginClamp((breakx[1] * distance) + (y * (1 - distance)) + bt.randInRange(-random_break, random_break))
  ];
}

const marginClamp = (coord) => Math.max(margin, Math.min(height - margin, coord));

const lines = [];
const step = (height - margin * 2) / lineNum;

const break1 = [width / break_x, margin]
const break2 = [(width / break_x) * (break_x - 1), height - margin]

for (let i = 0; i <= lineNum; i++) {
  let y = i * step + margin;

  lines.push(bt.catmullRom([
    [margin, marginClamp(y + bt.randInRange(-random_start, random_start))], breakAvg(break1, y), breakAvg(break2, y), [width - margin, marginClamp(y + bt.randInRange(-random_start, random_start))]
  ]))
}

drawLines(lines);