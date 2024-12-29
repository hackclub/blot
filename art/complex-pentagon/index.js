/*
@title: Starry Night
@author: CyberZenDev
@snapshot: snap1.png
*/

const width = 200;
const height = 150;
setDocDimensions(width, height);

const finalLines = [];

const moonCenter = [width - bt.randInRange(15, 35), bt.randInRange(10, height / 4)];
const moonRadius = bt.randInRange(8, 12);
const moonPath = [];

for (let i = 0; i <= 360; i += 10) {
  const radian = (i * Math.PI) / 180;
  const x = moonCenter[0] + moonRadius * Math.cos(radian);
  const y = moonCenter[1] + moonRadius * Math.sin(radian);
  moonPath.push([x, y]);
}
finalLines.push(moonPath);

const houseWidth = bt.randInRange(40, 60);
const houseHeight = bt.randInRange(30, 40);
const houseX = (width - houseWidth) / 2;
const houseY = height - houseHeight - 15;

const houseBase = [
  [houseX, houseY],
  [houseX + houseWidth, houseY],
  [houseX + houseWidth, houseY + houseHeight],
  [houseX, houseY + houseHeight],
  [houseX, houseY]
];
finalLines.push(houseBase);

const roof = [
  [houseX, houseY],
  [houseX + houseWidth / 2, houseY - houseHeight / 3],
  [houseX + houseWidth, houseY]
];
finalLines.push(roof);

const doorWidth = houseWidth / 4;
const doorHeight = houseHeight / 2;
const doorX = houseX + houseWidth / 2 - doorWidth / 2;
const doorY = houseY + houseHeight - doorHeight;

const door = [
  [doorX, doorY],
  [doorX + doorWidth, doorY],
  [doorX + doorWidth, doorY + doorHeight],
  [doorX, doorY + doorHeight],
  [doorX, doorY]
];
finalLines.push(door);

const numWindows = bt.randIntInRange(1, 3);
const windows = [];
const windowSize = houseWidth / 8;

for (let i = 0; i < numWindows; i++) {
  let windowX, windowY;
  let overlap = false;
  let attempts = 0;
  const maxAttempts = 15;

  do {
    overlap = false;
    windowX = houseX + bt.randInRange(windowSize, houseWidth - windowSize * 2);
    windowY = houseY + bt.randInRange(windowSize, houseHeight - windowSize * 2);
    attempts++;

    if (
      windowX + windowSize > doorX &&
      windowX < doorX + doorWidth &&
      windowY + windowSize > doorY &&
      windowY < doorY + doorHeight
    ) {
      overlap = true;
    }

    if (!overlap) {
      for (const existingWindow of windows) {
        if (
          windowX + windowSize > existingWindow.x &&
          windowX < existingWindow.x + existingWindow.size &&
          windowY + windowSize > existingWindow.y &&
          windowY < existingWindow.y + existingWindow.size
        ) {
          overlap = true;
          break;
        }
      }
    }
  } while (overlap && attempts < maxAttempts);

  if (attempts < maxAttempts) {
    const window = [
      [windowX, windowY],
      [windowX + windowSize, windowY],
      [windowX + windowSize, windowY + windowSize],
      [windowX, windowY + windowSize],
      [windowX, windowY]
    ];
    finalLines.push(window);
    windows.push({ x: windowX, y: windowY, size: windowSize });
  }
}

const grassY = height - 5;
const numGrassBlades = width;
for (let i = 0; i < numGrassBlades; i++) {
  const grassX = i;
  const grassHeight = bt.randInRange(3, 10);
  const variation = bt.randInRange(-1, 1);
  const grassBlade = [
    [grassX, grassY],
    [grassX + variation, grassY - grassHeight],
    [grassX + variation * 2, grassY]
  ];
  finalLines.push(grassBlade);
}

const stars = [];
const numStars = bt.randIntInRange(10, 20);
const starSize = 2;

for (let i = 0; i < numStars; i++) {
  let starX, starY;
  let overlap = false;
  let attempts = 0;
  const maxAttempts = 15;

  do {
    overlap = false;
    starX = bt.randInRange(5, width - 5);
    starY = bt.randInRange(5, moonCenter[1] - moonRadius);

    const distToMoon = Math.sqrt((starX - moonCenter[0]) ** 2 + (starY - moonCenter[1]) ** 2);
    if (distToMoon < moonRadius + 5) {
      overlap = true;
    }

    if (!overlap) {
      for (const existingStar of stars) {
        const distToStar = Math.sqrt(
          (starX - existingStar.x) ** 2 + (starY - existingStar.y) ** 2
        );
        if (distToStar < starSize * 3) {
          overlap = true;
          break;
        }
      }
    }

    attempts++;
  } while (overlap && attempts < maxAttempts);

  if (attempts < maxAttempts) {
    const star = [
      [starX - starSize, starY],
      [starX, starY - starSize],
      [starX + starSize, starY],
      [starX, starY + starSize],
      [starX - starSize, starY]
    ];
    finalLines.push(star);
    stars.push({ x: starX, y: starY });
  }
}

const centerX = width / 2;
const centerY = height / 2;
bt.rotate(finalLines, 180, [centerX, centerY]);

drawLines(finalLines);
