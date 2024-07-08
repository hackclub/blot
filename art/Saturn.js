/*
@title: Saturn
@author: Adrian De Gendt
@snapshot: Saturn
*/

// Define the dimensions of the drawing area
setDocDimensions(800, 800);

const t = new bt.Turtle();
const finalLines = [];

// Define the center of the document
const centerX = 400;
const centerY = 400;

// Function to draw and fill Saturn (a large circle)
const drawAndFillCircle = (centerX, centerY, radius) => {
  const steps = 100;
  const polyline = [];
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    const x = radius * Math.cos(theta) + centerX;
    const y = radius * Math.sin(theta) + centerY;
    polyline.push([x, y]);
  }
  return polyline;
};

const saturnBody = drawAndFillCircle(centerX, centerY, 120);
finalLines.push(saturnBody);

// Function to draw details on Saturn
const drawSaturnDetails = (centerX, centerY, radius) => {
  const detailLines = [];
  for (let i = 0; i < 20; i++) {
    const angle = Math.PI * 2 * (i / 20);
    const startX = centerX + radius * Math.cos(angle);
    const startY = centerY + radius * Math.sin(angle);
    const endX = centerX + (radius - 40) * Math.cos(angle + 0.05);
    const endY = centerY + (radius - 40) * Math.sin(angle + 0.05);
    detailLines.push([[startX, startY], [endX, endY]]);
  }
  return detailLines;
};



// Function to draw elliptical rings around Saturn with gradient
const drawEllipticalRing = (outerRadius, innerRadius, tiltAngle) => {
  const steps = 100;
  const outerRing = [];
  const innerRing = [];

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    const xOuter = outerRadius * Math.cos(theta);
    const yOuter = outerRadius * Math.sin(theta) * Math.cos(tiltAngle);
    const xInner = innerRadius * Math.cos(theta);
    const yInner = innerRadius * Math.sin(theta) * Math.cos(tiltAngle);
    
    outerRing.push([xOuter + centerX, yOuter + centerY]);
    innerRing.push([xInner + centerX, yInner + centerY]);
  }

  // Draw the outer ring
  t.jump(outerRing[0]);
  outerRing.forEach(point => t.down().goTo(point));
  t.goTo(outerRing[0]); // Close the outer ring

  // Draw the inner ring
  t.jump(innerRing[0]);
  innerRing.forEach(point => t.down().goTo(point));
  t.goTo(innerRing[0]); // Close the inner ring
};

// Draw multiple elliptical rings around Saturn
drawEllipticalRing(150, 130, Math.PI / 4); // First ring with a tilt angle
drawEllipticalRing(180, 160, Math.PI / 4); // Second ring with a tilt angle
drawEllipticalRing(210, 190, Math.PI / 4); // Third ring with a tilt angle
drawEllipticalRing(240, 220, Math.PI / 4); // Fourth ring with a tilt angle

// Function to add gradient lines to the rings
const addGradientToRings = (centerX, centerY, startRadius, endRadius, tiltAngle, linesCount) => {
  const gradientLines = [];
  for (let i = 0; i < linesCount; i++) {
    const radius = startRadius + (endRadius - startRadius) * (i / linesCount);
    const polyline = [];
    for (let j = 0; j <= 100; j++) {
      const theta = (j / 100) * 2 * Math.PI;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta) * Math.cos(tiltAngle);
      polyline.push([x + centerX, y + centerY]);
    }
    gradientLines.push(polyline);
  }
  return gradientLines;
};

const gradientRings = addGradientToRings(centerX, centerY, 150, 240, Math.PI / 4, 20);
gradientRings.forEach(ring => finalLines.push(ring));

// Join the lines and render the drawing
bt.join(finalLines, t.lines());
drawLines(finalLines);

// Fill the circle to make it appear completely black
const fillPolygon = (points) => {
  const fillTurtle = new bt.Turtle();
  fillTurtle.jump(points[0]);
  fillTurtle.down();
  points.forEach(point => fillTurtle.goTo(point));
  fillTurtle.goTo(points[100]); // Close the polygon
  return fillTurtle.lines();
};

const filledSaturn = fillPolygon(saturnBody);
bt.join(finalLines, filledSaturn);
drawLines(finalLines);

// Add stars in the background
const addStars = (count, width, height) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = bt.randInRange(0, width);
    const y = bt.randInRange(0, height);
    stars.push([[x, y], [x + 1, y + 1]]);
  }
  return stars;
};

const stars = addStars(400, 800, 800);
stars.forEach(star => finalLines.push(star));

bt.join(finalLines, t.lines());
drawLines(finalLines);
