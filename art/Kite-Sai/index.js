/*
@title: Kite
@author: Sai
@snapshot: the name of the snapshot file you want in the gallery
*/

const width = 400;
const height = 400;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();


function drawCurve(size, angle, steps) {
  for (let i = 0; i < steps; i++) {
    t.forward(size);
    t.right(angle);
  }
}

for (let i = 0; i < 5; i++) {
  drawCurve(2, 10, 20); 
  drawCurve(6, -10, 20); 
}


bt.join(finalLines, t.lines());


drawLines(finalLines);