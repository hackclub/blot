/*
@title: Julia Sets
@author: Mandy Chang
@snapshot: 1.png
*/
const width = 125;  // Width of the canvas
const height = 125; // Height of the canvas

setDocDimensions(width, height);

// Function to generate random float in the range [-1, 1]
function randInRange() {
  return bt.randIntInRange(-1000, 1000) / 1000; // Scaling to [-1, 1] with better precision
}

// Julia set
function drawJuliaSet(cx, cy) {
  const maxIter = 100;
  const scale = 1.5; 
  const imgData = [];

  // Pixels
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let zx = (x - width / 2) / (width / scale);
      let zy = (y - height / 2) / (height / scale);
      let iteration = 0;

      // Calculate the number of iterations
      while (zx * zx + zy * zy < 4 && iteration < maxIter) {
        const temp = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = temp;
        iteration++;
      }

      // Use a higher threshold for darker pixels
      const colorValue = iteration === maxIter ? 0 : 255; 
      imgData.push([x, y, colorValue]);
    }
  }

  imgData.forEach(([x, y, value]) => {
    if (value === 0) {
      // Draw thicker lines for better visibility
      drawLines([[[x - 1, y], [x + 1, y]], [[x, y - 1], [x, y + 1]]]); 
    }
  });
}

const cx = randInRange(); // Using randInRange() instead of Math.random()
const cy = randInRange(); 

drawJuliaSet(cx, cy);
