/*
@title: Sheet music generator!
@author: s1072489
@snapshot: default.png


/*
  Hiya! This project generates a 2-bar music staff based on an input array of notes and lengths.
*/

// Option for randomly generated notes!
const randomNotes = true

// Define document dimensions
const width = 125;
const height = 50;

setDocDimensions(width, height);

// Define the input for the notes and lengths
/* 
  Only crotchets (quarter notes) and minims (half notes) supported
  1 = crotchet
  2 = minim

  Notes are defined by what line they're on
  Begins on the first line from the top of the staff

  Option to change to using random notes is possible
*/ 

var musicInput = [
  [[5.5, 1], [4, 2], [4.5, 1]],
  [[5, 1], [2.5, 1], [1.5, 2]]
];

if (randomNotes) {
  // Function to generate random numbers rounded to the nearest 0.5
  function randomNote() {
    return Math.round((bt.rand() * 10) + 1) / 2;
  }

  // Function to generate a random rhythm pattern for a bar
  function randomRhythmPattern() {
    const patterns = [
      [1, 2, 1],
      [2, 2],
      [2, 1, 1],
      [1, 1, 2]
    ];
    return patterns[Math.floor(bt.rand() * patterns.length)];
  }

  // Function to generate a random bar with notes
  function generateRandomBar() {
    const rhythm = randomRhythmPattern();
    return rhythm.map(beatLength => [randomNote(), beatLength]);
  }

  // Generate the music input with two bars
  musicInput = [
    generateRandomBar(),
    generateRandomBar()
  ];
}

// Define staff lines
const staffLinesY = [15, 20, 25, 30, 35];

// Store final lines for drawing
const finalLines = [];

// Draw the staff
for (let i = 0; i < staffLinesY.length; i++) {
  finalLines.push([[10, staffLinesY[i]], [115, staffLinesY[i]]]);
}

// Draw the clef
function drawClef(movementx, movementy, scale) {
  const clefPointsTop = [[15.77, 12.15], [15.37, 11.68], [14.87, 11.2], [14.42, 10.88], [13.72, 10.5], [13.25, 10.3], [13.95, 6.88], [14.12, 5.75], [14.17, 5.18], [14.17, 4.63], [14.12, 3.98], [13.95, 3.38], [13.72, 2.88], [13.42, 2.45], [13.15, 2.13], [12.82, 1.85], [12.45, 1.58], [12.05, 1.35], [11.65, 1.2], [11.2, 1.08], [10.65, 0.98], [10.1, 0.95], [9.52, 0.98], [8.92, 1.08], [8.27, 1.28], [7.75, 1.53], [7.27, 1.85], [6.87, 2.18], [6.55, 2.55], [6.32, 2.93], [6.15, 3.45], [6.07, 3.85], [6.1, 4.3], [6.15, 4.75], [6.25, 5.13], [6.47, 5.63], [6.72, 6.0], [7.0, 6.3], [7.32, 6.58], [7.65, 6.73], [7.95, 6.83], [8.22, 6.88], [8.52, 6.88], [9.0, 6.78], [9.42, 6.58], [9.8, 6.3], [10.07, 6.0], [10.32, 5.58], [10.47, 5.15], [10.55, 4.8], [10.55, 4.48], [10.5, 4.18], [10.42, 3.83], [10.25, 3.45], [10.05, 3.18], [9.8, 2.93], [9.47, 2.7], [9.1, 2.55], [8.57, 2.45], [8.27, 2.45], [8.62, 2.1], [9.02, 1.85], [9.52, 1.73], [10.15, 1.65], [10.95, 1.78], [11.77, 2.1], [12.32, 2.45], [12.72, 2.83], [13.07, 3.38], [13.22, 3.9], [13.37, 4.73], [13.37, 5.55], [13.3, 6.33], [12.52, 10.05], [12.35, 10.0], [11.35, 9.85], [10.47, 9.8], [9.9, 9.85], [9.17, 9.95], [8.5, 10.15], [7.7, 10.45], [6.97, 10.88], [5.95, 11.6], [5.38, 12.15], [6.33, 12.15], [6.62, 11.85], [7.62, 11.15], [8.85, 10.68], [10.1, 10.48], [10.87, 10.48], [11.85, 10.68], [12.37, 10.8], [12.09, 12.15], [12.88, 12.15], [13.1, 11.08], [13.53, 11.25], [14.37, 11.85], [14.53, 12.15], [15.77, 12.15]];
  const clefPointsBottom = [[10.4, 0.33], [10.22, 0.28], [9.72, 0.4], [8.92, 0.83], [8.47, 1.18], [8.15, 1.55], [7.82, 1.98], [7.55, 2.45], [7.32, 3.08], [7.2, 3.8], [7.2, 4.2], [7.25, 4.62], [7.37, 5.25], [7.55, 5.88], [7.85, 6.45], [8.07, 6.83], [8.35, 7.23], [8.65, 7.55], [8.97, 7.88], [9.35, 8.15], [9.62, 8.33], [9.9, 8.47], [10.1, 8.58], [10.3, 8.65], [9.67, 12.03], [8.72, 11.2], [8.05, 10.53], [7.37, 9.83], [6.8, 9.13], [6.25, 8.45], [5.8, 7.73], [5.5, 7.23], [5.15, 6.48], [4.82, 5.38], [4.67, 4.65], [4.62, 3.9], [4.67, 3.08], [4.95, 2.08], [5.3, 1.35], [5.97, 0.35], [6.32, 0.0], [5.38, 0.0], [5.3, 0.08], [4.6, 0.93], [4.02, 1.8], [3.72, 2.45], [3.37, 3.38], [3.2, 4.0], [3.05, 4.95], [3.0, 5.62], [3.05, 6.28], [3.17, 7.18], [3.32, 7.73], [3.52, 8.38], [3.77, 9.0], [4.12, 9.73], [4.52, 10.45], [4.8, 10.88], [5.22, 11.48], [5.65, 12.05], [6.15, 12.68], [6.5, 13.1], [7.1, 13.75], [7.9, 14.6], [8.95, 15.65], [8.8, 16.18], [8.6, 17.07], [8.4, 18.23], [8.3, 19.25], [8.25, 19.8], [8.22, 20.35], [8.27, 21.4], [8.35, 22.15], [8.47, 22.95], [8.62, 23.68], [8.87, 24.53], [9.22, 25.38], [9.55, 25.93], [10.02, 26.58], [10.32, 26.93], [10.67, 27.23], [11.15, 27.53], [11.5, 27.65], [11.82, 27.53], [12.15, 27.18], [12.45, 26.7], [12.8, 26.15], [13.12, 25.45], [13.4, 24.75], [13.7, 23.58], [13.87, 22.43], [13.92, 21.38], [13.92, 20.88], [13.87, 20.0], [13.72, 18.95], [13.5, 18.0], [13.22, 17.08], [13.0, 16.48], [12.67, 15.78], [12.17, 14.88], [11.67, 14.1], [11.0, 13.28], [10.3, 12.63], [11.07, 8.88], [11.87, 8.95], [12.4, 8.95], [12.87, 8.88], [13.4, 8.72], [14.0, 8.47], [14.57, 8.15], [15.07, 7.68], [15.62, 7.08], [15.97, 6.5], [16.37, 5.7], [16.57, 5.08], [16.72, 4.3], [16.77, 3.6], [16.77, 2.85], [16.65, 2.08], [16.45, 1.33], [16.1, 0.58], [15.77, 0.0], [14.53, 0.0], [15.02, 0.93], [15.27, 2.2], [15.27, 2.8], [15.12, 3.4], [14.92, 4.05], [14.55, 4.73], [14.02, 5.35], [13.27, 5.85], [12.45, 6.15], [11.6, 6.23], [12.88, 0.0], [12.09, 0.0], [10.82, 6.1], [10.45, 5.95], [9.97, 5.68], [9.5, 5.28], [9.12, 4.83], [8.8, 4.35], [8.62, 3.83], [8.52, 3.18], [8.67, 2.43], [8.97, 1.75], [9.35, 1.25], [9.87, 0.83], [10.17, 0.68], [10.37, 0.58], [10.42, 0.48], [10.4, 0.33], [9.37, 16.85], [9.57, 16.25], [10.32, 16.88], [10.92, 17.57], [11.32, 18.12], [11.8, 18.9], [12.2, 19.6], [12.42, 20.15], [12.65, 20.73], [12.77, 21.12], [12.87, 21.58], [12.95, 22.03], [12.97, 22.55], [12.97, 22.73], [12.92, 23.1], [12.85, 23.5], [12.75, 23.78], [12.6, 23.98], [12.42, 24.1], [12.17, 24.2], [11.8, 24.25], [11.42, 24.15], [11.07, 23.98], [10.75, 23.68], [10.37, 23.18], [10.1, 22.68], [9.82, 22.03], [9.55, 21.15], [9.32, 20.3], [9.2, 19.38], [9.12, 18.62], [9.2, 17.78], [9.37, 16.85]];
  
  const newClefPointsTop = clefPointsTop.map(clef_point => [clef_point[0] + movementx, clef_point[1] + movementy - 577*scale + 243*scale+ 4.5]); // Manual 4.5 extra px
  const newClefPointsBottom = clefPointsBottom.map(clef_point => [clef_point[0] + movementx, clef_point[1] + movementy]);
  

  drawLines([newClefPointsTop], {fill: "black"});
  drawLines([newClefPointsBottom], {fill: "black"});
}

drawClef(9, 18, 0.05);

// Draw barlines
finalLines.push([[10, 15], [10, 35]]);
finalLines.push([[72, 15], [72, 35]]);
finalLines.push([[114, 15], [114, 35]]);
finalLines.push([[115, 15], [115, 35]]);
drawLines([[[115, 15], [115, 35], [115.5, 35], [115.5, 15]]], {fill: "black"});

// Function to get note y-positions
function getNoteY(noteLine) {
  const gapHeight = 5;
  return 35 - (noteLine - 1) * gapHeight;
}

// Function to draw an oval note
function drawOval(xPos, yPos, radiusX, radiusY, isFilled) {
  const ovalPoints = [];
  const numPoints = 20;
  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 * i) / numPoints;
    const x = xPos + radiusX * Math.cos(angle);
    const y = yPos + radiusY * Math.sin(angle);
    ovalPoints.push([x, y]);
  }
  // Close the oval by connecting the last point to the first
  ovalPoints.push(ovalPoints[0]);
  
  // Draw the oval (filled or not)
  if (isFilled) {
    drawLines([ovalPoints], {fill: "black"}); // fill the oval for crotchets (black)
  } else {
    drawLines([ovalPoints]); // draw the oval for minims (unfilled)
  }
  
  return ovalPoints;
}

// Determine stem direction based on position and previous stem direction
function getStemDirection(noteY, previousDirection) {
  const middleLineY = getNoteY(3); // Line 3 is the middle of the staff
  if (noteY < middleLineY) {
    return "up";
  } else if (noteY > middleLineY) {
    return "down";
  } else {
    return previousDirection; // If it's on the middle line, follow the previous note's stem direction
  }
}

// Draw the notes based on the input
let previousStemDirection = "up"; // Default starting stem direction
musicInput.forEach((bar, barIndex) => {
  bar.forEach((note, noteIndex) => {
    const [noteLine, noteLength] = note;
    const xPos = (barIndex * 40) + (noteIndex * 12) + 40;
    const yPos = getNoteY(noteLine);

    // Draw the note
    const isFilled = (noteLength === 1);
    drawOval(xPos, yPos, 4, 2, isFilled);

    // Determine stem direction
    const stemDirection = getStemDirection(yPos, previousStemDirection);
    previousStemDirection = stemDirection;

    // Draw the stem
    if (stemDirection === "down") {
      finalLines.push([[xPos + 4, yPos], [xPos + 4, yPos - 13]]);
    } else {
      finalLines.push([[xPos - 4, yPos], [xPos - 4, yPos + 13]]);
    }
  });
});

// Draw the staff lines and stems
drawLines(finalLines);
