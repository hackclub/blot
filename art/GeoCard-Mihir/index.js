/*
@title: Geometric Note Card
@author: Mihir Surlaker
@snapshot: GeoCard1.png
*/

// Define dimensions and fixed radius
const canvasWidth = 125; // Canvas dimensions
const canvasHeight = 125;
const boxSize = 80; // Imaginary box size
const shapes = 6;
const fixedRadius = 15; // Fixed radius for shapes

setDocDimensions(canvasWidth, canvasHeight);

function drawShape() {
    const turtle = new bt.Turtle();
    const sides = bt.randIntInRange(3,7) // Random number of sides (3 to 7)

    // Ensure the entire shape fits within the 70x70 box
    let centerX = bt.rand() * (boxSize - 2 * fixedRadius) + fixedRadius;
    let centerY = bt.rand() * (boxSize - 2 * fixedRadius) + fixedRadius;

    // Adjust centerX and centerY to fit within the 70x70 box positioned in the canvas
    centerX += (canvasWidth - boxSize) / 2;
    centerY += (canvasHeight - boxSize) / 2;

    // Ensure the shape is within the bounds
    if (centerX + fixedRadius > canvasWidth) {
        centerX = canvasWidth - fixedRadius;
    }
    if (centerY + fixedRadius > canvasHeight) {
        centerY = canvasHeight - fixedRadius;
    }

    turtle.x = centerX;
    turtle.y = centerY;
    turtle.angle = 0;

    turtle.up();
    turtle.jump([centerX + fixedRadius, centerY]); // Move to the edge of the shape
    turtle.down();

    for (let i = 0; i < sides; i++) {
        turtle.forward(2 * fixedRadius * Math.sin(Math.PI / sides));
        turtle.left(360 / sides);
    }
    drawLines(turtle.lines());
}

for (let i = 0; i < shapes; i++) {
    drawShape();
}

// Note box
const turt = new bt.Turtle();
turt.jump([125, 0]); // Adjusted to fit within the border
turt.left(90);
turt.forward(20);
turt.left(90);
turt.forward(35);
turt.left(90);
turt.forward(20);
turt.left(90);
turt.forward(35);
drawLines(turt.lines());
