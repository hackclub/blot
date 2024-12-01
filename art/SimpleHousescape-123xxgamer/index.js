/*
@title: Simple Housescape
@author: 123xxgamer
@snapshot: simple_housescape.png
*/
const { randInRange, randIntInRange } = blotToolkit;

const width = 125;
const height = 125;
setDocDimensions(width, height);

const numBuildings = randIntInRange(5, 10);
const minBuildingWidth = 10;
const maxBuildingWidth = 25;
const minBuildingHeight = 20;
const maxBuildingHeight = 60;

function drawBuilding(x, buildingHeight, buildingWidth) {
  const baseY = 0; // Ground level
  const roofHeight = 10; // Height of the roof triangle
  
  const building = [
    [x, baseY],
    [x + buildingWidth, baseY],
    [x + buildingWidth, baseY + buildingHeight],
    [x, baseY + buildingHeight],
    [x, baseY],
  ];
  
  const roof = [
    [x, baseY + buildingHeight],
    [x + buildingWidth / 2, baseY + buildingHeight + roofHeight],
    [x + buildingWidth, baseY + buildingHeight],
  ];
  
  const doorWidth = buildingWidth / 5;
  const doorHeight = buildingHeight / 5;
  const door = [
    [x + buildingWidth / 2 - doorWidth / 2, baseY],
    [x + buildingWidth / 2 + doorWidth / 2, baseY],
    [x + buildingWidth / 2 + doorWidth / 2, baseY + doorHeight],
    [x + buildingWidth / 2 - doorWidth / 2, baseY + doorHeight],
    [x + buildingWidth / 2 - doorWidth / 2, baseY],
  ];
  
  const windowWidth = buildingWidth / 5;
  const windowHeight = buildingHeight / 8;
  const windowSpacing = buildingWidth / 10;
  const window1 = [
    [x + windowSpacing, baseY + buildingHeight / 2],
    [x + windowSpacing + windowWidth, baseY + buildingHeight / 2],
    [x + windowSpacing + windowWidth, baseY + buildingHeight / 2 + windowHeight],
    [x + windowSpacing, baseY + buildingHeight / 2 + windowHeight],
    [x + windowSpacing, baseY + buildingHeight / 2],
  ];
  const window2 = [
    [x + buildingWidth - windowSpacing - windowWidth, baseY + buildingHeight / 2],
    [x + buildingWidth - windowSpacing, baseY + buildingHeight / 2],
    [x + buildingWidth - windowSpacing, baseY + buildingHeight / 2 + windowHeight],
    [x + buildingWidth - windowSpacing - windowWidth, baseY + buildingHeight / 2 + windowHeight],
    [x + buildingWidth - windowSpacing - windowWidth, baseY + buildingHeight / 2],
  ];
  
  drawLines([building, roof, door, window1, window2]);
}

function drawPerson(x, y) {
  const bodyHeight = 5;
  const headRadius = 2;

  const body = [
    [x, y],
    [x, y + bodyHeight],
  ];
  
  const head = [];
  for (let i = 0; i <= 360; i += 45) {
    const angle = (i * Math.PI) / 180;
    const px = x + headRadius * Math.cos(angle);
    const py = y + bodyHeight + headRadius * Math.sin(angle);
    head.push([px, py]);
  }
  
  drawLines([body, head]);
}

let x = 0; 
for (let i = 0; i < numBuildings; i++) {
  const buildingWidth = randIntInRange(minBuildingWidth, maxBuildingWidth);
  const buildingHeight = randIntInRange(minBuildingHeight, maxBuildingHeight);
  
  if (x + buildingWidth > width) break;

  drawBuilding(x, buildingHeight, buildingWidth);
  x += buildingWidth + randIntInRange(5, 10); 
}

for (let i = 0; i < randIntInRange(3, 6); i++) {
  const personX = randIntInRange(0, width);
  const personY = 0; 
  drawPerson(personX, personY);
}
const numClouds = randIntInRange(3, 6);
for (let i = 0; i < numClouds; i++) {
  const cloudX = randIntInRange(0, width);
  const cloudY = randIntInRange(height / 2, height); 
  const cloudSize = randIntInRange(10, 20); 
  drawCloud(cloudX, cloudY, cloudSize);
}

const sunRadius = 10;
const sunCenter = [15, height - 15]; 
const sun = [];
for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
  const x = sunCenter[0] + sunRadius * Math.cos(angle);
  const y = sunCenter[1] + sunRadius * Math.sin(angle);
  sun.push([x, y]);
}
drawLines([sun]);

function drawCloud(x, y, size) {
  const baseRadius = size / 5;

  const parts = [
    [x, y, baseRadius],                      
    [x - baseRadius, y - baseRadius, baseRadius],  
    [x + baseRadius, y - baseRadius, baseRadius], 
    [x - baseRadius * 1.5, y, baseRadius],       
    [x + baseRadius * 1.5, y, baseRadius],      
    [x, y + baseRadius, baseRadius],           
  ];

  // Draw each arc
  for (let i = 0; i < parts.length; i++) {
    const [px, py, radius] = parts[i];

    const startAngle = i === 0 ? 0 : Math.PI * 1.2; 
    const endAngle = i === 0 ? Math.PI * 2 : Math.PI * 0.8;

    const arc = [];
    for (let angle = startAngle; angle <= endAngle; angle += 0.1) {
      const arcX = px + radius * Math.cos(angle);
      const arcY = py + radius * Math.sin(angle);
      arc.push([arcX, arcY]);
    }
    drawLines([arc]);
  }
}
