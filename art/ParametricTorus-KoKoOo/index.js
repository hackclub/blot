/*
@title: Parametric Torus
@author: Ko Ko Oo
@snapshot: thumbnail.png
*/

//it needs to be square
const width = 125;
const height = 125;

//the overall radius of a circle
const CIRCLE_R = height / 2;
const RING_R = 91;

//factor of the density
const circle_density = 15;
setDocDimensions(width, height);


//ring turtle
const rt = createTurtle();


//circle equation to plot 
for (let i = 0; i < width*circle_density; i += 1) {
  const y = width / 2 + Math.sqrt(CIRCLE_R ** 2 - Math.pow((i/circle_density) - (height / 2), 2))
  const yn = width / 2 - Math.sqrt(CIRCLE_R ** 2 - Math.pow((i/circle_density) - (height / 2), 2))
  rt.jump([(i/circle_density), y - (RING_R)]);
  rt.arc(360,RING_R);
  rt.jump([(i/circle_density), yn - (RING_R)]);
  rt.arc(360,RING_R);
  
}

//scaling to fit into the dimension
const overall_radius = RING_R  + (height / 2);
rt.scale((height/2) / overall_radius  , [width/2,height/2]);

drawTurtles([
  rt
]);