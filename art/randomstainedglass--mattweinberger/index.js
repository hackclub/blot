/*
@title: randomstainedglass
@author: mattweinberger
@snapshot: glass1
*/


// Configuration Variables
const numPoints = 25;        // Number of points in the base shape
const numPolylines = 5;     // Number of polylines to create
const scaleFactor = 3;       // Scaling factor for the pattern
const rotationDegrees = 45;  // Rotation angle in degrees
const offsetDistance = 1;   // Distance to offset the polylines
const seed = 12511;          // Seed for randomness (for reproducibility)
const pastelColors = [       // Array of pastel colors
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', 
  '#FFC3A0', '#FF6F61', '#D5AAFF', '#6C5B7B', '#C06C84'
];

// Set the seed for randomness
bt.setRandSeed(seed);

// Get document dimensions
const docWidth = 800;
const docHeight = 600;

// Function to generate a random point
function randomPoint(max) {
  return [bt.randInRange(0, max), bt.randInRange(0, max)];
}

// Function to generate a random pastel color
function randomPastelColor() {
  return pastelColors[bt.randIntInRange(0, pastelColors.length - 1)];
}

// Create a base shape with random points
function createBaseShape(numPoints) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push(randomPoint(100));
  }
  return [points];
}

// Generate the pattern
function generatePattern() {
  const polylines = [];
  const colors = [];

  // Create multiple polylines with random shapes
  for (let i = 0; i < numPolylines; i++) {
    const baseShape = createBaseShape(numPoints);
    let scaledShape = bt.scale(baseShape, bt.randInRange(0.5, scaleFactor)); // Random scale factor
    scaledShape = bt.rotate(scaledShape, bt.randInRange(-180, 180)); // Random rotation
    scaledShape = bt.translate(scaledShape, [bt.randInRange(-150, 150), bt.randInRange(-150, 150)]); // Random translation
    
    // Ensure the shape is within the workspace
    const boundingBox = bt.bounds(scaledShape);
    const shapeWidth = boundingBox.width;
    const shapeHeight = boundingBox.height;
    const xOffset = Math.max(0, Math.min(docWidth - shapeWidth, (docWidth - shapeWidth) / 2 - boundingBox.cc[0]));
    const yOffset = Math.max(0, Math.min(docHeight - shapeHeight, (docHeight - shapeHeight) / 2 - boundingBox.cc[1]));
    
    scaledShape = bt.translate(scaledShape, [xOffset, yOffset]);
    
    // Add to polylines
    polylines.push(scaledShape[0]);
    colors.push(randomPastelColor());
  }

  // Offset the pattern
  const offsetPolylines = bt.offset(bt.merge(polylines), offsetDistance);

  // Center the pattern around (400, 300)
  const boundingBox = bt.bounds(offsetPolylines);
  const centerX = 400 - boundingBox.cc[0];
  const centerY = 300 - boundingBox.cc[1];
  const centeredPolylines = bt.translate(offsetPolylines, [centerX, centerY]);

  // Draw the final pattern with pastel colors
  centeredPolylines.forEach((polyline, index) => {
    drawLines([polyline], { fill: colors[index] || randomPastelColor(), stroke: 'black', width: 2 });
  });
}

// Set document dimensions
setDocDimensions(docWidth, docHeight);

// Generate and draw the pattern
generatePattern();
