const width = 206;
const height = 248;
setDocDimensions(width, height);

const penguinCenter = [100, 150];
const bodyHeight = 180;
const bodyWidth = 120;
const wingWidth = 40;
const wingHeight = 80;
const eyeRadius = 10;
const beakWidth = 20;
const beakHeight = 30;
const eyeOffsetX = 30;
const eyeOffsetY = -50;

const finalLines = [];

// Function to draw an ellipse
function drawEllipse(center, width, height) {
    const points = [];
    for (let i = 0; i <= 360; i++) {
        const angle = i * Math.PI / 180;
        const x = center[0] + width * Math.cos(angle) / 2;
        const y = center[1] + height * Math.sin(angle) / 2;
        points.push([x, y]);
    }
    return points;
}

// Function to draw a circle
function drawCircle(center, radius) {
    return drawEllipse(center, radius * 2, radius * 2);
}

// Function to draw the beak
function drawBeak(center, width, height) {
    return [
        center,
        [center[0] - width / 2, center[1] + height],
        [center[0] + width / 2, center[1] + height],
        center
    ];
}

// Draw the body
finalLines.push(drawEllipse(penguinCenter, bodyWidth, bodyHeight));

// Draw the wings
const leftWingCenter = [penguinCenter[0] - bodyWidth / 2 + wingWidth / 2, penguinCenter[1]];
const rightWingCenter = [penguinCenter[0] + bodyWidth / 2 - wingWidth / 2, penguinCenter[1]];
finalLines.push(drawEllipse(leftWingCenter, wingWidth, wingHeight));
finalLines.push(drawEllipse(rightWingCenter, wingWidth, wingHeight));

// Draw the eyes
const leftEyeCenter = [penguinCenter[0] - eyeOffsetX, penguinCenter[1] + eyeOffsetY];
const rightEyeCenter = [penguinCenter[0] + eyeOffsetX, penguinCenter[1] + eyeOffsetY];
finalLines.push(drawCircle(leftEyeCenter, eyeRadius));
finalLines.push(drawCircle(rightEyeCenter, eyeRadius));

// Draw the beak
const beakCenter = [penguinCenter[0], penguinCenter[1] + eyeOffsetY + 20];
finalLines.push(drawBeak(beakCenter, beakWidth, beakHeight));


// Render the penguin
drawLines(finalLines);
