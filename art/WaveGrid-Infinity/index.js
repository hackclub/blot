/*
@title: WaveGrid
@author: Infinity
@snapshot: snap_2.png
*/

const width = 125;
const height = 125;
const rows = 27;
const cols = 45;
const amplitude = 11; 
const frequency = 1; 
const phaseShift = -6.0; 

setDocDimensions(width, height);

function generateWaveGrid(rows, cols, amplitude, frequency, phaseShift) {
    const grid = [];
    const xSpacing = width / cols;
    const ySpacing = height / rows;

    for (let r = 0; r <= rows; r++) {
        const row = [];
        for (let c = 0; c <= cols; c++) {
            const x = c * xSpacing;
            const y = r * ySpacing;
            const z = amplitude * Math.sin((frequency * 2 * Math.PI * c / cols) + (r * phaseShift));
            row.push([x, y + z]);
        }
        grid.push(row);
    }
    return grid;
}

function scaleGrid(grid, width, height) {
    const xMin = Math.min(...grid.flat().map(point => point[0]));
    const xMax = Math.max(...grid.flat().map(point => point[0]));
    const yMin = Math.min(...grid.flat().map(point => point[1]));
    const yMax = Math.max(...grid.flat().map(point => point[1]));

    const xScale = width / (xMax - xMin);
    const yScale = height / (yMax - yMin);

    return grid.map(row => row.map(([x, y]) => [
        (x - xMin) * xScale,
        (y - yMin) * yScale
    ]));
}

function drawWaveGrid(grid) {
    const lines = [];

    // Draw horizontal lines
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length - 1; c++) {
            lines.push([grid[r][c], grid[r][c + 1]]);
        }
    }

    // Draw vertical lines
    for (let c = 0; c < grid[0].length; c++) {
        for (let r = 0; r < grid.length - 1; r++) {
            lines.push([grid[r][c], grid[r + 1][c]]);
        }
    }

    drawLines(lines);
}

const waveGrid = generateWaveGrid(rows, cols, amplitude, frequency, phaseShift);
const scaledWaveGrid = scaleGrid(waveGrid, width, height);
drawWaveGrid(scaledWaveGrid);
