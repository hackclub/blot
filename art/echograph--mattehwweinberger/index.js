
/*
@title: echograph
@author: mattehwweinberger
@snapshot: graph1
*/



// User-configurable parameters
const STEPS = 100;                // Number of steps for the visualizer
const MAX_AMPLITUDE = 200;        // Maximum amplitude for the plot
const FREQUENCY = 6;             // Frequency of the wave
const JAGGEDNESS_FACTOR = 0.4;    // Jaggedness factor for the waves (20%)
const SMOOTHNESS = 0.7;           // Smoothness of the plot (0 = no smoothing, 1 = very smooth)
const SEED = 12345;               // Seed for random number generation
const HATCH_SPACING = 20;         // Spacing between cross-hatching lines

// Import necessary functions from blotToolkit
const { Turtle, rand, setRandSeed, catmullRom } = bt;

// Function to calculate the gradient modulus at each point
function calculateGradients(points) {
  const gradients = [];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    gradients.push(magnitude);
  }
  return gradients;
}

// Function to calculate the bounding box from a list of points
function calculateBoundingBox(points) {
  const xValues = points.map(p => p[0]);
  const yValues = points.map(p => p[1]);

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  return { xMin, xMax, yMin, yMax };
}

// Function to clip a line segment by the bounding box using Liang-Barsky algorithm
function clipLine(x1, y1, x2, y2, bounds) {
  const { xMin, xMax, yMin, yMax } = bounds;
  const p = [-1, 1, 0, 0];
  const q = [x1 - xMin, xMax - x1, y1 - yMin, yMax - y1];
  let t0 = 0;
  let t1 = 1;

  for (let i = 0; i < 4; i++) {
    const pi = p[i];
    const qi = q[i];

    if (pi === 0) {
      if (qi < 0) return null; // Line is outside the clipping window
    } else {
      const t = qi / pi;
      if (pi < 0) {
        if (t > t1) return null;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return null;
        if (t < t1) t1 = t;
      }
    }
  }

  const xStart = x1 + t0 * (x2 - x1);
  const yStart = y1 + t0 * (y2 - y1);
  const xEnd = x1 + t1 * (x2 - x1);
  const yEnd = y1 + t1 * (y2 - y1);

  return [[xStart, yStart], [xEnd, yEnd]];
}

// Function to generate a random audio visualizer plot with cross-hatching and clipping
function generateVisualizerPlot() {
  // Set the document dimensions
  setDocDimensions(800, 600);

  // Set the random seed
  setRandSeed(SEED);

  // Create a new Turtle instance
  const turtle = new Turtle();

  // Initialize variables for the visualizer plot
  turtle.down();
  const points = [];
  for (let i = 0; i < STEPS; i++) {
    // Generate random amplitude with jaggedness
    const amplitude = MAX_AMPLITUDE * (rand() * (1 - SMOOTHNESS) + SMOOTHNESS);
    const jaggedness = amplitude * rand() * JAGGEDNESS_FACTOR; // Jaggedness factor
    const x = (800 / STEPS) * i;
    const y = 300 + amplitude * Math.sin((i / STEPS) * FREQUENCY * 2 * Math.PI) + jaggedness * (rand() - 0.5);
    points.push([x, y]);
    turtle.goTo([x, y]);
  }
  turtle.goTo(points[0]); // Close the shape

  // Get the path drawn by the turtle
  const path = turtle.lines()[0];

  // Calculate gradients
  const gradients = calculateGradients(path);

  // Calculate the bounding box manually
  const boundingBox = calculateBoundingBox(path);

  // Draw cross-hatching with clipping
  for (let i = 0; i < path.length - 1; i++) {
    const [x1, y1] = path[i];
    const [x2, y2] = path[i + 1];
    const gradientModulus = gradients[i];

    // Clip the line segment
    const clippedLine = clipLine(x1, y1, x2, y2, boundingBox);
    if (clippedLine) {
      const [[clipX1, clipY1], [clipX2, clipY2]] = clippedLine;

      // Draw cross-hatching lines with spacing based on HATCH_SPACING
      const numHatchLines = Math.max(2, Math.floor(gradientModulus / HATCH_SPACING)); // Adjust for desired effect
      for (let j = 0; j < numHatchLines; j++) {
        const offset = (j / numHatchLines) * gradientModulus * 0.5; // Offset for hatch lines
        drawLines([[[clipX1, clipY1], [clipX1 + offset, clipY1 + offset], [clipX2 + offset, clipY2 + offset], [clipX2, clipY2]]], { stroke: 'black', width: 1 });
      }
    }
  }

  // Optionally smooth the path using Catmull-Rom splines
  const smoothedPath = catmullRom(path, STEPS * 10);

  // Draw the smoothed visualizer plot
  drawLines([smoothedPath], { stroke: 'blue', width: 2 });
}

// Example usage of the function
generateVisualizerPlot();
