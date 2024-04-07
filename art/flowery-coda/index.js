/*
@title: Flowery
@author: Dakota Roth
@snapshot: 0.png
*/

/// ===== settable variables ==== ///
const flowerNum = 1
const randSeed = 12957

// flower head controls
const steps = 41
const stepLength = .3





/// ======= DEBUG TOOLS AND FUNCTIONS ======== ///

function drawX(x, y) { // used for debugging where stuff is being placed
  const line1 = [[ x-1, y-1 ],[ x+1 ,y+ 1 ]]
  const line2 = [[ x+1, y-1 ],[ x+-1, y+1 ]]
  drawLines([line1, line2])
}

// ======== START ======== //

const width = 125;
const height = 125;

setDocDimensions(width, height);
bt.setRandSeed(randSeed)

const finalLines = []

function startStem() { // stuff that all the stems share in a way, such as base stem start point
  
  return [x,y]
}

function drawStem() {

  // making stem
  // generate points its going through
  const baseX = bt.randInRange(51,73) // setting base point
  const baseY = 10
  
  // middle spline
  const midX = bt.randInRange(44,91)
  const midY = bt.randInRange(35,60)
  
  // last spline //DEBUG
  const topX = bt.randInRange(19,85)
  const topY = bt.randInRange(40,107)

  const stem = bt.catmullRom([
   [baseX, baseY], [ midX, midY], [topX, topY] 
  ])
  
  drawLines([stem])
  
  return [topX, topY]
}

function drawHead(x, y) {
  const t = new bt.Turtle()
  t.jump(x, y)
  
  t.down()

  const degree = bt.randInRange(125,269)
  for (let i = 0; i < steps; i = i + stepLength) {
    t.forward(i);
    t.right(degree);
  }
  
  const path = t.path
  drawLines(path)
}

function drawFlower() {
  drawHead(drawStem())


  // mutliple varations of flower heads?

}

for (let i = 0; i < flowerNum; i++) {
  drawFlower()
}

