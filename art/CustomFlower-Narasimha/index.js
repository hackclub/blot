/**
 * @title: Custom reverse Flower
 * @author: Narasimha
 * @snapshot: reverse-flower.png
 */

const width = 150;
const height = 150;

setDocDimensions(width, height);

const rr = bt.randInRange;
const center = [width / 2, height / 2];

// Generate variables for the flower
const numPetals = rr(8, 12); 
const petalWidth = rr(5, 12); 
const petalLength = rr(25, 40);
const petalCurviness = rr(1, 3);
const petalPoints = rr(6, 10); 
const stemWidth = rr(1, 3); 
const stemLength = height / 2;
const middleSize = rr(5, 15); 


const drawPetal = () => {
  const petal = bt.catmullRom([
    [center[0] - petalWidth / 2, center[1]],
    [center[0] - petalWidth / 2, center[1] - petalLength * 0.6],
    [center[0] - petalWidth / 4, center[1] - petalLength],
    [center[0], center[1] - petalLength * 1.2],
    [center[0] + petalWidth / 4, center[1] - petalLength],
    [center[0] + petalWidth / 2, center[1] - petalLength * 0.6],
    [center[0] + petalWidth / 2, center[1]],
  ]);


  for (let i = 0; i < petalPoints; i++) {
    const x = rr(center[0] - petalWidth / 2, center[0] + petalWidth / 2);
    const y = rr(center[1] - petalLength * 1.2, center[1]);
    petal.splice(rr(2, petal.length - 2), 0, [x, y]);
  }

  return petal;
};


for (let i = 0; i < numPetals; i++) {
  const angle = (i / numPetals) * 360;
  let petal = drawPetal();

  // Rotate each petal around the center
  bt.rotate([petal], angle, center);
  drawLines([petal]);
}


const stem = bt.catmullRom([
  [center[0], center[1]],
  [center[0] + stemWidth, center[1] + stemLength / 2],
  [center[0], center[1] + stemLength],
]);
drawLines([stem]);

// Draw middle part of the flower
const middle = bt.catmullRom([
  [center[0] - middleSize, center[1]],
  [center[0] - middleSize, center[1] - middleSize],
  [center[0], center[1] - middleSize * 2],
  [center[0] + middleSize, center[1] - middleSize],
  [center[0] + middleSize, center[1]],
]);
drawLines([middle]);
