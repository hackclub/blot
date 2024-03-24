

/*
@title: Cool Maze
@author: Neerav
@snapshot: 1.png
*/



const width = 100;
const height = 100;

setDocDimensions(width, height);

const t = createTurtle();

for(var h = 0; h<=100; h++){
  
  for(var i = 1; i<= 100; i++){
    var yee =  randIntInRange(0,2)
    if(yee > 1){
      t.up()
    }
    else if(yee < 1){
      t.down()
    }
    t.forward(1);
  }
  t.jump([0, h]);
}
t.jump([0,0]);
t.left(90);
for(var h = 0; h<=100; h++){
  
  for(var i = 1; i<= 100; i++){
    var yee =  randIntInRange(0,2)
    if(yee > 1){
      t.up()
    }
    else if(yee < 1){
      t.down()
    }
    t.forward(1);
  }
  t.jump([h, 0]);
}
t.translate(
  [width/2, height/2], 
  t.cc
);

drawTurtles([
    t
]);
