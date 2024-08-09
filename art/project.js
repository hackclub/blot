/*
@title: Indian Flag
@author: Dibya
*/

const width = 300;
const height = 180;
setDocDimensions(width, height);

// Stripe heights
const stripeHeight = height / 3;

// Draw the stripes
function drawStripe(y, color) {
    drawLines([
        [[0, y], [width, y]]
    ], color);
}

drawStripe(0, 'saffron'); // Top stripe (Saffron)
drawStripe(stripeHeight, 'white'); // Middle stripe (White)
drawStripe(2 * stripeHeight, 'green'); // Bottom stripe (Green)

// Draw the Ashoka Chakra
const chakraRadius = 15;
const chakraX = width / 2;
const chakraY = stripeHeight + stripeHeight / 2;

function drawChakra(x, y, radius) {
    const spokes = 24;
    const points = [];
    for (let i = 0; i < spokes; i++) {
        const angle = Math.PI * 2 * i / spokes;
        const endX = x + radius * Math.cos(angle);
        const endY = y + radius * Math.sin(angle);
        points.push([endX, endY]);
    }
    const lines = [];
    for (let i = 0; i < points.length; i++) {
        lines.push([points[i], points[(i + 1) % points.length]]);
    }
    drawLines(lines, 'navy'); // Draw the outer circle of the Ashoka Chakra

    // Draw the 24 spokes
    for (let i = 0; i < spokes; i++) {
        const angle = Math.PI * 2 * i / spokes;
        const endX = x + radius * Math.cos(angle);
        const endY = y + radius * Math.sin(angle);
        drawLines([
            [[x, y], [endX, endY]]
        ], 'navy');
    }
}

// Draw the Ashoka Chakra
drawChakra(chakraX, chakraY, chakraRadius);
