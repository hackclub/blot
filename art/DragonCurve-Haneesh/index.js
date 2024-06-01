/*
@title: Dragon Curve Fractal
@author: Haneesh Pediredla
@snapshot: dragonCurve1.png
*/

const FractalChoice = 4; // 4 Dragon Curve
const detail = 15; // how much detail/loops in the function
const size = 85; // size of fractal

const width = 125;
const height = 125;
setDocDimensions(width, height);
const fractal = [];
const t = new bt.Turtle();

function dragonCurve(turtle, sample, length, angle = 90, sign = 1) {
  if (sample == 0) {
    turtle.forward(length);
  } else {
    dragonCurve(turtle, sample - 1, length, angle, 1);
    turtle.left(sign * angle);
    dragonCurve(turtle, sample - 1, length, angle, -1);
  }
}

if (FractalChoice == 4) {
  t.right(45); // Starting angle to center the Dragon Curve
  dragonCurve(t, detail, size / Math.pow(2, detail / 2));
}

// add turtle to final lines
bt.join(fractal, t.lines());
// center piece
const cc = bt.bounds(fractal).cc;
bt.translate(fractal, [width / 2, height / 2], cc);
// draw it
drawLines(fractal, { fill: "none", stroke: "black", width: 1 });
