/*
@title: SunsetAtSea
@author: Irtaza
@snapshot: not added yet
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];
const rr = bt.randInRange;
const sunSize = rr(15, 25);
const seaLevel = rr(height / 3, height / 2);
const sunCenterX = width / 2;  // Center the sun horizontally

// Draw sun rays
const tRays = new bt.Turtle();
for (let i = 0; i < 41
     ; i++) {
  tRays.up();
  tRays.goTo([sunCenterX, seaLevel]);
  tRays.forward(sunSize - 1);
  tRays.down();
  tRays.forward(sunSize / 2);
  tRays.left(180 / 41); // Divide 360 degrees into 41 parts
}
bt.join(finalLines, tRays.lines());

// Draw sun
const tSun = new bt.Turtle();
tSun.up();
tSun.goTo([sunCenterX - sunSize + 1, seaLevel]);
tSun.down();
tSun.left(90); // Adjust initial angle for semicircle
for (let i = 0; i < 180; i++) {
  tSun.forward(3 * sunSize / 180);
  tSun.right(1);
}
bt.join(finalLines, tSun.lines());



