/*
@title: MandelBlot
@author: Andrew
@snapshot: 100-Recursion.png
*/

// Set the dimensions of the drawing document
setDocDimensions(800, 600);

// Define constants for Mandelbrot set
const MAX_ITER = bt.randIntInRange(5, 80); //this just makes it more interesting to look at.
//you can manually change bt.randIntInRange to any positive nonzero integer if you want to see
//a particularly interesting number of iterations.


const ZOOM = 327; // Increased zoom for more detail
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Calculate the center of the canvas
const centerX = (CANVAS_WIDTH + 200) / 2;
const centerY = CANVAS_HEIGHT / 2;

// Calculate the move values to center the Mandelbrot set
const MOVE_X = -centerX / ZOOM;
const MOVE_Y = -centerY / ZOOM;

// Define function to check if a point belongs to the Mandelbrot set
function mandelbrot(x, y) {
  let real = 0;
  let imag = 0;
  const cx = x / ZOOM + MOVE_X;
  const cy = y / ZOOM + MOVE_Y;

  let iter = 0;
  while (real * real + imag * imag <= 4 && iter < MAX_ITER) {
    const tempReal = real * real - imag * imag + cx;
    imag = 2 * real * imag + cy;
    real = tempReal;
    iter++;
  }

  return iter;
}

// Generate Mandelbrot set pixel data
const pixelData = [];
for (let y = 0; y < CANVAS_HEIGHT; y++) {
  const row = [];
  for (let x = 0; x < CANVAS_WIDTH; x++) {
    const iter = mandelbrot(x, y);
    row.push(iter === MAX_ITER ? 1 : 0); // Store 1 for Mandelbrot set, 0 otherwise
  }
  pixelData.push(row);
}

// Draw the Mandelbrot set
const lines = [];
for (let y = 0; y < CANVAS_HEIGHT; y++) {
  let start = null;
  let end = null;
  for (let x = 0; x < CANVAS_WIDTH; x++) {
    if (pixelData[y][x] === 1) {
      if (start === null) {
        start = [x, y];
      }
      end = [x, y];
    } else {
      if (start !== null && end !== null) {
        lines.push([start, end]);
        start = null;
        end = null;
      }
    }
  }
  if (start !== null && end !== null) {
    lines.push([start, end]);
  }
}

// Draw the pixels representing the Mandelbrot set
drawLines(lines);