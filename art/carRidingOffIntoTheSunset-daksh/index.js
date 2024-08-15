const width = 125;
const height = 125;

const sun_x = bt.randIntInRange(50, 104);
const sun_y = bt.randIntInRange(50, 91);

setDocDimensions(width, height);

function drawSky() {
  const t = new bt.Turtle();
  t.jump([0, height]);
  t.forward(width);
  t.right(90);
  t.forward(60);
  t.right(90);
  t.forward(width);
  t.right(90);
  t.forward(60);
  return t.lines();
}

function drawGround() {
  const t = new bt.Turtle();
  t.jump([0, 54]);
  t.forward(width);
  t.right(90);
  t.forward(60);
  t.right(90);
  t.forward(width);
  t.right(90);
  t.forward(60);
  return t.lines();
}

// Function to draw the car
function drawRaceCar() {
  const t = new bt.Turtle();

  // Body of the car
  t.jump([20, 60]);
  t.forward(10);
  t.jump([80, 60]);
  t.forward(20);
  t.right(90);
  t.forward(15);
  t.right(90);
  t.forward(5);

  // Wheel arches
  t.right(90);
  t.forward(1);
  for (let i = 0; i < 54; i++) {
    t.left(10);
    t.forward(1);
  }
  t.right(90);
  t.forward(45);
  t.right(90);
  t.forward(1);
  for (let i = 0; i < 54; i++) {
    t.left(10);
    t.forward(1);
  }
  t.right(90);
  t.forward(7);
  t.right(90);
  t.goTo([20, 60]);

  // pain
  const angle = bt.randInRange(10, 80);
  t.jump([23, 60]);
  t.left(angle);
  t.forward(10);
  t.right(angle + 90);
  t.forward(5);
  t.right(180);
  t.up();
  t.forward(5);
  t.down();
  t.forward(2);
  t.right(90);
  t.forward(2);
  t.right(90);
  t.forward(7);
  t.right(90);
  t.forward(2);
  t.right(180);
  t.jump([25, 60]);
  t.left(angle);
  
  // Windows
  t.jump([56, 60]);
  t.setAngle(0);
  t.forward(15);
  t.right(-148);
  t.forward(18);
  t.goTo([56, 60]);

  t.jump([35, 60]);
  t.setAngle(0);
  t.forward(16);
  t.left(90);
  t.forward(9);
  t.left(90);
  t.forward(8);
  t.goTo([35, 60]);

  return t.lines();
}

// Function to draw wheels
function drawWheels() {
  const wheel_sides = bt.randIntInRange(3, 7);
  const t2 = new bt.Turtle();
  t2.jump([88, 107]);
  for (let i = 0; i < wheel_sides + 1; i++) {
    t2.left(180 - ((wheel_sides - 2) * 180) / wheel_sides);
    t2.forward(8 - wheel_sides);
  }

  t2.jump([31, 100]);
  t2.up();
  t2.forward(7);
  t2.down();
  t2.setAngle(0);
  for (let i = 0; i < wheel_sides + 1; i++) {
    t2.left(180 - ((wheel_sides - 2) * 180) / wheel_sides);
    t2.forward(8 - wheel_sides);
  }
  const path = t2.path;
  bt.translate(path, [61, 42], bt.bounds(path).cc);

  return path;
}

// Function to draw grass
function drawGrass() {
  const t3 = new bt.Turtle();
  const grassBladeCount = 331;
  for (let i = 0; i < grassBladeCount; i++) {
    const x = bt.randIntInRange(6, width);
    const y = bt.randIntInRange(0,10);
    t3.jump([x, y]);
    t3.setAngle(bt.randIntInRange(80, 104));
    t3.forward(bt.randIntInRange(5, 30));
  }
  return t3.lines();
}

// Function to draw the road
function drawRoad() {
  const roadWidth = width;
  const roadHeight = 44;
  const roadYPosition = 67;

  const t4 = new bt.Turtle();
  t4.jump([0, roadYPosition]);
  t4.forward(roadWidth);
  t4.right(90);
  t4.forward(roadHeight);
  t4.right(90);
  t4.forward(roadWidth);
  t4.right(90);
  t4.forward(roadHeight);

  const roadLines = t4.lines();

  // Draw the white lines
  const lineCount = 11;
  const lineLength = 10;
  const lineSpacing = 9;
  const lineYPosition = 43;

  const t5 = new bt.Turtle();
  for (let i = 0; i < lineCount; i++) {
    t5.jump([i * (lineLength + lineSpacing) + lineSpacing, lineYPosition]);
    t5.forward(lineLength);
  }
  const whiteLines = t5.lines();
  return { roadLines, whiteLines };
}

const sky = drawSky();
drawLines(sky, { fill: "Blue" });

const ground = drawGround();
drawLines(ground, { fill: "YellowGreen" });

// Draw the sun - hopefully i can make it go in a ARC
const sun = new bt.Turtle();
sun.jump([sun_x, sun_y]);
sun.arc(360, 15);
drawLines(sun.lines(), { fill: "Gold" });

const { roadLines, whiteLines } = drawRoad();
drawLines(roadLines, { fill: "Grey" });
drawLines(whiteLines, { stroke: "white" });

// Draw the car
const carLines = drawRaceCar();
drawLines(carLines, { fill: "Red" });

const wheelLines = drawWheels();
drawLines(wheelLines, { fill: "Black" });

// Draw the grass
const grassLines = drawGrass();
drawLines(grassLines, { stroke: "Green" });
