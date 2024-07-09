/*
@title: Framed Childish Drawing
@author: Valeria DA
@snapshot: snapshot1.png
*/

// Set canvas dimensions
const width = 250; // Width of the canvas (changeable)
const height = 200; // Height of the canvas (changeable)

setDocDimensions(width, height); // Function to set document dimensions for drawing


// Function to generate a random color from a predefined set of colors
function getRandomColorFromArray(colorArray) {
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}

// Predefined array of color choices
const colorChoices = ["lightblue", "lightgreen", "lightyellow", "lightpink", "lightcoral", "lightskyblue", "lightseagreen"];
const colorChoices1 = ["lightblue", "darkblue"];
const colorChoices2 = ["lightgreen", "darkgreen"];
const colorChoices3 = ["gray", "white", "black"];
const colorChoices4 = [ "black", "dark blue", "red", "purple"];
const colorChoices5 = [ "lightpink", "brown", "gray", "light yellow"];

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

// Add fill color to the outer rectangle (randomly chosen from colorChoices)
drawLines([outerRectangle], { fill: getRandomColorFromArray(colorChoices) });


// Define dimensions and position for the inner rectangle
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

// Add fill color to the inner rectangle (randomly chosen from colorChoices)
drawLines([innerRectangle], { fill: getRandomColorFromArray(colorChoices1) });


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

drawLines([curve], { fill: "brown", width: 2 });

const curvee = bt.catmullRom([[150, 80], [150, 90], [155, 90],[155,87]])

drawLines([curvee], { fill: "beige", width: 2 });



// Function to generate random offset within a range
function randomOffset(range) {
  return Math.random() * range - range / 2;
}

// Function to randomize coordinates
function randomizeCoordinates(coords, range) {
  return coords.map(coord => [
    coord[0] + randomOffset(range),
    coord[1] + randomOffset(range)
  ]);
}

// Random smoke paths with controlled randomness
const range = 5;

const originalSmokey = [[152, 91], [150, 100], [159, 114]];
const originalSmokeey = [[154, 91], [160, 98], [167, 102], [166, 113]];
const originalSmokeeey = [[150, 90], [143, 101], [150, 112], [142, 120]];

const randomizedSmokey = bt.catmullRom(randomizeCoordinates(originalSmokey, range));
const randomizedSmokeey = bt.catmullRom(randomizeCoordinates(originalSmokeey, range));
const randomizedSmokeeey = bt.catmullRom(randomizeCoordinates(originalSmokeeey, range));

drawLines([randomizedSmokey], { stroke: getRandomColorFromArray(colorChoices3), width: 3 });
drawLines([randomizedSmokeey], { stroke: getRandomColorFromArray(colorChoices3), width: 3 });
drawLines([randomizedSmokeeey], { stroke: getRandomColorFromArray(colorChoices3), width: 3 });


// Define a new function with a different name or consolidate if already defined
if (typeof randomOffset !== 'function') {
  function randomOffset(range) {
    return Math.random() * range - range / 2;
  }
}

// Original points of the fly curve
const originalFlyPoints = [[60, 60], [73, 119], [104, 87], [129, 110], [150, 60]];

// Randomize the coordinates of the fly curve with controlled randomness
const randomizedFlyPoints = originalFlyPoints.map(point => [
  point[0] + randomOffset(5), // Use randomOffset function
  point[1] + randomOffset(5)  // Use randomOffset function
]);

// Generate the fly curve using the randomized points
const fly = bt.catmullRom(randomizedFlyPoints);

// Draw the fly curve with a randomly chosen fill color from colorChoices2
drawLines([fly], { fill: getRandomColorFromArray(colorChoices2) });



//half a heart button

const firstheart = bt.catmullRom([[125, 180], [100, 195], [125, 180],[100,157]])

drawLines([firstheart], { stroke: "red", width: 3 });

const firstheartt = bt.catmullRom([[125, 180], [150, 195], [125, 180],[150,157]])

drawLines([firstheartt], { stroke: "red", width: 3 });


// Define points of the house shape (adjusted for rotation)
const houseShape = [
  [houseX, houseY + houseHeight], // Bottom-left corner of the house
  [houseX + houseWidth, houseY + houseHeight], // Bottom-right corner of the house
  [houseX + houseWidth, houseY], // Top-right corner of the house
  [houseX, houseY], // Top-left corner of the house
  [houseX, houseY + houseHeight] // Closing the path by returning to the bottom-left corner
];

// Add fill color to the house shape
drawLines([houseShape], { fill: "white" }); // Change "lightgreen" to the color you prefer


// Define points of the roof (adjusted for rotation)
const roofShape = [
  [hangerX, hangerY], // Top-left corner of the roof
  [hangerX + hangerWidth / 2, hangerY + hangerHeight], // Top-middle corner of the roof
  [hangerX + hangerWidth, hangerY], // Top-right corner of the roof
  [hangerX, hangerY] // Closing the path by returning to the top-left corner
];

// Add fill color to the roof (randomly chosen from colorChoices)
drawLines([roofShape], { stroke: "red", width: 3 }); 


// Define door parameters
const doorWidth = 5; // Width of the door
const doorHeight = 7; // Height of the door
const doorX = 170; // X-coordinate of the top-left corner of the door
const doorY = 60; // Y-coordinate of the top-left corner of the door

// Define the points of the door shape
const doorShape = [
  [doorX, doorY + doorHeight],               // Bottom-left corner of the door
  [doorX + doorWidth, doorY + doorHeight],   // Bottom-right corner of the door
  [doorX + doorWidth, doorY],                // Top-right corner of the door
  [doorX, doorY],                            // Top-left corner of the door
  [doorX, doorY + doorHeight]                // Closing the path by returning to the bottom-left corner
];

// Draw the door
drawLines([doorShape], { fill: getRandomColorFromArray(colorChoices5) });


// Define window parameters
const windowSize = 8; // Size of the square window
const windowX = 155; // X-coordinate of the top-left corner of the window
const windowY = 68; // Y-coordinate of the top-left corner of the window

// Define the window as an array of coordinates
const window = [
  [windowX, windowY],                         // Top-left corner
  [windowX + windowSize, windowY],            // Top-right corner
  [windowX + windowSize, windowY + windowSize], // Bottom-right corner
  [windowX, windowY + windowSize]             // Bottom-left corner
];

// Draw the window
drawLines([window], { fill: getRandomColorFromArray(colorChoices4) });


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
