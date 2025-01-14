/* 
@title: Scribbles 
@author: Tanish 
@snapshot: snip.png, snip(1).png, snip(2).png 
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Number of lines to draw
const numLines = 100;

// Function to generate a pseudo-random number using a simple hash function
function pseudoRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;  // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Generate a consistent yet variable seed based on the current date and time
let seed = new Date().toISOString();

// Function to get a pseudo-random integer
function getPseudoInt(min, max) {
    seed += "x";
    return min + (pseudoRandom(seed) % (max - min + 1));
}

// Function to get a pseudo-random color
function getPseudoColor() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        const pseudoHex = getPseudoInt(0, 15).toString(16);
        color += pseudoHex;
    }
    return color;
}

// Function to calculate evenly spaced points
function calculatePoint(index, total, dimension) {
    const spacing = dimension / total;
    return Math.floor(index * spacing + spacing / 2);
}

// Directions
const directions = [
    [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]
];

// Draw 100 non-intersecting lines
for (let i = 0; i < numLines; i++) {
    const x1 = calculatePoint(i % 10, 10, width);
    const y1 = calculatePoint(Math.floor(i / 10), 10, height);
    const [dx, dy] = directions[getPseudoInt(0, directions.length - 1)];
    const length = Math.min(width, height) / 10;
    const x2 = Math.max(0, Math.min(width, x1 + dx * length));
    const y2 = Math.max(0, Math.min(height, y1 + dy * length));
    const color = getPseudoColor();
    drawLines([
        [[x1, y1], [x2, y2]]
    ], { color: color });
}
