/*
@title: modern art
@author: Vanessa Tan
@snapshot: 1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
const polyline = [
  [30, 90],
  [100, 90],
  [100, 30],
  [30, 30],
  [30, 90]
];

// add the polyline to the final lines
finalLines.push(polyline);

// transform lines using the toolkit


// draw it
drawLines(finalLines);

for (let i = 0; i< bt.randInRange(1,12); i++) {
  let ran1 = bt.randInRange(30,90);
  let d1 = bt.randIntInRange(0,1);
  let x1 = 0;
  let ran2 = bt.randInRange(30,90);
  let d2 = bt.randIntInRange(0,1);
  let x2 = 0;
  if(d1 == 0 && d2 == 0){ //y=30,90 
    drawLines([
      [[ran1,30], [ran2,90]]
      ])
  }
  else if (d1 == 0 && d2 == 1) { //y=30, x=100
    drawLines([
      [[ran1,30], [100,ran2]]
      ])
  }

  else if (d1 == 1 && d2 == 0) { //x=30, y=90
    drawLines([
      [[30,ran1], [ran2,90]]
      ])
  }

  else if (d1 == 1 && d2 == 1) { //x=30, x=100
    drawLines([
      [[30,ran1], [100,ran2]]
      ])
  }
}
