/*
@title: fractal_madness
@author: Alexander Li
@snapshot: fractal_madness
*/

const width = 300;
const height = 300;

setDocDimensions(width, height);

const finalLines = [];

// Define the vertices of the triangle
const triangle = [
  [width / 2, 20],
  [20, height - 20],
  [width - 20, height - 20],
  [width / 2, 20] // Closing the triangle
];

// Function to generate Sierpinski triangles
function drawSierpinski(points, depth) {
  if (depth === 0) {
    finalLines.push(points);
  } else {
    // Calculate midpoints of the sides
    const [a, b, c] = points;
    const midAB = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const midBC = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
    const midCA = [(c[0] + a[0]) / 2, (c[1] + a[1]) / 2];

    // Recursively draw smaller triangles
    drawSierpinski([a, midAB, midCA, a], depth - 1);
    drawSierpinski([b, midAB, midBC, b], depth - 1);
    drawSierpinski([c, midBC, midCA, c], depth - 1);
  }
}

// Draw the Sierpinski Triangle
drawSierpinski(triangle, 5);

// Draw it
drawLines(finalLines);
