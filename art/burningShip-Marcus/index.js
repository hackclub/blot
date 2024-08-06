/*
@title: Burning Ship
@author: Marcus Kauffman
@snapshot: tinyShip.png
*/

var width = 200; // Width of render
var height = 125 // Height of render
var max_iteration = 64; // Number of iterations. Higher is slower but 
// gives more detail.

// Coordinates for the fractal.
// These are the xy coordinates in the fractal plane
var min_x = -1.8;
var max_x = -1.6;
var min_y = -0.1;
var max_y = 0.025;

var density = 0.5; // How many new lines to add per iteration.
var line_direction = "flat"; // "flat", "diagonal", or "fast"
// "flat" is the fastest to draw
// "diagonal" looks the "best" 
// "fast" is the fastest to render
// 


/* Cool things to see:

// the small ships:
var min_x = -1.8;
var max_x = -1.6;
var min_y = -0.1;
var max_y = 0.025;

// iconic full fractal image: 
var min_x = -2.5;
var max_x = 1.5;
var min_y = -1.5;
var max_y = 1;

// wisps at the top:
var min_x = 0.39;
var max_x = 0.85;
var min_y = -1.37;
var max_y = -1.1;

https://www.cesoid.com/fractal?al=burningship 
This can be used to find zoom coordinates.
from the url parameters:
l is min_x
r is max_x
t is min_y
b is max y

look at the url. It will have a l=<some number>. These parameters can be
used.

Note that both here and on cesoid.com the y axis is rendered as -y.

For best results, adjust the viewing window resolution to match the 
aspect ratio of the fractal coordinates.

*/

var canvas = []

// reverse + forward linear interplotation
function map(val, imin, imax, omin, omax) {
  var irange = imax - imin;
  var orange = omax - omin;
  return (val - imin) * (orange / irange) + omin;
}
// draw pixel as stacked horizontal lines
function drawFlatPoint(x, y, fill) {
  if (fill <= 0) {
    return;
  }
  var lines = []
  for (var i = 0; i <= fill; i++) {
    var d = i / (max_iteration)
    var line = [
      [x, y - d],
      [x + 1, y - d]
    ];
    lines.push(line);
  }
  drawLines(lines);
}
// useful for preview
// it is unknown if this is drawable
// draw pixels as variable thickness diagonal line
function drawFastDiagonalPoint(x, y, fill) {
  if (fill <= 0) {
    return;
  }
  var line = [
    [x, y],
    [x + 1, y + 1]
  ];
  drawLines([line], { "width": 30 * fill / max_iteration });
}
// draw pixels as stacked diagonal lines
function drawDiagonalPoint(x, y, fill) {
  if (fill <= 0) {
    return;
  }
  var lines = []
  for (var i = 0; i <= fill; i++) {
    var d = i / (max_iteration)
    var line = [
      [x, y - d],
      [x + 1, y - d + 1]
    ];
    lines.push(line);
  }
  drawLines(lines);
}

// iterate over every pixel
for (var y = 0; y < height; y++) {
  var canvasRow = []
  for (var x = 0; x < width; x++) {
    // map from viewing window to fractal coordinates
    var _x = map(x, 0, width, min_x, max_x);
    var _y = map(y, 0, height, min_y, max_y);

    var iteration = 0;

    //save variables
    var zx = _x;
    var zy = _y;
    var xtemp = 0;

    // fractal iterations
    while (((zx * zx) + (zy * zy) < 4) && (iteration < max_iteration)) {
      xtemp = (zx * zx) - (zy * zy) + _x;
      zy = (Math.abs(2 * zx * zy) + _y); // take out Math.abs to create mandelbrot fractal
      zx = xtemp;
      iteration++;
    }
    canvasRow.push(xtemp)
    if (line_direction == "flat") {
      drawFlatPoint(x, height - y, density * (iteration));
    } else if (line_direction == "diagonal") {
      drawDiagonalPoint(x, height - y, density * (iteration));
    } else if (line_direction == "fast") {
      drawFastDiagonalPoint(x, height - y, density * (iteration));
    }
  }

  //console.log(canvasRow);
  canvas.push(canvasRow);
}

//console.log(canvas);
