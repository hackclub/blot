/*
@title: Life can't always be perfect
@author: Dhruv Bhadauriya
@snapshot: Snapshot1.jpg
*/
const width = 200;
const height = 200;

setDocDimensions(width, height);

// Define a function to draw a single square
const drawSquare = (x, y, size) => {
  return [
    [[x, y], [x + size, y]],
    [[x + size, y], [x + size, y + size]],
    [[x + size, y + size], [x, y + size]],
    [[x, y + size], [x, y]]
  ];
};

const pattern = [];

// Draw a grid of squares
const rows = 5;
const cols = 5;
const size = -47;
const spacing = 34; // spacing between squares


for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const x = j * (size + spacing);
    const y = i * (size + spacing);
    const square = drawSquare(x, y, size);
    pattern.push(square);
  }
}

// Center the pattern
const patternBounds = bt.bounds(pattern.flat());
bt.translate(pattern.flat(), [width / 2 - patternBounds.cc[0], height / 2 - patternBounds.cc[1]]);

// Draw the pattern
drawLines(pattern.flat());
