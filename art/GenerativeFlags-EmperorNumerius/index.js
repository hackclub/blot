/*
@title: Generative Flags v1.0
@author: Emperor Numerius
@snapshot: flag2.svg
*/

const width = 240;
const height = 160;
setDocDimensions(width, height);

// Hilbert curve algorithm
function hilbertCurve(n) {
  if (n === 0) {
    return [
      [0, 0]
    ];
  } else {
    const prev = hilbertCurve(n - 1);
    const size = Math.pow(2, n - 1);
    const rotated = prev.map(([x, y]) => [y, x]);
    const translated = prev.map(([x, y]) => [x + size, y]);
    const translated2 = prev.map(([x, y]) => [x + size, y + size]);
    const rotated2 = prev.map(([x, y]) => [size - 1 - y, size - 1 - x]).map(([x, y]) => [x, y + size]);
    return [...rotated, ...translated, ...translated2, ...rotated2];
  }
}

// Function to draw Hilbert curve within a given rectangular area
function drawHilbertCurve(order, x, y, rectWidth, rectHeight) {
  const curve = hilbertCurve(order);
  const maxCoord = Math.pow(2, order) - 1;
  const xScale = rectWidth / maxCoord;
  const yScale = rectHeight / maxCoord;
  const points = curve.map(([px, py]) => [x + px * xScale, y + py * yScale]);
  drawLines([points], { width: 1 });
}

// Function to draw Cross
function drawCross() {
  const stripeWidth = width / 5;
  const stripeHeight = height / 5;

  // Horizontal bar
  drawLines([
    [
      [0, height / 2],
      [width, height / 2]
    ]
  ], { width: 5 });
  // Vertical bar
  drawLines([
    [
      [width / 2, 0],
      [width / 2, height]
    ]
  ], { width: 5 });
}

// Function to draw Saltire
function drawSaltire() {
  const centerX = width / 2;
  const centerY = height / 2;

  // Diagonal lines
  drawLines([
    [
      [0, 0],
      [centerX, centerY]
    ]
  ], { width: 5 });
  drawLines([
    [
      [0, height],
      [centerX, centerY]
    ]
  ], { width: 5 });
  drawLines([
    [
      [centerX, centerY],
      [width, height]
    ]
  ], { width: 5 });
  drawLines([
    [
      [centerX, centerY],
      [width, 0]
    ]
  ], { width: 5 });
}

// Function to draw Scandinavian Cross
function drawScandinavianCross() {
  const verticalStripeWidth = width / 5;
  const horizontalStripeHeight = height / 5;

  // Horizontal bar
  drawLines([
    [
      [0, height / 2],
      [width, height / 2]
    ]
  ], { width: 5 });
  // Vertical bar
  drawLines([
    [
      [width / 3, 0],
      [width / 3, height]
    ]
  ], { width: 5 });
}

// Function to draw Horizontal Tricolor
function drawHorizontalTricolor() {
  const stripeHeight = height / 3;

  for (let i = 1; i < 3; i++) {
    drawLines([
      [
        [0, stripeHeight * i],
        [width, stripeHeight * i]
      ]
    ], { width: 5 });
  }
}

// Function to draw Vertical Tricolor
function drawVerticalTricolor() {
  const stripeWidth = width / 3;
  for (let i = 1; i < 3; i++) {
    drawLines([
      [
        [stripeWidth * i, 0],
        [stripeWidth * i, height]
      ]
    ], { width: 5 });
  }
}

// Flags to keep track of used regions
let regionsUsed = {
  topLeft: false,
  bottomRight: false,
  top: false,
  bottom: false,
  left: false,
  right: false
};

// Randomly choose a preset design
const presets = [drawCross, drawSaltire, drawScandinavianCross, drawHorizontalTricolor, drawVerticalTricolor];
for (let i = 1; i < 3; i++) {
  const chosenPreset = presets[Math.floor(Math.random() * presets.length)];

  // Draw Hilbert curves in the required areas based on the chosen preset
  if (chosenPreset === drawCross) {
    if (!regionsUsed.topLeft) {
      drawHilbertCurve(3, 0, 0, width / 2, height / 2);
      regionsUsed.topLeft = true;
    }
    if (!regionsUsed.bottomRight) {
      drawHilbertCurve(3, width / 2, height / 2, width / 2, height / 2);
      regionsUsed.bottomRight = true;
    }
  } else if (chosenPreset === drawSaltire) {
    if (!regionsUsed.top) {
      drawHilbertCurve(4, 0, 0, width, height / 2);
      regionsUsed.top = true;
    }
    if (!regionsUsed.bottom) {
      drawHilbertCurve(4, 0, height / 2, width, height / 2);
      regionsUsed.bottom = true;
    }
  } else if (chosenPreset === drawScandinavianCross) {
    if (!regionsUsed.topLeft) {
      drawHilbertCurve(5, 0, 0, width / 2, height / 2);
      regionsUsed.topLeft = true;
    }
    if (!regionsUsed.bottomRight) {
      drawHilbertCurve(5, width / 2, height / 2, width / 2, height / 2);
      regionsUsed.bottomRight = true;
    }
  } else if (chosenPreset === drawHorizontalTricolor) {
    if (!regionsUsed.top) {
      drawHilbertCurve(6, 0, 0, width, height / 3);
      regionsUsed.top = true;
    }
    if (!regionsUsed.bottom) {
      drawHilbertCurve(6, 0, 2 * height / 3, width, height / 3);
      regionsUsed.bottom = true;
    }
  } else if (chosenPreset === drawVerticalTricolor) {
    if (!regionsUsed.left) {
      drawHilbertCurve(7, 0, 0, width / 3, height);
      regionsUsed.left = true;
    }
    if (!regionsUsed.right) {
      drawHilbertCurve(7, 2 * width / 3, 0, width / 3, height);
      regionsUsed.right = true;
    }
  }

  // Draw the chosen preset
  chosenPreset();
}
