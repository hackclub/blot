/*
@title: Galaxy
@author: Armaanpreet Singh
@snapshot: snapshot1.png
*/


const width = 238;
const height = 203;
setDocDimensions(width, height);

// Function to generate a star with random size
const createStar = (x, y) => {
    const star = new bt.Turtle();
    const size = bt.randInRange(0.5, 2);
    for (let i = 0; i < 5; i++) {
        star.forward(size).right(144);
    }
    return bt.translate(star.lines(), [x, y]);
};

// Function to generate a spiral arm with stars
const createSpiralArm = (centerX, centerY, numStars, angleOffset, spiralTightness) => {
    let arm = [];
    for (let i = 0; i < numStars; i++) {
        const angle = i * spiralTightness + angleOffset;
        const distance = i * 1.5;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        arm = [...arm, ...createStar(x, y)];
    }
    return arm;
};

// Function to generate the entire galaxy with multiple spiral arms
const createGalaxy = (centerX, centerY, numArms, numStarsPerArm) => {
    let galaxy = [];
    for (let i = 0; i < numArms; i++) {
        const angleOffset = (i * 2 * Math.PI) / numArms;
        const spiralTightness = bt.randInRange(0.05, 0.2);
        const arm = createSpiralArm(centerX, centerY, numStarsPerArm, angleOffset, spiralTightness);
        galaxy = [...galaxy, ...arm];
    }
    return galaxy;
};

// Increase the number of arms and stars per arm for a more complex galaxy
const numArms = 8; // Increased number of spiral arms
const numStarsPerArm = 60; // More stars per arm

// Create the galaxy in the center of the document
const galaxy = createGalaxy(width / 2, height / 2, numArms, numStarsPerArm);

// Draw the galaxy
drawLines(galaxy);
