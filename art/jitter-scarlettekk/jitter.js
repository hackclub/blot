/*
@title: Jitter (The Downward Spiral)
@author: scarlettekk
@snapshot: jitter.png
*/


/* VARIABLES */
const spiralTightness = 0.00025;
const spiralSize = 1;
const jitterIterationDampener = 0.0001;
const jitterLengthDampener = 0.0005;
const jitterMaxAngle = 360;

setDocDimensions(125, 125); // center is 63, 63
const t = new bt.Turtle();
const tt = new bt.Turtle(); //used for tracking the pure spiral

t.jump([63,63]);
tt.jump([63,63]);
tt.up();
t.down();

for (var i = 0; i <= 4000; i++) {
  tt.forward(i * spiralTightness); // track the 
  tt.right(spiralSize);            // pure spiral
  for (var z = 0; z < bt.randIntInRange(0, 50) * i * jitterIterationDampener; z++) {
  t.right(bt.randInRange(0, jitterMaxAngle));       // introduce the jitter to the
  t.forward(bt.rand() * i * jitterLengthDampener);  // drawing turtle
  }
  t.goTo(tt.pos); // reset jitter for the next step
}

drawLines(t.lines());
drawLines(bt.text("the downward spiral", [3,10], 0.5));
drawLines(bt.text("coraline shuryn", [3,5], 0.5));
