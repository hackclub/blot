
/*
@title: LissajousCurve
@author: Pratyush Roy
@snapshot: snapshot1.png
*/

const { Turtle, randInRange } = bt;

function draw(t, a, b, d, n, iterations) {
  let step = 2 * Math.PI / n;
  
  for (let j = 0; j < iterations; j++) {
    let px = 0, py = 0;
    let offset = j * 3;

    for (let i = 0; i <= n; i++) {
      let v = i * step;
      let x = (40 + offset) * Math.sin(a * v + d + j / 5) + bt.randInRange(1, 1);
      let y = (40 + offset) * Math.sin(b * v + j / 10) + bt.randInRange(-1, 1);

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
draw(t, 5, 3, Math.PI / 7, 500, 7);

drawLines(t.lines());

let borderLines = drawBorder();
drawLines(borderLines, { stroke: 'black', width: 2 });