/*
@title: Rose in HACK
@author: shashankx86
@snapshot: snapshot_0.png
*/

const ROSEParams = {
  width: 350,
  height: 360,
  ROSElineWidth: 0.7,
  HACKStroke: "white",
  HACKFill: "",
  HACKWidth: 3,
  minNumLength: 1, // Minimum length of the generated random number
  maxNumLength: 9 // Maximum length of the generated random number
};

setDocDimensions(ROSEParams.width, ROSEParams.height);

// Function to generate a random number between specified length
function randomNum(minLength, maxLength) {
  const min = Math.pow(10, minLength - 1); 
  const max = Math.pow(10, maxLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomize numbers
const ranNum1 = randomNum(ROSEParams.minNumLength, ROSEParams.maxNumLength);
const ranNum2 = randomNum(ROSEParams.minNumLength, ROSEParams.maxNumLength);
const ranNum3 = randomNum(ROSEParams.minNumLength, ROSEParams.maxNumLength);

// Function to draw ROSEline
function drawROSEline() {
  const ROSEline = new bt.Turtle();
  for (let i = 0; i < 200; i++) {
    ROSEline.forward(i);
    ROSEline.right(92);
    ROSEline.left(10);
    ROSEline.right(0.1);
  }
  return ROSEline.lines();
}

// Function to draw ROSEin
function drawROSEin() {
  const ROSEin = new bt.Turtle();
  for (let i = 0; i < 200; i++) {
    ROSEin.forward(i);
    ROSEin.right(92);
    ROSEin.left(10);
    ROSEin.right(0.1);
  }
  return ROSEin.lines();
}

// Function to draw text "HACK"
function drawHACK() {
  const finalLines = [];

  // Define lines for each letter "H", "A", "C", "K"
  const letters = {
    H: [
      [[-20, -40], [-20, 40]],
      [[20, -40], [20, 40]],
      [[-20, 0], [20, 0]]
    ],
    A: [
      [[-20, 40], [0, -40]],
      [[20, 40], [0, -40]],
      [[-10, 0], [10, 0]]
    ],
    C: [
      [[20, 40], [-20, 40]],
      [[-20, 40], [-20, -40]],
      [[-20, -40], [20, -40]]
    ],
    K: [
      [[-20, 40], [-20, -40]],
      [[20, 40], [-20, 0]],
      [[-20, 0], [20, -40]]
    ]
  };

  // Define positions for each letter
  const positions = {
    H: [-100, -80],
    A: [-40, -80],
    C: [20, -80],
    K: [80, -80]
  };

  // Add lines for each letter to finalLines
  for (const letter of "HACK") {
    const lines = letters[letter];
    const position = positions[letter];
    for (const line of lines) {
      finalLines.push([
        [line[0][0] + position[0], line[0][1] + position[1]],
        [line[1][0] + position[0], line[1][1] + position[1]]
      ]);
    }
  }

  return finalLines;
}

// Draw ROSEline
const ROSEline = drawROSEline();
// Center ROSEline
const ROSElineBounds = bt.bounds(ROSEline);
const ROSElineCenter = ROSElineBounds.cc;
bt.translate(ROSEline, [ROSEParams.width / 2 - ROSElineCenter[0], ROSEParams.height / 2 - ROSElineCenter[1]]);

// Draw ROSEin
const ROSEin = drawROSEin();
// Center ROSEin
const ROSEinBounds = bt.bounds(ROSEin);
const ROSEinCenter = ROSEinBounds.cc;
bt.translate(ROSEin, [ROSEParams.width / 2 - ROSEinCenter[0], ROSEParams.height / 2 - ROSEinCenter[1]]);

// Draw "HACK" text
const HACK = drawHACK();
// Center HACK text
const HACKBounds = bt.bounds(HACK);
const HACKCenter = HACKBounds.cc;
bt.translate(HACK, [ROSEParams.width / 2 - HACKCenter[0], ROSEParams.height / 2 - HACKCenter[1]]);

// Render each part with parameters
drawLines(ROSEline, { stroke: `hsla(${ranNum1}, 100%, 40%, 1)`, fill: `hsla(${ranNum2}, 100%, 40%, 1)` });
drawLines(ROSEin, { fill: `hsla(${ranNum3}, 100%, 40%, 0.5)`, width: ROSEParams.ROSElineWidth });
drawLines(HACK, { stroke: ROSEParams.HACKStroke, fill: ROSEParams.HACKFill, width: ROSEParams.HACKWidth });
