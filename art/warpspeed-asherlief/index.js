/*
@title: Warp Speed
@author: asherlief
@snapshot: center.png
*/

const centerX = 62.50;
const centerY = 62.5;
const t = new bt.Turtle()
t.up
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
  if (y2 > 82.55) {
    y2 = 82.5
    x2 = (82.5 - y) * ((x - centerX) / (y - centerY)) + x
  }
  if (y2 < 19) {
    y2 = 19
    x2 = (19 - y) * ((x - centerX) / (y - centerY)) + x
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
  let y = bt.randInRange(19, 82.5)
  draw(x, y)
  i += 1
}
t.down
t.setAngle(90)
t.jump([1,20])
t.arc(-180,61.5)

t.setAngle(90)
t.jump([12.5,20])
t.arc(-180,50)

t.setAngle(90)
t.jump([25,20])
t.arc(-180,37.5)

t.setAngle(90)
t.jump([37,20])
t.arc(-180,25)

t.jump([44,38])
t.setAngle(135)
t.forward(35)

t.jump([62.5,45])
t.setAngle(90)
t.forward(36)

t.jump([81,38])
t.setAngle(45)
t.forward(35)

drawLines(bt.offset(t.lines(),1),["fill"])
