/*
@title: Hot Hot Racin Car
@author: Noah Carmichael
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle()
const size = 100
//spolier
const angle = bt.randInRange(10, 80);
//roof
const roof = bt.randIntInRange(0, 2); 
//stripes
const rando = bt.randIntInRange(-200, 200)
//rims
const beans = bt.randIntInRange(3, 7); 



t.jump([20,60])
t.forward(10)
// t.left(40)
// t.forward(20)
// t.right(40)
// t.forward(20)
// t.right(40)
// t.forward(20)
// t.left(40)
t.jump([80,60])
t.forward(20)
t.right(90)
t.forward(15)
t.right(90)
t.forward(5)
// wheel arches
t.right(90)
t.forward(1)
for (let i = 0; i < 54; i++) {
  t.left(10)
  t.forward(1)
}
t.right(90)
t.forward(45)
t.right(90)
t.forward(1)
for (let i = 0; i < 54; i++) {
  t.left(10)
  t.forward(1)
}
t.right(90)
t.forward(7)
t.right(90)
t.goTo([20,60])

//spoiler
t.jump([23,60])
t.left(angle)
t.forward(10)
t.right(angle+90)
t.forward(5)
t.right(180)
t.up()
t.forward(5)
t.down()
t.forward(2)
t.right(90)
t.forward(2)
t.right(90)
t.forward(7)
t.right(90)
t.forward(2)

t.right(180)
t.jump([25,60])
t.left(angle)
t.forward(10)

//windows
t.jump([56,60])
t.setAngle(0)
t.forward(15)
t.right(-148)
t.forward(18)
t.goTo([56,60])

t.jump([35,60])
t.setAngle(0)
t.forward(16)
t.left(90)
t.forward(9)
t.left(90)
t.forward(8)
t.goTo([35,60])


function getTopEdge(roof) {
  if (roof == 1) {
    return [bt.nurbs([
      [0, 0],
      [8, 15],
      [28, 14],
      [40, 7],
      [50, 0]
    ])];
  } else {
    return [[
      [0, 0],
      [8, 15],
      [28, 14],
      [40, 7],
      [50, 0]
    ]];
  }
}

const topEdge = getTopEdge(roof);

bt.translate(topEdge, [30,60])

const shaft = bt.resample([[[100, 54],
      [19.2, 56],
      [20, 54],
      [100, 53]
      ]], 2)
// Vanes are a Catmull-Rom curve
const vanes = [bt.catmullRom([[0, 0], [-6, 16], [-30, 94], [0, 107], [8, 88], [22, 75], [3, 0]])]

// Barbs are Catmull-Rom curves originating at the shaft
const barbs = []
for (let i = 0; i < shaft[0].length; i++) {
  const parity = i > shaft[0].length/2 ? -1 : -0.1
  const [x, y] = shaft[0][i]
  barbs.push(bt.catmullRom(
    [[x, y], [x + parity * 2, y - 2], [x + parity * rando, y]]))
}

bt.cut(barbs, shaft)
const stripe = [...shaft, ...barbs]
drawLines(stripe)

const t2 = new bt.Turtle()
t2.jump([88,107])
for (let i = 0; i < beans+1; i++) {
  t2.left(180-((beans - 2) * 180)/(beans))
  t2.forward(8-beans)
}

t2.jump([31,100])
t2.up()
t2.forward(7)
t2.down()
t2.setAngle(0)
for (let i = 0; i < beans+1; i++) {
  t2.left(180-((beans - 2) * 180)/(beans))
  t2.forward(8-beans)
}
const path = t2.path
bt.translate(path, [61, 42], bt.bounds(path).cc)
drawLines(path);



drawLines(topEdge);
drawLines(t.lines())