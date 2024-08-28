/*
@title: HeartOfCircles
@author: PawiX25
@snapshot: 3.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const numCircles = 117;
const maxRadius = 3;
const waveAmplitude = 5;
const waveFrequency = 2;
const randomFactor = 0.2;
const seed = 116;
const heartScalingFactor = 35;
const backgroundPatternDensity = 100;
const margin = maxRadius * 1;

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
        const shapeType = bt.randIntInRange(0, 2);

        if (shapeType === 0) {
          const radius = bt.rand() * 1.5;
          const backgroundCircle = createCircle(x, y, radius, 20);
          if (!isOverlapWithHeartCircles(x, y, radius)) {
            drawLines([backgroundCircle]);
          }
        } else if (shapeType === 1) {
          const radiusX = bt.rand() * 2;
          const radiusY = bt.rand() * 1.5;
          const backgroundEllipse = createEllipse(x, y, radiusX, radiusY, 20);
          if (!isOverlapWithHeartCircles(x, y, Math.max(radiusX, radiusY))) {
            drawLines([backgroundEllipse]);
          }
        } else {
          const sides = bt.randIntInRange(3, 5);
          const radius = bt.rand() * 1.5;
          const backgroundPolygon = createPolygon(x, y, radius, sides);
          if (!isOverlapWithHeartCircles(x, y, radius)) {
            drawLines([backgroundPolygon]);
          }
        }
      }
    }
  }

  function isPointInModifiedHeartShape(x, y, margin) {
    const tSteps = 2000; // Increase this for better accuracy
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
      if (distance < (hr + radius)) {
        return true;
      }
    }
    return false;
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

  function heartEquation(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [x, y];
  }

  // Generate heart circles and background pattern
  for (let i = 0; i < numCircles; i++) {
    const t = (i / numCircles) * 2 * Math.PI;
    let [x, y] = heartEquation(t);

    x *= width / heartScalingFactor;
    y *= height / heartScalingFactor;

    const waveOffset1 = waveAmplitude * Math.sin(t * waveFrequency);
    const waveOffset2 = (waveAmplitude / 2) * Math.cos(t * (waveFrequency * 1.5));

    const finalX = centerX + x + (bt.rand() - 0.5) * randomFactor * maxRadius;
    const finalY = centerY + (y + waveOffset1 + waveOffset2) + (bt.rand() - 0.5) * randomFactor * maxRadius;

    // Varying circle sizes for depth
    const radius = maxRadius * (1 + (bt.rand() - 0.5) * randomFactor * (i / numCircles));

    const circle = createCircle(finalX, finalY, radius);
    finalPolylines.push(circle);
    heartCircles.push([finalX, finalY, radius]);
  }

  createBackgroundPattern();
  drawLines(finalPolylines);
}

generateHeartWaveArt(seed, randomFactor);
