
/*
@title: Julia Sets
@author: Mandy Chang
@snapshot: 1.png
*/
const width = 400; 
const height = 400; 

setDocDimensions(width, height);

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

      while (zx * zx + zy * zy < 4 && iteration < maxIter) {
        const temp = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = temp;
        iteration++;
      }

      const colorValue = iteration === maxIter ? 0 : 255; 
      imgData.push([x, y, colorValue]);
    }
  }

  imgData.forEach(([x, y, value]) => {
    if (value === 0) {
      drawLines([[[x, y], [x, y]]]); 
    }
  });
}

const cx = Math.random() * 2 - 1;
const cy = Math.random() * 2 - 1;

drawJuliaSet(cx, cy);
