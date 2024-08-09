/*
@title: Canada Flag
@author: Shaurya Gupta
@snapshot: 1.png
*/

const width = 250;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();

// the 2 lines and positioning the turtle
// you can try changing these values
t.jump([width / 4, 0]);
t.left(90);
t.forward(height);
t.jump([(width / 4) * 3, 0]);
t.forward(height);
t.left(90);
t.up();
t.forward(width / 4.5);
t.left(90);
t.forward(110);
t.right(180);
t.down();

// the right half
function halfLeaf() {
  t.left(2);
  t.forward(17);
  t.arc(-104, 2);
  t.forward(22);
  t.left(109);
  t.forward(10);
  t.left(-50);
  t.forward(30);
  t.left(113);
  t.forward(10);
  t.right(90);
  t.forward(20);
  t.left(117);
  t.forward(20);
  t.right(81);
  t.forward(10);
  t.left(119);
  t.forward(19);
  t.right(146);
  t.forward(24);
  t.left(126);
  t.forward(10);
  t.right(94);
  t.forward(16);
}

halfLeaf();

// Move to the starting position for the other half of the leaf
t.up();
t.jump([123, 15]);
t.left(-23); // Flip the direction
t.down();

// the left half
function otherHalfLeaf() {
  t.left(2);
  t.forward(17);
  t.arc(104, 2);
  t.forward(22);
  t.right(109);
  t.forward(10);
  t.right(-50);
  t.forward(30);
  t.right(113);
  t.forward(10);
  t.left(90);
  t.forward(20);
  t.right(117);
  t.forward(20);
  t.left(81);
  t.forward(10);
  t.right(119);
  t.forward(19);
  t.left(146);
  t.forward(24);
  t.right(126);
  t.forward(10);
  t.left(94);
  t.forward(16);
}

otherHalfLeaf();

// make the bottom line of the leaf
t.up()
t.right(162.6)
t.forward(97)
t.left(93)
t.down()
t.forward(9)

// DRAWWW
drawLines(t.lines());
