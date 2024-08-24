/*
@title: LissajousCurveWithSquares
@author: Pratyush Roy
@snapshot: snapshot1.png
*/

const { Turtle, randInRange } = bt;

function drawSquare(t, x, y, size) {
  t.jump([x - size / 2, y - size / 2]);
  t.down();
  
  for (let i = 0; i < 4; i++) {
    t.forward(size);
    t.left(90);
  }
  
  t.up();
}

function draw(t, a, b, d, n, iterations) {
  let step = 4 * Math.PI / n;

  for (let j = 0; j < iterations; j++) {
    let px = 0, py = 0;
    let offset = j * -1;

    for (let i = 0; i <= n; i++) {
      let v = i * step;
      let x = (40 + offset) * Math.sin(a * v + d + j / 5) + bt.randInRange(0, 1);
      let y = (40 + offset) * Math.sin(b * v + j / 10) + bt.randInRange(-1, 0);

      let size = 2 + (i % 4) * -0.6;

      drawSquare(t, 62.5 + x, 62.5 + y, size);

      px = 62.5 + x;
      py = 62.5 + y;
    }
  }
}

function drawBorder() {
  let border = new Turtle();
  border.jump([0, 0]);
  border.down();
  
  border.forward(125);
  border.left(90);
  border.forward(125);
  border.left(90);
  border.forward(125);
  border.left(90);
  border.forward(125);
  
  return border.lines();
}

setDocDimensions(125, 125);

let t = new Turtle();
draw(t, 5, 3, Math.PI / 3, 97, 9);

drawLines(t.lines());

let borderLines = drawBorder();
drawLines(borderLines, { stroke: 'black', width: 2 });