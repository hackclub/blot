/*
@title: Snowflake
@author: HenHen
@snapshot: Snapshot1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

function createSnowflakeBranch(length, depth, complexity) {
  const branch = [];
  if (depth === 0) {
    return [
      [0, 0],
      [length, 0]
    ];
  } else {
    const subBranchLength = length / 3;
    const angle = Math.PI / 3 + bt.randInRange(-Math.PI / 12, Math.PI / 12);
    branch.push([0, 0]);
    branch.push([subBranchLength, 0]);
    for (let i = 0; i < complexity; i++) {
      const subAngle = bt.randInRange(-Math.PI / 4, Math.PI / 4);
      const x = subBranchLength + (subBranchLength / 2) * Math.cos(subAngle);
      const y = (subBranchLength / 2) * Math.sin(subAngle);
      branch.push([subBranchLength, 0]);
      branch.push([x, y]);
      branch.push([subBranchLength, 0]);
    }
    branch.push([subBranchLength, 0]);
    branch.push([subBranchLength + subBranchLength * Math.cos(angle), subBranchLength * Math.sin(angle)]);
    for (let i = 0; i < complexity; i++) {
      const subAngle = Math.PI / 3 + bt.randInRange(-Math.PI / 6, Math.PI / 6);
      const x = subBranchLength + (subBranchLength / 2) * Math.cos(subAngle);
      const y = (subBranchLength / 2) * Math.sin(subAngle);
      branch.push([subBranchLength + subBranchLength * Math.cos(angle), subBranchLength * Math.sin(angle)]);
      branch.push([x, y]);
      branch.push([subBranchLength + subBranchLength * Math.cos(angle), subBranchLength * Math.sin(angle)]);
    }
    branch.push([subBranchLength + subBranchLength * Math.cos(angle), subBranchLength * Math.sin(angle)]);
    branch.push([2 * subBranchLength, 0]);
    branch.push([2 * subBranchLength, 0]);
    branch.push([length, 0]);
  }
  return branch;
}

function createRandomPolygon(centerX, centerY, numSides, radius) {
  const angleStep = (2 * Math.PI) / numSides;
  const points = [];
  for (let i = 0; i < numSides; i++) {
    const angle = i * angleStep + bt.randInRange(-Math.PI / 12, Math.PI / 12);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push([x, y]);
  }
  points.push(points[0]);
  return [points];
}

function rotatePolyline(polyline, angle, origin) {
  return polyline.map(([x, y]) => {
    const dx = x - origin[0];
    const dy = y - origin[1];
    const newX = dx * Math.cos(angle) - dy * Math.sin(angle) + origin[0];
    const newY = dx * Math.sin(angle) + dy * Math.cos(angle) + origin[0];
    return [newX, newY];
  });
}

const numBranches = bt.randIntInRange(6, 12);
const length = bt.randInRange(40, 50);
const depth = bt.randIntInRange(2, 4);
const complexity = bt.randIntInRange(1, 4);
const centerX = width / 2;
const centerY = height / 2;

const polylines = [];

for (let i = 0; i < numBranches; i++) {
  const angle = (2 * Math.PI / numBranches) * i;
  const branchLength = length * bt.randInRange(0.8, 1.2);
  const branch = createSnowflakeBranch(branchLength, depth, complexity);
  const rotatedBranch = rotatePolyline(branch, angle, [0, 0]).map(([x, y]) => [x + centerX, y + centerY]);
  polylines.push(rotatedBranch);
}

const numPolygons = bt.randIntInRange(2, 4);
for (let i = 0; i < numPolygons; i++) {
  const polygonCenterX = centerX + bt.randInRange(-25, 25);
  const polygonCenterY = centerY + bt.randInRange(-25, 25);
  const numSides = bt.randIntInRange(5, 8);
  const radius = bt.randInRange(10, 15);
  const polygon = createRandomPolygon(polygonCenterX, polygonCenterY, numSides, radius);
  polylines.push(polygon);
}

drawLines(polylines, { stroke: "black", width: 0.5 });