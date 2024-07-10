/*
@title: FRC 8089 Logo
@author: tqbed
@snapshot: snapshot1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Store drawings here

const finalLines = [];
const t = new bt.Turtle();

// Random variables for gear + circle, edit for different results!

const xstCircle = bt.randIntInRange(55, 75);
const xstGear = xstCircle;
const ystCircle = bt.randIntInRange(50, 65);
const ystGear = ystCircle;

const cRadius = bt.randIntInRange(15, 25);

const gIRadius = bt.randIntInRange(30, 40);
const gORadius = bt.randIntInRange(30, 40);
const gNumTeeth = bt.randIntInRange(6, 16);

// Random Variables for flames

const xscFlames = bt.randInRange(0.8,1); // currently unused, it broke things
const yscFlames = bt.randInRange(0.7,1); // edit for different sizes!

// Function to draw the flames

function drawFlames(xScale, yScale) {
  t.jump([-50 + xstCircle, 25 + ystCircle]);
  t.down();

  t.setAngle(280);
  t.arc(15,130 * yScale);
  t.jump([-50 + xstCircle, 25 + ystCircle]);
  t.arc(15,100 * yScale);

  t.right(200);
  t.forward(50 * yScale);
  t.left(200);
  t.arc(20,120 * yScale);

  t.right(200);
  t.forward(50 * yScale);
  t.left(200);
  t.arc(15,200 * yScale);

  t.right(200);
  t.forward(20 * yScale);
  t.left(200);
  t.arc(-20,150 * yScale); 

}

// Function to draw a circle

function drawCircle(startX, startY, radius) {
  t.jump([startX, startY - radius]); 
  t.down();
  t.arc(360, radius); 
}

// Function to draw a gear

function drawGear(startX, startY, innerRadius, outerRadius, numTeeth) {
  const gear = [];
  const step = Math.PI / numTeeth;

  let path = [];

  for (let i = 0; i < numTeeth; i++) {
    const angle1 = i * 2 * step;
    const angle2 = angle1 + step / 2;
    const angle3 = angle1 + step;
    const angle4 = angle1 + 3 * step / 2;

    // Point 1: Inner radius
    const x1 = startX + innerRadius * Math.cos(angle1);
    const y1 = startY + innerRadius * Math.sin(angle1);
    path.push([x1, y1]);

    // Point 2: Outer radius, start of flat top
    const x2 = startX + outerRadius * Math.cos(angle2);
    const y2 = startY + outerRadius * Math.sin(angle2);
    path.push([x2, y2]);

    // Point 3: Outer radius, end of flat top
    const x3 = startX + outerRadius * Math.cos(angle3);
    const y3 = startY + outerRadius * Math.sin(angle3);
    path.push([x3, y3]);

    // Point 4: Inner radius
    const x4 = startX + innerRadius * Math.cos(angle4);
    const y4 = startY + innerRadius * Math.sin(angle4);
    path.push([x4, y4]);
  }

  path.push(path[0]); // Close the gear shape
  gear.push(path);
  return gear;
}

// Draw the Circle 
drawCircle(xstCircle, ystCircle, cRadius);

// Draw the Flames
drawFlames(xscFlames, yscFlames);

// Create and add gear to final lines
const gearDrawing = drawGear(xstGear, ystGear, gIRadius, gORadius, gNumTeeth);
finalLines.push(...gearDrawing);

// Draw the R (I know this code is horrifying)
t.jump([90 + (xstCircle - 60), 10 + (ystCircle - 60)]);

t.setAngle(90);

t.down();
t.forward(13);
t.right(90);
t.forward(5);
t.left(90);
t.forward(6);
t.left(90);
t.forward(5);
t.right(90);
t.forward(1);

t.right(180);
t.up();
t.forward(4);
t.left(90);
t.forward(8.25);
t.down();

t.forward(4.25);
t.arc(180, 7.5);

t.forward(12.5);

t.right(-90);
t.forward(11);

t.jump([98.25 + (xstCircle - 60), 26 + (ystCircle - 60)]);

t.setAngle(310);
t.forward(21);

t.jump([90 + (xstCircle - 60), 10 + (ystCircle - 60)]);
t.setAngle(180);
t.forward(5);

t.right(90);
t.forward(13);

t.left(90);
t.forward(5);
t.right(90);
t.forward(6);
t.right(90);
t.forward(5);
t.left(90);

// Draw the finished product
drawLines(t.lines());
drawLines(finalLines);
