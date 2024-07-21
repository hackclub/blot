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
const occupiedBoatAreas = [];

for (let i = 0; i < boatCount; i++) {
  const tBoat = new bt.Turtle();
  let boatX, boatY, boatScale;
  let isOverlapping;

  // Preventing overlap
  do {
    isOverlapping = false;
    boatX = rr(10, width - 10);
    boatY = seaLevel - rr(10, seaLevel - 10);
    boatScale = rr(10, 20);

    for (let area of occupiedBoatAreas) {
      const [ax, ay, aScale] = area;
      const distance = Math.sqrt((boatX - ax) ** 2 + (boatY - ay) ** 2);
      if (distance < aScale + boatScale) { // distance threshold between boats
        isOverlapping = true;
        break;
      }
    }
  } while (isOverlapping);

  occupiedBoatAreas.push([boatX, boatY, boatScale]);
  drawBoat(tBoat, boatX, boatY, boatScale);
  bt.join(finalLines, tBoat.lines());
}


// Drawing the birds
const birdCount = Math.floor(rr(2, 5));
const occupiedAreas = [];

for (let i = 0; i < birdCount; i++) {
  const tBird = new bt.Turtle();
  let birdX, birdY;
  let isOverlapping;

  // Preventing overlapping of birds
  do {
    isOverlapping = false;
    birdX = rr(0, width - 30);
    birdY = height - rr(5, sunSize);

    for (let area of occupiedAreas) {
      const [ax, ay] = area;
      const distance = Math.sqrt((birdX - ax) ** 2 + (birdY - ay) ** 2);
      if (distance < 20) { // Distance between birds
        isOverlapping = true;
        break;
      }
    }
  } while (isOverlapping);

  occupiedAreas.push([birdX, birdY]);

  tBird.up();
  tBird.goTo([birdX, birdY]);
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
drawLines(skyLines, { fill: "	#c9e8d2" });

drawLines(sunLines, { stroke: "yellow", fill: "#ffe3ce" });
drawLines(raysLines, { stroke: "#FFC090" });
drawLines(birdLines);
drawLines(finalLines, { fill: "	#dee7d0" });
