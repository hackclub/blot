/*
@title: Character
@author: Naman Saxena
@snapshot: character.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height)
const body = new bt.Turtle();
const arms = new bt.Turtle();
const face = new bt.Turtle();

bt.setRandSeed(966);//Change the value to see the person change!

const finalLines = [];

function drawPerson() {
  const rr = bt.randInRange;
  const headSize = rr(20, 30);
  
  // Face
  drawFace(face, rr, headSize);

  // Head
  body.arc(360, headSize);

  // Body
  drawBody(body, rr);

  // Arms
  drawArms(arms, rr);

  // Add turtle to final lines
  bt.join(finalLines, body.path, arms.path);

  // Center piece
  bt.translate(finalLines, [width / 2, height / 2]);

}

function drawBody(body, rr) {
  body.right(235);
  body.goTo([20, rr(-45, -60)]);
  body.arc(106, 24.4);
  
}

function drawArms(arms, rr) {
  arms.jump([-9, -20]);
  arms.right(538);
  arms.arc(108, 14.7);

  arms.jump([9, -18]);
  arms.right(rr(280, 360));
  arms.arc(108, 14.7);
  
}

function drawFace(face, rr, headSize) {  
  face.jump([52, headSize + rr(60, 63)]);
  face.arc(360, 5);

  face.jump([73, headSize + rr(60, 63)]);
  face.arc(360, 5);

  face.jump([62, 74]);
  face.left(-58);
  face.arc(120, 5);

}

// Call the functions
drawPerson();
drawLines(finalLines, body.path, arms.path);
drawLines(face.path, {width: 3, stroke: "white"});