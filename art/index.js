/*
@title: Bambu Logo With Infill
@author: Rolo
@snapshot: Final
*/
// total canvas size
const totalWidth = 125;
const totalHeight = 125;

//config for the logo
const length = 0.9; // length before the space in the middle
const offset = 0.2; // offset between the center and the two edge gaps

//config for the infill design on the exterior
// 1 would fill up the entire screen with infill, 0.5 is half of the screen
const covered = 0.22;
// length in pixels of each line drawn for each hexagon
const size = 2;

// setup math for the logo
const width = totalWidth/2; // the size of the logo
const height = totalHeight/2;
const widthC = width/2; // center of the logo
const heightC = height/2;
const widthL = widthC*length; // length to middle
const heightL = heightC*length;
const indentDist = size*1.5
var indented = false;
const heightMulti = 0.866025403784 // converting length to height due to our hexagons representing a 90 60 30 triangle

// finalLines is the main array, combining each constant
var finalLines = [];
const logo = [];
const t = new bt.Turtle();

const topLeft = [
  [0, height],
  [widthL, height],
  [widthL, height-heightL],
  [0, height - height*(0.5+offset)*length],
  [0, height]
];

const topRight = [
  [width, height],
  [width-widthL, height],
  [width-widthL, height-height*(0.5-offset)*length],
  [width, height-heightL],
  [width, height]
];

const bottomRight = [
  [width, 0],
  [width-widthL, 0],
  [width-widthL, height*(0.5+offset)*length],
  [width, heightC*length],
  [width, 0]
];

const bottomLeft = [
  [0, 0],
  [widthL, 0],
  [widthL, heightL],
  [0, height*(0.5-offset)*length],
  [0, 0]
];

logo.push(topLeft);
logo.push(topRight);
logo.push(bottomRight);
logo.push(bottomLeft);

bt.translate(logo, [totalWidth/2, totalHeight/2], bt.bounds(logo).cc)
finalLines = finalLines.concat(logo);

var x = 0;
var y = 0;
var extra = 0; // angled line hits roof and extra lateral distance is necessary
var maxHeight = 0;

function move(straight) {
  // var amount = size;
  var amount = Math.min(totalWidth-x, size+extra*2);
  if (straight) {
    // amount += extra*2;
    extra = 0;
    x += amount;
  } else {
    // sin(30) / diff = sin(90) / amount
    amount = Math.min(1/(0.5/amount), size); // account for x
    var xDist = 0.5/(1/amount);
    if (maxHeight==0) {
      const dist = totalHeight*covered - y; // dist to the roof
      // sin(60) / dist = sin(90) / amount
      const distToRoof = 1/(Math.sin(Math.PI/2)/dist);
      const newAmount = Math.min(distToRoof, amount);
      // sin(90) / amount = sin(30) / x
      xDist = 0.5/(1/newAmount)
      if (distToRoof < amount && amount == size) {
        maxHeight = newAmount;
        extra = size/2-xDist;
      }
      amount = newAmount;
    } else {
      amount = Math.min(maxHeight, amount);
      xDist = 0.5/(1/amount);
      maxHeight = 0
    }
    x += xDist;
  }
  
  t.forward(amount);
  return x >= totalWidth
}

while (y < totalHeight * covered) {
  console.log(totalHeight*covered - y);
  t.setAngle(0);
  x = 0;
  
  if (indented) {// && y+size*heightMulti < totalHeight*covered) {
    t.jump([0, Math.min(y+size*heightMulti, totalHeight*covered)]);
    t.right(60);
    move(false);
    t.left(60);
    move(true);
  } else {
    t.jump([0, y]);
  }
  indented = !indented;
  
  while (x < totalWidth) {
    t.left(60);
    if (move(false)) {}
    t.right(60);
    if (move(true)) {}
    t.right(60);
    if (move(false)) {}
    t.left(60);
    if (move(true)) {}
  }
  y += size*heightMulti;
}

finalLines = finalLines.concat(t.lines());

setDocDimensions(totalWidth, totalHeight);
drawLines(finalLines);
