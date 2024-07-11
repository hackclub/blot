/*
@title: Dance of Shapes
@author: Marťas_SK
@snapshot: dance-of-shapes.png
*/

/* 
Description: "Dance of Shapes" is an artistic exploration of randomness and geometry, 
creating a visual blend of forms that never repeats itself. Each run generates a unique 
composition of shapes, spirals, and lines, representing the essence of unpredictability 
and creativity. Using a palette of bright colors and geometric transformations, 
this project crafts unique patterns across the canvas.
*/

// Values you can modify
const width = 125;                                                  // Width of the canvas
const height = 125;                                                 // Height of the canvas
const sizes = [width, height];                                      // List of sizes
const amount = sizes[createRandIntInRange(sizes.length)] / 2        // Amount of shapes to draw
const spiralSize = 2;                                               // Maximal size of the spiral
const spiralMax = 10;                                               // Maximal amount of spirals
const strokeMaxWidth = Math.min(width, height) / 30;                // Maximal width of the lines
const drawCanvasEdge = true;                                        // Draw the edge of the canvas
const colorAmount = Math.min(width, height) / 2;                    // Amount of colors to generate
const G = 1.618;                                                    // Golden ratio
let R = 1;                                                          // Radius of the spiral

// Don't modify these values or code will not work
const t = new bt.Turtle();                                          // Used to draw spirals
const k = new bt.Turtle();                                          // Used to draw the edge of the canvas

setDocDimensions(width, height);

// Custom functions to create random float or int
function createRandInRange(i) {                                                    
  let currentValue = Math.random() * i;                             // Generate a random float between 0 and i
  return Math.min(currentValue, i);                                 // Ensure the value stays within the range
}

function createRandIntInRange(i) {
  let currentValue = Math.random() * i;                             // Generate a random float between 0 and i
  return Math.floor(currentValue);                                  // Round down to the nearest whole number to ensure an integer result
}

// Function to generate a single random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to generate an array of random colors
function generateColorsList(numColors) {
  var colors = [];
  for (var i = 0; i < numColors; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

// Generate a list of random colors
var colorsList = generateColorsList(colorAmount);

// Prevent lines to be bigger then canvas ( I used this before I found the cut function, so I kept it)
function setSize(maxValue) {
  var j = sizes[createRandIntInRange(sizes.length)];

  if (j > maxValue) {
    return j - (j - maxValue);
  } else {
    return j;
  }
}

// Generate shape with n sides
const shape = (n, size) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) t.forward(size).right(360 / n)
  return t.lines()
}

// Square size of canvas
for (let j = 0; j < 4; j++) {
  k.forward(Math.min(width, height));
  k.left(90);
}

// Create shape for cutting everything outside of canvas
const edge = bt.translate(
  bt.originate(
    k.lines()
  ),
  [width / 2, height / 2]
)

function drawShape() {
  drawLines(
    // Geometrical modifications of shape
    bt.cut(
      bt.rotate(
        bt.translate(
          shape(createRandIntInRange(10), createRandInRange(width / 10)),
          [createRandInRange(width), createRandInRange(height)]
        ),
        createRandInRange(360)
      ), edge
    ), {
      stroke: colorsList[createRandIntInRange(colorsList.length)],
      width: createRandInRange(strokeMaxWidth),
      fill: colorsList[createRandIntInRange(colorsList.length)]
    }
  )
}

function drawSpiral() {
  let rnd = createRandIntInRange(spiralMax)
    t.down();

    for (let i = 0; i < rnd; i++) {

      t.arc(90, R);                                                 // Draw a segment of a circle

      R *= G;                                                       // Update radius for next iteration
    }
    drawLines(
      // Geometrical modifications of spiral
      bt.cut(
        bt.scale(
          bt.rotate(
            bt.translate(
              bt.originate(
                t.lines()
              ),
              [createRandInRange(width), createRandInRange(height)]
            ),
            createRandInRange(360)
          ),
          createRandInRange(spiralSize)
        ), edge
      ), {
        stroke: colorsList[createRandIntInRange(colorsList.length)], //"#d4af37",
        width: createRandInRange(strokeMaxWidth),
      }
    )
    R = 1
}

function drawLine() {
  drawLines(
    bt.cut(
      [
        [
          [createRandInRange(setSize(width)), createRandInRange(setSize(height))],
          [createRandInRange(setSize(width)), createRandInRange(setSize(height))],
        ]
      ], edge
    ), {
      stroke: colorsList[createRandIntInRange(colorsList.length)],
      width: createRandInRange(strokeMaxWidth)
    });
}

// Create some random shapes and draw them
for (let i = 0; i < amount; i++) {
  let rnd = createRandIntInRange(2.1)

  // Random shapes
  if (rnd == 1) {
    drawShape();
  }

  // Random spirals
  if (rnd == 2) {
    drawSpiral();
  }

  // Random lines
  if (rnd == 0) {
    drawLine();
  }
}

// Draw edge of canvas
if (drawCanvasEdge) {
  drawLines(bt.translate(
    bt.originate(
      k.lines()
    ),
    [width / 2, height / 2]
  ))
}


//drawLines([
//[
//[createRandInRange(height), createRandInRange(width)],
//[createRandInRange(width), createRandInRange(height)],
//]
//])