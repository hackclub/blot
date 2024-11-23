/*
@title: Waves
@author: souptik samanta
@snapshot: snapshot1.png
*/
const GRID_UNIT = 6;
const FORCE_MAG = 3;
const DOC_W = 150;
const DOC_H = 150;
const MAX_ITERATIONS = 100;
const STEP_SIZE = 1;
const CURVE_SPACING = 4;

let vectorField = [];
const seedValue = Date.now();

function mapValue(value, inStart, inEnd, outStart, outEnd, clamp = false) {
    let mapped = outStart + ((value - inStart) * (outEnd - outStart)) / (inEnd - inStart);
    if (clamp) mapped = Math.max(outStart, Math.min(mapped, outEnd));
    return mapped;
}

function computeAngle(x, y) {
    const offset = Math.sin(seedValue * 0.0001 + x * 0.1) + Math.cos(seedValue * 0.0001 + y * 0.1);
    return mapValue(offset * 0.5, -1, 1, 0, Math.PI * 2);
}

function initializeGrid(width, height, angleFn) {
    setDocDimensions(width, height);
    for (let i = 0; i < width / GRID_UNIT; i++) {
        vectorField[i] = [];
        for (let j = 0; j < height / GRID_UNIT; j++) {
            const angle = angleFn(i * GRID_UNIT, j * GRID_UNIT);
            vectorField[i][j] = new Vector(FORCE_MAG, angle, false);
        }
    }
}

function generateCurves() {
    for (let x = 0; x < DOC_W; x += CURVE_SPACING) {
        for (let y = 0; y < DOC_H; y += CURVE_SPACING) {
            renderCurve(MAX_ITERATIONS, STEP_SIZE, new Coord(x, y));
        }
    }
}

function renderCurve(iterations, stepDist, start) {
    let pathPoints = [];
    let position = start;

    for (let i = 0; i < iterations; i++) {
        const col = Math.floor(position.x / GRID_UNIT);
        const row = Math.floor(position.y / GRID_UNIT);

        if (row < 0 || row >= vectorField.length || col < 0 || col >= vectorField[0].length) break;

        pathPoints.push(position.toArray());
        const angle = vectorField[col][row].angle;
        position.x += stepDist * Math.cos(angle);
        position.y += stepDist * Math.sin(angle);

        if (position.x < 0 || position.x >= DOC_W || position.y < 0 || position.y >= DOC_H) break;
    }

    if (pathPoints.length > 2) {
        const curve = [bt.nurbs(pathPoints, { steps: 200, degree: 2 })];
        drawLines(curve, { width: 1, stroke: "#000000" });
    }
}

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    angleTo(other) {
        const deltaY = other.y - this.y;
        const deltaX = other.x - this.x;
        return Math.atan2(deltaY, deltaX);
    }

    toArray() {
        return [this.x, this.y];
    }
}

class Vector {
    constructor(magnitude, angle, degrees = true) {
        if (degrees) angle *= Math.PI / 180;
        this.x = magnitude * Math.cos(angle);
        this.y = magnitude * Math.sin(angle);
        this.magnitude = magnitude;
        this.angle = angle;
    }

    drawVector(x = 0, y = 0) {
        const lineSegment = [
            [x, y],
            [x + this.x, y + this.y]
        ];
        drawLines([lineSegment], { width: 1, stroke: "#000000" });
    }
}

class LineStyle {
    constructor(thickness, color) {
        this.thickness = thickness;
        this.color = color;
    }

    applyToPath(path) {
        drawLines([path], { width: this.thickness, stroke: this.color });
    }
}

function buildLayeredPaths(numLayers, layerSpacing, customThickness) {
    for (let layer = 0; layer < numLayers; layer++) {
        const offset = layer * layerSpacing;
        for (let x = offset; x < DOC_W; x += CURVE_SPACING) {
            for (let y = offset; y < DOC_H; y += CURVE_SPACING) {
                const customPath = traceLayeredPath(MAX_ITERATIONS, STEP_SIZE, new Coord(x, y), layer, customThickness);
                const style = new LineStyle(layer + 1, "#000000");
                style.applyToPath(customPath);
            }
        }
    }
}

function traceLayeredPath(maxSteps, moveLength, startPos, layerIndex, thickness) {
    let pointPath = [];
    let currentPos = startPos;

    for (let step = 0; step < maxSteps; step++) {
        const col = Math.floor(currentPos.x / GRID_UNIT);
        const row = Math.floor(currentPos.y / GRID_UNIT);

        if (row < 0 || row >= vectorField.length || col < 0 || col >= vectorField[0].length) break;

        pointPath.push(currentPos.toArray());
        const directionalAngle = vectorField[col][row].angle + layerIndex * 0.01;
        currentPos.x += moveLength * Math.cos(directionalAngle);
        currentPos.y += moveLength * Math.sin(directionalAngle);

        if (currentPos.x < 0 || currentPos.x >= DOC_W || currentPos.y < 0 || currentPos.y >= DOC_H) break;
    }

    return pointPath;
}

function randomizeGridValues(seedBase) {
    for (let i = 0; i < vectorField.length; i++) {
        for (let j = 0; j < vectorField[i].length; j++) {
            const modAngle = computeAngle(seedBase + i, seedBase + j);
            vectorField[i][j].angle = modAngle;
        }
    }
}

function generatePatterns(seedModifier) {
    randomizeGridValues(seedModifier);
    initializeGrid(DOC_W, DOC_H, computeAngle);
    buildLayeredPaths(3, 2, 1.5);
}

initializeGrid(DOC_W, DOC_H, computeAngle);
generateCurves();
generatePatterns(50);
