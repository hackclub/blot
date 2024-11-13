/*
@title: HeartOfCircles
@author: PawiX25
@snapshot: 3.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const numCircles = 150;
const maxRadius = 4;
const minRadius = 0.3;
const waveAmplitude = 6;
const waveFrequency = 3;
const randomFactor = 0.25;
const randomHeartFactor = 0.25;
const seed = Math.floor(Math.random() * 1000);
const heartScalingFactor = 35;
const backgroundPatternDensity = 150;
const margin = maxRadius * 1.2;

function generateHeartWaveArt(seed, randomFactor) {
  bt.setRandSeed(seed);
  const finalPolylines = [];
  const centerX = width / 2;
  const centerY = height / 1.7;
  const heartCircles = [];

  // Function to create background texture
  function createBackgroundPattern() {
    for (let i = 0; i < backgroundPatternDensity; i++) {
      const x = bt.rand() * width;
      const y = bt.rand() * height;

      if (!isPointInModifiedHeartShape(x, y, margin)) {
        const shapeType = bt.randIntInRange(0, 4);

        if (shapeType === 0) {
          const radius = bt.rand() * 1.2;
          const backgroundCircle = createCircle(x, y, radius, 20);
          if (!isOverlapWithHeartCircles(x, y, radius) && isWithinBounds(x, y, radius)) {
            drawLines([backgroundCircle]);
          }
        } else if (shapeType === 1) {
          const radiusX = bt.rand() * 1.5;
          const radiusY = bt.rand() * 1.2;
          const backgroundEllipse = createEllipse(x, y, radiusX, radiusY, 20);
          if (!isOverlapWithHeartCircles(x, y, Math.max(radiusX, radiusY)) && isWithinBounds(x, y, Math.max(radiusX, radiusY))) {
            drawLines([backgroundEllipse]);
          }
        } else if (shapeType === 2) {
          const sides = bt.randIntInRange(3, 7);
          const radius = bt.rand() * 1.2;
          const backgroundPolygon = createPolygon(x, y, radius, sides);
          if (!isOverlapWithHeartCircles(x, y, radius) && isWithinBounds(x, y, radius)) {
            drawLines([backgroundPolygon]);
          }
        } else if (shapeType === 3) {
          const spiralRadius = bt.rand() * 1.5;
          const turns = bt.randInRange(1, 2.5);
          const backgroundSpiral = createSpiral(x, y, spiralRadius, turns);
          if (!isOverlapWithHeartCircles(x, y, spiralRadius) && isWithinBounds(x, y, spiralRadius)) {
            drawLines([backgroundSpiral]);
          }
        } else {
          const outerRadius = bt.rand() * 1.5;
          const innerRadius = outerRadius * 0.5;
          const points = bt.randIntInRange(5, 8);
          const backgroundStar = createStar(x, y, outerRadius, innerRadius, points);
          if (!isOverlapWithHeartCircles(x, y, outerRadius) && isWithinBounds(x, y, outerRadius)) {
            drawLines([backgroundStar]);
          }
        }
      }
    }
  }

  function isPointInModifiedHeartShape(x, y, margin) {
    const tSteps = 2000;
    let isInside = false;

    const heartPoints = [];

    // Generate heart shape with transformations applied
    for (let i = 0; i < tSteps; i++) {
      const t = (i / tSteps) * 2 * Math.PI;
      let [hx, hy] = heartEquation(t);

      hx *= width / heartScalingFactor;
      hy *= height / heartScalingFactor;

      const waveOffset1 = waveAmplitude * Math.sin(t * waveFrequency);
      const waveOffset2 = (waveAmplitude / 2) * Math.cos(t * (waveFrequency * 1.5));

      hx = centerX + hx + (bt.rand() - 0.5) * randomFactor * maxRadius;
      hy = centerY + (hy + waveOffset1 + waveOffset2) + (bt.rand() - 0.5) * randomFactor * maxRadius;

      heartPoints.push([hx, hy]);
    }

    let j = heartPoints.length - 1;
    for (let i = 0; i < heartPoints.length; i++) {
      const [xi, yi] = heartPoints[i];
      const [xj, yj] = heartPoints[j];

      const intersect = ((yi > y) !== (yj > y)) &&
                        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) isInside = !isInside;
      j = i;
    }

    // Check if point is within the margin from the heart shape
    if (isInside) {
      for (let i = 0; i < tSteps; i++) {
        const t = (i / tSteps) * 2 * Math.PI;
        let [hx, hy] = heartEquation(t);

        hx *= width / heartScalingFactor;
        hy *= height / heartScalingFactor;

        const waveOffset1 = waveAmplitude * Math.sin(t * waveFrequency);
        const waveOffset2 = (waveAmplitude / 2) * Math.cos(t * (waveFrequency * 1.5));

        hx = centerX + hx + (bt.rand() - 0.5) * randomFactor * maxRadius;
        hy = centerY + (hy + waveOffset1 + waveOffset2) + (bt.rand() - 0.5) * randomFactor * maxRadius;

        const distance = Math.hypot(x - hx, y - hy);
        if (distance < margin) {
          return true;
        }
      }
    }
    return false;
  }

  function isOverlapWithHeartCircles(x, y, radius) {
    for (const [hx, hy, hr] of heartCircles) {
      const distance = Math.hypot(x - hx, y - hy);
      if (distance < (hr + radius) * 0.8) {
        return true;
      }
    }
    return false;
  }

  function isWithinBounds(x, y, radius) {
    return x - radius >= 0 && x + radius <= width && y - radius >= 0 && y + radius <= height;
  }

  function createCircle(x, y, radius, sides = 20) {
    const polyline = [];
    const angleIncrement = (2 * Math.PI) / sides;

    for (let i = 0; i < sides; i++) {
      const angle = i * angleIncrement;
      const xPos = x + radius * Math.cos(angle);
      const yPos = y + radius * Math.sin(angle);
      polyline.push([xPos, yPos]);
    }

    polyline.push(polyline[0]);
    return polyline;
  }

  function createEllipse(x, y, radiusX, radiusY, sides = 20) {
    const polyline = [];
    const angleIncrement = (2 * Math.PI) / sides;

    for (let i = 0; i < sides; i++) {
      const angle = i * angleIncrement;
      const xPos = x + radiusX * Math.cos(angle);
      const yPos = y + radiusY * Math.sin(angle);
      polyline.push([xPos, yPos]);
    }

    polyline.push(polyline[0]);
    return polyline;
  }

  function createPolygon(x, y, radius, sides = 5) {
    const polyline = [];
    const angleIncrement = (2 * Math.PI) / sides;

    for (let i = 0; i < sides; i++) {
      const angle = i * angleIncrement;
      const xPos = x + radius * Math.cos(angle);
      const yPos = y + radius * Math.sin(angle);
      polyline.push([xPos, yPos]);
    }

    polyline.push(polyline[0]);
    return polyline;
  }

  function createSpiral(x, y, radius, turns) {
    const polyline = [];
    const points = 50 * turns;
    for (let i = 0; i < points; i++) {
      const t = (i / points) * turns * 2 * Math.PI;
      const r = (radius * t) / (turns * 2 * Math.PI);
      const xPos = x + r * Math.cos(t);
      const yPos = y + r * Math.sin(t);
      polyline.push([xPos, yPos]);
    }
    return polyline;
  }

  function createStar(x, y, outerRadius, innerRadius, points) {
    const polyline = [];
    const angleStep = Math.PI / points;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * angleStep;
      const xPos = x + radius * Math.cos(angle);
      const yPos = y + radius * Math.sin(angle);
      polyline.push([xPos, yPos]);
    }

    polyline.push(polyline[0]);
    return polyline;
  }

  function heartEquation(t) {
    const a = 16 + (bt.rand() - 0.5) * randomHeartFactor;
    const b = 13 + (bt.rand() - 0.5) * randomHeartFactor;
    const c = 5 + (bt.rand() - 0.5) * randomHeartFactor;
    const d = 2 + (bt.rand() - 0.5) * randomHeartFactor;
    const e = 1 + (bt.rand() - 0.5) * randomHeartFactor;
    const x = a * Math.pow(Math.sin(t), 3);
    const y = b * Math.cos(t) - c * Math.cos(2 * t) - d * Math.cos(3 * t) - e * Math.cos(4 * t);
    return [x, y];
  }

  // Generate heart circles with overlap checking
  for (let i = 0; i < numCircles; i++) {
    const t = (i / numCircles) * 2 * Math.PI;
    let [x, y] = heartEquation(t);

    x *= width / heartScalingFactor;
    y *= height / heartScalingFactor;

    const waveOffset1 = waveAmplitude * Math.sin(t * waveFrequency);
    const waveOffset2 = (waveAmplitude / 2) * Math.cos(t * (waveFrequency * 1.5));
    const waveOffset3 = (waveAmplitude / 3) * Math.sin(t * (waveFrequency * 2));

    let finalX = centerX + x + (bt.rand() - 0.5) * randomFactor * maxRadius;
    let finalY = centerY + (y + waveOffset1 + waveOffset2 + waveOffset3) + (bt.rand() - 0.5) * randomFactor * maxRadius;

    // Varying circle sizes for depth
    const radiusVariation = bt.randInRange(0.5, 1.8);
    const radius = bt.randInRange(minRadius, maxRadius) * radiusVariation * (1 + (bt.rand() - 0.5) * randomFactor * (i / numCircles));

    let attempts = 0;
    const maxAttempts = 5;
    while (isOverlapWithHeartCircles(finalX, finalY, radius) && attempts < maxAttempts) {
      finalX += (bt.rand() - 0.5) * radius;
      finalY += (bt.rand() - 0.5) * radius;
      attempts++;
    }

    if (!isOverlapWithHeartCircles(finalX, finalY, radius) && isWithinBounds(finalX, finalY, radius)) {
      const circle = createCircle(finalX, finalY, radius);
      finalPolylines.push(circle);
      heartCircles.push([finalX, finalY, radius]);
    }
  }

  for (let i = 0; i < 15; i++) {
    const t = bt.rand() * 2 * Math.PI;
    let [x, y] = heartEquation(t);

    x *= width / heartScalingFactor;
    y *= height / heartScalingFactor;

    let finalX = centerX + x + (bt.rand() - 0.5) * randomFactor * maxRadius * 2;
    let finalY = centerY + y + (bt.rand() - 0.5) * randomFactor * maxRadius * 2;

    const radius = bt.randInRange(maxRadius * 1.2, maxRadius * 2.5);

    if (isPointInModifiedHeartShape(finalX, finalY, -margin) && !isOverlapWithHeartCircles(finalX, finalY, radius) && isWithinBounds(finalX, finalY, radius)) {
      const circle = createCircle(finalX, finalY, radius);
      finalPolylines.push(circle);
      heartCircles.push([finalX, finalY, radius]);
    }
  }

  createBackgroundPattern();
  
  finalPolylines.forEach(polyline => {
    drawLines([polyline]);
  });
}
 
generateHeartWaveArt(seed, randomFactor);
