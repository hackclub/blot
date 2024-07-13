/*
@title: scenery_windmill
@author: Riston
@snapshot: b1.png
*/
const t = new bt.Turtle();
const width = 125;
const height = 125;
setDocDimensions(width, height);





function drawTinyFlower(t, centerX, centerY, size, color) {
  const halfWidth = size / 2;
  const halfHeight = size * 0.75;
  const tailLength = size * 0.5;

  // Create a single path for the entire flower
  const flowerPath = [
    [centerX, centerY - halfHeight],
    [centerX - halfWidth, centerY],
    [centerX, centerY + halfHeight],
    [centerX + halfWidth, centerY],
    [centerX, centerY - halfHeight],
    [centerX, Math.max(0, centerY - halfHeight - tailLength)]
  ];

  // Draw and fill the flower in one step
drawLines([flowerPath], { fill: color, stroke: 'black', strokeWidth: 0.5 });
}

function drawRandomColorFlowers(count) {
  const tinyFlowerSize = 3.2;
  const colors = ['red', 'blue', 'pink', 'purple', 'white'];
  for (let i = 0; i < count; i++) {
    const randomX = bt.randInRange(10, 115); // Adjusted x-coordinate range
    const randomY = bt.randInRange(10, 63);  // Adjusted y-coordinate range
    const randomColor = colors[Math.floor(bt.randInRange(0, colors.length))];
    
    drawTinyFlower(t, randomX, randomY, tinyFlowerSize, randomColor);
  }
}

// Draw the background layers
const ground = [
  [
    [0, 3 * 0],
    [125, 3 * 0],
    [125, height],
    [0, height]
  ]
];
const top = [
  [
    [0, 3 * height / 4],
    [125, 3 * height / 4],
    [125, height],
    [0, height]
  ]
];
const middle2 = [
  [
    [0, 4.25 * height / 6],
    [125, 4.25 * height / 6],
    [125, height],
    [0, height]
  ]
];
const middle1 = [
  [
    [0, 4 * height / 6],
    [125, 4 * height / 6],
    [125, height],
    [0, height]
  ]
];
const down = [
  [
    [0, 3 * height / 6],
    [125, 3 * height / 6],
    [125, height],
    [0, height]
  ]
];

drawLines(ground, { fill: "#32a467", stroke: "#29636A" });
drawLines(down, { fill: "#dfecf6", stroke: "#F4CA90" });
drawLines(middle1, { fill: "#72aee0", stroke: "#C7B087" });
drawLines(middle2, { fill: "#5693dc", stroke: "#99977E" });
drawLines(top, { fill: "#0149aa", stroke: "#83c0ea" });

// Draw the flowers
drawRandomColorFlowers(125);



const finalLines = [];



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

  // Fill the square
  drawLines(t.lines(), { fill: 'rgb(210, 180, 140)' }); // Light brown color
}

// Draw and fill the square
const squareSize = 20;
const centerX = width / 2 + 10;
const centerY = height / 2 - 20;
const halfSize = squareSize / 2;
drawAndFillSquare(t, centerX, centerY, halfSize);

// Draw the small rectangle
const rectangleWidth = 4;
const rectangleLength = 4;
const halfRectangleWidth = rectangleWidth / 2;
const halfRectangleLength = rectangleLength / 2;
t.up();
t.goTo([centerX - halfRectangleLength, centerY - halfRectangleWidth]);
t.down();
t.goTo([centerX + halfRectangleLength, centerY - halfRectangleWidth]);
t.goTo([centerX + halfRectangleLength, centerY + halfRectangleWidth]);
t.goTo([centerX - halfRectangleLength, centerY + halfRectangleWidth]);
t.goTo([centerX - halfRectangleLength, centerY - halfRectangleWidth]);
drawLines(t.lines(), { fill: 'rgb(210, 180, 140)' });

// Draw the isosceles trapezium
const baseWidth = 20;
const topWidth = 10;
const centerX1 = width / 2 + 10;
const centerY1 = height / 2;
const halfBaseWidth = baseWidth / 2;
const halfTopWidth = topWidth / 2;

t.up();
t.goTo([centerX1 - halfBaseWidth, centerY1 - halfBaseWidth]);
t.down();
t.goTo([centerX1 + halfBaseWidth, centerY1 - halfBaseWidth]);
t.goTo([centerX1 + halfTopWidth, centerY1 + halfTopWidth]);
t.goTo([centerX1 - halfTopWidth, centerY1 + halfTopWidth]);
t.goTo([centerX1 - halfBaseWidth, centerY1 - halfBaseWidth]);
drawLines(t.lines(), { fill: 'rgb(210, 180, 140)' });

// Function to draw rotated square with rectangles
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

  // Draw the square
  t.up();
  t.goTo(points[0]);
  t.down();
  for (let i = 1; i <= points.length; i++) {
    t.goTo(points[i % points.length]);
  }
  drawLines(t.lines(), { fill: 'rgb(210, 180, 140)' });

  // Draw rectangles on each vertex of the square
  const rectangleWidth = 4;
  const rectangleLength = 15;
  points.forEach((vertex, index) => {
    const rectanglePoints = [
      vertex,
      [vertex[0] + rectangleLength * Math.cos(radians + index * Math.PI / 2), vertex[1] + rectangleLength * Math.sin(radians + index * Math.PI / 2)],
      [vertex[0] + rectangleLength * Math.cos(radians + index * Math.PI / 2) + rectangleWidth * Math.sin(radians + index * Math.PI / 2), vertex[1] + rectangleLength * Math.sin(radians + index * Math.PI / 2) - rectangleWidth * Math.cos(radians + index * Math.PI / 2)],
      [vertex[0] + rectangleWidth * Math.sin(radians + index * Math.PI / 2), vertex[1] - rectangleWidth * Math.cos(radians + index * Math.PI / 2)],
      vertex
    ];

    t.up();
    t.goTo(rectanglePoints[0]);
    t.down();
    for (let i = 1; i <= rectanglePoints.length; i++) {
      t.goTo(rectanglePoints[i % rectanglePoints.length]);
    }
    drawLines(t.lines(), { fill: 'rgb(210, 180, 140)' });
  });
}

// Draw the rotated square with rectangles
const squareSide = 5;
const squareX = 72;
const squareY = 70;
const angles = [0, 15, 30, 45, 60, 75, 90];
const randomAngle = angles[Math.floor(Math.random() * angles.length)];
drawRotatedSquareWithRectangles(t, squareX, squareY, squareSide, randomAngle);




bt.join(finalLines, t.lines());

drawLines(finalLines);



drawLines(finalLines);


