/*
@title: Warp Speed
@author: asherlief
@snapshot: center.png
*/

const centerX = 62.5;
const centerY = 62.5;

function draw(x, y) {
  let x2 = x * 2 - centerX
  let y2 = y * 2 - centerY
  if (x2 > 125) {
    x2 = 125
    y2 = (125 - x) * ((y - centerY) / (x - centerX)) + y
  }
  if (x2 < 0) {
    x2 = 0
    y2 = (0 - x) * ((y - centerY) / (x - centerX)) + y
  }
  if (y2 > 125) {
    y2 = 125
    x2 = (125 - y) * ((x - centerX) / (y - centerY)) + x
  }
  if (y2 < 0) {
    y2 = 0
    x2 = (0 - y) * ((x - centerX) / (y - centerY)) + x
  }
  drawLines([
    [
      [x, y],
      [x2, y2]
    ]
  ])
}
const width = 125;
const height = 125;
let i = 0
setDocDimensions(width, height);


while (i < 1500) {
  let x = bt.randInRange(0, 125)
  let y = bt.randInRange(0, 125)
  draw(x, y)
  i += 1
}
