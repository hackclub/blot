const width = 125;
const height = 125;

const sun_x = bt.randIntInRange(50, 100)
const sun_y = bt.randIntInRange(50, 70)

const spiral_size = bt.randIntInRange(0, 0);
const multiplier = bt.randInRange(1.2, 2.0);

setDocDimensions(width, height);

// Function to draw the car
function drawRaceCar() {
  const t = new bt.Turtle();
  const size = 100;

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

// Draw the sun - hopefully i can make it go in a ARC
const sun = new bt.Turtle();
sun.jump([sun_x, sun_y]);
sun.arc(360, 15);
drawLines(sun.lines(), { fill: "Gold" });

// Draw the car
const carLines = drawRaceCar();
drawLines(carLines, { fill: "Red" });
const wheelLines = drawWheels();
drawLines(wheelLines, { fill: "Black" });
