const width = 300; //Width
const height = 200; // Height
const numPoints = 360; // Makes them smooth since there are 360 points
const increment = (2 * Math.PI) / numPoints; //incrament between points

setDocDimensions(width, height); //setting height

const t = createTurtle(); //making turtle

// uses math to make points!!!
function generatePoints(theta, a) {
  const r = Math.sin((a / 5) * theta);
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return [x, y];
}

// put the tutle in the middle
t.translate([width / 2, height / 2], t.cc);

// make a cloud, it's kinda weird but I like it
t.up();
t.goTo([24, 156]);
t.down();
t.forward(250);
t.arc(-75, 3);
t.arc(-180, 30);
t.arc(180, 3);
t.arc(-180, 13);
t.arc(15, 1);
t.arc(60, 1);
t.arc(-56, 13);
t.arc(85, 13);
t.arc(30, 1);
t.arc(-85, 40);
t.arc(-90, 11);
t.arc(222, 1);
t.arc(-135, 3);
t.arc(36, 59);
t.arc(37, 1);
t.arc(-70, 26);
t.arc(-50, 21);
t.arc(-25, 5);
t.arc(-79, 1);
t.forward(5);

// Draw the snow flakes
const numSpirals = randIntInRange(10, 25); //How many snow flakes there will be

for (let i = 0; i < numSpirals; i++) {
  const randomX = randIntInRange(10, 280); //Random X
  const randomY = randIntInRange(10, 130); //Random Y
  const randomA = randIntInRange(15, 100); //Random type of snowflake
  const scaleFactor = randIntInRange(2, 10); //Makes it big/small

  //gets the center to the correct rand point
  t.up();
  t.goTo([randomX, randomY]);
  t.down();

  
  for (let j = 0; j <= numPoints; j++) {
    const theta = j * increment; //increaments it
    const [x, y] = generatePoints(theta, randomA); //makes the point to go to
    
    // Manual scaling cause the scale factor was being weird
    const scaledX = x * scaleFactor;
    const scaledY = y * scaleFactor;

    t.goTo([scaledX + randomX, scaledY + randomY]); //Goes to the point
  }
}

// actually draws it
drawTurtles([t]);
