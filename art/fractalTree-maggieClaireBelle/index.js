// Fractal trees by Maggie, Claire and Belle

const t = createTurtle();

const MAX_ITERATION = randInRange(7, 10)
const START_ANGLE = 90
const ANGLE_CHANGE = randInRange(10, 20)
const BRANCH_LEN = randInRange(20, 30)
const START_POS = [62.5, 30]

function recurse(prevBranchEnd, angle, branchLen, iteration) {
  if (iteration > MAX_ITERATION) {
    return
  }

  // Left branch from a node
  t.jump(prevBranchEnd)
  t.setAngle(angle + ANGLE_CHANGE)
  t.forward(branchLen)

  recurse(t.end, angle + ANGLE_CHANGE, branchLen * 2/3, iteration + 1)

  // Right branch from a node
  t.jump(prevBranchEnd)
  t.setAngle(angle - ANGLE_CHANGE)
  t.forward(branchLen)

  recurse(t.end, angle - ANGLE_CHANGE, branchLen * 2/3, iteration + 1)
}

recurse(START_POS, START_ANGLE, BRANCH_LEN, 1)

drawTurtles([t])