/*
@title: spiro_grad
@author: sub-arctic
@snapshot: snapshot_1.png
*/

/* A list of nice seeds
burning-heart: 46378
purple-star: 46036
rainbow-slinky: 45574
*/
const seed = 46036; // Seed for the pseudo-random number generator
bt.setRandSeed(seed); // Set up PRNG with seed

// PARAMS
const width = 125; // Width of the canvas
const height = 125; // Height of the canvas

const hueStep = 5; // Step size for hue in gradient (higher=more spread out)
const hue = bt.randIntInRange(0, 500);
const saturation = 50; // How colorful the gradient is (higher=more colorful)
const lightness = 50; // How light or dark the gradient is (higher=darker)

const gradientEnable = true; // Enable lines to be segmented and drawn with a gradient, 
//                                at the cost of performance

const lineWidth = 2; // Width of spirograph lines
const resolution = 1000; // Quantity of points (higher=better clarity)

const radius = 100; // Radius of the spirographs, also determines quantity

setDocDimensions(width, height); // Set document dimensions
bt.setRandSeed(seed); // Set up PRNG with seed

// Function to calculate the greatest common divisor (GCD)
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function spirograph(R, r, d, finalRadius, numPoints = 1000, offsetX = 0, offsetY = 0) {
  const points = [];

  // Calculate the greatest common divisor to determine the maximum angle for the spirograph
  const divisor = gcd(R, r);
  const thetaMax = 2 * Math.PI * (R / divisor);

  // Calculate the maximum extent of the spirograph
  const currentMaxRadius = R + r;

  // Calculate scaling factor to ensure the output matches finalRadius
  const scale = finalRadius / currentMaxRadius;

  for (let i = 0; i < numPoints; i++) {
    // Calculate angle for the current point
    const theta = (i / numPoints) * thetaMax;

    // Calculate X and Y coordinates based on the spirograph formula
    const radiusDifference = R - r;
    const scaledCosine = scale * (radiusDifference * Math.cos(theta) + d * Math.cos((radiusDifference / r) * theta));
    const scaledSine = scale * (radiusDifference * Math.sin(theta) - d * Math.sin((radiusDifference / r) * theta));

    // Center the points based on the specified offsets
    const centeredX = scaledCosine + offsetX;
    const centeredY = scaledSine + offsetY;

    // Store the calculated point
    points.push([centeredX, centeredY]);
  }

  return points; // Return the generated points
}

// Function to draw gradient lines based on points
function drawGradientLines(points, width = 2, hueIndex, saturation, lightness) {
  const listSize = points.length; // Total number of points

  // Handle not drawing a gradient
  if (gradientEnable === true) {
    for (let i = hueStep; i < listSize; ++i) {
      const slicedPoints = points.slice(i - hueStep, i); // Slice points for current segment
      const color = `hsl(${(i / listSize) * hueIndex}, ${saturation}%, ${lightness}%)`; // Calculate color

      drawLines([slicedPoints], { width: width, stroke: color }); // Draw lines with the calculated color
    }
  } else {
    drawLines([points], { width: width });
  }
}

const points = spirograph(bt.randIntInRange(50, 113), bt.randIntInRange(52, 100), bt.randIntInRange(30, 50), radius, 4200, width / 2, height / 2);
drawGradientLines(points, 2, hue, saturation, lightness);
