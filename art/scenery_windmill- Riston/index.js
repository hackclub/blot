/*
@title: scenery_windmill
@author: Riston
@snapshot: b1.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();
const rr = bt.randInRange;
const sunSize = rr(15, 25);

//function for trees
function drawTree(x,y,scale){
  //const t = new bt.Turtle();
  t.up();
  t.goTo([x,y])
  t.down()
  for (let i = 0; i < 5; i++){
    t.goTo([x,y+scale])
    t.goTo([x+scale/6,y+scale*0.5])
    t.goTo([x,y+scale])
    t.goTo([x-scale/6,y+scale*0.5])
    t.goTo([x,y+scale])
    scale=scale-1
  }

  t.goTo([x,y])
  return (t)
}



//draw mountain
t.up();
var x = 0;
var y = width * rr(0.3, 0.5);
t.goTo([x, y])
t.down();
const mountains = Math.floor(rr(2, 4));
for (let i = 0; i < mountains; i++) {
  x = width / mountains * i
  for (let i = 0; i < width / (mountains * 2); i++) {
    x = x + 1
    var treeSeed=Math.floor(rr(5,20));
    if(treeSeed==9){
      t.up();
      let tree = drawTree(x,y,treeSeed);
      t.down();
      t.goTo([x,y])
    }
    y = y + rr(-1, 3)
    t.goTo([x, y])
  }
  for (let i = 0; i < width / (mountains * 2.5); i++) {
    var treeSeed=Math.floor(rr(5,20));
    if(treeSeed==9){
      t.up();
      let tree = drawTree(x,y,treeSeed);
      t.down();
      t.goTo([x,y])
    }    
    x = x + 1
    y = y + rr(-3, 1)
    t.goTo([x, y])
  }

}

const squareSize = 20; // Size of the square
const centerX = width / 2 + 10;
const centerY = height / 2 - 20;
const halfSize = squareSize / 2;

// Function to draw and fill a square
function drawAndFillSquare(t, centerX, centerY, halfSize) {
  t.up();
  t.goTo([centerX - halfSize, centerY - halfSize]);
  t.down();
  
  // Draw the square
  t.goTo([centerX + halfSize, centerY - halfSize]);
  t.goTo([centerX + halfSize, centerY + halfSize]);
  t.goTo([centerX - halfSize, centerY + halfSize]);
  t.goTo([centerX - halfSize, centerY - halfSize]);
  
  // Fill the square by drawing lines inside it(this creates the texture inside the square base)
  // for (let i = 1; i < squareSize; i++) {
  //   t.goTo([centerX - halfSize, centerY - halfSize + i]);
  //   t.goTo([centerX + halfSize, centerY - halfSize + i]);
  // }
}

// Call the function to draw and fill the square
drawAndFillSquare(t, centerX, centerY, halfSize);

const rectangleWidth = 4;
const rectangleLength = 4;
const halfRectangleWidth = rectangleWidth / 2;
const halfRectangleLength = rectangleLength / 2;
t.up();
t.goTo([centerX  - halfRectangleLength, centerY  - halfRectangleWidth ]);
t.down();
t.goTo([centerX + halfRectangleLength, centerY - halfRectangleWidth]);
t.goTo([centerX + halfRectangleLength, centerY + halfRectangleWidth]);
t.goTo([centerX - halfRectangleLength, centerY + halfRectangleWidth]);
t.goTo([centerX - halfRectangleLength, centerY - halfRectangleWidth]);





// Draw the isosceles trapezium
const baseWidth = 20; // 
const topWidth = 10; // 
const centerX1 = width / 2 + 10;
const centerY1 = height / 2  ;
const halfBaseWidth = baseWidth / 2;
const halfTopWidth = topWidth / 2;

t.up();
t.goTo([centerX - halfBaseWidth, centerY - halfBaseWidth]);
t.down();
t.goTo([centerX1 + halfBaseWidth, centerY1 - halfBaseWidth]);
t.goTo([centerX1 + halfTopWidth, centerY1+ halfTopWidth]); // Parallel side
t.goTo([centerX1 - halfTopWidth, centerY1 + halfTopWidth]); // Parallel side
t.goTo([centerX1 - halfBaseWidth, centerY1 - halfBaseWidth]);

const squareSide = 5; // Length of the square's side
const squareX = 72; // X-coordinate of the square's center
const squareY = 70; // Y-coordinate of the square's center
const angles = [0, 15, 30, 45, 60, 75, 90]; // Array of possible angles
const randomAngle = angles[Math.floor(Math.random() * angles.length)]; // Selects a random angle

function drawRotatedSquareWithRectangles(t, squareX, squareY, sideLength, angle) {
  const radians = angle * (Math.PI / 180);
  const points = []; 

  // Calculate the square's vertices
  for (let i = 0; i < 4; i++) {
    points.push([
      squareX + sideLength * Math.cos(radians + i * Math.PI / 2),
      squareY + sideLength * Math.sin(radians + i * Math.PI / 2)
    ]);
  }

  t.up();
  t.goTo(points[0]); // Move to the first vertex
  t.down();
  for (let i = 1; i <= points.length; i++) {
    t.goTo(points[i % points.length]); // Draw each side of the square
  }

  // Draw rectangles on each vertex of the square
  const rectangleWidth = 4;
  const rectangleLength = 15; 
  points.forEach((vertex, index) => {
    const rectanglePoints = [
      vertex, 
      [vertex[0] + rectangleLength * Math.cos(radians + index * Math.PI / 2), vertex[1] + rectangleLength * Math.sin(radians + index * Math.PI / 2)], // Length side
      [vertex[0] + rectangleLength * Math.cos(radians + index * Math.PI / 2) + rectangleWidth * Math.sin(radians + index * Math.PI / 2), vertex[1] + rectangleLength * Math.sin(radians + index * Math.PI / 2) - rectangleWidth * Math.cos(radians + index * Math.PI / 2)], // Opposite vertex
      [vertex[0] + rectangleWidth * Math.sin(radians + index * Math.PI / 2), vertex[1] - rectangleWidth * Math.cos(radians + index * Math.PI / 2)], // Width side
      vertex 
    ];

    // Draw the rectangle
    t.up();
    t.goTo(rectanglePoints[0]);
    t.down();
    for (let i = 1; i <= rectanglePoints.length; i++) {
      t.goTo(rectanglePoints[i % rectanglePoints.length]);
    }
  });
}

// Call this function to draw the square with rectangles at each vertex at a random angle
drawRotatedSquareWithRectangles(t, squareX, squareY, squareSide, randomAngle);

function drawRandomCircle(t) {
  const radius = rr(5, 10); // Random radius between 5 and 10
  const x = rr(10, 115); 
  const y = rr(80, 118); 
  const steps = 100; 
  const angleStep = (2 * Math.PI) / steps;

  t.up();
  t.goTo([x + radius, y]); // Start at the rightmost point of the circle
  t.down();

  for (let step = 0; step <= steps; step++) {
    const pointX = x + radius * Math.cos(step * angleStep);
    const pointY = y + radius * Math.sin(step * angleStep);
    t.goTo([pointX, pointY]);
  }
}




// Draw a circle at a random position with a random size
drawRandomCircle(t);


const kites = new bt.Turtle();

// Function to draw and fill a kite shape with a tail
function drawAndFillKiteWithTail(t, center, scale, fillColor) {
  const width = scale;
  const height = scale * 1.5; 
  const halfWidth = 1;
  const halfHeight = 2;
  const tailLength = 2; 
  
  // Draw the kite shape
  t.up();
  t.jump([center[0], center[1] + halfHeight]);
  t.down();
  t.goTo([center[0] - halfWidth, center[1]]);
  t.goTo([center[0], center[1] - halfHeight]);
  t.goTo([center[0] + halfWidth, center[1]]);
  t.goTo([center[0], center[1] + halfHeight]);
  
  // Draw the tail of the kite
  for (let i = 1; i <= tailLength; i++) {
    t.goTo([center[0], center[1] - halfHeight - i]);
  }
  drawLines(t.lines(), { fill: fillColor });
}

// Function to generate random kites within specified x ranges
function generateRandomKitesWithinRange(t, numberOfKites, xRanges, yMin, yMax, scale) {
  for (let i = 0; i < numberOfKites; i++) {
    const xRange = xRanges[i % xRanges.length];
    const centerX = bt.randInRange(xRange[0], xRange[1]);
    let centerY = bt.randInRange(yMin, yMax);
    
    // Ensure centerY is not between 0 and 5
    while (centerY >= 0 && centerY <= 5) {
      centerY = bt.randInRange(yMin, yMax);
    }
    
    // Draw and fill the kite with a tail
    drawAndFillKiteWithTail(t, [centerX, centerY], scale, 'black');
  }
}

// Set the number of kites, the y minimum, the y maximum, the x ranges, and the scale
const numberOfKites = 90; 
const yMin = 6;
const yMax = 20;
const xRanges = [[5, 55], [70, 115]]; 
const treeScale = 30;

generateRandomKitesWithinRange(kites, numberOfKites, xRanges, yMin, yMax, treeScale);


bt.join(finalLines, t.lines());



drawLines(finalLines);


