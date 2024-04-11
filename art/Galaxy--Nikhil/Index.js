/*
@title: Galaxy
@author: Nikhil
@snapshot: Galaxy1.png
*/

// welcome to blot!

const width = 250;
const height = 250;
setDocDimensions(width, height);

const turtle = new bt.Turtle();
const finalLines = [];

const numStars = 5000*bt.rand(); // Number of stars

// Draw stars
for (let i = 0; i < numStars; i++) {
  const x = bt.randInRange(0, width);
  const y = bt.randInRange(0, height);
  const size = bt.randInRange(1, 5); // Star size variation
  turtle.up();
  turtle.goTo([x, y]);
  turtle.down();
  turtle.forward(size);
  turtle.right(144);
  turtle.forward(size);
  turtle.right(144);
  turtle.forward(size);
  turtle.right(144);
  turtle.forward(size);
  turtle.right(144);
}
const a = 360*bt.rand()
for (let i = 0; i < width/3; i++){
  turtle.jump([height/2, width/2]).arc(a,i*bt.rand());
  const cc = bt.bounds(finalLines).cc;
  bt.translate(finalLines, [width / 2, height/ 2], cc);

}

// add turtle to final lines
bt.join(finalLines, turtle.lines());

// add turtle to final lines
bt.join(finalLines, turtle.lines());

// draw it
drawLines(finalLines);
