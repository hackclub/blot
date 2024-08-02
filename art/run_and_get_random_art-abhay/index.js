/*
@title: run_and_get_random_art
@author: abhay (uniquepersun)
@snapshot: 2.png
*/
// a art which changes upon passing the time , sothat you can't see the same art again!!, I mean you can but only when you manipulate time input :)))

const width = 284;
const height = 163;
setDocDimensions(width, height);
const { Turtle, trim, merge, cut, cover, rotate, scale, translate, originate, iteratePoints, pointInside, resample, join, copy, union, difference, intersection, xor, getAngle, getPoint, getNormal, bounds, nurbs, catmullRom, rand, setRandSeed, randInRange, randIntInRange, noise } = blotToolkit;

function createCirclePoints(centerX, centerY, radius, numSides = 32) {
  const points = [];
  for (let i = 0; i < numSides; i++) {
    const angle = (i / numSides) * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push([x, y]);
  }
  points.push(points[0]); 
  return [points];
}
function drawCircle(centerX, centerY, radius, options = {}) {
  const points = createCirclePoints(centerX, centerY, radius);
  drawLines(points, options);
}
function drawRandomCircles() {
  const now = new Date();
  const seed = now.getTime();
  bt.rand(seed);

  const numCircles = Math.floor(bt.rand() * 20) + 10;

  for (let i = 0; i < numCircles; i++) {
    const maxRadius = Math.min(width, height) / 2; 
    const radius = bt.rand() * maxRadius * 0.8;

    const x = bt.rand() * (width - radius * 2) + radius
    const y = bt.rand() * (height - radius * 2) + radius;

    //const hue = Math.floor(bt.rand() * 360);
    //const color = `hsl(${hue}, 70%, 50%)`;

    drawCircle(x, y, radius, { fill: "white" }); //if wanted, you can change fill to color without quotation marks like this: color only. And also remove those slashes before 'const color & const hue = ......blah...blah'
  }
}
drawRandomCircles()
