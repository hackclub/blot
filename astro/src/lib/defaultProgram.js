export const defaultProgram = `
// welcome to blot!

const width = 125;
const height = 125;

setDocDimensions(width, height);

const testTurtle = createTurtle();

for (let i = 0; i < 86; i++) {
    testTurtle.forward(i);
    testTurtle.left(91);
}

testTurtle.translate(
  [width/2, height/2], 
  testTurtle.cc
);

drawTurtles(
    testTurtle
);
`.trim()
