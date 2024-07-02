/*
@title: Snowflake
@author: HenHen
@snapshot: Snapshot1.png
*/

const width = 250;
const height = 250;
setDocDimensions(width, height);

function createSnowflakeBranch(length, depth) {
  const branch = [[0, 0], [length, 0]];

  function addSideBranches(x, y, length, angle, depth) {
    if (depth === 0) return;

    const subLength = length * bt.randInRange(0.4, 0.6);
    const angleOffset = Math.PI / 4; // 45 degrees for side branches

    const x1 = x + subLength * Math.cos(angle + angleOffset);
    const y1 = y + subLength * Math.sin(angle + angleOffset);
    const x2 = x + subLength * Math.cos(angle - angleOffset);
    const y2 = y + subLength * Math.sin(angle - angleOffset);

    branch.push([x, y], [x1, y1]);
    branch.push([x, y], [x2, y2]);

    addSideBranches(x1, y1, subLength, angle + angleOffset, depth - 1);
    addSideBranches(x2, y2, subLength, angle - angleOffset, depth - 1);
  }

  for (let i = 1; i <= depth; i++) {
    const segmentLength = length / 3 * i;
    addSideBranches(segmentLength, 0, segmentLength, 0, depth - i);
  }

  return branch;
}

function rotatePolyline(polyline, angle, origin) {
  return polyline.map(([x, y]) => {
    const dx = x - origin[0];
    const dy = y - origin[1];
    const newX = dx * Math.cos(angle) - dy * Math.sin(angle) + origin[0];
    const newY = dx * Math.sin(angle) + dy * Math.cos(angle) + origin[1];
    return [newX, newY];
  });
}

const numBranches = 6 + bt.randIntInRange(0, 3); // Randomly adding 0 to 3 more branches
const baseLength = 80; // Base length of each branch
const depth = 3; // Depth for detailed branches
const centerX = width / 2;
const centerY = height / 2;

const polylines = [];

for (let i = 0; i < numBranches; i++) {
  const angle = (2 * Math.PI / numBranches) * i;
  const branchLength = baseLength * bt.randInRange(0.9, 1.1); // Slight randomization for variety
  const branch = createSnowflakeBranch(branchLength, depth);
  const rotatedBranch = rotatePolyline(branch, angle, [0, 0]).map(([x, y]) => [x + centerX, y + centerY]);
  polylines.push(rotatedBranch);
}

drawLines(polylines, { stroke: "blue", width: 2 });
