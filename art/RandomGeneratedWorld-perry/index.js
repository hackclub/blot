/*
@title: Random Generated World
@author: perrys25
@snapshot: snapshot1.png
*/

const xSize = 20
const ySize = 10

bt.setRandSeed(600);

setDocDimensions(xSize * 10, ySize * 10);

const grid = Array.from(Array(ySize), () => Array.from(Array(xSize), () => undefined))



function drawSquare(x, y) {
  drawLines([
    [
      [x * 10, y * 10],
      [x * 10 + 10, y * 10]
    ],
    [
      [x * 10, y * 10],
      [x * 10, y * 10 + 10]
    ],
    [
      [x * 10 + 10, y * 10],
      [x * 10 + 10, y * 10 + 10]
    ],
    [
      [x * 10, y * 10 + 10],
      [x * 10 + 10, y * 10 + 10]
    ]
  ], { fill: "black" });
}

function drawShaded(x, y) {
  drawSquare(x, y)
  drawLines([
    [
      [x * 10, y * 10],
      [x * 10 + 10, y * 10 + 10]
    ],
    [
      [x * 10, y * 10 + 10],
      [x * 10 + 10, y * 10]
    ]
  ]);
}

const cloudElements = []

function drawCloud(x, y) {
  cloudElements.push([
    [
      [x * 10, y * 10],
      [x * 10 + 10, y * 10]
    ],
    [
      [x * 10, y * 10],
      [x * 10, y * 10 + 10]
    ],
    [
      [x * 10 + 10, y * 10],
      [x * 10 + 10, y * 10 + 10]
    ],
    [
      [x * 10, y * 10 + 10],
      [x * 10 + 10, y * 10 + 10]
    ]
  ])
}

const values = {
  "shaded": drawShaded,
  "cloud": drawCloud
}

const offset = bt.randIntInRange(1, 10)
const scalar = bt.randIntInRange(1, 10);
const heights = new Array(xSize)

for (let i = 0; i < xSize; i++) {
  heights[i] = Math.max(0, Math.min(ySize, 2 + parseInt(bt.noise(i * scalar + offset) * 5)))
}

for (let x = 0; x < xSize; x++) {
  for (let y = 0; y < heights[x]; y++) {
    grid[y][x] = "shaded"
  }
}

function drawEntireCloud(x, y) {
  grid[y][x] = "cloud"
  grid[y][x + 1] = "cloud"
  grid[y + 1][x + bt.randIntInRange(0, 2)] = "cloud"
  grid[y][x + 2] = "cloud"
}

for (let i = bt.randIntInRange(0, 4); i < xSize; i += bt.randIntInRange(4, 7)) {
  drawEntireCloud(i, bt.randIntInRange(6, 8))
}
for (let x = 0; x < xSize; x++) {
  for (let y = 0; y < ySize; y++) {
    const element = grid[y][x]
    if (element !== undefined) {
      values[element](x, y)
    }
  }
}

let lastElement = []

for (let i = 0; i < cloudElements.length; i++) {
  for (let m = 0; m < cloudElements[i].length; m++) {
    const element = cloudElements[i][m]
    const elements = lastElement.some((e) => JSON.stringify(e) === JSON.stringify(element));
    if (elements) {
      lastElement.splice(lastElement.findIndex((e) => JSON.stringify(e) === JSON.stringify(element)), 1)
    } else {
      lastElement.push(element)
    }
  }
}

drawLines(lastElement)