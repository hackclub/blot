/*
@title: Little Porcupine
@author: Jonathan Dong
@snapshot: Porky!
*/
const width = 125;
const height = 125;

var temp;
var numberScales;
setDocDimensions(width, height);

const finalLines = [];
var angle;
const t = new bt.Turtle();



t.right(90)

t.jump([0, 0])

numberScales = bt.randIntInRange(9, 13)

for (let i = 0; i < numberScales; i++) {
  temp = bt.randIntInRange(5, 8)
  t.forward(temp)
  t.right(179)
  t.forward(temp)
  t.right(170)
  t.forward(temp)
  t.right(180)
  t.forward(-5)
  t.left(10)
  t.forward(17)
  t.right(10)
  t.forward(-2)
  t.right(180)
}

t.goTo([2, -11])

t.jump([-1, -9])
for (let i = 0; i < 4; i++) {
  t.forward(0.3)
  t.right(90)
}
t.setAngle(54)
t.jump([1.4, -9.9])
t.arc(-81, -1)


// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);