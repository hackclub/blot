/*
@title: 3D Raycasting
@author: Jaiden Grimminck
@snapshot: snapshot1.png
*/

/*
A simple raycasting 3d engine using a field enviornment and raycasting to create a 3d effect. 
Can be randomized and configured! See the *parameters start* below.

Program made by Jaiden G, find me at https://github.com/JaidenAGrimminck.

It's a little buggy, but it was a fun afternoon project to make.
*/

/* parameters start */

// 1 for wall, 0 for empty space
// 2 for the starting location.
// the tile size is "how big" each tile is in the 3d space (width and length)
const tileSize = 10;
const enviornment = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

//if you want to randomize the maze, set this to true
const randomizeMaze = true;

//adjust the player pos x and y for adjustments in the enviornment
//it'll base the position where the "2" is above in the enviornment and adjust it accordingly
//rot is the rotation of the player
let playerPos = {
    x: 0,
    y: -2,
    rot: -Math.PI / 4
}

//if you want to randomly generate the player position, set this to true
//this will IGNORE the playerPos.x and playerPos.y values above and randomly generate the player position
const randomlyGeneratePlayerPos = true;

//This is the maximum "jump" in height of the boxes in the 3d space before it's considered a new wall
//it may require adjusting based on the enviornment
const maxJumpForShift = 20;

//if you want to display the shading
const displayShading = true;

//if you want to display the map
const displayMap = true;

//if you want to display the massive chunk of lines that is the raycasting in the map
const displayRaycasting = true;

//how much the shading is scaled by. increasing will decrease the amount of shading, vice versa
//1 is good for picturing what it'll look like, but for drawing, 3/4 looks better honestly
const shadingScale = 2;

//how much the slope threshold must be to think it's actually changed perspective
const slopeThreshold = 0;

// if there's a dramatic shift, if you want the tops to go from bottom to top, set this to true
// or it'll just go from the higher level to the lower level on top
const topsToBottom = false;

//contains the lines within the slopes. if true, it'll just cut off the line if it goes out of bounds
const containLinesWithinShading = true;

//fov for display. 60 is a good value
const fov = 60;

/* end parameters */

//if in local enviornment, set to true. If in the blot editor, set to false.
//just flips it around and edits the values accordingly
//ignore this one if you're in the blot editor
const inLocalEnviornment = false;

const blotwidth = 125;
const blotheight = 125;

const scale = 4;

//for local enviornment
const width = 125 * scale;
const height = 125 * scale;

const walls = [];

class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    signedDistance(x, y) {
        let adjX = this.x + this.w / 2;
        let adjY = this.y + this.h / 2;

        let dx = Math.max(Math.abs(x - adjX) - this.w / 2, 0);
        let dy = Math.max(Math.abs(y - adjY) - this.h / 2, 0);
        return Math.sqrt(dx * dx + dy * dy);
    }
}

function translateEnviornment() {
    if (randomizeMaze) {
        for (let y = 1; y < enviornment.length - 1; y++) {
            for (let x = 1; x < enviornment[y].length - 1; x++) {
                enviornment[y][x] = bt.randIntInRange(0, 1);
            }
        }
    }

    let possiblePositions = [];

    for (let y = 0; y < enviornment.length; y++) {
        for (let x = 0; x < enviornment[y].length; x++) {
            if (enviornment[y][x] === 2) {
                playerPos.x += x * tileSize + tileSize / 2;
                playerPos.y += y * tileSize + tileSize / 2;
            }
            if (enviornment[y][x] === 1) {
                walls.push(new Wall(x * tileSize, y * tileSize, tileSize, tileSize));
            }
            if (enviornment[y][x] === 0) {
                possiblePositions.push([x * tileSize, y * tileSize]);
            }
        }
    }

    if (randomlyGeneratePlayerPos) {
        let randomPos = possiblePositions[bt.randIntInRange(0, possiblePositions.length - 1)];
        playerPos.x = randomPos[0] + tileSize / 2;
        playerPos.y = randomPos[1] + tileSize / 2;

        playerPos.rot = bt.randIntInRange(0, 360) * Math.PI / 180;
    }
}

function raycastFromPosition(x, y, angle) {
    const maxDistance = 1000;

    let d = 0;
    while (d < maxDistance) {
        let dx = d * Math.cos(angle);
        let dy = d * Math.sin(angle);

        let closestSignedDist = 1000;

        for (let wall of walls) {
            if (wall.signedDistance(x + dx, y + dy) < 0.1) {
                return d;
            }

            if (wall.signedDistance(x + dx, y + dy) < closestSignedDist) {
                closestSignedDist = wall.signedDistance(x + dx, y + dy);
            }
        }
        d += closestSignedDist * 0.1;
    }

    return 100;
}

if (inLocalEnviornment) {
    setDocDimensions(width, height);
} else {
    setDocDimensions(blotwidth, blotheight);
}

function circle(x, y, r, sides=360) {
  let a = [];
  for (let t = 0; t < 2 * Math.PI; t += (Math.PI / sides) * 2) {
    a.push([
      x + r * Math.cos(t),
      y + r * Math.sin(t)
    ])
  }
  return a;
}

const shaded = {
    THICK: 2,
    MEDIUM: 4,
    LIGHT: 8
}

function rect(x,y,w,h) {
    return [
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h],
        [x,y]
    ];
}

function vertShadedRectange(x,y,w,h,level) {
    let paths = [];
    for (let t = 0; t <= 100; t += level) {
        let p = t / 100;
        paths.push([
            [x, y + (h * p)],
            [x + w, y + (h * p)],
        ]);
    }

    paths.push([
        [x, y],
        [x, y + h]
    ])
    paths.push([
        [x + w, y],
        [x + w, y + h]
    ])
    paths.push([
        [x, y + h],
        [x + w, y + h]
    ])

    return paths;
}

function vertShadedRectangleWithSlant(x,y,w,h,slope,level, max=10000) {
    let paths = [];
    for (let t = 0; t <= 100; t += level) {
        let p = t / 100;

        let yDown = y + (h * p);

        let xw = x + w;
        let yh = yDown + (slope * w);
        let flag = false;

        if (yh < y && containLinesWithinShading) {
            xw = x + (y - yDown) / slope;

            yh = y;

            flag = true;
        }

        if (yh > max) {
            xw = x + (max - yDown) / slope;

            yh = max;

            flag = true;
        }

        paths.push([
            [x, yDown],
            [xw, yh],
        ]);

    }
    return paths;
}

function shadedRectangle(x,y,w,h,level) {
    let paths = [];

    for (let t = 0; t <= 100; t += level) {
        let p = t / 100;
        paths.push([
            [x + (w * p), y],
            [x, y + (h * p)],
        ]);
    }

    for (let t = 0; t < 100; t += level) {
        let p = t / 100;
        paths.push([
            [x + w - (w * p), y + h],
            [x + w, y + h - (h * p)],
        ]);
    }

    return paths;
}

// store final lines here
const finalLines = [
    // circle(width / 2, height / 2, width / 4),
    // ...shadedRectangle(100, 100, 110, 110, shaded.LIGHT)
];

translateEnviornment();

function fillFinalLines() {
    const offset = 100;

    let heights = [];
    let lastChange = 0;

    let heightList2 = [];

    for (let i = 0; i < fov; i++) {
        let m = (i - (fov / 2));
        let wallHeight = raycastFromPosition(playerPos.x, playerPos.y, playerPos.rot + (m * Math.PI / 180));

        let lineHeight = 10 * height / wallHeight;

        if (lineHeight > height - offset) {
            lineHeight = height - offset;
        }

        heights.push(lineHeight);

        heightList2.push([
            m, lineHeight
        ])
    }

    let signChanges = [];
    let tops = [[
        width * (0 / fov),
        height - offset - heights[0]
    ]];

    for (let i = 1; i < heights.length; i++) {
        if (Math.abs(heights[i] - heights[i - 1]) > maxJumpForShift) {

            let lowerHeight = Math.min(heights[i], heights[i - 1]);
            let higherHeight = Math.max(heights[i], heights[i - 1]);

            tops[tops.length - 1].push([
                width * (i / fov),
                height - offset - lowerHeight
            ]);

            tops[tops.length - 1].push([
                width * (i / fov),
                height - offset + (topsToBottom ? 0 : -higherHeight)
            ]);

            tops.push([
                [
                    width * (i / fov),
                    height - offset - heights[i]
                ]
            ]);
        } else {
            tops[tops.length - 1].push([
                width * (i / fov),
                height - offset - heights[i]
            ])

            if (i == heights.length - 1) {
                tops[tops.length - 1].push([
                    width * (i / fov),
                    height - offset
                ])
            }
        }
        
        let thisChange = heights[i] - heights[i - 1];
        let slope = -(thisChange) / (width / fov);

        if (Math.sign(lastChange) != Math.sign(slope) && Math.abs(slope) > slopeThreshold && i != 0) {
            signChanges.push([
                [
                    width * ((i + 0.5) / fov),
                    height - offset - heights[i]
                ],
                [
                    width * ((i + 0.5) / fov),
                    height - offset
                ]
            ]);
        }

        lastChange = slope;
    }

    if (displayShading) {
        let lastHeight = heightList2[0][1];
        for (let i = 1; i < fov; i++) {
            let h = heightList2[i][1];

            if (Math.abs(lastHeight - h) > maxJumpForShift) {
                lastHeight = h;
            }

            let slope = -(heightList2[i][1] - lastHeight) / (width / fov);

            let x = width * (i / fov);
            let y = height - offset - h;

            let w = width / fov;
            
            let lines = vertShadedRectangleWithSlant(x, y, w, h, slope, 1.5 * shadingScale, height - offset);

            finalLines.push(...lines);

            lastHeight = h;
        }
    }

    
    finalLines.push(...tops);
    finalLines.push(...signChanges);
    finalLines.push([[
        0,
        height - offset
    ], [
        width,
        height - offset
    ]]);
}

function drawMap() {
    const offset = 95;

    for (let wall of walls) {
        finalLines.push(rect(wall.x, height - offset + wall.y, wall.w, wall.h));
    }

    finalLines.push(circle(playerPos.x, height - offset + playerPos.y, 4));

    finalLines.push([
        [playerPos.x, height - offset + playerPos.y],
        [playerPos.x + Math.cos(playerPos.rot) * 10, height - offset + playerPos.y + Math.sin(playerPos.rot) * 10]
    ])

    if (displayRaycasting) {
        for (let i = 0; i < fov; i++) {
            let m = i - (fov / 2);
            let wallHeight = raycastFromPosition(playerPos.x, playerPos.y, playerPos.rot + (m * Math.PI / 180));

            finalLines.push([[
                playerPos.x,
                height - offset + playerPos.y,
            ], [
                playerPos.x + Math.cos(playerPos.rot + (m * Math.PI / 180)) * wallHeight,
                height - offset + playerPos.y + Math.sin(playerPos.rot + (m * Math.PI / 180)) * wallHeight
            ]]);
        }
    }
}

fillFinalLines();

if (displayMap) {
    drawMap();
}

if (!inLocalEnviornment) {
    for (let path of finalLines) {
        let toRemove = []
        for (let i = 0; i < path.length; i++) {
            //for some reason, direct modification doesn't work in blot... so we have to do this

            let x = path[i][0];
            let y = path[i][1];

            if (isNaN(x) || isNaN(y)) {
                toRemove.push(i);
            }

            path[i] = [
                x / scale,
                blotheight - (y / scale)
            ];
        }

        for (let i = toRemove.length - 1; i >= 0; i--) {
            path.splice(toRemove[i], 1);
        }
    }
}


// draw it
drawLines(finalLines);
