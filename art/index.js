// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

//Line where road ends and mountains start
const horizon = 80;

//Road width. Near is the bottom one, Far is the one near the horizon
const roadWidthNear = 70;
const roadWidthFar = 10;

//Width of the line in the middle of the road
const laneWidth = 7;

//number of mountains in the background
//adjust for blot machine compatibility
const mountains = 5;

//random ranges for mountain properties
//mountain base width
const mtnWidthMin = 10;
const mtnWidthMax = 30;
//mountain height
const mtnHeightMin = 10;
const mtnHeightMax = 30;
//mountain position, from left to right
const mtnPosMin = 0;
const mtnPosMax = 125;
//Where the snow layer appears on the mountains
const mtnSnowMin = 7;
const mtnSnowMax = 20;

//sun parameters
//sun radius
const sunRad = 20;
//sun height in the sky, above horizon
const sunHeight = -20

//cut off excess sun by drawing a box and covering the lines
const trimmerTop = [
  [
    [0, 125],
    [0, 250],
    [125, 250],
    [125, 125],
    [0, 125]
  ]];
const trimmerBottom = [
  [
    [0, 0],
    [0, horizon],
    [125, horizon],
    [125, 0],
    [0, 0]
  ]];



setDocDimensions(width, height);

//array of final lines to draw
const finalLines = [];

//initialize turtles
const horizonLine = new bt.Turtle();
const road = new bt.Turtle();
const sun = new bt.Turtle();

//similar to finalLines, but for mountains
const mountainLines = [];

//draw the sun
sun.jump([width/2, sunHeight + horizon]);
sun.arc(360, sunRad);

//draw the horizon
horizonLine.jump([0, horizon]);
horizonLine.down();
horizonLine.forward(width);

//draw the road
road.jump([width/2 - roadWidthNear/2, 0]);
road.down();
road.goTo([width/2 - roadWidthFar/2, horizon]);
road.goTo([width/2 + roadWidthFar/2, horizon]);
road.goTo([width/2 + roadWidthNear/2, 0]);

//draw the line in the road
road.jump([width/2 - laneWidth/2, 0]);
road.down();
road.goTo([width/2 - (laneWidth * (roadWidthFar/roadWidthNear))/2, horizon]);
road.goTo([width/2 + (laneWidth * (roadWidthFar/roadWidthNear))/2, horizon]);
road.goTo([width/2 + laneWidth/2, 0]);

//draws individual mountain
function drawMountain(mtnWidth, mtnHeight, mtnPos){
  //cuts off any mountains going off the bounding box.
  if (mtnWidth + mtnPos > 125){
    mtnWidth = 125 - mtnPos;
  }
  
  const mtn = new bt.Turtle;
  mtn.jump([mtnPos, horizon]);
  mtn.down();
  mtn.goTo([mtnPos + mtnWidth / 2, mtnHeight + horizon]);
  mtn.goTo([mtnPos + mtnWidth, horizon]);
  return mtn.lines();
}

//the collective line for the mountains
let mountainLine = [[]];

//join the sun to the mountain lines
mountainLine = bt.cover(mountainLine, sun.lines());
mountainLine = bt.join(mountainLine, sun.lines());

//join each individual mountain line to the collective line
for (let i = 0; i < mountains; i++){
  const mountain = drawMountain(bt.randInRange(mtnWidthMin, mtnWidthMax), bt.randInRange(mtnHeightMin, mtnHeightMax), bt.randInRange(mtnPosMin, mtnPosMax));
  mountainLine = bt.cover(mountainLine, mountain);
  mountainLine = bt.join(mountainLine, mountain);
}

//cut off the sun
mountainLine = bt.cover(mountainLine, trimmerTop);
mountainLine = bt.cover(mountainLine, trimmerBottom);


// add turtle to final lines
bt.join(finalLines, horizonLine.lines(), road.lines());
bt.join(mountainLines, mountainLine);


// draw it
drawLines(finalLines);
drawLines(mountainLines);