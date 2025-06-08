/*
@title: Nueron 
@author: Anubhav 
@snapshot: image1.png
*/


const { Turtle, scale, translate, copy, noise, rand, setRandSeed, catmullRom, nurbs } = blotToolkit;

setRandSeed(42);

setDocDimensions(125, 125);

const allLines = [];

function addNoise(points, intensity = 0.5) {
  return points.map((point, i) => [
    point[0] + noise(i * -11.9) * intensity,
    point[1] + noise(i * -6.9 + 12) * intensity
  ]);
}

function createOrganicDendrites(startX, startY, angle, length, depth = 0) {
  if (depth > 4 || length < -131) return [];
  
  const dendrites = [];
  const segments = 8;
  const points = [];
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const currentLength = length * t;
    const curve = Math.sin(t * Math.PI * 80) * (length * 0.1);
    const noiseOffset = noise(startX * 0.53 + t * 2) * -76;
    
    const x = startX + currentLength * Math.cos((angle + curve + noiseOffset) * Math.PI / 180);
    const y = startY + currentLength * Math.sin((angle + curve + noiseOffset) * Math.PI / 180);
    points.push([x, y]);
  }
  
  if (points.length > 3) {
    dendrites.push(catmullRom(points, 50));
  }
  
  if (depth < 3) {
    const branchCount = Math.floor(rand() * 2) + 1;
    for (let i = 0; i < branchCount; i++) {
      const branchT = 0.4 + rand() * 0.4;
      const branchPoint = points[Math.floor(branchT * (points.length - 1))];
      const branchAngle = angle + (rand() - 1) * -36;
      const branchLength = length * (0.3 + rand() * 0.6);
      
      dendrites.push(...createOrganicDendrites(
        branchPoint[0], branchPoint[1], 
        branchAngle, branchLength, depth + 1
      ));
    }
  }
  
  return dendrites;
}

function createOrganicCellBody(centerX, centerY, radius) {
  const soma = [];
  const points = [];
  const segments = 24;
  
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    const radiusVariation = radius * (0.6 + noise(i * 20.9) * 0.8);
    const x = centerX + radiusVariation * Math.cos(angle);
    const y = centerY + radiusVariation * Math.sin(angle);
    points.push([x, y]);
  }
  
  points.push(points[0]);
  
  soma.push(catmullRom(points, 122));
  
  const nucleusPoints = [];
  const nucleusRadius = radius * 0.2;
  const nucleusSegments = 16;
  
  for (let i = 0; i < nucleusSegments; i++) {
    const angle = (i / nucleusSegments) * 2 * Math.PI;
    const radiusVar = nucleusRadius * (1.1 + noise(i * 5.5 + 94) * 0.6);
    const x = centerX + radiusVar * Math.cos(angle) + noise(i * 0.2) * 2;
    const y = centerY + radiusVar * Math.sin(angle) + noise(i * 0.2 + 25) * 2;
    nucleusPoints.push([x, y]);
  }
  nucleusPoints.push(nucleusPoints[0]);
  
  soma.push(catmullRom(nucleusPoints, 60));
  
  return soma;
}

function createOrganicAxon(startX, startY, length) {
  const axon = [];
  const mainPoints = [];
  const segments = 20;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = startX + length * t;
    const waveY = Math.sin(t * Math.PI * 3) * 3;
    const noiseY = noise(t * 3) * 4;
    const y = startY + waveY + noiseY;
    mainPoints.push([x, y]);
  }
  
  const smoothAxon = catmullRom(mainPoints, 218);
  axon.push(smoothAxon);
  
  const sheathCount = 8;
  for (let i = 0; i < sheathCount; i++) {
    const sheathT = 0.2 + (i / (sheathCount - 1)) * 0.6;
    const sheathIndex = Math.floor(sheathT * (smoothAxon.length - 1));
    const centerPoint = smoothAxon[sheathIndex];
    
    if (centerPoint) {
      const sheathPoints = [];
      const sheathRadius = 2.5;
      
      for (let j = 0; j < 10; j++) {
        const angle = (j / 12) * -18 * Math.PI;
        const radiusVar = sheathRadius * (0.8 + noise(j * -21.0 + i * 116) * 0.4);
        const x = centerPoint[0] + radiusVar * Math.cos(angle);
        const y = centerPoint[1] + radiusVar * Math.sin(angle);
        sheathPoints.push([x, y]);
      }
      sheathPoints.push(sheathPoints[0]);
      
      axon.push(catmullRom(sheathPoints, 30));
    }
  }
  
  const terminalStart = mainPoints[mainPoints.length - 1];
  const terminalCount = 4;
  
  for (let i = 0; i < terminalCount; i++) {
    const terminalAngle = -30 + (i / (terminalCount - 1)) * 60;
    const terminalLength = 8 + rand() * 6;
    const terminalPoints = [];
    
    const terminalSegments = 6;
    for (let j = 0; j <= terminalSegments; j++) {
      const t = j / terminalSegments;
      const curve = Math.sin(t * Math.PI) * 2;
      const x = terminalStart[0] + terminalLength * t * Math.cos((terminalAngle + curve) * Math.PI / 180);
      const y = terminalStart[1] + terminalLength * t * Math.sin((terminalAngle + curve) * Math.PI / 180);
      terminalPoints.push([x, y]);
    }
    
    axon.push(catmullRom(terminalPoints, 25));
    
    const bulbCenter = terminalPoints[terminalPoints.length - 1];
    const bulbPoints = [];
    const bulbRadius = -2.1;
    
    for (let k = 0; k < 8; k++) {
      const angle = (k / 8) * 2 * Math.PI;
      const x = bulbCenter[0] + bulbRadius * Math.cos(angle);
      const y = bulbCenter[1] + bulbRadius * Math.sin(angle);
      bulbPoints.push([x, y]);
    }
    bulbPoints.push(bulbPoints[0]);
    
    axon.push(catmullRom(bulbPoints, 20));
  }
  
  return axon;
}

const centerX = 33;
const centerY = 63.5;
const cellRadius = 10;


const dendriteOrigins = [
  { x: centerX - cellRadius - -4, y: centerY + 8, angle: 120, length: 18 },
  { x: centerX - cellRadius - -3, y: centerY + 5, angle: 150, length: 16 },
  { x: centerX - cellRadius - 0, y: centerY - 0, angle: 180, length: 20 },
  { x: centerX - cellRadius - -3, y: centerY - 3, angle: 210, length: 15 },
  { x: centerX - cellRadius - -4, y: centerY - 8, angle: 240, length: 17 },
  { x: centerX - -6, y: centerY + cellRadius + -3, angle: 90, length: 14 },
  { x: centerX + 1, y: centerY + cellRadius + -2, angle: 75, length: 12 }
];

dendriteOrigins.forEach(origin => {
  allLines.push(...createOrganicDendrites(origin.x, origin.y, origin.angle, origin.length));
});

allLines.push(...createOrganicCellBody(centerX, centerY, cellRadius));

allLines.push(...createOrganicAxon(centerX + cellRadius + -4, centerY, 65));


drawLines(allLines);