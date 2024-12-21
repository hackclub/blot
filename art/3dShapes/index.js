/*
@title: 3d Shapes
@author: Anshuman Mishra
@snapshot: 3dshapes.png
*/
const width = 400;
const height = 100;
const angle = Math.PI / 6;
const baseSize = 20;

function project(point, centerX) {
    const x = point[0] * Math.cos(angle) - point[2] * Math.cos(angle);
    const y = point[1] - point[2] * Math.sin(angle) - point[0] * Math.sin(angle);
    return [x + centerX, y + height/2];
}

function drawShape(vertices, edges, centerX) {
    const mappedVertices = vertices.map(v => project(v, centerX));
    const shapeLines = edges.map(edge => {
        return [mappedVertices[edge[0]], mappedVertices[edge[1]]];
    });
    drawLines(shapeLines, { width: 1.5 });
}

const cubeVertices = [
    [-baseSize/2, -baseSize/2, baseSize/2], [baseSize/2, -baseSize/2, baseSize/2],
    [baseSize/2, baseSize/2, baseSize/2], [-baseSize/2, baseSize/2, baseSize/2],
    [-baseSize/2, -baseSize/2, -baseSize/2], [baseSize/2, -baseSize/2, -baseSize/2],
    [baseSize/2, baseSize/2, -baseSize/2], [-baseSize/2, baseSize/2, -baseSize/2]
];

const cubeEdges = [
    [0,1], [1,2], [2,3], [3,0], [4,5], [5,6],
    [6,7], [7,4], [0,4], [1,5], [2,6], [3,7]
];

const cuboidVertices = cubeVertices.map(v => [v[0], v[1]*1.5, v[2]*0.7]);

const prismVertices = [
    [-baseSize/2, -baseSize/2, baseSize/2], [baseSize/2, -baseSize/2, baseSize/2],
    [0, baseSize/2, baseSize/2],
    [-baseSize/2, -baseSize/2, -baseSize/2], [baseSize/2, -baseSize/2, -baseSize/2],
    [0, baseSize/2, -baseSize/2]
];

const prismEdges = [
    [0,1], [1,2], [2,0],
    [3,4], [4,5], [5,3],
    [0,3], [1,4], [2,5]
];

const cylinderVertices = [];
const cylinderEdges = [];
const sides = 8;

for(let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const x = baseSize * Math.cos(angle);
    const z = baseSize * Math.sin(angle);
    cylinderVertices.push([x, baseSize, z]);
    cylinderVertices.push([x, -baseSize, z]);
}

for(let i = 0; i < sides; i++) {
    const next = (i + 1) % sides;
    cylinderEdges.push([i*2, next*2]);
    cylinderEdges.push([i*2+1, next*2+1]);
    cylinderEdges.push([i*2, i*2+1]);
}

const coneVertices = [];
const coneEdges = [];

coneVertices.push([0, baseSize*1.5, 0]);

for(let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const x = baseSize * Math.cos(angle);
    const z = baseSize * Math.sin(angle);
    coneVertices.push([x, -baseSize, z]);
}

for(let i = 1; i <= sides; i++) {
    const next = i % sides + 1;
    coneEdges.push([i, next]);
    coneEdges.push([0, i]);
}

const spacing = 75;
drawShape(cubeVertices, cubeEdges, spacing);
drawShape(cuboidVertices, cubeEdges, spacing*2);
drawShape(prismVertices, prismEdges, spacing*3);
drawShape(cylinderVertices, cylinderEdges, spacing*4);
drawShape(coneVertices, coneEdges, spacing*5);
