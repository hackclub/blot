/*
@title: EulerClimbsTheTreeOfPythagoras
@author: JuliusRompf
@snapshot: 2.png
*/

/*
This program draws the famous tree of Pythagoras. The area of
each square is the sum of the two adjacent smaller squares.
The three squares together form a right triangle.

The algorithm is unusual as it constructs the tree as an 
Euler cycle: this means that it draws the entire tree in a
single closed line without lifting up the pen, and without
drawing any line twice. At the end, the pen returns to the 
starting position. This makes it interesting and well-suited 
for running on a pen plotter.

It is interesting to play with the parameters (side length
and angle) below. One can also adjust the termination criteria
(minimum side length and maximum recursion depth) 
independently for 'left' and 'right' squares.

Want to draw octopus tentacles? Try maxDepthL = 2 and 
maxDepthR = 20!

I wrote this program with my Dad, Tiark Rompf, after 
inspiration from my Grandpa, Gerhard Rompf.

- Julius Rompf, 8 years old
*/


// canvas
let width = 250;
let height = 250;

// parameters
let side = 28
let angle = 30

// termination criteria
let minLengthL = 2
let minLengthR = 2

let maxDepthL = 20
let maxDepthR = 20

// scale angles, side lengths
let scaleAngleL = 100
let scaleAngleR = 100

let scaleSideL = 100
let scaleSideR = 100

// derived values
let angleL = scaleAngleL/100 * (90-angle)
let angleR = scaleAngleR/100 * angle
let sideL = scaleSideL/100 * Math.cos(angleL*Math.PI/180)
let sideR = scaleSideR/100 * Math.cos(angleR*Math.PI/180)


// ---------- algorithm ----------

const t = new bt.Turtle();

// draw a 'left' square: 
// - start at bottom left, pointing up
// - proceed clockwise
// - end in initial state
function squareL(len, n) {
  if (n > maxDepthL || len < minLengthL) return
  // bot left -> top left
  t.forward(len)
  // top left: draw left square
  t.left(angleL); squareL(sideL*len, n+1); t.right(angleL)
  // top left -> top right
  t.right(90); t.forward(len)
  // top right: draw right square
  t.left(90-angleR); squareR(sideR*len, n+1); t.right(90-angleR)
  // top right -> bot right
  t.right(90); t.forward(len)
  // bot right -> bot left
  t.right(90); t.forward(len); t.right(90)
}

// draw a 'right' square:
// - start at bottom right, pointing up
// - proceed counterclockwise
// - end in initial state
function squareR(len, n) {
  if (n > maxDepthR || len < minLengthR) return
  // bot right -> top right
  t.forward(len)
  // top right: draw right square
  t.right(angleR); squareR(sideR*len, n+1); t.left(angleR)
  // top right -> top left
  t.left(90); t.forward(len)
  // top left: draw left square
  t.right(90-angleL); squareL(sideL*len, n+1); t.left(90-angleL)
  // top left -> bot left
  t.left(90); t.forward(len)
  // bot left -> bot right
  t.left(90); t.forward(len); t.left(90)
}

// face upwards
t.left(90)
squareR(side, 0)


// ---------- blot commands ----------

// add turtle to final lines
const finalLines = [];
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// setup canvas
setDocDimensions(width, height);

// draw it
drawLines(finalLines);
