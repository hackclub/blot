/*
@title:Hearthstone
@author: chaste
@snapshot: Hearthstone
*/
const width = 1490;
const height =1490;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

for (let i = 0; i < 36; i++) {
  if (i % 2 === 0) {
    for (let j = 0; j < 4; j++) {
      t.forward(i * 6); 
      t.right(20); 
    }
  } else {
    for (let j = 0; j < 3; j++) {
      t.forward(i * 8); 
      t.left(120);
    }
  }
}


bt.join(finalLines, t.lines());


const cc = bt.bounds(finalLines).cc; 
bt.translate(finalLines, [width / 2, height / 2], cc); 


drawLines(finalLines);