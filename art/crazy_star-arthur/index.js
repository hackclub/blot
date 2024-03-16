/*
@title: crazy_star
@author: Arthur Beck
@snapshot: crazy_star1.png
*/

const width = 125;
const height = 125;

const size = 30;
setRandSeed(size);

setDocDimensions(width, height);

const drawTurtle = createTurtle();
for (var i = 0; i<size*3; i++) {
  drawTurtle.forward(size*11)
  drawTurtle.arc(size*(90/41),-size)
  drawTurtle.rotate(size*(5/47), drawTurtle.cc)
}
drawTurtle.scale(1/5, drawTurtle.cc)


drawTurtle.translate(
  [(width/2), (height/2)], 
  drawTurtle.cc
);

drawTurtles([
    drawTurtle
]);