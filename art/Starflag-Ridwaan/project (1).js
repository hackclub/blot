
const width = 120;
const height = 120;

setDocDimensions(width, height);

const finalLines = [];

const rect1 = rect(85, 56)

bt.join(finalLines, rect1)


const finalLinesBounds = bt.bounds(finalLines);


bt.translate(
  finalLines,
  [ width / 2, height / 2 ], 
  finalLinesBounds.cc
); 

drawLines(finalLines);

function rect(w, h) {

 
  return [
    [
      [-w/2, h/2],
      [w/2, h/2],
      [w/2, -h/2],
      [-w/2, -h/2],
      [-w/2, h/2],
    ]
  ]
}


function star(x, y, size) {
    const points = [];
    for (let i = 0; i < 10; i++) {
        const angle = Math.PI / 2 + (Math.PI * 2 * i / 10);
        const length = i % 2 === 0 ? size : size / 2;  
        const endX = x + length * Math.cos(angle);
        const endY = y + length * Math.sin(angle);
        points.push([endX, endY]);
    }
    
    const starLines = [];
    for (let i = 0; i < points.length; i++) {
        starLines.push([points[i], points[(i + 1) % points.length]]); 
    }
    
    drawLines(starLines);
}
const starSize = 10;
const rows = 0;
const columns = 1;
const xOffset = -1
const yOffset = 1
for (let row = -1; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const x = 61+col * xOffset;
        const y = -58+height - ((row + 1) * yOffset);
        star(x, y, starSize);
        if (col === 5) continue; 
      if(row===4) continue;
star(x + xOffset / -11, y - yOffset / -12, starSize);
    }
}