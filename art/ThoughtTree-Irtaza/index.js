/*
@title: House
@author: Irtaza
@snapshot: the name of the snapshot file you want in the gallery
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

function rect(w, h) {
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

function triangle(base, height) {
  return [
    [
      [-base/2, 0],
      [base/2, 0],
      [0, height],
      [-base/2, 0]
    ]
  ]
}

const finalLines = [];

// House base
const houseWidth = 30;
const houseHeight = 40;
const house = rect(houseWidth, houseHeight);

// Roof
const roofBase = houseWidth + 10;
const roofHeight = 20;
const roof = triangle(roofBase, roofHeight);

// Door
const doorWidth = 10;
const doorHeight = 20;
const door = rect(doorWidth, doorHeight);

// Windows
const windowWidth = 8;
const windowHeight = 8;
const window1 = rect(windowWidth, windowHeight);
const window2 = rect(windowWidth, windowHeight);

// Positioning the house
bt.translate(house, [width / 2, height / 2]);

// Positioning the roof
bt.translate(roof, [
  width / 2 + bt.randInRange(-2, 2),
  height / 2 + houseHeight / 2 + roofHeight / 2
]);

// Positioning the door
bt.translate(door, [
  width / 2 + bt.randInRange(-2, 2),
  height / 2 - houseHeight / 2 + doorHeight / 2
]);

// Positioning the windows
bt.translate(window1, [width / 2 - houseWidth / 4, height / 2]);
bt.translate(window2, [width / 2 + houseWidth / 4, height / 2]);

// Adding randomness
bt.translate(house, [bt.randInRange(-5, 5), bt.randInRange(-5, 5)]);
bt.rotate(house, bt.randInRange(-0.1, 0.1));

bt.rotate(roof, bt.randInRange(-0.1, 0.1));

bt.rotate(door, bt.randInRange(-0.05, 0.05));

bt.translate(window1, [bt.randInRange(-2, 2), bt.randInRange(-2, 2)]);
bt.rotate(window1, bt.randInRange(-0.05, 0.05));

bt.translate(window2, [bt.randInRange(-2, 2), bt.randInRange(-2, 2)]);
bt.rotate(window2, bt.randInRange(-0.05, 0.05));

// Joining all parts
bt.join(finalLines, house);
bt.join(finalLines, roof);
bt.join(finalLines, door);
bt.join(finalLines, window1);
bt.join(finalLines, window2);

// Center the final drawing
const finalLinesBounds = bt.bounds(finalLines);
bt.translate(finalLines, [width / 2, height / 2], finalLinesBounds.cc);

drawLines(finalLines);
