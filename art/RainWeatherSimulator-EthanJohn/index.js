/*
@title: The (Rain)Weather Simulator
@author: Ethan John
@snapshot: snapshot1.png
*/

// Thanks to Rivques' Weather Report for making the clouds easier to understand and make

const width = 128;
const height = 128;
const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];
let finalLines = [];
setDocDimensions(width, height);

// Settings
let rainColor = "gray" // I like either gray or blue
let rainMaxLength = 15 // Adjust max length of the raindrops
let rainRand = false // "false" for manual (rainIntensity) / "true" for random with rainIntensity as max
let rainIntensity = 10 // 1:1 Raindrop, Higher intensity has more chance to overlap, I suggest < 6

// Cloud Creation
const cloudOne = new bt.Turtle();
const cloudTwo = new bt.Turtle();

//cloudOne
const cloudOneBase = [16, 88]; // Static
cloudOne.up();
cloudOne.goTo(cloudOneBase);
cloudOne.down();
cloudOne.forward(47.54);
cloudOne.arc(103, 7);
cloudOne.setAngle(102);
cloudOne.arc(86, 8);
cloudOne.setAngle(-93);
cloudOne.arc(125, -9);
cloudOne.setAngle(172);
cloudOne.arc(28, 23);
cloudOne.setAngle(145);
cloudOne.arc(113, 15);
cloudOne.setAngle(215);
cloudOne.arc(28, 7);
cloudOne.arc(106, 7);
drawLines(cloudOne.lines(), { stroke: "gray", width: 4 })

//cloudTwo
const cloudTwoBase = [70.3, 97]; // Static
cloudTwo.up();
cloudTwo.goTo(cloudTwoBase);
cloudTwo.down();
cloudTwo.forward(35);
cloudTwo.arc(103, 8);
cloudTwo.setAngle(103);
cloudTwo.arc(86, 8);
cloudTwo.setAngle(-90);
cloudTwo.arc(146, -9);
cloudTwo.setAngle(155);
cloudTwo.arc(48, 12);
cloudTwo.setAngle(209);
cloudTwo.arc(72, 9);
cloudTwo.setAngle(142);
cloudTwo.arc(76, 11);
drawLines(cloudTwo.lines(), { stroke: "gray", width: 4 })

// Rain Generation

// Pick rain amount
let rainFinalSet = 0

if (rainRand == false) {
  rainFinalSet = rainIntensity
} else if (rainRand == true) {
  rainFinalSet = bt.randIntInRange(1, rainIntensity)
};

// Main Generation
for (let i = 0; i < rainFinalSet; i++) {
  // Raindrop shape variables
  let base = bt.randIntInRange(10, 64);
  let tip = base + bt.randInRange(10, rainMaxLength);
  let maxWidth = rainMaxLength / 3;
  let leftSide = bt.randInRange(10, 108);
  let rightSide = leftSide + bt.randInRange(3, maxWidth);
  let sidesDifference = (rightSide - leftSide) / 2;
  let center = sidesDifference + leftSide;


  //Raindrop Shaping
  const raindrop = bt.catmullRom([
    [center, tip],
    [leftSide, base],
    [rightSide, base],
    [center, tip]
  ])

  finalLines.push(raindrop);
  drawLines(finalLines, { stroke: rainColor, width: 2 })
}