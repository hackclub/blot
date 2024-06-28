/*
@title: Classical Labyrinths
@author: Isaac Wu
@snapshot: seven_circuit.png
*/

// INPUTS
// Passage Width
const width = 1;
const size = 3;
// Number of "loops"
const circuit = 4*size+3;

const lines = [];

// For canvas sizing
const w = (circuit*2+1)*width+2;
const h = w-1;
setDocDimensions(w, h);
// Center
const rx = w / 2;
const ry = (h / 2) - 0.5;

const wedges = (circuit-3)/4+1;
const seed = new bt.Turtle();
for(let i = 0; i < wedges; i++) {
  // [Quadrant 1, Q2, Q3, Q4]
  for(let dir = 0; dir < 4; dir++) {
    seed.jump([rx+width*(
      dir % 3 > 0 ? i-(wedges-1.5) : wedges-.5-i
    ), ry-(
      dir > 1 ? 2*wedges*width : 0
    )]);
    seed.setAngle(dir > 1 ? 90 : -90);
    seed.forward((i+1)*width);
    seed.setAngle(dir % 3 < 1 ? 0 : 180);
    seed.forward((i+1)*width);
  }
}
bt.join(lines, seed.lines());

const top = new bt.Turtle();
for(let i = 0; i < circuit+1; i++) {
  top.jump([
    rx+width*(i+.5),
    ry
  ]);
  top.setAngle(90);
  top.arc(180, (i+.5)*width);
}
bt.join(lines, top.lines());

const left = new bt.Turtle();
for(let i = 0; i < 3*wedges+1; i++) {
  left.jump([
    rx-(wedges-.5)*width-i*width,
    ry
  ]);
  left.setAngle(-90);
  left.arc(90, i*width);
}
// Bottom left
for(let i = 0; i < wedges; i++) {
  left.jump([
    rx-(wedges-.5)*width,
    ry-width*(i+(wedges*2+1))
  ]);
  left.setAngle(180);
  left.arc(90, -(i+1)*width);
}
bt.join(lines, left.lines());

const right = new bt.Turtle();
for(let i = 0; i < 3*wedges-1; i++) {
  right.jump([
    rx+(wedges+.5)*width,
    ry-width*(i+1)
  ]);
  right.setAngle(180);
  right.arc(90, -(i+1)*width);
}
// Bottom right
for(let i = 0; i < wedges-1; i++) {
  right.jump([
    rx-width*(i-(wedges-.5)),
    ry-width*(wedges*2)
  ]);
  right.setAngle(270);
  right.arc(90, (i+1)*width);
}
bt.join(lines, right.lines());

drawLines(lines);