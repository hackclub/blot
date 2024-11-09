/*
@title: Random Spirograph
@author: FrankZ
@snapshot: snapshot1.png
*/

// actually important values
let RANDOM = true;
let wheelRadius = 28; // somewhat breaks if greater than the outer circle's
let holeLocation = 12; // hole distance from edge of wheel, should be less than wheelRadius



let resolution = 2; // degrees between each point, lower = smoother curve

const drawCircle = true;
const drawWheel = false;

// 60 is good, has a lot of factors and is big
let outerRadius = 60;

// randomize important values with reasonable ranges
if (RANDOM) {
  wheelRadius = bt.randIntInRange(2, outerRadius - 2);
  holeLocation = bt.randIntInRange(0, wheelRadius - 1);
};

const width = 125;
const height = 125;
setDocDimensions(width, height);

drawLines(bt.text("Wheel: " + wheelRadius.toString(),[1,8],1.2));
drawLines(bt.text("Hole: " + holeLocation.toString(),[1,1],1.2));

// outer circle turtle if drawCircle is true
const circle = new bt.Turtle();
  circle.setAngle(180);
  circle.jump([62.5, 62.5 + outerRadius]);
  circle.arc(360, outerRadius);
if (drawCircle) {
  drawLines(circle.lines());
};
// wheel turtle if drawWheel is true
const wheel = new bt.Turtle();
  wheel.setAngle(180);
  wheel.jump([62.5, 62.5 + outerRadius]);
  wheel.arc(360, wheelRadius);
  wheel.jump([62.5, 63.5 + outerRadius - holeLocation]);
  wheel.arc(360, 1);
if (drawWheel) {
  drawLines(wheel.lines());
};

// recursive calculation to find the greatest common factor
function gcd(a, b) {
  if (b === 0) {
    return a;
  };
  return gcd(b, a % b);
};

// unnecessarily long calculation to find revolutions needed to loop spirograph
let revolutions = ((outerRadius * wheelRadius) / (gcd(outerRadius, wheelRadius))) / (outerRadius);

const spirograph = new bt.Turtle();
 spirograph.jump([62.5, 62.5 + outerRadius - holeLocation]);

// "simulates" the wheel rotating while moving along the path of the center of the wheel
for (let time = 0; time <= revolutions*360; time += resolution) {
  let timeRadians = time * (Math.PI/180);
  let wheelCenterPointX = (outerRadius - wheelRadius) * Math.sin(timeRadians) + 62.5;
  let wheelCenterPointY = (outerRadius - wheelRadius) * Math.cos(timeRadians) + 62.5;
  let pointX = wheelCenterPointX - (wheelRadius - holeLocation) * Math.sin(timeRadians * (outerRadius / wheelRadius - 1));
  let pointY = wheelCenterPointY + (wheelRadius - holeLocation) * Math.cos(timeRadians * (outerRadius / wheelRadius - 1));
  spirograph.goTo([pointX, pointY]);
};

drawLines(spirograph.lines());

