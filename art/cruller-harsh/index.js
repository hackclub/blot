/*
@title: cruller with Sprinkles
@author: FutureSlinky
@snapshot: cruller.png
*/

const { Turtle, join, bounds, rotate, scale, translate, randInRange, randIntInRange } = blotToolkit;

let canvasCenter = 75;
let crullerRadius = randInRange(20, 50);
let crullerScale = 1.5;
let rotationAngle = randIntInRange(10, 20);

function sprinkleShape(size) {
  let t = new Turtle();
  t.forward(size / 2);
  t.right(90);
  t.forward(size / 16);
  t.right(90);
  t.forward(size / 2);
  t.right(90);
  t.forward(size / 16);
  return t.lines();
}

function scatterSprinkles(topInnerCircle, leftInnerCircle, rightInnerCircle) {
  let sprinkles = [];
  for (let i = 0; i < crullerRadius * 3; i++) {
    let sprinkleLength = crullerRadius / 7;
    let sprinklePoly = sprinkleShape(sprinkleLength);
    let rotation = randInRange(0, 360);
    rotate(sprinklePoly, rotation);

    let y = randInRange(0, canvasCenter + crullerRadius - sprinkleLength);
    let xBoundary = Math.sqrt((crullerRadius ** 2 - ((y - canvasCenter) ** 2))) * 1.6;
    let x = randInRange(canvasCenter - xBoundary + sprinkleLength, canvasCenter + xBoundary - sprinkleLength);

    translate(sprinklePoly, [x, y]);
    
    if (!(y < topInnerCircle && leftInnerCircle < x && x < rightInnerCircle)) {
      join(sprinkles, sprinklePoly);
    }
  }
  return sprinkles;
}

let crullerPoly = [];

let outerRing = new Turtle();
outerRing.arc(-360, crullerRadius);
crullerPoly.push(...outerRing.lines());
translate(crullerPoly, [canvasCenter, canvasCenter + crullerRadius]);
scale(crullerPoly, [crullerScale, 1]);

let innerRingBottomPoly = [];
let innerRingBottom = new Turtle();
innerRingBottom.arc(-178, crullerRadius / 3);
innerRingBottomPoly.push(...innerRingBottom.lines());
rotate(innerRingBottomPoly, 270, [0, -crullerRadius / 3.5]);
scale(innerRingBottomPoly, [1.4, 0.5]);
translate(innerRingBottomPoly, [canvasCenter, canvasCenter + (crullerRadius / 3)]);

let innerRingTopPoly = [];
let innerRingTop = new Turtle();
innerRingTop.arc(-178, crullerRadius / 3);
innerRingTopPoly.push(...innerRingTop.lines());
rotate(innerRingTopPoly, 90, [0, -crullerRadius / 3.5]);
scale(innerRingTopPoly, [0.9, 0.3]);
translate(innerRingTopPoly, [(bounds(innerRingBottomPoly).cc[0] - crullerRadius / 10) + 1.0, canvasCenter]);

let sprinkles = scatterSprinkles(bounds(innerRingBottomPoly).ct[1], bounds(innerRingBottomPoly).lc[0], bounds(innerRingBottomPoly).rc[0]);

drawLines(innerRingBottomPoly);
drawLines(innerRingTopPoly);
drawLines(crullerPoly);
drawLines(sprinkles);
