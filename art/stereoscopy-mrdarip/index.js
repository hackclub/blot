/*
@title: stereoscopy
@author: mrdarip
@snapshot: stereoscopyPreview.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static lerp(a, b, t) {
    return new Vec2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  }

  // line-line intersection
  static lli(l1p1, l1p2, l2p1, l2p2) {
    let a1 = l1p2.y - l1p1.y;
    let b1 = l1p1.x - l1p2.x;
    let c1 = a1 * l1p1.x + b1 * l1p1.y;
    let a2 = l2p2.y - l2p1.y;
    let b2 = l2p1.x - l2p2.x;
    let c2 = a2 * l2p1.x + b2 * l2p1.y;
    let det = a1 * b2 - a2 * b1;

    if (det === 0) {
      return null; // the lines are parallel
    } else {
      let x = (b2 * c1 - b1 * c2) / det;
      let y = (a1 * c2 - a2 * c1) / det;
      return new Vec2(x, y);
    }
  }

  plus(dx, dy) {
    return new Vec2(this.x + dx, this.y + dy);
  }

  minus(dx, dy) {
    return new Vec2(this.x - dx, this.y - dy);
  }

  toArray() {
    return [this.x, this.y];
  }
}

class Vec3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const PERSPECTIVE_FACTOR = 0.25;

// store final lines here
var finalLines = [];

let eyesSeparation = 1;

let horizonLeft = new Vec2(0, (3 * height) / 5);
let horizonCenter = new Vec2(width / 2, (3 * height) / 5);
let horizonRight = new Vec2(width, (3 * height) / 5);

let groundLeft = new Vec2(width / 4 + eyesSeparation, (2 * height) / 5);
let groundRight = new Vec2((3 * width) / 4 - eyesSeparation, (2 * height) / 5);

var resolution = 11;
//plane
let vertices = [];
for (let y = 0; y < resolution; y++) {
  for (let x = 0; x < resolution; x++) {
    vertices.push(new Vec3(x, heightFromPos(x - 3, y - 3, 4), y));
  }
}
//plane
let edges = [];
for (let y = 0; y < resolution - 1; y++) {
  for (let x = 0; x < resolution - 1; x++) {
    edges.push([
      x + y * resolution,
      x + y * resolution + 1,
      x + (y + 1) * resolution + 1,
      x + (y + 1) * resolution,
      x + y * resolution,
    ]);
  }
}

finalLines.push(
  ...drawMesh(vertices, edges, horizonLeft, horizonCenter, groundLeft)
);
finalLines.push(
  ...drawMesh(vertices, edges, horizonCenter, horizonRight, groundRight)
);


//plane
vertices = [
  new Vec3(6.5, 5, 3),
  new Vec3(8.36784, 5, 2.60121),
  new Vec3(8.4469, 6.02674, 3.04893),
  new Vec3(8.65193, 6.02674, 2.24624),
  new Vec3(8.15849, 6.53212, 4.08764),
  new Vec3(8.89698, 6.53486, 1.19646),
];
//plane
edges = [
  [0, 3, 5, 0, 2, 4, 0, 1],
  [3, 1, 2],
  [0, 1]
];

finalLines.push(
  ...drawMesh(vertices, edges, horizonLeft, horizonCenter, groundLeft)
);
finalLines.push(
  ...drawMesh(vertices, edges, horizonCenter, horizonRight, groundRight)
);



finalLines.push([
  [width / 2, 0],
  [width / 2, height],
]); //vertical line for dividing

finalLines.push(circleAt(width / 4, height / 5, 2, 100));
finalLines.push(circleAt((3 * width) / 4, height / 5, 2, 100)); //circles for stereoscopy reference

// draw it
drawLines(finalLines);

function circleAt(x, y, r, n) {
  let polyline = [];
  for (let i = 0; i <= n; i++) {
    polyline.push([
      x + Math.cos((2 * Math.PI * i) / n) * r,
      y + Math.sin((2 * Math.PI * i) / n) * r,
    ]);
  }
  return polyline;
}

function drawMesh(v3vertices, edges, X, Z, C) {
  var vertices = [];
  for (let vertice of v3vertices) {
    vertices.push(get(vertice.x, vertice.y, vertice.z, X, Z, C).toArray());
  }

  let polyLines = [];
  for (let edge of edges) {
    let line = [];
    for (let i = 0; i < edge.length - 1; i++) {
      line.push(vertices[edge[i]]);
      line.push(vertices[edge[i + 1]]);
    }
    polyLines.push(line);
  }

  return polyLines;
}

function stepToDistanceRatio(s) {
  return 1.0 - 1.0 / (1.0 + PERSPECTIVE_FACTOR * s);
}

function heightFromPos(x, y, a) {
  //this is the function that defines the height of the planeº
  return (
    (a * (Math.cos(x) + Math.cos(y))) /
    Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + 1)
  );
}

function get(x, y, z, vX, vZ, vC) {
  if (x === 0 && y === 0 && z === 0) return vC;

  const HC = Vec2.lli(vC, vC.plus(0, 10), vZ, vX); // C projected onto the horizon Z--X.
  const dyC = vC.y - HC.y; // The y-distance in screen pixels between C and its projection.
  const yScale = 5.0; // This determines what height is drawn as "level" to the viewer.
  const yFactor = dyC / yScale; // By how much we need to scale world.y to get screen.y?

  let px = Vec2.lerp(vC, vX, stepToDistanceRatio(x));
  let pz = Vec2.lerp(vC, vZ, stepToDistanceRatio(z));
  let ground = Vec2.lli(vX, pz, vZ, px);
  if (y == 0) return ground;

  let inZ = ground.x < vC.x;

  let rx = inZ
    ? (ground.x - vZ.x) / (vC.x - vZ.x)
    : (vX.x - ground.x) / (vX.x - vC.x);

  let onAxis = Vec2.lli(inZ ? vZ : vX, vC, ground, ground.plus(0, 10));

  let ry = (ground.y - HC.y) / (onAxis.y - HC.y);

  return ground.minus(0, rx * ry * y * yFactor);
}
