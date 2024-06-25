/*
@title: Snow Flake
@author: Dhruv Thakur
@snapshot: SS_3.png
*/



const width = 600;
const height = 600;

setDocDimensions(width, height);

const finalLines = [];

// Number of fractal layers and frames
const numLayers = 6;
const frames = 360; // Number of frames

// Function to create a snowflake fractal
function createKochSnowflake(centerX, centerY, sideLength, numIterations, rotationAngle, color) {
  const points = [];

  // Function to recursively generate curve
  function generateKochCurve(x1, y1, x2, y2, depth) {
    if (depth === 0) {
      points.push([x1, y1]);
      points.push([x2, y2]);
    } else {
      const deltaX = x2 - x1;
      const deltaY = y2 - y1;

      const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 3;

      const angle = Math.atan2(deltaY, deltaX);
      const offsetX = Math.cos(angle + Math.PI / 3) * length;
      const offsetY = Math.sin(angle + Math.PI / 3) * length;

      const xA = x1 + deltaX / 3;
      const yA = y1 + deltaY / 3;

      const xB = xA + offsetX;
      const yB = yA + offsetY;

      const xC = x1 + deltaX * 2 / 3;
      const yC = y1 + deltaY * 2 / 3;

      generateKochCurve(x1, y1, xA, yA, depth - 1);
      generateKochCurve(xA, yA, xB, yB, depth - 1);
      generateKochCurve(xB, yB, xC, yC, depth - 1);
      generateKochCurve(xC, yC, x2, y2, depth - 1);
    }
  }


  const trianglePoints = [
    [centerX - sideLength / 2, centerY + (Math.sqrt(3) * sideLength) / 6],
    [centerX + sideLength / 2, centerY + (Math.sqrt(3) * sideLength) / 6],
    [centerX, centerY - (Math.sqrt(3) * sideLength) / 3]
  ];

  // Generate curve for each side of the triangle
  generateKochCurve(trianglePoints[0][0], trianglePoints[0][1], trianglePoints[1][0], trianglePoints[1][1], numIterations);
  generateKochCurve(trianglePoints[1][0], trianglePoints[1][1], trianglePoints[2][0], trianglePoints[2][1], numIterations);
  generateKochCurve(trianglePoints[2][0], trianglePoints[2][1], trianglePoints[0][0], trianglePoints[0][1], numIterations);

  finalLines.push({ points: points, color: color });
}

// Generate rotating snowflake layers
for (let frame = 0; frame < frames; frame++) {
  const rotationAngle = (frame / frames) * Math.PI * 2; // Angle for rotation

  for (let layer = 0; layer < numLayers; layer++) {
    const centerX = width / 2; // Center X position (fixed)
    const centerY = height / 2; // Center Y position (fixed)
    const sideLength = 200 - layer * 20; // Decreasing side length for each layer
    const numIterations = 4; // Number of iterations for the Koch curve
    const hue = (frame / frames + layer / numLayers) % 1; // Varying hue for color

    const color = `hsl(${hue * 360}, 80%, 60%)`;

    createKochSnowflake(centerX, centerY, sideLength, numIterations, rotationAngle, color);
  }
}

// Function to draw fractal layers
function drawFractalLayers(layers) {
  layers.forEach(layer => {
    drawLines([layer.points], { stroke: layer.color });
  });
}

// Draw rotating fractal layers
drawFractalLayers(finalLines);
