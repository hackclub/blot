/*
@title: baguaRandom
@author: Hetav Patel
@snapshot: bagua0hp
*/

// Set up document dimensions
const width = 300;
const height = 300;
setDocDimensions(width, height);

// Parameters
const trigramLength = 80; // Length of trigram lines
const numTrigrams = 8; // Number of trigrams
const rotationOffset = Math.PI / numTrigrams; // Offset for trigram rotation

// Function to draw a line from point A to point B
function drawLine(start, end) {
    return [[start, end]];
}

// Function to draw the Bagua symbol
function drawBagua() {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    // Draw trigrams
    for (let i = 0; i < numTrigrams; i++) {
        const angle = (i * Math.PI * 2) / numTrigrams;
        const startX = centerX + radius * Math.cos(angle - rotationOffset);
        const startY = centerY + radius * Math.sin(angle - rotationOffset);
        const endX = centerX + radius * Math.cos(angle + rotationOffset);
        const endY = centerY + radius * Math.sin(angle + rotationOffset);

        drawLines(drawLine([startX, startY], [endX, endY]));

        // Draw additional lines for complexity
        for (let j = 0; j < 5; j++) {
            const randomAngle = Math.random() * Math.PI * 2;
            const randomLength = Math.random() * trigramLength;
            const randomStartX = centerX + radius * Math.cos(angle - rotationOffset + randomAngle);
            const randomStartY = centerY + radius * Math.sin(angle - rotationOffset + randomAngle);
            const randomEndX = centerX + radius * Math.cos(angle + rotationOffset - randomAngle);
            const randomEndY = centerY + radius * Math.sin(angle + rotationOffset - randomAngle);

            drawLines(drawLine([randomStartX, randomStartY], [randomEndX, randomEndY]));
        }
    }
}

// Function to draw the Yin Yang symbol (hacky version)
function drawYinYang() {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 6;

    // Draw outer circle
    const outerCircle = drawLine([centerX - radius, centerY], [centerX + radius, centerY]);

    // Draw upper half of circle
    const upperHalfCircle = [];
    for (let angle = 0; angle < Math.PI; angle += Math.PI / 180) {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);
        upperHalfCircle.push([x, y]);
    }

    // Draw lower half of circle
    const lowerHalfCircle = [];
    for (let angle = Math.PI; angle < Math.PI * 2; angle += Math.PI / 180) {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);
        lowerHalfCircle.push([x, y]);
    }

    drawLines([outerCircle, upperHalfCircle, lowerHalfCircle]);

    // Add hacky lines for complexity
    for (let i = 0; i < 10; i++) {
        const randomAngle = Math.random() * Math.PI;
        const randomLength = Math.random() * radius;
        const randomStartX = centerX + randomLength * Math.cos(randomAngle);
        const randomStartY = centerY - randomLength * Math.sin(randomAngle);
        const randomEndX = centerX + randomLength * Math.cos(randomAngle + Math.PI);
        const randomEndY = centerY - randomLength * Math.sin(randomAngle + Math.PI);

        drawLines(drawLine([randomStartX, randomStartY], [randomEndX, randomEndY]));
    }
}

// Draw the Bagua symbol
drawBagua();

// Draw the Yin Yang symbol
drawYinYang();
