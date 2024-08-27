/*
@title: Nine-Point Circle
@author: Rishabh R
@snapshot: snapshot0.svg
*/
const getTriangle = (pts) => {
  const t = new bt.Turtle();
  t.jump(pts[0]);
  pts.forEach(pt => t.goTo(pt));
  t.goTo(pts[0]);
  return t.lines();
};

const getMidpoint = (pts) => {
  let totalX = 0;
  let totalY = 0;
  pts.forEach(pt => {
    totalX += pt[0];
    totalY += pt[1];
  });
  return [totalX / pts.length, totalY / pts.length];
};

const calculateIntersection = (p1, p2, p3, p4) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = p3;
  const [x4, y4] = p4;

  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (denom === 0) {
    return null; // Lines are parallel or coincident
  }

  const intersectX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
  const intersectY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;

  return [intersectX, intersectY];
};

const drawMedians = (pts, draw = true) => {
  let midpoints = [];
  const t = new bt.Turtle();
  for (let i = 0; i < pts.length; i++) {
    let midpoint = getMidpoint([pts[i % pts.length], pts[(i + 1) % pts.length]]);
    t.jump(pts[(i + 2) % pts.length]);
    t.goTo(midpoint);
    midpoints.push(midpoint);
  }
  if (draw) drawLines(t.lines(), { 'stroke': 'red' });
  return midpoints;
};

const calculateAltitude = (pt, pt1, pt2) => {
  const dot = (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1];

  const [x, y] = pt;
  const [x1, y1] = pt1;
  const [x2, y2] = pt2;
  const lineVec = [x2 - x1, y2 - y1];
  const pointVec = [x - x1, y - y1];
  const projScalar = dot(pointVec, lineVec) / dot(lineVec, lineVec);
  return [projScalar * lineVec[0] + x1, projScalar * lineVec[1] + y1];
};

const getAltitudes = (pts) => {
  let footPoints = [];
  let t = new bt.Turtle();
  for (let i = 0; i < pts.length; i++) {
    t.jump(pts[i]);

    // calculate altitude point
    let altPoint = calculateAltitude(
      pts[i],
      pts[(i + 1) % pts.length],
      pts[(i + 2) % pts.length]);
    t.goTo(altPoint);
    footPoints.push(altPoint);
  }

  let altitudes = t.lines();

  const orthocenter = calculateIntersection(
    altitudes[0][0],
    altitudes[0][1],
    altitudes[1][0],
    altitudes[1][1]);

  t = new bt.Turtle(); // clear it
  for (let i = 0; i < pts.length; i++) {
    t.jump(pts[i]);
    t.goTo(orthocenter);
  }

  altitudes = bt.join(altitudes, t.lines());
  return [altitudes, orthocenter];
};

const generateVertices = (seed, minX, maxX, minY, maxY) => {
  bt.setRandSeed(seed);
  let pt1 = [bt.randInRange(minX, maxX), bt.randInRange(minY, maxY)];
  let pt2 = [bt.randInRange(minX, maxX), bt.randInRange(minY, maxY)];
  let pt3 = [bt.randInRange(minX, maxX), bt.randInRange(minY, maxY)];
  return [pt1, pt2, pt3];
};

let drawCircle = (pts) => {
  function det(x11, x12, x13, x21, x22, x23, x31, x32, x33) {
    return x11 * x22 * x33 + x12 * x23 * x31 + x13 * x32 * x21 -
      x13 * x22 * x31 - x12 * x21 * x33 - x11 * x32 * x23;
  }

  const [x1, y1] = pts[0];
  const [x2, y2] = pts[1];
  const [x3, y3] = pts[2];

  const detA = det(
    x1, y1, 1,
    x2, y2, 1,
    x3, y3, 1);

  const cX = 1 / 2 *
    det(x1 ** 2 + y1 ** 2, y1, 1,
      x2 ** 2 + y2 ** 2, y2, 1,
      x3 ** 2 + y3 ** 2, y3, 1) /
    detA;

  const cY = -1 / 2 *
    det(x1 ** 2 + y1 ** 2, x1, 1,
      x2 ** 2 + y2 ** 2, x2, 1,
      x3 ** 2 + y3 ** 2, x3, 1) /
    detA;

  const r = Math.sqrt((cX - x1) ** 2 + (cY - y1) ** 2);

  let t = new bt.Turtle();
  t.jump([cX, cY]);
  t.right(90).up().forward(r).left(90).down();
  t.arc(360, r);
  drawLines(t.lines());
  return [cX, cY];
};

const drawPoint = (pt) => {
  const r = 0.97;
  let t = new bt.Turtle();
  t.jump(pt);
  t.right(90).up().forward(r).left(90).down();
  t.arc(360, r);
  drawLines(t.lines(), { 'fill': 'beige' });
};

const isInBounds = (pt, w, h) => {
  return pt[0] >= 0 && pt[0] <= w && pt[1] >= 0 && pt[1] <= h;
};

const isTriangleInBounds = (pts, orthocenter, w, h) => {
  for (const pt of pts) {
    if (!isInBounds(pt, w, h)) return false;
  }
  if (!isInBounds(orthocenter, w, h)) return false;
  return true;
};

const calculateTriangleArea = (pts) => {
  const [x1, y1] = pts[0];
  const [x2, y2] = pts[1];
  const [x3, y3] = pts[2];
  return 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
};

const w = 125;
const h = 125;
const minArea = 1000; // Minimum area threshold for the triangle
setDocDimensions(125, 125);

let seed, points, pts, triangle, midptsOfTriangle, altitudes, orthocenter, feetOfAltitudes, midptsToOrtho;
let ninePoints;
points = [0];
while (!isTriangleInBounds(points, orthocenter, w, h)) {
  seed = bt.randIntInRange(0, 10000); // modify this if you want different triangles
  points = generateVertices(seed, 5, 120, 5, 120);
  triangle = getTriangle(points);

  pts = triangle[0].slice(0, 3);

  [altitudes, orthocenter] = getAltitudes(pts);

  if (!isInBounds(orthocenter, w, h)) continue;
  midptsOfTriangle = drawMedians(pts, true);

  drawLines(triangle)
  drawLines(altitudes, { 'stroke': 'green' });

  feetOfAltitudes = [];
  midptsToOrtho = [];

  altitudes.forEach(alt => {
    let vertex = alt[0];
    feetOfAltitudes.push(alt[1]);
    let midptToOrtho = getMidpoint([vertex, orthocenter]);
    midptsToOrtho.push(midptToOrtho);
  });

  ninePoints = midptsOfTriangle.concat(feetOfAltitudes, midptsToOrtho);
}

drawCircle(midptsOfTriangle);
ninePoints.forEach(pt => drawPoint(pt));
