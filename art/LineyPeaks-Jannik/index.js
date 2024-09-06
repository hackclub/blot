/*
@title: LineyPeaks
@author: Jannik
@snapshot: 1.png
*/

// SETTINGS
const RANDOM_POINTS = 8000 // Point placement: 0 for grid, 0 < x for random

const GRID_SIZE = 125
const DEBUG = false
const GRADIENT_SCALE = 20;
const LINE_SCALE = 100;
const isWebInterface = true

const HIDDEN_FUNCTION_ANGLE = bt.randIntInRange(0, 360)
const HIDDEN_FUNCTION_OFFSET = bt.randIntInRange(0, 10)
const HIDDEN_FUNCTION_COUNT = bt.randIntInRange(1, 3)

// The hidden function, must return a value between 0 and 1
function hiddenFunction(x, y) {
    let sum = 0

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
        sum += theFunction(HIDDEN_FUNCTION_ANGLE, HIDDEN_FUNCTION_OFFSET)
    }

    return sum / HIDDEN_FUNCTION_COUNT
}

// Drawing wrapper
const turtle = new bt.Turtle()
turtle.down();
function drawLine(x1, y1, x2, y2) {
    // Stay inside area
    x2 = Math.min(GRID_SIZE - 1, Math.max(0, x2))
    y2 = Math.min(GRID_SIZE - 1, Math.max(0, y2))
    turtle.jump([x1, y1]);
    turtle.goTo([x2, y2]);
}


// Step 1: Place points, either random or on a grid, carrying a value from the hidden function for their location
const points = []
const point_values = []

if (RANDOM_POINTS != 0) {
    // Random point position
    for (let i = 0; i < RANDOM_POINTS; i++) {
        const x = bt.randIntInRange(1, GRID_SIZE - 2)
        const y = bt.randIntInRange(1, GRID_SIZE - 2)
        const value = hiddenFunction(x, y)

        points.push([x, y])
        point_values.push(value)

        if (DEBUG)
            debugPoint(x, y, value)
    }

} else {
    const point_resolution = GRID_SIZE / 60

    for (let x = 4; x < GRID_SIZE - 4; x += point_resolution) {
        for (let y = 4; y < GRID_SIZE - 4; y += point_resolution) {
            // Add little offsets
            const offset_x = x + bt.randIntInRange(-2, 2)
            const offset_y = y + bt.randIntInRange(-2, 2)
            const value = hiddenFunction(offset_x, offset_y)

            points.push([offset_x, offset_y])
            point_values.push(value)

            if (DEBUG)
                debugPoint(offset_x, offset_y, value)
        }
    }
}


// Step 2: Estimate the values between the points using interpolation
function gradient(x, y, pointX, pointY) {
    const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2)

    if (distance > GRADIENT_SCALE)
        return 0

    const value = Math.abs((distance / GRADIENT_SCALE) ** 2 - 1)
    return value * value * value / (Math.PI * Math.pow(GRADIENT_SCALE, 8) / 4) // Volume
}

function density(x, y) {
    let sum = 0
    for (let i = 0; i < points.length; i++) {
        const point = points[i]
        sum += gradient(x, y, point[0], point[1]) * 1
    }
    return sum
}

// Pre compute density for every location (speed up)
let density_map = []
for (let x = 0; x < GRID_SIZE; x++) {
    density_map.push([])
    for (let y = 0; y < GRID_SIZE; y++) {
        density_map[x].push(density(x, y))
    }
}


// And now restore the values (really slow for large particle counts, but works :) )
const restored_values = []

for (let x = 0; x < GRID_SIZE; x++) {
    restored_values.push([])
    for (let y = 0; y < GRID_SIZE; y++) {
        let sum = 0
        for (let i = 0; i < points.length; i++) {
            const point = points[i]

            sum += gradient(x, y, point[0], point[1]) * point_values[i] / density_map[point[0]][point[1]]
        }
        restored_values[restored_values.length - 1].push(sum)
    }
}

// Step 3: Calculate the gradient at every point using the restored values and draw it (the cool lines)
function calcChangeAtPoint(x, y) {
    x = Math.ceil(x)
    y = Math.ceil(y)
    const step = 1
    const dY = (restored_values[x][y + step] - restored_values[x][y - step]) / step
    const dX = (restored_values[x + step][y] - restored_values[x - step][y]) / step
    return [dX, dY]
}

for (let i = 0; i < points.length; i++) {
    const point_loc = points[i]

    const delta_change = calcChangeAtPoint(point_loc[0], point_loc[1])
    if (Math.abs(delta_change[0]) + Math.abs(delta_change[1]) > 0.02)
        drawLine(point_loc[0], point_loc[1], point_loc[0] - (delta_change[0] * LINE_SCALE), point_loc[1] - (delta_change[1] * LINE_SCALE))
}


drawLines(turtle.path)

console.log("done")