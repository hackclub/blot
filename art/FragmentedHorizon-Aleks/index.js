/*
@title: Fragmented Horizon
@author: Aleksander Kurgan
@snapshot: snapshot1.png
*/
const { randInRange, randIntInRange, catmullRom } = blotToolkit;

const gridSpacing = randIntInRange(5, 10);
const spiralRotations = randIntInRange(20,200);

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

function drawGrid(spacing) {
  const lines = [];

  for (let i = 0; i <= width; i += spacing) {
    //sun reflection lines
    lines.push([
      [i, 0],
      [i,height/randIntInRange(10,20)],
      [width / 2, height / 7]
    ]);

    //left slanted grid
    lines.push([
      [0, i],
      [i / 1.75, height],
    ]);

    //transformed grid 
    lines.push([
      [width, i],
      [-i / 1.75 + width, height],
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
finalLines.push(...drawSpiral(width / 2, height / 2, .25 * (150 / spiralRotations), spiralRotations));

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
  const shiftX = width / 2 + 40 * Math.cos(radian);
  const shiftY = height / 2 + 40 * Math.sin(radian);

  finalLines.push(catmullRom(pointsGen(5, shiftX, shiftY)));
}

drawLines(finalLines);