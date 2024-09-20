/*
@title: S.H. Raza 
@author: Sumedh Natu
@snapshot: raza1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const initialBorders = [];
const midPoints = [];
const holders = [];
const lineArray = [];

const borderLine = [
  [2.5, 122.5],
  [122.5, 122.5],
  [122.5, 2.5],
  [2.5, 2.5],
  [2.5, 122.5]
];

const holdersData = [];
const midPointsData = [];

function createHolders(){
  // Create holder data dynamically
  for (let i = 0; i < 2; i++) {
  const y = i === 0 ? 32.5 : 92.5; // for sHolder and nHolder
  holdersData.push([[2.5, y], [122.5, y]]);
}
  for (let i = 0; i < 2; i++) {
  const x = i === 0 ? 32.5 : 92.5; // for wHolder and eHolder
  holdersData.push([[x, 2.5], [x, 122.5]]);
}
  holdersData.forEach(holder => holders.push(holder));
  drawLines(holders);
}
function createMidpoints(){
  // Create midPoints data dynamically
  for (let i = 0; i < 2; i++) {
  const y = i === 0 ? 32.5 : 92.5; // for sMid and nMid
  const yEnd = i === 0 ? 2.5 : 122.5;
  midPointsData.push([[62.5, y], [62.5, yEnd]]);
}
  for (let i = 0; i < 2; i++) {
  const x = i === 0 ? 32.5 : 92.5; // for wMid and eMid
  const xEnd = i === 0 ? 2.5 : 122.5;
  midPointsData.push([[x, 62.5], [xEnd, 62.5]]);
}
  midPointsData.forEach(mid => midPoints.push(mid));
  drawLines(midPoints);
}

function drawMidBindu(x, y, r, n){
  const myTurtle = new bt.Turtle()
  myTurtle.jump([x, y]);
  myTurtle.arc(360, r)
  drawLines(myTurtle.path);

  for (let i = 0; i < n; i++) {
      const mTurtle = new bt.Turtle()
      mTurtle.jump([x, y + ((r/(n/2))*i)]);
      mTurtle.arc(360, 15/n)
      drawLines(mTurtle.path);
  } 
}
function drawMidTrip(x, y, r, n){
  const myTurtle = new bt.Turtle()
  myTurtle.jump([x, y]);
  myTurtle.arc(360, r)
  drawLines(myTurtle.path);

  for (let i = 0; i < n; i++) {
      const mTurtle = new bt.Turtle()
      mTurtle.jump([x, y+(i*(r/n))])
      mTurtle.arc(360, r-(i*(r/n)))
      drawLines(mTurtle.path);
  } 
}
function drawAbsoluteValue(x, y, r, lc){
  for (let i = 0; i < lc; i++) {
      const lines = []
      const vLines = [
        [x-r, (y+((r/(lc-1))*i))+r],
        [x,  (y+((r/(lc-1))*i))],
        [x+r, (y+((r/(lc-1))*i))+r]
      ]
      lines.push(vLines)
      drawLines(lines)
  }
}
function drawTrippySquare(x, y, r, sc){
    for(let i = 0; i < sc; i++){
        const lines = []
        const vLines = [
        [x-r, y+r],
        [x,  y],
        [x+r, y+r],
        [x, y+(2*r)],
        [x-r, y+r]
      ]
        lines.push(vLines)
        bt.scale(lines, ((1)/(sc-1))*i)
        drawLines(lines)
    }
}

const drawFunctionArray = [drawMidBindu, drawMidTrip, drawAbsoluteValue, drawTrippySquare]

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function drawHorizontal (x, y){
  shuffle(drawFunctionArray);
  for (let i = 0; i < drawFunctionArray.length; i++){
    const noReps = bt.randIntInRange(2, 10);
    const xPos = x + (i*30);
    drawFunctionArray[i](xPos, y, 15, noReps);
  }
}
function drawVertical (x, y){
  shuffle(drawFunctionArray);
  for (let i = 0; i < 2; i++){
    const noReps = bt.randIntInRange(2, 10);
    const yPos = y + (i*30);
    drawFunctionArray[i](x, yPos, 15, noReps);
  }
}

function drawMidEye(){
  const eyeLiner = bt.catmullRom([[38.0, 60.25], [45.5, 60.25], [63.5, 75.25], [81.5, 60.25], [89.0, 60.25]]);
  const eyeLower = bt.catmullRom([[45.5, 60.25], [63.5, 52.75], [81.5, 60.25]]);

  const randLiner = bt.randInRange(0.4, 1);

  const polyEyeLine = [];
  polyEyeLine.push(eyeLiner);

  const polyEyeLow = [];
  polyEyeLine.push(eyeLower);

  bt.scale(polyEyeLine, randLiner);
  bt.scale(polyEyeLow, randLiner);
  drawMidPupil(62.5, 63, 5, randLiner)
  
  drawLines(polyEyeLine)
  drawLines(polyEyeLow)
}
function drawMidPupil(x, y, r, rand){
  const myTurtle = new bt.Turtle()

  const xVar = bt.randInRange(-0.9, 2);
  const yVar = bt.randInRange(-0.1, 0.75);
  
  myTurtle.jump([x + xVar, y + yVar]);
  myTurtle.arc(360, r * rand)
  drawLines(myTurtle.path);
}

drawMidEye();
drawHorizontal (17.5, 92.5);
drawHorizontal (17.5, 2.5);

drawVertical(17.5, 32.5);
drawVertical(107.5, 32.5);

createHolders();
createMidpoints();
initialBorders.push(borderLine);
drawLines(initialBorders);

