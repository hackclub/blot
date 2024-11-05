/*
@title: BlotalGen
@author: N-coder82
@snapshot: set.png
*/

/*
Welcome to BlotalGen!
 __        __  ___            __   ___
|__) |    /  \  |   /\  |    / _` |__  |\ |
|__) |___ \__/  |  /~~\ |___ \__> |___ | \|

To use this tool, first define what fractal you want, and how many layers you want in it!
Define the number of layers for the triangle fractal
*/

/*
Pick a fractal:
   0 = Triangle Fractal
   1 = Mandelbrot Set
   2 = Menger Sponge
*/
const fractal = 2; // <- Change this to 0, 1, or 2
/*
If you picked 0 or 2, choose the amount of layers you want
Anything more than ~5 for Menger Sponge will freeze the editor.
Anything more than ~10 for Triangle Fractal will freeze the editor.
*/
const layers = 5; // <- Choose layers here

/*
|=========== CODE BELOW ===========|
|            0101010101            |
|=========== CODE BELOW ===========|
*/

// setup
setDocDimensions(125, 125);

// triangle fractal
function triangle(x, y, size, layers) {
  if (layers === 0) return;

  // add vertices
  const halfsize = size / 2;
  const height = (Math.sqrt(3) / 2) * size;
  const vertices = [
    [x, y],
    [x + size, y],
    [x + halfsize, y + height],
    [x, y], // close triangle
  ];

  // push to canvas
  drawLines([vertices]);

  // do func again for smaller triangles
  triangle(x, y, halfsize, layers - 1);
  triangle(x + halfsize, y, halfsize, layers - 1);
  triangle(x + halfsize / 2, y + height / 2, halfsize, layers - 1);
}

// draw mandlebrot set
function brotset(width, height) {
  const polylines = [];
  const scale = 3.5 / width;
  const osx = -2.5;
  const osy = -1.75;
  const maxtimes = 100;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      let x0 = px * scale + osx;
      let y0 = py * scale + osy;
      let x = 0;
      let y = 0;
      let iteration = 0;

      while (x * x + y * y <= 4 && iteration < maxtimes) {
        let xtemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xtemp;
        iteration++;
      }

      if (iteration < maxtimes) {
        polylines.push([
          [px, py],
          [px + 1, py],
        ]);
      }
    }
  }

  drawLines(polylines);
}

// menger sponge
function mengerSponge(x, y, size, layers) {
  if (layers === 0) {
    const square = [
      [x, y],
      [x + size, y],
      [x + size, y + size],
      [x, y + size],
      [x, y],
    ];
    drawLines([square]);
    return;
  }

  const newSize = size / 3;
  for (let dx = 0; dx < 3; dx++) {
    for (let dy = 0; dy < 3; dy++) {
      if (dx === 1 && dy === 1) continue; // skip center
      mengerSponge(x + dx * newSize, y + dy * newSize, newSize, layers - 1);
    }
  }
}

// maincode
if (fractal === 0) {
  triangle(0, 0, 100, layers);
} else if (fractal === 1) {
  brotset(125, 125);
} else if (fractal === 2) {
  mengerSponge(0, 0, 100, layers);
}
