const turtle = new Turtle();

setDocDimensions(800, 800);

turtle.jump([400, 350])

const layers = 25 // 25, 15, 40
const depth = 15  // 15, 10, 25

for (let i = 0; i < layers; i++) {
    for (let j = 0; j < depth; j++) {
        turtle.right(90);
        turtle.arc(90, 200 - i * 4);
        turtle.left(90);
        turtle.arc(90, 200 - i * 4);
        turtle.right(180);
        turtle.arc(24, 50);
    }
}

drawTurtles([turtle]);