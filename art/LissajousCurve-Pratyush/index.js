/*
@title: LissajousCurve
@author: Pratyush Roy
*/

const { Turtle, randInRange } = bt;
const TILT = -31

function drawComplexLissajous(t, a, b, d, n, iterations) {
  let step = 2 * Math.PI / n;

  for (let j = 0; j < iterations; j++) {
    let px = 0, py = 0;
    let ampX = 30 + 50 * Math.sin(j * 0.4);
    let ampY = -3 + 50 * Math.cos(j * 0.9);
    let offset = j * 2;

    for (let i = 0; i <= n; i++) {
      let v = i * step;
      let x = ampX * Math.sin(a * v + d + j / 3) + bt.randInRange(-1, -1);
      let y = ampY * Math.sin(b * v + j / 4) + bt.randInRange(0, 1);

      if (i === 0) {
        t.jump([62.5 + x, 62.5 + y]);
        t.down();
      } else {
        let dx = (62.5 + x) - px;
        let dy = (62.5 + y) - py;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let ang = Math.atan2(dy, dx) * 180 / Math.PI;

        t.setAngle(ang);
        t.forward(dist);
      }

      px = 62.5 + x;
      py = 62.5 + y;
    }
    t.up();
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
drawComplexLissajous(t, 8.1, 4, Math.PI / TILT, 500, 2);

drawLines(t.lines());

let borderLines = drawBorder();
drawLines(borderLines, { stroke: 'black', width: 2 });