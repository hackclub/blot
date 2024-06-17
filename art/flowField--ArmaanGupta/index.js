/*
@title: Summer Currents
@author: Armaan Gupta
@snapshot: snapshot.png
*/

// Constants
const COLORS = ["#b2abf1", "#75b3ff", "#1fadeb", "#fb9cf1", "#2be1f2"];
const RESOLUTION = 6; // Determines the density of the vector field/grid
const MAGNITUDE = 3; // Determines the magnitude of the vectors in the vector field/grid
const WIDTH = 150; // Determines the width of the document
const HEIGHT = 150; // Determines the height of the document
const NUM_STEPS = 100; // Determines the number of steps the algorithm takes when drawing a curve (effectively determining the length of the curves)
const STEP_LENGTH = 1; // Determines the step length at each iteration of the algorithm when drawing a curve
const CURVE_STEP = 4; // Determines the density of curves in the drawing

// Grid array to store vectors
let grid = [];

/**
 * Maps a value from one range to another.
 * @param {number} value - The value to map.
 * @param {number} fromLow - The lower bound of the current range.
 * @param {number} fromHigh - The upper bound of the current range.
 * @param {number} toLow - The lower bound of the target range.
 * @param {number} toHigh - The upper bound of the target range.
 * @param {boolean} [withinBounds=false] - If true, clamps the mapped value within the target range.
 * @returns {number} - The mapped value.
 */
function map(value, fromLow, fromHigh, toLow, toHigh, withinBounds = false) {
    let mappedValue = toLow + ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow);
    if (withinBounds) {
        mappedValue = Math.max(toLow, Math.min(mappedValue, toHigh));
    }
    return mappedValue;
}

/**
 * Function to generate angle based on sine and cosine functions.
 * @param {number} x - The x coordinate.
 * @param {number} y - The y coordinate.
 * @returns {number} - The angle.
 */
function generateAngle(x, y) {
    const value = (Math.sin(x) + Math.cos(y)) * 0.5;
    return map(value, -1, 1, 0, Math.PI * 2);
}

/**
 * Populates the grid with vectors based on a provided function.
 * @param {number} width - The width of the grid.
 * @param {number} height - The height of the grid.
 * @param {function} func - The function to generate vector angles.
 */
function populateGrid(width, height, func) {
    setDocDimensions(width, height); // Assuming this function sets the canvas/document dimensions
    for (let i = 0; i < width / RESOLUTION; i++) {
        grid[i] = [];
        for (let j = 0; j < height / RESOLUTION; j++) {
            const angle = func(i * RESOLUTION, j * RESOLUTION);
            grid[i][j] = new Vector(MAGNITUDE, angle, false);
        }
    }
}

/**
 * Draws the vectors in the grid.
 */
function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                grid[i][j].draw(i * RESOLUTION, j * RESOLUTION);
            }
        }
    }
}

/**
 * Draws multiple curves across the grid.
 * @param {number} numCurves - Number of curves to draw.
 */
function drawCurves() {
    for (let i = 0; i < WIDTH; i += CURVE_STEP) {
        for (let j = 0; j < HEIGHT; j += CURVE_STEP) {
            drawCurve(NUM_STEPS, STEP_LENGTH, new Point(i, j));
        }
    }
}

/**
 * Draws a single curve starting from a given position.
 * @param {number} numSteps - Number of steps to draw the curve.
 * @param {number} stepLength - Length of each step.
 * @param {Point} startingPosition - Starting position of the curve.
 */
function drawCurve(numSteps, stepLength, startingPosition) {
    let path = [];
    let position = startingPosition;

    for (let i = 0; i < numSteps; i++) {
        const colIndex = Math.floor(position.x / RESOLUTION);
        const rowIndex = Math.floor(position.y / RESOLUTION);

        // Check if the position is out of bounds
        if (rowIndex < 0 || rowIndex >= grid.length || colIndex < 0 || colIndex >= grid[0].length) {
            console.log('Position out of bounds:', position.x, position.y);
            break;
        }
        
        path.push(position.toArray());

        // Step in direction of vector at grid-point
        const gridAngle = grid[colIndex][rowIndex].direction;
        const xStep = stepLength * Math.cos(gridAngle);
        const yStep = stepLength * Math.sin(gridAngle);

        console.log(gridAngle, xStep, yStep);
        position.x += xStep;
        position.y += yStep;

        // Check if the new position is out of bounds
        if (position.x < 0 || position.x >= WIDTH || position.y < 0 || position.y >= HEIGHT) {
            console.log('New position out of bounds:', position.x, position.y);
            break;
        }
    }

    if (path.length > 2) {
        // Create a curve using NURBS algorithm
        const curve = [bt.nurbs(path, { steps: 200, degree: 2 })];
        const copiedCurve = bt.copy(curve);
        const randomIndex = Math.floor(Math.random() * COLORS.length);
        const color = COLORS[randomIndex];
      
        drawLines(curve, { width: Math.floor(Math.random() * 3), stroke: color });
    }
}

/**
 * Class representing a point.
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculates the angle to another point.
     * @param {Point} p - The target point.
     * @returns {number} - The angle in radians.
     */
    getAngleToPoint(p) {
        const deltaY = p.y - this.y;
        const deltaX = p.x - this.x;
        return Math.atan2(deltaY, deltaX);
    }

    /**
     * Converts the point to an array.
     * @returns {number[]} - The point as an array.
     */
    toArray() {
        return [this.x, this.y];
    }
}

/**
 * Class representing a vector.
 */
class Vector {
    constructor(magnitude, direction, degrees = true) {
        if (degrees) {
            direction *= Math.PI / 180;
        }

        this.x = magnitude * Math.cos(direction);
        this.y = magnitude * Math.sin(direction);
        this.magnitude = magnitude;
        this.direction = direction;
    }

    /**
     * Draws the vector starting from a given position.
     * @param {number} [x=0] - The x coordinate to start drawing from.
     * @param {number} [y=0] - The y coordinate to start drawing from.
     */
    draw(x = 0, y = 0) {
        const vector = [
            [x, y],
            [x + this.x, y + this.y]
        ];
        drawLines([vector]);
    }
}

// Populate the grid and draw curves
populateGrid(WIDTH, HEIGHT, generateAngle);
drawCurves();
