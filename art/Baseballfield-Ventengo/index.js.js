/*
@title: Baseball field
@author: Ventengo
@snapshot: pic1
*/
const width = 125;
const height = 125;
const smallSquareSize = 20;
const smallSquareOffsets = [
  [0, 0],
  [width - smallSquareSize, 0],
  [width - smallSquareSize, height - smallSquareSize],
  [0, height - smallSquareSize]
];
const innerBaselineSquareSize = bt.randInRange(50, 87);;
const innerBaselineSquareOffsetX = (width - innerBaselineSquareSize) / 2;
const innerBaselineSquareOffsetY = height - innerBaselineSquareSize - 23;
const lines = [];
const triangles = [];
const curve = [];
const body = [];
const person = [];
const letter = [];
const fenceRadius = bt.randInRange(170, 200);;
const fenceRotation = 105;
const fenceStartAngle = Math.PI / 2 + fenceRotation;
const fenceEndAngle = 2.25 * Math.PI / 2 + fenceRotation;
const fenceCenterX = 39;
const fenceCenterY = 50;
const starPoints = 5;
const starInnerRadius = 10;
const starOuterRadius = 20;
const starCenterX = width / 2;
const starCenterY = height / 2;
const starLines = [];
for (let i = 0; i < starPoints; i++) {
  const outerAngle = (i * 2 * Math.PI) / starPoints;
  const innerAngle = outerAngle + Math.PI / starPoints;
  const outerX = starCenterX + starOuterRadius * Math.cos(outerAngle);
  const outerY = starCenterY + starOuterRadius * Math.sin(outerAngle);
  const innerX = starCenterX + starInnerRadius * Math.cos(innerAngle);
  const innerY = starCenterY + starInnerRadius * Math.sin(innerAngle);
  const triangle1 = [
    [10, 144],
    [30, 171],
    [50, 144] ];
  const triangle2 = [
    [137, 97],
    [155, 127],
    [173, 100] ];
  const triangle3 = [
    [164, 7],
    [177, 32],
    [199, 7]  ];
const numFencePoints = 50;
const fenceAngleIncrement = (fenceEndAngle - fenceStartAngle) / numFencePoints;
for (let i = 0; i <= numFencePoints; i++) {
  const angle = fenceStartAngle + i * fenceAngleIncrement;
  const x = fenceCenterX + fenceRadius * Math.cos(angle);
  const y = fenceCenterY + fenceRadius * Math.sin(angle);
   lines.push([
    [x, y],
    [fenceCenterX + fenceRadius * Math.cos(angle + fenceAngleIncrement), fenceCenterY + fenceRadius * Math.sin(angle + fenceAngleIncrement)]
  ]);
}
  const moundRadius = bt.randInRange(1, 20);;
const moundX = width / 2;
const moundY = height / 2;
const numPoints = 30;
const angleIncrement = 2 * Math.PI / numPoints;
for (let i = 0; i < numPoints; i++) {
  const angle = i * angleIncrement;
  const x = moundX + moundRadius * Math.cos(angle);
  const y = moundY + moundRadius * Math.sin(angle);
  lines.push([
    [x, y],
    [moundX + moundRadius * Math.cos(angle + angleIncrement), moundY + moundRadius * Math.sin(angle + angleIncrement)]
  ]);
}
  const curve1 = bt.catmullRom([[178, 209], [165, 219], [177, 233], [190, 222], [178, 209]])
  const curve2 = bt.catmullRom([[188+5, 219+5], [175+5, 229+5], [187+5, 243+5], [200+5, 232+5], [188+5, 219+5]])
const polylines = [];
  const head = [
  [92 / 2, 214 / 2],
  [92 / 2, 206 / 2],
  [98 / 2, 206 / 2],
  [98 / 2, 214 / 2],
  [92 / 2, 214 / 2],
];
const body = [
  [95 / 2, 206 / 2],
  [95 / 2, 188 / 2],
];
const arm1 = [
  [95 / 2, 204 / 2],
  [110 / 2, 195 / 2],
];
const arm2 = [
  [95 / 2, 204 / 2],
  [109 / 2, 198 / 2],
];
const legs1 = [
  [95 / 2, 188 / 2],
  [92 / 2, 178 / 2],
];
const legs2 = [
  [95 / 2, 188 / 2],
  [98 / 2, 178 / 2],
];
const bat = [
  [109 / 2, 195 / 2],
  [112 / 2, 192 / 2],
  [118 / 2, 223 / 2],
  [109 / 2, 222 / 2],
  [109 / 2, 193 / 2],
];

  const seatx = bt.randInRange(1, 10);
  const R = [
    [30, 25],
    [35, 25],
    [35, 21],
    [30, 21],
    [30, 25],
    [30, 17],
    [30, 21], 
    [35, 17],
  ]
  const O = [
    [38, 25],
    [43, 25],
    [43, 17],
    [38, 17],
    [38, 25], ]
  const C = [
    [51, 25],
    [46, 25],
    [46, 17],
    [51, 17],]
  const K = [
    [59, 25],
    [54, 21],
    [54, 25],
    [54, 21],
    [59, 17],
    [54, 21],
    [54, 17],]
  const I = [
    [62, 25],
    [68, 25],
    [65, 25],
    [65, 17],
    [62, 17],
    [65, 17],
    [68, 17],]
  const E = [
    [71, 25],
    [76, 25],
    [71, 25],
    [71, 21],
    [76, 21],
    [71, 21],
    [71, 17],
    [76, 17],]
  const S = [
    [79, 25],
    [84, 25],
    [79, 25],
    [79, 21],
    [84, 21],
    [84, 17],
    [79, 17],]
    
  
 

  setDocDimensions(width * 2, height * 2)
  
  letter.push(O);
  letter.push(R);
  letter.push(C);
  letter.push(K);
  letter.push(I);
  letter.push(E);
  letter.push(S);
  drawLines(letter);  

  
polylines.push(head);
polylines.push(body);
polylines.push(arm1);
polylines.push(arm2);
polylines.push(legs1);
polylines.push(legs2); 
polylines.push(bat);


const copiedPolylines = bt.copy(polylines); 
const copyPoly1 = bt.copy(copiedPolylines);
const copyPoly2 = bt.copy(copyPoly1);
bt.translate(copiedPolylines, [45, 12]); 
bt.translate(copyPoly1, [62, -66]);
bt.translate(polylines, [-24, 13]);
bt.translate(copyPoly2, [-40, -75]);
drawLines(polylines);
drawLines(copyPoly1);
drawLines(copiedPolylines);
drawLines(copyPoly2);



 
curve.push(curve1);
curve.push(curve2);
  
drawLines(curve);
  
bt.translate(curve, [11, -18]);

  
  bt.translate(triangles, [seatx, 16]);
  

  // Draw the triangles
  triangles.push(triangle1);
  triangles.push(triangle2);
  triangles.push(triangle3);
  drawLines(triangles);

  
lines.push([
    [innerBaselineSquareOffsetX, innerBaselineSquareOffsetY],
    [innerBaselineSquareOffsetX + innerBaselineSquareSize, innerBaselineSquareOffsetY]
]);
lines.push([
    [innerBaselineSquareOffsetX + innerBaselineSquareSize, innerBaselineSquareOffsetY],
    [innerBaselineSquareOffsetX + innerBaselineSquareSize, innerBaselineSquareOffsetY + innerBaselineSquareSize]
]);
lines.push([
    [innerBaselineSquareOffsetX + innerBaselineSquareSize, innerBaselineSquareOffsetY + innerBaselineSquareSize],
    [innerBaselineSquareOffsetX, innerBaselineSquareOffsetY + innerBaselineSquareSize]
]);
lines.push([
    [innerBaselineSquareOffsetX, innerBaselineSquareOffsetY + innerBaselineSquareSize],
    [innerBaselineSquareOffsetX, innerBaselineSquareOffsetY]
]);

  // Draw the outer square
  lines.push([
    [0, 0],
    [width, 0]
  ]);
  lines.push([
    [width, 0],
    [width, height]
  ]);
  lines.push([
    [width, height],
    [0, height]
  ]);
  lines.push([
    [0, height],
    [0, 0]
  ]);



  smallSquareOffsets.forEach(([offsetX, offsetY]) => {
    lines.push([
      [offsetX, offsetY],
      [offsetX + smallSquareSize, offsetY]
    ]);
    lines.push([
      [offsetX + smallSquareSize, offsetY],
      [offsetX + smallSquareSize, offsetY + smallSquareSize]
    ]);
    lines.push([
      [offsetX + smallSquareSize, offsetY + smallSquareSize],
      [offsetX, offsetY + smallSquareSize]
    ]);
    lines.push([
      [offsetX, offsetY + smallSquareSize],
      [offsetX, offsetY]
    ]);
  });



  starLines.push([
    [outerX, outerY],
    [innerX, innerY]
  ]);
}

lines.push(...starLines);

// Draw all lines (including the star)
drawLines(lines);
