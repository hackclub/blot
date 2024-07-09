/*
@title: Partial Hats Scenery Mosaic
@author: Arnav Kumar
@snapshot: 0.png
*/

// Partial Hats Scenery Mosaic insipred from The Einstein problem
// https://en.wikipedia.org/wiki/Einstein_problem
// reference paper: https://arxiv.org/abs/2303.10798

const width = 125;
const height = 125;
const side = 5;
const colors = ["FFF5E1", "#0C1844", "#C80036", "#FF6969"];
const backgroundColor = "#fffbeb";

setDocDimensions(width, height);

let { sqrt } = Math;

function getRandomColor() {
  return colors[bt.randIntInRange(0, colors.length - 1)];
}

// hat
function hat(x, y, r = 1) {
  const t = new bt.Turtle();
  t
    .jump([x, y + side * 2 * r])
    .setAngle(0 * r)
    .forward(side)
    .setAngle(60 * r)
    .forward(side)
    .setAngle(-30 * r)
    .forward(side * 2)
    .setAngle(-90 * r)
    .forward(side * 2)
    .setAngle(0 * r)
    .forward(side)
    .setAngle(-60 * r)
    .forward(side)
    .setAngle(-150 * r)
    .forward(side * 2)
    .setAngle(150 * r)
    .forward(side * 2)
    .setAngle(-120 * r)
    .forward(side)
    .setAngle(180 * r)
    .forward(side * 2)
    .setAngle(120 * r)
    .forward(side)
    .setAngle(30 * r)
    .forward(side * 2)
    .setAngle(90 * r)
    .forward(side * 2)
  return t.lines()
}
// [x, y, deg, r?]
const hats = [
  [],
  [5.5, 3.5, 60],
  [-10.8, 9.6, 60],
  [54.4, -2.6, 60],
  [12, 14, 180],
  [21.8, 1.8, -60, -1],
  [13.2, 32.6, 0, -1],
  [-1.4, 24.2, 120],
  [29.6, 27.2, 0],
  [30.2, 13, 120],
  [38, 3.5, 60],
  [60.8, 7.8, 180],
  [47.6, 17.8, 120],
  [15.2, 40.2, 120],
  [40.3, 35.8, 60],
  [70.8, -4.2, -60, -1],
  [79.1, 7, 120],
  [87.1, -2.5, 60],
  [32.4, 45.2, 120],
  [-3.0, 41.2, 180],
  [14.4, 54.4, 0],
  [-1.8, 60, 0, -1],
  [103.4, -4.2, -60, -1],
  [62.2, 26.4, 0, -1],
  [78.4, 21.1, 0],
  [-3.2, 71.2, 0, -1],
  [-18.6, 19.2, 120],
  [-14, 32.8, -120],
  [-16.1, 51.3, 120],
  [-21.3, 70.2, 60, -1],
  [25.4, -10.2, -60],
  [43.6, -11.0, 0]
];

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

// hats
for (let h of hats) {
  if (h.length == 0) {
    drawLines(hat(0, 0), {
      fill: getRandomColor(),
      stroke: "#fff",
      width: 1
    });
  } else {
    drawLines(bt.rotate(hat(side + h[0], (side + h[1]) * sqrt(3), h[3] || 1), h[2]), {
      fill: getRandomColor(),
      stroke: "#fff",
      width: 1
    })
  }
}

function A(size = 15) {
  const t = new bt.Turtle();
  drawLines(t
    .jump([width - 36 + size, height - 36])
    .arc(360, size)
    .lines(), {
      fill: "#FF5252",
      width: 0,
      stroke: "#ffffff00"
    });
}
A();
