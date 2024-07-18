/*
@title: Sunset At Sea
@author: Irtaza
@snapshot: not added yet
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];
const birdLines = [];
const seaLines = [];
const sunLines = [];
const raysLines = [];
const boatLines = [];
const skyLines = [];

const rr = bt.randInRange;
const sunSize = rr(15, 25);
const seaLevel = rr(height / 4, height / 2.1);
const sunCenterX = width / 2;

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
bt.join(raysLines, tsRays.lines());

// Draw sun
const tSun = new bt.Turtle();
tSun.up();
tSun.goTo([sunCenterX - sunSize + 1, seaLevel + sunSize + sunSize/4]);
tSun.down();
tSun.left(90); // Adjust initial angle for semicircle
for (let i = 0; i < 360; i++) {
  tSun.forward(3 * sunSize / 180);
  tSun.right(1);
}
bt.join(sunLines, tSun.lines());

// Draw sea
const tSea = new bt.Turtle();
tSea.up();
tSea.goTo([0, seaLevel]);
tSea.down();
tSea.goTo([width, seaLevel]);
tSea.right(90);
tSea.forward(seaLevel);
tSea.right(90);
tSea.forward(width);
tSea.right(90);
tSea.forward(seaLevel);
bt.join(seaLines, tSea.lines());

// Draw sky
const tSky = new bt.Turtle();
tSky.up();
tSky.goTo([0, height]);
tSky.down();
tSky.goTo([width, height]);
tSky.right(90);
tSky.forward(height - seaLevel);
tSky.right(90);
tSky.forward(width);
tSky.right(90);
tSky.forward(height - seaLevel);
bt.join(skyLines, tSky.lines());

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
const boatCount = Math.floor(rr(2, 4));
for (let i = 0; i < boatCount; i++) {
  const tBoat = new bt.Turtle();
  let boatX = rr(10, width - 10);
  let boatY = seaLevel - rr(10, seaLevel - 10);  // Ensure boat stays below sea level
  let boatScale = rr(10, 20);
  drawBoat(tBoat, boatX, boatY, boatScale);
  bt.join(finalLines, tBoat.lines());
}

// Draw birds
const birdCount = Math.floor(rr(2, 5));
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
  bt.join(birdLines, tBird.lines());
}

drawLines(seaLines, { fill: "#b5e8d2", stroke: "darkblue" });

 
//drawLines(boatLines, {fill: "	#dee7d0"});
drawLines(skyLines  , {fill: "	#c9e8d2"});



drawLines(sunLines, { stroke: "yellow", fill: "#ffe3ce" });
drawLines(raysLines, { stroke: "#FFC090" });
drawLines(birdLines);
drawLines(finalLines,  {fill: "	#dee7d0"});
