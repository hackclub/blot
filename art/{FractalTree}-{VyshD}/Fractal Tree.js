/*
@title: Fractal Tree
@author: Vysh D
*/

const t = createTurtle();
const START_ANGLE = 50;
const START = [62.5, 62.5];
const MAX_ITERATION = 10;
let ANGLE_CHANGE = 20;
const BRANCH_LEN = 15;

function recurse(prevBranchEnd,  angle , branchLen , iteration ) {
  if (iteration > MAX_ITERATION){
    return;
  }

  
  //right branch
  t.jump(prevBranchEnd)
  t.setAngle(angle - ANGLE_CHANGE) 
  t.forward(branchLen)

  recurse (t.end, angle-ANGLE_CHANGE, branchLen * 2/3, iteration +1)  

//left branch
  t.jump(prevBranchEnd)
  t.setAngle(angle + ANGLE_CHANGE) 
  t.forward(branchLen)

  recurse (t.end, angle+ANGLE_CHANGE, branchLen * 2/3, iteration +1)  
}
recurse (START, START_ANGLE, BRANCH_LEN, 1)

drawTurtles([t]);