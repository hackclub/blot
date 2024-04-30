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
Eulerian cycle: this means that it draws the entire tree in 
a single closed line without lifting up the pen, and without 
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

const width = 250;
const height = 250;

setDocDimensions(width, height);

const t = new bt.Turtle();

// parameters
let side = 28
let angle = 32

// termination criteria
let minLengthL = 1
let minLengthR = 1

let maxDepthL = 20
let maxDepthR = 20


// derived values
let alpha = angle
let beta = 90-alpha
let cos = Math.cos(alpha*Math.PI/180)
let sin = Math.sin(alpha*Math.PI/180)

// draw a 'left' square: 
// - start at bottom left, pointing up
// - proceed clockwise
// - end in initial state
function squareL(len, n) {
  if (n > maxDepthL || len < minLengthL) return
  // bot left -> top left
  t.forward(len)
  // top left: draw left square
  t.left(beta); squareL(sin*len, n+1); t.right(beta)
  // top left -> top right
  t.right(90); t.forward(len)
  // top right: draw right square
  t.left(beta); squareR(cos*len, n+1); t.right(beta)
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
  t.right(alpha); squareR(cos*len, n+1); t.left(alpha)
  // top right -> top left
  t.left(90); t.forward(len)
  // top left: draw left square
  t.right(alpha); squareL(sin*len, n+1); t.left(alpha)
  // top left -> bot left
  t.left(90); t.forward(len)
  // bot left -> bot right
  t.left(90); t.forward(len); t.left(90)
}

// face upwards
t.left(90)
squareR(side, 0)


// ----------

// add turtle to final lines
const finalLines = [];
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);
