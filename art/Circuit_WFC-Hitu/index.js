/*
@title: WFC solver for a circuit board
@author: Hitu
@snapshot: snapshot3.png
*/

setDocDimensions(125, 125);

const {
    Turtle,
    iteratePoints,
    rotate,
    translate,
    copy,
    rand,
    randIntInRange,
    setRandSeed,
} = blotToolkit;

setRandSeed(Date.now());

const GRID_SIZE = 25;
const TILE_SIZE = 5; 

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

const TILES = {

    EMPTY: {
        name: 'empty',
        connections: [false, false, false, false],
        weight: 1,
        draw: function(x, y) {

            return [];
        },
    },
    WIRE_STRAIGHT_HORIZONTAL: {
        name: 'wire_horizontal',
        connections: [false, true, false, true],
        weight: 2,
        draw: function(x, y) {
            function clamp(value, min, max) {
                return Math.max(min, Math.min(max, value));
            }

            let startX = x * TILE_SIZE;
            let endX = (x + 1) * TILE_SIZE;
            const startY = y * TILE_SIZE + TILE_SIZE / 2;

            startX = clamp(startX, 0, GRID_SIZE * TILE_SIZE);
            endX = clamp(endX, 0, GRID_SIZE * TILE_SIZE);

            return [
                [
                    [startX, startY],
                    [endX, startY]
                ]
            ];
        },
    },
    WIRE_STRAIGHT_VERTICAL: {
        name: 'wire_vertical',
        connections: [true, false, true, false],
        weight: 2,
        draw: function(x, y) {
            function clamp(value, min, max) {
                return Math.max(min, Math.min(max, value));
            }

            const startX = x * TILE_SIZE + TILE_SIZE / 2;
            let startY = y * TILE_SIZE;
            let endY = (y + 1) * TILE_SIZE;

            startY = clamp(startY, 0, GRID_SIZE * TILE_SIZE);
            endY = clamp(endY, 0, GRID_SIZE * TILE_SIZE);

            return [
                [
                    [startX, startY],
                    [startX, endY]
                ]
            ];
        },
    },
    WIRE_TURN: {

        name: 'wire_turn',
        connectionsList: [
            [true, true, false, false], 
            [false, true, true, false], 
            [false, false, true, true], 
            [true, false, false, true], 
        ],
        weight: 5,
        draw: function(x, y, variantIndex) {

            const startX = x * TILE_SIZE;
            const startY = y * TILE_SIZE;

            const centerX = startX + TILE_SIZE / 2;
            const centerY = startY + TILE_SIZE / 2;

            function clamp(value, min, max) {
                return Math.max(min, Math.min(max, value));
            }

            let lines = [];

            const angle = variantIndex * 90;
            const turtle = new Turtle();
            turtle.jump([centerX, centerY]);
            turtle.down();

            turtle.setAngle(angle);
            let endX = centerX + (TILE_SIZE / 2) * Math.cos((angle * Math.PI) / 180);
            let endY = centerY + (TILE_SIZE / 2) * Math.sin((angle * Math.PI) / 180);

            endX = clamp(endX, 0, GRID_SIZE * TILE_SIZE);
            endY = clamp(endY, 0, GRID_SIZE * TILE_SIZE);
            turtle.goTo([endX, endY]);

            turtle.up();
            turtle.jump([centerX, centerY]);
            turtle.down();
            turtle.setAngle(angle + 90);

            endX = centerX + (TILE_SIZE / 2) * Math.cos(((angle + 90) * Math.PI) / 180);
            endY = centerY + (TILE_SIZE / 2) * Math.sin(((angle + 90) * Math.PI) / 180);

            endX = clamp(endX, 0, GRID_SIZE * TILE_SIZE);
            endY = clamp(endY, 0, GRID_SIZE * TILE_SIZE);

            turtle.goTo([endX, endY]);

            lines = turtle.lines();
            return lines;
        },
    },
    WIRE_CROSS: {
        name: 'wire_cross',
        connections: [true, true, true, true],
        weight: 2,
        draw: function(x, y) {
            function clamp(value, min, max) {
                return Math.max(min, Math.min(max, value));
            }

            const lines = [];
            const startX = x * TILE_SIZE;
            const startY = y * TILE_SIZE;

            let hStartX = startX;
            let hEndX = startX + TILE_SIZE;
            const hY = startY + TILE_SIZE / 2;

            hStartX = clamp(hStartX, 0, GRID_SIZE * TILE_SIZE);
            hEndX = clamp(hEndX, 0, GRID_SIZE * TILE_SIZE);

            lines.push([
                [hStartX, hY],
                [hEndX, hY],
            ]);

            const vX = startX + TILE_SIZE / 2;
            let vStartY = startY;
            let vEndY = startY + TILE_SIZE;

            vStartY = clamp(vStartY, 0, GRID_SIZE * TILE_SIZE);
            vEndY = clamp(vEndY, 0, GRID_SIZE * TILE_SIZE);

            lines.push([
                [vX, vStartY],
                [vX, vEndY],
            ]);
            return lines;
        },
    },
    WIRE_VIA: {
        name: 'wire_via',
        connections: [true, false, true, false],
        weight: 2,
        draw: function(x, y) {
            function clamp(value, min, max) {
                return Math.max(min, Math.min(max, value));
            }

            const lines = [];
            const centerX = x * TILE_SIZE + TILE_SIZE / 2;
            const centerY = y * TILE_SIZE + TILE_SIZE / 2;
            const radiusOuter = TILE_SIZE / 4;

            let startY = centerY - TILE_SIZE / 2;
            let endY = centerY - radiusOuter;

            startY = clamp(startY, 0, GRID_SIZE * TILE_SIZE);
            endY = clamp(endY, 0, GRID_SIZE * TILE_SIZE);

            lines.push([
                [centerX, startY],
                [centerX, endY],
            ]);

            const outerCircle = approximateCircle(
                [centerX, centerY],
                radiusOuter,
                16
            );
            lines.push(outerCircle);

            startY = centerY + radiusOuter;
            endY = centerY + TILE_SIZE / 2;

            startY = clamp(startY, 0, GRID_SIZE * TILE_SIZE);
            endY = clamp(endY, 0, GRID_SIZE * TILE_SIZE);
            lines.push([
                [centerX, startY],
                [centerX, endY],
            ]);

            return lines;
        },
    },
    CHIP: {
        name: 'chip',

        connections: [true, true, true, true], 
        weight: 0.5,
        draw: function(x, y, chipWidth, chipHeight, connections) {
            const lines = [];
            const startX = x * TILE_SIZE;
            const startY = y * TILE_SIZE;

            const rect = [
                [startX, startY],
                [startX + chipWidth * TILE_SIZE, startY],
                [startX + chipWidth * TILE_SIZE, startY + chipHeight * TILE_SIZE],
                [startX, startY + chipHeight * TILE_SIZE],
                [startX, startY],
            ];
            lines.push(rect);

            const sides = ['top', 'right', 'bottom', 'left'];
            sides.forEach((side, index) => {
                if (connections[index]) {
                    let wireStart, wireEnd;
                    switch (side) {
                        case 'top':
                            wireStart = [
                                startX + (chipWidth * TILE_SIZE) / 2,
                                startY + chipHeight * TILE_SIZE,
                            ];
                            wireEnd = [
                                wireStart[0],
                                wireStart[1] + TILE_SIZE / 2,
                            ];
                            break;
                        case 'right':
                            wireStart = [
                                startX + chipWidth * TILE_SIZE,
                                startY + (chipHeight * TILE_SIZE) / 2,
                            ];
                            wireEnd = [
                                wireStart[0] + TILE_SIZE / 2,
                                wireStart[1],
                            ];
                            break;
                        case 'bottom':
                            wireStart = [
                                startX + (chipWidth * TILE_SIZE) / 2,
                                startY,
                            ];
                            wireEnd = [
                                wireStart[0],
                                wireStart[1] - TILE_SIZE / 2,
                            ];
                            break;
                        case 'left':
                            wireStart = [
                                startX,
                                startY + (chipHeight * TILE_SIZE) / 2,
                            ];
                            wireEnd = [
                                wireStart[0] - TILE_SIZE / 2,
                                wireStart[1],
                            ];
                            break;
                    }

                    function clamp(value, min, max) {
                        return Math.max(min, Math.min(max, value));
                    }

                    wireEnd[0] = clamp(wireEnd[0], 0, GRID_SIZE * TILE_SIZE);
                    wireEnd[1] = clamp(wireEnd[1], 0, GRID_SIZE * TILE_SIZE);

                    lines.push([wireStart, wireEnd]);
                }
            });
            return lines;
        },
    },
};

function approximateCircle(center, radius, segments) {
    const angleStep = (2 * Math.PI) / segments;
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        const x = center[0] + radius * Math.cos(angle);
        const y = center[1] + radius * Math.sin(angle);
        points.push([x, y]);
    }
    return points;
}

function generateTileVariants() {
    const expandedTiles = [];

    Object.values(TILES).forEach((tile) => {
        if (tile.connectionsList) {
            tile.connectionsList.forEach((connections, variantIndex) => {
                expandedTiles.push({
                    ...tile,
                    connections,
                    variantIndex,
                });
            });
        } else {
            expandedTiles.push(tile);
        }
    });

    return expandedTiles;
}

const allPossibleTiles = generateTileVariants();
let grid = [];
for (let y = 0; y < GRID_SIZE; y++) {
    grid[y] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
        grid[y][x] = [...allPossibleTiles];
    }
}

const occupiedCells = Array.from({
        length: GRID_SIZE
    }, () =>
    Array(GRID_SIZE).fill(false)
);

const numChips = 8;
for (let i = 0; i < numChips; i++) {
    let attempts = 0;
    let chipPlaced = false;

    while (!chipPlaced && attempts < 100) {
        attempts++;
        const chipWidth = randIntInRange(2, 3); 
        const chipHeight = randIntInRange(2, 3);
        const posX = randIntInRange(1, GRID_SIZE - chipWidth - 2); 
        const posY = randIntInRange(1, GRID_SIZE - chipHeight - 2);

        let overlaps = false;
        for (let yOffset = -1; yOffset <= chipHeight; yOffset++) {
            for (let xOffset = -1; xOffset <= chipWidth; xOffset++) {
                const xPos = posX + xOffset;
                const yPos = posY + yOffset;
                if (
                    xPos >= 0 &&
                    xPos < GRID_SIZE &&
                    yPos >= 0 &&
                    yPos < GRID_SIZE &&
                    occupiedCells[yPos][xPos]
                ) {
                    overlaps = true;
                    break;
                }
            }
            if (overlaps) break;
        }

        if (overlaps) continue;

        for (let y = 0; y < chipHeight; y++) {
            for (let x = 0; x < chipWidth; x++) {
                const xPos = posX + x;
                const yPos = posY + y;
                occupiedCells[yPos][xPos] = true;

                grid[yPos][xPos] = [{
                    name: 'chip_body',
                    connections: [false, false, false, false],
                    weight: 0,
                    draw: function() {
                        return [];
                    },
                }, ];
            }
        }

        grid[posY][posX] = [{
            ...TILES.CHIP,
            chipWidth,
            chipHeight,
            connections: [false, false, false, false],
        }, ];

        chipPlaced = true;
    }

    if (!chipPlaced) {
        console.warn('Could not place all chips without overlap.');
        break;
    }
}

function manhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const chipPositions = [];
for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
        const cell = grid[y][x][0];
        if (cell && cell.name === 'chip') {
            chipPositions.push({
                x,
                y
            });
        }
    }
}

const connectedChips = [chipPositions[0]];
const edges = [];

function getClosestConnection(chipA, chipB) {
    const sides = [TOP, RIGHT, BOTTOM, LEFT];
    const positionsA = [{
        x: chipA.x,
        y: chipA.y - 1
    }, {
        x: chipA.x + 1,
        y: chipA.y
    }, {
        x: chipA.x,
        y: chipA.y + 1
    }, {
        x: chipA.x - 1,
        y: chipA.y
    }, ];
    const positionsB = [{
        x: chipB.x,
        y: chipB.y - 1
    }, {
        x: chipB.x + 1,
        y: chipB.y
    }, {
        x: chipB.x,
        y: chipB.y + 1
    }, {
        x: chipB.x - 1,
        y: chipB.y
    }, ];

    let minDist = Infinity;
    let sideA = null;
    let sideB = null;

    for (let i = 0; i < 4; i++) {
        const posA = positionsA[i];
        for (let j = 0; j < 4; j++) {
            const posB = positionsB[j];
            const dist = manhattanDistance(posA, posB);
            if (dist < minDist) {
                minDist = dist;
                sideA = i;
                sideB = j;
            }
        }
    }

    return {
        sideA,
        sideB
    };
}

while (connectedChips.length < chipPositions.length) {
    let minDistance = Infinity;
    let closestPair = null;

    for (const chipA of connectedChips) {
        for (const chipB of chipPositions) {
            if (connectedChips.includes(chipB)) continue;
            const dist = manhattanDistance(chipA, chipB);
            if (dist < minDistance) {
                minDistance = dist;
                closestPair = {
                    chipA,
                    chipB
                };
            }
        }
    }

    if (closestPair) {
        const {
            chipA,
            chipB
        } = closestPair;
        const {
            sideA,
            sideB
        } = getClosestConnection(chipA, chipB);

        grid[chipA.y][chipA.x][0].connections[sideA] = true;
        grid[chipB.y][chipB.x][0].connections[sideB] = true;

        connectedChips.push(chipB);
        edges.push({
            from: chipA,
            to: chipB
        });
    } else {
        break;
    }
}

function findPath(start, end) {
    const queue = [];
    const cameFrom = {};
    const startKey = `${start.x},${start.y}`;
    queue.push(start);
    cameFrom[startKey] = null;

    while (queue.length > 0) {
        const current = queue.shift();
        const currentKey = `${current.x},${current.y}`;

        if (current.x === end.x && current.y === end.y) {

            const path = [];
            let curr = currentKey;
            while (curr) {
                const [x, y] = curr.split(',').map(Number);
                path.unshift({
                    x,
                    y
                });
                curr = cameFrom[curr];
            }
            return path;
        }

        const neighbors = [{
            x: current.x,
            y: current.y - 1
        }, {
            x: current.x + 1,
            y: current.y
        }, {
            x: current.x,
            y: current.y + 1
        }, {
            x: current.x - 1,
            y: current.y
        }, ];

        for (const neighbor of neighbors) {
            if (
                neighbor.x >= 0 &&
                neighbor.x < GRID_SIZE &&
                neighbor.y >= 0 &&
                neighbor.y < GRID_SIZE &&
                !occupiedCells[neighbor.y][neighbor.x]
            ) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                if (!(neighborKey in cameFrom)) {
                    queue.push(neighbor);
                    cameFrom[neighborKey] = currentKey;
                }
            }
        }
    }

    return [];
}

for (const edge of edges) {
    const path = findPath(edge.from, edge.to);
    for (const {
            x,
            y
        }
        of path) {
        const cell = grid[y][x][0];

        if (cell.name !== 'chip' && cell.name !== 'chip_body') {

            grid[y][x] = allPossibleTiles.filter((tile) => tile.name.startsWith('wire'));

            occupiedCells[y][x] = true;
        }
    }
}

function constrainEdgeTiles() {
    for (let x = 0; x < GRID_SIZE; x++) {

        grid[0][x] = grid[0][x].filter(tile => !tile.connections || !tile.connections[TOP]);

        grid[GRID_SIZE - 1][x] = grid[GRID_SIZE - 1][x].filter(tile => !tile.connections || !tile.connections[BOTTOM]);
    }
    for (let y = 0; y < GRID_SIZE; y++) {

        grid[y][0] = grid[y][0].filter(tile => !tile.connections || !tile.connections[LEFT]);

        grid[y][GRID_SIZE - 1] = grid[y][GRID_SIZE - 1].filter(tile => !tile.connections || !tile.connections[RIGHT]);
    }
}

constrainEdgeTiles();

function areTilesCompatible(tile1, tile2, side, oppositeSide) {

    if (!tile1 || !tile2) {
        return false;
    }

    const connections1 =
        tile1.connections ||
        (tile1.connectionsList ? tile1.connectionsList[tile1.variantIndex || 0] : null);

    const connections2 =
        tile2.connections ||
        (tile2.connectionsList ? tile2.connectionsList[tile2.variantIndex || 0] : null);

    if (!connections1 || !connections2) {
        return false;
    }

    return connections1[side] === connections2[oppositeSide];
}

function collapseGrid() {
    const stack = [];
    const history = [];

    while (true) {

        let minOptions = Infinity;
        let cellX = -1;
        let cellY = -1;

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const options = grid[y][x];
                if (options.length > 1 && options.length < minOptions) {
                    minOptions = options.length;
                    cellX = x;
                    cellY = y;
                }
            }
        }

        if (minOptions === Infinity) {

            break;
        }

        if (minOptions === 0) {

            if (history.length === 0) {
                console.error('Cannot solve grid.');
                return;
            }
            const lastState = history.pop();
            grid = copyGrid(lastState.grid);
            stack.length = 0;
            stack.push(...lastState.stack);
            continue;
        }

        const cellOptions = grid[cellY][cellX];
        const totalWeight = cellOptions.reduce((sum, tile) => sum + tile.weight, 0);
        let randValue = rand() * totalWeight;
        let chosenTile = null;
        for (const tile of cellOptions) {
            randValue -= tile.weight;
            if (randValue <= 0) {
                chosenTile = tile;
                break;
            }
        }

        history.push({
            grid: copyGrid(grid),
            stack: [...stack],
        });

        grid[cellY][cellX] = [chosenTile];

        stack.push({
            x: cellX,
            y: cellY
        });
        while (stack.length > 0) {
            const {
                x,
                y
            } = stack.pop();
            const tileOptions = grid[y][x];
            if (!tileOptions || tileOptions.length !== 1) continue;
            const tile = tileOptions[0];

            const neighbors = [{
                    x: x,
                    y: y - 1,
                    side: TOP,
                    oppositeSide: BOTTOM
                }, 
                {
                    x: x + 1,
                    y: y,
                    side: RIGHT,
                    oppositeSide: LEFT
                }, 
                {
                    x: x,
                    y: y + 1,
                    side: BOTTOM,
                    oppositeSide: TOP
                }, 
                {
                    x: x - 1,
                    y: y,
                    side: LEFT,
                    oppositeSide: RIGHT
                }, 
            ];
            for (const neighbor of neighbors) {
                if (
                    neighbor.x >= 0 &&
                    neighbor.x < GRID_SIZE &&
                    neighbor.y >= 0 &&
                    neighbor.y < GRID_SIZE
                ) {
                    const neighborOptions = grid[neighbor.y][neighbor.x];
                    if (neighborOptions.length > 1) {
                        const compatibleTiles = neighborOptions.filter((neighborTile) => {
                            return areTilesCompatible(
                                tile,
                                neighborTile,
                                neighbor.side,
                                neighbor.oppositeSide
                            );
                        });
                        if (compatibleTiles.length === 0) {

                            if (history.length === 0) {
                                console.error('Cannot solve grid.');
                                return;
                            }
                            const lastState = history.pop();
                            grid = copyGrid(lastState.grid);
                            stack.length = 0;
                            stack.push(...lastState.stack);
                            break;
                        }
                        if (compatibleTiles.length !== neighborOptions.length) {
                            grid[neighbor.y][neighbor.x] = compatibleTiles;
                            stack.push({
                                x: neighbor.x,
                                y: neighbor.y
                            });
                        }
                    }
                }
            }
        }
    }
}

function copyGrid(grid) {
    return grid.map((row) => row.map((cell) => [...cell]));
}

collapseGrid();

let allLines = [];

for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
        const cell = grid[y][x][0];
        if (!cell || cell.name === 'chip_body') continue; 

        if (cell.name === 'chip') {

            const lines = cell.draw(
                x,
                y,
                cell.chipWidth,
                cell.chipHeight,
                cell.connections
            );
            allLines.push(...lines);
        } else if (cell.connectionsList) {

            const lines = cell.draw(x, y, cell.variantIndex);
            allLines.push(...lines);
        } else {
            const lines = cell.draw(x, y);
            allLines.push(...lines);
        }
    }
}

drawLines(allLines);