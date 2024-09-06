/*
@title: BlotCampfire
@author: Colin
@snapshot: example1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

bt.setRandSeed = 128;

const logNum = Math.floor(bt.randInRange(1, 4))

const logTurtle = new bt.Turtle()
const flameTurtle = new bt.Turtle()

let logLines = []

function drawCircle(startX, startY, radius) {
  logTurtle.jump([startX, startY - radius]);
  logTurtle.arc(360, radius);
}

//Create Logs
switch(logNum) {
  case 1:
    drawCircle(30, 35, 10);
    drawCircle(95, 35, 10);

    const rect11 = [
      [30, 45],
      [95, 45],
      [95, 25],
      [30, 25],
      [30, 45],
    ]
    logLines.push(rect11)
    break;
  case 2:
    logTurtle.down();
    drawCircle(30, 25, 10);
    drawCircle(95, 25, 10);
    drawCircle(30, 50, 10);
    drawCircle(95, 50, 10);
    
    const rect21 = [
      [30, 60],
      [95, 35],
      [95, 15],
      [30, 40],
      [30, 60],
    ]
    logLines.push(rect21)
    
    const rect22 = [
      [30, 35],
      [95, 60],
      [95, 40],
      [30, 15],
      [30, 35],
    ]
    logLines.push(rect22)

    break;
  case 3:
    drawCircle(30, 25, 10);
    drawCircle(95, 25, 10);
    drawCircle(30, 50, 10);
    drawCircle(95, 50, 10);
    drawCircle(63, 20, 10);
    
    const rect31 = [
      [30, 60],
      [95, 35],
      [95, 15],
      [30, 40],
      [30, 60],
    ]
    logLines.push(rect31)
    
    const rect32 = [
      [30, 35],
      [95, 60],
      [95, 40],
      [30, 15],
      [30, 35],
    ]
    logLines.push(rect32)
    

    break;
}
    drawLines(logTurtle.lines(), { stroke: "brown", width: 3, fill: "brown" });
    drawLines(logLines, { stroke: "brown", width: 3, fill: "brown" });

flameTurtle.jump([30, 70]);
flameTurtle.right(90);
flameTurtle.arc(180, 32.5);

flameTurtle.left(20)

let flame = [];
let flameX = 95;

flame.push([95, 70]);

while (true) {
  flameX -= Math.floor(bt.randInRange(4, 8));
  if (flameX < 30) { break } 
  const flameY = Math.floor(bt.randInRange(120, 70));
  flame.push([flameX, flameY]);
}

flame.push([30, 70]);


drawLines(flameTurtle.lines(), { stroke: "red", width: 10, fill: "red" });
drawLines(flameTurtle.lines(), { stroke: "orange", width: 3 });
drawLines([bt.nurbs(flame)], { stroke: "red", width: 10, fill: "red" });
drawLines([bt.nurbs(flame)], { stroke: "orange", width: 3 });
