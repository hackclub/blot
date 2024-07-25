 /*
@title: Dynamic Grid of Circles
@author: Jakob
@snapshot: this file (index.js)
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const numCols = 10;
const numRows = 10;
const maxCircleSize = 10;
const minCircleSize = 2;

function drawCircle(cx, cy, radius) {
    let path = [];
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        path.push([x, y]);
    }
    return path;
}

let grid = [];
const colWidth = width / numCols;
const rowHeight = height / numRows;

for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const cx = col * colWidth + colWidth / 2;
        const cy = row * rowHeight + rowHeight / 2;
        const radius = Math.random() * (maxCircleSize - minCircleSize) + minCircleSize;
        const circle = drawCircle(cx, cy, radius);
        grid.push(circle);
    }
}

drawLines(grid);
