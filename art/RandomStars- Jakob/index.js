/*
@title: RandomStars
@author: Jakob
@snapshot: this file (index.js)
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

// Parameters for customization
const numStars = 15;
const spiralTurns = 3;
const maxStarSize = 6;
const minStarSize = 3;
const spacingFactor = 1.5;
const randSeed = Math.random(); // To generate different versions

// Set the random seed for reproducibility
function randomSeed(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function getRandom() {
    return randomSeed(randSeed);
}

// Function to draw a star
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    const step = Math.PI / spikes;
    let path = [];
    let angle = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    path.push([cx, cy - outerRadius]);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(angle) * outerRadius;
        y = cy + Math.sin(angle) * outerRadius;
        path.push([x, y]);
        angle += step;

        x = cx + Math.cos(angle) * innerRadius;
        y = cy + Math.sin(angle) * innerRadius;
        path.push([x, y]);
        angle += step;
    }
    path.push([cx, cy - outerRadius]);
    return path;
}

// Generate spiral with stars
let spiral = [];
const centerX = width / 2;
const centerY = height / 2;
const maxRadius = Math.min(width, height) / 2;

for (let i = 0; i < numStars; i++) {
    const t = (i / numStars) * spiralTurns * 2 * Math.PI;
    const radius = (i / numStars) * maxRadius * spacingFactor;
    const x = centerX + radius * Math.cos(t);
    const y = centerY + radius * Math.sin(t);

    const spikes = Math.floor(getRandom() * 5) + 5; // Random number of spikes between 5 and 9
    const outerRadius = getRandom() * (maxStarSize - minStarSize) + minStarSize;
    const innerRadius = outerRadius / 2;

    const star = drawStar(x, y, spikes, outerRadius, innerRadius);
    spiral.push(star);
}

// Center the spiral in the document
bt.translate(spiral, [width / 2, height / 2], bt.bounds(spiral).cc);

// Draw the spiral with stars
drawLines(spiral);
