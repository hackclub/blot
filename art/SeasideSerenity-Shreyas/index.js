/*
@title: Seaside Serenity
@author: Shreyas Jain
@snapshot: snapshot3.png
*/

const { setRandSeed } = bt;

/*
MODIFIABLE VARIABLES

Try changing these and see what happens :)

A lot of these are ranges that random numbers are generated from
*/

const frequencyRange = [0.05, 0.225];
const phaseShiftRange = [0, Math.PI];
const numWaves = 10; 
const yInterval = 3; 
const sunRadiusRange = [8, 14];
const cloudRadiusRange = [4, 6];

/*
Code to generate and draw scene below

DO NOT TOUCH
(unless you know what you're doing, of course)
*/

const { Turtle, scale, translate, originate, iteratePoints, rand, noise } = blotToolkit;

setDocDimensions(125, 125);

function randInRange(min, max) {
  return min + (max - min) * rand();
}

// Waves
function createWave(startX, startY, length, frequency, phaseShift) {
  const points = [];
  for (let x = startX; x <= startX + length; x += 1) {
    const y = startY + 3 * Math.sin(frequency * (x - startX) + phaseShift);
    points.push([x, y]);
  }
  return [points];
}

function createOceanWaves(numWaves, frequencyRange, phaseShiftRange, yInterval) {
  const waves = [];
  for (let i = 0; i < numWaves; i++) {
    const frequency = 0.1+randInRange(frequencyRange[0], frequencyRange[1]);
    const phaseShift = randInRange(phaseShiftRange[0], phaseShiftRange[1]);
    const y = i * yInterval;
    const wave = createWave(0, y, 125, frequency, phaseShift);
    waves.push(wave[0]);
  }
  return waves;
}

const oceanWaves = createOceanWaves(numWaves, frequencyRange, phaseShiftRange, yInterval);

iteratePoints(oceanWaves, (pt) => {
  pt[1] += noise(pt[0] * 0.02, pt[1] * 0.02) * 2.5;
  return pt;
});
originate(oceanWaves);

translate(oceanWaves, [62.5, 20]);

drawLines(oceanWaves, { stroke: 'blue', width: 3 });

// Sun
function createSun(centerX, centerY) {
  const sun = new Turtle([centerX, centerY]);
  const sunCircle = [];
  const angleStep = 360 / 60; 
  const radius = randInRange(sunRadiusRange[0], sunRadiusRange[1]);

  for (let i = 0; i < 60; i++) {
    sun.right(angleStep);
    sun.forward((2 * Math.PI * radius) / 60);
    sunCircle.push(sun.pos);
  }
  return [sunCircle];
}

const sun = createSun();

translate(sun, [20, 115])

sun.forEach((path) => {
  drawLines([path], { stroke: 'gold', width: 10 });
});

// Clouds
function createCloud(centerX, centerY, numCircles) {
  const circles = [];

  for (let i = 0; i < numCircles; i++) {
    const radius = randInRange(cloudRadiusRange[0], cloudRadiusRange[1]);
    const offsetX = randInRange(-radius, radius);
    const offsetY = randInRange(-radius, radius);
    const circlePath = [];
    
    for (let angle = 0; angle < 360; angle += 6) {
      const radian = (Math.PI / 180) * angle;
      const x = centerX + offsetX + radius * Math.cos(radian);
      const y = centerY + offsetY + radius * Math.sin(radian);
      circlePath.push([x, y]);
    }
    circles.push(circlePath);
  }

  return circles;
}

const clouds = [];
clouds.push(createCloud(25, 65, 5));
clouds.push(createCloud(65, 90, 5));
clouds.push(createCloud(100, 85, 5));

clouds.forEach(cloud => {
  cloud.forEach(circle => {
    drawLines([circle], { fill: 'lightgray', stroke: 'lightgray', width: 1 });
  });
});
