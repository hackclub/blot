/*
@title: Spooky
@author: Anoushka
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

function generateWing(x, y, size, flip = 1) {
  return bt.catmullRom([
    [x, y],                                   
    [x + flip * size * 0.25, y - size * 0.2], 
    [x + flip * size * 0.5, y - size * 0.5],  
    [x + flip * size * 0.25, y - size * 0.8], 
    [x, y - size * 0.6],                      
  ]);
}

function generateBat(x, y, size) {
  const body = [
    [x - size * 0.1, y - size * 0.6],
    [x + size * 0.1, y - size * 0.6],
  ];

  const leftWing = generateWing(x - size * 0.1, y - size * 0.6, size, -1);
  const rightWing = generateWing(x + size * 0.1, y - size * 0.6, size, 1);

  return [...body, ...leftWing, ...rightWing];
}

const bats = [];
const batCount = 10;

for (let i = 0; i < batCount; i++) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const size = Math.random() * 20 + 10;
  const bat = generateBat(x, y, size);

  bats.push(bat);
}

function drawSpiderWeb(centerX, centerY, radius, layers) {
  const radialCount = 12;
  const angleStep = (2 * Math.PI) / radialCount;

  const circles = [];
  for (let i = 1; i <= layers; i++) {
    const layerRadius = (radius / layers) * i;
    const points = [];
    for (let angle = 0; angle <= 2 * Math.PI; angle += 0.2) {
      const x = centerX + Math.cos(angle) * layerRadius;
      const y = centerY + Math.sin(angle) * layerRadius;
      points.push([x, y]);
    }
    circles.push(bt.resample([points], 1)[0]);
  }

  const radials = [];
  for (let i = 0; i < radialCount; i++) {
    const angle = i * angleStep;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    radials.push([[centerX, centerY], [x, y]]);
  }

  return [...circles, ...radials];
}

const spiderWeb = drawSpiderWeb(width / 2, height / 2, 80, 6);

const design = [...spiderWeb, ...bats];

drawLines(design, { strokeStyle: 'black', lineWidth: 1.5 });
