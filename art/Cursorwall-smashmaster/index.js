/*
@title: Cursor Wall
@author: smashmaster
@snapshot: every cursor is unique and usually not symmetric.
*/

// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 300;
const height = 125;
const VARIANCE = 5;
const VARY_ANGLE = 0;
const STEP = 25;
const DIAMETER = 6;
const Y_SPACING = 15;
const Y_SPACING_MIN = 12;
const INIT_X_SPACING = 12;
const WAVE_SCALE = 25;
const PAD_X = 0;
const PAD_Y = 25;
const WAVE_SHIFT = 1.52 //(Math.PI / 6)
const LEGS_MULTIPLIER = 0.7; // this makes the legs shorter and more cursory paper airplaneish, for cursors I recommend 0.7
const ANGULAR_SCALE = 1; // changing this seems to cause problems
const DEG_OFFSET = bt.randInRange(0,360) * (Math.PI / 180);
const SPACING_DECAY = 0.97;

setDocDimensions(width + PAD_X, height + PAD_Y);

const finalLines = [];

const t = new bt.Turtle();

function drawCursor(x,y,angle = 0){
  t.jump([x,y])
  t.setAngle(angle);
  let corners = [];
  for(let z = 0; z < 3; z ++){
    let dist = (DIAMETER - z);
    if(z != 0){
      // "leg"
      dist = dist * LEGS_MULTIPLIER;
    }
    t.forward(dist);
    // t.forward((i/25 + j/25 + z) * -3);
    corners.push(t.pos);
    t.jump([x,y]);
    t.right(120);
  }
  t.jump(corners[0]);
  t.goTo(corners[1]);
  t.jump(corners[0]);
  t.goTo(corners[2]);
}

/*for (let i = 0; i < width; i+= 25) {
  for (let j = 0; j < height; j+= 25) {
    drawCursor(i,j, 1);
    // t.goTo(corners[0]);
  }
}*/

let origin_y = bt.randInRange(1,Y_SPACING);
while(origin_y < height){
  let x_spacing = INIT_X_SPACING;
  origin_y += bt.randInRange(Y_SPACING_MIN,Y_SPACING);
  for(let c = DIAMETER; c < (width - DIAMETER); c += Math.max(x_spacing,1)){
    let theta = WAVE_SHIFT + c * ((Math.PI * 2)/125) + DEG_OFFSET;
    drawCursor(c, origin_y + WAVE_SCALE * Math.sin(theta), (Math.atan(Math.sin(theta + Math.PI/2)) * (180/Math.PI)));
    x_spacing = x_spacing * SPACING_DECAY;
  }
}



// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);
