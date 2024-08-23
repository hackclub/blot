/*
@title: Tetris
@author: Naainz
@snapshot: img1.png
*/

const gridWidth = 10;
const gridHeight = 20;
const cellSize = 5;
const canvasWidth = gridWidth * cellSize;
const canvasHeight = gridHeight * cellSize;

setDocDimensions(canvasWidth, canvasHeight);

const finalLines = [];
let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(0));

const tetrominoes = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]] // L
];

function drawCell(x, y) {
  const cellLines = [
    [[x, y], [x + cellSize, y]],
    [[x + cellSize, y], [x + cellSize, y + cellSize]],
    [[x + cellSize, y + cellSize], [x, y + cellSize]],
    [[x, y + cellSize], [x, y]]
  ];
  bt.join(finalLines, cellLines);
}

function fillBottomLayers() {
  for (let x = 0; x < gridWidth; x++) {
    let height = 0;
    for (let y = 0; y < 10; y++) {
      if (bt.rand() < 0.5) {
        grid[height][x] = 1;
        drawCell(x * cellSize, height * cellSize);
        height++;
      }
    }
  }
}

function placeTetromino(tetromino, x, y) {
  tetromino.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        grid[y + rowIndex][x + colIndex] = 1;
        drawCell((x + colIndex) * cellSize, (y + rowIndex) * cellSize);
      }
    });
  });
}

function calculateScore() {
  let filledCells = 0;
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (grid[y][x] === 1) {
        filledCells++;
      }
    }
  }
  return filledCells;
}


// long list of predefined numbers
function drawDigit(turtle, digit, x, y) {
  const segments = {
    1: [[x + 2, y + 4], [x + 2, y]], 
    2: [
      [x, y + 4], [x + 3, y + 4],
      [x + 3, y + 4], [x + 3, y + 2],
      [x + 3, y + 2], [x, y + 2],
      [x, y + 2], [x, y],
      [x, y], [x + 3, y]
    ],
    3: [
      [x, y + 4], [x + 3, y + 4],
      [x + 3, y + 4], [x + 3, y + 2],
      [x + 3, y + 2], [x, y + 2],
      [x + 3, y + 2], [x + 3, y],
      [x + 3, y], [x, y]
    ],
    4: [
      [x, y + 4], [x, y + 2],
      [x, y + 2], [x + 3, y + 2],
      [x + 3, y + 4], [x + 3, y]
    ],
    5: [
      [x + 3, y + 4], [x, y + 4], 
      [x, y + 4], [x, y + 2],
      [x, y + 2], [x + 3, y + 2],
      [x + 3, y + 2], [x + 3, y], 
      [x + 3, y], [x, y] 
    ],
    6: [
      [x + 3, y + 4], [x, y + 4], 
      [x, y + 4], [x, y],
      [x, y], [x + 3, y],
      [x + 3, y], [x + 3, y + 2],
      [x + 3, y + 2], [x, y + 2]
    ],
    7: [
      [x, y + 4], [x + 3, y + 4],
      [x + 3, y + 4], [x + 3, y],
    ],
    8: [
      [x, y + 4], [x + 3, y + 4],
      [x + 3, y + 4], [x + 3, y],
      [x + 3, y], [x, y], 
      [x, y], [x, y + 4], 
      [x, y + 2], [x + 3, y + 2]  
    ],
    9: [
      [x + 3, y], [x + 3, y + 4], 
      [x + 3, y + 4], [x, y + 4], 
      [x, y + 4], [x, y + 2], 
      [x, y + 2], [x + 3, y + 2]  
    ],
    0: [
      [x, y + 4], [x + 3, y + 4], 
      [x + 3, y + 4], [x + 3, y], 
      [x + 3, y], [x, y],
      [x, y], [x, y + 4]
    ]
  };

  const lines = segments[digit];
  if (lines) {
    turtle.jump(lines[0]);
    turtle.down();
    for (let i = 1; i < lines.length; i++) {
      turtle.goTo(lines[i]);
    }
    turtle.up();
  }
}

function displayScore(score) {
  const digits = String(score).split('').map(Number);
  const turtle = new bt.Turtle().up();
  // change the number on the next line to move the position of the score
  const xStart = canvasWidth - cellSize + -2.6;
  const yStart = canvasHeight - cellSize;
  let x = xStart;
  let y = yStart;
  const gap = 1.1; // change this to modify the gap

  digits.forEach((digit, index) => {
    drawDigit(turtle, digit, x, y);
    if (index % 2 === 1) { 
      x = xStart;
      y -= cellSize;
    } else {
      x += (cellSize / 2) + gap; 
    }
  });

  const scoreLines = turtle.lines();
  bt.join(finalLines, scoreLines);
}

fillBottomLayers();

const randomTetromino = tetrominoes[Math.floor(bt.randInRange(0, tetrominoes.length))];
const startX = Math.floor(bt.randInRange(0, gridWidth - randomTetromino[0].length));
const startY = Math.floor(bt.randInRange(12, 18));
placeTetromino(randomTetromino, startX, startY);

const border = [
  [
    [0, 0],
    [canvasWidth, 0]
  ],
  [
    [canvasWidth, 0],
    [canvasWidth, canvasHeight]
  ],
  [
    [canvasWidth, canvasHeight],
    [0, canvasHeight]
  ],
  [
    [0, canvasHeight],
    [0, 0]
  ],
];
bt.join(finalLines, border);

const score = calculateScore();
displayScore(score);

drawLines(finalLines);
