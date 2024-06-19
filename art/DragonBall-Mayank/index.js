/*
@title: DragonBall
@author: Mayank
@snapshot: snapshot3.png
*/

// Set up the canvas dimensions
const width = 200;
const height = 200;
setDocDimensions(width, height);

// Function to draw a star
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    const path = [];

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        path.push([x, y]);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        path.push([x, y]);
        rot += step;
    }
    path.push([cx, cy - outerRadius]);
    drawLines([path], { fill: "red" });
}

// Function to get star positions based on the number of stars
function getStarPositions(numStars, cx, cy, radius) {
    const positions = {
        1: [[cx, cy]],
        2: [[cx - radius / 2, cy], [cx + radius / 2, cy]],
        3: [[cx, cy - radius / 2], [cx - radius / 3, cy + radius / 3], [cx + radius / 3, cy + radius / 3]],
        4: [[cx - radius / 3, cy - radius / 3], [cx + radius / 3, cy - radius / 3], [cx - radius / 3, cy + radius / 3], [cx + radius / 3, cy + radius / 3]],
        };
    return positions[numStars] || [];
}

// Main drawing function
function drawDragonBall(numStars) {
    // Set up the circle parameters
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    // Draw the orange circle
    const circlePath = new bt.Turtle();
    circlePath.up();
    circlePath.goTo([centerX, centerY - radius]);
    circlePath.down();
    circlePath.arc(360, radius);

    // Render the circle
    drawLines([circlePath.lines()[0]], { fill: "orange" });

    // Get the star positions and draw the stars
    const starPositions = getStarPositions(numStars, centerX, centerY, radius / 2);
    starPositions.forEach(pos => {
        drawStar(pos[0], pos[1], 5, 10, 5);
    });
}

// Specify the number of stars
const numStars = 4; // Change this value to draw a different Dragon Ball
drawDragonBall(numStars);
