/*
@title: Sudoku Generator
@author: Ivan S.
@snapshot: 0.png
*/

const width = 120
const height = 120
const difficulty = 40

setDocDimensions(width, height)

const shapes = [];

function drawNumber(number) {
  const t = new bt.Turtle();

  if (number == 1) {
    t.right(90);
    t.forward(10);
  } else if (number == 2) {
    t.forward(5);
    t.left(90);
    t.forward(5);
    t.left(90);
    t.forward(5);
    t.right(90);
    t.forward(5);
    t.right(90);
    t.forward(5);
  } else if (number == 3) {
    t.forward(5);
    t.left(90);
    t.forward(5);
    t.left(90);
    t.forward(5);
    t.left(180);
    t.forward(5);
    t.left(90);
    t.forward(5);
    t.left(90);
    t.forward(5);
  } else if (number == 4) {
    t.left(90)
    t.forward(5)
    t.right(90)
    t.forward(5)
    t.right(90)
    t.forward(5)
    t.right(180)
    t.forward(10)
  } else if (number == 5) {
    t.forward(5)
    t.right(90)
    t.forward(5)
    t.right(90)
    t.forward(5)
    t.left(90)
    t.forward(5)
    t.left(90)
    t.forward(5)
  } else if (number == 6) {
    t.forward(5)
    t.right(180)
    t.forward(5)
    t.right(90)
    t.forward(10)
    t.right(90)
    t.forward(5)
    t.right(90)
    t.forward(5)
    t.right(90)
    t.forward(5)
  } else if (number == 7) {
    t.forward(5)
    t.left(90)
    t.forward(10)
  } else if (number == 8) {
    t.forward(5)
    t.left(90)
    t.forward(10)
    t.left(90)
    t.forward(5)
    t.left(90)
    t.forward(10)
    t.right(180)
    t.forward(5)
    t.right(90)
    t.forward(5)
  } else if (number == 9) {
    t.left(90)
    t.forward(5)
    t.right(90)
    t.forward(5)
    t.left(90)
    t.forward(5)
    t.left(90)
    t.forward(5)
    t.left(90)
    t.up()
    t.forward(10)
    t.down()
    t.left(90)
    t.forward(5)
    t.left(90)
    t.forward(5)
  }

  return t
}

function createSquare() {
  const t = new bt.Turtle()

  for (let i = 0; i < 2; i++) {
    t.forward(width / 9)
    t.right(90)
    t.forward(height / 9)
    t.right(90)
  }

  return t
}

function createBigSquare() {
  const t = new bt.Turtle()

  for (let i = 0; i < 2; i++) {
    t.forward(width / 3)
    t.right(90)
    t.forward(height / 3)
    t.right(90)
  }

  return t
}

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const t = createSquare()
    bt.translate(t.path, [0, 0], bt.bounds(t.path).lb)
    bt.translate(t.path, [width / 9 * i, height / 9 * j])
    bt.join(shapes, t.lines());
  }
}
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const t = createBigSquare()
    bt.translate(t.path, [0.3, 0.3], bt.bounds(t.path).lb)
    bt.translate(t.path, [width / 3 * i, height / 3 * j])
    bt.join(shapes, t.lines());
  }
}

class SudokuGenerator {
  constructor() {
    this.rows = [];
    this.cols = [];
    this.nums = [];
    this.board = [];

    for (let i = 0; i < 9; i++) {
      this.rows.push([]);
      this.cols.push([]);
      this.nums.push(i + 1);
      this.board.push([]);
    }

    this.shuffle(this.nums);

    for (let g = 0; g < 3; g++) {
      const rowShuffle = this.shuffle([0, 1, 2]);
      rowShuffle.forEach((r) => {
        for (let c = 0; c < 3; c++) {
          this.rows.push(g * 3 + r);
          this.cols[g * 3 + c].push(g * 3 + r);
        }
      });
    }

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const num = this.nums[(3 * r + Math.floor(r / 3) + c) % 9];
        this.board[r].push(num);
      }
    }
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(bt.rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  createChallenge(d) {
    while (d != 0) {
      let mi = bt.randIntInRange(0, 9)
      let bi = bt.randIntInRange(0, 9)

      try {
        if (this.board[mi][bi] != 0) {
          this.board[mi][bi] = 0
          d -= 1
        }
      } catch (e) {}
    }
  }
}


let sudoku = new SudokuGenerator();
sudoku.createChallenge(difficulty)

for (let rn = 0; rn < 9; rn++) {
  let row = sudoku.board[rn]
  for (let on = 0; on < 9; on++) {
    if (row[on] == 0) { continue }

    const obj = drawNumber(row[on])
    bt.translate(obj.path, [0, 0], bt.bounds(obj.path).lb)
    bt.translate(obj.path, [width / 9 * on + 2.5, height / 9 * rn + 2.5])
    bt.join(shapes, obj.path)
  }
}

bt.scale(shapes, [0.90, -0.90])

drawLines(shapes)