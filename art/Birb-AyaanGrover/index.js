/*
@title: Happy Birb
@author: Ayaan Grover
@snapshot: a birb
*/
const width = 125;
const height = 125;
setDocDimensions(width, height);
function flip(lines) {
  return lines.map(line => {
    if (Array.isArray(line[0])) {
      return line.map(point => [-point[0], point[1]]);
    } else {
      return [-line[0], line[1]];
    }
  });
}
function generateBirb() {
  const birbScale = bt.randIntInRange(1, 100)/300 + 1 // Slight birb height variation to mimic natural differences between birbs.
  const tail = bt.randIntInRange(1, 100)/16.66666667 - 3 // Looks a bit like a cape! Maybe its SuperBirb?
  const birbStretch = 2
  const l = 1.5 //Custom eye location(~1.5 recommended, can be changed to your preference!)
  const f = bt.randIntInRange(1, 100)/40 -1 // Leg Length Randomness
  const topEdge = [
    bt.nurbs([
      [0, 0],
      [birbScale * 0.5, birbStretch * 1.2],
      [birbScale * 3, birbStretch * 0.9],
      [birbScale * 5, 0]
    ]),
    [
      [0, 0],
      [birbScale, birbStretch * 0],
      [birbScale * 2.5, birbStretch * 0],
      [birbScale * 5, 0]
    ],
    [
      [-10, -10],
      [birbScale * 0, birbStretch * 0]
    ],
    bt.nurbs([
      [-10, -10],
      [birbScale, birbStretch * -6],
      [birbScale * 1.5, birbStretch * 0],
      [birbScale * 5, 0]
    ]),
    [
      [-10, -10],
      [birbScale * -21, birbStretch * tail],
      [birbScale * 1.5, birbStretch * 0],
      [birbScale * 5, 0]
    ],
    [
      [-9, (-11 - f)],
      [-9, (-10)]
    ],
    // ^Left leg
    [
      [-2.4, (-11 - f)],
      [-3, (-9.6)]
    ],
    // ^Right leg
    [
      [0, (-13 - f)],
      [-2.4, (-11 - f)]
    ],
    [
      [-4, (-13 - f)],
      [-2.4, (-11 - f)]
    ],
    // ^Right leg foot/toes
    [
      [-6.5, (-13 - f)],
      [-9, (-11 - f)]
    ],
    [
      [-11, (-13 - f)],
      [-9, (-11 - f)]
    ],
    // ^Left leg foot/toes
    [
      [4.6, 0.4],
      [3.6, 0.3]
    ],
    [
      [3.2, 0.5],
      [3.6, 0.3]
    ],
    // ^Mouth/smile
    [
      [l, 1.3],
      [l + 0.4, 1.2],
      [l + 0.1, 1.3],
      [l, 1.2]
    ],
    // ^Eyes
    [
      [-4, -6],
      [-4, -8],
      [-1, -6]
    ],
    // ^Wing
  ];
  const randomDirection = bt.randIntInRange(1, 2)
  if (randomDirection == 1) {
    return [flip(topEdge), randomDirection, birbScale, tail, birbStretch, l, f]
  }
  return [topEdge, randomDirection, Math.floor((birbScale-1)*300), Math.floor((tail+3)*16.66666667),  Math.floor((f+1)*40)]
}
function generateSun() {
  const sunRadius = bt.randIntInRange(5, 10);
  const numRays = bt.randIntInRange(10, 30);
  const rayLength = bt.randIntInRange(40, 80)/100 * sunRadius;
  const sun = [];
  // Generate the circle
  const circlePoints = 42; // Disections to approximate circle, 42 is just a random number
  const circle = [];
  for (let i = 0; i <= circlePoints; i++) {
    const angle = (2 * Math.PI / circlePoints) * i;
    const x = sunRadius * Math.cos(angle);
    const y = sunRadius * Math.sin(angle);
    circle.push([x, y]);
  }
  sun.push(circle);
  // Generate the rays
  for (let i = 0; i <= numRays; i++) {
    const angle = (2 * Math.PI / numRays) * i;
    const x1 = sunRadius * Math.cos(angle);
    const y1 = sunRadius * Math.sin(angle);
    const x2 = (sunRadius + rayLength) * Math.cos(angle);
    const y2 = (sunRadius + rayLength) * Math.sin(angle);
    sun.push([
      [x1, y1],
      [x2, y2]
    ]);
  }
  return [sun, sunRadius, numRays, Math.floor(rayLength/sunRadius*100)];
}
let factors = []
let birbFactors = []
// sun generation
let sun = generateSun()
let radius = sun[1]
let numRays = sun[2]
let rayLength = sun[3]
factors.push(radius)
factors.push(numRays)
factors.push(rayLength)
sun = sun[0]
let margin = 10
bt.translate(sun, [radius+margin, height-radius-margin], bt.bounds(sun).cc);
drawLines(sun)
// bird generation
const wireNumber = bt.randIntInRange(1, 3)
factors.push(wireNumber)
const spacing = 23;
for (let wire = 1; wire <= wireNumber; wire++) {
  const birbNumber = bt.randIntInRange(2, 5) // Number of random birds on branch
  factors.push(birbNumber)
  let y = height/2 + (wireNumber/2-(wire-1)-1.0) * spacing
  for (let birb = 1; birb <= birbNumber; birb++) {
    let topEdge = generateBirb();
    birbFactors.push([topEdge[1], topEdge[2], topEdge[3], topEdge[4]])
    topEdge = topEdge[0]
    bt.translate(topEdge, [width/2+(birbNumber/2-birb+.5)*spacing, y], bt.bounds(topEdge).cc);
    bt.scale(topEdge, 0.5)
    drawLines(topEdge)
  }
  drawLines([[[0, y-4], [width, y-4]]])
}
factors.push(birbFactors)
// Piece number generation
function factorsToCode(factors) {
    const ranges = [
        { min: 5, max: 10 },
        { min: 10, max: 30 },
        { min: 40, max: 80 },
        { min: 1, max: 3 },
        { min: 2, max: 5 },
        { min: 2, max: 5 },
        { min: 2, max: 5 },
        { min: 1, max: 2 },
        { min: 1, max: 100 },
        { min: 1, max: 100 },
        { min: 1, max: 100 }
    ];
    const totalPossibilities = ranges.reduce((acc, range) =>
        acc * (range.max - range.min + 1), 1);
    let code = 0;
    let multiplier = 1;
    for (let i = 0; i < 4; i++) {
        code += (factors[i] - ranges[i].min) * multiplier;
        multiplier *= (ranges[i].max - ranges[i].min + 1);
    }
    const wireCount = factors[3];
    for (let i = 0; i < wireCount; i++) {
        code += (factors[4 + i] - ranges[4].min) * multiplier;
        multiplier *= (ranges[4].max - ranges[4].min + 1);
    }
    const birdArrays = factors[factors.length - 1];
    const totalBirds = factors.slice(4, 4 + wireCount).reduce((sum, num) => sum + num, 0);
    for (let i = 0; i < totalBirds; i++) {
        for (let j = 0; j < 4; j++) {
            code += (birdArrays[i][j] - ranges[7 + j].min) * multiplier;
            multiplier *= (ranges[7 + j].max - ranges[7 + j].min + 1);
        }
    }
    // Ensure the code is within the valid range (0 to totalPossibilities - 1)
    return code % totalPossibilities;
}
console.log(factorsToCode(factors))
