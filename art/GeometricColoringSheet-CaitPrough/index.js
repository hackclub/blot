/*
@title: GeometricColoringSheet
@author: CaitPrough
@snapshot: 12x12noGaps
*/

// these are the size of the grid
const sqNumWidth = 12; // Number of squares wide
const sqNumHeight = 12; // Number of squares tall

// if width and height = 10 there will be no gap between shapes, larger will
// have the gaps as the remainder after 10, less will cause overlap
const squareWidth = 10; // Width of each 'square'
const squareHeight = 10; // Height of each 'square'

const canvasWidth = squareWidth * sqNumWidth - (squareWidth - 10);
const canvasHeight = squareHeight * sqNumHeight - (squareHeight - 10);

setDocDimensions(canvasWidth, canvasHeight);

const finalLines = [];
const finalLinesBounds = bt.bounds(finalLines);

// rotate the shape (not really useful for circles lmao)
function rotateShape(shape) {
  const degrees = bt.randIntInRange(0, 3) * 90;
  bt.rotate(shape, degrees);
}

// create full circle
function polylineCircle(center, radius, segments) {
  const circle = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    circle.push([x, y]);
  }
  return [circle];
}

// create quarter circle
function quarterCircle(center, radius, segments) {
  const qCircle = [];
  const startAngle = -Math.PI / 2; // angle
  const endAngle = 0;
  const angleIncrement = (endAngle - startAngle) / segments;
  qCircle.push([5, 5], [-5, 5]);
  qCircle.push([-5, 5], [-5, -5]);
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + i * angleIncrement;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    qCircle.push([x, y]);
  }
  return [qCircle];
}

// create arc
function arc(center, radius, segments) {
  const qCircle = [];
  const startAngle = -Math.PI / 2; // angle
  const endAngle = 0;
  const angleIncrement = (endAngle - startAngle) / segments;
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + i * angleIncrement;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    qCircle.push([y, x]);
  }
  for (let i = segments; i >= 0; i--) {
    const angle = startAngle + i * angleIncrement;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    qCircle.push([x, y]);
  }
  return [qCircle];
}

// iterates creation
for (let i = 0; i < sqNumWidth; i++) {
  for (let j = 0; j < sqNumHeight; j++) {
    let shape;
    const num = bt.randInRange(0, 5);
    
    if (num <= 1) {
      const num = bt.randInRange(0,2);
      if (num <= 1) {
        shape = [
          [
            [-5,5],
            [5,5],
            [5,0],
            [-5,0],
            [-5,5],
          ]
        ];
      }
      else {
        shape = [
          [
            [-5,5],
            [0,5],
            [0,-5],
            [-5,-5],
            [-5,5],
          ]
        ];
      }
    }
    else if (num <= 2) {
      shape = [
        [
          [-5, 5],
          [5, -5],
          [5, 5],
          [-5, 5],
        ]
      ]
      rotateShape(shape);
    } 
    else if (num <= 3) { //quarter circle
      shape = quarterCircle([-5, 5], 10, 24);
      rotateShape(shape);
    } 
    else if (num <= 4) { //full circle
      shape = polylineCircle([0, 0], 5, 24);
      rotateShape(shape);
    } 
    else {
      shape = arc([-5, 5], 10, 24);
      rotateShape(shape);
    }

    bt.translate(shape, [squareWidth * i, squareHeight * j]); // puts shape where it goes
    //rotateShape(shape);
    bt.join(finalLines, shape); // add shape to group
  }
}

// all these are off by 5, not really sure why
bt.translate(finalLines, [5, 5]);

const border = [
  [
    [0, 0],
    [canvasWidth, 0]
  ],
  [
    [canvasWidth, 0],
    [canvasWidth, canvasHeight]
  ],
  [
    [canvasWidth, canvasHeight],
    [0, canvasHeight]
  ],
  [
    [0, canvasHeight],
    [0, 0]
  ],
];
bt.join(finalLines, border);

drawLines(finalLines); // DRAW :D
