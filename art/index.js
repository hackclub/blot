/*
@title: SunlitCastle
@author: Alvin
@snapshot: castle1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

function rect(x, y, width, height) {
  return [
    [
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height],
      [x, y],
    ]
  ]
};

function triangle(x, y, width, height) {
  return [
    [
      [x - width / 2, y],
      [x + width / 2, y],
      [x, y + height],
      [x - width / 2, y],
    ]
  ]
};

const doorWidth = 25;
const doorHeight = 40;

const door = rect((width - doorWidth) / 2, 0, doorWidth, doorHeight);
const tower1 = rect(10, 0, 15, 70);
const tower2 = rect(width - 25, 0, 15, 70);
const towerCap1 = triangle(17.5, 70, 20, 20);
const towerCap2 = triangle(width - 17.5, 70, 20, 20);
bt.resample(towerCap1, 0.05);
bt.resample(towerCap2, 0.05);
const randFactor1 = bt.randInRange(0.9, 1.2);
bt.iteratePoints(towerCap1, (pt, t) => {
  const [x, y] = pt;
  const dx = bt.noise(t * 20.8 * randFactor1, { octaves: 2 }) * 1.2;
  return [x + dx, y]
});
const randFactor2 = bt.randInRange(0.9, 1.2);
bt.iteratePoints(towerCap2, (pt, t) => {
  const [x, y] = pt;
  const dx = bt.noise(t * 20.8 * randFactor2, { octaves: 2 }) * 1.2;
  return [x + dx, y]
});

bt.join(tower1, towerCap1);
bt.join(tower2, towerCap2);

bt.join(finalLines, tower1, tower2);

const turtle = new bt.Turtle()
  .down()
  .jump([25, 60])
  .setAngle(0);

const numRidges = bt.randIntInRange(5, 10);
for (let i = 0; i < numRidges; i++) {
  turtle.forward((width - 50) / (2 * numRidges + 1));
  turtle.left(90);
  turtle.forward(5);
  turtle.right(90);
  turtle.forward((width - 50) / (2 * numRidges + 1));
  turtle.right(90);
  turtle.forward(5);
  turtle.left(90);
};
turtle.forward((width - 50) / (2 * numRidges + 1)).right(90);
turtle.forward(5).right(90).forward(width - 50).right(90).forward(5)
bt.resample(turtle.path, 0.05);

const randFactorRidge = bt.randInRange(.9, 1.2);
const ridge = bt.iteratePoints(turtle.path, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.8 * randFactorRidge, { octaves: 2 }) * 1.5;
  return [x, y + dy];
});
bt.join(finalLines, turtle.path);

const castle = rect(width * 3 / 10, 58, width * 2 / 5, 22);

const gateBarY = bt.randIntInRange(8, 12);
const gateBarX = bt.randIntInRange(5, 8);

const gate = [];
// Vertical gate bars
for (let i = 0; i < gateBarY; i++) {
  bt.join(gate,
    [
      [
        [(width - doorWidth) / 2, i * doorHeight / gateBarY],
        [(width + doorWidth) / 2, i * doorHeight / gateBarY]
      ]
    ]);
};
// Horizontal gate bars
for (let i = 0; i < gateBarX; i++) {
  bt.join(gate,
    [
      [
        [(width - doorWidth) / 2 + i * doorWidth / gateBarX, 0],
        [(width - doorWidth) / 2 + i * doorWidth / gateBarX, doorHeight]
      ]
    ]);
};
bt.join(door, gate);

const castleTop = [bt.nurbs([
  [width * 3 / 10, 80],
  [width / 2, 115],
  [width * 7 / 10, 80]
])];
const randFactorCastleTop = bt.randInRange(.9, 1.2)
bt.iteratePoints(castleTop, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.8 * randFactorCastleTop, { octaves: 2 }) * 1.6 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
});

const sunX = bt.randIntInRange(0, width);
const sunTurtle = new bt.Turtle()
  .down()
  .jump([sunX + 10, height])
  .setAngle(-89.5);
// Law of Cosines for length of side in a regular 360-sided polygon
const step_length_sun = 10 * Math.sqrt(2 * (1 - Math.cos(Math.PI / 180)));
for (let i = 0; i < 181; i++) {
  sunTurtle.forward(step_length_sun);
  sunTurtle.right(1);
};

const numSunRays = bt.randIntInRange(6, 10);
const sunRays = [];
for (let i = 1; i <= numSunRays; i++) {
  sunRays.push([
    [
      [sunX + 13 * Math.cos(Math.PI * i / (numSunRays + 1)),
        height - 13 * Math.sin(Math.PI * i / (numSunRays + 1))
      ],
      [sunX + 20 * Math.cos(Math.PI * i / (numSunRays + 1)),
        height - 20 * Math.sin(Math.PI * i / (numSunRays + 1))
      ]
    ]
  ]);
};
for (let i = 0; i < numSunRays; i++) {
  const randShift = bt.randInRange(0, 2 * Math.PI);
  bt.resample(sunRays[i], .01);
  const angle = (Math.PI * i) / (numSunRays + 1) + Math.PI / 2;
  bt.iteratePoints(sunRays[i], (pt, t) => {
    const [x, y] = pt;
    let amplitude = Math.cos(4 * Math.PI * t + randShift);
    return [x + amplitude * Math.cos(angle), y - amplitude * Math.sin(angle)];
  });
  bt.join(sunTurtle.path, sunRays[i]);
};
// Remove points outside of canvas
bt.iteratePoints(sunTurtle.path, (pt, t) => {
  const [x, y] = pt;
  if (x < 0 || x > width) {
    return "REMOVE"
  };
});

bt.cover(castle, ridge);
bt.join(finalLines, castle, castleTop, door, sunTurtle.path);
drawLines(finalLines);