/*
@title: Honeycomb Fractal
@author: Mohan Seshasai
@snapshot: snapshot2.png
*/
const FractalChoice = 5; // 5 Hexaflake
const detail = 4; // how much detail/loops in the function
const size = 40; // size of fractal

const width = 200;
const height = 200;
setDocDimensions(width, height);
const fractal = [];
const t = new bt.Turtle();

function draw_hexagon(turtle, length) {
  for (let i = 0; i < 6; i++) {
    turtle.forward(length);
    turtle.left(60);
  }
}

function draw_hexaflake(turtle, sample, length) {
  if (sample == 0) {
    draw_hexagon(turtle, length);
  } else {
    for (let i = 0; i < 6; i++) {
      draw_hexaflake(turtle, sample - 1, length / 3);
      turtle.forward(length);
      turtle.left(60);
    }
    draw_hexaflake(turtle, sample - 1, length / 3);
  }
}

if (FractalChoice == 5) {
  t.up();
  t.forward(size);
  t.left(90);
  t.forward(size * Math.sqrt(3) / 2);
  t.right(150);
  t.down();
  draw_hexaflake(t, detail, size);
}

// add turtle to final lines
bt.join(fractal, t.lines());
// center piece
const cc = bt.bounds(fractal).cc;
bt.translate(fractal, [width / 2, height / 2], cc);
// draw it
drawLines(fractal, { fill: "none", stroke: "black", width: 1 });
