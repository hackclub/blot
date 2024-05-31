/*
@title: Night Landscape
@author: Yancheng Zhao
@snapshot: snapshot1.png
*/

// --- Customizable Things ---
const width = 256;
const height = 256;
// bt.setRandSeed(250)
// ---------------------------

setDocDimensions(width, height);

console.log(bt.noise(0.5, { octaves: 4, falloff: 50 }));
console.log(bt.noise([0.5, 2.4]));

const t = new bt.Turtle();

// Tree trunk
const bottomLeft = [bt.randInRange(width / 16, width / 4), 0];
const bottomRight = [
    bt.randInRange(bottomLeft[0] + width / 16, bottomLeft[0] + width / 8),
    0,
];
const topLeft = [
    bottomLeft[0] + bt.randInRange(-width / 32, width / 32),
    height / 2 + bt.randInRange(-height / 16, height / 16),
];
const topRight = [
    Math.max(bottomRight[0], topLeft[0] + width / 32) +
        bt.randInRange(-width / 32, width / 32),
    topLeft[1] + bt.randInRange(-height / 32, height / 32),
];
const middleLeft = [
    Math.max(bottomLeft[0], topLeft[0]) + bt.randInRange(0, width / 64),
    (bottomLeft[1] + topLeft[1]) / 2 +
        bt.randInRange(-height / 32, height / 32),
];
const middleRight = [
    Math.max(
        Math.min(bottomRight[0], topRight[0]),
        middleLeft[0] + width / 64
    ) + bt.randInRange(-width / 64, 0),
    (bottomRight[1] + topRight[1]) / 2 +
        bt.randInRange(-height / 32, height / 32),
];
const leftCurve = bt.catmullRom([bottomLeft, middleLeft, topLeft]);
const rightCurve = bt.catmullRom([bottomRight, middleRight, topRight]);

drawLines([leftCurve]);
drawLines([rightCurve]);

const avoidTreeLeft = Math.min(topLeft[0], bottomLeft[0]);
const avoidTreeRight = Math.max(topRight[0], bottomRight[0]);
const avoidTreeTop = Math.max(topLeft[1], topRight[1]);

// Leaves
const leafStart = [
    (topLeft[0] + topRight[0]) / 2,
    Math.min(topLeft[1], topRight[1]) - height / 32,
];
t.jump(leafStart);
t.up();
const leafR = bt.randInRange(
    (width + height) / 2 / 4,
    (width + height) / 2 / 2
);
// Really scuff loop to make sure it doesn't go out of bounds or go inside the trunk
for (let i = 0; i < 720; i++) {
    // Instead of drawing it, add to a list of points to catmullRom later
    if (
        t.pos[0] >= 0 &&
        t.pos[1] <= height &&
        !(
            topLeft[0] < t.pos[0] &&
            t.pos[0] < topRight[0] &&
            t.pos[1] < avoidTreeTop
        )
    )
        t.down();
    t.arc(0.5, leafR);
    t.up();
}
t.down();

const leafCenter = [leafStart[0], leafStart[1] + leafR];

function dist(point1, point2) {
    return Math.sqrt(
        (point1[0] - point2[0]) * (point1[0] - point2[0]) +
            (point1[1] - point2[1]) * (point1[1] - point2[1])
    );
}

// Fruits
const numFruits = bt.randIntInRange(3, 6);
for (let i = 0; i < numFruits; i++) {
    let pos = [
        bt.randInRange(leafCenter[0] - leafR, leafCenter[0] + leafR),
        bt.randInRange(leafCenter[1] - leafR, leafCenter[1] + leafR),
    ];
    // Make sure it's in the leaves
    while (
        dist(leafCenter, pos) >= leafR - (width + height) / 2 / 48 ||
        pos[0] < (width + height) / 2 / 48 ||
        pos[1] > height - (width + height) / 2 / 48
    )
        pos = [
            bt.randInRange(leafCenter[0] - leafR, leafCenter[0] + leafR),
            bt.randInRange(leafCenter[1] - leafR, leafCenter[1] + leafR),
        ];
    t.jump(pos);
    t.arc(
        360,
        bt.randInRange((width + height) / 2 / 128, (width + height) / 2 / 48)
    );
}

// Moon
const moon = [
    bt.randInRange((5 * width) / 8, (7 * width) / 8),
    bt.randInRange((5 * height) / 8, (7 * height) / 8),
];
t.jump(moon);
t.right(bt.randInRange(0, 45));
const moonR = (width + height) / 2 / 16;
t.arc(225, moonR);
t.left(135);
t.arc(-135, moonR);

const avoidMoonBottom = moon[1];
const avoidMoonTop = moon[1] + 2 * moonR;
const avoidMoonRight = moon[0] + moonR;
const avoidMoonLeft = moon[0] - moonR;

// Stars
function calcMiddle1(angle, center, point1, point2) {
    let point = [
        ((Math.sin(angle - 45) / Math.cos(angle - 45)) * center[0] -
            center[1] -
            ((point2[1] - point1[1]) / (point2[0] - point1[0])) * point2[0] +
            point2[1]) /
            (Math.sin(angle - 45) / Math.cos(angle - 45) -
                (point2[1] - point1[1]) / (point2[0] - point1[0])),
        0,
    ];
    point[1] =
        (Math.sin(angle - 45) / Math.cos(angle - 45)) * (point[0] - center[0]) +
        center[1];
    return [(center[0] + point[0]) / 2, (center[1] + point[1]) / 2];
}

function calcMiddle2(angle, center, point1, point2) {
    // let point = [(Math.sin(45 - angle)/Math.cos(45 - angle)*center[0]-center[1]-(point2[1]-point1[1])/(point2[0]-point1[0])*point2[0]+point2[1])/(Math.sin(45 - angle)/Math.cos(45 - angle) - (point2[1]-point1[1])/(point2[0]-point1[0])), 0];
    // point[1] = Math.sin(45 - angle)/Math.cos(45 - angle)*(point[0] - center[0]) + center[1];
    let point = [
        ((-Math.cos(angle - 45) / Math.sin(angle - 45)) * center[0] -
            center[1] -
            ((point2[1] - point1[1]) / (point2[0] - point1[0])) * point2[0] +
            point2[1]) /
            (-Math.cos(angle - 45) / Math.sin(angle - 45) -
                (point2[1] - point1[1]) / (point2[0] - point1[0])),
        0,
    ];
    point[1] =
        (-Math.cos(angle - 45) / Math.sin(angle - 45)) *
            (point[0] - center[0]) +
        center[1];
    return [(center[0] + point[0]) / 2, (center[1] + point[1]) / 2];
}

const numStars = bt.randIntInRange(5, 10);
for (let i = 0; i < numStars; i++) {
    let center = [
        bt.randInRange(width / 16, (15 * width) / 16),
        bt.randInRange(height / 4, (15 * height) / 16),
    ];
    // Prevent it from being in the middle of other stuff
    while (
        (avoidTreeLeft < center[0] &&
            center[0] < avoidTreeRight &&
            center[1] < avoidTreeTop) ||
        dist(leafCenter, center) < leafR ||
        (avoidMoonLeft < center[0] &&
            center[0] < avoidMoonRight &&
            avoidMoonBottom < center[1] &&
            center[1] < avoidMoonTop)
    )
        center = [
            bt.randInRange(width / 16, (15 * width) / 16),
            bt.randInRange(height / 4, (15 * height) / 16),
        ];

    const angle = bt.randInRange(0, 90);
    const r1 = bt.randInRange(2, height / 32);
    const r2 = bt.randInRange(2, width / 32);
    const d1 = [r1 * Math.cos(angle), r1 * Math.sin(angle)];
    const point1 = [center[0] + d1[0], center[1] + d1[1]];
    const point3 = [center[0] - d1[0], center[1] - d1[1]];
    const d2 = [r2 * Math.sin(angle), r2 * Math.cos(angle)];
    const point2 = [center[0] + d2[0], center[1] - d2[1]];
    const point4 = [center[0] - d2[0], center[1] + d2[1]];

    // Connect the corners;
    const point12 = calcMiddle1(angle, center, point1, point2);
    const curve12 = bt.catmullRom([point1, point12, point2]);
    drawLines([curve12]);

    const point23 = calcMiddle2(angle, center, point2, point3);
    const curve23 = bt.catmullRom([point2, point23, point3]);
    drawLines([curve23]);

    const point34 = calcMiddle1(angle, center, point3, point4);
    const curve34 = bt.catmullRom([point3, point34, point4]);
    drawLines([curve34]);

    const point41 = calcMiddle2(angle, center, point4, point1);
    const curve41 = bt.catmullRom([point4, point41, point1]);
    drawLines([curve41]);
}

// Grass
const grassY = bt.randInRange(height / 16, (3 * height) / 16);
drawLines([
    [
        [0, grassY],
        [bottomLeft[0], grassY],
    ],
]);
drawLines([
    [
        [bottomRight[0], grassY],
        [width, grassY],
    ],
]);

const numGrass = bt.randIntInRange(10, 50);
for (let i = 0; i < numGrass; i++) {
    let pos = [bt.randInRange(0, width), bt.randInRange(5, grassY - 5)];
    // Don't put it in a tree
    while (avoidTreeLeft < pos[0] && pos[0] < avoidTreeRight)
        pos = [bt.randInRange(0, width), bt.randInRange(5, grassY - 5)];
    t.jump(pos);
    t.setAngle(95);
    t.forward(5);
    t.up();
    t.forward(-5);
    t.setAngle(0);
    t.forward(1);
    t.setAngle(90);
    t.down();
    t.forward(5);
    t.up();
    t.forward(-5);
    t.setAngle(0);
    t.forward(1);
    t.setAngle(85);
    t.down();
    t.forward(5);
}

// draw turtle
drawLines(t.lines());
