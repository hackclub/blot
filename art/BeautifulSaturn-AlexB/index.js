const width = 125;
const height = 125;

setDocDimensions(width, height);

// parameters to adjust size and angle
const planetRadius = 35;
const ringInnerRadiusX = 45;
const ringInnerRadiusY = 10;
const ringInMiddleRadiusX = 57;
const ringInMiddleRadiusY = 15;
const ringOutMiddleRadiusX = 63;
const ringOutMiddleRadiusY = 18;
const ringOuterRadiusX = 75;
const ringOuterRadiusY = 23;
const ringAngle = 10; 

// number of stars and size of stars
const numStars = 15;
const starRadius = 0.8;

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
    } while (avoidCenter && Math.sqrt((x - avoidCenter[0]) ** 2 + (y - avoidCenter[1]) ** 2) < avoidRadius);
    const star = createCircle([x, y], radius, 10);
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
const minX = 0;
const maxX = width;
const minY = 0;
const maxY = height;
const avoidCenter = saturn.center;
const avoidRadius = ringInMiddleRadiusX;
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
    const rotatedX = center[0] + (x - center[0]) * Math.cos(radAngle) - (y - center[0]) * Math.sin(radAngle);
    const rotatedY = center[1] + (x - center[0]) * Math.sin(radAngle) + (y - center[0]) * Math.cos(radAngle);

    // Calculate the distance from the rotated point to the center
    const dist = Math.sqrt((rotatedX - 62.5) ** 2 + (rotatedY - 62.5) ** 2);

    if (dist > planetRadius || rotatedY < 62.5) {
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
