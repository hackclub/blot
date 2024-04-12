/*
@title: Pakistan Flag
@author: Huzaifa Azhar
@snapshot: pak2.png
*/

const width = 150;
const height = 100;
const crescentRadius = 15;
const starRadius = 5;

setDocDimensions(width, height);

const finalLines = [];

const greenRect = [
  [width / 4, 0],
  [width, 0],
  [width, height],
  [width / 4, height]
];
finalLines.push(greenRect);

const whiteRect = [
  [0, 0],
  [width / 4, 0],
  [width / 4, height],
  [0, height]
];
finalLines.push(whiteRect);

const crescentCenter = [width * (3/4) - 20, height / 2];
const crescentStartAngle = 180 - 40; 
const crescentEndAngle = 360 - 40;
const crescent = [];
for (let i = crescentStartAngle; i <= crescentEndAngle; i++) {
  const angle = i * Math.PI / 180;
  const x = crescentCenter[0] + Math.cos(angle) * crescentRadius;
  const y = crescentCenter[1] + Math.sin(angle) * crescentRadius;
  crescent.push([x, y]);
}
finalLines.push(crescent);

const starCenter = [width * (3/4) - 16, height / 2 + 2]; 
const starPoints = 5;
function drawStar(center, radius, points) {
  const star = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? radius * 0.5 : radius;
    const theta = i * Math.PI / points;
    const x = center[0] + Math.cos(theta) * r;
    const y = center[1] + Math.sin(theta) * r;
    star.push([x, y]);
  }
  finalLines.push(star);
}
drawStar(starCenter, starRadius, starPoints);

drawLines(finalLines);
