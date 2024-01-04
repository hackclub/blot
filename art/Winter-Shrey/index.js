
// DOCUMENT SIZE
const width = 300; // Width
const height = 200; // Height
setDocDimensions(width, height); // Setting height

// VARIABLES
const numPoints = 360; // Makes them smooth since there are 360 points
const increment = (2 * Math.PI) / numPoints; //incrament between points
const NumCloudPoints = 268; // Makes them smooth since there are 360 points

// CLOUD PART
const t = createTurtle(); // Making turtle
t.jump([50, 130]) //goes to first location

// Adds noise to a cloud point
function addNoise(pt, noiseFactor) {
  const [x, y] = pt;
  const noiseX = (rand() - 0.5) * noiseFactor; //noise to x
  const noiseY = (rand() - 0.5) * noiseFactor; //noise to y
  return [x + noiseX, y + noiseY]; //returns in point format
}

// Makes first cloud part
function generateNoisyPoints(theta, a, noiseFactor) {
  const r = a * Math.sin(theta * 2) + randInRange(4, 5); //makes it somewhat circular
  const x = r * Math.cos(theta) + randInRange(34, 142); // x val
  const y = r * Math.sin(theta) + randInRange(155, 171); //y val
  const noisyPoint = addNoise([x, y], noiseFactor); // adds noise to the point
  return noisyPoint; //returns point
}

// Makes second cloud part
function generateNoisyPoints2(theta, a, noiseFactor) {
  const r = a * Math.sin(theta * 2) + randInRange(-25, 4);
  const x = r * Math.cos(theta) + randInRange(269, 81);
  const y = r * Math.sin(theta) + randInRange(138, 158);
  const noisyPoint = addNoise([x, y], noiseFactor);
  return noisyPoint;
}

// Makes third cloud part
function generateNoisyPoints3(theta, a, noiseFactor) {
  const r = a * Math.sin(theta * 2) + randInRange(0, 1);
  const x = r * Math.cos(theta) + randInRange(207, 277);
  const y = r * Math.sin(theta) + randInRange(174, 160);
  const noisyPoint = addNoise([x, y], noiseFactor);
  return noisyPoint;
}

// generates the first cloud part
for (let i = 0; i <= NumCloudPoints; i++) {
  const noisyPoint = generateNoisyPoints(i, 8, 48); 
  t.goTo(noisyPoint);
}

//generates second cloud part
for (let i = 0; i <= NumCloudPoints; i++) {
  const theta = i;
  const noisyPoint = generateNoisyPoints2(theta, 8, -31); // Adjust the noise factor as needed
  t.goTo(noisyPoint);
}

//generates third cloud part
for (let i = 0; i <= NumCloudPoints; i++) {
  const theta = i;
  const noisyPoint = generateNoisyPoints3(theta, 8, 48); // Adjust the noise factor as needed
  t.goTo(noisyPoint);
}

//SNOW PART
const snow = createTurtle();

// uses math to make points!!!
function generatePoints(theta, a) {
  const r = Math.sin((a / 5) * theta);
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return [x, y];
}

// put the turtle in the middle
snow.translate([width / 2, height / 2], t.cc);

const numSpirals = randIntInRange(10, 25); //How many snow flakes there will be

for (let i = 0; i < numSpirals; i++) {
  const randomX = randIntInRange(10, 280); //Random X
  const randomY = randIntInRange(10, 88); //Random Y
  const randomA = randIntInRange(15, 100); //Random type of snowflake
  const scaleFactor = randIntInRange(2, 10); //Makes it big/small

  //gets the center to the correct rand point
  snow.up();
  snow.goTo([randomX, randomY]);
  snow.down();


  for (let j = 0; j <= numPoints; j++) {
    const theta = j * increment; //increaments it
    const [x, y] = generatePoints(theta, randomA); //makes the point to go to

    // Manual scaling cause the scale factor was being weird
    const scaledX = x * scaleFactor;
    const scaledY = y * scaleFactor;

    snow.goTo([scaledX + randomX, scaledY + randomY]); //Goes to the point
  }
}


//DRAWING THE IMAGE
t.join(snow) //joins both together

drawTurtles([t]); // actually draw it
