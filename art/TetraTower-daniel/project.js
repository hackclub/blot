/*
@title: Tetra Tower
@author: danielp1218
@snapshot: tetra1.png
*/

const canvasWidth = 125;
const canvasHeight = 250;

const width = 10;
const height = 20;
const pieces = 40;
const scale = 10.0;
const wireframeOn = false;

const finalLines = [];

function inBounds(x, y) {
  return x > 0 && x <= width && y > 0 && y <= height;
}

let vis = [];
for (let i = 0; i <= width; i++) {
  vis[i] = [];
  for (let j = 0; j <= height; j++) {
    vis[i][j] = 0;
  }
}
let tetras = [];
let q = [];
for (let i = 1; i <= width; ++i) {
  q.push([i, 1]);
}
q = shuffle(q);
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
    if(!DFS(cur[0], cur[1], 4)){
      q.push(cur);
      --i;
    }
  }
}

function DFS(x, y, maxSteps) {
  let tempQ = [];
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
            tempQ.push([newX, newY]);
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
  q = q.concat(tempQ);
  return true;
}
modifiedBFS(pieces, 0);
const fixedDirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
let lines = [];
for (let i = 0; i < tetras.length; ++i) {
  lines.push([]);
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
          lines[i].push([[cur[0]+scale*fixedDirs[j][0]/2, cur[1]-scale*fixedDirs[j][0]/2],[cur[0]+scale*fixedDirs[j][0]/2, cur[1]+scale*fixedDirs[j][0]/2]]);
        } else{
          lines[i].push([[cur[0]-scale*fixedDirs[j][1]/2, cur[1]+scale*fixedDirs[j][1]/2],[cur[0]+scale*fixedDirs[j][1]/2, cur[1]+scale*fixedDirs[j][1]/2]]);
        }
      }
    }
  }
}

//cyan, yellow, purple, green, red, blue, orange
const colours = [
  "rgb(0,255,255)",
  "rgb(255, 255, 0)",
  "rgb(255, 0, 255)",
  "rgb(0, 255, 0)",
  "rgb(255, 0, 0)",
  "rgb(0, 0, 255)",
  "rgb(255, 127, 0)"
]

function find(arr, num){
  for(let i = 0 ; i < arr.length ; ++i){
    if(arr[i][0] === num) return i;
  }
  return -1;
}

// 0   , 1, 2, 3, 4, 5, 6
// line, O, T, S, Z, J, L
function classifyPiece(pieceCoords){
  let freqX = [];
  let freqY = [];
  for(let i = 0 ; i < 4 ; ++i){
    let ind = find(freqX, pieceCoords[i][0]);
    if(ind === -1){
      freqX.push([pieceCoords[i][0], 1]);
    } else{
      ++freqX[ind][1];
    }
    ind = find(freqY, pieceCoords[i][1]);
    if(ind === -1){
      freqY.push([pieceCoords[i][1], 1]);
    } else{
      ++freqY[ind][1];
    }
  } 
  
  if(freqX.length === 1 || freqY.length === 1){
    return 0;
  } else if (freqX.length === 2 && freqY.length === 2){
    return 1;
  } else {
    freqX.sort(function(a, b) {return a[0] - b[0];});
    freqY.sort(function(a, b) {return a[0] - b[0];});
    if (freqX.length === 3){
      if(freqY[0][1] === 2 && freqY[1][1] === 2){
        let midX = 0;
        for(let i = 0 ; i < 4 ; ++i) midX += pieceCoords[i][0];
        midX /= 4;
        let stY = 0, endY = 0;
        for(let i = 0 ; i < 4 ; ++i){
          if(pieceCoords[i][0] > midX){
            stY = pieceCoords[i][1];
          } else if (pieceCoords[i][0] < midX){
            endY = pieceCoords[i][1];
          }
        }
        if (stY > endY){
          return 3;
        }
        return 4;
      }
      if(freqX[1][1] === 2) return 2;
      if(freqY[0][1] === 1){
        if(freqX[0][1] === 2) return 6;
        return 5;
      }
      if(freqX[0][1] === 2) return 5;
      return 6;
    }
    if(freqX[0][1] === 2 && freqX[1][1] === 2) {
      let midY = 0;
      for(let i = 0 ; i < 4 ; ++i) midY += pieceCoords[i][1];
      midY /= 4;
      let topX = 0, botX = 0;
      for(let i = 0 ; i < 4 ; ++i){
        if(pieceCoords[i][1] > midY){
          topX = pieceCoords[i][0];
        } else if (pieceCoords[i][1] < midY){
          botX = pieceCoords[i][0];
        }
      }
      if (topX > botX){
        return 4;
      }
      return 3;
    }
    if(freqY[1][1] === 2) return 2;
    if(freqX[0][1] === 1){
      if(freqY[0][1] === 2) return 5;
      return 6;
    }
    if(freqY[0][1] === 2) return 6;
    return 5;
  }
  
}

function merge(tetraPiece){
  let temp = bt.copy(tetraPiece);
  let cur = [temp[0][0], temp[0][1]];
  temp.shift();
  while(temp.length>0){
    let found = false;
    for(let i = 0 ; i < temp.length ; ++i){
      if(temp[i][0][0] === cur.at(-1)[0] && temp[i][0][1] === cur.at(-1)[1]){
        cur.push(temp[i][1]);
        temp.splice(i, 1);
        found = true;
        break;
      } else if (temp[i][1][0] === cur.at(-1)[0] && temp[i][1][1] === cur.at(-1)[1]){
        cur.push(temp[i][0]);
        temp.splice(i, 1);
        found = true;
        break;
      }
    }
    if(!found){
      break;
    }
  }
  return cur;
}

function center(polyline){
  for(let i = 0 ;  i < polyline.length ; ++i){
    polyline[i][0]+=canvasWidth/2-scale*(width/2+0.5);
  }
}



if(wireframeOn){
  drawLines(tetras);
}
for(let i = 0 ; i < lines.length ; ++i){
  let closedShape = merge(lines[i]);
  center(closedShape);
  let colour = colours[classifyPiece(tetras[i])];
  drawLines([closedShape], {fill: colour, width: 1});
}


setDocDimensions(canvasWidth, canvasHeight);
