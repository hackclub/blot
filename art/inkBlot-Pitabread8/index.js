/*
@title: inkBlot
@author: Pitabread8
@snapshot: the name of the snapshot file you want in the gallery
*/

const width = 125
const height = 125

setDocDimensions(width, height)

const shape = (n) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) t.forward(1).left(360/n)
  return t.lines()
}

const shaft = bt.scale(shape(3), [2, 424])
bt.rotate(shaft, 135)
bt.trim(shaft, 0.62, 0.75)
bt.rotate(shaft, -135)

const vanes = bt.scale(shape(11), [8, 33])
bt.rotate(vanes, -135)
bt.trim(vanes, 0.413, 0.67)
bt.rotate(vanes, 135)

bt.translate(vanes, [-67, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1] + -7])

const feather = [...shaft, ...vanes]
bt.translate(feather, [width / 2 + 30, height / 2 - 10], bt.bounds(feather).cc)
bt.resample(feather, 4)

bt.iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])

bt.rotate(feather, 155)
bt.translate(feather, [-16, 31])
drawLines(feather, { stroke: "brown", width: 3 })

const t = new bt.Turtle();
t.up().goTo([100, bt.randInRange(38, 56)]).down()
for (let i = 0; i < 362; i++) t.forward(bt.randInRange(0.1, 0.35)).right(1)
t.up().goTo([bt.randInRange(80, 102), bt.randInRange(25, 44)]).down()
for (let i = 0; i < 359; i++) t.forward(0.2).right(1)
t.up().goTo([81, 28]).down()
for (let i = 0; i < 359; i++) t.forward(bt.randInRange(0.075, 0.2)).right(1)
t.up().goTo([67, 24]).down()
for (let i = 0; i < 359; i++) t.forward(bt.randInRange(0.1, 0.2)).right(1)
t.up().goTo([bt.randInRange(47, 61), 29]).down()
for (let i = 0; i < 359; i++) t.forward(0.2).right(1)
t.up().goTo([37, 35]).down()
for (let i = 0; i < 342; i++) t.forward(bt.randInRange(0.2, 0.3)).right(1)
t.up().goTo([21, bt.randInRange(18, 63)]).down()
for (let i = 0; i < 359; i++) t.forward(bt.randInRange(0.1, 0.2)).right(1)
t.up().goTo([17, bt.randInRange(39, 57)]).down()
for (let i = 0; i < 359; i++) t.forward(bt.randInRange(0.1, 0.5)).right(1)
drawLines(t.lines(), { fill: "black", width: 50 })

const a = 30
const b = 55
const c = 95
const d = (a + c) / 2
const e = 80
const f = 82

drawLines([
  [
    [a, b + 20],
    [a, a - 10],
    [c, a - 10],
    [c, b + 20]
  ],
  bt.catmullRom([
    [a, a - 10],
    [d, a - 13],
    [c, a - 10]
  ]),
  bt.catmullRom([
    [a, b + 20],
    [(a + (d - 8)) / 2, e],
    [d - 8, f]
  ]),
  bt.catmullRom([
    [d + 8, f],
    [(c + (d + 8)) / 2, e],
    [c, b + 20]
  ]),
  [
    [d - 8, f],
    [d - 8, f + 4]
  ],
  [
    [d + 8, f],
    [d + 8, f + 4]
  ],
  bt.catmullRom([
    [d - 9, f + 8],
    [d - 8, f + 4],
    [d, 85],
    [d + 8, f + 4],
    [d + 9, f + 8]
  ]),
  bt.catmullRom([
    [d - 9, f + 8],
    [d - 8, f + 10],
    [d, f + 11],
    [d + 8, f + 10],
    [d + 9, f + 8]
  ]),
], { width: 5 });
