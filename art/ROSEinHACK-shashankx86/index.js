/*
@title: Rose in HACK
@author: shashankx86
@snapshot: snapshot_0.png
*/

const RenderPARAMS = {
  width: 350,
  height: 360,
  ROSElineWidth: 1,
  HACKStroke: "black",
  HACKWidth: 3,
  ROSElineColor: "grey",
  TXstyleL1: true,
  TXstyleL2: true,
  TXstyleL3: true,
  ROSEposSETs: [
    {x: 0, y: 0, z: 0, w: 350},
    {x: 350, y: 0, z: 0, w: 0},
    {x: 350, y: 350, z: 0, w: 0},
    {x: 0, y: 350, z: 350, w: 0},
    {x: 350, y: 350, z: 350, w: 0},
    {x: 350, y: 350, z: 0, w: 350}
  ]
};

setDocDimensions(RenderPARAMS.width, RenderPARAMS.height);

// Function to generate a random number between specified length
function randomNum(minLength, maxLength) {
  const min = Math.pow(10, minLength - 1); 
  const max = Math.pow(10, maxLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomize numbers
const ranNum1 = randomNum(RenderPARAMS.minNumLength, RenderPARAMS.maxNumLength);
const ranNum2 = randomNum(RenderPARAMS.minNumLength, RenderPARAMS.maxNumLength);
const ranNum3 = randomNum(RenderPARAMS.minNumLength, RenderPARAMS.maxNumLength);
var vhPOS = Math.round(Math.random());
var stTX1 = Math.round(Math.random());
var stTX2 = Math.round(Math.random());

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
        [line[0][0] + position[0], line[0][1] + position[vhPOS]],
        [line[1][0] + position[0], line[1][1] + position[vhPOS]],
        [line[0][1] + position[0], line[1][1] + position[vhPOS]],
        [line[stTX1][stTX2] + position[0], line[1][0] + position[vhPOS]],
        [line[1][0] + position[0], line[1][0] + position[vhPOS]],
      ]);
    }
  }

  return finalLines;
}

// Function to pick random values for x, y, z, and w
function pickRandomValues() {
  const ROSEposSET = RenderPARAMS.ROSEposSETs[Math.floor(Math.random() * RenderPARAMS.ROSEposSETs.length)];
  const { x, y, z, w } = ROSEposSET;
  return { x, y, z, w };
}

// Get random values for x, y, z, and w
const { x, y, z, w } = pickRandomValues();

// Draw ROSEline
const ROSEline = drawROSEline();
// Translate ROSEline using random values
bt.translate(ROSEline, [x, y]);

// Draw ROSEin
const ROSEin = drawROSEin();
// Translate ROSEin using random values
bt.translate(ROSEin, [z, w]);

console.log(`x: ${x}, y: ${y}, z: ${z}, w: ${w}`);

// Draw "HACK" text
const HACK = drawHACK();
// Center HACK text
const HACKBounds = bt.bounds(HACK);
const HACKCenter = HACKBounds.cc;
bt.translate(HACK, [RenderPARAMS.width / 2 - HACKCenter[0], RenderPARAMS.height / 2 - HACKCenter[1]]);

// Render each part with parameters
drawLines(ROSEline, { stroke: RenderPARAMS.ROSElineColor, width: RenderPARAMS.ROSElineWidth });
drawLines(ROSEin, { width: RenderPARAMS.ROSElineWidth, stroke: RenderPARAMS.ROSElineColor }); 
drawLines(HACK, { stroke: RenderPARAMS.HACKStroke, width: RenderPARAMS.HACKWidth }); 
