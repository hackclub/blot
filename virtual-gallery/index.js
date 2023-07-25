import { raycastMap } from "./raycasting.js";
import { reshapeArray } from "./raycasting.js";

const imageFilter = window.open("./camera-filter.html", "_blank");

const maze2D = document.querySelector(".maze-2d");
const ctx = maze2D.getContext("2d");

const w = maze2D.width;
const h = maze2D.width;

const n = 18;

const state = {
  width: n,
  height: n,
  orientation: "north",
  angle: 0,
  mazeData: genMatrix(n, n),
  playerX: n/2,
  playerY: n/2,
  globalX: 0,
  globalY: 0,
  lastX: 0,
  lastY: 0,
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

function pseudoRandom(x, y) {
  return ((Math.tan(x * y))*Math.cos(x)*Math.sin(y))
}

function randomVector(length, prob = 0.3) {
  return new Array(length)
    .fill(0)
    .map(() => {
      return Math.random() < prob ? 1 : 0;
    });
}

function genRow(x, y, length) {
  x = Math.floor(x);
  y = Math.floor(y);
  let row = [];
  for(let i = -n/2; i < length/2; i++) {
    row.push(pseudoRandom(x + i, y) < 0 ? 1 : 0);
  }
  return row;
}

function genColumn(x, y, length) {
  x = Math.floor(x);
  y = Math.floor(y);
  let column = [];
  for(let i = -n/2; i < length/2; i++) {
    column.push(pseudoRandom(x, y - i) < 0 ? 1 : 0);
  }
  return column;
}

function genMatrix(width, height) {
  let matrix = []
  for(let i = 0; i < height * width; i++) {
    matrix.push(pseudoRandom((i % width) - n/2, Math.floor(i / width) - n/2 + 1) < 0 ? 1 : 0 );
  }
  return matrix
}

window.addEventListener("keydown", e => {
  const { width, height, orientation, mazeData } = state;

  const halfWidth = (width-1)/2;

  const r = 0.05;
  let dx, dy;
  const branch = {
    KeyW() {
      dx = Math.sin((state.angle+0)/180*Math.PI)*r;
      dy = Math.cos(state.angle/180*Math.PI)*r;
      movePlayer(dx, dy);
    },
    KeyA() {
      dx = Math.sin((state.angle+270)/180*Math.PI)*r;
      dy = Math.cos((state.angle+270)/180*Math.PI)*r;
      movePlayer(dx, dy);
    },
    KeyS() {
      dx = Math.sin((state.angle+180)/180*Math.PI)*r;
      dy = Math.cos((state.angle+180)/180*Math.PI)*r;
      movePlayer(dx, dy);
    },
    KeyD() {
      dx = Math.sin((state.angle+90)/180*Math.PI)*r;
      dy = Math.cos((state.angle+90)/180*Math.PI)*r;
      movePlayer(dx, dy);
    }
  }[event.code];

  if (branch) branch();

  state.globalX = Math.round(state.globalX * 10000) / 10000;
  state.globalY = Math.round(state.globalY * 10000) / 10000;

  if (Math.floor(state.globalX) > state.lastX) {
    moveEast({ width, halfWidth, mazeData });
    state.playerX = n/2;
  }

  if (Math.floor(state.globalX) < state.lastX) {
    moveWest({ width, halfWidth, mazeData });
    state.playerX = n/2 + 1;
  }

  if (Math.floor(state.globalY) < state.lastY) {
    moveSouth({ width, halfWidth, mazeData });
    state.playerY = n/2 - 1;
  }

  if (Math.floor(state.globalY) > state.lastY) {
    moveNorth({ width, halfWidth, mazeData });
    state.playerY = n/2;
  }

  state.lastX = Math.floor(state.globalX);
  state.lastY = Math.floor(state.globalY);
})

window.addEventListener("mousemove", e => {
  if (document.pointerLockElement === maze2D) {
    state.angle += event.movementX * 0.07;
  }
  drawMaze(state);
})

window.addEventListener("click", () => {
  maze2D.requestPointerLock();
});

function get1DIndex(width, x, y) {
  return y * width + x;
}


const raycast = document.querySelector(".raycast");

raycastMap(state, raycast);


function moveNorth({ width, halfWidth, mazeData }) {
  insertRow(mazeData, width, 0, genRow(state.globalX, state.globalY + (n/2) - 1, width));
  removeRow(mazeData, width, width);
  return true;
}

function moveWest({ width, halfWidth, mazeData }) {
  insertColumn(mazeData, height, 0, genColumn(state.globalX - (n/2), state.globalY - 1, width));
  removeColumn(mazeData, width+1, width);
  return true;
}

function moveSouth({ width, halfWidth, mazeData }) {
  insertRow(mazeData, width, width, genRow(state.globalX, state.globalY - (n/2), width));
  removeRow(mazeData, width, 0);
  return true;
}

function moveEast({ width, halfWidth, mazeData }) {
  insertColumn(mazeData, width, width, genColumn(state.globalX + (n/2) - 1, state.globalY - 1, width));
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

function movePlayer(dx, dy) {
  dx = Math.round(dx * 1000000) / 1000000;
  dy = Math.round(dy * 1000000) / 1000000;
  const newX = state.playerX + dx;
  const newY = state.playerY - dy;

  let moveableX = true;
  let moveableY = true;

  let reshapedMaze = reshapeArray(state.mazeData, state.width);

  let fill_dx = reshapedMaze[Math.floor(state.playerY)][Math.floor(newX)]
  if (fill_dx) moveableX = false;
  let fill_dy = reshapedMaze[Math.floor(newY)][Math.floor(state.playerX)]
  if (fill_dy) moveableY = false;

  if (moveableX) {state.playerX += dx; state.globalX += dx}
  if (moveableY) {state.playerY -= dy; state.globalY += dy}
}











