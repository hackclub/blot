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

// Draw sea
const tSea = new bt.Turtle();
tSea.up();
tSea.goTo([0, seaLevel]);
tSea.down();
tSea.goTo([width, seaLevel]);
bt.join(finalLines, tSea.lines());

// Function to draw a boat
function drawBoat(t, x, y, scale) {
  t.up();
  t.goTo([x, y]);
  t.down();
  // Draw the boat's body (trapezium)
  t.goTo([x - scale / 2, y]);
  t.goTo([x + scale / 2, y]);
  t.goTo([x + scale / 4, y - scale / 4]);
  t.goTo([x - scale / 4, y - scale / 4]);
  t.goTo([x - scale / 2, y]);

  // Draw the sail
  t.goTo([x, y]);
  t.goTo([x, y + scale / 2]);
  t.goTo([x + scale / 4, y + scale / 4]);
  t.goTo([x, y + scale / 2]);
  t.goTo([x - scale / 4, y + scale / 4]);
  t.goTo([x + scale / 4, y + scale / 4]);

  return t;
}

// Draw boats
const boatCount = Math.floor(rr(2, 5));
for (let i = 0; i < boatCount; i++) {
  const tBoat = new bt.Turtle();
  let boatX = rr(10, width - 10);
  let boatY = seaLevel - rr(10, 20);  // Ensure boat stays below sea level
  let boatScale = rr(10, 20);
  drawBoat(tBoat, boatX, boatY, boatScale);
  bt.join(finalLines, tBoat.lines());
}

// Draw birds
const birdCount = Math.floor(rr(2, 4));
for (let i = 0; i < birdCount; i++) {
  const tBird = new bt.Turtle();
  tBird.up();
  tBird.goTo([rr(0, width - 30), height - rr(5, sunSize)]);
  tBird.down();
  tBird.forward(10);
  tBird.right(45);
  tBird.forward(5);
  tBird.left(90);
  tBird.forward(5);
  tBird.right(45);
  tBird.forward(10);
  bt.join(finalLines, tBird.lines());
}

// Draw it
drawLines(finalLines);

