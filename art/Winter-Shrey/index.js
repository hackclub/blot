// DOCUMENT SIZE
const width = 300; // Width
const height = 200; // Height
setDocDimensions(width, height); // Setting height

// VARIABLES
const numPoints = 360; // Makes them smooth since there are 360 points
const increment = (2 * Math.PI) / numPoints; //incrament between points
const NumCloudPoints = 360; // Makes them smooth since there are 360 points

// CLOUD PART
const t = createTurtle(); // Making turtle
t.jump([50, 130]) //goes to first location

function cloud() {
  const t = createTurtle();

  t.arc(360, 27);
  t.scale([4, 1]);
  t.resample(1);
  const minX = t.lc[0];
  const maxX = t.rc[1];
  const centerY = t.rc[1];
  t.iteratePath((pt,t) => {
    const [x, y] = pt;
    const xT = (x-minX)/(maxX-minX) / 2
    pt[1] += noise([19.6, xT*6.1])*14;
    pt[1] += (y < centerY ? -1 : 1) * bezierEasing(-0.020, [0.836,-0.413], [0.148,0.819], -0.0600)(xT)*35;
  });

  t.translate([143, 126]);

  drawTurtles([ t ]);
}

cloud()

//SNOW PART
const snow = createTurtle();

function drawSnowflakeSegment(t, length, iter, type, x, y) {

  if (type == 1){ //Makes the first type of snowflake
  t.jump([x, y]);
  for (let i = 0; i < 4; i++) {
    t.forward(length / 6);
    t.left(45);
    t.forward(length / 12);
    t.right(180);
    t.forward(length / 12);
    t.left(45);
  }

  t.jump([x, y]);
  t.setAngle(60 * iter)
  }

  if (type == 2){ //Makes the second type of snowflake
    t.jump([x, y]);
    for (let i = 0; i < 5; i++) {
        t.forward(length / 24);
        t.left(45)
        t.forward((length / (48-i*5)) * 1 + 2);
        t.forward((length / (48-i*5)) * -1 - 2);
        t.right(90)
        t.forward((length / (48-i*5)) * 1 + 2);
        t.forward((length / (48-i*5)) * -1 - 2);
        t.left(45)
      }
      t.right(45)
      t.forward(length/24)
      t.arc(360, length/24)
    
      t.jump([x, y]); 
      t.setAngle(60 * iter)
    }

  if (type == 3){ //Makes the third type of snowflake
  t.jump([x, y]);
  
  t.forward(length/3);
  t.right(90);
  t.arc(360, length/20)
  t.left(90);
  t.forward(length/-10);
  t.left(60);
  t.forward(length/10);
  t.right(90);
  t.arc(360, length/34)
  t.left(90);
  t.forward(length/-10);
  t.right(120);
  t.forward(length/10);
  t.right(90);
  t.arc(360, length/34)
  t.left(90);
  t.forward(length/-10);

  t.setAngle(0)
  t.jump([x+length/12, y+length/7]);

  for (let i = 0; i < 7; i++) {
    t.forward(length/-6);
    t.left(60);
  }
  t.jump([x, y]);
  t.setAngle(60 * iter)
  }
  if (type == 4){  //Makes the fourth type of snowflake
  t.jump([x, y]);

  t.forward(length/7)
  t.right(60)
  t.forward(length/7)
  t.right(120)
  t.forward(length/7)
  t.forward(length/-7)
 
  t.left(150)
  t.forward(length/32)
  
  t.left(60)
  t.forward(length/10)
  t.forward(length/-10)
  t.right(120)
  t.forward(length/10)
  t.forward(length/-10)
  t.left(60)
    
    
  t.forward(length/26)

  t.left(40)
  t.forward(length/10)
  t.forward(length/-10)
  t.right(80)
  t.forward(length/10)
  t.forward(length/-10)
  t.left(40)
    
  t.forward(length/21)

  t.left(30)
  t.forward(length/16)
  t.right(60)
  t.forward(length/16)
  t.right(120)
  t.forward(length/16)
  t.right(60)
  t.forward(length/16)
    
  t.jump([x, y]);
  t.setAngle(60 * iter)
  }
    if (type == 5){  //Makes the fifth type of snowflake
  t.jump([x, y]);

  t.forward(length/6)
  t.left(210)
  t.arc(35, -8)
  t.left(215)
  t.arc(35, -8)

  t.right(240)
  t.arc(35, -8)
  t.left(215)
  t.arc(35, -8)

  t.left(100)
  t.forward(length/25)
  t.left(113)
  t.arc(135, -2)
  t.right(45)
  t.arc(135, -2)

  t.right(158)
  t.forward(length/-7)
  t.right(239)
  t.forward(length/-15)
  t.forward(length/15)
  t.right(242)
  t.forward(length/-15)
    
  t.jump([x, y]);
  t.setAngle(60 * iter)
  }
}



const numFlakes = randIntInRange(3, 10); //How many snow flakes there will be

for (let i = 0; i < numFlakes; i++) {
  const randomX = randIntInRange(10, 291); //Random X
  const randomY = randIntInRange(41, 88); //Random Y
  const randomA = randIntInRange(1, 5); //Random type of snowflake
  const randomS = randIntInRange(40, 20); //Random Size

  for (let i = 0; i < 7; i++) {
    drawSnowflakeSegment(snow, randomS, i, randomA, randomX, randomY); // Adjust the length as needed
  }
}


//DRAWING THE IMAGE
t.join(snow) //joins both together

drawTurtles([t]); // actually draw it
