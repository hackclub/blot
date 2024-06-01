/*
@title: PizzaMatic
@author: Sharon Basovich
@snapshot: pizzaSnapshot1.png
*/

const width = 125;
const height = 125;
const pizzaRadius = 40;
const pizzaSlices = 4; // value must be 1-6
const crustThickness = 5; //must be less than pizza radius
const pepSize = 7;
const pepNum = 0;
const oliInner = 1; //must be smaller than oliOuter
const oliOuter = 4;
const oliNum = 4;
const mushSize = 4;
const mushNum = 6;
const greenNum = 0;
const greenSize = 4;
setDocDimensions(width, height);

const finalLines = [];

function dist(x1, y1, x2, y2) {
  return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
}

const t = new bt.Turtle();
t.down();
for (let i = 0; i < pizzaSlices; i++) {
  t.left(90);
  t.forward(pizzaRadius);
  t.right(180);
  t.forward(pizzaRadius);
  t.left(90);
  t.arc(60, pizzaRadius);
  t.left(90);
  t.forward(pizzaRadius);
  t.right(180);
  t.forward(pizzaRadius);
  t.left(90);
  t.up();
  t.right(270);
  t.forward(crustThickness);
  t.right(90);
  t.arc(300, pizzaRadius - crustThickness);
  t.right(0);
  t.down();
  t.arc(60, pizzaRadius - crustThickness);
  t.up();
  t.right(90);
  t.forward(crustThickness);
  t.left(90);
  t.down();
}

const totalIngredients = pepNum + oliNum + mushNum + greenNum;
const arr = new Array(totalIngredients + 1);
for (let i = 0; i < totalIngredients + 1; i++) {
  arr[i] = [-10, -10];
}
for (let i = 0; i < pepNum; i++) {
  do {
    t.up();
    t.right(t.angle + 90);
    t.goTo([0, pizzaRadius]);

    let randAng = bt.randInRange(5, (60 * pizzaSlices) - 20);

    let randDist = bt.randInRange((2 * pepSize), pizzaRadius - crustThickness - (2 * pepSize));
    t.left(randAng);

    t.forward(randDist);

    var intersect = false;
    for (let j = 0; j < totalIngredients; j++) {
      var tester = dist(arr[j][0], arr[j][1], t.pos[0], t.pos[1]);
      if (tester < (2.5 * pepSize)) {
        intersect = true;
        break;
      }
    }
  } while (intersect);
  arr[i] = [t.pos[0], t.pos[1]];

  t.down();
  t.arc(360, pepSize);

}

for (let i = 0; i < oliNum; i++) {
  do {
    t.up();
    t.right(t.angle + 90);
    t.goTo([0, pizzaRadius]);

    let randAng = bt.randInRange(5, (60 * pizzaSlices) - 20);

    let randDist = bt.randInRange((2 * oliOuter), pizzaRadius - crustThickness - (2 * oliOuter));
    t.left(randAng);

    t.forward(randDist);

    var intersect = false;
    for (let j = 0; j < totalIngredients; j++) {
      var tester = dist(arr[j][0], arr[j][1], t.pos[0], t.pos[1]);
      if (tester < (2.5 * oliOuter)) {
        intersect = true;
        break;
      }
    }
  } while (intersect);

  arr[i + pepNum] = [t.pos[0], t.pos[1]];


  t.down();
  t.arc(360, oliOuter);
  t.left(90);
  t.up();
  t.forward(oliOuter - oliInner);
  t.down();
  t.right(90);
  t.arc(360, oliInner);

}
let mushDist = mushSize * 2 / 3;
for (let i = 0; i < mushNum; i++) {
  do {
    t.up();
    t.right(t.angle + 90);
    t.goTo([0, pizzaRadius]);

    let randAng = bt.randInRange(5, (60 * pizzaSlices) - 20);

    let randDist = bt.randInRange((2 * mushSize), pizzaRadius - crustThickness - (2 * mushSize));
    t.left(randAng);

    t.forward(randDist);

    var intersect = false;
    for (let j = 0; j < totalIngredients; j++) {
      var tester = dist(arr[j][0], arr[j][1], t.pos[0], t.pos[1]);
      if (tester < (2.5 * mushSize)) {
        intersect = true;
        break;
      }
    }
  } while (intersect);
  arr[i + pepNum + oliNum] = [t.pos[0], t.pos[1]];

  // Draw the pepperoni
  t.down();
  t.arc(180, mushSize);
  t.left(90);
  //t.up();

  t.forward(mushDist);
  t.down();
  t.right(90);
  t.forward(mushDist);
  t.left(90);
  t.forward(mushDist);
  t.left(90);
  t.forward(mushDist);
  t.right(90);
  t.forward(mushDist);
}

for (let i = 0; i < greenNum; i++) {
  do {
    t.up();
    t.right(t.angle + 90);
    t.goTo([0, pizzaRadius]);

    let randAng = bt.randInRange(5, (60 * pizzaSlices) - 20);

    let randDist = bt.randInRange((2 * greenSize), pizzaRadius - crustThickness - (2 * greenSize));
    t.left(randAng);

    t.forward(randDist);

    var intersect = false;
    for (let j = 0; j < totalIngredients; j++) {
      var tester = dist(arr[j][0], arr[j][1], t.pos[0], t.pos[1]);
      if (tester < (2.5 * greenSize)) {
        intersect = true;
        break;
      }
    }
  } while (intersect);
  arr[i + pepNum + oliNum + mushNum] = [t.pos[0], t.pos[1]];
  t.down();
  t.forward(greenSize / 1.5);
  t.right(50);
  t.forward(greenSize / 2)
  t.right(130);
  t.forward(greenSize / 1.5);
  t.right(50);
  t.forward(greenSize / 2);
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);