/*
@title: Mushroom
@author: SebDaBaBo
@snapshot: blot_mushroom_art_SebDaBaBo_1.png
*/

const { Turtle, trim, merge, cut, cover, rotate, scale, translate, originate, setRandSeed, randInRange } = blotToolkit;

function drawMushroom() {
  // parameters
  const capWidth = 52;
  const capHeight = 36;
  const stemWidth = 6;
  const stemHeight = 46;
  const gillCount = 186;

  const cap = [];
  for (let i = 0; i <= 1; i += 0.01) {
    const x = capWidth * (i - 0.5);
    const y = capHeight * Math.sin(Math.PI * i) - capHeight / 2;
    cap.push([x, y]);
  }

  const stem = [];
  const stemSegments = 85;
  for (let i = 0; i <= stemSegments; i++) {
    const t = i / stemSegments;
    const width = stemWidth * (1 - 0.5 * t) + randInRange(-1, 1);
    const y = -t * stemHeight;
    stem.push([-width / 2, y]);
    stem.push([width / 2, y]);
  }

  const stemBase = [];
  for (let i = 0; i <= Math.PI; i += 0.01) {
    const x = (stemWidth / 2) * Math.cos(i);
    const y = (stemWidth / 2) * Math.sin(i);
    stemBase.push([x, y]);
  }

  stem.push(...stemBase);

  const gills = [];
  for (let i = 1; i < gillCount; i++) {
    const t = i / gillCount;
    const gill = [];
    for (let j = 0; j <= 1; j += 0.01) {
      const x = capWidth * (j - 0.5) * (1 - t);
      const y = (capHeight * Math.sin(Math.PI * j) - t * (stemHeight / 8)) - capHeight / 2;
      gill.push([x, y]);
    }
    gills.push(gill);
  }

  let mushroom = [cap, ...gills, stem];

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (let line of mushroom) {
    for (let [x, y] of line) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  translate(mushroom, [-centerX, -centerY]);

  translate(mushroom, [62.5, 62.5]);

  drawLines(mushroom);
}

setDocDimensions(125, 125);
drawMushroom();