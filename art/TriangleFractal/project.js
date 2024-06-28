/*
@title: Triangle Fractal
@author: Pere G
@snapshot: Triangle Fractal
*/

const width = 500;
const height = 500;
const initialSize = 300;
const initialDepth = 10;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// Function to create a triangle
function createTriangle(x, y, size) {
  return [
    [x, y],
    [x + size / 2, y - size * Math.sqrt(3) / 2],
    [x - size / 2, y - size * Math.sqrt(3) / 2],
    [x, y]
  ];
}

// Recursive function to create fractal
function triangleFractal(x, y, size, depth) {
  if (depth === 0) {
    finalLines.push(createTriangle(x, y, size));
  } else {
    const newSize = size / 2;
    triangleFractal(x, y, newSize, depth - 1);
    triangleFractal(x - newSize / 2, y - newSize * Math.sqrt(3) / 2, newSize, depth - 1);
    triangleFractal(x + newSize / 2, y - newSize * Math.sqrt(3) / 2, newSize, depth - 1);
  }
}

// Initial call to create the fractal
triangleFractal(width / 2, height - 50, initialSize, initialDepth);

// Draw it
drawLines(finalLines);
