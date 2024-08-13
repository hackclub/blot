/*
@title: HeartOfCircles
@author: PawiX25
@snapshot: 3.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const numCircles = 117;
const maxRadius = 3;
const waveAmplitude = 5;
const waveFrequency = 2;
const randomFactor = 0.2;
const seed = 116;
const heartScalingFactor = 35;

function generateHeartWaveArt(seed, randomFactor) {
  bt.setRandSeed(seed);
  const finalPolylines = [];
  const centerX = width / 2;
  const centerY = height / 1.7;

  function createCircle(x, y, radius, sides = 20) {
    const polyline = [];
    const angleIncrement = (2 * Math.PI) / sides;

    for (let i = 0; i < sides; i++) {
      const angle = i * angleIncrement;
      const xPos = x + radius * Math.cos(angle);
      const yPos = y + radius * Math.sin(angle);
      polyline.push([xPos, yPos]);
    }

    polyline.push(polyline[0]);
    return polyline;
  }

  function heartEquation(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return [x, y];
  }

  for (let i = 0; i < numCircles; i++) {
    const t = (i / numCircles) * 2 * Math.PI;
    let [x, y] = heartEquation(t);

    x *= width / heartScalingFactor;
    y *= height / heartScalingFactor;

    const waveOffset = waveAmplitude * Math.sin(t * waveFrequency);

    const finalX = centerX + x + (bt.rand() - 0.5) * randomFactor * maxRadius;
    const finalY = centerY + (y + waveOffset) + (bt.rand() - 0.5) * randomFactor * maxRadius;

    const radius = maxRadius * (1 + (bt.rand() - 0.5) * randomFactor);

    const circle = createCircle(finalX, finalY, radius);
    finalPolylines.push(circle);
  }

  drawLines(finalPolylines);
}

generateHeartWaveArt(seed, randomFactor);