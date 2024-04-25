/*
@title: USA Flag
@author: Gautam
@snapshot: snapshot3.png
*/

const width = 190;
const height = 100;
setDocDimensions(width, height);
const sw = 76;

// stripes
for (let i = 0; i < 13; i++) {
    const stripeHeight = height / 13;
  if(i>5) {
     drawLines([
        [[sw, i * stripeHeight], [width, i * stripeHeight]]
    ]);
  } else {
    drawLines([
        [[0, i * stripeHeight], [width, i * stripeHeight]]
    ]);
  }
    if (i % 2 === 0) {
        for (let j = 0; j < 5; j++) {
            drawLines([
                [[i>5?sw:0, i * stripeHeight + j * stripeHeight / 5], [width, i * stripeHeight + (j + 1) * stripeHeight / 5]]
            ]);
        }
    }
}

const sh = 7 * (height / 13);

function star(x, y, size) {
    const points = [];
    for (let i = 0; i < 10; i++) {
        const angle = Math.PI / 2 + (Math.PI * 2 * i / 10);
        const length = i % 2 === 0 ? size : size / 2;  // Alternate between outer and inner points
        const endX = x + length * Math.cos(angle);
        const endY = y + length * Math.sin(angle);
        points.push([endX, endY]);
    }
    
    const starLines = [];
    for (let i = 0; i < points.length; i++) {
        starLines.push([points[i], points[(i + 1) % points.length]]); // Connect each point to the next
    }
    
    drawLines(starLines);
}
const starSize = 3;
const rows = 5;
const columns = 6;
const xOffset = 13
const yOffset = 11
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const x = 4+col * xOffset;
        const y = 6+height - ((row + 1) * yOffset);
        star(x, y, starSize);
        if (col === 5) continue; // Last row has one less star in each alternate position
      if(row===4) continue;
star(x + xOffset / 2, y - yOffset / 2, starSize);
    }
}
drawLines([
    [[0, height], [0, height - sh], [sw, height - sh], [sw, height], [0, height]]
]);
drawLines([
    [[0, 0], [0, height], [width, height], [width, 0]]
]);
