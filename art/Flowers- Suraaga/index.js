/*
@title: Flower
@author: Suraga Devraj
@snapshot: hexagonal flower Version 1.0
*/
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 250;
const height = 250;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

for (let j = 0; j < 6; j++) { // Iterate for 6 sides of the hexagon
  for (let i = 0; i < 6; i++) { // Draw a petal for each side of the hexagon
    t.forward(50); // Forward length of petal
    t.right(60); // Turn for next petal
    t.forward(20); // Draw petal shape
    t.right(120); // Turn for next petal
    t.forward(20); // Draw petal shape
    t.right(60); // Turn for next petal
  }
  t.right(60); // Turn to position for next side of hexagon
}

// add turtle lines to final lines
finalLines.push(...t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);
