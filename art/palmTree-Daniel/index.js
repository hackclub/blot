/*
@title: Day At The Beach
@author: Daniel Kou
@snapshot: Palm Tree
*/

// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const seed = 923875;
bt.setRandSeed(seed);

const width = 512;
const height = 512;

setDocDimensions(width, height);

const landOnLeft = true;

const small = 1;
const medium = 2;
const large = 3;
const treeSize = small; 

let line = [];

line[0] = 96;
// Lower bound 64 upper bound 128

let divider = ~~((256 + 64 + ~~(bt.rand() * 64)) / 16);

for (let i = 1; i <= 32; i++) {
  if (line[i - 1] == 64) {
    let change = ~~(bt.rand() * 2); // either 0 or 1 round down
    change *= 8
    line.push(line[i - 1] + change);
  } else if (line[i - 1] == 128) {
    let change = ~~(bt.rand() * 2);
    change *= 8
    line.push(line[i - 1] - change);
  } else {
    let change = ~~(bt.rand() * 3);
    change -= 1;
    change *= 8
    line.push(line[i - 1] - change);
  }
}

let land = [];
let wave = [];

for (let i = 0; i <= 32; i++) {
  if (i < divider) {
    if (landOnLeft) {
      land.push([16 * i, line[i]]);
    } else {
      wave.push([16 * i, line[i]]);
    }
  } else {
    if (landOnLeft) {
      wave.push([16 * i, line[i]]);
    } else {
      land.push([16 * i, line[i]]);
    }
  }

  if (i == divider - 1) { // for continuity
    if (landOnLeft) {
      wave.push([16 * i, line[i]]);
    } else {
      land.push([16 * i, line[i]]);
    }
  }
}

land = bt.catmullRom(land, 5);
wave = bt.catmullRom(wave, 5);

if (landOnLeft) {
  land.unshift([0, 0]);
  wave.unshift([16 * (divider - 1), 0]);
} else {
  wave.unshift([0, 0]);
  land.unshift([16 * (divider - 1), 0]);
}

if (landOnLeft) {
  land.push([16 * (divider - 1), 0]);
  land.push([0, 0]);
  wave.push([512, 0]);
  wave.push([16 * (divider - 1), 0]);
} else {
  wave.push([16 * (divider - 1), 0]);
  wave.push([0, 0]);
  land.push([512, 0]);
  land.push([16 * (divider - 1), 0]);
}

let treeCenter = 0;
let treeWidth = 0;
let treeHeight = 0;

if (treeSize == small) {
  treeWidth = 8;
  treeHeight = 256;
} else if (treeSize == medium) {
  treeWidth = 16;
  treeHeight = 320;
} else {
  treeWidth = 32;
  treeHeight = 384;
}

let tree = [];

if (landOnLeft) {
  let rand = ~~(bt.rand() * 17) - 8; // between -8 and 8
  treeCenter = 12 * (divider - 1) + rand;

  tree.push([treeCenter, line[Math.round(treeCenter / 16)] - 16]);
  tree.push([treeCenter + treeHeight / 16, treeHeight]);

  tree.push([-16 + treeCenter + treeHeight / 16, treeHeight]);
  tree.push([-16 + treeCenter, line[Math.round(treeCenter / 16)] - 16]);
} else {
  let rand = ~~(bt.rand() * 17) - 8; // between -8 and 8
  treeCenter = 16 * (divider - 1) + (512 - 16 * (divider - 1)) / (4 / 3) + rand - 64;

  tree.push([treeCenter, line[Math.round(treeCenter / 16)] - 16]);
  tree.push([treeCenter - treeHeight / 16, treeHeight]);

  tree.push([16 + treeCenter - treeHeight / 16, treeHeight]);
  tree.push([16 + treeCenter, line[Math.round(treeCenter / 16)] - 16]);
}

tree = bt.catmullRom(tree, 5);

// draw 
drawLines([tree], {fill: "gray", stroke: "brown", width: 2});
drawLines([land], {fill: "yellow", stroke: "yellow", width: 2});
drawLines([wave], {fill: "blue", stroke: "blue", width: 2});

const num_leaves = 12

let origin = [0, 0];
  
if (landOnLeft) {
  origin = [-8 + treeCenter + treeHeight / 16, treeHeight];
} else {
  origin = [8 + treeCenter - treeHeight / 16, treeHeight];
}

for (let i = 0; i < num_leaves; i++) {
  let leafX = 100;
  let leafY = 40;

  if (treeSize == small) {
    leafX *= 256/320;
    leafY *= 256/320
  } else if (treeSize == large) {
    leafX *= 384/320;
    leafY *= 384/320
  }
  
  const finalLines = [];
  
  let topEdge = [
    bt.nurbs([
      [0, 0],
      [leafX*0.05, leafY*0.5],
      [leafX*0.25, leafY*.8],
      [leafX*0.5, leafY*.95],
      [leafX, leafY]
    ])
  ]

  let curr_point = [leafX, leafY];
  
  for (let i = 0; i < 4; i++) {
    let slope = curr_point[1] / curr_point[0];
  
    curr_point = [curr_point[0] - leafX / 4, curr_point[1] - slope * leafX / 4];
    
    topEdge[0].push(curr_point);
  
    if (i !== 3) {
      curr_point = [curr_point[0], curr_point[1] - leafY / 10];
      topEdge[0].push(curr_point);
    }
  }

  bt.rotate(topEdge, 20 * ((num_leaves / 4) - (i % (num_leaves / 2))), [0, 0]);

  bt.translate(topEdge, origin);

  if (i >= num_leaves / 2) {
    // reflect
    for (let j = 0; j < topEdge[0].length; j++) {
      topEdge[0][j][0] = 2 * origin[0] - topEdge[0][j][0];
    }
  }
  
  drawLines(topEdge, {fill: "green", stroke: "black", width: 2});
}

let coconut = [[]];

let radius = 12;

if (treeSize == small) {
  radius *= 256/320;
} else if (treeSize == large) {
  radius *= 384/320;
}

const lines = 32;

for (let j = 0; j < lines + 1; j++) {
  coconut[0].push([radius * Math.cos(2 * Math.PI * j / lines), radius * Math.sin(2 * Math.PI * j / lines)]);
}

bt.translate(coconut, origin);

drawLines(coconut, {fill: "brown", stroke: "black", width: 2});

for (let i = 0; i < 5; i++) {
  let coconut = [[]];

  let radius = 12;

  if (treeSize == small) {
    radius *= 256/320;
  } else if (treeSize == large) {
    radius *= 384/320;
  }

  const lines = 32;

  for (let j = 0; j < lines + 1; j++) {
    coconut[0].push([radius * Math.cos(2 * Math.PI * j / lines), radius * Math.sin(2 * Math.PI * j / lines)]);
  }

  bt.rotate(coconut, 45 * (i - 1), [radius * 0.8, radius * 0.8]);
  bt.translate(coconut, [origin[0] - radius, origin[1] - radius]);
  
  drawLines(coconut, {fill: "brown", stroke: "black", width: 2});
}
