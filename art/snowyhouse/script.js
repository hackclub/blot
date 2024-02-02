// welcome to blot!

const width = 120;
const height = 120;

function drawSquare(sidelength, startpositionx, startpositiony){
  const turtle = new Turtle;
  turtle.jump([startpositionx, startpositiony]);
  turtle.setAngle(90);
  for (var i = 0; i < 4; i++){
    turtle.forward(sidelength);
    turtle.right(90);
  }
  drawTurtles([turtle]);
}

function drawLine(startpointx, startpointy, endpointx, endpointy){
  const turtle = new Turtle;
  turtle.jump([startpointx, startpointy]);
  turtle.goTo([endpointx, endpointy]);
  drawTurtles([turtle]);
}

//draws the house outline
drawSquare((1/2)*width, width/4, height/6);
drawLine((1/4)*width, (2/3)*height, (1/2)*width, (5/6)*height);
drawLine((1/2)*width, (5/6)*height, (3/4)*width, (2/3)*height);

//draws the door
drawLine((51/120)*width, (45/120)*height, (69/120)*width, (45/120)*height);
drawLine((51/120)*width, (1/6)*height, (51/120)*width, (45/120)*height);
drawLine((69/120)*width, (1/6)*height, (69/120)*width, (45/120)*height);

//draws the windows on the door
drawSquare((5/120)*width, (52/120)*width, (39/120)*height);
drawSquare((5/120)*width, (63/120)*width, (39/120)*height);

//draws the frames of the doors windows
drawLine((54.5/120)*width,(44/120)*height,(54.5/120)*width,(39/120)*height);
drawLine((65.5/120)*width,(44/120)*height,(65.5/120)*width,(39/120)*height);
drawLine((63/120)*width,(41.5/120)*height,(68/120)*width,(41.5/120)*height);
drawLine((52/120)*width,(41.5/120)*height,(57/120)*width,(41.5/120)*height);

//draws the first floor windows
drawSquare((11/120)*width, width/3.4, height/4);
drawSquare((11/120)*width, width/1.62, height/4);

//draws the frames for the first floor windows
drawLine((41/120)*width, (1/4)*height, (41/120)*width, (41/120)*height);
drawLine((79.5/120)*width, (1/4)*height, (79.5/120)*width, (41/120)*height);
drawLine((35.295/120)*width, (35.5/120)*height, (46.3/120)*width, (35.5/120)*height);
drawLine((74.1/120)*width, (35.5/120)*height, (85.075/120)*width, (35.5/120)*height);

//draws the second floor windows
drawSquare((16/120)*width, width/3.4, height/2.2);
drawSquare((16/120)*width, (69/120)*width, height/2.2);

//draws the frames for the second floor windows
drawLine((43/120)*width, (54.5/120)*height, (43/120)*width, (70.5/120)*height);
drawLine((51.3/120)*width, (63/120)*height, (35.3/120)*width, (63/120)*height);
drawLine((77/120)*width, (54.5/120)*height, (77/120)*width, (70.5/120)*height);
drawLine((69/120)*width, (63/120)*height, (85.075/120)*width, (63/120)*height);

//draws the snowflakes
for (var i = 0; i<120; i++){
  const turtle = new Turtle;
  turtle.jump([randIntInRange(0,width), randIntInRange(((1/6)*height), height)]);
  turtle.arc(360, 1);
  drawTurtles([turtle]);
}