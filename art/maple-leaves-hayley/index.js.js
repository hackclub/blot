/*
@title: Maple Leaves
@author: Hayley So 
@snapshot: snapshot.png
*/

// Constant values
const w = 100,
  h = 60,
  centerX = w / 2,
  centerY = h / 2;

// Customizable parameters
const LEAF_SIZE = 1.2;
const LEAF_SPACING_X = 10;
const LEAF_SPACING_Y = 10;
const LEAVES_PER_ROW = 10;
const LEAVES_PER_COL = 6;

setDocDimensions(w, h);

// Draw border
drawLines([
  [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
    [0, 0]
  ]
], { fill: "#FFFFFF", strokewidth: 4 });

// Generative Maple Leaf function
function createMapleLeaf(centerX, centerY, size, rotation = 0, cutSide = null) {
  const leafPoints = [
    [0, 4.25],
    [-0.6, 3],
    [-0.7, 3],
    [-1.4, 3.5],
    [-1.4, 1.5],
    [-1.55, 1.5],
    [-2.25, 2.4],
    [-2.55, 1.75],
    [-2.7, 1.75],
    [-3.4, 1.95],
    [-2.9, 0.6],
    [-2.9, 0.5],
    [-3.5, 0.2],
    [-1.7, -1.5],
    [-1.7, -1.6],
    [-2, -2],
    [-0.08, -1.7],
    [-0.2, -3.75],
    [0, -3.75]
  ];

  const transformedPoints = leafPoints.map(([x, y]) => {
    const scaledX = x * size;
    const scaledY = y * size;
    const rotatedX = scaledX * Math.cos(rotation) - scaledY * Math.sin(rotation);
    const rotatedY = scaledX * Math.sin(rotation) + scaledY * Math.cos(rotation);
    return [centerX + rotatedX, centerY + rotatedY];
  });

  let leftSide = transformedPoints;
  let rightSide = transformedPoints.map(([x, y]) => [2 * centerX - x, y]).reverse();

  // Cut the leaf on the specified side
  if (cutSide === 'left') {
    leftSide = leftSide.filter(([x, y]) => x >= centerX);
    rightSide = rightSide.filter(([x, y]) => x >= centerX);
  } else if (cutSide === 'right') {
    leftSide = leftSide.filter(([x, y]) => x <= centerX);
    rightSide = rightSide.filter(([x, y]) => x <= centerX);
  }

  return [...leftSide, ...rightSide];
}

// Function to draw leaves with
function fillPageWithLeaves(leafSize, spacingX, spacingY, leavesPerRow, leavesPerCol) {
  const leaves = [];
  const startY = (h - (leavesPerCol - 1) * spacingY) / 2;

  for (let row = 0; row < leavesPerCol; row++) {
    const isEvenRow = row % 2 === 0;
    const rotation = isEvenRow ? 0 : Math.PI;
    const leafCount = isEvenRow ? leavesPerRow + 1 : leavesPerRow;
    const totalWidth = (leafCount - 1) * spacingX;
    const startX = (w - totalWidth) / 2;

    for (let col = 0; col < leafCount; col++) {
      const leafX = startX + col * spacingX;
      const leafY = startY + row * spacingY;

      let cutSide = null;
      if (isEvenRow) {
        if (col === 0) cutSide = 'left';
        if (col === leafCount - 1) cutSide = 'right';
      }

      const leaf = createMapleLeaf(leafX, leafY, leafSize, rotation, cutSide);
      leaves.push({ points: leaf });
    }
  }

  return leaves;
}

// Fill the page with maple leaves
const leaves = fillPageWithLeaves(LEAF_SIZE, LEAF_SPACING_X, LEAF_SPACING_Y, LEAVES_PER_ROW, LEAVES_PER_COL);

// Draw all leaves
leaves.forEach(leaf => {
  drawLines([leaf.points], { fill: "#FFFFFF", stroke: "#FF0000" });
});