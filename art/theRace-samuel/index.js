/*
@title: The Race
@author: Samuel Fernandez
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

const BOUNDS = [[[0, 0], [0, height], [width, height], [width, 0], [0, 0]]];

const CENTER_RECT_SPACING = 10;
const CENTER_RECT_HEIGHT = 18;
const CENTER_RECT_WIDTH = 5;

const CENTER_RECT_CALC = height / (CENTER_RECT_HEIGHT + CENTER_RECT_SPACING)
const CENTER_RECT_COUNT = Math.floor(CENTER_RECT_CALC);
const CENTER_RECT_MARGIN = (CENTER_RECT_CALC - CENTER_RECT_COUNT) * (CENTER_RECT_HEIGHT + CENTER_RECT_SPACING) + CENTER_RECT_SPACING;
const CENTER_RECT_OFFSET = CENTER_RECT_MARGIN / 2;

const TRACK_START = width / 5;
const TRACK_WIDTH = 3 * width / 5;
const TRACK_END = TRACK_START + TRACK_WIDTH;

const LANE_WIDTH = ((TRACK_START + TRACK_END) / 2) - (CENTER_RECT_WIDTH / 2) - TRACK_START;

const LANE_1_X = TRACK_START + (LANE_WIDTH / 2);
const LANE_2_X = TRACK_END - (LANE_WIDTH / 2);

const LANE_1_CARS = 3;
const LANE_2_CARS = 2;

setDocDimensions(width, height);
bt.setRandSeed(100);

// Race track outline
drawLines([
  [
    [TRACK_START, 0],
    [TRACK_START, height]
  ],
  [
    [TRACK_END, 0],
    [TRACK_END, height]
  ]
])

function drawCenterRect(yValue) {
  const lineTurtle = new bt.Turtle()
    .jump([width / 2 - (CENTER_RECT_WIDTH / 2), yValue + CENTER_RECT_OFFSET])
    .setAngle(0);

  lineTurtle.forward(CENTER_RECT_WIDTH);
  lineTurtle.left(90);

  lineTurtle.forward(CENTER_RECT_HEIGHT);
  lineTurtle.left(90);

  lineTurtle.forward(CENTER_RECT_WIDTH);
  lineTurtle.left(90);

  lineTurtle.forward(CENTER_RECT_HEIGHT);
  lineTurtle.left(90);

  return lineTurtle;
}

for (let i = 0; i < CENTER_RECT_COUNT; i++) {
  const lines = drawCenterRect(i * (CENTER_RECT_HEIGHT + CENTER_RECT_SPACING)).lines();
  drawLines(lines);
}

function drawCar(startPoint) {
  const carTurtle = new bt.Turtle().jump(startPoint);

  // ugly magic number
  carTurtle.goTo([carTurtle.pos[0] - 3.18, carTurtle.pos[1]]);
  carTurtle.setAngle(90);
  carTurtle.forward(3);

  const curve = bt.nurbs([carTurtle.pos,
    [carTurtle.pos[0] - 2, carTurtle.pos[1] + 5],
    [carTurtle.pos[0] - 2, carTurtle.pos[1] + 10],
    [carTurtle.pos[0] - 1, carTurtle.pos[1] + 11],
    [carTurtle.pos[0] - 1.5, carTurtle.pos[1] + 12],
    [carTurtle.pos[0] + 1, carTurtle.pos[1] + 14]
  ]);

  carTurtle.jump([carTurtle.pos[0] + 1, carTurtle.pos[1] + 14]);
  const pos1 = carTurtle.pos;
  carTurtle.setAngle(87);
  carTurtle.forward(13);
  const slope = (carTurtle.pos[1] - pos1[1]) / (carTurtle.pos[0] - pos1[0]);
  carTurtle.setAngle(0);
  carTurtle.forward(1);
  carTurtle.setAngle(90);
  carTurtle.forward(1);
  carTurtle.setAngle(0);
  carTurtle.forward(0.5);

  const half = bt.join(carTurtle.lines(), [curve]);
  const reflected = bt.scale(bt.copy(half), [-1, 1], bt.bounds(half).rc);
  const whole = bt.join(half, reflected)
  const wholeBounds = bt.bounds(whole)

  const frontWheels = drawFrontWheels([wholeBounds.cc[0], wholeBounds.cc[1] + 10], slope, whole)
  const backWheels = drawBackWheels(wholeBounds.cb);

  const frontSplitter = drawFrontSplitter(wholeBounds.ct);
  const backWing = drawBackWing(wholeBounds.cb);
  const design = generateDesign([wholeBounds.cc[0], wholeBounds.cc[1] + 13])
  const toFlip = generateDesign([wholeBounds.cc[0], wholeBounds.cc[1] + 13])
  const flipped = bt.scale(toFlip, [0.7, -0.5], [wholeBounds.cc[0], wholeBounds.cc[1] - 5]);

  return bt.join(whole, frontWheels, backWheels, frontSplitter, backWing, design, flipped);
}

function generateDesign(startPoint) {
  const designTurtle = new bt.Turtle().jump(startPoint);

  designTurtle.setAngle(270);
  designTurtle.forward(12);

  const curve = [bt.nurbs([designTurtle.pos,
    [designTurtle.pos[0] - 4.5, designTurtle.pos[1] - 2],
    [designTurtle.pos[0] - 2.9, designTurtle.pos[1] - 10],
    [designTurtle.pos[0] - 2.3, designTurtle.pos[1] - 12],
    [designTurtle.pos[0] - 1, designTurtle.pos[1] - 14]
  ])];
  const reflected = bt.scale(bt.copy(curve), [-1, 1], startPoint);

  bt.resample(curve, 0.01);

  bt.iteratePoints(curve, (pt, t) => {
    const [x, y] = pt;
    const dx = bt.noise(t * 37.1, { octaves: 6 }) * 0.55 * (t === 0 || t === 1 ? 0 : 1)
    return [x + dx, y]
  })

  bt.iteratePoints(reflected, (pt, t) => {
    const [x, y] = pt;
    const dx = bt.noise(t * 46.9, { octaves: 6 }) * 0.62 * (t === 0 || t === 1 ? 0 : 1)
    return [x + dx, y]
  })

  return bt.join(designTurtle.lines(), curve, reflected);
}

function drawBackWing(startPoint) {
  const wingTurtle = new bt.Turtle().jump(startPoint);

  wingTurtle.setAngle(270);
  wingTurtle.forward(2.5);

  wingTurtle.setAngle(185);
  wingTurtle.forward(6.5);

  wingTurtle.setAngle(270);
  wingTurtle.forward(2);

  wingTurtle.setAngle(0);
  wingTurtle.forward(7);

  const half = wingTurtle.lines();
  const reflected = bt.scale(bt.copy(half), [-1, 1], startPoint);
  const whole = bt.join(half, reflected);

  return whole;
}

function drawFrontSplitter(startPoint) {
  const splitterTurtle = new bt.Turtle().jump(startPoint);

  const curve = bt.nurbs([splitterTurtle.pos,
    [splitterTurtle.pos[0] - 0.5, splitterTurtle.pos[1]],
    [splitterTurtle.pos[0] - 0.5, splitterTurtle.pos[1] - 0.5],
    [splitterTurtle.pos[0] - 1.2, splitterTurtle.pos[1] - 1],
    [splitterTurtle.pos[0] - 2, splitterTurtle.pos[1] - 1.1],
    [splitterTurtle.pos[0] - 3, splitterTurtle.pos[1] - 1.9],
    [splitterTurtle.pos[0] - 4, splitterTurtle.pos[1] - 2],
    [splitterTurtle.pos[0] - 5, splitterTurtle.pos[1] - 2.25],
    [splitterTurtle.pos[0] - 6, splitterTurtle.pos[1] - 2.3],
    [splitterTurtle.pos[0] - 7, splitterTurtle.pos[1] - 2.3],
    [splitterTurtle.pos[0] - 7, splitterTurtle.pos[1] + 0.2],
    [splitterTurtle.pos[0] - 1, splitterTurtle.pos[1] + 0.6],
    [splitterTurtle.pos[0] - 0.7, splitterTurtle.pos[1] + 1],
    [splitterTurtle.pos[0], splitterTurtle.pos[1] + 1],
  ]);

  const reflected = bt.scale(bt.copy([curve]), [-1, 1], startPoint);
  const whole = bt.join([curve], reflected);

  return whole;
}

function drawBackWheels(startPoint) {
  const wheelsTurtle = new bt.Turtle().jump(startPoint);

  wheelsTurtle.setAngle(180);
  wheelsTurtle.forward(5);

  const blWheel = drawWheel([wheelsTurtle.pos[0] - 1, wheelsTurtle.pos[1] + 1])

  const half = bt.join(wheelsTurtle.lines(), blWheel);
  const reflected = bt.scale(bt.copy(half), [-1, 1], startPoint);
  const whole = bt.join(half, reflected);

  return whole;
}

function drawFrontWheels(startPoint, slope, carLines) {
  const origin = [startPoint[0] - 1.76, startPoint[1]];
  const wheelsTurtle = new bt.Turtle().jump(origin);

  wheelsTurtle.setAngle(180);
  wheelsTurtle.forward(3);

  const flWheel = drawWheel([wheelsTurtle.pos[0] - 1, wheelsTurtle.pos[1] + 0.4]);

  wheelsTurtle.setAngle(330);
  wheelsTurtle.forward(3 / Math.cos(330 * Math.PI / 180));
  
  const half = bt.cover(wheelsTurtle.lines(), carLines)
  const halfWithWheel = bt.join(flWheel, half);

  const reflected = bt.scale(bt.copy(halfWithWheel), [-1, 1], startPoint);
  const whole = bt.join(halfWithWheel, reflected);

  return whole;
}

function drawWheel(centerPoint) {
  const wheelTurtle = new bt.Turtle().jump([centerPoint[0] + 2, centerPoint[1] - 1]);

  wheelTurtle.setAngle(90);
  wheelTurtle.forward(2);

  const rightRoundedCorner = bt.nurbs([wheelTurtle.pos, [wheelTurtle.pos[0], wheelTurtle.pos[1] + 0.2],
    [wheelTurtle.pos[0] - 0.3, wheelTurtle.pos[1] + 0.3]
  ]);

  wheelTurtle.jump([wheelTurtle.pos[0] - 0.3, wheelTurtle.pos[1] + 0.3]);
  wheelTurtle.setAngle(180);
  wheelTurtle.forward(2.5);

  const leftRoundedCorner = bt.nurbs([wheelTurtle.pos, [wheelTurtle.pos[0] - 0.2, wheelTurtle.pos[1]],
    [wheelTurtle.pos[0] - 0.3, wheelTurtle.pos[1] - 0.3]
  ]);

  wheelTurtle.jump([wheelTurtle.pos[0] - 0.3, wheelTurtle.pos[1] - 0.3]);
  wheelTurtle.setAngle(270);
  wheelTurtle.forward(2);

  const half = bt.join(wheelTurtle.lines(), [rightRoundedCorner], [leftRoundedCorner]);
  const reflected = bt.scale(bt.copy(half), [1, -1], bt.bounds(half).cb);

  return bt.join(half, reflected);
}

const cars = {
  1: [],
  2: []
}
function doesCarIntersect(lane, startPoint) {
  const car = drawCar(startPoint);
  
  for (const drawnCar of cars[lane]) {
    const intersection = bt.intersection(bt.copy(car), drawnCar);

    if (intersection.length !== 0) {
      return true;
    }
  }

  return false;
}
function noCollideRand(x, lane) {
  let rand = null;

  do {
    rand = bt.randInRange(-15, 115);
  } while (doesCarIntersect(lane, [x, rand]))

  return rand;
}

for (let i=0; i < LANE_1_CARS; i++) {
  const car = drawCar([LANE_1_X, noCollideRand(LANE_1_X, 1)]);
  bt.cut(car, BOUNDS);
  cars[1].push(car);
  drawLines(car);
}

for (let i=0; i < LANE_2_CARS; i++) {
  const car = drawCar([LANE_2_X, noCollideRand(LANE_2_X, 2)]);
  bt.cut(car, BOUNDS);
  cars[2].push(car);
  drawLines(car);
}