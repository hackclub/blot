// welcome to blot!
// This is Shourya i am trying to learn to code and use the editor this is the frist art peice i made it represents a flower from my garden 

const width = 125;
const height = 125;

setDocDimensions(width, height);

const testTurtle = createTurtle();

for (let i = 0; i < 76; i++) {
    testTurtle.forward(i);
    testTurtle.left(466751);
}

testTurtle.translate(
  [width/2, height/2], 
  testTurtle.cc
);

drawTurtles(
    testTurtle
);