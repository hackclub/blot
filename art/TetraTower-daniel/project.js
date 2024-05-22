/*
@title: Tetra Tower
@author: Daniel Pu
@snapshot: tetra1
*/

const canvasWidth = 125;
const canvasHeight = 250;

const width = 8;
const height = 12;
const pieces = 15;
const scale = 14.0;
const wireframeOn = true;

const finalLines = [];

function inBounds(x, y) {
  return x > 0 && x <= width && y > 0 && y <= height;
}

var vis = [];
for (let i = 0; i <= height; i++) {
  vis[i] = [];
  for (let j = 0; j <= width; j++) {
    vis[i][j] = 0;
  }
}
let tetras = [];
let q = [];
for (let i = 0; i < width; ++i) {
  q.push([i + 1, 1]);
}
let dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function shuffle(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}


function modifiedBFS(steps) {
  for (let i = 0; i < steps && q.length > 0; ++i) {
    let cur = q[0];
    q.shift();
    if (vis[cur[0]][cur[1]] === 1) {
      --i;
      continue;
    }
    tetras.push([]);
    if(!DFS(cur[0], cur[1], 1, 4)){
      --i;
    }
  }
}

function DFS(x, y, steps, maxSteps) {
  vis[x][y] = 1;
  tetras.at(-1).push([scale * x, scale * y]);
  for (let i = 0; i < 3; ++i) {
    let found = false;
    dirs = shuffle(dirs);
    let prevx = x;
    let prevy = y;
    for (let j = 0; j < 4; ++j) {
      let newX = prevx + dirs[j][0];
      let newY = prevy + dirs[j][1];
      if (inBounds(newX, newY) && vis[newX][newY] === 0) {
        if (found) {
          if (dirs[j][1] === 1) {
            q.push([newX, newY]);
          }
        } else {
          found = true;
          x = newX;
          y = newY;
          vis[x][y] = 1;
          tetras.at(-1).push([scale * x, scale * y]);
        }
      }
    }
    if (!found) {
      tetras.pop();
      return false;
    }
  }
  return true;
}
modifiedBFS(pieces, 0);
console.log(tetras);
const fixedDirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
let lines = [];
for (let i = 0; i < tetras.length; ++i) {
  for (let k = 0; k < 4; ++k) {
    let cur = tetras[i][k];
    let res = [1, 1, 1, 1]
    for (let j = 0; j < 4; ++j) {
      for (let z = 0; z < 4; ++z) {
        if (cur[0] + scale*fixedDirs[z][0] === tetras[i][j][0] && cur[1] + scale*fixedDirs[z][1] === tetras[i][j][1]) {
          res[z] = 0;
          break;
        }
      }
    }
    for (let j = 0; j < 4; ++j) {
      if (res[j] === 1) {
        if(fixedDirs[j][1] === 0){
          lines.push([[cur[0]+scale*fixedDirs[j][0]/2, cur[1]-scale*fixedDirs[j][0]/2],[cur[0]+scale*fixedDirs[j][0]/2, cur[1]+scale*fixedDirs[j][0]/2]]);
        } else{
          lines.push([[cur[0]-scale*fixedDirs[j][1]/2, cur[1]+scale*fixedDirs[j][1]/2],[cur[0]+scale*fixedDirs[j][1]/2, cur[1]+scale*fixedDirs[j][1]/2]]);
        }
      }
    }
  }
}
if(wireframeOn){
  drawLines(tetras);
}
drawLines(lines);


setDocDimensions(canvasWidth, canvasHeight);