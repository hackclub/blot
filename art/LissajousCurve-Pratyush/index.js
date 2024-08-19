
/*
@title: LissajousCurve
@author: Pratyush Roy
@snapshot: snapshot1.png
*/


const { Turtle } = bt;

function draw(t, a, b, d, n, iterations) {
  let step = 2 * Math.PI / n;
  
  for (let j = 0; j < iterations; j++) {
    let px = 0, py = 0;
    let offset = j * 6;

    for (let i = 0; i <= n; i++) {
      let v = i * step;
      let x = (200 + offset) * Math.sin(a * v + d + j / 5) + Math.random() * 14 - 5;
      let y = (200 + offset) * Math.sin(b * v + j / 10) + Math.random() * 10 - 5;

      if (i === 0) {
        t.jump([400 + x, 300 + y]);
        t.down();
      } else {
        let dx = (400 + x) - px;
        let dy = (300 + y) - py;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let ang = Math.atan2(dy, dx) * 180 / Math.PI;
        
        t.setAngle(ang);
        t.forward(dist);
      }

      px = 400 + x;
      py = 300 + y;
    }
    t.up();
  }
}

function drawBorder() {
  let border = new Turtle();
  border.jump([0, 0]);
  border.down();
  
  border.forward(800);
  border.left(90);
  border.forward(600);
  border.left(90);
  border.forward(800);
  border.left(90);
  border.forward(600);
  
  return border.lines();
}

setDocDimensions(800, 600);

let t = new Turtle();
draw(t, 5, 3, Math.PI / 7, 500, 11); 

drawLines(t.lines());

let borderLines = drawBorder();
drawLines(borderLines, { stroke: 'black', width: 3 });