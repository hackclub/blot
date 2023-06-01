import { raycastMap } from "./raycasting.js";

const maze2D = document.querySelector(".maze-2d");
const ctx = maze2D.getContext("2d");

const w = maze2D.width;
const h = maze2D.width;

const n = 7;

const state = {
  width: n,
  height: n,
  orientation: "north",
  angle: 0,
  mazeData: randomVector(n*n),
  playerX: n/2,
  playerY: n/2
}

const width = state.width;
const height = state.height;

const halfWidth = (width-1)/2;
const i = get1DIndex(width, halfWidth, halfWidth);
state.mazeData[i] = 0;

const xWidth = w/width;
const yWidth = h/height;

drawMaze(state);

function drawMaze(state) {

  const { width, height, orientation, mazeData } = state;
  const maze = mazeData;

  maze.forEach((cell, i) => {
    const { x, y } = getCoordinates(i, width);
    ctx.fillStyle = cell === 1 ? "black" : "white";
    ctx.fillRect(x*xWidth, y*yWidth, xWidth, yWidth);
  })

  ctx.fillStyle = "orange";
  ctx.fillRect(width/2*xWidth-xWidth/4, height/2*yWidth-yWidth/4, xWidth/2, yWidth/2);



  ctx.save();
  const rx = width/2*xWidth;
  const ry = height/2*yWidth;
  const redRectWidth = xWidth/8;
  const angle = state.angle;
  // const angle = {
  //   "north": 0,
  //   "east": 270,
  //   "south": 180,
  //   "west": 90,
  // }[orientation];
  ctx.translate(rx, ry);
  ctx.rotate(angle * Math.PI / 180); // in the screenshot I used angle = 20
  ctx.fillStyle = "red";
  ctx.fillRect(-redRectWidth/2, -yWidth/2, redRectWidth, yWidth/2.2);
  ctx.restore();
}


function getCoordinates(index, width) {
  const x = index % width;
  const y = Math.floor(index / width);
  return { x, y };
}

function insertRow(matrix, width, rowIndex, newRow) {
  // Calculate the index in the 1D array where the new row should start
  const insertIndex = rowIndex * width;
  
  // Insert the new row into the 1D array
  for (let i = 0; i < newRow.length; i++) {
    matrix.splice(insertIndex + i, 0, newRow[i]);
  }

  // Return the new matrix
  return matrix;
}

function removeRow(matrix, width, rowIndex) {
  // Calculate the index in the 1D array where the row to be removed starts
  const startIndex = rowIndex * width;

  // Remove the row from the 1D array
  matrix.splice(startIndex, width);

  // Return the new matrix
  return matrix;
}

function insertColumn(matrix, width, columnIndex, newColumn) {
  // Insert the new column into the 1D array
  for (let i = 0; i < newColumn.length; i++) {
    // Calculate the index in the 1D array where the new column element should be inserted
    const insertIndex = (i * (width + 1)) + columnIndex;

    // Insert the new column element
    matrix.splice(insertIndex, 0, newColumn[i]);
  }

  // Return the new matrix
  return matrix;
}

function removeColumn(matrix, width, columnIndex) {
  // We iterate backwards so that the removal of elements doesn't affect the indices of the elements yet to be removed
  for (let i = width - 1; i >= 0; i--) {
    // Calculate the index in the 1D array where the column element to be removed is located
    const removeIndex = (i * width) + columnIndex;

    // Remove the column element
    matrix.splice(removeIndex, 1);
  }

  // Return the new matrix
  return matrix;
}

function randomVector(length, prob = 0.5) {
  return new Array(length)
    .fill(0)
    .map(cell => {
      return Math.random() < prob ? 1 : 0;
    });
}

window.addEventListener("keydown", e => {
  const { width, height, orientation, mazeData } = state;

  const halfWidth = (width-1)/2;

  const orientationIndex = findClosestIndex(state.angle, [ 0, 90, 180, 270, 360 ]);
  const iMove = [moveNorth, moveWest, moveSouth, moveEast, moveNorth][orientationIndex];
  const kMove = [moveSouth, moveEast, moveNorth, moveWest, moveSouth][orientationIndex];
  const lMove = [moveWest, moveSouth, moveEast, moveNorth, moveWest][orientationIndex];
  const jMove = [moveEast, moveNorth, moveWest, moveSouth, moveEast][orientationIndex];

  const r = 0.1;
  let dx, dy;
  const branch = {
    KeyI() {
      dx = Math.sin((state.angle+0)/180*Math.PI)*r;
      dy = Math.cos(state.angle/180*Math.PI)*r;

      state.playerX += dx;
      state.playerY -= dy;
    },
    KeyJ() {
      dx = Math.sin((state.angle+270)/180*Math.PI)*r;
      dy = Math.cos((state.angle+270)/180*Math.PI)*r;
      state.playerX += dx;
      state.playerY -= dy;
      // jMove({ width, halfWidth, mazeData })
    },
    KeyK() {
      dx = Math.sin((state.angle+180)/180*Math.PI)*r;
      dy = Math.cos((state.angle+180)/180*Math.PI)*r;
      state.playerX += dx;
      state.playerY -= dy;
      // kMove({ width, halfWidth, mazeData })
    },
    KeyL() {
      dx = Math.sin((state.angle+90)/180*Math.PI)*r;
      dy = Math.cos((state.angle+90)/180*Math.PI)*r;
      state.playerX += dx;
      state.playerY -= dy;
      // lMove({ width, halfWidth, mazeData })
    },
    KeyA() {
      state.angle -= 5;
      if (state.angle < 0) state.angle = state.angle + 360
      state.angle %= 360;
    },
    KeyD() {  
      state.angle += 5;
      if (state.angle < 0) state.angle = state.angle + 360
      state.angle %= 360;
    }
  }[event.code];

  if (branch) branch();

  if (state.playerX > n/2 + .9) {
    moveWest({ width, halfWidth, mazeData });
    state.playerX = n/2;
  }

  if (state.playerX < n/2 - .9) {
    moveEast({ width, halfWidth, mazeData });
    state.playerX = n/2;
  }

  if (state.playerY > n/2 + .9) {
    moveSouth({ width, halfWidth, mazeData });
    state.playerY = n/2;
  }

  if (state.playerY < n/2 - .9) {
    moveNorth({ width, halfWidth, mazeData });
    state.playerY = n/2;
  }

  drawMaze(state);
})

function get1DIndex(width, x, y) {
  return y * width + x;
}


const raycast = document.querySelector(".raycast");

raycastMap(state, raycast);


function moveNorth({ width, halfWidth, mazeData }) {
  // const i = get1DIndex(width, halfWidth, halfWidth-1);
  // const fill = mazeData[i];
  // if (fill === 1) return false;
  insertRow(mazeData, width, 0, randomVector(width));
  removeRow(mazeData, width, width);
  return true;
}

function moveEast({ width, halfWidth, mazeData }) {
  // const i = get1DIndex(width, halfWidth-1, halfWidth);
  // const fill = mazeData[i];
  // if (fill === 1) return false;
  insertColumn(mazeData, height, 0, randomVector(height));
  removeColumn(mazeData, width+1, width);
  return true;
}

function moveSouth({ width, halfWidth, mazeData }) {
  // const i = get1DIndex(width, halfWidth, halfWidth+1);
  // const fill = mazeData[i];
  // if (fill === 1) return false;
  insertRow(mazeData, width, width, randomVector(width));
  removeRow(mazeData, width, 0);
  return true;
}

function moveWest({ width, halfWidth, mazeData }) {
  // const i = get1DIndex(width, halfWidth+1, halfWidth);
  // const fill = mazeData[i];
  // if (fill === 1) return false;
  insertColumn(mazeData, width, width, randomVector(width));
  removeColumn(mazeData, width+1, 0);
  return true;
}


function findClosestIndex(target, arr) {
  let closestIndex = 0;
  let closestDistance = Math.abs(arr[0] - target);
  
  for(let i = 1; i < arr.length; i++) {
      let distance = Math.abs(arr[i] - target);
      if(distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
      }
  }

  return closestIndex;
}











