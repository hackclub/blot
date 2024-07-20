/*
@title: ShapeShifter
@author: Rushil Chopra
@snapshot: 0.png
*/

const width = 125;
const height = 125;
const side = 8;
const colors = ["#FFC107", "#8BC34A", "#4CAF50", "#03A9F4", "#9C27B0"];
const backgroundColor = "#FFFFFF";

setDocDimensions(width, height);

let { sqrt, PI } = Math;

function getRandomColor() {
  return colors[bt.randIntInRange(0, colors.length - 1)];
}

// square
function square(x, y, r = 1) {
  const t = new bt.Turtle();
  t.jump([x, y]);
  for (let i = 0; i < 4; i++) {
    t.forward(side * r);
    t.right(90);
  }
  return t.lines();
}

// triangle
function triangle(x, y, r = 1) {
  const t = new bt.Turtle();
  t.jump([x, y]);
  for (let i = 0; i < 3; i++) {
    t.forward(side * r);
    t.right(120);
  }
  return t.lines();
}

// circle
function circle(x, y, r = 1) {
  const t = new bt.Turtle();
  t.jump([x, y]);
  for (let i = 0; i < 360; i++) {
    t.forward(side * r / 360);
    t.right(1);
  }
  return t.lines();
}

// generate random shapes
const shapes = [];
for (let i = 0; i < 15; i++) {
  let x, y;
  do {
    x = bt.randIntInRange(side, width - side);
    y = bt.randIntInRange(side, height - side);
  } while (shapes.some(([sx, sy]) => Math.abs(x - sx) < side && Math.abs(y - sy) < side));
  const deg = bt.randIntInRange(0, 360);
  const r = bt.randIntInRange(1, 2);
  const shapeType = bt.randIntInRange(0, 2);
  let shape;
  if (shapeType == 0) {
    shape = square;
  } else if (shapeType == 1) {
    shape = triangle;
  } else {
    shape = circle;
  }
  shapes.push([x, y, deg, r, shape]);
}

// background
drawLines([
  [
    [width, height],
    [0, height],
    [width, 0],
    [width, height]
  ]
], {
  fill: backgroundColor
});

// shapes
for (let s of shapes) {
  drawLines(bt.rotate(s[4](s[0], s[1], s[3]), s[2]), {
    fill: getRandomColor(),
    stroke: getRandomColor(),
    width: 2
  });
}