/*
@title: CyberTruck-Viv
@author: Vivaan Shahani
@snapshot: snapshot1.png
*/
const { Turtle, cut, cover, copy, rotate, scale, translate, originate, iteratePoints, resample, join, getAngle, getNormal, bounds, rand, setRandSeed, randInRange, noise, nurbs } = blotToolkit;

const width = 125;
const height = 125;
const tire1x = 10; // quick name to move the tire1 on x-axis
const tire1y = 3; //quick name to move the tire1 on y-axis
const tire2x = -60; // quick name to move the tire2 on x-axis
const tire2y = 4; //quick name to move the tire2 on y-axis
const scaleFactor = 1.4; //adjustable factor to change the size of outline
const cybertruckYOffset = randInRange(-50, -30); // Y offset to move the Cybertruck down

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// Function to generate a random cityscape
function generateCityscape(cybertruckRoofY) {
  const cityLines = [];
  const numBuildings = randInRange(5, 8); // Random number of buildings
  let xPosition = 0;

  for (let i = 0; i < numBuildings; i++) {
    const buildingWidth = randInRange(10, 20);
    const buildingHeight = randInRange(30, 65); // Height of buildings above the Cybertruck's roof
    const yPosition = cybertruckRoofY;

    // Ensure buildings do not exceed document width
    if (xPosition + buildingWidth > width) {
      break; // Stop adding buildings if the next one would exceed the document width
    }

    const building = [
      [xPosition, yPosition],
      [xPosition, yPosition + buildingHeight],
      [xPosition + buildingWidth, yPosition + buildingHeight],
      [xPosition + buildingWidth, yPosition]
    ];

    // Ensure building height does not exceed document height
    if (yPosition + buildingHeight > height) {
      break; // Stop adding buildings if the next one would exceed the document height
    }

    cityLines.push(building);


    // Add windows
    const numWindows = randInRange(2, 5);
    const windowHeight = randInRange(2, 5);
    const windowWidth = randInRange(2, 5);

    // Calculate the maximum number of rows and columns that can fit in the building
    const maxRows = Math.floor((buildingHeight - windowHeight) / (windowHeight + 5));
    const maxCols = Math.floor((buildingWidth - windowWidth) / (windowWidth + 5));

    // Generate a list of all possible window positions
    const positions = [];
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        const posX = xPosition + col * (windowWidth + 5);
        const posY = yPosition + row * (windowHeight + 5);
        positions.push([posX, posY]);
      }
    }

    // Shuffle the positions array to randomize window placement
    for (let k = positions.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [positions[k], positions[j]] = [positions[j], positions[k]];
    }

    // Select a random number of non-overlapping windows from the shuffled positions
    for (let j = 0; j < numWindows && j < positions.length; j++) {
      const [windowX, windowY] = positions[j];

      const window = [
        [windowX + 0.3, windowY],
        [windowX + 0.3, windowY + windowHeight],
        [windowX + 0.3 + windowWidth, windowY + windowHeight],
        [windowX + 0.3 + windowWidth, windowY]
      ];

      cityLines.push(window);
    }

    xPosition += buildingWidth + 0.5; // Ensure buildings are touching but not overlapping
  }

  return cityLines;
}

// Cybertruck roof level (maximum Y coordinate)
const cybertruckRoofY = 84 + cybertruckYOffset + 5; //84 cybertruck roof, plus offset plus safeguard

// Generate cityscape and add to final lines
const cityscape = generateCityscape(cybertruckRoofY);
finalLines.push(...cityscape);

// create the outline
const outline = [
  //back
  [105, 75 + cybertruckYOffset],
  [105, 63 + cybertruckYOffset],
  //wheel2
  [95, 60 + cybertruckYOffset],
  [95, 63 + cybertruckYOffset],
  [90, 68 + cybertruckYOffset],
  [85, 68 + cybertruckYOffset],
  [80, 63 + cybertruckYOffset],
  [80, 60 + cybertruckYOffset],
  //base
  [65, 60 + cybertruckYOffset],
  //wheel1
  [45, 60 + cybertruckYOffset],
  [45, 63 + cybertruckYOffset],
  [40, 68 + cybertruckYOffset],
  [35, 68 + cybertruckYOffset],
  [30, 63 + cybertruckYOffset],
  [30, 60 + cybertruckYOffset],
  //roof and front
  [20, 60 + cybertruckYOffset],
  [20, 70 + cybertruckYOffset],
  [61, 84 + cybertruckYOffset],
  [105, 75 + cybertruckYOffset]
];
const tire1 = [
  [45 - tire1x, 60 - tire1y + cybertruckYOffset],
  [45 - tire1x, 63 - tire1y + cybertruckYOffset],
  [40 - tire1x, 68 - tire1y + cybertruckYOffset],
  [35 - tire1x, 68 - tire1y + cybertruckYOffset],
  [30 - tire1x, 63 - tire1y + cybertruckYOffset],
  [30 - tire1x, 60 - tire1y + cybertruckYOffset],
  [30 - tire1x, 60 - tire1y + cybertruckYOffset],
  [30 - tire1x, 57 - tire1y + cybertruckYOffset],
  [35 - tire1x, 52 - tire1y + cybertruckYOffset],
  [40 - tire1x, 52 - tire1y + cybertruckYOffset],
  [45 - tire1x, 57 - tire1y + cybertruckYOffset],
  [45 - tire1x, 60 - tire1y + cybertruckYOffset]
];
const tire2 = [
  [45 - tire2x, 60 - tire2y + cybertruckYOffset],
  [45 - tire2x, 63 - tire2y + cybertruckYOffset],
  [40 - tire2x, 68 - tire2y + cybertruckYOffset],
  [35 - tire2x, 68 - tire2y + cybertruckYOffset],
  [30 - tire2x, 63 - tire2y + cybertruckYOffset],
  [30 - tire2x, 60 - tire2y + cybertruckYOffset],
  [30 - tire2x, 60 - tire2y + cybertruckYOffset],
  [30 - tire2x, 57 - tire2y + cybertruckYOffset],
  [35 - tire2x, 52 - tire2y + cybertruckYOffset],
  [40 - tire2x, 52 - tire2y + cybertruckYOffset],
  [45 - tire2x, 57 - tire2y + cybertruckYOffset],
  [45 - tire2x, 60 - tire2y + cybertruckYOffset]
];
const window = [
  [20, 73 + cybertruckYOffset],
  [60, 86 + cybertruckYOffset],
  [83, 82 + cybertruckYOffset],
  [83, 76 + cybertruckYOffset],
  [20, 73 + cybertruckYOffset],
];
const windowDetail1 = [
  [35, 77.6 + cybertruckYOffset],
  [34.5, 74 + cybertruckYOffset]
];
const windowDetail2 = [
  [37, 78.2 + cybertruckYOffset],
  [36.5, 74 + cybertruckYOffset]
];
const windowDetail3 = [
  [65, 84.9 + cybertruckYOffset],
  [63, 75 + cybertruckYOffset]
];
const windowDetail4 = [
  [67, 84.6 + cybertruckYOffset],
  [66.5, 75.35 + cybertruckYOffset]
];
const randLineDetail = [
  [122, 76 + cybertruckYOffset],
  [6, 70 + cybertruckYOffset]
];
const door1 = [
  [38.6, 71.7 + cybertruckYOffset],
  [38.6, 56.9 + cybertruckYOffset],
  [38.6, 59 + cybertruckYOffset],
  [58.3, 59 + cybertruckYOffset],
  [58.3, 72.7 + cybertruckYOffset],
  [58.3, 56.9 + cybertruckYOffset],
];
const door2 = [
  [78.3, 73.65 + cybertruckYOffset],
  [78.3, 73 + cybertruckYOffset],
  [78.3, 57 + cybertruckYOffset],
  [78.3, 59 + cybertruckYOffset],
  [86.8, 59 + cybertruckYOffset],
  [58.6, 59 + cybertruckYOffset]
];
const randomDetail2 = [
  [38.6, 56.9 + cybertruckYOffset],
  [86.8, 56.9 + cybertruckYOffset]
];

const headlight = [
  [3, 68.3 + cybertruckYOffset],
  [9, 68.7 + cybertruckYOffset],
  [9, 70 + cybertruckYOffset]
];
const doorHandle1 = [
  [54, 71 + cybertruckYOffset],
  [57, 71 + cybertruckYOffset], // horizontal line for the door handle of the first door
];

const doorHandle2 = [
  [72, 72 + cybertruckYOffset],
  [76, 72 + cybertruckYOffset], // horizontal line for the door handle of the second door
];

// add the polyline to the final lines
const outlineScaled = scale([outline], scaleFactor);

// Add filled polygon for the Cybertruck
const filledOutline = [
  [105, 75 + cybertruckYOffset],
  [105, 63 + cybertruckYOffset],
  [95, 60 + cybertruckYOffset],
  [95, 63 + cybertruckYOffset],
  [90, 68 + cybertruckYOffset],
  [85, 68 + cybertruckYOffset],
  [80, 63 + cybertruckYOffset],
  [80, 60 + cybertruckYOffset],
  [65, 60 + cybertruckYOffset],
  [45, 60 + cybertruckYOffset],
  [45, 63 + cybertruckYOffset],
  [40, 68 + cybertruckYOffset],
  [35, 68 + cybertruckYOffset],
  [30, 63 + cybertruckYOffset],
  [30, 60 + cybertruckYOffset],
  [20, 60 + cybertruckYOffset],
  [20, 70 + cybertruckYOffset],
  [61, 84 + cybertruckYOffset],
  [105, 75 + cybertruckYOffset]
];

// Add polylines to the final lines array
finalLines.push(...outlineScaled);
finalLines.push(tire1);
finalLines.push(tire2);
finalLines.push(window);
finalLines.push(windowDetail1);
finalLines.push(windowDetail2);
finalLines.push(windowDetail3);
finalLines.push(windowDetail4);
finalLines.push(door1);
finalLines.push(door2);
finalLines.push(randLineDetail);
finalLines.push(randomDetail2);
finalLines.push(headlight);
finalLines.push(doorHandle1);
finalLines.push(doorHandle2);

// draw it
drawLines(finalLines);
