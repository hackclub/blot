/*
@title: circle disarray
@author: tyler bordeaux
@snapshot: 1.png
*/

const width = 120;
const height = 120;

setDocDimensions(width, height);

const finalLines = [];

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const circleRadius = bt.randInRange(4, 5 + (i / 8))
    const circle = createCircle(circleRadius);
    const t = new bt.Turtle();
    const offsetX = bt.randInRange(-1.4, 4.5);
    const offsetY = bt.randInRange(-3.2, 4.5);
    bt.translate(
      circle,
      [
        (circleRadius * 2) * i,
        (circleRadius * 2) * j
      ]
    );

    // randomness added here
    bt.translate(circle, [(bt.randInRange(-1, 1) * i) / 6, (bt.randInRange(-1, 1) * i) / 6]);
    bt.rotate(circle, bt.randInRange(-1, 1) * 2 * i);

    bt.join(finalLines, circle);
  }
}
// let's get the bounds of our final lines
const finalLinesBounds = bt.bounds(finalLines);

// this moves the center of our drawing to the center of our doc
bt.translate(
  finalLines,
  [width / 2, height / 2],
  finalLinesBounds.cc
);

drawLines(finalLines, { fill: "lightcyan" });

function createCircle(radius) {
  const numPoints = 20;
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    points.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
  }
  return [points];
}