/*
@title: Fractal Tree
@author: Daniyal Shaikh
@snapshot: tree1.png
@snapshot: tree2.png
@snapshot: tree3.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);
const finalLines = [];
const treeBase = [width - 60, height - 100];  
const initialLength = 30;      
const angle = 30;              
const depth = 10;               
const lengthFactor = 0.7;     
const angleVariation = 10;   
bt.setRandSeed(30);
function drawTree(x, y, length, currentAngle, currentDepth) {
  if (currentDepth === 0 || length < 1) return;
  const endX = x + length * Math.cos(currentAngle);
  const endY = y - length * Math.sin(currentAngle);
  finalLines.push([[x, y], [endX, endY]]);
  const randomVariation = (Math.random() - 0.5) * angleVariation * Math.PI / 180;
  drawTree(endX, endY, length * lengthFactor, currentAngle - angle * Math.PI / 180 + randomVariation, currentDepth - 1);
  drawTree(endX, endY, length * lengthFactor, currentAngle + angle * Math.PI / 180 + randomVariation, currentDepth - 1);
}
drawTree(treeBase[0], treeBase[1], initialLength, -Math.PI / 2, bt);
drawLines(finalLines);
