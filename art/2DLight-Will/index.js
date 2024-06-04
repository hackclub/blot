/*
@title: 2D Light With Walls
@author: Will Kuster
@snapshot: snapshot1.png
*/

let width = 125;
let height = 125;

setDocDimensions(width, height);

let finalLines = [];
let points = [
  [62.5, 62.5]
];
let walls = [
  [53, 30, 92, 30],
  [100, 100, 90, 110],
  [20, 60, 30, 90]
];
let range = 18;
let iteration = 1;

let len = walls.length;
for (let wal = 0; wal < len; wal++) {
  walls.push([walls[wal][0], walls[wal][1] + 1, walls[wal][2], walls[wal][3] + 1]);
  walls.push([walls[wal][0] + 1, walls[wal][1], walls[wal][2] + 1, walls[wal][3]]);
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