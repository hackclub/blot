/*
@title: Snowflakes
@author: uped
@snapshot: snapshot0.png
*/

bt.setRandSeed(14819);

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();

const backward = (turtle, distance) => {
  turtle.right(180);
  turtle.forward(distance);
  turtle.right(180);
}

const draw_branch = (size) => {
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      t.forward(10*size/3);
      backward(t, 10*size/3);
      t.right(45);
    }
    t.left(90);
    backward(t, 10*size/3);
    t.left(45);
  }
  t.right(90);
  t.forward(10*size);
}

const draw_snowflake = (size) => {
  t.up();
  t.forward(10*size);
  t.left(45);
  t.down();
  for (let i = 0; i < 8; ++i) {
    draw_branch(size);
    t.left(45);
  }
}

for (let i = 0; i < 4; ++i) {
  for (let j = 0; j < 4; ++j) {
    let x = 5 + ((width - 5) / 4) * i + bt.randInRange(5, 15);
    let y = 5 + ((height - 5) / 4) * j + bt.randInRange(5, 15);
    let rot = bt.randIntInRange(0, 360);
    let size = bt.randInRange(0.4, 0.7);
    t.up();
    t.setAngle(rot);
    t.goTo([x, y]);
    t.down();
    draw_snowflake(size);
  }
}

drawLines(t.lines());