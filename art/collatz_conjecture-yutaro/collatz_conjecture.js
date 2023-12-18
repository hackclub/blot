//collatz conjecture by Yutaro

const width = 279;
const height = 216;
setDocDimensions(width, height);
const turtle = createTurtle();

const it = 200;
const angle = 10;
const length = 25;
const scale = 0.25;

let x = width;
let y = 0;

let steady = 2;
let num = steady;

turtle.up();
turtle.goTo([x,y]);
turtle.setAngle(90);
turtle.down();

while(steady<it){
  
  if(num%2 == 0){
    turtle.left(angle);
    turtle.forward(length);
    num = num/2;
  }
  else{
    turtle.right(angle);
    turtle.forward(length);
    num = num*3+1;
  }
  
  if (num<=1){
    turtle.up();
    turtle.setAngle(90);
    turtle.jump([width,0]);
    turtle.down();
    steady +=2;
    num = steady;
  }
}
turtle.scale(
  scale,
  [width, 0]
);

drawTurtles([
    turtle
]);