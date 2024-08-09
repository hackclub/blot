/*
@title: Sad face emoji
@author: Sasan
@snapshot: 1.png
*/




// Set up document dimensions
const width = 125;
const height = 125;

setDocDimensions(width, height);

const faceRadius = 50;
const eyeRadius = 5;
const mouthRadius = 20;
// Helper function to draw a circle
const drawCircle = (center, radius) => {
    const points = [];
    const numPoints = 100; // Number of points to approximate the circle

    for (let i = 0; i <= numPoints; i++) {
        const angle = 2 * Math.PI * (i / numPoints);
        points.push([
            center[0] + radius * Math.cos(angle),
            center[1] + radius * Math.sin(angle)
        ]);
    }

    return points;
};

// Define the face parameters
const faceCenter = [width / 2, height / 2];


// Define eyes parameters

const leftEyeCenter = [width / 2 - 20, height / 2 + 20];
const rightEyeCenter = [width / 2 + 20, height / 2 + 20];

// Define mouth parameters

const mouthCenter = [width / 2, height / 2 - 20];
const mouthStartAngle = Math.PI / 6;  // Start angle for the mouth
const mouthEndAngle = 5 * Math.PI / 6; // End angle for the mouth

// Draw the face
const face = drawCircle(faceCenter, faceRadius);
const leftEye = drawCircle(leftEyeCenter, eyeRadius);
const rightEye = drawCircle(rightEyeCenter, eyeRadius);

// Draw the mouth
const mouth = [];
const numMouthPoints = 30; // Number of points to approximate the arc
for (let i = 0; i <= numMouthPoints; i++) {
    const t = i / numMouthPoints;
    const angle = mouthStartAngle + t * (mouthEndAngle - mouthStartAngle);
    mouth.push([
        mouthCenter[0] + mouthRadius * Math.cos(angle),
        mouthCenter[1] + mouthRadius * Math.sin(angle)
    ]);
}

// Combine all parts of the face
const faceParts = [...face, ...leftEye, ...rightEye, ...mouth];

// Draw all parts
drawLines([face, leftEye, rightEye, mouth]);
