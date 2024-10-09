/*
@title: Wireframe-tunnel
@author: Matthew
@snapshot: snapshot0
*/
// MODIFIYABLE CONSTANTS
const width = 125;
const height = 125;
const randDepth = Math.ceil(Math.random() * 10); // Length of tunnel (non-negative)
const sideTunnel = 0.35;  // Probability of a branching tunnel (0 to 1 inclusive)


let leftPoints = [
  [0, height],
  [0, 0],
];
let rightPoints = [
  [width, height],
  [width, 0],
];
const t = new bt.Turtle();

function drawTrapezoid(p1, p2, p3, p4) { // Includes rectangle
  t.jump(p1);
  t.goTo(p2);
  t.goTo(p3);
  t.goTo(p4);
  t.goTo(p1);
}

function drawSideCorridor(p1, p2, p3, p4) {
  let corridorDepth = 0.3;
  let p5 = [p1[0], p3[1]];
  let p6 = [p2[0], p4[1]];
  t.jump(p5);
  t.goTo(p3);
  t.goTo(p4);
  t.goTo(p6);
  t.goTo(p5);
}

setDocDimensions(width, height);
if (randDepth < 0) throw new Error("Length of tunnel is not non-negative.");

for (let depth = 0; depth < randDepth; depth++) {
  let nextLeftX = ((width / 2) * (depth + 1)) / (depth + 2);
  let nextRightX = width - ((width / 2) * (depth + 1)) / (depth + 2);
  let nextTopY = height + ((- height / 2) * (depth + 1)) / (depth + 2);
  let nextBottomY = ((height / 2) * (depth + 1)) / (depth + 2);
  
  let nextLeftPoints = [
    [nextLeftX, nextTopY],
    [nextLeftX, nextBottomY],
  ];
  let nextRightPoints = [
    [nextRightX, nextTopY],
    [nextRightX, nextBottomY],
  ];

  if (Math.random() < sideTunnel) {
    drawSideCorridor(
      leftPoints[0],
      leftPoints[1],
      nextLeftPoints[1],
      nextLeftPoints[0]
    );
  } else {
    drawTrapezoid(
      leftPoints[0],
      leftPoints[1],
      nextLeftPoints[1],
      nextLeftPoints[0]
    );
  }

  if (Math.random() < sideTunnel) {
    drawSideCorridor(
      rightPoints[0],
      rightPoints[1],
      nextRightPoints[1],
      nextRightPoints[0]
    );
  } else {
    drawTrapezoid(
      rightPoints[0],
      rightPoints[1],
      nextRightPoints[1],
      nextRightPoints[0]
    );
  }

  t.jump(leftPoints[1]);
  t.goTo(rightPoints[1]);
  t.jump(leftPoints[0]);
  t.goTo(rightPoints[0]);

  leftPoints = nextLeftPoints;
  rightPoints = nextRightPoints;
}

drawTrapezoid(
  leftPoints[0],
  rightPoints[0],
  rightPoints[1],
  leftPoints[1]
);

drawLines(t.lines());
