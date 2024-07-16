/*
@title: Beautiful Saturn
@author: Alex B
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const scale = (0.6 * Math.random()) + 0.7;

// parameters to adjust size and angle
const planetRadius = 35 * scale;
const ringInnerRadiusX = 45 * scale;
const ringInnerRadiusY = 10 * scale;
const ringInMiddleRadiusX = 57 * scale;
const ringInMiddleRadiusY = 15 * scale;
const ringOutMiddleRadiusX = 63 * scale;
const ringOutMiddleRadiusY = 18 * scale;
const ringOuterRadiusX = 75 * scale;
const ringOuterRadiusY = 23 * scale;
const ringAngle = getRandomAngle(); 

function getRandomAngle() {
  let angle = Math.random() * 20;
  if (angle > 10) {
    angle = 350 + (angle - 10);
  }
  return angle;
}

// number of stars and size of stars
const numStars = (10 * Math.random()) + 10;
const starRadius = 0.4;

// store final lines here
const finalLines = [];

// create the planet (circle) and rings (ellipses)
const saturn = {
  center: [width / 2, height / 2],
  radius: planetRadius
};

const rings = [
  { center: [width / 2, height / 2], radiusX: ringInnerRadiusX, radiusY: ringInnerRadiusY, angle: ringAngle },
  { center: [width / 2, height / 2], radiusX: ringInMiddleRadiusX, radiusY: ringInMiddleRadiusY, angle: ringAngle },
  { center: [width / 2, height / 2], radiusX: ringOutMiddleRadiusX, radiusY: ringOutMiddleRadiusY, angle: ringAngle },
  { center: [width / 2, height / 2], radiusX: ringOuterRadiusX, radiusY: ringOuterRadiusY, angle: ringAngle }
];

// function to create a circle
function createCircle(center, radius, numPoints = 200) {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
}

// function to generate random stars (small circles)
function createStars(numStars, minX, maxX, minY, maxY, radius, avoidCenter, avoidRadius) {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    let x, y;
    do {
      x = Math.random() * (maxX - minX) + minX;
      y = Math.random() * (maxY - minY) + minY;
    } while ((y < 92 && y > 31) || (avoidCenter && Math.sqrt((x - avoidCenter[0]) ** 2 + (y - avoidCenter[1]) ** 2) < avoidRadius));
    const star = createCircle([x, y], (radius * Math.random()) + 0.6, 10);
    stars.push(star);
  }
  return stars;
}

// add the planet (circle) to the final lines
finalLines.push(createCircle(saturn.center, saturn.radius));

// add the rings (ellipses) to the final lines
rings.forEach(ring => {
  finalLines.push(...createEllipse(ring.center, ring.radiusX, ring.radiusY, ring.angle));
});

// add random stars around Saturn, avoiding the center
const minX = 2;
const maxX = width - 2;
const minY = 2;
const maxY = height - 2;
const avoidCenter = saturn.center;
const avoidRadius = planetRadius + 2;
const stars = createStars(numStars, minX, maxX, minY, maxY, starRadius, avoidCenter, avoidRadius);
finalLines.push(...stars);

// draw it
drawLines(finalLines);

// function to create ellipse
function createEllipse(center, radiusX, radiusY, angle, numPoints = 200) {
  const points = [];
  const radAngle = (Math.PI / 180) * angle; // convert angle to radians
  let segment = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const x = center[0] + radiusX * Math.cos(t);
    const y = center[1] + radiusY * Math.sin(t);
    // rotate point
    const rotatedX = center[0] + (x - center[0]) * Math.cos(radAngle) - (y - center[1]) * Math.sin(radAngle);
    const rotatedY = center[1] + (x - center[0]) * Math.sin(radAngle) + (y - center[1]) * Math.cos(radAngle);

    // Calculate the distance from the rotated point to the center
    const dist = Math.sqrt((rotatedX - center[0]) ** 2 + (rotatedY - center[1]) ** 2);

    if ((rotatedX >= 0 && rotatedX <= width && rotatedY >= 0 && rotatedY <= height) && (dist > planetRadius || rotatedY < center[1])) {
      segment.push([rotatedX, rotatedY]);
    } else {
      if (segment.length > 0) {
        points.push(segment);
        segment = [];
      }
    }
  }

  if (segment.length > 0) {
    points.push(segment);
  }

  return points;
}
