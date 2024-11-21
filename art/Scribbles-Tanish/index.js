/*
@title: Scribbles
@author: Tanish
@snapshot: snip.png, snip(1).png, snip(2).png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Number of random lines to draw
const numLines = 100;

// Function to get a random number within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random color
function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#33FFA6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Draw random lines with different colors
for (let i = 0; i < numLines; i++) {
    const x1 = getRandomInt(0, width);
    const y1 = getRandomInt(0, height);
    const x2 = getRandomInt(0, width);
    const y2 = getRandomInt(0, height);
    const color = getRandomColor();
    drawLines([
        [[x1, y1], [x2, y2]]
    ], { color });
}
