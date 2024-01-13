const width = 125;
const height = 125;

setDocDimensions(width, height);

function drawCircle(turtle, radius) {

 const centerX = width / 2;
 const centerY = height / 2;
 turtle.jump([centerX, centerY]);


 turtle.down();


 for (let i = 0; i < 360; i++) {
  const angle = i * Math.PI / 180;
  const dx = radius * Math.cos(angle);
  const dy = radius * Math.sin(angle);
  turtle.forward(0.1); 
  turtle.goTo([centerX + dx, centerY + dy]); 
 }


 turtle.up();
}

function drawRandomCircles(numCircles) {
 const circles = createTurtle(); 

 for (let i = 0; i < numCircles; i++) {
  const radius = randInRange(5, 60); 
  const x = randInRange(0, width); 
  const y = randInRange(0, height); 

  const myTurtle = createTurtle();
  myTurtle.jump([x, y]); 
  drawCircle(myTurtle, radius); 
  circles.join(myTurtle); 
 }

 drawTurtles([circles]); 
}


drawRandomCircles(7);






///lines (radii)
setDocDimensions(width, height);

const testTurtle = createTurtle();


const centerX = 62.6;
const centerY = 62.5;


const radius = 60;


const numRadii = randIntInRange(4, 31);


const angleIncrement = Math.PI * 2 / numRadii;

testTurtle.jump([centerX, centerY]);  
testTurtle.down();  
testTurtle.up(); 

for (let i = 0; i < numRadii; i++) {
  const angle = i * angleIncrement; 
  const endX = centerX + radius * Math.cos(angle);
  const endY = centerY + radius * Math.sin(angle);
  testTurtle.jump([centerX, centerY]);  
  testTurtle.goTo([endX, endY]);
}






drawTurtles([testTurtle]);