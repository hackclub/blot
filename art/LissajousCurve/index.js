const { Turtle } = bt;
let DESIGN = 7;

function draw(t, a, b, d, n) {
  let step = 2 * Math.PI / n;
  let px = 0, py = 0;

  for (let i = 0; i <= n; i++) {
    let v = i * step;
    let x = 200 * Math.sin(a * v + d);
    let y = 200 * Math.sin(b * v);

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
draw(t, 5, 3, Math.PI / DESIGN, 1000);

drawLines(t.lines());

let borderLines = drawBorder();
drawLines(borderLines, { stroke: 'black', width: 3 });