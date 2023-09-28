const t = createTurtle();

//  initial position
t.up();
t.setAngle(90); 
t.forward(10);
t.setAngle(0);
t.down();

const numSquares = 10;

for (let i = 0; i < numSquares; i++) {
  const sideLength = (i + 1) * 40; // increase the side length for each square
  for (let j = 0; j < 4; j++) {
    t.forward(sideLength);
    t.right(90);
  }
  t.up();
  t.right(45); // rotate to adjust position for the next square
  t.forward(10); // move to the next square's starting point
  t.right(45); // rotate back to the original orientation
  t.down();
}


drawTurtles(t);
