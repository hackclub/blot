const width = 600;
const height = 400;

setDocDimensions(width, height);

const turtle = createTurtle();

function drawHorizontalArc() {
  turtle.jump([width / 1.2, height / 2]);
  turtle.down();
  turtle.setAngle(84)
  turtle.arc(163, 2 + -210);


  turtle.jump([width / 1.24, height / 2.03]);

  turtle.setAngle(81)
  turtle.arc(158, 2 + -197); // the 2nd arc

  turtle.jump([width / 1.2, height / 2]);
  turtle.setAngle(90);
  turtle.goTo([width / 6.9, height / 2.14]); // the upper line

  turtle.up();
}

function drawRandomParticles(numParticles) {
  for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * (width / 1.56 - width / 6.1) + width / 4.1;
    const y = Math.random() * (height / 2.2 - height / 4.86) + height / 5.01;

    turtle.jump([x, y]);
    turtle.down();


    turtle.arc(403,1.8)

    turtle.up();
  }
}


drawHorizontalArc();


drawRandomParticles(50); // Adjust the number of particles as needed

drawTurtles([turtle]);
