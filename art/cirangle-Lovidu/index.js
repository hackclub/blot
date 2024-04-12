/*
@title: raptor-coder
@author: Lovidu
@snapshot: snapshot1.png
*/

// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 200;
const height = 200;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

// Function to draw a line segment
function drawLine(start, end) {
  return [[start, end]];
}

// Function to draw a small circle at the center
function drawCircle(center, radius) {
  const angleStep = (2 * Math.PI) / 360; // Angle step for drawing circle segments
  const circleLines = [];
  for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    circleLines.push([x, y]);
  }
  // Close the circle
  circleLines.push(circleLines[0]);
  return [circleLines];
}

// Function to draw a triangle with one vertex touching the circle
function drawTriangle(center, radius, angle) {
  const vertex = [center[0] + radius * Math.cos(angle), center[1] + radius * Math.sin(angle)];
  const sideLength = 2 * radius * Math.sin(Math.PI / 3); // Length of each side of equilateral triangle
  const triangleLines = [
    [vertex, [center[0] + radius * Math.cos(angle + (2 * Math.PI) / 3), center[1] + radius * Math.sin(angle + (2 * Math.PI) / 3)]],
    [[center[0] + radius * Math.cos(angle + (2 * Math.PI) / 3), center[1] + radius * Math.sin(angle + (2 * Math.PI) / 3)], [center[0] + sideLength * Math.cos(angle + (Math.PI / 3)), center[1] + sideLength * Math.sin(angle + (Math.PI / 3))]],
    [[center[0] + sideLength * Math.cos(angle + (Math.PI / 3)), center[1] + sideLength * Math.sin(angle + (Math.PI / 3))], vertex]
  ];
  return triangleLines;
}

// Draw a small circle at the center
const centerX = width / 2;
const centerY = height / 2;
const circleRadius = 20;
finalLines.push(...drawCircle([centerX, centerY], circleRadius));

// Randomize the number of triangles drawn around the circle (between 3 and 10)
const numTriangles = Math.floor(Math.random() * 8) + 3;

// Draw triangles around the circle
for (let i = 0; i < numTriangles; i++) {
  const angle = (i * 2 * Math.PI) / numTriangles; // Angle between each triangle
  finalLines.push(...drawTriangle([centerX, centerY], circleRadius, angle));
}

// Add turtle to final lines
bt.join(finalLines, t.lines());

// Draw it
drawLines(finalLines);
