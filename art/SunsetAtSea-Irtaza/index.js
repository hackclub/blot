/*
@title: Sunset At Sea
@author: Irtaza
@snapshot: image-1.png
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





// Sea
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

// Sky
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

// Boat
function drawBoat(t, x, y, scale) {
  t.up();
  t.goTo([x, y]);
  t.down();
  // Boat's body (kept it a simple trapezium for now)
  t.goTo([x - scale / 2, y]);
  t.goTo([x + scale / 2, y]);
  t.goTo([x + scale / 4, y - scale / 4]);
  t.goTo([x - scale / 4, y - scale / 4]);
  t.goTo([x - scale / 2, y]);

  // The sail of the boat
  t.goTo([x, y]);
  t.goTo([x, y + scale / 2]);
  t.goTo([x + scale / 4, y + scale / 4]);
  t.goTo([x, y + scale / 2]);
  t.goTo([x - scale / 4, y + scale / 4]);
  t.goTo([x + scale / 4, y + scale / 4]);

  return t;
}

// Drawing the boats
const boatCount = Math.floor(rr(2, 4));
for (let i = 0; i < boatCount; i++) {
  const tBoat = new bt.Turtle();
  let boatX = rr(10, width - 10);
  let boatY = seaLevel - rr(10, seaLevel - 10);
  let boatScale = rr(10, 20);
  drawBoat(tBoat, boatX, boatY, boatScale);
  bt.join(finalLines, tBoat.lines());
}



drawLines(seaLines, { fill: "#b5e8d2", stroke: "darkblue" });

//drawLines(boatLines, {fill: "	#dee7d0"});
drawLines(skyLines, { fill: "	#c9e8d2" });

drawLines(sunLines, { stroke: "yellow", fill: "#ffe3ce" });
drawLines(raysLines, { stroke: "#FFC090" });
drawLines(birdLines);
drawLines(finalLines, { fill: "	#dee7d0" });
