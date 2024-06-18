/*
@title: Random Spoons
@author: Rushil Chopra
@snapshot: snapshot1.svg
*/

const width = 200;
const height = 200;

setDocDimensions(width, height);

const spoonWidth = 20;
const spoonHeight = 50;
const handleLength = 50;
const bowlRadius = 10;

const t = new bt.Turtle();

function generateSpoon() {
  const spoonAngle = bt.rand() * 360;
  const spoonX = bt.rand() * (width - spoonWidth);
  const spoonY = bt.rand() * (height - spoonHeight);

  t.jump([spoonX, spoonY]);

  
  t.setAngle(spoonAngle);
  t.forward(bowlRadius * 2);
  t.right(90);
  t.forward(bowlRadius);
  t.right(90);
  t.forward(bowlRadius * 2);
  t.left(90);
  t.forward(bowlRadius);
  t.left(90);

  
  t.setAngle(spoonAngle + 90);
  t.forward(handleLength);
}

for (let i = 0; i < 10; i++) {
  generateSpoon();
}

drawLines(t.lines());