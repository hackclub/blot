/*
@title: The ROOM
@author: blazecoding2009
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const finalLines = [];

// Parameters to adjust the art
const setRandSeed = Math.random(); // Random seed for variability
const roomSize = 100; // Size of the room
const furnitureVariation = 5; // Variation in furniture sizes
const decorationCount = 3; // Number of decorations
const tableX = width / 2 - 20;
const tableY = height / 2 - 10;
const tableWidth = 40;
const tableHeight = 20;

// Function to draw a rectangle
const drawRectangle = (x, y, w, h) => {
  return [
    [x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]
  ];
};

// Function to draw a line
const drawLine = (x1, y1, x2, y2) => {
  return [[x1, y1], [x2, y2]];
};

// Random number generator
const randInRange = (min, max) => {
  return min + Math.random() * (max - min);
};

// Function to check if a decoration overlaps with the table
const isOverlappingTable = (decX, decY, decW, decH) => {
  return (
    decX < tableX + tableWidth &&
    decX + decW > tableX &&
    decY < tableY + tableHeight &&
    decY + decH > tableY
  );
};

// Draw room (a simple square room)
const room = drawRectangle((width - roomSize) / 2, (height - roomSize) / 2, roomSize, roomSize);
bt.join(finalLines, [room]);

// Draw a table with limited random variations
const tableVarX = randInRange(-furnitureVariation, furnitureVariation);
const tableVarY = randInRange(-furnitureVariation, furnitureVariation);
const table = drawRectangle(tableX + tableVarX, tableY + tableVarY, tableWidth, tableHeight);
bt.join(finalLines, [table]);

// Draw a chair with limited random variations
const chairX = tableX + 10 + randInRange(-furnitureVariation, furnitureVariation);
const chairY = tableY + tableHeight + 5 + randInRange(-furnitureVariation, furnitureVariation);
const chairWidth = 15;
const chairHeight = 15;
const chair = drawRectangle(chairX, chairY, chairWidth, chairHeight);
bt.join(finalLines, [chair]);

// Draw a PC monitor on the table with limited random variations
const pcX = tableX + 5 + randInRange(-furnitureVariation, furnitureVariation);
const pcY = tableY + 10 + randInRange(-furnitureVariation, furnitureVariation);
const pcWidth = 10;
const pcHeight = 7;
const pcBaseWidth = 4;
const pcBaseHeight = 1;
const pc = drawRectangle(pcX, pcY, pcWidth, pcHeight);
const pcBase = drawRectangle(pcX + (pcWidth - pcBaseWidth) / 2, pcY - pcBaseHeight, pcBaseWidth, pcBaseHeight);
bt.join(finalLines, [pc, pcBase]);

// Draw a mouse on the table with limited random variations
const mouseX = tableX + 25 + randInRange(-furnitureVariation, furnitureVariation);
const mouseY = tableY + 5 + randInRange(-furnitureVariation, furnitureVariation);
const mouseWidth = 3;
const mouseHeight = 2;
const mouse = drawRectangle(mouseX, mouseY, mouseWidth, mouseHeight);
bt.join(finalLines, [mouse]);

// Draw decorations (e.g., paintings, rugs) with random positions and sizes
for (let i = 0; i < decorationCount; i++) {
  let decorationX, decorationY, decorationWidth, decorationHeight;
  do {
    decorationX = randInRange((width - roomSize) / 2, (width + roomSize) / 2 - 10);
    decorationY = randInRange((height - roomSize) / 2, (height + roomSize) / 2 - 10);
    decorationWidth = randInRange(5, 15);
    decorationHeight = randInRange(5, 15);
  } while (isOverlappingTable(decorationX, decorationY, decorationWidth, decorationHeight));

  const decoration = drawRectangle(decorationX, decorationY, decorationWidth, decorationHeight);
  bt.join(finalLines, [decoration]);
}

// Center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// Draw it
drawLines(finalLines);
