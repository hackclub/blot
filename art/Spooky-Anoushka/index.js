/*
@title: Spooky
@author: Anoushka
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

function generateWeb(centerX, centerY, radius, layers) {
  const polylines = [];
  const radials = 12;
  const angleStep = (2 * Math.PI) / radials;

  for (let i = 1; i <= layers; i++) {
    const layerRadius = (radius / layers) * i;
    const points = [];
    for (let j = 0; j < radials; j++) {
      const angle = j * angleStep;
      const x = centerX + Math.cos(angle) * layerRadius;
      const y = centerY + Math.sin(angle) * layerRadius;
      points.push([x, y]);
    }
    points.push(points[0]); 
    polylines.push(points);
  }

  for (let i = 0; i < radials; i++) {
    const angle = i * angleStep;
    const line = [
      [centerX, centerY],
      [centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius],
    ];
    polylines.push(line);
  }

  return polylines;
}

function generateBat(x, y, size) {
  const wingSpan = size * 2;
  const wingDip = size * 0.5;
  const bodyWidth = size * 0.6;
  const bodyHeight = size * 1.2;

  const bat = bt.catmullRom([
    [x, y], 
    [x - wingSpan / 2, y - size * 0.3], 
    [x - wingSpan * 0.75, y - wingDip], 
    [x - wingSpan, y - size], 
    [x - wingSpan * 0.75, y - size * 1.5], 
    [x - bodyWidth, y - bodyHeight], 
    [x, y - bodyHeight * 1.5], 
    [x + bodyWidth, y - bodyHeight], 
    [x + wingSpan * 0.75, y - size * 1.5], 
    [x + wingSpan, y - size], 
    [x + wingSpan * 0.75, y - wingDip],
    [x + wingSpan / 2, y - size * 0.3], 
    [x, y], 
  ]);
  return [bat];
}

function generateBats(numBats) {
  const bats = [];
  for (let i = 0; i < numBats; i++) {
    const x = Math.random() * width; 
    const y = Math.random() * height; 
    const size = 8 + Math.random() * 12; 
    bats.push(...generateBat(x, y, size));
  }
  return bats;
}

const web = generateWeb(width / 2, height / 2, 80, 6);
const bats = generateBats(8); 

const design = [...web, ...bats];

drawLines(design, { strokeStyle: 'black', lineWidth: 1.5 });


const design = [...spiderWeb, ...bats];

drawLines(design, { strokeStyle: 'black', lineWidth: 1.5 });
