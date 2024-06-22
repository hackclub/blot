/*
@title: Spiral Shapes
@author: Max Drapa
@snapshot: art.png
*/

setDocDimensions(125, 125);
const lines = [];
const t = new bt.Turtle();
t.up();
t.goTo([62.5, 62.5]);
t.down();

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

let radius = 1;
let angle = 0;
const increment = 0.3;
const angleIncrement = 6;
const circleRadius = 5;

while (radius < 62.5) {
  const sides = 360;
  const step = 360 / sides;
  for (let i = 0; i < sides; i++) {
    t.forward(circleRadius * Math.PI * 2 / sides);
    t.right(step);
  }

  angle += angleIncrement;
  radius += increment;
  const x = 62.5 + radius * Math.cos(degreesToRadians(angle));
  const y = 62.5 + radius * Math.sin(degreesToRadians(angle));
  t.up();
  t.goTo([x, y]);
  t.down();
}

bt.join(lines, t.lines());
drawLines(lines);