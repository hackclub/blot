/*
@title: shape 'n' stars :)
@author: somebody-else
@snapshot: tristar.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);
var length = bt.randInRange(7,20)
const finalLines = [];
const numofsides = bt.randIntInRange(3,15)
const t = new bt.Turtle();
var initialrot = bt.randInRange(0,359)
function star() {
  t.forward(20)
  t.right(144)
  t.forward(20)
  t.right(144)
  t.forward(20)
  t.right(144)
  t.forward(20)
  t.right(144)
  t.forward(20)
  t.right(144)
}
t.left(initialrot)

//for (let lime = 0; lime < 10; lime++) {
  for (let step = 0; step < numofsides; step++) {
    t.forward(length)
    star()
    t.left(360/numofsides)
    star()
  }
  //t.jump(4,4)
//}




// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);

