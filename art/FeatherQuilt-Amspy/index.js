/*
@title: Feather Quilt with Structured Random Rotation
@author: Amspy
@snapshot: FeatherL.jpg
*/

const width = 125;
const height = 125;
const quiltThickness = 13;
const stringLength = 5;
const numStrings = 22;
const numFeathersX = 5; // Number of feathers horizontally
const numFeathersY = 5; // Number of feathers vertically
const scalingFactor = 0.25; // Scaling factor for feathers
setDocDimensions(width, height);

function createFeather() {
    const shaft = bt.resample([
        [[0, 0], [1, 0], [0, -130], [-1, 0], [0, 0]]
    ], 1);

    const vanePoints = [
        [0, 0],
        [-14, 16],
        [-22, 77],
        [0, 100],
        [15, 79],
        [14, 31],
        [0, 0]
    ];
    
    const vanes = [bt.catmullRom(vanePoints.map(([x, y]) => [x * (1 + bt.rand() * 0.2), y * (1 + bt.rand() * 0.2)]))];
    const barbs = [];
    for (let i = 0; i < shaft[0].length; i++) {
        const parity = i > shaft[0].length / 2 ? -1 : 1;
        const [x, y] = shaft[0][i];
        const lengthFactor = 0.5 + bt.rand() * 1.2; 
        barbs.push(bt.catmullRom([
            [x, y],
            [x + parity * 10 * lengthFactor, y - 2 * lengthFactor],
            [x + parity * 25 * lengthFactor, y]
        ]));
    }

    bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]]);
    bt.cut(barbs, vanes);

    const feather = [...shaft, ...barbs];
    bt.iteratePoints(feather, ([x, y]) => [x - 0.002 * (width / 2 - y) * (width / 2 - y), y]);
    bt.scale(feather, scalingFactor, [0, 0]);

    return feather;
}

function createQuiltBoundary() {
    return bt.resample([
        [
            [quiltThickness, quiltThickness],
            [width - quiltThickness, quiltThickness],
            [width - quiltThickness, height - quiltThickness],
            [quiltThickness, height - quiltThickness],
            [quiltThickness, quiltThickness]
        ]
    ], 1);
}

function createQuilt() {
    const quilt = [];

    for (let i = 0; i < numStrings; i++) {
        quilt.push(createLooseString([quiltThickness + i * (width - 2 * quiltThickness) / numStrings, quiltThickness], [0, -1]));
        quilt.push(createLooseString([quiltThickness + i * (width - 2 * quiltThickness) / numStrings, height - quiltThickness], [0, 1]));
        quilt.push(createLooseString([quiltThickness, quiltThickness + i * (height - 2 * quiltThickness) / numStrings], [-1, 0]));
        quilt.push(createLooseString([width - quiltThickness, quiltThickness + i * (height - 2 * quiltThickness) / numStrings], [1, 0]));
    }

    return quilt.flat();
}

function createLooseString(start, direction) {
    const [x, y] = start;
    const [dx, dy] = direction;
    const string = [];
    const numWaves = bt.randIntInRange(2, 5);
    for (let i = 0; i < numWaves; i++) {
        const waveLength = stringLength / numWaves;
        const waveHeight = bt.rand() * 2;
        string.push([x + dx * i * waveLength + dy * waveHeight, y + dy * i * waveLength + dx * waveHeight]);
    }
    return [bt.catmullRom(string)];
}

const quilt = createQuilt();
const quiltBoundary = createQuiltBoundary();
drawLines(quiltBoundary);
drawLines(quilt);

const originalFeather = createFeather();

const cellWidth = (width - 2 * quiltThickness) / numFeathersX;
const cellHeight = (height - 2 * quiltThickness) / numFeathersY;

const feathers = [];
for (let i = 0; i < numFeathersX; i++) {
    for (let j = 0; j < numFeathersY; j++) {
        const featherCopy = bt.copy(originalFeather);

        const gridX = quiltThickness + i * cellWidth + cellWidth / 2;
        const gridY = quiltThickness + j * cellHeight + cellHeight / 2;

        const randomAngle = bt.rand() * 360;

        bt.translate(featherCopy, [gridX, gridY]);
        bt.rotate(featherCopy, randomAngle, [gridX, gridY]);

        feathers.push(featherCopy);
    }
}

const simplifiedFeathers = feathers.map(feather => bt.simplify(feather, 0.5, true));
const trimmedFeathers = simplifiedFeathers.map(feather => bt.cut(feather, quiltBoundary));

drawLines(trimmedFeathers.flat());
