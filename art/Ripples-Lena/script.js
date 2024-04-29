/*
@title: Ripples
@author: Lena
@snapshot: image (3).png
*/

// document dimensiosn
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

// ripples
t.right(10);

for (let i = 0; i < 30; i++) {
  t.forward(bt.randIntInRange(i, i+10)); // Randomize the forward movement
  t.right(35);
}
t.right(10);

for (let i = 0; i < 30; i++) {
  t.forward(bt.randIntInRange(i, i+10)); // Randomize the forward movement
  t.left(40);
}

bt.join(finalLines, t.lines());

// centering
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw
drawLines(finalLines);
