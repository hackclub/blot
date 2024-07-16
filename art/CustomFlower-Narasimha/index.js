/**
 * @title: Custom reverse Flower
 * @author: Narasimha
 * @snapshot: image1.png
 */

const width = 150;
const height = 150;

setDocDimensions(width, height);

const rr = bt.randInRange;

const drawPetal = (center, petalWidth, petalLength, petalPoints) => {
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

const drawFlower = (center) => {
  const numPetals = rr(8, 12);
  const petalWidth = rr(5, 12);
  const petalLength = rr(25, 40);
  const petalPoints = rr(6, 10);
  const stemWidth = rr(1, 3);
  const stemLength = rr(40, height / 2);
  const middleSize = rr(5, 15);

  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * 360;
    let petal = drawPetal(center, petalWidth, petalLength, petalPoints);

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

  // Add random leaves
  const numLeaves = rr(2, 5);
  for (let i = 0; i < numLeaves; i++) {
    const leafAngle = rr(0, 360);
    const leafLength = rr(10, 20);
    const leafWidth = rr(2, 5);
    const leafStart = rr(center[1] + stemLength / 2, center[1] + stemLength);
    const leafEnd = leafStart + leafLength;
    const leaf = bt.catmullRom([
      [center[0], leafStart],
      [center[0] - leafWidth, leafStart + leafLength / 3],
      [center[0], leafEnd],
      [center[0] + leafWidth, leafStart + leafLength / 3],
    ]);
    bt.rotate([leaf], leafAngle, [center[0], leafStart]);
    drawLines([leaf]);
  }
};

// Generate a field of flowers
const numFlowers = 10;
for (let i = 0; i < numFlowers; i++) {
  const petalWidth = rr(5, 12);
  const petalLength = rr(25, 40);
  const stemLength = rr(40, height / 2);

  // Calculate safe area for flower center to keep it within bounds
  const safeX = rr(petalLength * 1.2 + 20, width - petalLength * 1.2 - 20);
  const safeY = rr(petalLength * 1.2 + 20, height - stemLength - 20);
  const flowerCenter = [safeX, safeY];
  
  drawFlower(flowerCenter);
}
