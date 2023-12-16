// welcome to blot!

const width = 500;
const height = 500;

setDocDimensions(width, height);

const turtle = createTurtle();

for (let i = 0; i <250; i++) {
  turtle.forward(i);
  turtle.left(91);

  for (let i = 0; i < 1; i += 0.25) {
    turtle.forward(i);
    turtle.left(91);
  }
}

turtle.translate(
  [width / 2, height / 2],
  turtle.cc
);

drawTurtles([
  turtle
]);