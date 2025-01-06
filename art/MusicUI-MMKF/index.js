/*
@title: MusicUI
@author: MMKF
@snapshot: snapshot0.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const numVisualizers = 18; // Variable that controls the number of visualizer boxes
const textScale = 2.5; // Size of text
const customName = "noCustomText"; // If set to "noCustomText", then the custom text will not be used. If it is set to something else, then use instead of randomly genorated name.
// Wordlists for random name generation
const firstWordList = ["alpha", "beta", "gamma", "delta", "echo", "zeta", "theta", "kappa", "lambda", "sigma"];
const secondWordList = ["wave", "stream", "light", "pulse", "ray", "spark", "trail", "flow", "beam", "path"];


// Visualizer dimensions and layout
const visualizerBoxStartX = 10; // Starting X position for the visualizer box
const visualizerBoxEndX = 111; // Ending X position for the visualizer box
const visualizerBottomY = 55; // Bottom Y position for visualizer bars
const visualizerTopY = 85; // Top Y position for visualizer bars
const visualizerBoxWidth = visualizerBoxEndX - visualizerBoxStartX - 1; // Total width of the visualizer box
const visualizerWidth = visualizerBoxWidth / numVisualizers; // Dynamic width for each visualizer
// Randomized variable for progress indicator box
const indicator_d = bt.randInRange(10, 109);
// Randomized play/pause button
const isPlaying = bt.randIntInRange(0, 1); // if 1 then playing else paused
// Random art box above the visualizer box
const artBoxX = visualizerBoxStartX; // Align with the visualizer box
const artBoxY = visualizerTopY + 5; // Position above the visualizer box
const artBoxWidth = 20; // Match the visualizer box width
const artBoxHeight = 20; // Height of the art box

// Store final lines here
const finalLines = [];

// Function to generate a random name using two wordlists
function generateRandomName() {
  for (let attempts = 0; attempts < 100; attempts++) {
    const firstWord = firstWordList[Math.floor(Math.random() * firstWordList.length)];
    const secondWord = secondWordList[Math.floor(Math.random() * secondWordList.length)];
    const combinedName = firstWord + secondWord;

    if (combinedName.length <= 12) { // Make sure the text is not too long 
      return combinedName;
    }
  }
  // Fallback to a single random word if no valid combination is found (should not happen with the provided wordlist)
  return firstWordList[Math.floor(Math.random() * firstWordList.length)];
}

// Generate a random name
const randomName = generateRandomName();

// Calculating the orientation of 3 points, used to to check if lines overlap
function orientation(p, q, r) {
  const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
  if (val === 0) return 0; 
  return (val > 0) ? 1 : 2; // 1 = Clockwise, 2 = Counterclockwise
}

// Function to check if two line segments intersect
function doIntersect(p1, q1, p2, q2) {
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;
  return false;
}

// Function to check if a point is on a segment
function onSegment(p, q, r) {
  return (q[0] <= Math.max(p[0], r[0]) && q[0] >= Math.min(p[0], r[0]) &&
    q[1] <= Math.max(p[1], r[1]) && q[1] >= Math.min(p[1], r[1]));
}

// Function to check how many intersections a line has with existing lines
function lineIntersectionCount(line, lines) {
  let count = 0;
  for (const otherLine of lines) {
    if (doIntersect(line[0], line[1], otherLine[0], otherLine[1])) {
      count++;
    }
  }
  return count;
}

// Fixed shapes
const box = [
  [4, 115],
  [117, 115],
  [117, 30],
  [5, 30],
  [4, 115]
];

const progress_line = [
  [10, 45],
  [111, 45]
];

const visuliser_box = [
  [visualizerBoxStartX, visualizerTopY],
  [visualizerBoxEndX, visualizerTopY],
  [visualizerBoxEndX, visualizerBottomY],
  [visualizerBoxStartX, visualizerBottomY],
  [visualizerBoxStartX, visualizerTopY]
];

const progress_box = [
  [indicator_d + 2, 48],
  [indicator_d + 2, 42],
  [indicator_d, 42],
  [indicator_d, 48],
  [indicator_d + 2, 48]
];

// Add fixed shapes to final lines
finalLines.push(box, progress_line, visuliser_box, progress_box);

// Randomised play or pause buttion
if (isPlaying == 1) {
  const play = [
    [60, 33],
    [60, 40],
    [66, 36.5],
    [60, 33]
  ];
  finalLines.push(play);
} else {
  const pauseLeft = [
    [60, 33],
    [60, 40],
    [62, 40],
    [62, 33],
    [60, 33]
  ];
  const pauseRight = [
    [63, 33],
    [63, 40],
    [65, 40],
    [65, 33],
    [63, 33]
  ];
  finalLines.push(pauseLeft, pauseRight);
}

// Left skip button
const skipLeft = [
  [56, 33],
  [52, 36.5],
  [56, 40],
  [56, 33]
];

const skipLeftBar = [
  [50, 33],
  [50, 40],
  [52, 40],
  [52, 33],
  [50, 33]
];

// Right skip button
const skipRight = [
  [68, 33],
  [68, 40],
  [72, 36.5],
  [68, 33]
];

const skipRightBar = [
  [72, 33],
  [74, 33],
  [74, 40],
  [72, 40],
  [72, 33]
];

finalLines.push(skipLeft, skipLeftBar, skipRight, skipRightBar);

// Creating the visualizer bars depending on the numVisualizer 
for (let i = 0; i < numVisualizers; i++) {
  const xStart = visualizerBoxStartX +1 + i * visualizerWidth;
  const height = bt.randInRange(56, 83);

  const vis = [
    [xStart, height],
    [xStart + visualizerWidth - 1, height],
    [xStart + visualizerWidth - 1, visualizerBottomY],
    [xStart, visualizerBottomY],
    [xStart, height]
  ];

  finalLines.push(vis);
}

// Draw the art box
const artBox = [
  [artBoxX, artBoxY],
  [artBoxX + artBoxWidth, artBoxY],
  [artBoxX + artBoxWidth, artBoxY + artBoxHeight],
  [artBoxX, artBoxY + artBoxHeight],
  [artBoxX, artBoxY]
];
finalLines.push(artBox);

// Generate random art inside the art box with overlap prevention
const artShapes = [];
const maxOverlaps = 4;
const maxAttempts = 100; // Shouldn't be needed, but here just in case
for (let i = 0; i < 10; i++) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const shapeType = bt.randIntInRange(0, 2); // 0 = line, 1 = circle, 2 = square
    if (shapeType === 0) {
      // Random line
      const x1 = bt.randInRange(artBoxX, artBoxX + artBoxWidth);
      const y1 = bt.randInRange(artBoxY, artBoxY + artBoxHeight);
      const x2 = bt.randInRange(artBoxX, artBoxX + artBoxWidth);
      const y2 = bt.randInRange(artBoxY, artBoxY + artBoxHeight);

      const newLine = [[x1, y1], [x2, y2]];
      if (lineIntersectionCount(newLine, artShapes) <= maxOverlaps) {
        artShapes.push(newLine);
        finalLines.push(newLine);
        break;
      }
    } else if (shapeType === 1) {
      // Lazy circle
      const cx = bt.randInRange(artBoxX + 5, artBoxX + artBoxWidth - 5);
      const cy = bt.randInRange(artBoxY + 5, artBoxY + artBoxHeight - 5);
      const radius = bt.randInRange(3, Math.min(artBoxWidth, artBoxHeight) / 4);
      const segments = 12; // Number of segments in the circle
      const circleLines = [];

      for (let j = 0; j < segments; j++) {
        const angle1 = (j * 2 * Math.PI) / segments;
        const angle2 = ((j + 1) * 2 * Math.PI) / segments;

        const x1 = cx + radius * Math.cos(angle1);
        const y1 = cy + radius * Math.sin(angle1);
        const x2 = cx + radius * Math.cos(angle2);
        const y2 = cy + radius * Math.sin(angle2);

        circleLines.push([[x1, y1], [x2, y2]]);
      }

      if (circleLines.every(line => lineIntersectionCount(line, artShapes) <= maxOverlaps)) {
        artShapes.push(...circleLines);
        finalLines.push(...circleLines);
        break;
      }
    } else if (shapeType === 2) {
      // Random square
      const x1 = bt.randInRange(artBoxX, artBoxX + artBoxWidth - 5);
      const y1 = bt.randInRange(artBoxY, artBoxY + artBoxHeight - 5);
      const side = bt.randInRange(2, Math.min(artBoxWidth, artBoxHeight) / 4);

      const newSquare = [
        [x1, y1],
        [x1 + side, y1],
        [x1 + side, y1 + side],
        [x1, y1 + side],
        [x1, y1]
      ];
      artShapes.push(newSquare);
      finalLines.push(newSquare);
      break;
    }
    attempts++;
  }
}

// Draw random name to the right of the art box
const textX = artBoxX + artBoxWidth + 5; 
const textY = artBoxY + artBoxHeight / 2;
if (customName=="noCustomText") {
  finalLines.push(...bt.text(randomName, [textX, textY], textScale));
} else {
  finalLines.push(...bt.text(customName, [textX, textY], textScale));
}

// Draw all lines
drawLines(finalLines);
