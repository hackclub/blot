/*
@title: abstract
@author: devendrakanojiya
@snapshot: snap.png
*/
const width = 135;
const height = 120;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

for (let i = 0; i < 9; i++) {
  for (let i=0; i<40; i++){
    t.forward(i++);
    t.right(80);
    t.down(80);
    
  }
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);