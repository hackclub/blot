/*
@title: face generator
@author: AgentQPK
@snapshot: veryhappyface.png
*/

// these are settings
let eyesize2 = bt.randInRange(0.01, 0.05);
let eyesize = bt.randInRange(0.01, 0.05);
let eyedistance = bt.randIntInRange(30, 60);
let eyeheight = bt.randIntInRange(20, 30);
let direction = bt.randIntInRange(1, 2);
let rngangle = bt.randIntInRange(1, 2);
let mouthlength2 = bt.randIntInRange(20, 40);
let mouthlength = bt.randIntInRange(20, 40);
let mouthheight = bt.randIntInRange(70, 90);

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];
const t = new bt.Turtle();

//these forwards and lefts create the square around the face
t.forward(width);
t.left(90);
t.forward(height);
t.left(90);
t.forward(width);
t.left(90);
t.forward(height);
t.left(90);

//this makes the circle that the face is in
t.jump([width / 2, height * 0.95])
for (let i = 0; i < 360; i++) {
  t.forward(1);
  t.right(1);
}

//this draws the circle and turns the inside yellow
drawLines([t.lines()[t.lines().length - 1]], { fill: "yellow" });
t.right(90);
t.up();
t.forward(mouthheight);
t.right(90);
t.down();

//this saves the angle and position so that the turtle can be put at the center of the mouth again later
let saveposition = t.pos;
let saveangle = t.angle;

//this loop decides if the left half of the mouth is frowny or smiley and how frowny or smiley it is
for (let i = 0; i < mouthlength; i++) {
  if (direction == 1) {
    t.right(rngangle);
  }
  if (direction == 2) {
    t.left(rngangle);
  }
  t.forward(1);
}

//this sets the turtle back to the center of the mouth and turns it
t.setAngle(saveangle);
t.jump(saveposition);
t.right(180);


//this loop decides if the right half of the mouth is frowny or smiley and how frowny or smiley it is
for (let i = 0; i < mouthlength2; i++) {
  if (direction == 2) {
    t.right(rngangle);
  }
  if (direction == 1) {
    t.left(rngangle);
  }
  t.forward(1);
}

//this decides how high up the eyes are
t.up();
t.setAngle(90);
t.forward(eyeheight)
t.down();

//this creates the eyes
function eyeshape(size) {
  for (let i = 0; i < 360; i++) {
    t.forward(size);
    t.right(1);
  }

}

//this draws the right eye
eyeshape(0.1);
drawLines([t.lines()[t.lines().length - 1]], { fill: "white" })

//this centers the turtle in the middle of the eye
t.up();
t.setAngle(0);
t.forward(5);
t.setAngle(90);
t.down();

//this draws and chooses the size of the right pupil
eyeshape(eyesize);
drawLines([t.lines()[t.lines().length - 1]], { fill: "black" });

//this turns and moves a random amount away
t.setAngle(180);
t.up();
t.forward(eyedistance);
t.down();

//this creates the size of the left eye
eyeshape(0.1);
drawLines([t.lines()[t.lines().length - 1]], { fill: "white" });

//this centers the turtle in the left eye
t.up();
t.setAngle(90);
t.forward(5);
t.down();

//this draws and chooses the size of the left pupil+

eyeshape(eyesize2);
drawLines([t.lines()[t.lines().length - 1]], { fill: "black" });








// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
//drawLines(finalLines);
drawLines(finalLines);