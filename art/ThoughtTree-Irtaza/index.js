/*
@title: SunsetAtSea
@author: Irtaza
@snapshot: not added yet
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();
const rr = bt.randInRange;
const sunSize = rr(15, 25);
const seaLevel = rr(height / 3, height / 2);

// Draw sun rays
for (let i = 0; i < 21; i++) {
  t.up();
  t.goTo([60, seaLevel]);
  t.forward(sunSize + 2);
  t.down();
  t.forward(sunSize / 2);
  t.right(4.4);
}

// Function to draw a boat
function drawBoat(x, y, scale) {
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

// Draw sun
t.up();
t.goTo([sunSize + 60, seaLevel]);
t.down();
for (let i = 0; i < 175; i++) {
  t.forward(3 * sunSize / 180);
  t.right(1);
}

// Draw sea
t.up();
t.goTo([0, seaLevel]);
t.down();
t.goTo([width, seaLevel]);

// Draw boats
const boatCount = Math.floor(rr(2, 5));
for (let i = 0; i < boatCount; i++) {
  let boatX = rr(10, width - 10);
  let boatY = seaLevel - rr(10, 20);  // Ensure boat stays below sea level
  let boatScale = rr(10, 20);
  drawBoat(boatX, boatY, boatScale);
}

// Draw birds
const birdCount = Math.floor(rr(2, 4));
for (let i = 0; i < birdCount; i++) {
  t.up();
  t.goTo([rr(sunSize * 3.5, width - 10), height - rr(5, sunSize)]);
  t.down();
  t.forward(10);
  t.left(45);
  t.forward(5);
  t.right(90);
  t.forward(5);
  t.left(45);
  t.forward(10);
}

// Add turtle to final lines
bt.join(finalLines, t.lines());



// Draw it
drawLines(finalLines);
