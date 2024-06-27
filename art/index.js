/*
@title: Wood On FireS
@author: Andrew Cromar
@snapshot: snapshots/snapshot-one.png
*/

// DOC DIMENSIONS
const width = 125
const height = 125

// BACKGROUND
let numberOfWoodLines = 5;
const woodLineWidth = 20;

const maxYOffset = 5;
const minYOffset = -5;

// NUMBER OF FLAMES
const maxNumFlames = 20;
const minNumFlames = 5;

// POSITION
const maxFlameXValue = width;
const minFlameXValue = 0;

const maxFlameYValue = height;
const minFlameYValue = 0;

// SCALE
const maxFlameScale = 19;
const minFlameScale = 5;

setDocDimensions(width, height)

function DrawFlame(origin, scale, color){
  const originX = origin[0];
  const originY = origin[1];
  
  const curve = bt.catmullRom([
    [originX, originY],
    [originX - (scale / 4), originY + (scale / 10)],
    [originX - (scale / 2), originY + (scale / 2)],
    [originX - (scale / 8), originY + (scale * 1.25)],
    [originX, originY + (scale * 2)],
    [originX, originY + (scale * 2)],
    [originX + (scale / 8), originY + (scale * 1.25)],
    [originX + (scale / 2), originY + (scale / 2)],
    [originX + (scale / 4), originY + (scale / 10)],
    [originX, originY]
  ]);
  
  drawLines([curve], { stroke: color, fill: color, width: 3 });
}

drawLines([[[0, width], [height, width], [height, 0], [0, 0]]], { fill: "#6F4E37" });

numberOfWoodLines ++;
for(let i = 0; i <= numberOfWoodLines; i++){
  const randomYOffsetStart = ((height / numberOfWoodLines) * i) + bt.randInRange(minYOffset, maxYOffset);
  const randomYOffsetEnd = ((height / numberOfWoodLines) * i) + bt.randInRange(minYOffset, maxYOffset);
  drawLines([[[0, randomYOffsetStart], [width, randomYOffsetEnd]]], { stroke: "#5C4033", width: woodLineWidth});
}

function DrawRandomFlames(){
  const randomNumFlames = bt.randInRange(minNumFlames, maxNumFlames);

  for(let i = 0; i < randomNumFlames; i++){
    const randomFlameXValue = bt.randInRange(minFlameXValue, maxFlameXValue);
    const randomFlameYValue = bt.randInRange(minFlameYValue, maxFlameYValue);
    const randomFlameScale = bt.randInRange(minFlameScale, maxFlameScale);

    DrawFlame([randomFlameXValue, randomFlameYValue], randomFlameScale, "red");
    DrawFlame([randomFlameXValue, randomFlameYValue], (randomFlameScale / 3) * 2, "orange");
    DrawFlame([randomFlameXValue, randomFlameYValue], (randomFlameScale / 3) * 1, "yellow");
  }
  
}

DrawRandomFlames();