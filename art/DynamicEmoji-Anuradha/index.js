/*
@title: Dynamic Emoji
@author: Anuradha
@snapshot: 1.png
*/
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Variables
const eyeRadius = 5;
const headCenter = [width / 2, height / 2];
const headRadius = 50;

function approximateCircle(center, radius, segments = 32) {
    const angleStep = (2 * Math.PI) / segments;
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        points.push([
            center[0] + radius * Math.cos(angle),
            center[1] + radius * Math.sin(angle)
        ]);
    }
    return points;
}

function generateHair(numHairs) {
    const hairs = [];
    const centerX = width / 2;
    const centerY = height / 2 - 1;
    const radius = 50;

    for (let i = 0; i < numHairs; i++) {
        const angle = (i / numHairs) * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Hair strand
        const hairLength = 9;
        const hairEndX = x + hairLength * Math.cos(angle);
        const hairEndY = y + hairLength * Math.sin(angle);

        const hair = [
            [x, y], [hairEndX, hairEndY]
        ];
        hairs.push(hair);
    }
    return hairs;
}

function generateEmoji(type) {
    const finalLines = [];

    // Head
    const head = [approximateCircle(headCenter, headRadius)];
    bt.join(finalLines, head);

    // Eyes
    const leftEye = approximateCircle([width / 2 - 15, height / 2 + 10], eyeRadius);
    const rightEye = approximateCircle([width / 2 + 15, height / 2 + 10], eyeRadius);
    bt.join(finalLines, [leftEye]);
    bt.join(finalLines, [rightEye]);

    // Mouth
    let mouth;
    if (type === 'sad') {
        mouth = bt.nurbs([
            [width / 2 - 15, height / 2 - 20],
            [width / 2, height / 2 - 10],
            [width / 2 + 15, height / 2 - 20]
        ]);
    } else if (type === 'happy') {
        mouth = bt.nurbs([
            [width / 2 - 15, height / 2 - 10],
            [width / 2, height / 2 - 20],
            [width / 2 + 15, height / 2 - 10]
        ]);
    } else if (type === 'surprised') {
        mouth = approximateCircle([width / 2, height / 2 - 15], 10);
    } else if (type === 'angry') {
        mouth = bt.nurbs([
            [width / 2 - 15, height / 2 - 20],
            [width / 2, height / 2 - 10],
            [width / 2 + 15, height / 2 - 20]
        ]);
    } else {
        // Default to neutral
        mouth = bt.nurbs([
            [width / 2 - 15, height / 2 - 10],
            [width / 2, height / 2 - 10],
            [width / 2 + 15, height / 2 - 10]
        ]);
    }
    bt.join(finalLines, [mouth]);

    // Eyebrow
    let leftEyebrow, rightEyebrow;
    if (type === 'sad') {
        leftEyebrow = bt.nurbs([
            [width / 2 - 20, height / 2 + 20],
            [width / 2 - 15, height / 2 + 25],
            [width / 2 - 10, height / 2 + 20]
        ]);
        rightEyebrow = bt.nurbs([
            [width / 2 + 10, height / 2 + 20],
            [width / 2 + 15, height / 2 + 25],
            [width / 2 + 20, height / 2 + 20]
        ]);
    } else if (type === 'happy') {
        leftEyebrow = bt.nurbs([
            [width / 2 - 25, height / 2 + 20],
            [width / 2 - 21, height / 2 + 34],
            [width / 2, height / 2 + 27]
        ]);
        rightEyebrow = bt.nurbs([
            [width / 3 + 26, height / 2 + 26],
            [width / 2 + 20, height / 2 + 35],
            [width / 2 + 30, height / 2 + 24]
        ]);
    } else if (type === 'surprised') {
        leftEyebrow = bt.nurbs([
            [width / 2 - 20, height / 2 + 30],
            [width / 2 - 10, height / 2 + 35],
            [width / 2, height / 2 + 30]
        ]);
        rightEyebrow = bt.nurbs([
            [width / 2 + 10, height / 2 + 30],
            [width / 2 + 20, height / 2 + 36],
            [width / 2 + 30, height / 2 + 26]
        ]);
    } else if (type === 'angry') {
        leftEyebrow = bt.nurbs([
            [width / 2 - 20, height / 2 + 25],
            [width / 2 - 10, height / 2 + 20],
            [width / 2 - 5, height / 2 + 25]
        ]);
        rightEyebrow = bt.nurbs([
            [width / 2 + 9, height / 2 + 26],
            [width / 2 + 20, height / 2 + 17],
            [width / 2 + 25, height / 2 + 25]
        ]);
    }
    bt.join(finalLines, [leftEyebrow]);
    bt.join(finalLines, [rightEyebrow]);

    const hairs = generateHair(numHairs);
    bt.join(finalLines, hairs);

    const finalBounds = bt.bounds(finalLines);
    const finalScale = width / finalBounds.width * 0.93;
    bt.scale(finalLines, finalScale);
    bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

    drawLines(finalLines);
}

// no of hairs in randomly multiples of 6
const numHairs = Math.floor(Math.random() * 10) * 6;

// select the emoji type randomy
const emojiTypes = ['sad', 'happy', 'angry', 'surprised'];
const randomEmojiType = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];

generateEmoji(randomEmojiType);
