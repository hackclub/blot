const width = 125;
const height = 125;

// Set document dimensions
setDocDimensions(width, height);

// Store final lines
const finalLines = [];

// Parameters for the spiral galaxy
const numArms = 5; // Number of spiral arms
const numSegments = 50; // Number of segments per arm
const centerX = width / 2;
const centerY = height / 2;
const maxRadius = 60; // Maximum radius of the spiral
const rotationIncrement = 5; // Degree rotation per segment
const arcLength = 15; // Length of each arc segment

/**
 * Function to generate an arc
 * @param {number} cx - X-coordinate of the center
 * @param {number} cy - Y-coordinate of the center
 * @param {number} startAngle - Starting angle of the arc
 * @param {number} radius - Radius of the arc
 * @param {number} length - Length of the arc in degrees
 */
function createArc(cx, cy, startAngle, radius, length) {
  const arc = [];
  const steps = 10; // Number of points to define the arc
  const angleStep = (length * Math.PI) / (180 * steps);

  for (let i = 0; i <= steps; i++) {
    const angle = (startAngle * Math.PI) / 180 + i * angleStep;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    arc.push([x, y]);
  }

  return arc;
}

// Generate spiral arms
for (let arm = 0; arm < numArms; arm++) {
  let rotation = (arm * 360) / numArms;

  for (let segment = 0; segment < numSegments; segment++) {
    const radius = (segment / numSegments) * maxRadius;
    const arc = createArc(centerX, centerY, rotation, radius, arcLength);
    finalLines.push(arc);
    rotation += rotationIncrement; // Increment the angle for the next segment
  }
}

// Add a slight rotation to the entire design
bt.rotate(finalLines, 30, [centerX, centerY]);

// Draw the spiral galaxy
drawLines(finalLines);
