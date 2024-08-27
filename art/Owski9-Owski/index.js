/*
@title: Owski9
@author: Owski
@snapshot: 1.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

drawLines([
    [[100, 100], [125, 125]]
])
drawLines([
    [[20, 0], [24, 15]]
])
drawLines([
    [[20, 0], [19, 15]]
])
drawLines([
    [[27, 0], [24, 15]]
])
drawLines([
    [[27, 0], [29, 15]]
])
drawLines([
    [[33, 7.5], [33, 15]]
])
drawLines([
    [[33, 15], [39, 15]]
])
drawLines([
    [[33, 7.5], [39, 7.5]]
])
drawLines([
    [[39, 7.5], [39, 0]]
])
drawLines([
    [[33, 0.5], [39, 0.5]]
])
drawLines([
    [[33, 0.5], [39, 0.5]]
])
drawLines([
    [[43, 0], [43, 15]]
])
drawLines([
    [[43, 7.5], [47, 15]]
])
drawLines([
    [[43, 7.5], [47, 15]]
])

drawLines([
    [[43, 7.5], [47, 0]]
])
drawLines([
    [[76, 95], [95, 76]]
])
drawLines([
    [[53, 0], [53, 15]]
])
drawLines([
    [[76, 95], [53, 53]]
])
drawLines([
    [[95, 95], [53, 53]]
])
drawLines([
    [[53, 53], [95, 76]]
])
const t = new bt.Turtle()
const size = 100

t.forward(size)
t.left(90)
t.forward(size)
t.left(90)
t.forward(size)

drawLines(t.lines())
const o = new bt.Turtle()
const size2 = 108.33

o.forward(size2)
o.left(90)
o.forward(size2)
o.left(90)
o.forward(size2)
drawLines(o.lines())

const w = new bt.Turtle()
const size1 = 116.66

w.forward(size1)
w.left(90)
w.forward(size1)
w.left(90)
w.forward(size1)
drawLines(w.lines())

const p = new bt.Turtle()
const size3 = 15

p.forward(size3)
p.left(90)
p.forward(size3)
p.left(90)

p.forward(size3)
drawLines(p.lines())


drawLines([
    [[30, 40], [40, 30]]
])
drawLines([
    [[30, 40], [40, 50]]
])
drawLines([
    [[40, 50], [50, 40]]
])
drawLines([
    [[40, 30], [50, 40]]
])

const randx = bt.randIntInRange(0, 10)
//I thought the changing y-values looked nauseous when you run it continuously
const randy = bt.randIntInRange(32, 32)

const birdLines = []
const birdleft = [
  bt.nurbs([
    [10,0],
    [10,10],
    [10,10]
  ])
]
const birdright = [
  bt.nurbs([
    [10,0],
    [10,5],
    [15,0]
  ])
]
const birdleft1 = [
  bt.nurbs([
    [18,0],
    [18,9],
    [18,9]
  ])
]
const birdright1 = [
  bt.nurbs([
    [0,0],
    [25,-6],
    [27,0]
  ])
]

const birdleft2 = [
  bt.nurbs([
    [21,10],
    [24,14],
    [27,10]
  ])
]
const birdright2 = [
  bt.nurbs([
    [0,10],
    [3,14],
    [6,10]
  ])
]

bt.join(birdLines, birdleft, birdright, birdleft1, birdright1, birdleft2, birdright2)
const randinsky = bt.randIntInRange(55,78)
const randinskx = bt.randIntInRange(5,35)
bt.translate(birdLines, [randinskx,randinsky], [0,0])
bt.copy(birdLines)

  


// create a polyline
const polyline = [
  [90, 0],
  [180, 90],
  [90, 180],
  [0, 90],
  [90, 0]
];

// add the polyline to the final lines
finalLines.push(polyline);
// transform lines using the toolkit
bt.rotate(finalLines, 90);
bt.scale(finalLines, 0.1);

// draw it
drawLines(finalLines);
drawLines(birdLines);
