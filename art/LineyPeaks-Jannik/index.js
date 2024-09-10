/*
@title: LineyPeaks
@author: Jannik
@snapshot: 1.png
*/

// SETTINGS
const GRID_SIZE = 125;
const INFLUENCE_SCALE = 20; // How much the points influence each other | Recommended: 20
const LINE_SCALE = 20; // Length of the lines | Recommended: 20

// Debugging
const DEBUGGING = false; // Legacy, was used to debug point placement
const VSCodeMode = false; // Toggle VSCode mode. I've create a small html page and imitated a few blot functions to get autocomplete and live reload

// Randomization
const HIDDEN_FUNCTION_ANGLE = bt.randIntInRange(0, 360);
const HIDDEN_FUNCTION_OFFSET = bt.randIntInRange(0, 10);
const HIDDEN_FUNCTION_SCALE = bt.randIntInRange(50, 150) / 100;
const HIDDEN_FUNCTION_COUNT = bt.randIntInRange(1, 3);

// Auto-calculated settings
const PADDING = GRID_SIZE / 5;
const RENDER_SIZE = GRID_SIZE + PADDING * 2;
const POINT_SPACING = RENDER_SIZE / 2;
const POINT_RESOLUTION = RENDER_SIZE / POINT_SPACING;

// The hidden function, must return a value between 0 and 1
function hiddenFunction(x, y) {
    x = x * HIDDEN_FUNCTION_SCALE;
    y = y * HIDDEN_FUNCTION_SCALE;
    let sum = 0;

    function theFunction(angle, offset) {
        function rotatedX(x, y) {
            return x * Math.cos(angle) + y * Math.sin(angle)
        }

        function rotatedY(x, y) {
            return y * Math.cos(angle) - x * Math.sin(angle)
        }

        return ((Math.cos(0.1 * rotatedX(x, y) - offset + Math.sin(0.1 * rotatedY(x, y)))) / 2) + 0.5
    }

    for (let i = 0; i < HIDDEN_FUNCTION_COUNT; i++) {
        sum += theFunction(HIDDEN_FUNCTION_ANGLE, HIDDEN_FUNCTION_OFFSET);
    }

    return sum / HIDDEN_FUNCTION_COUNT
}

// Drawing wrapper
if (!VSCodeMode) {
    const turtle = new bt.Turtle();
    turtle.down();

    function drawLine(x1, y1, x2, y2) {
        x1 = x1 - PADDING;
        y1 = y1 - PADDING;
        x2 = x2 - PADDING;
        y2 = y2 - PADDING;

        // Ignore if completely out of bounds
        if ((x1 < 0 && x2 < 0) || (y1 < 0 && y2 < 0)) return
        if ((x1 > GRID_SIZE && x2 > GRID_SIZE) || (y1 > GRID_SIZE && y2 > GRID_SIZE)) return

        // Stay inside area
        x2 = Math.min(GRID_SIZE - 1, Math.max(0, x2));
        y2 = Math.min(GRID_SIZE - 1, Math.max(0, y2));
        turtle.jump([x1, y1]);
        turtle.goTo([x2, y2]);
    }

    globalThis.drawLine = drawLine;
    globalThis.turtle = turtle;
}

// Estimate the influence (value in our case since mass = 0) at [x, y] "emitted" from [pointX, pointY]
function influence(x, y, pointX, pointY) {
    const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);

    if (distance > INFLUENCE_SCALE) {
        return 0
    }

    const value = Math.abs((distance / INFLUENCE_SCALE) ** 2 - 1);
    return value * value * value / (Math.PI * Math.pow(INFLUENCE_SCALE, 8) / 4)
}

// Step 1: Place points on a grid, carrying a value from the hidden function for their location
const points = [];
const point_values = [];


for (let x = 2; x < RENDER_SIZE - 2; x += POINT_RESOLUTION) {
    for (let y = 2; y < RENDER_SIZE - 2; y += POINT_RESOLUTION) {
        const value = hiddenFunction(x, y);

        points.push([x, y]);
        point_values.push(value);

        if (DEBUGGING) {
            debugPoint(x, y, value);
        }
    }
}


// Step 2: Calculate a density map for every point for normalizing in step 3
const density_map = {};

for (const point of points) {
    const x = point[0];
    const y = point[1];


    if (density_map[x] === undefined) {
        density_map[x] = {};
    }

    let sum = 0;

    for (const otherPoint of points) {
        sum += influence(x, y, otherPoint[0], otherPoint[1]);
    }

    density_map[x][y] = sum;
}


// Step 3: Calculate what every point "experiences" from all other points combined (really slow, but works :) )
const restored_values = {};

for (const point of points) {
    const x = point[0];
    const y = point[1];


    if (restored_values[x] === undefined) {
        restored_values[x] = {};
    }

    let sum = 0;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        sum += influence(x, y, point[0], point[1]) * point_values[i] / density_map[point[0]][point[1]];
    }

    restored_values[x][y] = sum;
}


// Step 4: Now for every point, check where it wants to go (wants to go to lower density)
function calcDeltaAtPoint(x, y) {
    const step = POINT_RESOLUTION

    // Make sure we don't go out of boundaries
    let dX;
    let dY;

    if (x === 2) {
        dX = (restored_values[x + step][y] - restored_values[x][y]) / (step * 2);
    } else if (x === RENDER_SIZE - 3) {
        dX = (restored_values[x][y] - restored_values[x - step][y]) / (step * 2);
    } else {
        dX = (restored_values[x + step][y] - restored_values[x - step][y]) / step;
    }

    if (y === 2) {
        dY = (restored_values[x][y + step] - restored_values[x][y]) / (step * 2);
    } else if (y === RENDER_SIZE - 3) {
        dY = (restored_values[x][y] - restored_values[x][y - step]) / (step * 2);
    } else {
        dY = (restored_values[x][y + step] - restored_values[x][y - step]) / step;
    }

    return [dX, dY]
}

for (let i = 0; i < points.length; i++) {
    const point_loc = points[i];

    const delta_change = calcDeltaAtPoint(point_loc[0], point_loc[1]);

    drawLine(point_loc[0] - PADDING, point_loc[1] - PADDING, point_loc[0] - (delta_change[0] * LINE_SCALE) - PADDING, point_loc[1] - (delta_change[1] * LINE_SCALE) - PADDING);
}

if (!VSCodeMode) {
    drawLines(turtle.path);
}

console.log("Done !");