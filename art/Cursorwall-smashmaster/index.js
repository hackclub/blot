/*
@title: Cursor Wall
@author: smashmaster
@snapshot: every cursor is unique and usually not symmetric.
*/

// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 120;
const height = 120;
const VARIANCE = 5;
const VARY_ANGLE = 0;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

for (let i = 0; i < width; i+= 25) {
  for (let j = 0; j < height; j+= 25) {
    t.jump([i,j])
    t.setAngle(0);
    if(VARY_ANGLE){
      t.setAngle(bt.randInRange(0, VARY_ANGLE));
    }
    let corners = [];
    for(let z = 0; z < 3; z ++){
      t.right(120 + (i/25)*5 + j/25);
      t.forward(bt.randInRange(1,VARIANCE) + ((i/25) + (j/25)) * 1);
      // t.forward((i/25 + j/25 + z) * -3);
      corners.push(t.pos);
      t.jump([i,j])
    }
    t.jump(corners[0]);
    t.goTo(corners[1]);
    t.goTo(corners[2]);
    // t.goTo(corners[0]);
  }
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);
