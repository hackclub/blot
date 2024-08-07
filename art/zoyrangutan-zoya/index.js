/*
@title: Zoya's Orangutan
@author: Zoya Linwood-Reese (submitted via her father's github account @zreese)
@snapshot: zoyrangutan2.png
*/


const numberOfTrees = 58; // Change this value to specify the number of trees in the background

const width = 800;
const height = 600;

setDocDimensions(width, height);

// Import blotToolkit
const { Turtle } = blotToolkit;

// Draw a solid background
const bg = new Turtle();
bg.jump([0, height]);
bg.down();
bg.forward(width).right(90);
bg.forward(height).right(90);
bg.forward(width).right(90);
bg.forward(height).right(90);
const bgPolylines = bg.lines();
drawLines(bgPolylines, { fill: 'lightblue', width: 0 });

// tree maker
const drawTree = (xSize, ySize, startX, startY) => {
  const t = new bt.Turtle();
  t.jump([startX, startY]);
  t.forward(xSize).right(90);
  t.forward(ySize).right(90);
  t.forward(xSize).right(90);
  t.forward(ySize).right(90);
  return t.lines();
}

// Leaf Maker
const drawLeaf = (size, startX, startY, rotation) => {
  const t = new bt.Turtle();
  t.jump([startX, startY]);
  t.left(rotation);
  t.forward(size).right(120);
  t.forward(size).right(120);
  t.forward(size).right(120);
  return t.lines();
}

// Change tree color based on xSize
const calculateLightness = (xSize) => {
  const minSize = 78;
  const maxSize = 141;
  const normalizedSize = (xSize - minSize) / (maxSize - minSize);
  return Math.round(normalizedSize * 40 + 30); // Lightness between 30% and 70%
}

// Draw random background
const drawMultipleTrees = (numTrees, ySize, startY) => {
  const allLines = [];
  for (let i = 0; i < numTrees; i++) {
    const xSize = bt.rand() * 9 + 68;
    const startX = bt.rand() * width;
    const lightness = calculateLightness(xSize);
    const fillColor = `hsl(32, 50%, ${lightness}%)`;
    const strokeColor = `hsl(15, 50%, ${lightness - 10}%)`;
    const treeLines = drawTree(xSize, ySize, startX, startY);
    allLines.push({ lines: treeLines, fill: fillColor, stroke: strokeColor, width: 9 });
    // Randomly add leaves (triangles)
    if (bt.rand() > 0.5) { // 50% chance to add leaves
      const leafSize = bt.rand() * 27 + 147;
      const leafStartX = startX + bt.rand() * xSize - xSize / 4;
      const leafStartY = startY - bt.rand() / ySize * 162;
      const leafRotation = bt.rand() * 360;
      const leafLines = drawLeaf(leafSize, leafStartX, leafStartY, leafRotation);
      allLines.push({ lines: leafLines, fill: '#4c794c', stroke: '#004000', width: 9 });
    }
  }
  allLines.forEach(item => drawLines(item.lines, { fill: item.fill, stroke: item.stroke, width: item.width }));
}
drawMultipleTrees(numberOfTrees, height, height);


// Create the Orangutang turtle
const turtle = new Turtle();

// Left Arm
const leftArm = new Turtle();
leftArm.down();
leftArm.jump([356, 350]);
leftArm.left(135);
leftArm.forward(50);
leftArm.right(45);
leftArm.forward(50);
leftArm.arc(180, 20);
leftArm.forward(30);
leftArm.arc(180, 20);
const leftArmPolylines = leftArm.lines();
drawLines(leftArmPolylines, { fill: '#eea964', stroke: '#d55454', width: 9 });

// Right Leg
const rightLeg = new Turtle();
rightLeg.down();
rightLeg.jump([363, 250]);
rightLeg.left(135);
rightLeg.forward(50);
rightLeg.left(45);
rightLeg.forward(50);
rightLeg.arc(180, 20);
rightLeg.forward(30);
rightLeg.arc(180, 20);
const rightLegPolylines = rightLeg.lines();
drawLines(rightLegPolylines, { fill: '#eea964', stroke: '#d55454', width: 9 });

// Hugging a tree
drawLines(drawTree(98, 606, 206, 603), { fill: '#724333', stroke: '#4F1501', width: 9 });

// Body
const orangBody = new Turtle();
const orangBodyWidth = 164;
const orangBodyHeight = 98;
const radius = orangBodyHeight / 2;
orangBody.jump([489 - orangBodyWidth / 2, 282 + radius]);
orangBody.arc(281, radius);
orangBody.right(0);
orangBody.forward(orangBodyWidth);
orangBody.arc(180, radius);
orangBody.right(0);
orangBody.forward(orangBodyWidth);
orangBody.jump([417, 349]);
orangBody.right(-82);
orangBody.arc(206, 84);
const orangutanPolylines = orangBody.lines();
drawLines(orangutanPolylines, { fill: '#eea964', stroke: '#d55454', width: 9 });


// Head
const orangHead = new Turtle();
orangHead.jump([390, 377]);
orangHead.arc(360, 50);
// Draw head
drawLines(orangHead.lines(), { fill: '#eea964', stroke: '#d55454', width: 9 });

// face
const orangFace = new Turtle();
orangFace.right(53);
orangFace.jump([365, 383]);
orangFace.arc(292, 21);
orangFace.jump([429, 399]);
orangFace.right(234);
orangFace.arc(179, 16);
drawLines(orangFace.lines(), { fill: '#eea964', stroke: '#d55454', width: 9 });

const orangMouth = new Turtle();
orangMouth.right(-52);
orangMouth.jump([372, 389]);
orangMouth.arc(385, 9);
orangMouth.jump([392, 413]);
orangMouth.arc(360, 1);
orangMouth.jump([378, 416]);
orangMouth.arc(360, 1);
drawLines(orangMouth.lines(), { stroke: '#d55454', width: 4 });

// Left Leg
const leftLeg = new Turtle();
leftLeg.down();
leftLeg.jump([400, 250]);
leftLeg.right(135);
leftLeg.forward(93);
leftLeg.right(86);
leftLeg.forward(50);
leftLeg.arc(180, 20);
leftLeg.forward(30);
leftLeg.arc(180, 20);
const leftLegPolylines = leftLeg.lines();
drawLines(leftLegPolylines, { fill: '#eea964', stroke: '#d55454', width: 9 });

// Right Arm
const rightArm = new Turtle();
rightArm.down();
rightArm.jump([429, 350]);
rightArm.right(132);
rightArm.forward(50);
rightArm.left(45);
rightArm.forward(50);
rightArm.arc(180, 20);
rightArm.forward(30);
rightArm.arc(180, 20);
const rightArmPolylines = rightArm.lines();
drawLines(rightArmPolylines, { fill: '#eea964', stroke: '#d55454', width: 9 });

// Hair
const orangHair = new Turtle();
orangHair.right(217);
orangHair.jump([394, 492]);
orangHair.arc(188, 21);
orangHair.jump([407, 488]);
orangHair.right(213);
orangHair.arc(191, 16);
orangHair.jump([412, 486]);
orangHair.right(148);
orangHair.arc(151, 16);
drawLines(orangHair.lines(), { stroke: '#d55454', width: 6 });

// Eyes
const orangEyes = new Turtle();
orangEyes.jump([357, 418]);
orangEyes.arc(360, 1);
orangEyes.jump([410, 412]);
orangEyes.arc(360, 1);
drawLines(orangEyes.lines(), { fill: 'black', stroke: '#2d2641', width: 9 });