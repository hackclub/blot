/*
@title: Spider Web
@author: Will M
@snapshot: snapshot0.jpg snapshot1.jpg snapshot2.jpg
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomSpiderwebLines() {
    const lines = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const numLines = 45;
    const maxRadius = Math.min(width, height) / 2;

    for (let i = 0; i < numLines; i++) {
        const angle = randomInRange(0, Math.PI * 5); 
        const length = randomInRange(0.5, 1) * maxRadius; 
        const endX = centerX + Math.cos(angle) * length;
        const endY = centerY + Math.sin(angle) * length;
        lines.push([[centerX, centerY], [endX, endY]]);
    }
    return lines;
}

drawLines(generateRandomSpiderwebLines());

