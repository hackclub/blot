/*
@title: star Pattern
@author: [surojit]
*/

// Dimensions and constants
const width = 300;
const height = 125;
const VARIANCE = 5;
const VARY_ANGLE = 0;
const STEP = 25;
const BODY_LENGTH = 30; // Length of fish body
const BODY_WIDTH = 15;  // Width of fish body
const TAIL_SIZE = 10;   // Size of the tail
const FIN_SIZE = 8;     // Size of the fins
const Y_SPACING = 30;
const Y_SPACING_MIN = 20;
const INIT_X_SPACING = 30;
const WAVE_SCALE = 20;
const PAD_X = 0;
const PAD_Y = 25;
const WAVE_SHIFT = 1.52; // (Math.PI / 6)
const ANGULAR_SCALE = 1;
const DEG_OFFSET = bt.randInRange(0,360) * (Math.PI / 180);
const SPACING_DECAY = 0.97;

// Set document dimensions
setDocDimensions(width + PAD_X, height + PAD_Y);

const finalLines = [];
const t = new bt.Turtle();

function drawFish(x, y, angle = 0) {
    t.jump([x, y]);
    t.setAngle(angle);
    
    // Draw fish body
    t.forward(BODY_LENGTH);
    t.right(234);
    t.forward(BODY_WIDTH);
    t.right(990);
    t.forward(BODY_LENGTH);
    t.right(780);
    t.forward(BODY_WIDTH);
    
    // Draw tail
    t.jump([x + BODY_LENGTH / 2, y]);
    t.setAngle(angle + 30);
    t.forward(TAIL_SIZE);
    t.right(120);
    t.forward(TAIL_SIZE);
    t.right(120);
    t.forward(TAIL_SIZE);
    
    // Draw fins
    t.jump([x + BODY_LENGTH / 4, y - BODY_WIDTH / 2]);
    t.setAngle(angle + 60);
    t.forward(FIN_SIZE);
    t.right(120);
    t.forward(FIN_SIZE);
    t.right(120);
    t.forward(FIN_SIZE);
    
    t.jump([x + 3 * BODY_LENGTH / 4, y - BODY_WIDTH / 2]);
    t.setAngle(angle - 60);
    t.forward(FIN_SIZE);
    t.right(120);
    t.forward(FIN_SIZE);
    t.right(120);
    t.forward(FIN_SIZE);
}

// Drawing loop
let origin_y = bt.randInRange(1, Y_SPACING);
while (origin_y < height) {
    let x_spacing = INIT_X_SPACING;
    origin_y += bt.randInRange(Y_SPACING_MIN, Y_SPACING);
    for (let c = BODY_LENGTH; c < (width - BODY_LENGTH); c += Math.max(x_spacing, 1)) {
        let theta = WAVE_SHIFT + c * ((Math.PI * 2) / 125) + DEG_OFFSET;
        drawFish(c, origin_y + WAVE_SCALE * Math.sin(theta), (Math.atan(Math.sin(theta + Math.PI / 2)) * (180 / Math.PI)));
        x_spacing = x_spacing * SPACING_DECAY;
    }
}

// Add turtle to final lines
bt.join(finalLines, t.lines());

// Center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// Draw it
drawLines(finalLines);