const height = 125;
const width = 125;

setDocDimensions(height, width);

const count = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
const offset = Math.random() * (5 - 0 + 0.001) + 0;


const turtle = new Turtle();
turtle.up();
turtle.goTo([height/2 , width/2]); //get it to center
turtle.down();

const distance = 50;

for (let i = 0; i < count; i++) {
  turtle.forward(distance);
  turtle.right(144 + offset);
}
drawTurtles([turtle]);
