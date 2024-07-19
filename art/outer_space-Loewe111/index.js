/*
@title: Outer Space
@author: Loewe111
@snapshot: snapshot0.png
*/

bt.setRandSeed(1461);
const width = 200;
const height = 200;
const roughness = 5;
const detail = 3;
const size = 75;
const stars = 500;

setDocDimensions(width, height);

function drawPlanet(x, y, radius) {
  let points = [];
  let lines = [points];
  for (let i=0; i<360; i+=Math.max(detail, 1)) {
    let a = i * Math.PI / 180;
    let r = radius + bt.randInRange(-0.1 * roughness, 0.1 * roughness);
    let px = r * Math.sin(a);
    let py = r * Math.cos(a);
    points.push([px, py]);
  }
  points.push([points[0][0], points[0][1]]);
  points = bt.catmullRom(points);
  
  let islands = []
  let num_islands = bt.randIntInRange(3 , 5);
  for (let i=0; i<num_islands; i++) {
    let px = bt.randInRange(-radius, radius);
    let py = bt.randInRange(-radius, radius);
    islands.push(bt.catmullRom(drawIsland(px, py, radius / 3, 0)))
  }
  islands = bt.cut(islands, [points]);

  lines = lines.concat(islands)
  
  bt.translate(lines, [x, y])
  return lines
}

function drawIsland(x, y, size, angle) {
  let points = [];
  let radius = size;
  while (angle < 360) {
    angle += bt.randIntInRange(5, 20);
    radius = bt.randInRange(radius - 2, radius + 2);
    let px = radius * Math.sin(angle * Math.PI / 180);
    let py = radius * Math.cos(angle * Math.PI / 180);
    points.push([px, py]);
  }
  points.push([points[0][0], points[0][1]]);
  bt.translate([points], [x, y])
  return points
}

function star(x, y) {
  const a = 0.5;
  const b = 2;
  const deltas = [
    [-a, a], [0, b], [a, a], [b, 0], [a, -a], [0, -b], [-a, -a], [-b, 0], [-a, a]
  ];
  
  var lines = deltas.map(([dx, dy]) => [x + dx, y + dy]);
  lines = bt.rotate([lines], bt.randIntInRange(0, 90), [x, y])[0];

  return bt.catmullRom(lines);
}

function getDistance(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.sqrt(a*a + b*b);
}

function drawStars() {
  let points = [];
  let lines = [];
  for (let i=0; i<stars; i++) {
    let px = bt.randIntInRange(0, width);
    let py = bt.randIntInRange(0, height);
    let c = false;
    for (let j=0; j<points.length; j++) {
      if (getDistance(px, py, points[j][0], points[j][1]) < 10) {
        c = true
      }
    }
    if (c) continue;
    let s = star(px, py);
    lines.push(s);
    points.push([px, py]);
  }
  return lines
}

var planet = drawPlanet(width / 2, height / 2, size);
var stars_lines = drawStars();
stars_lines = bt.cover(stars_lines, planet);

drawLines(planet);
drawLines(stars_lines);