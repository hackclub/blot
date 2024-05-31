/*
@title: Planet and Moon
@author: Arjun
@snapshot: snapshot3.png
*/

const width = 125;
const height = 125;

const planetSize = bt.randIntInRange(25, 40);
const moonSize = bt.randIntInRange(8, 13);
const planetCenter = [width / 2, height / 2];
const moonCenter = [
  width / 2 + 40 * (Math.random() < 0.5 ? 1 : -1),
  height / 2 + 40 * (Math.random() < 0.5 ? 1 : -1),
];
const rings = bt.randIntInRange(2, 6);
const numStripes = bt.randIntInRange(5, 10);
const starProb = 0.5;

setDocDimensions(width, height);

let finalLines = [];

const t = new bt.Turtle();

function drawCircle(radius, center, numPoints = 20) {
  const points = [];
  for (let i = 0; i < numPoints + 1; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    points.push([x, y]);
  }

  return bt.catmullRom(points);
}

function thickenCircle(radius, center, thickness, numPoints) {
  for (let i = 1; i <= thickness; i++) {
    const inner = drawCircle(radius - i * 0.1, center, numPoints);
    const outer = drawCircle(radius + i * 0.1, center, numPoints);
    finalLines.push(inner);
    finalLines.push(outer);
  }
}

let planetOutline = drawCircle(planetSize, planetCenter);
thickenCircle(planetSize, planetCenter, 2, 40);

let moonOutline = drawCircle(moonSize, moonCenter);
thickenCircle(moonSize, moonCenter, 1, 40);

function randomifyCurve(curve, interval = 10, randomFactor = 0.5) {
  let x = 0;

  bt.iteratePoints([curve], (pt, t) => {
    if (!(x % interval === 0)) {
      x++;
      return "REMOVE";
    }
    if (x === 0 || x === curve.length - 1) {
      x++;
      return pt;
    }
    pt[0] += (Math.random() - 0.5) * randomFactor;
    pt[1] += (Math.random() - 0.5) * randomFactor;
    return pt;
  });

  return curve;
}

function isWithinMoonArea(x, y) {
  return (
    Math.pow(x - moonCenter[0], 2) + Math.pow(y - moonCenter[1], 2) <=
    Math.pow(moonSize + 5, 2)
  );
}

// Rings
for (let i = 0; i < rings; i++) {
  const ringRadius = planetSize + 10 + i * 5 * Math.random();
  let ring = drawCircle(ringRadius, planetCenter, 40);
  ring = bt.cover([ring], [moonOutline])[0];
  finalLines.push(ring);
}

// Stripes on planet
const planetBounds = bt.bounds([planetOutline]);
let stripes = [];
for (let i = 0; i < numStripes; i++) {
  let y = planetBounds.yMin + i * (planetBounds.height / numStripes);
  y += (Math.random() - 0.5) * 5;
  stripes.push([
    [planetBounds.xMin, y],
    [planetBounds.xMax, y],
  ]);
}

stripes = stripes
  .map((stripe) => {
    stripe = bt.catmullRom(stripe, 20);
    stripe = randomifyCurve(stripe, 5, 2);
    stripe = bt.catmullRom(stripe, 20);
    stripe = bt.cut([stripe], [planetOutline])[0];
    return stripe;
  })
  .filter((stripe) => stripe !== undefined);

finalLines.push(...stripes);

// Craters on moon
for (let i = 0; i < 30; i++) {
  const craterCenter = [
    moonCenter[0] + 20 * Math.random() - 10,
    moonCenter[1] + 20 * Math.random() - 10,
  ];
  const craterSize = 0.5 + 0.5 * Math.random();
  let crater = drawCircle(craterSize, craterCenter, 20);
  crater = bt.cut([crater], [moonOutline])[0];
  if (crater !== undefined) finalLines.push(crater);
}

finalLines.push(planetOutline);
finalLines.push(moonOutline);

// const drawingBounds = [[2, 2], [width - 2, 2], [width - 2, height - 2], [2, height - 2], [2, 2]];

function drawStar(xpos, ypos) {
  if (Math.random() > starProb) {
    return;
  }

  const starSize = 1 + Math.random() * 2;
  const starPoints = [];
  for (let i = 0; i < 6; i++) {
    // draws a weirdly shaped star
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const x = xpos + Math.cos(angle) * starSize;
    const y = ypos + Math.sin(angle) * starSize;
    starPoints.push([x, y]);
    const angle2 = angle + Math.PI / 5; // inner angle offset
    const x2 = x + Math.cos(angle2) * (starSize / 2);
    const y2 = y + Math.sin(angle2) * (starSize / 2);
    starPoints.push([x2, y2]);
  }
  // const star = bt.catmullRom(starPoints);
  finalLines.push(starPoints);
}

drawStar(40, 117);
drawStar(120, 70);
drawStar(110, 45);
drawStar(80, 20);
drawStar(56, 10);
drawStar(20, 50);
drawStar(22, 75);
drawStar(120, 80);

finalLines = finalLines
  // .map(line => line = bt.cut([line], [drawingBounds])[0])
  .filter((line) => line !== undefined);

drawLines(finalLines);
