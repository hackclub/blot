/*
@title: square disarray
@author: leomcelroy
@snapshot: 0.png
*/

const width = 120;
const height = 120;

setDocDimensions(width, height);

const finalLines = []; // we'll put our final lines here

const squareWidth = 10
const squareHeight = 10
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const square = rect(squareWidth, squareHeight);
    const offsetX = bt.randInRange(-1.4, 4.5);
    const offsetY = bt.randInRange(-3.2, 4.5);
    bt.translate(
      square, 
      [
        (squareWidth) * i, 
        (squareHeight) * j
      ]
    );

    // randomness added here
    bt.translate(square, [(bt.randInRange(-1, 1) * i) / 6, (bt.randInRange(-1, 1) * i) / 6])
    bt.rotate(square, bt.randInRange(-1, 1) * 2 * i)


    bt.join(finalLines, square);

  }
}
// let's get the bounds of our final lines
const finalLinesBounds = bt.bounds(finalLines);

// this moves the center of our drawing to the center of our doc
bt.translate(
  finalLines,
  [ width / 2, height / 2 ], 
  finalLinesBounds.cc
); 

drawLines(finalLines);

function rect(w, h) {

  // notice how this is an array of arrays
  return [
    [
      [-w/2, h/2],
      [w/2, h/2],
      [w/2, -h/2],
      [-w/2, -h/2],
      [-w/2, h/2],
    ]
  ]
}