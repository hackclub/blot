/*
@title: theGarden
@author: Harjyot Singh Sahni
@snapshot: snap1.png
*/

const grassThickness = 1;

const width = 150;
const height = 150; 

const groundLevel = height * 0.2;
setDocDimensions(width, height);

const rr = bt.randInRange;
const ri = bt.randIntInRange;

// Function to draw a rounded petal
const roundedPetal = (center, length, width) => {
  const t = new bt.Turtle();
  t.jump(center);
  t.arc(180, length);
  t.arc(180, length);
  t.right(180);
  return bt.scale(t.lines(), [width, 1]);
};

// Function to create a flower (closed polyline)
const flower = (center, numPetals, petalLength, petalWidth, petalCurve) => {
  let flowerPoints = [];
  for (let i = 0; i < numPetals; i++) {
    const angle = 360 / numPetals * i;
    const petalCenter = [center[0] + petalLength * Math.cos(angle * (Math.PI / 180)), 
                         center[1] + petalLength * Math.sin(angle * (Math.PI / 180))];
    const petalPoints = roundedPetal(petalCenter, petalLength, petalWidth);
    flowerPoints.push(...petalPoints[0]);
  }
  flowerPoints.push(flowerPoints[0]);
  return flowerPoints;
};

// Function to draw a curved stem
const stem = (start, height, curve = rr(-2, 2)) => {
  return bt.catmullRom([
    start,
    [start[0] + curve, start[1] - height * 0.5],
    [start[0], start[1] - height]
  ]);
};

// Function to generate non-overlapping flower positions
function generateFlowerPositions(numFlowers, minSpacing) {
  const positions = [];
  while (positions.length < numFlowers) {
    const newX = rr(0, width);
    const newY = rr(groundLevel + minSpacing, height * 0.8);

    let validPosition = true;
    for (const [x, y] of positions) {
      const distance = Math.sqrt((newX - x) ** 2 + (newY - y) ** 2);
      if (distance < minSpacing) {
        validPosition = false;
        break;
      }
    }

    if (validPosition) {
      positions.push([newX, newY]);
    }
  }
  return positions;
}
// Grass lol
function grassBlade(start, height, numStrokes = 1) {
  const blade = [];

  // Main central curve
  blade.push(stem(start, height, rr(-2, 2)));

  // Additional strokes with slight variations
  for (let i = 1; i < numStrokes; i++) {
    const offsetX = rr(-1, 1);
    const offsetY = rr(-1, 0); // Slight upwards curve
    blade.push(stem([start[0] + offsetX, start[1] + offsetY], height * 0.8, rr(-1, 1))); 
  }

  return blade;
}
// Grass blades
const grassBlades = [];
for (let i = 0; i < width; i += 2) {
  const bladeHeight = rr(3, 8);
  grassBlades.push(...grassBlade([i, groundLevel], bladeHeight)); // Use grassBlade function
}
// Pre-allocate flower positions
const flowerPositions = generateFlowerPositions(10, 10); 

// Flowers n Stems 
const flowers = [];
const stems = [];
for (const [flowerX, flowerY] of flowerPositions) {
  const stemHeight = rr(15, 30);  
  const numPetals = ri(3, 6);
  const petalLength = rr(0.8, 2);
  const petalWidth = rr(0.2, 0.4);
  const petalCurve = rr(5, 20);
  const stemThickness = rr(1.5, 2.5); 

  flowers.push(flower([flowerX, flowerY], numPetals, petalLength, petalWidth, petalCurve));
  stems.push(stem([flowerX, flowerY], stemHeight));
}

// Split flowers into multiple colors
const midpoint = Math.floor(flowers.length / 2);
const pinkFlowers = flowers.slice(0, midpoint);
const blueFlowers = flowers.slice(midpoint);

// Combine and draw everything
const garden = [...grassBlades];
bt.iteratePoints(garden, ([x, y]) => [x, y + rr(-1, 1)]); 

drawLines(garden, { stroke: "green", width: 1});  
drawLines(stems, { stroke: "green", width: 2 });
drawLines(pinkFlowers, { fill: "pink" });
drawLines(blueFlowers, { fill: "SkyBlue" }); 