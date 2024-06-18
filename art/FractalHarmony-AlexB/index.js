/*
@title: Fractal Harmony
@author: Alex B
@snapshot: image1.png
*/

const width = 125;
const height = 125;
const centerX = 62.5;
const centerY = 62.5;
const size = 15;
const layers = 4; 
const simplification = 2;
setDocDimensions(width, height);

const finalLines = [];
const t = new bt.Turtle();

function drawComplexPattern(marker, level, x, y, length, maxLevel) {
    if (level === maxLevel) {
        return;
    }

    marker.jump([x, y - length]);
    marker.arc(360, length);

    for (let i = 0; i < 6; i++) {
        let angle = i * Math.PI / 3;
        let newX = x + Math.sin(angle) * length * 2;
        let newY = y + Math.cos(angle) * length * 2;

        const newSize = size / (level + 1); // Reduce size with each level
        marker.jump([newX, newY - newSize]);
        marker.arc(360, newSize);

        drawComplexPattern(marker, level + 1, newX, newY, newSize / 2, maxLevel);
    }
}

drawComplexPattern(t, 0, centerX, centerY, size, layers);

bt.join(finalLines, bt.simplify(t.lines(), simplification));
drawLines(finalLines);
