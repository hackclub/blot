/*
@title: I See
@author: Leo
@snapshot: 1.png
*/

const width = 125;
const height = 125;

const eyeWidth = 22;
const eyeHeight = 10;

setDocDimensions(width, height);

const topBrow = bt.nurbs([
  [0.6, 2],
  [eyeWidth/1.9, eyeHeight],
  [eyeWidth, 2.6]
]);

const bottomBrow = bt.nurbs([
  [0.7, -1.4],
  [eyeWidth/1.9, -eyeHeight],
  [eyeWidth, 0.5]
]);

const inner = [
  ...bt.nurbs([
    [0, 0],
    [eyeWidth/1.9, eyeHeight],
    [eyeWidth, 1.4]
  ]),
  ...bt.nurbs([
    [0, 0],
    [eyeWidth/1.9, -eyeHeight],
    [eyeWidth, 1.4]
  ]).reverse()
]

const polylines = [
  inner,
]

const center = new bt.Turtle()
  .arc(360, 5.1)
  .lines();

bt.translate(center, [11, -4.9])


const pupil = new bt.Turtle()
  .arc(360, 1.9)
  .lines();

bt.translate(
  pupil, 
  bt.bounds(center).cc, 
  bt.bounds(pupil).cc
)

const innerEye = [];

bt.join(innerEye, center)

bt.join(innerEye, pupil);

const pupilHatch = hatchPolygon(pupil[0], .15);

bt.join(innerEye, pupilHatch);

const iris = [];

const start = bt.bounds(pupil).cc;

const total = 63;
for (let i = 0; i < total; i++) {
  const angle = Math.PI*2*i/total;
  const r = 7;

  const [x, y] = start;
  const endPt = [
    x + Math.cos(angle)*r,
    y + Math.sin(angle)*r,
  ]

  iris.push([[x, y], endPt]);
}

bt.resample(iris, .1);

bt.iteratePoints(iris, (pt, t) => {
  const [x, y] = pt;
  
  return [
    x+bt.noise([x*.7, y*.5])*0.6, 
    y+bt.noise([x*.7, y*.5])*0.8
  ]
})


bt.cover(iris, pupil)
bt.cut(iris, center)
bt.join(innerEye, iris)
bt.cut(innerEye, polylines)
bt.join(polylines, innerEye);

// top lashes

const topLashes = [];

bt.iteratePoints([ topBrow ], (pt, t) => {

  if (bt.rand() < .1) return;
  
  const [x, y] = pt;

  const ogAngle = bt.getAngle([topBrow], t);

  const angle = 
    (ogAngle 
                 + bt.randInRange(10, 40)
                ) / 180 * Math.PI;
  const r = bt.randInRange(.1, 3);

  const endPt = [
    x + Math.cos(angle)*r,
    y + Math.sin(angle)*r,
  ]

  const midPoint = [
    (x+endPt[0])/2+bt.randInRange(-r*.6, r*.6),
    (y+endPt[1])/2+bt.randInRange(-.1, .1)
  ]

 

  topLashes.push(bt.nurbs([
    [x, y],
    midPoint,
    endPt
  ]))
  
})

bt.join(polylines, topLashes);

// bottom lashes

const bottomLashes = [];

bt.iteratePoints([ bottomBrow ], (pt, t) => {

  if (bt.rand() < .4) return;
  
  const [x, y] = pt;

  const ogAngle = bt.getAngle([bottomBrow], t);

  const angle = (ogAngle - bt.randInRange(10, 40)) / 180 * Math.PI;
  const r = bt.randInRange(.1, 1);

  const endPt = [
    x + Math.cos(angle)*r,
    y + Math.sin(angle)*r,
  ]

  const midPoint = [
    (x+endPt[0])/2+bt.randInRange(-r*.6, r*.6),
    (y+endPt[1])/2+bt.randInRange(-.1, .1)
  ]

  bottomLashes.push(bt.nurbs([
    [x, y],
    midPoint,
    endPt
  ]))
  
})

bt.join(polylines, bottomLashes);

// draw glare

const glareBlob = [bt.nurbs([
  [0, 0],
  [2.2, 4.5],
  [5.8, 2.8],
  [0, 0],
])];

bt.translate(glareBlob, [11.8, 0.6])
bt.rotate(glareBlob, -77)
bt.cover(polylines, glareBlob)

bt.join(polylines, glareBlob)

// // draw glare

const innerNub = [bt.nurbs([
  [0.8, 1.0],
  [2.2, -0.0],
  [-0.1, -1.6],
])];


bt.cut(innerNub, polylines)

bt.join(polylines, innerNub)

const final = [
  ...polylines,
  topBrow,
  bottomBrow
];

bt.scale(
  final,
  125/bt.bounds(final).width*.8
)

bt.translate(
  final,
  [width/2, height/2],
  bt.bounds(final).cc
)

drawLines(final)


function distance(pt0, pt1) {
  const [x0, y0] = pt0;
  const [x1, y1] = pt1;
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

function getAngleBetweenPoints([x1, y1], [x2, y2]) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

// Hatching function is borrowed from Reinder Nijhoff
function hatchPolygon(polygon, hatchDistance) {
  // Calculate the bounding box of the polygon
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  polygon.forEach(point => {
    minX = Math.min(minX, point[0]);
    maxX = Math.max(maxX, point[0]);
    minY = Math.min(minY, point[1]);
    maxY = Math.max(maxY, point[1]);
  });

  // Generate horizontal hatch lines
  let hatchLines = [];
  for (let y = minY; y <= maxY; y += hatchDistance) {
    let lineSegments = intersectPolygonWithHorizontalLine(polygon, y);
    hatchLines.push(...lineSegments);
  }

  return hatchLines;
}

function intersectPolygonWithHorizontalLine(polygon, y) {
  // Find intersections of the horizontal line with the polygon sides
  let intersections = [];
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i][0],
      yi = polygon[i][1];
    let xj = polygon[j][0],
      yj = polygon[j][1];

    if ((yi > y) != (yj > y)) {
      let x = xi + (y - yi) * (xj - xi) / (yj - yi);
      intersections.push([x, y]);
    }
  }

  // Sort intersections by x-coordinate
  intersections.sort((a, b) => a[0] - b[0]);

  // Pair intersections to form line segments
  let lineSegments = [];
  for (let i = 0; i < intersections.length; i += 2) {
    if (intersections[i + 1]) {
      lineSegments.push([intersections[i], intersections[i + 1]]);
    }
  }

  return lineSegments;
}