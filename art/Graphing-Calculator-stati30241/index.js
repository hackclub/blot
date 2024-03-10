/*
 * A simple graphing calculator using blot, you can graph any function of
 * the form f(x, y) = t and specify the region in which the function is drawn
 *
 * Uses the marching squares algorithm to draw the contour of the function,
 * the resolution can be changed as the user wishes. Try creating your own
 * implicit functions and graphing them!
 *
 * Author: stati30241
 * Date: March, 2024
 */


// Setup
const docWidth = 200;
const docHeight = 200;
setDocDimensions(docWidth, docHeight);
const turtle = createTurtle();


// Functions to be graphed, feel free to add your own!
function heart(x, y) {
  return x * x + Math.pow(y - Math.sqrt(Math.abs(x)), 2);
}

function circle(x, y) {
  let h = 0, k = 0; // the center
  return Math.sqrt(Math.pow(x - h, 2) + Math.pow(y - k, 2));
}

function parabola(x, y) {
  let a = 1, b = 0, c = 0; // the coefficients
  return y - a * x * x - b * x - c;
}

function trigMadness(x, y) {
  return Math.sin(x + y) - Math.cos(x * y) + 1;
}


// Renders a line between two points
function drawLine(x1, y1, x2, y2) {
  const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = 180 * Math.atan2(y2 - y1, x2 - x1) / Math.PI;

  turtle.jump([x1, y1]);
  turtle.setAngle(angle);
  turtle.forward(dist);
  turtle.setAngle(0);
}

// Renders the contour of the graph of f(x,y) = threshold in the bounded reigon given
function drawContour(center, size, f, threshold, r) {
  const topLeft = [center[0] - size[0] / 2, center[1] - size[0] / 2];
  const bottomRight = [center[0] + size[0] / 2, center[1] + size[0] / 2];
  
  for (let x = topLeft[0]; x < bottomRight[0]; x += r) {
    for (let y = topLeft[1]; y < bottomRight[1]; y += r) {
      const values = [
        f(x, y), f(x + r, y), f(x + r, y + r), f(x, y + r), f(x + r / 2, y + r / 2)
      ];
      const vertecies = [
        [x, y], [x + r, y], [x + r, y + r], [x, y + r], [x, y]
      ];
      let linePoints = [];

      for (let i = 0; i < 4; i++) {
        let a = values[i];
        let b = values[(i + 1) % 4];
        if ((a < threshold) == (b < threshold)) continue;

        let xt = vertecies[i][0] + ((threshold - a) / (b - a)) * (vertecies[i + 1][0] - vertecies[i][0]);
        let yt = vertecies[i][1] + ((threshold - a) / (b - a)) * (vertecies[i + 1][1] - vertecies[i][1]);

        xt = (xt - center[0]) * (docWidth / size[0]) + docWidth / 2;
        yt = (yt - center[1]) * (docHeight / size[1]) + docHeight / 2;
        linePoints.push([xt, yt]);
      }

      if (linePoints.length == 2) {
        drawLine(linePoints[0][0], linePoints[0][1], linePoints[1][0], linePoints[1][1]);
      } else if (linePoints.length == 4) {
        if (values[0] == values[4]) {
          drawLine(linePoints[0][0], linePoints[0][1], linePoints[1][0], linePoints[1][1]);
          drawLine(linePoints[2][0], linePoints[2][1], linePoints[3][0], linePoints[3][1]);
        } else {
          drawLine(linePoints[0][0], linePoints[0][1], linePoints[3][0], linePoints[3][1]);
          drawLine(linePoints[1][0], linePoints[1][1], linePoints[2][0], linePoints[2][3]);
        }
      }
    }
  }
}

// Rendering the actual thing
drawContour([0, 0], [10, 10], trigMadness, 0, 0.01);
drawTurtles([turtle]);