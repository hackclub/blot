/*
@title: AutumnTree
@author: SmartDude1569
@snapshot: image1.png
*/

setDocDimensions(125, 125);

let branchPolygons = [];
let leafPolygons = [];

function addBarkTexture(polygon, thickness) {
  let polylines = [polygon];
  
  const sampleRate = 1; 
  bt.resample(polylines, sampleRate);

  bt.iteratePoints(polylines, (pt, t) => {
    const normal = bt.getNormal(polylines, t);

    const noiseScale = thickness * 0.2; 
    const noiseValue = bt.noise([pt[0] * 0.1, pt[1] * 0.1]) * noiseScale;

    const newPt = [
      pt[0] + normal[0] * noiseValue,
      pt[1] + normal[1] * noiseValue,
    ];
    return newPt;
  });

  return polylines[0];
}

function createLeaf(position, size) {
  const leafPoints = [];
  const numPoints = 5; 
  const angleIncrement = (Math.PI * 2)

  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleIncrement + bt.randInRange(0, angleIncrement);
    const radius = size * bt.randInRange(0.8, 1.2);
    const x = position[0] + radius * Math.cos(angle);
    const y = position[1] + radius * Math.sin(angle);
    leafPoints.push([x, y]);
  }

  leafPoints.push(leafPoints[0]);
  let leafPolyline = [leafPoints];
  bt.resample(leafPolyline, 0.5);
  bt.iteratePoints(leafPolyline, (pt, t) => {
    const noiseValue = bt.noise([pt[0] * 0.2, pt[1] * 0.2]) * size * 0.1;
    return [pt[0] + noiseValue, pt[1] + noiseValue];
  });

  return leafPolyline[0];
}

function drawBranch(startPos, length, angle, depth, thickness) {
  if (depth === 0 || length < 1 || thickness < 0.1) return;

  const maxAttempts = 5; 
  let attempts = 0;
  let branchAdded = false;

  while (attempts < maxAttempts && !branchAdded) {
    const angleAdjustment = bt.randInRange(-10, 10);
    const adjustedAngle = angle + angleAdjustment;
 
    const radians = (adjustedAngle * Math.PI) / 180;
    const dx = length * Math.cos(radians);
    const dy = length * Math.sin(radians);
    const endPos = [startPos[0] + dx, startPos[1] + dy];

    const normalAngle = adjustedAngle + 90;
    const normalRadians = (normalAngle * Math.PI) / 180;
    const nx = Math.cos(normalRadians);
    const ny = Math.sin(normalRadians);

    const baseThickness = thickness;
    const tipThickness = thickness * bt.randInRange(0.6, 0.8); 

    const baseLeft = [
      startPos[0] - (nx * baseThickness) / 2,
      startPos[1] - (ny * baseThickness) / 2,
    ];
    const baseRight = [
      startPos[0] + (nx * baseThickness) / 2,
      startPos[1] + (ny * baseThickness) / 2,
    ];
    const tipLeft = [
      endPos[0] - (nx * tipThickness) / 2,
      endPos[1] - (ny * tipThickness) / 2,
    ];
    const tipRight = [
      endPos[0] + (nx * tipThickness) / 2,
      endPos[1] + (ny * tipThickness) / 2,
    ];

    const branchPolygon = [baseLeft, baseRight, tipRight, tipLeft, baseLeft];

    const texturedBranchPolygon = addBarkTexture(branchPolygon, thickness);

    let overlap = false;
    if (branchPolygons.length > 0) {
      const testPolygons = [texturedBranchPolygon];
      const intersectionResult = [];
      bt.intersection(intersectionResult, branchPolygons, testPolygons);
      if (intersectionResult.length > 0) {
        overlap = true;
      }
    }

    if (!overlap) {
      branchPolygons.push(texturedBranchPolygon);
      branchAdded = true;
      const branches = bt.randIntInRange(1, 2);

      for (let i = 0; i < branches; i++) {
        const newLength = length * bt.randInRange(0.7, 0.9);
        const angleVariation = bt.randInRange(-45, 45);
        const newAngle = adjustedAngle + angleVariation;
        const newThickness = tipThickness;
        drawBranch(endPos, newLength, newAngle, depth - 1, newThickness);
      }
    } else {
      attempts++;
    }
  }
}

// SETTINGS!!!
const startPos = [62.5, 0];
const initialLength = 20;
const initialAngle = 95; 
const maxDepth = 8; 
const initialThickness = 14; 
// no more settings

drawBranch(startPos, initialLength, initialAngle, maxDepth, initialThickness);

const numGroundLeaves = bt.randIntInRange(5, 10);
for (let i = 0; i < numGroundLeaves; i++) {
  const leafSize = bt.randInRange(1, 2);
  const xPosition = bt.randInRange(0, 125); 
  const yPosition = bt.randInRange(0, 5);   
  const leafPosition = [xPosition, yPosition];
  const leafPolygon = createLeaf(leafPosition, leafSize);
  leafPolygons.push(leafPolygon);
}

const numAirLeaves = bt.randIntInRange(2, 4);
for (let i = 0; i < numAirLeaves; i++) {
  const leafSize = bt.randInRange(1, 2);
  const xPosition = bt.randInRange(0, 125); 
  const yPosition = bt.randInRange(60, 120); 
  const leafPosition = [xPosition, yPosition];
  const leafPolygon = createLeaf(leafPosition, leafSize);
  leafPolygons.push(leafPolygon);
}

const allPolygons = branchPolygons.concat(leafPolygons);
const treeShape = bt.union([], allPolygons);

bt.rotate(treeShape, bt.randInRange(-5, 5), startPos);

drawLines(treeShape);
