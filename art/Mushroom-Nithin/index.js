/*
@title: Mushroom
@author: Nithin
@snapshot: 1.png
*/

let width = 125;
let height = 125;

setDocDimensions(width, height);

let finalLines = [];
let points = [];
let walls = [];
let range = 20;
let iteration = 1;

// Randomize the mushroom size and position
let stemHeight = bt.randInRange(20, 50); // Height of the mushroom stem
let stemWidth = bt.randInRange(5, 15);   // Width of the mushroom stem
let capRadius = bt.randInRange(20, 40);  // Radius of the mushroom cap
let mushroomX = bt.randInRange(capRadius, width - capRadius); // X position of mushroom center
let mushroomY = bt.randInRange(stemHeight + capRadius, height - capRadius); // Y position of mushroom bottom

// Generate light points on the cap
points.push([mushroomX, mushroomY - stemHeight]); // Center of the mushroom cap

// Generate walls for the stem
walls.push([mushroomX - stemWidth / 2, mushroomY, mushroomX - stemWidth / 2, mushroomY - stemHeight]); // Left side of the stem
walls.push([mushroomX + stemWidth / 2, mushroomY, mushroomX + stemWidth / 2, mushroomY - stemHeight]); // Right side of the stem

// Generate walls for the cap (semicircle)
let capSegments = 20;
for (let i = 0; i < capSegments; i++) {
  let angle1 = Math.PI * i / capSegments;
  let angle2 = Math.PI * (i + 1) / capSegments;
  let x1 = mushroomX + capRadius * Math.cos(angle1);
  let y1 = mushroomY - stemHeight + capRadius * Math.sin(angle1);
  let x2 = mushroomX + capRadius * Math.cos(angle2);
  let y2 = mushroomY - stemHeight + capRadius * Math.sin(angle2);
  walls.push([x1, y1, x2, y2]);
}

for (let y = 0; y < height; y += iteration) {
  for (let x = 0; x < width; x += iteration) {

    let light = 0;
    for (let point = 0; point < points.length; point++) {
      let a = x - points[point][0];
      let b = y - points[point][1];
      let c = Math.sqrt(a * a + b * b);
      let dist = c / range;
      if (dist < 5) {
        let wallc = false;
        for (let w = 0; w < walls.length; w++) {
          if (intersects(x, y, points[point][0], points[point][1], walls[w][0], walls[w][1], walls[w][2], walls[w][3])) {
            wallc = true;
          }
        }
        if (!wallc) {
          light += 5 - dist;
        }
      }
    }
    if (light > 5) {
      light = 5;
    }

    let box = [];
    for (let x_ = 0; x_ < iteration; x_ += iteration / (5 - (light))) {
      box.push([x + x_, y]);
      box.push([x + x_, y + iteration]);
    }
    box.push([x + iteration, y]);
    finalLines.push(box);
  }
}

// draw it
drawLines(finalLines);

function intersects(a, b, c, d, p, q, r, s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};
