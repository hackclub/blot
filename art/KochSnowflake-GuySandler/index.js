/*
@title: Fractal Collection
@author: Guy Sandler
@snapshot: snapshot_1.png
*/

const FractalChoise = 0 // 0 Koch Snowflake | 1 Sierpinski Pentagon | 2 Sierpinski Triangle | 3 Tree
const detail = 7 // how much detail/loops in the function
const size = 85 // size of fractal

const width = 125;
const height = 125;
setDocDimensions(width, height);
const fractal = [];
const t = new bt.Turtle();

function snowflake(turtle, sample, length) { // recursive function because fractals repeat themself
  if (sample == 0) {
    turtle.forward(length) // ends recursive function
  } else {
    for (let angle of [60, -120, 60, 0]) {
      snowflake(turtle, sample - 1, length / 3)
      turtle.left(angle)
    }
  }
}
// pentagon
function draw_pentagon(turtle, length) {
  for (let i = 0; i < 5; i++) {
    t.forward(length)
    t.left(72)
  }
}

function draw_sierpinski_pentagon(turtle, sample, length) {
  if (sample == 0) {
    draw_pentagon(t, length)
  } else {
    for (let i = 0; i < 5; i++) {
      draw_sierpinski_pentagon(turtle, sample - 1, length / 2.6)
      t.up()
      turtle.forward(length)
      turtle.left(72)
      t.down()
    }
  }
}
// triangle
function draw_triangle(turtle, length) {
  for (let i = 0; i < 3; i++) {
    t.forward(length)
    t.left(120)
  }
}

function draw_sierpinski_triangle(turtle, sample, length) {
  if (sample == 0) {
    draw_triangle(t, length)
  } else {
    for (let i = 0; i < 3; i++) {
      draw_sierpinski_triangle(turtle, sample - 1, length / 2)
      t.up()
      turtle.forward(length)
      turtle.left(120)
      t.down()
    }
  }
}
// tree
function tree(turtle, sample, length) {
  if (sample > 0) {
    turtle.forward(length)
    turtle.right(20)
    tree(turtle, sample - 1, length / 1.5)
    turtle.left(40)
    tree(turtle, sample - 1, length / 1.5)
    turtle.right(20)
    turtle.forward(-length)
  }
}

if (FractalChoise == 0) {
  for (let i = 0; i < 3; i++) {
    snowflake(t, detail, size)
    t.right(120)
  }
}
if (FractalChoise == 1) {
  draw_sierpinski_pentagon(t, detail, size)
}
if (FractalChoise == 2) {
  draw_sierpinski_triangle(t, detail, size)
}
if (FractalChoise == 3) {
  // t.right(180)
  t.left(90)
  tree(t, detail, size)
}
// add turtle to final lines
bt.join(fractal, t.lines());
// center piece
const cc = bt.bounds(fractal).cc;
bt.translate(fractal, [width / 2, height / 2], cc);
// draw it
drawLines(fractal, { fill: "none", stroke: "black", width: 1 });
