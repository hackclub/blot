/*
@title: Skyline
@author: Dilon
@snapshot: snapshot_1
*/

const width = 256;
const height = 256;
setDocDimensions(width, height);

const sunsize = 16;
const numRays = 12;
const numBuildings = 10;

const sunAngle = Math.random() * Math.PI;
const rayLength = sunsize/2;

// store final lines here
const finalLines = [];

const t = new bt.Turtle();

// Calculate sun's position
const arcRadius = width / 2;
const centerX = width / 2;
const centerY = height / 2;
const sunX = centerX + Math.cos(sunAngle) * arcRadius;
const sunY = centerY + Math.sin(sunAngle) * arcRadius;

let radius = sunsize;

// Draw the sun
let startX = sunX + Math.cos(0) * radius;
let startY = sunY + Math.sin(0) * radius;
t.up();
t.goTo([startX, startY]);
t.down();

for (let a = 0; a < 2 * Math.PI; a += 0.01) {
  let x = sunX + Math.cos(a) * radius;
  let y = sunY + Math.sin(a) * radius;
  t.goTo([x, y]);
}
t.up();

// Draw sun rays
for (let i = 0; i < numRays; i++) {
  let angle = (2 * Math.PI / numRays) * i;
  let rayStartX = sunX + Math.cos(angle) * radius;
  let rayStartY = sunY + Math.sin(angle) * radius;
  let rayEndX = sunX + Math.cos(angle) * (radius + rayLength);
  let rayEndY = sunY + Math.sin(angle) * (radius + rayLength);
  
  t.goTo([rayStartX, rayStartY]);
  t.down();
  t.goTo([rayEndX, rayEndY]);
  t.up();
}

// Generate random widths for buildings
function generateBuildingWidths(numBuildings, totalWidth) {
  let minBuildingWidth = totalWidth / 20;
  let maxBuildingWidth = totalWidth / 5;
  let widths = [];

  let remainingWidth = totalWidth;

  for (let i = 0; i < numBuildings; i++) {
    if (i === numBuildings - 1) {
      widths.push(remainingWidth);
    } else {
      let width = Math.random() * (maxBuildingWidth - minBuildingWidth) + minBuildingWidth;
      width = Math.min(width, remainingWidth - minBuildingWidth * (numBuildings - i - 1));
      widths.push(width);
      remainingWidth -= width;
    }
  }

  return widths;
}

// Draw horizontal stripes
function drawHorizontalStripes(x, y, width, height) {
  const stripeHeight = 5;
  for (let i = y; i < y + height; i += stripeHeight * 2) {
    t.goTo([x, i]);
    t.down();
    t.goTo([x + width, i]);
    t.goTo([x + width, i + stripeHeight]);
    t.goTo([x, i + stripeHeight]);
    t.goTo([x, i]);
    t.up();
  }
}

// Draw vertical stripes
function drawVerticalStripes(x, y, width, height) {
  const stripeWidth = 5;
  for (let i = x; i < x + width; i += stripeWidth * 2) {
    t.goTo([i, y]);
    t.down();
    t.goTo([i, y + height]);
    t.goTo([i + stripeWidth, y + height]);
    t.goTo([i + stripeWidth, y]);
    t.goTo([i, y]);
    t.up();
  }
}

// Draw skyline
function drawSkyline(numBuildings, totalWidth, totalHeight) {
  let buildingWidths = generateBuildingWidths(numBuildings, totalWidth);
  let x = 0;

  // Assign stripes
  let horizontalStripeBuildings = new Set();
  let verticalStripeBuildings = new Set();

  while (horizontalStripeBuildings.size < Math.floor(numBuildings / 4)) {
    horizontalStripeBuildings.add(Math.floor(Math.random() * numBuildings));
  }
  while (verticalStripeBuildings.size < Math.floor(numBuildings / 4)) {
    verticalStripeBuildings.add(Math.floor(Math.random() * numBuildings));
  }

  for (let i = 0; i < numBuildings; i++) {
    let buildingWidth = buildingWidths[i];
    let buildingHeight = Math.random() * (totalHeight / 2) + (totalHeight / 4);
    
    t.up();
    t.goTo([x, 0]);
    t.down();
    t.goTo([x, buildingHeight]);
    t.goTo([x + buildingWidth, buildingHeight]);
    t.goTo([x + buildingWidth, 0]);
    t.goTo([x, 0]);
    
    // Draw stripes
    if (horizontalStripeBuildings.has(i)) {
      drawHorizontalStripes(x, 0, buildingWidth, buildingHeight);
    } else if (verticalStripeBuildings.has(i)) {
      drawVerticalStripes(x, 0, buildingWidth, buildingHeight);
    }
    
    x += buildingWidth;
  }
}

drawSkyline(numBuildings, width, height);

bt.join(finalLines, t.lines());

drawLines(finalLines);