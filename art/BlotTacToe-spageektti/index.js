/*
@title: BlotTacToe
@author: spageektti
@snapshot: 4.png
*/

// general options
const width = 125;
const height = 125; // recommended to be square, but don't have to
const boxes_width = 4; // how many boxes to draw
const boxes_height = 4; // boxes must be squares to be tic tac toe game, but you can change it if you want

// fill-the-board options
const fill = true; // whether to make your blot machine play the TicTacToe game with himself, or make the board blank - works when the boxes are squares
const how_many_in_row_to_win = 3; // only needed when fill=true
// randomness options (only needed when fill=true)
const seed = 138124;

// number of control points to draw the circle (O)
// use at least 8 to make it look like something similar to a circle, and 16 to make it look like a real circle 
const numPoints = 16;
// number that is passed to bt.catmullRom()
// there isn't really any big difference when changing the number, 5 looks the same as 10000000, you can make it 1 or 2 to see difference
const curvePoints = 5;

bt.setRandSeed(seed);
const drawable_size = Math.min(width, height);

setDocDimensions(width, height);

// draw the board
let board = [];

// add vertical lines
for (let i = 1; i < boxes_width; i++) {
  board.push([
    [i * (drawable_size / boxes_width), 0],
    [i * (drawable_size / boxes_width), drawable_size]
  ]);
}

// add horizontal lines
for (let i = 1; i < boxes_height; i++) {
  board.push([
    [0, i * (drawable_size / boxes_height)],
    [drawable_size, i * (drawable_size / boxes_height)]
  ]);
}

// center
bt.translate(board, [width / 2, height / 2], bt.bounds(board).cc)

drawLines(board);

// fill the board with X and O
function generate_x(x, y) {
  return [
    [
      [x * drawable_size / boxes_width, y * drawable_size / boxes_width],
      [x * drawable_size / boxes_width - drawable_size / boxes_width, y * drawable_size / boxes_width - drawable_size / boxes_width]
    ],
    [
      [x * drawable_size / boxes_width, y * drawable_size / boxes_width - drawable_size / boxes_width],
      [x * drawable_size / boxes_width - drawable_size / boxes_width, y * drawable_size / boxes_width]
    ]
  ];
}

function generate_o(x, y) {
  const p1 = [x * drawable_size / boxes_width, y * drawable_size / boxes_width];
  const p2 = [x * drawable_size / boxes_width, y * drawable_size / boxes_width - drawable_size / boxes_width];
  const p3 = [x * drawable_size / boxes_width - drawable_size / boxes_width, y * drawable_size / boxes_width - drawable_size / boxes_width];
  const p4 = [x * drawable_size / boxes_width - drawable_size / boxes_width, y * drawable_size / boxes_width];

  // center and radius of the circle
  const centerX = (p1[0] + p3[0]) / 2;
  const centerY = (p1[1] + p3[1]) / 2;
  const radius = Math.min(Math.abs(p1[0] - p3[0]), Math.abs(p1[1] - p3[1])) / 2;

  const controlPoints = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = 2 * Math.PI * i / numPoints;
    const pointX = centerX + radius * Math.cos(angle);
    const pointY = centerY + radius * Math.sin(angle);
    controlPoints.push([pointX, pointY]);
  }

  controlPoints.push(controlPoints[0])

  return [bt.catmullRom(controlPoints, curvePoints)];
}

let board_array = []; // to allow winning and not allow drawing two symbols on the same field
// 0 - no symbol | 1 - x | 2 - o
for (let i = 0; i < boxes_height; i++) {
  let temp_board_arr = [];
  for (let j = 0; j < boxes_width; j++) {
    temp_board_arr.push(0);
  }
  board_array.push(temp_board_arr);
}

function someoneWon(board_array) {
  // Check rows
  for (let i = 0; i < boxes_height; i++) {
    if (board_array[i][0] !== 0 && board_array[i].every(val => val === board_array[i][0])) {
      return {
        won: true,
        type: board_array[i][0],
        line: [
          [0, i],
          [boxes_width - 1, i]
        ]
      };
    }
  }

  // Check columns
  for (let i = 0; i < boxes_width; i++) {
    let column = [];
    for (let j = 0; j < boxes_height; j++) {
      column.push(board_array[j][i]);
    }
    if (column[0] !== 0 && column.every(val => val === column[0])) {
      return {
        won: true,
        type: column[0],
        line: [
          [i, 0],
          [i, boxes_height - 1]
        ]
      };
    }
  }

  // Check diagonals
  let diag1 = [],
    diag2 = [];
  for (let i = 0; i < boxes_width; i++) {
    diag1.push(board_array[i][i]);
    diag2.push(board_array[i][boxes_width - i - 1]);
  }
  if (diag1[0] !== 0 && diag1.every(val => val === diag1[0])) {
    return {
      won: true,
      type: diag1[0],
      line: [
        [0, 0],
        [boxes_width - 1, boxes_height - 1]
      ]
    };
  }
  if (diag2[0] !== 0 && diag2.every(val => val === diag2[0])) {
    return {
      won: true,
      type: diag2[0],
      line: [
        [0, boxes_height - 1],
        [boxes_width - 1, 0]
      ]
    };
  }

  return { won: false };
}

function generate_win_line(line) {
  const [start, end] = line;
  const startX = start[0] * (drawable_size / boxes_width) + (drawable_size / boxes_width) / 2;
  const startY = start[1] * (drawable_size / boxes_height) + (drawable_size / boxes_height) / 2;
  const endX = end[0] * (drawable_size / boxes_width) + (drawable_size / boxes_width) / 2;
  const endY = end[1] * (drawable_size / boxes_height) + (drawable_size / boxes_height) / 2;
  return [
    [
      [startX, startY],
      [endX, endY]
    ]
  ];
}

if (fill) {
  let x, y;
  for (let i = 0; i < boxes_width * boxes_height; i++) {
    x = bt.randIntInRange(1, boxes_width);
    y = bt.randIntInRange(1, boxes_height);

    while (board_array[y - 1][x - 1] != 0) {
      x = bt.randIntInRange(1, boxes_width);
      y = bt.randIntInRange(1, boxes_height);
    }

    if (i % 2 == 0) {
      board_array[y - 1][x - 1] = 1
      drawLines(generate_x(x, y))
    } else {
      board_array[y - 1][x - 1] = 2
      drawLines(generate_o(x, y))
    }

    console.log("wdwjh3", x, y, board_array) // the weird string at the beginning to be able to find it in the console

    const winCheck = someoneWon(board_array);
    if (winCheck.won) {
      drawLines(generate_win_line(winCheck.line));
      break;
    }
  }
}
