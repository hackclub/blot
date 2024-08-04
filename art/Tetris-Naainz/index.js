/*
@title: Tetris
@author: Naainz
@snapshot: img1.png
*/

const gridWidth = 10;
const gridHeight = 20;
const cellSize = 10;
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

drawLines(finalLines);
