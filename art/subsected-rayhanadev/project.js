/*
@title: Subsected
@author: rayhanadev
@snapshot: 0.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const turtle = createTurtle();

const iterations = 3;
const size = width / 2;

let figwidth = 1 - 0.25;

function divide(x, y, s, l) {
  if (l == 0) {
    // Quadrant 1
    if (rand() < 0.5) {
      turtle.jump([x + s / 2, y - s / 2]);
      turtle.goTo([x + s / 2, y + s / 2]);

      turtle.jump([x + s, y - s / 2]);
      turtle.goTo([x + figwidth * s, y - s / 2]);
      turtle.goTo([x + figwidth * s, y + s / 2]);
      turtle.goTo([x + s, y + s / 2]);
    } else {
      turtle.jump([x + s / 2, y - s / 2]);
      turtle.goTo([x + s, y - s / 2]);
      turtle.jump([x + s / 2, y + s / 2]);
      turtle.goTo([x + s, y + s / 2]);
    }
    // Quadrant 2
    if (rand() < 0.5) {
      turtle.jump([x + s / 2, y - s / 2]);
      turtle.goTo([x - s / 2, y - s / 2]);

      turtle.jump([x + s / 2, y - s]);
      turtle.goTo([x + s / 2, y - figwidth * s]);
      turtle.goTo([x - s / 2, y - figwidth * s]);
      turtle.goTo([x - s / 2, y - s]);
    } else {
      turtle.jump([x + s / 2, y - s / 2]);
      turtle.goTo([x + s / 2, y - s]);
      turtle.jump([x - s / 2, y - s / 2]);
      turtle.goTo([x - s / 2, y - s]);
    }
    // Quadrant 3
    if (rand() < 0.5) {
      turtle.jump([x - s / 2, y - s / 2]);
      turtle.goTo([x - s / 2, y + s / 2]);

      turtle.jump([x - s, y - s / 2]);
      turtle.goTo([x - figwidth * s, y - s / 2]);
      turtle.goTo([x - figwidth * s, y + s / 2]);
      turtle.goTo([x - s, y + s / 2]);

    } else {
      turtle.jump([x - s / 2, y - s / 2]);
      turtle.goTo([x - s, y - s / 2]);
      turtle.jump([x - s / 2, y + s / 2]);
      turtle.goTo([x - s, y + s / 2]);
    }
    // Quadrant 4
    if (rand() < 0.5) {
      turtle.jump([x + s / 2, y + s / 2]);
      turtle.goTo([x - s / 2, y + s / 2]);

      turtle.jump([x + s / 2, y + s]);
      turtle.goTo([x + s / 2, y + figwidth * s]);
      turtle.goTo([x - s / 2, y + figwidth * s]);
      turtle.goTo([x - s / 2, y + s]);
    } else {
      turtle.jump([x + s / 2, y + s / 2]);
      turtle.goTo([x + s / 2, y + s]);
      turtle.jump([x - s / 2, y + s / 2]);
      turtle.goTo([x - s / 2, y + s]);
    }
  } else {
    l--;
    s /= 2;

    divide(x + s, y + s, s, l);
    divide(x + s, y - s, s, l);
    divide(x - s, y + s, s, l);
    divide(x - s, y - s, s, l);
  }
}

divide(0 + (width / 2), 0 + (width / 2), size, iterations)

drawTurtles([turtle]);
