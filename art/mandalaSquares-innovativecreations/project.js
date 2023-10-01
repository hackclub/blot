

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = createTurtle();

let size = 5;
let angle = 90;
let increment = 15;


for (let i = 0; i < 181; i++){  //change the parameter to make it dense 
  if( (360/angle) <4 ){ //changeable
    size += 2.0; //changeable
    increment += 4;  //changeable (crazy on -ve value)
    angle = 30; //changeable (crazy on -ve value)
  }
  t.left(angle)
  t.forward(size);
  t.left(90);
  t.forward(size);
  t.left(90);
  t.forward(size);
  t.left(90);
  t.forward(size);
  angle += increment;
}

drawTurtles(t);






