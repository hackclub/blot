/*
@title: IsometricMadness
@author: Daniel Benge (@Dragon863)
@snapshot: snapshotIsometricMadness.png
*/

const width = 125;
const height = 125;

// Configures block size. This is *not* constrained to stay within the canvas.
const blockScale = 15;

// Use this to define the pattern you want to make. Defaults to a H (for hack club, naturally!)
// 1 = block
// 0 = no block
const configurableMap = [
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 1],
    [0, 1, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
]

setDocDimensions(width, height);

// We need mathematical constants
const cos = Math.cos;
const sin = Math.sin;
const rad = Math.PI / 180;

// These will store the polylines for the faces
let leftFaces = [];
let rightFaces = [];
let bottomFaces = [];

// Main function, this adds an isometric block (cube)
function addIsometricBlock(x, y, scale) {
    // Prepare for a lot of maths! This function will create lines for each face.
    // Whilst it may look very complicated, it's really just working out the coordinates of point at a 30 degree angle (this is called isometric projection)
  
    // Left (black) face
    const leftFace = [
        [x, y],
        [x + cos(30 * rad) * scale, y + sin(30 * rad) * scale],
        [x + cos(30 * rad) * scale, y + sin(30 * rad) * scale + scale],
        [x, y + scale],
        [x, y],
    ];

    // Right (grey) face
    const rightFace = [
        [x + cos(30 * rad) * scale, y + sin(30 * rad) * scale],
        [x + cos(30 * rad) * scale + cos(30 * rad) * scale, y + sin(30 * rad) * scale - sin(30 * rad) * scale],
        [x + cos(30 * rad) * scale + cos(30 * rad) * scale, y + sin(30 * rad) * scale + scale - sin(30 * rad) * scale],
        [x + cos(30 * rad) * scale, y + sin(30 * rad) * scale + scale],
        [x + cos(30 * rad) * scale, y + sin(30 * rad) * scale]
    ];

    // Bottom (white) face
    const bottomFace = [
        [x, y],
        [x + cos(30 * rad) * scale, y - sin(30 * rad) * scale],
        [x + cos(30 * rad) * scale + cos(30 * rad) * scale, y + sin(30 * rad) * scale - sin(30 * rad) * scale],
        [x + cos(30 * rad) * scale, y + sin(30 * rad) * scale],
        [x, y]
    ];

    return [leftFace, rightFace, bottomFace];
}

function drawBackgroundPattern(width, height, scale) {
    // Makes a cool background!
    const myTurtle = new bt.Turtle();
    myTurtle.goTo([1, 0]); // Not sure why this isn't 0, 0 to be honest but it works
    myTurtle.up();
    myTurtle.left(90);
    for (let x = 0; x <= width; x++) {
        for (let y = 0; y <= height - 1; y++) {
            if (Math.random() > 0.5) {
                myTurtle.down();
                myTurtle.forward(1);
                myTurtle.up();
            } else {
                myTurtle.up();
                myTurtle.forward(1);
            }
        }
        myTurtle.goTo([x, 0]);
    }
    // Let's actually draw this.
    drawLines(myTurtle.lines());
}

// Prevent our cubes from colliding
const xOffset = cos(30 * rad) * blockScale * 2;
const yOffset = blockScale;

for (let j = 0; j < configurableMap.length; j++) {
    for (let i = 0; i < configurableMap[j].length; i++) {
        if (configurableMap[j][i] === 0) {
            // Handle values not being present
            continue;
        }
        // Start location for cube to be drawn
        const x = i * xOffset;
        const y = (height - blockScale * 1.5) - j * yOffset;
      
        const block = addIsometricBlock(x, y, blockScale);

        // Function returns a 2D array containing the faces
        const leftFace = block[0];
        const rightFace = block[1];
        const bottomFace = block[2];

        // Add to the global arrays created at the start
        leftFaces.push(leftFace);
        rightFaces.push(rightFace);
        bottomFaces.push(bottomFace);
    }
}

// Don't forget the cool background! :)
drawBackgroundPattern(width, height, blockScale);

// Draw it!
drawLines(bottomFaces, { stroke: "black", fill: "white" });
drawLines(leftFaces, { fill: "grey", stroke: "grey" });
drawLines(rightFaces, { fill: "black" });
