/*
@title: Scribbles
@author: Tanish
@snapshot: snip.png
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
let seed = new Date().toISOString();  // Changed to 'let'

// Function to get a pseudo-random integer
function getPseudoInt(min, max) {
    seed += "x";  // Alter the seed to change results
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

// Draw lines with pseudo-random colors
for (let i = 0; i < numLines; i++) {
    const x1 = getPseudoInt(0, width);
    const y1 = getPseudoInt(0, height);
    const x2 = getPseudoInt(0, width);
    const y2 = getPseudoInt(0, height);
    const color = getPseudoColor();
    drawLines([
        [[x1, y1], [x2, y2]]
    ], { color: color });
}
