/*
@title: Lets Make Cheese!
@author: UserJ
@snapshot: cheese1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const finalLines = [];

const cheeseCenter = [88, 68];
const cheeseHeight = 22;
const cheeseRadius = 67;
const cheesePercentage = 0.1;
const cheeseAngle = -4 % 360 / 180 * Math.PI;
const cameraAngle = 101 / 180 * Math.PI;
const holeRadius = 3;
const numHoles = 12;

bt.setRandSeed(5)

const cheeseEndAngle = cheeseAngle + cheesePercentage * 2 * Math.PI
if (cheesePercentage !== 0) {
  const backSide = [];

  // Make sure it would be visible (Middle Line of cheese
  if (cheeseEndAngle < Math.PI * 1.5 || cheeseAngle > Math.PI * 1.5) {
    const middleLine = [
      cheeseCenter,
      [cheeseCenter[0], cheeseCenter[1] - (cheeseHeight * Math.sin(cameraAngle))],
    ]
    // finalLines.push(middleLine)
    backSide.push(middleLine)
  }

  function calcCheeseEdgePos(angle) {
    return [
      cheeseCenter[0] + (-Math.cos(angle) * cheeseRadius),
      cheeseCenter[1] + (-Math.cos(cameraAngle) * Math.sin(angle) * cheeseRadius)
    ]
  }

  const curvePoints = [];
  for (var i = 0; i < 100; i++) {
    // console.log(calcCheeseEdgePos(cheeseAngle + 
    curvePoints.push(calcCheeseEdgePos(cheeseAngle + ((i / 100) * cheesePercentage * 2 * Math.PI)))
  }
  finalLines.push(bt.catmullRom(curvePoints))

  const firstPart = calcCheeseEdgePos(cheeseAngle)
  const finalPart = calcCheeseEdgePos(cheeseEndAngle)

  // finalLines.push([cheeseCenter, firstPart])
  finalLines.push([cheeseCenter, finalPart])

  function isAngleVisible(angle) {
    if (angle > Math.PI) return true;
    if (angle > cheeseAngle && angle < cheeseEndAngle) return false;
    if (angle < Math.PI / 2 && angle > cheeseAngle) return false;
    if (angle > Math.PI / 2 && angle < cheeseEndAngle) return false;
    return true;
  }

  const frontEdge = [
    firstPart,
    [firstPart[0], firstPart[1] - (cheeseHeight * Math.sin(cameraAngle))],
  ];
  if (isAngleVisible(cheeseAngle)) {
    // finalLines.push(frontEdge)
  }
  const backEdge = [
    finalPart,
    [finalPart[0], finalPart[1] - (cheeseHeight * Math.sin(cameraAngle))],
  ]
  if (isAngleVisible(cheeseEndAngle)) {
    finalLines.push(backEdge)
  }

  const frontBottomEdge = [
    [firstPart[0], firstPart[1] - (cheeseHeight * Math.sin(cameraAngle))],
    [cheeseCenter[0], cheeseCenter[1] - (cheeseHeight * Math.sin(cameraAngle))]
  ];
  if (cheeseAngle < Math.PI / 2 || cheeseAngle > Math.PI * 1.5) {
    // finalLines.push(frontBottomEdge)
  }

  const backBottomEdge = [
    [finalPart[0], finalPart[1] - (cheeseHeight * Math.sin(cameraAngle))],
    [cheeseCenter[0], cheeseCenter[1] - (cheeseHeight * Math.sin(cameraAngle))]
  ]
  backSide.push(backBottomEdge)
  if (cheeseEndAngle > Math.PI / 2 && cheeseEndAngle < Math.PI * 1.5) {
    finalLines.push(backBottomEdge)
  }


  function circle(x, y, r) {
    const t = new bt.Turtle();
    t.jump([0, -r])
    t.arc(360, r);
    const cc = bt.bounds(t.path).cc;
    bt.translate(t.path, [x, y], cc);

    return t.path[0];
  }
  const points = [];
  for (var i = 0; i < numHoles; i++) {
    bt.union(points, [circle(bt.randInRange(-cheeseRadius, 0), bt.randInRange(0, cheeseHeight), holeRadius)])
  }

  const frontSide = [[
      cheeseCenter,
      [cheeseCenter[0], cheeseCenter[1] - (cheeseHeight * Math.sin(cameraAngle))],
      [firstPart[0], firstPart[1] - (cheeseHeight * Math.sin(cameraAngle))],
      firstPart,
      cheeseCenter,
    ]];
  drawLines(
    bt.difference(
      frontSide,
      bt.translate(
        
          bt.rotate(bt.scale(points, [1, Math.sin(cameraAngle)]),
            cheeseAngle / Math.PI  * 180 * Math.cos(cameraAngle), [cheeseHeight/2, 0]),
        [cheeseCenter[0], cheeseCenter[1] - (cheeseHeight * Math.sin(cameraAngle))]
      )
    )
  )

  drawLines(finalLines);
}