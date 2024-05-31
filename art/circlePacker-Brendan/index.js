// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start
/*
@title: CirclePacker
@author: Brendan
@snapshot: circlePacker0.png
*/
const width = 125;
const height = 125;

const fillableArea = width * height;
const targetAreaFill = fillableArea * 0.89;
const minCircleSize = 1;

bt.setRandSeed(100);

setDocDimensions(width, height);

const circles = [];

function calculateMaxRadius() {
  // this is a dumb way to get max radius
  return Math.min(width, height)/2;
}

function isOverlaping(x, y, radius) {
  if(x - radius < 0)
    return true;
  if(y - radius < 0)
    return true;
  if(x + radius > width)
    return true;
  if(y + radius > height)
    return true;
  
  return circles.some(circle => {
    return radius + circle.r > Math.sqrt(Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2)) + 0.01;
  });
}

function getOpenSlot(radius) {
  // Code I wrote from here https://github.com/Brelee2222/CLUCK/blob/main/src/frontend/dash/circlePacker.ts
  if(!circles.length) {
        return [width/2, height/2];
  }

  if(circles.length == 1) {
      // circle.touching[circle.touching.length] = placedCircles[0].r, but stupider
      //^^^what's the deal with the length being an index here?^^^ -- thing[thing.length] is append to the last index

      const distancesqr = Math.pow(circles[0].r + radius, 2);

      const rand = bt.rand();

      const x = Math.round(bt.rand()) ? Math.sqrt(rand * distancesqr) : -Math.sqrt(rand * distancesqr);
      const y = Math.round(bt.rand()) ? Math.sqrt((1 - rand) * distancesqr) : -Math.sqrt((1 - rand) * distancesqr);

      if(!isOverlaping(x, y, radius))
      return [x, y];
  }
  
  for(let index1 = 0; index1 != circles.length; index1++) {
        const circle1 = circles[index1];
        for(let index2 = index1+1; index2 != circles.length; index2++) {
            const circle2 = circles[index2];
            const distanceFrom = circle1.r + circle2.r; 

            const radius1 = circle1.r + radius;
            const radius2 = circle2.r + radius;

            const a = (radius1*radius1 - radius2*radius2 + distanceFrom*distanceFrom)/(2*distanceFrom);

            // dx : delta X
            const dx = circle1.x-circle2.x;
            const dy = circle1.y-circle2.y;

            // p : slope for perpendicular bisector of circle1 and circle2
            const p = -dx/dy;

            //
            const multiplier = a/distanceFrom;

            let posX = circle1.x - multiplier * dx;
            let posY = circle1.y - multiplier * dy;

            let circleX = posX + Math.sqrt(radius1*radius1 - a*a)/Math.sqrt(1 + p*p);
            let circleY = posY + p * Math.sqrt(radius1*radius1 - a*a)/Math.sqrt(1 + p*p);

            if(!isOverlaping(circleX, circleY, radius)) {
                return [circleX, circleY];
            }

            circleX = posX - Math.sqrt(radius1*radius1 - a*a)/Math.sqrt(1 + p*p);
            circleY = posY - p * Math.sqrt(radius1*radius1 - a*a)/Math.sqrt(1 + p*p);

            if(!isOverlaping(circleX, circleY, radius)) {
                return [circleX, circleY];
            }
        }
    }
}

for(let areaFilled = 0; areaFilled < targetAreaFill;) {
  let maxRadius = calculateMaxRadius();
  let circlePosition;
  let circleRadius;

  while(circlePosition == undefined) {
    circleRadius = bt.rand() * maxRadius;

    maxRadius = circleRadius;

    circlePosition = getOpenSlot(circleRadius);
  }
  areaFilled += circleRadius**2 * Math.PI;
  circles.push({x: circlePosition[0], y: circlePosition[1], r: circleRadius});
  // if(circles.length == 25) break;
}

const t = new bt.Turtle();

circles.forEach(circle => {
  if(circle.r < minCircleSize)
    return;
  t.jump([circle.x, circle.y - circle.r]);
  // t.down();
  t.setAngle(0);
  t.arc(360, circle.r);
});

// drawLines

// add turtle to final lines

// center piece

// draw it
drawLines(t.lines());
