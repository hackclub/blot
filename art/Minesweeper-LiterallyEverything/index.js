/*
@title: Minesweeper
@author: Literally Everything
@snapshot: image3.png
*/

const width = 100;
const height = 100;
setDocDimensions(width, height);

const t = new bt.Turtle();

function drawTile(char, x_pos, y_pos) {
  t.jump([x_pos, y_pos])
  t.down()
  t.setAngle(0)
  for (let i = 0; i < 4; i++) {
    t.forward(10)
    t.right(90)
  }
  switch (char) {
    case "1":
      t.jump([x_pos + 5.875, y_pos - 1.25])
      t.setAngle(270)
      t.forward(7.5)
      t.jump([x_pos + 5.875, y_pos - 1.25])
      t.arc(-80, 2.5)
      break;
    case "2":
      t.jump([x_pos + 2.5, y_pos - 3.75])
      t.setAngle(90)
      t.arc(-180, 2.5)
      t.arc(-44, 1.0)
      t.goTo([x_pos + 2.5, y_pos - 8.75])
      t.setAngle(0)
      t.forward(5)
      break;
    case "3":
      t.jump([x_pos + 2.5, y_pos - 1.25])
      t.forward(5)
      t.goTo([x_pos + 2.50, y_pos - 5])
      t.forward(3.125)
      t.arc(-180, 1.875)
      t.forward(3.125)
      break;
    case "4":
      t.jump([x_pos + 6, y_pos - 1.25])
      t.setAngle(270)
      t.forward(7.5)
      t.jump([x_pos + 6, y_pos - 1.25])
      t.goTo([x_pos + 2.5, y_pos - 5])
      t.setAngle(0)
      t.forward(5)
      break;
    case "5":
      t.jump([x_pos + 7.5, y_pos - 1.25])
      t.setAngle(180)
      t.forward(5)
      t.setAngle(270)
      t.forward(3.75)
      t.setAngle(0)
      t.forward(3.125)
      t.arc(-180, 1.875)
      t.forward(3.125)
      break;
    case "6":
      t.jump([x_pos + 3.25, y_pos - 5.00])
      t.setAngle(45)
      t.arc(-360, 2.5)
      t.goTo([x_pos + 6.0, y_pos - 1.25])
      break;
    case "7":
      t.jump([x_pos + 2.5, y_pos - 1.25])
      t.forward(5)
      t.goTo([x_pos + 2.5, y_pos - 8.75])
      break;
    case "8":
      t.jump([x_pos + 5, y_pos - 5.00])
      t.arc(-360, 1.875)
      t.arc(360, 1.875)
      break;
    case "-1":
      t.jump([x_pos + 5, y_pos - 2.5])
      for (let i = 0; i < 8; i++) {
        t.right(270)
        t.forward(1.5)
        t.right(180)
        t.forward(1.5)
        t.left(90)
        t.arc(-45, 2.5)
      }
      break;
  }
}

function surround(array, ind_1, ind_2, size) {
  let diff = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0]
  ];
  let surr = [];
  let choose = [];
  if (ind_1 == 0 && ind_2 == 0) {
    choose = [4, 5, 6];
  } else if (ind_1 == size - 1 && ind_2 == 0) {
    choose = [6, 7, 8];
  } else if (ind_1 == size - 1 && ind_2 == size - 1) {
    choose = [1, 2, 8];
  } else if (ind_1 == 0 && ind_2 == size - 1) {
    choose = [2, 3, 4];
  } else if (ind_1 == 0) {
    choose = [2, 3, 4, 5, 6];
  } else if (ind_1 == size - 1) {
    choose = [1, 2, 6, 7, 8];
  } else if (ind_2 == size - 1) {
    choose = [1, 2, 3, 4, 8];
  } else if (ind_2 == 0) {
    choose = [4, 5, 6, 7, 8];
  } else {
    choose = [1, 2, 3, 4, 5, 6, 7, 8];
  }
  for (let c = 0; c < choose.length; c++) {
    surr[c] = array[ind_1 + diff[choose[c] - 1][0]][ind_2 + diff[choose[c] - 1][1]]
  }
  let mines = 0;
  for (let c = 0; c < surr.length; c++) {
    if (surr[c] == "-1") {
      mines++;
    }
  }
  return mines;
}

let map = [];
let brd_size = 10;
let mine_nums = 30
let pos = []
for (let i = 0; i < brd_size; i++) {
  map[i] = ["", "", "", "", "", "", "", "", "", ""];
}
for (let i = 0; i < mine_nums; i++) {
  pos = [bt.randIntInRange(0, brd_size - 1), bt.randIntInRange(0, brd_size - 1)]
  map[pos[0]][pos[1]] = "-1";
}
for (let i = 0; i < brd_size; i++) {
  for (let j = 0; j < brd_size; j++) {
    if (map[i][j] == "-1") {
      drawTile("-1", j * 10, (i + 1) * 10)
      continue;
    }
    drawTile(surround(map, i, j, brd_size).toString(), j * 10, (i + 1) * 10)
  }
}

drawLines(t.lines())