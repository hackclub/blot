/*
@title: Jitter (The Downward Spiral)
@author: scarlettekk
@snapshot: jitter.png
*/


/* VARIABLES */
var spiralTightness = bt.randInRange(0.5, 1);
var spiralSize = bt.randInRange(0.5, 1);
var jitterIterationDampener = bt.randInRange(0.1, 1);
var jitterLengthDampener = bt.randInRange(0.1, 1);
var jitterMaxAngle = bt.randInRange(180, 360);

/* allow normalization of variables to 1 */
spiralTightness *= 0.00025;
jitterIterationDampener *= 0.0001;
jitterLengthDampener *= 0.0005;

setDocDimensions(125, 125); // center is 63, 63
const bounds = [[[0, 0], [0, 125], [125, 125], [125, 0], [0, 0]]];
const t = new bt.Turtle();
const tt = new bt.Turtle(); //used for introducing wobble
const ttt = new bt.Turtle(); //used for tracking the pure spiral
t.jump([63,63]);
tt.jump([63,63]);
ttt.jump([63,63]);
ttt.up();
tt.up();
t.down();

for (var i = 0; i <= 4000; i++) {
  ttt.forward(i * spiralTightness); // track the 
  ttt.right(spiralSize);            // pure spiral
  tt.right(bt.randInRange(0, 30));
  tt.forward(5);
  for (var z = 0; z < bt.randIntInRange(0, 50) * i * jitterIterationDampener; z++) {
  t.right(bt.randInRange(0, jitterMaxAngle));       // introduce the jitter to the
  t.forward(bt.rand() * i * jitterLengthDampener);  // drawing turtle
  }
  t.goTo(tt.pos); // reset jitter for the next step
  tt.goTo(ttt.pos);
}

drawLines(bt.cut(t.lines(), bounds));
drawLines(bt.text("the downward spiral", [3,10], 0.5));
drawLines(bt.text("coraline shuryn", [3,5], 0.5));