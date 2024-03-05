// Check the workshop tab to get started

const width = 125;
const height = 125;

// The maximum amount a point can be transformed by on each axis 
// For example max of 3 for X means the point can move at most 3 to the left or right
// The lower the number, the closer to the original mapping (too high will lose structure)
const maxTransformRadius = [3, 3]


setDocDimensions(width, height);

const t = createTurtle();

t.jump([width / 2, height / 2]);

let midline = width / 2

const leftPoints = [
  // Points 6-11 are the sides of the face
  // Points 12+ Are internal facial features
  // [[x, y], connectorIds]
  [[midline - 15, 90], [7]], // 6
  [[midline - 20, 85], [8]], // 7
  [[midline - 20, 75], [2, 9]], // 8
  [[midline - 20, 66], [10]], // 9
  [[midline - 17, 55], [11]], // 10
  [[midline - 10, 51], [5]], // 11
  [[midline - 9, 84], [1, 6, 8]], // 12
  [[midline - 9, 62], [3, 4, 10]], // 13
  [[midline - 11, 55], [4, 10]], // 14
  [[midline - 6, 79], [2, 8]], // 15
]

// These points do not move horizontally to maintain structure
const midPoints = [
  // [[x, y], connectorIds]
  [[midline, 93], [6, 6 + leftPoints.length]],
  [[midline, 80], [2]], 
  [[midline, 70], []], 
  [[midline, 65], []], 
  [[midline, 57], []], 
  [[midline, 48], []],
]

function radToDeg(rad) {
  return (180 / Math.PI) * rad
}

function transformPoints(points, changeX, changeY) {
  let newPoints = []
  
  for (const point of points) {
    let newX = changeX ? (point[0][0] + randInRange(-maxTransformRadius[0], maxTransformRadius[0])) : point[0][0]
    let newY = changeY ? (point[0][1] + randInRange(-maxTransformRadius[1], maxTransformRadius[1])) : point[0][1]
    newPoints.push([[newX, newY], point[1]])
  }

  return newPoints
}

// Applies transformations and creates right symmetric side of points
function createFullTable() {
  let table = []

  // Transform midpoints and left points
  let transformedMid = transformPoints(midPoints, false, true)
  table = table.concat(transformedMid)

  let transformedLeft = transformPoints(leftPoints, true, true) 
  table = table.concat(transformedLeft)

  // Generate right side
  for(const p of transformedLeft) {
    let midDiff = Math.abs(p[0][0] - midline)
    let newX = midline + midDiff

    let newConnections = []
    for (const conn of p[1]) {
      // If connected to a left point, adjust connector id to be on right
      newConnections.push((conn < midPoints.length) ? conn : (conn + leftPoints.length))
    }

    // Add new right point to points table
    table.push([[newX, p[0][1]], newConnections])
  }

  return table
}

let basePoints = createFullTable()

// Draws points 
for (const pointData of basePoints) {
  // Reset turtle data at each point and jump to it
  t.setAngle(0)
  // Adjust y value for lines to be in centre of circle
  let adjustedPD = [pointData[0][0], pointData[0][1] - 1]
  t.jump(adjustedPD)
  t.arc(360, 1)

  // Draw connections between points (lines)
  for (const connector of pointData[1]) {
    t.jump(pointData[0]) // Reset position
    let targetPointData = basePoints[connector]
    let xDist = (targetPointData[0][0] - pointData[0][0])
    let yDist = (targetPointData[0][1] - pointData[0][1])
    
    let totalDist = Math.sqrt(xDist**2 + yDist**2)
    let angle = Math.atan2(yDist, xDist)

    t.setAngle(radToDeg(angle))
    t.forward(totalDist)
  }
}

drawTurtles([
    t
]);
