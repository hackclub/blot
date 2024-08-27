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

// welcome to blot!




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