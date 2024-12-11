const width = 125;
const height = 125;

// Set the document dimensions
setDocDimensions(width, height);

// Store the final lines
const finalLines = [];

// Parameters for the design
const layers = 5; // Number of concentric layers
const polygonsPerLayer = 8; // Number of polygons in each layer
const baseRadius = 10; // Base radius for the first layer
const radiusIncrement = 10; // Increase in radius for each subsequent layer
const rotationIncrement = 10; // Rotation angle increment per layer

// Center of the canvas
const centerX = width / 2;
const centerY = height / 2;

// Generate the mandala pattern
for (let layer = 0; layer < layers; layer++) {
  const radius = baseRadius + layer * radiusIncrement;
  const rotationAngle = layer * rotationIncrement;

  for (let i = 0; i < polygonsPerLayer; i++) {
    const angle = (i * 2 * Math.PI) / polygonsPerLayer;

    // Generate a polygon at this position
    const polygon = [];
    const sides = 6; // Hexagons for this example
    const polygonSize = radius / 4; // Size scales with the layer radius

    for (let j = 0; j < sides; j++) {
      const polygonAngle = (j * 2 * Math.PI) / sides;
      const x = centerX + (radius + polygonSize * Math.cos(polygonAngle)) * Math.cos(angle);
      const y = centerY + (radius + polygonSize * Math.cos(polygonAngle)) * Math.sin(angle);
      polygon.push([x, y]);
    }
    // Close the polygon
    polygon.push(polygon[0]);

    // Rotate each polygon
    bt.rotate([polygon], rotationAngle, [centerX, centerY]);
    finalLines.push(polygon);
  }
}

// Draw the mandala
drawLines(finalLines);
