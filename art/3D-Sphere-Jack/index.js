/*
@title: 3D Sphere
@author: Jack Hassenzahl
@snapshot: snapshot1.png
*/

const width = 100;
const height = 100;

setDocDimensions(width, height);

const radius = 50;
const curveStrength = -0.15
const widthCurveRatio = -20
let finalLines = [];
let lineSpacing = radius / 125
const showCircle = true;

const t = new bt.Turtle();

for (let i = (height / 2 - radius) % lineSpacing; i <= height; i += lineSpacing) {
  let yValue = i;
  if (Math.abs(yValue - height / 2) < radius - 1) {
    let xRight = width / 2 + Math.sqrt(Math.pow(radius, 2) - Math.pow(yValue - height / 2, 2));
    let xLeft = width / 2 - Math.sqrt(Math.pow(radius, 2) - Math.pow(yValue - height / 2, 2));
    t.jump([0, yValue]);
    t.goTo([xLeft, yValue]);
    let curves = [bt.nurbs([[xLeft, yValue], [width / 2, (xRight - xLeft + widthCurveRatio) * curveStrength + yValue], [xRight, yValue]])];
    bt.join(finalLines, curves);
    t.jump([xRight, yValue]);
    t.goTo([width, yValue]);
  } else {
    t.jump([0, yValue]);
    t.goTo([width, yValue]);
  }
}

if (showCircle) {
  t.jump([width / 2, height / 2 - radius]);
  t.arc(360, radius);
}

drawLines(t.lines());
drawLines(finalLines);
