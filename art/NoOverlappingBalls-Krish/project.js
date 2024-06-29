/*
@title: No Overalpping Balls
@author: Krish (ikrishagarwal)
@snapshot: snapshot3.png
*/

const width = 1000;
const height = 1000;
const t = new bt.Turtle();

setDocDimensions(width, height);

class Ball {
  constructor() {
    this.radius = Math.round(Math.random() * 70) + 30;
    this.x = Math.round(Math.random() * (width));
    this.y = Math.round(Math.random() * (height));
  }

  draw() {
    let r = this.radius;
    let y = this.y;
    let off = 1;

    while (r > 0) {
      t.jump([this.x, y]);
      t.arc(360, r);
      r -= off;
      y += off;
      off += .5;
    }
  }
}

let balls = [];
let offset = 10;

let count = 0;

while (count < 1000) {
  count++;
  let newBall = new Ball();

  let lap = 0;

  for (let i = 0; i < balls.length; i++) {
    let elem = balls[i];
    let dist = Math.hypot(newBall.x - elem.x, (newBall.y + newBall.radius) - (elem.y + elem.radius));

    if (dist < (newBall.radius + elem.radius + offset)) {
      lap++;
      break;
    }
  }

  if (lap == 0) {
    newBall.draw();
    balls.push(newBall);
  }
}


drawLines(t.lines());