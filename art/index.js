/*
@title: Hexagonal Art 0_0
@author: Kiya
@snapshot: image1.png
*/

const width = 120;
const height = 120;

setDocDimensions(width, height);

const finalLines = [];

function hexagon(sideLength) {
  const angle = Math.PI / 3; 
  const hex = [];
  
  for (let i = 0; i < 6; i++) {
    hex.push([
      sideLength * Math.cos(i * angle),
      sideLength * Math.sin(i * angle)
    ]);
  }
  
  hex.push(hex[0]); 
  return hex;
}

const sideLength = 5;
const gridWidth = 5;

const hDist = sideLength * 1.5; 
const vDist = Math.sqrt(3) * sideLength; 

for (let i = 0; i < gridWidth; i++) {
  for (let j = 0; j < gridWidth; j++) {
    const hex = hexagon(sideLength);
    
    let x = hDist * i;
    let y = vDist * j;
    
    if (i % 2 === 1) {
      x += hDist / 2;
    }

    const translatedHex = hex.map(([px, py]) => [px + x, py + y]);
    
    finalLines.push(translatedHex);
  }
}

const finalLinesBounds = bt.bounds(finalLines);

bt.translate(
  finalLines,
  [width / 2 - finalLinesBounds.cc[0], height / 2 - finalLinesBounds.cc[1]]
); 

drawLines(finalLines);
