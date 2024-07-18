/*
@title: Sunset At Sea
@author: Irtaza
@snapshot: not added yet
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];
const rr = bt.randInRange;
const sunSize = rr(15, 25);
const seaLevel = rr(height / 4, height / 2.1);
const sunCenterX = width / 2 ;  
/*
// Draw sun rays
const tRays = new bt.Turtle();
for (let i = 0; i < 51; i++) {
  tRays.up();
  tRays.goTo([sunCenterX, seaLevel]);
  tRays.forward(sunSize - 1);
  tRays.down();
  tRays.forward(sunSize / 2);
  tRays.left(180 / 50); 
}
bt.join(finalLines, tRays.lines());
*/
// Draw sun rays
const tsRays = new bt.Turtle();
const rayCount = 50; // Number of rays
const angleIncrement = 180 / rayCount;

for (let i = 0; i < rayCount; i++) {
  tsRays.up();
  tsRays.goTo([sunCenterX, seaLevel + sunSize + sunSize/4]);
  tsRays.forward(sunSize - 1);
  tsRays.left(90);
  tsRays.down();
  tsRays.forward(sunSize / 2);
  tsRays.left(angleIncrement);
}

