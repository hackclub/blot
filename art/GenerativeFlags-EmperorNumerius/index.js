/*
@title: Generative Flags v1.0
@author: Emperor Numerius
@snapshot: flag2.svg
*/

const width = 190;
const height = 100;
setDocDimensions(width, height);

//Minimum and Maximum number of stripes
const minNumStripes = 3;
const maxNumStripes = 9;


// Helper function to generate random colors
function getRandomColor() {
    const colors = ["Tomato", "Peru", "orange", "Sienna", "gray", "yellow", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Draw the background
drawLines([[[0, 0], [width, 0], [width, height], [0, height], [0, 0]]], { stroke: getRandomColor() });

// Draw the stripes
const numStripes = bt.randIntInRange(minNumStripes, maxNumStripes); // Random number of stripes
const stripeHeight = height / numStripes;
for (let i = 0; i < numStripes; i++) {
    const y = i * stripeHeight;
    const x = i * stripeHeight; // For diagonal stripes
    let color = getRandomColor(); // Default color

    if (i % 3 === 0) {
        // Diagonal stripe
        drawLines([[[0, y], [width, y + stripeHeight]]], { stroke: color, width : 5 });
    } else if (i % 2 === 0) {
        // Horizontal stripe
        color = getRandomColor(); // Alternate colors
        drawLines([[[0, y], [width, y]]], { stroke: color, width : 5 });
    } else {
        // Vertical stripe
        drawLines([[[x, 0], [x, height]]], { stroke: color, width : 5 });
    }
}

// Draw emblem
const emblemSize = Math.min(width, height) * bt.randInRange(0.1, 0.3); // Random size
const emblemX = bt.randInRange(emblemSize, width - emblemSize); // Random x position
const emblemY = bt.randInRange(emblemSize, height - emblemSize); // Random y position

const numPoints = bt.randIntInRange(5, 12); // Random number of points for the emblem
const emblemPoints = [];
for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 * i) / numPoints; // Evenly spaced points around a circle
    const x = emblemX + (emblemSize / 2) * Math.cos(angle);
    const y = emblemY + (emblemSize / 2) * Math.sin(angle);
    emblemPoints.push([x, y]);
}
emblemPoints.push(emblemPoints[0]); // Connect last point to the first to close the shape
drawLines([emblemPoints], { stroke: getRandomColor(), width : 5 });

// Draw the flag border
drawLines([[[0, 0], [0, height], [width, height], [width, 0], [0, 0]]]);
