/*
@title: random flower
@author: Saurav 
@snapshot: flwr.png , flwr2.png , flwr3.png ,flwr4.png ,flwr5.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);
const finalLines = [];
// generate random number of petals
const petalCount = bt.randIntInRange(5, 10); // between 5 to 10 petals
const flowerRadius = bt.randInRange(10,30); // random radius for flower

const flowerCenter = [
  //bt.randInRange(flowerRadius, width - flowerRadius/2),
  //bt.randInRange(flowerRadius, height - flowerRadius/2)
  bt.randInRange(flowerRadius,width-80),
  bt.randInRange(flowerRadius, height-20)
];
function createPetal(radius, angleOffset) {
  const petalWidth = bt.randInRange(10, 20); // random width for each petal
  const petalHeight = bt.randInRange(15, 30); // random height for each peatl
  const petal = [
    [0, 0],
    [petalWidth / 3, -petalHeight],
    [0, -petalHeight * 2],
    [-petalWidth / 3, -petalHeight],
    [0, 0]
  ];
  bt.rotate([petal], angleOffset, [0, 0]);
  bt.translate([petal], [radius, 0]);
  return petal;
}
for (let i = 0; i < petalCount; i++) {
  const angleOffset = (360 / petalCount) * i; 
  const petal = createPetal(flowerRadius, angleOffset); // create the petal
  bt.translate([petal], flowerCenter); // move petal to flower center
  finalLines.push(petal); // add to the final lines to draw
}

// draw the flower
drawLines(finalLines);
