/*
@title: run_and_get_random_art
@author: abhay (uniquepersun)
@snapshot: 2.png
*/
// a art which changes upon passing the time , sothat you can't see the same art again!!, I mean you can but only when you manipulate time input :)))

const width = 284;
const height = 163;
setDocDimensions(width, height);

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
  Math.random(seed);

  const numCircles = Math.floor(Math.random() * 20) + 10;

  for (let i = 0; i < numCircles; i++) {
    const maxRadius = Math.min(width, height) / 2; 
    const radius = Math.random() * maxRadius * 0.8;

    const x = Math.random() * (width - radius * 2) + radius
    const y = Math.random() * (height - radius * 2) + radius;

    //const hue = Math.floor(Math.random() * 360);
    //const color = `hsl(${hue}, 70%, 50%)`;

    drawCircle(x, y, radius, { fill: "white" }); //if wanted, you can change fill to color without quotation marks like this: color only. And also remove those slashes before 'const color & const hue = ......blah...blah'
  }
}
drawRandomCircles()
