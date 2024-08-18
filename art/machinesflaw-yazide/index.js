/*
@title: machine's flaw
@author: yazide
@snapshot:s1.svg
*/const width = 275;
const height = 298;
setDocDimensions(width, height);

const drawElement = (centerX, centerY, horizontalRadius, verticalRadius, numPoints, radius) => {
  const t = new bt.Turtle([centerX, centerY]);
  const angleIncrement = 360 / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleIncrement;
    const x = centerX + horizontalRadius * Math.cos(angle * Math.PI / 180);
    const y = centerY + verticalRadius * Math.sin(angle * Math.PI / 180);
    t.goTo([x, y])
      .right(180 - angleIncrement + bt.randInRange(-5, 5)) // Add slight angle variation
      .forward(radius + bt.randInRange(-2, 2))            // Add slight length variation
      .right(180);
  }

  return t.lines();
};

const layers = [];
const centerX = width / 2;
const centerY = height / 2;
const horizontalRadius = 50; 
const verticalRadius = 60;    
let radius = 158;
const radiusDecrement = 5;

while (radius > 0) {
  const numPoints = bt.randIntInRange(6, 12);
  const layer = drawElement(centerX, centerY, horizontalRadius, verticalRadius, numPoints, radius);
  layers.push(...layer);
  radius -= radiusDecrement;
}

const outlineTurtle = new bt.Turtle([centerX, centerY]);
for (let i = 0; i < 360; i++) {
  const angle = i;
  const x = centerX + horizontalRadius * Math.cos(angle * Math.PI / 180);
  const y = centerY + verticalRadius * Math.sin(angle * Math.PI / 180);
  outlineTurtle.goTo([x, y]);
}
const outline = outlineTurtle.lines();

const pattern = [...layers, ...outline];
drawLines(pattern);