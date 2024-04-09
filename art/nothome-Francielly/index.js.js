/*
@title: The place that I sleep, but it's not my home
@author: francielly
@snapshot: notmyhome.png
*/

// Defining document dimensions
const width = 125;
const height = 125;

setDocDimensions(width, height);

// Creating a new set of lines for the drawing
let tree = [];

// Drawing the tree trunk
tree.push([[width / 4, height / 4], [width / 4, height / 2]]); // Mudei width / 2 para width / 4

// Drawing the branches of the tree
for (let i = 0; i < 3; i++) {
  let branchStartHeight = height / 2 + i * height / 8;
  tree.push([[width / 4, branchStartHeight], [width / 4 - width / 8, branchStartHeight + height / 8]]); // Mudei width / 2 para width / 4
  tree.push([[width / 4, branchStartHeight], [width / 4 + width / 8, branchStartHeight + height / 8]]); // Mudei width / 2 para width / 4
}

// Designing the final result
drawLines(tree);

// Defining the dimensions of the house
const housewidth = width / 2;
const househeight = height / 2;
const roofheight = househeight / 3;
const doorwidth = housewidth / 4;
const doorheight = househeight / 2;

// Creating a new set of lines for the drawing
const finalLines = [];

// Function to draw straight lines
function drawLine(x1, y1, x2, y2) {
  const lines = [[[x1, y1], [x2, y2]]];
  drawLines(lines);
}

// Drawing the structure of the house
const offsetX = width / 4; 
drawLine(width / 2 - housewidth / 2 + offsetX, height / 2 - househeight / 2, width / 2 + housewidth / 2 + offsetX, height / 2 - househeight / 2); // Base
drawLine(width / 2 - housewidth / 2 + offsetX, height / 2 + househeight / 2, width / 2 + housewidth / 2 + offsetX, height / 2 + househeight / 2); // Topo
drawLine(width / 2 - housewidth / 2 + offsetX, height / 2 - househeight / 2, width / 2 - housewidth / 2 + offsetX, height / 2 + househeight / 2); // Lado esquerdo
drawLine(width / 2 + housewidth / 2 + offsetX, height / 2 - househeight / 2, width / 2 + housewidth / 2 + offsetX, height / 2 + househeight / 2); // Lado direito

// Drawing the roof
const roofPeakX = width / 2 + offsetX;
const roofPeakY = height / 2 + househeight / 2 + roofheight;
drawLine(width / 2 - housewidth / 2 + offsetX, height / 2 + househeight / 2, roofPeakX, roofPeakY); // Lado esquerdo do telhado
drawLine(width / 2 + housewidth / 2 + offsetX, height / 2 + househeight / 2, roofPeakX, roofPeakY); // Lado direito do telhado

// Drawing the door
const doorX = width / 2 - doorwidth / 2 + offsetX;
const doorY = height / 2 - househeight / 2;
drawLine(doorX, doorY, doorX, doorY + doorheight); // Lado esquerdo da porta
drawLine(doorX + doorwidth, doorY, doorX + doorwidth, doorY + doorheight); // Lado direito da porta
drawLine(doorX, doorY + doorheight, doorX + doorwidth, doorY + doorheight); // Topo da porta

// Adding the rows to the final set
bt.join(finalLines, [[roofPeakX, roofPeakY]]); // Adicionando o pico do telhado

// Designing the final result
drawLines(finalLines);