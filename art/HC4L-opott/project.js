// hack club 4 life

/*
@title: HC4Life
@author: opott
@snapshot: hc4l1.png
*/

// settings
// you can change the variables!
const size = 1

const randshapemin = 1
const randshapemax = 10

// set width and height of the document
const width = 85 * size;
const height = 95 * size;
setDocDimensions(width, height);

// initialise the turtle
const t = new bt.Turtle()

// generate random shapes on the canvas 
var sides = bt.randIntInRange(randshapemin, randshapemax);
t.jump([75 * size, 80 * size])
for (let i = 0; i < sides+1; i++) {
  t.left(180-((sides - 2) * 180)/(sides))
  t.forward((10-sides) * size)
}

var sides = bt.randIntInRange(randshapemin, randshapemax);
t.jump([15 * size, 80 * size])
for (let i = 0; i < sides+1; i++) {
  t.left(180-((sides - 2) * 180)/(sides))
  t.forward((10-sides) * size)
}

var sides = bt.randIntInRange(randshapemin, randshapemax);
t.jump([75 * size, 10 * size])
for (let i = 0; i < sides+1; i++) {
  t.left(180-((sides - 2) * 180)/(sides))
  t.forward((10-sides) * size)
}

var sides = bt.randIntInRange(randshapemin, randshapemax);
t.jump([15 * size, 10 * size])
for (let i = 0; i < sides+1; i++) {
  t.left(180-((sides - 2) * 180)/(sides))
  t.forward((10-sides) * size)
}

var sides = bt.randIntInRange(randshapemin, randshapemax);
t.jump([63 * size, 45 * size])
for (let i = 0; i < sides+1; i++) {
  t.left(180-((sides - 2) * 180)/(sides))
  t.forward((10-sides) * size)
}

var sides = bt.randIntInRange(randshapemin, randshapemax);
t.jump([24 * size, 41 * size])
for (let i = 0; i < sides+1; i++) {
  t.left(180-((sides - 2) * 180)/(sides))
  t.forward((10-sides) * size)
}



// h
t.setAngle(0)
t.jump([25 * size, 90 * size])
t.right(90)
t.forward(25 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(25 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(5 * size)

// c
t.setAngle(0)
t.jump([45 * size, 90 * size])
t.right(90)
t.forward(25 * size)
t.left(90)
t.forward(15 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(15 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(15 * size)

// 4
t.jump([30 * size, 60 * size])
t.setAngle(0)
t.right(90)
t.forward(20 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(5 * size)
t.right(90)
t.forward(5 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(5 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(15 * size)
t.left(90)
t.forward(5 * size)

// l
t.jump([5 * size, 30 * size])
t.setAngle(0)
t.forward(5 * size)
t.right(90)
t.forward(20 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(15 * size)
t.right(90)
t.forward(25 * size)

// i
t.jump([25 * size, 30 * size])
t.setAngle(0)
t.forward(15 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(5 * size)
t.left(90)
t.forward(15 * size)
t.left(90)
t.forward(5 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(15 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(5 * size)
t.left(90)
t.forward(15 * size)
t.left(90)
t.forward(5 * size)
t.right(90)
t.forward(5 * size)

// f
t.jump([45 * size, 30 * size])
t.setAngle(0)
t.forward(15 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(25 * size)

// e
t.jump([65 * size, 30 * size])
t.setAngle(0)
t.forward(15 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(10 * size)
t.left(90)
t.forward(5 * size)
t.left(90)
t.forward(10 * size)
t.right(90)
t.forward(5 * size)
t.right(90)
t.forward(15 * size)
t.right(90)
t.forward(25 * size)

// draw the lines from the path of the turtle
drawLines(t.lines());