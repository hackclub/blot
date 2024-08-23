/*
@title: Tetris
@author: Naainz
@snapshot: img1.png
*/

const gridWidth = 10;
const gridHeight = 20;
const newSectionWidth = 6;
const cellSize = 5;
const canvasWidth = (gridWidth + newSectionWidth) * cellSize;
const canvasHeight = gridHeight * cellSize;

setDocDimensions(canvasWidth, canvasHeight);

const finalLines = [];
let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(0));

const tetrominoes = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]]
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

function drawScoreText(turtle, x, y) {
  const scoreText = [
    [[x, y + 4], [x + 3, y + 4]],
    [[x, y + 4], [x, y + 2]],
    [[x, y + 2], [x + 3, y + 2]],
    [[x + 3, y + 2], [x + 3, y]],
    [[x, y], [x + 3, y]],

    [[x + 5, y + 4], [x + 8, y + 4]],
    [[x + 5, y + 4], [x + 5, y]],
    [[x + 5, y], [x + 8, y]],

    [[x + 10, y + 4], [x + 13, y + 4]],
    [[x + 10, y], [x + 13, y]],
    [[x + 10, y + 4], [x + 10, y]],
    [[x + 13, y + 4], [x + 13, y]],

    [[x + 15, y + 4], [x + 15, y]],
    [[x + 15, y + 4], [x + 18, y + 4]],
    [[x + 18, y + 4], [x + 18, y + 2]],
    [[x + 15, y + 2], [x + 18, y + 2]],
    [[x + 15, y + 2], [x + 18, y]],

    [[x + 20, y + 4], [x + 23, y + 4]],
    [[x + 20, y + 2], [x + 23, y + 2]],
    [[x + 20, y], [x + 23, y]],
    [[x + 20, y + 4], [x + 20, y]]
  ];

  bt.join(finalLines, scoreText);
}

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
      [x + 3, y + 4], [x + 3, y]
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

function drawLevelText(turtle, x, y) {
  const levelText = [
    [[x, y + 4], [x, y]],
    [[x, y], [x + 3, y]],

    [[x + 5, y + 4], [x + 8, y + 4]],
    [[x + 5, y + 2], [x + 8, y + 2]],
    [[x + 5, y], [x + 8, y]],
    [[x + 5, y + 4], [x + 5, y]],

    [[x + 10, y + 4], [x + 12, y]],
    [[x + 12, y], [x + 14, y + 4]],

    [[x + 16, y + 4], [x + 19, y + 4]],
    [[x + 16, y + 2], [x + 19, y + 2]],
    [[x + 16, y], [x + 19, y]],
    [[x + 16, y + 4], [x + 16, y]],

    [[x + 21, y + 4], [x + 21, y]],
    [[x + 21, y], [x + 24, y]]
  ];

  bt.join(finalLines, levelText);
}

function drawNextText(turtle, x, y) {
  const nextText = [
    [[x, y], [x, y + 4]],
    [[x, y + 4], [x + 3, y]],
    [[x + 3, y + 4], [x + 3, y]],

    [[x + 5, y + 4], [x + 8, y + 4]],
    [[x + 5, y + 2], [x + 8, y + 2]],
    [[x + 5, y], [x + 8, y]],
    [[x + 5, y + 4], [x + 5, y]],

    [[x + 10, y + 4], [x + 13, y]],
    [[x + 10, y], [x + 13, y + 4]],

    [[x + 15, y + 4], [x + 18, y + 4]],
    [[x + 16.5, y + 4], [x + 16.5, y]]
  ];

  bt.join(finalLines, nextText);
}

function displayScore(score) {
  const digits = String(score).split('').map(Number);
  const turtle = new bt.Turtle().up();

  drawScoreText(turtle, gridWidth * cellSize + 3, canvasHeight - 1.2 * cellSize);

  let x = gridWidth * cellSize + 3;
  let y = canvasHeight - 3.5 * cellSize;
  const gap = 1.1;

  digits.forEach((digit, index) => {
    drawDigit(turtle, digit, x, y);
    if (index % 2 === 1) {
      x = gridWidth * cellSize + 5;
      y -= cellSize;
    } else {
      x += (cellSize / 2) + gap;
    }
  });

  let level = 0;
  if (score >= 61) level = 5;
  else if (score >= 56) level = 4;
  else if (score >= 51) level = 3;
  else if (score >= 46) level = 2;
  else if (score >= 41) level = 1;

  drawLevelText(turtle, gridWidth * cellSize + 3, canvasHeight - 5.5 * cellSize);

  x = gridWidth * cellSize + 3;
  y = canvasHeight - 7.5 * cellSize;
  drawDigit(turtle, level, x, y);

  drawNextText(turtle, gridWidth * cellSize + 6, 5.5 * cellSize);

  const nextTetromino = tetrominoes[Math.floor(bt.randInRange(0, tetrominoes.length))];
  nextTetromino.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        drawCell(
          (gridWidth + 1 + colIndex) * cellSize,
          (rowIndex + 2) * cellSize
        );
      }
    });
  });

  const scoreLines = turtle.lines();
  bt.join(finalLines, scoreLines);
}

fillBottomLayers();

const randomTetromino = tetrominoes[Math.floor(bt.randInRange(0, tetrominoes.length))];
const startX = Math.floor(bt.randInRange(0, gridWidth - (randomTetromino[0]?.length || 0)));
const startY = Math.floor(bt.randInRange(12, 18));
placeTetromino(randomTetromino, startX, startY);

const border = [
  [
    [gridWidth * cellSize, 0],
    [gridWidth * cellSize, canvasHeight]
  ],
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
  ]
];

bt.join(finalLines, border);

const score = calculateScore();
displayScore(score);

drawLines(finalLines);
