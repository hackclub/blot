/*
@title: Fractal trees 
@author: Maggie, Claire and Belle
@snapshot: 0.png
*/
const t = new bt.Turtle();

const MAX_ITERATION = bt.randInRange(7, 10)
const START_ANGLE = 90
const ANGLE_CHANGE = bt.randInRange(10, 20)
const BRANCH_LEN = bt.randInRange(20, 30)
const START_POS = [62.5, 30]

function recurse(prevBranchEnd, angle, branchLen, iteration) {
  if (iteration > MAX_ITERATION) {
    return
  }

  // Left branch from a node
  t.jump(prevBranchEnd)
  t.setAngle(angle + ANGLE_CHANGE)
  t.forward(branchLen)

  const end = () => t.path.at(-1).at(-1);
  recurse(end(), angle + ANGLE_CHANGE, branchLen * 2/3, iteration + 1)

  // Right branch from a node
  t.jump(prevBranchEnd)
  t.setAngle(angle - ANGLE_CHANGE)
  t.forward(branchLen)

  recurse(end(), angle - ANGLE_CHANGE, branchLen * 2/3, iteration + 1)
}

recurse(START_POS, START_ANGLE, BRANCH_LEN, 1)

drawLines(t.lines())