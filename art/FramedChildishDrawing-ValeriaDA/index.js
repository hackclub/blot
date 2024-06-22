/*
@title: Framed Childish Drawing
@author: Valeria DA
@snapshot: snapshot1.png
*/



// Set canvas dimensions
const width = 250; // Width of the canvas (changeable)
const height = 200; // Height of the canvas (changeable)

setDocDimensions(width, height); // Function to set document dimensions for drawing

// Store final lines here (to be drawn on the canvas)
const finalLines = [];

// Outer rectangle
const outerWidth = 150; // Width of the outer rectangle (changeable)
const outerHeight = 100; // Height of the outer rectangle (changeable)
const outerX = (width - outerWidth) / 2; // X-coordinate of the outer rectangle's top-left corner
const outerY = (height - outerHeight) / 2; // Y-coordinate of the outer rectangle's top-left corner

// Define points of the outer rectangle
const outerRectangle = [
  [outerX, outerY], // Top-left corner of the outer rectangle
  [outerX + outerWidth, outerY], // Top-right corner of the outer rectangle
  [outerX + outerWidth, outerY + outerHeight], // Bottom-right corner of the outer rectangle
  [outerX, outerY + outerHeight], // Bottom-left corner of the outer rectangle
  [outerX, outerY] // Closing the path by returning to the top-left corner
];
finalLines.push(outerRectangle); // Add outer rectangle points to final lines

// Inner rectangle (smaller rectangle inside)
const innerWidth = 130; // Width of the inner rectangle (changeable)
const innerHeight = 80; // Height of the inner rectangle (changeable)
const innerX = (width - innerWidth) / 2; // X-coordinate of the inner rectangle's top-left corner
const innerY = (height - innerHeight) / 2; // Y-coordinate of the inner rectangle's top-left corner

// Define points of the inner rectangle
const innerRectangle = [
  [innerX, innerY], // Top-left corner of the inner rectangle
  [innerX + innerWidth, innerY], // Top-right corner of the inner rectangle
  [innerX + innerWidth, innerY + innerHeight], // Bottom-right corner of the inner rectangle
  [innerX, innerY + innerHeight], // Bottom-left corner of the inner rectangle
  [innerX, innerY] // Closing the path by returning to the top-left corner
];
finalLines.push(innerRectangle); // Add inner rectangle points to final lines


// Function to set document dimensions for drawing
setDocDimensions(width, height);

// House dimensions and positions
const houseWidth = 30; // Width of the house
const houseHeight = 20; // Height of the house
const houseX = (0, 150); // X-coordinate of the top-left corner of the house
const houseY = (0, 60); // Y-coordinate of the top-left corner of the house

// hanger
const hangerWidth = 90; // Width 
const hangerHeight = 30; // Height
const hangerX = (80); // X-coordinate of the top-left corner of the roof
const hangerY = (0, 150); // Y-coordinate of the top-left corner of the roof


//curves

const curve = bt.catmullRom([[150, 80], [165, 95], [180, 80]])

drawLines([curve])


const curvee = bt.catmullRom([[150, 80], [150, 90], [155, 90],[155,87]])

drawLines([curvee])



//nonrandomsmoke


const smokey = bt.catmullRom([[152, 91], [150, 100], [159, 114]])

drawLines([smokey])

const smokeey = bt.catmullRom([[154, 91], [160, 98], [167, 102],[166,113]])

drawLines([smokeey])

const smokeeey = bt.catmullRom([[150, 90], [143, 101], [150, 112],[142,120]])

drawLines([smokeeey])



//random smoke

// Function to generate random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Original fixed starting point
const startPoint = [154, 90];

// Function to generate random offsets for control points
function generateRandomPath(startPoint) {
  const path = [startPoint];
  const numPoints = getRandomInt(1, 3); // Randomly choose 3 or 4 control points
  
  for (let i = 0; i < numPoints; i++) {
    // Generate random offsets within a range
    const randomOffsetX = getRandomInt(-23, 25);
    const randomOffsetY = getRandomInt(22, 21);
    
    // Calculate control points relative to the start point
    const controlPointX = startPoint[0] + randomOffsetX;
    const controlPointY = startPoint[1] + randomOffsetY;
    
    // Add control points to the path
    path.push([controlPointX, controlPointY]);
  }
  
  return path;
}

// Generate random paths
const smoke = bt.catmullRom(generateRandomPath(startPoint));
const smokee = bt.catmullRom(generateRandomPath(startPoint));
const smokeee = bt.catmullRom(generateRandomPath(startPoint));

// Assuming drawLines function is defined somewhere
drawLines([smoke]);
drawLines([smokee]);
drawLines([smokeee]);

//butterfly
const fly = bt.catmullRom([[60, 78], [72, 116], [105, 90],[131,106],[150,76]])

drawLines([fly])



//half a heart button

const firstheart = bt.catmullRom([[125, 180], [100, 195], [125, 180],[100,157]])

drawLines([firstheart])

const firstheartt = bt.catmullRom([[125, 180], [150, 195], [125, 180],[150,157]])

drawLines([firstheartt])


// Define points of the house (adjusted for rotation)
const houseShape = [
  [houseX, houseY + houseHeight], // Bottom-left corner of the house
  [houseX + houseWidth, houseY + houseHeight], // Bottom-right corner of the house
  [houseX + houseWidth, houseY], // Top-right corner of the house
  [houseX, houseY], // Top-left corner of the house
  [houseX, houseY + houseHeight] // Closing the path by returning to the bottom-left corner
];
finalLines.push(houseShape); // Add house points to final lines

// Define points of the roof (adjusted for rotation)
const roofShape = [
  [hangerX, hangerY], // Top-left corner of the roof
  [hangerX + hangerWidth / 2, hangerY + hangerHeight], // Top-middle corner of the roof
  [hangerX + hangerWidth, hangerY], // Top-right corner of the roof
  [hangerX, hangerY] // Closing the path by returning to the top-left corner
];
finalLines.push(roofShape); // Add roof points to final lines

// Door dimensions and positions
const doorWidth = 5; // Width of the door
const doorHeight = 7; // Height of the door
const doorX = (0, 170); // X-coordinate of the top-left corner of the door
const doorY = (0, 60); // Y-coordinate of the top-left corner of the door

// Define points of the door (adjusted for rotation)
const doorShape = [
  [doorX, doorY + doorHeight], // Bottom-left corner of the door
  [doorX + doorWidth, doorY + doorHeight], // Bottom-right corner of the door
  [doorX + doorWidth, doorY], // Top-right corner of the door
  [doorX, doorY], // Top-left corner of the door
  [doorX, doorY + doorHeight] // Closing the path by returning to the bottom-left corner
];
finalLines.push(doorShape); // Add door points to final lines

// Window dimensions and positions
const windowSize = 8; // Size of the square window
const windowX = (0, 155); // X-coordinate of the top-left corner of the window
const windowY = (0, 68); // Y-coordinate of the top-left corner of the window

// Define points of the window (adjusted for rotation)
const windowShape = [
  [windowX, windowY + windowSize], // Bottom-left corner of the window
  [windowX + windowSize, windowY + windowSize], // Bottom-right corner of the window
  [windowX + windowSize, windowY], // Top-right corner of the window
  [windowX, windowY], // Top-left corner of the window
  [windowX, windowY + windowSize] // Closing the path by returning to the bottom-left corner
];
finalLines.push(windowShape); // Add window points to final lines

// Draw all shapes on the canvas
drawLines(finalLines); // Function to draw all lines (house, roof, door, window) on the canvas



// Circles (design elements)
const circleRadius = 4; // Radius of the circles (changeable)
const circleSpacingX = 1; // Horizontal spacing between circles (changeable)
const circleSpacingY = 1; // Vertical spacing between circles (changeable)

// Define positions for circles forming a rectangle between the inner and outer rectangles
const circles = [];

// Top and Bottom Rows of Circles
for (let i = 1; i <= 5; i++) {
  const topY = innerY - circleRadius - circleSpacingY; // Y-coordinate for circles in the top row
  const bottomY = innerY + innerHeight + circleRadius + circleSpacingY; // Y-coordinate for circles in the bottom row
  circles.push([innerX + i * (innerWidth / 6), topY]); // Top row circles (evenly spaced horizontally)
  circles.push([innerX + i * (innerWidth / 6), bottomY]); // Bottom row circles (evenly spaced horizontally)
}

// Left and Right Columns of Circles
for (let i = 1; i <= 3; i++) {
  const leftX = innerX - circleRadius - circleSpacingX; // X-coordinate for circles in the left column
  const rightX = innerX + innerWidth + circleRadius + circleSpacingX; // X-coordinate for circles in the right column
  circles.push([leftX, innerY + i * (innerHeight / 4)]); // Left column circles (evenly spaced vertically)
  circles.push([rightX, innerY + i * (innerHeight / 4)]); // Right column circles (evenly spaced vertically)
}

// Add circles to final lines
circles.forEach(circle => {
  const [cx, cy] = circle;
  finalLines.push(createCirclePoints(cx, cy, circleRadius)); // Create points for each circle and add to final lines
});

// Function to create points for a circle
function createCirclePoints(centerX, centerY, radius) {
  const points = [];
  const segments = 16; // Number of segments to approximate the circle (changeable)

  // Calculate points around the circle
  for (let i = 0; i <= segments; i++) {
    const angle = (Math.PI / segments) * 2 * i; // Angle for each segment of the circle
    const x = centerX + radius * Math.cos(angle); // X-coordinate of the point on the circle
    const y = centerY + radius * Math.sin(angle); // Y-coordinate of the point on the circle
    points.push([x, y]); // Add the point to the list of points for the circle
  }

  return points; // Return the list of points that form the circle
}

// Draw all shapes on the canvas
drawLines(finalLines); // Function to draw all lines (rectangles and circles) on the canvas