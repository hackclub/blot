/*
@title: DragonBall
@author: Mayank
@snapshot: snapshot2.png
*/

const width = 200;
const height = 200;
setDocDimensions(width, height);

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

function getStarPositions(numStars, cx, cy, radius) {
    const positions = {
        1: [[cx, cy]],
        2: [[cx - radius / 2, cy], [cx + radius / 2, cy]],
        3: [[cx, cy - radius / 2], [cx - radius / 3, cy + radius / 3], [cx + radius / 3, cy + radius / 3]],
        4: [[cx - radius / 3, cy - radius / 3], [cx + radius / 3, cy - radius / 3], [cx - radius / 3, cy + radius / 3], [cx + radius / 3, cy + radius / 3]],
        5: [
            [cx, cy - radius * 0.75],
            [cx - radius * 0.65, cy - radius * 0.2],
            [cx + radius * 0.65, cy - radius * 0.2],
            [cx - radius * 0.4, cy + radius * 0.5],
            [cx + radius * 0.4, cy + radius * 0.5]
        ],
        6: [
            [cx, cy],
            [cx, cy - radius * 0.6],
            [cx - radius * 0.55, cy - radius * 0.2],
            [cx + radius * 0.55, cy - radius * 0.2],
            [cx - radius * 0.35, cy + radius * 0.4],
            [cx + radius * 0.35, cy + radius * 0.4]
        ],
        7: [
            [cx, cy],
            [cx, cy - radius * 0.6],
            [cx - radius * 0.55, cy - radius * 0.35],
            [cx + radius * 0.55, cy - radius * 0.35],
            [cx - radius * 0.55, cy + radius * 0.35],
            [cx + radius * 0.55, cy + radius * 0.35],
            [cx, cy + radius * 0.6]
        ]
    };
    return positions[numStars] || [];
}

function drawDragonBall(numStars) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    const circlePath = new bt.Turtle();
    circlePath.up();
    circlePath.goTo([centerX, centerY - radius]);
    circlePath.down();
    circlePath.arc(360, radius);

    drawLines([circlePath.lines()[0]], { fill: "orange" });

    const starPositions = getStarPositions(numStars, centerX, centerY, radius / 2);
    starPositions.forEach(pos => {
        drawStar(pos[0], pos[1], 5, 10, 5);
    });
}
function randomBetween1And7() {
  return Math.floor(Math.random() * 7) + 1;
}

// Assigning a random number between 1 and 7 to a variable
const numStars = randomBetween1And7();

drawDragonBall(numStars);
