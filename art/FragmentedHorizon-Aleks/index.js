/*
@title: Fragmented Horizon
@author: Aleksander Kurgan
@snapshot: snapshot1.png
*/

const { randInRange, randIntInRange, catmullRom } = blotToolkit;

//canvas should ideally be a square for best results :)
const width = 125;
const height = 125;

setDocDimensions(width, height);

//params
const gridSpacing = randIntInRange(5, 10);
const spiralRotations = randIntInRange(50, 200);
const mountainSpacing = 8;
const mountainHeight = 13;
const birdSize = 2;
const numBirds = 6;
const birdAngle = 90;

//these shouldn't need changing unless canvas size is increased
const minSpiralScaling = 0.5;
const maxSpiralScaling = 1.0;
const spiralSizing = randInRange(minSpiralScaling, maxSpiralScaling);
//1.75 is a constant
const heightFactor = 1.75 - (spiralSizing - maxSpiralScaling);

const finalLines = [];

function drawGrid(spacing) {
  const lines = [];

  for (let i = 0; i <= width; i += spacing) {
    //sun reflection lines
    lines.push([
      [i, 0],
      [i, height / randIntInRange(10, 20)],
      [width / 2, height / 8]
    ]);

    //left slanted grid
    lines.push([
      [0, i],
      [i / heightFactor, height],
    ]);

    //transformed grid 
    lines.push([
      [width, i],
      [-i / heightFactor + width, height],
    ]);
  }

  return lines;
}

finalLines.push(...drawGrid(gridSpacing));

//draws spiral by segments
function drawSpiral(centerX, centerY, spacing, rotations) {
  const spiralSegments = [];
  let radian = 0;
  let previousX = centerX;
  let previousY = centerY;

  for (let i = 0; i < rotations; i++) {
    //calculates position of next segment in the spiral
    const newX = centerX + (i * spacing) * Math.sin(radian);
    const newY = centerY + (i * spacing) * Math.cos(radian);

    //add the segment from the previous position to the new one
    spiralSegments.push([
      [previousX, previousY],
      [newX, newY]
    ]);

    previousX = newX;
    previousY = newY;

    //increment the angle of the next segment
    radian += Math.PI / randIntInRange(4, 10);
  }

  return spiralSegments;
}

//auto adjusts spacing based on rotations
finalLines.push(...drawSpiral(width / 2, height / heightFactor, .25 * (150 / spiralRotations) * spiralSizing, spiralRotations));

//generates points for catmullrom splines
function pointsGen(numPoints, shiftX, shiftY) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push([
      shiftX + 2 * Math.sin(randIntInRange(2, 50) + i),
      shiftY + 2 * Math.cos(randIntInRange(2, 50) + i)
    ]);
  }
  return points;
}

//replicate and arrange catmullrom splines in a circular pattern
for (let i = 0; i < 40; i++) {
  const radian = i / 20 * Math.PI;
  const shiftX = width / 2 + 45 * spiralSizing * Math.cos(radian);
  const shiftY = height / heightFactor + 45 * spiralSizing * Math.sin(radian);

  finalLines.push(catmullRom(pointsGen(5, shiftX + randIntInRange(-2, 2), shiftY + randIntInRange(-2, 2))));
}

//mountain range in the horizon
function drawMountains() {
  const mountains = [];
  let previousX = 0;
  let previousY = height / 4.25;

  for (let i = 0; i < 3; i++) {
    let xVal;
    let spacing;

    //allows mountain range to draw in both directions
    if (i % 2 === 0) {
      xVal = 0;
      spacing = mountainSpacing;
    } else {
      xVal = width;
      spacing = -(mountainSpacing);
    }

    let x = xVal;
    while ((spacing > 0 && x <= width) || (spacing < 0 && x >= 0)) {
      const y = height / 4.25 - randIntInRange(5, mountainHeight);
      mountains.push([
        [previousX, previousY],
        [x, y]
      ]);
      previousX = x;
      previousY = y;
      x += spacing;
    }
  }

  return mountains;
}

finalLines.push(...drawMountains());

//not algorithmic so the birds use turtle
for (let i = 0; i < numBirds; i++) {
  const t = new bt.Turtle();
  let pos;

  //disperses birds left and right
  if (i % 2 === 0) {
    pos = [randIntInRange(width * .84, width * .92), randIntInRange(height * .24, height * .4)];
  } else {
    pos = [randIntInRange(width * .08, width * .16), randIntInRange(height * .24, height * .4)];
  }

  t.jump(pos);
  t.angle = birdAngle;
  t.right(30);
  t.arc(-130, birdSize);
  t.jump(pos);
  t.angle = birdAngle;
  t.left(30);
  t.arc(130, birdSize);

  finalLines.push(...t.lines());
}

drawLines(finalLines);